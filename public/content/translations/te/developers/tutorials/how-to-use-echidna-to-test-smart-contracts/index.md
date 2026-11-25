---
title: "స్మార్ట్ కాంట్రాక్ట్‌లను పరీక్షించడానికి ఎకిడ్నాను ఎలా ఉపయోగించాలి"
description: "స్మార్ట్ కాంట్రాక్ట్‌లను స్వయంచాలకంగా పరీక్షించడానికి ఎకిడ్నాను ఎలా ఉపయోగించాలి"
author: "ట్రైల్ఆఫ్‌బిట్స్"
lang: te
tags: ["Solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు", "భద్రత", "పరీక్షించడం", "ఫజ్జింగ్"]
skill: advanced
breadcrumb: "ఎకిడ్నా"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## ఇన్‌స్టాలేషన్ {#installation}

ఎకిడ్నాను Docker, Homebrew ద్వారా లేదా ముందుగా కంపైల్ చేసిన బైనరీని ఉపయోగించి ఇన్‌స్టాల్ చేయవచ్చు. ఈ ట్యుటోరియల్‌లోని ఉదాహరణలు ఎకిడ్నా 2.3.3 మరియు solc 0.8.37తో పరీక్షించబడ్డాయి.

### Docker ద్వారా ఎకిడ్నా {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న Dockerలో ఎకిడ్నా ఇమేజ్‌ను రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు మరియు Docker నుండి ఫైల్‌లపై టూల్స్‌ను రన్ చేయవచ్చు. ఈ ఇమేజ్ [స్లిదర్](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) మరియు [solc-select](https://github.com/crytic/solc-select)లతో కూడా వస్తుంది._

Docker లోపల, ఇలా రన్ చేయండి:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### బైనరీ {#binary}

మీ ప్లాట్‌ఫారమ్ కోసం తాజా విడుదలను [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) నుండి డౌన్‌లోడ్ చేయండి. macOS లేదా Linuxలో మీరు `brew install echidna`ని కూడా రన్ చేయవచ్చు, ఇది దానితో పాటు స్లిదర్ మరియు crytic-compileని ఇన్‌స్టాల్ చేస్తుంది.

రిలీజ్ బైనరీని ఉపయోగిస్తున్నప్పుడు, [స్లిదర్](https://github.com/crytic/slither) మరియు [solc-select](https://github.com/crytic/solc-select)ని మీరే ఇన్‌స్టాల్ చేసుకోండి (ఉదాహరణకు Python వర్చువల్ ఎన్విరాన్‌మెంట్‌లో `pip3 install slither-analyzer solc-select`) మరియు కంపైలర్ వెర్షన్‌ను ఎంచుకోండి:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

ఎకిడ్నా స్లిదర్ లేకుండా రన్ అవుతుంది, కానీ స్లిదర్ `require` స్టేట్‌మెంట్‌లలో ఉపయోగించే మ్యాజిక్ నంబర్‌ల వంటి స్థిరాంకాలను సంగ్రహిస్తుంది మరియు బగ్‌లను త్వరగా కనుగొనడానికి దిగువన ఉన్న అనేక ఉదాహరణలు దానిపై ఆధారపడి ఉంటాయి.

## ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్‌కు పరిచయం {#introduction-to-property-based-fuzzing}

ఎకిడ్నా అనేది ప్రాపర్టీ-ఆధారిత ఫజ్జర్, దీనిని మేము మా మునుపటి బ్లాగ్‌పోస్ట్‌లలో వివరించాము ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### ఫజ్జింగ్ {#fuzzing}

భద్రతా కమ్యూనిటీలో [ఫజ్జింగ్](https://wikipedia.org/wiki/Fuzzing) అనేది బాగా తెలిసిన సాంకేతికత. ప్రోగ్రామ్‌లో బగ్‌లను కనుగొనడానికి ఎక్కువ లేదా తక్కువ యాదృచ్ఛికంగా ఉండే ఇన్‌పుట్‌లను రూపొందించడం ఇందులో ఉంటుంది. సాంప్రదాయ సాఫ్ట్‌వేర్ కోసం ఫజ్జర్‌లు ([AFL](http://lcamtuf.coredump.cx/afl/) లేదా [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) వంటివి) బగ్‌లను కనుగొనడానికి సమర్థవంతమైన సాధనాలుగా ప్రసిద్ధి చెందాయి.

కేవలం యాదృచ్ఛికంగా ఇన్‌పుట్‌లను రూపొందించడమే కాకుండా, మంచి ఇన్‌పుట్‌లను రూపొందించడానికి అనేక పద్ధతులు మరియు వ్యూహాలు ఉన్నాయి, వాటిలో ఇవి ఉన్నాయి:

- ప్రతి ఎగ్జిక్యూషన్ నుండి ఫీడ్‌బ్యాక్ పొందడం మరియు దానిని ఉపయోగించి జనరేషన్‌కు మార్గనిర్దేశం చేయడం. ఉదాహరణకు, కొత్తగా రూపొందించబడిన ఇన్‌పుట్ కొత్త మార్గం యొక్క అన్వేషణకు దారితీస్తే, దానికి దగ్గరగా కొత్త ఇన్‌పుట్‌లను రూపొందించడం సమంజసంగా ఉంటుంది.
- నిర్మాణాత్మక పరిమితిని గౌరవిస్తూ ఇన్‌పుట్‌ను రూపొందించడం. ఉదాహరణకు, మీ ఇన్‌పుట్ చెక్‌సమ్‌తో కూడిన హెడర్‌ను కలిగి ఉంటే, చెక్‌సమ్‌ను ధృవీకరించే ఇన్‌పుట్‌ను ఫజ్జర్ రూపొందించేలా చేయడం సమంజసంగా ఉంటుంది.
- కొత్త ఇన్‌పుట్‌లను రూపొందించడానికి తెలిసిన ఇన్‌పుట్‌లను ఉపయోగించడం: మీకు చెల్లుబాటు అయ్యే ఇన్‌పుట్ యొక్క పెద్ద డేటాసెట్‌కు యాక్సెస్ ఉంటే, మీ ఫజ్జర్ దాని జనరేషన్‌ను మొదటి నుండి ప్రారంభించే బదులు వాటి నుండి కొత్త ఇన్‌పుట్‌లను రూపొందించగలదు. వీటిని సాధారణంగా _సీడ్స్ (seeds)_ అని పిలుస్తారు.

### ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్ {#property-based-fuzzing}

ఎకిడ్నా అనేది ఫజ్జర్ యొక్క నిర్దిష్ట కుటుంబానికి చెందినది: [QuickCheck](https://wikipedia.org/wiki/QuickCheck) ద్వారా ఎక్కువగా ప్రేరణ పొందిన ప్రాపర్టీ-ఆధారిత ఫజ్జింగ్. క్రాష్‌లను కనుగొనడానికి ప్రయత్నించే క్లాసిక్ ఫజ్జర్‌కు భిన్నంగా, ఎకిడ్నా వినియోగదారు-నిర్వచించిన ఇన్‌వేరియంట్‌లను (invariants) విచ్ఛిన్నం చేయడానికి ప్రయత్నిస్తుంది.

స్మార్ట్ కాంట్రాక్ట్‌లలో, ఇన్‌వేరియంట్‌లు అనేవి Solidity ఫంక్షన్‌లు, ఇవి కాంట్రాక్ట్ చేరుకోగల ఏదైనా తప్పు లేదా చెల్లని స్థితిని సూచించగలవు, వాటిలో ఇవి ఉన్నాయి:

- సరికాని యాక్సెస్ నియంత్రణ: దాడి చేసే వ్యక్తి కాంట్రాక్ట్ యజమాని అయ్యాడు.
- సరికాని స్థితి యంత్రం: కాంట్రాక్ట్ పాజ్ చేయబడినప్పుడు టోకెన్‌లను బదిలీ చేయవచ్చు.
- సరికాని అంకగణితం: వినియోగదారు తన బ్యాలెన్స్‌ను అండర్‌ఫ్లో చేయవచ్చు మరియు అపరిమిత ఉచిత టోకెన్‌లను పొందవచ్చు.

### ఎకిడ్నాతో ప్రాపర్టీని పరీక్షించడం {#testing-a-property-with-echidna}

ఎకిడ్నాతో స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా పరీక్షించాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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
- ప్రాపర్టీని కాల్ చేస్తున్నప్పుడు సైడ్-ఎఫెక్ట్‌ను విస్మరిస్తుంది (అంటే, ప్రాపర్టీ స్థితి వేరియబుల్‌ను మార్చినట్లయితే, అది పరీక్ష తర్వాత విస్మరించబడుతుంది)

కాలర్ వద్ద 1000 కంటే ఎక్కువ టోకెన్‌లు లేవని కింది ప్రాపర్టీ తనిఖీ చేస్తుంది:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

మీ ప్రాపర్టీల నుండి మీ కాంట్రాక్ట్‌ను వేరు చేయడానికి ఇన్‌హెరిటెన్స్‌ను ఉపయోగించండి:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) ప్రాపర్టీని అమలు చేస్తుంది మరియు టోకెన్ నుండి ఇన్‌హెరిట్ చేస్తుంది.

### కాంట్రాక్ట్‌ను ప్రారంభించడం {#initiate-a-contract}

ఎకిడ్నాకు ఆర్గ్యుమెంట్ లేని [కన్స్ట్రక్టర్](/developers/docs/smart-contracts/anatomy/#constructor-functions) అవసరం. మీ కాంట్రాక్ట్‌కు నిర్దిష్ట ఇనిషియలైజేషన్ అవసరమైతే, మీరు దానిని కన్స్ట్రక్టర్‌లో చేయాలి.

ఎకిడ్నాలో కొన్ని నిర్దిష్ట చిరునామాలు ఉన్నాయి:

- కన్స్ట్రక్టర్‌ను కాల్ చేసే `0x30000`.
- ఇతర ఫంక్షన్‌లను యాదృచ్ఛికంగా కాల్ చేసే `0x10000`, `0x20000`, మరియు `0x30000`.
- పరీక్షలో ఉన్న కాంట్రాక్ట్ డిప్లాయ్ చేయబడిన `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`.

మా ప్రస్తుత ఉదాహరణలో మాకు ఎటువంటి నిర్దిష్ట ఇనిషియలైజేషన్ అవసరం లేదు, ఫలితంగా మా కన్స్ట్రక్టర్ ఖాళీగా ఉంది.

### ఎకిడ్నాను రన్ చేయడం {#run-echidna}

ఎకిడ్నా దీనితో ప్రారంభించబడుతుంది:

```sh
echidna contract.sol
```

contract.sol బహుళ కాంట్రాక్ట్‌లను కలిగి ఉంటే, మీరు లక్ష్యాన్ని పేర్కొనవచ్చు:

```sh
echidna contract.sol --contract MyContract
```

టెర్మినల్‌లో రన్ చేసినప్పుడు, ఎకిడ్నా ఇంటరాక్టివ్ UIని చూపుతుంది. దిగువ ఉదాహరణల వలె సాదా వచన అవుట్‌పుట్‌ను పొందడానికి `--format text`ని జోడించండి.

### సారాంశం: ప్రాపర్టీని పరీక్షించడం {#summary-testing-a-property}

కిందివి మా ఉదాహరణలో ఎకిడ్నా రన్‌ను సంగ్రహిస్తాయి:

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

`backdoor`ని కాల్ చేస్తే ప్రాపర్టీ ఉల్లంఘించబడుతుందని ఎకిడ్నా కనుగొంది.

## ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#filtering-functions-to-call-during-a-fuzzing-campaign}

ఫజ్ చేయవలసిన ఫంక్షన్‌లను ఎలా ఫిల్టర్ చేయాలో మనం చూస్తాము.
లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్:

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

ఈ చిన్న ఉదాహరణ స్థితి వేరియబుల్‌ను మార్చడానికి నిర్దిష్ట లావాదేవీల క్రమాన్ని కనుగొనమని ఎకిడ్నాను బలవంతం చేస్తుంది.
ఇది ఫజ్జర్‌కు కష్టం.
దీన్ని ధృవీకరించడానికి మనం ఎకిడ్నాను రన్ చేయవచ్చు:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#filtering-functions}

ఈ కాంట్రాక్ట్‌ను పరీక్షించడానికి సరైన క్రమాన్ని కనుగొనడంలో ఎకిడ్నా ఇబ్బంది పడుతుంది ఎందుకంటే రెండు రీసెట్ ఫంక్షన్‌లు (`reset1` మరియు `reset2`) అన్ని స్థితి వేరియబుల్స్‌ను `false`కి సెట్ చేస్తాయి.
అయినప్పటికీ, రీసెట్ ఫంక్షన్‌ను బ్లాక్‌లిస్ట్ చేయడానికి లేదా `f`, `g`,
`h` మరియు `i` ఫంక్షన్‌లను మాత్రమే వైట్‌లిస్ట్ చేయడానికి మనం ప్రత్యేక ఎకిడ్నా ఫీచర్‌ను ఉపయోగించవచ్చు.

ఫంక్షన్‌లను బ్లాక్‌లిస్ట్ చేయడానికి, మనం ఈ కాన్ఫిగరేషన్ ఫైల్‌ను ఉపయోగించవచ్చు:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

ఫంక్షన్‌లను ఫిల్టర్ చేయడానికి మరొక విధానం వైట్‌లిస్ట్ చేయబడిన ఫంక్షన్‌లను జాబితా చేయడం. అలా చేయడానికి, మనం ఈ కాన్ఫిగరేషన్ ఫైల్‌ను ఉపయోగించవచ్చు:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` అప్రమేయంగా `true`గా ఉంటుంది.
- పూర్తి ఫంక్షన్ పేరుపై ఫిల్టరింగ్ నిర్వహించబడుతుంది: కాంట్రాక్ట్ పేరు, ఒక `.`, మరియు అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI) సంతకం (ఉదాహరణకు `C.f(uint256)`). మీకు `f()` మరియు `f(uint256)` ఉంటే, మీరు దేనిని ఫిల్టర్ చేయాలో ఖచ్చితంగా ఎంచుకోవచ్చు. `"reset1"` వంటి కేవలం పేరు దేనికీ సరిపోలదు.

### ఎకిడ్నాను రన్ చేయడం {#run-echidna-1}

కాన్ఫిగరేషన్ ఫైల్ `blacklist.yaml`తో ఎకిడ్నాను రన్ చేయడానికి:

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

ప్రాపర్టీని తప్పుగా నిరూపించడానికి ఎకిడ్నా దాదాపు వెంటనే లావాదేవీల క్రమాన్ని కనుగొంటుంది.

### సారాంశం: ఫంక్షన్‌లను ఫిల్టర్ చేయడం {#summary-filtering-functions}

దీనిని ఉపయోగించి ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఎకిడ్నా ఫంక్షన్‌లను బ్లాక్‌లిస్ట్ లేదా వైట్‌లిస్ట్ చేయవచ్చు:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

`filterBlacklist` బూలియన్ విలువ ప్రకారం, ఎకిడ్నా `C.f1()`, `C.f2()` మరియు `C.f3()`లను బ్లాక్‌లిస్ట్ చేస్తూ లేదా వీటిని మాత్రమే కాల్ చేస్తూ ఫజ్జింగ్ క్యాంపెయిన్‌ను ప్రారంభిస్తుంది.

## ఎకిడ్నాతో Solidity యొక్క నిర్ధారించు (assert)ని ఎలా పరీక్షించాలి {#how-to-test-soliditys-assert-with-echidna}

ఈ చిన్న ట్యుటోరియల్‌లో, కాంట్రాక్ట్‌లలో అస్సెర్షన్ (నిర్ధారణ) తనిఖీని పరీక్షించడానికి ఎకిడ్నాను ఎలా ఉపయోగించాలో మేము చూపబోతున్నాము. మనకు ఇలాంటి కాంట్రాక్ట్ ఉందని అనుకుందాం:

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

Solidity 0.8 నుండి, అంకగణిత ఓవర్‌ఫ్లోలు అప్రమేయంగా రివర్ట్ అవుతాయి. `unchecked` బ్లాక్ ర్యాపింగ్ ప్రవర్తనను పునరుద్ధరిస్తుంది, తద్వారా `counter` ఓవర్‌ఫ్లో కావచ్చు, ఇది ఎకిడ్నా కనుగొనాలని మేము కోరుకునే బగ్.

### అస్సెర్షన్‌ను రాయడం {#write-an-assertion}

దాని వ్యత్యాసాన్ని తిరిగి ఇచ్చిన తర్వాత `tmp` అనేది `counter` కంటే తక్కువ లేదా సమానంగా ఉందని మేము నిర్ధారించుకోవాలనుకుంటున్నాము. మేము ఒక
ఎకిడ్నా ప్రాపర్టీని వ్రాయగలము, కానీ మేము `tmp` విలువను ఎక్కడో నిల్వ చేయాలి. బదులుగా, మేము ఇలాంటి అస్సెర్షన్‌ను ఉపయోగించవచ్చు:

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

### ఎకిడ్నాను రన్ చేయడం {#run-echidna-2}

అస్సెర్షన్ వైఫల్య పరీక్షను ప్రారంభించడానికి, కమాండ్ లైన్‌లో `--test-mode assertion`ని పాస్ చేయండి లేదా [ఎకిడ్నా కాన్ఫిగరేషన్ ఫైల్](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`ని సృష్టించండి:

```yaml
testMode: assertion
```

మేము ఈ కాంట్రాక్ట్‌ను ఎకిడ్నాలో రన్ చేసినప్పుడు, మేము ఆశించిన ఫలితాలను పొందుతాము:

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

మీరు చూడగలిగినట్లుగా, ఎకిడ్నా `inc` ఫంక్షన్‌లో కొంత అస్సెర్షన్ వైఫల్యాన్ని నివేదిస్తుంది. ఫంక్షన్‌కు ఒకటి కంటే ఎక్కువ అస్సెర్షన్‌లను జోడించడం సాధ్యమవుతుంది, కానీ ఏ అస్సెర్షన్ విఫలమైందో ఎకిడ్నా చెప్పలేదు.

### అస్సెర్షన్‌లను ఎప్పుడు మరియు ఎలా ఉపయోగించాలి {#when-and-how-use-assertions}

అస్సెర్షన్‌లను స్పష్టమైన ప్రాపర్టీలకు ప్రత్యామ్నాయాలుగా ఉపయోగించవచ్చు, ప్రత్యేకించి తనిఖీ చేయవలసిన షరతులు నేరుగా ఏదైనా ఆపరేషన్ `f` యొక్క సరైన వినియోగానికి సంబంధించినవి అయితే. కొంత కోడ్ తర్వాత అస్సెర్షన్‌లను జోడించడం వలన అది అమలు చేయబడిన వెంటనే తనిఖీ జరుగుతుందని నిర్ధారిస్తుంది:

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

ఈ ఫంక్షన్‌ను పెద్ద ఆర్గ్యుమెంట్‌లతో బహుళ సార్లు కాల్ చేస్తే `inc`లోని అస్సెర్షన్ విఫలమవుతుందని ఎకిడ్నా కనుగొంది.

## ఎకిడ్నా కార్పస్‌ను సేకరించడం మరియు సవరించడం {#collecting-and-modifying-an-echidna-corpus}

ఎకిడ్నాతో లావాదేవీల కార్పస్‌ను ఎలా సేకరించాలో మరియు ఉపయోగించాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

ఈ చిన్న ఉదాహరణ స్థితి వేరియబుల్‌ను మార్చడానికి నిర్దిష్ట విలువలను కనుగొనమని ఎకిడ్నాను బలవంతం చేస్తుంది. ఇది ఫజ్జర్‌కు కష్టం.
దీన్ని ధృవీకరించడానికి మనం ఎకిడ్నాను రన్ చేయవచ్చు:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

అయినప్పటికీ, ఈ ఫజ్జింగ్ క్యాంపెయిన్‌ను రన్ చేస్తున్నప్పుడు కార్పస్‌ను సేకరించడానికి మనం ఇప్పటికీ ఎకిడ్నాను ఉపయోగించవచ్చు.

### కార్పస్‌ను సేకరించడం {#collecting-a-corpus}

కార్పస్ సేకరణను ప్రారంభించడానికి, కార్పస్ డైరెక్టరీని సృష్టించండి:

```sh
mkdir corpus-magic
```

మరియు ఒక [ఎకిడ్నా కాన్ఫిగరేషన్ ఫైల్](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

ఇప్పుడు మనం మా టూల్‌ను రన్ చేయవచ్చు మరియు సేకరించిన కార్పస్‌ను తనిఖీ చేయవచ్చు:

```sh
echidna magic.sol --config config.yaml
```

ఎకిడ్నా ఇప్పటికీ సరైన మ్యాజిక్ విలువలను కనుగొనలేకపోయింది. ఇది ఎక్కడ నిలిచిపోయిందో చూడటానికి, `corpus-magic/covered.*.txt` కవరేజ్ నివేదికను చూడండి:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` లేబుల్ అంటే ఎకిడ్నా ఆ లైన్‌కు చేరుకుంది కానీ ఎగ్జిక్యూషన్ అక్కడ రివర్ట్ చేయబడింది మరియు చివరి `require` తర్వాత ఉన్న లైన్‌లు ఎప్పుడూ అమలు చేయబడవు.

ఎకిడ్నా సేకరించిన లావాదేవీల శ్రేణులు `corpus-magic/coverage/`లో JSON ఫైల్‌లుగా నిల్వ చేయబడతాయి. ఉదాహరణకు, ఈ ఫైల్‌లలో ఒకదాని యొక్క మొదటి లావాదేవీ:

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

స్పష్టంగా, ఈ ఇన్‌పుట్ మా ప్రాపర్టీలో వైఫల్యాన్ని ప్రేరేపించదు. అయితే, తదుపరి దశలో, దాని కోసం దీన్ని ఎలా సవరించాలో మనం చూస్తాము.

### కార్పస్‌ను సీడింగ్ చేయడం {#seeding-a-corpus}

`magic` ఫంక్షన్‌తో వ్యవహరించడానికి ఎకిడ్నాకు కొంత సహాయం కావాలి. దానికి తగిన
పారామితులను ఉపయోగించడానికి మేము ఇన్‌పుట్‌ను కాపీ చేసి సవరించబోతున్నాము (ఫైల్ పేర్లు యాదృచ్ఛికంగా ఉంటాయి, కాబట్టి మీ స్వంత `corpus-magic/coverage/` డైరెక్టరీ నుండి ఒకదాన్ని ఉపయోగించండి):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

మేము `new.txt`ని సవరిస్తాము, తద్వారా ఇది `magic(42,129,333,0)`ని కాల్ చేసే ఒకే లావాదేవీని కలిగి ఉంటుంది. ఇప్పుడు, మనం ఎకిడ్నాను మళ్లీ రన్ చేయవచ్చు:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

ఈసారి, ప్రాపర్టీ వెంటనే ఉల్లంఘించబడిందని అది కనుగొంది.

## అధిక గ్యాస్ వినియోగంతో లావాదేవీలను కనుగొనడం {#finding-transactions-with-high-gas-consumption}

ఎకిడ్నాతో అధిక గ్యాస్ వినియోగం ఉన్న లావాదేవీలను ఎలా కనుగొనాలో మనం చూస్తాము. ఎకిడ్నా యొక్క పాత వెర్షన్‌లు దీని కోసం `estimateGas` ఎంపికను కలిగి ఉన్నాయి; ఇది ఎకిడ్నా 2.3.0లో తీసివేయబడింది. బదులుగా, మేము `gasleft()`తో గ్యాస్‌ను కొలుస్తాము మరియు ఎకిడ్నా యొక్క [ఆప్టిమైజేషన్ మోడ్](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) దానిని పెంచేలా చేస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్:

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

ఇక్కడ `expensive` పెద్ద గ్యాస్ వినియోగాన్ని కలిగి ఉండవచ్చు.

### గ్యాస్ వినియోగాన్ని కొలవడం {#measuring-gas-consumption}

ఆప్టిమైజేషన్ మోడ్‌లో, ఎకిడ్నా ఎలాంటి ఆర్గ్యుమెంట్‌ను తీసుకోని మరియు `int256`ని తిరిగి ఇచ్చే `echidna_`తో ప్రారంభమయ్యే ఫంక్షన్‌ల కోసం వెతుకుతుంది మరియు తిరిగి వచ్చిన విలువను పెంచే లావాదేవీల క్రమాన్ని కనుగొనడానికి ప్రయత్నిస్తుంది. మేము `f`ని కాల్ చేసే, అది ఉపయోగించిన గ్యాస్‌ను రికార్డ్ చేసే మరియు గరిష్టాన్ని బహిర్గతం చేసే పరీక్ష కాంట్రాక్ట్‌ను జోడిస్తాము (రెండు కాంట్రాక్ట్‌లను `gas.sol`లో సేవ్ చేయండి):

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

ఆప్టిమైజేషన్ మోడ్‌ను ప్రారంభించడానికి, కాన్ఫిగరేషన్ ఫైల్ `config.yaml`ని సృష్టించండి. ఈ ఉదాహరణలో, ఫలితాలను సులభంగా అర్థం చేసుకోవడానికి మేము లావాదేవీల క్రమం పరిమాణాన్ని కూడా తగ్గిస్తాము:

```yaml
testMode: optimization
seqLen: 2
```

### ఎకిడ్నాను రన్ చేయడం {#run-echidna-3}

మేము కాన్ఫిగరేషన్ ఫైల్‌ను సృష్టించిన తర్వాత, మేము ఎకిడ్నాను ఇలా రన్ చేయవచ్చు:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- చూపబడిన గ్యాస్ ఎకిడ్నా రన్ అయ్యే ఈథీరియం వర్చువల్ మెషీన్ (EVM) అమలు, [hevm](https://github.com/argotorg/hevm) ద్వారా కొలవబడుతుంది మరియు `measureF` నుండి అంతర్గత కాల్ యొక్క ఓవర్‌హెడ్‌ను కలిగి ఉంటుంది.
- గరిష్టం ప్రత్యేకమైనది కాదు: ప్రతి క్యాంపెయిన్ యాదృచ్ఛికంగా ఉంటుంది మరియు సుదీర్ఘ క్యాంపెయిన్‌లు (ఉదాహరణకు `--test-limit 200000`) పెద్ద విలువలను కనుగొనే అవకాశం ఉంది.

### గ్యాస్-తగ్గించే కాల్‌లను ఫిల్టర్ చేయడం {#filtering-out-gas-reducing-calls}

పైన ఉన్న **ఫజ్జింగ్ క్యాంపెయిన్ సమయంలో కాల్ చేయడానికి ఫంక్షన్‌లను ఫిల్టర్ చేయడం** గురించిన ట్యుటోరియల్ మీ పరీక్ష నుండి కొన్ని ఫంక్షన్‌లను ఎలా
తీసివేయాలో చూపుతుంది.  
ఖచ్చితమైన గ్యాస్ అంచనాను పొందడానికి ఇది కీలకం కావచ్చు.
కింది ఉదాహరణను పరిగణించండి:

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

`echidna_opt_gas_check` `check`ని కాల్ చేస్తుంది మరియు దాని గ్యాస్ ధరను తిరిగి ఇస్తుంది. ప్రతి ఎకిడ్నా పరీక్ష ఫంక్షన్ వలె, దాని స్థితి మార్పులు ఆ తర్వాత విస్మరించబడతాయి.

ఎకిడ్నా అన్ని ఫంక్షన్‌లను కాల్ చేయగలిగితే, అది అధిక గ్యాస్ ధర ఉన్న లావాదేవీలను సులభంగా కనుగొనదు:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

ఎందుకంటే ధర `addrs` పరిమాణంపై ఆధారపడి ఉంటుంది మరియు యాదృచ్ఛిక కాల్‌లు శ్రేణిని దాదాపు ఖాళీగా ఉంచుతాయి.
అయితే, `pop` మరియు `clear`లను బ్లాక్‌లిస్ట్ చేయడం మాకు మెరుగైన ఫలితాలను ఇస్తుంది:

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

ఈ ఫలితం కోసం కాల్ క్రమాన్ని కుదించడానికి చాలా నిమిషాలు పడుతుంది, ఎందుకంటే ప్రతి రీప్లే ఖరీదైన `check` ఫంక్షన్‌ను కాల్ చేస్తుంది.

### సారాంశం: అధిక గ్యాస్ వినియోగంతో లావాదేవీలను కనుగొనడం {#summary-finding-transactions-with-high-gas-consumption}

`int256`ని తిరిగి ఇచ్చే `echidna_` ఫంక్షన్‌లో `gasleft()`తో గ్యాస్‌ను కొలవడం ద్వారా మరియు ఆప్టిమైజేషన్ మోడ్‌లో రన్ చేయడం ద్వారా ఎకిడ్నా అధిక గ్యాస్ వినియోగంతో లావాదేవీలను కనుగొనగలదు:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

ఫజ్జింగ్ క్యాంపెయిన్ ముగిసిన తర్వాత, కనుగొనబడిన గరిష్ట విలువను మరియు దానిని ఉత్పత్తి చేసిన లావాదేవీల క్రమాన్ని ఎకిడ్నా నివేదిస్తుంది.
