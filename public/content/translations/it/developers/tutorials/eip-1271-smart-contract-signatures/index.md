---
title: "EIP-1271: firmare e verificare le firme dei contratti intelligenti"
description: Una panoramica della generazione e della verifica delle firme dei contratti intelligenti con EIP-1271. Rivediamo anche l'implementazione di EIP-1271 utilizzata in Safe (precedentemente Gnosis Safe) per fornire un esempio concreto agli sviluppatori di contratti intelligenti su cui costruire.
author: Nathan H. Leung
lang: it
tags: [ "eip-1271", "Smart Contract", "verifica", "firma" ]
skill: intermediate
published: 12-01-2023
---

Lo standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) consente ai contratti intelligenti di verificare le firme.

In questa guida, forniamo una panoramica delle firme digitali, del contesto di EIP-1271 e dell'implementazione specifica di EIP-1271 usata da [Safe](https://safe.global/) (precedentemente Gnosis Safe). Tutto ciò può servire come punto di partenza per implementare EIP-1271 nei tuoi contratti.

## Che cos'è una firma?

In questo contesto una firma (più precisamente una "firma digitale") è un messaggio con in più una sorta di prova che quel messaggio arriva da una specifica persona/mittente/indirizzo.

Ad esempio, una firma digitale potrebbe essere così:

1. Messaggio: "Voglio accedere a questo sito web con il mio portafoglio di Ethereum."
2. Firmatario: Il mio indirizzo è `0x000…`
3. Prova: ecco una prova che io, `0x000…`, ho effettivamente creato questo intero messaggio (di solito è qualcosa di crittografico).

È importante notare che una firma digitale include sia un "messaggio" che una "firma".

Perché? Ad esempio, se tu mi dessi un contratto da firmare, e poi io tagliassi via la pagina con la firma e te lo restituissi solo con le mie firme senza il resto del contratto, il contratto non sarebbe valido.

Allo stesso modo una firma digitale non significa nulla senza un messaggio a essa associato!

## Perché esiste lo standard EIP-1271?

Per creare una firma digitale che possa essere utilizzata su una blockchain basata su Ethereum, in linea generale si ha bisogno di una chiave privata che nessun altro conosca. Questo è ciò che rende tua la tua firma (nessun altro può creare la stessa firma senza sapere la chiave segreta).

Il tuo account Ethereum (ossia, il tuo account di proprietà esterna/EOA) ha una chiave privata associata, e questa è la chiave privata che viene tipicamente usata quando un sito web o una dApp ti chiede una firma (ad es., per "Accedi con Ethereum").

Un'app può [verificare una firma](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) che crei usando una libreria di terze parti come ethers.js [senza conoscere la tua chiave privata](https://en.wikipedia.org/wiki/Public-key_cryptography) ed essere sicura che sia stato proprio _tu_ a creare la firma.

> Infatti, poiché le firme digitali EOA usano la crittografia a chiave pubblica, possono essere generate e verificate **fuori dalla catena**! Ecco come funziona il voto DAO senza gas: invece di inviare i voti sulla catena, le firme digitali possono essere create e verificate fuori dalla catena usando librerie crittografiche.

Mentre i conti EOA hanno una chiave privata, i conti dei contratti intelligenti non hanno alcun tipo di chiave privata o segreta (quindi "Accedi con Ethereum", e simili non possono funzionare nativamente con i conti dei contratti intelligenti).

Il problema che EIP-1271 si pone di risolvere: come possiamo essere sicuri che la firma di un contratto intelligente sia valida se il contratto intelligente non ha un "segreto" da incorporare nella firma?

## Come funziona EIP-1271?

I contratti intelligenti non hanno chiavi private che possano essere usate per firmare i messaggi. Quindi come possiamo sapere se una firma è autentica?

Beh, un'idea è che possiamo semplicemente _chiedere_ al contratto intelligente se una firma è autentica!

Quello che fa EIP-1271 è standardizzare l'idea di "chiedere" a un contratto intelligente se una data firma sia valida.

Un contratto che implementa EIP-1271 deve avere una funzione chiamata `isValidSignature` che accetta un messaggio e una firma. Il contratto può quindi eseguire qualche logica di validazione (le specifiche non impongono nulla di specifico qui) e restituire un valore che indica se la firma sia valida o meno.

Se `isValidSignature` restituisce un risultato valido, è come se il contratto dicesse "sì, approvo questa firma + messaggio!"

### Interfaccia

Ecco l'interfaccia esatta nelle specifiche EIP-1271 (parleremo del parametro `_hash` più avanti, ma per ora, consideralo come il messaggio che viene verificato):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Dovrebbe restituire se la firma fornita è valida per l'hash fornito
   * @param _hash      Hash dei dati da firmare
   * @param _signature Array di byte della firma associato a _hash
   *
   * DEVE restituire il valore magico bytes4 0x1626ba7e quando la funzione passa.
   * NON DEVE modificare lo stato (usando STATICCALL per solc < 0.5, modificatore view per solc > 0.5)
   * DEVE consentire chiamate esterne
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

I contratti possono implementare `isValidSignature` in molti modi: la specifica non dice molto sull'implementazione esatta.

Un contratto degno di nota che implementa EIP-1271 è Safe (precedentemente Gnosis Safe).

Nel codice di Safe, `isValidSignature` [è implementato](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) in modo che le firme possano essere create e verificate in [due modi](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Messaggi sulla catena
   1. Creazione: un proprietario sicuro crea una nuova transazione sicura per "firmare" il messaggio, passando il messaggio come dati nella transazione. Quando un numero sufficiente di proprietari firma la transazione per raggiungere la soglia multifirma, la transazione è trasmessa ed eseguita. Nella transazione, viene chiamata una funzione di Safe (`signMessage(bytes calldata _data)`) che aggiunge il messaggio a una lista di messaggi "approvati".
   2. Verifica: chiama `isValidSignature` sul contratto Safe e passa il messaggio da verificare come parametro del messaggio e [un valore vuoto per il parametro della firma](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (ossia, `0x`). Safe vedrà che il parametro firma è vuoto e invece di verificare in maniera crittografica la firma, saprà di dover andare avanti e controllare se il messaggio si trova nell'elenco di messaggi "approvati".
2. Messaggi fuori dalla catena:
   1. Creazione: un proprietario di Safe crea un messaggio fuori dalla catena, poi fa in modo che altri proprietari di Safe firmino il messaggio individualmente finché non ci sono abbastanza firme per superare la soglia di approvazione multisig.
   2. Verifica: chiama `isValidSignature`. Nel parametro messaggio, passa il messaggio da verificare. Nel parametro firma, passa ognuna delle firme dei proprietari sicure tutte concatenate, una dietro l'altra. Safe controllerà che ci siano abbastanza firme per raggiungere la soglia **e** che ogni firma sia valida. Se è così, restituirà un valore che indica che la firma è stata verificata con successo.

## Che cos'è esattamente il parametro `_hash`? Perché non passiamo l'intero messaggio?

Potresti aver notato che la funzione `isValidSignature` nell'[interfaccia EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) non accetta il messaggio stesso, ma un parametro `_hash`. Questo significa che invece di passare l'intero messaggio di lunghezza arbitraria a `isValidSignature`, passiamo un hash di 32 byte del messaggio (generalmente keccak256).

Ogni byte di calldata — ossia, i dati dei parametri di funzione passati a una funzione di un contratto intelligente — [costa 16 gas (4 gas se è un byte zero)](https://eips.ethereum.org/EIPS/eip-2028), quindi questo può far risparmiare molto gas se un messaggio è lungo.

### Specifiche precedenti di EIP-1271

Esistono in circolazione specifiche EIP-1271 che hanno una funzione `isValidSignature` con un primo parametro di tipo `bytes` (a lunghezza arbitraria, invece di `bytes32` a lunghezza fissa) e con `message` come nome del parametro. Questa è una [versione precedente](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) dello standard EIP-1271.

## Come dovrei implementare EIP-1271 nei miei contratti?

La specifica è molto flessibile in merito. L'implementazione di Safe ha alcune buone idee:

- È possibile considerare valide le firme EOA del "proprietario" del contratto.
- Si potrebbe memorizzare un elenco di messaggi approvati e considerare validi solo quelli.

Alla fine, dipende da te, in quanto sviluppatore del contratto!

## Conclusione

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) è uno standard versatile che consente ai contratti intelligenti di verificare le firme. Apre la porta perché i contratti intelligenti agiscano in modo più simile agli EOA - ad esempio fornendo un modo per far funzionare "Accedi con Ethereum" con i contratti intelligenti - e può essere implementato in molti modi (Safe ha un'implementazione non banale e interessante da considerare).
