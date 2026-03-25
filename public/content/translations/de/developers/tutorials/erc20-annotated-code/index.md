---
title: "ERC-20-Vertrag – Schritt-für-Schritt-Anleitung"
description: Was steht im OpenZeppelin ERC-20-Vertrag und warum?
author: Ori Pomerantz
lang: de
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: ERC-20-Walkthrough
published: 2021-03-09
---

## Einführung {#introduction}

Eine der häufigsten Anwendungen für Ethereum ist die Erstellung eines handelbaren Tokens durch eine Gruppe, gewissermaßen ihre eigene Währung. Diese Token folgen typischerweise einem Standard, dem
[ERC-20](/developers/docs/standards/tokens/erc-20/). Dieser Standard macht es möglich, Werkzeuge wie Liquiditätspools und Wallets zu schreiben, die mit allen ERC-20-Token funktionieren. In diesem Artikel werden wir die
[OpenZeppelin Solidity ERC20-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) sowie die
[Schnittstellendefinition](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) analysieren.

Dies ist ein kommentierter Quellcode. Wenn Sie ERC-20 implementieren möchten,
[lesen Sie dieses Tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Die Schnittstelle {#the-interface}

Der Zweck eines Standards wie ERC-20 ist es, viele Token-Implementierungen zu ermöglichen, die über Anwendungen hinweg interoperabel sind, wie Wallets und dezentralisierte Börsen. Um das zu erreichen, erstellen wir eine
[Schnittstelle](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Jeder Code, der den Token-Vertrag nutzen muss, kann dieselben Definitionen in der Schnittstelle verwenden und mit allen Token-Verträgen kompatibel sein, die diese nutzen, sei es ein Wallet wie MetaMask, eine Dapp wie etherscan.io oder ein anderer Vertrag wie ein Liquiditätspool.

![Illustration der ERC-20-Schnittstelle](erc20_interface.png)

Wenn Sie ein erfahrener Programmierer sind, erinnern Sie sich wahrscheinlich daran, ähnliche Konstrukte in [Java](https://www.w3schools.com/java/java_interface.asp)
oder sogar in [C-Header-Dateien](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) gesehen zu haben.

Dies ist eine Definition der [ERC-20-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
von OpenZeppelin. Es ist eine Übersetzung des [menschenlesbaren Standards](https://eips.ethereum.org/EIPS/eip-20) in Solidity-Code. Natürlich definiert die Schnittstelle selbst nicht, _wie_ etwas zu tun ist. Das wird im Vertragsquellcode weiter unten erklärt.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity-Dateien sollten eine Lizenzkennung enthalten. [Sie können die Liste der Lizenzen hier einsehen](https://spdx.org/licenses/). Wenn Sie eine andere Lizenz benötigen, erklären Sie dies einfach in den Kommentaren.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Die Sprache Solidity entwickelt sich immer noch schnell weiter, und neue Versionen sind möglicherweise nicht mit altem Code kompatibel
([siehe hier](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Daher ist es eine gute Idee, nicht nur eine Mindestversion der Sprache anzugeben, sondern auch eine Höchstversion, die neueste, mit der Sie den Code getestet haben.

&nbsp;

```solidity
/* *
 * @dev Schnittstelle des ERC20-Standards, wie im EIP definiert. */



```

Das `@dev` im Kommentar ist Teil des [NatSpec-Formats](https://docs.soliditylang.org/en/develop/natspec-format.html), das verwendet wird, um Dokumentation aus dem Quellcode zu erstellen.

&nbsp;

```solidity
interface IERC20 {
```

Konventionsgemäß beginnen Schnittstellennamen mit `I`.

&nbsp;

```solidity
    /* *
     * @dev Gibt die Menge der existierenden Token zurück. */
    


    function totalSupply() external view returns (uint256);
```

Diese Funktion ist `external`, was bedeutet, dass [sie nur von außerhalb des Vertrags aufgerufen werden kann](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Sie gibt das Gesamtangebot an Token im Vertrag zurück. Dieser Wert wird unter Verwendung des häufigsten Typs in Ethereum zurückgegeben, vorzeichenlose 256 Bits (256 Bits ist die native Wortgröße der Ethereum Virtual Machine). Diese Funktion ist auch eine `view`, was bedeutet, dass sie den Zustand nicht ändert, sodass sie auf einem einzelnen Blockchain-Knoten ausgeführt werden kann, anstatt dass jeder Blockchain-Knoten in der Blockchain sie ausführt. Diese Art von Funktion generiert keine Transaktion und kostet kein [Gas](/developers/docs/gas/).

**Hinweis:** Theoretisch könnte es so aussehen, als könnte der Ersteller eines Vertrags betrügen, indem er ein kleineres Gesamtangebot als den tatsächlichen Wert zurückgibt, wodurch jeder Token wertvoller erscheint, als er tatsächlich ist. Diese Befürchtung ignoriert jedoch die wahre Natur der Blockchain. Alles, was auf der Blockchain passiert, kann von jedem Blockchain-Knoten verifiziert werden. Um dies zu erreichen, sind der Maschinensprache-Code und der Speicher jedes Vertrags auf jedem Blockchain-Knoten verfügbar. Obwohl Sie nicht verpflichtet sind, den Solidity-Code für Ihren Vertrag zu veröffentlichen, würde Sie niemand ernst nehmen, es sei denn, Sie veröffentlichen den Quellcode und die Version von Solidity, mit der er kompiliert wurde, damit er gegen den von Ihnen bereitgestellten Maschinensprache-Code verifiziert werden kann.
Siehe zum Beispiel [diesen Vertrag](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /* *
     * @dev Gibt die Menge der Token zurück, die `account` gehören. */
    


    function balanceOf(address account) external view returns (uint256);
```

Wie der Name schon sagt, gibt `balanceOf` den Kontostand eines Kontos zurück. Ethereum-Konten werden in Solidity mit dem Typ `address` identifiziert, der 160 Bits umfasst.
Sie ist ebenfalls `external` und `view`.

&nbsp;

```solidity
    /* *
     * @dev Verschiebt `amount` Token vom Konto des Aufrufers zu `recipient`.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * Löst ein {Transfer}-Ereignis aus. */
    






    function transfer(address recipient, uint256 amount) external returns (bool);
```

Die Funktion `transfer` überträgt Token vom Aufrufer an eine andere Adresse. Dies beinhaltet eine Zustandsänderung, ist also keine `view`.
Wenn ein Benutzer diese Funktion aufruft, erstellt sie eine Transaktion und kostet Gas. Sie gibt auch ein Ereignis, `Transfer`, aus, um jeden auf der Blockchain über das Ereignis zu informieren.

Die Funktion hat zwei Arten von Ausgaben für zwei verschiedene Arten von Aufrufern:

- Benutzer, die die Funktion direkt über eine Benutzeroberfläche aufrufen. Typischerweise reicht der Benutzer eine Transaktion ein und wartet nicht auf eine Antwort, was eine unbestimmte Zeit in Anspruch nehmen könnte. Der Benutzer kann sehen, was passiert ist, indem er nach der Transaktionsquittung sucht (die durch den Transaktions-Hash identifiziert wird) oder nach dem Ereignis `Transfer` sucht.
- Andere Verträge, die die Funktion als Teil einer Gesamttransaktion aufrufen. Diese Verträge erhalten das Ergebnis sofort, da sie in derselben Transaktion ausgeführt werden, sodass sie den Rückgabewert der Funktion verwenden können.

Die gleiche Art von Ausgabe wird von den anderen Funktionen erstellt, die den Zustand des Vertrags ändern.

&nbsp;

Freigaben (Allowances) erlauben es einem Konto, einige Token auszugeben, die einem anderen Eigentümer gehören.
Dies ist zum Beispiel nützlich für Verträge, die als Verkäufer agieren. Verträge können nicht auf Ereignisse überwachen. Wenn also ein Käufer Token direkt an den Verkäufervertrag übertragen würde, wüsste dieser Vertrag nicht, dass er bezahlt wurde. Stattdessen erlaubt der Käufer dem Verkäufervertrag, einen bestimmten Betrag auszugeben, und der Verkäufer überträgt diesen Betrag.
Dies geschieht über eine Funktion, die der Verkäufervertrag aufruft, sodass der Verkäufervertrag wissen kann, ob er erfolgreich war.

```solidity
    /* *
     * @dev Gibt die verbleibende Anzahl von Token zurück, die `spender` im Namen von `owner` über {transferFrom} ausgeben darf. Dies ist standardmäßig null.
     *
     * Dieser Wert ändert sich, wenn {approve} oder {transferFrom} aufgerufen werden. */
    






    function allowance(address owner, address spender) external view returns (uint256);
```

Die Funktion `allowance` lässt jeden abfragen, wie hoch die Freigabe ist, die eine Adresse (`owner`) einer anderen Adresse (`spender`) zum Ausgeben gewährt.

&nbsp;

```solidity
    /* *
     * @dev Setzt `amount` als Freibetrag von `spender` über die Token des Aufrufers.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * WICHTIG: Beachten Sie, dass das Ändern eines Freibetrags mit dieser Methode das Risiko birgt, dass jemand durch unglückliche Transaktionsreihenfolge sowohl den alten als auch den neuen Freibetrag nutzen könnte. Eine mögliche Lösung zur Minderung dieser Race Condition besteht darin, den Freibetrag des Ausgebers zuerst auf 0 zu reduzieren und danach den gewünschten Wert festzulegen:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Löst ein {Approval}-Ereignis aus. */
    













    function approve(address spender, uint256 amount) external returns (bool);
```

Die Funktion `approve` erstellt eine Freigabe. Stellen Sie sicher, dass Sie die Nachricht darüber lesen, wie sie missbraucht werden kann. In Ethereum kontrollieren Sie die Reihenfolge Ihrer eigenen Transaktionen, aber Sie können nicht die Reihenfolge kontrollieren, in der die Transaktionen anderer Personen ausgeführt werden, es sei denn, Sie reichen Ihre eigene Transaktion erst ein, wenn Sie sehen, dass die Transaktion der anderen Seite stattgefunden hat.

&nbsp;

```solidity
    /* *
     * @dev Verschiebt `amount` Token von `sender` zu `recipient` unter Verwendung des Freibetragsmechanismus. `amount` wird dann vom Freibetrag des Aufrufers abgezogen.
     *
     * Gibt einen booleschen Wert zurück, der angibt, ob die Operation erfolgreich war.
     *
     * Löst ein {Transfer}-Ereignis aus. */
    








    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Schließlich wird `transferFrom` vom Ausgebenden verwendet, um die Freigabe tatsächlich auszugeben.

&nbsp;

```solidity

    /* *
     * @dev Wird ausgelöst, wenn `value` Token von einem Konto (`from`) auf ein anderes (`to`) verschoben werden.
     *
     * Beachten Sie, dass `value` null sein kann. */
    





    event Transfer(address indexed from, address indexed to, uint256 value);

    /* *
     * @dev Wird ausgelöst, wenn der Freibetrag eines `spender` für einen `owner` durch einen Aufruf von {approve} festgelegt wird. `value` ist der neue Freibetrag. */
    



    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Diese Ereignisse werden ausgegeben, wenn sich der Zustand des ERC-20-Vertrags ändert.

## Der eigentliche Vertrag {#the-actual-contract}

Dies ist der eigentliche Vertrag, der den ERC-20-Standard implementiert,
[von hier entnommen](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Er ist nicht dazu gedacht, so wie er ist verwendet zu werden, aber Sie können davon
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

- `GSN/Context.sol` sind die Definitionen, die erforderlich sind, um [OpenGSN](https://www.opengsn.org/) zu verwenden, ein System, das es Benutzern ohne Ether ermöglicht, die Blockchain zu nutzen. Beachten Sie, dass dies eine alte Version ist. Wenn Sie OpenGSN integrieren möchten,
  [verwenden Sie dieses Tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Die SafeMath-Bibliothek](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), die arithmetische Überläufe/Unterläufe für Solidity-Versionen **&lt;0.8.0** verhindert. In Solidity ≥0.8.0 werden arithmetische Operationen bei Überlauf/Unterlauf automatisch rückgängig gemacht, was SafeMath überflüssig macht. Dieser Vertrag verwendet SafeMath zur Abwärtskompatibilität mit älteren Compiler-Versionen.

&nbsp;

Dieser Kommentar erklärt den Zweck des Vertrags.

```solidity
/* *
 * @dev Implementierung der {IERC20}-Schnittstelle.
 *
 * Diese Implementierung ist unabhängig davon, wie Token erstellt werden. Das bedeutet, dass ein Angebotsmechanismus in einem abgeleiteten Vertrag unter Verwendung von {_mint} hinzugefügt werden muss. Für einen generischen Mechanismus siehe {ERC20PresetMinterPauser}.
 *
 * TIPP: Für eine detaillierte Beschreibung siehe unseren Leitfaden
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Wir haben die allgemeinen OpenZeppelin-Richtlinien befolgt: Funktionen werden bei einem Fehler rückgängig gemacht (revert), anstatt `false` zurückzugeben. Dieses Verhalten ist dennoch konventionell und steht nicht im Widerspruch zu den Erwartungen von ERC20-Anwendungen.
 *
 * Zusätzlich wird bei Aufrufen von {transferFrom} ein {Approval}-Ereignis ausgelöst. Dies ermöglicht es Anwendungen, den Freibetrag für alle Konten zu rekonstruieren, indem sie einfach auf diese Ereignisse hören. Andere Implementierungen des EIP lösen diese Ereignisse möglicherweise nicht aus, da dies von der Spezifikation nicht verlangt wird.
 *
 * Schließlich wurden die nicht standardmäßigen Funktionen {decreaseAllowance} und {increaseAllowance} hinzugefügt, um die bekannten Probleme beim Festlegen von Freibeträgen zu mindern. Siehe {IERC20-approve}. */

























```

### Vertragsdefinition {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Diese Zeile gibt die Vererbung an, in diesem Fall von `IERC20` von oben und `Context`, für OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Diese Zeile hängt die `SafeMath`-Bibliothek an den Typ `uint256` an. Sie können diese Bibliothek
[hier](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) finden.

### Variablendefinitionen {#variable-definitions}

Diese Definitionen spezifizieren die Zustandsvariablen des Vertrags. Diese Variablen sind als `private` deklariert, aber das bedeutet nur, dass andere Verträge auf der Blockchain sie nicht lesen können. _Es gibt keine Geheimnisse auf der Blockchain_, die Software auf jedem Blockchain-Knoten hat den Zustand jedes Vertrags bei jedem Block. Konventionsgemäß werden Zustandsvariablen `_<etwas>` genannt.

Die ersten beiden Variablen sind [Mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
was bedeutet, dass sie sich ungefähr so verhalten wie [assoziative Arrays](https://wikipedia.org/wiki/Associative_array),
außer dass die Schlüssel numerische Werte sind. Speicher wird nur für Einträge zugewiesen, die Werte haben, die vom Standard (Null) abweichen.

```solidity
    mapping (address => uint256) private _balances;
```

Das erste Mapping, `_balances`, sind Adressen und ihre jeweiligen Kontostände dieses Tokens. Um auf den Kontostand zuzugreifen, verwenden Sie diese Syntax: `_balances[<Adresse>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Diese Variable, `_allowances`, speichert die zuvor erklärten Freigaben. Der erste Index ist der Eigentümer der Token, und der zweite ist der Vertrag mit der Freigabe. Um auf den Betrag zuzugreifen, den Adresse A vom Konto der Adresse B ausgeben kann, verwenden Sie `_allowances[B][A]`.

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

Diese drei Variablen werden verwendet, um die Lesbarkeit zu verbessern. Die ersten beiden sind selbsterklärend, aber `_decimals` ist es nicht.

Einerseits hat Ethereum keine Fließkomma- oder Bruchvariablen. Andererseits mögen es Menschen, Token teilen zu können. Ein Grund, warum sich die Menschen auf Gold als Währung geeinigt haben, war, dass es schwer war, Wechselgeld zu geben, wenn jemand den Gegenwert einer Ente in Kuh kaufen wollte.

Die Lösung besteht darin, Ganzzahlen zu verfolgen, aber anstelle des echten Tokens einen Bruchteil-Token zu zählen, der fast wertlos ist. Im Fall von Ether wird der Bruchteil-Token Wei genannt, und 10^18 Wei entsprechen einem ETH. Zum Zeitpunkt des Schreibens sind 10.000.000.000.000 Wei ungefähr ein US- oder Euro-Cent.

Anwendungen müssen wissen, wie der Token-Kontostand angezeigt werden soll. Wenn ein Benutzer 3.141.000.000.000.000.000 Wei hat, sind das 3,14 ETH? 31,41 ETH? 3.141 ETH? Im Fall von Ether ist definiert, dass 10^18 Wei einem ETH entsprechen, aber für Ihren Token können Sie einen anderen Wert wählen. Wenn das Teilen des Tokens keinen Sinn ergibt, können Sie einen `_decimals`-Wert von null verwenden. Wenn Sie denselben Standard wie ETH verwenden möchten, verwenden Sie den Wert **18**.

### Der Konstruktor {#the-constructor}

```solidity
    /* *
     * @dev Setzt die Werte für {name} und {symbol}, initialisiert {decimals} mit einem Standardwert von 18.
     *
     * Um einen anderen Wert für {decimals} auszuwählen, verwenden Sie {_setupDecimals}.
     *
     * Alle drei dieser Werte sind unveränderlich: Sie können nur einmal während der Konstruktion festgelegt werden. */
    








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
    /* *
     * @dev Gibt den Namen des Tokens zurück. */
    


    function name() public view returns (string memory) {
        return _name;
    }

    /* *
     * @dev Gibt das Symbol des Tokens zurück, normalerweise eine kürzere Version des Namens. */
    



    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /* *
     * @dev Gibt die Anzahl der Dezimalstellen zurück, die für die Benutzerdarstellung verwendet werden.
     * Wenn `decimals` beispielsweise `2` ist, sollte ein Guthaben von `505` Token einem Benutzer als `5,05` (`505 / 10 ** 2`) angezeigt werden.
     *
     * Token entscheiden sich normalerweise für einen Wert von 18, was die Beziehung zwischen Ether und Wei imitiert. Dies ist der Wert, den {ERC20} verwendet, es sei denn, {_setupDecimals} wird aufgerufen.
     *
     * HINWEIS: Diese Informationen werden nur für _Anzeige_-Zwecke verwendet: Sie beeinflussen in keiner Weise die Arithmetik des Vertrags, einschließlich {IERC20-balanceOf} und {IERC20-transfer}. */
    












    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Diese Funktionen, `name`, `symbol` und `decimals`, helfen Benutzeroberflächen, über Ihren Vertrag Bescheid zu wissen, damit sie ihn richtig anzeigen können.

Der Rückgabetyp ist `string memory`, was bedeutet, dass ein String zurückgegeben wird, der im Speicher (Memory) abgelegt ist. Variablen, wie z. B. Strings, können an drei Orten gespeichert werden:

|          | Lebensdauer   | Vertragszugriff | Gaskosten                                                      |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Memory   | Funktionsaufruf | Lesen/Schreiben | Zehner oder Hunderter (höher für höhere Speicherorte)          |
| Calldata | Funktionsaufruf | Nur Lesen       | Kann nicht als Rückgabetyp verwendet werden, nur als Parameter |
| Storage  | Bis zur Änderung| Lesen/Schreiben | Hoch (800 für Lesen, 20k für Schreiben)                        |

In diesem Fall ist `memory` die beste Wahl.

### Token-Informationen lesen {#read-token-information}

Dies sind Funktionen, die Informationen über den Token liefern, entweder das Gesamtangebot oder den Kontostand eines Kontos.

```solidity
    /* *
     * @dev Siehe {IERC20-totalSupply}. */
    


    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Die Funktion `totalSupply` gibt das Gesamtangebot an Token zurück.

&nbsp;

```solidity
    /* *
     * @dev Siehe {IERC20-balanceOf}. */
    


    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Lesen Sie den Kontostand eines Kontos. Beachten Sie, dass es jedem erlaubt ist, den Kontostand eines anderen abzurufen. Es hat keinen Sinn zu versuchen, diese Informationen zu verbergen, da sie ohnehin auf jedem Blockchain-Knoten verfügbar sind. _Es gibt keine Geheimnisse auf der Blockchain._

### Token übertragen {#transfer-tokens}

```solidity
    /* *
     * @dev Siehe {IERC20-transfer}.
     *
     * Anforderungen:
     *
     * - `recipient` darf nicht die Nulladresse sein.
     * - der Aufrufer muss ein Guthaben von mindestens `amount` haben. */
    







    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Die Funktion `transfer` wird aufgerufen, um Token vom Konto des Senders auf ein anderes zu übertragen. Beachten Sie, dass, obwohl sie einen booleschen Wert zurückgibt, dieser Wert immer **true** ist. Wenn die Übertragung fehlschlägt, macht der Vertrag den Aufruf rückgängig (revert).

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Die Funktion `_transfer` erledigt die eigentliche Arbeit. Es ist eine private Funktion, die nur von anderen Vertragsfunktionen aufgerufen werden kann. Konventionsgemäß werden private Funktionen `_<etwas>` genannt, genau wie Zustandsvariablen.

Normalerweise verwenden wir in Solidity `msg.sender` für den Absender der Nachricht. Das bricht jedoch
[OpenGSN](http://opengsn.org/). Wenn wir etherlose Transaktionen mit unserem Token zulassen wollen, müssen wir `_msgSender()` verwenden. Es gibt `msg.sender` für normale Transaktionen zurück, aber für etherlose gibt es den ursprünglichen Unterzeichner zurück und nicht den Vertrag, der die Nachricht weitergeleitet hat.

### Freigabefunktionen {#allowance-functions}

Dies sind die Funktionen, die die Freigabefunktionalität implementieren: `allowance`, `approve`, `transferFrom` und `_approve`. Darüber hinaus geht die OpenZeppelin-Implementierung über den grundlegenden Standard hinaus und enthält einige Funktionen, die die Sicherheit verbessern: `increaseAllowance` und `decreaseAllowance`.

#### Die allowance-Funktion {#allowance}

```solidity
    /* *
     * @dev Siehe {IERC20-allowance}. */
    


    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Die Funktion `allowance` ermöglicht es jedem, jede Freigabe zu überprüfen.

#### Die approve-Funktion {#approve}

```solidity
    /* *
     * @dev Siehe {IERC20-approve}.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Nulladresse sein. */
    






    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Diese Funktion wird aufgerufen, um eine Freigabe zu erstellen. Sie ist ähnlich wie die obige `transfer`-Funktion:

- Die Funktion ruft lediglich eine interne Funktion auf (in diesem Fall `_approve`), die die eigentliche Arbeit erledigt.
- Die Funktion gibt entweder `true` zurück (wenn erfolgreich) oder macht den Aufruf rückgängig (wenn nicht).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Wir verwenden interne Funktionen, um die Anzahl der Stellen zu minimieren, an denen Zustandsänderungen auftreten. _Jede_ Funktion, die den Zustand ändert, ist ein potenzielles Sicherheitsrisiko, das auf Sicherheit geprüft werden muss. Auf diese Weise haben wir weniger Chancen, Fehler zu machen.

#### Die transferFrom-Funktion {#transferFrom}

Dies ist die Funktion, die ein Ausgebender aufruft, um eine Freigabe auszugeben. Dies erfordert zwei Operationen: den ausgegebenen Betrag übertragen und die Freigabe um diesen Betrag reduzieren.

```solidity
    /* *
     * @dev Siehe {IERC20-transferFrom}.
     *
     * Löst ein {Approval}-Ereignis aus, das den aktualisierten Freibetrag anzeigt. Dies wird vom EIP nicht verlangt. Siehe den Hinweis am Anfang von {ERC20}.
     *
     * Anforderungen:
     *
     * - `sender` und `recipient` dürfen nicht die Nulladresse sein.
     * - `sender` muss ein Guthaben von mindestens `amount` haben.
     * - der Aufrufer muss einen Freibetrag für die Token von ``sender`` von mindestens `amount` haben. */
    












    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Der Funktionsaufruf `a.sub(b, "message")` tut zwei Dinge. Erstens berechnet er `a-b`, was die neue Freigabe ist. Zweitens überprüft er, ob dieses Ergebnis nicht negativ ist. Wenn es negativ ist, wird der Aufruf mit der bereitgestellten Nachricht rückgängig gemacht. Beachten Sie, dass bei einem Revert eines Aufrufs alle zuvor während dieses Aufrufs durchgeführten Verarbeitungen ignoriert werden, sodass wir den `_transfer` nicht rückgängig machen müssen.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelin-Sicherheitserweiterungen {#openzeppelin-safety-additions}

Es ist gefährlich, eine Freigabe ungleich Null auf einen anderen Wert ungleich Null zu setzen, da Sie nur die Reihenfolge Ihrer eigenen Transaktionen kontrollieren, nicht die von jemand anderem. Stellen Sie sich vor, Sie haben zwei Benutzer, Alice, die naiv ist, und Bill, der unehrlich ist. Alice möchte eine Dienstleistung von Bill, von der sie glaubt, dass sie fünf Token kostet – also gibt sie Bill eine Freigabe von fünf Token.

Dann ändert sich etwas und Bills Preis steigt auf zehn Token. Alice, die die Dienstleistung immer noch möchte, sendet eine Transaktion, die Bills Freigabe auf zehn setzt. In dem Moment, in dem Bill diese neue Transaktion im Transaktionspool sieht, sendet er eine Transaktion, die Alices fünf Token ausgibt und einen viel höheren Gaspreis hat, damit sie schneller gemint wird. Auf diese Weise kann Bill zuerst fünf Token ausgeben und dann, sobald Alices neue Freigabe gemint ist, zehn weitere für einen Gesamtpreis von fünfzehn Token ausgeben, mehr als Alice autorisieren wollte. Diese Technik wird
[Front-Running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running) genannt.

| Alice-Transaktion | Alice-Nonce | Bill-Transaktion              | Bill-Nonce | Bills Freigabe   | Bills Gesamteinkommen von Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Um dieses Problem zu vermeiden, ermöglichen Ihnen diese beiden Funktionen (`increaseAllowance` und `decreaseAllowance`), die Freigabe um einen bestimmten Betrag zu ändern. Wenn Bill also bereits fünf Token ausgegeben hätte, könnte er nur noch fünf weitere ausgeben. Abhängig vom Timing gibt es zwei Möglichkeiten, wie dies funktionieren kann, die beide damit enden, dass Bill nur zehn Token erhält:

A:

| Alice-Transaktion          | Alice-Nonce | Bill-Transaktion             | Bill-Nonce | Bills Freigabe   | Bills Gesamteinkommen von Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Alice-Transaktion          | Alice-Nonce | Bill-Transaktion              | Bill-Nonce | Bills Freigabe   | Bills Gesamteinkommen von Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /* *
     * @dev Erhöht atomar den Freibetrag, der `spender` vom Aufrufer gewährt wird.
     *
     * Dies ist eine Alternative zu {approve}, die als Minderung für die in {IERC20-approve} beschriebenen Probleme verwendet werden kann.
     *
     * Löst ein {Approval}-Ereignis aus, das den aktualisierten Freibetrag anzeigt.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Nulladresse sein. */
    











    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Die Funktion `a.add(b)` ist eine sichere Addition. In dem unwahrscheinlichen Fall, dass `a`+`b`>=`2^256`, kommt es nicht zu einem Überlauf (Wrap-around), wie es bei einer normalen Addition der Fall ist.

```solidity

    /* *
     * @dev Verringert atomar den Freibetrag, der `spender` vom Aufrufer gewährt wird.
     *
     * Dies ist eine Alternative zu {approve}, die als Minderung für die in {IERC20-approve} beschriebenen Probleme verwendet werden kann.
     *
     * Löst ein {Approval}-Ereignis aus, das den aktualisierten Freibetrag anzeigt.
     *
     * Anforderungen:
     *
     * - `spender` darf nicht die Nulladresse sein.
     * - `spender` muss einen Freibetrag für den Aufrufer von mindestens `subtractedValue` haben. */
    













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
    /* *
     * @dev Verschiebt `amount` Token von `sender` zu `recipient`.
     *
     * Diese interne Funktion ist äquivalent zu {transfer} und kann verwendet werden, um z. B. automatische Token-Gebühren, Slashing-Mechanismen usw. zu implementieren.
     *
     * Löst ein {Transfer}-Ereignis aus.
     *
     * Anforderungen:
     *
     * - `sender` darf nicht die Nulladresse sein.
     * - `recipient` darf nicht die Nulladresse sein.
     * - `sender` muss ein Guthaben von mindestens `amount` haben. */
    













    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Diese Funktion, `_transfer`, überträgt Token von einem Konto auf ein anderes. Sie wird sowohl von
`transfer` (für Übertragungen vom eigenen Konto des Senders) als auch von `transferFrom` (für die Verwendung von Freigaben zur Übertragung vom Konto eines anderen) aufgerufen.

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Niemand besitzt tatsächlich die Adresse Null in Ethereum (das heißt, niemand kennt einen Private-Key, dessen passender Public-Key in die Null-Adresse umgewandelt wird). Wenn Leute diese Adresse verwenden, handelt es sich normalerweise um einen Softwarefehler – daher schlagen wir fehl, wenn die Null-Adresse als Sender oder Empfänger verwendet wird.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Es gibt zwei Möglichkeiten, diesen Vertrag zu nutzen:

1. Verwenden Sie ihn als Vorlage für Ihren eigenen Code
1. [Erben Sie davon](https://www.bitdegree.org/learn/solidity-inheritance) und überschreiben Sie nur die Funktionen, die Sie ändern müssen

Die zweite Methode ist viel besser, da der OpenZeppelin ERC-20-Code bereits geprüft wurde und sich als sicher erwiesen hat. Wenn Sie Vererbung verwenden, ist klar, welche Funktionen Sie ändern, und um Ihrem Vertrag zu vertrauen, müssen die Leute nur diese spezifischen Funktionen prüfen.

Es ist oft nützlich, eine Funktion jedes Mal auszuführen, wenn Token den Besitzer wechseln. `_transfer` ist jedoch eine sehr wichtige Funktion und es ist möglich, sie unsicher zu schreiben (siehe unten), daher ist es am besten, sie nicht zu überschreiben. Die Lösung ist `_beforeTokenTransfer`, eine
[Hook-Funktion](https://wikipedia.org/wiki/Hooking). Sie können diese Funktion überschreiben, und sie wird bei jeder Übertragung aufgerufen.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Dies sind die Zeilen, die die Übertragung tatsächlich durchführen. Beachten Sie, dass sich **nichts** dazwischen befindet und dass wir den übertragenen Betrag vom Sender abziehen, bevor wir ihn dem Empfänger hinzufügen. Dies ist wichtig, denn wenn es in der Mitte einen Aufruf an einen anderen Vertrag gäbe, hätte dieser verwendet werden können, um diesen Vertrag zu betrügen. Auf diese Weise ist die Übertragung atomar, in der Mitte kann nichts passieren.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Geben Sie schließlich ein `Transfer`-Ereignis aus. Ereignisse sind für Smart Contracts nicht zugänglich, aber Code, der außerhalb der Blockchain ausgeführt wird, kann auf Ereignisse lauschen und darauf reagieren. Zum Beispiel kann ein Wallet verfolgen, wann der Eigentümer mehr Token erhält.

#### Die _mint- und _burn-Funktionen {#_mint-and-_burn}

Diese beiden Funktionen (`_mint` und `_burn`) ändern das Gesamtangebot an Token.
Sie sind intern und es gibt keine Funktion, die sie in diesem Vertrag aufruft,
daher sind sie nur nützlich, wenn Sie vom Vertrag erben und Ihre eigene
Logik hinzufügen, um zu entscheiden, unter welchen Bedingungen neue Token geprägt (mint) oder bestehende
verbrannt (burn) werden sollen.

**HINWEIS:** Jeder ERC-20-Token hat seine eigene Geschäftslogik, die die Token-Verwaltung vorschreibt.
Zum Beispiel könnte ein Vertrag mit festem Angebot nur `_mint`
im Konstruktor aufrufen und niemals `_burn` aufrufen. Ein Vertrag, der Token verkauft,
wird `_mint` aufrufen, wenn er bezahlt wird, und vermutlich irgendwann `_burn` aufrufen,
um eine unkontrollierte Inflation zu vermeiden.

```solidity
    /* * @dev Erstellt `amount` Token und weist sie `account` zu, wodurch das Gesamtangebot erhöht wird.
     *
     * Löst ein {Transfer}-Ereignis aus, bei dem `from` auf die Nulladresse gesetzt ist.
     *
     * Anforderungen:
     *
     * - `to` darf nicht die Nulladresse sein. */
    








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
    /* *
     * @dev Zerstört `amount` Token von `account`, wodurch das Gesamtangebot verringert wird.
     *
     * Löst ein {Transfer}-Ereignis aus, bei dem `to` auf die Nulladresse gesetzt ist.
     *
     * Anforderungen:
     *
     * - `account` darf nicht die Nulladresse sein.
     * - `account` muss mindestens `amount` Token haben. */
    










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

Dies ist die Funktion, die tatsächlich Freigaben spezifiziert. Beachten Sie, dass sie es einem Eigentümer ermöglicht, eine Freigabe anzugeben, die höher ist als der aktuelle Kontostand des Eigentümers. Dies ist in Ordnung, da der Kontostand zum Zeitpunkt der Übertragung überprüft wird, wenn er sich von dem Kontostand bei der Erstellung der Freigabe unterscheiden könnte.

```solidity
    /* *
     * @dev Setzt `amount` als Freibetrag von `spender` über die Token des `owner`.
     *
     * Diese interne Funktion ist äquivalent zu `approve` und kann verwendet werden, um z. B. automatische Freibeträge für bestimmte Subsysteme usw. festzulegen.
     *
     * Löst ein {Approval}-Ereignis aus.
     *
     * Anforderungen:
     *
     * - `owner` darf nicht die Nulladresse sein.
     * - `spender` darf nicht die Nulladresse sein. */
    












    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Geben Sie ein `Approval`-Ereignis aus. Je nachdem, wie die Anwendung geschrieben ist, kann der Ausgeber-Vertrag entweder vom Eigentümer oder von einem Server, der auf diese Ereignisse lauscht, über die Genehmigung informiert werden.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Die Decimals-Variable ändern {#modify-the-decimals-variable}

```solidity


    /* *
     * @dev Setzt {decimals} auf einen anderen Wert als den Standardwert von 18.
     *
     * WARNUNG: Diese Funktion sollte nur vom Konstruktor aufgerufen werden. Die meisten Anwendungen, die mit Token-Verträgen interagieren, erwarten nicht, dass sich {decimals} jemals ändert, und funktionieren möglicherweise fehlerhaft, wenn dies der Fall ist. */
    






    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Diese Funktion ändert die Variable `_decimals`, die verwendet wird, um Benutzeroberflächen mitzuteilen, wie der Betrag zu interpretieren ist. Sie sollten sie aus dem Konstruktor aufrufen. Es wäre unehrlich, sie zu einem späteren Zeitpunkt aufzurufen, und Anwendungen sind nicht darauf ausgelegt, damit umzugehen.

### Hooks {#hooks}

```solidity

    /* *
     * @dev Hook, der vor jeder Übertragung von Token aufgerufen wird. Dies schließt das Prägen und Verbrennen ein.
     *
     * Aufrufbedingungen:
     *
     * - wenn `from` und `to` beide ungleich null sind, werden `amount` Token von ``from`` an `to` übertragen.
     * - wenn `from` null ist, werden `amount` Token für `to` geprägt.
     * - wenn `to` null ist, werden `amount` Token von ``from`` verbrannt.
     * - `from` und `to` sind niemals beide null.
     *
     * Um mehr über Hooks zu erfahren, gehen Sie zu xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]. */
    













    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Dies ist die Hook-Funktion, die während Übertragungen aufgerufen werden soll. Sie ist hier leer, aber wenn Sie möchten, dass sie etwas tut, überschreiben Sie sie einfach.

## Fazit {#conclusion}

Zur Wiederholung sind hier einige der wichtigsten Ideen in diesem Vertrag (meiner Meinung nach, Ihre wird wahrscheinlich abweichen):

- _Es gibt keine Geheimnisse auf der Blockchain_. Jede Information, auf die ein Smart Contract zugreifen kann, ist für die ganze Welt verfügbar.
- Sie können die Reihenfolge Ihrer eigenen Transaktionen kontrollieren, aber nicht, wann die Transaktionen anderer Personen stattfinden. Dies ist der Grund, warum das Ändern einer Freigabe gefährlich sein kann, da es dem Ausgebenden ermöglicht, die Summe beider Freigaben auszugeben.
- Werte vom Typ `uint256` laufen über (Wrap-around). Mit anderen Worten, _0-1=2^256-1_. Wenn das kein gewünschtes Verhalten ist, müssen Sie dies überprüfen (oder die SafeMath-Bibliothek verwenden, die das für Sie erledigt). Beachten Sie, dass sich dies in
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) geändert hat.
- Führen Sie alle Zustandsänderungen eines bestimmten Typs an einem bestimmten Ort durch, da dies die Prüfung (Auditing) erleichtert.
  Dies ist der Grund, warum wir zum Beispiel `_approve` haben, das von `approve`, `transferFrom`,
  `increaseAllowance` und `decreaseAllowance` aufgerufen wird.
- Zustandsänderungen sollten atomar sein, ohne eine andere Aktion in ihrer Mitte (wie Sie
  in `_transfer` sehen können). Dies liegt daran, dass Sie während der Zustandsänderung einen inkonsistenten Zustand haben. Zum Beispiel existieren zwischen dem Zeitpunkt, an dem Sie vom Kontostand des Senders abziehen, und dem Zeitpunkt, an dem Sie dem Kontostand des Empfängers hinzufügen, weniger Token, als es geben sollte. Dies könnte potenziell missbraucht werden, wenn es dazwischen Operationen gibt, insbesondere Aufrufe an einen anderen Vertrag.

Jetzt, da Sie gesehen haben, wie der OpenZeppelin ERC-20-Vertrag geschrieben ist und insbesondere, wie er sicherer gemacht wird, gehen Sie und schreiben Sie Ihre eigenen sicheren Verträge und Anwendungen.

[Sehen Sie hier für mehr von meiner Arbeit](https://cryptodocguy.pro/).