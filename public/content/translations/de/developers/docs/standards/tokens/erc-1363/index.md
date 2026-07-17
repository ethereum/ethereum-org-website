---
title: ERC-1363 Payable Token-Standard
description: "ERC-1363 ist eine Erweiterungsschnittstelle für ERC-20-Token, die die Ausführung benutzerdefinierter Logik auf einem Empfänger-Vertrag nach Transfers oder auf einem Spender-Vertrag nach Genehmigungen innerhalb einer einzigen Transaktion unterstützt."
lang: de
---

## Einführung {#introduction}

### Was ist ERC-1363? {#what-is-erc1363}

ERC-1363 ist eine Erweiterungsschnittstelle für ERC-20-Token, die die Ausführung benutzerdefinierter Logik auf einem Empfänger-Vertrag nach Transfers oder auf einem Spender-Vertrag nach Genehmigungen innerhalb einer einzigen Transaktion unterstützt.

### Unterschiede zu ERC-20 {#erc20-differences}

Standardmäßige ERC-20-Operationen wie `transfer`, `transferFrom` und `approve` erlauben keine Codeausführung auf dem Empfänger- oder Spender-Vertrag ohne eine separate Transaktion.
Dies führt zu Komplexität bei der UI-Entwicklung und Reibungsverlusten bei der Akzeptanz, da Benutzer warten müssen, bis die erste Transaktion ausgeführt wurde, und dann die zweite einreichen müssen.
Sie müssen außerdem zweimal Gas bezahlen.

ERC-1363 ermöglicht es fungiblen Token, Aktionen einfacher auszuführen und ohne die Verwendung eines offchain-Listeners zu funktionieren.
Es ermöglicht einen Callback auf einem Empfänger- oder Spender-Vertrag nach einem Transfer oder einer Genehmigung in einer einzigen Transaktion.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über Folgendes zu informieren:

- [Token-Standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Hauptteil {#body}

ERC-1363 führt eine Standard-API für ERC-20-Token ein, um mit Smart Contracts nach `transfer`, `transferFrom` oder `approve` zu interagieren.

Dieser Standard bietet grundlegende Funktionen zum Transfer von Token sowie die Möglichkeit, Token zu genehmigen, damit sie von einer anderen onchain-Drittpartei ausgegeben werden können, und anschließend einen Callback auf dem Empfänger- oder Spender-Vertrag auszuführen.

Es gibt viele vorgeschlagene Anwendungsfälle für Smart Contracts, die ERC-1363-Callbacks akzeptieren können.

Beispiele könnten sein:

- **Crowdsales**: Gesendete Token lösen eine sofortige Zuweisung der Belohnung aus.
- **Dienstleistungen**: Die Zahlung aktiviert den Zugang zum Dienst in einem einzigen Schritt.
- **Rechnungen**: Token begleichen Rechnungen automatisch.
- **Abonnements**: Die Genehmigung des Jahresbeitrags aktiviert das Abonnement mit der Zahlung des ersten Monats.

Aus diesen Gründen wurde er ursprünglich **„Payable Token“** genannt.

Das Callback-Verhalten erweitert seinen Nutzen weiter und ermöglicht nahtlose Interaktionen wie:

- **Staking**: Übertragene Token lösen eine automatische Sperrung in einem Staking-Vertrag aus.
- **Abstimmungen**: Empfangene Token registrieren Stimmen in einem Governance-System.
- **Tauschen**: Token-Genehmigungen aktivieren die Tausch-Logik in einem einzigen Schritt.

ERC-1363-Token können für spezifische Zwecke in allen Fällen verwendet werden, die die Ausführung eines Callbacks nach einem Transfer oder einer erhaltenen Genehmigung erfordern.
ERC-1363 ist auch nützlich, um Token-Verlust oder das Sperren von Token in Smart Contracts zu vermeiden, indem die Fähigkeit des Empfängers zum Umgang mit Token verifiziert wird.

Im Gegensatz zu anderen ERC-20-Erweiterungsvorschlägen überschreibt ERC-1363 nicht die ERC-20-Methoden `transfer` und `transferFrom` und definiert die zu implementierenden Schnittstellen-IDs, wobei die Abwärtskompatibilität mit ERC-20 erhalten bleibt.

Aus [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Methoden {#methods}

Smart Contracts, die den ERC-1363-Standard implementieren, **MÜSSEN** alle Funktionen in der Schnittstelle `ERC1363` sowie die Schnittstellen `ERC20` und `ERC165` implementieren.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Eine Erweiterungsschnittstelle für ERC-20 Token, die das Ausführen von Code auf einem Empfänger-Vertrag
 * nach `transfer` oder `transferFrom`, oder Code auf einem Spender-Vertrag nach `approve`, in einer einzigen Transaktion unterstützt.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * HINWEIS: Der ERC-165-Identifikator für diese Schnittstelle ist 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Verschiebt eine `value`-Menge an Token vom Konto des Aufrufers zu `to`
   * und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param to Die Adresse, an die Token transferiert werden.
   * @param value Die Menge der zu transferierenden Token.
   * @return Ein boolescher Wert, der anzeigt, dass die Operation erfolgreich war, sofern kein Fehler geworfen wird.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Verschiebt eine `value`-Menge an Token vom Konto des Aufrufers zu `to`
   * und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param to Die Adresse, an die Token transferiert werden.
   * @param value Die Menge der zu transferierenden Token.
   * @param data Zusätzliche Daten ohne spezifiziertes Format, die im Aufruf an `to` gesendet werden.
   * @return Ein boolescher Wert, der anzeigt, dass die Operation erfolgreich war, sofern kein Fehler geworfen wird.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Verschiebt eine `value`-Menge an Token von `from` zu `to` unter Verwendung des Allowance-Mechanismus
   * und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param from Die Adresse, von der Token gesendet werden.
   * @param to Die Adresse, an die Token transferiert werden.
   * @param value Die Menge der zu transferierenden Token.
   * @return Ein boolescher Wert, der anzeigt, dass die Operation erfolgreich war, sofern kein Fehler geworfen wird.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Verschiebt eine `value`-Menge an Token von `from` zu `to` unter Verwendung des Allowance-Mechanismus
   * und ruft dann `ERC1363Receiver::onTransferReceived` auf `to` auf.
   * @param from Die Adresse, von der Token gesendet werden.
   * @param to Die Adresse, an die Token transferiert werden.
   * @param value Die Menge der zu transferierenden Token.
   * @param data Zusätzliche Daten ohne spezifiziertes Format, die im Aufruf an `to` gesendet werden.
   * @return Ein boolescher Wert, der anzeigt, dass die Operation erfolgreich war, sofern kein Fehler geworfen wird.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Setzt eine `value`-Menge an Token als Allowance von `spender` über die Token des Aufrufers
   * und ruft dann `ERC1363Spender::onApprovalReceived` auf `spender` auf.
   * @param spender Die Adresse, die die Mittel ausgeben wird.
   * @param value Die Menge der auszugebenden Token.
   * @return Ein boolescher Wert, der anzeigt, dass die Operation erfolgreich war, sofern kein Fehler geworfen wird.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Setzt eine `value`-Menge an Token als Allowance von `spender` über die Token des Aufrufers
   * und ruft dann `ERC1363Spender::onApprovalReceived` auf `spender` auf.
   * @param spender Die Adresse, die die Mittel ausgeben wird.
   * @param value Die Menge der auszugebenden Token.
   * @param data Zusätzliche Daten ohne spezifiziertes Format, die im Aufruf an `spender` gesendet werden.
   * @return Ein boolescher Wert, der anzeigt, dass die Operation erfolgreich war, sofern kein Fehler geworfen wird.
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

Ein Smart Contract, der ERC-1363-Token über `transferAndCall` oder `transferFromAndCall` akzeptieren möchte, **MUSS** die Schnittstelle `ERC1363Receiver` implementieren:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Schnittstelle für jeden Vertrag, der `transferAndCall` oder `transferFromAndCall` von ERC-1363 Token-Verträgen unterstützen möchte.
 */
interface ERC1363Receiver {
  /**
   * @dev Wann immer ERC-1363 Token über `ERC1363::transferAndCall` oder `ERC1363::transferFromAndCall`
   * durch `operator` von `from` an diesen Vertrag transferiert werden, wird diese Funktion aufgerufen.
   *
   * HINWEIS: Um den Transfer zu akzeptieren, muss dies
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (d.h. 0x88a7ca5c, oder seinen eigenen Funktionsselektor) zurückgeben.
   *
   * @param operator Die Adresse, die die Funktion `transferAndCall` oder `transferFromAndCall` aufgerufen hat.
   * @param from Die Adresse, von der Token transferiert werden.
   * @param value Die Menge der transferierten Token.
   * @param data Zusätzliche Daten ohne spezifiziertes Format.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` wenn der Transfer erlaubt ist, sofern kein Fehler geworfen wird.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Ein Smart Contract, der ERC-1363-Token über `approveAndCall` akzeptieren möchte, **MUSS** die Schnittstelle `ERC1363Spender` implementieren:

```solidity
/**
 * @title ERC1363Spender
 * @dev Schnittstelle für jeden Vertrag, der `approveAndCall` von ERC-1363 Token-Verträgen unterstützen möchte.
 */
interface ERC1363Spender {
  /**
   * @dev Wann immer ein `owner` von ERC-1363 Token diesen Vertrag über `ERC1363::approveAndCall` genehmigt,
   * seine Token auszugeben, wird diese Funktion aufgerufen.
   *
   * HINWEIS: Um die Genehmigung zu akzeptieren, muss dies
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (d.h. 0x7b04a2d0, oder seinen eigenen Funktionsselektor) zurückgeben.
   *
   * @param owner Die Adresse, die die Funktion `approveAndCall` aufgerufen hat und zuvor die Token besaß.
   * @param value Die Menge der auszugebenden Token.
   * @param data Zusätzliche Daten ohne spezifiziertes Format.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` wenn die Genehmigung erlaubt ist, sofern kein Fehler geworfen wird.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Weiterführende Literatur {#further-reading}

- [ERC-1363: Payable Token-Standard](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub-Repo](https://github.com/vittominacori/erc1363-payable-token)