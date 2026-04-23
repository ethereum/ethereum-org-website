---
title: "EIP-1271: Firmare e Verificare le Firme dei Contratti Intelligenti"
description: Una panoramica sulla generazione e verifica delle firme dei contratti intelligenti con l'EIP-1271. Esaminiamo anche l'implementazione dell'EIP-1271 utilizzata in Safe (precedentemente Gnosis Safe) per fornire un esempio concreto su cui gli sviluppatori di contratti intelligenti possono basarsi.
author: Nathan H. Leung
lang: it
tags: ["eip-1271", "contratti intelligenti", "verifica", "firma"]
skill: intermediate
breadcrumb: Firme EIP-1271
published: 2023-01-12
---

Lo standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) consente ai contratti intelligenti di verificare le firme.

In questo tutorial, forniamo una panoramica delle firme digitali, del contesto dell'EIP-1271 e dell'implementazione specifica dell'EIP-1271 utilizzata da [Safe](https://safe.global/) (precedentemente Gnosis Safe). Tutto questo può servire come punto di partenza per implementare l'EIP-1271 nei propri contratti.

## Cos'è una firma?

In questo contesto, una firma (più precisamente, una "firma digitale") è un messaggio più una sorta di prova che il messaggio provenga da una persona/mittente/indirizzo specifico.

Ad esempio, una firma digitale potrebbe apparire così:

1. Messaggio: "Voglio accedere a questo sito web con il mio portafoglio Ethereum."
2. Firmatario: Il mio indirizzo è `0x000…`
3. Prova: Ecco alcune prove che io, `0x000…`, ho effettivamente creato l'intero messaggio (di solito si tratta di qualcosa di crittografico).

È importante notare che una firma digitale include sia un "messaggio" che una "firma".

Perché? Ad esempio, se mi dessi un contratto da firmare, e poi io tagliassi la pagina della firma e ti restituissi solo le mie firme senza il resto del contratto, il contratto non sarebbe valido.

Allo stesso modo, una firma digitale non significa nulla senza un messaggio associato!

## Perché esiste l'EIP-1271?

Per creare una firma digitale da utilizzare sulle blockchain basate su Ethereum, in genere è necessaria una chiave privata segreta che nessun altro conosce. Questo è ciò che rende la tua firma, tua (nessun altro può creare la stessa firma senza conoscere la chiave segreta).

Il tuo account Ethereum (ovvero, il tuo account controllato esternamente/EOA) ha una chiave privata associata, e questa è la chiave privata che viene tipicamente utilizzata quando un sito web o una dApp ti chiede una firma (ad es., per "Accedi con Ethereum").

Un'app può [verificare una firma](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) che crei utilizzando una libreria di terze parti come ethers.js [senza conoscere la tua chiave privata](https://en.wikipedia.org/wiki/Public-key_cryptography) ed essere sicura che _tu_ sia stato colui che ha creato la firma.

> Infatti, poiché le firme digitali degli EOA utilizzano la crittografia a chiave pubblica, possono essere generate e verificate **fuori catena**! È così che funziona il voto delle DAO senza gas: invece di inviare i voti on-chain, le firme digitali possono essere create e verificate fuori catena utilizzando librerie crittografiche.

Mentre gli account EOA hanno una chiave privata, gli account dei contratti intelligenti non hanno alcun tipo di chiave privata o segreta (quindi "Accedi con Ethereum", ecc. non può funzionare nativamente con gli account dei contratti intelligenti).

Il problema che l'EIP-1271 mira a risolvere: come possiamo dire che la firma di un contratto intelligente è valida se il contratto intelligente non ha alcun "segreto" che può incorporare nella firma?

## Come funziona l'EIP-1271?

I contratti intelligenti non hanno chiavi private che possono essere utilizzate per firmare messaggi. Quindi come possiamo dire se una firma è autentica?

Beh, un'idea è che possiamo semplicemente _chiedere_ al contratto intelligente se una firma è autentica!

Ciò che fa l'EIP-1271 è standardizzare questa idea di "chiedere" a un contratto intelligente se una data firma è valida.

Un contratto che implementa l'EIP-1271 deve avere una funzione chiamata `isValidSignature` che accetta un messaggio e una firma. Il contratto può quindi eseguire una logica di convalida (la specifica non impone nulla di specifico qui) e quindi restituire un valore che indica se la firma è valida o meno.

Se `isValidSignature` restituisce un risultato valido, è praticamente il contratto che dice "sì, approvo questa firma + messaggio!"

### Interfaccia

Ecco l'interfaccia esatta nella specifica EIP-1271 (parleremo del parametro `_hash` di seguito, ma per ora, pensalo come il messaggio che viene verificato):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /* *
   * @dev Dovrebbe restituire se la firma fornita è valida per l'hash fornito
   * @param _hash      Hash dei dati da firmare
   * @param _signature Array di byte della firma associato a _hash
   *
   * DEVE restituire il valore magico bytes4 0x1626ba7e quando la funzione ha successo.
   * NON DEVE modificare lo stato (usando STATICCALL per solc < 0.5, modificatore view per solc > 0.5)
   * DEVE consentire chiamate esterne */
  








  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Esempio di Implementazione dell'EIP-1271: Safe

I contratti possono implementare `isValidSignature` in molti modi: la specifica non dice molto sull'implementazione esatta.

Un contratto degno di nota che implementa l'EIP-1271 è Safe (precedentemente Gnosis Safe).

Nel codice di Safe, `isValidSignature` [è implementata](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) in modo che le firme possano essere create e verificate in [due modi](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Messaggi on-chain
   1. Creazione: un proprietario del safe crea una nuova transazione del safe per "firmare" un messaggio, passando il messaggio come dati nella transazione. Una volta che un numero sufficiente di proprietari firma la transazione per raggiungere la soglia della multifirma, la transazione viene trasmessa ed eseguita. Nella transazione, c'è una funzione del safe chiamata (`signMessage(bytes calldata _data)`) che aggiunge il messaggio a un elenco di messaggi "approvati".
   2. Verifica: chiama `isValidSignature` sul contratto Safe e passa il messaggio da verificare come parametro del messaggio e [un valore vuoto per il parametro della firma](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (ovvero, `0x`). Il Safe vedrà che il parametro della firma è vuoto e invece di verificare crittograficamente la firma, saprà di dover semplicemente procedere e controllare se il messaggio è nell'elenco dei messaggi "approvati".
2. Messaggi fuori catena:
   1. Creazione: un proprietario del safe crea un messaggio fuori catena, quindi fa in modo che altri proprietari del safe firmino il messaggio ciascuno individualmente fino a quando non ci sono abbastanza firme per superare la soglia di approvazione della multifirma.
   2. Verifica: chiama `isValidSignature`. Nel parametro del messaggio, passa il messaggio da verificare. Nel parametro della firma, passa le singole firme di ciascun proprietario del safe tutte concatenate insieme, una dopo l'altra. Il Safe controllerà che ci siano abbastanza firme per soddisfare la soglia **e** che ogni firma sia valida. In tal caso, restituirà un valore che indica l'avvenuta verifica della firma.

## Cos'è esattamente il parametro `_hash`? Perché non passare l'intero messaggio?

Potresti aver notato che la funzione `isValidSignature` nell'[interfaccia EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) non accetta il messaggio stesso, ma un parametro `_hash`. Ciò significa che invece di passare l'intero messaggio di lunghezza arbitraria a `isValidSignature`, passiamo invece un hash di 32 byte del messaggio (generalmente keccak256).

Ogni byte di calldata — ovvero, i dati dei parametri della funzione passati a una funzione del contratto intelligente — [costa 16 gas (4 gas se il byte è zero)](https://eips.ethereum.org/EIPS/eip-2028), quindi questo può far risparmiare molto gas se un messaggio è lungo.

### Specifiche Precedenti dell'EIP-1271

Ci sono specifiche EIP-1271 in circolazione che hanno una funzione `isValidSignature` con un primo parametro di tipo `bytes` (lunghezza arbitraria, invece di un `bytes32` a lunghezza fissa) e nome del parametro `message`. Questa è una [versione precedente](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) dello standard EIP-1271.

## Come dovrebbe essere implementato l'EIP-1271 nei miei contratti?

La specifica è molto aperta qui. L'implementazione di Safe ha alcune buone idee:

- Puoi considerare valide le firme degli EOA del "proprietario" del contratto.
- Potresti memorizzare un elenco di messaggi approvati e considerare validi solo quelli.

Alla fine, spetta a te come sviluppatore del contratto!

## Conclusione

L'[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) è uno standard versatile che consente ai contratti intelligenti di verificare le firme. Apre le porte affinché i contratti intelligenti agiscano in modo più simile agli EOA — ad esempio fornendo un modo per far funzionare "Accedi con Ethereum" con i contratti intelligenti — e può essere implementato in molti modi (Safe ha un'implementazione non banale e interessante da considerare).