---
title: "Solidity నుండి ఇతర కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వండి"
description: "ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలి"
author: jdourlens
tags:
  - స్మార్ట్ కాంట్రాక్ట్‌లు
  - Solidity
  - Remix
  - డిప్లాయ్ చేయడం
  - కంపోజబిలిటీ
skill: advanced
breadcrumb: "కాంట్రాక్ట్ ఇంటరాక్షన్‌లు"
lang: te
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

మునుపటి ట్యుటోరియల్స్‌లో మనం [మీ మొదటి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి](/developers/tutorials/deploying-your-first-smart-contract/) మరియు దానికి [మాడిఫైయర్‌లతో యాక్సెస్‌ను నియంత్రించడం](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) లేదా [Solidityలో ఎర్రర్ హ్యాండ్లింగ్](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) వంటి కొన్ని ఫీచర్‌లను ఎలా జోడించాలో చాలా నేర్చుకున్నాము. ఈ ట్యుటోరియల్‌లో మనం ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలో మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలో నేర్చుకుంటాము.

ఎవరైనా తమ స్వంత `Counter` స్మార్ట్ కాంట్రాక్ట్‌ను కలిగి ఉండటానికి వీలు కల్పించే ఒక కాంట్రాక్ట్‌ను దాని కోసం ఒక ఫ్యాక్టరీని సృష్టించడం ద్వారా మనం తయారు చేస్తాము, దాని పేరు `CounterFactory` అవుతుంది. ముందుగా మన ప్రారంభ `Counter` స్మార్ట్ కాంట్రాక్ట్ యొక్క కోడ్ ఇక్కడ ఉంది:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

ఫ్యాక్టరీ యొక్క చిరునామా మరియు కాంట్రాక్ట్ యజమాని యొక్క చిరునామాను ట్రాక్ చేయడానికి మేము కాంట్రాక్ట్ కోడ్‌ను కొద్దిగా సవరించామని గమనించండి. మీరు మరొక కాంట్రాక్ట్ నుండి కాంట్రాక్ట్ కోడ్‌ను కాల్ చేసినప్పుడు, msg.sender మన కాంట్రాక్ట్ ఫ్యాక్టరీ యొక్క చిరునామాను సూచిస్తుంది. ఇతర కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి కాంట్రాక్ట్‌ను ఉపయోగించడం ఒక సాధారణ పద్ధతి కాబట్టి ఇది **అర్థం చేసుకోవలసిన చాలా ముఖ్యమైన విషయం**. అందువల్ల సంక్లిష్టమైన సందర్భాల్లో పంపినవారు ఎవరో మీరు జాగ్రత్త వహించాలి.

దీని కోసం మేము `onlyFactory` మాడిఫైయర్‌ను కూడా జోడించాము, ఇది స్థితిని మార్చే ఫంక్షన్‌ను అసలు కాలర్‌ను పారామీటర్‌గా పంపే ఫ్యాక్టరీ ద్వారా మాత్రమే కాల్ చేయబడుతుందని నిర్ధారిస్తుంది.

ఇతర అన్ని కౌంటర్లను నిర్వహించే మన కొత్త `CounterFactory` లోపల, ఒక యజమానిని అతని కౌంటర్ కాంట్రాక్ట్ యొక్క చిరునామాతో అనుబంధించే మ్యాపింగ్‌ను మేము జోడిస్తాము:

```solidity
mapping(address => Counter) _counters;
```

ఎథీరియంలో, మ్యాపింగ్ అనేది JavaScriptలోని ఆబ్జెక్ట్‌లకు సమానం, అవి A రకానికి చెందిన కీని B రకానికి చెందిన విలువకు మ్యాప్ చేయడానికి వీలు కల్పిస్తాయి. ఈ సందర్భంలో మనం యజమాని యొక్క చిరునామాను దాని కౌంటర్ యొక్క ఇన్‌స్టాన్స్‌తో మ్యాప్ చేస్తాము.

ఎవరికైనా కొత్త కౌంటర్‌ను ఇన్‌స్టాన్షియేట్ చేయడం ఇలా ఉంటుంది:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

ఆ వ్యక్తికి ఇప్పటికే కౌంటర్ ఉందో లేదో మేము ముందుగా తనిఖీ చేస్తాము. అతనికి కౌంటర్ లేకపోతే, అతని చిరునామాను `Counter` కన్స్ట్రక్టర్‌కు పంపడం ద్వారా మేము కొత్త కౌంటర్‌ను ఇన్‌స్టాన్షియేట్ చేస్తాము మరియు కొత్తగా సృష్టించిన ఇన్‌స్టాన్స్‌ను మ్యాపింగ్‌కు కేటాయిస్తాము.

ఒక నిర్దిష్ట కౌంటర్ యొక్క కౌంట్‌ను పొందడానికి ఇది ఇలా ఉంటుంది:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

మొదటి ఫంక్షన్ ఇచ్చిన చిరునామా కోసం కౌంటర్ కాంట్రాక్ట్ ఉందో లేదో తనిఖీ చేస్తుంది మరియు ఆపై ఇన్‌స్టాన్స్ నుండి `getCount` పద్ధతిని కాల్ చేస్తుంది. రెండవ ఫంక్షన్: `getMyCount` అనేది msg.senderను నేరుగా `getCount` ఫంక్షన్‌కు పంపడానికి ఒక షార్ట్‌కట్ మాత్రమే.

`increment` ఫంక్షన్ చాలా సారూప్యంగా ఉంటుంది కానీ అసలు లావాదేవీ పంపినవారిని `Counter` కాంట్రాక్ట్‌కు పంపుతుంది:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

చాలా సార్లు కాల్ చేయబడితే, మన కౌంటర్ ఓవర్‌ఫ్లోకు గురయ్యే అవకాశం ఉందని గమనించండి. ఈ సాధ్యమయ్యే సందర్భం నుండి రక్షించడానికి మీరు వీలైనంత వరకు [SafeMath లైబ్రరీ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)ని ఉపయోగించాలి.

మన కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి, మీరు `CounterFactory` మరియు `Counter` రెండింటి కోడ్‌ను అందించాలి. ఉదాహరణకు Remixలో డిప్లాయ్ చేస్తున్నప్పుడు మీరు CounterFactoryని ఎంచుకోవాలి.

పూర్తి కోడ్ ఇక్కడ ఉంది:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

కంపైలింగ్ చేసిన తర్వాత, Remix డిప్లాయ్ విభాగంలో మీరు డిప్లాయ్ చేయాల్సిన ఫ్యాక్టరీని ఎంచుకుంటారు:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

ఆపై మీరు మీ కాంట్రాక్ట్ ఫ్యాక్టరీతో ప్రయోగాలు చేయవచ్చు మరియు విలువ మారడాన్ని తనిఖీ చేయవచ్చు. మీరు వేరొక చిరునామా నుండి స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయాలనుకుంటే, మీరు Remix యొక్క ఖాతా (Account) ఎంపికలో చిరునామాను మార్చాలి.