---
title: "ERC-20-Vertrag im Detail"
description: Was steht im ERC-20-Vertrag von OpenZeppelin und warum ist es dort?
author: Ori Pomerantz
lang: de
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: ERC-20-Durchlauf
published: 2021-03-09
---

## Einführung {#introduction}

Eine der häufigsten Anwendungen für Ethereum ist, dass eine Gruppe einen handelbaren Token erstellt, in gewissem Sinne ihre eigene Währung. Diese Token folgen typischerweise einem Standard,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Dieser Standard macht es möglich, Werkzeuge wie Liquiditätspools und Wallets zu schreiben, die mit allen ERC-20-Token funktionieren. In diesem Artikel werden wir die
[ERC20-Implementierung in Solidity von OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) sowie die
[Schnittstellendefinition](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) analysieren.

Dies ist kommentierter Quellcode. Wenn Sie ERC-20 implementieren möchten,
[lesen Sie dieses Tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Die Schnittstelle {#the-interface}

Der Zweck eines Standards wie ERC-20 ist es, viele Token-Implementierungen zu ermöglichen, die über Anwendungen hinweg interoperabel sind, wie Wallets und dezentrale Börsen. Um das zu erreichen, erstellen wir eine
[Schnittstelle](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Jeder Code, der den Token-Vertrag nutzen muss, kann dieselben Definitionen in der Schnittstelle verwenden und mit allen Token-Verträgen kompatibel sein, die diese nutzen, sei es eine Wallet wie
MetaMask, eine Dezentrale Anwendung (Dapp) wie etherscan.io oder ein anderer Vertrag wie ein Liquiditätspool.

![Illustration of the ERC-20 interface](erc20_interface.png)

Wenn Sie ein erfahrener Programmierer sind, erinnern Sie sich wahrscheinlich daran, ähnliche Konstrukte in [Java](https://www.w3schools.com/java/java_interface.asp)
oder sogar in [C-Header-Dateien](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) gesehen zu haben.

Dies ist eine Definition der [ERC-20-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
von OpenZeppelin. Es ist eine Übersetzung des [menschenlesbaren Standards](https://eips.ethereum.org/EIPS/eip-20) in Solidity-Code. Natürlich definiert die
Schnittstelle selbst nicht, _wie_ etwas zu tun ist. Das wird im Vertragsquellcode weiter unten erklärt.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity-Dateien sollten eine Lizenzkennung enthalten. [Sie können die Liste der Lizenzen hier einsehen](https://spdx.org/licenses/). Wenn Sie eine andere
Lizenz benötigen, erklären Sie dies einfach in den Kommentaren.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Die Sprache Solidity entwickelt sich immer noch schnell weiter, und neue Versionen sind möglicherweise nicht mit altem Code kompatibel
([siehe hier](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Daher ist es eine gute Idee, nicht nur eine Mindestversion der Sprache anzugeben, sondern auch eine Höchstversion, die neueste, mit der Sie den Code getestet haben.

&nbsp;

```solidity
/**
 * @dev Schnittstelle des ERC-20-Standards, wie im EIP definiert.
 */
```

Das `@dev` im Kommentar ist Teil des [NatSpec-Formats](https://docs.soliditylang.org/en/develop/natspec-format.html), das verwendet wird, um
Dokumentation aus dem Quellcode zu erstellen.

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
Sie gibt das Gesamtangebot an Token im Vertrag zurück. Dieser Wert wird unter Verwendung des häufigsten Typs in Ethereum zurückgegeben, vorzeichenlose 256 Bits (256 Bits ist die
native Wortgröße der EVM). Diese Funktion ist auch ein `view`, was bedeutet, dass sie den Zustand nicht ändert, sodass sie auf einem einzelnen Knoten ausgeführt werden kann, anstatt dass
jeder Knoten in der Blockchain sie ausführt. Diese Art von Funktion generiert keine Transaktion und kostet kein [Gas](/developers/docs/gas/).

**Hinweis:** Theoretisch könnte es so aussehen, als könnte der Ersteller eines Vertrags betrügen, indem er ein kleineres Gesamtangebot als den tatsächlichen Wert zurückgibt, wodurch jeder Token
wertvoller erscheint, als er tatsächlich ist. Diese Befürchtung ignoriert jedoch die wahre Natur der Blockchain. Alles, was auf der Blockchain passiert, kann von
jedem Knoten verifiziert werden. Um dies zu erreichen, sind der Maschinensprache-Code und der Speicher jedes Vertrags auf jedem Knoten verfügbar. Obwohl Sie nicht verpflichtet sind, den Solidity-Code
für Ihren Vertrag zu veröffentlichen, würde Sie niemand ernst nehmen, es sei denn, Sie veröffentlichen den Quellcode und die Version von Solidity, mit der er kompiliert wurde, damit er
gegen den von Ihnen bereitgestellten Maschinensprache-Code verifiziert werden kann.
Sehen Sie sich zum Beispiel [diesen Vertrag](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract) an.

&nbsp;

```solidity
    /**
     * @dev Gibt die Menge der Token zurück, die dem `account` (Konto) gehören.
     */
    function balanceOf(address account) external view returns (uint256);
```

Wie der Name schon sagt, gibt `balanceOf` den Kontostand eines Kontos zurück. Ethereum-Konten werden in Solidity mit dem Typ `address` identifiziert, der 160 Bits fasst.
Sie ist ebenfalls `external` und `view`.

&nbsp;

```solidity
    /**
     * @dev Bewegt `amount` Token vom Konto des Aufrufers zu `recipient`.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * Löst ein {Transfer}-Ereignis aus.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Die Funktion `transfer` transferiert Token vom Aufrufer an eine andere Adresse. Dies beinhaltet eine Zustandsänderung, also ist es kein `view`.
Wenn ein Benutzer diese Funktion aufruft, erstellt sie eine Transaktion und kostet Gas. Sie löst auch ein Ereignis aus, `Transfer`, um jeden auf
der Blockchain über das Ereignis zu informieren.

Die Funktion hat zwei Arten von Ausgaben für zwei verschiedene Arten von Aufrufern:

- Benutzer, die die Funktion direkt über eine Benutzeroberfläche aufrufen. Typischerweise reicht der Benutzer eine Transaktion ein
  und wartet nicht auf eine Antwort, was eine unbestimmte Zeit dauern könnte. Der Benutzer kann sehen, was passiert ist,
  indem er nach dem Transaktionsbeleg sucht (der durch den Transaktions-Hash identifiziert wird) oder nach dem
  Ereignis `Transfer` sucht.
- Andere Verträge, die die Funktion als Teil einer Gesamttransaktion aufrufen. Diese Verträge erhalten das Ergebnis sofort,
  da sie in derselben Transaktion ausgeführt werden, sodass sie den Rückgabewert der Funktion verwenden können.

Die gleiche Art von Ausgabe wird von den anderen Funktionen erzeugt, die den Zustand des Vertrags ändern.

&nbsp;

Freigabebeträge erlauben es einem Konto, einige Token auszugeben, die einem anderen Eigentümer gehören.
Dies ist zum Beispiel nützlich für Verträge, die als Verkäufer agieren. Verträge können nicht
auf Ereignisse überwachen. Wenn also ein Käufer Token direkt an den Verkäufervertrag transferieren würde,
wüsste dieser Vertrag nicht, dass er bezahlt wurde. Stattdessen genehmigt der Käufer dem
Verkäufervertrag, einen bestimmten Betrag auszugeben, und der Verkäufer transferiert diesen Betrag.
Dies geschieht über eine Funktion, die der Verkäufervertrag aufruft, sodass der Verkäufervertrag
wissen kann, ob er erfolgreich war.

```solidity
    /**
     * @dev Gibt die verbleibende Anzahl von Token zurück, die `spender` im Namen von `owner` über {transferFrom} ausgeben darf. Dies ist standardmäßig null.
     *
     * Dieser Wert ändert sich, wenn {approve} oder {transferFrom} aufgerufen werden.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Die Funktion `allowance` lässt jeden abfragen, wie hoch der Freigabebetrag ist, den eine
Adresse (`owner`) einer anderen Adresse (`spender`) zum Ausgeben überlässt.

&nbsp;

```solidity
    /**
     * @dev Setzt `amount` als Freigabebetrag von `spender` für die Token des Aufrufers.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * WICHTIG: Beachten Sie, dass das Ändern eines Freigabebetrags mit dieser Methode das Risiko birgt,
     * dass jemand durch eine unglückliche Reihenfolge der Transaktionen sowohl den alten als auch den neuen Freigabebetrag verwenden könnte. Eine mögliche Lösung zur Abschwächung dieser Race
     * Condition besteht darin, den Freigabebetrag des Ausgebers zuerst auf 0 zu reduzieren und den
     * gewünschten Wert danach festzulegen:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Löst ein {Approval}-Ereignis aus.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Die Funktion `approve` erstellt einen Freigabebetrag. Stellen Sie sicher, dass Sie die Nachricht darüber lesen,
wie dies missbraucht werden kann. In Ethereum kontrollieren Sie die Reihenfolge Ihrer eigenen Transaktionen,
aber Sie können nicht kontrollieren, in welcher Reihenfolge die Transaktionen anderer Personen
ausgeführt werden, es sei denn, Sie reichen Ihre eigene Transaktion erst ein, wenn Sie sehen, dass die
Transaktion der anderen Seite stattgefunden hat.

&nbsp;

```solidity
    /**
     * @dev Bewegt `amount` Token von `sender` zu `recipient` unter Verwendung des
     * Freigabebetrag-Mechanismus. `amount` wird dann vom Freigabebetrag des Aufrufers
     * abgezogen.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * Löst ein {Transfer}-Ereignis aus.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Schließlich wird `transferFrom` vom Ausgebenden verwendet, um den Freigabebetrag tatsächlich auszugeben.

&nbsp;

```solidity

    /**
     * @dev Wird ausgelöst, wenn `value` Token von einem Konto (`from`) zu einem
     * anderen (`to`) bewegt werden.
     *
     * Beachten Sie, dass `value` null sein kann.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Wird ausgelöst, wenn der Freigabebetrag eines `spender` für einen `owner` durch
     * einen Aufruf von {approve} festgelegt wird. `value` ist der neue Freigabebetrag.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Diese Ereignisse werden ausgelöst, wenn sich der Zustand des ERC-20-Vertrags ändert.

## Der eigentliche Vertrag {#the-actual-contract}

Dies ist der eigentliche Vertrag, der den ERC-20-Standard implementiert,
[von hier entnommen](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Er ist nicht dazu gedacht, unverändert verwendet zu werden, aber Sie können davon
[erben](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm), um ihn zu etwas Brauchbarem zu erweitern.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Import-Anweisungen {#import-statements}

Zusätzlich zu den obigen Schnittstellendefinitionen importiert die Vertragsdefinition zwei weitere Dateien:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` sind die Definitionen, die erforderlich sind, um [OpenGSN](https://opengsn.org/) zu verwenden, ein System, das es Benutzern ohne Ether
  ermöglicht, die Blockchain zu nutzen. Beachten Sie, dass dies eine alte Version ist. Wenn Sie OpenGSN integrieren möchten,
  [verwenden Sie dieses Tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Die SafeMath-Bibliothek](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), die
  arithmetische Überläufe/Unterläufe für Solidity-Versionen **&lt;0.8.0** verhindert. In Solidity ≥0.8.0 werden arithmetische Operationen bei einem Überlauf/Unterlauf automatisch
  rückgängig gemacht, was SafeMath überflüssig macht. Dieser Vertrag verwendet SafeMath zur Abwärtskompatibilität mit
  älteren Compiler-Versionen.

&nbsp;

Dieser Kommentar erklärt den Zweck des Vertrags.

```solidity
/**
 * @dev Implementierung der {IERC20}-Schnittstelle.
 *
 * Diese Implementierung ist unabhängig von der Art und Weise, wie Token erstellt werden. Das bedeutet,
 * dass ein Versorgungsmechanismus in einem abgeleiteten Vertrag unter Verwendung von {_mint} hinzugefügt werden muss.
 * Für einen generischen Mechanismus siehe {ERC20PresetMinterPauser}.
 *
 * TIPP: Für eine detaillierte Beschreibung siehe unseren Leitfaden
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Wir haben die allgemeinen OpenZeppelin-Richtlinien befolgt: Funktionen werden bei einem Fehler rückgängig gemacht (revert),
 * anstatt `false` zurückzugeben. Dieses Verhalten ist dennoch konventionell
 * und steht nicht im Widerspruch zu den Erwartungen von ERC-20-Anwendungen.
 *
 * Zusätzlich wird bei Aufrufen von {transferFrom} ein {Approval}-Ereignis ausgelöst.
 * Dies ermöglicht es Anwendungen, den Freigabebetrag für alle Konten zu rekonstruieren, indem sie einfach
 * auf diese Ereignisse hören. Andere Implementierungen des EIP lösen diese Ereignisse möglicherweise nicht aus,
 * da dies von der Spezifikation nicht verlangt wird.
 *
 * Schließlich wurden die nicht standardmäßigen Funktionen {decreaseAllowance} und {increaseAllowance}
 * hinzugefügt, um die bekannten Probleme bei der Festlegung von
 * Freigabebeträgen abzuschwächen. Siehe {IERC20-approve}.
 */

```

### Vertragsdefinition {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Diese Zeile spezifiziert die Vererbung, in diesem Fall von `IERC20` von oben und `Context` für OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Diese Zeile bindet die Bibliothek `SafeMath` an den Typ `uint256`. Sie finden diese Bibliothek
[hier](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Variablendefinitionen {#variable-definitions}

Diese Definitionen spezifizieren die Zustandsvariablen des Vertrags. Diese Variablen sind als `private` deklariert, aber
das bedeutet nur, dass andere Verträge auf der Blockchain sie nicht lesen können. _Es gibt keine
Geheimnisse auf der Blockchain_, die Software auf jedem Knoten hat den Zustand jedes Vertrags
bei jedem Block. Konventionsgemäß werden Zustandsvariablen `_<something>` genannt.

Die ersten beiden Variablen sind [Mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
was bedeutet, dass sie sich in etwa wie [assoziative Arrays](https://wikipedia.org/wiki/Associative_array) verhalten,
außer dass die Schlüssel numerische Werte sind. Speicher wird nur für Einträge zugewiesen, die Werte haben, die
vom Standard (Null) abweichen.

```solidity
    mapping (address => uint256) private _balances;
```

Das erste Mapping, `_balances`, sind Adressen und ihre jeweiligen Kontostände dieses Tokens. Um auf
den Kontostand zuzugreifen, verwenden Sie diese Syntax: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Diese Variable, `_allowances`, speichert die zuvor erklärten Freigabebeträge. Der erste Index ist der Eigentümer
der Token, und der zweite ist der Vertrag mit dem Freigabebetrag. Um auf den Betrag zuzugreifen, den Adresse A
vom Konto der Adresse B ausgeben kann, verwenden Sie `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Wie der Name schon sagt, verfolgt diese Variable das Gesamtangebot an Token.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Diese drei Variablen werden verwendet, um die Lesbarkeit zu verbessern. Die ersten beiden sind selbsterklärend, aber `_decimals`
ist es nicht.

Einerseits hat Ethereum keine Fließkomma- oder Bruchvariablen. Andererseits
mögen es Menschen, Token teilen zu können. Ein Grund, warum sich die Menschen auf Gold als Währung geeinigt haben, war, dass
es schwer war, Wechselgeld zu geben, wenn jemand den Gegenwert einer Ente in Kuh kaufen wollte.

Die Lösung besteht darin, Ganzzahlen zu verfolgen, aber anstelle des echten Tokens einen Bruchteil-Token zu zählen, der
fast wertlos ist. Im Fall von Ether wird der Bruchteil-Token Wei genannt, und 10^18 Wei entsprechen einem
ETH. Zum Zeitpunkt des Schreibens sind 10.000.000.000.000 Wei ungefähr ein US- oder Euro-Cent.

Anwendungen müssen wissen, wie der Token-Kontostand angezeigt werden soll. Wenn ein Benutzer 3.141.000.000.000.000.000 Wei hat, sind das
3,14 ETH? 31,41 ETH? 3.141 ETH? Im Fall von Ether ist definiert, dass 10^18 Wei einem ETH entsprechen, aber für Ihren
Token können Sie einen anderen Wert wählen. Wenn das Teilen des Tokens keinen Sinn ergibt, können Sie einen
`_decimals`-Wert von null verwenden. Wenn Sie denselben Standard wie ETH verwenden möchten, verwenden Sie den Wert **18**.

### Der Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Setzt die Werte für {name} und {symbol}, initialisiert {decimals} mit
     * einem Standardwert von 18.
     *
     * Um einen anderen Wert für {decimals} auszuwählen, verwenden Sie {_setupDecimals}.
     *
     * Alle drei dieser Werte sind unveränderlich: Sie können nur einmal während der
     * Konstruktion festgelegt werden.
     */
    constructor (string memory name_, string memory symbol_) public {
        // In Solidity ≥0.7.0 ist 'public' implizit und kann weggelassen werden.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Der Konstruktor wird aufgerufen, wenn der Vertrag zum ersten Mal erstellt wird. Konventionsgemäß werden Funktionsparameter `<something>_` genannt.

### Benutzeroberflächen-Funktionen {#user-interface-functions}

```solidity
    /**
     * @dev Gibt den Namen des Token zurück.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Gibt das Symbol des Token zurück, normalerweise eine kürzere Version des
     * Namens.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Gibt die Anzahl der Dezimalstellen zurück, die für die Benutzerdarstellung verwendet werden.
     * Zum Beispiel, wenn `decimals` gleich `2` ist, sollte ein Guthaben von `505` Token
     * einem Benutzer als `5,05` (`505 / 10 ** 2`) angezeigt werden.
     *
     * Token wählen normalerweise einen Wert von 18, was die Beziehung zwischen
     * Ether und Wei imitiert. Dies ist der Wert, den {ERC20} verwendet, es sei denn, {_setupDecimals} wird
     * aufgerufen.
     *
     * HINWEIS: Diese Information wird nur für _Anzeige_-Zwecke verwendet: Sie
     * beeinflusst in keiner Weise die Arithmetik des Vertrags, einschließlich
     * {IERC20-balanceOf} und {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Diese Funktionen, `name`, `symbol` und `decimals`, helfen Benutzeroberflächen, über Ihren Vertrag Bescheid zu wissen, damit sie ihn richtig anzeigen können.

Der Rückgabetyp ist `string memory`, was bedeutet, dass ein String zurückgegeben wird, der im Speicher abgelegt ist. Variablen, wie z. B.
Strings, können an drei Orten gespeichert werden:

|             | Lebensdauer      | Vertragszugriff | Gaskosten                                                              |
| ----------- | ---------------- | --------------- | ---------------------------------------------------------------------- |
| Memory      | Funktionsaufruf  | Lesen/Schreiben | Zehner oder Hunderter (höher für höhere Speicherorte)                  |
| Aufrufdaten | Funktionsaufruf  | Nur Lesen       | Kann nicht als Rückgabetyp verwendet werden, nur als Funktionsparametertyp |
| Storage     | Bis zur Änderung | Lesen/Schreiben | Hoch (800 für Lesen, 20k für Schreiben)                                |

In diesem Fall ist `memory` die beste Wahl.

### Token-Informationen lesen {#read-token-information}

Dies sind Funktionen, die Informationen über den Token bereitstellen, entweder das Gesamtangebot oder den
Kontostand eines Kontos.

```solidity
    /**
     * @dev Siehe {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Die Funktion `totalSupply` gibt das Gesamtangebot an Token zurück.

&nbsp;

```solidity
    /**
     * @dev Siehe {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Den Kontostand eines Kontos lesen. Beachten Sie, dass es jedem erlaubt ist, den Kontostand jedes anderen
abzurufen. Es hat keinen Sinn zu versuchen, diese Informationen zu verbergen, da sie ohnehin auf jedem
Knoten verfügbar sind. _Es gibt keine Geheimnisse auf der Blockchain._

### Token transferieren {#transfer-tokens}

```solidity
    /**
     * @dev Siehe {IERC20-transfer}.
     *
     * Anforderungen:
     *
     * - `recipient` darf nicht die Nulladresse sein.
     * - der Aufrufer muss ein Guthaben von mindestens `amount` haben.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Die Funktion `transfer` wird aufgerufen, um Token vom Konto des Senders auf ein anderes zu transferieren. Beachten
Sie, dass, obwohl sie einen booleschen Wert zurückgibt, dieser Wert immer **true** ist. Wenn der Transfer
fehlschlägt, macht der Vertrag den Aufruf rückgängig.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Die Funktion `_transfer` erledigt die eigentliche Arbeit. Es ist eine private Funktion, die nur von
anderen Vertragsfunktionen aufgerufen werden kann. Konventionsgemäß werden private Funktionen `_<something>` genannt, genau wie Zustandsvariablen.

Normalerweise verwenden wir in Solidity `msg.sender` für den Absender der Nachricht. Das bricht jedoch
[OpenGSN](https://opengsn.org/). Wenn wir etherlose Transaktionen mit unserem Token erlauben wollen, müssen
wir `_msgSender()` verwenden. Es gibt `msg.sender` für normale Transaktionen zurück, aber für etherlose
gibt es den ursprünglichen Unterzeichner zurück und nicht den Vertrag, der die Nachricht weitergeleitet hat.

### Freigabebetrag-Funktionen {#allowance-functions}

Dies sind die Funktionen, die die Funktionalität für Freigabebeträge implementieren: `allowance`, `approve`, `transferFrom`
und `_approve`. Zusätzlich geht die OpenZeppelin-Implementierung über den grundlegenden Standard hinaus und enthält einige Funktionen, die die
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

Die Funktion `allowance` erlaubt es jedem, jeden Freigabebetrag zu überprüfen.

#### Die approve-Funktion {#approve}

```solidity
    /**
     * @dev Siehe {IERC20-approve}.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Nulladresse sein.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Diese Funktion wird aufgerufen, um einen Freigabebetrag zu erstellen. Sie ist ähnlich wie die obige Funktion `transfer`:

- Die Funktion ruft lediglich eine interne Funktion auf (in diesem Fall `_approve`), die die eigentliche Arbeit erledigt.
- Die Funktion gibt entweder `true` zurück (wenn erfolgreich) oder wird rückgängig gemacht (wenn nicht).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Wir verwenden interne Funktionen, um die Anzahl der Stellen zu minimieren, an denen Zustandsänderungen stattfinden. _Jede_ Funktion, die den
Zustand ändert, ist ein potenzielles Sicherheitsrisiko, das auf Sicherheit geprüft werden muss. Auf diese Weise haben wir weniger Chancen, Fehler zu machen.

#### Die transferFrom-Funktion {#transferfrom}

Dies ist die Funktion, die ein Ausgebender aufruft, um einen Freigabebetrag auszugeben. Dies erfordert zwei Operationen: den ausgegebenen
Betrag transferieren und den Freigabebetrag um diesen Betrag reduzieren.

```solidity
    /**
     * @dev Siehe {IERC20-transferFrom}.
     *
     * Löst ein {Approval}-Ereignis aus, das den aktualisierten Freigabebetrag anzeigt. Dies wird vom
     * EIP nicht verlangt. Siehe den Hinweis zu Beginn von {ERC20}.
     *
     * Anforderungen:
     *
     * - `sender` und `recipient` dürfen nicht die Nulladresse sein.
     * - `sender` muss ein Guthaben von mindestens `amount` haben.
     * - der Aufrufer muss einen Freigabebetrag für die Token von ``sender`` in Höhe von mindestens
     * `amount` haben.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Der Funktionsaufruf `a.sub(b, "message")` tut zwei Dinge. Erstens berechnet er `a-b`, was der neue Freigabebetrag ist.
Zweitens überprüft er, ob dieses Ergebnis nicht negativ ist. Wenn es negativ ist, wird der Aufruf mit der bereitgestellten Nachricht rückgängig gemacht. Beachten Sie, dass, wenn ein Aufruf rückgängig gemacht wird, jegliche Verarbeitung, die zuvor während dieses Aufrufs durchgeführt wurde, ignoriert wird, sodass wir `_transfer` nicht rückgängig machen müssen.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Sicherheitserweiterungen von OpenZeppelin {#openzeppelin-safety-additions}

Es ist gefährlich, einen Freigabebetrag ungleich null auf einen anderen Wert ungleich null zu setzen,
da Sie nur die Reihenfolge Ihrer eigenen Transaktionen kontrollieren, nicht die von jemand anderem. Stellen Sie sich vor, Sie
haben zwei Benutzer, Alice, die naiv ist, und Bill, der unehrlich ist. Alice möchte eine Dienstleistung von
Bill, von der sie denkt, dass sie fünf Token kostet – also gibt sie Bill einen Freigabebetrag von fünf Token.

Dann ändert sich etwas und Bills Preis steigt auf zehn Token. Alice, die die Dienstleistung immer noch möchte,
sendet eine Transaktion, die Bills Freigabebetrag auf zehn setzt. In dem Moment, in dem Bill diese neue Transaktion
im Transaktionspool sieht, sendet er eine Transaktion, die Alices fünf Token ausgibt und einen viel
höheren Gaspreis hat, damit sie schneller gemint wird. Auf diese Weise kann Bill zuerst fünf Token ausgeben und dann,
sobald Alices neuer Freigabebetrag gemint ist, zehn weitere ausgeben, für einen Gesamtpreis von fünfzehn Token, mehr als
Alice autorisieren wollte. Diese Technik wird
[Front-Running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running) genannt.

| Alice-Transaktion | Alice-Nonce | Bill-Transaktion              | Bill-Nonce | Bills Freigabebetrag | Bills Gesamteinnahmen von Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | -------------------- | ------------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                    | 0                               |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                    | 5                               |
| approve(Bill, 10) | 11          |                               |            | 10                   | 5                               |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                    | 15                              |

Um dieses Problem zu vermeiden, ermöglichen Ihnen diese beiden Funktionen (`increaseAllowance` und `decreaseAllowance`),
den Freigabebetrag um einen bestimmten Betrag zu ändern. Wenn Bill also bereits fünf Token ausgegeben hätte, könnte er nur noch
fünf weitere ausgeben. Abhängig vom Timing gibt es zwei Möglichkeiten, wie dies funktionieren kann, die beide
damit enden, dass Bill nur zehn Token erhält:

A:

| Alice-Transaktion          | Alice-Nonce | Bill-Transaktion             | Bill-Nonce | Bills Freigabebetrag | Bills Gesamteinnahmen von Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | -------------------: | ------------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                    5 | 0                               |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                    0 | 5                               |
| increaseAllowance(Bill, 5) |          11 |                              |            |              0+5 = 5 | 5                               |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                    0 | 10                              |

B:

| Alice-Transaktion          | Alice-Nonce | Bill-Transaktion              | Bill-Nonce | Bills Freigabebetrag | Bills Gesamteinnahmen von Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | -------------------: | ------------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                    5 |                               0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |             5+5 = 10 |                               0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                    0 |                              10 |

```solidity
    /**
     * @dev Erhöht atomar den Freigabebetrag, der `spender` vom Aufrufer gewährt wurde.
     *
     * Dies ist eine Alternative zu {approve}, die als Abhilfe für
     * Probleme verwendet werden kann, die in {IERC20-approve} beschrieben sind.
     *
     * Löst ein {Approval}-Ereignis aus, das den aktualisierten Freigabebetrag anzeigt.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Nulladresse sein.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Die Funktion `a.add(b)` ist eine sichere Addition. Im unwahrscheinlichen Fall, dass `a`+`b`>=`2^256` ist, kommt es nicht zu einem Überlauf,
wie es bei einer normalen Addition der Fall wäre.

```solidity

    /**
     * @dev Verringert atomar den Freigabebetrag, der `spender` vom Aufrufer gewährt wurde.
     *
     * Dies ist eine Alternative zu {approve}, die als Abhilfe für
     * Probleme verwendet werden kann, die in {IERC20-approve} beschrieben sind.
     *
     * Löst ein {Approval}-Ereignis aus, das den aktualisierten Freigabebetrag anzeigt.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Nulladresse sein.
     * - `spender` muss einen Freigabebetrag für den Aufrufer von mindestens
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

#### Die _transfer-Funktion {#transfer}

```solidity
    /**
     * @dev Bewegt `amount` Token von `sender` zu `recipient`.
     *
     * Diese interne Funktion ist äquivalent zu {transfer} und kann verwendet werden, um
     * z. B. automatische Token-Gebühren, Slashing-Mechanismen usw. zu implementieren.
     *
     * Löst ein {Transfer}-Ereignis aus.
     *
     * Anforderungen:
     *
     * - `sender` darf nicht die Nulladresse sein.
     * - `recipient` darf nicht die Nulladresse sein.
     * - `sender` muss ein Guthaben von mindestens `amount` haben.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Diese Funktion, `_transfer`, transferiert Token von einem Konto auf ein anderes. Sie wird sowohl von
`transfer` (für Transfers vom eigenen Konto des Senders) als auch von `transferFrom` (für die Verwendung von Freigabebeträgen
zum Transferieren vom Konto einer anderen Person) aufgerufen.

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Niemand besitzt tatsächlich die Nulladresse in Ethereum (das heißt, niemand kennt einen privaten Schlüssel, dessen passender öffentlicher Schlüssel
in die Nulladresse umgewandelt wird). Wenn Leute diese Adresse verwenden, handelt es sich normalerweise um einen Softwarefehler – daher
schlagen wir fehl, wenn die Nulladresse als Sender oder Empfänger verwendet wird.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Es gibt zwei Möglichkeiten, diesen Vertrag zu nutzen:

1. Verwenden Sie ihn als Vorlage für Ihren eigenen Code
1. [Erben Sie davon](https://www.bitdegree.org/learn/solidity-inheritance) und überschreiben Sie nur die Funktionen, die Sie ändern müssen

Die zweite Methode ist viel besser, da der ERC-20-Code von OpenZeppelin bereits geprüft wurde und sich als sicher erwiesen hat. Wenn Sie Vererbung verwenden,
ist klar, welche Funktionen Sie ändern, und um Ihrem Vertrag zu vertrauen, müssen die Leute nur diese spezifischen Funktionen prüfen.

Es ist oft nützlich, jedes Mal eine Funktion auszuführen, wenn Token den Besitzer wechseln. Jedoch ist `_transfer` eine sehr wichtige Funktion und es ist
möglich, sie unsicher zu schreiben (siehe unten), daher ist es am besten, sie nicht zu überschreiben. Die Lösung ist `_beforeTokenTransfer`, eine
[Hook-Funktion](https://wikipedia.org/wiki/Hooking). Sie können diese Funktion überschreiben, und sie wird bei jedem Transfer aufgerufen.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Dies sind die Zeilen, die den Transfer tatsächlich durchführen. Beachten Sie, dass sich **nichts** dazwischen befindet und dass wir
den transferierten Betrag vom Sender abziehen, bevor wir ihn dem Empfänger hinzufügen. Dies ist wichtig, denn wenn es in der
Mitte einen Aufruf an einen anderen Vertrag gäbe, hätte dieser verwendet werden können, um diesen Vertrag zu betrügen. Auf diese Weise
ist der Transfer atomar, in der Mitte kann nichts passieren.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Lösen Sie schließlich ein Ereignis `Transfer` aus. Ereignisse sind für Smart Contracts nicht zugänglich, aber Code, der außerhalb der Blockchain
ausgeführt wird, kann auf Ereignisse lauschen und darauf reagieren. Zum Beispiel kann eine Wallet verfolgen, wann der Eigentümer mehr Token erhält.

#### Die _mint- und _burn-Funktionen {#mint-and-burn}

Diese beiden Funktionen (`_mint` und `_burn`) ändern das Gesamtangebot an Token.
Sie sind intern und es gibt keine Funktion, die sie in diesem Vertrag aufruft,
daher sind sie nur nützlich, wenn Sie vom Vertrag erben und Ihre eigene
Logik hinzufügen, um zu entscheiden, unter welchen Bedingungen neue Token geprägt oder bestehende
verbrannt werden sollen.

**HINWEIS:** Jeder ERC-20-Token hat seine eigene Geschäftslogik, die die Token-Verwaltung diktiert.
Zum Beispiel könnte ein Vertrag mit festem Angebot `_mint`
nur im Konstruktor aufrufen und niemals `_burn` aufrufen. Ein Vertrag, der Token verkauft,
wird `_mint` aufrufen, wenn er bezahlt wird, und vermutlich irgendwann `_burn` aufrufen,
um eine unkontrollierte Inflation zu vermeiden.

```solidity
    /** @dev Erstellt `amount` Token und weist sie `account` zu, wodurch
     * das Gesamtangebot erhöht wird.
     *
     * Löst ein {Transfer}-Ereignis aus, bei dem `from` auf die Nulladresse gesetzt ist.
     *
     * Anforderungen:
     *
     * - `to` darf nicht die Nulladresse sein.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Stellen Sie sicher, dass Sie `_totalSupply` aktualisieren, wenn sich die Gesamtzahl der Token ändert.

&nbsp;

```solidity
    /**
     * @dev Zerstört `amount` Token von `account`, wodurch das
     * Gesamtangebot verringert wird.
     *
     * Löst ein {Transfer}-Ereignis aus, bei dem `to` auf die Nulladresse gesetzt ist.
     *
     * Anforderungen:
     *
     * - `account` darf nicht die Nulladresse sein.
     * - `account` muss mindestens `amount` Token haben.
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

#### Die _approve-Funktion {#approve-2}

Dies ist die Funktion, die tatsächlich Freigabebeträge spezifiziert. Beachten Sie, dass sie es einem Eigentümer ermöglicht,
einen Freigabebetrag anzugeben, der höher ist als der aktuelle Kontostand des Eigentümers. Das ist in Ordnung, da der Kontostand
zum Zeitpunkt des Transfers überprüft wird, wenn er sich von dem Kontostand bei der Erstellung des Freigabebetrags
unterscheiden könnte.

```solidity
    /**
     * @dev Setzt `amount` als Freigabebetrag von `spender` für die Token des `owner`.
     *
     * Diese interne Funktion ist äquivalent zu `approve` und kann verwendet werden, um
     * z. B. automatische Freigabebeträge für bestimmte Subsysteme usw. festzulegen.
     *
     * Löst ein {Approval}-Ereignis aus.
     *
     * Anforderungen:
     *
     * - `owner` darf nicht die Nulladresse sein.
     * - `spender` darf nicht die Nulladresse sein.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Lösen Sie ein Ereignis `Approval` aus. Je nachdem, wie die Anwendung geschrieben ist, kann der Ausgebenden-Vertrag entweder
vom Eigentümer oder von einem Server, der auf diese Ereignisse lauscht, über die Genehmigung informiert werden.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Die Decimals-Variable ändern {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Setzt {decimals} auf einen anderen Wert als den Standardwert von 18.
     *
     * WARNUNG: Diese Funktion sollte nur vom Konstruktor aufgerufen werden. Die meisten
     * Anwendungen, die mit Token-Verträgen interagieren, erwarten nicht,
     * dass sich {decimals} jemals ändert, und funktionieren möglicherweise fehlerhaft, wenn dies geschieht.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Diese Funktion ändert die Variable `_decimals`, die verwendet wird, um Benutzeroberflächen mitzuteilen, wie der Betrag zu interpretieren ist.
Sie sollten sie aus dem Konstruktor aufrufen. Es wäre unehrlich, sie zu einem späteren Zeitpunkt aufzurufen, und Anwendungen
sind nicht darauf ausgelegt, damit umzugehen.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook, der vor jedem Transfer von Token aufgerufen wird. Dies schließt
     * das Prägen (Minting) und Verbrennen (Burning) ein.
     *
     * Aufrufbedingungen:
     *
     * - wenn `from` und `to` beide nicht null sind, werden `amount` Token von `from`
     * an `to` transferiert.
     * - wenn `from` null ist, werden `amount` Token für `to` geprägt.
     * - wenn `to` null ist, werden `amount` Token von `from` verbrannt.
     * - `from` und `to` sind niemals beide null.
     *
     * Um mehr über Hooks zu erfahren, lesen Sie xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Dies ist die Hook-Funktion, die während Transfers aufgerufen werden soll. Sie ist hier leer, aber wenn Sie möchten,
dass sie etwas tut, überschreiben Sie sie einfach.

## Fazit {#conclusion}

Zur Wiederholung sind hier einige der wichtigsten Ideen in diesem Vertrag (meiner Meinung nach, Ihre wird wahrscheinlich abweichen):

- _Es gibt keine Geheimnisse auf der Blockchain_. Jede Information, auf die ein Smart Contract zugreifen kann,
  ist für die ganze Welt verfügbar.
- Sie können die Reihenfolge Ihrer eigenen Transaktionen kontrollieren, aber nicht, wann die Transaktionen anderer Personen
  stattfinden. Dies ist der Grund, warum das Ändern eines Freigabebetrags gefährlich sein kann, da es
  dem Ausgebenden ermöglicht, die Summe beider Freigabebeträge auszugeben.
- Werte vom Typ `uint256` laufen über. Mit anderen Worten, _0-1=2^256-1_. Wenn das kein gewünschtes
  Verhalten ist, müssen Sie darauf prüfen (oder die SafeMath-Bibliothek verwenden, die das für Sie erledigt). Beachten Sie, dass sich dies in
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) geändert hat.
- Führen Sie alle Zustandsänderungen eines bestimmten Typs an einem bestimmten Ort durch, da dies die Prüfung erleichtert.
  Dies ist der Grund, warum wir zum Beispiel `_approve` haben, das von `approve`, `transferFrom`,
  `increaseAllowance` und `decreaseAllowance` aufgerufen wird.
- Zustandsänderungen sollten atomar sein, ohne eine andere Aktion in ihrer Mitte (wie Sie
  in `_transfer` sehen können). Dies liegt daran, dass Sie während der Zustandsänderung einen inkonsistenten Zustand haben. Zum Beispiel
  existieren zwischen dem Zeitpunkt, an dem Sie vom Kontostand des Senders abziehen, und dem Zeitpunkt, an dem Sie dem Kontostand des
  Empfängers hinzufügen, weniger Token, als es geben sollte. Dies könnte potenziell missbraucht werden, wenn es
  dazwischen Operationen gibt, insbesondere Aufrufe an einen anderen Vertrag.

Da Sie nun gesehen haben, wie der ERC-20-Vertrag von OpenZeppelin geschrieben ist und insbesondere, wie er
sicherer gemacht wird, gehen Sie hin und schreiben Sie Ihre eigenen sicheren Verträge und Anwendungen.

[Weitere Arbeiten von mir finden Sie hier](https://cryptodocguy.pro/).
