---
title: "Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें"
description: "किसी मौजूदा अनुबंध से स्मार्ट अनुबंध को कैसे तैनात करें और उसके साथ इंटरैक्ट करें"
author: "jdourlens"
tags: ["स्मार्ट अनुबंध", "Solidity", "Remix", "तैनात करना", "कंपोज़ेबिलिटी"]
skill: advanced
breadcrumb: "अनुबंध इंटरैक्शन"
lang: hi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

पिछले ट्यूटोरियल में हमने [अपना पहला स्मार्ट अनुबंध कैसे तैनात करें](/developers/tutorials/deploying-your-first-smart-contract/) और इसमें कुछ सुविधाएँ कैसे जोड़ें जैसे [मॉडिफ़ायर के साथ एक्सेस को नियंत्रित करना](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) या [Solidity में एरर हैंडलिंग](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) के बारे में बहुत कुछ सीखा। इस ट्यूटोरियल में हम सीखेंगे कि किसी मौजूदा अनुबंध से स्मार्ट अनुबंध को कैसे तैनात करें और उसके साथ कैसे इंटरैक्ट करें।

हम एक ऐसा अनुबंध बनाएंगे जो किसी को भी इसके लिए एक फ़ैक्टरी बनाकर अपना स्वयं का `Counter` स्मार्ट अनुबंध रखने में सक्षम बनाता है, इसका नाम `CounterFactory` होगा। सबसे पहले यहाँ हमारे शुरुआती `Counter` स्मार्ट अनुबंध का कोड दिया गया है:

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

ध्यान दें कि हमने फ़ैक्टरी के पते और अनुबंध के मालिक के पते का ट्रैक रखने के लिए अनुबंध कोड को थोड़ा संशोधित किया है। जब आप किसी अन्य अनुबंध से अनुबंध कोड को कॉल करते हैं, तो msg.sender हमारी अनुबंध फ़ैक्टरी के पते को संदर्भित करेगा। यह **समझने के लिए वास्तव में एक महत्वपूर्ण बिंदु है** क्योंकि अन्य अनुबंधों के साथ इंटरैक्ट करने के लिए अनुबंध का उपयोग करना एक आम बात है। इसलिए आपको जटिल मामलों में इस बात का ध्यान रखना चाहिए कि प्रेषक कौन है।

इसके लिए हमने एक `onlyFactory` मॉडिफ़ायर भी जोड़ा है जो यह सुनिश्चित करता है कि स्थिति बदलने वाले फ़ंक्शन को केवल उस फ़ैक्टरी द्वारा कॉल किया जा सकता है जो मूल कॉलर को पैरामीटर के रूप में पास करेगा।

हमारे नए `CounterFactory` के अंदर जो अन्य सभी Counters को प्रबंधित करेगा, हम एक मैपिंग जोड़ेंगे जो एक मालिक को उसके काउंटर अनुबंध के पते से जोड़ेगी:

```solidity
mapping(address => Counter) _counters;
```

इथेरियम में, मैपिंग JavaScript में ऑब्जेक्ट्स के समतुल्य हैं, वे टाइप A की कुंजी को टाइप B के मान से मैप करने में सक्षम बनाते हैं। इस मामले में हम एक मालिक के पते को उसके Counter के इंस्टेंस के साथ मैप करते हैं।

किसी के लिए एक नया Counter इंस्टेंटिएट करना कुछ इस तरह दिखेगा:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

हम सबसे पहले यह जांचते हैं कि क्या व्यक्ति के पास पहले से ही एक काउंटर है। यदि उसके पास काउंटर नहीं है, तो हम उसके पते को `Counter` कंस्ट्रक्टर में पास करके एक नया काउंटर इंस्टेंटिएट करते हैं और नए बनाए गए इंस्टेंस को मैपिंग में असाइन करते हैं।

किसी विशिष्ट Counter की गिनती प्राप्त करने के लिए यह कुछ इस तरह दिखेगा:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

पहला फ़ंक्शन यह जांचता है कि क्या दिए गए पते के लिए Counter अनुबंध मौजूद है और फिर इंस्टेंस से `getCount` विधि को कॉल करता है। दूसरा फ़ंक्शन: `getMyCount` msg.sender को सीधे `getCount` फ़ंक्शन में पास करने का एक शॉर्टकट है।

`increment` फ़ंक्शन काफी समान है लेकिन मूल लेन-देन प्रेषक को `Counter` अनुबंध में पास करता है:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

ध्यान दें कि यदि इसे कई बार कॉल किया जाता है, तो हमारा काउंटर संभवतः ओवरफ़्लो का शिकार हो सकता है। इस संभावित मामले से बचने के लिए आपको जितना संभव हो सके [SafeMath लाइब्रेरी](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) का उपयोग करना चाहिए।

हमारे अनुबंध को तैनात करने के लिए, आपको `CounterFactory` और `Counter` दोनों का कोड प्रदान करना होगा। उदाहरण के लिए Remix में तैनात करते समय आपको CounterFactory का चयन करना होगा।

यहाँ पूरा कोड दिया गया है:

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

संकलन के बाद, Remix डिप्लॉय अनुभाग में आप तैनात की जाने वाली फ़ैक्टरी का चयन करेंगे:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

फिर आप अपनी अनुबंध फ़ैक्टरी के साथ प्रयोग कर सकते हैं और बदलते मान की जांच कर सकते हैं। यदि आप किसी भिन्न पते से स्मार्ट अनुबंध को कॉल करना चाहते हैं, तो आपको Remix के Account चयन में पता बदलना होगा।