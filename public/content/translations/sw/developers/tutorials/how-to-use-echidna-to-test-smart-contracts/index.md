---
title: Jinsi ya kutumia Echidna kujaribu mikataba-erevu
description: Jinsi ya kutumia Echidna kujaribu mikataba-erevu kiotomatiki
author: "Trailofbits"
lang: sw
tags:
  [
    "uimara",
    "mikataba erevu",
    "usalama",
    "majaribio",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Usakinishaji {#installation}

Echidna inaweza kusakinishwa kupitia docker au kutumia binary iliyokusanywa awali.

### Echidna kupitia docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Amri ya mwisho huendesha eth-security-toolbox kwenye docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa mwenyeji wako, na uendeshe zana kwenye faili kutoka kwa docker_

Ndani ya docker, endesha :

```bash
solc-select 0.5.11
cd /home/training
```

### Binary {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Utangulizi wa fuzzing kulingana na sifa {#introduction-to-property-based-fuzzing}

Echidna ni fuzzer kulingana na sifa, tulielezea katika machapisho yetu ya awali ya blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) ni mbinu inayojulikana sana katika jumuiya ya usalama. Inajumuisha kuzalisha pembejeo ambazo ni nasibu kiasi ili kupata hitilafu katika programu. Fuzzers za programu za jadi (kama vile [AFL](http://lcamtuf.coredump.cx/afl/) au [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) zinajulikana kuwa zana bora za kupata hitilafu.

Zaidi ya uzalishaji wa pembejeo nasibu kabisa, kuna mbinu na mikakati mingi ya kuzalisha pembejeo nzuri, ikiwemo:

- Pata maoni kutoka kwa kila utekelezaji na uelekeze uzalishaji kwa kutumia maoni hayo. Kwa mfano, ikiwa pembejeo mpya iliyozalishwa itasababisha ugunduzi wa njia mpya, inaweza kuwa na maana kuzalisha pembejeo mpya zilizo karibu nayo.
- Kuzalisha pembejeo inayoheshimu kizuizi cha kimuundo. Kwa mfano, ikiwa pembejeo yako ina kichwa chenye checksum, itakuwa na maana kuiruhusu fuzzer kuzalisha pembejeo inayohakiki checksum.
- Kutumia pembejeo zinazojulikana kuzalisha pembejeo mpya: ikiwa una uwezo wa kufikia seti kubwa ya data ya pembejeo halali, fuzzer yako inaweza kuzalisha pembejeo mpya kutoka humo, badala ya kuanza uzalishaji wake kutoka mwanzo. Hizi kwa kawaida huitwa _mbegu_.

### Fuzzing kulingana na sifa {#property-based-fuzzing}

Echidna ni ya familia maalum ya fuzzer: fuzzing kulingana na sifa iliyohamasishwa sana na [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Tofauti na fuzzer za kawaida ambazo zitajaribu kupata kuharibika, Echidna itajaribu kuvunja visivyobadilika vilivyobainishwa na mtumiaji.

Katika mikataba-erevu, visivyobadilika ni chaguo za kukokotoa za Solidity, ambazo zinaweza kuwakilisha hali yoyote isiyo sahihi au batili ambayo mkataba unaweza kufikia, ikiwa ni pamoja na:

- Udhibiti usio sahihi wa ufikiaji: mshambulizi alikua mmiliki wa mkataba.
- Mashine ya hali isiyo sahihi: tokeni zinaweza kuhamishwa wakati mkataba umesitishwa.
- Hesabu isiyo sahihi: mtumiaji anaweza kufanya 'underflow' salio lake na kupata tokeni za bure zisizo na kikomo.

### Kujaribu sifa na Echidna {#testing-a-property-with-echidna}

Tutaona jinsi ya kujaribu mkataba-erevu na Echidna. Lengo ni mkataba-erevu ufuatao [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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
- Tokeni haiwezi kuhamishwa (sio tokeni ya ERC20)

### Andika sifa {#write-a-property}

Sifa za Echidna ni chaguo za kukokotoa za Solidity. Sifa lazima:

- Haina kigezo
- Rejesha `true` ikiwa imefanikiwa
- Jina lake kuanza na `echidna`

Echidna ita:

- Zalisha kiotomatiki miamala isiyo ya kawaida ili kujaribu sifa.
- Ripoti miamala yoyote inayoongoza sifa kurejesha `false` au kutupa hitilafu.
- Puuza athari za kando wakati wa kuita sifa (yaani, ikiwa sifa inabadilisha kigezo cha hali, inapotea baada ya jaribio)

Sifa ifuatayo hukagua kwamba mhusika hana zaidi ya tokeni 1000:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Tumia urithi kutenganisha mkataba wako na sifa zako:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) inatekeleza sifa na kurithi kutoka kwa tokeni.

### Anzisha mkataba {#initiate-a-contract}

Echidna inahitaji [kiunda](/developers/docs/smart-contracts/anatomy/#constructor-functions) bila kigezo. Ikiwa mkataba wako unahitaji uanzishaji maalum, unahitaji kuufanya katika kiunda.

Kuna anwani maalum katika Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` ambayo huita kiunda.
- `0x10000`, `0x20000`, na `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` ambazo huita kiholela chaguo za kukokotoa zingine.

Hatuhitaji uanzishaji wowote maalum katika mfano wetu wa sasa, kwa hivyo kiunda chetu hakina kitu.

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

Yafuatayo ni muhtasari wa uendeshaji wa echidna kwenye mfano wetu:

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

Echidna iligundua kuwa sifa inakiukwa ikiwa `backdoor` itaitwa.

## Kuchuja chaguo za kukokotoa za kuita wakati wa kampeni ya fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Tutaona jinsi ya kuchuja chaguo za kukokotoa za kufanyiwa 'fuzz'.
Lengo ni mkataba-erevu ufuatao:

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
Hii ni ngumu kwa fuzzer (inapendekezwa kutumia zana ya utekelezaji wa ishara kama [Manticore](https://github.com/trailofbits/manticore)).
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Kuchuja chaguo za kukokotoa {#filtering-functions}

Echidna ina shida kupata mfuatano sahihi wa kujaribu mkataba huu kwa sababu chaguo mbili za kukokotoa za kuweka upya (`reset1` na `reset2`) zitaweka vigezo vyote vya hali kuwa `false`.
Hata hivyo, tunaweza kutumia kipengele maalum cha Echidna ama kuweka kwenye orodha nyeusi chaguo za kukokotoa za kuweka upya au kuweka kwenye orodha nyeupe tu chaguo za kukokotoa za `f`, `g`,
`h` na `i`.

Ili kuweka kwenye orodha nyeusi chaguo za kukokotoa, tunaweza kutumia faili hii ya usanidi:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Njia nyingine ya kuchuja chaguo za kukokotoa ni kuorodhesha chaguo za kukokotoa zilizoidhinishwa. Ili kufanya hivyo, tunaweza kutumia faili hii ya usanidi:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` ni `true` kwa chaguo-msingi.
- Kuchuja kutafanywa kwa jina tu (bila vigezo). Ikiwa una `f()` na `f(uint256)`, kichujio cha `"f"` kitafanana na chaguo zote mbili za kukokotoa.

### Endesha Echidna {#run-echidna-1}

Ili kuendesha Echidna na faili ya usanidi `blacklist.yaml`:

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

Echidna itapata mfuatano wa miamala ya kukanusha sifa karibu mara moja.

### Muhtasari: Kuchuja chaguo za kukokotoa {#summary-filtering-functions}

Echidna inaweza kuweka kwenye orodha nyeusi au orodha nyeupe chaguo za kukokotoa za kuita wakati wa kampeni ya fuzzing kwa kutumia:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna huanza kampeni ya fuzzing ama kwa kuweka kwenye orodha nyeusi `f1`, `f2` na `f3` au kwa kuita hizi pekee, kulingana
na thamani ya boolean ya `filterBlacklist`.

## Jinsi ya kujaribu assert ya Solidity na Echidna {#how-to-test-soliditys-assert-with-echidna}

Katika mafunzo haya mafupi, tutaonyesha jinsi ya kutumia Echidna kujaribu ukaguzi wa dai katika mikataba. Tuseme tuna mkataba kama huu:

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

### Andika dai {#write-an-assertion}

Tunataka kuhakikisha kuwa `tmp` ni ndogo au sawa na `counter` baada ya kurudisha tofauti yake. Tunaweza kuandika sifa ya Echidna, lakini tutahitaji kuhifadhi thamani ya `tmp` mahali fulani. Badala yake, tunaweza kutumia dai kama hili:

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

Ili kuwezesha upimaji wa kutofaulu kwa dai, tengeneza [faili ya usanidi wa Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Tunapoendesha mkataba huu katika Echidna, tunapata matokeo yanayotarajiwa:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(217110167319967866419195559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Kama unavyoona, Echidna inaripoti kushindwa kwa dai fulani katika chaguo la kukokotoa la `inc`. Kuongeza zaidi ya dai moja kwa kila chaguo la kukokotoa kunawezekana, lakini Echidna haiwezi kusema ni dai gani lililoshindwa.

### Wakati gani na jinsi gani ya kutumia madai {#when-and-how-use-assertions}

Madai yanaweza kutumika kama njia mbadala ya sifa dhahiri, haswa ikiwa masharti ya kukagua yanahusiana moja kwa moja na matumizi sahihi ya operesheni fulani `f`. Kuongeza madai baada ya msimbo fulani kutalazimisha ukaguzi ufanyike mara tu baada ya kutekelezwa:

```solidity
function f(..) public {
    // msimbo fulani tata
    ...
    assert (condition);
    ...
}

```

Kinyume chake, kutumia sifa ya wazi ya echidna kutatekeleza miamala kwa nasibu na hakuna njia rahisi ya kulazimisha ni lini hasa itakaguliwa. Bado inawezekana kufanya njia hii mbadala:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Hata hivyo, kuna baadhi ya masuala:

- Inashindwa ikiwa `f` imetangazwa kama `internal` au `external`.
- Haijulikani ni vigezo vipi vinapaswa kutumika kuita `f`.
- Ikiwa `f` inabatilika, sifa itashindwa.

Kwa ujumla, tunapendekeza kufuata [pendekezo la John Regehr](https://blog.regehr.org/archives/1091) kuhusu jinsi ya kutumia madai:

- Usilazimishe athari yoyote ya kando wakati wa ukaguzi wa dai. Kwa mfano: `assert(ChangeStateAndReturn() == 1)`
- Usidai kauli zilizo wazi. Kwa mfano `assert(var >= 0)` ambapo `var` imetangazwa kama `uint`.

Mwisho, tafadhali **usitumie** `require` badala ya `assert`, kwani Echidna haitaweza kuitambua (lakini mkataba utabatilika hata hivyo).

### Muhtasari: Ukaguzi wa Madai {#summary-assertion-checking}

Yafuatayo ni muhtasari wa uendeshaji wa echidna kwenye mfano wetu:

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
    inc(217110167319967866419195559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna iligundua kuwa dai katika `inc` linaweza kushindwa ikiwa chaguo hili la kukokotoa litaitwa mara nyingi na vigezo vikubwa.

## Kukusanya na kurekebisha mkusanyiko wa Echidna {#collecting-and-modifying-an-echidna-corpus}

Tutaona jinsi ya kukusanya na kutumia mkusanyiko wa miamala na Echidna. Lengo ni mkataba-erevu ufuatao [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Mfano huu mdogo unalazimisha Echidna kupata thamani fulani ili kubadilisha kigezo cha hali. Hii ni ngumu kwa fuzzer
(inapendekezwa kutumia zana ya utekelezaji wa ishara kama [Manticore](https://github.com/trailofbits/manticore)).
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Hata hivyo, bado tunaweza kutumia Echidna kukusanya mkusanyiko tunapoendesha kampeni hii ya 'fuzzing'.

### Kukusanya mkusanyiko {#collecting-a-corpus}

Ili kuwezesha ukusanyaji wa mkusanyiko, tengeneza saraka ya mkusanyiko:

```bash
mkdir corpus-magic
```

Na [faili ya usanidi wa Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Sasa tunaweza kuendesha zana yetu na kuangalia mkusanyiko uliokusanywa:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna bado haiwezi kupata thamani sahihi za 'uchawi', lakini tunaweza kuangalia mkusanyiko iliokusanya.
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

Ni wazi, pembejeo hii haitasababisha kutofaulu kwa sifa yetu. Hata hivyo, katika hatua inayofuata, tutaona jinsi ya kuirekebisha kwa ajili hiyo.

### Kupanda mbegu kwenye mkusanyiko {#seeding-a-corpus}

Echidna inahitaji msaada ili kushughulikia chaguo la kukokotoa la `magic`. Tutakili na kurekebisha pembejeo ili kutumia vigezo
vinavyofaa kwake:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Tutarekebisha `new.txt` ili iite `magic(42,129,333,0)`. Sasa, tunaweza kuendesha Echidna tena:

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

## Kupata miamala yenye matumizi makubwa ya Gesi {#finding-transactions-with-high-gas-consumption}

Tutaona jinsi ya kupata miamala yenye matumizi makubwa ya Gesi na Echidna. Lengo ni mkataba-erevu ufuatao:

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

Hapa `expensive` inaweza kuwa na matumizi makubwa ya Gesi.

Hivi sasa, Echidna daima inahitaji mali ya kujaribu: hapa `echidna_test` daima inarudi `true`.
Tunaweza kuendesha Echidna ili kuthibitisha hili:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Kupima Matumizi ya Gesi {#measuring-gas-consumption}

Ili kuwezesha matumizi ya Gesi na Echidna, tengeneza faili ya usanidi `config.yaml`:

```yaml
estimateGas: true
```

Katika mfano huu, tutapunguza pia ukubwa wa mfuatano wa manunuzi ili kufanya matokeo yawe rahisi kueleweka:

```yaml
seqLen: 2
estimateGas: true
```

### Endesha Echidna {#run-echidna-3}

Mara tu tunapokuwa na faili ya usanidi iliyoundwa, tunaweza kuendesha Echidna kama hii:

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

### Kuchuja Simu zinazopunguza Gesi {#filtering-out-gas-reducing-calls}

Mafunzo kuhusu **kuchuja chaguo za kukokotoa za kuita wakati wa kampeni ya fuzzing** hapo juu yanaonyesha jinsi ya
kuondoa baadhi ya chaguo za kukokotoa kutoka kwa majaribio yako.  
Hii inaweza kuwa muhimu kwa kupata makadirio sahihi ya Gesi.
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

Ikiwa Echidna inaweza kuita chaguo zote za kukokotoa, haitapata kwa urahisi miamala yenye gharama kubwa ya Gesi:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Hiyo ni kwa sababu gharama inategemea ukubwa wa `addrs` na simu za nasibu huelekea kuacha safu karibu tupu.
Kuorodhesha `pop` na `clear` nyeusi, hata hivyo, hutupa matokeo bora zaidi:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Muhtasari: Kupata miamala yenye matumizi makubwa ya Gesi {#summary-finding-transactions-with-high-gas-consumption}

Echidna inaweza kupata miamala yenye matumizi makubwa ya Gesi kwa kutumia chaguo la usanidi la `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna itaripoti mfuatano wenye matumizi ya juu zaidi ya Gesi kwa kila chaguo la kukokotoa, mara tu kampeni ya fuzzing itakapokamilika.
