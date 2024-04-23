---
title: "EIP-1271: firmare e verificare le firme dei contratti intelligenti"
description: Una panoramica della generazione e della verifica delle firme dei contratti intelligenti con EIP-1271. Rivediamo anche l'implementazione di EIP-1271 utilizzata in Safe (precedentemente Gnosis Safe) per fornire un esempio concreto agli sviluppatori di contratti intelligenti su cui costruire.
author: Nathan H. Leung
lang: it
tags:
  - "eip-1271"
  - "contratti intelligenti"
  - "verifica"
  - "firma"
skill: intermediate
published: 2023-01-12
---

Lo standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permette ai contratti intelligenti di verificare le firme.

In questo tutorial diamo una panoramica delle firme digitali, conoscenze di base su EIP-1271 e l'implementazione specifica di EIP-1271 utilizzata da [Safe](https://safe.global/) (precedentemente Gnosis Safe). Tutto ciò può servire come punto di partenza per implementare EIP-1271 nei tuoi contratti.

## Che cos'è una firma?

In questo contesto una firma (più precisamente una "firma digitale") è un messaggio con in più una sorta di prova che quel messaggio arriva da una specifica persona/mittente/indirizzo.

Ad esempio, una firma digitale potrebbe essere così:

1. Messaggio: "Voglio accedere a questo sito web con il mio portafoglio di Ethereum."
2. Firmatario: Il mio indirizzo è `0x000…`
3. Prova: Qui c'è una prova che io, `0x000…`, ho effettivamente creato questo intero messaggio (questo di solito è qualcosa di crittografico).

È importante notare che una firma digitale include sia un "messaggio" che una "firma".

Perché? Ad esempio, se tu mi dessi un contratto da firmare, e poi io tagliassi via la pagina con la firma e te lo restituissi solo con le mie firme senza il resto del contratto, il contratto non sarebbe valido.

Allo stesso modo una firma digitale non significa nulla senza un messaggio a essa associato!

## Perché esiste lo standard EIP-1271?

Per creare una firma digitale che possa essere utilizzata su una blockchain basata su Ethereum, in linea generale si ha bisogno di una chiave privata che nessun altro conosca. Questo è ciò che rende tua la tua firma (nessun altro può creare la stessa firma senza sapere la chiave segreta).

Il tuo conto di Ethereum (ovvero il tuo conto posseduto esternamente/EOA) ha una chiave privata associata, e questa è la chiave privata che tipicamente viene utilizzata quando un sito web o una dApp chiede la tua firma (ad es. per "Accedi con Ethereum").

Un'app può [verificare una firma](https://docs.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) creata usando una libreria esterna come ether.js [senza conoscere la tua chiave privata](https://en.wikipedia.org/wiki/Public-key_cryptography) ed essere sicura che _tu_ sia la persona che ha generato la firma.

> Infatti siccome le firme digitali degli EOA utilizzano una crittografia a chiave pubblica, possono essere generate e verificate **fuori dalla catena**! Così funziona la votazione senza gas nelle DAO: invece di inviare voti sulla catena, le firme digitali possono creare e verificare fuori dalla catena utilizzando librerie crittografiche.

Mentre i conti EOA hanno una chiave privata, i conti dei contratti intelligenti non hanno alcun tipo di chiave privata o segreta (quindi "Accedi con Ethereum", e simili non possono funzionare nativamente con i conti dei contratti intelligenti).

Il problema che EIP-1271 si pone di risolvere: come possiamo essere sicuri che la firma di un contratto intelligente sia valida se il contratto intelligente non ha un "segreto" da incorporare nella firma?

## Come funziona EIP-1271?

I contratti intelligenti non hanno chiavi private che possano essere usate per firmare i messaggi. Quindi come possiamo sapere se una firma è autentica?

Un'idea è che possiamo semplicemente _chiedere_ al contratto intelligente se una firma è autentica!

Quello che fa EIP-1271 è standardizzare l'idea di "chiedere" a un contratto intelligente se una data firma sia valida.

Un contratto che implementa EIP-1271 deve avere una funzione chiamata `isValidSignature` che accetti un messaggio e una firma. Il contratto può quindi eseguire qualche logica di validazione (le specifiche non impongono nulla di specifico qui) e restituire un valore che indica se la firma sia valida o meno.

Se `isValidSignature` restituisce un risultato valido, significa che il contratto sta dicendo "sì, approvo questa firma + messaggio!"

### Interfaccia

Ecco l'interfaccia esatta presente nelle specifiche EIP-1271 (parleremo del parametro `_hash` più avanti, ma per adesso, puoi pensarlo come il messaggio che viene verificato):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided hash
   * @param _hash      Hash of the data to be signed
   * @param _signature Signature byte array associated with _hash
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Esempio di implementazione di EIP-1271: Safe

I contratti possono implementare `isValidSignature` in diversi modi, le specifiche da sole non dicono molto riguardo l'esatta implementazione.

Un contratto degno di nota che implementa EIP-1271 è Safe (precedentemente Gnosis Safe).

Nel codice di Safe, `isValidSignature` [è implementata](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) in modo che le firme possano essere create e verificate in [due modi](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Messaggi on-chain
   1. Creazione: un proprietario sicuro crea una nuova transazione sicura per "firmare" il messaggio, passando il messaggio come dati nella transazione. Quando un numero sufficiente di proprietari firma la transazione per raggiungere la soglia multifirma, la transazione è trasmessa ed eseguita. Nella transazione viene chiamata una funzione sicura che aggiunge il messaggio all'elenco di messaggi "approvati".
   2. Verifica: chiama `isValidSignature` sul contratto di Safe, passando il messaggio da verificare come parametro messaggio e [un valore vuoto per il parametro firma](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (ossia `0x`). Safe vedrà che il parametro firma è vuoto e invece di verificare in maniera crittografica la firma, saprà di dover andare avanti e controllare se il messaggio si trova nell'elenco di messaggi "approvati".
2. Messaggi off-chain:
   1. Creazione: un proprietario sicuro crea un messaggio off-chain, poi fa in modo che altri proprietari sicuri firmino il messaggio, ognuno individualmente, finché ci sono abbastanza firme per superare la soglia di approvazione multifirma.
   2. Verifica: chiama `isValidSignature`. Nel parametro messaggio, passa il messaggio da verificare. Nel parametro firma, passa ognuna delle firme dei proprietari sicure tutte concatenate, una dietro l'altra. Safe controllerà che ci siano abbastanza firme per raggiungere la soglia **e** che ogni firma sia valida. Se è così, restituirà un valore che indica che la firma è stata verificata con successo.

## Che cos'è esattamente il parametro `_hash`? Perché non passiamo l'intero messaggio?

Potresti aver notato che la funzione `isValidSignature` nell'[interfaccia EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) non prende il messaggio stesso bensì un parametro `_hash`. Questo significa che invece che passare l'intero messaggio di lunghezza arbitraria a `isValidSignature`, passiamo invece un hash di 32-byte del messaggio (generalmente keccak256).

Ogni byte di calldata – ovvero dati dei parametri della funzione passati a una funzione del contratto intelligente – [costa 16 unità di gas (4 unità di gas se sono zero byte)](https://eips.ethereum.org/EIPS/eip-2028), quindi in questo modo si può risparmiare molto gas se il messaggio è lungo.

### Specifiche precedenti di EIP-1271

Esistono specifiche di EIP-1271 che hanno la funzione `isValidSignature` con un primo parametro di tipo `bytes` (di lunghezza arbitraria invece che di lunghezza fissa `bytes32`) e un parametro nome `message`. Questa è una [versione precedente](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) dello standard EIP-1271.

## Come dovrei implementare EIP-1271 nei miei contratti?

La specifica è molto flessibile in merito. L'implementazione di Safe ha alcune buone idee:

- È possibile considerare valide le firme EOA del "proprietario" del contratto.
- Si potrebbe memorizzare un elenco di messaggi approvati e considerare validi solo quelli.

Alla fine, dipende da te, in quanto sviluppatore del contratto!

## Conclusioni

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) è uno standard versatile che consente ai contratti intelligenti di verificare le firme. Apre la porta perché i contratti intelligenti agiscano in modo più simile agli EOA - ad esempio fornendo un modo per far funzionare "Accedi con Ethereum" con i contratti intelligenti - e può essere implementato in molti modi (Safe ha un'implementazione non banale e interessante da considerare).
