---
title: "Kache kadiri uwezavyo"
description: Jifunze jinsi ya kuunda na kutumia mkataba wa kache kwa miamala ya rollup ya bei nafuu
author: Ori Pomerantz
tags:
  - tabaka la 2
  - kache
  - uhifadhi
  - kuongeza viwango
skill: intermediate
breadcrumb: Kache kwa ajili ya mikusanyiko
published: 2022-09-15
lang: sw
---

Unapotumia mikusanyiko gharama ya baiti katika muamala ni ghali zaidi kuliko gharama ya sloti ya uhifadhi. Kwa hivyo, inaleta maana kuhifadhi taarifa nyingi iwezekanavyo kwenye kache mnyororoni.

Katika makala haya unajifunza jinsi ya kuunda na kutumia mkataba wa kache kwa njia ambayo thamani yoyote ya kigezo ambayo ina uwezekano wa kutumika mara nyingi itahifadhiwa kwenye kache na kupatikana kwa matumizi (baada ya mara ya kwanza) kwa idadi ndogo sana ya baiti, na jinsi ya kuandika msimbo wa nje ya mnyororo unaotumia kache hii.

Ikiwa unataka kuruka makala na kuona tu msimbo wa chanzo, [uko hapa](https://github.com/qbzzt/20220915-all-you-can-cache). Mfumo wa uundaji ni [Foundry](https://getfoundry.sh/introduction/installation/).

## Muundo wa jumla {#overall-design}

Kwa kurahisisha tutachukulia kuwa vigezo vyote vya muamala ni `uint256`, vyenye urefu wa baiti 32. Tunapopokea muamala, tutachanganua kila kigezo kama hivi:

1. Ikiwa baiti ya kwanza ni `0xFF`, chukua baiti 32 zinazofuata kama thamani ya kigezo na uiandike kwenye kache.

2. Ikiwa baiti ya kwanza ni `0xFE`, chukua baiti 32 zinazofuata kama thamani ya kigezo lakini _usiiandike_ kwenye kache.

3. Kwa thamani nyingine yoyote, chukua biti nne za juu kama idadi ya baiti za ziada, na biti nne za chini kama biti muhimu zaidi za ufunguo wa kache. Hapa kuna baadhi ya mifano:

   | Baiti katika data za mwito | Ufunguo wa kache |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Udhibiti wa kache {#cache-manipulation}

Kache inatekelezwa katika [`Kache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Hebu tuipitie mstari kwa mstari.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Viwango hivi visivyobadilika vinatumika kufasiri matukio maalum ambapo tunatoa taarifa zote na ama tunataka ziandikwe kwenye kache au la. Kuandika kwenye kache kunahitaji operesheni mbili za [`SSTORE`](https://www.evm.codes/#55) kwenye sloti za uhifadhi ambazo hazijatumika hapo awali kwa gharama ya gesi 22100 kila moja, kwa hivyo tunaifanya iwe ya hiari.

```solidity

    mapping(uint => uint) public val2key;
```

[Uchoraji ramani](https://www.geeksforgeeks.org/solidity/solidity-mappings/) kati ya thamani na funguo zake. Taarifa hii ni muhimu ili kusimba thamani kabla ya kutuma muamala.

```solidity
    // Eneo n lina thamani kwa ufunguo n+1, kwa sababu tunahitaji kuhifadhi
    // sifuri kama "haipo kwenye kache".
    uint[] public key2val;
```

Tunaweza kutumia safu kwa uchoraji ramani kutoka kwa funguo hadi thamani kwa sababu tunakabidhi funguo, na kwa urahisi tunafanya hivyo kwa mfuatano.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Soma thamani kutoka kwenye kache.

```solidity
    // Andika thamani kwenye kache ikiwa haipo tayari
    // Ni ya umma tu ili kuwezesha jaribio kufanya kazi
    function cacheWrite(uint _value) public returns (uint) {
        // Ikiwa thamani tayari ipo kwenye kache, rudisha ufunguo wa sasa
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Hakuna maana ya kuweka thamani sawa kwenye kache zaidi ya mara moja. Ikiwa thamani tayari ipo, rudisha tu ufunguo uliopo.

```solidity
        // Kwa kuwa 0xFE ni hali maalum, ufunguo mkubwa zaidi ambao kache inaweza
        // kushikilia ni 0x0D ikifuatiwa na 0xFF 15. Ikiwa urefu wa kache tayari ni huo
        // mkubwa, shindwa.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Sidhani kama tutawahi kupata kache kubwa kiasi hicho (takriban maingizo 1.8\*10<sup>37</sup>, ambayo yangehitaji takriban TB 10<sup>27</sup> kuhifadhi). Hata hivyo, mimi ni mzee wa kutosha kukumbuka ["640kB zingetosha kila wakati"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Jaribio hili ni la bei nafuu sana.

```solidity
        // Andika thamani ukitumia ufunguo unaofuata
        val2key[_value] = key2val.length+1;
```

Ongeza utafutaji wa kinyume (kutoka kwa thamani hadi ufunguo).

```solidity
        key2val.push(_value);
```

Ongeza utafutaji wa mbele (kutoka kwa ufunguo hadi thamani). Kwa sababu tunakabidhi thamani kwa mfuatano tunaweza kuiongeza tu baada ya thamani ya mwisho ya safu.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Rudisha urefu mpya wa `key2val`, ambayo ni seli ambapo thamani mpya imehifadhiwa.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Kazi hii inasoma thamani kutoka kwa data za mwito za urefu wa kiholela (hadi baiti 32, saizi ya neno).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Kazi hii ni ya ndani, kwa hivyo ikiwa msimbo uliosalia umeandikwa kwa usahihi majaribio haya hayahitajiki. Hata hivyo, hayagharimu sana kwa hivyo tunaweza kuwa nayo pia.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Msimbo huu upo katika [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Inasoma thamani ya baiti 32 kutoka kwa data za mwito. Hii inafanya kazi hata kama data za mwito zitasimama kabla ya `startByte+32` kwa sababu nafasi isiyoanzishwa katika EVM inachukuliwa kuwa sifuri.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Sio lazima tutake thamani ya baiti 32. Hii inaondoa baiti za ziada.

```solidity
        return _retVal;
    } // _calldataVal


    // Soma kigezo kimoja kutoka kwenye data za mwito, kuanzia kwenye _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Soma kigezo kimoja kutoka kwa data za mwito. Kumbuka kwamba tunahitaji kurudisha sio tu thamani tunayosoma, lakini pia eneo la baiti inayofuata kwa sababu vigezo vinaweza kuanzia urefu wa baiti 1 hadi baiti 33.

```solidity
        // Baiti ya kwanza inatuambia jinsi ya kufasiri zilizosalia
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity inajaribu kupunguza idadi ya hitilafu kwa kukataza [ubadilishaji wa aina isiyo wazi](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) unaoweza kuwa hatari. Kushusha daraja, kwa mfano kutoka biti 256 hadi biti 8, kunahitaji kuwa wazi.

```solidity

        // Soma thamani, lakini usiiandike kwenye kache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Soma thamani, na uiandike kwenye kache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Ikiwa tumefika hapa inamaanisha kuwa tunahitaji kusoma kutoka kwenye kache

        // Idadi ya baiti za ziada za kusoma
        uint8 _extraBytes = _firstByte / 16;
```

Chukua [nibble](https://en.wikipedia.org/wiki/Nibble) ya chini na uiunganishe na baiti zingine ili kusoma thamani kutoka kwenye kache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Soma vigezo n (kazi zinajua ni vigezo vingapi zinatarajia)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Tungeweza kupata idadi ya vigezo tulivyo navyo kutoka kwa data za mwito yenyewe, lakini kazi zinazotuita zinajua ni vigezo vingapi wanavyotarajia. Ni rahisi kuwaacha watuambie.

```solidity
        // Vigezo tunavyosoma
        uint[] memory params = new uint[](_paramNum);

        // Vigezo vinaanza kwenye baiti ya 4, kabla ya hapo ni saini ya kazi
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Soma vigezo hadi uwe na nambari unayohitaji. Ikiwa tutapita mwisho wa data za mwito, `_readParams` itatengua mwito.

```solidity

        return(params);
    }   // readParams

    // Kwa ajili ya kujaribu _readParams, jaribu kusoma vigezo vinne
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Faida moja kubwa ya Foundry ni kwamba inaruhusu majaribio kuandikwa katika Solidity ([tazama Kujaribu kache hapa chini](#testing-the-cache)). Hii inafanya majaribio ya kitengo kuwa rahisi sana. Hii ni kazi inayosoma vigezo nne na kuzirudisha ili jaribio liweze kuthibitisha kuwa zilikuwa sahihi.

```solidity
    // Pata thamani, rudisha baiti ambazo zitaisimba (ukitumia kache ikiwezekana)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` ni kazi ambayo msimbo wa nje ya mnyororo huita ili kusaidia kuunda data za mwito zinazotumia kache. Inapokea thamani moja na kurudisha baiti zinazoisimba. Kazi hii ni `view`, kwa hivyo haihitaji muamala na inapoitwa kwa nje haigharimu gesi yoyote.

```solidity
        uint _key = val2key[_val];

        // Thamani bado haipo kwenye kache, iongeze
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Katika [EVM](/developers/docs/evm/) uhifadhi wote ambao haujaanzishwa unachukuliwa kuwa sifuri. Kwa hivyo tukitafuta ufunguo wa thamani ambayo haipo, tunapata sifuri. Katika hali hiyo baiti zinazoisimba ni `INTO_CACHE` (kwa hivyo itahifadhiwa kwenye kache wakati ujao), ikifuatiwa na thamani halisi.

```solidity
        // Ikiwa ufunguo ni <0x10, urudishe kama baiti moja
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Baiti moja ndizo rahisi zaidi. Tunatumia tu [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) kugeuza aina ya `bytes<n>` kuwa safu ya baiti ambayo inaweza kuwa ya urefu wowote. Licha ya jina, inafanya kazi vizuri inapotolewa na hoja moja tu.

```solidity
        // Thamani ya baiti mbili, iliyosimbwa kama 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Tunapokuwa na ufunguo ambao ni chini ya 16<sup>3</sup>, tunaweza kuueleza katika baiti mbili. Kwanza tunabadilisha `_key`, ambayo ni thamani ya biti 256, kuwa thamani ya biti 16 na kutumia 'au' ya kimantiki kuongeza idadi ya baiti za ziada kwenye baiti ya kwanza. Kisha tunaiweka tu kwenye thamani ya `bytes2`, ambayo inaweza kubadilishwa kuwa `bytes`.

```solidity
        // Pengine kuna njia janja ya kufanya mistari ifuatayo kama kitanzi,
        // lakini ni kazi ya kutazama kwa hivyo ninaboresha kwa ajili ya muda wa mtayarishaji programu na
        // urahisi.

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

Thamani zingine (baiti 3, baiti 4, n.k.) zinashughulikiwa kwa njia sawa, tu na saizi tofauti za uwanja.

```solidity
        // Ikiwa tutafika hapa, kuna kitu kibaya.
        revert("Error in encodeVal, should not happen");
```

Ikiwa tutafika hapa inamaanisha tulipata ufunguo ambao sio chini ya 16\*256<sup>15</sup>. Lakini `cacheWrite` inaweka kikomo kwa funguo kwa hivyo hatuwezi hata kufika hadi 14\*256<sup>16</sup> (ambayo ingekuwa na baiti ya kwanza ya 0xFE, kwa hivyo ingeonekana kama `DONT_CACHE`). Lakini haitugharimu sana kuongeza jaribio endapo mtayarishaji programu wa baadaye ataleta hitilafu.

```solidity
    } // encodeVal

}  // Cache
```

### Kujaribu kache {#testing-the-cache}

Moja ya faida za Foundry ni kwamba [inakuruhusu kuandika majaribio katika Solidity](https://getfoundry.sh/forge/tests/overview/), ambayo inafanya iwe rahisi kuandika majaribio ya kitengo. Majaribio ya darasa la `Cache` yako [hapa](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Kwa sababu msimbo wa majaribio unajirudia, kama majaribio yanavyokuwa, makala haya yanaelezea tu sehemu za kuvutia.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Unahitaji kuendesha `forge test -vv` kwa ajili ya kiweko.
import "forge-std/console.sol";
```

Hii ni boilerplate tu ambayo ni muhimu kutumia kifurushi cha majaribio na `console.log`.

```solidity
import "src/Cache.sol";
```

Tunahitaji kujua mkataba tunaoujaribu.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Kazi ya `setUp` inaitwa kabla ya kila jaribio. Katika kesi hii tunaunda tu kache mpya, ili majaribio yetu yasiathiriane.

```solidity
    function testCaching() public {
```

Majaribio ni kazi ambazo majina yake huanza na `test`. Kazi hii inakagua utendaji wa msingi wa kache, kuandika thamani na kuzisoma tena.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Hivi ndivyo unavyofanya majaribio halisi, ukitumia [kazi za `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Katika kesi hii, tunathibitisha kwamba thamani tuliyoandika ndiyo tuliyosoma. Tunaweza kutupa matokeo ya `cache.cacheWrite` kwa sababu tunajua kwamba funguo za kache zinakabidhiwa kwa mstari.

```solidity
        }
    }    // testCaching


    // Hifadhi kwenye kache thamani sawa mara nyingi, hakikisha kwamba ufunguo unabaki
    // sawa
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Kwanza tunaandika kila thamani mara mbili kwenye kache na kuhakikisha funguo ni sawa (ikimaanisha uandishi wa pili haukufanyika kweli).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Kinadharia kunaweza kuwa na hitilafu ambayo haiathiri uandishi wa kache mfululizo. Kwa hivyo hapa tunafanya baadhi ya maandishi ambayo sio mfululizo na kuona thamani bado haziandikwi upya.

```solidity
    // Soma uint kutoka kwenye bafa ya kumbukumbu (kuhakikisha tunapata tena vigezo
    // tulivyotuma)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Soma neno la biti 256 kutoka kwa bafa ya `bytes memory`. Kazi hii ya matumizi inaturuhusu kuthibitisha kwamba tunapokea matokeo sahihi tunapoendesha mwito wa kazi unaotumia kache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul haiauni miundo ya data zaidi ya `uint256`, kwa hivyo unaporejelea muundo wa data wa kisasa zaidi, kama vile bafa ya kumbukumbu `_bytes`, unapata anwani ya muundo huo. Solidity inahifadhi thamani za `bytes memory` kama neno la baiti 32 ambalo lina urefu, likifuatiwa na baiti halisi, kwa hivyo ili kupata nambari ya baiti `_start` tunahitaji kukokotoa `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Saini ya kazi kwa fourParams(), kwa hisani ya
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Baadhi tu ya thamani zisizobadilika ili kuona tunapata thamani sahihi
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Baadhi ya viwango visivyobadilika tunavyohitaji kwa majaribio.

```solidity
    function testReadParam() public {
```

Ita `fourParams()`, kazi inayotumia `readParams`, ili kujaribu tunaweza kusoma vigezo kwa usahihi.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Hatuwezi kutumia utaratibu wa kawaida wa ABI kuita kazi kwa kutumia kache, kwa hivyo tunahitaji kutumia utaratibu wa kiwango cha chini wa [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Utaratibu huo unachukua `bytes memory` kama ingizo, na kurudisha hiyo (pamoja na thamani ya Boolean) kama towe.

```solidity
        // Mwito wa kwanza, kache ni tupu
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Ni muhimu kwa mkataba huo huo kusaidia kazi zote mbili zilizohifadhiwa kwenye kache (kwa miito moja kwa moja kutoka kwa miamala) na kazi ambazo hazijahifadhiwa kwenye kache (kwa miito kutoka kwa mikataba mingine mahiri). Ili kufanya hivyo tunahitaji kuendelea kutegemea utaratibu wa Solidity kuita kazi sahihi, badala ya kuweka kila kitu katika [kazi ya `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Kufanya hivi kunafanya utangamano kuwa rahisi sana. Baiti moja ingetosha kutambua kazi katika hali nyingi, kwa hivyo tunapoteza baiti tatu (gesi 16\*3=48). Hata hivyo, ninapoandika haya gesi hizo 48 zinagharimu senti 0.07, ambayo ni gharama nzuri ya msimbo rahisi, usio na uwezekano wa kuwa na hitilafu.

```solidity
            // Thamani ya kwanza, iongeze kwenye kache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Thamani ya kwanza: Bendera inayosema ni thamani kamili inayohitaji kuandikwa kwenye kache, ikifuatiwa na baiti 32 za thamani. Thamani zingine tatu zinafanana, isipokuwa kwamba `VAL_B` haiandikwi kwenye kache na `VAL_C` ni kigezo cha tatu na cha nne.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Hapa ndipo tunapoita mkataba wa `Cache`.

```solidity
        assertEq(_success, true);
```

Tunatarajia mwito ufanikiwe.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Tunaanza na kache tupu na kisha kuongeza `VAL_A` ikifuatiwa na `VAL_C`. Tungetarajia ya kwanza kuwa na ufunguo 1, na ya pili kuwa na 2.

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Towe ni vigezo nne. Hapa tunathibitisha kuwa ni sahihi.

```solidity
        // Mwito wa pili, tunaweza kutumia kache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Thamani ya kwanza kwenye Kache
            bytes1(0x01),
```

Funguo za kache chini ya 16 ni baiti moja tu.

```solidity
            // Thamani ya pili, usiongeze kwenye kache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Thamani ya tatu na ya nne, thamani sawa
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Majaribio baada ya mwito yanafanana na yale ya baada ya mwito wa kwanza.

```solidity
    function testEncodeVal() public {
```

Kazi hii inafanana na `testReadParam`, isipokuwa kwamba badala ya kuandika vigezo waziwazi tunatumia `encodeVal()`.

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

Jaribio pekee la ziada katika `testEncodeVal()` ni kuthibitisha kwamba urefu wa `_callInput` ni sahihi. Kwa mwito wa kwanza ni 4+33\*4. Kwa wa pili, ambapo kila thamani tayari iko kwenye kache, ni 4+1\*4.

```solidity
    // Jaribu encodeVal wakati ufunguo ni zaidi ya baiti moja
    // Kiwango cha juu cha baiti tatu kwa sababu kujaza kache hadi baiti nne inachukua
    // muda mrefu sana.
    function testEncodeValBig() public {
        // Weka idadi ya thamani kwenye kache.
        // Ili kuweka mambo rahisi, tumia ufunguo n kwa thamani n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Kazi ya `testEncodeVal` hapo juu inaandika tu thamani nne kwenye kache, kwa hivyo [sehemu ya kazi inayoshughulikia thamani za baiti nyingi](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) haijakaguliwa. Lakini msimbo huo ni mgumu na una uwezekano wa kuwa na makosa.

Sehemu ya kwanza ya kazi hii ni kitanzi kinachoandika thamani zote kutoka 1 hadi 0x1FFF kwenye kache kwa mpangilio, kwa hivyo tutaweza kusimba thamani hizo na kujua zinakokwenda.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Baiti moja        0x0F
            cache.encodeVal(0x0010),   // Baiti mbili     0x1010
            cache.encodeVal(0x0100),   // Baiti mbili     0x1100
            cache.encodeVal(0x1000)    // Baiti tatu 0x201000
        );
```

Jaribu thamani za baiti moja, baiti mbili, na baiti tatu. Hatujaribu zaidi ya hapo kwa sababu itachukua muda mrefu sana kuandika maingizo ya kutosha ya staki (angalau 0x10000000, takriban robo bilioni).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Jaribu nini kwa bafa ndogo kupita kiasi tunapata tengua
    function testShortCalldata() public {
```

Jaribu kile kinachotokea katika hali isiyo ya kawaida ambapo hakuna vigezo vya kutosha.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Kwa kuwa inatengua, matokeo tunayopaswa kupata ni `false`.

```
// Ita na funguo za kache ambazo hazipo
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Thamani ya kwanza, iongeze kwenye kache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Thamani ya pili
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Kazi hii inapata vigezo nne halali kabisa, isipokuwa kwamba kache ni tupu kwa hivyo hakuna thamani hapo za kusoma.

```solidity
        .
        .
        .
    // Jaribu nini kwa bafa ndefu kupita kiasi kila kitu kinafanya kazi sawa
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Mwito wa kwanza, kache ni tupu
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Thamani ya kwanza, iongeze kwenye kache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Thamani ya pili, iongeze kwenye kache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Thamani ya tatu, iongeze kwenye kache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Thamani ya nne, iongeze kwenye kache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Na thamani nyingine kwa ajili ya "bahati nzuri"
            bytes4(0x31112233)
        );
```

Kazi hii inatuma thamani tano. Tunajua kwamba thamani ya tano inapuuzwa kwa sababu sio ingizo halali la kache, ambalo lingesababisha kutengua kama isingejumuishwa.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Programu tumizi ya mfano {#a-sample-app}

Kuandika majaribio katika Solidity ni vizuri sana, lakini mwisho wa siku programu tumizi iliyogatuliwa (dapp) inahitaji kuwa na uwezo wa kuchakata maombi kutoka nje ya mnyororo ili iwe na manufaa. Makala haya yanaonyesha jinsi ya kutumia kache katika dapp na `WORM`, ambayo inasimama kwa "Andika Mara Moja, Soma Nyingi". Ikiwa ufunguo bado haujaandikwa, unaweza kuandika thamani kwake. Ikiwa ufunguo tayari umeandikwa, unapata kutengua.

### Mkataba {#the-contract}

[Huu ndio mkataba](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Unarudia zaidi kile ambacho tayari tumefanya na `Cache` na `CacheTest`, kwa hivyo tunashughulikia tu sehemu zinazovutia.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Njia rahisi zaidi ya kutumia `Cache` ni kuirithi katika mkataba wetu wenyewe.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Kazi hii inafanana na `fourParam` katika `CacheTest` hapo juu. Kwa sababu hatufuati vipimo vya ABI, ni bora kutotangaza vigezo vyovyote kwenye kazi.

```solidity
    // Ifanye iwe rahisi kutuita
    // Saini ya kazi kwa writeEntryCached(), kwa hisani ya
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Msimbo wa nje unaoita `writeEntryCached` utahitaji kuunda data za mwito kwa mikono, badala ya kutumia `worm.writeEntryCached`, kwa sababu hatufuati vipimo vya ABI. Kuwa na thamani hii isiyobadilika kunafanya iwe rahisi kuiandika.

Kumbuka kwamba ingawa tunafafanua `WRITE_ENTRY_CACHED` kama kigezo cha hali, ili kuisoma kwa nje ni muhimu kutumia kazi ya getter kwa ajili yake, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Kazi ya kusoma ni `view`, kwa hivyo haihitaji muamala na haigharimu gesi. Kama matokeo, hakuna faida ya kutumia kache kwa kigezo. Kwa kazi za kutazama ni bora kutumia utaratibu wa kawaida ambao ni rahisi.

### Msimbo wa majaribio {#the-testing-code}

[Huu ni msimbo wa majaribio kwa mkataba](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Tena, hebu tuangalie tu kile kinachovutia.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Hivi (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) ndivyo tunavyobainisha katika jaribio la Foundry kwamba mwito unaofuata unapaswa kushindwa, na sababu iliyoripotiwa ya kushindwa. Hii inatumika tunapotumia sintaksia `<contract>.<function name>()` badala ya kuunda data za mwito na kuita mkataba kwa kutumia kiolesura cha kiwango cha chini (`<contract>.call()`, n.k.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Hapa tunatumia ukweli kwamba `cacheWrite` inarudisha ufunguo wa kache. Hili sio jambo ambalo tungetarajia kutumia katika uzalishaji, kwa sababu `cacheWrite` inabadilisha hali, na kwa hivyo inaweza kuitwa tu wakati wa muamala. Miamala haina thamani za kurudisha, ikiwa ina matokeo matokeo hayo yanapaswa kutolewa kama matukio. Kwa hivyo thamani ya kurudisha ya `cacheWrite` inapatikana tu kutoka kwa msimbo wa mnyororoni, na msimbo wa mnyororoni hauhitaji kache ya kigezo.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Hivi ndivyo tunavyoiambia Solidity kwamba ingawa `<contract address>.call()` ina thamani mbili za kurudisha, tunajali tu ya kwanza.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Kwa kuwa tunatumia kazi ya kiwango cha chini ya `<address>.call()`, hatuwezi kutumia `vm.expectRevert()` na inabidi tuangalie thamani ya mafanikio ya boolean tunayopata kutoka kwa mwito.

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

Hii ndiyo njia tunayothibitisha kwamba msimbo [unatoa tukio kwa usahihi](https://getfoundry.sh/reference/cheatcodes/expect-emit/) katika Foundry.

### Mteja {#the-client}

Jambo moja ambalo hupati na majaribio ya Solidity ni msimbo wa JavaScript unaoweza kukata na kubandika kwenye programu yako mwenyewe. Ili kuandika msimbo huo nilipeleka WORM kwenye [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), mtandao wa majaribio mpya wa [Optimism](https://www.optimism.io/). Iko kwenye anwani [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Unaweza kuona msimbo wa JavaScript kwa mteja hapa](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Ili kuitumia:

1. Nakili hazina ya git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Sakinisha vifurushi vinavyohitajika:

   ```sh
   cd javascript
   yarn
   ```

3. Nakili faili ya usanidi:

   ```sh
   cp .env.example .env
   ```

4. Hariri `.env` kwa usanidi wako:

   | Kigezo | Thamani |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC | Mnemonic kwa akaunti ambayo ina ETH ya kutosha kulipia muamala. [Unaweza kupata ETH ya bure kwa mtandao wa Optimism Goerli hapa](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL ya Optimism Goerli. Mwisho wa umma, `https://goerli.optimism.io`, una kikomo cha kiwango lakini unatosha kwa kile tunachohitaji hapa |

5. Endesha `index.js`.

   ```sh
   node index.js
   ```

   Programu tumizi hii ya mfano kwanza inaandika ingizo kwa WORM, ikionyesha data za mwito na kiungo cha muamala kwenye Etherscan. Kisha inasoma tena ingizo hilo, na kuonyesha ufunguo inaotumia na thamani katika ingizo (thamani, nambari ya kitalu, na mwandishi).

Sehemu kubwa ya mteja ni JavaScript ya kawaida ya Dapp. Kwa hivyo tena tutapitia tu sehemu zinazovutia.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Inahitaji ufunguo mpya kila wakati
    const key = await worm.encodeVal(Number(new Date()))
```

Sloti fulani inaweza kuandikwa mara moja tu, kwa hivyo tunatumia muhuri wa muda kuhakikisha hatutumii tena sloti.

```javascript
const val = await worm.encodeVal("0x600D")

// Andika ingizo
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers inatarajia data za mwito kuwa mfuatano wa heksadesimali, `0x` ikifuatiwa na nambari shufwa ya tarakimu za heksadesimali. Kwa kuwa `key` na `val` zote zinaanza na `0x`, tunahitaji kuondoa vichwa hivyo.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Kama ilivyo kwa msimbo wa majaribio wa Solidity, hatuwezi kuita kazi iliyohifadhiwa kwenye kache kwa kawaida. Badala yake, tunahitaji kutumia utaratibu wa kiwango cha chini.

```javascript
    .
    .
    .
    // Soma ingizo lililoandikwa sasa hivi
    const realKey = '0x' + key.slice(4)  // ondoa bendera ya FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Kwa kusoma maingizo tunaweza kutumia utaratibu wa kawaida. Hakuna haja ya kutumia kache ya kigezo na kazi za `view`.

## Hitimisho {#conclusion}

Msimbo katika makala haya ni uthibitisho wa dhana, madhumuni ni kufanya wazo liwe rahisi kueleweka. Kwa mfumo ulio tayari kwa uzalishaji unaweza kutaka kutekeleza utendaji wa ziada:

- Kushughulikia thamani ambazo sio `uint256`. Kwa mfano, mifuatano.
- Badala ya kache ya kimataifa, labda uwe na uchoraji ramani kati ya watumiaji na kache. Watumiaji tofauti hutumia thamani tofauti.
- Thamani zinazotumika kwa anwani ni tofauti na zile zinazotumika kwa madhumuni mengine. Inaweza kuleta maana kuwa na kache tofauti kwa ajili ya anwani tu.
- Kwa sasa, funguo za kache ziko kwenye algoriti ya "anayekuja kwanza, ufunguo mdogo zaidi". Thamani kumi na sita za kwanza zinaweza kutumwa kama baiti moja. Thamani 4080 zinazofuata zinaweza kutumwa kama baiti mbili. Thamani takriban milioni zinazofuata ni baiti tatu, n.k. Mfumo wa uzalishaji unapaswa kuweka vihesabio vya matumizi kwenye maingizo ya kache na kuyapanga upya ili thamani kumi na sita _zinazojulikana zaidi_ ziwe baiti moja, thamani 4080 zinazojulikana zaidi zinazofuata ziwe baiti mbili, n.k.

  Hata hivyo, hiyo ni operesheni inayoweza kuwa hatari. Fikiria mfuatano ufuatao wa matukio:

  1. Noam Naive anaita `encodeVal` ili kusimba anwani anayotaka kutuma tokeni. Anwani hiyo ni mojawapo ya za kwanza kutumika kwenye programu, kwa hivyo thamani iliyosimbwa ni 0x06. Hii ni kazi ya `view`, sio muamala, kwa hivyo ni kati ya Noam na nodi anayotumia, na hakuna mtu mwingine anayejua kuihusu

  2. Owen Owner anaendesha operesheni ya kupanga upya kache. Watu wachache sana hutumia anwani hiyo, kwa hivyo sasa imesimbwa kama 0x201122. Thamani tofauti, 10<sup>18</sup>, inakabidhiwa 0x06.

  3. Noam Naive anatuma tokeni zake kwa 0x06. Zinaenda kwenye anwani `0x0000000000000000000000000de0b6b3a7640000`, na kwa kuwa hakuna anayejua ufunguo wa siri wa anwani hiyo, zinakwama tu hapo. Noam _hafurahii_.

  Kuna njia za kutatua tatizo hili, na tatizo linalohusiana la miamala ambayo iko kwenye mempool wakati wa kupanga upya kache, lakini lazima uwe na ufahamu nalo.

Nilionyesha kache hapa na Optimism, kwa sababu mimi ni mfanyakazi wa Optimism na huu ndio mkusanyiko ninaoujua vizuri zaidi. Lakini inapaswa kufanya kazi na mkusanyiko wowote unaotoza gharama ndogo kwa usindikaji wa ndani, ili kwa kulinganisha kuandika data ya muamala kwa tabaka la 1 (l1) ndiyo gharama kubwa.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).