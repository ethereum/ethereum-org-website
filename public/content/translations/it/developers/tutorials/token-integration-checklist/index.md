---
title: Lista di controllo per l'integrazione dei token
description: Una lista di controllo delle cose da considerare quando si interagisce con i token
author: "Trailofbits"
lang: it
tags: ["solidity", "smart contract", "sicurezza", "token"]
skill: intermediate
breadcrumb: Integrazione dei token
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Segui questa lista di controllo quando interagisci con token arbitrari. Assicurati di comprendere i rischi associati a ciascun elemento e giustifica eventuali eccezioni a queste regole.

Per comodità, tutte le [utilità](https://github.com/crytic/slither#tools) di Slither possono essere eseguite direttamente su un indirizzo del token, come ad esempio:

[Tutorial sull'utilizzo di Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Per seguire questa lista di controllo, ti servirà questo output di Slither per il token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # richiede configurazione, e l'uso di Echidna e Manticore
```

## Considerazioni generali {#general-considerations}

- **Il contratto ha una revisione di sicurezza.** Evita di interagire con contratti privi di una revisione di sicurezza. Controlla la durata della valutazione (nota anche come "livello di impegno"), la reputazione dell'azienda di sicurezza e il numero e la gravità dei problemi riscontrati.
- **Hai contattato gli sviluppatori.** Potresti dover avvisare il loro team di un incidente. Cerca i contatti appropriati su [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Hanno una mailing list di sicurezza per gli annunci critici.** Il loro team dovrebbe avvisare gli utenti (come te!) quando vengono rilevati problemi critici o quando si verificano aggiornamenti.

## Conformità ERC {#erc-conformity}

Slither include un'utilità, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), che esamina la conformità di un token a molti standard ERC correlati. Usa slither-check-erc per verificare che:

- **Transfer e transferFrom restituiscano un booleano.** Diversi token non restituiscono un booleano su queste funzioni. Di conseguenza, le loro chiamate nel contratto potrebbero fallire.
- **Le funzioni name, decimals e symbol siano presenti se utilizzate.** Queste funzioni sono opzionali nello standard ERC-20 e potrebbero non essere presenti.
- **decimals restituisca un uint8.** Diversi token restituiscono erroneamente un uint256. In tal caso, assicurati che il valore restituito sia inferiore a 255.
- **Il token mitighi la nota [race condition di ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Lo standard ERC-20 ha una nota race condition che deve essere mitigata per impedire agli aggressori di rubare token.
- **Il token non sia un token ERC-777 e non abbia chiamate a funzioni esterne in transfer e transferFrom.** Le chiamate esterne nelle funzioni di trasferimento possono portare a rientranze (reentrancy).

Slither include un'utilità, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), che genera test unitari e proprietà di sicurezza in grado di scoprire molti difetti comuni degli ERC. Usa slither-prop per verificare che:

- **Il contratto superi tutti i test unitari e le proprietà di sicurezza di slither-prop.** Esegui i test unitari generati, quindi controlla le proprietà con [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Infine, ci sono alcune caratteristiche che sono difficili da identificare automaticamente. Controlla manualmente queste condizioni:

- **Transfer e transferFrom non dovrebbero prelevare una commissione.** I token deflazionistici possono portare a comportamenti imprevisti.
- **I potenziali interessi guadagnati dal token sono presi in considerazione.** Alcuni token distribuiscono interessi ai possessori dei token. Questi interessi potrebbero rimanere bloccati nel contratto se non vengono presi in considerazione.

## Composizione del contratto {#contract-composition}

- **Il contratto evita complessità inutili.** Il token dovrebbe essere un contratto semplice; un token con codice complesso richiede uno standard di revisione più elevato. Usa lo strumento [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) di Slither per identificare il codice complesso.
- **Il contratto utilizza SafeMath.** I contratti che non utilizzano SafeMath richiedono uno standard di revisione più elevato. Ispeziona manualmente il contratto per verificare l'uso di SafeMath.
- **Il contratto ha solo poche funzioni non correlate al token.** Le funzioni non correlate al token aumentano la probabilità di un problema nel contratto. Usa lo strumento [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per esaminare a grandi linee il codice utilizzato nel contratto.
- **Il token ha un solo indirizzo.** I token con punti di ingresso multipli per gli aggiornamenti del saldo possono interrompere la contabilità interna basata sull'indirizzo (ad es., `balances[token_address][msg.sender]` potrebbe non riflettere il saldo effettivo).

## Privilegi del proprietario {#owner-privileges}

- **Il token non è aggiornabile.** I contratti aggiornabili potrebbero cambiare le loro regole nel tempo. Usa lo strumento [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per determinare se il contratto è aggiornabile.
- **Il proprietario ha capacità di conio limitate.** I proprietari malintenzionati o compromessi possono abusare delle capacità di conio. Usa lo strumento [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per esaminare le capacità di conio e valuta la possibilità di rivedere manualmente il codice.
- **Il token non può essere messo in pausa.** I proprietari malintenzionati o compromessi possono intrappolare i contratti che si basano su token che possono essere messi in pausa. Identifica manualmente il codice che può essere messo in pausa.
- **Il proprietario non può inserire il contratto in una lista nera (blacklist).** I proprietari malintenzionati o compromessi possono intrappolare i contratti che si basano su token con una lista nera. Identifica manualmente le funzionalità di inserimento in lista nera.
- **Il team dietro al token è noto e può essere ritenuto responsabile per eventuali abusi.** I contratti con team di sviluppo anonimi o che risiedono in paradisi legali dovrebbero richiedere uno standard di revisione più elevato.

## Scarsità del token {#token-scarcity}

Le revisioni per i problemi di scarsità del token richiedono una revisione manuale. Controlla queste condizioni:

- **Nessun utente possiede la maggior parte dell'offerta.** Se pochi utenti possiedono la maggior parte dei token, possono influenzare le operazioni in base alla ripartizione del token.
- **L'offerta totale è sufficiente.** I token con una bassa offerta totale possono essere facilmente manipolati.
- **I token si trovano in più di qualche exchange.** Se tutti i token si trovano in un solo exchange, una compromissione dell'exchange può compromettere il contratto che si basa sul token.
- **Gli utenti comprendono i rischi associati a fondi ingenti o ai prestiti lampo (flash loan).** I contratti che si basano sul saldo del token devono prendere attentamente in considerazione gli aggressori con fondi ingenti o gli attacchi tramite prestiti lampo.
- **Il token non consente il conio lampo (flash minting)**. Il conio lampo può portare a oscillazioni sostanziali nel saldo e nell'offerta totale, il che necessita di controlli di overflow rigorosi e completi nel funzionamento del token.