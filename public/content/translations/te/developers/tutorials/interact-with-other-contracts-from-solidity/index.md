---
title: "Solidity నుండి ఇతర కాంట్రాక్టులతో ఇంటరాక్ట్ అవ్వండి"
description: "ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి మరియు దానితో ఇంటరాక్ట్ అవ్వాలి"
author: "jdourlens"
tags:
  [
    "స్మార్ట్ కాంట్రాక్టులు",
    "దృఢత్వం",
    "remix",
    "డిప్లాయ్ చేయడం",
    "కంపోజిబిలిటీ"
  ]
skill: "అధునాతనం"
lang: te
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

మునుపటి ట్యుటోరియల్స్‌లో మేము [మీ మొదటి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి](/developers/tutorials/deploying-your-first-smart-contract/) మరియు దానికి [మాడిఫైయర్‌లతో యాక్సెస్‌ను నియంత్రించడం](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) లేదా [Solidityలో ఎర్రర్ హ్యాండ్లింగ్](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) వంటి కొన్ని ఫీచర్‌లను జోడించడం వంటి చాలా విషయాలు నేర్చుకున్నాము. ఈ ట్యుటోరియల్‌లో, ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి ఒక స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలో మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలో మనం నేర్చుకుంటాము.

మేము ఒక కాంట్రాక్ట్‌ను తయారు చేస్తాము, అది దానికోసం ఒక ఫ్యాక్టరీని సృష్టించడం ద్వారా ఎవరికైనా తన సొంత `Counter` స్మార్ట్ కాంట్రాక్ట్‌ను కలిగి ఉండటానికి వీలు కల్పిస్తుంది, దాని పేరు `CounterFactory` అవుతుంది. ముందుగా, మా ప్రారంభ `Counter` స్మార్ట్ కాంట్రాక్ట్ యొక్క కోడ్ ఇక్కడ ఉంది:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "మీరు కాంట్రాక్ట్ యజమాని కాదు");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "మీరు ఫ్యాక్టరీని ఉపయోగించాలి");
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

ఫ్యాక్టరీ యొక్క చిరునామా మరియు కాంట్రాక్ట్ యజమాని యొక్క చిరునామాను ట్రాక్ చేయడానికి మేము కాంట్రాక్ట్ కోడ్‌ను కొద్దిగా సవరించామని గమనించండి. మీరు మరొక కాంట్రాక్ట్ నుండి కాంట్రాక్ట్ కోడ్‌ను కాల్ చేసినప్పుడు, `msg.sender` మా కాంట్రాక్ట్ ఫ్యాక్టరీ యొక్క చిరునామాను సూచిస్తుంది. ఇతర కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి ఒక కాంట్రాక్ట్‌ను ఉపయోగించడం ఒక సాధారణ పద్ధతి కాబట్టి ఇది అర్థం చేసుకోవడానికి **ఒక చాలా ముఖ్యమైన విషయం**. అందువల్ల సంక్లిష్టమైన సందర్భాల్లో పంపినవారు ఎవరో మీరు జాగ్రత్తగా చూసుకోవాలి.

దీనికోసం, మేము `onlyFactory` మాడిఫైయర్‌ను కూడా జోడించాము, ఇది అసలు కాలర్‌ను ఒక పారామీటర్‌గా పంపే ఫ్యాక్టరీ ద్వారా మాత్రమే స్టేట్‌ను మార్చే ఫంక్షన్‌ను కాల్ చేయగలదని నిర్ధారిస్తుంది.

అన్ని ఇతర కౌంటర్లను నిర్వహించే మా కొత్త `కౌంటర్ ఫ్యాక్టరీ` లోపల, మేము ఒక యజమానిని అతని కౌంటర్ కాంట్రాక్ట్ చిరునామాకు అనుబంధించే ఒక మ్యాపింగ్‌ను జోడిస్తాము:

```solidity
mapping(address => Counter) _counters;
```

Ethereumలో, మ్యాపింగ్‌లు జావాస్క్రిప్ట్‌లోని ఆబ్జెక్ట్‌లకు సమానం, అవి A రకం కీని B రకం విలువకు మ్యాప్ చేయడానికి వీలు కల్పిస్తాయి. ఈ సందర్భంలో మేము ఒక యజమాని యొక్క చిరునామాను దాని కౌంటర్ యొక్క ఇన్‌స్టాన్స్‌తో మ్యాప్ చేస్తాము.

ఒకరి కోసం కొత్త కౌంటర్‌ను ఇన్‌స్టాన్షియేట్ చేయడం ఇలా కనిపిస్తుంది:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

మేము మొదట ఆ వ్యక్తికి ఇప్పటికే కౌంటర్ ఉందో లేదో తనిఖీ చేస్తాము. అతనికి కౌంటర్ లేకపోతే, అతని చిరునామాను `Counter` కన్‌స్ట్రక్టర్‌కు పంపడం ద్వారా మేము ఒక కొత్త కౌంటర్‌ను ఇన్‌స్టాన్షియేట్ చేసి, కొత్తగా సృష్టించబడిన ఇన్‌స్టాన్స్‌ను మ్యాపింగ్‌కు కేటాయిస్తాము.

ఒక నిర్దిష్ట కౌంటర్ యొక్క కౌంట్ పొందడానికి ఇది ఇలా కనిపిస్తుంది:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

మొదటి ఫంక్షన్ ఇచ్చిన చిరునామా కోసం కౌంటర్ కాంట్రాక్ట్ ఉందో లేదో తనిఖీ చేసి, ఆపై ఇన్‌స్టాన్స్ నుండి `getCount` పద్ధతిని కాల్ చేస్తుంది. రెండవ ఫంక్షన్: `getMyCount` అనేది `msg.sender`ను నేరుగా `getCount` ఫంక్షన్‌కు పంపడానికి ఒక చిన్న మార్గం.

`increment` ఫంక్షన్ చాలా పోలి ఉంటుంది, కానీ అసలు లావాదేవీ పంపినవారిని `Counter` కాంట్రాక్ట్‌కు పంపుతుంది:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

చాలా సార్లు కాల్ చేస్తే, మా కౌంటర్ ఓవర్‌ఫ్లోకు గురికావచ్చని గమనించండి. ఈ సంభావ్య కేసు నుండి రక్షించడానికి మీరు వీలైనంత వరకు [సేఫ్‌మ్యాథ్ లైబ్రరీ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)ని ఉపయోగించాలి.

మా కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి, మీరు `CounterFactory` మరియు `Counter` రెండింటి కోడ్‌ను అందించాల్సి ఉంటుంది. ఉదాహరణకు రీమిక్స్‌లో డిప్లాయ్ చేస్తున్నప్పుడు మీరు కౌంటర్‌ఫ్యాక్టరీని ఎంచుకోవాలి.

పూర్తి కోడ్ ఇక్కడ ఉంది:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "మీరు కాంట్రాక్ట్ యజమాని కాదు");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "మీరు ఫ్యాక్టరీని ఉపయోగించాలి");
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

కంపైల్ చేసిన తర్వాత, రీమిక్స్ డిప్లాయ్ విభాగంలో మీరు డిప్లాయ్ చేయాల్సిన ఫ్యాక్టరీని ఎంచుకుంటారు:

![రీమిక్స్‌లో డిప్లాయ్ చేయాల్సిన ఫ్యాక్టరీని ఎంచుకోవడం](./counterfactory-deploy.png)

ఆ తర్వాత మీరు మీ కాంట్రాక్ట్ ఫ్యాక్టరీతో ఆడుకోవచ్చు మరియు విలువ మారడాన్ని తనిఖీ చేయవచ్చు. మీరు వేరే చిరునామా నుండి స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయాలనుకుంటే, మీరు రీమిక్స్ యొక్క అకౌంట్ ఎంపికలో చిరునామాను మార్చవలసి ఉంటుంది.
