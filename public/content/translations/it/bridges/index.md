---
title: Introduzione ai ponti della blockchain
description: I ponti consentono agli utenti di spostare i propri fondi tra diverse blockchain
lang: it
---

# Ponti blockchain {#prerequisites}

_Web3 si è evoluto in un ecosistema delle blockchain del L1 e soluzioni di ridimensionamento del L2, ognuna progettata con capacità e compromessi unici. All'aumentare del numero di protocolli della blockchain, aumenta anche la domanda di spostare risorse tra le catene.Per soddisfare questa domanda, necessitiamo dei ponti._

<Divider />

## Cosa sono i ponti? {#what-are-bridges}

I ponti della blockchain funzionano proprio come i ponti che conosciamo nel mondo fisico. Proprio come un ponte fisico connette due località fisiche, il ponte di una blockchain connette due ecosistemi della blockchain. **I ponti facilitano la comunicazione tra blockchain tramite il trasferimento di informazioni e risorse**.

Consideriamo un esempio:

Risiedi negli USA e stai pianificando un viaggio in Europa. Possiedi USD, ma necessiti di EUR da spendere. Per scambiare i tuoi USD per degli EUR, puoi usare un cambio di valuta per una piccola commissione.

Ma cosa fai se vuoi fare uno scambio simile per usare una [blockchain](/glossary/#blockchain) diversa? Diciamo che vuoi scambiare [ETH](/glossary/#ether) sulla Rete Principale di Ethereum con ETH su [Arbitrum](https://arbitrum.io/). Come il cambio di valuta fatto per gli EUR, necessitiamo di un meccanismo per spostare i nostri ETH da Ethereum ad Arbitrum. I ponti rendono possibile una simile transazione. In questo caso, [Arbitrum ha un ponte nativo](https://portal.arbitrum.io/bridge) che può trasferire ETH dalla Rete Principale ad Arbitrum.

## Perché necessitiamo dei ponti? {#why-do-we-need-bridges}

Tutte le blockchain hanno le proprie restrizioni. Per consentire a Ethereum di scalare e tenere il passo con la domanda, sono stati necessari i [rollup](/glossary/#rollups). Altrimenti, gli L1 come Solana e Avalanche sono progettati diversamente, per consentire un volume maggiore, ma al costo della decentralizzazione.

Tuttavia, tutte le blockchain sono sviluppate in ambienti isolati e hanno regole e meccanismi di [consenso](/glossary/#consensus) diversi. Ciò significa che non possono comunicare nativamente e che i token non possono spostarsi liberamente tra le blockchain.

I ponti esistono per connettere le blockchain, consentendo il trasferimento di informazioni e token tra di esse.

**I ponti consentono**:

- il trasferimento tra catene di risorse e informazioni.
- Accesso delle [dApp](/glossary/#dapp) ai punti di forza di varie blockchain – migliorandone così le capacità (poiché i protocolli ora hanno più spazio di progettazione per l'innovazione).
- agli utenti di accedere a nuove piattaforme e sfruttare i benefici di catene differenti.
- agli sviluppatori da ecosistemi della blockchain differenti, di collaborare e creare nuove piattaforme per gli utenti.

[Come usare un ponte per trasferire token al livello 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casi d'uso dei ponti {#bridge-use-cases}

I seguenti sono alcuni scenari in cui puoi usare un ponte:

### Tariffe di transazione più basse {#transaction-fees}

Diciamo che possiedi degli ETH sulla Rete Principale di Ethereum, ma vorresti commissioni di transazione più economiche per esplorare diverse dapp. Collegando i tuoi ETH dalla Rete Principale al rollup di L2 di Ethereum, puoi godere di commissioni di transazione inferiori.

### dApp su altre blockchain {#dapps-other-chains}

Se hai utilizzato Aave su Mainnet Ethereum per fornire USDT ma il tasso di rendimento che ottieni per fornire USDT usando Aave su Polygon è maggiore.

### Esplorazione di ecosistemi blockchain {#explore-ecosystems}

Se possiedi degli ETH sulla Rete Principale di Ethereum e desideri esplorare un L1 alternativo per provarne le dapp native. Puoi usare un ponte per trasferire i tuoi ETH dalla Rete Principale di Ethereum al L1 alternativo.

### Possesso di cripto-asset nativi {#own-native}

Diciamo che vuoi possedere Bitcoin (BTC) nativi, ma hai fondi soltanto sulla Rete Principale di Ethereum. Per esporti ai BTC su Ethereum, puoi acquistare dei Wrapped Bitcoin (WBTC). Tuttavia, WBTC è un token [ERC-20](/glossary/#erc-20) nativo della rete Ethereum, il che significa che è una versione Ethereum di Bitcoin e non l'asset originale sulla blockchain di Bitcoin. Per possedere BTC nativi, dovresti collegare le tue risorse da Ethereum a Bitcoin usando un ponte. Questo collegherà i tuoi WBTC e li convertirà in BTC nativi. In alternativa, potresti possedere BTC e volerli usare nei protocolli [DeFi](/glossary/#defi) di Ethereum. Questo richiederebbe il collegamento inverso, da BTC a WBTC, poi utilizzabili come risorse su Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Puoi anche fare tutte le cose sopra utilizzando una [piattaforma di scambio centralizzata](/get-eth). Tuttavia, a meno che i tuoi fondi non siano già su una borsa, comporterebbe diversi passaggi, e sarebbe più conveniente usare un ponte.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Tipi di ponti {#types-of-bridge}

I ponti hanno molti tipi di design e complessità. In generale, i ponti rientrano in due categorie: fiduciari e non fiduciari.

| Ponti Fiduciari                                                                                                                                                                                                  | Ponti Non Fiduciari                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I ponti fiduciari dipendono da un'entità o sistema centrale per le loro operazioni.                                                                                                              | I ponti non fiduciari operano usando i contratti intelligenti e gli algoritmi.                                                                          |
| Presentano supposizioni di fiducia rispetto alla custodia dei fondi e la sicurezza del ponte. Principalmente, gli utenti, si affidano alla reputazione dell'operatore del ponte. | Sono non fiduciari, cioè, la sicurezza del ponte è la stessa della blockchain sottostante.                                                              |
| Gli utenti devono rinunciare al controllo delle loro cripto-risorse.                                                                                                                             | Tramite i [contratti intelligenti](/glossary/#smart-contract), i ponti non fiduciari consentono agli utenti di mantenere il controllo dei propri fondi. |

In pillole, possiamo dire che i ponti fiduciari hanno supposizioni di fiducia, mentre i ponti non fiduciari minimizzano la fiducia e non fanno supposizioni di fiducia oltre ai domini sottostanti. Ecco come si possono descrivere questi termini:

- **Trustless**: avere una sicurezza equivalente a quella dei domini sottostanti. Come descritto da [Arjun Bhuptani in questo articolo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Presupposti di fiducia:** allontanarsi dalla sicurezza dei domini sottostanti aggiungendo verificatori esterni al sistema, rendendolo così meno sicuro dal punto di vista cripto-economico.

Per una migliore comprensione delle differenze chiave tra i due approcci, prendiamo un esempio:

Immagina di essere al punto di controllo della sicurezza aeroportuale. Esistono due tipi di punti di controllo:

1. Punti di Controllo Manuali: operati dagli agenti, che controllano manualmente tutti i dettagli del tuo biglietto e della tua identità prima di consegnarti il biglietto.
2. Controllo Automatico: operato da una macchina in cui inserisci i dettagli del tuo volo e da cui ricevi il biglietto se tutto corrisponde.

Un punto di controllo manuale è simile a un modello attendibile, poiché dipende da una terza parte, cioè gli agenti, per le sue operazioni. Da utente, ti affidi agli agenti affinché prendano le giuste decisioni e usino correttamente le tue informazioni private.

Il controllo automatico è simile a un modello non fiduciario, poiché rimuove il ruolo dell'operatore e sfrutta la tecnologia per le sue operazioni. Gli utenti hanno sempre il controllo dei propri dati e non devono affidare le proprie informazioni private a una terza parte.

Molte soluzioni di collegamento adottano modelli tra questi due estremi, con gradi di fiducia variabili.

<Divider />

## Uso dei ponti {#use-bridge}

L'utilizzo dei ponti ti consente di spostare le tue risorse tra blockchain differenti. Ecco alcune risorse che possono aiutarti a trovare e utilizzare i ponti:

- **[Riepilogo dei ponti di L2BEAT](https://l2beat.com/bridges/summary) e [Analisi dei rischi dei ponti di L2BEAT](https://l2beat.com/bridges/summary)**: un riepilogo completo di vari ponti, che include dettagli su quote di mercato, tipo di ponte e catene di destinazione. Inoltre L2BEAT dispone di un'analisi sui rischi dei ponti che aiuta gli utenti a prendere decisioni informate durante la selezione di un ponte.
- **[Riepilogo dei ponti di DefiLlama](https://defillama.com/bridges/Ethereum)**: un riepilogo dei volumi dei ponti sulle reti Ethereum.

<Divider />

## Rischi dell'uso dei ponti {#bridge-risk}

I ponti sono nelle prime fasi di sviluppo. È probabile che il design ottimale dei ponti non sia ancora stato scoperto. L'interazione con qualsiasi tipo di ponte comporta dei rischi:

- **Rischio dei contratti intelligenti —** il rischio di un bug nel codice che può causare la perdita dei fondi dell'utente.
- **Rischio tecnologico —** guasti del software, codice con bug, errori umani, spam e attacchi malevoli possono potenzialmente interrompere le operazioni dell'utente.

Inoltre, poiché i ponti fiduciari aggiungono supposizioni di fiducia, comportano ulteriori rischi, come:

- **Rischio di censura —** gli operatori del ponte possono teoricamente impedire agli utenti di trasferire i propri asset usando il ponte.
- **Rischio di custodia —** gli operatori del ponte possono colludere per rubare i fondi degli utenti.

I fondi degli utenti sono a rischio se:

- è presente un bug nel contratto intelligente
- l'utente commette un errore
- la blockchain sottostante è stata hackerata
- gli operatori del ponte hanno intenti dolosi in un ponte fiduciario
- il ponte viene hackerato

Un hack recente è stato quello del ponte Wormhole di Solana, [dove sono stati rubati 120k wETH (325 milioni di dollari) durante l'hack](https://rekt.news/wormhole-rekt/). Molti dei [principali hack nel mondo blockchain hanno coinvolto i ponti](https://rekt.news/leaderboard/).

I ponti sono fondamentali per accogliere gli utenti sui L2 di Ethereum e persino per gli utenti che desiderano esplorare diversi ecosistemi. Tuttavia, dati i rischi comportati dall'interazione coi ponti, gli utenti devono comprenderne i compromessi. Queste sono alcune [strategie per la sicurezza cross-chain](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Letture consigliate {#further-reading}

- [EIP-5164: Esecuzione cross-chain](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 giugno 2022 - Brendan Asselstine_
- [Framework di rischio per i ponti L2](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 luglio 2022 - Bartek Kiepuszewski_
- ["Perché il futuro sarà multi-chain, ma non sarà cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 gennaio 2022 - Vitalik Buterin_
- [Sfruttare la sicurezza condivisa per un'interoperabilità cross-chain sicura: comitati di stato di Lagrange e oltre](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 giugno 2024 - Emmanuel Awosika_
- [Lo stato delle soluzioni di interoperabilità dei rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 giugno 2024 - Alex Hook_

