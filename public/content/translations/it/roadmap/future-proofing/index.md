---
title: Rendere Ethereum a prova di futuro
description: "Questi aggiornamenti cementano Ethereum come lo strato fondamentale, resiliente e decentralizzato per il futuro, indipendentemente da ciò che conterrà."
lang: it
image: /images/roadmap/roadmap-future.png
alt: "Roadmap di Ethereum"
template: roadmap
---

Alcune parti della tabella di marcia non sono necessariamente richieste per ridimensionare o proteggere Ethereum sul breve termine, ma per organizzarlo per la stabilità e affidabilità future.

## Resistenza quantistica {#quantum-resistance}

Parte della [crittografia](/glossary/#cryptography) che protegge l'attuale Ethereum sarà compromessa quando l'informatica quantistica diventerà una realtà. Sebbene i computer quantistici siano probabilmente a decenni dall'essere una vera minaccia per la crittografia moderna, Ethereum ha una struttura che ne garantisce la sicurezza nei secoli a venire. Ciò significa rendere [Ethereum resistente ai computer quantistici](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) il prima possibile.

La sfida per gli sviluppatori di Ethereum è che l'attuale protocollo [proof-of-stake](/glossary/#pos) si affida a uno schema di firma molto efficiente, noto come BLS, per aggregare i voti sui [blocchi](/glossary/#block) validi. Questo schema di firme è infranto dai computer quantistici, ma le alternative resistenti a essi non sono altrettanto efficaci.

Gli [schemi di commitment “KZG”](/roadmap/danksharding/#what-is-kzg) usati in diversi punti di Ethereum per generare segreti crittografici sono noti per essere vulnerabili ai computer quantistici. Attualmente questo viene aggiorato con l'uso di "impostazioni fidate" (per le quali la cerimonia d'impostazione principale venne completata con successo nel 2023) dove tanti utenti generano casualità non decifrabile da computer quantistici. Ad ogni modo, la soluzione ideale per il lungo termine sarebbe invece la crittografia quantistica sicura. Ci sono due approcci principali che potrebbero diventare sostituti efficienti per lo schema BLS: la firma [basata su STARK](https://hackmd.io/@vbuterin/stark_aggregation) e quella [basata su reticolo](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Sono ancora attivamente in fase di ricerca e prototipazione.**

[Leggi di più su KZG e configurazioni fidate](/roadmap/danksharding#what-is-kzg)

## Un Ethereum più semplice e più efficiente {#simpler-more-efficient-ethereum}

Complexity crea per gli hacker bug e vulnerabilità che possono essere un exploit. Per questo, parte della roadmap è semplificare Ethereum e rimuovere o modificare codice rimasto appeso in giro attraverso i diversi aggiornamenti e che non è più necessario o che possa essere migliorato da qui in poi. Una base di codice più snella e più semplice, è più facile da mantere e da ragionarci sopra per gli sviluppatori.

Per rendere la [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm) più semplice ed efficiente, vengono continuamente ricercati e implementati dei miglioramenti. Questo coinvolge sia la gestione dei componenti legacy sia l'introduzione di ottimizzazioni.

**Cambiamenti implementati di recente:**

- **Revisione del calcolo del gas:** il modo in cui il [gas](/glossary/#gas) viene calcolato è stato notevolmente migliorato con l'**EIP-1559 (implementato nell'aggiornamento London, 2021)**, introducendo una commissione di base e un meccanismo di burn per una determinazione dei prezzi delle transazioni più prevedibile.
- **Restrizione di `SELFDESTRUCT`:** L'opcode `SELFDESTRUCT`, sebbene usato raramente, presentava rischi potenziali. La sua funzionalità è stata fortemente **ristretta nell'aggiornamento Dencun (marzo 2024) tramite l'EIP-6780** per mitigare i pericoli, in particolare per quanto riguarda la gestione dello stato.
- **Tipi di transazione modernizzati:** sono stati introdotti nuovi formati di transazione (ad es. tramite l'**EIP-2718** e l'**EIP-4844** per i blob nell'aggiornamento Dencun) per supportare nuove funzionalità e migliorare l'efficienza rispetto ai tipi legacy.

**Obiettivi in corso e futuri:**

- **Ulteriore gestione di `SELFDESTRUCT`:** sebbene limitata, la **potenziale rimozione completa** dell'opcode `SELFDESTRUCT` è ancora in fase di valutazione per futuri aggiornamenti al fine di semplificare ulteriormente lo stato dell'EVM. ([Maggiori informazioni sui problemi di SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Eliminazione graduale delle transazioni legacy:** sebbene i [client di Ethereum](/glossary/#consensus-client) supportino ancora i tipi di transazione più vecchi per la retrocompatibilità, l'obiettivo è incoraggiare la migrazione a tipi più recenti e **potenzialmente deprecare o rimuovere completamente il supporto per i formati più vecchi** in futuro.
- **Ricerca continua sull'efficienza del gas:** l'esplorazione continua verso **ulteriori perfezionamenti per il calcolo del gas**, includendo potenzialmente concetti come il gas multidimensionale per riflettere meglio l'utilizzo delle risorse.
- **Operazioni crittografiche ottimizzate:** sono in corso sforzi per **introdurre metodi più efficienti per l'aritmetica** alla base delle operazioni crittografiche utilizzate all'interno dell'EVM.

Ci sono aggiornamenti simili che possono essere applicati ai client dei giorni attuali. Un esempio è che i client di consenso ed esecuzione attuale usano tipi di compressione dati diversi. Sarebbe ancora più semplice e più intuitivo condividere dati fra i client se lo schema di compressione fosse univoco attraverso tutta la rete. Questo resta un'area di esplorazione.

## Progressi attuali {#current-progress}

Molti degli aggiornamenti a lungo termine per la protezione futura, in particolare la **piena resistenza quantistica per i protocolli principali, sono ancora in fase di ricerca e potrebbero richiedere diversi anni** prima di essere implementati.

Tuttavia, **sono già stati compiuti progressi significativi negli sforzi di semplificazione.** Ad esempio, modifiche chiave come la **restrizione di `SELFDESTRUCT` (EIP-6780)** e l'introduzione di **transazioni che trasportano blob (EIP-4844)** sono state implementate nell'**aggiornamento Dencun (marzo 2024)**. Il lavoro per armonizzare e semplificare lo schema di compressione dei client prosegue.

**Lettura consigliata**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Strutture di dati](/developers/docs/data-structures-and-encoding)