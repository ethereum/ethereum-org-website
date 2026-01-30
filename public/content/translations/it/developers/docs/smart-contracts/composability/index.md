---
title: Componibilità dei contratti intelligenti
description: Scopri come i contratti intelligenti possono essere combinati come mattoncini Lego per creare dApp complesse riutilizzando componenti esistenti.
lang: it
incomplete: true
---

## Una breve introduzione {#a-brief-introduction}

I contratti intelligenti sono pubblici su Ethereum e possono esser considerati come API aperte. Non ti serve di scrivere il tuo contratto intelligente per diventare uno sviluppatore di dapp, basta sapere come interagirvi. Ad esempio, puoi usare i contratti intelligenti esistenti di [Uniswap](https://uniswap.exchange/swap), un exchange decentralizzato, per gestire tutta la logica di scambio di token nella tua app: non devi iniziare da zero. Dai un'occhiata ad alcuni dei loro contratti [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) e [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Cos'è la componibilità? {#what-is-composability}

La componibilità è la combinazione di componenti distinti per creare nuovi sistemi e risultati. Nello sviluppo software, la componibilità indica che gli sviluppatori possono riutilizzare componenti software esistenti per creare nuove applicazioni. Un modo efficace per comprendere la componibilità è pensare a elementi componibili come i blocchi Lego. I vari tasselli di Lego possono essere combinati tra loro per creare strutture complesse.

Su Ethereum, ogni contratto intelligente è un Lego di qualche tipo: puoi usare i contratti intelligenti da altri progetti come blocchi di partenza per il tuo progetto. Ciò significa che non devi passare tempo a reinventare la ruota o costruire da zero.

## Come funziona la componibilità? {#how-does-composability-work}

I contratti intelligenti di Ethereum sono come API pubbliche, quindi, chiunque può interagire con il contratto o integrarlo nelle dapp per maggiori funzionalità. La componibilità dei contratti intelligenti si basa generalmente su tre principi: modularità, autonomia e scopribilità:

**1. Modularità**: la capacità dei singoli componenti di eseguire un'attività specifica. Su Ethereum, ogni contratto intelligente ha un caso d'uso specifico (come visto nell'esempio di Uniswap).

**2. Autonomia**: i componenti componibili devono poter operare indipendentemente. Ogni contratto intelligente su Ethereum è auto-eseguibile e può funzionare senza affidarsi ad altre parti del sistema.

**3. Rintracciabilità**: gli sviluppatori non possono chiamare i contratti esterni o integrare librerie software nelle applicazioni se queste non sono disponibili pubblicamente. Di design, i contratti intelligenti sono open source; chiunque può chiamare un contratto intelligente o biforcare un codebase.

## Vantaggi della componibilità {#benefits-of-composability}

### Ciclo di sviluppo più breve {#shorter-development-cycle}

La componibilità riduce il lavoro che gli sviluppatori devono fare durante la creazione di [dApp](/apps/#what-are-dapps). [Come dice Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "L'open source significa che ogni problema deve essere risolto una sola volta."

Se esiste un contratto intelligente che risolve un problema, altri sviluppatori possono riutilizzarlo, così che non debbano risolvere lo stesso problema. In questo modo, gli sviluppatori possono utilizzare librerie software esistenti e aggiungere funzionalità supplementari per creare nuove dapp.

### Maggiore innovazione {#greater-innovation}

La componibilità incoraggia l'innovazione e la sperimentazione, poiché gli sviluppatori sono liberi di riutilizzare, modificare, duplicare o integrare il codice open source per creare i risultati desiderati. Di conseguenza, i team di sviluppo passano meno tempo sulle funzionalità di base e possono dedicarne di più sperimentando con nuove funzionalità.

### Migliore esperienza utente {#better-user-experience}

L'interoperabilità tra i componenti dell'ecosistema di Ethereum migliora l'esperienza utente. Gli utenti possono accedere a maggiori funzionalità quando le dapp integrano i contratti intelligenti esterni, rispetto a un ecosistema frammentato in cui le applicazioni non possono comunicare.

Useremo un esempio dal trading d'arbitraggio per illustrare i benefici dell'interoperabilità:

Se un token è scambiato a un prezzo più alto sull'`exchange A` rispetto all'`exchange B`, puoi sfruttare la differenza di prezzo per ottenere un profitto. Tuttavia, puoi farlo solo se hai abbastanza capitale per finanziare la transazione (ovvero acquistando il token dall'`exchange B` e vendendolo sull'`exchange A`).

In uno scenario in cui non hai fondi sufficienti per coprire lo scambio, un prestito flash potrebbe essere ideale. I [prestiti flash](/defi/#flash-loans) sono molto tecnici, ma l'idea di base è che puoi prendere in prestito asset (senza garanzie collaterali) e restituirli all'interno di _una_ transazione.

Tornando al nostro esempio iniziale, un trader d'arbitraggio può contrarre un grosso prestito flash, acquistare token dall'`exchange B`, venderli sull'`exchange A`, rimborsare il capitale + gli interessi e trattenere il profitto, il tutto all'interno della stessa transazione. Questa logica complessa richiede la combinazione di chiamate a più contratti, che sarebbe impossibile se i contratti intelligenti mancassero di interoperabilità.

## Esempi di componibilità in Ethereum {#composability-in-ethereum}

### Scambi di token {#token-swaps}

Se crei una dapp che richiede il pagamento delle transazioni in ETH, puoi consentire agli utenti di pagare in altri token ERC-20 integrando la logica di scambio dei token. Il codice convertirà automaticamente il token dell'utente in ETH prima che il contratto esegua la funzione chiamata.

### Governance {#governance}

Creare sistemi di governance su misura per una [DAO](/dao/) può essere costoso e richiedere tempo. In alternativa, potresti usare un toolkit di governance open-source, come [Aragon Client](https://client.aragon.org/), per avviare la tua DAO e creare rapidamente un framework di governance.

### Gestione dell'identità {#identity-management}

Invece di creare un sistema di autenticazione personalizzato o affidarti a fornitori centralizzati, puoi integrare strumenti di identità decentralizzata (DID) per gestire l'autenticazione per gli utenti. Un esempio è [SpruceID](https://www.spruceid.com/), un toolkit open-source che offre una funzionalità "Accedi con Ethereum" che permette agli utenti di autenticare le proprie identità con un portafoglio Ethereum.

## Guide correlate {#related-tutorials}

- [Avvia lo sviluppo del frontend della tua dApp con create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Una panoramica su come usare create-eth-app per creare app con contratti intelligenti popolari pronti all'uso._

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_

- [La componibilità è innovazione](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Perché la componibilità è importante per il Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Cos'è la componibilità?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
