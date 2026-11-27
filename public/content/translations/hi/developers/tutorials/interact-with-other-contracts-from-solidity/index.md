---
title: "Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें"
description: "किसी मौजूदा अनुबंध से स्मार्ट अनुबंध को कैसे तैनात करें और उसके साथ इंटरैक्ट करें"
author: "jdourlens"
tags: ["स्मार्ट अनुबंध", "Solidity", "Remix", "तैनात करना", "कंपोज़ेबिलिटी"]
skill: advanced
breadcrumb: "अनुबंध इंटरैक्शन"
lang: hi
published: 2020-04-05
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

पिछले ट्यूटोरियल में हमने बहुत कुछ सीखा जैसे [अपना पहला स्मार्ट अनुबंध कैसे तैनात करें](/developers/tutorials/deploying-your-first-smart-contract/) और इसमें कुछ विशेषताएं कैसे जोड़ें जैसे [मॉडिफायर के साथ एक्सेस को नियंत्रित करना](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) या [Solidity में त्रुटि प्रबंधन](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions)। इस ट्यूटोरियल में हम सीखेंगे कि किसी मौजूदा अनुबंध से स्मार्ट अनुबंध को कैसे तैनात करें और उसके साथ कैसे इंटरैक्ट करें।

हम एक ऐसा अनुबंध बनाएंगे जो किसी को भी इसके लिए एक फैक्ट्री बनाकर अपना खुद का `Counter` स्मार्ट अनुबंध रखने में सक्षम बनाता है, इसका नाम `CounterFactory` होगा। सबसे पहले यहाँ हमारे प्रारंभिक `Counter` स्मार्ट अनुबंध का कोड दिया गया है:

```solidity
// SPDX-लाइसेंस-पहचानकर्ता: MIT
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

ध्यान दें कि हमने फैक्ट्री के पते और अनुबंध के मालिक के पते का ट्रैक रखने के लिए अनुबंध कोड को थोड़ा संशोधित किया है। जब आप किसी अन्य अनुबंध से अनुबंध कोड को कॉल करते हैं, तो msg.sender हमारी अनुबंध फैक्ट्री के पते को संदर्भित करेगा। यह **समझने के लिए वास्तव में एक महत्वपूर्ण बिंदु है** क्योंकि अन्य अनुबंधों के साथ इंटरैक्ट करने के लिए अनुबंध का उपयोग करना एक आम बात है। इसलिए आपको जटिल मामलों में इस बात का ध्यान रखना चाहिए कि प्रेषक (sender) कौन है।

इसके लिए हमने एक `onlyFactory` मॉडिफायर भी जोड़ा है जो यह सुनिश्चित करता है कि स्थिति बदलने वाले फ़ंक्शन को केवल उस फैक्ट्री द्वारा कॉल किया जा सकता है जो मूल कॉलर को पैरामीटर के रूप में पास करेगी।

हमारे नए `CounterFactory` के अंदर जो अन्य सभी Counters को प्रबंधित करेगा, हम एक मैपिंग जोड़ेंगे जो एक मालिक को उसके काउंटर अनुबंध के पते से जोड़ेगी:

```solidity
mapping(address => Counter) _counters;
```

Solidity में, [मैपिंग](https://docs.soliditylang.org/en/latest/types.html#mapping-types) JavaScript में ऑब्जेक्ट्स के समान होती हैं: वे प्रकार A की एक कुंजी को प्रकार B के मान से मैप करती हैं। इस मामले में हम एक मालिक के पते को उसके Counter के इंस्टेंस के साथ मैप करते हैं।

किसी के लिए एक नया Counter इंस्टेंटिएट (instantiate) करना कुछ इस तरह दिखेगा:

```solidity
  function createCounter() public {
      require(address(_counters[msg.sender]) == address(0), "You already have a counter");
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

हम सबसे पहले यह जांचते हैं कि क्या व्यक्ति के पास पहले से ही एक काउंटर है। एक मैपिंग उन कुंजियों के लिए डिफ़ॉल्ट मान लौटाती है जो कभी सेट नहीं की गई थीं, जो अनुबंध प्रकार के लिए शून्य पता है, इसलिए हम संग्रहीत अनुबंध के पते की तुलना `address(0)` से करते हैं। यदि उसके पास काउंटर नहीं है, तो हम उसके पते को `Counter` कंस्ट्रक्टर में पास करके एक नया काउंटर इंस्टेंटिएट करते हैं और नए बनाए गए इंस्टेंस को मैपिंग में असाइन करते हैं।

किसी विशिष्ट Counter की गिनती प्राप्त करने के लिए यह कुछ इस तरह दिखेगा:

```solidity
function getCount(address account) public view returns (uint256) {
    require(address(_counters[account]) != address(0), "This account has no counter");
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

पहला फ़ंक्शन यह जांचता है कि क्या दिए गए पते के लिए Counter अनुबंध मौजूद है और फिर इंस्टेंस से `getCount` विधि को कॉल करता है। दूसरा फ़ंक्शन: `getMyCount` msg.sender को सीधे `getCount` फ़ंक्शन में पास करने का एक शॉर्टहैंड (shorthand) है।

`increment` फ़ंक्शन काफी समान है लेकिन मूल लेन-देन प्रेषक को `Counter` अनुबंध में पास करता है:

```solidity
function increment() public {
      require(address(_counters[msg.sender]) != address(0), "You need to create a counter first");
      _counters[msg.sender].increment(msg.sender);
  }
```

Solidity 0.8 के बाद से, अंकगणित [डिफ़ॉल्ट रूप से जांचा जाता है](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic): यदि `_count` कभी ओवरफ़्लो होता है, तो `_count++` चुपचाप रैप अराउंड करने के बजाय लेन-देन को रिवर्ट कर देगा, इसलिए SafeMath जैसी किसी अतिरिक्त लाइब्रेरी की आवश्यकता नहीं है।

हमारे अनुबंध को तैनात करने के लिए, आपको `CounterFactory` और `Counter` दोनों का कोड प्रदान करना होगा। उदाहरण के लिए Remix में तैनात करते समय आपको CounterFactory का चयन करना होगा।

यहाँ पूरा कोड दिया गया है:

```solidity
// SPDX-लाइसेंस-पहचानकर्ता: MIT
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

संकलन के बाद, Remix डिप्लॉय (deploy) अनुभाग में आप तैनात की जाने वाली फैक्ट्री का चयन करेंगे:

![Remix में तैनात की जाने वाली फैक्ट्री का चयन करना](./counterfactory-deploy.png)

फिर आप अपनी अनुबंध फैक्ट्री के साथ खेल सकते हैं और बदलते मान की जांच कर सकते हैं। यदि आप किसी भिन्न पते से स्मार्ट अनुबंध को कॉल करना चाहते हैं, तो आपको Remix के खाता चयन में पता बदलना होगा।
