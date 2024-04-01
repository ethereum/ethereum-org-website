---
title: Elenco di controllo per l'integrazione dei token
description: Elenco di controllo degli aspetti da tenere presente quando si interagisce con i token
author: "Trailofbits"
lang: it
tags:
  - "Solidity"
  - "Smart Contract"
  - "sicurezza"
  - "tokens"
skill: intermediate
published: 2020-08-13
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Segui questo elenco di controllo quando interagisci con token arbitrari. Assicurati di conoscere i rischi associati a ogni oggetto e giustifica ogni eccezione a queste regole.

Per comodità, tutte le [utilità](https://github.com/crytic/slither#tools) di Slither sono direttamente eseguibili su un indirizzo di un token, come:

[Uso del tutorial di Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Per seguire questo elenco di controllo, è utile questo output da Slither per il token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## Considerazioni generali {#general-considerations}

- **Il contratto ha una revisione di sicurezza.** Evita di interagire con i contratti che non hanno una revisione di sicurezza. Controlla la lunghezza della valutazione (cioè il "livello di sforzo"), la reputazione dell'organizzazione di sicurezza e il numero e la gravità dei risultati.
- **Hai contattato gli sviluppatori.** Potresti dover avvisare il loro team di un incidente. Cerca contatti appropriati su [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Hanno una mailing list di sicurezza per gli annunci critici.** Il loro team dovrebbe avvisare gli utenti (come te!) quando vengono trovati problemi critici o quando viene eseguito un aggiornamento.

## Conformità ERC {#erc-conformity}

Slither include un'utilità, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), che revisiona la conformità di un token rispetto a molti standard ERC correlati. Usa slither-check-erc per controllare che siano soddisfatte le seguenti condizioni:

- **Transfer e transferFrom restituiscono un valore booleano.** Diversi token non restituiscono un valore booleano per queste funzioni. Di conseguenza, le loro chiamate al contratto potrebbero non riuscire.
- **Il nome, i decimali e le funzioni del simbolo sono presenti se usati.** Queste funzioni sono opzionali nello standard ERC20 e potrebbero non essere presenti.
- **I decimali restituiscono un uint8.** Diversi token restituiscono erroneamente uint256. Se questo è il caso, assicurati che il valore restituito sia inferiore a 255.
- **Il token mitiga la [race condition di ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) nota.** Lo standard ERC20 ha una race condition ERC20 che deve essere mitigata per impedire il furto di token da parte di aggressori.
- **Il token non è un token ERC777 e non ha una chiamata di funzione esterna in transfer e transferFrom.** Le chiamate esterne alle funzioni transfer possono determinare codice rientrante.

Slither include una utility, [slither.prop](https://github.com/crytic/slither/wiki/Property-generation) che genera unit test e proprietà di sicurezza che possono scoprire molti difetti ERC comuni. Usa slither-prop per verificare quanto segue:

- **Il contratto supera tutti gli unit test e le proprietà di sicurezza di slither-prop.** Esegui gli unit test generati, poi controlla le proprietà con [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Infine, ci sono alcune caratteristiche che sono difficili da identificare automaticamente. Riesamina manualmente queste condizioni:

- **Transfer e transferFrom non devono richiedere commissioni.** I token deflazionistici possono condurre a comportamenti imprevisti.
- **I potenziali interessi guadagnati dal token sono considerati.** Alcuni token distribuiscono interessi ai possessori di token. Questo interesse potrebbe rimanere intrappolato nel contratto se non preso in considerazione.

## Composizione del contratto {#contract-composition}

- **Il contratto evita complessità inutili.** Il token deve essere un contratto semplice; un token con codice complesso richiede uno standard superiore per il controllo. Usa la [stampante human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) di Slither per identificare il codice complesso.
- **Il contratto usa SafeMath.** I contratti che non usano SafeMath richiedono uno standard di controllo superiore. Ispeziona manualmente il contratto per verificare l'uso di SafeMath.
- **Il contratto ha solo poche funzioni non correlate ai token.** Le funzioni non correlate ai token aumentano la probabilità di un problema nel contratto. Usa la [stampante contract-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per controllare ampiamente il codice usato nel contratto.
- **Il token ha solo un indirizzo.** I token con punti di ingresso multipli per gli aggiornamenti del saldo possono impedire il funzionamento della contabilità interna basata sull'indirizzo (es. `balances[token_address][msg.sender]` potrebbe non riflettere il saldo reale).

## Privilegi del proprietario {#owner-privileges}

- **Il token non è aggiornabile.** Le regole dei contratti aggiornabili potrebbero variare nel tempo. Usa la [stampante human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per stabilire se il contratto è aggiornabile.
- **Il proprietario ha capacità di conio limitate.** I proprietari malevoli o compromessi possono abusare delle capacità di conio. Usa la [stampante human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per verificare le capacità di conio e, se possibile, controlla manualmente il codice.
- **Il token non è interrompibile.** I proprietari malevoli o compromessi possono intrappolare i contratti che si basano su token interrompibili. Identifica il codice interrompibile manualmente.
- **Il proprietario non può inserire il contratto nella lista nera.** I proprietari malevoli o compromessi possono intrappolare i contratti che si basano su token con una lista nera. Identifica le funzionalità di blacklist a mano.
- **Il team legato al token è noto e vi si può attribuire la responsabilità di eventuali abusi.** I contratti con team di sviluppo anonimi o che risiedono in rifugi legali devono richiedere uno standard di controllo superiore.

## Scarsezza di token {#token-scarcity}

Le verifiche dei problemi di scarsità dei token richiedono un controllo manuale. Verifica queste condizioni:

- **Nessun utente possiede la maggior parte della disponibilità.** Se pochi utenti possiedono gran parte dei token, possono influenzare le operazioni in base alla ripartizione dei token.
- **La disponibilità totale di token è sufficiente.** I token con una limitata disponibilità totale sono facilmente manipolabili.
- **I token si trovano in più di un paio di scambi.** Se tutti i token si trovano in un solo scambio, compromettere lo scambio può causare la compromissione del contratto basato sul token.
- **Gli utenti comprendono i rischi associati a fondi di vaste dimensioni o prestiti lampo.** I contratti che si basano sul saldo dei token devono fare molta attenzione agli aggressori con fondi molto estesi o attacchi tramite prestiti lampo.
- **I token non consentono il conio lampo**. Il conio lampo può condurre a oscillazioni sostanziali del saldo e della disponibilità totale, che necessitano di controlli rigorosi e completi dell'overflow nel funzionamento del token.
