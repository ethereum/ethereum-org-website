---
title: Componibilità dei contratti intelligenti
description:
lang: it
incomplete: true
---

## Breve introduzione {#a-brief-introduction}

I contratti intelligenti sono pubblici su Ethereum e possono esser considerati come API aperte. Non ti serve di scrivere il tuo contratto intelligente per diventare uno sviluppatore di dapp, basta sapere come interagirvi. Ad esempio, puoi usare i contratti intelligenti esistenti di [Uniswap](https://uniswap.exchange/swap), una borsa decentralizzata, per gestire tutta la logica di scambio di token nella tua app: non devi iniziare da zero. Dai un'occhiata ai loro contratti [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) e [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Cos'è la componibilità? {#what-is-composability}

La componibilità è la combinazione di componenti distinti per creare nuovi sistemi e risultati. Nello sviluppo software, la componibilità indica che gli sviluppatori possono riutilizzare componenti software esistenti per creare nuove applicazioni. Un modo efficace per comprendere la componibilità è pensare a elementi componibili come i blocchi Lego. I vari tasselli di Lego possono essere combinati tra loro per creare strutture complesse.

Su Ethereum, ogni contratto intelligente è un Lego di qualche tipo: puoi usare i contratti intelligenti da altri progetti come blocchi di partenza per il tuo progetto. Ciò significa che non devi passare tempo a reinventare la ruota o costruire da zero.

## Come funziona la componibilità? {#how-does-composability-work}

I contratti intelligenti di Ethereum sono come API pubbliche, quindi, chiunque può interagire con il contratto o integrarlo nelle dapp per maggiori funzionalità. La componibilità dei contratti intelligenti si basa generalmente su tre principi: modularità, autonomia e scopribilità:

**1. Modularità**: la capacità dei singoli componenti di eseguire un'attività specifica. Su Ethereum, ogni contratto intelligente ha un caso d'uso specifico (come visto nell'esempio di Uniswap).

**2. Autonomia**: i componenti componibili devono poter operare indipendentemente. Ogni contratto intelligente su Ethereum è auto-eseguibile e può funzionare senza affidarsi ad altre parti del sistema.

**3. Scopribilità**: Gli sviluppatori non possono chiamare i contratti esterni o integrare librerie software nelle applicazioni se queste non sono disponibili pubblicamente. Di design, i contratti intelligenti sono open source; chiunque può chiamare un contratto intelligente o biforcare un codebase.

## Vantaggi della componibilità {#benefits-of-composability}

### Ciclo di sviluppo più breve {#shorter-development-cycle}

La componibilità riduce il lavoro degli sviluppatori per la creazione delle [dapp](/dapps/#what-are-dapps). [Come dice Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Open source significa che ogni problema va risolto una sola volta."

Se esiste un contratto intelligente che risolve un problema, altri sviluppatori possono riutilizzarlo, così che non debbano risolvere lo stesso problema. In questo modo, gli sviluppatori possono utilizzare librerie software esistenti e aggiungere funzionalità supplementari per creare nuove dapp.

### Maggiore innovazione {#greater-innovation}

La componibilità incoraggia l'innovazione e la sperimentazione, poiché gli sviluppatori sono liberi di riutilizzare, modificare, duplicare o integrare il codice open source per creare i risultati desiderati. Di conseguenza, i team di sviluppo passano meno tempo sulle funzionalità di base e possono dedicarne di più sperimentando con nuove funzionalità.

### Migliore esperienza utente {#better-user-experience}

L'interoperabilità tra i componenti dell'ecosistema di Ethereum migliora l'esperienza utente. Gli utenti possono accedere a maggiori funzionalità quando le dapp integrano i contratti intelligenti esterni, rispetto a un ecosistema frammentato in cui le applicazioni non possono comunicare.

Useremo un esempio dal trading d'arbitraggio per illustrare i benefici dell'interoperabilità:

Se un token ha un valore maggiore sull'`exchange A` rispetto all'`exchange B`, puoi sfruttare la differenza di prezzo per ottenere un profitto. Tuttavia, puoi farlo solo se hai abbastanza capitale per finanziare la transazione (ovvero acquistando il token dall'`exchange B` e vendendolo sull'`exchange A`).

In uno scenario in cui non hai fondi sufficienti per coprire lo scambio, un prestito flash potrebbe essere ideale. I [prestiti Flash](/defi/#flash-loans) sono altamente tecnici, ma l'idea di base è che puoi prendere in prestito risorse (senza garanzia) e restituirle entro _una_ transazione.

Tornando al nostro esempio iniziale, un trader d'arbitraggio può assumere un grande prestito flash, acquistare i token dall'`exchange B`, venderli sull'`exchange A`, ripagare il capitale e gli interessi e conservare il profitto, il tutto nella stessa transazione. Questa logica complessa richiede la combinazione di chiamate a più contratti, che sarebbe impossibile se i contratti intelligenti mancassero di interoperabilità.

## Esempi di componibilità su Ethereum {#composability-in-ethereum}

### Scambio di token {#token-swaps}

Se crei una dapp che richiede il pagamento delle transazioni in ETH, puoi consentire agli utenti di pagare in altri token ERC-20 integrando la logica di scambio dei token. Il codice convertirà automaticamente il token dell'utente in ETH prima che il contratto esegua la funzione chiamata.

### Governance {#governance}

Creare sistemi di governance su misura per una [DAO](/dao/) può essere costoso e richiedere tempo. Invece, potresti usare un kit di strumenti di governance open source, come [Aragon Client](https://client.aragon.org/), per spingere la tua DAO a creare rapidamente un quadro di governance.

### Gestione dell'identità {#identity-management}

Invece di creare un sistema di autenticazione personalizzato o affidarti a fornitori centralizzati, puoi integrare strumenti di identità decentralizzata (DID) per gestire l'autenticazione per gli utenti. Un esempio è [SpruceID](https://www.spruceid.com/), un kit di strumenti open source che offre una funzionalità "Accedi con Ethereum" che consente agli utenti di autenticare le identità con un portafoglio di Ethereum.

## Tutorial correlati {#related-tutorials}

- [Componibilità del Contratto: I Blocchi di Partenza dello Sviluppo di Contratti Intelligenti su Ethereum](https://www.decentlabs.io/blog/contract-composability-the-building-blocks-of-ethereum-smart-contract-development)
- [Avvia lo sviluppo del frontend della tua dapp con create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Una panoramica di come usare create-eth-app per creare app con contratti intelligenti popolari, pronti all'uso._

## Lettura consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

- [Componibilità è Innovazione](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Perché la componibilità conta per Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Cos'è la componibilità?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
