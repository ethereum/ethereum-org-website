---
title: Standard dei Token Pagabili ERC-1363
description: "L'ERC-1363 è un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di logica personalizzata su un contratto ricevente dopo i trasferimenti, o su un contratto di spesa dopo le approvazioni, tutto all'interno di una singola transazione."
lang: it
---

## Introduzione {#introduction}

### Cos'è l'ERC-1363? {#what-is-erc1363}

L'ERC-1363 è un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di logica personalizzata su un contratto ricevente dopo i trasferimenti, o su un contratto di spesa dopo le approvazioni, tutto all'interno di una singola transazione.

### Differenze rispetto all'ERC-20 {#erc20-differences}

Le operazioni standard dell'ERC-20 come `transfer`, `transferFrom` e `approve`, non consentono l'esecuzione di codice sul contratto ricevente o di spesa senza una transazione separata.
Ciò introduce complessità nello sviluppo dell'interfaccia utente (UI) e attrito nell'adozione, poiché gli utenti devono attendere l'esecuzione della prima transazione per poi inviare la seconda.
Devono inoltre pagare il gas due volte.

L'ERC-1363 rende i token fungibili capaci di eseguire azioni più facilmente e di funzionare senza l'uso di alcun listener fuori catena.
Consente di effettuare una callback su un contratto ricevente o di spesa, dopo un trasferimento o un'approvazione, in una singola transazione.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima:

- [Standard dei token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corpo {#body}

L'ERC-1363 introduce un'API standard per i token ERC-20 per interagire con i contratti intelligenti dopo `transfer`, `transferFrom` o `approve`.

Questo standard fornisce funzionalità di base per trasferire token, oltre a consentire l'approvazione dei token in modo che possano essere spesi da un'altra terza parte on-chain, per poi effettuare una callback sul contratto ricevente o di spesa.

Ci sono molti usi proposti per i contratti intelligenti che possono accettare callback ERC-20.

Alcuni esempi potrebbero essere:

- **Crowdsale**: i token inviati innescano l'allocazione istantanea delle ricompense.
- **Servizi**: il pagamento attiva l'accesso al servizio in un solo passaggio.
- **Fatture**: i token saldano le fatture automaticamente.
- **Abbonamenti**: l'approvazione della tariffa annuale attiva l'abbonamento con il pagamento del primo mese.

Per questi motivi è stato originariamente chiamato **"Token Pagabile"**.

Il comportamento della callback espande ulteriormente la sua utilità, consentendo interazioni fluide come:

- **Staking**: i token trasferiti innescano il blocco automatico in un contratto di staking.
- **Votazione**: i token ricevuti registrano i voti in un sistema di governance.
- **Scambio**: le approvazioni dei token attivano la logica di scambio in un singolo passaggio.

I token ERC-1363 possono essere utilizzati per utilità specifiche in tutti i casi che richiedono l'esecuzione di una callback dopo un trasferimento o un'approvazione ricevuta.
L'ERC-1363 è utile anche per evitare la perdita o il blocco dei token nei contratti intelligenti verificando la capacità del destinatario di gestire i token.

A differenza di altre proposte di estensione dell'ERC-20, l'ERC-1363 non sovrascrive i metodi `transfer` e `transferFrom` dell'ERC-20 e definisce gli ID delle interfacce da implementare mantenendo la retrocompatibilità con l'ERC-20.

Dall'[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metodi {#methods}

I contratti intelligenti che implementano lo standard ERC-1363 **DEVONO** implementare tutte le funzioni nell'interfaccia `ERC1363`, così come le interfacce `ERC20` e `ERC165`.

```solidity
pragma solidity ^0.8.0;

/* *
 * @title ERC1363
 * @dev Un'interfaccia di estensione per i token ERC-20 che supporta l'esecuzione di codice su un contratto destinatario
 * dopo `transfer` o `transferFrom`, o di codice su un contratto spenditore dopo `approve`, in una singola transazione. */





interface ERC1363 is ERC20, ERC165 {
  /* * NOTE: l'identificatore ERC-165 per questa interfaccia è 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)')) */
  










  /* *
   * @dev Sposta una quantità `value` di token dall'account del chiamante a `to`
   * e poi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @return Un valore booleano che indica che l'operazione ha avuto successo a meno che non venga lanciata un'eccezione. */
  






  function transferAndCall(address to, uint256 value) external returns (bool);

  /* *
   * @dev Sposta una quantità `value` di token dall'account del chiamante a `to`
   * e poi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @param data Dati aggiuntivi senza formato specificato, inviati nella chiamata a `to`.
   * @return Un valore booleano che indica che l'operazione ha avuto successo a meno che non venga lanciata un'eccezione. */
  







  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev Sposta una quantità `value` di token da `from` a `to` utilizzando il meccanismo di allowance
   * e poi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param from L'indirizzo da cui inviare i token.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @return Un valore booleano che indica che l'operazione ha avuto successo a meno che non venga lanciata un'eccezione. */
  







  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /* *
   * @dev Sposta una quantità `value` di token da `from` a `to` utilizzando il meccanismo di allowance
   * e poi chiama `ERC1363Receiver::onTransferReceived` su `to`.
   * @param from L'indirizzo da cui inviare i token.
   * @param to L'indirizzo a cui vengono trasferiti i token.
   * @param value La quantità di token da trasferire.
   * @param data Dati aggiuntivi senza formato specificato, inviati nella chiamata a `to`.
   * @return Un valore booleano che indica che l'operazione ha avuto successo a meno che non venga lanciata un'eccezione. */
  








  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev Imposta una quantità `value` di token come allowance di `spender` sui token del chiamante
   * e poi chiama `ERC1363Spender::onApprovalReceived` su `spender`.
   * @param spender L'indirizzo che spenderà i fondi.
   * @param value La quantità di token da spendere.
   * @return Un valore booleano che indica che l'operazione ha avuto successo a meno che non venga lanciata un'eccezione. */
  






  function approveAndCall(address spender, uint256 value) external returns (bool);

  /* *
   * @dev Imposta una quantità `value` di token come allowance di `spender` sui token del chiamante
   * e poi chiama `ERC1363Spender::onApprovalReceived` su `spender`.
   * @param spender L'indirizzo che spenderà i fondi.
   * @param value La quantità di token da spendere.
   * @param data Dati aggiuntivi senza formato specificato, inviati nella chiamata a `spender`.
   * @return Un valore booleano che indica che l'operazione ha avuto successo a meno che non venga lanciata un'eccezione. */
  







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

Un contratto intelligente che desidera accettare token ERC-1363 tramite `transferAndCall` o `transferFromAndCall` **DEVE** implementare l'interfaccia `ERC1363Receiver`:

```solidity
/* *
 * @title ERC1363Receiver
 * @dev Interfaccia per qualsiasi contratto che desidera supportare `transferAndCall` o `transferFromAndCall` dai contratti token ERC-1363. */




interface ERC1363Receiver {
  /* *
   * @dev Ogni volta che i token ERC-1363 vengono trasferiti a questo contratto tramite `ERC1363::transferAndCall` o `ERC1363::transferFromAndCall`
   * da `operator` da `from`, viene chiamata questa funzione.
   *
   * NOTE: Per accettare il trasferimento, questa deve restituire
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (cioè 0x88a7ca5c, o il proprio selettore di funzione).
   *
   * @param operator L'indirizzo che ha chiamato la funzione `transferAndCall` o `transferFromAndCall`.
   * @param from L'indirizzo da cui vengono trasferiti i token.
   * @param value La quantità di token trasferiti.
   * @param data Dati aggiuntivi senza formato specificato.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` se il trasferimento è consentito a meno che non venga lanciata un'eccezione. */
  













  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Un contratto intelligente che desidera accettare token ERC-1363 tramite `approveAndCall` **DEVE** implementare l'interfaccia `ERC1363Spender`:

```solidity
/* *
 * @title ERC1363Spender
 * @dev Interfaccia per qualsiasi contratto che desidera supportare `approveAndCall` dai contratti token ERC-1363. */




interface ERC1363Spender {
  /* *
   * @dev Ogni volta che un `owner` di token ERC-1363 approva questo contratto tramite `ERC1363::approveAndCall`
   * per spendere i propri token, viene chiamata questa funzione.
   *
   * NOTE: Per accettare l'approvazione, questa deve restituire
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (cioè 0x7b04a2d0, o il proprio selettore di funzione).
   *
   * @param owner L'indirizzo che ha chiamato la funzione `approveAndCall` e che in precedenza possedeva i token.
   * @param value La quantità di token da spendere.
   * @param data Dati aggiuntivi senza formato specificato.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` se l'approvazione è consentita a meno che non venga lanciata un'eccezione. */
  












  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Letture di approfondimento {#further-reading}

- [ERC-1363: Standard dei Token Pagabili](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repository GitHub](https://github.com/vittominacori/erc1363-payable-token)