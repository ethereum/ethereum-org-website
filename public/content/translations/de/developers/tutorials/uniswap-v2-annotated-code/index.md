---
title: "Uniswap-v2-Vertrag Walk-Through"
description: Wie funktioniert der Uniswap-v2-Vertrag? Warum ist er so geschrieben?
author: Ori Pomerantz
tags: [ "solidity" ]
skill: intermediate
published: 2021-05-01
lang: de
---

## Einführung {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) kann einen Tauschmarkt zwischen zwei beliebigen ERC-20-Tokens erstellen. In diesem Artikel werden wir den Quellcode für die Verträge durchgehen, die dieses Protokoll implementieren, und sehen, warum sie auf diese Weise geschrieben sind.

### Was macht Uniswap? {#what-does-uniswap-do}

Im Grunde gibt es zwei Arten von Nutzern: Liquiditätsanbieter und Händler.

Die _Liquiditätsanbieter_ versorgen den Pool mit den beiden Tokens, die getauscht werden können (wir nennen sie **Token0** und **Token1**). Im Gegenzug erhalten sie einen dritten Token, der einen Teil des Eigentums am Pool darstellt und als _Liquiditäts-Token_ bezeichnet wird.

_Händler_ senden eine Art von Token in den Pool und erhalten die andere (z. B. **Token0** senden und **Token1** erhalten) aus dem Pool, der von den Liquiditätsanbietern bereitgestellt wird. Der Wechselkurs wird durch die relative Anzahl von **Token0**s und **Token1**s bestimmt, die der Pool besitzt. Zusätzlich nimmt der Pool einen kleinen Prozentsatz als Belohnung für den Liquiditätspool.

Wenn Liquiditätsanbieter ihre Vermögenswerte zurückhaben möchten, können sie die Pool-Tokens verbrennen und ihre Tokens zurückerhalten, einschließlich ihres Anteils an den Belohnungen.

[Klicken Sie hier für eine ausführlichere Beschreibung](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Warum v2? Warum nicht v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) ist ein Upgrade, das viel komplizierter ist als v2. Es ist einfacher, zuerst v2 zu lernen und dann zu v3 überzugehen.

### Kernverträge vs. Peripherieverträge {#contract-types}

Uniswap v2 ist in zwei Komponenten unterteilt, einen Kern und eine Peripherie. Diese Aufteilung ermöglicht es, dass die Kernverträge, die die Vermögenswerte halten und daher sicher sein _müssen_, einfacher und leichter zu prüfen sind. Alle zusätzlichen Funktionalitäten, die von Händlern benötigt werden, können dann durch Peripherieverträge bereitgestellt werden.

## Daten- und Kontrollflüsse {#flows}

Dies ist der Daten- und Kontrollfluss, der stattfindet, wenn Sie die drei Hauptaktionen von Uniswap ausführen:

1. Tausch zwischen verschiedenen Tokens
2. Liquidität zum Markt hinzufügen und mit ERC-20-Liquiditäts-Tokens des Tauschpaares belohnt werden
3. ERC-20-Liquiditäts-Tokens verbrennen und die ERC-20-Tokens zurückerhalten, die das Tauschpaar Händlern zum Tauschen anbietet

### Tausch {#swap-flow}

Dies ist der häufigste Ablauf, der von Händlern verwendet wird:

#### Aufrufer {#caller}

1. Gewähren Sie dem Peripherie-Konto eine Freigabe (Allowance) in der Höhe des zu tauschenden Betrags.
2. Rufen Sie eine der vielen Tausch-Funktionen des Peripherie-Vertrags auf (welche davon abhängt, ob ETH beteiligt ist oder nicht, ob der Händler die Menge der zu hinterlegenden Tokens oder die Menge der zurückzuerhaltenden Tokens angibt, usw.).
   Jede Tausch-Funktion akzeptiert einen `path` (Pfad), ein Array von Börsen, die durchlaufen werden sollen.

#### Im Peripherie-Vertrag (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifizieren Sie die Beträge, die auf jeder Börse entlang des Pfades gehandelt werden müssen.
4. Iteriert über den Pfad. Für jede Börse auf dem Weg sendet es den Input-Token und ruft dann die `swap`-Funktion der Börse auf.
   In den meisten Fällen ist die Zieladresse für die Tokens die nächste Tauschbörse im Pfad. Bei der letzten Börse ist es die vom Händler angegebene Adresse.

#### Im Kernvertrag (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. Überprüfen Sie, ob der Kernvertrag nicht betrogen wird und nach dem Tausch eine ausreichende Liquidität aufrechterhalten kann.

6. Sehen Sie, wie viele zusätzliche Tokens wir zusätzlich zu den bekannten Reserven haben. Dieser Betrag ist die Anzahl der Input-Tokens, die wir zum Tausch erhalten haben.
7. Senden Sie die Output-Tokens an das Ziel.
8. Rufen Sie `_update` auf, um die Reservebeträge zu aktualisieren

#### Zurück im Peripherie-Vertrag (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Führen Sie alle notwendigen Bereinigungen durch (z. B. WETH-Tokens verbrennen, um ETH zurückzuerhalten und an den Händler zu senden)

### Liquidität hinzufügen {#add-liquidity-flow}

#### Aufrufer {#caller-2}

1. Gewähren Sie dem Peripherie-Konto eine Freigabe (Allowance) in der Höhe der Beträge, die dem Liquiditätspool hinzugefügt werden sollen.
2. Rufen Sie eine der `addLiquidity`-Funktionen des Peripherie-Vertrags auf.

#### Im Peripherie-Vertrag (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Erstellen Sie bei Bedarf ein neues Tauschpaar
4. Wenn ein bestehendes Tauschpaar vorhanden ist, berechnen Sie die Menge der hinzuzufügenden Tokens. Dies soll für beide Tokens ein identischer Wert sein, also das gleiche Verhältnis von neuen zu bestehenden Tokens.
5. Überprüfen Sie, ob die Beträge akzeptabel sind (Aufrufer können einen Mindestbetrag angeben, unter dem sie lieber keine Liquidität hinzufügen möchten)
6. Rufen Sie den Kernvertrag auf.

#### Im Kernvertrag (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Prägen Sie Liquiditäts-Tokens und senden Sie sie an den Aufrufer
8. Rufen Sie `_update` auf, um die Reservebeträge zu aktualisieren

### Liquidität entfernen {#remove-liquidity-flow}

#### Aufrufer {#caller-3}

1. Gewähren Sie dem Peripherie-Konto eine Freigabe (Allowance) von Liquiditäts-Tokens, die im Austausch für die zugrunde liegenden Tokens verbrannt werden sollen.
2. Rufen Sie eine der `removeLiquidity`-Funktionen des Peripherie-Vertrags auf.

#### Im Peripherie-Vertrag (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Senden Sie die Liquiditäts-Tokens an das Tauschpaar

#### Im Kernvertrag (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Senden Sie der Zieladresse die zugrunde liegenden Tokens im Verhältnis zu den verbrannten Tokens. Wenn sich beispielsweise 1000 A-Tokens, 500 B-Tokens und 90 Liquiditäts-Tokens im Pool befinden und wir 9 Tokens zum Verbrennen erhalten, verbrennen wir 10 % der Liquiditäts-Tokens und senden dem Nutzer 100 A-Tokens und 50 B-Tokens zurück.
5. Verbrennen Sie die Liquiditäts-Tokens
6. Rufen Sie `_update` auf, um die Reservebeträge zu aktualisieren

## Die Kernverträge {#core-contracts}

Dies sind die sicheren Verträge, die die Liquidität halten.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Dieser Vertrag](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementiert den eigentlichen Pool, der Tokens tauscht. Dies ist die Kernfunktionalität von Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Dies sind alle Schnittstellen, die der Vertrag kennen muss, entweder weil der Vertrag sie implementiert (`IUniswapV2Pair` und `UniswapV2ERC20`) oder weil er Verträge aufruft, die sie implementieren.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Dieser Vertrag erbt von `UniswapV2ERC20`, das die ERC-20-Funktionen für die Liquiditäts-Tokens bereitstellt.

```solidity
    using SafeMath  for uint;
```

Die [SafeMath-Bibliothek](https://docs.openzeppelin.com/contracts/2.x/api/math) wird verwendet, um Über- und Unterläufe zu vermeiden. Das ist wichtig, weil wir sonst in eine Situation geraten könnten, in der ein Wert `-1` sein sollte, stattdessen aber `2^256-1` ist.

```solidity
    using UQ112x112 for uint224;
```

Viele Berechnungen im Pool-Vertrag erfordern Brüche. Brüche werden jedoch von der EVM nicht unterstützt.
Die Lösung, die Uniswap gefunden hat, besteht darin, 224-Bit-Werte zu verwenden, mit 112 Bits für den ganzzahligen Teil und 112 Bits für den Bruchteil. So wird `1.0` als `2^112`, `1.5` als `2^112 + 2^111` dargestellt, usw.

Weitere Details zu dieser Bibliothek finden Sie [weiter unten im Dokument](#FixedPoint).

#### Variablen {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Um eine Division durch Null zu vermeiden, gibt es eine Mindestanzahl von Liquiditäts-Tokens, die immer existieren (aber dem Konto Null gehören). Diese Zahl ist **MINIMUM_LIQUIDITY**, eintausend.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Dies ist der ABI-Selektor für die ERC-20-Transferfunktion. Er wird verwendet, um ERC-20-Tokens in den beiden Token-Konten zu transferieren.

```solidity
    address public factory;
```

Dies ist der Factory-Vertrag, der diesen Pool erstellt hat. Jeder Pool ist ein Tausch zwischen zwei ERC-20-Tokens, die Factory ist ein zentraler Punkt, der all diese Pools verbindet.

```solidity
    address public token0;
    address public token1;
```

Dies sind die Adressen der Verträge für die beiden Arten von ERC-20-Tokens, die von diesem Pool getauscht werden können.

```solidity
    uint112 private reserve0;           // verwendet einen einzelnen Speicher-Slot, zugänglich über getReserves
    uint112 private reserve1;           // verwendet einen einzelnen Speicher-Slot, zugänglich über getReserves
```

Die Reserven, die der Pool für jeden Token-Typ hat. Wir gehen davon aus, dass die beiden den gleichen Wert repräsentieren und daher jeder Token0 den Wert von reserve1/reserve0 Token1s hat.

```solidity
    uint32  private blockTimestampLast; // verwendet einen einzelnen Speicher-Slot, zugänglich über getReserves
```

Der Zeitstempel für den letzten Block, in dem ein Tausch stattfand, wird verwendet, um die Wechselkurse über die Zeit zu verfolgen.

Eine der größten Gas-Ausgaben von Ethereum-Verträgen ist der Speicher (Storage), der von einem Aufruf des Vertrags zum nächsten bestehen bleibt. Jede Speicherzelle ist 256 Bit lang. Daher werden drei Variablen, `reserve0`, `reserve1` und `blockTimestampLast`, so zugewiesen, dass ein einziger Speicherwert alle drei enthalten kann (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Diese Variablen halten die kumulativen Kosten für jeden Token (jeweils im Verhältnis zum anderen). Sie können verwendet werden, um den durchschnittlichen Wechselkurs über einen bestimmten Zeitraum zu berechnen.

```solidity
    uint public kLast; // reserve0 * reserve1, unmittelbar nach dem letzten Liquiditätsereignis
```

Die Art und Weise, wie das Tauschpaar den Wechselkurs zwischen Token0 und Token1 festlegt, besteht darin, das Vielfache der beiden Reserven während der Handelstransaktionen konstant zu halten. `kLast` ist dieser Wert. Er ändert sich, wenn ein Liquiditätsanbieter Tokens ein- oder auszahlt, und er steigt aufgrund der Marktgebühr von 0,3 % leicht an.

Hier ist ein einfaches Beispiel. Beachten Sie, dass die Tabelle der Einfachheit halber nur drei Ziffern nach dem Komma hat und wir die Handelsgebühr von 0,3 % ignorieren, sodass die Zahlen nicht genau sind.

| Ereignis                                         |                  reserve0 |                  reserve1 |                      reserve0 \* reserve1 | Durchschnittlicher Wechselkurs (Token1 / Token0) |
| ------------------------------------------------ | ------------------------: | ------------------------: | ----------------------------------------: | ------------------------------------------------------------------- |
| Ersteinrichtung                                  | 1.000,000 | 1.000,000 | 1.000.000 |                                                                     |
| Händler A tauscht 50 Token0 gegen 47,619 Token1  | 1.050,000 |                   952,381 | 1.000.000 | 0,952                                                               |
| Händler B tauscht 10 Token0 gegen 8,984 Token1   | 1.060,000 |                   943,396 | 1.000.000 | 0,898                                                               |
| Händler C tauscht 40 Token0 gegen 34,305 Token1  | 1.100,000 |                   909,090 | 1.000.000 | 0,858                                                               |
| Händler D tauscht 100 Token1 gegen 109,01 Token0 |                   990,990 | 1.009,090 | 1.000.000 | 0,917                                                               |
| Händler E tauscht 10 Token0 gegen 10,079 Token1  | 1.000,990 |                   999,010 | 1.000.000 | 1,008                                                               |

Wenn Händler mehr von Token0 bereitstellen, steigt der relative Wert von Token1 und umgekehrt, basierend auf Angebot und Nachfrage.

#### Sperre (Lock) {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Es gibt eine Klasse von Sicherheitsschwachstellen, die auf [Reentrancy-Missbrauch](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) basieren. Uniswap muss beliebige ERC-20-Tokens transferieren, was bedeutet, dass ERC-20-Verträge aufgerufen werden, die versuchen könnten, den Uniswap-Markt, der sie aufruft, zu missbrauchen.
Indem wir eine `unlocked`-Variable als Teil des Vertrags haben, können wir verhindern, dass Funktionen aufgerufen werden, während sie laufen (innerhalb derselben Transaktion).

```solidity
    modifier lock() {
```

Diese Funktion ist ein [Modifier](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), eine Funktion, die eine normale Funktion umschließt, um ihr Verhalten in gewisser Weise zu ändern.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Wenn `unlocked` gleich eins ist, setzen Sie es auf null. Wenn es bereits null ist, wird der Aufruf zurückgesetzt (revert), was zu einem Fehlschlag führt.

```solidity
        _;
```

In einem Modifier ist `_;` der ursprüngliche Funktionsaufruf (mit allen Parametern). Hier bedeutet es, dass der Funktionsaufruf nur stattfindet, wenn `unlocked` beim Aufruf eins war, und während er läuft, ist der Wert von `unlocked` null.

```solidity
        unlocked = 1;
    }
```

Nachdem die Hauptfunktion zurückkehrt, geben Sie die Sperre frei.

#### Sonstiges Funktionen {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Diese Funktion versorgt Aufrufer mit dem aktuellen Zustand der Börse. Beachten Sie, dass Solidity-Funktionen [mehrere Werte zurückgeben können](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Diese interne Funktion transferiert einen Betrag von ERC20-Tokens von der Börse an jemand anderen. `SELECTOR` gibt an, dass die Funktion, die wir aufrufen, `transfer(address,uint)` ist (siehe Definition oben).

Um den Import einer Schnittstelle für die Token-Funktion zu vermeiden, erstellen wir den Aufruf „manuell“ mit einer der [ABI-Funktionen](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Es gibt zwei Möglichkeiten, wie ein ERC-20-Transferaufruf einen Fehler melden kann:

1. Zurücksetzen (Revert). Wenn ein Aufruf eines externen Vertrags zurückgesetzt wird, ist der boolesche Rückgabewert `false`
2. Normal beenden, aber einen Fehler melden. In diesem Fall hat der Rückgabewertpuffer eine Länge ungleich Null, und wenn er als boolescher Wert dekodiert wird, ist er `false`

Wenn eine dieser Bedingungen eintritt, wird die Transaktion zurückgesetzt.

#### Ereignisse {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Diese beiden Ereignisse werden ausgelöst, wenn ein Liquiditätsanbieter entweder Liquidität einzahlt (`Mint`) oder abhebt (`Burn`). In beiden Fällen sind die Beträge von Token0 und Token1, die eingezahlt oder abgehoben werden, Teil des Ereignisses, ebenso wie die Identität des Kontos, das uns aufgerufen hat (`sender`). Im Falle einer Auszahlung enthält das Ereignis auch das Ziel, das die Tokens erhalten hat (`to`), das nicht mit dem Absender identisch sein muss.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Dieses Ereignis wird ausgelöst, wenn ein Händler einen Token gegen einen anderen tauscht. Auch hier müssen Absender und Ziel nicht identisch sein.
Jeder Token kann entweder an die Börse gesendet oder von ihr empfangen werden.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Schließlich wird `Sync` jedes Mal ausgelöst, wenn Tokens hinzugefügt oder abgehoben werden, unabhängig vom Grund, um die neuesten Reserveinformationen (und damit den Wechselkurs) bereitzustellen.

#### Einrichtungsfunktionen {#pair-setup}

Diese Funktionen sollen einmalig aufgerufen werden, wenn das neue Tauschpaar eingerichtet wird.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Der Konstruktor stellt sicher, dass wir die Adresse der Factory, die das Paar erstellt hat, verfolgen. Diese Information ist für `initialize` und für die Factory-Gebühr (falls vorhanden) erforderlich

```solidity
    // wird einmal von der Factory zum Zeitpunkt der Bereitstellung aufgerufen
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // ausreichende Prüfung
        token0 = _token0;
        token1 = _token1;
    }
```

Diese Funktion ermöglicht es der Factory (und nur der Factory), die beiden ERC-20-Tokens anzugeben, die dieses Paar tauschen wird.

#### Interne Aktualisierungsfunktionen {#pair-update-internal}

##### \_update

```solidity
    // aktualisiert Reserven und, beim ersten Aufruf pro Block, Preisakkumulatoren
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Diese Funktion wird jedes Mal aufgerufen, wenn Tokens eingezahlt oder abgehoben werden.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Wenn entweder balance0 oder balance1 (uint256) höher als uint112(-1) (=2^112-1) ist (also bei der Konvertierung in uint112 überläuft und auf 0 zurückspringt), wird das \_update verweigert, um Überläufe zu verhindern. Bei einem normalen Token, der in 10^18 Einheiten unterteilt werden kann, bedeutet dies, dass jeder Tausch auf etwa 5,1\*10^15 jedes Tokens beschränkt ist. Bisher war das kein Problem.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // Überlauf ist erwünscht
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Wenn die verstrichene Zeit nicht Null ist, bedeutet dies, dass wir die erste Tauschtransaktion in diesem Block sind. In diesem Fall müssen wir die Kostenakkumulatoren aktualisieren.

```solidity
            // * führt nie zu einem Überlauf, und + Überlauf ist erwünscht
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Jeder Kostenakkumulator wird mit den neuesten Kosten (Reserve des anderen Tokens/Reserve dieses Tokens) multipliziert mit der verstrichenen Zeit in Sekunden aktualisiert. Um einen Durchschnittspreis zu erhalten, liest man den kumulativen Preis zu zwei Zeitpunkten und dividiert durch die Zeitdifferenz zwischen ihnen. Angenommen, es kommt zu folgender Abfolge von Ereignissen:

| Ereignis                                                       |                  reserve0 |                  reserve1 | Zeitstempel           | Marginaler Wechselkurs (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------------- | ------------------------: | ------------------------: | --------------------- | --------------------------------------------------------------: | -------------------------: |
| Ersteinrichtung                                                | 1.000,000 | 1.000,000 | 5.000 |                                                           1,000 |                          0 |
| Händler A zahlt 50 Token0 ein und erhält 47,619 Token1 zurück  | 1.050,000 |                   952,381 | 5.020 |                                                           0,907 |                         20 |
| Händler B zahlt 10 Token0 ein und erhält 8,984 Token1 zurück   | 1.060,000 |                   943,396 | 5.030 |                                                           0,890 |       20+10\*0,907 = 29,07 |
| Händler C zahlt 40 Token0 ein und erhält 34,305 Token1 zurück  | 1.100,000 |                   909,090 | 5.100 |                                                           0,826 |    29,07+70\*0,890 = 91,37 |
| Händler D zahlt 100 Token1 ein und erhält 109,01 Token0 zurück |                   990,990 | 1.009,090 | 5.110 |                                                           1,018 |    91,37+10\*0,826 = 99,63 |
| Händler E zahlt 10 Token0 ein und erhält 10,079 Token1 zurück  | 1.000,990 |                   999,010 | 5.150 |                                                           0,998 | 99,63+40\*1,1018 = 143,702 |

Nehmen wir an, wir möchten den Durchschnittspreis von **Token0** zwischen den Zeitstempeln 5.030 und 5.150 berechnen. Die Differenz im Wert von `price0Cumulative` beträgt 143,702-29,07=114,632. Dies ist der Durchschnitt über zwei Minuten (120 Sekunden). Der Durchschnittspreis beträgt also 114,632/120 = 0,955.

Diese Preisberechnung ist der Grund, warum wir die alten Reservegrößen kennen müssen.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Aktualisieren Sie abschließend die globalen Variablen und geben Sie ein `Sync`-Ereignis aus.

##### \_mintFee

```solidity
    // wenn die Gebühr aktiviert ist, prägen Sie eine Liquidität, die 1/6 des Wachstums von sqrt(k) entspricht
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

In Uniswap 2.0 zahlen Händler eine Gebühr von 0,30 %, um den Markt zu nutzen. Der größte Teil dieser Gebühr (0,25 % des Handels) geht immer an die Liquiditätsanbieter. Die restlichen 0,05 % können entweder an die Liquiditätsanbieter oder an eine von der Factory angegebene Adresse als Protokollgebühr gehen, die Uniswap für ihren Entwicklungsaufwand bezahlt.

Um Berechnungen (und damit Gaskosten) zu reduzieren, wird diese Gebühr nur berechnet, wenn Liquidität in den Pool eingezahlt oder aus ihm entfernt wird, anstatt bei jeder Transaktion.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Lesen Sie das Gebührenziel der Factory. Wenn es Null ist, gibt es keine Protokollgebühr und keine Notwendigkeit, diese Gebühr zu berechnen.

```solidity
        uint _kLast = kLast; // Gaseinsparungen
```

Die Zustandsvariable `kLast` befindet sich im Speicher, sodass sie zwischen verschiedenen Aufrufen des Vertrags einen Wert hat.
Der Zugriff auf den Speicher ist viel teurer als der Zugriff auf den flüchtigen Speicher, der freigegeben wird, wenn der Funktionsaufruf an den Vertrag endet, also verwenden wir eine interne Variable, um Gas zu sparen.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Die Liquiditätsanbieter erhalten ihren Anteil einfach durch die Wertsteigerung ihrer Liquiditäts-Tokens. Aber die Protokollgebühr erfordert, dass neue Liquiditäts-Tokens geprägt und der `feeTo`-Adresse zur Verfügung gestellt werden.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Wenn es neue Liquidität gibt, auf die eine Protokollgebühr erhoben werden kann. Sie können die Quadratwurzelfunktion [später in diesem Artikel](#Math) sehen

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Diese komplizierte Berechnung der Gebühren wird im [Whitepaper](https://app.uniswap.org/whitepaper.pdf) auf Seite 5 erklärt. Wir wissen, dass zwischen dem Zeitpunkt, an dem `kLast` berechnet wurde, und der Gegenwart keine Liquidität hinzugefügt oder entfernt wurde (da wir diese Berechnung bei jeder Hinzufügung oder Entfernung von Liquidität durchführen, bevor sie sich tatsächlich ändert), sodass jede Änderung in `reserve0 * reserve1` von Transaktionsgebühren stammen muss (ohne sie würden wir `reserve0 * reserve1` konstant halten).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Verwenden Sie die Funktion `UniswapV2ERC20._mint`, um tatsächlich die zusätzlichen Liquiditäts-Tokens zu erstellen und sie `feeTo` zuzuweisen.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Wenn keine Gebühr festgelegt ist, setzen Sie `kLast` auf Null (falls es das nicht schon ist). Als dieser Vertrag geschrieben wurde, gab es eine [Gas-Rückerstattungsfunktion](https://eips.ethereum.org/EIPS/eip-3298), die Verträge dazu anregte, die Gesamtgröße des Ethereum-Zustands zu reduzieren, indem sie Speicher, den sie nicht benötigten, auf Null setzten.
Dieser Code erhält diese Rückerstattung, wenn möglich.

#### Extern zugängliche Funktionen {#pair-external}

Beachten Sie, dass, obwohl jede Transaktion oder jeder Vertrag diese Funktionen aufrufen _kann_, sie dafür konzipiert sind, vom Peripherie-Vertrag aufgerufen zu werden. Wenn Sie sie direkt aufrufen, können Sie das Tauschpaar nicht betrügen, aber Sie könnten durch einen Fehler an Wert verlieren.

##### Prägen (mint)

```solidity
    // diese Low-Level-Funktion sollte von einem Vertrag aufgerufen werden, der wichtige Sicherheitsprüfungen durchführt
    function mint(address to) external lock returns (uint liquidity) {
```

Diese Funktion wird aufgerufen, wenn ein Liquiditätsanbieter dem Pool Liquidität hinzufügt. Sie prägt zusätzliche Liquiditäts-Tokens als Belohnung. Sie sollte von [einem Peripherie-Vertrag](#UniswapV2Router02) aufgerufen werden, der sie aufruft, nachdem er die Liquidität in derselben Transaktion hinzugefügt hat (damit niemand anderes eine Transaktion einreichen kann, die die neue Liquidität vor dem rechtmäßigen Eigentümer beansprucht).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaseinsparungen
```

Dies ist die Art und Weise, die Ergebnisse einer Solidity-Funktion zu lesen, die mehrere Werte zurückgibt. Wir verwerfen die letzten zurückgegebenen Werte, den Block-Zeitstempel, weil wir ihn nicht benötigen.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Holen Sie sich die aktuellen Guthaben und sehen Sie, wie viel von jedem Token-Typ hinzugefügt wurde.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Berechnen Sie die zu erhebenden Protokollgebühren, falls vorhanden, und prägen Sie die Liquiditäts-Tokens entsprechend. Da die Parameter für `_mintFee` die alten Reservewerte sind, wird die Gebühr genau basierend auf Pooländerungen aufgrund von Gebühren berechnet.

```solidity
        uint _totalSupply = totalSupply; // Gaseinsparungen, muss hier definiert werden, da totalSupply in _mintFee aktualisiert werden kann
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // die ersten MINIMUM_LIQUIDITY-Tokens dauerhaft sperren
```

Wenn dies die erste Einzahlung ist, erstellen Sie `MINIMUM_LIQUIDITY` Tokens und senden Sie sie an Adresse Null, um sie zu sperren. Sie können niemals eingelöst werden, was bedeutet, dass der Pool niemals vollständig geleert wird (dies bewahrt uns an einigen Stellen vor einer Division durch Null). Der Wert von `MINIMUM_LIQUIDITY` ist eintausend, was, wenn man bedenkt, dass die meisten ERC-20-Tokens in Einheiten von 10^-18 eines Tokens unterteilt sind, so wie ETH in Wei unterteilt ist, 10^-15 des Wertes eines einzelnen Tokens entspricht. Keine hohen Kosten.

Zum Zeitpunkt der ersten Einzahlung kennen wir den relativen Wert der beiden Tokens nicht, also multiplizieren wir einfach die Beträge und ziehen eine Quadratwurzel, wobei wir davon ausgehen, dass die Einzahlung uns den gleichen Wert in beiden Tokens liefert.

Wir können dem vertrauen, denn es liegt im Interesse des Einzahlers, den gleichen Wert bereitzustellen, um einen Wertverlust durch Arbitrage zu vermeiden.
Nehmen wir an, der Wert der beiden Tokens ist identisch, aber unser Einzahler hat viermal so viele **Token1** wie **Token0** eingezahlt. Ein Händler kann die Tatsache ausnutzen, dass das Tauschpaar denkt, dass **Token0** wertvoller ist, um daraus einen Wert zu ziehen.

| Ereignis                                                           | reserve0 | reserve1 | reserve0 \* reserve1 | Wert des Pools (reserve0 + reserve1) |
| ------------------------------------------------------------------ | -------: | -------: | -------------------: | ------------------------------------------------------: |
| Ersteinrichtung                                                    |        8 |       32 |                  256 |                                                      40 |
| Händler zahlt 8 **Token0**-Tokens ein, erhält 16 **Token1** zurück |       16 |       16 |                  256 |                                                      32 |

Wie Sie sehen können, hat der Händler zusätzliche 8 Tokens verdient, die aus einer Wertminderung des Pools stammen, was dem Einzahler schadet, dem er gehört.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Bei jeder nachfolgenden Einzahlung kennen wir bereits den Wechselkurs zwischen den beiden Vermögenswerten und erwarten, dass die Liquiditätsanbieter in beiden den gleichen Wert bereitstellen. Wenn sie dies nicht tun, geben wir ihnen Liquiditäts-Tokens basierend auf dem geringeren Wert, den sie als Strafe bereitgestellt haben.

Unabhängig davon, ob es sich um die erste oder eine nachfolgende Einzahlung handelt, ist die Anzahl der von uns bereitgestellten Liquiditäts-Tokens gleich der Quadratwurzel der Änderung von `reserve0*reserve1`, und der Wert des Liquiditäts-Tokens ändert sich nicht (es sei denn, wir erhalten eine Einzahlung, die nicht den gleichen Wert beider Typen hat, in welchem Fall die „Strafe“ verteilt wird). Hier ist ein weiteres Beispiel mit zwei Tokens, die den gleichen Wert haben, mit drei guten Einzahlungen und einer schlechten (Einzahlung nur eines Token-Typs, sodass keine Liquiditäts-Tokens erzeugt werden).

| Ereignis                     |                reserve0 |                reserve1 | reserve0 \* reserve1 | Poolwert (reserve0 + reserve1) | Für diese Einzahlung geprägte Liquiditäts-Tokens | Gesamte Liquiditäts-Tokens | Wert jedes Liquiditäts-Tokens |
| ---------------------------- | ----------------------: | ----------------------: | -------------------: | ------------------------------------------------: | -----------------------------------------------: | -------------------------: | ----------------------------: |
| Ersteinrichtung              |                   8,000 |                   8,000 |                   64 |                                            16,000 |                                                8 |                          8 |                         2,000 |
| Zahle vier von jedem Typ ein |                  12,000 |                  12,000 |                  144 |                                            24,000 |                                                4 |                         12 |                         2,000 |
| Zahle zwei von jedem Typ ein |                  14,000 |                  14,000 |                  196 |                                            28,000 |                                                2 |                         14 |                         2,000 |
| Ungleiche Werteinlage        |                  18,000 |                  14,000 |                  252 |                                            32,000 |                                                0 |                         14 |        ~2,286 |
| Nach Arbitrage               | ~15,874 | ~15,874 |                  252 |                           ~31,748 |                                                0 |                         14 |        ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Verwenden Sie die Funktion `UniswapV2ERC20._mint`, um tatsächlich die zusätzlichen Liquiditäts-Tokens zu erstellen und sie dem richtigen Konto zuzuordnen.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 und reserve1 sind auf dem neuesten Stand
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aktualisieren Sie die Zustandsvariablen (`reserve0`, `reserve1` und bei Bedarf `kLast`) und geben Sie das entsprechende Ereignis aus.

##### Verbrennen (burn)

```solidity
    // diese Low-Level-Funktion sollte von einem Vertrag aufgerufen werden, der wichtige Sicherheitsprüfungen durchführt
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Diese Funktion wird aufgerufen, wenn Liquidität abgehoben wird und die entsprechenden Liquiditäts-Tokens verbrannt werden müssen.
Sie sollte auch [von einem Peripherie-Konto](#UniswapV2Router02) aufgerufen werden.

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaseinsparungen
        address _token0 = token0;                                // Gaseinsparungen
        address _token1 = token1;                                // Gaseinsparungen
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Der Peripherie-Vertrag hat die zu verbrennende Liquidität vor dem Aufruf an diesen Vertrag transferiert. So wissen wir, wie viel Liquidität wir verbrennen müssen, und wir können sicherstellen, dass sie verbrannt wird.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // Gaseinsparungen, muss hier definiert werden, da totalSupply in _mintFee aktualisiert werden kann
        amount0 = liquidity.mul(balance0) / _totalSupply; // die Verwendung von Guthaben stellt eine anteilige Verteilung sicher
        amount1 = liquidity.mul(balance1) / _totalSupply; // die Verwendung von Guthaben stellt eine anteilige Verteilung sicher
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Der Liquiditätsanbieter erhält den gleichen Wert beider Tokens. Auf diese Weise ändern wir den Wechselkurs nicht.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 und reserve1 sind auf dem neuesten Stand
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Der Rest der `burn`-Funktion ist das Spiegelbild der oben genannten `mint`-Funktion.

##### tauschen

```solidity
    // diese Low-Level-Funktion sollte von einem Vertrag aufgerufen werden, der wichtige Sicherheitsprüfungen durchführt
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Diese Funktion soll auch von [einem Peripherie-Vertrag](#UniswapV2Router02) aufgerufen werden.

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaseinsparungen
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // Geltungsbereich für _token{0,1}, vermeidet „stack too deep“-Fehler
```

Lokale Variablen können entweder im Speicher oder, wenn es nicht zu viele sind, direkt auf dem Stack gespeichert werden.
Wenn wir die Anzahl so begrenzen können, dass wir den Stack verwenden, verbrauchen wir weniger Gas. Weitere Details finden Sie im [Yellow Paper, den formalen Ethereum-Spezifikationen](https://ethereum.github.io/yellowpaper/paper.pdf), S. 26, Gleichung 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // Tokens optimistisch transferieren
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // Tokens optimistisch transferieren
```

Dieser Transfer ist optimistisch, da wir transferieren, bevor wir sicher sind, dass alle Bedingungen erfüllt sind. Dies ist in Ethereum in Ordnung, denn wenn die Bedingungen später im Aufruf nicht erfüllt werden, kehren wir daraus und allen von ihm erstellten Änderungen zurück.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informieren Sie den Empfänger auf Wunsch über den Tausch.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Holen Sie sich die aktuellen Guthaben. Der Peripherie-Vertrag sendet uns die Tokens, bevor er uns zum Tausch aufruft. Dies macht es dem Vertrag leicht zu überprüfen, dass er nicht betrogen wird, eine Überprüfung, die im Kernvertrag stattfinden _muss_ (da wir von anderen Entitäten als unserem Peripherie-Vertrag aufgerufen werden können).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // Geltungsbereich für reserve{0,1}Adjusted, vermeidet „stack too deep“-Fehler
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Dies ist eine Plausibilitätsprüfung, um sicherzustellen, dass wir durch den Tausch keinen Verlust machen. Unter keinen Umständen sollte ein Tausch `reserve0*reserve1` verringern. Hier stellen wir auch sicher, dass eine Gebühr von 0,3 % auf den Tausch erhoben wird; bevor wir den Wert von K überprüfen, multiplizieren wir beide Guthaben mit 1000, subtrahiert um die mit 3 multiplizierten Beträge. Dies bedeutet, dass 0,3 % (3/1000 = 0,003 = 0,3 %) vom Guthaben abgezogen werden, bevor dessen K-Wert mit dem K-Wert der aktuellen Reserven verglichen wird.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aktualisieren Sie `reserve0` und `reserve1` und bei Bedarf die Preisakkumulatoren und den Zeitstempel und geben Sie ein Ereignis aus.

##### Sync oder Skim

Es ist möglich, dass die realen Guthaben nicht mit den Reserven übereinstimmen, von denen das Tauschpaar ausgeht.
Es gibt keine Möglichkeit, Tokens ohne die Zustimmung des Vertrags abzuheben, aber Einzahlungen sind eine andere Sache. Ein Konto kann Tokens an die Börse transferieren, ohne `mint` oder `swap` aufzurufen.

In diesem Fall gibt es zwei Lösungen:

- `sync`, aktualisieren Sie die Reserven auf die aktuellen Guthaben
- `skim`, heben Sie den zusätzlichen Betrag ab. Beachten Sie, dass jedes Konto `skim` aufrufen darf, da wir nicht wissen, wer die Tokens eingezahlt hat. Diese Information wird in einem Ereignis ausgegeben, aber Ereignisse sind von der Blockchain aus nicht zugänglich.

```solidity
    // Erzwingen, dass Guthaben mit Reserven übereinstimmen
    function skim(address to) external lock {
        address _token0 = token0; // Gaseinsparungen
        address _token1 = token1; // Gaseinsparungen
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // Erzwingen, dass Reserven mit Guthaben übereinstimmen
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Dieser Vertrag](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) erstellt die Tauschpaare.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Diese Zustandsvariablen sind notwendig, um die Protokollgebühr zu implementieren (siehe [Whitepaper](https://app.uniswap.org/whitepaper.pdf), S. 5).
Die `feeTo`-Adresse sammelt die Liquiditäts-Tokens für die Protokollgebühr, und `feeToSetter` ist die Adresse, die berechtigt ist, `feeTo` in eine andere Adresse zu ändern.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Diese Variablen verfolgen die Paare, die Tauschgeschäfte zwischen zwei Token-Typen.

Die erste, `getPair`, ist eine Zuordnung, die einen Tauschpaar-Vertrag basierend auf den beiden ERC-20-Tokens identifiziert, die er tauscht. ERC-20-Tokens werden durch die Adressen der Verträge identifiziert, die sie implementieren, daher sind die Schlüssel und der Wert allesamt Adressen. Um die Adresse des Tauschpaares zu erhalten, das Ihnen den Tausch von `tokenA` in `tokenB` ermöglicht, verwenden Sie `getPair[<tokenA-Adresse>][<tokenB-Adresse>]` (oder umgekehrt).

Die zweite Variable, `allPairs`, ist ein Array, das alle Adressen von Tauschpaaren enthält, die von dieser Factory erstellt wurden. In Ethereum kann man nicht über den Inhalt einer Zuordnung iterieren oder eine Liste aller Schlüssel erhalten, daher ist diese Variable die einzige Möglichkeit zu wissen, welche Tauschgeschäfte diese Factory verwaltet.

Hinweis: Der Grund, warum Sie nicht über alle Schlüssel einer Zuordnung iterieren können, ist, dass die Speicherung von Vertragsdaten _teuer_ ist. Je weniger wir davon verwenden und je seltener wir sie ändern, desto besser. Sie können [Zuordnungen erstellen, die Iterationen unterstützen](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), aber sie erfordern zusätzlichen Speicher für eine Liste von Schlüsseln. In den meisten Anwendungen benötigen Sie das nicht.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Dieses Ereignis wird ausgegeben, wenn ein neues Tauschpaar erstellt wird. Es enthält die Adressen der Tokens, die Adresse des Tauschpaares und die Gesamtzahl der von der Factory verwalteten Tauschgeschäfte.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Das Einzige, was der Konstruktor tut, ist, den `feeToSetter` festzulegen. Factories beginnen ohne Gebühr, und nur `feeSetter` kann das ändern.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Diese Funktion gibt die Anzahl der Tauschpaare zurück.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Dies ist die Hauptfunktion der Factory: ein Tauschpaar zwischen zwei ERC-20-Tokens zu erstellen. Beachten Sie, dass jeder diese Funktion aufrufen kann. Sie benötigen keine Erlaubnis von Uniswap, um ein neues Tauschpaar zu erstellen.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Wir möchten, dass die Adresse der neuen Börse deterministisch ist, damit sie offchain im Voraus berechnet werden kann (dies kann für [Layer-2-Transaktionen](/developers/docs/scaling/) nützlich sein).
Dazu benötigen wir eine konsistente Reihenfolge der Token-Adressen, unabhängig von der Reihenfolge, in der wir sie erhalten haben, also sortieren wir sie hier.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // einzelne Prüfung ist ausreichend
```

Große Liquiditätspools sind besser als kleine, da sie stabilere Preise haben. Wir wollen nicht mehr als einen einzigen Liquiditätspool pro Token-Paar haben. Wenn es bereits einen Tausch gibt, ist es nicht notwendig, einen weiteren für dasselbe Paar zu erstellen.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Um einen neuen Vertrag zu erstellen, benötigen wir den Code, der ihn erstellt (sowohl die Konstruktorfunktion als auch den Code, der den EVM-Bytecode des eigentlichen Vertrags in den Speicher schreibt). Normalerweise verwenden wir in Solidity einfach `addr = new <Name des Vertrags>(<Konstruktorparameter>)` und der Compiler kümmert sich um alles für uns, aber um eine deterministische Vertragsadresse zu haben, müssen wir den [CREATE2-Opcode](https://eips.ethereum.org/EIPS/eip-1014) verwenden.
Als dieser Code geschrieben wurde, wurde dieser Opcode noch nicht von Solidity unterstützt, daher war es notwendig, den Code manuell zu holen. Dies ist kein Problem mehr, da [Solidity jetzt CREATE2 unterstützt](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Wenn ein Opcode noch nicht von Solidity unterstützt wird, können wir ihn mit [Inline-Assembly](https://docs.soliditylang.org/en/v0.8.3/assembly.html) aufrufen.

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Rufen Sie die Funktion `initialize` auf, um der neuen Börse mitzuteilen, welche beiden Tokens sie tauscht.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // fülle Mapping in umgekehrter Richtung
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Speichern Sie die neuen Paar-Informationen in den Zustandsvariablen und geben Sie ein Ereignis aus, um die Welt über das neue Tauschpaar zu informieren.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Diese beiden Funktionen ermöglichen es `feeSetter`, den Gebührenempfänger (falls vorhanden) zu steuern und `feeSetter` in eine neue Adresse zu ändern.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Dieser Vertrag](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementiert den ERC-20-Liquiditäts-Token. Er ähnelt dem [OpenZeppelin ERC-20-Vertrag](/developers/tutorials/erc20-annotated-code), daher werde ich nur den Teil erklären, der anders ist, die `permit`-Funktionalität.

Transaktionen auf Ethereum kosten Ether (ETH), was echtem Geld entspricht. Wenn Sie ERC-20-Tokens, aber kein ETH haben, können Sie keine Transaktionen senden, also können Sie nichts mit ihnen tun. Eine Lösung, um dieses Problem zu vermeiden, sind [Meta-Transaktionen](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Der Besitzer der Tokens unterzeichnet eine Transaktion, die es jemand anderem erlaubt, Tokens offchain abzuheben, und sendet sie über das Internet an den Empfänger. Der Empfänger, der über ETH verfügt, reicht dann die Genehmigung im Namen des Eigentümers ein.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Dieser Hash ist der [Bezeichner für den Transaktionstyp](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Der einzige, den wir hier unterstützen, ist `Permit` mit diesen Parametern.

```solidity
    mapping(address => uint) public nonces;
```

Es ist für einen Empfänger nicht möglich, eine digitale Signatur zu fälschen. Es ist jedoch trivial, dieselbe Transaktion zweimal zu senden (dies ist eine Form von [Replay-Angriff](https://wikipedia.org/wiki/Replay_attack)). Um dies zu verhindern, verwenden wir eine [Nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Wenn die Nonce einer neuen `Permit` nicht um eins größer ist als die zuletzt verwendete, gehen wir davon aus, dass sie ungültig ist.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Dies ist der Code, um den [Chain Identifier](https://chainid.network/) abzurufen. Er verwendet einen EVM-Assembly-Dialekt namens [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Beachten Sie, dass Sie in der aktuellen Version von Yul `chainid()` verwenden müssen, nicht `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Berechnen Sie den [Domain Separator](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) für EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Dies ist die Funktion, die die Berechtigungen implementiert. Sie erhält als Parameter die relevanten Felder und die drei skalaren Werte für [die Signatur](https://yos.io/2018/11/16/ethereum-signatures/) (v, r und s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Akzeptieren Sie keine Transaktionen nach Ablauf der Frist.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` ist die Nachricht, die wir erwarten zu erhalten. Wir wissen, was die Nonce sein sollte, daher müssen wir sie nicht als Parameter erhalten.

Der Ethereum-Signaturalgorithmus erwartet 256 Bits zum Signieren, also verwenden wir die Hash-Funktion `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Aus dem Digest und der Signatur können wir die Adresse erhalten, die sie signiert hat, indem wir [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) verwenden.

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Wenn alles in Ordnung ist, behandeln Sie dies als [eine ERC-20-Genehmigung](https://eips.ethereum.org/EIPS/eip-20#approve).

## Die Peripherieverträge {#periphery-contracts}

Die Peripherieverträge sind die API (Application Program Interface) für Uniswap. Sie sind für externe Aufrufe verfügbar, entweder von anderen Verträgen oder dezentralisierten Anwendungen. Sie könnten die Kernverträge direkt aufrufen, aber das ist komplizierter und Sie könnten an Wert verlieren, wenn Sie einen Fehler machen. Die Kernverträge enthalten nur Tests, um sicherzustellen, dass sie nicht betrogen werden, keine Plausibilitätsprüfungen für andere. Diese befinden sich in der Peripherie, damit sie bei Bedarf aktualisiert werden können.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Dieser Vertrag](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) hat Probleme und [sollte nicht mehr verwendet werden](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Glücklicherweise sind die Peripherieverträge zustandslos und halten keine Vermögenswerte, so dass es einfach ist, ihn abzulehnen und den Leuten vorzuschlagen, stattdessen den Ersatz, `UniswapV2Router02`, zu verwenden.

### UniswapV2Router02.sol {#UniswapV2Router02}

In den meisten Fällen würden Sie Uniswap über [diesen Vertrag](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol) verwenden.
Sie können [hier](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) sehen, wie man ihn verwendet.

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Die meisten davon sind uns entweder schon begegnet oder ziemlich offensichtlich. Die einzige Ausnahme ist `IWETH.sol`. Uniswap v2 ermöglicht den Tausch für jedes Paar von ERC-20-Tokens, aber Ether (ETH) selbst ist kein ERC-20-Token. Er existierte vor dem Standard und wird durch einzigartige Mechanismen transferiert. Um die Verwendung von ETH in Verträgen zu ermöglichen, die für ERC-20-Tokens gelten, wurde der [Wrapped Ether (WETH)](https://weth.tkn.eth.limo/)-Vertrag entwickelt. Sie senden diesem Vertrag ETH, und er prägt Ihnen eine entsprechende Menge WETH. Oder Sie können WETH verbrennen und erhalten ETH zurück.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Der Router muss wissen, welche Factory er verwenden soll, und für Transaktionen, die WETH erfordern, welchen WETH-Vertrag er verwenden soll. Diese Werte sind [unveränderlich](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), was bedeutet, dass sie nur im Konstruktor festgelegt werden können. Dies gibt den Nutzern die Gewissheit, dass niemand sie ändern kann, um auf weniger ehrliche Verträge zu verweisen.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Dieser Modifier stellt sicher, dass zeitlich begrenzte Transaktionen („mache X vor Zeitpunkt Y, wenn du kannst“) nicht nach ihrer Zeitbegrenzung stattfinden.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Der Konstruktor legt nur die unveränderlichen Zustandsvariablen fest.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // akzeptiere ETH nur über Fallback vom WETH-Vertrag
    }
```

Diese Funktion wird aufgerufen, wenn wir Tokens aus dem WETH-Vertrag zurück in ETH einlösen. Nur der von uns verwendete WETH-Vertrag ist dazu berechtigt.

#### Liquidität hinzufügen {#add-liquidity}

Diese Funktionen fügen dem Tauschpaar Tokens hinzu, was den Liquiditätspool erhöht.

```solidity

    // **** LIQUIDITÄT HINZUFÜGEN ****
    function _addLiquidity(
```

Diese Funktion wird verwendet, um die Menge der A- und B-Tokens zu berechnen, die in das Tauschpaar eingezahlt werden sollen.

```solidity
        address tokenA,
        address tokenB,
```

Dies sind die Adressen der ERC-20-Token-Verträge.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Dies sind die Beträge, die der Liquiditätsanbieter einzahlen möchte. Sie sind auch die maximalen Beträge von A und B, die eingezahlt werden sollen.

```solidity
        uint amountAMin,
        uint amountBMin
```

Dies sind die minimal akzeptablen Beträge, die eingezahlt werden sollen. Wenn die Transaktion nicht mit diesen oder höheren Beträgen stattfinden kann, wird sie zurückgesetzt. Wenn Sie diese Funktion nicht wünschen, geben Sie einfach Null an.

Liquiditätsanbieter geben typischerweise ein Minimum an, weil sie die Transaktion auf einen Wechselkurs beschränken wollen, der dem aktuellen nahe kommt. Wenn der Wechselkurs zu stark schwankt, könnte dies Nachrichten bedeuten, die die zugrunde liegenden Werte ändern, und sie wollen manuell entscheiden, was zu tun ist.

Stellen Sie sich zum Beispiel einen Fall vor, in dem der Wechselkurs eins zu eins ist und der Liquiditätsanbieter diese Werte angibt:

| Parameter      | Wert |
| -------------- | ---: |
| amountADesired | 1000 |
| amountBDesired | 1000 |
| amountAMin     |  900 |
| amountBMin     |  800 |

Solange der Wechselkurs zwischen 0,9 und 1,25 bleibt, findet die Transaktion statt. Wenn der Wechselkurs aus diesem Bereich herausfällt, wird die Transaktion abgebrochen.

Der Grund für diese Vorsichtsmaßnahme ist, dass Transaktionen nicht sofort erfolgen. Sie reichen sie ein und irgendwann wird ein Validator sie in einen Block aufnehmen (es sei denn, Ihr Gaspreis ist sehr niedrig, in diesem Fall müssen Sie eine weitere Transaktion mit derselben Nonce und einem höheren Gaspreis einreichen, um sie zu überschreiben). Sie können nicht kontrollieren, was während des Intervalls zwischen Einreichung und Aufnahme geschieht.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Die Funktion gibt die Beträge zurück, die der Liquiditätsanbieter einzahlen sollte, um ein Verhältnis zu haben, das dem aktuellen Verhältnis zwischen den Reserven entspricht.

```solidity
        // erstelle das Paar, wenn es noch nicht existiert
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Wenn es für dieses Token-Paar noch keine Börse gibt, erstellen Sie sie.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Holen Sie sich die aktuellen Reserven des Paares.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Wenn die aktuellen Reserven leer sind, handelt es sich um ein neues Tauschpaar. Die einzuzahlenden Beträge sollten genau denen entsprechen, die der Liquiditätsanbieter bereitstellen möchte.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Wenn wir sehen müssen, welche Beträge es sein werden, erhalten wir den optimalen Betrag mit [dieser Funktion](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Wir wollen das gleiche Verhältnis wie die aktuellen Reserven.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Wenn `amountBOptimal` kleiner ist als der Betrag, den der Liquiditätsanbieter einzahlen möchte, bedeutet dies, dass Token B derzeit wertvoller ist, als der Liquiditätseinzahler denkt, so dass ein kleinerer Betrag erforderlich ist.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Wenn der optimale B-Betrag mehr ist als der gewünschte B-Betrag, bedeutet dies, dass B-Tokens derzeit weniger wertvoll sind, als der Liquiditätseinzahler denkt, so dass ein höherer Betrag erforderlich ist. Der gewünschte Betrag ist jedoch ein Maximum, also können wir das nicht tun. Stattdessen berechnen wir die optimale Anzahl von A-Tokens für den gewünschten Betrag von B-Tokens.

Zusammengenommen erhalten wir dieses Diagramm. Nehmen Sie an, Sie versuchen, tausend A-Tokens (blaue Linie) und tausend B-Tokens (rote Linie) einzuzahlen. Die x-Achse ist der Wechselkurs, A/B. Wenn x=1 ist, haben sie den gleichen Wert und Sie zahlen jeweils tausend ein. Wenn x=2 ist, hat A den doppelten Wert von B (Sie erhalten zwei B-Tokens für jeden A-Token), also zahlen Sie tausend B-Tokens, aber nur 500 A-Tokens ein. Wenn x=0,5 ist, ist die Situation umgekehrt, tausend A-Tokens und fünfhundert B-Tokens.

![Graph](liquidityProviderDeposit.png)

Sie könnten Liquidität direkt in den Kernvertrag einzahlen (unter Verwendung von [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), aber der Kernvertrag prüft nur, dass er selbst nicht betrogen wird, so dass Sie Gefahr laufen, Wert zu verlieren, wenn sich der Wechselkurs zwischen dem Zeitpunkt, an dem Sie Ihre Transaktion einreichen, und dem Zeitpunkt, an dem sie ausgeführt wird, ändert. Wenn Sie den Peripherievertrag verwenden, berechnet er den Betrag, den Sie einzahlen sollten, und zahlt ihn sofort ein, so dass sich der Wechselkurs nicht ändert und Sie nichts verlieren.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Diese Funktion kann durch eine Transaktion aufgerufen werden, um Liquidität einzuzahlen. Die meisten Parameter sind die gleichen wie in `_addLiquidity` oben, mit zwei Ausnahmen:

. `to` ist die Adresse, die die neuen Liquiditäts-Tokens erhält, die geprägt werden, um den Anteil des Liquiditätsanbieters am Pool zu zeigen
. `deadline` ist eine Zeitbegrenzung für die Transaktion

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Wir berechnen die tatsächlich einzuzahlenden Beträge und finden dann die Adresse des Liquiditätspools. Um Gas zu sparen, tun wir dies nicht, indem wir die Factory fragen, sondern verwenden die Bibliotheksfunktion `pairFor` (siehe unten in den Bibliotheken)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Übertragen Sie die korrekten Mengen an Tokens vom Nutzer in das Tauschpaar.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
```

Im Gegenzug geben Sie der `to`-Adresse Liquiditäts-Tokens für den teilweisen Besitz des Pools. Die `mint`-Funktion des Kernvertrags sieht, wie viele zusätzliche Tokens sie hat (im Vergleich zu dem, was sie beim letzten Mal hatte, als sich die Liquidität geändert hat) und prägt die Liquidität entsprechend.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Wenn ein Liquiditätsanbieter Liquidität zu einem Token/ETH-Tauschpaar hinzufügen möchte, gibt es einige Unterschiede. Der Vertrag kümmert sich um das Wrapping des ETH für den Liquiditätsanbieter. Es ist nicht notwendig anzugeben, wie viel ETH der Nutzer einzahlen möchte, da der Nutzer sie einfach mit der Transaktion sendet (der Betrag ist in `msg.value` verfügbar).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Um die ETH einzuzahlen, wickelt der Vertrag sie zuerst in WETH ein und transferiert dann die WETH in das Paar. Beachten Sie, dass der Transfer in ein `assert` eingeschlossen ist. Das bedeutet, dass, wenn der Transfer fehlschlägt, dieser Vertragsaufruf ebenfalls fehlschlägt und daher das Wrapping nicht wirklich stattfindet.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // staub-eth, falls vorhanden, zurückerstatten
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Der Nutzer hat uns bereits die ETH gesendet, also wenn etwas übrig bleibt (weil der andere Token weniger wertvoll ist, als der Nutzer dachte), müssen wir eine Rückerstattung ausstellen.

#### Liquidität entfernen {#remove-liquidity}

Diese Funktionen entfernen Liquidität und zahlen den Liquiditätsanbieter zurück.

```solidity
    // **** LIQUIDITÄT ENTFERNEN ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Der einfachste Fall der Liquiditätsentfernung. Es gibt eine Mindestmenge jedes Tokens, die der Liquiditätsanbieter zu akzeptieren bereit ist, und dies muss vor Ablauf der Frist geschehen.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // sende Liquidität an das Paar
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Die `burn`-Funktion des Kernvertrags kümmert sich darum, dem Nutzer die Tokens zurückzuzahlen.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Wenn eine Funktion mehrere Werte zurückgibt, wir aber nur an einigen davon interessiert sind, holen wir uns nur diese Werte auf diese Weise. Es ist in Bezug auf die Gaskosten etwas günstiger, als einen Wert zu lesen und ihn nie zu verwenden.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Übersetzen Sie die Beträge von der Art und Weise, wie der Kernvertrag sie zurückgibt (Token mit der niedrigeren Adresse zuerst) in die Art und Weise, wie der Nutzer sie erwartet (entsprechend `tokenA` und `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Es ist in Ordnung, zuerst den Transfer durchzuführen und dann zu überprüfen, ob er legitim ist, denn wenn er es nicht ist, werden wir alle Zustandsänderungen zurücksetzen.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Die Liquiditätsentfernung für ETH ist fast identisch, außer dass wir die WETH-Tokens erhalten und sie dann gegen ETH einlösen, um sie dem Liquiditätsanbieter zurückzugeben.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Diese Funktionen leiten Meta-Transaktionen weiter, um Nutzern ohne Ether zu ermöglichen, aus dem Pool abzuheben, unter Verwendung des [Permit-Mechanismus](#UniswapV2ERC20).

```solidity

    // **** LIQUIDITÄT ENTFERNEN (Unterstützung von Gebühren-auf-Transfer-Tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Diese Funktion kann für Tokens verwendet werden, die Transfer- oder Speichergebühren haben. Wenn ein Token solche Gebühren hat, können wir uns nicht auf die `removeLiquidity`-Funktion verlassen, um uns zu sagen, wie viel des Tokens wir zurückbekommen, also müssen wir zuerst abheben und dann das Guthaben abrufen.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Die letzte Funktion kombiniert Speichergebühren mit Meta-Transaktionen.

#### Handel {#trade}

```solidity
    // **** SWAP ****
    // Erfordert, dass der ursprüngliche Betrag bereits an das erste Paar gesendet wurde
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Diese Funktion führt eine interne Verarbeitung durch, die für die Funktionen erforderlich ist, die den Händlern zur Verfügung stehen.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Während ich dies schreibe, gibt es [388.160 ERC-20-Tokens](https://eth.blockscout.com/tokens). Wenn es für jedes Token-Paar eine Paar-Börse gäbe, wären das über 150 Milliarden Paar-Börsen. Die gesamte Chain hat im Moment [nur 0,1 % dieser Anzahl von Konten](https://eth.blockscout.com/stats/accountsGrowth). Stattdessen unterstützen die Swap-Funktionen das Konzept eines Pfads. Ein Händler kann A gegen B, B gegen C und C gegen D tauschen, sodass kein direkter A-D-Paar-Tausch erforderlich ist.

Die Preise an diesen Märkten sind in der Regel synchronisiert, denn wenn sie nicht synchron sind, ergibt sich eine Arbitrage-Möglichkeit. Stellen Sie sich zum Beispiel drei Tokens, A, B und C, vor. Es gibt drei Paar-Börsen, eine für jedes Paar.

1. Die Ausgangssituation
2. Ein Händler verkauft 24,695 A-Tokens und erhält 25,305 B-Tokens.
3. Der Händler verkauft 24,695 B-Tokens für 25,305 C-Tokens und behält ca. 0,61 B-Tokens als Gewinn.
4. Dann verkauft der Händler 24,695 C-Tokens für 25,305 A-Tokens und behält ca. 0,61 C-Tokens als Gewinn. Der Händler hat auch 0,61 zusätzliche A-Tokens (die 25,305, die der Händler am Ende hat, abzüglich der ursprünglichen Investition von 24,695).

| Schritt | A-B-Börse                                                   | B-C-Börse                                                   | A-C-Börse                                                   |
| ------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 1       | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2       | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3       | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4       | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Holen Sie sich das Paar, das wir gerade bearbeiten, sortieren Sie es (zur Verwendung mit dem Paar) und holen Sie sich den erwarteten Ausgabebetrag.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Rufen Sie die erwarteten Ausgabebeträge ab, sortiert nach der von der Paar-Börse erwarteten Reihenfolge.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Ist dies der letzte Tausch? Wenn ja, senden Sie die für den Handel erhaltenen Tokens an das Ziel. Wenn nicht, senden Sie es an die nächste Paar-Börse.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Rufen Sie tatsächlich die Paar-Börse auf, um die Tokens zu tauschen. Wir benötigen keinen Callback, um über den Tausch informiert zu werden, daher senden wir in diesem Feld keine Bytes.

```solidity
    function swapExactTokensForTokens(
```

Diese Funktion wird von Händlern direkt verwendet, um einen Token gegen einen anderen zu tauschen.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Dieser Parameter enthält die Adressen der ERC-20-Verträge. Wie oben erklärt, handelt es sich um ein Array, da Sie möglicherweise mehrere Paar-Börsen durchlaufen müssen, um von dem Vermögenswert, den Sie haben, zu dem zu gelangen, den Sie wollen.

Ein Funktionsparameter in Solidity kann entweder im `memory` oder in den `calldata` gespeichert werden. Wenn die Funktion ein Einstiegspunkt in den Vertrag ist, der direkt von einem Benutzer (über eine Transaktion) oder von einem anderen Vertrag aufgerufen wird, kann der Wert des Parameters direkt aus den Aufrufdaten entnommen werden. Wenn die Funktion intern aufgerufen wird, wie `_swap` oben, müssen die Parameter im `memory` gespeichert werden. Aus der Perspektive des aufgerufenen Vertrags sind `calldata` schreibgeschützt.

Bei skalaren Typen wie `uint` oder `address` übernimmt der Compiler die Wahl des Speichers für uns, aber bei Arrays, die länger und teurer sind, geben wir den zu verwendenden Speichertyp an.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Rückgabewerte werden immer im Speicher zurückgegeben.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Berechnen Sie den Betrag, der bei jedem Swap gekauft werden soll. Wenn das Ergebnis geringer ist als das Minimum, das der Händler zu akzeptieren bereit ist, wird die Transaktion rückgängig gemacht.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Übertragen Sie schließlich den ursprünglichen ERC-20-Token auf das Konto für die erste Paar-Börse und rufen Sie `_swap` auf. Dies geschieht alles in derselben Transaktion, sodass die Paar-Börse weiß, dass alle unerwarteten Tokens Teil dieser Übertragung sind.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Die vorherige Funktion, `swapTokensForTokens`, ermöglicht es einem Händler, eine genaue Anzahl von Input-Tokens anzugeben, die er bereit ist zu geben, und die Mindestanzahl von Output-Tokens, die er im Gegenzug erhalten möchte. Diese Funktion führt den umgekehrten Swap durch, sie lässt einen Händler die Anzahl der gewünschten Output-Tokens und die maximale Anzahl von Input-Tokens angeben, die er bereit ist, dafür zu bezahlen.

In beiden Fällen muss der Händler diesem Peripherievertrag zuerst eine Genehmigung erteilen, damit dieser sie übertragen kann.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Diese vier Varianten beinhalten alle den Handel zwischen ETH und Tokens. Der einzige Unterschied besteht darin, dass wir entweder ETH vom Händler erhalten und damit WETH prägen, oder wir erhalten WETH von der letzten Börse im Pfad und verbrennen es, um dem Händler die resultierende ETH zurückzusenden.

```solidity
    // **** SWAP (Unterstützung für Tokens mit Gebühr bei Übertragung) ****
    // Erfordert, dass der ursprüngliche Betrag bereits an das erste Paar gesendet wurde
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Dies ist die interne Funktion zum Tauschen von Tokens, die Übertragungs- oder Speichergebühren haben, um ([dieses Problem](https://github.com/Uniswap/uniswap-interface/issues/835)) zu lösen.

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // Geltungsbereich, um „Stack too deep“-Fehler zu vermeiden
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Aufgrund der Überweisungsgebühren können wir uns nicht auf die Funktion `getAmountsOut` verlassen, um uns mitzuteilen, wie viel wir bei jeder Überweisung erhalten (so wie wir es vor dem Aufruf des ursprünglichen `_swap` tun). Stattdessen müssen wir zuerst übertragen und dann sehen, wie viele Tokens wir zurückbekommen haben.

Hinweis: Theoretisch könnten wir einfach diese Funktion anstelle von `_swap` verwenden, aber in bestimmten Fällen (z. B. wenn die Übertragung rückgängig gemacht wird, weil am Ende nicht genug vorhanden ist, um das erforderliche Minimum zu erreichen) würde das mehr Gas kosten. Tokens mit Übertragungsgebühren sind ziemlich selten, daher müssen wir sie zwar berücksichtigen, aber es ist nicht nötig, dass alle Swaps davon ausgehen, dass sie durch mindestens einen von ihnen gehen.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Dies sind die gleichen Varianten, die für normale Tokens verwendet werden, aber sie rufen stattdessen `_swapSupportingFeeOnTransferTokens` auf.

```solidity
    // **** BIBLIOTHEKSFUNKTIONEN ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Diese Funktionen sind nur Proxys, die die [UniswapV2Library-Funktionen](#uniswapV2library) aufrufen.

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Dieser Vertrag wurde verwendet, um Börsen von der alten v1 auf v2 zu migrieren. Jetzt, da sie migriert wurden, ist er nicht mehr relevant.

## Die Bibliotheken {#libraries}

Die [SafeMath-Bibliothek](https://docs.openzeppelin.com/contracts/2.x/api/math) ist gut dokumentiert, sodass sie hier nicht dokumentiert werden muss.

### Math {#Math}

Diese Bibliothek enthält einige mathematische Funktionen, die normalerweise nicht im Solidity-Code benötigt werden, sodass sie nicht Teil der Sprache sind.

```solidity
pragma solidity =0.5.16;

// eine Bibliothek zur Durchführung verschiedener mathematischer Operationen

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // Babylonisches Verfahren (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Beginnen Sie mit x als Schätzung, die höher ist als die Quadratwurzel (das ist der Grund, warum wir 1-3 als Sonderfälle behandeln müssen).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Holen Sie sich eine genauere Schätzung, den Durchschnitt der vorherigen Schätzung und der Zahl, deren Quadratwurzel wir zu finden versuchen, geteilt durch die vorherige Schätzung. Wiederholen Sie, bis die neue Schätzung nicht niedriger ist als die bestehende. Weitere Details finden Sie [hier](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Wir sollten niemals die Quadratwurzel von Null benötigen. Die Quadratwurzeln von eins, zwei und drei sind ungefähr eins (wir verwenden ganze Zahlen, also ignorieren wir den Bruchteil).

```solidity
        }
    }
}
```

### Festkommazahlen (UQ112x112) {#FixedPoint}

Diese Bibliothek verarbeitet Brüche, die normalerweise nicht Teil der Ethereum-Arithmetik sind. Dies geschieht durch die Kodierung der Zahl _x_ als _x\*2^112_. Dadurch können wir die ursprünglichen Additions- und Subtraktions-Opcodes ohne Änderung verwenden.

```solidity
pragma solidity =0.5.16;

// eine Bibliothek zur Handhabung von binären Festkommazahlen (https://de.wikipedia.org/wiki/Q-Format)

// Bereich: [0, 2**112 - 1]
// Auflösung: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` ist die Kodierung für eins.

```solidity
    // einen uint112 als UQ112x112 kodieren
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // führt nie zu einem Überlauf
    }
```

Da y ein `uint112` ist, kann es höchstens 2^112-1 sein. Diese Zahl kann immer noch als `UQ112x112` kodiert werden.

```solidity
    // ein UQ112x112 durch ein uint112 teilen, was ein UQ112x112 zurückgibt
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Wenn wir zwei `UQ112x112`-Werte dividieren, wird das Ergebnis nicht mehr mit 2^112 multipliziert. Stattdessen nehmen wir also eine ganze Zahl für den Nenner. Wir hätten einen ähnlichen Trick anwenden müssen, um die Multiplikation durchzuführen, aber wir müssen keine Multiplikation von `UQ112x112`-Werten durchführen.

### UniswapV2Library {#uniswapV2library}

Diese Bibliothek wird nur von den Peripherieverträgen verwendet

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // gibt sortierte Token-Adressen zurück, die verwendet werden, um Rückgabewerte von in dieser Reihenfolge sortierten Paaren zu verarbeiten
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Sortieren Sie die beiden Tokens nach Adresse, damit wir die Adresse der Paar-Börse für sie erhalten können. Dies ist notwendig, da wir sonst zwei Möglichkeiten hätten, eine für die Parameter A,B und eine andere für die Parameter B,A, was zu zwei Börsen statt einer führen würde.

```solidity
    // berechnet die CREATE2-Adresse für ein Paar, ohne externe Aufrufe zu tätigen
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // Init-Code-Hash
            ))));
    }
```

Diese Funktion berechnet die Adresse der Paar-Börse für die beiden Tokens. Dieser Vertrag wird mit dem [CREATE2-Opcode](https://eips.ethereum.org/EIPS/eip-1014) erstellt, sodass wir die Adresse mit demselben Algorithmus berechnen können, wenn wir die von ihm verwendeten Parameter kennen. Das ist viel billiger als die Factory zu fragen, und

```solidity
    // holt und sortiert die Reserven für ein Paar
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Diese Funktion gibt die Reserven der beiden Tokens zurück, die die Paar-Börse besitzt. Beachten Sie, dass es die Tokens in beliebiger Reihenfolge empfangen und für den internen Gebrauch sortieren kann.

```solidity
    // bei gegebenem Betrag eines Vermögenswerts und Paarreserven wird ein äquivalenter Betrag des anderen Vermögenswerts zurückgegeben
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Diese Funktion gibt Ihnen den Betrag an Token B, den Sie im Gegenzug für Token A erhalten, wenn keine Gebühr anfällt. Diese Berechnung berücksichtigt, dass die Überweisung den Wechselkurs ändert.

```solidity
    // bei gegebenem Eingabebetrag eines Vermögenswerts und Paarreserven wird der maximale Ausgabebetrag des anderen Vermögenswerts zurückgegeben
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Die obige `quote`-Funktion funktioniert hervorragend, wenn für die Nutzung der Paar-Börse keine Gebühr anfällt. Wenn jedoch eine Umtauschgebühr von 0,3 % anfällt, ist der Betrag, den Sie tatsächlich erhalten, niedriger. Diese Funktion berechnet den Betrag nach der Umtauschgebühr.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity verarbeitet Brüche nicht nativ, also können wir den Betrag nicht einfach mit 0,997 multiplizieren. Stattdessen multiplizieren wir den Zähler mit 997 und den Nenner mit 1000, um den gleichen Effekt zu erzielen.

```solidity
    // bei gegebenem Ausgabebetrag eines Vermögenswerts und Paarreserven wird ein erforderlicher Eingabebetrag des anderen Vermögenswerts zurückgegeben
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Diese Funktion macht ungefähr dasselbe, aber sie erhält den Ausgabebetrag und liefert die Eingabe.

```solidity

    // führt verkettete getAmountOut-Berechnungen für eine beliebige Anzahl von Paaren durch
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // führt verkettete getAmountIn-Berechnungen für eine beliebige Anzahl von Paaren durch
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Diese beiden Funktionen kümmern sich um die Identifizierung der Werte, wenn es notwendig ist, mehrere Paar-Börsen zu durchlaufen.

### Transfer-Helfer {#transfer-helper}

[Diese Bibliothek](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) fügt Erfolgsprüfungen um ERC-20- und Ethereum-Überweisungen hinzu, um eine Rückgängigmachung und eine Rückgabe des Wertes `false` auf die gleiche Weise zu behandeln.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// Hilfsmethoden für die Interaktion mit ERC20-Tokens und das Senden von ETH, die nicht konsistent true/false zurückgeben
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Wir können einen anderen Vertrag auf zwei Arten aufrufen:

- Verwenden Sie eine Schnittstellendefinition, um einen Funktionsaufruf zu erstellen
- Verwenden Sie die [Application Binary Interface (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) „manuell“, um den Aufruf zu erstellen. Dafür hat sich der Autor des Codes entschieden.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Aus Gründen der Abwärtskompatibilität mit Tokens, die vor dem ERC-20-Standard erstellt wurden, kann ein ERC-20-Aufruf entweder durch eine Rückgängigmachung fehlschlagen (in diesem Fall ist `success` `false`) oder erfolgreich sein und einen `false`-Wert zurückgeben (in diesem Fall gibt es Ausgabedaten, und wenn Sie diese als Boolean dekodieren, erhalten Sie `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Diese Funktion implementiert die [Überweisungsfunktionalität von ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), die es einem Konto ermöglicht, die von einem anderen Konto bereitgestellte Genehmigung auszugeben.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Diese Funktion implementiert die [transferFrom-Funktionalität von ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), die es einem Konto ermöglicht, die von einem anderen Konto bereitgestellte Genehmigung auszugeben.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Diese Funktion überweist Ether auf ein Konto. Jeder Aufruf an einen anderen Vertrag kann versuchen, Ether zu senden. Da wir eigentlich keine Funktion aufrufen müssen, senden wir keine Daten mit dem Aufruf.

## Fazit {#conclusion}

Dies ist ein langer Artikel von etwa 50 Seiten. Wenn Sie es bis hierher geschafft haben, herzlichen Glückwunsch! Hoffentlich haben Sie inzwischen die Überlegungen beim Schreiben einer realen Anwendung (im Gegensatz zu kurzen Beispielprogrammen) verstanden und sind besser in der Lage, Verträge für Ihre eigenen Anwendungsfälle zu schreiben.

Gehen Sie jetzt und schreiben Sie etwas Nützliches und bringen Sie uns zum Staunen.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
