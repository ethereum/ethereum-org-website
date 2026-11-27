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
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

మునుపటి ట్యుటోరియల్స్‌లో మనం [మీ మొదటి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి](/developers/tutorials/deploying-your-first-smart-contract/) మరియు దానికి [మాడిఫైయర్‌లతో యాక్సెస్‌ను నియంత్రించడం](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) లేదా [Solidityలో ఎర్రర్ హ్యాండ్లింగ్](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions) వంటి కొన్ని ఫీచర్‌లను ఎలా జోడించాలో చాలా నేర్చుకున్నాము. ఈ ట్యుటోరియల్‌లో మనం ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలో మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలో నేర్చుకుంటాము.

మనం ఎవరైనా తమ స్వంత `Counter` స్మార్ట్ కాంట్రాక్ట్‌ను కలిగి ఉండటానికి వీలు కల్పించే ఒక కాంట్రాక్ట్‌ను దాని కోసం ఒక ఫ్యాక్టరీని సృష్టించడం ద్వారా తయారు చేస్తాము, దాని పేరు `CounterFactory` అవుతుంది. ముందుగా మన ప్రారంభ `Counter` స్మార్ట్ కాంట్రాక్ట్ యొక్క కోడ్ ఇక్కడ ఉంది:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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

ఫ్యాక్టరీ యొక్క చిరునామా మరియు కాంట్రాక్ట్ యజమాని యొక్క చిరునామాను ట్రాక్ చేయడానికి మనం కాంట్రాక్ట్ కోడ్‌ను కొద్దిగా సవరించామని గమనించండి. మీరు మరొక కాంట్రాక్ట్ నుండి కాంట్రాక్ట్ కోడ్‌ను కాల్ చేసినప్పుడు, msg.sender మన కాంట్రాక్ట్ ఫ్యాక్టరీ యొక్క చిరునామాను సూచిస్తుంది. ఇతర కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి కాంట్రాక్ట్‌ను ఉపయోగించడం ఒక సాధారణ పద్ధతి కాబట్టి ఇది **అర్థం చేసుకోవలసిన చాలా ముఖ్యమైన విషయం**. కాబట్టి సంక్లిష్టమైన సందర్భాల్లో పంపినవారు ఎవరో మీరు జాగ్రత్త వహించాలి.

దీని కోసం మనం `onlyFactory` మాడిఫైయర్‌ను కూడా జోడించాము, ఇది స్థితిని మార్చే ఫంక్షన్‌ను అసలు కాలర్‌ను పారామీటర్‌గా పంపే ఫ్యాక్టరీ ద్వారా మాత్రమే కాల్ చేయబడుతుందని నిర్ధారిస్తుంది.

ఇతర అన్ని కౌంటర్లను నిర్వహించే మన కొత్త `CounterFactory` లోపల, యజమానిని అతని కౌంటర్ కాంట్రాక్ట్ యొక్క చిరునామాతో అనుబంధించే మ్యాపింగ్‌ను మనం జోడిస్తాము:

```solidity
mapping(address => Counter) _counters;
```

Solidityలో, [మ్యాపింగ్‌లు](https://docs.soliditylang.org/en/latest/types.html#mapping-types) JavaScriptలోని ఆబ్జెక్ట్‌ల మాదిరిగానే ఉంటాయి: అవి A రకానికి చెందిన కీని B రకానికి చెందిన విలువకు మ్యాప్ చేస్తాయి. ఈ సందర్భంలో మనం యజమాని యొక్క చిరునామాను దాని కౌంటర్ యొక్క ఇన్‌స్టాన్స్‌తో మ్యాప్ చేస్తాము.

ఎవరికైనా కొత్త కౌంటర్‌ను ఇన్‌స్టాన్షియేట్ చేయడం ఇలా ఉంటుంది:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

ఆ వ్యక్తికి ఇప్పటికే కౌంటర్ ఉందో లేదో మనం ముందుగా తనిఖీ చేస్తాము. మ్యాపింగ్ ఎప్పుడూ సెట్ చేయబడని కీల కోసం డిఫాల్ట్ విలువను అందిస్తుంది, ఇది కాంట్రాక్ట్ రకానికి శూన్య చిరునామా అవుతుంది, కాబట్టి మనం నిల్వ చేయబడిన కాంట్రాక్ట్ యొక్క చిరునామాను `address(0)`తో పోల్చుతాము. అతనికి కౌంటర్ లేకపోతే, అతని చిరునామాను `Counter` కన్స్ట్రక్టర్‌కు పంపడం ద్వారా మనం కొత్త కౌంటర్‌ను ఇన్‌స్టాన్షియేట్ చేస్తాము మరియు కొత్తగా సృష్టించబడిన ఇన్‌స్టాన్స్‌ను మ్యాపింగ్‌కు కేటాయిస్తాము.

నిర్దిష్ట కౌంటర్ యొక్క కౌంట్‌ను పొందడానికి ఇది ఇలా ఉంటుంది:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

మొదటి ఫంక్షన్ ఇచ్చిన చిరునామా కోసం కౌంటర్ కాంట్రాక్ట్ ఉందో లేదో తనిఖీ చేస్తుంది మరియు ఆపై ఇన్‌స్టాన్స్ నుండి `getCount` పద్ధతిని కాల్ చేస్తుంది. రెండవ ఫంక్షన్: `getMyCount` అనేది msg.senderను నేరుగా `getCount` ఫంక్షన్‌కు పంపడానికి కేవలం ఒక షార్ట్‌కట్.

`increment` ఫంక్షన్ చాలా సారూప్యంగా ఉంటుంది కానీ అసలు లావాదేవీ పంపినవారిని `Counter` కాంట్రాక్ట్‌కు పంపుతుంది:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Solidity 0.8 నుండి, అంకగణితం [డిఫాల్ట్‌గా తనిఖీ చేయబడుతుంది](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): ఒకవేళ `_count` ఎప్పుడైనా ఓవర్‌ఫ్లో అయితే, `_count++` నిశ్శబ్దంగా చుట్టడానికి బదులుగా లావాదేవీని రివర్ట్ చేస్తుంది, కాబట్టి SafeMath వంటి అదనపు లైబ్రరీ అవసరం లేదు.

మన కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి, మీరు `CounterFactory` మరియు `Counter` రెండింటి కోడ్‌ను అందించాలి. ఉదాహరణకు Remixలో డిప్లాయ్ చేస్తున్నప్పుడు మీరు CounterFactoryని ఎంచుకోవాలి.

పూర్తి కోడ్ ఇక్కడ ఉంది:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

     constructor(address owner) {
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
        require(address(_counters[msg.sender]) == address(0), "You already have a counter");
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
        _counters[msg.sender].increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require(address(_counters[account]) != address(0), "This account has no counter");
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

కంపైలింగ్ చేసిన తర్వాత, Remix డిప్లాయ్ విభాగంలో మీరు డిప్లాయ్ చేయాల్సిన ఫ్యాక్టరీని ఎంచుకుంటారు:

![Remixలో డిప్లాయ్ చేయాల్సిన ఫ్యాక్టరీని ఎంచుకోవడం](./counterfactory-deploy.png)

ఆపై మీరు మీ కాంట్రాక్ట్ ఫ్యాక్టరీతో ప్లే చేయవచ్చు మరియు మారుతున్న విలువను తనిఖీ చేయవచ్చు. మీరు వేరొక చిరునామా నుండి స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయాలనుకుంటే, మీరు Remix యొక్క ఖాతా ఎంపికలో చిరునామాను మార్చాలి.
