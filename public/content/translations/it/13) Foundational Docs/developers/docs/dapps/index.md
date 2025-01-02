---
title: Introduzione alle dapp
description:
lang: it
---

Un'applicazione decentralizzata (dapp) è un'applicazione costruita su una rete decentralizzata che combina un [contratto intelligente](/developers/docs/smart-contracts/) e l'interfaccia utente di un frontend. Su Ethereum, i contratti intelligenti sono accessibili e trasparenti (come le API aperte), quindi la tua dapp può persino includere un contratto intelligente, già scritto da qualcun altro.

## Prerequisiti {#prerequisites}

Prima di approfondire le dapp, è consigliabile conoscere le [basi della blockchain](/developers/docs/intro-to-ethereum/) e informarsi sulla rete Ethereum e sul perché è decentralizzata.

## Definizione di dapp {#definition-of-a-dapp}

Il codice backend di una dapp viene eseguito su una rete decentralizzata peer-to-peer. L'opposto di quello che succede con una app il cui codice backend gira su server centralizzati.

Una dapp può avere codice frontend e interfacce utente scritti in qualsiasi linguaggio (come qualsiasi app) che possono fare chiamate al backend. Inoltre, il frontend può essere ospitato su uno storage decentralizzato come [IPFS](https://ipfs.io/).

- **Decentralizzate** - Le dApp operano su Ethereum, una piattaforma pubblica decentralizzata dove nessun individuo o gruppo detiene il controllo
- **Deterministiche**: eseguono la stessa funzione a prescindere dall'ambiente dove vengono eseguite.
- **Turing complete** - Le dApp possono eseguire qualsiasi azione una volta fornite le risorse necessarie
- **Isolate** - Le dApp sono eseguite in un ambiente virtuale, noto come la Macchina Virtuale di Ethereum, così che se il contratto intelligente contiene un bug, non ostacolerà il normale funzionamento della rete della blockchain

### Sui contratti intelligenti {#on-smart-contracts}

Per introdurre le dapp, dobbiamo introdurre i contratti intelligenti: la backend di una dapp, in mancanza di un termine migliore. Per una panoramica dettagliata, consulta la nostra sezione sui [contratti intelligenti](/developers/docs/smart-contracts/).

Un contratto intelligente è codice che risiede sulla blockchain di Ethereum e opera esattamente come programmato. Una volta distribuiti i contratti intelligenti sulla rete, non puoi modificarli. Le dapp possono essere decentralizzate perché sono controllate della logica scritta nel contratto, non da un individuo o da un'azienda. Questo significa anche che devi progettare i tuoi contratti molto attenteamente e testarli accuratamente.

## Vantaggi dello sviluppo delle dapp {#benefits-of-dapp-development}

- **Nessun tempo di inattività** – Una volta distribuito il contratto intelligente sulla blockchain, l'intera rete potrà sempre servire i clienti che cercano di interagire con il contratto. Gli attori malevoli quindi non possono lanciare attacchi denial-of-service verso dapp singole.
- **Privacy**: non è necessario fornire un'identità reale per distribuire una dapp o interagirvi.
- **Resistenza alla censura**: nessuna entità sulla rete può impedire agli utenti di inviare transazioni, distribuire dapp o leggere dati dalla blockchain.
- **Completa integrità dei dati**: i dati conservati sulla blockchain sono immutabili e indiscutibili, grazie alle primitive crittografiche. Attori malevoli non possono falsificare transazioni o altri dati che sono già stati resi pubblici.
- **Calcolo senza fiducia/comportamento verificabile** – I contratti intelligenti sono analizzabili e, l'esecuzione in modi prevedibili è garantita, senza il bisogno di affidarsi a un'autorità centrale. Questo non accade nei modelli tradizionali. Per esempio, quando usiamo l'online banking dobbiamo fidarci del fatto che gli istituti finanziari non abusino dei nostri dati finanziari, non manomettano record e non vengano attaccati da hacker.

## Svantaggi dello sviluppo di dApp {#drawbacks-of-dapp-development}

- **Manutenzione**: le dapp possono essere impegnative da mantenere perché il codice e i dati pubblicati sulla blockchain sono più difficili da modificare. Per gli sviluppatori, è difficile apportare degli aggiornamenti alle loro dApp (o ai dati sottostanti, memorizzati da una dApp) una volta distribuite, anche se vengono individuati dei bug o rischi di sicurezza in una versione precedente.
- **Overhead delle prestazioni**: l'overhead delle prestazioni è enorme e scalare è davvero difficile. Per raggiungere il livello di sicurezza, integrità, trasparenza e affidabilità al quale aspira Ethereum, ogni nodo esegue e memorizza ogni transazione. Oltre a ciò, anche il consenso di proof-of-stake richiede tempo.
- **Congestione della rete**: quando una dApp utilizza troppe risorse di calcolo, l'intera rete viene sostenuta. Attualmente, la rete è in grado di elaborare circa 10 transazioni al secondo; se le transazioni vengono inviate a un ritmo più alto, l'insieme di transazioni non confermate può "gonfiarsi" e accumularsi.
- **Esperienza utente**: potrebbe essere difficile creare esperienze intuitive. L'utente medio potrebbe trovare troppo difficile configurare la serie di strumenti necessaria a interagire con la blockchain in modo veramente sicuro.
- **Centralizzazione**: soluzioni facili da utilizzare e compatibili con gli sviluppatori costruite sullo strato base di Ethereum potrebbero finire per assomigliare comunque a servizi centralizzati. Ad esempio, tali servizi potrebbero memorizzare le chiavi o altre informazioni sensibili sul lato del server, servire un frontend utilizzando un server centralizzato oppure utilizzare un'importante logica commerciale su un server centralizzato prima di scrivere sulla blockchain. La centralizzazione annulla molti (se non tutti) i vantaggi della blockchain rispetto al modello tradizionale.

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Strumenti per creare le dApp {#dapp-tools}

**Scaffold-ETH _ Sperimenta rapidamente con Solidity utilizzando un frontend che si adatta al tuo contratto intelligente._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Esempio di dApp](https://punkwallet.io/)

**Crea Eth App_- Crea app basate su Ethereum con un comando._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Strumento di FOSS per generare frontend di dapp da un'[ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Strumento di FOSS per sviluppatori di Ethereum per testarne il nodo e comporre ed eseguire chiamate RPC di debug dal browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK in ogni linguaggio, contratti intelligenti, strumenti e infrastruttura per lo sviluppo web3._**

- [Home page](https://thirdweb.com/)
- [Documentazione](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint: _piattaforma di sviluppo Web3 per imprese per distribuire i contratti intelligenti, abilitare i pagamenti con carta di credito e tra catene e utilizzare le API per creare, distribuire, vendere, memorizzare e modificare i NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentazione](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Letture consigliate {#further-reading}

- [Esplora le dapp](/dapps)
- [L'Architettura di un'applicazione Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Una guida del 2021 alle applicazioni decentralizzate](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Cosa sono le App Decentralizzate?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapp popolari](https://www.alchemy.com/dapps) - _Alchemy_

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Introduzione allo stack di Ethereum](/developers/docs/ethereum-stack/)
- [Quadri di sviluppo](/developers/docs/frameworks/)
