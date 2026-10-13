---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Scopri l'aggiornamento del protocollo Hegotá"
lang: it
template: upgrade
---

Hegotá è l'aggiornamento della rete [Ethereum](/) che dovrebbe seguire [Glamsterdam](/roadmap/glamsterdam/). Prende il nome dalla combinazione di "Bogotá" (aggiornamento del livello di esecuzione, che prende il nome da una precedente sede della Devcon) e "Heze" (aggiornamento del livello di consenso, che prende il nome da una stella).

Hegotá è nelle prime fasi di pianificazione. La sua funzionalità principale è stata scelta e da allora è stata programmata una seconda modifica, ma il resto dell'ambito è ancora in fase di definizione e non sono state fissate date.

## Funzionalità principale: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Le liste di inclusione applicate dalla scelta del fork (Fork-choice enforced inclusion lists - FOCIL, o EIP-7805) riguardano la [resistenza alla censura](/roadmap/security/#censorship-resistance): assicurarsi che una transazione valida entri in un blocco anche se le persone che costruiscono i blocchi preferirebbero tralasciarla.

Oggi un singolo [validatore](/glossary/#validator) costruisce ogni blocco e decide quali transazioni contiene. Chiunque riesca a influenzare un numero sufficiente di costruttori di blocchi può quindi ritardare una transazione, e un utente non ha alcun modo per forzare la situazione se non aspettare e sperare.

FOCIL distribuisce questa decisione su molti validatori. Ciascun comitato propone una lista di transazioni che dovrebbero essere incluse, e le regole del protocollo obbligano il costruttore di blocchi a rispettare tali liste. Censurare una transazione smette di essere qualcosa che una singola parte può fare da sola.

## Transazioni frame {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Le transazioni frame (EIP-8141) permettono a un [account](/glossary/#account) di decidere autonomamente cosa conta come una transazione valida, invece che il protocollo insista su un unico schema di firma fisso.

Oggi ogni transazione viene autorizzata allo stesso modo: una firma, da una chiave. Gli [account smart contract](/roadmap/account-abstraction/) aggirano il problema instradando le transazioni attraverso un'infrastruttura aggiuntiva, il che costa gas e aggiunge parti mobili che possono guastarsi.

Una transazione frame sposta il controllo all'interno dell'account stesso. L'account esegue la propria logica di verifica, quindi le funzionalità che attualmente necessitano di quell'infrastruttura aggiuntiva — recupero sociale, limiti di spesa, richiesta di più approvazioni, permettere a qualcun altro di pagare il gas — diventano elementi supportati direttamente dal protocollo.

Poiché l'account sceglie le proprie regole, può anche scegliere uno schema di firma che un computer quantistico non potrebbe violare. Questo lo rende un passo verso la [resistenza quantistica](/roadmap/security/#quantum-resistance) oltre che verso portafogli migliori.

## Cos'altro c'è in Hegotá {#scope}

Non è ancora stato deciso. FOCIL e le transazioni frame sono le due modifiche programmate finora; ne sono state proposte dozzine di altre e nessuna di esse è definitiva. Questa pagina rimarrà breve finché l'ambito non si sarà consolidato — per lo stato attuale della discussione, consulta le risorse di seguito.

## Letture consigliate {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — stato in tempo reale di ogni proposta
- [Meta EIP di Hegotá (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Specifica tecnica dell'EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Specifica tecnica dell'EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Roadmap di Ethereum](/roadmap/)
