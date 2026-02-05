---
title: "Vše, co můžete cachovat"
description: "Naučte se, jak vytvořit a používat cachovací kontrakt pro levnější rollupové transakce"
author: Ori Pomerantz
tags: [ "vrstva 2", "cachování", "úložiště" ]
skill: intermediate
published: 2022-09-15
lang: cs
---

Při používání rollupů je cena jednoho bajtu v transakci o mnoho vyšší než cena slotu v úložišti. Proto dává smysl cachovat co nejvíce informací na blockchainu.

V tomto článku se naučíte, jak vytvořit a používat cachovací kontrakt tak, aby se každá hodnota parametru, která se pravděpodobně použije vícekrát, uložila do cache a byla (po prvním použití) dostupná za použití mnohem menšího počtu bajtů, a jak napsat off-chain kód, který tuto cache využívá.

Pokud chcete článek přeskočit a podívat se rovnou na zdrojový kód, [najdete ho zde](https://github.com/qbzzt/20220915-all-you-can-cache). Vývojový stack je [Foundry](https://getfoundry.sh/introduction/installation/).

## Celkový návrh {#overall-design}

Pro zjednodušení budeme předpokládat, že všechny parametry transakce jsou typu `uint256` o délce 32 bajtů. Když obdržíme transakci, zpracujeme každý parametr následujícím způsobem:

1. Pokud je první bajt `0xFF`, vezměte následujících 32 bajtů jako hodnotu parametru a zapište ji do cache.

2. Pokud je první bajt `0xFE`, vezměte následujících 32 bajtů jako hodnotu parametru, ale _nezapisujte_ ji do cache.

3. Pro jakoukoliv jinou hodnotu vezměte horní čtyři bity jako počet dalších bajtů a spodní čtyři bity jako nejvýznamnější bity klíče cache. Zde je několik příkladů:

   | Bajty v calldata | Klíč cache |
   | :--------------- | ---------: |
   | 0x0F             |       0x0F |
   | 0x10,0x10        |       0x10 |
   | 0x12,0xAC        |     0x02AC |
   | 0x2D,0xEA, 0xD6  |   0x0DEAD6 |

## Manipulace s cache {#cache-manipulation}

Cache je implementována v souboru [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Pojďme si ho projít řádek po řádku.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Tyto konstanty se používají k interpretaci speciálních případů, kdy poskytujeme všechny informace a chceme je buď zapsat do cache, nebo ne. Zápis do cache vyžaduje dvě operace [`SSTORE`](https://www.evm.codes/#55) do dříve nepoužitých slotů v úložišti s cenou 22 100 gasu za každou, takže je to volitelné.

```solidity

    mapping(uint => uint) public val2key;
```

[Mapování](https://www.geeksforgeeks.org/solidity/solidity-mappings/) mezi hodnotami a jejich klíči. Tato informace je nezbytná k zakódování hodnot před odesláním transakce.

```solidity
    // Umístění n má hodnotu pro klíč n+1, protože potřebujeme zachovat
    // nulu jako „není v cache“.
    uint[] public key2val;
```

Pro mapování z klíčů na hodnoty můžeme použít pole, protože klíče přiřazujeme my a pro zjednodušení to děláme sekvenčně.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Čtení neinicializované položky cache");
        return key2val[_key-1];
    }  // cacheRead
```

Přečte hodnotu z cache.

```solidity
    // Zapíše hodnotu do cache, pokud tam ještě není
    // Veřejné jen proto,aby fungoval test
    function cacheWrite(uint _value) public returns (uint) {
        // Pokud je hodnota již v cache, vrátí aktuální klíč
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Nemá smysl vkládat stejnou hodnotu do cache více než jednou. Pokud tam hodnota již je, stačí vrátit stávající klíč.

```solidity
        // Jelikož 0xFE je speciální případ, největší klíč, který může cache
        // obsahovat, je 0x0D následovaný 15x 0xFF. Pokud už je délka cache tak
        // velká, selže.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "přetečení cache");
```

Nemyslím si, že se někdy dočkáme tak velké cache (přibližně 1,8\*10<sup>37</sup> položek, což by vyžadovalo asi 10<sup>27</sup> TB k uložení). Jsem však dost starý na to, abych si pamatoval [„640 kB bude vždy stačit“](https://quoteinvestigator.com/2011/09/08/640k-enough/). Tento test je velmi levný.

```solidity
        // Zapíše hodnotu pomocí dalšího klíče
        val2key[_value] = key2val.length+1;
```

Přidá zpětné vyhledávání (od hodnoty ke klíči).

```solidity
        key2val.push(_value);
```

Přidá dopředné vyhledávání (od klíče k hodnotě). Protože přiřazujeme hodnoty sekvenčně, můžeme ji jednoduše přidat za poslední hodnotu v poli.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Vrátí novou délku `key2val`, což je buňka, kde je uložena nová hodnota.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Tato funkce čte hodnotu z calldata libovolné délky (až 32 bajtů, což je velikost slova).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "limit délky _calldataVal je 32 bajtů");
        require(length + startByte <= msg.data.length,
            "_calldataVal se snaží číst za calldatasize");
```

Tato funkce je interní, takže pokud je zbytek kódu napsán správně, tyto testy nejsou nutné. Nestojí však mnoho, takže je můžeme klidně použít.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Tento kód je v jazyce [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Čte 32bajtovou hodnotu z calldata. Funguje to i v případě, že calldata končí před `startByte+32`, protože neinicializovaný prostor v EVM je považován za nulový.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Nemusíme nutně chtít 32bajtovou hodnotu. Tím se zbavíme přebytečných bajtů.

```solidity
        return _retVal;
    } // _calldataVal


    // Načte jeden parametr z calldata, počínaje od _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Načte jeden parametr z calldata. Všimněte si, že musíme vrátit nejen hodnotu, kterou jsme načetli, ale také umístění dalšího bajtu, protože parametry mohou mít délku od 1 do 33 bajtů.

```solidity
        // První bajt nám říká, jak interpretovat zbytek
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity se snaží snížit počet chyb tím, že zakazuje potenciálně nebezpečné [implicitní převody typů](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions). Downgrade, například z 256 bitů na 8 bitů, musí být explicitní.

```solidity

        // Přečte hodnotu, ale nezapíše ji do cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Přečte hodnotu a zapíše ji do cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Pokud jsme se dostali sem, znamená to, že musíme číst z cache

        // Počet bajtů navíc ke čtení
        uint8 _extraBytes = _firstByte / 16;
```

Vezměte nižší [půlbajt](https://en.wikipedia.org/wiki/Nibble) a zkombinujte ho s ostatními bajty, abyste načetli hodnotu z cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Načte n parametrů (funkce vědí, kolik parametrů očekávají)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Počet parametrů, které máme, bychom mohli získat ze samotné calldata, ale funkce, které nás volají, vědí, kolik parametrů očekávají. Je jednodušší, nechat si to od nich říct.

```solidity
        // Parametry, které čteme
        uint[] memory params = new uint[](_paramNum);

        // Parametry začínají na 4. bajtu, předtím je podpis funkce
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Čtěte parametry, dokud nebudete mít požadovaný počet. Pokud překročíme konec calldata, `_readParams` vrátí volání zpět.

```solidity

        return(params);
    }   // readParams

    // Pro testování _readParams, testování čtení čtyř parametrů
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Jednou z velkých výhod Foundry je, že umožňuje psát testy v Solidity ([viz Testování cache níže](#testing-the-cache)). To značně usnadňuje jednotkové testy. Jedná se o funkci, která přečte čtyři parametry a vrátí je, aby test mohl ověřit, že byly správné.

```solidity
    // Získá hodnotu, vrátí bajty, které ji zakódují (pokud možno s použitím cache)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` je funkce, kterou volá off-chain kód, aby pomohla vytvořit calldata, která používá cache. Přijímá jednu hodnotu a vrací bajty, které ji kódují. Tato funkce je `view`, takže nevyžaduje transakci a při externím volání nestojí žádný gas.

```solidity
        uint _key = val2key[_val];

        // Hodnota ještě není v cache, přidejte ji
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

V [EVM](/developers/docs/evm/) se předpokládá, že všechna neinicializovaná úložiště jsou nulová. Takže pokud hledáme klíč pro hodnotu, která tam není, dostaneme nulu. V takovém případě jsou bajty, které ji kódují, `INTO_CACHE` (takže bude při příštím použití cachována), následované skutečnou hodnotou.

```solidity
        // Pokud je klíč <0x10, vraťte ho jako jeden bajt
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Jednotlivé bajty jsou nejjednodušší. Použijeme jen [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) pro převod typu `bytes<n>` na pole bajtů, které může mít libovolnou délku. Navzdory svému názvu funguje dobře i při zadání pouze jednoho argumentu.

```solidity
        // Dvoubajtová hodnota, zakódovaná jako 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Pokud máme klíč, který je menší než 16<sup>3</sup>, můžeme ho vyjádřit ve dvou bajtech. Nejprve převedeme `_key`, což je 256bitová hodnota, na 16bitovou hodnotu a pomocí logického součtu přidáme počet bajtů navíc k prvnímu bajtu. Poté ji převedeme na hodnotu `bytes2`, kterou lze převést na `bytes`.

```solidity
        // Pravděpodobně existuje chytrý způsob, jak provést následující řádky jako smyčku,
        // ale je to funkce typu view, takže optimalizuji na čas programátora a
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

Ostatní hodnoty (3 bajty, 4 bajty atd.) jsou zpracovávány stejným způsobem, jen s jinými velikostmi polí.

```solidity
        // Pokud se dostaneme sem, něco je špatně.
        revert("Chyba v encodeVal, nemělo by se stát");
```

Pokud se dostaneme sem, znamená to, že jsme dostali klíč, který je větší než 16\*256<sup>15</sup>. Ale `cacheWrite` omezuje klíče, takže se nemůžeme dostat ani na 14\*256<sup>16</sup> (což by mělo první bajt 0xFE, takže by to vypadalo jako `DONT_CACHE`). Ale přidání testu pro případ, že budoucí programátor zavede chybu, nás moc nestojí.

```solidity
    } // encodeVal

}  // Cache
```

### Testování cache {#testing-the-cache}

Jednou z výhod Foundry je, že [vám umožňuje psát testy v Solidity](https://getfoundry.sh/forge/tests/overview/), což usnadňuje psaní jednotkových testů. Testy pro třídu `Cache` jsou [zde](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Protože testovací kód je repetitivní, jak už to u testů bývá, tento článek vysvětluje pouze zajímavé části.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Je potřeba spustit `forge test -vv` pro konzoli.
import "forge-std/console.sol";
```

Toto je pouze boilerplate, který je nezbytný pro použití testovacího balíčku a `console.log`.

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

Funkce `setUp` se volá před každým testem. V tomto případě pouze vytvoříme novou cache, aby se naše testy navzájem neovlivňovaly.

```solidity
    function testCaching() public {
```

Testy jsou funkce, jejichž názvy začínají na `test`. Tato funkce kontroluje základní funkčnost cache, zapisuje hodnoty a znovu je čte.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Takto se provádí skutečné testování pomocí [funkcí `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). V tomto případě kontrolujeme, že hodnota, kterou jsme zapsali, je ta, kterou jsme přečetli. Výsledek `cache.cacheWrite` můžeme zahodit, protože víme, že klíče cache jsou přiřazovány lineárně.

```solidity
        }
    }    // testCaching


    // Cachovat stejnou hodnotu vícekrát, zajistit, aby klíč zůstal
    // stejný
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Nejprve zapíšeme každou hodnotu dvakrát do cache a ujistíme se, že klíče jsou stejné (což znamená, že druhý zápis se ve skutečnosti neuskutečnil).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Teoreticky by mohla existovat chyba, která neovlivní po sobě jdoucí zápisy do cache. Takže zde provedeme několik zápisů, které nejsou po sobě jdoucí, a uvidíme, že hodnoty se stále nepřepisují.

```solidity
    // Přečte uint z bufferu v paměti (abychom se ujistili, že dostaneme zpět parametry,
    // které jsme odeslali)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Přečte 256bitové slovo z bufferu `bytes memory`. Tato pomocná funkce nám umožňuje ověřit, že při spuštění volání funkce, která používá cache, obdržíme správné výsledky.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul nepodporuje datové struktury nad rámec `uint256`, takže když odkazujete na sofistikovanější datovou strukturu, jako je paměťový buffer `_bytes`, získáte adresu této struktury. Solidity ukládá hodnoty `bytes memory` jako 32bajtové slovo, které obsahuje délku, následované skutečnými bajty, takže pro získání bajtu číslo `_start` musíme vypočítat `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Podpis funkce pro fourParams(), s laskavým svolením
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Jen několik konstantních hodnot, abychom viděli, že dostáváme zpět správné hodnoty
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Některé konstanty, které potřebujeme pro testování.

```solidity
    function testReadParam() public {
```

Zavoláním `fourParams()`, funkce, která používá `readParams`, otestujeme, zda umíme správně číst parametry.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Nemůžeme použít normální mechanismus ABI pro volání funkce pomocí cache, takže musíme použít nízkoúrovňový mechanismus [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Tento mechanismus přijímá jako vstup `bytes memory` a vrací je (stejně jako booleovskou hodnotu) jako výstup.

```solidity
        // První volání, cache je prázdná
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Je užitečné, aby stejný kontrakt podporoval jak cachované funkce (pro volání přímo z transakcí), tak i necachované funkce (pro volání z jiných chytrých kontraktů). Abychom toho dosáhli, musíme se nadále spoléhat na mechanismus Solidity pro volání správné funkce, namísto toho, abychom vše vkládali do [funkce `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Tímto způsobem je kompozitnost mnohem snazší. Jeden bajt by ve většině případů stačil k identifikaci funkce, takže plýtváme třemi bajty (16\*3=48 gasu). Nicméně, v době psaní tohoto článku stojí těchto 48 gasů 0,07 centů, což je rozumná cena za jednodušší a méně chybový kód.

```solidity
            // První hodnota, přidejte ji do cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

První hodnota: Příznak, který říká, že je to plná hodnota, která se musí zapsat do cache, následovaný 32 bajty hodnoty. Ostatní tři hodnoty jsou podobné, s výjimkou toho, že `VAL_B` se do cache nezapisuje a `VAL_C` je jak třetím, tak čtvrtým parametrem.

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

Začínáme s prázdnou cache a poté přidáme `VAL_A` následované `VAL_C`. Očekávali bychom, že první bude mít klíč 1 a druhý klíč 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Výstupem jsou čtyři parametry. Zde ověřujeme, že je správný.

```solidity
        // Druhé volání, můžeme použít cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // První hodnota v cache
            bytes1(0x01),
```

Klíče cache pod 16 jsou pouze jeden bajt.

```solidity
            // Druhá hodnota, nepřidávejte ji do cache
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

Testy po volání jsou totožné s testy po prvním volání.

```solidity
    function testEncodeVal() public {
```

Tato funkce je podobná funkci `testReadParam`, s výjimkou toho, že místo explicitního psaní parametrů používáme `encodeVal()`.

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

Jediný dodatečný test v `testEncodeVal()` je ověření, že délka `_callInput` je správná. Pro první volání je to 4+33\*4. Pro druhé, kde je každá hodnota již v cache, je to 4+1\*4.

```solidity
    // Testujte encodeVal, když je klíč delší než jeden bajt
    // Maximálně tři bajty, protože plnění cache na čtyři bajty trvá
    // příliš dlouho.
    function testEncodeValBig() public {
        // Vložte několik hodnot do cache.
        // Pro zjednodušení použijte klíč n pro hodnotu n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Výše uvedená funkce `testEncodeVal` zapisuje do cache pouze čtyři hodnoty, takže [část funkce, která se zabývá vícebajtovými hodnotami](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) se nekontroluje. Ale tento kód je složitý a náchylný k chybám.

První část této funkce je smyčka, která zapisuje všechny hodnoty od 1 do 0x1FFF do cache v pořadí, takže budeme moci tyto hodnoty zakódovat a vědět, kam jdou.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Jeden bajt        0x0F
            cache.encodeVal(0x0010),   // Dva bajty     0x1010
            cache.encodeVal(0x0100),   // Dva bajty     0x1100
            cache.encodeVal(0x1000)    // Tři bajty 0x201000
        );
```

Otestujte jednobajtové, dvoubajtové a tříbajtové hodnoty. Dále netestujeme, protože by trvalo příliš dlouho zapsat dostatek položek zásobníku (alespoň 0x10000000, přibližně čtvrt miliardy).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Otestujte, co se stane s příliš malým bufferem, dostaneme revert
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

Jelikož se to vrací, výsledek, který bychom měli dostat, je `false`.

```
    // Volání s klíči cache, které tam nejsou
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // První hodnota, přidejte ji do cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Druhá hodnota
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Tato funkce dostane čtyři naprosto legitimní parametry, s výjimkou toho, že cache je prázdná, takže tam nejsou žádné hodnoty ke čtení.

```solidity
        .
        .
        .
    // Otestujte, co s příliš dlouhým bufferem, vše funguje
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // První volání, cache je prázdná
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // První hodnota, přidejte ji do cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Druhá hodnota, přidejte ji do cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Třetí hodnota, přidejte ji do cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Čtvrtá hodnota, přidejte ji do cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // A další hodnota pro „štěstí“
            bytes4(0x31112233)
        );
```

Tato funkce posílá pět hodnot. Víme, že pátá hodnota je ignorována, protože se nejedná o platný záznam cache, což by způsobilo vrácení, kdyby nebyla zahrnuta.

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

Psaní testů v Solidity je sice skvělé, ale aby byla dapp užitečná, musí být schopna zpracovávat požadavky i mimo blockchain. Tento článek ukazuje, jak používat cachování v dapp s `WORM`, což znamená „Write Once, Read Many“ (Zapiš jednou, čti mnohokrát). Pokud klíč ještě není zapsán, můžete do něj zapsat hodnotu. Pokud je klíč již zapsán, dostanete revert.

### Kontrakt {#the-contract}

[Zde je kontrakt](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Většinou se opakuje to, co jsme již udělali s `Cache` a `CacheTest`, takže se budeme zabývat pouze zajímavými částmi.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Nejjednodušší způsob, jak použít `Cache`, je zdědit ho ve vlastním kontraktu.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Tato funkce je podobná `fourParam` ve výše uvedeném `CacheTest`. Protože se nedržíme specifikací ABI, je nejlepší do funkce nedeklarovat žádné parametry.

```solidity
    // Usnadněte si volání
    // Podpis funkce pro writeEntryCached(), s laskavým svolením
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Externí kód, který volá `writeEntryCached`, bude muset manuálně sestavit calldata, namísto použití `worm.writeEntryCached`, protože nedodržujeme specifikace ABI. Tato konstantní hodnota pouze usnadňuje její zápis.

Všimněte si, že i když definujeme `WRITE_ENTRY_CACHED` jako stavovou proměnnou, pro její externí čtení je nutné použít getter funkci, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Funkce čtení je `view`, takže nevyžaduje transakci a nestojí žádný gas. V důsledku toho nemá použití cache pro parametr žádný přínos. U funkcí typu view je nejlepší používat standardní mechanismus, který je jednodušší.

### Testovací kód {#the-testing-code}

[Zde je testovací kód pro kontrakt](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Opět se podívejme pouze na to, co je zajímavé.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("záznam již zapsán"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Tímto (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) v testu Foundry specifikujeme, že další volání by mělo selhat, a uvádíme důvod selhání. To platí, když používáme syntaxi `<kontrakt>.<název funkce>`()` spíše než vytváření calldata a volání kontraktu pomocí nízkoúrovňového rozhraní (`<kontrakt>.call()` atd.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Zde využíváme toho, že `cacheWrite` vrací klíč cache. To není něco, co bychom očekávali v produkci, protože `cacheWrite` mění stav, a proto může být volána pouze během transakce. Transakce nemají návratové hodnoty, pokud mají nějaké výsledky, mají být emitovány jako události. Návratová hodnota `cacheWrite` je tedy přístupná pouze z on-chain kódu a on-chain kód nepotřebuje cachování parametrů.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Takto říkáme Solidity, že ačkoli `<adresa kontraktu>.call()` má dvě návratové hodnoty, zajímá nás pouze ta první.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Protože používáme nízkoúrovňovou funkci `<address>.call()`, nemůžeme použít `vm.expectRevert()` a musíme se podívat na booleovskou hodnotu úspěchu, kterou získáme z volání.

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

Toto je způsob, jak ve Foundry ověřit, že kód [správně emituje událost](https://getfoundry.sh/reference/cheatcodes/expect-emit/).

### Klient {#the-client}

Jedna věc, kterou se testy v Solidity nezískáte, je JavaScriptový kód, který můžete zkopírovat a vložit do své vlastní aplikace. Abych mohl napsat tento kód, nasadil jsem WORM na [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), nový testnet [Optimismu](https://www.optimism.io/). Je na adrese [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Zde si můžete prohlédnout JavaScriptový kód pro klienta](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Použití:

1. Klonujte git repozitář:

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

   | Parametr                                                      | Hodnota                                                                                                                                                                                             |
   | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | Mnemotechnická pomůcka pro účet, který má dostatek ETH na zaplacení transakce. [Zde můžete získat ETH zdarma pro síť Optimism Goerli](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL k Optimism Goerli. Veřejný koncový bod `https://goerli.optimism.io` má omezenou rychlost, ale pro naše potřeby je dostačující.                                  |

5. Spusťte `index.js`.

   ```sh
   node index.js
   ```

   Tato ukázková aplikace nejprve zapíše položku do WORM, zobrazí calldata a odkaz na transakci na Etherscanu. Poté přečte zpět tuto položku a zobrazí klíč, který používá, a hodnoty v položce (hodnota, číslo bloku a autor).

Většina klienta je normální Dapp JavaScript. Takže opět projdeme jen zajímavé části.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Pokaždé je potřeba nový klíč
    const key = await worm.encodeVal(Number(new Date()))
```

Do daného slotu lze zapsat pouze jednou, takže použijeme časové razítko, abychom se ujistili, že sloty nepoužíváme opakovaně.

```javascript
const val = await worm.encodeVal("0x600D")

// Zapište položku
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers očekává, že data volání budou hexadecimální řetězec, `0x` následovaný sudým počtem hexadecimálních číslic. Protože `key` i `val` začínají na `0x`, musíme tyto hlavičky odstranit.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Stejně jako u testovacího kódu Solidity nemůžeme cachovanou funkci volat normálně. Místo toho musíme použít nízkoúrovňový mechanismus.

```javascript
    .
    .
    .
    // Přečtěte právě zapsanou položku
    const realKey = '0x' + key.slice(4)  // odstraňte příznak FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Pro čtení položek můžeme použít normální mechanismus. U funkcí `view` není třeba používat cachování parametrů.

## Závěr {#conclusion}

Kód v tomto článku je proof of concept, jehož účelem je usnadnit pochopení myšlenky. Pro produkční systém byste mohli chtít implementovat některé další funkce:

- Zpracování hodnot, které nejsou `uint256`. Například řetězce.
- Místo globální cache možná mít mapování mezi uživateli a cachemi. Různí uživatelé používají různé hodnoty.
- Hodnoty používané pro adresy se liší od hodnot používaných pro jiné účely. Mohlo by mít smysl mít samostatnou cache pouze pro adresy.
- V současné době jsou klíče cache založeny na algoritmu „kdo dřív přijde, ten má nejmenší klíč“. Prvních šestnáct hodnot lze odeslat jako jeden bajt. Dalších 4080 hodnot lze odeslat jako dva bajty. Další přibližně milion hodnot jsou tři bajty atd. Produkční systém by měl vést počítadla použití záznamů cache a reorganizovat je tak, aby šestnáct _nejběžnějších_ hodnot bylo jednobajtových, dalších 4080 nejběžnějších hodnot dvoubajtových atd.

  To je však potenciálně nebezpečná operace. Představte si následující sled událostí:

  1. Noam Naive zavolá `encodeVal` k zakódování adresy, na kterou chce poslat tokeny. Tato adresa je jedna z prvních použitých v aplikaci, takže zakódovaná hodnota je 0x06. Toto je funkce `view`, ne transakce, takže je to mezi Noamem a uzlem, který používá, a nikdo jiný o tom neví.

  2. Owen Owner spustí operaci přeuspořádání cache. Velmi málo lidí skutečně používá tuto adresu, takže je nyní zakódována jako 0x201122. Jiná hodnota, 10<sup>18</sup>, je přiřazena 0x06.

  3. Noam Naive posílá své tokeny na 0x06. Dostanou se na adresu `0x0000000000000000000000000de0b6b3a7640000`, a protože nikdo nezná soukromý klíč k této adrese, jsou tam prostě zaseknuté. Noam _není spokojený_.

  Existují způsoby, jak tento problém vyřešit, a související problém transakcí, které jsou v mempoolu během přeuspořádání cache, ale musíte si toho být vědomi.

Cachování jsem zde demonstroval na Optimismu, protože jsem zaměstnancem Optimismu a je to rollup, který znám nejlépe. Mělo by to ale fungovat s jakýmkoli rollupem, který si účtuje minimální náklady na interní zpracování, takže v porovnání s tím je zápis transakčních dat na L1 hlavním nákladem.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

