---
title: Ponti della blockchain
metaTitle: Introduzione ai ponti blockchain
description: I ponti consentono agli utenti di spostare i propri fondi tra diverse blockchain
lang: it
---

_Il Web3 si è evoluto in un ecosistema di blockchain di layer 1 (L1) e soluzioni di ridimensionamento di layer 2 (L2), ciascuno progettato con capacità e compromessi unici. Con l'aumentare del numero di protocolli blockchain, aumenta anche la domanda di spostare gli asset tra le catene. Per soddisfare questa domanda, abbiamo bisogno di ponti._

<Divider />

## Cosa sono i ponti? {#what-are-bridges}

I ponti blockchain funzionano proprio come i ponti che conosciamo nel mondo fisico. Così come un ponte fisico collega due luoghi fisici, un ponte blockchain collega due ecosistemi blockchain. **I ponti facilitano la comunicazione tra le blockchain attraverso il trasferimento di informazioni e asset**.

Consideriamo un esempio:

Vieni dagli Stati Uniti e stai pianificando un viaggio in Europa. Hai degli USD, ma ti servono degli EUR da spendere. Per scambiare i tuoi USD in EUR puoi utilizzare un cambiavalute per una piccola commissione.

Ma cosa fai se vuoi fare uno scambio simile per utilizzare una [blockchain](/glossary/#blockchain) diversa? Supponiamo che tu voglia scambiare [ETH](/glossary/#ether) sulla Mainnet di [Ethereum](/) per ETH su [Arbitrum](https://arbitrum.io/). Come per il cambio valuta che abbiamo fatto per gli EUR, abbiamo bisogno di un meccanismo per spostare i nostri ETH da Ethereum ad Arbitrum. I ponti rendono possibile una tale transazione. In questo caso, [Arbitrum ha un ponte nativo](https://portal.arbitrum.io/bridge) che può effettuare il trasferimento di ETH dalla Mainnet ad Arbitrum.

## Perché abbiamo bisogno dei ponti? {#why-do-we-need-bridges}

Tutte le blockchain hanno i loro limiti. Affinché Ethereum possa scalare e stare al passo con la domanda, ha richiesto i [rollup](/glossary/#rollups). In alternativa, gli L1 come Solana e Avalanche sono progettati in modo diverso per consentire una maggiore capacità transazionale, ma a costo della decentralizzazione.

Tuttavia, tutte le blockchain sono sviluppate in ambienti isolati e hanno regole e meccanismi di [consenso](/glossary/#consensus) diversi. Ciò significa che non possono comunicare nativamente e i token non possono muoversi liberamente tra le blockchain.

I ponti esistono per connettere le blockchain, consentendo il trasferimento di informazioni e token tra di esse.

**I ponti consentono**:

- il trasferimento cross-chain di asset e informazioni.
- alle [applicazioni decentralizzate (dapp)](/glossary/#dapp) di accedere ai punti di forza di varie blockchain, migliorando così le loro capacità (poiché i protocolli ora hanno più spazio di progettazione per l'innovazione).
- agli utenti di accedere a nuove piattaforme e sfruttare i vantaggi di diverse catene.
- agli sviluppatori di diversi ecosistemi blockchain di collaborare e costruire nuove piattaforme per gli utenti.

[Come trasferire token tramite ponte verso i layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casi d'uso dei ponti {#bridge-use-cases}

Di seguito sono riportati alcuni scenari in cui è possibile utilizzare un ponte:

### Commissioni di transazione inferiori {#transaction-fees}

Supponiamo che tu abbia degli ETH sulla Mainnet di Ethereum ma desideri commissioni di transazione più economiche per esplorare diverse dapp. Trasferendo tramite ponte i tuoi ETH dalla Mainnet a un rollup L2 di Ethereum, puoi usufruire di commissioni di transazione inferiori.

### Dapp su altre blockchain {#dapps-other-chains}

Se hai utilizzato Aave sulla Mainnet di Ethereum per fornire USDT, ma il tasso di interesse che potresti ricevere fornendo USDT utilizzando Aave su Polygon è più alto.

### Esplorare gli ecosistemi blockchain {#explore-ecosystems}

Se hai degli ETH sulla Mainnet di Ethereum e vuoi esplorare un L1 alternativo per provare le sue dapp native. Puoi utilizzare un ponte per effettuare il trasferimento dei tuoi ETH dalla Mainnet di Ethereum all'L1 alternativo.

### Possedere asset cripto nativi {#own-native}

Supponiamo che tu voglia possedere Bitcoin (BTC) nativi, ma hai fondi solo sulla Mainnet di Ethereum. Per ottenere un'esposizione a BTC su Ethereum, puoi acquistare Wrapped Bitcoin (WBTC). Tuttavia, WBTC è un token [ERC-20](/glossary/#erc-20) nativo della rete Ethereum, il che significa che è una versione Ethereum di Bitcoin e non l'asset originale sulla blockchain di Bitcoin. Per possedere BTC nativi, dovresti trasferire i tuoi asset da Ethereum a Bitcoin utilizzando un ponte. Questo trasferirà i tuoi WBTC e li convertirà in BTC nativi. In alternativa, potresti possedere BTC e volerli utilizzare nei protocolli di [finanza decentralizzata (DeFi)](/glossary/#defi) di Ethereum. Ciò richiederebbe un trasferimento tramite ponte nella direzione opposta, da BTC a WBTC, che può quindi essere utilizzato come asset su Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Puoi anche fare tutto quanto sopra utilizzando un [exchange centralizzato](/get-eth). Tuttavia, a meno che i tuoi fondi non siano già su un exchange, ciò comporterebbe più passaggi e probabilmente faresti meglio a utilizzare un ponte.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Tipi di ponti {#types-of-bridge}

I ponti hanno molti tipi di design e complessità. Generalmente, i ponti rientrano in due categorie: ponti fidati (trusted) e ponti trustless.

| Ponti fidati                                                                                                                                            | Ponti trustless                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| I ponti fidati dipendono da un'entità o da un sistema centrale per le loro operazioni.                                                                  | I ponti trustless operano utilizzando smart contract e algoritmi.                                      |
| Hanno assunzioni di fiducia rispetto alla custodia dei fondi e alla sicurezza del ponte. Gli utenti si affidano principalmente alla reputazione dell'operatore del ponte. | Sono trustless, ovvero la sicurezza del ponte è la stessa della blockchain sottostante.                |
| Gli utenti devono rinunciare al controllo dei propri asset cripto.                                                                                      | Attraverso gli [smart contract](/glossary/#smart-contract), i ponti trustless consentono agli utenti di mantenere il controllo dei propri fondi. |

In breve, possiamo dire che i ponti fidati hanno assunzioni di fiducia, mentre i ponti trustless sono a fiducia minimizzata e non creano nuove assunzioni di fiducia oltre a quelle dei domini sottostanti. Ecco come possono essere descritti questi termini:

- **Trustless**: avere una sicurezza equivalente ai domini sottostanti. Come descritto da [Arjun Bhuptani in questo articolo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Assunzioni di fiducia:** allontanarsi dalla sicurezza dei domini sottostanti aggiungendo verificatori esterni nel sistema, rendendolo così meno sicuro dal punto di vista criptoeconomico.

Per sviluppare una migliore comprensione delle differenze chiave tra i due approcci, facciamo un esempio:

Immagina di essere al checkpoint di sicurezza dell'aeroporto. Esistono due tipi di checkpoint:

1. Checkpoint manuali: gestiti da funzionari che controllano manualmente tutti i dettagli del tuo biglietto e della tua identità prima di consegnarti la carta d'imbarco.
2. Check-in automatico: gestito da una macchina in cui inserisci i dettagli del tuo volo e ricevi la carta d'imbarco se tutto è in regola.

Un checkpoint manuale è simile a un modello fidato in quanto dipende da una terza parte, ovvero i funzionari, per le sue operazioni. Come utente, ti fidi che i funzionari prendano le decisioni giuste e utilizzino correttamente le tue informazioni private.

Il check-in automatico è simile a un modello trustless in quanto rimuove il ruolo dell'operatore e utilizza la tecnologia per le sue operazioni. Gli utenti mantengono sempre il controllo dei propri dati e non devono affidare le proprie informazioni private a una terza parte.

Molte soluzioni di ponte adottano modelli tra questi due estremi con vari gradi di assenza di necessità di fiducia.

<Divider />

## Utilizzare i ponti {#use-bridge}

L'utilizzo dei ponti ti consente di spostare i tuoi asset tra diverse blockchain. Ecco alcune risorse che possono aiutarti a trovare e utilizzare i ponti:

- **[Riepilogo dei ponti di L2BEAT](https://l2beat.com/bridges/summary) e [Analisi dei rischi dei ponti di L2BEAT](https://l2beat.com/bridges/summary)**: un riepilogo completo di vari ponti, inclusi dettagli su quota di mercato, tipo di ponte e catene di destinazione. L2BEAT offre anche un'analisi dei rischi per i ponti, aiutando gli utenti a prendere decisioni informate nella scelta di un ponte.
- **[Riepilogo dei ponti di DefiLlama](https://defillama.com/bridges/Ethereum)**: un riepilogo dei volumi dei ponti attraverso le reti Ethereum.

<Divider />

## Rischio nell'utilizzo dei ponti {#bridge-risk}

I ponti sono nelle prime fasi di sviluppo. È probabile che il design ottimale del ponte non sia ancora stato scoperto. L'interazione con qualsiasi tipo di ponte comporta dei rischi:

- **Rischio dello smart contract:** il rischio di un bug nel codice che può causare la perdita dei fondi degli utenti
- **Rischio tecnologico:** guasti del software, codice con bug, errori umani, spam e attacchi dannosi possono potenzialmente interrompere le operazioni degli utenti

Inoltre, poiché i ponti fidati aggiungono assunzioni di fiducia, comportano rischi aggiuntivi come:

- **Rischio di censura:** gli operatori del ponte possono teoricamente impedire agli utenti di trasferire i propri asset utilizzando il ponte
- **Rischio di custodia:** gli operatori del ponte possono colludere per rubare i fondi degli utenti

I fondi dell'utente sono a rischio se:

- c'è un bug nello smart contract
- l'utente commette un errore
- la blockchain sottostante viene violata
- gli operatori del ponte hanno intenti malevoli in un ponte fidato
- il ponte viene violato

Una recente violazione è stata quella del ponte Wormhole di Solana, [dove sono stati rubati 120.000 wETH (325 milioni di dollari USA) durante l'attacco](https://rekt.news/wormhole-rekt/). Molte delle [principali violazioni nelle blockchain hanno coinvolto i ponti](https://rekt.news/leaderboard/).

I ponti sono fondamentali per l'inserimento degli utenti negli L2 di Ethereum e anche per gli utenti che desiderano esplorare ecosistemi diversi. Tuttavia, dati i rischi connessi all'interazione con i ponti, gli utenti devono comprendere i compromessi che i ponti stanno facendo. Queste sono alcune [strategie per la sicurezza cross-chain](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Letture di approfondimento {#further-reading}
- [EIP-5164: Esecuzione cross-chain](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 giugno 2022 - Brendan Asselstine_
- [Framework di rischio per L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 luglio 2022 - Bartek Kiepuszewski_
- ["Perché il futuro sarà multi-chain, ma non sarà cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 gennaio 2022 - Vitalik Buterin_
- [Sfruttare la sicurezza condivisa per un'interoperabilità cross-chain sicura: i comitati di stato di Lagrange e oltre](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 giugno 2024 - Emmanuel Awosika_
- [Lo stato delle soluzioni di interoperabilità dei rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 giugno 2024 - Alex Hook_