---
title: "Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें"
description: "मौजूदा अनुबंध से एक स्मार्ट अनुबंध को कैसे परिनियोजित करें और इसके साथ इंटरैक्ट करें"
author: "jdourlens"
tags:
  [
    "स्मार्ट अनुबंध",
    "सोलिडीटी",
    "remix",
    "परिनियोजित करना",
    "कम्पोज़ेबिलिटी"
  ]
skill: advanced
lang: hi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

पिछले ट्यूटोरियल में हमने बहुत कुछ सीखा [अपना पहला स्मार्ट अनुबंध कैसे परिनियोजित करें](/developers/tutorials/deploying-your-first-smart-contract/) और इसमें कुछ सुविधाएँ जोड़ें जैसे [मॉडिफ़ायर के साथ एक्सेस नियंत्रित करें](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) या [Solidity में त्रुटि संभालना](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)। इस ट्यूटोरियल में हम सीखेंगे कि किसी मौजूदा अनुबंध से स्मार्ट अनुबंध कैसे परिनियोजित करें और उसके साथ कैसे इंटरैक्ट करें।

हम एक अनुबंध बनाएंगे जो किसी को भी इसके लिए एक फ़ैक्टरी बनाकर अपना `Counter` स्मार्ट अनुबंध रखने में सक्षम बनाता है, इसका नाम `CounterFactory` होगा। सबसे पहले, यहाँ हमारे शुरुआती `Counter` स्मार्ट अनुबंध का कोड है:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "आप अनुबंध के मालिक नहीं हैं");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "आपको फ़ैक्टरी का उपयोग करने की आवश्यकता है");
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

ध्यान दें कि हमने फ़ैक्टरी के पते और अनुबंध के मालिक के पते का ट्रैक रखने के लिए अनुबंध कोड को थोड़ा संशोधित किया है। जब आप किसी अन्य अनुबंध से अनुबंध कोड को कॉल करते हैं, तो msg.sender हमारे अनुबंध फ़ैक्टरी के पते को संदर्भित करेगा। यह समझने के लिए **वास्तव में एक महत्वपूर्ण बिंदु है** क्योंकि अन्य अनुबंधों के साथ इंटरैक्ट करने के लिए एक अनुबंध का उपयोग करना एक आम बात है। इसलिए आपको जटिल मामलों में इस बात का ध्यान रखना चाहिए कि प्रेषक कौन है।

इसके लिए हमने एक `onlyFactory` मॉडिफ़ायर भी जोड़ा है जो यह सुनिश्चित करता है कि स्टेट चेंजिंग फ़ंक्शन को केवल फ़ैक्टरी द्वारा ही कॉल किया जा सकता है जो मूल कॉलर को एक पैरामीटर के रूप में पास करेगा।

हमारे नए `CounterFactory` के अंदर जो अन्य सभी काउंटरों का प्रबंधन करेगा, हम एक मैपिंग जोड़ेंगे जो एक मालिक को उसके काउंटर अनुबंध के पते से जोड़ेगा:

```solidity
mapping(address => Counter) _counters;
```

एथेरियम में, मैपिंग जावास्क्रिप्ट में ऑब्जेक्ट के बराबर हैं, वे टाइप A की कुंजी को टाइप B के मान पर मैप करने में सक्षम करते हैं। इस मामले में हम एक मालिक के पते को उसके काउंटर के इंस्टेंस के साथ मैप करते हैं।

किसी के लिए एक नया काउंटर इंस्टैंशिएट करना कुछ इस तरह दिखेगा:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

हम पहले जांचते हैं कि क्या व्यक्ति के पास पहले से ही एक काउंटर है। यदि उसके पास कोई काउंटर नहीं है, तो हम `Counter` कंस्ट्रक्टर को उसका पता पास करके एक नया काउंटर इंस्टैंशिएट करते हैं और नए बनाए गए इंस्टेंस को मैपिंग को असाइन करते हैं।

किसी विशिष्ट काउंटर की गिनती प्राप्त करने के लिए यह इस तरह दिखेगा:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

पहला फ़ंक्शन जांचता है कि दिए गए पते के लिए काउंटर अनुबंध मौजूद है या नहीं और फिर इंस्टेंस से `getCount` विधि को कॉल करता है। दूसरा फ़ंक्शन: `getMyCount` बस msg.sender को सीधे `getCount` फ़ंक्शन में पास करने का एक छोटा तरीका है।

`increment` फ़ंक्शन काफी समान है, लेकिन मूल लेनदेन प्रेषक को `Counter` अनुबंध में पास करता है:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

ध्यान दें कि यदि बहुत बार कॉल किया जाता है, तो हमारा काउंटर संभवतः ओवरफ़्लो का शिकार हो सकता है। इस संभावित मामले से बचाने के लिए आपको जितना संभव हो सके [सेफमैथ लाइब्रेरी](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) का उपयोग करना चाहिए।

हमारे अनुबंध को परिनियोजित करने के लिए, आपको `CounterFactory` और `Counter` दोनों का कोड प्रदान करना होगा। उदाहरण के लिए रीमिक्स में परिनियोजित करते समय आपको काउंटरफैक्ट्री का चयन करना होगा।

यहाँ पूरा कोड है:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "आप अनुबंध के मालिक नहीं हैं");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "आपको फ़ैक्टरी का उपयोग करने की आवश्यकता है");
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

संकलन के बाद, रीमिक्स परिनियोजन अनुभाग में आप परिनियोजित की जाने वाली फ़ैक्टरी का चयन करेंगे:

![रीमिक्स में परिनियोजित की जाने वाली फ़ैक्टरी का चयन करना](./counterfactory-deploy.png)

फिर आप अपनी अनुबंध फ़ैक्टरी के साथ खेल सकते हैं और मान को बदलते हुए देख सकते हैं। यदि आप किसी भिन्न पते से स्मार्ट अनुबंध को कॉल करना चाहते हैं तो आपको रीमिक्स के खाता चयन में पता बदलना होगा।
