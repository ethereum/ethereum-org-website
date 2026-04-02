---
title: "Uniswap-v2 Contract Walk-Through"
description: Wie funktioniert der Uniswap-v2-Contract? Warum ist er so geschrieben?
author: Ori Pomerantz
tags: ["Solidity", "Dapps"]
skill: intermediate
breadcrumb: Uniswap v2 Walkthrough
published: 2021-05-01
lang: de
---
## Einführung {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) kann einen Tauschmarkt zwischen beliebigen zwei ERC-20-Token erstellen. In diesem Artikel werden wir den Quellcode für die Smart Contracts durchgehen, die dieses Protokoll implementieren, und uns ansehen, warum sie auf diese Weise geschrieben wurden.

### Was macht Uniswap? {#what-does-uniswap-do}

Grundsätzlich gibt es zwei Arten von Nutzern: Liquiditätsanbieter und Händler.

Die _Liquiditätsanbieter_ stellen dem Pool die beiden Token zur Verfügung, die getauscht werden können (wir nennen sie **Token0** und **Token1**). Im Gegenzug erhalten sie einen dritten Token, der den teilweisen Besitz des Pools darstellt und als _Liquiditäts-Token_ bezeichnet wird.

_Händler_ senden eine Art von Token an den Pool und erhalten die andere (zum Beispiel senden sie **Token0** und erhalten **Token1**) aus dem Pool, der von den Liquiditätsanbietern bereitgestellt wird. Der Wechselkurs wird durch die relative Anzahl von **Token0** und **Token1** bestimmt, die der Pool hält. Darüber hinaus behält der Pool einen kleinen Prozentsatz als Belohnung für den Liquiditäts-Pool ein.

Wenn Liquiditätsanbieter ihre Vermögenswerte zurückhaben möchten, können sie die Pool-Token verbrennen und ihre Token zurückerhalten, einschließlich ihres Anteils an den Belohnungen.

[Klicken Sie hier für eine ausführlichere Beschreibung](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Warum v2? Warum nicht v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) ist ein Upgrade, das viel komplizierter ist als v2. Es ist einfacher, zuerst v2 zu lernen und dann zu v3 überzugehen.

### Core-Contracts vs. Periphery-Contracts {#contract-types}

Uniswap v2 ist in zwei Komponenten unterteilt: einen Core (Kern) und eine Periphery (Peripherie). Diese Aufteilung ermöglicht es den Core-Contracts, die die Vermögenswerte halten und daher sicher sein _müssen_, einfacher und leichter überprüfbar zu sein. Alle zusätzlichen Funktionen, die von Händlern benötigt werden, können dann durch Periphery-Contracts bereitgestellt werden.

## Daten- und Kontrollflüsse {#flows}

Dies ist der Daten- und Kontrollfluss, der stattfindet, wenn Sie die drei Hauptaktionen von Uniswap ausführen:

1. Tauschen zwischen verschiedenen Token
2. Liquidität zum Markt hinzufügen und mit ERC-20-Liquiditäts-Token der Tauschbörse belohnt werden
3. ERC-20-Liquiditäts-Token verbrennen und die ERC-20-Token zurückerhalten, die die Tauschbörse Händlern zum Tauschen anbietet

### Tauschen {#swap-flow}

Dies ist der häufigste Ablauf, der von Händlern verwendet wird:

#### Aufrufer {#caller}

1. Dem Peripherie-Konto eine Freigabe (Allowance) in Höhe des zu tauschenden Betrags erteilen.
2. Eine der vielen Tausch-Funktionen des Peripherie-Vertrags aufrufen (welche, hängt davon ab, ob ETH involviert ist oder nicht, ob der Händler die Menge der einzuzahlenden Token oder die Menge der zurückzuerhaltenden Token angibt usw.).
   Jede Tausch-Funktion akzeptiert einen `path`, ein Array von Tauschbörsen, die durchlaufen werden sollen.

#### Im Peripherie-Vertrag (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Die Beträge identifizieren, die an jeder Tauschbörse entlang des Pfades gehandelt werden müssen.
4. Über den Pfad iterieren. Für jede Tauschbörse auf dem Weg wird der Eingabe-Token gesendet und dann die `swap`-Funktion der Tauschbörse aufgerufen.
   In den meisten Fällen ist die Zieladresse für die Token die nächste Tauschbörse im Pfad. Bei der letzten Tauschbörse ist es die vom Händler angegebene Adresse.

#### Im Kernvertrag (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Überprüfen, ob der Kernvertrag nicht betrogen wird und nach dem Tauschen ausreichend Liquidität aufrechterhalten kann.
6. Prüfen, wie viele zusätzliche Token wir zusätzlich zu den bekannten Reserven haben. Dieser Betrag ist die Anzahl der Eingabe-Token, die wir zum Tauschen erhalten haben.
7. Die Ausgabe-Token an das Ziel senden.
8. `_update` aufrufen, um die Reservebeträge zu aktualisieren

#### Zurück im Peripherie-Vertrag (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Notwendige Bereinigungen durchführen (zum Beispiel WETH-Token verbrennen, um ETH zurückzuerhalten und an den Händler zu senden)

### Liquidität hinzufügen {#add-liquidity-flow}

#### Aufrufer {#caller-2}

1. Dem Peripherie-Konto eine Freigabe (Allowance) in den Beträgen erteilen, die dem Liquiditätspool hinzugefügt werden sollen.
2. Eine der `addLiquidity`-Funktionen des Peripherie-Vertrags aufrufen.

#### Im Peripherie-Vertrag (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Bei Bedarf eine neue Tauschbörse für das Paar erstellen
4. Wenn es eine bestehende Tauschbörse für das Paar gibt, die Menge der hinzuzufügenden Token berechnen. Dies soll für beide Token ein identischer Wert sein, also das gleiche Verhältnis von neuen Token zu bestehenden Token.
5. Überprüfen, ob die Beträge akzeptabel sind (Aufrufer können einen Mindestbetrag angeben, unter dem sie lieber keine Liquidität hinzufügen möchten)
6. Den Kernvertrag aufrufen.

#### Im Kernvertrag (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Liquiditäts-Token prägen und an den Aufrufer senden
8. `_update` aufrufen, um die Reservebeträge zu aktualisieren

### Liquidität entfernen {#remove-liquidity-flow}

#### Aufrufer {#caller-3}

1. Dem Peripherie-Konto eine Freigabe (Allowance) für Liquiditäts-Token erteilen, die im Austausch gegen die zugrunde liegenden Token verbrannt werden sollen.
2. Eine der `removeLiquidity`-Funktionen des Peripherie-Vertrags aufrufen.

#### Im Peripherie-Vertrag (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Die Liquiditäts-Token an die Tauschbörse des Paares senden

#### Im Kernvertrag (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Die zugrunde liegenden Token im Verhältnis zu den verbrannten Token an die Zieladresse senden. Wenn sich beispielsweise 1000 A-Token, 500 B-Token und 90 Liquiditäts-Token im Pool befinden und wir 9 Token zum Verbrennen erhalten, verbrennen wir 10 % der Liquiditäts-Token, sodass wir dem Benutzer 100 A-Token und 50 B-Token zurücksenden.
5. Die Liquiditäts-Token verbrennen
6. `_update` aufrufen, um die Reservebeträge zu aktualisieren

## Die Kernverträge {#core-contracts}

Dies sind die sicheren Smart Contracts, die die Liquidität halten.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Dieser Smart Contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementiert den eigentlichen Pool, der Token tauscht. Es ist die Kernfunktionalität von Uniswap.

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

Dies sind alle Schnittstellen, die der Smart Contract kennen muss, entweder weil der Smart Contract sie implementiert (`IUniswapV2Pair` und `UniswapV2ERC20`) oder weil er Smart Contracts aufruft, die sie implementieren.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Dieser Smart Contract erbt von `UniswapV2ERC20`, was die ERC-20-Funktionen für die Liquiditäts-Token bereitstellt.

```solidity
    using SafeMath  for uint;
```

Die [SafeMath-Bibliothek](https://docs.openzeppelin.com/contracts/2.x/api/math) wird verwendet, um Überläufe (Overflows) und Unterläufe (Underflows) zu vermeiden. Dies ist wichtig, da wir sonst in eine Situation geraten könnten, in der ein Wert `-1` sein sollte, stattdessen aber `2^256-1` ist.

```solidity
    using UQ112x112 for uint224;
```

Viele Berechnungen im Pool-Vertrag erfordern Brüche. Brüche werden jedoch von der Ethereum Virtual Machine nicht unterstützt.
Die Lösung, die Uniswap gefunden hat, besteht darin, 224-Bit-Werte zu verwenden, wobei 112 Bit für den ganzzahligen Teil und 112 Bit für den Bruchteil stehen. So wird `1.0` als `2^112` dargestellt, `1.5` als `2^112 + 2^111` usw.

Weitere Details zu dieser Bibliothek finden Sie [später in diesem Dokument](#FixedPoint).

#### Variablen {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Um Fälle von Division durch Null zu vermeiden, gibt es eine Mindestanzahl von Liquiditäts-Token, die immer existieren (aber dem Konto Null gehören). Diese Zahl ist **MINIMUM_LIQUIDITY**, eintausend.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Dies ist der ABI-Selektor für die ERC-20-Transferfunktion. Er wird verwendet, um ERC-20-Token in den beiden Token-Konten zu übertragen.

```solidity
    address public factory;
```

Dies ist der Factory-Vertrag, der diesen Pool erstellt hat. Jeder Pool ist eine Tauschbörse zwischen zwei ERC-20-Token, die Factory ist ein zentraler Punkt, der all diese Pools verbindet.

```solidity
    address public token0;
    address public token1;
```

Dies sind die Adressen der Smart Contracts für die beiden Arten von ERC-20-Token, die durch diesen Pool getauscht werden können.

```solidity
    uint112 private reserve0; // nutzt einen einzigen Speicherplatz, zugänglich über getReserves
    uint112 private reserve1; // nutzt einen einzigen Speicherplatz, zugänglich über getReserves
```

Die Reserven, die der Pool für jeden Token-Typ hat. Wir gehen davon aus, dass beide den gleichen Wert repräsentieren, und daher ist jeder token0 den Wert von reserve1/reserve0 token1 wert.

```solidity
    uint32  private blockTimestampLast; // nutzt einen einzigen Speicherplatz, zugänglich über getReserves
```

Der Zeitstempel für den letzten Block, in dem ein Tausch stattfand, wird verwendet, um Wechselkurse über die Zeit zu verfolgen.

Eine der größten Gas-Ausgaben von Ethereum-Smart-Contracts ist der Speicher (Storage), der von einem Aufruf des Smart Contracts zum nächsten bestehen bleibt. Jede Speicherzelle ist 256 Bit lang. Daher werden drei Variablen, `reserve0`, `reserve1` und `blockTimestampLast`, so zugewiesen, dass ein einziger Speicherwert alle drei umfassen kann (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Diese Variablen enthalten die kumulierten Kosten für jeden Token (jeweils in Bezug auf den anderen). Sie können verwendet werden, um den durchschnittlichen Wechselkurs über einen bestimmten Zeitraum zu berechnen.

```solidity
    uint public kLast; // reserve0 * reserve1, unmittelbar nach dem jüngsten Liquiditätsereignis
```

Die Art und Weise, wie die Paar-Börse über den Wechselkurs zwischen token0 und token1 entscheidet, besteht darin, das Vielfache der beiden Reserven während der Trades konstant zu halten. `kLast` ist dieser Wert. Er ändert sich, wenn ein Liquiditätsanbieter Token einzahlt oder abhebt, und er steigt aufgrund der Marktgebühr von 0,3 % leicht an.

Hier ist ein einfaches Beispiel. Beachten Sie, dass die Tabelle der Einfachheit halber nur drei Nachkommastellen hat und wir die Handelsgebühr von 0,3 % ignorieren, sodass die Zahlen nicht exakt sind.

| Ereignis                                    |  reserve0 |  reserve1 | reserve0 \* reserve1 | Durchschnittlicher Wechselkurs (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| Initiale Einrichtung                        | 1,000.000 | 1,000.000 |            1,000,000 |                                         |
| Händler A tauscht 50 token0 gegen 47.619 token1  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                   |
| Händler B tauscht 10 token0 gegen 8.984 token1   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                   |
| Händler C tauscht 40 token0 gegen 34.305 token1  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                   |
| Händler D tauscht 100 token1 gegen 109.01 token0 |   990.990 | 1,009.090 |            1,000,000 | 0.917                                   |
| Händler E tauscht 10 token0 gegen 10.079 token1  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                   |

Wenn Händler mehr von token0 bereitstellen, steigt der relative Wert von token1 und umgekehrt, basierend auf Angebot und Nachfrage.

#### Sperre (Lock) {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Es gibt eine Klasse von Sicherheitslücken, die auf [Reentrancy-Missbrauch](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) basieren. Uniswap muss beliebige ERC-20-Token übertragen, was bedeutet, dass ERC-20-Smart-Contracts aufgerufen werden, die versuchen könnten, den Uniswap-Markt, der sie aufruft, zu missbrauchen.
Indem wir eine `unlocked`-Variable als Teil des Smart Contracts haben, können wir verhindern, dass Funktionen aufgerufen werden, während sie ausgeführt werden (innerhalb derselben Transaktion).

```solidity
    modifier lock() {
```

Diese Funktion ist ein [Modifikator (Modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), eine Funktion, die eine normale Funktion umschließt, um ihr Verhalten in irgendeiner Weise zu ändern.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Wenn `unlocked` gleich eins ist, setzen Sie es auf null. Wenn es bereits null ist, machen Sie den Aufruf rückgängig (revert) und lassen Sie ihn fehlschlagen.

```solidity
        _;
```

In einem Modifikator ist `_;` der ursprüngliche Funktionsaufruf (mit allen Parametern). Hier bedeutet dies, dass der Funktionsaufruf nur stattfindet, wenn `unlocked` beim Aufruf eins war, und während er ausgeführt wird, ist der Wert von `unlocked` null.

```solidity
        unlocked = 1;
    }
```

Nachdem die Hauptfunktion zurückkehrt, geben Sie die Sperre frei.

#### Sonstige Funktionen {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Diese Funktion liefert Aufrufern den aktuellen Status der Börse. Beachten Sie, dass Solidity-Funktionen [mehrere Werte zurückgeben können](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Diese interne Funktion überträgt eine Menge an ERC-20-Token von der Börse an jemand anderen. `SELECTOR` gibt an, dass die Funktion, die wir aufrufen, `transfer(address,uint)` ist (siehe Definition oben).

Um zu vermeiden, dass wir eine Schnittstelle für die Token-Funktion importieren müssen, erstellen wir den Aufruf „manuell“ unter Verwendung einer der [ABI-Funktionen](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Es gibt zwei Möglichkeiten, wie ein ERC-20-Transferaufruf einen Fehler melden kann:

1. Revert (Rückgängig machen). Wenn ein Aufruf an einen externen Smart Contract rückgängig gemacht wird, ist der boolesche Rückgabewert `false`
2. Normal beenden, aber einen Fehler melden. In diesem Fall hat der Rückgabewert-Puffer eine Länge ungleich Null, und wenn er als boolescher Wert decodiert wird, ist er `false`

Wenn eine dieser Bedingungen eintritt, machen Sie den Vorgang rückgängig (revert).

#### Ereignisse (Events) {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Diese beiden Ereignisse werden ausgelöst, wenn ein Liquiditätsanbieter entweder Liquidität einzahlt (`Mint`) oder abhebt (`Burn`). In beiden Fällen sind die Beträge von token0 und token1, die eingezahlt oder abgehoben werden, Teil des Ereignisses, ebenso wie die Identität des Kontos, das uns aufgerufen hat (`sender`). Im Falle einer Abhebung enthält das Ereignis auch das Ziel, das die Token erhalten hat (`to`), was möglicherweise nicht mit dem Absender identisch ist.

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

Dieses Ereignis wird ausgelöst, wenn ein Händler einen Token gegen den anderen tauscht. Auch hier sind Absender und Ziel möglicherweise nicht identisch.
Jeder Token kann entweder an die Börse gesendet oder von ihr empfangen werden.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Schließlich wird `Sync` jedes Mal ausgelöst, wenn Token hinzugefügt oder abgehoben werden, unabhängig vom Grund, um die neuesten Reserveinformationen (und damit den Wechselkurs) bereitzustellen.

#### Setup-Funktionen {#pair-setup}

Diese Funktionen sollen einmal aufgerufen werden, wenn die neue Paar-Börse eingerichtet wird.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Der Konstruktor stellt sicher, dass wir die Adresse der Factory, die das Paar erstellt hat, im Auge behalten. Diese Information wird für `initialize` und für die Factory-Gebühr (falls vorhanden) benötigt.

```solidity
    // wird einmalig von der Factory zum Zeitpunkt der Bereitstellung aufgerufen
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // ausreichende Prüfung
        token0 = _token0;
        token1 = _token1;
    }
```

Diese Funktion ermöglicht es der Factory (und nur der Factory), die beiden ERC-20-Token anzugeben, die dieses Paar tauschen wird.

#### Interne Update-Funktionen {#pair-update-internal}

##### \_update

```solidity
    // aktualisiert Reserven und, beim ersten Aufruf pro Block, Preisakkumulatoren
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Diese Funktion wird jedes Mal aufgerufen, wenn Token eingezahlt oder abgehoben werden.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Wenn entweder balance0 oder balance1 (uint256) höher als uint112(-1) (=2^112-1) ist (sodass es überläuft und bei der Konvertierung in uint112 wieder auf 0 zurückspringt), weigern Sie sich, das \_update fortzusetzen, um Überläufe zu verhindern. Bei einem normalen Token, der in 10^18 Einheiten unterteilt werden kann, bedeutet dies, dass jeder Tausch auf etwa 5,1\*10^15 jedes Tokens begrenzt ist. Bisher war das kein Problem.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // Überlauf ist erwünscht
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Wenn die verstrichene Zeit nicht null ist, bedeutet dies, dass wir die erste Tausch-Transaktion in diesem Block sind. In diesem Fall müssen wir die Kostenakkumulatoren aktualisieren.

```solidity
            // * läuft nie über, und + Überlauf ist erwünscht
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Jeder Kostenakkumulator wird mit den neuesten Kosten (Reserve des anderen Tokens/Reserve dieses Tokens) multipliziert mit der verstrichenen Zeit in Sekunden aktualisiert. Um einen Durchschnittspreis zu erhalten, lesen Sie den kumulierten Preis zu zwei Zeitpunkten ab und dividieren ihn durch die Zeitdifferenz zwischen ihnen. Nehmen wir zum Beispiel diese Abfolge von Ereignissen an:

| Ereignis                                                 |  reserve0 |  reserve1 | Zeitstempel | Marginaler Wechselkurs (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| Initiale Einrichtung                                     | 1,000.000 | 1,000.000 | 5,000     |                                        1.000 |                          0 |
| Händler A zahlt 50 token0 ein und erhält 47.619 token1 zurück  | 1,050.000 |   952.381 | 5,020     |                                        0.907 |                         20 |
| Händler B zahlt 10 token0 ein und erhält 8.984 token1 zurück   | 1,060.000 |   943.396 | 5,030     |                                        0.890 |       20+10\*0.907 = 29.07 |
| Händler C zahlt 40 token0 ein und erhält 34.305 token1 zurück  | 1,100.000 |   909.090 | 5,100     |                                        0.826 |    29.07+70\*0.890 = 91.37 |
| Händler D zahlt 100 token1 ein und erhält 109.01 token0 zurück |   990.990 | 1,009.090 | 5,110     |                                        1.018 |    91.37+10\*0.826 = 99.63 |
| Händler E zahlt 10 token0 ein und erhält 10.079 token1 zurück  | 1,000.990 |   999.010 | 5,150     |                                        0.998 | 99.63+40\*1.1018 = 143.702 |

Nehmen wir an, wir möchten den Durchschnittspreis von **Token0** zwischen den Zeitstempeln 5.030 und 5.150 berechnen. Die Differenz im Wert von `price0Cumulative` beträgt 143.702-29.07=114.632. Dies ist der Durchschnitt über zwei Minuten (120 Sekunden). Der Durchschnittspreis beträgt also 114.632/120 = 0.955.

Diese Preisberechnung ist der Grund, warum wir die alten Reservegrößen kennen müssen.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Aktualisieren Sie schließlich die globalen Variablen und lösen Sie ein `Sync`-Ereignis aus.

##### \_mintFee

```solidity
    // wenn die Gebühr aktiviert ist, Prägen von Liquidität entsprechend 1/6 des Wachstums von sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

In Uniswap 2.0 zahlen Händler eine Gebühr von 0,30 %, um den Markt zu nutzen. Der Großteil dieser Gebühr (0,25 % des Trades) geht immer an die Liquiditätsanbieter. Die restlichen 0,05 % können entweder an die Liquiditätsanbieter oder an eine von der Factory als Protokollgebühr angegebene Adresse gehen, die Uniswap für ihren Entwicklungsaufwand bezahlt.

Um Berechnungen (und damit Gaskosten) zu reduzieren, wird diese Gebühr nur berechnet, wenn Liquidität zum Pool hinzugefügt oder daraus entfernt wird, und nicht bei jeder Transaktion.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Lesen Sie das Gebührenziel der Factory. Wenn es null ist, gibt es keine Protokollgebühr und es ist nicht nötig, diese Gebühr zu berechnen.

```solidity
        uint _kLast = kLast; // Gaseinsparungen
```

Die Zustandsvariable `kLast` befindet sich im Speicher (Storage), sodass sie zwischen verschiedenen Aufrufen des Smart Contracts einen Wert hat.
Der Zugriff auf den Speicher (Storage) ist viel teurer als der Zugriff auf den flüchtigen Speicher (Memory), der freigegeben wird, wenn der Funktionsaufruf an den Smart Contract endet, daher verwenden wir eine interne Variable, um Gas zu sparen.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Die Liquiditätsanbieter erhalten ihren Anteil einfach durch die Wertsteigerung ihrer Liquiditäts-Token. Die Protokollgebühr erfordert jedoch, dass neue Liquiditäts-Token geprägt und an die Adresse `feeTo` bereitgestellt werden.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Wenn es neue Liquidität gibt, auf die eine Protokollgebühr erhoben werden kann. Sie können die Quadratwurzelfunktion [später in diesem Artikel](#Math) sehen.

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Diese komplizierte Berechnung der Gebühren wird im [Whitepaper](https://app.uniswap.org/whitepaper.pdf) auf Seite 5 erklärt. Wir wissen, dass zwischen dem Zeitpunkt, an dem `kLast` berechnet wurde, und der Gegenwart keine Liquidität hinzugefügt oder entfernt wurde (da wir diese Berechnung jedes Mal durchführen, wenn Liquidität hinzugefügt oder entfernt wird, bevor sie sich tatsächlich ändert), sodass jede Änderung in `reserve0 * reserve1` aus Transaktionsgebühren stammen muss (ohne sie würden wir `reserve0 * reserve1` konstant halten).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Verwenden Sie die Funktion `UniswapV2ERC20._mint`, um die zusätzlichen Liquiditäts-Token tatsächlich zu erstellen und sie `feeTo` zuzuweisen.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Wenn keine Gebühr festgelegt ist, setzen Sie `kLast` auf null (falls es das nicht schon ist). Als dieser Smart Contract geschrieben wurde, gab es eine [Gas-Rückerstattungsfunktion](https://eips.ethereum.org/EIPS/eip-3298), die Smart Contracts dazu ermutigte, die Gesamtgröße des Ethereum-Zustands zu reduzieren, indem sie Speicher nullten, den sie nicht benötigten.
Dieser Code erhält diese Rückerstattung, wenn möglich.

#### Von außen zugängliche Funktionen {#pair-external}

Beachten Sie, dass zwar jede Transaktion oder jeder Smart Contract diese Funktionen aufrufen _kann_, sie jedoch so konzipiert sind, dass sie vom Peripherie-Vertrag aufgerufen werden. Wenn Sie sie direkt aufrufen, können Sie die Paar-Börse nicht betrügen, aber Sie könnten durch einen Fehler Wert verlieren.

##### mint

```solidity
    // diese Low-Level-Funktion sollte von einem Vertrag aufgerufen werden, der wichtige Sicherheitsprüfungen durchführt
    function mint(address to) external lock returns (uint liquidity) {
```

Diese Funktion wird aufgerufen, wenn ein Liquiditätsanbieter dem Pool Liquidität hinzufügt. Sie prägt zusätzliche Liquiditäts-Token als Belohnung. Sie sollte von [einem Peripherie-Vertrag](#UniswapV2Router02) aufgerufen werden, der sie nach dem Hinzufügen der Liquidität in derselben Transaktion aufruft (sodass niemand sonst eine Transaktion einreichen könnte, die die neue Liquidität vor dem rechtmäßigen Eigentümer beansprucht).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaseinsparungen
```

Dies ist die Art und Weise, die Ergebnisse einer Solidity-Funktion zu lesen, die mehrere Werte zurückgibt. Wir verwerfen den letzten zurückgegebenen Wert, den Block-Zeitstempel, da wir ihn nicht benötigen.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Holen Sie sich die aktuellen Salden und sehen Sie, wie viel von jedem Token-Typ hinzugefügt wurde.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Berechnen Sie die zu erhebenden Protokollgebühren, falls vorhanden, und prägen Sie entsprechend Liquiditäts-Token. Da die Parameter für `_mintFee` die alten Reservewerte sind, wird die Gebühr genau berechnet, basierend nur auf Pool-Änderungen aufgrund von Gebühren.

```solidity
        uint _totalSupply = totalSupply; // Gaseinsparungen, muss hier definiert werden, da totalSupply in _mintFee aktualisiert werden kann
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // sperrt dauerhaft die ersten MINIMUM_LIQUIDITY Token
```

Wenn dies die erste Einzahlung ist, erstellen Sie `MINIMUM_LIQUIDITY`-Token und senden Sie sie an die Adresse Null, um sie zu sperren. Sie können niemals eingelöst werden, was bedeutet, dass der Pool niemals vollständig geleert wird (dies bewahrt uns an einigen Stellen vor einer Division durch Null). Der Wert von `MINIMUM_LIQUIDITY` ist eintausend, was in Anbetracht der Tatsache, dass die meisten ERC-20 in Einheiten von 10^-18 eines Tokens unterteilt sind, so wie ETH in Wei unterteilt ist, 10^-15 des Wertes eines einzelnen Tokens entspricht. Keine hohen Kosten.

Zum Zeitpunkt der ersten Einzahlung kennen wir den relativen Wert der beiden Token nicht, also multiplizieren wir einfach die Beträge und ziehen eine Quadratwurzel, in der Annahme, dass die Einzahlung uns in beiden Token den gleichen Wert liefert.

Wir können darauf vertrauen, da es im Interesse des Einzahlers liegt, den gleichen Wert bereitzustellen, um keinen Wert durch Arbitrage zu verlieren.
Nehmen wir an, der Wert der beiden Token ist identisch, aber unser Einzahler hat viermal so viele **Token1** wie **Token0** eingezahlt. Ein Händler kann die Tatsache nutzen, dass die Paar-Börse denkt, dass **Token0** wertvoller ist, um Wert daraus zu extrahieren.

| Ereignis                                                     | reserve0 | reserve1 | reserve0 \* reserve1 | Wert des Pools (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| Initiale Einrichtung                                                |        8 |       32 |                  256 |                                      40 |
| Händler zahlt 8 **Token0**-Token ein, erhält 16 **Token1** zurück |       16 |       16 |                  256 |                                      32 |

Wie Sie sehen können, hat der Händler zusätzliche 8 Token verdient, die aus einer Verringerung des Wertes des Pools stammen, was dem Einzahler schadet, dem er gehört.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Bei jeder nachfolgenden Einzahlung kennen wir bereits den Wechselkurs zwischen den beiden Vermögenswerten und erwarten, dass Liquiditätsanbieter in beiden den gleichen Wert bereitstellen. Wenn sie dies nicht tun, geben wir ihnen als Strafe Liquiditäts-Token basierend auf dem geringeren Wert, den sie bereitgestellt haben.

Unabhängig davon, ob es sich um die erste Einzahlung oder eine nachfolgende handelt, entspricht die Anzahl der von uns bereitgestellten Liquiditäts-Token der Quadratwurzel der Änderung in `reserve0*reserve1` und der Wert des Liquiditäts-Tokens ändert sich nicht (es sei denn, wir erhalten eine Einzahlung, die nicht gleiche Werte beider Typen aufweist, in welchem Fall die „Strafe“ verteilt wird). Hier ist ein weiteres Beispiel mit zwei Token, die den gleichen Wert haben, mit drei guten Einzahlungen und einer schlechten (Einzahlung von nur einem Token-Typ, sodass keine Liquiditäts-Token produziert werden).

| Ereignis                  | reserve0 | reserve1 | reserve0 \* reserve1 | Pool-Wert (reserve0 + reserve1) | Für diese Einzahlung geprägte Liquiditäts-Token | Gesamte Liquiditäts-Token | Wert jedes Liquiditäts-Tokens |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| Initiale Einrichtung             |    8.000 |    8.000 |                   64 |                           16.000 |                                        8 |                      8 |                         2.000 |
| Einzahlung von vier jedes Typs |   12.000 |   12.000 |                  144 |                           24.000 |                                        4 |                     12 |                         2.000 |
| Einzahlung von zwei jedes Typs  |   14.000 |   14.000 |                  196 |                           28.000 |                                        2 |                     14 |                         2.000 |
| Einzahlung mit ungleichem Wert     |   18.000 |   14.000 |                  252 |                           32.000 |                                        0 |                     14 |                        ~2.286 |
| Nach Arbitrage           |  ~15.874 |  ~15.874 |                  252 |                          ~31.748 |                                        0 |                     14 |                        ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Verwenden Sie die Funktion `UniswapV2ERC20._mint`, um die zusätzlichen Liquiditäts-Token tatsächlich zu erstellen und sie dem richtigen Konto zu geben.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 und reserve1 sind aktuell
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aktualisieren Sie die Zustandsvariablen (`reserve0`, `reserve1` und bei Bedarf `kLast`) und lösen Sie das entsprechende Ereignis aus.

##### burn

```solidity
    // diese Low-Level-Funktion sollte von einem Vertrag aufgerufen werden, der wichtige Sicherheitsprüfungen durchführt
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Diese Funktion wird aufgerufen, wenn Liquidität abgehoben wird und die entsprechenden Liquiditäts-Token verbrannt werden müssen.
Sie sollte ebenfalls [von einem Peripherie-Konto](#UniswapV2Router02) aufgerufen werden.

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaseinsparungen
        address _token0 = token0; // Gaseinsparungen
        address _token1 = token1; // Gaseinsparungen
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Der Peripherie-Vertrag hat die zu verbrennende Liquidität vor dem Aufruf an diesen Smart Contract übertragen. Auf diese Weise wissen wir, wie viel Liquidität verbrannt werden muss, und wir können sicherstellen, dass sie verbrannt wird.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // Gaseinsparungen, muss hier definiert werden, da totalSupply in _mintFee aktualisiert werden kann
        amount0 = liquidity.mul(balance0) / _totalSupply; // die Verwendung von Salden stellt eine anteilige Verteilung sicher
        amount1 = liquidity.mul(balance1) / _totalSupply; // die Verwendung von Salden stellt eine anteilige Verteilung sicher
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Der Liquiditätsanbieter erhält den gleichen Wert beider Token. Auf diese Weise ändern wir den Wechselkurs nicht.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 und reserve1 sind aktuell
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Der Rest der `burn`-Funktion ist das Spiegelbild der obigen `mint`-Funktion.

##### swap

```solidity
    // diese Low-Level-Funktion sollte von einem Vertrag aufgerufen werden, der wichtige Sicherheitsprüfungen durchführt
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Diese Funktion soll ebenfalls von [einem Peripherie-Vertrag](#UniswapV2Router02) aufgerufen werden.

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // Gaseinsparungen
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // Gültigkeitsbereich für _token{0,1}, vermeidet 'Stack too deep'-Fehler
```

Lokale Variablen können entweder im Speicher (Memory) oder, wenn es nicht zu viele davon gibt, direkt auf dem Stack gespeichert werden.
Wenn wir die Anzahl begrenzen können, sodass wir den Stack verwenden, verbrauchen wir weniger Gas. Weitere Details finden Sie im [Yellow Paper, den formalen Ethereum-Spezifikationen](https://ethereum.github.io/yellowpaper/paper.pdf), S. 26, Gleichung 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // überträgt Token optimistisch
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // überträgt Token optimistisch
```

Dieser Transfer ist optimistisch, da wir übertragen, bevor wir sicher sind, dass alle Bedingungen erfüllt sind. Dies ist in Ethereum in Ordnung, denn wenn die Bedingungen später im Aufruf nicht erfüllt sind, machen wir ihn rückgängig (revert) und alle dadurch verursachten Änderungen werden verworfen.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informieren Sie den Empfänger auf Anfrage über den Tausch.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Holen Sie sich die aktuellen Salden. Der Peripherie-Vertrag sendet uns die Token, bevor er uns für den Tausch aufruft. Dies macht es für den Smart Contract einfach zu überprüfen, dass er nicht betrogen wird, eine Überprüfung, die im Kernvertrag stattfinden _muss_ (da wir von anderen Entitäten als unserem Peripherie-Vertrag aufgerufen werden können).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // Gültigkeitsbereich für reserve{0,1}Adjusted, vermeidet 'Stack too deep'-Fehler
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Dies ist eine Plausibilitätsprüfung (Sanity Check), um sicherzustellen, dass wir durch den Tausch nicht verlieren. Es gibt keinen Umstand, unter dem ein Tausch `reserve0*reserve1` reduzieren sollte. Hier stellen wir auch sicher, dass eine Gebühr von 0,3 % auf den Tausch erhoben wird; bevor wir den Wert von K auf Plausibilität prüfen, multiplizieren wir beide Salden mit 1000 abzüglich der mit 3 multiplizierten Beträge, was bedeutet, dass 0,3 % (3/1000 = 0,003 = 0,3 %) vom Saldo abgezogen werden, bevor sein K-Wert mit dem K-Wert der aktuellen Reserven verglichen wird.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aktualisieren Sie `reserve0` und `reserve1` und bei Bedarf die Preisakkumulatoren und den Zeitstempel und lösen Sie ein Ereignis aus.

##### Sync oder Skim

Es ist möglich, dass die tatsächlichen Salden nicht mehr mit den Reserven synchron sind, von denen die Paar-Börse glaubt, dass sie sie hat.
Es gibt keine Möglichkeit, Token ohne die Zustimmung des Smart Contracts abzuheben, aber Einzahlungen sind eine andere Sache. Ein Konto kann Token an die Börse übertragen, ohne entweder `mint` oder `swap` aufzurufen.

In diesem Fall gibt es zwei Lösungen:

- `sync`, aktualisieren Sie die Reserven auf die aktuellen Salden
- `skim`, heben Sie den zusätzlichen Betrag ab. Beachten Sie, dass jedes Konto `skim` aufrufen darf, da wir nicht wissen, wer die Token eingezahlt hat. Diese Information wird in einem Ereignis ausgegeben, aber Ereignisse sind von der Blockchain aus nicht zugänglich.

```solidity
    // erzwingt, dass Salden den Reserven entsprechen
    function skim(address to) external lock {
        address _token0 = token0; // Gaseinsparungen
        address _token1 = token1; // Gaseinsparungen
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // erzwingt, dass Reserven den Salden entsprechen
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Dieser Smart Contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) erstellt die Paar-Börsen.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Diese Zustandsvariablen sind notwendig, um die Protokollgebühr zu implementieren (siehe [das Whitepaper](https://app.uniswap.org/whitepaper.pdf), S. 5).
Die Adresse `feeTo` sammelt die Liquiditäts-Token für die Protokollgebühr an, und `feeToSetter` ist die Adresse, die `feeTo` in eine andere Adresse ändern darf.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Diese Variablen verfolgen die Paare, die Tauschbörsen zwischen zwei Token-Typen.

Die erste, `getPair`, ist ein Mapping, das einen Paar-Börsen-Vertrag basierend auf den beiden ERC-20-Token identifiziert, die er tauscht. ERC-20-Token werden durch die Adressen der Smart Contracts identifiziert, die sie implementieren, sodass die Schlüssel und der Wert alle Adressen sind. Um die Adresse der Paar-Börse zu erhalten, mit der Sie von `tokenA` in `tokenB` konvertieren können, verwenden Sie `getPair[<tokenA address>][<tokenB address>]` (oder umgekehrt).

Die zweite Variable, `allPairs`, ist ein Array, das alle Adressen von Paar-Börsen enthält, die von dieser Factory erstellt wurden. In Ethereum können Sie nicht über den Inhalt eines Mappings iterieren oder eine Liste aller Schlüssel erhalten, daher ist diese Variable die einzige Möglichkeit zu wissen, welche Börsen diese Factory verwaltet.

Hinweis: Der Grund, warum Sie nicht über alle Schlüssel eines Mappings iterieren können, ist, dass die Datenspeicherung von Smart Contracts _teuer_ ist. Je weniger wir davon verwenden, desto besser, und je seltener wir sie ändern, desto besser. Sie können [Mappings erstellen, die Iteration unterstützen](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), aber sie erfordern zusätzlichen Speicherplatz für eine Liste von Schlüsseln. In den meisten Anwendungen benötigen Sie das nicht.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Dieses Ereignis wird ausgelöst, wenn eine neue Paar-Börse erstellt wird. Es enthält die Adressen der Token, die Adresse der Paar-Börse und die Gesamtzahl der von der Factory verwalteten Börsen.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Das Einzige, was der Konstruktor tut, ist die Angabe des `feeToSetter`. Factories starten ohne Gebühr, und nur `feeSetter` kann das ändern.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Diese Funktion gibt die Anzahl der Tauschpaare zurück.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Dies ist die Hauptfunktion der Factory, um eine Paar-Börse zwischen zwei ERC-20-Token zu erstellen. Beachten Sie, dass jeder diese Funktion aufrufen kann. Sie benötigen keine Erlaubnis von Uniswap, um eine neue Paar-Börse zu erstellen.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Wir möchten, dass die Adresse der neuen Börse deterministisch ist, damit sie im Voraus Off-Chain berechnet werden kann (dies kann für [Ebene 2-Transaktionen](/developers/docs/scaling/) nützlich sein).
Dazu müssen wir eine konsistente Reihenfolge der Token-Adressen haben, unabhängig von der Reihenfolge, in der wir sie erhalten haben, also sortieren wir sie hier.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // eine einzige Prüfung ist ausreichend
```

Große Liquiditätspools sind besser als kleine, da sie stabilere Preise haben. Wir möchten nicht mehr als einen einzigen Liquiditätspool pro Token-Paar haben. Wenn es bereits eine Börse gibt, besteht keine Notwendigkeit, eine weitere für dasselbe Paar zu erstellen.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Um einen neuen Smart Contract zu erstellen, benötigen wir den Code, der ihn erstellt (sowohl die Konstruktorfunktion als auch den Code, der den EVM-Bytecode des eigentlichen Smart Contracts in den Speicher schreibt). Normalerweise verwenden wir in Solidity einfach `addr = new <name of contract>(<constructor parameters>)` und der Compiler kümmert sich um alles für uns, aber um eine deterministische Vertragsadresse zu haben, müssen wir [den CREATE2-Opcode](https://eips.ethereum.org/EIPS/eip-1014) verwenden.
Als dieser Code geschrieben wurde, wurde dieser Opcode noch nicht von Solidity unterstützt, daher war es notwendig, den Code manuell abzurufen. Dies ist kein Problem mehr, da [Solidity jetzt CREATE2 unterstützt](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Wenn ein Opcode von Solidity noch nicht unterstützt wird, können wir ihn über [Inline-Assembly](https://docs.soliditylang.org/en/v0.8.3/assembly.html) aufrufen.

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Rufen Sie die Funktion `initialize` auf, um der neuen Börse mitzuteilen, welche beiden Token sie tauscht.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // füllt das Mapping in umgekehrter Richtung
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Speichern Sie die neuen Paar-Informationen in den Zustandsvariablen und lösen Sie ein Ereignis aus, um die Welt über die neue Paar-Börse zu informieren.

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

Diese beiden Funktionen ermöglichen es `feeSetter`, den Gebührenempfänger (falls vorhanden) zu steuern und `feeSetter` auf eine neue Adresse zu ändern.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Dieser Smart Contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementiert den ERC-20-Liquiditäts-Token. Er ähnelt dem [OpenZeppelin ERC-20-Vertrag](/developers/tutorials/erc20-annotated-code), daher werde ich nur den Teil erklären, der anders ist, die `permit`-Funktionalität.

Transaktionen auf Ethereum kosten Ether (ETH), was echtem Geld entspricht. Wenn Sie ERC-20-Token, aber kein ETH haben, können Sie keine Transaktionen senden, also können Sie nichts damit anfangen. Eine Lösung zur Vermeidung dieses Problems sind [Meta-Transaktionen](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Der Eigentümer der Token signiert eine Transaktion, die es jemand anderem ermöglicht, Token Off-Chain abzuheben, und sendet sie über das Internet an den Empfänger. Der Empfänger, der über ETH verfügt, reicht dann die Erlaubnis (Permit) im Namen des Eigentümers ein.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Dieser Hash ist der [Identifikator für den Transaktionstyp](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Der einzige, den wir hier unterstützen, ist `Permit` mit diesen Parametern.

```solidity
    mapping(address => uint) public nonces;
```

Es ist für einen Empfänger nicht machbar, eine digitale Signatur zu fälschen. Es ist jedoch trivial, dieselbe Transaktion zweimal zu senden (dies ist eine Form des [Replay-Angriffs](https://wikipedia.org/wiki/Replay_attack)). Um dies zu verhindern, verwenden wir eine [Nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Wenn die Nonce eines neuen `Permit` nicht um eins höher ist als die zuletzt verwendete, gehen wir davon aus, dass sie ungültig ist.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Dies ist der Code zum Abrufen des [Chain-Identifikators](https://chainid.network/). Er verwendet einen EVM-Assembly-Dialekt namens [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Beachten Sie, dass Sie in der aktuellen Version von Yul `chainid()` verwenden müssen, nicht `chainid`.

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

Berechnen Sie den [Domain-Separator](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) für EIP-712.

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

`abi.encodePacked(...)` ist die Nachricht, die wir erwarten. Wir wissen, wie die Nonce lauten sollte, daher ist es nicht nötig, sie als Parameter zu erhalten.

Der Ethereum-Signaturalgorithmus erwartet 256 Bit zum Signieren, daher verwenden wir die Hash-Funktion `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Aus dem Digest und der Signatur können wir die Adresse ermitteln, die sie signiert hat, indem wir [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/) verwenden.

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Wenn alles in Ordnung ist, behandeln Sie dies als [ein ERC-20-Approve](https://eips.ethereum.org/EIPS/eip-20#approve).

## Die Peripherie-Verträge {#periphery-contracts}

Die Peripherie-Verträge sind die API (Application Programming Interface) für Uniswap. Sie stehen für externe Aufrufe zur Verfügung, entweder von anderen Verträgen oder dezentralisierten Anwendungen. Sie könnten die Kernverträge direkt aufrufen, aber das ist komplizierter und Sie könnten Werte verlieren, wenn Sie einen Fehler machen. Die Kernverträge enthalten nur Tests, um sicherzustellen, dass sie nicht betrogen werden, keine Plausibilitätsprüfungen für andere. Diese befinden sich in der Peripherie, damit sie bei Bedarf aktualisiert werden können.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Dieser Vertrag](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) hat Probleme und [sollte nicht mehr verwendet werden](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Glücklicherweise sind die Peripherie-Verträge zustandslos und halten keine Vermögenswerte, sodass es einfach ist, ihn als veraltet zu markieren und den Leuten vorzuschlagen, stattdessen den Ersatz, `UniswapV2Router02`, zu verwenden.

### UniswapV2Router02.sol {#UniswapV2Router02}

In den meisten Fällen würden Sie Uniswap über [diesen Vertrag](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol) nutzen.
Wie man ihn verwendet, können Sie [hier](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) sehen.

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

Den meisten davon sind wir entweder schon begegnet oder sie sind ziemlich offensichtlich. Die einzige Ausnahme ist `IWETH.sol`. Uniswap v2 ermöglicht den Austausch für jedes Paar von ERC-20-Token, aber Ether (ETH) selbst ist kein ERC-20-Token. Es ist älter als der Standard und wird durch einzigartige Mechanismen übertragen. Um die Verwendung von ETH in Verträgen zu ermöglichen, die für ERC-20-Token gelten, haben sich die Leute den [Wrapped Ether (WETH)](https://weth.tkn.eth.limo/)-Vertrag ausgedacht. Sie senden diesem Vertrag ETH, und er prägt Ihnen eine entsprechende Menge an WETH. Oder Sie können WETH verbrennen und erhalten ETH zurück.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Der Router muss wissen, welche Factory verwendet werden soll, und für Transaktionen, die WETH erfordern, welcher WETH-Vertrag verwendet werden soll. Diese Werte sind [unveränderlich](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), was bedeutet, dass sie nur im Konstruktor festgelegt werden können. Dies gibt den Benutzern die Gewissheit, dass niemand in der Lage wäre, sie so zu ändern, dass sie auf weniger ehrliche Verträge verweisen.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Dieser Modifikator stellt sicher, dass zeitlich begrenzte Transaktionen („mache X vor der Zeit Y, wenn du kannst“) nicht nach ihrem Zeitlimit stattfinden.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Der Konstruktor setzt lediglich die unveränderlichen Zustandsvariablen.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // akzeptiert ETH nur über Fallback vom WETH-Vertrag
    }
```

Diese Funktion wird aufgerufen, wenn wir Token aus dem WETH-Vertrag wieder in ETH einlösen. Nur der von uns verwendete WETH-Vertrag ist dazu berechtigt.

#### Liquidität hinzufügen {#add-liquidity}

Diese Funktionen fügen der Paar-Börse Token hinzu, was den Liquiditätspool vergrößert.

```solidity

    // **** LIQUIDITÄT HINZUFÜGEN ****
    function _addLiquidity(
```

Diese Funktion wird verwendet, um die Menge der A- und B-Token zu berechnen, die in die Paar-Börse eingezahlt werden sollen.

```solidity
        address tokenA,
        address tokenB,
```

Dies sind die Adressen der ERC-20-Token-Verträge.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Dies sind die Beträge, die der Liquiditätsanbieter einzahlen möchte. Sie sind auch die Höchstbeträge von A und B, die eingezahlt werden sollen.

```solidity
        uint amountAMin,
        uint amountBMin
```

Dies sind die akzeptablen Mindestbeträge für die Einzahlung. Wenn die Transaktion nicht mit diesen oder höheren Beträgen stattfinden kann, wird sie rückgängig gemacht. Wenn Sie diese Funktion nicht möchten, geben Sie einfach null an.

Liquiditätsanbieter geben in der Regel ein Minimum an, weil sie die Transaktion auf einen Wechselkurs beschränken wollen, der nahe am aktuellen liegt. Wenn der Wechselkurs zu stark schwankt, könnte das bedeuten, dass Nachrichten die zugrunde liegenden Werte verändern, und sie möchten manuell entscheiden, was zu tun ist.

Stellen Sie sich zum Beispiel einen Fall vor, in dem der Wechselkurs eins zu eins ist und der Liquiditätsanbieter diese Werte angibt:

| Parameter      | Wert |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Solange der Wechselkurs zwischen 0,9 und 1,25 bleibt, findet die Transaktion statt. Wenn der Wechselkurs diesen Bereich verlässt, wird die Transaktion abgebrochen.

Der Grund für diese Vorsichtsmaßnahme ist, dass Transaktionen nicht sofort erfolgen. Sie reichen sie ein und schließlich wird ein Validator sie in einen Block aufnehmen (es sei denn, Ihr Gaspreis ist sehr niedrig. In diesem Fall müssen Sie eine weitere Transaktion mit derselben Nonce und einem höheren Gaspreis einreichen, um sie zu überschreiben). Sie können nicht kontrollieren, was in der Zeit zwischen der Einreichung und der Aufnahme passiert.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Die Funktion gibt die Beträge zurück, die der Liquiditätsanbieter einzahlen sollte, um ein Verhältnis zu haben, das dem aktuellen Verhältnis zwischen den Reserven entspricht.

```solidity
        // erstellt das Paar, falls es noch nicht existiert
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Wenn es noch keine Börse für dieses Token-Paar gibt, erstellen Sie sie.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Rufen Sie die aktuellen Reserven im Paar ab.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Wenn die aktuellen Reserven leer sind, handelt es sich um eine neue Paar-Börse. Die einzuzahlenden Beträge sollten genau denjenigen entsprechen, die der Liquiditätsanbieter bereitstellen möchte.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Wenn wir sehen müssen, wie hoch die Beträge sein werden, erhalten wir den optimalen Betrag mit [dieser Funktion](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Wir wollen das gleiche Verhältnis wie bei den aktuellen Reserven.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Wenn `amountBOptimal` kleiner ist als der Betrag, den der Liquiditätsanbieter einzahlen möchte, bedeutet dies, dass Token B derzeit wertvoller ist, als der Liquiditätseinleger denkt, sodass ein kleinerer Betrag erforderlich ist.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Wenn der optimale B-Betrag größer ist als der gewünschte B-Betrag, bedeutet dies, dass B-Token derzeit weniger wertvoll sind, als der Liquiditätseinleger denkt, sodass ein höherer Betrag erforderlich ist. Der gewünschte Betrag ist jedoch ein Maximum, daher können wir das nicht tun. Stattdessen berechnen wir die optimale Anzahl von A-Token für die gewünschte Menge an B-Token.

Wenn wir alles zusammenfassen, erhalten wir dieses Diagramm. Nehmen wir an, Sie versuchen, tausend A-Token (blaue Linie) und tausend B-Token (rote Linie) einzuzahlen. Die x-Achse ist der Wechselkurs, A/B. Wenn x=1, sind sie gleich viel wert und Sie zahlen von jedem tausend ein. Wenn x=2, ist A doppelt so viel wert wie B (Sie erhalten zwei B-Token für jeden A-Token), also zahlen Sie tausend B-Token ein, aber nur 500 A-Token. Wenn x=0,5, ist die Situation umgekehrt: tausend A-Token und fünfhundert B-Token.

![Diagramm](liquidityProviderDeposit.png)

Sie könnten Liquidität direkt in den Kernvertrag einzahlen (mit [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), aber der Kernvertrag prüft nur, ob er selbst nicht betrogen wird. Sie gehen also das Risiko ein, an Wert zu verlieren, wenn sich der Wechselkurs zwischen dem Zeitpunkt der Einreichung Ihrer Transaktion und dem Zeitpunkt ihrer Ausführung ändert. Wenn Sie den Peripherie-Vertrag verwenden, berechnet er den Betrag, den Sie einzahlen sollten, und zahlt ihn sofort ein, sodass sich der Wechselkurs nicht ändert und Sie nichts verlieren.

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

. `to` ist die Adresse, an die die neuen Liquiditäts-Token geprägt werden, um den Anteil des Liquiditätsanbieters am Pool anzuzeigen
. `deadline` ist ein Zeitlimit für die Transaktion

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Wir berechnen die tatsächlich einzuzahlenden Beträge und ermitteln dann die Adresse des Liquiditätspools. Um Gas zu sparen, tun wir dies nicht, indem wir die Factory abfragen, sondern indem wir die Bibliotheksfunktion `pairFor` verwenden (siehe unten bei den Bibliotheken).

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Übertragen Sie die korrekten Token-Beträge vom Benutzer in die Paar-Börse.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Im Gegenzug erhält die `to`-Adresse Liquiditäts-Token für den teilweisen Besitz des Pools. Die `mint`-Funktion des Kernvertrags sieht, wie viele zusätzliche Token er hat (im Vergleich zu dem, was er beim letzten Mal hatte, als sich die Liquidität änderte) und prägt entsprechend Liquidität.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Wenn ein Liquiditätsanbieter Liquidität für eine Token/ETH-Paar-Börse bereitstellen möchte, gibt es einige Unterschiede. Der Vertrag übernimmt das Wrapping der ETH für den Liquiditätsanbieter. Es ist nicht erforderlich anzugeben, wie viele ETH der Benutzer einzahlen möchte, da der Benutzer sie einfach mit der Transaktion sendet (der Betrag ist in `msg.value` verfügbar).

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

Um die ETH einzuzahlen, verpackt der Vertrag sie zunächst in WETH und überträgt die WETH dann in das Paar. Beachten Sie, dass die Übertragung in ein `assert` verpackt ist. Das bedeutet, dass bei einem Fehlschlagen der Übertragung auch dieser Vertragsaufruf fehlschlägt und das Wrapping daher nicht wirklich stattfindet.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // erstattet Dust-ETH, falls vorhanden
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Der Benutzer hat uns die ETH bereits gesendet. Wenn also etwas übrig bleibt (weil der andere Token weniger wertvoll ist, als der Benutzer dachte), müssen wir eine Rückerstattung veranlassen.

#### Liquidität entfernen {#remove-liquidity}

Diese Funktionen entfernen Liquidität und zahlen den Liquiditätsanbieter aus.

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

Der einfachste Fall der Liquiditätsentfernung. Es gibt einen Mindestbetrag für jeden Token, den der Liquiditätsanbieter zu akzeptieren bereit ist, und dies muss vor Ablauf der Frist geschehen.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // sendet Liquidität an das Paar
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Die `burn`-Funktion des Kernvertrags übernimmt die Rückzahlung der Token an den Benutzer.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Wenn eine Funktion mehrere Werte zurückgibt, wir aber nur an einigen davon interessiert sind, erhalten wir auf diese Weise nur diese Werte. Es ist in Bezug auf Gas etwas günstiger, als einen Wert zu lesen und ihn nie zu verwenden.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Übersetzen Sie die Beträge von der Art und Weise, wie der Kernvertrag sie zurückgibt (Token mit der niedrigeren Adresse zuerst), in die Art und Weise, wie der Benutzer sie erwartet (entsprechend `tokenA` und `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Es ist in Ordnung, zuerst die Übertragung durchzuführen und dann zu überprüfen, ob sie legitim ist, denn wenn dies nicht der Fall ist, machen wir alle Zustandsänderungen rückgängig.

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

Das Entfernen von Liquidität für ETH ist fast dasselbe, außer dass wir die WETH-Token erhalten und sie dann gegen ETH einlösen, um sie dem Liquiditätsanbieter zurückzugeben.

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

Diese Funktionen leiten Meta-Transaktionen weiter, um Benutzern ohne Ether zu ermöglichen, sich aus dem Pool zurückzuziehen, indem sie [den Permit-Mechanismus](#UniswapV2ERC20) verwenden.

```solidity

    // **** LIQUIDITÄT ENTFERNEN (unterstützt Fee-on-Transfer-Token) ****
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

Diese Funktion kann für Token verwendet werden, die Übertragungs- oder Speichergebühren haben. Wenn ein Token solche Gebühren hat, können wir uns nicht darauf verlassen, dass die Funktion `removeLiquidity` uns sagt, wie viel von dem Token wir zurückbekommen. Daher müssen wir zuerst abheben und dann den Kontostand abrufen.

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

#### Handeln {#trade}

```solidity
    // **** SWAP ****
    // setzt voraus, dass der anfängliche Betrag bereits an das erste Paar gesendet wurde
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Diese Funktion führt interne Verarbeitungen durch, die für die Funktionen erforderlich sind, die Händlern zur Verfügung stehen.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Während ich dies schreibe, gibt es [388.160 ERC-20-Token](https://eth.blockscout.com/tokens). Wenn es für jedes Token-Paar eine Paar-Börse gäbe, wären das über 150 Milliarden Paar-Börsen. Die gesamte Chain hat im Moment [nur 0,1 % dieser Anzahl an Konten](https://eth.blockscout.com/stats/accountsGrowth). Stattdessen unterstützen die Swap-Funktionen das Konzept eines Pfades. Ein Händler kann A gegen B, B gegen C und C gegen D tauschen, sodass keine direkte A-D-Paar-Börse erforderlich ist.

Die Preise auf diesen Märkten neigen dazu, synchronisiert zu sein, denn wenn sie nicht synchron sind, entsteht eine Gelegenheit für Arbitrage. Stellen Sie sich zum Beispiel drei Token vor: A, B und C. Es gibt drei Paar-Börsen, eine für jedes Paar.

1. Die Ausgangssituation
2. Ein Händler verkauft 24,695 A-Token und erhält 25,305 B-Token.
3. Der Händler verkauft 24,695 B-Token für 25,305 C-Token und behält etwa 0,61 B-Token als Gewinn.
4. Dann verkauft der Händler 24,695 C-Token für 25,305 A-Token und behält etwa 0,61 C-Token als Gewinn. Der Händler hat außerdem 0,61 zusätzliche A-Token (die 25,305, die der Händler am Ende hat, abzüglich der ursprünglichen Investition von 24,695).

| Schritt | A-B-Börse                   | B-C-Börse                   | A-C-Börse                   |
| ------- | --------------------------- | --------------------------- | --------------------------- |
| 1       | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2       | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3       | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4       | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Rufen Sie das Paar ab, das wir gerade bearbeiten, sortieren Sie es (zur Verwendung mit dem Paar) und rufen Sie den erwarteten Ausgabebetrag ab.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Rufen Sie die erwarteten Ausgabebeträge ab, sortiert so, wie die Paar-Börse sie erwartet.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Ist dies die letzte Börse? Wenn ja, senden Sie die für den Handel erhaltenen Token an das Ziel. Wenn nicht, senden Sie sie an die nächste Paar-Börse.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Rufen Sie tatsächlich die Paar-Börse auf, um die Token zu tauschen. Wir benötigen keinen Callback, um über den Austausch informiert zu werden, daher senden wir keine Bytes in diesem Feld.

```solidity
    function swapExactTokensForTokens(
```

Diese Funktion wird direkt von Händlern verwendet, um einen Token gegen einen anderen zu tauschen.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Dieser Parameter enthält die Adressen der ERC-20-Verträge. Wie oben erklärt, handelt es sich um ein Array, da Sie möglicherweise mehrere Paar-Börsen durchlaufen müssen, um von dem Vermögenswert, den Sie haben, zu dem Vermögenswert zu gelangen, den Sie möchten.

Ein Funktionsparameter in Solidity kann entweder im `memory` oder in den `calldata` gespeichert werden. Wenn die Funktion ein Einstiegspunkt in den Vertrag ist, der direkt von einem Benutzer (über eine Transaktion) oder von einem anderen Vertrag aufgerufen wird, kann der Wert des Parameters direkt aus den Aufrufdaten entnommen werden. Wenn die Funktion intern aufgerufen wird, wie `_swap` oben, müssen die Parameter im `memory` gespeichert werden. Aus der Perspektive des aufgerufenen Vertrags sind `calldata` schreibgeschützt.

Bei skalaren Typen wie `uint` oder `address` übernimmt der Compiler die Wahl des Speichers für uns, aber bei Arrays, die länger und teurer sind, geben wir die Art des zu verwendenden Speichers an.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Rückgabewerte werden immer im Memory zurückgegeben.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Berechnen Sie den Betrag, der bei jedem Swap gekauft werden soll. Wenn das Ergebnis geringer ist als das Minimum, das der Händler zu akzeptieren bereit ist, machen Sie die Transaktion rückgängig.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Übertragen Sie schließlich den anfänglichen ERC-20-Token auf das Konto für die erste Paar-Börse und rufen Sie `_swap` auf. Dies geschieht alles in derselben Transaktion, sodass die Paar-Börse weiß, dass alle unerwarteten Token Teil dieser Übertragung sind.

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

Die vorherige Funktion, `swapTokensForTokens`, ermöglicht es einem Händler, eine genaue Anzahl von Eingabe-Token anzugeben, die er zu geben bereit ist, und die Mindestanzahl von Ausgabe-Token, die er im Gegenzug zu erhalten bereit ist. Diese Funktion führt den umgekehrten Swap durch: Sie lässt einen Händler die Anzahl der gewünschten Ausgabe-Token und die maximale Anzahl der Eingabe-Token angeben, die er dafür zu zahlen bereit ist.

In beiden Fällen muss der Händler diesem Peripherie-Vertrag zunächst eine Freigabe (Allowance) erteilen, damit dieser sie übertragen darf.

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
        // erstattet Dust-ETH, falls vorhanden
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Diese vier Varianten beinhalten alle den Handel zwischen ETH und Token. Der einzige Unterschied besteht darin, dass wir entweder ETH vom Händler erhalten und diese verwenden, um WETH zu prägen, oder wir erhalten WETH von der letzten Börse im Pfad und verbrennen sie, wobei wir dem Händler die resultierenden ETH zurücksenden.

```solidity
    // **** SWAP (unterstützt Fee-on-Transfer-Token) ****
    // setzt voraus, dass der anfängliche Betrag bereits an das erste Paar gesendet wurde
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Dies ist die interne Funktion zum Tauschen von Token, die Übertragungs- oder Speichergebühren haben, um ([dieses Problem](https://github.com/Uniswap/uniswap-interface/issues/835)) zu lösen.

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // Gültigkeitsbereich, um 'Stack too deep'-Fehler zu vermeiden
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Aufgrund der Übertragungsgebühren können wir uns nicht auf die Funktion `getAmountsOut` verlassen, um uns mitzuteilen, wie viel wir aus jeder Übertragung herausbekommen (so wie wir es vor dem Aufruf des ursprünglichen `_swap` tun). Stattdessen müssen wir zuerst übertragen und dann sehen, wie viele Token wir zurückbekommen haben.

Hinweis: Theoretisch könnten wir einfach diese Funktion anstelle von `_swap` verwenden, aber in bestimmten Fällen (zum Beispiel, wenn die Übertragung am Ende rückgängig gemacht wird, weil am Ende nicht genug vorhanden ist, um das erforderliche Minimum zu erreichen) würde das am Ende mehr Gas kosten. Token mit Übertragungsgebühren sind ziemlich selten. Obwohl wir sie also berücksichtigen müssen, besteht keine Notwendigkeit, bei allen Swaps davon auszugehen, dass sie mindestens einen davon durchlaufen.

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

Dies sind die gleichen Varianten, die für normale Token verwendet werden, aber sie rufen stattdessen `_swapSupportingFeeOnTransferTokens` auf.

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

Dieser Vertrag wurde verwendet, um Börsen von der alten v1 auf v2 zu migrieren. Da sie nun migriert wurden, ist er nicht mehr relevant.

## Die Bibliotheken {#libraries}

Die [SafeMath-Bibliothek](https://docs.openzeppelin.com/contracts/2.x/api/math) ist gut dokumentiert, daher muss sie hier nicht weiter erläutert werden.

### Math {#Math}

Diese Bibliothek enthält einige mathematische Funktionen, die normalerweise in Solidity-Code nicht benötigt werden, weshalb sie nicht Teil der Sprache sind.

```solidity
pragma solidity =0.5.16;

// eine Bibliothek zur Durchführung verschiedener mathematischer Operationen

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonisches Verfahren (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Beginnen Sie mit x als Schätzwert, der höher als die Quadratwurzel ist (das ist der Grund, warum wir 1-3 als Sonderfälle behandeln müssen).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Ermitteln Sie einen genaueren Schätzwert, den Durchschnitt aus dem vorherigen Schätzwert und der Zahl, deren Quadratwurzel wir suchen, geteilt durch den vorherigen Schätzwert. Wiederholen Sie dies, bis der neue Schätzwert nicht mehr niedriger als der bestehende ist. Weitere Details [finden Sie hier](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Wir sollten niemals die Quadratwurzel von null benötigen. Die Quadratwurzeln von eins, zwei und drei sind ungefähr eins (wir verwenden Ganzzahlen, ignorieren also den Bruchteil).

```solidity
        }
    }
}
```

### Festkommabrüche (UQ112x112) {#FixedPoint}

Diese Bibliothek verarbeitet Brüche, die normalerweise nicht Teil der Ethereum-Arithmetik sind. Sie tut dies, indem sie die Zahl _x_ als _x\*2^112_ kodiert. Dadurch können wir die ursprünglichen Additions- und Subtraktions-Opcodes ohne Änderung verwenden.

```solidity
pragma solidity =0.5.16;

// eine Bibliothek zur Handhabung binärer Festkommazahlen (https://wikipedia.org/wiki/Q_(number_format))

// Bereich: [0, 2**112 - 1]
// Auflösung: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` ist die Kodierung für eins.

```solidity
    // kodiert einen uint112 als UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // läuft nie über
    }
```

Da y `uint112` ist, kann es höchstens 2^112-1 sein. Diese Zahl kann immer noch als `UQ112x112` kodiert werden.

```solidity
    // dividiert einen UQ112x112 durch einen uint112 und gibt einen UQ112x112 zurück
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Wenn wir zwei `UQ112x112`-Werte dividieren, wird das Ergebnis nicht mehr mit 2^112 multipliziert. Stattdessen nehmen wir also eine Ganzzahl für den Nenner. Wir hätten einen ähnlichen Trick für die Multiplikation anwenden müssen, aber wir müssen keine Multiplikation von `UQ112x112`-Werten durchführen.

### UniswapV2Library {#uniswapV2library}

Diese Bibliothek wird nur von den Peripherie-Verträgen verwendet

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // gibt sortierte Token-Adressen zurück, wird verwendet, um Rückgabewerte von in dieser Reihenfolge sortierten Paaren zu verarbeiten
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Sortieren Sie die beiden Token nach Adresse, damit wir die Adresse der Paar-Börse für sie erhalten können. Dies ist notwendig, da wir sonst zwei Möglichkeiten hätten, eine für die Parameter A,B und eine weitere für die Parameter B,A, was zu zwei Börsen statt einer führen würde.

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

Diese Funktion berechnet die Adresse der Paar-Börse für die beiden Token. Dieser Vertrag wird mit [dem CREATE2-Opcode](https://eips.ethereum.org/EIPS/eip-1014) erstellt, sodass wir die Adresse mit demselben Algorithmus berechnen können, wenn wir die verwendeten Parameter kennen. Dies ist viel günstiger, als die Factory abzufragen, und

```solidity
    // ruft die Reserven für ein Paar ab und sortiert sie
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Diese Funktion gibt die Reserven der beiden Token zurück, über die die Paar-Börse verfügt. Beachten Sie, dass sie die Token in beliebiger Reihenfolge empfangen kann und sie für die interne Verwendung sortiert.

```solidity
    // gibt bei einer bestimmten Menge eines Vermögenswerts und Paar-Reserven eine äquivalente Menge des anderen Vermögenswerts zurück
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Diese Funktion gibt Ihnen die Menge an Token B an, die Sie im Austausch für Token A erhalten, wenn keine Gebühr anfällt. Diese Berechnung berücksichtigt, dass die Übertragung den Wechselkurs ändert.

```solidity
    // gibt bei einer Eingabemenge eines Vermögenswerts und Paar-Reserven die maximale Ausgabemenge des anderen Vermögenswerts zurück
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Die obige `quote`-Funktion funktioniert hervorragend, wenn für die Nutzung der Paar-Börse keine Gebühr anfällt. Wenn jedoch eine Umtauschgebühr von 0,3 % anfällt, ist der Betrag, den Sie tatsächlich erhalten, geringer. Diese Funktion berechnet den Betrag nach Abzug der Umtauschgebühr.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity verarbeitet Brüche nicht nativ, daher können wir den Betrag nicht einfach mit 0,997 multiplizieren. Stattdessen multiplizieren wir den Zähler mit 997 und den Nenner mit 1000, was denselben Effekt erzielt.

```solidity
    // gibt bei einer Ausgabemenge eines Vermögenswerts und Paar-Reserven eine erforderliche Eingabemenge des anderen Vermögenswerts zurück
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Diese Funktion macht in etwa dasselbe, aber sie erhält den Ausgabebetrag und liefert die Eingabe.

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

Diese beiden Funktionen übernehmen die Identifizierung der Werte, wenn es notwendig ist, mehrere Paar-Börsen zu durchlaufen.

### Transfer Helper {#transfer-helper}

[Diese Bibliothek](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) fügt Erfolgsprüfungen für ERC-20- und Ethereum-Übertragungen hinzu, um einen Revert und die Rückgabe eines `false`-Wertes auf die gleiche Weise zu behandeln.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// Hilfsmethoden für die Interaktion mit ERC20-Token und das Senden von ETH, die nicht konsistent true/false zurückgeben
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Wir können einen anderen Vertrag auf eine von zwei Arten aufrufen:

- Verwenden einer Schnittstellendefinition (Interface), um einen Funktionsaufruf zu erstellen
- Verwenden des [Application Binary Interface (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) „manuell“, um den Aufruf zu erstellen. Dafür hat sich der Autor des Codes entschieden.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Aus Gründen der Abwärtskompatibilität mit Token, die vor dem ERC-20-Standard erstellt wurden, kann ein ERC-20-Aufruf entweder fehlschlagen, indem er revertiert (in diesem Fall ist `success` gleich `false`), oder indem er erfolgreich ist und einen `false`-Wert zurückgibt (in diesem Fall gibt es Ausgabedaten, und wenn Sie diese als Boolean dekodieren, erhalten Sie `false`).

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

Diese Funktion implementiert die [Transfer-Funktionalität von ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), die es einem Konto ermöglicht, die von einem anderen Konto bereitgestellte Freigabe (Allowance) auszugeben.

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

Diese Funktion implementiert die [transferFrom-Funktionalität von ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), die es einem Konto ermöglicht, die von einem anderen Konto bereitgestellte Freigabe (Allowance) auszugeben.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Diese Funktion überträgt Ether auf ein Konto. Jeder Aufruf an einen anderen Vertrag kann versuchen, Ether zu senden. Da wir eigentlich keine Funktion aufrufen müssen, senden wir keine Daten mit dem Aufruf.

## Fazit {#conclusion}

Dies ist ein langer Artikel von etwa 50 Seiten. Wenn du es bis hierher geschafft hast, herzlichen Glückwunsch! Hoffentlich hast du nun die Besonderheiten bei der Entwicklung einer realen Anwendung (im Gegensatz zu kurzen Beispielprogrammen) verstanden und bist besser darauf vorbereitet, Smart Contracts für deine eigenen Anwendungsfälle zu schreiben.

Geh nun, schreibe etwas Nützliches und beeindrucke uns.

[Weitere meiner Arbeiten findest du hier](https://cryptodocguy.pro/).