---
title: Una guida agli strumenti di sicurezza per i contratti intelligenti
description: Una panoramica di tre diverse tecniche di test e analisi dei programmi
author: "Trailofbits"
lang: it
tags: ["Solidity", "contratti intelligenti", "sicurezza"]
skill: intermediate
breadcrumb: Strumenti di sicurezza
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Utilizzeremo tre tecniche distinte di test e analisi dei programmi:

- **Analisi statica con [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Tutti i percorsi del programma vengono approssimati e analizzati contemporaneamente, attraverso diverse presentazioni del programma (es. grafo del flusso di controllo).
- **Fuzzing con [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Il codice viene eseguito con una generazione pseudo-casuale di transazioni. Il fuzzer cercherà di trovare una sequenza di transazioni per violare una determinata proprietà.
- **Esecuzione simbolica con [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Una tecnica di verifica formale, che traduce ogni percorso di esecuzione in una formula matematica, su cui possono essere verificati dei vincoli.

Ogni tecnica presenta vantaggi e insidie, e sarà utile in [casi specifici](#determining-security-properties):

| Tecnica | Strumento | Utilizzo | Velocità | Bug mancati | Falsi allarmi |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Analisi Statica | Slither | CLI e script | secondi | moderati | bassi |
| Fuzzing | Echidna | Proprietà di Solidity | minuti | bassi | nessuno |
| Esecuzione Simbolica | Manticore | Proprietà di Solidity e script | ore | nessuno\* | nessuno |

\* se tutti i percorsi vengono esplorati senza timeout

**Slither** analizza i contratti in pochi secondi, tuttavia, l'analisi statica potrebbe portare a falsi allarmi e sarà meno adatta per controlli complessi (es. controlli aritmetici). Esegui Slither tramite l'API per un accesso immediato ai rilevatori integrati o tramite l'API per controlli definiti dall'utente.

**Echidna** deve essere eseguito per diversi minuti e produrrà solo veri positivi. Echidna verifica le proprietà di sicurezza fornite dall'utente, scritte in Solidity. Potrebbe mancare dei bug poiché si basa sull'esplorazione casuale.

**Manticore** esegue l'analisi "più intensiva". Come Echidna, Manticore verifica le proprietà fornite dall'utente. Avrà bisogno di più tempo per l'esecuzione, ma può dimostrare la validità di una proprietà e non segnalerà falsi allarmi.

## Flusso di lavoro suggerito {#suggested-workflow}

Inizia con i rilevatori integrati di Slither per assicurarti che non siano presenti bug semplici ora o che non vengano introdotti in seguito. Usa Slither per verificare le proprietà relative all'ereditarietà, alle dipendenze delle variabili e ai problemi strutturali. Man mano che la base di codice cresce, usa Echidna per testare proprietà più complesse della macchina a stati. Ritorna a Slither per sviluppare controlli personalizzati per protezioni non disponibili in Solidity, come la protezione contro la sovrascrittura di una funzione. Infine, usa Manticore per eseguire una verifica mirata delle proprietà di sicurezza critiche, ad es. le operazioni aritmetiche.

- Usa la CLI di Slither per individuare i problemi comuni
- Usa Echidna per testare le proprietà di sicurezza di alto livello del tuo contratto
- Usa Slither per scrivere controlli statici personalizzati
- Usa Manticore quando desideri una garanzia approfondita delle proprietà di sicurezza critiche

**Una nota sui test unitari**. I test unitari sono necessari per creare software di alta qualità. Tuttavia, queste tecniche non sono le più adatte per trovare falle di sicurezza. In genere vengono utilizzate per testare i comportamenti positivi del codice (ovvero, il codice funziona come previsto nel contesto normale), mentre le falle di sicurezza tendono a risiedere in casi limite che gli sviluppatori non hanno considerato. Nel nostro studio su dozzine di revisioni di sicurezza dei contratti intelligenti, [la copertura dei test unitari non ha avuto alcun effetto sul numero o sulla gravità delle falle di sicurezza](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) che abbiamo trovato nel codice dei nostri clienti.

## Determinare le proprietà di sicurezza {#determining-security-properties}

Per testare e verificare efficacemente il tuo codice, devi identificare le aree che richiedono attenzione. Poiché le risorse spese per la sicurezza sono limitate, definire l'ambito delle parti deboli o di alto valore della tua base di codice è importante per ottimizzare i tuoi sforzi. La modellazione delle minacce può aiutare. Prendi in considerazione la revisione di:

- [Valutazioni rapide del rischio](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (il nostro approccio preferito quando il tempo scarseggia)
- [Guida alla modellazione delle minacce dei sistemi incentrati sui dati](https://csrc.nist.gov/pubs/sp/800/154/ipd) (nota anche come NIST 800-154)
- [Modellazione delle minacce di Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Uso delle asserzioni](https://blog.regehr.org/archives/1091)

### Componenti {#components}

Sapere cosa si desidera controllare aiuterà anche a selezionare lo strumento giusto.

Le ampie aree che sono frequentemente rilevanti per i contratti intelligenti includono:

- **Macchina a stati.** La maggior parte dei contratti può essere rappresentata come una macchina a stati. Considera di verificare che (1) non possa essere raggiunto alcuno stato non valido, (2) se uno stato è valido possa essere raggiunto, e (3) nessuno stato intrappoli il contratto.

  - Echidna e Manticore sono gli strumenti da preferire per testare le specifiche della macchina a stati.

- **Controlli di accesso.** Se il tuo sistema ha utenti privilegiati (es. un proprietario, controllori, ...) devi assicurarti che (1) ogni utente possa eseguire solo le azioni autorizzate e (2) nessun utente possa bloccare le azioni di un utente più privilegiato.

  - Slither, Echidna e Manticore possono verificare la correttezza dei controlli di accesso. Ad esempio, Slither può verificare che solo le funzioni in whitelist siano prive del modificatore `onlyOwner`. Echidna e Manticore sono utili per controlli di accesso più complessi, come un permesso concesso solo se il contratto raggiunge un determinato stato.

- **Operazioni aritmetiche.** Verificare la solidità delle operazioni aritmetiche è fondamentale. Usare `SafeMath` ovunque è un buon passo per prevenire overflow/underflow, tuttavia, devi comunque considerare altre falle aritmetiche, inclusi problemi di arrotondamento e falle che intrappolano il contratto.

  - Manticore è la scelta migliore in questo caso. Echidna può essere utilizzato se l'aritmetica è fuori dall'ambito del risolutore SMT.

- **Correttezza dell'ereditarietà.** I contratti Solidity si basano pesantemente sull'ereditarietà multipla. Errori come una funzione di shadowing a cui manca una chiamata `super` e un ordine di linearizzazione c3 interpretato male possono essere facilmente introdotti.

  - Slither è lo strumento per garantire il rilevamento di questi problemi.

- **Interazioni esterne.** I contratti interagiscono tra loro e alcuni contratti esterni non dovrebbero essere considerati attendibili. Ad esempio, se il tuo contratto si affida a oracoli esterni, rimarrà sicuro se metà degli oracoli disponibili viene compromessa?

  - Manticore ed Echidna sono la scelta migliore per testare le interazioni esterne con i tuoi contratti. Manticore ha un meccanismo integrato per creare stub dei contratti esterni.

- **Conformità agli standard.** Gli standard di Ethereum (es. ERC20) hanno una storia di falle nella loro progettazione. Sii consapevole delle limitazioni dello standard su cui stai costruendo.
  - Slither, Echidna e Manticore ti aiuteranno a rilevare le deviazioni da un determinato standard.

### Cheat sheet per la selezione degli strumenti {#tool-selection-cheatsheet}

| Componente | Strumenti | Esempi |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Macchina a stati | Echidna, Manticore |
| Controllo di accesso | Slither, Echidna, Manticore | [Esercizio 2 di Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Esercizio 2 di Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operazioni aritmetiche | Manticore, Echidna | [Esercizio 1 di Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Esercizi 1 - 3 di Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Correttezza dell'ereditarietà | Slither | [Esercizio 1 di Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Interazioni esterne | Manticore, Echidna |
| Conformità agli standard | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Altre aree dovranno essere controllate a seconda dei tuoi obiettivi, ma queste aree di interesse generali sono un buon punto di partenza per qualsiasi sistema di contratti intelligenti.

I nostri audit pubblici contengono esempi di proprietà verificate o testate. Considera di leggere le sezioni `Automated Testing and Verification` dei seguenti report per esaminare le proprietà di sicurezza del mondo reale:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)