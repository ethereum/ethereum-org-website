---
title: Lista di controllo per l'integrazione dei token
description: Una lista di controllo delle cose da considerare quando si interagisce con i token
author: "Trailofbits"
lang: it
tags: ["Solidity", "smart contract", "sicurezza", "token"]
skill: intermediate
breadcrumb: Integrazione dei token
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Segui questa lista di controllo quando interagisci con token arbitrari. Assicurati di comprendere i rischi associati a ciascun elemento e giustifica eventuali eccezioni a queste regole.

Per comodità, tutte le [utilità](https://github.com/crytic/slither#tools) di Slither possono essere eseguite direttamente sull'indirizzo di un token, ad esempio:

[Tutorial sull'uso di Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Il recupero del codice sorgente verificato da Etherscan richiede una [chiave API di Etherscan](https://docs.etherscan.io/set-up-your-api-key) (una chiave gratuita è sufficiente). Passala con `--etherscan-apikey`, oppure imposta la variabile d'ambiente `ETHERSCAN_API_KEY`, che viene letta anche da Slither:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Senza una chiave, il comando fallisce con un errore `Invalid etherscan API Key`.

Per seguire questa lista di controllo, vorrai avere questo output da Slither per il token:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # richiede configurazione e l'uso di Echidna
```

## Considerazioni generali {#general-considerations}

- **Il contratto ha una revisione di sicurezza.** Evita di interagire con contratti privi di una revisione di sicurezza. Controlla la durata della valutazione (nota anche come "livello di impegno"), la reputazione dell'azienda di sicurezza e il numero e la gravità dei problemi riscontrati.
- **Hai contattato gli sviluppatori.** Potresti dover avvisare il loro team di un incidente. Cerca i contatti appropriati su [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Hanno una mailing list di sicurezza per gli annunci critici.** Il loro team dovrebbe avvisare gli utenti (come te!) quando vengono rilevati problemi critici o quando si verificano aggiornamenti.

## Conformità ERC {#erc-conformity}

Slither include un'utilità, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), che esamina la conformità di un token a molti standard ERC correlati. Usa slither-check-erc per verificare che:

- **Transfer e transferFrom restituiscano un booleano.** Diversi token non restituiscono un booleano in queste funzioni. Di conseguenza, le loro chiamate nel contratto potrebbero fallire.
- **Le funzioni name, decimals e symbol siano presenti se utilizzate.** Queste funzioni sono opzionali nello standard ERC-20 e potrebbero non essere presenti.
- **Decimals restituisca un uint8.** Diversi token restituiscono erroneamente un uint256. Se questo è il caso, assicurati che il valore restituito sia inferiore a 255.
- **Il token mitighi la nota [race condition dell'ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Lo standard ERC-20 ha una nota race condition che deve essere mitigata per impedire agli aggressori di rubare token.
- **Il token non sia un token ERC-777 e non abbia chiamate a funzioni esterne in transfer e transferFrom.** Le chiamate esterne nelle funzioni di trasferimento possono portare a rientranze.

Slither include un'utilità, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), che genera test unitari e proprietà di sicurezza in grado di scoprire molti difetti comuni degli ERC. Usa slither-prop per verificare che:

- **Il contratto superi tutti i test unitari e le proprietà di sicurezza di slither-prop.** Esegui i test unitari generati, quindi controlla le proprietà con [Echidna](https://github.com/crytic/echidna).

Infine, ci sono alcune caratteristiche che sono difficili da identificare automaticamente. Controlla manualmente queste condizioni:

- **Transfer e transferFrom non dovrebbero prelevare una commissione.** I token deflazionistici possono portare a comportamenti imprevisti.
- **Il potenziale interesse guadagnato dal token sia preso in considerazione.** Alcuni token distribuiscono interessi ai possessori del token. Questo interesse potrebbe rimanere intrappolato nel contratto se non viene preso in considerazione.

## Composizione del contratto {#contract-composition}

- **Il contratto evita complessità inutili.** Il token dovrebbe essere un contratto semplice; un token con codice complesso richiede uno standard di revisione più elevato. Usa lo strumento [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) di Slither per identificare il codice complesso.
- **Il contratto usa l'aritmetica controllata.** Solidity 0.8 e versioni successive vanno in revert su overflow e underflow per impostazione predefinita; i contratti più vecchi necessitano di SafeMath per la stessa protezione. I contratti compilati con versioni precedenti senza SafeMath, o che usano blocchi `unchecked`, richiedono uno standard di revisione più elevato. Ispeziona l'aritmetica manualmente, specialmente all'interno dei blocchi `unchecked` e nell'assembly inline.
- **Il contratto ha solo poche funzioni non correlate al token.** Le funzioni non correlate al token aumentano la probabilità di un problema nel contratto. Usa lo strumento [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) di Slither per esaminare in modo ampio il codice utilizzato nel contratto.
- **Il token ha un solo indirizzo.** I token con più punti di ingresso per gli aggiornamenti del saldo possono interrompere la contabilità interna basata sull'indirizzo (ad es., `balances[token_address][msg.sender]` potrebbe non riflettere il saldo effettivo).

## Privilegi del proprietario {#owner-privileges}

- **Il token non è aggiornabile.** I contratti aggiornabili potrebbero cambiare le loro regole nel tempo. Usa lo strumento [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) di Slither per determinare se il contratto è aggiornabile.
- **Il proprietario ha capacità di conio limitate.** I proprietari malintenzionati o compromessi possono abusare delle capacità di conio. Usa lo strumento [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) di Slither per esaminare le capacità di conio e valuta la possibilità di rivedere manualmente il codice.
- **Il token non può essere messo in pausa.** I proprietari malintenzionati o compromessi possono intrappolare i contratti che si basano su token che possono essere messi in pausa. Identifica manualmente il codice che può essere messo in pausa.
- **Il proprietario non può inserire il contratto in una lista nera (blacklist).** I proprietari malintenzionati o compromessi possono intrappolare i contratti che si basano su token con una lista nera. Identifica manualmente le funzionalità di inserimento in lista nera.
- **Il team dietro al token è noto e può essere ritenuto responsabile per eventuali abusi.** I contratti con team di sviluppo anonimi o che risiedono in paradisi legali dovrebbero richiedere uno standard di revisione più elevato.

## Scarsità del token {#token-scarcity}

La revisione per problemi di scarsità del token richiede una revisione manuale. Controlla queste condizioni:

- **Nessun utente possiede la maggior parte dell'offerta.** Se pochi utenti possiedono la maggior parte dei token, possono influenzare le operazioni in base alla ripartizione del token.
- **L'offerta totale è sufficiente.** I token con una bassa offerta totale possono essere facilmente manipolati.
- **I token si trovano in più di qualche exchange.** Se tutti i token si trovano in un solo exchange, una compromissione dell'exchange può compromettere il contratto che si basa sul token.
- **Gli utenti comprendono i rischi associati a grandi fondi o prestiti lampo (flash loan).** I contratti che si basano sul saldo del token devono prendere attentamente in considerazione gli aggressori con grandi fondi o gli attacchi tramite prestiti lampo.
- **Il token non consente il conio lampo (flash minting).** Il conio lampo può portare a oscillazioni sostanziali nel saldo e nell'offerta totale, che necessitano di controlli di overflow rigorosi e completi nel funzionamento del token.
## Token ERC-20 non standard noti {#known-non-standard-erc20-tokens}

I protocolli che consentono l'integrazione con token arbitrari devono fare attenzione a gestire correttamente alcuni noti token ERC-20 non standard. Fai riferimento alla [lista dei token non standard](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) per i token noti che comportano rischi aggiuntivi.

## Token ERC-721 {#erc721-tokens}

### Controlli di conformità ERC-721 {#erc721-conformity-checks}

Il comportamento di alcuni contratti potrebbe differire dalle specifiche ERC originali. Rivedi manualmente le seguenti condizioni:

- **I trasferimenti di token all'indirizzo 0x0 vanno in revert.** Alcuni token consentono trasferimenti a 0x0 e considerano i token inviati a quell'indirizzo come bruciati; tuttavia, lo standard ERC-721 richiede che tali trasferimenti vadano in revert.
- **Le funzioni `safeTransferFrom` sono implementate con la firma corretta.** Alcuni contratti di token non implementano queste funzioni. Il trasferimento di NFT a uno di questi contratti può comportare una perdita di asset.
- **Le funzioni `name`, `decimals` e `symbol` sono presenti se utilizzate.** Queste funzioni sono opzionali nello standard ERC-721 e potrebbero non essere presenti.
- **Se utilizzata, `decimals` restituisce un `uint8(0)`.** Altri valori non sono validi.
- **Le funzioni `name` e `symbol` possono restituire una stringa vuota.** Questo comportamento è consentito dallo standard.
- **La funzione `ownerOf` va in revert se il `tokenId` non è valido o si riferisce a un token che è già stato bruciato.** La funzione non può restituire 0x0. Questo comportamento è richiesto dallo standard ma potrebbe non essere sempre implementato correttamente.
- **Un trasferimento di un NFT cancella le sue approvazioni.** Questo è richiesto dallo standard.
- **L'ID del token di un NFT non può essere modificato durante la sua vita.** Questo è richiesto dallo standard.

### Rischi comuni dello standard ERC-721 {#common-risks-of-the-erc721-standard}

Mitiga i rischi associati ai contratti ERC-721 conducendo una revisione manuale delle seguenti condizioni:

- **Il callback `onERC721Received` è preso in considerazione.** Le chiamate esterne nelle funzioni di trasferimento possono portare a rientranze, specialmente quando il callback non è esplicito (ad es., nelle chiamate [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)).
- **Quando un NFT viene coniato, viene trasferito in modo sicuro a uno smart contract.** Se esiste una funzione di conio, dovrebbe comportarsi in modo simile a `safeTransferFrom` e gestire correttamente il conio di nuovi token verso uno smart contract, prevenendo la perdita di asset.
- **Bruciare un token cancella le sue approvazioni.** Se esiste una funzione per bruciare, dovrebbe cancellare le precedenti approvazioni del token.
