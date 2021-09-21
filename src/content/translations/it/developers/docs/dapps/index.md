---
title: Introduzione alle dapp
description:
lang: it
sidebar: true
---

Un applicazione decentralizzata (dapp) è un'applicazione costruita su una rete decentralizzata che coniuga uno [Smart Contract](/en/developers/docs/smart-contracts/) con un'interfaccia utente di front end. In Ethereum gli Smart Contract sono accessibili e trasparenti (come le API aperte) quindi una dapp può anche includere Smart Contract scritto da altri.

## Prerequisiti {#prerequisites}

Prima di approfondire le dapp, è consigliabile conoscere le [basi della blockchain](/developers/docs/intro-to-ethereum/) e informarsi sulla rete Ethereum e sul perché è decentralizzata.

## Definizione di dapp {#definition-of-a-dapp}

Il codice backend di una dapp viene eseguito su una rete decentralizzata peer-to-peer. L'opposto di quello che succede con una app il cui codice backend gira su server centralizzati.

Una dapp può avere codice frontend e interfacce utente scritti in qualsiasi linguaggio (come qualsiasi app) che possono fare chiamate al backend. Inoltre, il frontend può essere ospitato su uno storage decentralizzato come [IPFS](https://ipfs.io/).

- **Decentralizzate**: sono indipendenti, nessuno ne può avere il controllo.
- **Deterministiche**: eseguono la stessa funzione a prescindere dall'ambiente dove vengono eseguite.
- **Turing compatibili**: date le risorse richieste, la dapp può eseguire qualsiasi azione.
- **Isolate**: sono eseguite in un ambiente virtuale noto come Ethereum Virtual Machine, in modo che se lo Smart Contract dovesse avere un bug, questo non impatterebbe il normale funzionamento della blockchain.

### Informazioni sugli Smart Contract {#on-smart-contracts}

Per presentare le dapp, dobbiamo introdurre gli Smart Contract, cioè il backend della dapp, in mancanza di una definizione migliore. Per una panoramica dettagliata, visita la sezione sugli [Smart Contract](/en/developers/docs/smart-contracts/).

Uno Smart Contract è codice che gira sulla blockchain Ethereum e che funziona esattamente come programmato. Una volta distribuito nella rete, non può più essere modificato. Le dapp possono essere decentralizzate perché sono controllate della logica scritta nel contratto, non da un individuo o da un'azienda. Questo significa anche gli Smart Contract devono essere progettati molto attentamente e testati accuratamente.

<!--Benefits and implications provided by Brian Gu)-->

## Vantaggi dello sviluppo delle dapp {#benefits-of-dapp-development}

- **Nessun tempo di inattività**: una volta che lo Smart Contract alla base di un'app viene distribuito nella sulla blockchain, le rete nel suo insieme sarà sempre in grado di servire i client che desiderano interagire con il contratto. Gli attori malevoli quindi non possono lanciare attacchi denial-of-service verso dapp singole.
- **Privacy**: non è necessario fornire un'identità reale per distribuire una dapp o interagirvi.
- **Resistenza alla censura**: nessuna entità sulla rete può impedire agli utenti di inviare transazioni, distribuire dapp o leggere dati dalla blockchain.
- **Completa integrità dei dati**: i dati conservati sulla blockchain sono immutabili e indiscutibili, grazie alle primitive crittografiche. Attori malevoli non possono falsificare transazioni o altri dati che sono già stati resi pubblici.
- **Calcolo trustless/comportamento verificabile** – gli Smart Contract possono essere analizzati ed è garantito che vengano eseguiti in modo prevedibile, senza la necessità di affidarsi ad un'autorità centrale. Questo non accade nei modelli tradizionali. Per esempio, quando usiamo l'online banking dobbiamo fidarci del fatto che gli istituti finanziari non abusino dei nostri dati finanziari, non manomettano record e non vengano attaccati da hacker.

## Implicazioni dello sviluppo delle dapp {#implications-of-dapp-development}

<!-- - Transparency – transactions that trigger dapp functionality are public
- Open source
- Cost of storage – contracts are often only small percentages of the dapp. They are stored on-chain and this storage needs to be paid for, so it can be expensive.
 -->

- **Manutenzione**: le dapp possono essere impegnative da mantenere perché il codice e i dati pubblicati sulla blockchain sono più difficili da modificare. È difficile per gli sviluppatori fare aggiornamenti alle dapp (o ai dati sottostanti conservati nella dapp) in seguito al rilascio, anche se vengono identificati bug o rischi alla sicurezza in una vecchia versione.
- **Overhead delle prestazioni**: l'overhead delle prestazioni è enorme e scalare è davvero difficile. Per raggiungere il livello di sicurezza, integrità, trasparenza e affidabilità al quale aspira Ethereum, ogni nodo esegue e memorizza ogni transazione. Oltre a questo, anche la Proof of Work richiede tempo. Un calcolo back-of-the-envelope pone l'overhead a circa 1.000.000 di volte quello del calcolo standard attuale.
- **Congestione della rete**: almeno nel modello attuale, se una dapp utilizza troppe risorse di calcolo, l'intera rete viene sostenuta. Attualmente, la rete è in grado di elaborare circa 10 transazioni al secondo; se le transazioni vengono inviate a un ritmo più alto, l'insieme di transazioni non confermate può "gonfiarsi" e accumularsi.
- **Esperienza utente**: potrebbe essere difficile creare esperienze intuitive. Ll'utente medio potrebbe trovare troppo difficile configurare la serie di strumenti necessaria a interagire con la blockchain in modalità veramente sicura.

  - **Centralizzazione**: soluzioni intuitive e facili da usare anche per gli sviluppatori costruite sul livello base di Ethereum potrebbero sembrare comunque servizi centralizzati: ad esempio, alcuni servizi potrebbero conservare sul server chiavi o altre informazioni sensibili, servire un frontend usando un server centralizzato o eseguire importanti logiche di business su un server centralizzato prima di scrivere sulla blockchain. Questo eliminerebbe molti (se non tutti) i vantaggi di una blockchain rispetto al modello tradizionale.<!-- ## Types of dapp

- Involving money
- Involving money and something else
- Other, including decentralized autonomous organizations

---==crwdHRulesLBB_2_BBsuleRHdwrc==

The application has to be open-source, operate autonomously, and can not be controlled by any one entity.
All data and record must be cryptographically stored in a public, decentralized blockchain.
The app must use a cryptographic token, also referred to as an App Coin, to access the application.
Tokens must be generated in order to prove the value nodes that contribute to the application.

---==crwdHRulesLBB_2_BBsuleRHdwrc==
-->## Strumenti per le dapp {#dapp-tools}

**One Click Dapp** **_: strumento FOSS per generare frontend di dapp da un'ABI._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/One-Click-Dapp/one-click-dApp)

**Etherflow** **_: strumento FOSS per sviluppatori di Ethereum, per testare il nodo, creare chiamate RPC dal browser ed eseguirne il debug._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Introduzione allo stack di Ethereum](/en/developers/docs/ethereum-stack/)
- [Framework di sviluppo](/en/developers/docs/frameworks/)
