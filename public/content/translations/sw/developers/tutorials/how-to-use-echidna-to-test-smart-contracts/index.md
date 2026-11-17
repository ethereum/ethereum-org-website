---
title: Jinsi ya kutumia Echidna kujaribu mikataba mahiri
description: Jinsi ya kutumia Echidna kujaribu mikataba mahiri kiotomatiki
author: "Trailofbits"
lang: sw
tags: ["Solidity", "mikataba mahiri", "usalama", "majaribio", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Usakinishaji {#installation}

Echidna inaweza kusakinishwa kupitia Docker, Homebrew au kwa kutumia jozi iliyokusanywa tayari (pre-compiled binary). Mifano katika mafunzo haya ilijaribiwa kwa Echidna 2.3.3 na solc 0.8.37.

### Echidna kupitia Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Amri ya mwisho inaendesha taswira ya Echidna katika Docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa mwenyeji wako, na kuendesha zana kwenye faili kutoka kwenye Docker. Taswira hii pia inakuja na [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) na [solc-select](https://github.com/crytic/solc-select)._

Ndani ya Docker, endesha:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Jozi (Binary) {#binary}

Pakua toleo la hivi punde la jukwaa lako kutoka [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). Kwenye macOS au Linux unaweza pia kuendesha `brew install echidna`, ambayo inasakinisha Slither na crytic-compile pamoja nayo.

Unapotumia jozi ya toleo, sakinisha [Slither](https://github.com/crytic/slither) na [solc-select](https://github.com/crytic/solc-select) wewe mwenyewe (kwa mfano `pip3 install slither-analyzer solc-select` katika mazingira pepe ya Python) na uchague toleo la kikusanyaji (compiler):

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna inaendeshwa bila Slither, lakini Slither hutoa viwango thabiti (constants) kama vile nambari za kiuchawi zinazotumika katika kauli za `require`, na mifano kadhaa hapa chini inategemea hiyo ili kupata hitilafu haraka.

## Utangulizi wa fuzzing inayotegemea sifa {#introduction-to-property-based-fuzzing}

Echidna ni fuzzer inayotegemea sifa, tuliyoielezea katika machapisho yetu ya awali ya blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) ni mbinu inayojulikana sana katika jamii ya usalama. Inajumuisha kuzalisha ingizo ambazo ni za kubahatisha kiasi ili kupata hitilafu katika programu. Fuzzers za programu za kitamaduni (kama vile [AFL](http://lcamtuf.coredump.cx/afl/) au [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) zinajulikana kuwa zana bora za kupata hitilafu.

Zaidi ya uzalishaji wa ingizo wa kubahatisha tu, kuna mbinu na mikakati mingi ya kuzalisha ingizo nzuri, ikiwa ni pamoja na:

- Kupata mrejesho kutoka kwa kila utekelezaji na kuongoza uzalishaji kwa kuutumia. Kwa mfano, ikiwa ingizo jipya lililozalishwa linasababisha ugunduzi wa njia mpya, inaweza kuwa na maana kuzalisha ingizo mpya karibu nayo.
- Kuzalisha ingizo kwa kuzingatia kizuizi cha kimuundo. Kwa mfano, ikiwa ingizo lako lina kichwa chenye checksum, itakuwa na maana kuruhusu fuzzer izalishe ingizo linalothibitisha checksum.
- Kutumia ingizo zinazojulikana kuzalisha ingizo mpya: ikiwa una ufikiaji wa seti kubwa ya data ya ingizo halali, fuzzer yako inaweza kuzalisha ingizo mpya kutoka kwayo, badala ya kuanza uzalishaji wake kutoka mwanzo. Hizi kwa kawaida huitwa _mbegu_ (seeds).

### Fuzzing inayotegemea sifa {#property-based-fuzzing}

Echidna ni ya familia maalum ya fuzzer: fuzzing inayotegemea sifa iliyohamasishwa sana na [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Tofauti na fuzzer ya kawaida ambayo itajaribu kupata mivunjiko (crashes), Echidna itajaribu kuvunja vigezo visivyobadilika (invariants) vilivyofafanuliwa na mtumiaji.

Katika mikataba mahiri, vigezo visivyobadilika ni vipengele vya Solidity, ambavyo vinaweza kuwakilisha hali yoyote isiyo sahihi au batili ambayo mkataba unaweza kufikia, ikiwa ni pamoja na:

- Udhibiti usio sahihi wa ufikiaji: mshambuliaji alikua mmiliki wa mkataba.
- Mashine ya hali isiyo sahihi: tokeni zinaweza kuhamishwa wakati mkataba umesitishwa.
- Hesabu isiyo sahihi: mtumiaji anaweza kupunguza salio lake chini ya sifuri (underflow) na kupata tokeni za bure zisizo na kikomo.

### Kujaribu sifa na Echidna {#testing-a-property-with-echidna}

Tutaona jinsi ya kujaribu mkataba mahiri na Echidna. Lengo ni mkataba mahiri ufuatao [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Tutafanya dhana kwamba tokeni hii lazima iwe na sifa zifuatazo:

- Mtu yeyote anaweza kuwa na kiwango cha juu cha tokeni 1000
- Tokeni haiwezi kuhamishwa (sio tokeni ya ERC-20)

### Andika sifa {#write-a-property}

Sifa za Echidna ni vipengele vya Solidity. Sifa lazima:

- Isiwe na hoja (argument)
- Irejeshe `true` ikiwa imefanikiwa
- Iwe na jina lake linaloanza na `echidna`

Echidna ita:

- Zalisha miamala ya kiholela kiotomatiki ili kujaribu sifa.
- Ripoti miamala yoyote inayosababisha sifa kurejesha `false` au kutoa hitilafu.
- Tupa athari za kando wakati wa kuita sifa (yaani, ikiwa sifa inabadilisha kigezo cha hali, inatupwa baada ya jaribio)

Sifa ifuatayo inakagua kuwa mpigaji hana zaidi ya tokeni 1000:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Tumia urithi (inheritance) kutenganisha mkataba wako na sifa zako:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) inatekeleza sifa na kurithi kutoka kwa tokeni.

### Anzisha mkataba {#initiate-a-contract}

Echidna inahitaji [konstrukta](/developers/docs/smart-contracts/anatomy/#constructor-functions) isiyo na hoja. Ikiwa mkataba wako unahitaji uanzishaji maalum, unahitaji kufanya hivyo katika konstrukta.

Kuna anwani maalum katika Echidna:

- `0x30000` ambayo inaita konstrukta.
- `0x10000`, `0x20000`, na `0x30000` ambazo huita vipengele vingine kwa kubahatisha.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` ambapo mkataba unaojaribiwa umesambazwa.

Hatuhitaji uanzishaji wowote maalum katika mfano wetu wa sasa, kwa sababu hiyo konstrukta yetu ni tupu.

### Endesha Echidna {#run-echidna}

Echidna inazinduliwa na:

```sh
echidna contract.sol
```

Ikiwa contract.sol ina mikataba mingi, unaweza kubainisha lengo:

```sh
echidna contract.sol --contract MyContract
```

Inapoendeshwa kwenye terminali, Echidna inaonyesha kiolesura cha mtumiaji (UI) kinachoingiliana. Ongeza `--format text` ili kupata pato la maandishi wazi kama mifano hapa chini.

### Muhtasari: Kujaribu sifa {#summary-testing-a-property}

Ifuatayo inatoa muhtasari wa uendeshaji wa Echidna kwenye mfano wetu:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna iligundua kuwa sifa inakiukwa ikiwa `backdoor` inaitwa.

## Kuchuja vipengele vya kuita wakati wa kampeni ya fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Tutaona jinsi ya kuchuja vipengele vitakavyofanyiwa fuzzing.
Lengo ni mkataba mahiri ufuatao:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Mfano huu mdogo unalazimisha Echidna kupata mfuatano fulani wa miamala ili kubadilisha kigezo cha hali.
Hii ni ngumu kwa fuzzer.
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Kuchuja vipengele {#filtering-functions}

Echidna inapata shida kupata mfuatano sahihi wa kujaribu mkataba huu kwa sababu vipengele viwili vya kuweka upya (`reset1` na `reset2`) vitaweka vigezo vyote vya hali kuwa `false`.
Hata hivyo, tunaweza kutumia kipengele maalum cha Echidna kuweka kwenye orodha nyeusi (blacklist) kipengele cha kuweka upya au kuweka kwenye orodha nyeupe (whitelist) vipengele vya `f`, `g`,
`h` na `i` pekee.

Ili kuweka vipengele kwenye orodha nyeusi, tunaweza kutumia faili hili la usanidi:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Njia nyingine ya kuchuja vipengele ni kuorodhesha vipengele vilivyo kwenye orodha nyeupe. Ili kufanya hivyo, tunaweza kutumia faili hili la usanidi:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` ni `true` kwa chaguo-msingi.
- Uchujaji unafanywa kwenye jina kamili la kipengele: jina la mkataba, `.`, na sahihi ya kiolesura cha jozi cha programu (ABI) (kwa mfano `C.f(uint256)`). Ikiwa una `f()` na `f(uint256)`, unaweza kuchagua haswa ni ipi ya kuchuja. Jina pekee kama vile `"reset1"` halilingani na chochote.

### Endesha Echidna {#run-echidna-1}

Ili kuendesha Echidna na faili la usanidi `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna itapata mfuatano wa miamala wa kukanusha sifa karibu mara moja.

### Muhtasari: Kuchuja vipengele {#summary-filtering-functions}

Echidna inaweza kuweka kwenye orodha nyeusi au orodha nyeupe vipengele vya kuita wakati wa kampeni ya fuzzing kwa kutumia:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna inaanza kampeni ya fuzzing ama kwa kuweka kwenye orodha nyeusi `C.f1()`, `C.f2()` na `C.f3()` au kwa kuziita hizi pekee, kulingana
na thamani ya boolean ya `filterBlacklist`.

## Jinsi ya kujaribu thibitisha ya Solidity na Echidna {#how-to-test-soliditys-assert-with-echidna}

Katika mafunzo haya mafupi, tutaonyesha jinsi ya kutumia Echidna kujaribu ukaguzi wa uthibitisho katika mikataba. Tuseme tuna mkataba kama huu:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Tangu Solidity 0.8, mizidio ya hesabu hutengua kwa chaguo-msingi. Kitalu cha `unchecked` kinarejesha tabia ya kufunga (wrapping) ili `counter` iweze kuwa na mzidio, ambayo ni hitilafu tunayotaka Echidna ipate.

### Andika uthibitisho {#write-an-assertion}

Tunataka kuhakikisha kuwa `tmp` ni chini ya au sawa na `counter` baada ya kurejesha tofauti yake. Tungeweza kuandika
sifa ya Echidna, lakini tutahitaji kuhifadhi thamani ya `tmp` mahali fulani. Badala yake, tungeweza kutumia uthibitisho kama huu:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Endesha Echidna {#run-echidna-2}

Ili kuwezesha majaribio ya kufeli kwa uthibitisho, pitisha `--test-mode assertion` kwenye mstari wa amri, au unda [faili la usanidi la Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Tunapoendesha mkataba huu katika Echidna, tunapata matokeo yaliyotarajiwa:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Kama unavyoona, Echidna inaripoti kufeli kwa uthibitisho katika kipengele cha `inc`. Kuongeza zaidi ya uthibitisho mmoja kwa kila kipengele kunawezekana, lakini Echidna haiwezi kusema ni uthibitisho upi uliofeli.

### Lini na jinsi ya kutumia uthibitisho {#when-and-how-use-assertions}

Uthibitisho unaweza kutumika kama mbadala wa sifa za wazi, haswa ikiwa masharti ya kukagua yanahusiana moja kwa moja na matumizi sahihi ya operesheni fulani `f`. Kuongeza uthibitisho baada ya msimbo fulani kutalazimisha kuwa ukaguzi utafanyika mara tu baada ya kutekelezwa:

```solidity
function f(..) public {
    // msimbo fulani tata
    ...
    assert (condition);
    ...
}

```

Kinyume chake, kutumia sifa ya wazi ya Echidna kutatekeleza miamala kwa kubahatisha na hakuna njia rahisi ya kulazimisha haswa ni lini itakaguliwa. Bado inawezekana kufanya mbadala huu:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Hata hivyo, kuna baadhi ya masuala:

- Inafeli ikiwa `f` imetangazwa kama `internal` au `external`.
- Haijulikani ni hoja zipi zinapaswa kutumika kuita `f`.
- Ikiwa `f` inatengua, sifa itafeli.

Kwa ujumla, tunapendekeza kufuata [pendekezo la John Regehr](https://blog.regehr.org/archives/1091) kuhusu jinsi ya kutumia uthibitisho:

- Usilazimishe athari yoyote ya kando wakati wa ukaguzi wa uthibitisho. Kwa mfano: `assert(ChangeStateAndReturn() == 1)`
- Usithibitishe kauli zilizo wazi. Kwa mfano `assert(var >= 0)` ambapo `var` imetangazwa kama `uint`.

Hatimaye, tafadhali **usitumie** `require` badala ya `assert`, kwa kuwa Echidna haitaweza kuitambua (lakini mkataba utatengua hata hivyo).

### Muhtasari: Ukaguzi wa Uthibitisho {#summary-assertion-checking}

Ifuatayo inatoa muhtasari wa uendeshaji wa Echidna kwenye mfano wetu:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna iligundua kuwa uthibitisho katika `inc` unaweza kufeli ikiwa kipengele hiki kitaitwa mara nyingi na hoja kubwa.

## Kukusanya na kurekebisha korpasi ya Echidna {#collecting-and-modifying-an-echidna-corpus}

Tutaona jinsi ya kukusanya na kutumia korpasi ya miamala na Echidna. Lengo ni mkataba mahiri ufuatao [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Mfano huu mdogo unalazimisha Echidna kupata thamani fulani ili kubadilisha kigezo cha hali. Hii ni ngumu kwa fuzzer.
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Hata hivyo, bado tunaweza kutumia Echidna kukusanya korpasi wakati wa kuendesha kampeni hii ya fuzzing.

### Kukusanya korpasi {#collecting-a-corpus}

Ili kuwezesha ukusanyaji wa korpasi, unda saraka ya korpasi:

```sh
mkdir corpus-magic
```

Na [faili la usanidi la Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Sasa tunaweza kuendesha zana yetu na kukagua korpasi iliyokusanywa:

```sh
echidna magic.sol --config config.yaml
```

Echidna bado haiwezi kupata thamani sahihi za kiuchawi. Ili kuona inapokwama, angalia ripoti ya ufikiaji ya `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Lebo ya `r` inamaanisha Echidna ilifikia mstari lakini utekelezaji ulitengua hapo, na mistari baada ya `require` ya mwisho haitekelezwi kamwe.

Mfuatano wa miamala ambayo Echidna ilikusanya umehifadhiwa kama faili za JSON katika `corpus-magic/coverage/`. Kwa mfano, muamala wa kwanza wa mojawapo ya faili hizi ulikuwa:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Ni wazi, ingizo hili halitasababisha kufeli katika sifa yetu. Hata hivyo, katika hatua inayofuata, tutaona jinsi ya kuirekebisha kwa ajili hiyo.

### Kupanda mbegu kwenye korpasi {#seeding-a-corpus}

Echidna inahitaji msaada fulani ili kushughulikia kipengele cha `magic`. Tunakwenda kunakili na kurekebisha ingizo ili kutumia vigezo
vinavyofaa kwake (majina ya faili ni ya kubahatisha, kwa hivyo tumia moja kutoka kwenye saraka yako ya `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Tutarekebisha `new.txt` ili iwe na muamala mmoja unaoita `magic(42,129,333,0)`. Sasa, tunaweza kuendesha Echidna tena:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Wakati huu, iligundua kuwa sifa inakiukwa mara moja.

## Kupata miamala yenye matumizi makubwa ya gesi {#finding-transactions-with-high-gas-consumption}

Tutaona jinsi ya kupata miamala yenye matumizi makubwa ya gesi na Echidna. Matoleo ya zamani ya Echidna yalikuwa na chaguo la `estimateGas` kwa hili; liliondolewa katika Echidna 2.3.0. Badala yake, tunapima gesi kwa `gasleft()` na kuruhusu [hali ya uboreshaji](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) ya Echidna kuiongeza hadi kiwango cha juu. Lengo ni mkataba mahiri ufuatao:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Hapa `expensive` inaweza kuwa na matumizi makubwa ya gesi.

### Kupima Matumizi ya Gesi {#measuring-gas-consumption}

Katika hali ya uboreshaji, Echidna inatafuta vipengele vinavyoanza na `echidna_` ambavyo havichukui hoja na kurejesha `int256`, na inajaribu kupata mfuatano wa miamala unaoongeza thamani iliyorejeshwa hadi kiwango cha juu. Tunaongeza mkataba wa majaribio unaoita `f`, kurekodi gesi iliyotumika, na kufichua kiwango cha juu zaidi (hifadhi mikataba yote miwili katika `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Ili kuwezesha hali ya uboreshaji, unda faili la usanidi `config.yaml`. Katika mfano huu, tutapunguza pia ukubwa wa mfuatano wa muamala ili kufanya matokeo kuwa rahisi kueleweka:

```yaml
testMode: optimization
seqLen: 2
```

### Endesha Echidna {#run-echidna-3}

Mara tu tunapokuwa na faili la usanidi lililoundwa, tunaweza kuendesha Echidna hivi:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Gesi inayoonyeshwa inapimwa na utekelezaji wa Mashine Pepe ya Ethereum (EVM) ambayo Echidna inaendeshwa juu yake, [hevm](https://github.com/argotorg/hevm), na inajumuisha gharama ya ziada ya wito wa ndani kutoka `measureF`.
- Kiwango cha juu sio cha kipekee: kila kampeni ni ya kubahatisha, na kampeni ndefu (kwa mfano `--test-limit 200000`) huwa zinapata thamani kubwa zaidi.

### Kuchuja Wito Unaopunguza Gesi {#filtering-out-gas-reducing-calls}

Mafunzo kuhusu **kuchuja vipengele vya kuita wakati wa kampeni ya fuzzing** hapo juu yanaonyesha jinsi ya
kuondoa baadhi ya vipengele kwenye majaribio yako.
Hili linaweza kuwa muhimu kwa kupata makadirio sahihi ya gesi.
Fikiria mfano ufuatao:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` inaita `check` na kurejesha gharama yake ya gesi. Kama kila kipengele cha majaribio cha Echidna, mabadiliko yake ya hali yanatupwa baadaye.

Ikiwa Echidna inaweza kuita vipengele vyote, haitapata kwa urahisi miamala yenye gharama kubwa ya gesi:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Hiyo ni kwa sababu gharama inategemea ukubwa wa `addrs` na wito wa kubahatisha huwa unaacha safu (array) karibu tupu.
Kuweka kwenye orodha nyeusi `pop` na `clear`, hata hivyo, kunatupa matokeo bora zaidi:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Kupunguza mfuatano wa wito kwa matokeo haya huchukua dakika kadhaa, kwa sababu kila marudio huita kipengele ghali cha `check`.

### Muhtasari: Kupata miamala yenye matumizi makubwa ya gesi {#summary-finding-transactions-with-high-gas-consumption}

Echidna inaweza kupata miamala yenye matumizi makubwa ya gesi kwa kupima gesi na `gasleft()` katika kipengele cha `echidna_` kinachorejesha `int256`, na kuendesha katika hali ya uboreshaji:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna itaripoti thamani ya juu zaidi iliyopatikana na mfuatano wa miamala iliyoizalisha, mara tu kampeni ya fuzzing itakapokamilika.
