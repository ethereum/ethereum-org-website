---
title: Introduzione alle dapp
description:
lang: it
---

Un'applicazione decentralizzata (dApp) è un'applicazione costruita su una rete decentralizzata che coniuga uno [smart contract](/developers/docs/smart-contracts/) con un'interfaccia utente frontend. In Ethereum gli Smart Contract sono accessibili e trasparenti (come le API aperte) quindi una dapp può anche includere Smart Contract scritto da altri.

## Prerequisiti {#prerequisites}

Prima di approfondire le dapp, è consigliabile conoscere le [basi della blockchain](/developers/docs/intro-to-ethereum/) e informarsi sulla rete Ethereum e sul perché è decentralizzata.

## Definizione di dapp {#definition-of-a-dapp}

Il codice backend di una dapp viene eseguito su una rete decentralizzata peer-to-peer. L'opposto di quello che succede con una app il cui codice backend gira su server centralizzati.

Una dapp può avere codice frontend e interfacce utente scritti in qualsiasi linguaggio (come qualsiasi app) che possono fare chiamate al backend. Inoltre, il frontend può essere ospitato su uno storage decentralizzato come [IPFS](https://ipfs.io/).

- **Decentralizzate** - Le dApp operano su Ethereum, una piattaforma pubblica decentralizzata dove nessun individuo o gruppo detiene il controllo
- **Deterministiche**: eseguono la stessa funzione a prescindere dall'ambiente dove vengono eseguite.
- **Turing complete** - Le dApp possono eseguire qualsiasi azione una volta fornite le risorse necessarie
- **Isolate** - Le dApp vengono eseguite in un ambiente virtuale noto come Ethereum Virtual Machine. In questo modo, se lo smart contract ha un bug, non ostacolerà il normale funzionamento della rete blockchain

### Informazioni sugli Smart Contract {#on-smart-contracts}

Per presentare le dapp, dobbiamo introdurre gli Smart Contract, cioè il backend della dapp, in mancanza di una definizione migliore. Per una panoramica dettagliata, consulta la nostra sezione sugli [smart contract](/developers/docs/smart-contracts/).

Uno Smart Contract è codice che gira sulla blockchain Ethereum e che funziona esattamente come programmato. Una volta che gli smart contract sono distribuiti sulla rete, non è possibile modificarli. Le dapp possono essere decentralizzate perché sono controllate della logica scritta nel contratto, non da un individuo o da un'azienda. Questo significa anche gli Smart Contract devono essere progettati molto attentamente e testati accuratamente.

## Vantaggi dello sviluppo delle dapp {#benefits-of-dapp-development}

- **Nessun tempo di inattività** – Una volta che lo smart contract è distribuito sulla blockchain, la rete nel suo insieme sarà sempre in grado di servire i client che cercano di interagire con il contratto. Gli attori malevoli quindi non possono lanciare attacchi denial-of-service verso dapp singole.
- **Privacy**: non è necessario fornire un'identità reale per distribuire una dapp o interagirvi.
- **Resistenza alla censura**: nessuna entità sulla rete può impedire agli utenti di inviare transazioni, distribuire dapp o leggere dati dalla blockchain.
- **Completa integrità dei dati**: i dati conservati sulla blockchain sono immutabili e indiscutibili, grazie alle primitive crittografiche. Attori malevoli non possono falsificare transazioni o altri dati che sono già stati resi pubblici.
- **Calcolo trustless/comportamento verificabile** – gli smart contract possono essere analizzati ed è garantito che vengano eseguiti in modo prevedibile, senza la necessità di affidarsi ad un'autorità centrale. Questo non accade nei modelli tradizionali. Per esempio, quando usiamo l'online banking dobbiamo fidarci del fatto che gli istituti finanziari non abusino dei nostri dati finanziari, non manomettano record e non vengano attaccati da hacker.

## Svantaggi dello sviluppo di dApp {#drawbacks-of-dapp-development}

- **Manutenzione**: le dapp possono essere impegnative da mantenere perché il codice e i dati pubblicati sulla blockchain sono più difficili da modificare. Per gli sviluppatori, è difficile apportare degli aggiornamenti alle loro dApp (o ai dati sottostanti, memorizzati da una dApp) una volta distribuite, anche se vengono individuati dei bug o rischi di sicurezza in una versione precedente.
- **Overhead delle prestazioni**: l'overhead delle prestazioni è enorme e scalare è davvero difficile. Per raggiungere il livello di sicurezza, integrità, trasparenza e affidabilità al quale aspira Ethereum, ogni nodo esegue e memorizza ogni transazione. Oltre a ciò, anche il consenso di proof-of-stake richiede tempo.
- **Congestione della rete**: quando una dApp utilizza troppe risorse di calcolo, l'intera rete viene sostenuta. Attualmente, la rete è in grado di elaborare circa 10 transazioni al secondo; se le transazioni vengono inviate a un ritmo più alto, l'insieme di transazioni non confermate può "gonfiarsi" e accumularsi.
- **Esperienza utente**: potrebbe essere difficile creare esperienze intuitive. L'utente medio potrebbe trovare troppo difficile configurare la serie di strumenti necessaria a interagire con la blockchain in modo veramente sicuro.
- **Centralizzazione**: soluzioni facili da utilizzare e compatibili con gli sviluppatori costruite sullo strato base di Ethereum potrebbero finire per assomigliare comunque a servizi centralizzati. Ad esempio, tali servizi potrebbero memorizzare le chiavi o altre informazioni sensibili sul lato del server, servire un frontend utilizzando un server centralizzato oppure utilizzare un'importante logica commerciale su un server centralizzato prima di scrivere sulla blockchain. La centralizzazione annulla molti (se non tutti) i vantaggi della blockchain rispetto al modello tradizionale.

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Strumenti per creare le dApp {#dapp-tools}

**Scaffold-ETH _- Sperimenta rapidamente con Solidity utilizzando un frontend che si adatta al tuo smart contract._**

- [GitHub](https://github.com/austintgriffith/scaffold-eth)
- [Esempio di dApp](https://punkwallet.io/)

**Crea Eth App*- Crea app basate su Ethereum con un comando.***

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Strumento di FOSS per generare frontend di dapp da un'[ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Strumento di FOSS per sviluppatori di Ethereum per testarne il nodo e comporre ed eseguire chiamate RPC di debug dal browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Letture consigliate {#further-reading}

- [L'Architettura di un'applicazione Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Una guida del 2021 alle applicazioni decentralizzate](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Cosa sono le App Decentralizzate?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Introduzione allo stack di Ethereum](/developers/docs/ethereum-stack/)
- [Framework di sviluppo](/developers/docs/frameworks/)
