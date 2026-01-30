---
title: Una guida agli strumenti di sicurezza per gli smart contract
description: Una panoramica di tre diverse tecniche di test e analisi del programma
author: "Trailofbits"
lang: it
tags: [ "Solidity", "smart contract", "sicurezza" ]
skill: intermediate
published: 2020-09-07
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Utilizzeremo tre distinte tecniche di test e analisi del programma:

- **Analisi statica con [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Tutti i percorsi del programma sono approssimati e analizzati contemporaneamente, tramite diverse rappresentazioni del programma (ad es., diagramma di flusso di controllo)
- **Fuzzing con [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Il codice viene eseguito con una generazione pseudo-casuale di transazioni. Il fuzzer proverà a trovare una sequenza di transazioni per violare una data proprietà.
- **Esecuzione simbolica con [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Una tecnica di verifica formale, che traduce ogni percorso di esecuzione in una formula matematica, sulla quale è possibile verificare dei vincoli.

Ogni tecnica ha vantaggi e svantaggi e sarà utile in [casi specifici](#determining-security-properties):

| Tecnica              | Strumento | Uso                            | Velocità | Bug mancati | Falsi allarmi |
| -------------------- | --------- | ------------------------------ | -------- | ----------- | ------------- |
| Analisi statica      | Slither   | CLI e script                   | secondi  | moderati    | bassi         |
| Fuzzing              | Echidna   | Proprietà di Solidity          | minuti   | bassi       | nessuno       |
| Esecuzione simbolica | Manticore | Proprietà di Solidity e script | ore      | nessuno\*   | nessuno       |

\* se tutti i percorsi sono esplorati senza timeout

**Slither** analizza i contratti in pochi secondi, tuttavia, l'analisi statica potrebbe portare a falsi allarmi e sarà meno adatta per controlli complessi (ad es., controlli aritmetici). Esegui Slither tramite l'API per un accesso facilitato ai rilevatori integrati o tramite l'API per i controlli definiti dall'utente.

**Echidna** deve essere eseguito per diversi minuti e produrrà solo veri positivi. Echidna controlla le proprietà di sicurezza fornite dall'utente, scritte in Solidity. Potrebbe tralasciare dei bug, essendo basato sull'esplorazione casuale.

**Manticore** esegue l'analisi dal "peso maggiore". Come Echidna, Manticore verifica le proprietà fornite dall'utente. Necessiterà di maggiore tempo per funzionare, ma può provare la validità di una proprietà e non segnalerà falsi allarmi.

## Flusso di lavoro suggerito {#suggested-workflow}

Inizia con i rilevatori integrati di Slither per assicurarti che non siano presenti bug semplici ora o che non saranno introdotti in seguito. Usa Slither per controllare le proprietà correlate all'ereditarietà, alle dipendenze delle variabili e ai problemi strutturali. Al crescere della base di codice, usa Echidna per testare le proprietà più complesse della macchina a stati. Rivisita Slither per sviluppare controlli personalizzati per protezioni non disponibili in Solidity, come la protezione dalla sovrascrittura di una funzione. Infine, usa Manticore per eseguire la verifica mirata di proprietà di sicurezza critiche, ad es., operazioni aritmetiche.

- Usa la CLI di Slither per individuare problemi comuni
- Usa Echidna per testare le proprietà di sicurezza di alto livello del tuo contratto
- Usa Slither per scrivere controlli statici personalizzati
- Usa Manticore quando desideri una garanzia approfondita delle proprietà di sicurezza critiche

**Una nota sui test unitari**. I test unitari sono necessari per creare software di alta qualità. Tuttavia, queste tecniche non sono le più adatte a trovare difetti di sicurezza. Sono tipicamente usati per testare i comportamenti positivi del codice (cioè, il codice funziona come previsto nel contesto normale), mentre i difetti di sicurezza tendono a risiedere in casi limite che gli sviluppatori non hanno considerato. Nel nostro studio di dozzine di revisioni di sicurezza di contratti intelligenti, la [copertura dei test unitari non ha avuto alcun effetto sul numero o sulla gravità dei difetti di sicurezza](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) che abbiamo trovato nel codice del nostro client.

## Determinare le proprietà di sicurezza {#determining-security-properties}

Per testare e verificare efficacemente il tuo codice, devi identificare le aree che richiedono attenzione. Poiché le tue risorse dedicate alla sicurezza sono limitate, è importante delimitare le parti deboli o di alto valore della tua base di codice per ottimizzare i tuoi sforzi. La modellazione delle minacce può essere d'aiuto. Considera di consultare:

- [Valutazioni rapide del rischio (Rapid Risk Assessments)](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (il nostro approccio preferito quando il tempo è poco)
- [Guida alla modellazione delle minacce dei sistemi incentrati sui dati (Guide to Data-Centric System Threat Modeling)](https://csrc.nist.gov/pubs/sp/800/154/ipd) (anche nota come NIST 800-154)
- [Modellazione delle minacce di Shostack (Shostack threat modeling)](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Uso delle asserzioni (Use of Assertions)](https://blog.regehr.org/archives/1091)

### Componenti {#components}

Sapere cosa vuoi controllare ti aiuterà anche a selezionare lo strumento più adatto.

Tra le grandi aree spesso pertinenti per gli smart contract troviamo:

- **Macchina a stati.** La maggior parte dei contratti può essere rappresentata come una macchina a stati. Considera di controllare che: (1) nessuno stato invalido sia raggiungibile, (2) se uno stato è valido, che sia raggiungibile e (3) nessuno stato intrappoli il contratto.

  - Echidna e Manticore sono gli strumenti da preferire per testare le specifiche della macchina a stati.

- **Controlli di accesso.** Se il tuo sistema ha utenti privilegiati (ad es., un proprietario, dei controller, ...) devi assicurarti che (1) ogni utente possa eseguire solo le azioni autorizzate e (2) nessun utente possa bloccare le azioni di un utente più privilegiato.

  - Slither, Echidna e Manticore possono verificare la correttezza dei controlli di accesso. Ad esempio, Slither può controllare che solo le funzioni in lista bianca non abbiano il modificatore onlyOwner. Echidna e Manticore sono utili per un controllo d'accesso più complesso, come un permesso dato solo se il contratto raggiunge un particolare stato.

- **Operazioni aritmetiche.** Controllare la solidità delle operazioni aritmetiche è fondamentale. Usare `SafeMath` ovunque è un buon passo per prevenire sovraflusso/sottoflusso, tuttavia, devi considerare anche altri difetti aritmetici, tra cui problemi di arrotondamento e difetti che intrappolano il contratto.

  - Manticore è la scelta migliore in questo caso. Echidna può essere utilizzato se l'aritmetica non rientra nell'ambito del risolutore SMT.

- **Correttezza dell'ereditarietà.** I contratti Solidity si basano molto sull'ereditarietà multipla. Sono facilmente introducibili errori quali funzioni di shadowing prive di chiamata `super` e ordini di linearizzazione c3 interpretati erroneamente.

  - Slither è lo strumento che garantisce il rilevamento di questi problemi.

- **Interazioni esterne.** I contratti interagiscono tra loro, e non ci si dovrebbe fidare di alcuni contratti esterni. Ad esempio, se il tuo contratto si basa su oracoli esterni, rimarrà sicuro se metà degli oracoli disponibili sono compromessi?

  - Manticore ed Echidna sono la scelta migliore per testare le interazioni esterne con i tuoi contratti. Manticore ha un meccanismo integrato per creare stub di contratti esterni.

- **Conformità standard.** Gli standard di Ethereum (ad es. ERC20) sono noti per i difetti a livello di progettazione. Sii consapevole delle limitazioni dello standard su cui stai costruendo.
  - Slither, Echidna e Manticore ti aiuteranno a rilevare le deviazioni da un dato standard.

### Guida rapida alla selezione degli strumenti {#tool-selection-cheatsheet}

| Componente                    | Strumenti                   | Esempi                                                                                                                                                                                                                                                                                |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Macchina a stati              | Echidna, Manticore          |                                                                                                                                                                                                                                                                                       |
| Controllo di accesso          | Slither, Echidna, Manticore | [Esercizio 2 di Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Esercizio 2 di Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operazioni aritmetiche        | Manticore, Echidna          | [Esercizio 1 di Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Esercizi 1 - 3 di Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)       |
| Correttezza dell'ereditarietà | Slither                     | [Esercizio 1 di Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                             |
| Interazioni esterne           | Manticore, Echidna          |                                                                                                                                                                                                                                                                                       |
| Conformità agli standard      | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                               |

Occorrerà controllare altri aspetti a seconda degli obiettivi, ma queste macro aree di attenzione sono un buon inizio per qualunque sistema di smart contract.

I nostri controlli pubblici contengono esempi di proprietà verificate o testate. Considera di leggere le sezioni `Test e verifiche automatizzate` dei seguenti report per verificare le proprietà di sicurezza reali:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
