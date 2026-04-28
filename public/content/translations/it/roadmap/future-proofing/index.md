---
title: Rendere Ethereum a prova di futuro
description: Questi aggiornamenti consolidano Ethereum come livello di base resiliente e decentralizzato per il futuro, qualunque cosa possa riservare.
lang: it
image: /images/roadmap/roadmap-future.png
alt: "Piano d'azione di Ethereum"
template: roadmap
---

Alcune parti del piano d'azione non sono necessariamente richieste per la scalabilità o la sicurezza di Ethereum a breve termine, ma preparano Ethereum per la stabilità e l'affidabilità in un futuro lontano.

## Resistenza quantistica {#quantum-resistance}

Parte della [crittografia](/glossary/#cryptography) che protegge l'attuale Ethereum sarà compromessa quando l'informatica quantistica diventerà realtà. Sebbene i computer quantistici siano probabilmente a decenni di distanza dall'essere una vera minaccia per la crittografia moderna, Ethereum è in fase di costruzione per essere sicuro per i secoli a venire. Ciò significa rendere [Ethereum resistente ai computer quantistici](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) il prima possibile.

La sfida che gli sviluppatori di Ethereum devono affrontare è che l'attuale protocollo di [prova di stake](/glossary/#pos) si basa su uno schema di firma molto efficiente noto come BLS per aggregare i voti sui [blocchi](/glossary/#block) validi. Questo schema di firma viene violato dai computer quantistici, ma le alternative resistenti ai quanti non sono altrettanto efficienti.

Gli [schemi di impegno "KZG"](/roadmap/danksharding/#what-is-kzg) utilizzati in diversi punti di Ethereum per generare segreti crittografici sono noti per essere vulnerabili ai quanti. Attualmente, questo problema viene aggirato utilizzando "configurazioni attendibili" (trusted setup, per le quali la cerimonia di configurazione principale è stata completata con successo nel 2023), in cui molti utenti hanno generato casualità che non può essere decodificata da un computer quantistico. Tuttavia, la soluzione ideale a lungo termine sarebbe invece quella di incorporare una crittografia sicura contro i quanti. Ci sono due approcci principali che potrebbero diventare sostituti efficienti per lo schema BLS: la firma [basata su STARK](https://hackmd.io/@vbuterin/stark_aggregation) e quella [basata su reticoli](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Questi sono ancora in fase di ricerca e prototipazione attiva**.

[Scopri di più su KZG e le configurazioni attendibili](/roadmap/danksharding#what-is-kzg)

## Un Ethereum più semplice ed efficiente {#simpler-more-efficient-ethereum}

La complessità crea opportunità per bug o vulnerabilità che possono essere sfruttati dagli aggressori. Pertanto, parte del piano d'azione consiste nel semplificare Ethereum e rimuovere o modificare il codice che è rimasto in giro attraverso vari aggiornamenti ma non è più necessario o può ora essere migliorato. Una base di codice più snella e semplice è più facile da mantenere e comprendere per gli sviluppatori.

Per rendere la [macchina virtuale di Ethereum (EVM)](/developers/docs/evm) più semplice ed efficiente, i miglioramenti vengono continuamente ricercati e implementati. Ciò comporta sia l'affrontare i componenti legacy sia l'introduzione di ottimizzazioni.

**Modifiche recenti implementate:**

- **Revisione del calcolo del gas:** Il modo in cui viene calcolato il [gas](/glossary/#gas) è stato notevolmente migliorato con l'**EIP-1559 (implementato nell'aggiornamento London, 2021)**, introducendo una commissione di base e un meccanismo di bruciatura per prezzi delle transazioni più prevedibili.
- **Restrizione di `SELFDESTRUCT`:** L'opcode `SELFDESTRUCT`, sebbene usato raramente, presentava potenziali rischi. La sua funzionalità è stata pesantemente **limitata nell'aggiornamento Dencun (marzo 2024) tramite l'EIP-6780** per mitigare i pericoli, specialmente per quanto riguarda la gestione dello stato.
- **Tipi di transazione modernizzati:** Sono stati introdotti nuovi formati di transazione (ad es., tramite **EIP-2718** ed **EIP-4844** per i blob nell'aggiornamento Dencun) per supportare nuove funzionalità e migliorare l'efficienza rispetto ai tipi legacy.

**Obiettivi in corso e futuri:**

- **Ulteriore gestione di `SELFDESTRUCT`:** Sebbene limitata, la **potenziale rimozione completa** dell'opcode `SELFDESTRUCT` è ancora presa in considerazione per futuri aggiornamenti al fine di semplificare ulteriormente lo stato dell'EVM. ([Maggiori informazioni sui problemi di SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Eliminazione graduale delle transazioni legacy:** Sebbene i [client di Ethereum](/glossary/#consensus-client) supportino ancora i vecchi tipi di transazione per la retrocompatibilità, l'obiettivo è incoraggiare la migrazione verso tipi più recenti e **potenzialmente deprecare o rimuovere completamente il supporto per i formati più vecchi** in futuro.
- **Ricerca continua sull'efficienza del gas:** Continua l'esplorazione di **ulteriori perfezionamenti per il calcolo del gas**, includendo potenzialmente concetti come il gas multidimensionale per riflettere meglio l'utilizzo delle risorse.
- **Operazioni crittografiche ottimizzate:** Sono in corso sforzi per **introdurre metodi più efficienti per l'aritmetica** alla base delle operazioni crittografiche utilizzate all'interno dell'EVM.

Allo stesso modo, ci sono aggiornamenti che possono essere apportati ad altre parti degli attuali client di Ethereum. Un esempio è che gli attuali client di esecuzione e client di consenso utilizzano un diverso tipo di compressione dei dati. Sarà molto più facile e intuitivo condividere i dati tra i client quando lo schema di compressione sarà unificato in tutta la rete. Questa rimane un'area di esplorazione.

## Progressi attuali {#current-progress}

Molti degli aggiornamenti a lungo termine per rendere il sistema a prova di futuro, in particolare **la completa resistenza quantistica per i protocolli principali, sono ancora in fase di ricerca e potrebbero mancare diversi anni** prima di essere implementati.

Tuttavia, **sono già stati compiuti progressi significativi negli sforzi di semplificazione.** Ad esempio, modifiche chiave come la **restrizione di `SELFDESTRUCT` (EIP-6780)** e l'introduzione di **transazioni che trasportano blob (EIP-4844)** sono state implementate nell'**aggiornamento Dencun (marzo 2024)**. Continua anche il lavoro sull'armonizzazione degli schemi di compressione dei client e su altri miglioramenti dell'efficienza.

**Letture di approfondimento**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Strutture dati](/developers/docs/data-structures-and-encoding)