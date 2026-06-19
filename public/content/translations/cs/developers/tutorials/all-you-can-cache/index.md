---
title: "Vše, co můžete cachovat"
description: Naučte se, jak vytvořit a používat cachovací kontrakt pro levnější transakce na rollupech
author: Ori Pomerantz
tags: ["vrstva 2", "cachování", "úložiště", "škálování"]
skill: intermediate
breadcrumb: Cachování pro rollupy
published: 2022-09-15
lang: cs
---

Při používání rollupů je cena bajtu v transakci mnohem vyšší než cena úložného slotu. Proto dává smysl cachovat co nejvíce informací onchain.

V tomto článku se dozvíte, jak vytvořit a používat cachovací kontrakt takovým způsobem, aby jakákoli hodnota parametru, u které je pravděpodobné, že bude použita vícekrát, byla uložena do mezipaměti (cache) a byla k dispozici pro použití (po prvním použití) s mnohem menším počtem bajtů, a jak napsat offchain kód, který tuto cache využívá.

Pokud chcete článek přeskočit a podívat se rovnou na zdrojový kód, [najdete ho zde](https://github.com/qbzzt/20220915-all-you-can-cache). Vývojový stack je [Foundry](https://getfoundry.sh/introduction/installation/).

## Celkový návrh {#overall-design}

Pro zjednodušení budeme předpokládat, že všechny parametry transakce jsou `uint256`, tedy 32 bajtů dlouhé. Když přijmeme transakci, zpracujeme každý parametr takto:

1. Pokud je první bajt `0xFF`, vezměte dalších 32 bajtů jako hodnotu parametru a zapište ji do cache.

2. Pokud je první bajt `0xFE`, vezměte dalších 32 bajtů jako hodnotu parametru, ale _nezapisujte_ ji do cache.

3. Pro jakoukoli jinou hodnotu vezměte horní čtyři bity jako počet dalších bajtů a dolní čtyři bity jako nejvýznamnější bity klíče cache. Zde je několik příkladů:

   | Bajty v datech volání | Klíč cache |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipulace s cache {#cache-manipulation}

Cache je implementována v [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Pojďme si to projít řádek po řádku.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Tyto konstanty se používají k interpretaci speciálních případů, kdy poskytneme všechny informace a buď je chceme zapsat do cache, nebo ne. Zápis do cache vyžaduje dvě operace [`SSTORE`](https://www.evm.codes/#55) do dříve nepoužitých úložných slotů za cenu 22 100 gasu za každou, takže to děláme volitelné.

```solidity

    mapping(uint => uint) public val2key;
```

[Mapování](https://www.geeksforgeeks.org/solidity/solidity-mappings/) mezi hodnotami a jejich klíči. Tato informace je nezbytná pro zakódování hodnot před odesláním transakce.

```solidity
    // Umístění n má hodnotu pro klíč n+1, protože potřebujeme zachovat
    // nulu jako „není v mezipaměti“.
    uint[] public key2val;
```

Pro mapování z klíčů na hodnoty můžeme použít pole, protože klíče přiřazujeme my a pro zjednodušení to děláme sekvenčně.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Přečtení hodnoty z cache.

```solidity
    // Zapsat hodnotu do mezipaměti, pokud tam ještě není
    // Pouze public, aby mohl fungovat test
    function cacheWrite(uint _value) public returns (uint) {
        // Pokud je hodnota již v mezipaměti, vrátit aktuální klíč
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Nemá smysl vkládat stejnou hodnotu do cache vícekrát. Pokud tam hodnota již je, stačí vrátit existující klíč.

```solidity
        // Jelikož 0xFE je speciální případ, největší klíč, který může mezipaměť
        // pojmout, je 0x0D následované 15 0xFF. Pokud je délka mezipaměti již takto
        // velká, selhat.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Nemyslím si, že někdy budeme mít tak velkou cache (přibližně 1,8\*10<sup>37</sup> záznamů, což by vyžadovalo asi 10<sup>27</sup> TB k uložení). Jsem však dost starý na to, abych si pamatoval, že [„640 kB bude vždy stačit“](https://quoteinvestigator.com/2011/09/08/640k-enough/). Tento test je velmi levný.

```solidity
        // Zapsat hodnotu pomocí dalšího klíče
        val2key[_value] = key2val.length+1;
```

Přidání zpětného vyhledávání (od hodnoty ke klíči).

```solidity
        key2val.push(_value);
```

Přidání dopředného vyhledávání (od klíče k hodnotě). Protože hodnoty přiřazujeme sekvenčně, můžeme je jednoduše přidat za poslední hodnotu pole.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Vrácení nové délky `key2val`, což je buňka, kde je uložena nová hodnota.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Tato funkce čte hodnotu z dat volání libovolné délky (až 32 bajtů, velikost slova).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Tato funkce je interní, takže pokud je zbytek kódu napsán správně, tyto testy nejsou nutné. Nicméně nestojí mnoho, takže je můžeme klidně ponechat.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Tento kód je v jazyce [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Čte 32bajtovou hodnotu z dat volání. To funguje, i když data volání skončí před `startByte+32`, protože neinicializovaný prostor v EVM je považován za nulu.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Ne nutně chceme 32bajtovou hodnotu. Tímto se zbavíme přebytečných bajtů.

```solidity
        return _retVal;
    } // _calldataVal


    // Přečíst jeden parametr z dat volání, počínaje od _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Přečtení jednoho parametru z dat volání. Všimněte si, že musíme vrátit nejen přečtenou hodnotu, ale také pozici dalšího bajtu, protože parametry mohou mít délku od 1 bajtu do 33 bajtů.

```solidity
        // První bajt nám říká, jak interpretovat zbytek
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity se snaží snížit počet chyb tím, že zakazuje potenciálně nebezpečné [implicitní typové konverze](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). Snížení, například z 256 bitů na 8 bitů, musí být explicitní.

```solidity

        // Přečíst hodnotu, ale nezapisovat ji do mezipaměti
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Přečíst hodnotu a zapsat ji do mezipaměti
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Pokud jsme se dostali sem, znamená to, že musíme číst z mezipaměti

        // Počet dalších bajtů ke čtení
        uint8 _extraBytes = _firstByte / 16;
```

Vezměte spodní [půlbajt (nibble)](https://en.wikipedia.org/wiki/Nibble) a zkombinujte jej s ostatními bajty pro přečtení hodnoty z cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Přečíst n parametrů (funkce vědí, kolik parametrů očekávají)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Počet parametrů bychom mohli získat ze samotných dat volání, ale funkce, které nás volají, vědí, kolik parametrů očekávají. Je jednodušší nechat je, ať nám to řeknou.

```solidity
        // Parametry, které jsme přečetli
        uint[] memory params = new uint[](_paramNum);

        // Parametry začínají na bajtu 4, předtím je signatura funkce
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Čtěte parametry, dokud nebudete mít potřebný počet. Pokud překročíme konec dat volání, `_readParams` volání zvrátí.

```solidity

        return(params);
    }   // readParams

    // Pro testování _readParams, otestovat čtení čtyř parametrů
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Jednou z velkých výhod Foundry je, že umožňuje psát testy v Solidity ([viz Testování cache níže](#testing-the-cache)). To značně usnadňuje jednotkové testy (unit tests). Toto je funkce, která přečte čtyři parametry a vrátí je, aby test mohl ověřit, že byly správné.

```solidity
    // Získat hodnotu, vrátit bajty, které ji zakódují (s využitím mezipaměti, pokud je to možné)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` je funkce, kterou volá offchain kód, aby pomohla vytvořit data volání využívající cache. Přijme jednu hodnotu a vrátí bajty, které ji kódují. Tato funkce je `view`, takže nevyžaduje transakci a při externím volání nestojí žádný gas.

```solidity
        uint _key = val2key[_val];

        // Hodnota ještě není v mezipaměti, přidat ji
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

V [EVM](/developers/docs/evm/) se předpokládá, že veškeré neinicializované úložiště obsahuje nuly. Pokud tedy hledáme klíč pro hodnotu, která tam není, dostaneme nulu. V takovém případě jsou bajty, které ji kódují, `INTO_CACHE` (takže bude příště uložena do cache), následované samotnou hodnotou.

```solidity
        // Pokud je klíč <0x10, vrátit jej jako jeden bajt
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Jednotlivé bajty jsou nejjednodušší. Stačí použít [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) k přeměně typu `bytes<n>` na pole bajtů, které může mít libovolnou délku. Navzdory názvu to funguje dobře, i když je poskytnut pouze jeden argument.

```solidity
        // Dvoubajtová hodnota, zakódovaná jako 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Když máme klíč, který je menší než 16<sup>3</sup>, můžeme jej vyjádřit ve dvou bajtech. Nejprve převedeme `_key`, což je 256bitová hodnota, na 16bitovou hodnotu a použijeme logické OR k přidání počtu bajtů navíc k prvnímu bajtu. Pak to jen převedeme na hodnotu `bytes2`, kterou lze převést na `bytes`.

```solidity
        // Pravděpodobně existuje chytrý způsob, jak provést následující řádky jako smyčku,
        // ale je to view funkce, takže optimalizuji pro čas programátora a
        // jednoduchost.

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

Ostatní hodnoty (3 bajty, 4 bajty atd.) se zpracovávají stejným způsobem, jen s jinými velikostmi polí.

```solidity
        // Pokud se dostaneme sem, něco je špatně.
        revert("Error in encodeVal, should not happen");
```

Pokud se dostaneme sem, znamená to, že jsme dostali klíč, který není menší než 16\*256<sup>15</sup>. Ale `cacheWrite` omezuje klíče, takže se nemůžeme dostat ani na 14\*256<sup>16</sup> (což by mělo první bajt 0xFE, takže by to vypadalo jako `DONT_CACHE`). Nestojí nás ale moc přidat test pro případ, že by budoucí programátor zanesl chybu.

```solidity
    } // encodeVal

}  // Cache
```

### Testování cache {#testing-the-cache}

Jednou z výhod Foundry je, že [vám umožňuje psát testy v Solidity](https://getfoundry.sh/forge/tests/overview/), což usnadňuje psaní jednotkových testů. Testy pro třídu `Cache` jsou [zde](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Protože se testovací kód opakuje, jak už to u testů bývá, tento článek vysvětluje pouze zajímavé části.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Pro konzoli je nutné spustit `forge test -vv`.
import "forge-std/console.sol";
```

Toto je jen standardní kód (boilerplate), který je nezbytný pro použití testovacího balíčku a `console.log`.

```solidity
import "src/Cache.sol";
```

Potřebujeme znát kontrakt, který testujeme.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Funkce `setUp` se volá před každým testem. V tomto případě jen vytvoříme novou cache, aby se naše testy navzájem neovlivňovaly.

```solidity
    function testCaching() public {
```

Testy jsou funkce, jejichž názvy začínají na `test`. Tato funkce kontroluje základní funkčnost cache, zápis hodnot a jejich opětovné čtení.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Takto se provádí samotné testování pomocí [funkcí `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). V tomto případě kontrolujeme, zda hodnota, kterou jsme zapsali, je ta, kterou jsme přečetli. Výsledek `cache.cacheWrite` můžeme zahodit, protože víme, že klíče cache jsou přiřazovány lineárně.

```solidity
        }
    }    // testCaching


    // Uložit stejnou hodnotu do mezipaměti vícekrát, zajistit, že klíč zůstane
    // stejný
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Nejprve zapíšeme každou hodnotu do cache dvakrát a ujistíme se, že klíče jsou stejné (což znamená, že k druhému zápisu ve skutečnosti nedošlo).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Teoreticky by mohla existovat chyba, která neovlivňuje po sobě jdoucí zápisy do cache. Takže zde provedeme několik zápisů, které nenásledují po sobě, a vidíme, že hodnoty se stále nepřepisují.

```solidity
    // Přečíst uint z paměťového bufferu (abychom se ujistili, že dostaneme zpět parametry,
    // které jsme odeslali)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Přečtení 256bitového slova z bufferu `bytes memory`. Tato pomocná funkce nám umožňuje ověřit, že při spuštění volání funkce, která využívá cache, obdržíme správné výsledky.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul nepodporuje datové struktury nad rámec `uint256`, takže když odkazujete na sofistikovanější datovou strukturu, jako je paměťový buffer `_bytes`, získáte adresu této struktury. Solidity ukládá hodnoty `bytes memory` jako 32bajtové slovo, které obsahuje délku, následované samotnými bajty, takže abychom získali bajt číslo `_start`, musíme vypočítat `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Signatura funkce pro fourParams(), s laskavým svolením
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Jen nějaké konstantní hodnoty, abychom viděli, že dostáváme zpět správné hodnoty
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Některé konstanty, které potřebujeme pro testování.

```solidity
    function testReadParam() public {
```

Zavolání `fourParams()`, funkce, která používá `readParams`, abychom otestovali, že dokážeme správně číst parametry.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

K volání funkce využívající cache nemůžeme použít normální mechanismus ABI, takže musíme použít nízkoúrovňový mechanismus [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Tento mechanismus bere jako vstup `bytes memory` a vrací jej (stejně jako booleovskou hodnotu) jako výstup.

```solidity
        // První volání, mezipaměť je prázdná
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Je užitečné, aby stejný kontrakt podporoval jak cachované funkce (pro volání přímo z transakcí), tak necachované funkce (pro volání z jiných chytrých kontraktů). K tomu se musíme i nadále spoléhat na mechanismus Solidity pro volání správné funkce, místo abychom vše vkládali do [funkce `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Tím se výrazně usnadní skládatelnost. K identifikaci funkce by ve většině případů stačil jeden bajt, takže plýtváme třemi bajty (16\*3=48 gasu). Nicméně v době psaní tohoto textu stojí těchto 48 gasu 0,07 centu, což je rozumná cena za jednodušší kód, který je méně náchylný k chybám.

```solidity
            // První hodnota, přidat ji do mezipaměti
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

První hodnota: Příznak říkající, že jde o plnou hodnotu, kterou je třeba zapsat do cache, následovaný 32 bajty hodnoty. Další tři hodnoty jsou podobné, s tím rozdílem, že `VAL_B` se do cache nezapisuje a `VAL_C` je třetím i čtvrtým parametrem.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Zde skutečně voláme kontrakt `Cache`.

```solidity
        assertEq(_success, true);
```

Očekáváme, že volání bude úspěšné.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Začneme s prázdnou cache a poté přidáme `VAL_A` následované `VAL_C`. Očekávali bychom, že první bude mít klíč 1 a druhé 2.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Výstupem jsou čtyři parametry. Zde ověřujeme, že je to správně.

```solidity
        // Druhé volání, můžeme použít mezipaměť
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // První hodnota v mezipaměti
            bytes1(0x01),
```

Klíče cache menší než 16 mají pouze jeden bajt.

```solidity
            // Druhá hodnota, nepřidávat ji do mezipaměti
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Třetí a čtvrtá hodnota, stejná hodnota
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Testy po volání jsou identické s těmi po prvním volání.

```solidity
    function testEncodeVal() public {
```

Tato funkce je podobná `testReadParam`, s tím rozdílem, že místo explicitního zápisu parametrů používáme `encodeVal()`.

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

Jediným dalším testem v `testEncodeVal()` je ověření, že délka `_callInput` je správná. Pro první volání je to 4+33\*4. Pro druhé, kde je každá hodnota již v cache, je to 4+1\*4.

```solidity
    // Otestovat encodeVal, když je klíč delší než jeden bajt
    // Maximálně tři bajty, protože naplnění mezipaměti na čtyři bajty trvá
    // příliš dlouho.
    function testEncodeValBig() public {
        // Vložit do mezipaměti několik hodnot.
        // Pro zjednodušení použít klíč n pro hodnotu n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Výše uvedená funkce `testEncodeVal` zapisuje do cache pouze čtyři hodnoty, takže [část funkce, která se zabývá vícedílnými bajtovými hodnotami](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171), není kontrolována. Tento kód je ale složitý a náchylný k chybám.

První částí této funkce je smyčka, která postupně zapisuje všechny hodnoty od 1 do 0x1FFF do cache, takže budeme schopni tyto hodnoty zakódovat a vědět, kam směřují.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Jeden bajt      0x0F
            cache.encodeVal(0x0010),   // Dva bajty       0x1010
            cache.encodeVal(0x0100),   // Dva bajty       0x1100
            cache.encodeVal(0x1000)    // Tři bajty       0x201000
        );
```

Otestujte jednobajtové, dvoubajtové a tříbajtové hodnoty. Dále netestujeme, protože by trvalo příliš dlouho zapsat dostatek položek zásobníku (alespoň 0x10000000, přibližně čtvrt miliardy).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Otestovat, že s příliš malým bufferem dostaneme zvrácení
    function testShortCalldata() public {
```

Otestujte, co se stane v abnormálním případě, kdy není dostatek parametrů.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Vzhledem k tomu, že se zvrátí, výsledek, který bychom měli dostat, je `false`.

```
// Volání s klíči cache, které tam nejsou
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // První hodnota, přidat ji do cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Druhá hodnota
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Tato funkce dostane čtyři naprosto legitimní parametry, s tím rozdílem, že cache je prázdná, takže v ní nejsou žádné hodnoty ke čtení.

```solidity
        .
        .
        .
    // Otestovat, že s příliš dlouhým bufferem vše funguje v pořádku
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // První volání, mezipaměť je prázdná
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // První hodnota, přidat ji do mezipaměti
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Druhá hodnota, přidat ji do mezipaměti
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Třetí hodnota, přidat ji do mezipaměti
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Čtvrtá hodnota, přidat ji do mezipaměti
            cache.INTO_CACHE(), bytes32(VAL_D),

            // A další hodnota pro „štěstí“
            bytes4(0x31112233)
        );
```

Tato funkce odesílá pět hodnot. Víme, že pátá hodnota je ignorována, protože to není platný záznam v cache, což by způsobilo zvrácení, kdyby nebyla zahrnuta.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Ukázková aplikace {#a-sample-app}

Psaní testů v Solidity je sice hezké, ale na konci dne musí být decentralizovaná aplikace (dapp) schopna zpracovávat požadavky mimo řetězec, aby byla užitečná. Tento článek ukazuje, jak používat cachování v dapp s `WORM`, což znamená „Write Once, Read Many“ (Zapiš jednou, čti mnohokrát). Pokud klíč ještě není zapsán, můžete do něj zapsat hodnotu. Pokud je klíč již zapsán, dojde ke zvrácení.

### Kontrakt {#the-contract}

[Toto je kontrakt](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Většinou opakuje to, co jsme již udělali s `Cache` a `CacheTest`, takže se budeme věnovat pouze zajímavým částem.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Nejjednodušší způsob, jak použít `Cache`, je zdědit jej v našem vlastním kontraktu.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Tato funkce je podobná `fourParam` v `CacheTest` výše. Protože se neřídíme specifikacemi ABI, je nejlepší do funkce nedeklarovat žádné parametry.

```solidity
    // Usnadnit naše volání
    // Signatura funkce pro writeEntryCached(), s laskavým svolením
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Externí kód, který volá `writeEntryCached`, bude muset ručně sestavit data volání místo použití `worm.writeEntryCached`, protože se neřídíme specifikacemi ABI. Mít tuto konstantní hodnotu jen usnadňuje její zápis.

Všimněte si, že i když definujeme `WRITE_ENTRY_CACHED` jako stavovou proměnnou, pro její externí čtení je nutné použít její getter funkci, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Funkce pro čtení je `view`, takže nevyžaduje transakci a nestojí žádný gas. V důsledku toho nemá použití cache pro parametr žádnou výhodu. U view funkcí je nejlepší použít standardní mechanismus, který je jednodušší.

### Testovací kód {#the-testing-code}

[Toto je testovací kód pro kontrakt](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Opět se podívejme pouze na to, co je zajímavé.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Takto (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) ve Foundry testu specifikujeme, že další volání by mělo selhat, a nahlášený důvod selhání. To platí, když používáme syntaxi `<contract>.<function name>()` místo sestavování dat volání a volání kontraktu pomocí nízkoúrovňového rozhraní (`<contract>.call()` atd.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Zde využíváme skutečnosti, že `cacheWrite` vrací klíč cache. To není něco, co bychom očekávali, že použijeme v produkci, protože `cacheWrite` mění stav, a proto může být voláno pouze během transakce. Transakce nemají návratové hodnoty, pokud mají výsledky, předpokládá se, že tyto výsledky budou emitovány jako události. Návratová hodnota `cacheWrite` je tedy přístupná pouze z onchain kódu a onchain kód nepotřebuje cachování parametrů.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Takto řekneme Solidity, že ačkoli má `<contract address>.call()` dvě návratové hodnoty, zajímá nás pouze ta první.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Vzhledem k tomu, že používáme nízkoúrovňovou funkci `<address>.call()`, nemůžeme použít `vm.expectRevert()` a musíme se podívat na booleovskou hodnotu úspěchu, kterou získáme z volání.

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

Tímto způsobem ověřujeme, že kód ve Foundry [správně emituje událost](https://getfoundry.sh/reference/cheatcodes/expect-emit/).

### Klient {#the-client}
Jedna věc, kterou s testy v Solidity nezískáte, je kód v JavaScriptu, který můžete zkopírovat a vložit do své vlastní aplikace. Abych tento kód napsal, nasadil jsem WORM na [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), nový testnet sítě [Optimism](https://www.optimism.io/). Nachází se na adrese [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Kód v JavaScriptu pro klienta si můžete prohlédnout zde](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Chcete-li jej použít:

1. Naklonujte git repozitář:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Nainstalujte potřebné balíčky:

   ```sh
   cd javascript
   yarn
   ```

3. Zkopírujte konfigurační soubor:

   ```sh
   cp .env.example .env
   ```

4. Upravte `.env` pro vaši konfiguraci:

   | Parametr | Hodnota |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC | Mnemotechnická pomůcka (seed) pro účet, který má dostatek ETH na zaplacení transakce. [Zde můžete získat zdarma ETH pro síť Optimism Goerli](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL na Optimism Goerli. Veřejný koncový bod, `https://goerli.optimism.io`, je omezen rychlostí (rate limited), ale pro naše potřeby zde postačuje. |

5. Spusťte `index.js`.

   ```sh
   node index.js
   ```

   Tato ukázková aplikace nejprve zapíše záznam do WORM, přičemž zobrazí data volání a odkaz na transakci na Etherscanu. Poté tento záznam přečte zpět a zobrazí klíč, který používá, a hodnoty v záznamu (hodnota, číslo bloku a autor).

Většina klienta je běžný JavaScript pro dapp. Takže si opět projdeme jen ty zajímavé části.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Pokaždé je potřeba nový klíč
    const key = await worm.encodeVal(Number(new Date()))
```

Do daného slotu lze zapisovat pouze jednou, takže používáme časové razítko, abychom se ujistili, že sloty nepoužijeme znovu.

```javascript
const val = await worm.encodeVal("0x600D")

// Zapsat záznam
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers očekává, že data volání budou hexadecimální řetězec, `0x` následovaný sudým počtem hexadecimálních číslic. Vzhledem k tomu, že `key` i `val` začínají na `0x`, musíme tyto hlavičky odstranit.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Stejně jako u testovacího kódu v Solidity nemůžeme cachovanou funkci volat normálně. Místo toho musíme použít nízkoúrovňovější mechanismus.

```javascript
    .
    .
    .
    // Přečíst právě zapsaný záznam
    const realKey = '0x' + key.slice(4)  // odstranit příznak FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Pro čtení záznamů můžeme použít normální mechanismus. U funkcí `view` není nutné používat cachování parametrů.

## Závěr {#conclusion}

Kód v tomto článku je proof of concept (ověření konceptu), jehož účelem je usnadnit pochopení této myšlenky. Pro systém připravený do produkce byste možná chtěli implementovat některé další funkce:

- Zpracování hodnot, které nejsou `uint256`. Například řetězce.
- Místo globální cache mít možná mapování mezi uživateli a cachemi. Různí uživatelé používají různé hodnoty.
- Hodnoty používané pro adresy se liší od hodnot používaných pro jiné účely. Možná by dávalo smysl mít samostatnou cache jen pro adresy.
- V současné době jsou klíče cache založeny na algoritmu „kdo dřív přijde, má nejmenší klíč“. Prvních šestnáct hodnot lze odeslat jako jeden bajt. Dalších 4080 hodnot lze odeslat jako dva bajty. Další přibližně milion hodnot jsou tři bajty atd. Produkční systém by měl udržovat počítadla využití záznamů v cache a reorganizovat je tak, aby šestnáct _nejběžnějších_ hodnot mělo jeden bajt, dalších 4080 nejběžnějších hodnot dva bajty atd.

  To je však potenciálně nebezpečná operace. Představte si následující sled událostí:

  1. Naivní Noam zavolá `encodeVal`, aby zakódoval adresu, na kterou chce poslat tokeny. Tato adresa je jednou z prvních použitých v aplikaci, takže zakódovaná hodnota je 0x06. Jedná se o funkci `view`, nikoli o transakci, takže probíhá mezi Noamem a uzlem, který používá, a nikdo jiný o tom neví.

  2. Majitel Owen spustí operaci změny pořadí v cache. Tuto adresu ve skutečnosti používá jen velmi málo lidí, takže je nyní zakódována jako 0x201122. Jiné hodnotě, 10<sup>18</sup>, je přiřazeno 0x06.

  3. Naivní Noam pošle své tokeny na 0x06. Ty jdou na adresu `0x0000000000000000000000000de0b6b3a7640000`, a protože nikdo nezná soukromý klíč k této adrese, prostě tam uvíznou. Noam _není nadšený_.

  Existují způsoby, jak tento problém vyřešit, stejně jako související problém transakcí, které jsou v mempoolu během změny pořadí v cache, ale musíte si toho být vědomi.

Cachování jsem zde demonstroval na síti Optimism, protože jsem zaměstnancem Optimism a toto je rollup, který znám nejlépe. Mělo by to ale fungovat s jakýmkoli rollupem, který si účtuje minimální náklady na interní zpracování, takže ve srovnání s tím je zápis transakčních dat na vrstvu 1 (l1) hlavním výdajem.

[Zde najdete další mou práci](https://cryptodocguy.pro/).