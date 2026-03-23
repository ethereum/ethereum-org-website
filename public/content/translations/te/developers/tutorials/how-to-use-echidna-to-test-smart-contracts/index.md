---
title: "స్మార్ట్ కాంట్రాక్టులను పరీక్షించడానికి ఎకిడ్నాని ఎలా ఉపయోగించాలి"
description: "స్మార్ట్ కాంట్రాక్టులను స్వయంచాలకంగా పరీక్షించడానికి ఎకిడ్నాని ఎలా ఉపయోగించాలి"
author: "Trailofbits"
lang: te
tags:
  [
    "Solidity",
    "స్మార్ట్ కాంట్రాక్టులు",
    "భద్రత",
    "పరీక్షించడం",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## సంస్థాపన {#installation}

డాకర్ ద్వారా లేదా ముందుగా కంపైల్ చేసిన బైనరీని ఉపయోగించి ఎకిడ్నాని ఇన్‌స్టాల్ చేయవచ్చు.

### డాకర్ ద్వారా ఎకిడ్నా {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న డాకర్‌లో eth-security-toolboxను రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు, మరియు డాకర్_ నుండి ఫైల్‌లపై సాధనాలను అమలు చేయండి

డాకర్ లోపల, రన్ చేయండి :

```bash
solc-select 0.5.11
cd /home/training
```

### బైనరీ {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్‌కు పరిచయం {#introduction-to-property-based-fuzzing}

ఎకిడ్నా ఒక ప్రాపర్టీ-ఆధారిత ఫజర్, మేము మా మునుపటి బ్లాగ్‌పోస్ట్‌లలో వివరించాము ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### ఫజ్జింగ్ {#fuzzing}

[ఫజ్జింగ్](https://wikipedia.org/wiki/Fuzzing) అనేది భద్రతా సంఘంలో ఒక ప్రసిద్ధ సాంకేతికత. ప్రోగ్రామ్‌లో బగ్‌లను కనుగొనడానికి, ఇది ఎక్కువ లేదా తక్కువ యాదృచ్ఛికంగా ఉండే ఇన్‌పుట్‌లను ఉత్పత్తి చేస్తుంది. సాంప్రదాయ సాఫ్ట్‌వేర్ కోసం ఫజర్‌లు (ఉదాహరణకు [AFL](http://lcamtuf.coredump.cx/afl/) లేదా [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) బగ్‌లను కనుగొనడానికి సమర్థవంతమైన సాధనాలుగా ప్రసిద్ధి చెందాయి.

కేవలం యాదృచ్ఛిక ఇన్‌పుట్‌ల ఉత్పత్తికి మించి, మంచి ఇన్‌పుట్‌లను ఉత్పత్తి చేయడానికి అనేక పద్ధతులు మరియు వ్యూహాలు ఉన్నాయి, వాటితో సహా:

- ప్రతి అమలు నుండి అభిప్రాయాన్ని పొందడం మరియు దానిని ఉపయోగించి ఉత్పత్తికి మార్గనిర్దేశం చేయడం. ఉదాహరణకు, కొత్తగా ఉత్పత్తి చేయబడిన ఇన్‌పుట్ కొత్త మార్గం ఆవిష్కరణకు దారితీస్తే, దానికి దగ్గరగా కొత్త ఇన్‌పుట్‌లను ఉత్పత్తి చేయడం అర్ధవంతంగా ఉంటుంది.
- నిర్మాణాత్మక పరిమితిని గౌరవిస్తూ ఇన్‌పుట్‌ను ఉత్పత్తి చేయడం. ఉదాహరణకు, మీ ఇన్‌పుట్‌లో చెక్‌సమ్‌తో కూడిన హెడర్ ఉంటే, చెక్‌సమ్‌ను ధ్రువీకరించే ఇన్‌పుట్‌ను ఫజర్ ఉత్పత్తి చేసేలా చేయడం అర్ధవంతంగా ఉంటుంది.
- కొత్త ఇన్‌పుట్‌లను ఉత్పత్తి చేయడానికి తెలిసిన ఇన్‌పుట్‌లను ఉపయోగించడం: మీకు చెల్లుబాటు అయ్యే ఇన్‌పుట్ యొక్క పెద్ద డేటాసెట్‌కు ప్రాప్యత ఉంటే, మీ ఫజర్ దాని ఉత్పత్తిని మొదటి నుండి ప్రారంభించడం కంటే వాటి నుండి కొత్త ఇన్‌పుట్‌లను ఉత్పత్తి చేయగలదు. వీటిని సాధారణంగా _సీడ్స్_ అని అంటారు.

### ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్ {#property-based-fuzzing}

ఎకిడ్నా ఒక నిర్దిష్ట రకం ఫజర్‌కు చెందినది: [QuickCheck](https://wikipedia.org/wiki/QuickCheck) నుండి బాగా ప్రేరణ పొందిన ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్. క్రాష్‌లను కనుగొనడానికి ప్రయత్నించే క్లాసిక్ ఫజర్‌కు విరుద్ధంగా, ఎకిడ్నా వినియోగదారు-నిర్వచించిన ఇన్‌వేరియంట్‌లను బ్రేక్ చేయడానికి ప్రయత్నిస్తుంది.

స్మార్ట్ కాంట్రాక్టులలో, ఇన్‌వేరియంట్‌లు అనేవి Solidity ఫంక్షన్‌లు, ఇవి కాంట్రాక్ట్ చేరగల ఏదైనా తప్పు లేదా చెల్లని స్థితిని సూచించగలవు, వాటితో సహా:

- తప్పు యాక్సెస్ నియంత్రణ: దాడి చేసేవాడు కాంట్రాక్ట్ యజమాని అయ్యాడు.
- తప్పు స్టేట్ మెషిన్: కాంట్రాక్ట్ పాజ్ చేయబడినప్పుడు టోకెన్‌లను బదిలీ చేయవచ్చు.
- తప్పు అంకగణితం: వినియోగదారుడు తన బ్యాలెన్స్‌ను అండర్‌ఫ్లో చేసి, అపరిమిత ఉచిత టోకెన్‌లను పొందవచ్చు.

### ఎకిడ్నాతో ఒక ప్రాపర్టీని పరీక్షించడం {#testing-a-property-with-echidna}

ఎకిడ్నాతో ఒక స్మార్ట్ కాంట్రాక్టును ఎలా పరీక్షించాలో మనం చూద్దాం. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

ఈ టోకెన్‌కు కింది గుణాలు తప్పనిసరిగా ఉండాలని మనం ఊహిద్దాం:

- ఎవరైనా గరిష్టంగా 1000 టోకెన్‌లను కలిగి ఉండవచ్చు
- టోకెన్‌ను బదిలీ చేయలేరు (ఇది ERC20 టోకెన్ కాదు)

### ఒక ప్రాపర్టీని రాయండి {#write-a-property}

ఎకిడ్నా ప్రాపర్టీలు Solidity ఫంక్షన్‌లు. ఒక ప్రాపర్టీకి తప్పనిసరిగా:

- ఆర్గ్యుమెంట్ ఏదీ ఉండకూడదు
- విజయవంతమైతే `true` తిరిగి ఇవ్వాలి
- దాని పేరు `echidna`తో ప్రారంభం కావాలి

ఎకిడ్నా:

- ప్రాపర్టీని పరీక్షించడానికి యాదృచ్ఛిక లావాదేవీలను స్వయంచాలకంగా ఉత్పత్తి చేయండి.
- ఒక ప్రాపర్టీని `false` అని తిరిగి ఇచ్చేలా చేసే లేదా ఒక లోపాన్ని త్రో చేసే ఏవైనా లావాదేవీలను నివేదించండి.
- ఒక ప్రాపర్టీని కాల్ చేస్తున్నప్పుడు సైడ్-ఎఫెక్ట్‌ను విస్మరించండి (అంటే, ఒకవేళ ప్రాపర్టీ ఒక స్టేట్ వేరియబుల్‌ను మార్చినట్లయితే, పరీక్ష తర్వాత అది విస్మరించబడుతుంది)

కింది ప్రాపర్టీ కాలర్‌కు 1000 కంటే ఎక్కువ టోకెన్‌లు లేవని తనిఖీ చేస్తుంది:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

మీ కాంట్రాక్టును మీ ప్రాపర్టీల నుండి వేరు చేయడానికి వారసత్వాన్ని ఉపయోగించండి:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) ప్రాపర్టీని అమలు చేస్తుంది మరియు టోకెన్ నుండి వారసత్వంగా పొందుతుంది.

### ఒక కాంట్రాక్టును ప్రారంభించండి {#initiate-a-contract}

ఎకిడ్నాకు ఆర్గ్యుమెంట్ లేని [కన్స్ట్రక్టర్](/developers/docs/smart-contracts/anatomy/#constructor-functions) అవసరం. మీ కాంట్రాక్టుకు ఒక నిర్దిష్ట ప్రారంభీకరణ అవసరమైతే, మీరు దానిని కన్స్ట్రక్టర్‌లో చేయాలి.

ఎకిడ్నాలో కొన్ని నిర్దిష్ట చిరునామాలు ఉన్నాయి:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` ఇది కన్స్ట్రక్టర్‌ను కాల్ చేస్తుంది.
- `0x10000`, `0x20000`, మరియు `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` ఇవి ఇతర ఫంక్షన్‌లను యాదృచ్ఛికంగా పిలుస్తాయి.

మన ప్రస్తుత ఉదాహరణలో మనకు ఏ ప్రత్యేక ప్రారంభీకరణ అవసరం లేదు, ఫలితంగా మన కన్స్ట్రక్టర్ ఖాళీగా ఉంది.

### ఎకిడ్నాని రన్ చేయండి {#run-echidna}

ఎకిడ్నాని దీనితో లాంచ్ చేస్తారు:

```bash
echidna-test contract.sol
```

ఒకవేళ contract.solలో బహుళ కాంట్రాక్టులు ఉంటే, మీరు లక్ష్యాన్ని ఇలా పేర్కొనవచ్చు:

```bash
echidna-test contract.sol --contract MyContract
```

### సారాంశం: ఒక ప్రాపర్టీని పరీక్షించడం {#summary-testing-a-property}

కిందిది మన ఉదాహరణపై ఎకిడ్నా రన్‌ను సంగ్రహిస్తుంది:

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

`backdoor`ను కాల్ చేసినప్పుడు ప్రాపర్టీ ఉల్లంఘించబడిందని ఎకిడ్నా కనుగొంది.

## ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#filtering-functions-to-call-during-a-fuzzing-campaign}

ఫజ్ చేయవలసిన ఫంక్షన్‌లను ఎలా ఫిల్టర్ చేయాలో మనం చూద్దాం.
లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్:

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

ఈ చిన్న ఉదాహరణ ఒక స్టేట్ వేరియబుల్‌ను మార్చడానికి లావాదేవీల యొక్క ఒక నిర్దిష్ట క్రమాన్ని కనుగొనమని ఎకిడ్నాని బలవంతం చేస్తుంది.
ఇది ఫజర్ కోసం కష్టం (సింబాలిక్ ఎగ్జిక్యూషన్ సాధనం [Manticore](https://github.com/trailofbits/manticore) ను ఉపయోగించమని సిఫార్సు చేయబడింది).
దీనిని ధృవీకరించడానికి మనం ఎకిడ్నాని రన్ చేయవచ్చు:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#filtering-functions}

రెండు రీసెట్ ఫంక్షన్‌లు (`reset1` మరియు `reset2`) అన్ని స్టేట్ వేరియబుల్స్‌ను `false`కి సెట్ చేస్తాయి కాబట్టి, ఈ కాంట్రాక్టును పరీక్షించడానికి సరైన క్రమాన్ని కనుగొనడంలో ఎకిడ్నాకు ఇబ్బంది ఉంది.
అయితే, రీసెట్ ఫంక్షన్‌ను బ్లాక్‌లిస్ట్ చేయడానికి లేదా `f`, `g`, `h` మరియు `i` ఫంక్షన్‌లను మాత్రమే వైట్‌లిస్ట్ చేయడానికి మనం ఒక ప్రత్యేక ఎకిడ్నా ఫీచర్‌ను ఉపయోగించవచ్చు.

ఫంక్షన్‌లను బ్లాక్‌లిస్ట్ చేయడానికి, మనం ఈ కాన్ఫిగరేషన్ ఫైల్‌ను ఉపయోగించవచ్చు:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

ఫంక్షన్‌లను ఫిల్టర్ చేయడానికి మరొక విధానం వైట్‌లిస్ట్ చేయబడిన ఫంక్షన్‌లను జాబితా చేయడం. అది చేయడానికి, మనం ఈ కాన్ఫిగరేషన్ ఫైల్‌ను ఉపయోగించవచ్చు:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` డిఫాల్ట్‌గా `true`.
- ఫిల్టరింగ్ పేరుతో మాత్రమే నిర్వహించబడుతుంది (పరామితులు లేకుండా). మీకు `f()` మరియు `f(uint256)` ఉంటే, `"f"` ఫిల్టర్ రెండు ఫంక్షన్‌లకు సరిపోతుంది.

### ఎకిడ్నాని రన్ చేయండి {#run-echidna-1}

కాన్ఫిగరేషన్ ఫైల్ `blacklist.yaml`తో ఎకిడ్నాని రన్ చేయడానికి:

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

ప్రాపర్టీని తప్పుగా నిరూపించడానికి లావాదేవీల క్రమాన్ని ఎకిడ్నా దాదాపు వెంటనే కనుగొంటుంది.

### సారాంశం: ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#summary-filtering-functions}

ఎకిడ్నా ఒక ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను బ్లాక్‌లిస్ట్ లేదా వైట్‌లిస్ట్ చేయగలదు:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

`filterBlacklist` బూలియన్ విలువ ప్రకారం, ఎకిడ్నా `f1`, `f2` మరియు `f3`లను బ్లాక్‌లిస్ట్ చేయడం లేదా కేవలం వీటిని కాల్ చేయడం ద్వారా ఫజ్జింగ్ ప్రచారాన్ని ప్రారంభిస్తుంది.

## ఎకిడ్నాతో Solidity యొక్క assert ను ఎలా పరీక్షించాలి {#how-to-test-soliditys-assert-with-echidna}

ఈ చిన్న ట్యుటోరియల్‌లో, కాంట్రాక్టులలోని అసెర్షన్ చెకింగ్‌ను పరీక్షించడానికి ఎకిడ్నాని ఎలా ఉపయోగించాలో మేము చూపబోతున్నాము. మన దగ్గర ఇలాంటి కాంట్రాక్ట్ ఉందని అనుకుందాం:

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

### ఒక అసర్షన్‌ను రాయండి {#write-an-assertion}

దాని వ్యత్యాసాన్ని తిరిగి ఇచ్చిన తర్వాత `tmp` అనేది `counter` కంటే తక్కువ లేదా సమానంగా ఉందని మనం నిర్ధారించుకోవాలి. మనం ఒక ఎకిడ్నా ప్రాపర్టీని వ్రాయవచ్చు, కానీ మనం `tmp` విలువను ఎక్కడో నిల్వ చేయవలసి ఉంటుంది. దానికి బదులుగా, మనం ఇలాంటి ఒక అసర్షన్‌ను ఉపయోగించవచ్చు:

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

### ఎకిడ్నాని రన్ చేయండి {#run-echidna-2}

అసర్షన్ వైఫల్యం పరీక్షను ప్రారంభించడానికి, ఒక [Echidna కాన్ఫిగరేషన్ ఫైల్](https://github.com/crytic/echidna/wiki/Config) `config.yaml`ను సృష్టించండి:

```yaml
checkAsserts: true
```

మనం ఈ కాంట్రాక్టును ఎకిడ్నాలో రన్ చేసినప్పుడు, మనం ఆశించిన ఫలితాలను పొందుతాము:

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

మీరు చూడగలిగినట్లుగా, ఎకిడ్నా `inc` ఫంక్షన్‌లో కొన్ని అసర్షన్ వైఫల్యాలను నివేదిస్తుంది. ప్రతి ఫంక్షన్‌కు ఒకటి కంటే ఎక్కువ అసర్షన్‌లను జోడించడం సాధ్యమే, కానీ ఏ అసర్షన్ విఫలమైందో ఎకిడ్నా చెప్పలేదు.

### అసర్షన్‌లను ఎప్పుడు మరియు ఎలా ఉపయోగించాలి {#when-and-how-use-assertions}

తనిఖీ చేయవలసిన షరతులు నేరుగా కొన్ని ఆపరేషన్ `f` యొక్క సరైన వాడకంతో సంబంధం కలిగి ఉంటే, అసర్షన్‌లను స్పష్టమైన లక్షణాలకు ప్రత్యామ్నాయంగా ఉపయోగించవచ్చు. కొన్ని కోడ్ తర్వాత అసర్షన్‌లను జోడించడం వలన అది అమలు చేయబడిన వెంటనే తనిఖీ జరుగుతుందని నిర్ధారిస్తుంది:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

దీనికి విరుద్ధంగా, స్పష్టమైన ఎకిడ్నా ప్రాపర్టీని ఉపయోగించడం యాదృచ్ఛికంగా లావాదేవీలను అమలు చేస్తుంది మరియు అది ఎప్పుడు తనిఖీ చేయబడుతుందో కచ్చితంగా అమలు చేయడానికి సులభమైన మార్గం లేదు. ఈ తాత్కాలిక పరిష్కారాన్ని చేయడం ఇంకా సాధ్యమే:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

అయితే, కొన్ని సమస్యలు ఉన్నాయి:

- ఒకవేళ `f`ను `internal` లేదా `external`గా ప్రకటించినట్లయితే ఇది విఫలమవుతుంది.
- `f`ను కాల్ చేయడానికి ఏ ఆర్గ్యుమెంట్‌లను ఉపయోగించాలో అస్పష్టంగా ఉంది.
- ఒకవేళ `f` తిరిగి వస్తే, ప్రాపర్టీ విఫలమవుతుంది.

సాధారణంగా, అసర్షన్‌లను ఎలా ఉపయోగించాలనే దానిపై [జాన్ రెగెర్ యొక్క సిఫార్సు](https://blog.regehr.org/archives/1091) ను అనుసరించమని మేము సిఫార్సు చేస్తున్నాము:

- అసర్షన్ చెకింగ్ సమయంలో ఏ సైడ్ ఎఫెక్ట్‌ను బలవంతం చేయవద్దు. ఉదాహరణకు: `assert(ChangeStateAndReturn() == 1)`
- స్పష్టమైన వాక్యాలను అసర్ట్ చేయవద్దు. ఉదాహరణకు `assert(var >= 0)` ఇక్కడ `var` ను `uint` గా ప్రకటించారు.

చివరగా, దయచేసి `assert`కు బదులుగా `require`ను **ఉపయోగించవద్దు**, ఎందుకంటే ఎకిడ్నా దానిని గుర్తించలేదు (కానీ కాంట్రాక్ట్ ఏమైనప్పటికీ రివర్ట్ అవుతుంది).

### సారాంశం: అసర్షన్ తనిఖీ {#summary-assertion-checking}

కిందిది మన ఉదాహరణపై ఎకిడ్నా రన్‌ను సంగ్రహిస్తుంది:

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

ఈ ఫంక్షన్‌ను పెద్ద ఆర్గ్యుమెంట్‌లతో చాలాసార్లు కాల్ చేస్తే `inc` లోని అసర్షన్ విఫలమవుతుందని ఎకిడ్నా కనుగొంది.

## ఎకిడ్నా కార్పస్‌ను సేకరించడం మరియు సవరించడం {#collecting-and-modifying-an-echidna-corpus}

ఎకిడ్నాతో లావాదేవీల కార్పస్‌ను ఎలా సేకరించాలో మరియు ఉపయోగించాలో మనం చూద్దాం. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

ఈ చిన్న ఉదాహరణ ఒక స్టేట్ వేరియబుల్‌ను మార్చడానికి కొన్ని విలువలను కనుగొనమని ఎకిడ్నాని బలవంతం చేస్తుంది. ఇది ఫజర్ కోసం కష్టం
(సింబాలిక్ ఎగ్జిక్యూషన్ సాధనం [Manticore](https://github.com/trailofbits/manticore) ను ఉపయోగించమని సిఫార్సు చేయబడింది).
దీనిని ధృవీకరించడానికి మనం ఎకిడ్నాని రన్ చేయవచ్చు:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

అయితే, ఈ ఫజ్జింగ్ క్యాంపెయిన్‌ను అమలు చేస్తున్నప్పుడు కార్పస్ సేకరించడానికి మనం ఇంకా ఎకిడ్నాని ఉపయోగించవచ్చు.

### ఒక కార్పస్‌ను సేకరించడం {#collecting-a-corpus}

కార్పస్ సేకరణను ప్రారంభించడానికి, ఒక కార్పస్ డైరెక్టరీని సృష్టించండి:

```bash
mkdir corpus-magic
```

మరియు ఒక [Echidna కాన్ఫిగరేషన్ ఫైల్](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

ఇప్పుడు మనం మన సాధనాన్ని రన్ చేయవచ్చు మరియు సేకరించిన కార్పస్‌ను తనిఖీ చేయవచ్చు:

```bash
echidna-test magic.sol --config config.yaml
```

ఎకిడ్నా ఇప్పటికీ సరైన మేజిక్ విలువలను కనుగొనలేదు, కానీ అది సేకరించిన కార్పస్‌ను మనం చూడవచ్చు.
ఉదాహరణకు, ఈ ఫైళ్ళలో ఒకటి:

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

స్పష్టంగా, ఈ ఇన్‌పుట్ మన ప్రాపర్టీలో వైఫల్యాన్ని ప్రేరేపించదు. అయితే, తదుపరి దశలో, దాని కోసం దాన్ని ఎలా సవరించాలో మనం చూద్దాం.

### ఒక కార్పస్‌ను సీడింగ్ చేయడం {#seeding-a-corpus}

`magic` ఫంక్షన్‌తో వ్యవహరించడానికి ఎకిడ్నాకు కొంత సహాయం అవసరం. దాని కోసం తగిన పరామితులను ఉపయోగించడానికి ఇన్‌పుట్‌ను కాపీ చేసి, సవరించబోతున్నాము:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

మనం `magic(42,129,333,0)`ను కాల్ చేయడానికి `new.txt`ని సవరిస్తాము. ఇప్పుడు, మనం ఎకిడ్నాని మళ్లీ రన్ చేయవచ్చు:

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

ఈసారి, ప్రాపర్టీ వెంటనే ఉల్లంఘించబడిందని అది కనుగొంది.

## అధిక గ్యాస్ వినియోగంతో లావాదేవీలను కనుగొనడం {#finding-transactions-with-high-gas-consumption}

ఎకిడ్నాతో అధిక గ్యాస్ వినియోగంతో లావాదేవీలను ఎలా కనుగొనాలో మనం చూద్దాం. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్:

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

ఇక్కడ `expensive`కు పెద్ద గ్యాస్ వినియోగం ఉండవచ్చు.

ప్రస్తుతం, ఎకిడ్నాకు ఎల్లప్పుడూ పరీక్షించడానికి ఒక ప్రాపర్టీ అవసరం: ఇక్కడ `echidna_test` ఎల్లప్పుడూ `true`ను తిరిగి ఇస్తుంది.
దీనిని ధృవీకరించడానికి మనం ఎకిడ్నాని రన్ చేయవచ్చు:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### గ్యాస్ వినియోగాన్ని కొలవడం {#measuring-gas-consumption}

ఎకిడ్నాతో గ్యాస్ వినియోగాన్ని ప్రారంభించడానికి, ఒక కాన్ఫిగరేషన్ ఫైల్ `config.yaml`ను సృష్టించండి:

```yaml
estimateGas: true
```

ఈ ఉదాహరణలో, ఫలితాలను సులభంగా అర్థం చేసుకోవడానికి లావాదేవీల క్రమం యొక్క పరిమాణాన్ని కూడా తగ్గిస్తాము:

```yaml
seqLen: 2
estimateGas: true
```

### ఎకిడ్నాని రన్ చేయండి {#run-echidna-3}

మనం కాన్ఫిగరేషన్ ఫైల్‌ను సృష్టించిన తర్వాత, మనం ఎకిడ్నాని ఇలా రన్ చేయవచ్చు:

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

- చూపిన గ్యాస్ అనేది [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) ద్వారా అందించబడిన అంచనా.

### గ్యాస్ తగ్గించే కాల్స్‌ను ఫిల్టర్ చేయడం {#filtering-out-gas-reducing-calls}

పైన ఉన్న **ఫజ్జింగ్ ప్రచారం సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను ఫిల్టర్ చేయడం** అనే ట్యుటోరియల్ మీ పరీక్షల నుండి కొన్ని ఫంక్షన్‌లను ఎలా తొలగించాలో చూపిస్తుంది.  
ఖచ్చితమైన గ్యాస్ అంచనా పొందడానికి ఇది చాలా ముఖ్యం.
కింది ఉదాహరణను పరిగణించండి:

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

ఎకిడ్నా అన్ని ఫంక్షన్‌లను కాల్ చేయగలిగితే, అది అధిక గ్యాస్ ఖర్చుతో కూడిన లావాదేవీలను సులభంగా కనుగొనదు:

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

ఎందుకంటే ఖర్చు `addrs` పరిమాణంపై ఆధారపడి ఉంటుంది మరియు యాదృచ్ఛిక కాల్స్ అర్రేని దాదాపు ఖాళీగా వదిలివేస్తాయి.
`pop` మరియు `clear` లను బ్లాక్‌లిస్ట్ చేయడం, అయితే, మనకు చాలా మెరుగైన ఫలితాలను ఇస్తుంది:

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

### సారాంశం: అధిక గ్యాస్ వినియోగంతో లావాదేవీలను కనుగొనడం {#summary-finding-transactions-with-high-gas-consumption}

`estimateGas` కాన్ఫిగరేషన్ ఎంపికను ఉపయోగించి ఎకిడ్నా అధిక గ్యాస్ వినియోగంతో లావాదేవీలను కనుగొనగలదు:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ఫజ్జింగ్ క్యాంపెయిన్ ముగిసిన తర్వాత, ప్రతి ఫంక్షన్‌కు గరిష్ట గ్యాస్ వినియోగంతో కూడిన క్రమాన్ని ఎకిడ్నా నివేదిస్తుంది.
