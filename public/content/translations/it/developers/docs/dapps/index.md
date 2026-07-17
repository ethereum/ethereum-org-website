---
title: Introduzione tecnica alle dapp
description:
lang: it
---

Un'applicazione decentralizzata (dapp) è un'applicazione costruita su una rete decentralizzata che combina uno [smart contract](/developers/docs/smart-contracts/) e un'interfaccia utente frontend. Su [Ethereum](/), gli smart contract sono accessibili e trasparenti, come delle API aperte, quindi la tua dapp può persino includere uno smart contract scritto da qualcun altro.

## Prerequisiti {#prerequisites}

Prima di imparare cosa sono le dapp, dovresti coprire le [basi della blockchain](/developers/docs/intro-to-ethereum/) e leggere della rete Ethereum e di come sia decentralizzata.

## Definizione di una dapp {#definition-of-a-dapp}

Una dapp ha il suo codice di backend in esecuzione su una rete peer-to-peer decentralizzata. Confrontalo con un'app in cui il codice di backend è in esecuzione su server centralizzati.

Una dapp può avere codice frontend e interfacce utente scritte in qualsiasi linguaggio (proprio come un'app) per effettuare chiamate al suo backend. Inoltre, il suo frontend può essere ospitato su un'archiviazione decentralizzata come [IPFS](https://ipfs.io/).

- **Decentralizzato** - le dapp operano su Ethereum, una piattaforma decentralizzata pubblica e aperta in cui nessuna singola persona o gruppo ha il controllo
- **Deterministico** - le dapp eseguono la stessa funzione indipendentemente dall'ambiente in cui vengono eseguite
- **Turing completo** - le dapp possono eseguire qualsiasi azione date le risorse necessarie
- **Isolato** - le dapp vengono eseguite in un ambiente virtuale noto come Ethereum Virtual Machine, in modo che se lo smart contract ha un bug, non ostacolerà il normale funzionamento della rete blockchain

### Sugli smart contract {#on-smart-contracts}

Per introdurre le dapp, dobbiamo introdurre gli smart contract: il backend di una dapp, in mancanza di un termine migliore. Per una panoramica dettagliata, vai alla nostra sezione sugli [smart contract](/developers/docs/smart-contracts/).

Uno smart contract è un codice che risiede sulla blockchain di Ethereum e viene eseguito esattamente come programmato. Una volta che gli smart contract sono distribuiti sulla rete, non puoi modificarli. Le dapp possono essere decentralizzate perché sono controllate dalla logica scritta nel contratto, non da un individuo o da un'azienda. Questo significa anche che devi progettare i tuoi contratti con molta attenzione e testarli a fondo.

## Vantaggi dello sviluppo di dapp {#benefits-of-dapp-development}

- **Zero tempi di inattività** – Una volta che lo smart contract è distribuito sulla blockchain, la rete nel suo complesso sarà sempre in grado di servire i client che cercano di interagire con il contratto. Gli attori malintenzionati, pertanto, non possono lanciare attacchi denial-of-service mirati verso singole dapp.
- **Privacy** – Non è necessario fornire un'identità del mondo reale per distribuire o interagire con una dapp.
- **Resistenza alla censura** – Nessuna singola entità sulla rete può impedire agli utenti di inviare transazioni, distribuire dapp o leggere dati dalla blockchain.
- **Integrità completa dei dati** – I dati archiviati sulla blockchain sono immutabili e indiscutibili, grazie alle primitive crittografiche. Gli attori malintenzionati non possono falsificare transazioni o altri dati che sono già stati resi pubblici.
- **Calcolo trustless/comportamento verificabile** – Gli smart contract possono essere analizzati e sono garantiti per essere eseguiti in modi prevedibili, senza la necessità di fidarsi di un'autorità centrale. Questo non è vero nei modelli tradizionali; ad esempio, quando utilizziamo i sistemi bancari online, dobbiamo fidarci che le istituzioni finanziarie non abusino dei nostri dati finanziari, non manomettano i registri o non vengano hackerate.

## Svantaggi dello sviluppo di dapp {#drawbacks-of-dapp-development}

- **Manutenzione** – Le dapp possono essere più difficili da mantenere perché il codice e i dati pubblicati sulla blockchain sono più difficili da modificare. È difficile per gli sviluppatori apportare aggiornamenti alle loro dapp (o ai dati sottostanti archiviati da una dapp) una volta che sono distribuite, anche se vengono identificati bug o rischi per la sicurezza in una vecchia versione.
- **Sovraccarico delle prestazioni** – C'è un enorme sovraccarico delle prestazioni e la scalabilità è davvero difficile. Per raggiungere il livello di sicurezza, integrità, trasparenza e affidabilità a cui aspira Ethereum, ogni nodo esegue e archivia ogni transazione. Oltre a questo, anche il consenso Proof-of-Stake (PoS) richiede tempo.
- **Congestione della rete** – Quando una dapp utilizza troppe risorse computazionali, l'intera rete si intasa. Attualmente, la rete può elaborare solo circa 10-15 transazioni al secondo; se le transazioni vengono inviate più velocemente di così, il pool di transazioni non confermate può gonfiarsi rapidamente.
- **Esperienza utente** – Potrebbe essere più difficile progettare esperienze user-friendly perché l'utente finale medio potrebbe trovare troppo difficile configurare uno stack di strumenti necessario per interagire con la blockchain in modo veramente sicuro.
- **Centralizzazione** – Le soluzioni user-friendly e developer-friendly costruite sopra il livello base di Ethereum potrebbero finire per sembrare comunque servizi centralizzati. Ad esempio, tali servizi potrebbero archiviare chiavi o altre informazioni sensibili lato server, servire un frontend utilizzando un server centralizzato o eseguire importanti logiche di business su un server centralizzato prima di scrivere sulla blockchain. La centralizzazione elimina molti (se non tutti) i vantaggi della blockchain rispetto al modello tradizionale.

## Preferisci imparare visivamente? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Strumenti per creare dapp {#dapp-tools}

**Scaffold-ETH _- Sperimenta rapidamente con Solidity utilizzando un frontend che si adatta al tuo smart contract._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Dapp di esempio](https://punkwallet.io/)

**Create Eth App _- Crea app basate su Ethereum con un solo comando._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Strumento FOSS per generare frontend di dapp da un' [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Strumento FOSS per gli sviluppatori Ethereum per testare il proprio nodo, e comporre ed eseguire il debug delle chiamate RPC dal browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK in ogni linguaggio, smart contract, strumenti e infrastruttura per lo sviluppo Web3._**

- [Homepage](https://thirdweb.com/)
- [Documentazione](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Piattaforma di sviluppo Web3 di livello enterprise per distribuire smart contract, abilitare pagamenti con carta di credito e cross-chain, e utilizzare API per creare, distribuire, vendere, archiviare e modificare NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentazione](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Letture consigliate {#further-reading}

- [Esplora le dapp](/apps)
- [L'architettura di un'applicazione Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Una guida del 2021 alle applicazioni decentralizzate](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Cosa sono le app decentralizzate?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapp popolari](https://www.alchemy.com/dapps) - _Alchemy_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Introduzione allo stack di Ethereum](/developers/docs/ethereum-stack/)
- [Framework di sviluppo](/developers/docs/frameworks/)

## Tutorial: Costruire app e frontend su Ethereum {#tutorials}

- [Guida ai contratti di Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Una guida annotata dei contratti principali di Uniswap v2 che spiega come funziona il market maker automatizzato (AMM)._
- [Costruire un'interfaccia utente per il tuo contratto](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Come costruire un frontend moderno con React + Wagmi che si connette al tuo smart contract._
- [Smart Contract Hello World per principianti – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Tutorial end-to-end: scrivi, distribuisci e costruisci un frontend per un semplice smart contract._
- [Componenti server e agenti per app Web3](/developers/tutorials/server-components/) _– Come scrivere componenti server TypeScript che ascoltano gli eventi della blockchain e rispondono con transazioni._
- [IPFS per interfacce utente decentralizzate](/developers/tutorials/ipfs-decentralized-ui/) _– Come ospitare il frontend della tua dapp su IPFS per la resistenza alla censura._