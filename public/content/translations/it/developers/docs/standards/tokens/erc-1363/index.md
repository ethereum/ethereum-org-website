---
title: Standard del token pagabile ERC-1363
description: ERC-1363 è un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di una logica personalizzata su un contratto del destinatario dopo i trasferimenti, o su un contratto dello spender dopo le approvazioni, il tutto in un'unica transazione.
lang: it
---

## Introduzione {#introduction}

### Cos'è ERC-1363? {#what-is-erc1363}

ERC-1363 è un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di una logica personalizzata su un contratto del destinatario dopo i trasferimenti, o su un contratto dello spender dopo le approvazioni, il tutto in un'unica transazione.

### Differenze rispetto a ERC-20 {#erc20-differences}

Le operazioni ERC-20 standard come `transfer`, `transferFrom` e `approve` non consentono l'esecuzione di codice sul contratto del destinatario o dello spender senza una transazione separata.
Ciò introduce complessità nello sviluppo dell'interfaccia utente e attrito nell'adozione, perché gli utenti devono attendere l'esecuzione della prima transazione per poi inviare la seconda.
Devono anche pagare due volte il GAS.

ERC-1363 rende i token fungibili in grado di eseguire azioni più facilmente e di funzionare senza l'uso di alcun listener off-chain.
Consente di effettuare una callback su un contratto del ricevente o dello spender, dopo un trasferimento o un'approvazione, in un'unica transazione.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, si consiglia di leggere prima:

- [Standard dei token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-1363 introduce un'API standard che consente ai token ERC-20 di interagire con i contratti intelligenti dopo `transfer`, `transferFrom` o `approve`.

Questo standard fornisce le funzionalità di base per trasferire i token, oltre a consentire l'approvazione dei token in modo che possano essere spesi da un'altra terza parte on-chain e quindi effettuare una callback sul contratto del ricevente o dello spender.

Esistono molti usi proposti per i contratti intelligenti che possono accettare le callback ERC-20.

Ad esempio:

- **Crowdsale**: i token inviati attivano l'allocazione istantanea della ricompensa.
- **Servizi**: il pagamento attiva l'accesso al servizio in un unico passaggio.
- **Fatture**: i token saldano automaticamente le fatture.
- **Abbonamenti**: l'approvazione della tariffa annuale attiva l'abbonamento con il pagamento del primo mese.

Per queste ragioni, fu originariamente chiamato **"Token pagabile"**.

Il comportamento della callback ne espande ulteriormente l'utilità, consentendo interazioni senza interruzioni come:

- **Staking**: i token trasferiti attivano il blocco automatico in un contratto di staking.
- **Votazioni**: i token ricevuti registrano i voti in un sistema di governance.
- **Scambio**: le approvazioni dei token attivano la logica di scambio in un unico passaggio.

I token ERC-1363 possono essere utilizzati per utilità specifiche in tutti i casi in cui è richiesta l'esecuzione di una callback dopo la ricezione di un trasferimento o di un'approvazione.
ERC-1363 è utile anche per evitare la perdita o il blocco di token nei contratti intelligenti, verificando la capacità del destinatario di gestire i token.

A differenza di altre proposte di estensione ERC-20, ERC-1363 non sovrascrive i metodi `transfer` e `transferFrom` di ERC-20 e definisce gli ID delle interfacce da implementare, mantenendo la retrocompatibilità con ERC-20.

Da [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metodi {#methods}

I contratti intelligenti che implementano lo standard ERC-1363 **DEVONO** implementare tutte le funzioni dell'interfaccia `ERC1363`, così come le interfacce `ERC20` ed `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di codice su un contratto del destinatario
 * dopo `transfer` o `transferFrom`, o di codice su un contratto dello spender dopo `approve`, in un'unica transazione.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTA: l'identificatore ERC-165 per questa interfaccia è 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Sposta un importo di token pari a `value` dal conto del chiamante a `to`
   * e quindi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @return Un valore booleano che indica che l'operazione è riuscita, a meno che non venga generata un'eccezione.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Sposta un importo di token pari a `value` dal conto del chiamante a `to`
   * e quindi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @param data Dati aggiuntivi senza un formato specificato, inviati nella chiamata a `to`.
   * @return Un valore booleano che indica che l'operazione è riuscita, a meno che non venga generata un'eccezione.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Sposta un importo di token pari a `value` da `from` a `to` usando il meccanismo di allowance
   * e quindi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param from L'indirizzo da cui inviare i token.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @return Un valore booleano che indica che l'operazione è riuscita, a meno che non venga generata un'eccezione.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Sposta un importo di token pari a `value` da `from` a `to` usando il meccanismo di allowance
   * e quindi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param from L'indirizzo da cui inviare i token.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @param data Dati aggiuntivi senza un formato specificato, inviati nella chiamata a `to`.
   * @return Un valore booleano che indica che l'operazione è riuscita, a meno che non venga generata un'eccezione.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Imposta un importo di token pari a `value` come allowance di `spender` sui token del chiamante
   * e quindi chiama `ERC1363Spender::onApprovalReceived` su `spender`.
   * @param spender L'indirizzo che spenderà i fondi.
   * @param value La quantità di token da spendere.
   * @return Un valore booleano che indica che l'operazione è riuscita, a meno che non venga generata un'eccezione.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Imposta un importo di token pari a `value` come allowance di `spender` sui token del chiamante
   * e quindi chiama `ERC1363Spender::onApprovalReceived` su `spender`.
   * @param spender L'indirizzo che spenderà i fondi.
   * @param value La quantità di token da spendere.
   * @param data Dati aggiuntivi senza un formato specificato, inviati nella chiamata a `spender`.
   * @return Un valore booleano che indica che l'operazione è riuscita, a meno che non venga generata un'eccezione.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Un contratto intelligente che desidera accettare i token ERC-1363 tramite `transferAndCall` o `transferFromAndCall` **DEVE** implementare l'interfaccia `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Interfaccia per qualsiasi contratto che voglia supportare `transferAndCall` o `transferFromAndCall` da contratti di token ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Ogni volta che i token ERC-1363 vengono trasferiti a questo contratto tramite `ERC1363::transferAndCall` o `ERC1363::transferFromAndCall`
   * da `operator` da `from`, viene chiamata questa funzione.
   *
   * NOTA: per accettare il trasferimento, deve restituire
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (cioè 0x88a7ca5c, o il selettore della propria funzione).
   *
   * @param operator L'indirizzo che ha chiamato la funzione `transferAndCall` o `transferFromAndCall`.
   * @param from L'indirizzo da cui vengono trasferiti i token.
   * @param value La quantità di token trasferiti.
   * @param data Dati aggiuntivi senza un formato specificato.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` se il trasferimento è consentito, a meno che non venga generata un'eccezione.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Un contratto intelligente che desidera accettare i token ERC-1363 tramite `approveAndCall` **DEVE** implementare l'interfaccia `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Interfaccia per qualsiasi contratto che voglia supportare `approveAndCall` da contratti di token ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Ogni volta che il `proprietario` di un token ERC-1363 approva questo contratto tramite `ERC1363::approveAndCall`
   * per spendere i propri token, viene chiamata questa funzione.
   *
   * NOTA: per accettare l'approvazione, deve restituire
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (cioè 0x7b04a2d0, o il selettore della propria funzione).
   *
   * @param owner L'indirizzo che ha chiamato la funzione `approveAndCall` e che in precedenza possedeva i token.
   * @param value La quantità di token da spendere.
   * @param data Dati aggiuntivi senza un formato specificato.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` se l'approvazione è consentita, a meno che non venga generata un'eccezione.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Letture consigliate {#further-reading}

- [ERC-1363: Standard del token pagabile](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: repository GitHub](https://github.com/vittominacori/erc1363-payable-token)
