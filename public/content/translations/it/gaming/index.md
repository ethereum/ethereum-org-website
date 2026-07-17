---
title: Il gaming su Ethereum
description: "Scopri come Ethereum alimenta i giochi onchain con regole verificabili, risorse di proprietà dei giocatori ed ecosistemi aperti su cui chiunque può costruire."
lang: it
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoints:
  - "Le regole e lo stato del gioco possono essere applicati dalla blockchain di Ethereum, non dai server di uno studio, rappresentando un vantaggio chiave dei giochi onchain"
  - "Chiunque può creare mod, bot o giochi completamente nuovi che si collegano agli stessi dati onchain aperti"
  - "I layer 2 (l2) appositamente creati consentono un gameplay in tempo reale con commissioni inferiori, mentre i framework di sviluppo di giochi rendono la creazione di giochi onchain più accessibile che mai"
buttons:
  - content: Scopri di più
    toId: gaming-on-ethereum
  - content: Esplora i giochi
    toId: games
    isSecondary: false
---

## Il gaming su Ethereum {#gaming-on-ethereum}

Il gaming su Ethereum si presenta in varie forme, dai giochi che utilizzano la blockchain per funzionalità specifiche a quelli in cui l'intero mondo di gioco vive onchain. La blockchain di Ethereum può essere utilizzata con i giochi in varie capacità. I giochi possono archiviare le loro valute come token trasferibili o altre risorse di gioco (personaggi, equipaggiamento, animali domestici, ecc.) sotto forma di [token non fungibili (NFT)](/nft/). I giochi possono anche utilizzare gli smart contract per ospitare la loro logica, le regole e lo stato onchain. Tali giochi sono comunemente definiti "giochi completamente onchain".

L'ecosistema di Ethereum include anche [blockchain di layer 2 (l2)](/layer-2/learn/) che ereditano le garanzie di sicurezza della Mainnet di Ethereum estendendo al contempo la scalabilità di Ethereum e supportando casi d'uso specializzati. Le reti l2 possono fornire ulteriori vantaggi per i giochi onchain e le loro community grazie ai tempi di conferma più rapidi e alle commissioni inferiori, rendendo il gameplay più accessibile.

Man mano che il [layer 1 (l1) scala](/roadmap/scaling/), i giochi stanno iniziando a tornare sulla Mainnet di Ethereum. Un esempio è [Asphodel](https://x.com/asph0d37), un gioco completamente onchain attualmente in fase di playtest sul l1 di Ethereum. Tuttavia, la maggior parte dei giochi utilizza ancora soluzioni l2 per beneficiare di commissioni inferiori.

## L'ascesa del gaming su Ethereum {#rise-of-ethereum-gaming}

Gli MMO tradizionali come EVE Online, World of Warcraft, MapleStory e RuneScape hanno dimostrato che le economie virtuali potevano generare valore nel mondo reale. I giocatori accumulavano oro per guadagnare, l'economia di EVE rispecchiava i sistemi finanziari reali e la cultura delle mod (Counter-Strike, DotA 2, server di Minecraft) ha dimostrato che i giocatori volevano costruire su mondi esistenti. Persino la [famosa frustrazione di Vitalik per un depotenziamento (nerf) in World of Warcraft](https://youtu.be/Letsfuhpobw?t=140) è diventata un primo simbolo dei problemi con gli ecosistemi di gioco chiusi. Ma gli studi controllavano tutto; potevano bannare gli account, chiudere i server o rivendicare la proprietà dei contenuti creati dai giocatori.

Quando Ethereum è stato lanciato, **i game designer hanno visto l'opportunità di costruire mondi che non potevano essere chiusi**. [Come ha affermato Ronan Sandford, creatore di Conquest.eth](https://ronan.eth.limo/blog/infinite-games/): "Dal giorno in cui mi sono imbattuto in Ethereum, sono rimasto affascinato dall'idea di creare giochi che funzionano e si evolvono indipendentemente dal loro creatore."

La blockchain di Ethereum ha abilitato mondi in cui le regole non possono essere modificate arbitrariamente, lo stato non può essere eliminato e chiunque può creare estensioni che vivono finché esiste la rete. Questo è qualcosa che Ethereum fornisce nativamente.

## Panoramica dell'ecosistema di gaming di Ethereum {#ethereums-gaming-ecosystem-overview}

- **Layer 2:** Con commissioni più economiche e tempi di transazione brevi, i l2 di Ethereum sono diventati un luogo comune per il lancio dei giochi. Il panorama dei l2 continua a evolversi, con i principali ecosistemi di gaming del Web3 come Ronin (originariamente una sidechain per Axie Infinity) che sono passati di recente all'architettura layer 2 di Ethereum ereditando le garanzie di sicurezza di Ethereum pur mantenendo la sua infrastruttura ottimizzata per il gaming. Gli attuali l2 leader per il gaming includono: [Ronin](https://www.roninchain.com/), [Starknet](https://www.starknet.io/), [Abstract](https://abs.xyz/), [Immutable](https://www.immutable.com/) e [Base](https://www.base.org/).
- **Infrastruttura:** Per semplificare lo sviluppo di giochi onchain, esistono diversi stack di strumenti; [Cartridge](https://cartridge.gg/) (che offre chiavi di sessione, transazioni senza gas tramite paymaster e autenticazione basata su WebAuthn tramite Cartridge Controller), [Dojo](https://dojoengine.org/) (un framework di giochi dimostrabili con supporto nativo per l'astrazione dell'account), [MUD](https://mud.dev/) (un motore di gioco onchain basato su EVM). Altri, come [Proof of Play](https://proofofplay.com/) e [Thirdweb](https://thirdweb.com/), consentono agli sviluppatori di creare giochi con esperienze utente simili al Web2.
- **Community di gaming:** L'ecosistema di gaming di Ethereum è supportato da gilde di gioco, tra cui ([YGG](https://x.com/YieldGuild), [MANA Gaming](https://x.com/ManaGamingBR), [WASD](https://x.com/WASD_0x), [LegacyGG](https://x.com/Lgc_GG), [Gaming Grid](https://x.com/GamingGridx) e [OLAGG](https://x.com/OLAGuildGames)) per la collaborazione tra giocatori, piattaforme di scoperta come [GAM3S.GG](https://games.gg/) e organi di informazione come [Gaming Daily](https://x.com/GamingDailyx) per l'analisi dei giochi e la copertura dell'ecosistema. Alcuni abbracciano tutti questi aspetti, come [FOCGERS](https://x.com/FOCGERS).
- **Generi di gioco:** Alcuni generi di gioco si allineano naturalmente con le proprietà uniche della blockchain di Ethereum: **stato persistente**, **logica verificabile** ed **economie di proprietà dei giocatori**. Gli sviluppatori affrontano l'integrazione in modo diverso. Alcuni creano giochi completamente onchain in cui tutta la logica e lo stato vivono sulla blockchain, mentre altri utilizzano la blockchain in modo minimo per la proprietà delle risorse, come gli elementi cosmetici NFT. Gli sviluppatori stanno scoprendo quali tipi di gameplay traggono maggior vantaggio dall'architettura onchain, tra cui:
   1. **Dungeon Crawler e Roguelike:** I dungeon con morte permanente (permadeath) completamente onchain di Loot Survivor con punteggi elevati verificabili, Maze of Gains di Onchain Heroes e la sua rivisitazione a tema Axie chiamata Axie: Den of Mysteries, che combinano l'esplorazione di labirinti con le meccaniche della finanza decentralizzata (DeFi).
   2. **MMO:** L'MMO stagionale risk-to-earn Gold Rush di Cambria con meccaniche PvP e di estrazione, in cui ogni passo fuori dalle zone sicure comporta veri e propri stake. Il gioco di strategia MMO completamente onchain di ForTheKingdom, con guerre tra fazioni su larga scala. Axie Infinity: Atia's Legacy, un MMO onchain su Ronin in cui i giocatori combattono attraverso dungeon PvE e battaglie PvP con veri e propri stake. 
   3. **Strategia 4X e Grand Strategy:** Conquest.eth, un gioco permissionless di conquista spaziale e diplomazia in cui i giocatori mettono in staking token sui pianeti per produrre flotte e formare alleanze, in un gioco che funziona per sempre onchain. Realms porta le meccaniche 4X di Ethereum in un'ambientazione fantasy, in cui i giocatori controllano i Reami (NFT di terreni) per estrarre risorse, costruire eserciti e impegnarsi in una complessa diplomazia all'interno di un'economia completamente guidata dai giocatori. Dark Forest è stato il pioniere del genere con meccaniche di nebbia di guerra basate su prova a conoscenza zero ed è attualmente mantenuto come fork della community da DFArchon.
   4. **Strategia e Tattica:** Realms include le intense partite di strategia basate su buy-in di 1 ora di Blitz, e l'imminente autobattler Asphodel è in fase di playtest sulla Mainnet di Ethereum.
   5. **Giochi di carte collezionabili:** Showdown combina la strategia dei giochi di carte collezionabili con l'intensità del poker. Axie Infinity Classic è una combinazione di scacchi, poker e Pokemon, ed è il primo gioco del Web3 a raggiungere milioni di giocatori.
   6. **Arene competitive:** Duel Arena di Cambria, in cui i giocatori mettono in staking ETH in frenetici duelli 1v1 all'ultimo sangue. AveForge, un'arena competitiva di battaglie tra mech in cui i giocatori pilotano mech personalizzabili.

## Giochi da provare {#games}

<CategoryAppsGrid category="gaming" />

## Funzionalità dei giochi onchain {#features-of-onchain-games}

1. **Modo sicuro per scambiare beni digitali**

   Le risorse di gioco scambiabili possono essere scambiate tra i giocatori con altre risorse di gioco o token su quella catena. In passato, i giochi affrontavano comunemente la sfida di facilitare il commercio equo tra i giocatori, in particolare per gli oggetti rari e di valore. I marketplace di terze parti e il trading peer-to-peer spesso portavano i giocatori a essere ingannati o truffati dei loro beni preziosi. Poiché le risorse onchain seguono una struttura dati consolidata, possono essere facilmente integrate con i marketplace esistenti, offrendo ai giocatori tranquillità durante lo scambio. I progressi nei market maker automatizzati (AMM) consentono inoltre ai giocatori di scambiare istantaneamente determinati oggetti senza dover attendere che una controparte (acquirente/venditore) finalizzi il loro scambio.

2. **Origine trasparente delle risorse**

   I falsi e le copie degli originali possono essere un problema considerevole quando si valutano gli oggetti, specialmente se la persona non ha molta familiarità con come distinguere un oggetto reale da uno falso. Le risorse onchain hanno sempre una cronologia completa di chi (quale portafoglio) le possedeva e del loro indirizzo di origine. Anche se esiste una copia perfetta dell'oggetto onchain, si distingue chiaramente dall'originale in base al suo smart contract di origine, mitigando il rischio di frode.

3. **Logica trasparente**

   I giochi completamente onchain utilizzano gli smart contract per le loro funzionalità. Ciò significa che chiunque può rivedere e verificare la logica del gioco, assicurandosi che funzioni secondo le intenzioni degli sviluppatori. Questa trasparenza della logica consente inoltre ad altri sviluppatori di creare nuovi smart contract che possono espandere il gioco o essere integrati con alcune delle sue funzionalità.

4. **Obiettivi dimostrabili**

   Nei giochi completamente onchain, ogni azione del giocatore viene registrata sulla blockchain. Ciò rende molto semplice controllare e verificare se un giocatore ha compiuto le azioni richieste per un determinato traguardo/obiettivo. A causa della natura immutabile delle blockchain, tali registrazioni degli obiettivi rimarranno intatte finché la catena continuerà a funzionare e potranno essere verificate da qualsiasi parte (non solo dagli sviluppatori, come si vede comunemente nel gaming tradizionale).

5. **Giochi per sempre**

   I giocatori investono molto tempo e sforzi nella costruzione della loro reputazione e dei loro personaggi nel gioco, ma quei progressi possono essere facilmente persi se gli sviluppatori decidono di chiudere i server (specialmente se si tratta di un gioco online). Poiché i giochi completamente onchain archiviano la loro logica e il loro stato onchain, i giocatori possono ancora interagire con gli smart contract del gioco, anche se lo sviluppatore principale del gioco cessa lo sviluppo. Tali giochi possono ancora essere giocati e continuare a ricevere aggiornamenti dalle loro community perché la loro logica continua a funzionare sulla blockchain.

## Come i giochi integrano le blockchain {#how-games-integrate-blockchains}

Gli sviluppatori di giochi possono decidere di incorporare diverse funzionalità di Ethereum nei loro giochi. Solo perché le funzionalità esistono non significa che ogni gioco basato su Ethereum debba utilizzarle tutte, poiché esistono soluzioni alternative (con i propri pro e contro) che gli sviluppatori possono utilizzare al loro posto.

### Accedi con Ethereum {#sign-in-with-ethereum}

I giocatori possono utilizzare i loro account onchain per accedere al gioco. Questo è solitamente facilitato tramite la firma di una transazione con il portafoglio Web3 di un giocatore. I giocatori possono quindi conservare le loro risorse di gioco e portare con sé la loro reputazione di giocatore in un unico account, in tutti i giochi a cui accedono utilizzando lo stesso portafoglio. L'[EVM](/developers/docs/evm/) di Ethereum è uno standard comunemente utilizzato su molte blockchain, quindi un giocatore può spesso utilizzare lo stesso account per accedere ai giochi su qualsiasi blockchain compatibile con EVM supportata dal portafoglio (nota: alcuni portafogli Web3 richiedono un'importazione RPC manuale, specialmente per le blockchain più recenti, prima di poter essere utilizzati per fare qualsiasi cosa su quella catena).

### Token fungibili {#fungible-tokens}

Proprio come gli ether, le risorse e le valute di gioco fungibili possono essere archiviate onchain come token fungibili. I token possono quindi essere inviati tra indirizzi e utilizzati negli smart contract, consentendo ai giocatori di scambiare o regalare risorse e valute di gioco su mercati aperti.

### Token non fungibili {#non-fungible-tokens}

I token non fungibili rappresentano risorse digitali uniche con proprietà distinte e registri di proprietà archiviati onchain. Ethereum ospita il più grande ecosistema NFT, con [OpenSea](https://opensea.io/) che rimane il marketplace generico dominante per il trading di NFT di gaming su più catene. I recenti sviluppi mostrano che gli NFT si stanno evolvendo oltre i collezionabili statici, come gli Axie di Axie Infinity, in risorse digitali dinamiche e funzionali che possono essere utilizzate per giocare a giochi onchain.

Gli NFT Beast in Loot Survivor su Starknet archiviano metadati completamente onchain, tra cui specie, livello, salute, tipo di combattimento e cronologia delle sconfitte. Ciò rende ogni NFT un **registro verificabile e permanentemente onchain degli eventi di gioco**. Quando un giocatore è il primo a sconfiggere una Bestia con nome, conia l'NFT e quella Bestia continua ad apparire nel dungeon di ogni altro giocatore; ogni successiva morte causata da quella Bestia viene registrata nei suoi metadati, creando interazioni tra giocatori senza richiedere server centrali. Le morti dei giocatori portano ricompense all'NFT Beast posseduto. 

Gli NFT ROM di Gigaverse funzionano come fabbriche, generando materiali e risorse nel tempo. Invece di possedere un singolo oggetto, i giocatori possono possedere infrastrutture di produzione, introducendo **meccaniche di catena di approvvigionamento e generazione continua di valore nelle economie di gioco**. Gli NFT 'Core' di Cambria su Abstract capovolgono il modello delle microtransazioni consentendo ai giocatori di coniare animali domestici e skin. I possessori di Core guadagnano Frammenti (Shard), li bruciano per creare nuovi elementi cosmetici e li scambiano in mercati guidati dai giocatori, mentre lo studio guadagna dalle royalty piuttosto che dalle vendite dirette.  


### Smart contract {#smart-contracts}

I giochi completamente onchain utilizzano gli smart contract per creare una logica di gioco trasparente e immutabile. In tali casi, la blockchain funge da backend del gioco, sostituendo la necessità di ospitare la sua logica e l'archiviazione dei dati su un server centralizzato. (Nota: non tutti i giochi del Web3 sono giochi completamente onchain. Come accennato in precedenza, dipende caso per caso da quanti dati e logica del gioco sono archiviati onchain, rispetto a un altro livello DA o a un server classico.)

## Evoluzione dei miglioramenti dell'UX dei giocatori {#evolution-of-player-ux-improvements}

### Interoperabilità e gioco cross-chain {#interoperability-and-cross-chain-play}

I progressi nelle interazioni cross-chain e nei ponti consentono ai giocatori di accedere ai giochi su Ethereum in modo più fluido che mai. I giochi possono essere distribuiti su più blockchain e le risorse onchain di un gioco possono essere integrate da un altro gioco. In passato, ai giocatori veniva solitamente richiesto di trasferire tramite ponte i propri fondi su un'altra catena prima di poter iniziare a utilizzarli nel gioco. Oggigiorno, i giochi integrano comunemente ponti di token verso altre catene per facilitare l'inserimento dei giocatori.

### Miglioramenti della scalabilità e delle commissioni del gas {#scalability-and-gas-fee-improvements}

Nel 2017, la mania per i CryptoKitties ha aumentato drasticamente le commissioni del gas per tutti gli utenti che effettuavano transazioni su Ethereum. Da allora, numerose Proposte di Miglioramento di Ethereum (EIP) sono state implementate con successo negli aggiornamenti di rete, aumentando la larghezza di banda della Mainnet di Ethereum e riducendo significativamente le commissioni di transazione medie. I layer 2 espandono ulteriormente la capacità transazionale disponibile, riducendo le commissioni di transazione a pochi centesimi o anche meno. Commissioni inferiori e una maggiore capacità transazionale hanno ampliato i casi d'uso di gaming che possono essere creati su Ethereum, supportando azioni ad alto volume e microtransazioni di gioco che non escludono i giocatori di tutti i giorni.

### Accessi social {#social-logins}

L'accesso con un account Ethereum onchain, che può essere utilizzato su tutte le blockchain compatibili con EVM, è uno dei metodi di autenticazione più comuni. Anche alcune catene non EVM lo utilizzano come opzione per la creazione di un account. Tuttavia, se un nuovo giocatore non ha un account Ethereum esistente e desidera creare facilmente un account per accedere a un gioco, l'[astrazione dell'account](/roadmap/account-abstraction/) gli consente di accedere con i propri account social e creare un account Ethereum in background.

### Paymaster e chiavi di sessione {#paymaster-and-session-keys}

Pagare le commissioni del gas per inviare transazioni onchain o interagire con gli smart contract può essere un punto di attrito significativo per molti nuovi giocatori. Gli account paymaster possono essere finanziati dal giocatore o sovvenzionati dal gioco. Le chiavi di sessione consentono al giocatore di rimanere connesso al gioco per l'intera durata della sessione, richiedendogli di firmare solo il primo messaggio della sessione, con i messaggi successivi firmati in background.

Ci sono filosofie contrastanti attorno a queste meccaniche. Un esempio di spicco è Kamigotchi di Initia, che tratta il gas pagato dai giocatori come entrate dirette. Al contrario, l'ecosistema di gioco Realms.World, che include oltre 4 giochi completamente onchain attivi su Starknet, adotta l'approccio opposto. Tutti i giochi nell'ecosistema utilizzano il paymaster di Cartridge, consentendo ai giocatori di interagire con i giochi a costo zero di gas. Mentre Kamigotchi abbraccia le commissioni del gas come parte del design economico, i giochi di Realms.World considerano i costi del gas principalmente come un ostacolo all'esperienza del giocatore.

## Inizia a giocare su Ethereum {#get-started-with-gaming-on-ethereum}

1. **Trova un gioco divertente a cui giocare** - Sfoglia i giochi elencati sopra o esplora piattaforme come [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) e [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configura il tuo portafoglio cripto** - I giocatori hanno bisogno di un portafoglio per gestire le risorse digitali di gioco e (in alcuni casi) per accedere ai giochi. [Trova un portafoglio qui](/wallets/find-wallet/).
3. **Finanzia il tuo portafoglio** - Acquisisci alcuni ether (ETH) o token rilevanti per la rete l2 su cui intendi giocare. [Scopri dove ottenere ETH qui](/get-eth/). 
4. **Gioca** - Inizia a giocare e goditi la vera proprietà dei tuoi progressi di gioco!