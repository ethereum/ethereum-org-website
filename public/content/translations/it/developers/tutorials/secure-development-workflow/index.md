---
title: Lista di controllo per la sicurezza dei contratti intelligenti
description: Un flusso di lavoro suggerito per scrivere contratti intelligenti sicuri
author: "Trailofbits"
tags: ["contratti intelligenti", "sicurezza", "Solidity"]
skill: intermediate
breadcrumb: Lista di controllo per la sicurezza
lang: it
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista di controllo per lo sviluppo di contratti intelligenti {#smart-contract-development-checklist}

Ecco un processo ad alto livello che consigliamo di seguire durante la scrittura dei tuoi contratti intelligenti.

Controlla i problemi di sicurezza noti:

- Esamina i tuoi contratti con [Slither](https://github.com/crytic/slither). Ha più di 40 rilevatori integrati per le vulnerabilità comuni. Eseguilo a ogni check-in con nuovo codice e assicurati che ottenga un rapporto pulito (o usa la modalità triage per silenziare determinati problemi).
- Esamina i tuoi contratti con [Crytic](https://crytic.io/). Controlla 50 problemi che Slither non rileva. Crytic può anche aiutare il tuo team a rimanere aggiornato, facendo emergere facilmente i problemi di sicurezza nelle Pull Request su GitHub.

Considera le funzionalità speciali del tuo contratto:

- I tuoi contratti sono aggiornabili? Esamina il tuo codice di aggiornabilità per individuare eventuali difetti con [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) o [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Abbiamo documentato 17 modi in cui gli aggiornamenti possono andare storti.
- I tuoi contratti pretendono di essere conformi agli ERC? Controllali con [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Questo strumento identifica istantaneamente le deviazioni da sei specifiche comuni.
- Ti integri con token di terze parti? Esamina la nostra [lista di controllo per l'integrazione dei token](/developers/tutorials/token-integration-checklist/) prima di fare affidamento su contratti esterni.

Ispeziona visivamente le funzionalità di sicurezza critiche del tuo codice:

- Esamina lo stampatore [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) di Slither. Evita problemi di shadowing involontario e di linearizzazione C3.
- Esamina lo stampatore [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) di Slither. Segnala la visibilità delle funzioni e i controlli di accesso.
- Esamina lo stampatore [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) di Slither. Segnala i controlli di accesso sulle variabili di stato.

Documenta le proprietà di sicurezza critiche e usa generatori di test automatizzati per valutarle:

- Impara a [documentare le proprietà di sicurezza per il tuo codice](/developers/tutorials/guide-to-smart-contract-security-tools/). All'inizio è difficile, ma è l'attività singola più importante per ottenere un buon risultato. È anche un prerequisito per usare una qualsiasi delle tecniche avanzate in questo tutorial.
- Definisci le proprietà di sicurezza in Solidity, per l'uso con [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentrati sulla tua macchina a stati, sui controlli di accesso, sulle operazioni aritmetiche, sulle interazioni esterne e sulla conformità agli standard.
- Definisci le proprietà di sicurezza con l'[API Python di Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentrati sull'ereditarietà, sulle dipendenze delle variabili, sui controlli di accesso e su altri problemi strutturali.
- Esegui i tuoi test delle proprietà a ogni commit con [Crytic](https://crytic.io). Crytic può consumare e valutare i test delle proprietà di sicurezza in modo che tutti nel tuo team possano facilmente vedere che passano su GitHub. I test falliti possono bloccare i commit.

Infine, fai attenzione ai problemi che gli strumenti automatizzati non possono trovare facilmente:

- Mancanza di privacy: tutti gli altri possono vedere le tue transazioni mentre sono in coda nel pool
- Transazioni di front-running
- Operazioni crittografiche
- Interazioni rischiose con componenti DeFi esterni

## Chiedi aiuto {#ask-for-help}

Gli [orari di ricevimento di Ethereum](https://calendly.com/dan-trailofbits/office-hours) si tengono ogni martedì pomeriggio. Queste sessioni individuali di 1 ora sono un'opportunità per farci qualsiasi domanda tu abbia sulla sicurezza, risolvere problemi usando i nostri strumenti e ottenere feedback dagli esperti sul tuo approccio attuale. Ti aiuteremo a lavorare su questa guida.

Unisciti al nostro Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Siamo sempre disponibili nei canali #crytic ed #ethereum se hai domande.