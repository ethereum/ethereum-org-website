---
title: Elenco di controllo di sicurezza per gli smart contract
description: Un flusso di lavoro suggerito per scrivere smart contract sicuri
author: "Trailofbits"
tags:
  - "smart Contract"
  - "sicurezza"
  - "Solidity"
skill: intermediate
lang: it
published: 2020-09-07
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Elenco di controllo per lo sviluppo di smart contract {#smart-contract-development-checklist}

Ecco un processo d'alto livello che consigliamo di seguire per la scrittura degli smart contract.

Verifica i problemi di sicurezza noti:

- Revisiona i tuoi contratti con [Slither](https://github.com/crytic/slither). Ha oltre 40 rilevatori integrati per le vulnerabilità comuni. Eseguilo a ogni check-in con il nuovo codice e assicurati di ottenere un report pulito (o usa la modalità triage per silenziare certi problemi).
- Revisiona i tuoi contratti con [Crytic](https://crytic.io/). Controlla 50 problemi non verificati da Slither. Crytic può aiutare il tuo team a prevenire problemi, facendo affiorare facilmente le questioni di sicurezza nelle richieste pull su GitHub.

Considera le funzionalità speciali del tuo contratto:

- I tuoi contratti sono aggiornabili? Revisiona il tuo codice di aggiornabilità per i difetti con [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) o [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Abbiamo documentato 17 modi in cui gli aggiornamenti possono andare male.
- I tuoi contratti pretendono di esser conformi agli ERC? Controllali con [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Questo strumento identifica istantaneamente le deviazioni da sei specifiche comuni.
- Integri con token di terze parti? Revisiona il nostro [elenco di controllo di integrazione del token](/developers/tutorials/token-integration-checklist/) prima di affidarti a contratti esterni.

Ispeziona visivamente le funzionalità di sicurezza critiche del tuo codice:

- Revisiona l'editore di Slither, [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph). Evita shadowing involontari e problemi di linearizzazione di C3.
- Revisiona l'editore di Slither, [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary). Segnala la visibilità della funzione e i controlli d'accesso.
- Revisiona l'editore di Slither, [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization). Segnala i controlli d'accesso sulle variabili di stato.

Documenta le proprietà di sicurezza critiche e usa generatori di test automatizzati per valutarle:

- Impara a [documentare le proprietà di sicurezza per il tuo codice](/developers/tutorials/guide-to-smart-contract-security-tools/). All'inizio è difficile, ma è l'attività in assoluto più importante per ottenere un buon risultato. È anche un prerequisito per usare qualsiasi tecnica avanzata in questo tutorial.
- Definisci le proprietà di sicurezza in Solidity, per l'uso con [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentrati sulla tua macchina di stato, controlli d'accesso, operazioni aritmetiche, interazioni esterne e conformità agli standard.
- Definisci le proprietà di sicurezza con l'[API di Python di Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentrati su eredità, dipendenze della variabile, controlli d'accesso e altri problemi strutturali.
- Esegui i tuoi test di proprietà a ogni commit con [Crytic](https://crytic.io). Crytic può consumare e valutare i test di proprietà di sicurezza in modo che tutti nel team possano facilmente vedere che passano su GitHub. I testi falliti possono bloccare i commit.

Infine, ricordati dei problemi che gli strumenti automatizzati non possono facilmente trovare:

- Mancanza di privacy: tutti gli altri possono vedere le tue transazioni mentre sono accodate nel pool
- Transazioni in esecuzione frontale
- Operazioni crittografiche
- Interazioni rischiose con componenti esterni della DeFi

## Chiedi aiuto {#ask-for-help}

[Orari lavorativi di Ethereum](https://calendly.com/dan-trailofbits/ethereum-office-hours): ogni martedì pomeriggio. Queste sessioni 1 a 1 di un'ora sono un'opportunità per farci domande sulla sicurezza, la risoluzione dei problemi usando i nostri strumenti e la ricezione di feedback dagli esperti sul tuo approccio corrente. Ti aiuteremo ad arrivare in fondo a questa guida.

Unisciti al nostro Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Siamo sempre disponibili nei canali #crytic ed #ethereum se hai domande.
