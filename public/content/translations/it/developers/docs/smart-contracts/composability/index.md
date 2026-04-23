---
title: "Componibilità dei contratti intelligenti"
description: Scopri come i contratti intelligenti possono essere combinati come blocchi Lego per creare dApp complesse riutilizzando componenti esistenti.
lang: it
incomplete: true
---

## Una breve introduzione {#a-brief-introduction}

I contratti intelligenti sono pubblici su Ethereum e possono essere considerati come API aperte. Non è necessario scrivere il proprio contratto intelligente per diventare uno sviluppatore di dApp, basta sapere come interagirvi. Ad esempio, puoi utilizzare i contratti intelligenti esistenti di [Uniswap](https://uniswap.exchange/swap), un exchange decentralizzato, per gestire tutta la logica di scambio di token nella tua app: non è necessario partire da zero. Dai un'occhiata ad alcuni dei loro contratti [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) e [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Cos'è la componibilità? {#what-is-composability}

La componibilità è la combinazione di componenti distinti per creare nuovi sistemi o risultati. Nello sviluppo di software, la componibilità significa che gli sviluppatori possono riutilizzare componenti software esistenti per creare nuove applicazioni. Un buon modo per comprendere la componibilità è pensare agli elementi componibili come a dei blocchi Lego. Ogni Lego può essere combinato con un altro, consentendoti di costruire strutture complesse combinando Lego diversi.

In Ethereum, ogni contratto intelligente è una sorta di Lego: puoi utilizzare i contratti intelligenti di altri progetti come elementi costitutivi per il tuo progetto. Ciò significa che non devi perdere tempo a reinventare la ruota o a costruire da zero.

## Come funziona la componibilità? {#how-does-composability-work}

I contratti intelligenti di Ethereum sono come API pubbliche, quindi chiunque può interagire con il contratto o integrarli nelle dApp per aggiungere funzionalità. La componibilità dei contratti intelligenti si basa generalmente su tre principi: modularità, autonomia e rilevabilità:

**1. Modularità**: è la capacità dei singoli componenti di eseguire un'attività specifica. In Ethereum, ogni contratto intelligente ha un caso d'uso specifico (come mostrato nell'esempio di Uniswap).

**2. Autonomia**: i componenti componibili devono essere in grado di operare in modo indipendente. Ogni contratto intelligente in Ethereum è auto-eseguibile e può funzionare senza fare affidamento su altre parti del sistema.

**3. Rilevabilità**: gli sviluppatori non possono chiamare contratti esterni o integrare librerie software nelle applicazioni se i primi non sono disponibili pubblicamente. Per impostazione predefinita, i contratti intelligenti sono open-source; chiunque può chiamare un contratto intelligente o eseguire una biforcazione di una base di codice.

## Vantaggi della componibilità {#benefits-of-composability}

### Ciclo di sviluppo più breve {#shorter-development-cycle}

La componibilità riduce il lavoro che gli sviluppatori devono svolgere durante la creazione di [dApp](/apps/#what-are-dapps). [Come afferma Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Open source significa che ogni problema deve essere risolto una sola volta."

Se esiste un contratto intelligente che risolve un problema, altri sviluppatori possono riutilizzarlo, in modo da non dover risolvere lo stesso problema. In questo modo, gli sviluppatori possono prendere librerie software esistenti e aggiungere funzionalità extra per creare nuove dApp.

### Maggiore innovazione {#greater-innovation}

La componibilità incoraggia l'innovazione e la sperimentazione perché gli sviluppatori sono liberi di riutilizzare, modificare, duplicare o integrare codice open-source per creare i risultati desiderati. Di conseguenza, i team di sviluppo dedicano meno tempo alle funzionalità di base e possono dedicare più tempo alla sperimentazione di nuove funzionalità.

### Migliore esperienza utente {#better-user-experience}

L'interoperabilità tra i componenti dell'ecosistema di Ethereum migliora l'esperienza utente. Gli utenti possono accedere a maggiori funzionalità quando le dApp integrano contratti intelligenti esterni rispetto a un ecosistema frammentato in cui le applicazioni non possono comunicare.

Useremo un esempio dal trading di arbitraggio per illustrare i vantaggi dell'interoperabilità:

Se un token viene scambiato a un prezzo più alto sull'`exchange A` rispetto all'`exchange B`, puoi sfruttare la differenza di prezzo per trarre profitto. Tuttavia, puoi farlo solo se hai abbastanza capitale per finanziare la transazione (ovvero, acquistare il token dall'`exchange B` e venderlo sull'`exchange A`).

In uno scenario in cui non hai fondi sufficienti per coprire lo scambio, un prestito lampo (flash loan) potrebbe essere l'ideale. I [prestiti lampo](/defi/#flash-loans) sono altamente tecnici, ma l'idea di base è che puoi prendere in prestito asset (senza garanzie) e restituirli all'interno di _una_ singola transazione.

Tornando al nostro esempio iniziale, un trader di arbitraggio può stipulare un grosso prestito lampo, acquistare token dall'`exchange B`, venderli sull'`exchange A`, rimborsare il capitale + gli interessi e trattenere il profitto, all'interno della stessa transazione. Questa logica complessa richiede la combinazione di chiamate a più contratti, il che non sarebbe possibile se i contratti intelligenti non avessero interoperabilità.

## Esempi di componibilità in Ethereum {#composability-in-ethereum}

### Scambi di token {#token-swaps}

Se crei una dApp che richiede che le transazioni vengano pagate in ETH, puoi consentire agli utenti di pagare in altri token ERC-20 integrando la logica di scambio di token. Il codice convertirà automaticamente il token dell'utente in ETH prima che il contratto esegua la funzione chiamata.

### Governance {#governance}

Costruire sistemi di governance su misura per una [DAO](/dao/) può essere costoso e richiedere molto tempo. Invece, potresti utilizzare un toolkit di governance open-source, come [Aragon Client](https://client.aragon.org/), per avviare la tua DAO e creare rapidamente un framework di governance.

### Gestione dell'identità {#identity-management}

Invece di creare un sistema di autenticazione personalizzato o fare affidamento su provider centralizzati, puoi integrare strumenti di identità decentralizzata (DID) per gestire l'autenticazione degli utenti. Un esempio è [SpruceID](https://www.spruceid.com/), un toolkit open-source che offre una funzionalità "Accedi con Ethereum" che consente agli utenti di autenticare le identità con un portafoglio Ethereum.

## Tutorial correlati {#related-tutorials}

- [Avvia lo sviluppo del frontend della tua dApp con create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Una panoramica su come utilizzare create-eth-app per creare app con contratti intelligenti popolari pronti all'uso._

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

- [La componibilità è innovazione](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Perché la componibilità è importante per il Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Cos'è la componibilità?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)