---
title: ERC-1363 Zahlbarer Token-Standard
description: ERC-1363 ist eine Erweiterungsschnittstelle für ERC-20-Token, die die Ausführung einer benutzerdefinierten Logik auf einem Empfängervertrag nach Übertragungen oder auf einem Spendervertrag nach Genehmigungen innerhalb einer einzigen Transaktion unterstützt.
lang: de
---

## Einführung {#introduction}

### Was ist ERC-1363? {#what-is-erc1363}

ERC-1363 ist eine Erweiterungsschnittstelle für ERC-20-Token, die die Ausführung einer benutzerdefinierten Logik auf einem Empfängervertrag nach Übertragungen oder auf einem Spendervertrag nach Genehmigungen innerhalb einer einzigen Transaktion unterstützt.

### Unterschiede zu ERC-20 {#erc20-differences}

Standard-ERC-20-Operationen wie `transfer`, `transferFrom` und `approve` erlauben keine Codeausführung auf dem Empfänger- oder Spendervertrag ohne eine separate Transaktion.
Dies führt zu Komplexität in der UI-Entwicklung und zu Reibungsverlusten bei der Einführung, da Benutzer auf die Ausführung der ersten Transaktion warten und dann die zweite einreichen müssen.
Sie müssen auch zweimal GAS bezahlen.

ERC-1363 ermöglicht es fungiblen Token, Aktionen einfacher durchzuführen und ohne die Verwendung eines Off-Chain-Listeners zu funktionieren.
Es ermöglicht, nach einer Übertragung oder einer Genehmigung in einer einzigen Transaktion einen Callback auf einem Empfänger- oder Spendervertrag durchzuführen.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zunächst Folgendes zu lesen:

- [Token-Standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Hauptteil {#body}

ERC-1363 führt eine Standard-API für ERC-20-Token ein, um nach `transfer`, `transferFrom` oder `approve` mit Smart Contracts zu interagieren.

Dieser Standard bietet grundlegende Funktionen zum Übertragen von Token und ermöglicht die Genehmigung von Token, damit sie von einem anderen On-Chain-Drittanbieter ausgegeben werden können, um dann einen Callback auf dem Empfänger- oder Spendervertrag durchzuführen.

Es gibt viele vorgeschlagene Anwendungsfälle für Smart Contracts, die ERC-20-Callbacks akzeptieren können.

Beispiele könnten sein:

- **Crowdsales**: Gesendete Token lösen eine sofortige Zuteilung der Belohnung aus.
- **Dienstleistungen**: Die Zahlung aktiviert den Dienstzugang in einem Schritt.
- **Rechnungen**: Token begleichen Rechnungen automatisch.
- **Abonnements**: Die Genehmigung des jährlichen Tarifs aktiviert das Abonnement mit der Zahlung des ersten Monats.

Aus diesen Gründen wurde es ursprünglich **„Payable Token“** genannt.

Das Callback-Verhalten erweitert den Nutzen zusätzlich und ermöglicht nahtlose Interaktionen wie:

- **Staking**: Übertragene Token lösen eine automatische Sperrung in einem Staking-Vertrag aus.
- **Abstimmung**: Erhaltene Token registrieren Stimmen in einem Governance-System.
- **Swapping**: Token-Genehmigungen aktivieren die Swap-Logik in einem einzigen Schritt.

ERC-1363-Token können für bestimmte Zwecke in allen Fällen verwendet werden, in denen nach einer erhaltenen Übertragung oder Genehmigung ein Callback ausgeführt werden muss.
ERC-1363 ist auch nützlich, um den Verlust oder die Sperrung von Token in Smart Contracts zu vermeiden, indem die Fähigkeit des Empfängers, die Token zu handhaben, überprüft wird.

Im Gegensatz zu anderen ERC-20-Erweiterungsvorschlägen überschreibt ERC-1363 nicht die `transfer`- und `transferFrom`-Methoden von ERC-20 und definiert die zu implementierenden Schnittstellen-IDs, wodurch die Abwärtskompatibilität mit ERC-20 erhalten bleibt.

Aus [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Methoden {#methods}

Smart Contracts, die den ERC-1363-Standard implementieren, **MÜSSEN** alle Funktionen der `ERC1363`-Schnittstelle sowie die `ERC20`- und `ERC165`-Schnittstellen implementieren.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Eine Erweiterungsschnittstelle für ERC-20-Token, die die Ausführung von Code in einem Empfängervertrag nach `transfer` oder `transferFrom` oder Code in einem Spendervertrag nach `approve` in einer einzigen Transaktion unterstützt.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * HINWEIS: Die ERC-165-Kennung für diese Schnittstelle lautet 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Verschiebt einen Token-Betrag von `value` vom Konto des Aufrufers nach `to` und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param to Die Adresse, an die die Token übertragen werden.
   * @param value Der Betrag der zu übertragenden Token.
   * @return Ein boolescher Wert, der angibt, dass die Operation erfolgreich war, es sei denn, es wird ein Fehler ausgelöst.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Verschiebt einen Token-Betrag von `value` vom Konto des Aufrufers nach `to` und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param to Die Adresse, an die die Token übertragen werden.
   * @param value Der Betrag der zu übertragenden Token.
   * @param data Zusätzliche Daten ohne bestimmtes Format, die beim Aufruf an `to` gesendet werden.
   * @return Ein boolescher Wert, der angibt, dass die Operation erfolgreich war, es sei denn, es wird ein Fehler ausgelöst.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Verschiebt einen Token-Betrag von `value` von `from` nach `to` unter Verwendung des Genehmigungsmechanismus und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param from Die Adresse, von der die Token gesendet werden.
   * @param to Die Adresse, an die die Token übertragen werden.
   * @param value Der Betrag der zu übertragenden Token.
   * @return Ein boolescher Wert, der angibt, dass die Operation erfolgreich war, es sei denn, es wird ein Fehler ausgelöst.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Verschiebt einen Token-Betrag von `value` von `from` nach `to` unter Verwendung des Genehmigungsmechanismus und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param from Die Adresse, von der die Token gesendet werden.
   * @param to Die Adresse, an die die Token übertragen werden.
   * @param value Der Betrag der zu übertragenden Token.
   * @param data Zusätzliche Daten ohne bestimmtes Format, die beim Aufruf an `to` gesendet werden.
   * @return Ein boolescher Wert, der angibt, dass die Operation erfolgreich war, es sei denn, es wird ein Fehler ausgelöst.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Legt einen Token-Betrag von `value` als Genehmigung für `spender` über die Token des Aufrufers fest und ruft dann `ERC1363Spender::onApprovalReceived` auf `spender` auf.
   * @param spender Die Adresse, die das Guthaben ausgeben wird.
   * @param value Der Betrag der auszugebenden Token.
   * @return Ein boolescher Wert, der angibt, dass die Operation erfolgreich war, es sei denn, es wird ein Fehler ausgelöst.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Legt einen Token-Betrag von `value` als Genehmigung für `spender` über die Token des Aufrufers fest und ruft dann `ERC1363Spender::onApprovalReceived` auf `spender` auf.
   * @param spender Die Adresse, die das Guthaben ausgeben wird.
   * @param value Der Betrag der auszugebenden Token.
   * @param data Zusätzliche Daten ohne bestimmtes Format, die beim Aufruf an `spender` gesendet werden.
   * @return Ein boolescher Wert, der angibt, dass die Operation erfolgreich war, es sei denn, es wird ein Fehler ausgelöst.
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

Ein Smart Contract, der ERC-1363-Token über `transferAndCall` oder `transferFromAndCall` annehmen möchte, **MUSS** die `ERC1363Receiver`-Schnittstelle implementieren:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Schnittstelle für jeden Vertrag, der `transferAndCall` oder `transferFromAndCall` von ERC-1363-Token-Verträgen unterstützen möchte.
 */
interface ERC1363Receiver {
  /**
   * @dev Immer wenn ERC-1363-Token über `ERC1363::transferAndCall` oder `ERC1363::transferFromAndCall` von `operator` von `from` an diesen Vertrag übertragen werden, wird diese Funktion aufgerufen.
   *
   * HINWEIS: Um die Übertragung zu akzeptieren, muss diese Funktion `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` zurückgeben
   * (d. h. 0x88a7ca5c oder ihren eigenen Funktionsselektor).
   *
   * @param operator Die Adresse, die die Funktion `transferAndCall` oder `transferFromAndCall` aufgerufen hat.
   * @param from Die Adresse, von der die Token übertragen werden.
   * @param value Der Betrag der übertragenen Token.
   * @param data Zusätzliche Daten ohne bestimmtes Format.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` wenn die Übertragung zulässig ist, es sei denn, es wird ein Fehler ausgelöst.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Ein Smart Contract, der ERC-1363-Token über `approveAndCall` annehmen möchte, **MUSS** die `ERC1363Spender`-Schnittstelle implementieren:

```solidity
/**
 * @title ERC1363Spender
 * @dev Schnittstelle für jeden Vertrag, der `approveAndCall` von ERC-1363-Token-Verträgen unterstützen möchte.
 */
interface ERC1363Spender {
  /**
   * @dev Immer wenn ein ERC-1363-Token-`owner` diesen Vertrag über `ERC1363::approveAndCall` zur Ausgabe seiner Token autorisiert,
   * wird diese Funktion aufgerufen.
   *
   * HINWEIS: Um die Genehmigung zu akzeptieren, muss diese Funktion `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` zurückgeben
   * (d. h. 0x7b04a2d0 oder ihren eigenen Funktionsselektor).
   *
   * @param owner Die Adresse, die die Funktion `approveAndCall` aufgerufen hat und zuvor die Token besaß.
   * @param value Der Betrag der auszugebenden Token.
   * @param data Zusätzliche Daten ohne bestimmtes Format.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` wenn die Genehmigung zulässig ist, es sei denn, es wird ein Fehler ausgelöst.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Weiterführende Lektüre {#further-reading}

- [ERC-1363: Zahlbarer Token-Standard](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub-Repo](https://github.com/vittominacori/erc1363-payable-token)
