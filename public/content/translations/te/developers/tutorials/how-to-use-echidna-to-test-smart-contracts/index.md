---
title: స్మార్ట్ కాంట్రాక్ట్‌లను పరీక్షించడానికి ఎకిడ్నాను ఎలా ఉపయోగించాలి
description: స్మార్ట్ కాంట్రాక్ట్‌లను స్వయంచాలకంగా పరీక్షించడానికి ఎకిడ్నాను ఎలా ఉపయోగించాలి
author: "ట్రైల్ఆఫ్‌బిట్స్"
lang: te
tags: ["Solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు", "భద్రత", "పరీక్షించడం", "ఫజ్జింగ్"]
skill: advanced
breadcrumb: ఎకిడ్నా
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## ఇన్‌స్టాలేషన్ {#installation}

ఎకిడ్నాను Docker ద్వారా లేదా ముందుగా కంపైల్ చేసిన బైనరీని ఉపయోగించి ఇన్‌స్టాల్ చేయవచ్చు.

### Docker ద్వారా ఎకిడ్నా {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న Dockerలో eth-security-toolboxని రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు మరియు Docker నుండి ఫైల్‌లపై టూల్స్‌ను రన్ చేయవచ్చు_

Docker లోపల, ఇలా రన్ చేయండి:

```bash
solc-select 0.5.11
cd /home/training
```

### బైనరీ {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్ పరిచయం {#introduction-to-property-based-fuzzing}

ఎకిడ్నా అనేది ప్రాపర్టీ-ఆధారిత ఫజ్జర్, దీనిని మేము మా మునుపటి బ్లాగ్‌పోస్ట్‌లలో వివరించాము ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### ఫజ్జింగ్ {#fuzzing}

భద్రతా కమ్యూనిటీలో [ఫజ్జింగ్](https://wikipedia.org/wiki/Fuzzing) అనేది బాగా తెలిసిన సాంకేతికత. ప్రోగ్రామ్‌లో బగ్‌లను కనుగొనడానికి ఎక్కువ లేదా తక్కువ యాదృచ్ఛికంగా ఉండే ఇన్‌పుట్‌లను రూపొందించడం ఇందులో ఉంటుంది. సాంప్రదాయ సాఫ్ట్‌వేర్ కోసం ఫజ్జర్‌లు ([AFL](http://lcamtuf.coredump.cx/afl/) లేదా [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) వంటివి) బగ్‌లను కనుగొనడానికి సమర్థవంతమైన సాధనాలుగా ప్రసిద్ధి చెందాయి.

పూర్తిగా యాదృచ్ఛిక ఇన్‌పుట్‌ల ఉత్పత్తికి మించి, మంచి ఇన్‌పుట్‌లను రూపొందించడానికి అనేక పద్ధతులు మరియు వ్యూహాలు ఉన్నాయి, వాటిలో ఇవి ఉన్నాయి:

- ప్రతి ఎగ్జిక్యూషన్ నుండి ఫీడ్‌బ్యాక్ పొందడం మరియు దానిని ఉపయోగించి ఉత్పత్తికి మార్గనిర్దేశం చేయడం. ఉదాహరణకు, కొత్తగా రూపొందించబడిన ఇన్‌పుట్ కొత్త మార్గం యొక్క అన్వేషణకు దారితీస్తే, దానికి దగ్గరగా కొత్త ఇన్‌పుట్‌లను రూపొందించడం సమంజసంగా ఉంటుంది.
- నిర్మాణాత్మక పరిమితిని గౌరవిస్తూ ఇన్‌పుట్‌ను రూపొందించడం. ఉదాహరణకు, మీ ఇన్‌పుట్ చెక్‌సమ్‌తో కూడిన హెడర్‌ను కలిగి ఉంటే, చెక్‌సమ్‌ను ధృవీకరించే ఇన్‌పుట్‌ను ఫజ్జర్ రూపొందించేలా చేయడం సమంజసంగా ఉంటుంది.
- కొత్త ఇన్‌పుట్‌లను రూపొందించడానికి తెలిసిన ఇన్‌పుట్‌లను ఉపయోగించడం: మీకు చెల్లుబాటు అయ్యే ఇన్‌పుట్ యొక్క పెద్ద డేటాసెట్‌కు యాక్సెస్ ఉంటే, మీ ఫజ్జర్ దాని ఉత్పత్తిని మొదటి నుండి ప్రారంభించే బదులు వాటి నుండి కొత్త ఇన్‌పుట్‌లను రూపొందించగలదు. వీటిని సాధారణంగా _సీడ్స్ (seeds)_ అని పిలుస్తారు.

### ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్ {#property-based-fuzzing}

ఎకిడ్నా ఒక నిర్దిష్ట ఫజ్జర్ కుటుంబానికి చెందినది: [QuickCheck](https://wikipedia.org/wiki/QuickCheck) ద్వారా ఎక్కువగా ప్రేరణ పొందిన ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్. క్రాష్‌లను కనుగొనడానికి ప్రయత్నించే క్లాసిక్ ఫజ్జర్‌కు భిన్నంగా, ఎకిడ్నా వినియోగదారు నిర్వచించిన ఇన్‌వేరియంట్‌లను (invariants) విచ్ఛిన్నం చేయడానికి ప్రయత్నిస్తుంది.

స్మార్ట్ కాంట్రాక్ట్‌లలో, ఇన్‌వేరియంట్‌లు అనేవి Solidity ఫంక్షన్‌లు, ఇవి కాంట్రాక్ట్ చేరుకోగల ఏదైనా తప్పు లేదా చెల్లని స్థితిని సూచించగలవు, వీటిలో ఇవి ఉన్నాయి:

- సరికాని యాక్సెస్ నియంత్రణ: దాడి చేసే వ్యక్తి కాంట్రాక్ట్ యజమాని అయ్యాడు.
- సరికాని స్థితి యంత్రం: కాంట్రాక్ట్ పాజ్ చేయబడినప్పుడు టోకెన్‌లను బదిలీ చేయవచ్చు.
- సరికాని అంకగణితం: వినియోగదారు తన బ్యాలెన్స్‌ను అండర్‌ఫ్లో చేయవచ్చు మరియు అపరిమిత ఉచిత టోకెన్‌లను పొందవచ్చు.

### ఎకిడ్నాతో ప్రాపర్టీని పరీక్షించడం {#testing-a-property-with-echidna}

ఎకిడ్నాతో స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా పరీక్షించాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

ఈ టోకెన్ కింది లక్షణాలను కలిగి ఉండాలని మనం ఊహిస్తాము:

- ఎవరైనా గరిష్టంగా 1000 టోకెన్‌లను కలిగి ఉండవచ్చు
- టోకెన్‌ను బదిలీ చేయలేము (ఇది ERC-20 టోకెన్ కాదు)

### ప్రాపర్టీని రాయడం {#write-a-property}

ఎకిడ్నా ప్రాపర్టీలు Solidity ఫంక్షన్‌లు. ఒక ప్రాపర్టీ తప్పనిసరిగా:

- ఎలాంటి ఆర్గ్యుమెంట్‌ను కలిగి ఉండకూడదు
- ఇది విజయవంతమైతే `true`ని తిరిగి ఇవ్వాలి
- దాని పేరు `echidna`తో ప్రారంభం కావాలి

ఎకిడ్నా ఇలా చేస్తుంది:

- ప్రాపర్టీని పరీక్షించడానికి ఏకపక్ష లావాదేవీలను స్వయంచాలకంగా రూపొందిస్తుంది.
- ప్రాపర్టీ `false`ని తిరిగి ఇవ్వడానికి లేదా ఎర్రర్‌ను త్రో చేయడానికి దారితీసే ఏవైనా లావాదేవీలను నివేదిస్తుంది.
- ప్రాపర్టీని కాల్ చేస్తున్నప్పుడు సైడ్-ఎఫెక్ట్‌ను విస్మరిస్తుంది (అంటే, ప్రాపర్టీ స్థితి వేరియబుల్‌ను మార్చినట్లయితే, పరీక్ష తర్వాత అది విస్మరించబడుతుంది)

కాలర్ వద్ద 1000 కంటే ఎక్కువ టోకెన్‌లు లేవని కింది ప్రాపర్టీ తనిఖీ చేస్తుంది:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

మీ కాంట్రాక్ట్‌ను మీ ప్రాపర్టీల నుండి వేరు చేయడానికి ఇన్‌హెరిటెన్స్‌ను ఉపయోగించండి:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) ప్రాపర్టీని అమలు చేస్తుంది మరియు టోకెన్ నుండి ఇన్‌హెరిట్ చేస్తుంది.

### కాంట్రాక్ట్‌ను ప్రారంభించడం {#initiate-a-contract}

ఎకిడ్నాకు ఆర్గ్యుమెంట్ లేని [కన్స్ట్రక్టర్](/developers/docs/smart-contracts/anatomy/#constructor-functions) అవసరం. మీ కాంట్రాక్ట్‌కు నిర్దిష్ట ఇనిషియలైజేషన్ అవసరమైతే, మీరు దానిని కన్స్ట్రక్టర్‌లో చేయాలి.

ఎకిడ్నాలో కొన్ని నిర్దిష్ట చిరునామాలు ఉన్నాయి:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` ఇది కన్స్ట్రక్టర్‌ను కాల్ చేస్తుంది.
- `0x10000`, `0x20000`, మరియు `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` ఇవి యాదృచ్ఛికంగా ఇతర ఫంక్షన్‌లను కాల్ చేస్తాయి.

మా ప్రస్తుత ఉదాహరణలో మాకు ఎటువంటి నిర్దిష్ట ఇనిషియలైజేషన్ అవసరం లేదు, ఫలితంగా మా కన్స్ట్రక్టర్ ఖాళీగా ఉంది.

### ఎకిడ్నాను రన్ చేయడం {#run-echidna}

ఎకిడ్నా దీనితో ప్రారంభించబడుతుంది:

```bash
echidna-test contract.sol
```

contract.sol బహుళ కాంట్రాక్ట్‌లను కలిగి ఉంటే, మీరు లక్ష్యాన్ని పేర్కొనవచ్చు:

```bash
echidna-test contract.sol --contract MyContract
```

### సారాంశం: ప్రాపర్టీని పరీక్షించడం {#summary-testing-a-property}

కిందివి మా ఉదాహరణలో ఎకిడ్నా రన్‌ను సంగ్రహిస్తాయి:

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

`backdoor` కాల్ చేయబడితే ప్రాపర్టీ ఉల్లంఘించబడిందని ఎకిడ్నా కనుగొంది.

## ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#filtering-functions-to-call-during-a-fuzzing-campaign}

ఫజ్ చేయాల్సిన ఫంక్షన్‌లను ఎలా ఫిల్టర్ చేయాలో మనం చూస్తాము.
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

ఈ చిన్న ఉదాహరణ స్థితి వేరియబుల్‌ను మార్చడానికి నిర్దిష్ట లావాదేవీల క్రమాన్ని కనుగొనమని ఎకిడ్నాను బలవంతం చేస్తుంది.
ఇది ఫజ్జర్‌కు కష్టం ([మాంటికోర్](https://github.com/trailofbits/manticore) వంటి సింబాలిక్ ఎగ్జిక్యూషన్ టూల్‌ను ఉపయోగించమని సిఫార్సు చేయబడింది).
దీన్ని ధృవీకరించడానికి మనం ఎకిడ్నాను రన్ చేయవచ్చు:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#filtering-functions}

రెండు రీసెట్ ఫంక్షన్‌లు (`reset1` మరియు `reset2`) అన్ని స్థితి వేరియబుల్స్‌ను `false`కి సెట్ చేస్తాయి కాబట్టి ఈ కాంట్రాక్ట్‌ను పరీక్షించడానికి సరైన క్రమాన్ని కనుగొనడంలో ఎకిడ్నా ఇబ్బంది పడుతుంది.
అయినప్పటికీ, రీసెట్ ఫంక్షన్‌ను బ్లాక్‌లిస్ట్ చేయడానికి లేదా `f`, `g`,
`h` మరియు `i` ఫంక్షన్‌లను మాత్రమే వైట్‌లిస్ట్ చేయడానికి మనం ప్రత్యేక ఎకిడ్నా ఫీచర్‌ను ఉపయోగించవచ్చు.

ఫంక్షన్‌లను బ్లాక్‌లిస్ట్ చేయడానికి, మనం ఈ కాన్ఫిగరేషన్ ఫైల్‌ను ఉపయోగించవచ్చు:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

ఫంక్షన్‌లను ఫిల్టర్ చేయడానికి మరొక విధానం వైట్‌లిస్ట్ చేయబడిన ఫంక్షన్‌లను జాబితా చేయడం. అలా చేయడానికి, మనం ఈ కాన్ఫిగరేషన్ ఫైల్‌ను ఉపయోగించవచ్చు:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` అప్రమేయంగా `true`గా ఉంటుంది.
- ఫిల్టరింగ్ పేరు ద్వారా మాత్రమే చేయబడుతుంది (పారామితులు లేకుండా). మీకు `f()` మరియు `f(uint256)` ఉంటే, ఫిల్టర్ `"f"` రెండు ఫంక్షన్‌లకు సరిపోలుతుంది.

### ఎకిడ్నాను రన్ చేయడం {#run-echidna-1}

కాన్ఫిగరేషన్ ఫైల్ `blacklist.yaml`తో ఎకిడ్నాను రన్ చేయడానికి:

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

ప్రాపర్టీని తప్పుగా నిరూపించడానికి ఎకిడ్నా దాదాపు వెంటనే లావాదేవీల క్రమాన్ని కనుగొంటుంది.

### సారాంశం: ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#summary-filtering-functions}

దీనిని ఉపయోగించి ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఎకిడ్నా ఫంక్షన్‌లను బ్లాక్‌లిస్ట్ లేదా వైట్‌లిస్ట్ చేయవచ్చు:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

`filterBlacklist` బూలియన్ విలువ ప్రకారం, ఎకిడ్నా `f1`, `f2` మరియు `f3`లను బ్లాక్‌లిస్ట్ చేయడం ద్వారా లేదా వీటిని మాత్రమే కాల్ చేయడం ద్వారా ఫజ్జింగ్ క్యాంపెయిన్‌ను ప్రారంభిస్తుంది.

## ఎకిడ్నాతో Solidity యొక్క నిర్ధారించు (assert)ని ఎలా పరీక్షించాలి {#how-to-test-soliditys-assert-with-echidna}

ఈ చిన్న ట్యుటోరియల్‌లో, కాంట్రాక్ట్‌లలో అస్సెర్షన్ (assertion) తనిఖీని పరీక్షించడానికి ఎకిడ్నాను ఎలా ఉపయోగించాలో మేము చూపబోతున్నాము. మనకు ఇలాంటి కాంట్రాక్ట్ ఉందని అనుకుందాం:

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

### అస్సెర్షన్‌ను రాయడం {#write-an-assertion}

దాని వ్యత్యాసాన్ని తిరిగి ఇచ్చిన తర్వాత `tmp` అనేది `counter` కంటే తక్కువ లేదా సమానంగా ఉందని మనం నిర్ధారించుకోవాలి. మనం ఎకిడ్నా ప్రాపర్టీని రాయవచ్చు, కానీ మనం `tmp` విలువను ఎక్కడో నిల్వ చేయాలి. బదులుగా, మనం ఇలాంటి అస్సెర్షన్‌ను ఉపయోగించవచ్చు:

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

### ఎకిడ్నాను రన్ చేయడం {#run-echidna-2}

అస్సెర్షన్ వైఫల్య పరీక్షను ప్రారంభించడానికి, [ఎకిడ్నా కాన్ఫిగరేషన్ ఫైల్](https://github.com/crytic/echidna/wiki/Config) `config.yaml`ని సృష్టించండి:

```yaml
checkAsserts: true
```

మనం ఈ కాంట్రాక్ట్‌ను ఎకిడ్నాలో రన్ చేసినప్పుడు, ఆశించిన ఫలితాలను పొందుతాము:

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

మీరు చూడగలిగినట్లుగా, ఎకిడ్నా `inc` ఫంక్షన్‌లో కొంత అస్సెర్షన్ వైఫల్యాన్ని నివేదిస్తుంది. ఫంక్షన్‌కు ఒకటి కంటే ఎక్కువ అస్సెర్షన్‌లను జోడించడం సాధ్యమే, కానీ ఏ అస్సెర్షన్ విఫలమైందో ఎకిడ్నా చెప్పలేదు.

### అస్సెర్షన్‌లను ఎప్పుడు మరియు ఎలా ఉపయోగించాలి {#when-and-how-use-assertions}

అస్సెర్షన్‌లను స్పష్టమైన ప్రాపర్టీలకు ప్రత్యామ్నాయాలుగా ఉపయోగించవచ్చు, ప్రత్యేకించి తనిఖీ చేయవలసిన షరతులు నేరుగా ఏదైనా ఆపరేషన్ `f` యొక్క సరైన ఉపయోగంతో సంబంధం కలిగి ఉంటే. కొంత కోడ్ తర్వాత అస్సెర్షన్‌లను జోడించడం వలన అది అమలు చేయబడిన వెంటనే తనిఖీ జరుగుతుందని నిర్ధారిస్తుంది:

```solidity
function f(..) public {
    // కొంత సంక్లిష్టమైన కోడ్
    ...
    assert (condition);
    ...
}

```

దీనికి విరుద్ధంగా, స్పష్టమైన ఎకిడ్నా ప్రాపర్టీని ఉపయోగించడం వలన లావాదేవీలు యాదృచ్ఛికంగా అమలు చేయబడతాయి మరియు అది ఎప్పుడు తనిఖీ చేయబడుతుందో ఖచ్చితంగా అమలు చేయడానికి సులభమైన మార్గం లేదు. ఈ ప్రత్యామ్నాయాన్ని చేయడం ఇప్పటికీ సాధ్యమే:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

అయితే, కొన్ని సమస్యలు ఉన్నాయి:

- `f` అనేది `internal` లేదా `external`గా ప్రకటించబడితే అది విఫలమవుతుంది.
- `f`ని కాల్ చేయడానికి ఏ ఆర్గ్యుమెంట్‌లను ఉపయోగించాలో అస్పష్టంగా ఉంది.
- `f` రివర్ట్ అయితే, ప్రాపర్టీ విఫలమవుతుంది.

సాధారణంగా, అస్సెర్షన్‌లను ఎలా ఉపయోగించాలో [జాన్ రెగెర్ సిఫార్సును](https://blog.regehr.org/archives/1091) అనుసరించాలని మేము సిఫార్సు చేస్తున్నాము:

- అస్సెర్షన్ తనిఖీ సమయంలో ఎలాంటి సైడ్ ఎఫెక్ట్‌ను బలవంతం చేయవద్దు. ఉదాహరణకు: `assert(ChangeStateAndReturn() == 1)`
- స్పష్టమైన స్టేట్‌మెంట్‌లను నిర్ధారించవద్దు. ఉదాహరణకు `assert(var >= 0)` ఇక్కడ `var` అనేది `uint`గా ప్రకటించబడింది.

చివరగా, దయచేసి `assert`కి బదులుగా `require`ని **ఉపయోగించవద్దు**, ఎందుకంటే ఎకిడ్నా దానిని గుర్తించలేకపోతుంది (కానీ కాంట్రాక్ట్ ఏమైనప్పటికీ రివర్ట్ అవుతుంది).

### సారాంశం: అస్సెర్షన్ తనిఖీ {#summary-assertion-checking}

కిందివి మా ఉదాహరణలో ఎకిడ్నా రన్‌ను సంగ్రహిస్తాయి:

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

ఈ ఫంక్షన్‌ను పెద్ద ఆర్గ్యుమెంట్‌లతో బహుళ సార్లు కాల్ చేస్తే `inc`లోని అస్సెర్షన్ విఫలమవుతుందని ఎకిడ్నా కనుగొంది.

## ఎకిడ్నా కార్పస్‌ను సేకరించడం మరియు సవరించడం {#collecting-and-modifying-an-echidna-corpus}

ఎకిడ్నాతో లావాదేవీల కార్పస్‌ను ఎలా సేకరించాలో మరియు ఉపయోగించాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

ఈ చిన్న ఉదాహరణ స్థితి వేరియబుల్‌ను మార్చడానికి నిర్దిష్ట విలువలను కనుగొనమని ఎకిడ్నాను బలవంతం చేస్తుంది. ఇది ఫజ్జర్‌కు కష్టం
([మాంటికోర్](https://github.com/trailofbits/manticore) వంటి సింబాలిక్ ఎగ్జిక్యూషన్ టూల్‌ను ఉపయోగించమని సిఫార్సు చేయబడింది).
దీన్ని ధృవీకరించడానికి మనం ఎకిడ్నాను రన్ చేయవచ్చు:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

అయినప్పటికీ, ఈ ఫజ్జింగ్ క్యాంపెయిన్‌ను రన్ చేస్తున్నప్పుడు కార్పస్‌ను సేకరించడానికి మనం ఇప్పటికీ ఎకిడ్నాను ఉపయోగించవచ్చు.

### కార్పస్‌ను సేకరించడం {#collecting-a-corpus}

కార్పస్ సేకరణను ప్రారంభించడానికి, కార్పస్ డైరెక్టరీని సృష్టించండి:

```bash
mkdir corpus-magic
```

మరియు [ఎకిడ్నా కాన్ఫిగరేషన్ ఫైల్](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

ఇప్పుడు మనం మా టూల్‌ను రన్ చేయవచ్చు మరియు సేకరించిన కార్పస్‌ను తనిఖీ చేయవచ్చు:

```bash
echidna-test magic.sol --config config.yaml
```

ఎకిడ్నా ఇప్పటికీ సరైన మ్యాజిక్ విలువలను కనుగొనలేకపోయింది, కానీ అది సేకరించిన కార్పస్‌ను మనం పరిశీలించవచ్చు.
ఉదాహరణకు, ఈ ఫైల్‌లలో ఒకటి:

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

స్పష్టంగా, ఈ ఇన్‌పుట్ మా ప్రాపర్టీలో వైఫల్యాన్ని ప్రేరేపించదు. అయితే, తదుపరి దశలో, దాని కోసం దీన్ని ఎలా సవరించాలో మనం చూస్తాము.

### కార్పస్‌ను సీడింగ్ చేయడం {#seeding-a-corpus}

`magic` ఫంక్షన్‌తో వ్యవహరించడానికి ఎకిడ్నాకు కొంత సహాయం కావాలి. దానికి తగిన పారామితులను ఉపయోగించడానికి మనం ఇన్‌పుట్‌ను కాపీ చేసి సవరించబోతున్నాము:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)`ని కాల్ చేయడానికి మనం `new.txt`ని సవరిస్తాము. ఇప్పుడు, మనం ఎకిడ్నాను మళ్లీ రన్ చేయవచ్చు:

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

ఎకిడ్నాతో అధిక గ్యాస్ వినియోగం ఉన్న లావాదేవీలను ఎలా కనుగొనాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్:

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

ఇక్కడ `expensive` పెద్ద గ్యాస్ వినియోగాన్ని కలిగి ఉండవచ్చు.

ప్రస్తుతం, ఎకిడ్నాకు పరీక్షించడానికి ఎల్లప్పుడూ ఒక ప్రాపర్టీ అవసరం: ఇక్కడ `echidna_test` ఎల్లప్పుడూ `true`ని తిరిగి ఇస్తుంది.
దీన్ని ధృవీకరించడానికి మనం ఎకిడ్నాను రన్ చేయవచ్చు:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### గ్యాస్ వినియోగాన్ని కొలవడం {#measuring-gas-consumption}

ఎకిడ్నాతో గ్యాస్ వినియోగాన్ని ప్రారంభించడానికి, కాన్ఫిగరేషన్ ఫైల్ `config.yaml`ని సృష్టించండి:

```yaml
estimateGas: true
```

ఈ ఉదాహరణలో, ఫలితాలను సులభంగా అర్థం చేసుకోవడానికి మనం లావాదేవీల క్రమం పరిమాణాన్ని కూడా తగ్గిస్తాము:

```yaml
seqLen: 2
estimateGas: true
```

### ఎకిడ్నాను రన్ చేయడం {#run-echidna-3}

మనం కాన్ఫిగరేషన్ ఫైల్‌ను సృష్టించిన తర్వాత, మనం ఎకిడ్నాను ఇలా రన్ చేయవచ్చు:

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

- చూపబడిన గ్యాస్ అనేది [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) అందించిన అంచనా.

### గ్యాస్-తగ్గించే కాల్స్‌ను ఫిల్టర్ చేయడం {#filtering-out-gas-reducing-calls}

పైన ఉన్న **ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను ఫిల్టర్ చేయడం** గురించిన ట్యుటోరియల్ మీ పరీక్ష నుండి కొన్ని ఫంక్షన్‌లను ఎలా తీసివేయాలో చూపుతుంది.  
ఖచ్చితమైన గ్యాస్ అంచనాను పొందడానికి ఇది కీలకం కావచ్చు.
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

ఎందుకంటే ఖర్చు `addrs` పరిమాణంపై ఆధారపడి ఉంటుంది మరియు యాదృచ్ఛిక కాల్‌లు శ్రేణిని దాదాపు ఖాళీగా ఉంచుతాయి.
అయితే, `pop` మరియు `clear`లను బ్లాక్‌లిస్ట్ చేయడం వల్ల మనకు మెరుగైన ఫలితాలు వస్తాయి:

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

ఫజ్జింగ్ క్యాంపెయిన్ ముగిసిన తర్వాత, ఎకిడ్నా ప్రతి ఫంక్షన్ కోసం గరిష్ట గ్యాస్ వినియోగంతో ఒక క్రమాన్ని నివేదిస్తుంది.