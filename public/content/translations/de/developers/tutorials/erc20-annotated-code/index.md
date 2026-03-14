---
title: "ERC-20-Vertrag – exemplarische Vorgehensweise"
description: Was beinhaltet der OpenZeppelin ERC-20-Vertrag und warum ist er da?
author: Ori Pomerantz
lang: de
tags: [ "solidity", "Erc-20" ]
skill: beginner
published: 2021-03-09
---

## Einführung {#introduction}

Eine der häufigsten Anwendungen von Ethereum ist die Schaffung eines handelbaren Tokens durch eine Gruppe, der gewissermaßen ihre eigene Währung darstellt. Diese Token folgen typischerweise einem Standard,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Dieser Standard ermöglicht es, Tools wie Liquiditätspools und Wallets zu entwickeln, die mit allen ERC-20-
Token funktionieren. In diesem Artikel analysieren wir die
[OpenZeppelin Solidity ERC20-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) sowie die
[Interface-Definition](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Dies ist kommentierter Quellcode. Wenn Sie ERC-20 implementieren möchten,
[lesen Sie dieses Tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Die Schnittstelle {#the-interface}

Der Zweck eines Standards wie ERC-20 besteht darin, eine Vielzahl von Token-Implementierungen zu ermöglichen, die mit anderen Anwendungen wie Wallets und dezentralen Börsen interoperabel sind. Um das zu erreichen, erstellen wir eine
[Schnittstelle](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Jeder Code, der den Token-Vertrag verwenden muss, kann die gleichen Definitionen in der Schnittstelle verwenden und mit allen Token-Verträgen, die ihn verwenden, kompatibel sein, unabhängig davon, ob es sich um eine Wallet wie
MetaMask, eine Dapp wie etherscan.io oder einen anderen Vertrag wie einen Liquiditätspool handelt.

![Illustration der ERC-20-Schnittstelle](erc20_interface.png)

Wenn Sie ein erfahrener Programmierer sind, erinnern Sie sich wahrscheinlich an ähnliche Konstrukte in [Java](https://www.w3schools.com/java/java_interface.asp)
oder sogar in [C-Header-Dateien](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Dies ist eine Definition der [ERC-20-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
von OpenZeppelin. Es ist eine Übersetzung des [für Menschen lesbaren Standards](https://eips.ethereum.org/EIPS/eip-20) in Solidity-Code. Natürlich definiert die
Schnittstelle selbst nicht, _wie_ etwas zu tun ist. Dies wird im nachstehenden Vertragsquelltext erläutert.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity-Dateien sollten einen Lizenzbezeichner enthalten. [Die Liste der Lizenzen finden Sie hier](https://spdx.org/licenses/). Wenn Sie eine andere
Lizenz benötigen, erklären Sie dies einfach in den Kommentaren.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Die Sprache Solidity entwickelt sich noch immer schnell weiter, und neue Versionen sind möglicherweise nicht mit altem Code kompatibel
([siehe hier](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Daher ist es eine gute Idee, nicht nur eine Mindestversion
der Sprache anzugeben, sondern auch eine Höchstversion, die letzte, mit der Sie den Code getestet haben.

&nbsp;

```solidity
/**
 * @dev Schnittstelle des ERC20-Standards, wie im EIP definiert.
 */
```

Das `@dev` im Kommentar ist Teil des [NatSpec-Formats](https://docs.soliditylang.org/en/develop/natspec-format.html), das zur Erstellung von
Dokumentation aus dem Quellcode verwendet wird.

&nbsp;

```solidity
interface IERC20 {
```

Konventionsgemäß beginnen Schnittstellennamen mit `I`.

&nbsp;

```solidity
    /**
     * @dev Gibt die Menge der existierenden Token zurück.
     */
    function totalSupply() external view returns (uint256);
```

Diese Funktion ist `external`, was bedeutet, dass [sie nur von außerhalb des Vertrags aufgerufen werden kann](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Sie gibt den Gesamtvorrat an Token im Vertrag zurück. Dieser Wert wird mit dem in Ethereum gebräuchlichsten Typ zurückgegeben, 256 Bit ohne Vorzeichen (256 Bit ist die
native Wortgröße der EVM). Diese Funktion ist auch eine `view`, was bedeutet, dass sie den Zustand nicht ändert, so dass sie auf einem einzelnen Knoten ausgeführt werden kann, anstatt dass sie
auf jedem Knoten in der Blockchain ausgeführt werden muss. Diese Art von Funktion erzeugt keine Transaktion und kostet kein [Gas](/developers/docs/gas/).

**Hinweis:** Theoretisch könnte es so aussehen, als ob der Ersteller eines Vertrags betrügen könnte, indem er einen geringeren Gesamtvorrat als den tatsächlichen Wert zurückgibt, wodurch jeder Token
wertvoller erscheint, als er tatsächlich ist. Diese Befürchtung ignoriert jedoch die wahre Natur der Blockchain. Alles, was auf der Blockchain geschieht, kann von
jedem Knoten verifiziert werden. Um dies zu erreichen, sind der Maschinencode und der Speicher jedes Vertrags auf jedem Knoten verfügbar. Obwohl Sie nicht verpflichtet sind, den Solidity-Code
für Ihren Vertrag zu veröffentlichen, würde Sie niemand ernst nehmen, wenn Sie nicht den Quellcode und die Version von Solidity, mit der er kompiliert wurde, veröffentlichen, damit er
mit dem von Ihnen bereitgestellten Maschinencode verifiziert werden kann.
Siehe zum Beispiel [diesen Vertrag](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Gibt die Menge an Token zurück, die `account` besitzt.
     */
    function balanceOf(address account) external view returns (uint256);
```

Wie der Name schon sagt, gibt `balanceOf` den Saldo eines Kontos zurück. Ethereum-Konten werden in Solidity mit dem Typ `address` identifiziert, der 160 Bit enthält.
Sie ist ebenfalls `external` und `view`.

&nbsp;

```solidity
    /**
     * @dev Verschiebt `amount` Token vom Konto des Aufrufers an `recipient`.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * Löst ein {Transfer}-Ereignis aus.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Die Funktion `transfer` überträgt Token vom Aufrufer an eine andere Adresse. Dies beinhaltet eine Zustandsänderung, also ist es keine `view`.
Wenn ein Nutzer diese Funktion aufruft, erzeugt das eine Transaktion und kostet Gas. Sie löst auch ein Ereignis, `Transfer`, aus, um alle auf
der Blockchain über das Ereignis zu informieren.

Die Funktion hat zwei Arten von Ausgaben für zwei verschiedene Arten von Aufrufern:

- Benutzer, die die Funktion direkt über eine Benutzeroberfläche aufrufen. Typischerweise sendet der Nutzer eine Transaktion
  und wartet nicht auf eine Antwort, was unbestimmt lange dauern kann. Der Nutzer kann sehen, was passiert ist,
  indem er nach dem Transaktionsbeleg (der durch den Transaktions-Hash identifiziert wird) oder nach dem
  `Transfer`-Ereignis sucht.
- Andere Verträge, die die Funktion als Teil einer Gesamttransaktion aufrufen. Diese Verträge erhalten das Ergebnis sofort,
  da sie in derselben Transaktion laufen und somit den Rückgabewert der Funktion verwenden können.

Die gleiche Art von Ausgabe wird von den anderen Funktionen erzeugt, die den Zustand des Vertrags ändern.

&nbsp;

Berechtigungen („Allowances“) erlauben es einem Konto, einige Token auszugeben, die einem anderen Besitzer gehören.
Dies ist z. B. für Verträge nützlich, die als Verkäufer fungieren. Verträge können nicht
auf Ereignisse warten. Wenn also ein Käufer Token direkt an den Verkäufervertrag überweisen würde,
wüsste dieser Vertrag nicht, dass er bezahlt wurde. Stattdessen erlaubt der Käufer dem
Verkäufervertrag, einen bestimmten Betrag auszugeben, und der Verkäufer überweist diesen Betrag.
Dies geschieht über eine Funktion, die der Verkäufervertrag aufruft, sodass der Verkäufervertrag
wissen kann, ob sie erfolgreich war.

```solidity
    /**
     * @dev Gibt die verbleibende Anzahl von Token zurück, die `spender` im
     * Namen von `owner` über {transferFrom} ausgeben darf. Dieser Wert ist
     * standardmäßig null.
     *
     * Dieser Wert ändert sich, wenn {approve} oder {transferFrom} aufgerufen werden.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Die Funktion `allowance` ermöglicht es jedem, abzufragen, welche Berechtigung eine
Adresse (`owner`) einer anderen Adresse (`spender`) zum Ausgeben erteilt.

&nbsp;

```solidity
    /**
     * @dev Legt `amount` als die Berechtigung von `spender` über die Token des Aufrufers fest.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * WICHTIG: Beachten Sie, dass das Ändern einer Berechtigung mit dieser Methode das Risiko birgt,
     * dass jemand durch eine unglückliche Transaktionsreihenfolge sowohl die alte als auch die neue
     * Berechtigung verwenden kann. Eine mögliche Lösung zur Minderung dieser Race-Condition
     * besteht darin, zuerst die Berechtigung des Spenders auf 0 zu reduzieren und danach den
     * gewünschten Wert festzulegen:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Löst ein {Approval}-Ereignis aus.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Die Funktion `approve` erstellt eine Berechtigung. Lesen Sie unbedingt die Meldung darüber,
wie sie missbraucht werden kann. In Ethereum kontrollieren Sie die Reihenfolge Ihrer eigenen Transaktionen,
aber Sie können nicht die Reihenfolge kontrollieren, in der die Transaktionen anderer Personen ausgeführt werden,
es sei denn, Sie reichen Ihre eigene Transaktion erst ein, wenn Sie sehen, dass
die Transaktion der anderen Seite stattgefunden hat.

&nbsp;

```solidity
    /**
     * @dev Verschiebt `amount` Token von `sender` zu `recipient` unter Verwendung des
     * Berechtigungsmechanismus. `amount` wird dann von der Berechtigung des Aufrufers
     * abgezogen.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * Löst ein {Transfer}-Ereignis aus.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Schließlich wird `transferFrom` vom Ausgebenden verwendet, um die Berechtigung tatsächlich zu nutzen.

&nbsp;

```solidity

    /**
     * @dev Wird ausgelöst, wenn `value` Token von einem Konto (`from`) auf
     * ein anderes (`to`) verschoben werden.
     *
     * Beachten Sie, dass `value` null sein kann.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Wird ausgelöst, wenn die Berechtigung eines `spender` für einen `owner` durch
     * einen Aufruf von {approve} festgelegt wird. `value` ist die neue Berechtigung.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Diese Ereignisse werden ausgelöst, wenn sich der Zustand des ERC-20-Vertrags ändert.

## Der eigentliche Vertrag {#the-actual-contract}

Dies ist der eigentliche Vertrag, der den ERC-20-Standard implementiert,
[entnommen von hier](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Er ist nicht dafür gedacht, so wie er ist verwendet zu werden, aber Sie können
[davon erben](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm), um ihn zu etwas Nutzbarem zu erweitern.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Import-Anweisungen {#import-statements}

Zusätzlich zu den oben genannten Interface-Definitionen importiert die Contract-Definition zwei weitere Dateien:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` enthält die Definitionen, die für die Verwendung von [OpenGSN](https://www.opengsn.org/) erforderlich sind, einem System, das es Nutzern ohne Ether
  ermöglicht, die Blockchain zu verwenden. Beachten Sie, dass dies eine alte Version ist. Wenn Sie OpenGSN integrieren möchten,
  [verwenden Sie dieses Tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Die SafeMath-Bibliothek](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), die
  arithmetische Über- und Unterläufe für Solidity-Versionen **&lt;0.8.0** verhindert. In Solidity ≥0.8.0 werden arithmetische Operationen bei
  Über-/Unterlauf automatisch zurückgesetzt, wodurch SafeMath überflüssig wird. Dieser Vertrag verwendet SafeMath für die Abwärtskompatibilität mit
  älteren Compiler-Versionen.

&nbsp;

Dieser Kommentar erklärt den Zweck des Vertrags.

```solidity
/**
 * @dev Implementierung der {IERC20}-Schnittstelle.
 *
 * Diese Implementierung ist agnostisch gegenüber der Art und Weise, wie Token erstellt werden. Das bedeutet,
 * dass ein Versorgungsmechanismus in einem abgeleiteten Vertrag mit {_mint} hinzugefügt werden muss.
 * Einen generischen Mechanismus finden Sie unter {ERC20PresetMinterPauser}.
 *
 * TIPP: Eine detaillierte Beschreibung finden Sie in unserem Leitfaden
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Wie
 * Versorgungsmechanismen implementiert werden].
 *
 * Wir haben die allgemeinen OpenZeppelin-Richtlinien befolgt: Funktionen werden zurückgesetzt, anstatt
 * bei einem Fehler `false` zurückzugeben. Dieses Verhalten ist jedoch konventionell
 * und steht nicht im Widerspruch zu den Erwartungen von ERC20-Anwendungen.
 *
 * Zusätzlich wird bei Aufrufen von {transferFrom} ein {Approval}-Ereignis ausgelöst.
 * Dies ermöglicht es Anwendungen, die Berechtigung für alle Konten allein
 * durch das Abhören dieser Ereignisse zu rekonstruieren. Andere Implementierungen des EIP geben
 * diese Ereignisse möglicherweise nicht aus, da dies nicht von der Spezifikation gefordert wird.
 *
 * Schließlich wurden die nicht standardmäßigen Funktionen {decreaseAllowance} und {increaseAllowance}
 * hinzugefügt, um die bekannten Probleme bei der Festlegung von
 * Berechtigungen zu entschärfen. Siehe {IERC20-approve}.
 */

```

### Vertragsdefinition {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Diese Zeile gibt die Vererbung an, in diesem Fall von `IERC20` von oben und `Context` für OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Diese Zeile hängt die `SafeMath`-Bibliothek an den Typ `uint256` an. Sie können diese Bibliothek
[hier](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) finden.

### Variablendefinitionen {#variable-definitions}

Diese Definitionen legen die Zustandsvariablen des Vertrags fest. Diese Variablen sind `private` deklariert, aber
das bedeutet nur, dass andere Verträge auf der Blockchain sie nicht lesen können. _Es gibt keine
Geheimnisse auf der Blockchain_, die Software auf jedem Knoten hat den Zustand jedes Vertrags
bei jedem Block. Konventionsgemäß werden Zustandsvariablen `_<etwas>` genannt.

Die ersten beiden Variablen sind [Mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
was bedeutet, dass sie sich ungefähr wie [assoziative Arrays](https://wikipedia.org/wiki/Associative_array) verhalten,
außer dass die Schlüssel numerische Werte sind. Speicher wird nur für Einträge zugewiesen, die Werte haben, die sich vom
Standardwert (Null) unterscheiden.

```solidity
    mapping (address => uint256) private _balances;
```

Das erste Mapping, `_balances`, enthält Adressen und ihre jeweiligen Saldi dieses Tokens. Um auf
den Saldo zuzugreifen, verwenden Sie diese Syntax: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Diese Variable, `_allowances`, speichert die zuvor erläuterten Berechtigungen. Der erste Index ist der Besitzer
der Token, und der zweite ist der Vertrag mit der Berechtigung. Um auf den Betrag zuzugreifen, den Adresse A vom Konto von Adresse B
ausgeben kann, verwenden Sie `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Wie der Name schon sagt, hält diese Variable den Gesamtvorrat an Token nach.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Diese drei Variablen werden verwendet, um die Lesbarkeit zu verbessern. Die ersten beiden sind selbsterklärend, aber `_decimals`
ist es nicht.

Einerseits gibt es bei Ethereum keine Gleitkomma- oder Bruchvariablen. Andererseits
mögen es Menschen, Token teilen zu können. Ein Grund, warum man sich auf Gold als Währung einigte, war,
dass es schwer war, Wechselgeld herauszugeben, wenn jemand eine Ente im Wert einer Kuh kaufen wollte.

Die Lösung besteht darin, ganze Zahlen zu verfolgen, aber anstelle des echten Tokens einen Bruchteil eines Tokens zu zählen, der
fast wertlos ist. Im Fall von Ether wird der Bruchteil des Tokens „Wei“ genannt, und 10^18 Wei entsprechen einem
ETH. Zum Zeitpunkt der Erstellung dieses Artikels entsprechen 10.000.000.000.000 Wei ungefähr einem US- oder Euro-Cent.

Anwendungen müssen wissen, wie der Token-Saldo angezeigt wird. Wenn ein Nutzer 3.141.000.000.000.000.000 Wei hat, sind das
3,14 ETH? 31,41 ETH? 3.141 ETH? Im Fall von Ether ist 10^18 Wei zu ETH definiert, aber für Ihren
Token können Sie einen anderen Wert wählen. Wenn die Teilung des Tokens keinen Sinn macht, können Sie einen
`_decimals`-Wert von Null verwenden. Wenn Sie denselben Standard wie ETH verwenden möchten, verwenden Sie den Wert **18**.

### Der Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Setzt die Werte für {name} und {symbol}, initialisiert {decimals} mit
     * einem Standardwert von 18.
     *
     * Um einen anderen Wert für {decimals} zu wählen, verwenden Sie {_setupDecimals}.
     *
     * Alle drei dieser Werte sind unveränderlich: Sie können nur einmal während
     * der Konstruktion festgelegt werden.
     */
    constructor (string memory name_, string memory symbol_) public {
        // In Solidity ≥0.7.0 ist 'public' implizit und kann weggelassen werden.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Der Konstruktor wird aufgerufen, wenn der Vertrag zum ersten Mal erstellt wird. Konventionsgemäß werden Funktionsparameter `<etwas>_` genannt.

### Benutzeroberflächenfunktionen {#user-interface-functions}

```solidity
    /**
     * @dev Gibt den Namen des Tokens zurück.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Gibt das Symbol des Tokens zurück, normalerweise eine kürzere Version des
     * Namens.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Gibt die Anzahl der Dezimalstellen zurück, die zur Darstellung für den Benutzer verwendet werden.
     * Wenn `decimals` beispielsweise `2` ist, sollte ein Saldo von `505` Token
     * einem Benutzer als `5,05` (`505 / 10 ** 2`) angezeigt werden.
     *
     * Token entscheiden sich normalerweise für einen Wert von 18 und ahmen damit die Beziehung zwischen
     * Ether und Wei nach. Dies ist der Wert, den {ERC20} verwendet, es sei denn, {_setupDecimals} wird
     * aufgerufen.
     *
     * HINWEIS: Diese Information wird nur zu _Anzeige_-Zwecken verwendet: Sie beeinflusst
     * in keiner Weise die Arithmetik des Vertrags, einschließlich
     * {IERC20-balanceOf} und {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Diese Funktionen, `name`, `symbol` und `decimals`, helfen Benutzeroberflächen, Ihren Vertrag zu kennen, damit sie ihn richtig anzeigen können.

Der Rückgabetyp ist `string memory`, was bedeutet, dass eine Zeichenfolge zurückgegeben wird, die im Speicher gespeichert ist. Variablen, wie z. B.
Zeichenketten, können an drei Stellen gespeichert werden:

|             | Lebensdauer      | Vertragszugriff | Gaskosten                                                                          |
| ----------- | ---------------- | --------------- | ---------------------------------------------------------------------------------- |
| Speicher    | Funktionsaufruf  | Lesen/Schreiben | Zehner oder Hunderter (höher für höhere Lagen)                  |
| Aufrufdaten | Funktionsaufruf  | Nur Lesen       | Kann nicht als Rückgabetyp verwendet werden, sondern nur als Funktionsparametertyp |
| Speicherort | Bis zur Änderung | Lesen/Schreiben | Hoch (800 für Lesen, 20.000 für Schreiben)      |

In diesem Fall ist der Speicher die beste Wahl.

### Token-Informationen lesen {#read-token-information}

Dies sind Funktionen, die Informationen über den Token liefern, entweder den Gesamtvorrat oder den
Saldo eines Kontos.

```solidity
    /**
     * @dev Siehe {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Die Funktion `totalSupply` gibt den Gesamtvorrat an Token zurück.

&nbsp;

```solidity
    /**
     * @dev Siehe {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Lesen Sie den Saldo eines Kontos. Beachten Sie, dass jeder den Kontostand eines anderen abrufen darf. Es hat keinen Sinn, diese Informationen zu verbergen, da sie ohnehin auf jedem Knoten verfügbar sind. _Es gibt keine Geheimnisse in der Blockchain._

### Token übertragen {#transfer-tokens}

```solidity
    /**
     * @dev Siehe {IERC20-transfer}.
     *
     * Anforderungen:
     *
     * - `recipient` darf nicht die Null-Adresse sein.
     * - Der Aufrufer muss einen Saldo von mindestens `amount` haben.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Die Funktion `transfer` wird aufgerufen, um Token vom Konto des Absenders auf ein anderes zu übertragen. Beachten Sie,
dass sie zwar einen booleschen Wert zurückgibt, dieser aber immer **true** ist. Wenn die Übertragung
fehlschlägt, setzt der Vertrag den Aufruf zurück.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Die Funktion `_transfer` erledigt die eigentliche Arbeit. Es handelt sich um eine private Funktion, die nur von
anderen Vertragsfunktionen aufgerufen werden kann. Konventionsgemäß werden private Funktionen wie Zustands-
variablen `_<etwas>` genannt.

Normalerweise verwenden wir in Solidity `msg.sender` für den Absender der Nachricht. Das stört jedoch
[OpenGSN](http://opengsn.org/). Wenn wir Transaktionen ohne Ether mit unserem Token zulassen wollen, müssen wir
`_msgSender()` verwenden. Sie gibt `msg.sender` für normale Transaktionen zurück, aber für solche ohne Ether
gibt sie den ursprünglichen Unterzeichner und nicht den Vertrag zurück, der die Nachricht weitergeleitet hat.

### Berechtigungsfunktionen {#allowance-functions}

Dies sind die Funktionen, die die Berechtigungsfunktionalität implementieren: `allowance`, `approve`, `transferFrom`
und `_approve`. Zusätzlich geht die OpenZeppelin-Implementierung über den Basisstandard hinaus und enthält einige Funktionen, die die
Sicherheit verbessern: `increaseAllowance` und `decreaseAllowance`.

#### Die allowance-Funktion {#allowance}

```solidity
    /**
     * @dev Siehe {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Die Funktion `allowance` ermöglicht es jedem, jede Berechtigung zu überprüfen.

#### Die approve-Funktion {#approve}

```solidity
    /**
     * @dev Siehe {IERC20-approve}.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Null-Adresse sein.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Diese Funktion wird aufgerufen, um eine Berechtigung zu erstellen. Sie ähnelt der obigen `transfer`-Funktion:

- Die Funktion ruft lediglich eine interne Funktion auf (in diesem Fall `_approve`), die die eigentliche Arbeit erledigt.
- Die Funktion gibt entweder `true` zurück (wenn erfolgreich) oder wird zurückgesetzt (wenn nicht).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Wir verwenden interne Funktionen, um die Anzahl der Stellen, an denen Zustandsänderungen stattfinden, zu minimieren. _Jede_ Funktion, die den
Zustand ändert, stellt ein potenzielles Sicherheitsrisiko dar, das auf Sicherheit geprüft werden muss. Auf diese Weise ist die Wahrscheinlichkeit geringer, dass wir etwas falsch machen.

#### Die transferFrom-Funktion {#transferFrom}

Dies ist die Funktion, die ein Ausgebender aufruft, um eine Berechtigung zu nutzen. Dies erfordert zwei Operationen: die Übertragung des ausgegebenen
Betrags und die Reduzierung der Berechtigung um diesen Betrag.

```solidity
    /**
     * @dev Siehe {IERC20-transferFrom}.
     *
     * Löst ein {Approval}-Ereignis aus, das die aktualisierte Berechtigung anzeigt. Dies ist nicht
     * vom EIP gefordert. Siehe den Hinweis am Anfang von {ERC20}.
     *
     * Anforderungen:
     *
     * - `sender` und `recipient` dürfen nicht die Null-Adresse sein.
     * - `sender` muss einen Saldo von mindestens `amount` haben.
     * - der Aufrufer muss eine Berechtigung für die Token von `sender` von mindestens
     * `amount` haben.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Der Funktionsaufruf `a.sub(b, "message")` tut zwei Dinge. Erstens berechnet er `a-b`, was die neue Berechtigung ist.
Zweitens prüft er, ob dieses Ergebnis nicht negativ ist. Wenn es negativ ist, wird der Aufruf mit der angegebenen Nachricht zurückgesetzt. Beachten Sie, dass bei einem Zurücksetzen eines Aufrufs jede zuvor während dieses Aufrufs durchgeführte Verarbeitung ignoriert wird, sodass wir den
`_transfer` nicht rückgängig machen müssen.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Sicherheitserweiterungen von OpenZeppelin {#openzeppelin-safety-additions}

Es ist gefährlich, eine Berechtigung, die nicht Null ist, auf einen anderen Wert ungleich Null zu setzen,
da Sie nur die Reihenfolge Ihrer eigenen Transaktionen kontrollieren, nicht die von jemand anderem. Stellen Sie sich vor,
Sie haben zwei Nutzer, Alice, die naiv ist, und Bill, der unehrlich ist. Alice möchte eine Dienstleistung von
Bill, von der sie glaubt, dass sie fünf Token kostet – also gibt sie Bill eine Berechtigung von fünf Token.

Dann ändert sich etwas und Bills Preis steigt auf zehn Token. Alice, die den Dienst immer noch will,
sendet eine Transaktion, die Bills Berechtigung auf zehn setzt. Sobald Bill diese neue Transaktion
im Transaktionspool sieht, sendet er eine Transaktion, die Alices fünf Token ausgibt und einen viel
höheren Gaspreis hat, damit sie schneller gemint wird. Auf diese Weise kann Bill zuerst fünf Token ausgeben und dann,
sobald Alices neue Berechtigung gemint wurde, zehn weitere ausgeben, für einen Gesamtpreis von fünfzehn Token, mehr als
Alice autorisieren wollte. Diese Technik wird
[Front-Running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running) genannt

| Alice-Transaktion                    | Alice-Nonce | Bill-Transaktion                                 | Bill-Nonce | Bills Berechtigung | Bills Gesamteinkommen von Alice |
| ------------------------------------ | ----------- | ------------------------------------------------ | ---------- | ------------------ | ------------------------------- |
| approve(Bill, 5)  | 10          |                                                  |            | 5                  | 0                               |
|                                      |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                  | 5                               |
| approve(Bill, 10) | 11          |                                                  |            | 10                 | 5                               |
|                                      |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                  | 15                              |

Um dieses Problem zu vermeiden, ermöglichen es diese beiden Funktionen (`increaseAllowance` und `decreaseAllowance`), die
Berechtigung um einen bestimmten Betrag zu ändern. Wenn Bill also bereits fünf Token ausgegeben hat, wird er nur
noch fünf weitere ausgeben können. Je nach Zeitplan gibt es zwei Möglichkeiten, wie dies funktionieren kann, die beide damit enden, dass Bill nur zehn Token erhält:

A:

| Alice-Transaktion                             | Alice-Nonce | Bill-Transaktion                                | Bill-Nonce | Bills Berechtigung | Bills Gesamteinkommen von Alice |
| --------------------------------------------- | ----------: | ----------------------------------------------- | ---------: | -----------------: | ------------------------------- |
| approve(Bill, 5)           |          10 |                                                 |            |                  5 | 0                               |
|                                               |             | transferFrom(Alice, Bill, 5) |     10,123 |                  0 | 5                               |
| increaseAllowance(Bill, 5) |          11 |                                                 |            |            0+5 = 5 | 5                               |
|                                               |             | transferFrom(Alice, Bill, 5) |     10,124 |                  0 | 10                              |

B:

| Alice-Transaktion                             | Alice-Nonce | Bill-Transaktion                                 | Bill-Nonce | Bills Berechtigung | Bills Gesamteinkommen von Alice |
| --------------------------------------------- | ----------: | ------------------------------------------------ | ---------: | -----------------: | ------------------------------: |
| approve(Bill, 5)           |          10 |                                                  |            |                  5 |                               0 |
| increaseAllowance(Bill, 5) |          11 |                                                  |            |           5+5 = 10 |                               0 |
|                                               |             | transferFrom(Alice, Bill, 10) |     10,124 |                  0 |                              10 |

```solidity
    /**
     * @dev Erhöht atomar die dem `spender` vom Aufrufer gewährte Berechtigung.
     *
     * Dies ist eine Alternative zu {approve}, die als Milderung für
     * in {IERC20-approve} beschriebene Probleme verwendet werden kann.
     *
     * Löst ein {Approval}-Ereignis aus, das die aktualisierte Berechtigung anzeigt.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Null-Adresse sein.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Die Funktion `a.add(b)` ist eine sichere Addition. In dem unwahrscheinlichen Fall, dass `a`+`b`>=`2^256` ist, findet kein Umbruch
statt, wie es bei der normalen Addition der Fall ist.

```solidity

    /**
     * @dev Verringert atomar die dem `spender` vom Aufrufer gewährte Berechtigung.
     *
     * Dies ist eine Alternative zu {approve}, die als Milderung für
     * in {IERC20-approve} beschriebene Probleme verwendet werden kann.
     *
     * Löst ein {Approval}-Ereignis aus, das die aktualisierte Berechtigung anzeigt.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Null-Adresse sein.
     * - `spender` muss eine Berechtigung für den Aufrufer von mindestens
     * `subtractedValue` haben.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funktionen, die Token-Informationen ändern {#functions-that-modify-token-information}

Dies sind die vier Funktionen, die die eigentliche Arbeit erledigen: `_transfer`, `_mint`, `_burn` und `_approve`.

#### Die _transfer-Funktion {#_transfer}

```solidity
    /**
     * @dev Verschiebt `amount` Token von `sender` zu `recipient`.
     *
     * Diese interne Funktion ist äquivalent zu {transfer} und kann verwendet werden,
     * um z. B. automatische Token-Gebühren, Slashing-Mechanismen usw. zu implementieren.
     *
     * Löst ein {Transfer}-Ereignis aus.
     *
     * Anforderungen:
     *
     * - `sender` darf nicht die Null-Adresse sein.
     * - `recipient` darf nicht die Null-Adresse sein.
     * - `sender` muss einen Saldo von mindestens `amount` haben.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Diese Funktion, `_transfer`, überträgt Token von einem Konto auf ein anderes. Sie wird sowohl von
`transfer` (für Übertragungen vom eigenen Konto des Absenders) als auch von `transferFrom` (zur Verwendung von Berechtigungen
zur Übertragung vom Konto eines anderen) aufgerufen.

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Niemand besitzt tatsächlich die Adresse Null in Ethereum (d. h., niemand kennt einen privaten Schlüssel, dessen zugehöriger öffentlicher Schlüssel
in die Null-Adresse umgewandelt wird). Wenn Leute diese Adresse verwenden, handelt es sich normalerweise um einen Softwarefehler – daher
schlagen wir fehl, wenn die Null-Adresse als Absender oder Empfänger verwendet wird.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Es gibt zwei Möglichkeiten, diesen Vertrag zu verwenden:

1. Verwenden Sie ihn als Vorlage für Ihren eigenen Code
2. [Erben Sie davon](https://www.bitdegree.org/learn/solidity-inheritance) und überschreiben Sie nur die Funktionen, die Sie ändern müssen

Die zweite Methode ist viel besser, da der OpenZeppelin ERC-20-Code bereits geprüft wurde und als sicher gilt. Wenn Sie Vererbung verwenden,
ist es klar, welche Funktionen Sie ändern, und um Ihrem Vertrag zu vertrauen, müssen die Leute nur diese spezifischen Funktionen prüfen.

Es ist oft nützlich, eine Funktion jedes Mal auszuführen, wenn Token den Besitzer wechseln. `_transfer` ist jedoch eine sehr wichtige Funktion und es ist
möglich, sie unsicher zu schreiben (siehe unten), daher ist es am besten, sie nicht zu überschreiben. Die Lösung ist `_beforeTokenTransfer`, eine
[Hook-Funktion](https://wikipedia.org/wiki/Hooking). Sie können diese Funktion überschreiben, und sie wird bei jeder Übertragung aufgerufen.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Dies sind die Zeilen, die die Übertragung tatsächlich durchführen. Beachten Sie, dass **nichts** zwischen ihnen steht und dass wir den
übertragenen Betrag vom Absender abziehen, bevor wir ihn dem Empfänger hinzufügen. Dies ist wichtig, denn wenn es in der Mitte einen
Aufruf an einen anderen Vertrag gäbe, hätte dieser genutzt werden können, um diesen Vertrag zu betrügen. Auf diese Weise ist die Übertragung
atomar, nichts kann in der Mitte davon passieren.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Schließlich wird ein `Transfer`-Ereignis ausgelöst. Ereignisse sind für Smart Contracts nicht zugänglich, aber Code, der außerhalb der Blockchain
ausgeführt wird, kann auf Ereignisse lauschen und darauf reagieren. Zum Beispiel kann eine Wallet nachverfolgen, wann der Besitzer mehr Token erhält.

#### Die _mint- und _burn-Funktionen {#_mint-and-_burn}

Diese beiden Funktionen (`_mint` und `_burn`) ändern den Gesamtvorrat an Token.
Sie sind intern und es gibt keine Funktion, die sie in diesem Vertrag aufruft,
sie sind also nur nützlich, wenn Sie von dem Vertrag erben und Ihre eigene
Logik hinzufügen, um zu entscheiden, unter welchen Bedingungen neue Token gemint oder bestehende
gebrannt werden.

**HINWEIS:** Jeder ERC-20-Token hat seine eigene Geschäftslogik, die die Token-Verwaltung vorschreibt.
Ein Vertrag mit festem Angebot könnte beispielsweise nur `_mint`
im Konstruktor aufrufen und niemals `_burn`. Ein Vertrag, der Token verkauft,
ruft `_mint` auf, wenn er bezahlt wird, und ruft vermutlich irgendwann `_burn` auf,
um eine galoppierende Inflation zu vermeiden.

```solidity
    /** @dev Erstellt `amount` Token und weist sie `account` zu, wodurch der
     * Gesamtvorrat erhöht wird.
     *
     * Löst ein {Transfer}-Ereignis aus, bei dem `from` auf die Null-Adresse gesetzt ist.
     *
     * Anforderungen:
     *
     * - `to` darf nicht die Null-Adresse sein.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Stellen Sie sicher, dass `_totalSupply` aktualisiert wird, wenn sich die Gesamtzahl der Token ändert.

&nbsp;

```solidity
    /**
     * @dev Zerstört `amount` Token von `account` und reduziert so den
     * Gesamtvorrat.
     *
     * Löst ein {Transfer}-Ereignis aus, bei dem `to` auf die Null-Adresse gesetzt ist.
     *
     * Anforderungen:
     *
     * - `account` darf nicht die Null-Adresse sein.
     * - `account` muss mindestens `amount` Token besitzen.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Die Funktion `_burn` ist fast identisch mit `_mint`, außer dass sie in die andere Richtung geht.

#### Die _approve-Funktion {#_approve}

Dies ist die Funktion, die tatsächlich Berechtigungen festlegt. Beachten Sie, dass es einem Besitzer erlaubt, eine
Berechtigung anzugeben, die höher ist als der aktuelle Saldo des Besitzers. Das ist in Ordnung, da der Saldo zum Zeitpunkt der
Übertragung überprüft wird, wo er sich von dem Saldo unterscheiden kann, der bei der Erstellung der Berechtigung
vorhanden war.

```solidity
    /**
     * @dev Legt `amount` als die Berechtigung von `spender` über die Token des `owner` fest.
     *
     * Diese interne Funktion ist äquivalent zu `approve` und kann verwendet werden,
     * um z. B. automatische Berechtigungen für bestimmte Subsysteme festzulegen.
     *
     * Löst ein {Approval}-Ereignis aus.
     *
     * Anforderungen:
     *
     * - `owner` darf nicht die Null-Adresse sein.
     * - `spender` darf nicht die Null-Adresse sein.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Lösen Sie ein `Approval`-Ereignis aus. Je nachdem, wie die Anwendung geschrieben ist, kann der Vertrag des Ausgebenden über die
Genehmigung entweder vom Eigentümer oder von einem Server, der auf diese Ereignisse lauscht, informiert werden.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Die Dezimalvariable ändern {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Setzt {decimals} auf einen anderen Wert als den Standardwert 18.
     *
     * WARNUNG: Diese Funktion sollte nur vom Konstruktor aufgerufen werden. Die meisten
     * Anwendungen, die mit Token-Verträgen interagieren, erwarten nicht,
     * dass sich {decimals} jemals ändert, und könnten bei einer Änderung falsch funktionieren.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Diese Funktion ändert die Variable `_decimals`, die verwendet wird, um Benutzeroberflächen mitzuteilen, wie der Betrag zu interpretieren ist.
Sie sollten sie vom Konstruktor aus aufrufen. Es wäre unehrlich, sie zu einem späteren Zeitpunkt aufzurufen, und Anwendungen
sind nicht darauf ausgelegt, damit umzugehen.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook, der vor jeder Übertragung von Token aufgerufen wird. Dies schließt
     * Minting und Burning ein.
     *
     * Aufrufbedingungen:
     *
     * - Wenn `from` und `to` beide nicht null sind, wird `amount` der Token von `from`
     * an `to` übertragen.
     * - Wenn `from` null ist, werden `amount` Token für `to` gemint.
     * - Wenn `to` null ist, wird `amount` der Token von `from` verbrannt.
     * - `from` und `to` sind niemals beide null.
     *
     * Um mehr über Hooks zu erfahren, gehen Sie zu xref:ROOT:extending-contracts.adoc#using-hooks[Verwendung von Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Dies ist die Hook-Funktion, die bei Übertragungen aufgerufen wird. Sie ist hier leer, aber wenn Sie möchten,
dass sie etwas tut, überschreiben Sie sie einfach.

## Fazit {#conclusion}

Zur Wiederholung, hier sind einige der wichtigsten Ideen in diesem Vertrag (meiner Meinung nach, Ihre kann abweichen):

- _Es gibt keine Geheimnisse in der Blockchain_. Alle Informationen, auf die ein Smart Contract zugreifen kann,
  sind der ganzen Welt zugänglich.
- Sie können die Reihenfolge Ihrer eigenen Transaktionen kontrollieren, aber nicht, wann die Transaktionen anderer Personen
  stattfinden. Dies ist der Grund, warum das Ändern einer Berechtigung gefährlich sein kann, da es dem
  Ausgebenden ermöglicht, die Summe beider Berechtigungen auszugeben.
- Werte vom Typ `uint256` haben einen Überlauf. Mit anderen Worten: _0-1=2^256-1_. Wenn das kein erwünschtes
  Verhalten ist, müssen Sie es überprüfen (oder die SafeMath-Bibliothek verwenden, die das für Sie tut). Beachten Sie, dass sich dies in
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) geändert hat.
- Führen Sie alle Zustandsänderungen eines bestimmten Typs an einem bestimmten Ort durch, da dies die Prüfung erleichtert.
  Dies ist der Grund, warum wir zum Beispiel `_approve` haben, das von `approve`, `transferFrom`,
  `increaseAllowance` und `decreaseAllowance` aufgerufen wird
- Zustandsänderungen sollten atomar sein, ohne dass eine andere Aktion in ihrer Mitte stattfindet (wie Sie
  in `_transfer` sehen können). Dies liegt daran, dass Sie während der Zustandsänderung einen inkonsistenten Zustand haben. Zum Beispiel
  gibt es zwischen dem Zeitpunkt, an dem Sie vom Saldo des Absenders abziehen, und dem Zeitpunkt, an dem Sie dem Saldo des
  Empfängers hinzufügen, weniger Token, als es sein sollten. Dies könnte potenziell missbraucht werden, wenn
  Operationen zwischen ihnen stattfinden, insbesondere Aufrufe an einen anderen Vertrag.

Jetzt, da Sie gesehen haben, wie der OpenZeppelin ERC-20-Vertrag geschrieben ist und insbesondere, wie er
sicherer gemacht wurde, können Sie Ihre eigenen sicheren Verträge und Anwendungen schreiben.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
