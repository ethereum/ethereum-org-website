---
title: Jinsi ya kutumia Echidna kujaribu mikataba mahiri
description: Jinsi ya kutumia Echidna kujaribu mikataba mahiri kiotomatiki
author: "Trailofbits"
lang: sw
tags: ["Solidity", "mikataba mahiri", "usalama", "upimaji", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Usakinishaji {#installation}

Echidna inaweza kusakinishwa kupitia Docker au kwa kutumia faili ya mfumo wa binary iliyokusanywa tayari.

### Echidna kupitia Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Amri ya mwisho inaendesha eth-security-toolbox kwenye Docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa kompyuta yako, na kuendesha zana kwenye faili kutoka kwenye Docker_

Ndani ya Docker, endesha:

```bash
solc-select 0.5.11
cd /home/training
```

### Faili ya Binary {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Utangulizi wa fuzzing inayotegemea sifa {#introduction-to-property-based-fuzzing}

Echidna ni fuzzer inayotegemea sifa, tuliyoielezea katika machapisho yetu ya awali ya blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) ni mbinu inayojulikana sana katika jamii ya usalama. Inajumuisha kuzalisha data za kuingiza ambazo ni za kubahatisha ili kupata hitilafu kwenye programu. Fuzzers za programu za kitamaduni (kama vile [AFL](http://lcamtuf.coredump.cx/afl/) au [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) zinajulikana kuwa zana bora za kupata hitilafu.

Zaidi ya uzalishaji wa data za kuingiza kwa kubahatisha tu, kuna mbinu na mikakati mingi ya kuzalisha data nzuri za kuingiza, ikiwa ni pamoja na:

- Kupata mrejesho kutoka kwa kila utekelezaji na kuongoza uzalishaji kwa kuutumia. Kwa mfano, ikiwa data mpya iliyozalishwa inasababisha ugunduzi wa njia mpya, inaweza kuwa na maana kuzalisha data mpya zinazokaribiana nayo.
- Kuzalisha data za kuingiza kwa kuzingatia kizuizi cha kimuundo. Kwa mfano, ikiwa data yako ina kichwa chenye checksum, itakuwa na maana kuruhusu fuzzer izalishe data inayothibitisha checksum hiyo.
- Kutumia data zinazojulikana kuzalisha data mpya: ikiwa una ufikiaji wa mkusanyiko mkubwa wa data halali, fuzzer yako inaweza kuzalisha data mpya kutoka kwayo, badala ya kuanza uzalishaji wake kutoka mwanzo. Hizi kwa kawaida huitwa _mbegu (seeds)_.

### Fuzzing inayotegemea sifa {#property-based-fuzzing}

Echidna ni ya familia maalum ya fuzzer: fuzzing inayotegemea sifa iliyohamasishwa sana na [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Tofauti na fuzzer za kawaida ambazo zitajaribu kutafuta mkwamo wa programu, Echidna itajaribu kuvunja vigezo visivyobadilika (invariants) vilivyofafanuliwa na mtumiaji.

Katika mikataba mahiri, vigezo visivyobadilika ni vipengele vya Solidity, ambavyo vinaweza kuwakilisha hali yoyote isiyo sahihi au batili ambayo mkataba unaweza kufikia, ikiwa ni pamoja na:

- Udhibiti usio sahihi wa ufikiaji: mshambuliaji alikua mmiliki wa mkataba.
- Mashine ya hali isiyo sahihi: tokeni zinaweza kuhamishwa wakati mkataba umesitishwa.
- Hesabu isiyo sahihi: mtumiaji anaweza kupunguza salio lake chini ya sifuri (underflow) na kupata tokeni za bure zisizo na kikomo.

### Kujaribu sifa na Echidna {#testing-a-property-with-echidna}

Tutaona jinsi ya kujaribu mkataba mahiri na Echidna. Lengo ni mkataba mahiri ufuatao [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
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
- Irudishe `true` ikiwa imefanikiwa
- Iwe na jina lake linaloanza na `echidna`

Echidna ita:

- Zalisha miamala ya kiholela kiotomatiki ili kujaribu sifa.
- Ripoti miamala yoyote inayosababisha sifa kurudisha `false` au kutoa hitilafu.
- Tupa athari za kando wakati wa kuita sifa (yaani, ikiwa sifa inabadilisha kigezo cha hali, inatupwa baada ya jaribio)

Sifa ifuatayo inakagua kuwa mpigaji hana zaidi ya tokeni 1000:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Tumia urithi (inheritance) kutenganisha mkataba wako na sifa zako:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) inatekeleza sifa na kurithi kutoka kwa tokeni.

### Anzisha mkataba {#initiate-a-contract}

Echidna inahitaji [konstrukta](/developers/docs/smart-contracts/anatomy/#constructor-functions) isiyo na hoja. Ikiwa mkataba wako unahitaji uanzishaji maalum, unahitaji kufanya hivyo kwenye konstrukta.

Kuna anwani maalum katika Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` ambayo inaita konstrukta.
- `0x10000`, `0x20000`, na `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` ambazo huita vipengele vingine kwa kubahatisha.

Hatuhitaji uanzishaji wowote maalum katika mfano wetu wa sasa, kwa sababu hiyo konstrukta yetu ni tupu.

### Endesha Echidna {#run-echidna}

Echidna inazinduliwa na:

```bash
echidna-test contract.sol
```

Ikiwa contract.sol ina mikataba mingi, unaweza kubainisha lengo:

```bash
echidna-test contract.sol --contract MyContract
```

### Muhtasari: Kujaribu sifa {#summary-testing-a-property}

Ifuatayo inatoa muhtasari wa uendeshaji wa Echidna kwenye mfano wetu:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna iligundua kuwa sifa inakiukwa ikiwa `backdoor` inaitwa.

## Kuchuja vipengele vya kuita wakati wa kampeni ya fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Tutaona jinsi ya kuchuja vipengele vitakavyofanyiwa fuzzing.
Lengo ni mkataba mahiri ufuatao:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Mfano huu mdogo unalazimisha Echidna kupata mfuatano fulani wa miamala ili kubadilisha kigezo cha hali.
Hili ni gumu kwa fuzzer (inapendekezwa kutumia zana ya utekelezaji wa kiishara kama [Manticore](https://github.com/trailofbits/manticore)).
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Kuchuja vipengele {#filtering-functions}

Echidna inapata shida kupata mfuatano sahihi wa kujaribu mkataba huu kwa sababu vipengele viwili vya kuweka upya (`reset1` na `reset2`) vitaweka vigezo vyote vya hali kuwa `false`.
Hata hivyo, tunaweza kutumia kipengele maalum cha Echidna kuweka kwenye orodha nyeusi kipengele cha kuweka upya au kuweka kwenye orodha nyeupe vipengele vya `f`, `g`,
`h` na `i` pekee.

Ili kuweka vipengele kwenye orodha nyeusi, tunaweza kutumia faili hili la usanidi:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Njia nyingine ya kuchuja vipengele ni kuorodhesha vipengele vilivyo kwenye orodha nyeupe. Ili kufanya hivyo, tunaweza kutumia faili hili la usanidi:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` ni `true` kwa chaguo-msingi.
- Uchujaji utafanywa kwa jina pekee (bila vigezo). Ikiwa una `f()` na `f(uint256)`, kichujio `"f"` kitalingana na vipengele vyote viwili.

### Endesha Echidna {#run-echidna-1}

Ili kuendesha Echidna na faili la usanidi `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna itapata mfuatano wa miamala wa kukanusha sifa karibu mara moja.

### Muhtasari: Kuchuja vipengele {#summary-filtering-functions}

Echidna inaweza kuweka kwenye orodha nyeusi au orodha nyeupe vipengele vya kuita wakati wa kampeni ya fuzzing kwa kutumia:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna inaanza kampeni ya fuzzing iwe kwa kuweka kwenye orodha nyeusi `f1`, `f2` na `f3` au kwa kuita hizi pekee, kulingana na thamani ya boolean ya `filterBlacklist`.

## Jinsi ya kujaribu thibitisha ya Solidity na Echidna {#how-to-test-soliditys-assert-with-echidna}

Katika mafunzo haya mafupi, tutaonyesha jinsi ya kutumia Echidna kujaribu ukaguzi wa uthibitisho katika mikataba. Tuseme tuna mkataba kama huu:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Andika uthibitisho {#write-an-assertion}

Tunataka kuhakikisha kuwa `tmp` ni ndogo au sawa na `counter` baada ya kurudisha tofauti yake. Tungeweza kuandika sifa ya Echidna, lakini tutahitaji kuhifadhi thamani ya `tmp` mahali fulani. Badala yake, tungeweza kutumia uthibitisho kama huu:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Endesha Echidna {#run-echidna-2}

Ili kuwezesha upimaji wa kufeli kwa uthibitisho, tengeneza [faili la usanidi la Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Tunapoendesha mkataba huu katika Echidna, tunapata matokeo yaliyotarajiwa:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Kama unavyoona, Echidna inaripoti kufeli kwa uthibitisho katika kipengele cha `inc`. Kuongeza zaidi ya uthibitisho mmoja kwa kila kipengele kunawezekana, lakini Echidna haiwezi kusema ni uthibitisho upi uliofeli.

### Lini na jinsi ya kutumia uthibitisho {#when-and-how-use-assertions}

Uthibitisho unaweza kutumika kama mbadala wa sifa za wazi, hasa ikiwa masharti ya kukagua yanahusiana moja kwa moja na matumizi sahihi ya operesheni fulani `f`. Kuongeza uthibitisho baada ya msimbo fulani kutalazimisha kuwa ukaguzi utafanyika mara tu baada ya kutekelezwa:

```solidity
function f(..) public {
    // kodi fulani tata
    ...
    assert (condition);
    ...
}

```

Kinyume chake, kutumia sifa ya wazi ya Echidna kutatekeleza miamala kwa kubahatisha na hakuna njia rahisi ya kulazimisha hasa ni lini itakaguliwa. Bado inawezekana kufanya mbadala huu:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Hata hivyo, kuna baadhi ya matatizo:

- Inafeli ikiwa `f` imetangazwa kama `internal` au `external`.
- Haieleweki ni hoja zipi zinapaswa kutumika kuita `f`.
- Ikiwa `f` itatengua, sifa itafeli.

Kwa ujumla, tunapendekeza kufuata [pendekezo la John Regehr](https://blog.regehr.org/archives/1091) kuhusu jinsi ya kutumia uthibitisho:

- Usilazimishe athari yoyote ya kando wakati wa ukaguzi wa uthibitisho. Kwa mfano: `assert(ChangeStateAndReturn() == 1)`
- Usithibitishe kauli zilizo wazi. Kwa mfano `assert(var >= 0)` ambapo `var` imetangazwa kama `uint`.

Hatimaye, tafadhali **usitumie** `require` badala ya `assert`, kwa kuwa Echidna haitaweza kuigundua (lakini mkataba utatengua hata hivyo).

### Muhtasari: Ukaguzi wa Uthibitisho {#summary-assertion-checking}

Ifuatayo inatoa muhtasari wa uendeshaji wa Echidna kwenye mfano wetu:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna iligundua kuwa uthibitisho katika `inc` unaweza kufeli ikiwa kipengele hiki kitaitwa mara nyingi na hoja kubwa.

## Kukusanya na kurekebisha mkusanyiko wa data wa Echidna {#collecting-and-modifying-an-echidna-corpus}

Tutaona jinsi ya kukusanya na kutumia mkusanyiko wa data wa miamala na Echidna. Lengo ni mkataba mahiri ufuatao [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Mfano huu mdogo unalazimisha Echidna kupata thamani fulani ili kubadilisha kigezo cha hali. Hili ni gumu kwa fuzzer
(inapendekezwa kutumia zana ya utekelezaji wa kiishara kama [Manticore](https://github.com/trailofbits/manticore)).
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Hata hivyo, bado tunaweza kutumia Echidna kukusanya mkusanyiko wa data wakati wa kuendesha kampeni hii ya fuzzing.

### Kukusanya mkusanyiko wa data {#collecting-a-corpus}

Ili kuwezesha ukusanyaji wa mkusanyiko wa data, tengeneza saraka ya mkusanyiko wa data:

```bash
mkdir corpus-magic
```

Na [faili la usanidi la Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Sasa tunaweza kuendesha zana yetu na kukagua mkusanyiko wa data uliokusanywa:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna bado haiwezi kupata thamani sahihi za kichawi (magic values), lakini tunaweza kuangalia mkusanyiko wa data iliokusanya.
Kwa mfano, moja ya faili hizi ilikuwa:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Ni wazi, data hii haitasababisha kufeli katika sifa yetu. Hata hivyo, katika hatua inayofuata, tutaona jinsi ya kuirekebisha kwa ajili hiyo.

### Kupanda mbegu kwenye mkusanyiko wa data {#seeding-a-corpus}

Echidna inahitaji msaada fulani ili kushughulika na kipengele cha `magic`. Tunakwenda kunakili na kurekebisha data ya kuingiza ili kutumia vigezo vinavyofaa kwayo:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Tutarekebisha `new.txt` ili kuita `magic(42,129,333,0)`. Sasa, tunaweza kuendesha Echidna tena:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Wakati huu, iligundua kuwa sifa inakiukwa mara moja.

## Kupata miamala yenye matumizi makubwa ya gesi {#finding-transactions-with-high-gas-consumption}

Tutaona jinsi ya kupata miamala yenye matumizi makubwa ya gesi na Echidna. Lengo ni mkataba mahiri ufuatao:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Hapa `expensive` inaweza kuwa na matumizi makubwa ya gesi.

Kwa sasa, Echidna daima inahitaji sifa ya kujaribu: hapa `echidna_test` daima inarudisha `true`.
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```
echidna-test gas.sol
...
echidna_test: imefaulu! 🎉

Mbegu: 2320549945714142710
```

### Kupima Matumizi ya Gesi {#measuring-gas-consumption}

Ili kuwezesha matumizi ya gesi na Echidna, tengeneza faili la usanidi `config.yaml`:

```yaml
estimateGas: true
```

Katika mfano huu, pia tutapunguza ukubwa wa mfuatano wa miamala ili kufanya matokeo yawe rahisi kueleweka:

```yaml
seqLen: 2
estimateGas: true
```

### Endesha Echidna {#run-echidna-3}

Mara tu tunapokuwa na faili la usanidi lililotengenezwa, tunaweza kuendesha Echidna hivi:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Gesi inayoonyeshwa ni makadirio yaliyotolewa na [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Kuchuja Miito Inayopunguza Gesi {#filtering-out-gas-reducing-calls}

Mafunzo kuhusu **kuchuja vipengele vya kuita wakati wa kampeni ya fuzzing** hapo juu yanaonyesha jinsi ya kuondoa baadhi ya vipengele kwenye upimaji wako.  
Hili linaweza kuwa muhimu kwa kupata makadirio sahihi ya gesi.
Fikiria mfano ufuatao:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Ikiwa Echidna inaweza kuita vipengele vyote, haitapata kwa urahisi miamala yenye gharama kubwa ya gesi:

```
echidna-test pushpop.sol --config config.yaml
...
pop ilitumia kiwango cha juu cha gesi 10746
...
check ilitumia kiwango cha juu cha gesi 23730
...
clear ilitumia kiwango cha juu cha gesi 35916
...
push ilitumia kiwango cha juu cha gesi 40839
```

Hiyo ni kwa sababu gharama inategemea ukubwa wa `addrs` na miito ya kubahatisha huwa inaacha safu (array) karibu tupu.
Kuweka kwenye orodha nyeusi `pop` na `clear`, hata hivyo, kunatupa matokeo bora zaidi:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push ilitumia kiwango cha juu cha gesi 40839
...
check ilitumia kiwango cha juu cha gesi 1484472
```

### Muhtasari: Kupata miamala yenye matumizi makubwa ya gesi {#summary-finding-transactions-with-high-gas-consumption}

Echidna inaweza kupata miamala yenye matumizi makubwa ya gesi kwa kutumia chaguo la usanidi la `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna itaripoti mfuatano wenye matumizi ya juu zaidi ya gesi kwa kila kipengele, mara tu kampeni ya fuzzing itakapokamilika.