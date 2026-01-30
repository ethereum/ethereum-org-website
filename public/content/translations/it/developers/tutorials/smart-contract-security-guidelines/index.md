---
title: Linee guida di sicurezza per i contratti intelligenti
description: Elenco di controllo con le linee guida di sicurezza da tenere presenti per la creazione di una dapp
author: "Trailofbits"
tags: [ "Solidity", "Smart Contract", "sicurezza" ]
skill: intermediate
lang: it
published: 06-09-2020
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Segui questi consigli di alto livello per creare Smart Contract più sicuri.

## Linee guida di progettazione {#design-guidelines}

La progettazione del contratto deve essere discussa in anticipo, prima di scrivere la prima riga di codice.

### Documentazione e specifiche {#documentation-and-specifications}

La documentazione può essere scritta su diversi livelli e deve essere aggiornata durante l'implementazione dei contratti:

- **Una descrizione semplice in inglese del sistema**, che descriva cosa fanno i contratti e tutte le ipotesi sulla base di codice.
- **Schema e diagrammi architettonici**, incluse le interazioni del contratto e la macchina a stati del sistema. Le [stampanti di Slither](https://github.com/crytic/slither/wiki/Printer-documentation) possono aiutare a generare questi schemi.
- **Documentazione approfondita del codice**, il formato [Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) può essere usato per Solidity.

### Calcolo on-chain e off-chain {#onchain-vs-offchain-computation}

- **Mantieni quanto più codice possibile off-chain.** Mantieni ridotto il livello on-chain. Pre-elabora i dati con codice off-chain in modo tale che la verifica on-chain sia semplice. Ti serve un elenco ordinato? Ordina l'elenco esternamente alla catena, poi controlla solo l'ordine sulla catena.

### Aggiornabilità {#upgradeability}

Abbiamo discusso le diverse soluzioni di aggiornabilità nel [nostro post sul blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Fai una scelta deliberata per supportare l'aggiornabilità o non prima di scrivere codice. La decisione influirà su come strutturi il tuo codice. In generale, consigliamo:

- **Prediligi la [migrazione del contratto](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) rispetto all'aggiornabilità.** I sistemi di migrazione presentano molti vantaggi identici a quelli aggiornabili, senza i loro svantaggi.
- **Usa lo schema di separazione dei dati rispetto a quello delegatecallproxy.** Se il progetto ha una chiara separazione dell'astrazione, l'aggiornabilità che usa la separazione dei dati necessiterà solo di poche modifiche. delegatecallproxy richiede esperienza con l'EVM ed è altamente incline a errori.
- **Documenta la procedura di migrazione/aggiornamento prima della distribuzione.** Se dovrai reagire sotto pressione senza linee guida, commetterai degli errori. Scrivi in anticipo la procedura da seguire. Deve includere:
  - Le chiamate che inizializzano i nuovi contratti
  - Dove sono memorizzate le chiavi e come accedervi
  - Come controllare la distribuzione. Sviluppa e testa uno script post-distribuzione.

## Linee guida di implementazione {#implementation-guidelines}

**Punta alla semplicità.** Usa sempre la soluzione più semplice adatta al tuo scopo. Tutti i membri del team devono essere in grado di comprendere la tua soluzione.

### Composizione di funzioni {#function-composition}

L'architettura della base di codice deve rendere il codice semplice da controllare. Evita le scelte architettoniche che riducono la capacità di ragionare sulla sua correttezza.

- **Dividi la logica del tuo sistema**, tramite più contratti o raggruppando le funzioni simili (ad esempio, autenticazione, aritmetica, ...).
- **Scrivi funzioni piccole, con uno scopo chiaro.** Questo faciliterà il controllo e consentirà di testare singoli componenti.

### Ereditarietà {#inheritance}

- **Rendi gestibile l'ereditarietà.** L'ereditarietà deve essere usata per dividere la logica, tuttavia, il progetto deve puntare a ridurre la profondità e la larghezza dell'albero d'ereditarietà.
- **Usa la stampante dell'ereditarietà di [Slither](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) per verificare la gerarchia dei contratti.** La stampante dell'ereditarietà ti aiuterà a controllare la dimensione della gerarchia.

### Eventi {#events}

- **Registra tutte le operazioni cruciali.** Gli eventi aiuteranno ad eseguire il debug del contratto durante lo sviluppo e a monitorarlo dopo la distribuzione.

### Evita le trappole note {#avoid-known-pitfalls}

- **Sii consapevole dei problemi di sicurezza più comuni.** Ci sono molte risorse online per conoscere i problemi comuni, come [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) o [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Sii consapevole delle sezioni di avviso nella [documentazione di Solidity](https://docs.soliditylang.org/en/latest/).** Le sezioni di avviso ti informeranno del comportamento non ovvio del linguaggio.

### Dipendenze {#dependencies}

- **Usa librerie ben testate.** Importare codice da librerie ben testate ridurrà la probabilità di scrivere codice con bug. Se vuoi scrivere un contratto ERC20, usa [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Usa un gestore di dipendenze; evita il copia-incolla del codice.** Se ti basi su un'origine esterna, mantieni sempre il codice aggiornato rispetto all'origine.

### Test e verifica {#testing-and-verification}

- **Scrivi test unitari approfonditi.** Un'ampia suite di test è cruciale per creare software di alta qualità.
- **Scrivi controlli e proprietà personalizzati per [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) e [Manticore](https://github.com/trailofbits/manticore).** Gli strumenti automatizzati aiuteranno a garantire che il tuo contratto sia sicuro. Consulta il resto di questa guida per imparare a scrivere controlli e proprietà efficienti.
- **Usa [crytic.io](https://crytic.io/).** Crytic si integra con GitHub, fornisce l'accesso a rilevatori privati di Slither ed esegue controlli personalizzati delle proprietà da Echidna.

### Solidity {#solidity}

- **Preferisci Solidity 0.5 rispetto a 0.4 e 0.6.** Secondo noi, Solidity 0.5 è più sicuro e contiene prassi meglio integrate rispetto a 0.4. Solidity 0.6 si è dimostrato troppo instabile per la produzione e ha bisogno ancora di tempo per maturare.
- **Usa una versione stabile per compilare; usa la versione più recente per controllare gli avvisi.** Controlla che il tuo codice non presenti problemi segnalati con l'ultima versione del compilatore. Tuttavia, Solidity ha un ciclo di rilascio veloce e una storia di bug del compilatore, quindi non raccomandiamo la versione più recente per la distribuzione (vedi i [consigli sulla versione solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) di Slither).
- **Non usare l'assembly inline.** Assembly richiede esperienza con l'EVM. Non scrivere codice EVM se non hai una _piena padronanza_ dello Yellow Paper.

## Linee guida di distribuzione {#deployment-guidelines}

Una volta sviluppato e distribuito il contratto:

- **Monitora i contratti.** Guarda i registri e reagisci con prontezza in caso di compromissione del contratto o del portafoglio.
- **Aggiungi le tue informazioni di contatto a [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Questo elenco aiuta le terze parti a contattarti se viene scoperto un difetto di sicurezza.
- **Metti in sicurezza i portafogli degli utenti con privilegi.** Segui le nostre [migliori prassi](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) se archivi le chiavi in portafogli hardware.
- **Prepara un piano di risposta agli incidenti.** Considera che i tuoi contratti intelligenti possono essere compromessi. Anche se i contratti sono privi di bug, un aggressore potrebbe assumere il controllo delle chiavi del proprietario del contratto.
