---
title: "Alles, was Sie cachen können"
description: Erfahren Sie, wie Sie einen Caching-Vertrag für günstigere Rollup-Transaktionen erstellen und verwenden.
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
tags: [ "Layer 2", "Caching", "Speicher" ]
skill: intermediate
published: 2022-09-15
lang: de
---

Bei der Verwendung von Rollups sind die Kosten für ein Byte in der Transaktion viel höher als die Kosten für einen Storage-Slot. Daher ist es sinnvoll, so viele Informationen wie möglich on-chain zu cachen.

In diesem Artikel erfahren Sie, wie Sie einen Caching-Vertrag so erstellen und verwenden, dass jeder wahrscheinlich mehrfach genutzte Parameterwert zwischengespeichert wird. Nach der ersten Verwendung ist er dann mit einer viel kleineren Anzahl von Bytes verfügbar. Außerdem lernen Sie, wie Sie Off-Chain-Code schreiben, der diesen Cache nutzt.

Wenn Sie den Artikel überspringen und nur den Quellcode sehen möchten, [finden Sie ihn hier](https://github.com/qbzzt/20220915-all-you-can-cache). Der Entwicklungs-Stack ist [Foundry](https://getfoundry.sh/introduction/installation/).

## Gesamtdesign {#overall-design}

Der Einfachheit halber gehen wir davon aus, dass alle Transaktionsparameter `uint256` sind und eine Länge von 32 Bytes haben. Wenn wir eine Transaktion erhalten, parsen wir jeden Parameter wie folgt:

1. Wenn das erste Byte `0xFF` ist, nehmen Sie die nächsten 32 Bytes als Parameterwert und schreiben Sie ihn in den Cache.

2. Wenn das erste Byte `0xFE` ist, nehmen Sie die nächsten 32 Bytes als Parameterwert, aber schreiben Sie ihn _nicht_ in den Cache.

3. Für jeden anderen Wert nehmen Sie die oberen vier Bits als Anzahl der zusätzlichen Bytes und die unteren vier Bits als die höchstwertigen Bits des Cache-Schlüssels. Hier sind einige Beispiele:

   | Bytes in Calldata | Cache-Schlüssel |
   | :---------------- | --------------: |
   | 0x0F              |            0x0F |
   | 0x10,0x10         |            0x10 |
   | 0x12,0xAC         |          0x02AC |
   | 0x2D,0xEA, 0xD6   |        0x0DEAD6 |

## Cache-Manipulation {#cache-manipulation}

Der Cache ist in [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) implementiert. Gehen wir ihn Zeile für Zeile durch.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Diese Konstanten werden verwendet, um die Sonderfälle zu interpretieren, in denen wir alle Informationen bereitstellen und sie entweder in den Cache geschrieben haben wollen oder nicht. Das Schreiben in den Cache erfordert zwei [`SSTORE`](https://www.evm.codes/#55)-Operationen in zuvor ungenutzte Storage-Slots zu einem Preis von je 22100 Gas, daher machen wir es optional.

```solidity

    mapping(uint => uint) public val2key;
```

Ein [Mapping](https://www.geeksforgeeks.org/solidity/solidity-mappings/) zwischen den Werten und ihren Schlüsseln. Diese Information ist notwendig, um Werte zu kodieren, bevor Sie die Transaktion versenden.

```solidity
    // An Position n befindet sich der Wert für den Schlüssel n+1, weil wir die Null
    // als „nicht im Cache“ reservieren müssen.
    uint[] public key2val;
```

Wir können ein Array für die Zuordnung von Schlüsseln zu Werten verwenden, da wir die Schlüssel zuweisen und dies der Einfachheit halber sequenziell tun.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Lese nicht initialisierten Cache-Eintrag");
        return key2val[_key-1];
    }  // cacheRead
```

Lesen Sie einen Wert aus dem Cache.

```solidity
    // Einen Wert in den Cache schreiben, falls er noch nicht vorhanden ist
    // Nur öffentlich, damit der Test funktioniert
    function cacheWrite(uint _value) public returns (uint) {
        // Wenn der Wert bereits im Cache ist, geben Sie den aktuellen Schlüssel zurück
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Es hat keinen Sinn, denselben Wert mehr als einmal in den Cache zu legen. Wenn der Wert bereits vorhanden ist, geben Sie einfach den vorhandenen Schlüssel zurück.

```solidity
        // Da 0xFE ein Sonderfall ist, ist der größte Schlüssel, den der Cache
        // halten kann, 0x0D gefolgt von 15 0xFFs. Wenn die Cache-Länge bereits so
        // groß ist, schlägt der Vorgang fehl.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "Cache-Überlauf");
```

Ich glaube nicht, dass wir jemals einen so großen Cache erhalten werden (ca. 1,8\*10<sup>37</sup> Einträge, für deren Speicherung etwa 10<sup>27</sup> TB erforderlich wären). Ich bin jedoch alt genug, um mich an [„640 KB wären immer genug“](https://quoteinvestigator.com/2011/09/08/640k-enough/) zu erinnern. Dieser Test ist sehr günstig.

```solidity
        // Den Wert mit dem nächsten Schlüssel schreiben
        val2key[_value] = key2val.length+1;
```

Fügen Sie die umgekehrte Suche hinzu (vom Wert zum Schlüssel).

```solidity
        key2val.push(_value);
```

Fügen Sie die Vorwärtssuche hinzu (vom Schlüssel zum Wert). Da wir die Werte sequenziell zuweisen, können wir sie einfach nach dem letzten Array-Wert hinzufügen.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Gibt die neue Länge von `key2val` zurück, d. h. die Zelle, in der der neue Wert gespeichert ist.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Diese Funktion liest einen Wert aus Calldata beliebiger Länge (bis zu 32 Bytes, der Wortgröße).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal-Längenlimit beträgt 32 Bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal versucht, über die Calldata-Größe hinaus zu lesen");
```

Diese Funktion ist intern. Wenn also der Rest des Codes korrekt geschrieben ist, sind diese Tests nicht erforderlich. Sie kosten jedoch nicht viel, also können wir sie auch gleich einbauen.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Dieser Code ist in [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Er liest einen 32-Byte-Wert aus Calldata. Dies funktioniert auch, wenn Calldata vor `startByte+32` aufhört, da nicht initialisierter Speicherplatz in der EVM als Null betrachtet wird.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Wir wollen nicht unbedingt einen 32-Byte-Wert. Dadurch werden die überzähligen Bytes entfernt.

```solidity
        return _retVal;
    } // _calldataVal


    // Einen einzelnen Parameter aus Calldata lesen, beginnend bei _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Lesen Sie einen einzelnen Parameter aus Calldata. Beachten Sie, dass wir nicht nur den gelesenen Wert zurückgeben müssen, sondern auch den Ort des nächsten Bytes, da die Parameter von 1 Byte bis zu 33 Bytes lang sein können.

```solidity
        // Das erste Byte sagt uns, wie der Rest zu interpretieren ist
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity versucht, die Anzahl der Fehler zu reduzieren, indem es potenziell gefährliche [implizite Typumwandlungen](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) verbietet. Ein Downgrade, zum Beispiel von 256 Bit auf 8 Bit, muss explizit sein.

```solidity

        // Den Wert lesen, aber nicht in den Cache schreiben
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Den Wert lesen und in den Cache schreiben
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Wenn wir hier angekommen sind, bedeutet das, dass wir aus dem Cache lesen müssen

        // Anzahl der zusätzlich zu lesenden Bytes
        uint8 _extraBytes = _firstByte / 16;
```

Nehmen Sie das untere [Nibble](https://en.wikipedia.org/wiki/Nibble) und kombinieren Sie es mit den anderen Bytes, um den Wert aus dem Cache zu lesen.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n Parameter lesen (Funktionen wissen, wie viele Parameter sie erwarten)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Wir könnten die Anzahl der Parameter, die wir haben, aus Calldata selbst entnehmen, aber die Funktionen, die uns aufrufen, wissen, wie viele Parameter sie erwarten. Es ist einfacher, wenn sie es uns sagen.

```solidity
        // Die Parameter, die wir lesen
        uint[] memory params = new uint[](_paramNum);

        // Die Parameter beginnen bei Byte 4, davor steht die Funktionssignatur
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Lesen Sie die Parameter, bis Sie die benötigte Anzahl haben. Wenn wir das Ende von Calldata überschreiten, wird `_readParams` den Aufruf rückgängig machen.

```solidity

        return(params);
    }   // readParams

    // Zum Testen von _readParams, das Lesen von vier Parametern testen
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Ein großer Vorteil von Foundry ist, dass Tests in Solidity geschrieben werden können ([siehe Testen des Caches unten](#testing-the-cache)). Dies macht Unit-Tests viel einfacher. Dies ist eine Funktion, die vier Parameter liest und sie zurückgibt, damit der Test überprüfen kann, ob sie korrekt waren.

```solidity
    // Einen Wert abrufen, Bytes zurückgeben, die ihn kodieren (wenn möglich unter Verwendung des Caches)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` ist eine Funktion, die Off-Chain-Code aufruft, um Calldata zu erstellen, die den Cache nutzen. Sie empfängt einen einzelnen Wert und gibt die Bytes zurück, die ihn kodieren. Diese Funktion ist eine `view`, erfordert also keine Transaktion und kostet bei externem Aufruf kein Gas.

```solidity
        uint _key = val2key[_val];

        // Der Wert ist noch nicht im Cache, fügen Sie ihn hinzu
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

In der [EVM](/entwickler/docs/evm/) wird davon ausgegangen, dass jeder nicht initialisierte Speicher Null ist. Wenn wir also nach dem Schlüssel für einen nicht vorhandenen Wert suchen, erhalten wir eine Null. In diesem Fall sind die Bytes, die ihn kodieren, `INTO_CACHE` (damit er beim nächsten Mal zwischengespeichert wird), gefolgt von dem tatsächlichen Wert.

```solidity
        // Wenn der Schlüssel <0x10 ist, geben Sie ihn als einzelnes Byte zurück
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Einzelne Bytes sind am einfachsten. Wir verwenden einfach [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat), um einen `bytes<n>`-Typ in ein Byte-Array zu verwandeln, das eine beliebige Länge haben kann. Trotz des Namens funktioniert es auch mit nur einem Argument einwandfrei.

```solidity
        // Zwei-Byte-Wert, kodiert als 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Wenn wir einen Schlüssel haben, der kleiner als 16<sup>3</sup> ist, können wir ihn in zwei Bytes ausdrücken. Wir konvertieren zuerst `_key`, einen 256-Bit-Wert, in einen 16-Bit-Wert und verwenden ein logisches Oder, um die Anzahl der zusätzlichen Bytes zum ersten Byte hinzuzufügen. Dann wandeln wir es einfach in einen `bytes2`-Wert um, der in `bytes` umgewandelt werden kann.

```solidity
        // Es gibt wahrscheinlich eine clevere Möglichkeit, die folgenden Zeilen als Schleife auszuführen,
        // aber es ist eine View-Funktion, also optimiere ich für die Zeit des Programmierers und
        // die Einfachheit.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Die anderen Werte (3 Bytes, 4 Bytes usw.) werden auf die gleiche Weise behandelt, nur mit unterschiedlichen Feldgrößen.

```solidity
        // Wenn wir hier ankommen, ist etwas falsch.
        revert("Fehler in encodeVal, sollte nicht passieren");
```

Wenn wir hier ankommen, bedeutet das, dass wir einen Schlüssel erhalten haben, der nicht kleiner als 16\*256<sup>15</sup> ist. Aber `cacheWrite` begrenzt die Schlüssel, sodass wir nicht einmal bis zu 14\*256<sup>16</sup> kommen (was ein erstes Byte von 0xFE hätte, also wie `DONT_CACHE` aussehen würde). Aber es kostet uns nicht viel, einen Test hinzuzufügen, für den Fall, dass ein zukünftiger Programmierer einen Fehler einbaut.

```solidity
    } // encodeVal

}  // Cache
```

### Testen des Caches {#testing-the-cache}

Einer der Vorteile von Foundry ist, dass [Sie Tests in Solidity schreiben können](https://getfoundry.sh/forge/tests/overview/), was das Schreiben von Unit-Tests erleichtert. Die Tests für die `Cache`-Klasse sind [hier](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Da der Testcode repetitiv ist, wie es bei Tests oft der Fall ist, werden in diesem Artikel nur die interessanten Teile erklärt.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

Dies ist nur eine Boilerplate, die notwendig ist, um das Testpaket und `console.log` zu verwenden.

```solidity
import "src/Cache.sol";
```

Wir müssen den Vertrag kennen, den wir testen.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Die `setUp`-Funktion wird vor jedem Test aufgerufen. In diesem Fall erstellen wir einfach einen neuen Cache, damit sich unsere Tests nicht gegenseitig beeinflussen.

```solidity
    function testCaching() public {
```

Tests sind Funktionen, deren Namen mit `test` beginnen. Diese Funktion überprüft die grundlegende Cache-Funktionalität, das Schreiben von Werten und das erneute Lesen.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

So führen Sie das eigentliche Testen mit [`assert...`-Funktionen](https://getfoundry.sh/reference/forge-std/std-assertions/) durch. In diesem Fall prüfen wir, ob der Wert, den wir geschrieben haben, auch der ist, den wir lesen. Wir können das Ergebnis von `cache.cacheWrite` verwerfen, da wir wissen, dass Cache-Schlüssel linear vergeben werden.

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Zuerst schreiben wir jeden Wert zweimal in den Cache und stellen sicher, dass die Schlüssel identisch sind (was bedeutet, dass der zweite Schreibvorgang nicht wirklich stattgefunden hat).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Theoretisch könnte es einen Fehler geben, der sich nicht auf aufeinanderfolgende Cache-Schreibvorgänge auswirkt. Hier führen wir also einige Schreibvorgänge durch, die nicht aufeinanderfolgen, und sehen, dass die Werte immer noch nicht neu geschrieben werden.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Liest ein 256-Bit-Wort aus einem `bytes memory`-Puffer. Mit dieser Hilfsfunktion können wir überprüfen, ob wir die richtigen Ergebnisse erhalten, wenn wir einen Funktionsaufruf ausführen, der den Cache verwendet.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul unterstützt keine Datenstrukturen jenseits von `uint256`. Wenn Sie also auf eine komplexere Datenstruktur wie den Speicherpuffer `_bytes` verweisen, erhalten Sie die Adresse dieser Struktur. Solidity speichert `bytes memory`-Werte als 32-Byte-Wort, das die Länge enthält, gefolgt von den eigentlichen Bytes. Um also Byte-Nummer `_start` zu erhalten, müssen wir `_bytes+32+_start` berechnen.

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Einige Konstanten, die wir für Tests benötigen.

```solidity
    function testReadParam() public {
```

Rufen Sie `fourParams()` auf, eine Funktion, die `readParams` verwendet, um zu testen, ob wir Parameter korrekt lesen können.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Wir können den normalen ABI-Mechanismus nicht verwenden, um eine Funktion über den Cache aufzurufen, daher müssen wir den Low-Level-Mechanismus [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) verwenden. Dieser Mechanismus verwendet `bytes memory` als Eingabe und gibt diese (sowie einen booleschen Wert) als Ausgabe zurück.

```solidity
        // Erster Aufruf, der Cache ist leer
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Es ist nützlich, wenn derselbe Vertrag sowohl zwischengespeicherte Funktionen (für Aufrufe direkt aus Transaktionen) als auch nicht zwischengespeicherte Funktionen (für Aufrufe von anderen Smart Contracts) unterstützt. Dazu müssen wir uns weiterhin auf den Solidity-Mechanismus verlassen, um die richtige Funktion aufzurufen, anstatt alles in [eine `fallback`-Funktion](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) zu packen. Dies macht die Zusammensetzbarkeit wesentlich einfacher. Ein einzelnes Byte würde in den meisten Fällen ausreichen, um die Funktion zu identifizieren, sodass wir drei Bytes (16\*3=48 Gas) verschwenden. Als ich das schrieb, kosteten diese 48 Gas jedoch 0,07 Cent, was ein angemessener Preis für einfacheren, weniger fehleranfälligen Code ist.

```solidity
            // Erster Wert, zum Cache hinzufügen
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Der erste Wert: Eine Markierung, die besagt, dass es sich um einen vollständigen Wert handelt, der in den Cache geschrieben werden muss, gefolgt von den 32 Bytes des Wertes. Die anderen drei Werte sind ähnlich, mit der Ausnahme, dass `VAL_B` nicht in den Cache geschrieben wird und `VAL_C` sowohl der dritte als auch der vierte Parameter ist.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Hier rufen wir den `Cache`-Vertrag auf.

```solidity
        assertEq(_success, true);
```

Wir erwarten, dass der Anruf erfolgreich ist.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Wir beginnen mit einem leeren Cache und fügen dann `VAL_A` gefolgt von `VAL_C` hinzu. Wir erwarten, dass der erste den Schlüssel 1 und der zweite den Schlüssel 2 hat.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Die Ausgabe sind die vier Parameter. Hier überprüfen wir, ob es richtig ist.

```solidity
        // Zweiter Aufruf, wir können den Cache verwenden
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Erster Wert im Cache
            bytes1(0x01),
```

Cache-Schlüssel unter 16 sind nur ein Byte lang.

```solidity
            // Zweiter Wert, nicht zum Cache hinzufügen
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Dritter und vierter Wert, gleicher Wert
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Die Tests nach dem Aufruf sind identisch mit denen nach dem ersten Aufruf.

```solidity
    function testEncodeVal() public {
```

Diese Funktion ist ähnlich wie `testReadParam`, nur dass wir die Parameter nicht explizit schreiben, sondern `encodeVal()` verwenden.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

Der einzige zusätzliche Test in `testEncodeVal()` besteht darin, zu überprüfen, ob die Länge von `_callInput` korrekt ist. Für den ersten Aufruf ist es 4+33\*4. Beim zweiten, bei dem jeder Wert bereits im Cache ist, ist es 4+1\*4.

```solidity
    // Testen Sie encodeVal, wenn der Schlüssel mehr als ein einzelnes Byte hat
    // Maximal drei Bytes, da das Füllen des Caches auf vier Bytes zu lange dauert.
    function testEncodeValBig() public {
        // Legen Sie eine Reihe von Werten in den Cache.
        // Um die Dinge einfach zu halten, verwenden Sie den Schlüssel n für den Wert n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Die obige Funktion `testEncodeVal` schreibt nur vier Werte in den Cache, so dass [der Teil der Funktion, der sich mit Multi-Byte-Werten befasst](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171), nicht überprüft wird. Aber dieser Code ist kompliziert und fehleranfällig.

Der erste Teil dieser Funktion ist eine Schleife, die alle Werte von 1 bis 0x1FFF in der richtigen Reihenfolge in den Cache schreibt, damit wir diese Werte kodieren können und wissen, wohin sie gehen.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Ein Byte        0x0F
            cache.encodeVal(0x0010),   // Zwei Bytes     0x1010
            cache.encodeVal(0x0100),   // Zwei Bytes     0x1100
            cache.encodeVal(0x1000)    // Drei Bytes 0x201000
        );
```

Testen Sie Ein-Byte-, Zwei-Byte- und Drei-Byte-Werte. Wir testen nicht darüber hinaus, da es zu lange dauern würde, genügend Stack-Einträge zu schreiben (mindestens 0x10000000, etwa eine Viertelmilliarde).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test, was bei einem zu kleinen Puffer zu einem Revert führt
    function testShortCalldata() public {
```

Testen Sie, was im anormalen Fall passiert, wenn nicht genügend Parameter vorhanden sind.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Da es zurückgesetzt wird, sollte das Ergebnis, das wir erhalten, `false` sein.

```
    // Aufruf mit nicht vorhandenen Cache-Schlüsseln
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Erster Wert, zum Cache hinzufügen
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Zweiter Wert
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Diese Funktion erhält vier vollkommen legitime Parameter, nur dass der Cache leer ist und es keine Werte zum Lesen gibt.

```solidity
        .
        .
        .
    // Test, ob bei einem übermäßig langen Puffer alles funktioniert
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Erster Aufruf, der Cache ist leer
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Erster Wert, zum Cache hinzufügen
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Zweiter Wert, zum Cache hinzufügen
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Dritter Wert, zum Cache hinzufügen
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Vierter Wert, zum Cache hinzufügen
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Und ein weiterer Wert für „Viel Glück“
            bytes4(0x31112233)
        );
```

Diese Funktion sendet fünf Werte. Wir wissen, dass der fünfte Wert ignoriert wird, weil er kein gültiger Cache-Eintrag ist, was zu einer Zurückweisung geführt hätte, wenn er nicht enthalten gewesen wäre.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Eine Beispielanwendung {#a-sample-app}

Tests in Solidity zu schreiben ist schön und gut, aber am Ende muss eine Dapp in der Lage sein, Anfragen von außerhalb der Kette zu verarbeiten, um nützlich zu sein. Dieser Artikel zeigt, wie man Caching in einer Dapp mit `WORM` verwendet, was für „Write Once, Read Many“ steht. Wenn ein Schlüssel noch nicht geschrieben ist, können Sie einen Wert darauf schreiben. Wenn der Schlüssel bereits geschrieben ist, erhalten Sie einen Revert.

### Der Vertrag {#the-contract}

[Dies ist der Vertrag](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Es wiederholt größtenteils, was wir bereits mit `Cache` und `CacheTest` gemacht haben, also behandeln wir nur die Teile, die interessant sind.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Der einfachste Weg, `Cache` zu verwenden, ist, es in unserem eigenen Vertrag zu erben.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Diese Funktion ist ähnlich wie `fourParam` in `CacheTest` oben. Da wir die ABI-Spezifikationen nicht befolgen, ist es am besten, keine Parameter in der Funktion zu deklarieren.

```solidity
    // Machen Sie es einfacher, uns anzurufen
    // Funktionssignatur für writeEntryCached(), mit freundlicher Genehmigung von
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Der externe Code, der `writeEntryCached` aufruft, muss die Calldata manuell erstellen, anstatt `worm.writeEntryCached` zu verwenden, da wir die ABI-Spezifikationen nicht befolgen. Dieser konstante Wert erleichtert das Schreiben.

Beachten Sie, dass wir `WRITE_ENTRY_CACHED` zwar als Zustandsvariable definieren, zum externen Lesen jedoch die Getter-Funktion `worm.WRITE_ENTRY_CACHED()` verwendet werden muss.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Die Lesefunktion ist eine `View`-Funktion, erfordert also keine Transaktion und kostet kein Gas. Daher gibt es keinen Vorteil, den Cache für den Parameter zu verwenden. Bei Ansichtsfunktionen ist es am besten, den einfacheren Standardmechanismus zu verwenden.

### Der Test-Code {#the-testing-code}

[Dies ist der Test-Code für den Vertrag](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Nochmals, lassen Sie uns nur das Interessante betrachten.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("Eintrag bereits geschrieben"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Dies (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) ist, wie wir in einem Foundry-Test angeben, dass der nächste Aufruf fehlschlagen sollte, und der gemeldete Grund für einen Fehler. Dies gilt, wenn wir die Syntax `<contract>.<function name> verwenden()` anstatt die Calldata zu erstellen und den Vertrag über die Low-Level-Schnittstelle aufzurufen (`<contract>.call()` usw.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Hier verwenden wir die Tatsache, dass `cacheWrite` den Cache-Schlüssel zurückgibt. Dies ist nichts, was wir in der Produktion erwarten würden, da `cacheWrite` den Zustand ändert und daher nur während einer Transaktion aufgerufen werden kann. Transaktionen haben keine Rückgabewerte. Wenn sie Ergebnisse haben, sollen diese als Ereignisse ausgegeben werden. Der Rückgabewert von `cacheWrite` ist also nur von On-Chain-Code aus zugänglich, und On-Chain-Code benötigt kein Parameter-Caching.

```solidity
        (_success,) = address(worm).call(_callInput);
```

So teilen wir Solidity mit, dass `<contract address>.call()` zwar zwei Rückgabewerte hat, wir aber nur am ersten interessiert sind.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Da wir die Low-Level-Funktion `<address>.call()` verwenden, können wir `vm.expectRevert()` nicht verwenden und müssen uns den booleschen Erfolgswert ansehen, den wir vom Aufruf erhalten.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

So überprüfen wir, ob der Code in Foundry [ein Ereignis korrekt ausgibt](https://getfoundry.sh/reference/cheatcodes/expect-emit/).

### Der Client {#the-client}

Was man mit Solidity-Tests nicht bekommt, ist JavaScript-Code, den man kopieren und in die eigene Anwendung einfügen kann. Um diesen Code zu schreiben, habe ich WORM im [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), dem neuen Testnet von [Optimism](https://www.optimism.io/), bereitgestellt. Es befindet sich an der Adresse [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Sie können den JavaScript-Code für den Client hier sehen](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). So verwenden Sie es:

1. Klonen Sie das Git-Repository:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Installieren Sie die erforderlichen Pakete:

   ```sh
   cd javascript
   yarn
   ```

3. Kopieren Sie die Konfigurationsdatei:

   ```sh
   cp .env.example .env
   ```

4. Bearbeiten Sie `.env` für Ihre Konfiguration:

   | Parameter                                                     | Wert                                                                                                                                                                                                                     |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | MNEMONIC                                                      | Die Mnemonik für ein Konto, das genug ETH hat, um eine Transaktion zu bezahlen. [Hier können Sie kostenlose ETH für das Optimism Goerli-Netzwerk erhalten](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL zu Optimism Goerli. Der öffentliche Endpunkt `https://goerli.optimism.io` ist ratenbegrenzt, aber für das, was wir hier brauchen, ausreichend.                                       |

5. Führen Sie `index.js` aus.

   ```sh
   node index.js
   ```

   Diese Beispielanwendung schreibt zunächst einen Eintrag in WORM und zeigt die Calldata und einen Link zur Transaktion auf Etherscan an. Dann liest es diesen Eintrag zurück und zeigt den verwendeten Schlüssel und die Werte im Eintrag an (Wert, Blocknummer und Autor).

Der größte Teil des Clients ist normales Dapp-JavaScript. Auch hier gehen wir nur die interessanten Teile durch.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Jedes Mal einen neuen Schlüssel benötigen
    const key = await worm.encodeVal(Number(new Date()))
```

Ein bestimmter Slot kann nur einmal beschrieben werden, daher verwenden wir den Zeitstempel, um sicherzustellen, dass wir keine Slots wiederverwenden.

```javascript
const val = await worm.encodeVal("0x600D")

// Einen Eintrag schreiben
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers erwartet, dass die Aufrufdaten (call data) eine Hex-Zeichenfolge sind, also `0x` gefolgt von einer geraden Anzahl hexadezimaler Ziffern. Da `key` und `val` beide mit `0x` beginnen, müssen wir diese Header entfernen.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Wie beim Solidity-Testcode können wir eine zwischengespeicherte Funktion nicht normal aufrufen. Stattdessen müssen wir einen Mechanismus auf niedrigerer Ebene verwenden.

```javascript
    .
    .
    .
    // Lesen des gerade geschriebenen Eintrags
    const realKey = '0x' + key.slice(4)  // das FF-Flag entfernen
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Zum Lesen von Einträgen können wir den normalen Mechanismus verwenden. Es ist nicht erforderlich, Parameter-Caching mit `view`-Funktionen zu verwenden.

## Fazit {#conclusion}

Der Code in diesem Artikel ist ein Proof of Concept, dessen Zweck es ist, die Idee leicht verständlich zu machen. Für ein produktionsreifes System sollten Sie möglicherweise einige zusätzliche Funktionen implementieren:

- Behandeln Sie Werte, die nicht `uint256` sind. Zum Beispiel Zeichenketten.
- Anstelle eines globalen Caches könnten Sie eine Zuordnung zwischen Benutzern und Caches haben. Verschiedene Benutzer verwenden unterschiedliche Werte.
- Werte, die für Adressen verwendet werden, unterscheiden sich von denen, die für andere Zwecke verwendet werden. Es könnte sinnvoll sein, einen separaten Cache nur für Adressen zu haben.
- Derzeit basieren die Cache-Schlüssel auf einem „First come, smallest key“-Algorithmus. Die ersten sechzehn Werte können als einzelnes Byte gesendet werden. Die nächsten 4080 Werte können als zwei Bytes gesendet werden. Die nächste Million Werte sind drei Bytes usw. Ein Produktionssystem sollte Nutzungszähler für Cache-Einträge führen und diese so neu organisieren, dass die sechzehn _häufigsten_ Werte ein Byte, die nächsten 4080 häufigsten Werte zwei Bytes usw. sind.

  Dies ist jedoch eine potenziell gefährliche Operation. Stellen Sie sich die folgende Abfolge von Ereignissen vor:

  1. Noam Naive ruft `encodeVal` auf, um die Adresse zu kodieren, an die er Token senden möchte. Diese Adresse ist eine der ersten, die in der Anwendung verwendet wird, daher ist der kodierte Wert 0x06. Dies ist eine `view`-Funktion, keine Transaktion, also ist es zwischen Noam und dem von ihm verwendeten Knoten, und niemand sonst weiß davon.

  2. Owen Owner führt die Neuanordnung des Caches durch. Sehr wenige Leute verwenden diese Adresse tatsächlich, daher ist sie jetzt als 0x201122 kodiert. Ein anderer Wert, 10<sup>18</sup>, wird 0x06 zugewiesen.

  3. Noam Naive sendet seine Token an 0x06. Sie gehen an die Adresse `0x0000000000000000000000000de0b6b3a7640000`, und da niemand den privaten Schlüssel für diese Adresse kennt, bleiben sie dort einfach stecken. Noam ist _nicht glücklich_.

  Es gibt Möglichkeiten, dieses Problem und das damit zusammenhängende Problem von Transaktionen, die sich während der Neuanordnung des Caches im Mempool befinden, zu lösen, aber Sie müssen sich dessen bewusst sein.

Ich habe hier Caching mit Optimism demonstriert, weil ich ein Optimism-Mitarbeiter bin und dies das Rollup ist, das ich am besten kenne. Aber es sollte mit jedem Rollup funktionieren, das minimale Kosten für die interne Verarbeitung verlangt, sodass im Vergleich dazu das Schreiben der Transaktionsdaten auf L1 der Hauptaufwand ist.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).

