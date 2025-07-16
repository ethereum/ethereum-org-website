---
title: Introduzione ai ponti della blockchain
description: I ponti consentono agli utenti di spostare i propri fondi tra diverse blockchain
lang: it
---

# Ponti della blockchain {#prerequisites}

_Web3 si è evoluto in un ecosistema delle blockchain del L1 e soluzioni di ridimensionamento del L2, ognuna progettata con capacità e compromessi unici. All'aumentare del numero di protocolli della blockchain, aumenta anche la domanda di spostare risorse tra le catene. Per soddisfare questa domanda, necessitiamo dei ponti._

<Divider />

## Cosa sono i ponti? {#what-are-bridges}

I ponti della blockchain funzionano proprio come i ponti che conosciamo nel mondo fisico. Proprio come un ponte fisico connette due località fisiche, il ponte di una blockchain connette due ecosistemi della blockchain. **I ponti facilitano la comunicazione tra blockchain tramite il trasferimento di informazioni e risorse**.

Consideriamo un esempio:

Risiedi negli USA e stai pianificando un viaggio in Europa. Possiedi USD, ma necessiti di EUR da spendere. Per scambiare i tuoi USD per degli EUR, puoi usare un cambio di valuta per una piccola commissione.

Ma cosa succede se desideri effettuare un simile scambio per utilizzare un'altra [blockchain](/glossary/#blockchain)? Diciamo che desideri scambiare degli [ETH](/glossary/#ether) sulla Rete Principale di Ethereum per degli ETH su [Arbitrum](https://arbitrum.io/). Come il cambio di valuta fatto per gli EUR, necessitiamo di un meccanismo per spostare i nostri ETH da Ethereum ad Arbitrum. I ponti rendono possibile una simile transazione. In questo caso, [Arbitrum ha un ponte nativo](https://bridge.arbitrum.io/) che può trasferire gli ETH dalla Rete Principale ad Arbitrum.

## Perché necessitiamo dei ponti? {#why-do-we-need-bridges}

Tutte le blockchain hanno le proprie restrizioni. Perché Ethereum si ridimensionasse e tenesse il passo con la domanda, sono stati necessari i [rollup](/glossary/#rollups). Altrimenti, gli L1 come Solana e Avalanche sono progettati diversamente, per consentire un volume maggiore, ma al costo della decentralizzazione.

Tuttavia, tutte le blockchain si sviluppano in ambienti isolati e prevedono regole e meccanismi del [consenso](/glossary/#consensus) differenti. Ciò significa che non possono comunicare nativamente e che i token non possono spostarsi liberamente tra le blockchain.

I ponti esistono per connettere le blockchain, consentendo il trasferimento di informazioni e token tra di esse.

**I ponti consentono**:

- il trasferimento tra catene di risorse e informazioni.
- l'accesso delle [dapp](/glossary/#dapp) ai punti forti di varie blockchain, migliorandone così le capacità (poiché ora i protocolli dispongono di un maggiore spazio per l'innovazione).
- agli utenti di accedere a nuove piattaforme e sfruttare i benefici di catene differenti.
- agli sviluppatori da ecosistemi della blockchain differenti, di collaborare e creare nuove piattaforme per gli utenti.

[Come collegare i token al livello 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casi d'uso dei ponti {#bridge-use-cases}

I seguenti sono alcuni scenari in cui puoi usare un ponte:

### Commissioni di transazione più basse {#transaction-fees}

Diciamo che possiedi degli ETH sulla Rete Principale di Ethereum, ma vorresti commissioni di transazione più economiche per esplorare diverse dapp. Collegando i tuoi ETH dalla Rete Principale al rollup di L2 di Ethereum, puoi godere di commissioni di transazione inferiori.

### Dapp su altre blockchain {#dapps-other-chains}

Se utilizzi Aave sulla Rete Principale di Ethereum per prestare USDT, il tasso d'interesse per prestarli usando Aave su Polygon è maggiore.

### Esplora gli ecosistemi della blockchain {#explore-ecosystems}

Se possiedi degli ETH sulla Rete Principale di Ethereum e desideri esplorare un L1 alternativo per provarne le dapp native. Puoi usare un ponte per trasferire i tuoi ETH dalla Rete Principale di Ethereum al L1 alternativo.

### Cripto-risorse native proprie {#own-native}

Diciamo che vuoi possedere Bitcoin (BTC) nativi, ma hai fondi soltanto sulla Rete Principale di Ethereum. Per esporti ai BTC su Ethereum, puoi acquistare dei Wrapped Bitcoin (WBTC). Tuttavia, WBTC è un token [ERC-20](/glossary/#erc-20) nativo alla rete di Ethereum, il che significa che è una versione di Bitcoin di Ethereum e non la risorsa originale sulla blockchain di Bitcoin. Per possedere BTC nativi, dovresti collegare le tue risorse da Ethereum a Bitcoin usando un ponte. Questo collegherà i tuoi WBTC e li convertirà in BTC nativi. Altrimenti, potresti possedere dei BTC e volerli utilizzare nei protocolli di [DeFi](/glossary/#defi) di Ethereum. Questo richiederebbe il collegamento inverso, da BTC a WBTC, poi utilizzabili come risorse su Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Inoltre, puoi fare tutto quanto descritto sopra, usando una <a href="/get-eth/">borsa centralizzata</a>. Tuttavia, a meno che i tuoi fondi non siano già su una borsa, comporterebbe diversi passaggi, e sarebbe più conveniente usare un ponte.
</InfoBanner>

<Divider />

## Tipi di ponte {#types-of-bridge}

I ponti hanno molti tipi di design e complessità. In generale, i ponti rientrano in due categorie: fiduciari e non fiduciari.

| Ponti Fiduciari                                                                                                                                                                  | Ponti Non Fiduciari                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I ponti fiduciari dipendono da un'entità o sistema centrale per le loro operazioni.                                                                                              | I ponti non fiduciari operano usando i contratti intelligenti e gli algoritmi.                                                                             |
| Presentano supposizioni di fiducia rispetto alla custodia dei fondi e la sicurezza del ponte. Principalmente, gli utenti, si affidano alla reputazione dell'operatore del ponte. | Sono non fiduciari, cioè, la sicurezza del ponte è la stessa della blockchain sottostante.                                                                 |
| Gli utenti devono rinunciare al controllo delle loro cripto-risorse.                                                                                                             | Tramite i [contratti intelligenti](/glossary/#smart-contract), i ponti privi di fiducia consentono agli utenti di mantenere il controllo sui propri fondi. |

In pillole, possiamo dire che i ponti fiduciari hanno supposizioni di fiducia, mentre i ponti non fiduciari minimizzano la fiducia e non fanno supposizioni di fiducia oltre ai domini sottostanti. Ecco come si possono descrivere questi termini:

- **Non Fiduciari**: aventi una sicurezza equivalente a quella dei domini sottostanti. Come descritto da [Arjun Bhuptani in questo articolo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- ** Supposizioni di fiducia:** allontanarsi dalla sicurezza dei domini sottostanti aggiungendo verifiche esterne nel sistema, dunque rendendolo meno sicuro cripto-economicamente.

Per una migliore comprensione delle differenze chiave tra i due approcci, prendiamo un esempio:

Immagina di essere al punto di controllo della sicurezza aeroportuale. Esistono due tipi di punti di controllo:

1. Punti di Controllo Manuali: operati dagli agenti, che controllano manualmente tutti i dettagli del tuo biglietto e della tua identità prima di consegnarti il biglietto.
2. Controllo Automatico: operato da una macchina in cui inserisci i dettagli del tuo volo e da cui ricevi il biglietto se tutto corrisponde.

Un punto di controllo manuale è simile a un modello attendibile, poiché dipende da una terza parte, cioè gli agenti, per le sue operazioni. Da utente, ti affidi agli agenti affinché prendano le giuste decisioni e usino correttamente le tue informazioni private.

Il controllo automatico è simile a un modello non fiduciario, poiché rimuove il ruolo dell'operatore e sfrutta la tecnologia per le sue operazioni. Gli utenti hanno sempre il controllo dei propri dati e non devono affidare le proprie informazioni private a una terza parte.

Molte soluzioni di collegamento adottano modelli tra questi due estremi, con gradi di fiducia variabili.

<Divider />

## Utilizzare i ponti {#use-bridge}

L'utilizzo dei ponti ti consente di spostare le tue risorse tra blockchain differenti. Ecco alcune risorse che possono aiutarti a trovare e utilizzare i ponti:

- **[Riepilogo sui ponti di L2BEAT](https://l2beat.com/bridges/summary) e [Analisi sui rischi dei ponti di L2BEAT](https://l2beat.com/bridges/risk)**: Un riepilogo completo dei vari ponti, che include dettagli sulle quote di mercato, sul tipo di ponte e sulle catene di destinazione. Inoltre L2BEAT dispone di un'analisi sui rischi dei ponti che aiuta gli utenti a prendere decisioni informate durante la selezione di un ponte.
- **[Riepilogo sui ponti di DefiLlama](https://defillama.com/bridges/Ethereum)**: Un riepilogo sui volumi dei ponti sulle reti di Ethereum.

<Divider />

## Rischi nell'uso dei ponti {#bridge-risk}

I ponti sono nelle prime fasi di sviluppo. È probabile che il design ottimale dei ponti non sia ancora stato scoperto. L'interazione con qualsiasi tipo di ponte comporta dei rischi:

- **Rischi dei Contratti Intelligenti:** il rischio di un bug nel codice che causi la perdita dei fondi degli utenti
- **Rischio Tecnologico: **guasto del software, codice contenente bug, errore umano, spam e attacchi malevoli possono potenzialmente disturbare le operazioni degli utenti

Inoltre, poiché i ponti fiduciari aggiungono supposizioni di fiducia, comportano ulteriori rischi, come:

- **Rischio di Censura:** gli operatori del ponte possono teoricamente impedire agli utenti di trasferire le proprie risorse usando il ponte
- **Rischio di Custodia:** l'operatore del ponte potrebbe colludere nel furto dei fondi degli utenti

I fondi degli utenti sono a rischio se:

- è presente un bug nel contratto intelligente
- l'utente commette un errore
- la blockchain sottostante è stata hackerata
- gli operatori del ponte hanno intenti dolosi in un ponte fiduciario
- il ponte viene hackerato

Una hack recente è quella del ponte del Wormhole di Solana, [in cui 120k di wETH ($325 milioni USD), sono stati rubati durante l'hack](https://rekt.news/wormhole-rekt/). Molte delle [hack principali nelle blockchain hanno coinvolto ponti](https://rekt.news/leaderboard/).

I ponti sono fondamentali per accogliere gli utenti sui L2 di Ethereum e persino per gli utenti che desiderano esplorare diversi ecosistemi. Tuttavia, dati i rischi comportati dall'interazione coi ponti, gli utenti devono comprenderne i compromessi. Ecco alcune [strategie per la sicurezza tra le catene](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Ulteriori letture {#further-reading}

- [EIP-5164: Esecuzione Tra Catene](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 giugno 2022 - Brendan Asselstine_
- [Quadro dei rischi di L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 luglio 2022 - Bartek Kiepuszewski_
- ["Perché il futuro sarà multi-catena, ma non intra-catena."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 gennaio 2022 - Vitalik Buterin_
