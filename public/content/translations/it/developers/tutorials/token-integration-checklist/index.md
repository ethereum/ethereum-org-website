---
title: Elenco di controllo per l'integrazione dei token
description: Elenco di controllo degli aspetti da tenere presente quando si interagisce con i token
author: "Trailofbits"
lang: it
tags: [ "Solidity", "smart contract", "sicurezza", "token" ]
skill: intermediate
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Segui questo elenco di controllo quando interagisci con token arbitrari. Assicurati di conoscere i rischi associati a ogni oggetto e giustifica ogni eccezione a queste regole.

Per comodità, tutte le [utilità](https://github.com/crytic/slither#tools) di Slither possono essere eseguite direttamente su un indirizzo di token, come:

[Guida all'uso di Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Per seguire questo elenco di controllo, è utile questo output da Slither per il token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # richiede configurazione e l'uso di Echidna e Manticore
```

## Considerazioni generali {#general-considerations}

- **Il contratto ha una revisione di sicurezza.** Evita di interagire con i contratti che non hanno una revisione di sicurezza. Controlla la lunghezza della valutazione (ossia il "livello di sforzo"), la reputazione della società di sicurezza, e il numero e la gravità dei risultati.
- **Hai contattato gli sviluppatori.** Potrebbe essere necessario avvisare il loro team di un incidente. Cerca i contatti appropriati su [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Hanno una mailing list di sicurezza per gli annunci critici.** Il loro team dovrebbe avvisare gli utenti (come te!) quando vengono riscontrati problemi critici o quando si verificano aggiornamenti.

## Conformità ERC {#erc-conformity}

Slither include un'utilità, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), che revisiona la conformità di un token rispetto a molti standard ERC correlati. Usa slither-check-erc per verificare che:

- **Transfer e transferFrom restituiscono un valore booleano.** Diversi token non restituiscono un booleano in queste funzioni. Di conseguenza, le loro chiamate nel contratto potrebbero non riuscire.
- **Le funzioni name, decimals e symbol sono presenti, se usate.** Queste funzioni sono facoltative nello standard ERC20 e potrebbero non essere presenti.
- **Decimals restituisce un uint8.** Diversi token restituiscono erroneamente un uint256. In tal caso, assicurati che il valore restituito sia inferiore a 255.
- **Il token mitiga la [race condition di ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) nota.** Lo standard ERC20 ha una race condition nota che deve essere mitigata per impedire agli aggressori di rubare i token.
- **Il token non è un token ERC777 e non ha chiamate a funzioni esterne in transfer e transferFrom.** Le chiamate esterne nelle funzioni di trasferimento possono causare rientranze.

Slither include un'utilità, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), che genera unit test e proprietà di sicurezza in grado di rilevare molti difetti comuni degli ERC. Usa slither-prop per verificare quanto segue:

- **Il contratto supera tutti gli unit test e le proprietà di sicurezza da slither-prop.** Esegui gli unit test generati, quindi verifica le proprietà con [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Infine, ci sono alcune caratteristiche difficili da identificare automaticamente. Verifica manualmente queste condizioni:

- **Transfer e transferFrom non dovrebbero addebitare commissioni.** I token deflazionistici possono portare a comportamenti imprevisti.
- **I potenziali interessi maturati dal token vengono presi in considerazione.** Alcuni token distribuiscono interessi ai possessori di token. Questo interesse potrebbe rimanere intrappolato nel contratto se non viene preso in considerazione.

## Composizione del contratto {#contract-composition}

- **Il contratto evita complessità non necessarie.** Il token dovrebbe essere un contratto semplice; un token con codice complesso richiede uno standard di revisione più elevato. Usa il [printer human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) di Slither per identificare il codice complesso.
- **Il contratto usa SafeMath.** I contratti che non usano SafeMath richiedono uno standard di revisione più elevato. Ispeziona manualmente il contratto per l'utilizzo di SafeMath.
- **Il contratto ha solo poche funzioni non correlate ai token.** Le funzioni non correlate ai token aumentano la probabilità di un problema nel contratto. Usa il [printer contract-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per una revisione generale del codice utilizzato nel contratto.
- **Il token ha un solo indirizzo.** I token con più punti di ingresso per gli aggiornamenti del saldo possono compromettere la contabilità interna basata sull'indirizzo (ad es. `balances[token_address][msg.sender]` potrebbe non riflettere il saldo effettivo).

## Privilegi del proprietario {#owner-privileges}

- **Il token non è aggiornabile.** I contratti aggiornabili potrebbero cambiare le proprie regole nel tempo. Usa il [printer human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per determinare se il contratto è aggiornabile.
- **Il proprietario ha capacità di conio limitate.** I proprietari malevoli o compromessi possono abusare delle capacità di conio. Usa il [printer human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per revisionare le capacità di conio e valuta di revisionare manualmente il codice.
- **Il token non è interrompibile.** I proprietari malevoli o compromessi possono intrappolare i contratti che si basano su token interrompibili. Identifica manualmente il codice interrompibile.
- **Il proprietario non può inserire il contratto in una lista nera.** I proprietari malevoli o compromessi possono intrappolare i contratti che si basano su token con una lista nera. Identifica manualmente le funzionalità di inserimento in blacklist.
- **Il team dietro al token è noto e può essere ritenuto responsabile di eventuali abusi.** I contratti con team di sviluppo anonimi o che risiedono in paradisi legali dovrebbero richiedere uno standard di revisione più elevato.

## Scarsità dei token {#token-scarcity}

La verifica dei problemi di scarsità dei token richiede una revisione manuale. Verifica queste condizioni:

- **Nessun utente possiede la maggior parte della fornitura.** Se pochi utenti possiedono la maggior parte dei token, possono influenzare le operazioni in base alla ripartizione dei token.
- **La fornitura totale è sufficiente.** I token con una fornitura totale bassa possono essere facilmente manipolati.
- **I token si trovano in più di qualche piattaforma di scambio.** Se tutti i token si trovano su una sola piattaforma di scambio, una compromissione della piattaforma può compromettere il contratto che si basa sul token.
- **Gli utenti comprendono i rischi associati a fondi ingenti o a prestiti lampo.** I contratti che si basano sul saldo del token devono considerare attentamente gli aggressori con fondi ingenti o gli attacchi tramite prestiti lampo.
- **Il token non consente il conio lampo**. Il conio lampo può portare a oscillazioni sostanziali del saldo e della fornitura totale, che necessitano di controlli di sovraflusso rigorosi e completi nel funzionamento del token.
