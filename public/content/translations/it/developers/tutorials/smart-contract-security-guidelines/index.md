---
title: Linee guida per la sicurezza dei contratti intelligenti
description: Una lista di controllo delle linee guida per la sicurezza da considerare quando si crea la propria dApp
author: "Trailofbits"
tags: ["Solidity", "contratti intelligenti", "sicurezza"]
skill: intermediate
breadcrumb: Linee guida per la sicurezza
lang: it
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Segui queste raccomandazioni di alto livello per creare contratti intelligenti più sicuri.

## Linee guida per la progettazione {#design-guidelines}

La progettazione del contratto dovrebbe essere discussa in anticipo, prima di scrivere qualsiasi riga di codice.

### Documentazione e specifiche {#documentation-and-specifications}

La documentazione può essere scritta a diversi livelli e dovrebbe essere aggiornata durante l'implementazione dei contratti:

- **Una descrizione in linguaggio semplice del sistema**, che descriva cosa fanno i contratti e qualsiasi presupposto sulla base di codice.
- **Schemi e diagrammi architetturali**, incluse le interazioni del contratto e la macchina a stati del sistema. Le [stampanti di Slither](https://github.com/crytic/slither/wiki/Printer-documentation) possono aiutare a generare questi schemi.
- **Documentazione approfondita del codice**, il [formato Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) può essere utilizzato per Solidity.

### Calcolo on-chain vs fuori catena {#onchain-vs-offchain-computation}

- **Mantieni quanto più codice possibile fuori catena.** Mantieni piccolo il livello on-chain. Pre-elabora i dati con codice fuori catena in modo tale che la verifica on-chain sia semplice. Hai bisogno di un elenco ordinato? Ordina l'elenco fuori catena, quindi controlla solo il suo ordine on-chain.

### Aggiornabilità {#upgradeability}

Abbiamo discusso le diverse soluzioni di aggiornabilità nel [nostro post sul blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Fai una scelta deliberata se supportare o meno l'aggiornabilità prima di scrivere qualsiasi codice. La decisione influenzerà il modo in cui strutturi il tuo codice. In generale, raccomandiamo:

- **Privilegiare la [migrazione del contratto](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) rispetto all'aggiornabilità.** I sistemi di migrazione hanno molti degli stessi vantaggi di quelli aggiornabili, senza i loro svantaggi.
- **Utilizzare il modello di separazione dei dati rispetto a quello delegatecallproxy.** Se il tuo progetto ha una chiara separazione dell'astrazione, l'aggiornabilità utilizzando la separazione dei dati richiederà solo pochi aggiustamenti. Il delegatecallproxy richiede esperienza con l'EVM ed è altamente soggetto a errori.
- **Documentare la procedura di migrazione/aggiornamento prima della distribuzione.** Se devi reagire sotto stress senza alcuna linea guida, commetterai degli errori. Scrivi in anticipo la procedura da seguire. Dovrebbe includere:
  - Le chiamate che avviano i nuovi contratti
  - Dove sono archiviate le chiavi e come accedervi
  - Come controllare la distribuzione! Sviluppa e testa uno script post-distribuzione.

## Linee guida per l'implementazione {#implementation-guidelines}

**Punta alla semplicità.** Usa sempre la soluzione più semplice che si adatta al tuo scopo. Qualsiasi membro del tuo team dovrebbe essere in grado di comprendere la tua soluzione.

### Composizione delle funzioni {#function-composition}

L'architettura della tua base di codice dovrebbe rendere il tuo codice facile da revisionare. Evita scelte architetturali che riducono la capacità di ragionare sulla sua correttezza.

- **Dividi la logica del tuo sistema**, tramite più contratti o raggruppando funzioni simili (ad esempio, autenticazione, aritmetica, ...).
- **Scrivi funzioni piccole, con uno scopo chiaro.** Questo faciliterà la revisione e consentirà il test dei singoli componenti.

### Ereditarietà {#inheritance}

- **Mantieni l'ereditarietà gestibile.** L'ereditarietà dovrebbe essere utilizzata per dividere la logica, tuttavia, il tuo progetto dovrebbe mirare a ridurre al minimo la profondità e l'ampiezza dell'albero di ereditarietà.
- **Usa la [stampante di ereditarietà](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) di Slither per controllare la gerarchia dei contratti.** La stampante di ereditarietà ti aiuterà a revisionare le dimensioni della gerarchia.

### Eventi {#events}

- **Registra tutte le operazioni cruciali.** Gli eventi aiuteranno a eseguire il debug del contratto durante lo sviluppo e a monitorarlo dopo la distribuzione.

### Evita le insidie note {#avoid-known-pitfalls}

- **Sii consapevole dei problemi di sicurezza più comuni.** Ci sono molte risorse online per conoscere i problemi comuni, come [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) o [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Presta attenzione alle sezioni di avvertenza nella [documentazione di Solidity](https://docs.soliditylang.org/en/latest/).** Le sezioni di avvertenza ti informeranno sui comportamenti non ovvi del linguaggio.

### Dipendenze {#dependencies}

- **Usa librerie ben testate.** Importare codice da librerie ben testate ridurrà la probabilità di scrivere codice con bug. Se vuoi scrivere un contratto ERC20, usa [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Usa un gestore di dipendenze; evita di copiare e incollare il codice.** Se ti affidi a una fonte esterna, devi mantenerla aggiornata con la fonte originale.

### Test e verifica {#testing-and-verification}

- **Scrivi test unitari approfonditi.** Una suite di test estesa è fondamentale per creare software di alta qualità.
- **Scrivi controlli e proprietà personalizzati per [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) e [Manticore](https://github.com/trailofbits/manticore).** Gli strumenti automatizzati aiuteranno a garantire che il tuo contratto sia sicuro. Rivedi il resto di questa guida per imparare a scrivere controlli e proprietà efficienti.
- **Usa [crytic.io](https://crytic.io/).** Crytic si integra con GitHub, fornisce accesso ai rilevatori privati di Slither ed esegue controlli di proprietà personalizzati da Echidna.

### Solidity {#solidity}

- **Privilegia Solidity 0.5 rispetto a 0.4 e 0.6.** Secondo noi, Solidity 0.5 è più sicuro e ha migliori pratiche integrate rispetto a 0.4. Solidity 0.6 si è dimostrato troppo instabile per la produzione e ha bisogno di tempo per maturare.
- **Usa una versione stabile per compilare; usa l'ultima versione per controllare gli avvisi.** Verifica che il tuo codice non abbia problemi segnalati con l'ultima versione del compilatore. Tuttavia, Solidity ha un ciclo di rilascio rapido e una storia di bug del compilatore, quindi non raccomandiamo l'ultima versione per la distribuzione (vedi la [raccomandazione sulla versione di solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) di Slither).
- **Non usare l'assembly inline.** L'assembly richiede esperienza con l'EVM. Non scrivere codice EVM se non hai _padroneggiato_ lo yellow paper.

## Linee guida per la distribuzione {#deployment-guidelines}

Una volta che il contratto è stato sviluppato e distribuito:

- **Monitora i tuoi contratti.** Osserva i log e tieniti pronto a reagire in caso di compromissione del contratto o del portafoglio.
- **Aggiungi le tue informazioni di contatto a [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Questo elenco aiuta le terze parti a contattarti se viene scoperta una falla di sicurezza.
- **Metti al sicuro i portafogli degli utenti privilegiati.** Segui le nostre [migliori pratiche](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) se archivi le chiavi in portafogli hardware.
- **Avere un piano di risposta agli incidenti.** Considera che i tuoi contratti intelligenti possono essere compromessi. Anche se i tuoi contratti sono privi di bug, un utente malintenzionato potrebbe prendere il controllo delle chiavi del proprietario del contratto.