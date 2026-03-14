---
title: "Solidity मधून इतर कॉन्ट्रॅक्ट्सशी संवाद साधा"
description: "विद्यमान कॉन्ट्रॅक्टमधून स्मार्ट कॉन्ट्रॅक्ट कसे डिप्लॉय करावे आणि त्याच्याशी संवाद कसा साधावा"
author: "jdourlens"
tags:
  [
    "स्मार्ट कॉन्ट्रॅक्ट",
    "सॉलिडिटी",
    "रीमिक्स",
    "डिप्लॉयिंग",
    "कंपोझेबिलिटी"
  ]
skill: advanced
lang: mr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

मागील ट्यूटोरियल्समध्ये आपण बरेच काही शिकलो [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट कसा डिप्लॉय करायचा](/developers/tutorials/deploying-your-first-smart-contract/) आणि त्यात काही वैशिष्ट्ये कशी जोडायची जसे की [मॉडिफायर्ससह ऍक्सेस नियंत्रित करणे](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) किंवा [Solidity मध्ये त्रुटी हाताळणे](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). या ट्यूटोरियलमध्ये, आपण विद्यमान कॉन्ट्रॅक्टमधून स्मार्ट कॉन्ट्रॅक्ट कसे डिप्लॉय करावे आणि त्याच्याशी संवाद कसा साधावा हे शिकू.

आम्ही एक कॉन्ट्रॅक्ट बनवू जो कोणालाही त्याचा स्वतःचा `Counter` स्मार्ट कॉन्ट्रॅक्ट तयार करण्यास सक्षम करेल, त्यासाठी एक फॅक्टरी तयार करून, त्याचे नाव `CounterFactory` असेल. सर्वप्रथम, आमच्या सुरुवातीच्या `Counter` स्मार्ट कॉन्ट्रॅक्टचा कोड येथे आहे:

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

लक्षात घ्या की फॅक्टरीचा ॲड्रेस आणि कॉन्ट्रॅक्ट मालकाचा ॲड्रेस यांचा मागोवा ठेवण्यासाठी आम्ही कॉन्ट्रॅक्ट कोडमध्ये थोडा बदल केला आहे. जेव्हा तुम्ही दुसऱ्या कॉन्ट्रॅक्टमधून कॉन्ट्रॅक्ट कोडला कॉल करता, तेव्हा msg.sender आमच्या कॉन्ट्रॅक्ट फॅक्टरीच्या ॲड्रेसचा संदर्भ देईल. हा **समजून घेण्यासाठी एक खरोखर महत्त्वाचा मुद्दा आहे** कारण इतर कॉन्ट्रॅक्ट्सशी संवाद साधण्यासाठी कॉन्ट्रॅक्ट वापरणे ही एक सामान्य प्रथा आहे. त्यामुळे, गुंतागुंतीच्या प्रकरणांमध्ये सेंडर कोण आहे याची आपण काळजी घेतली पाहिजे.

यासाठी आम्ही एक `onlyFactory` मॉडिफायर देखील जोडला आहे जो हे सुनिश्चित करतो की स्टेट बदलणारे फंक्शन फक्त फॅक्टरीद्वारे कॉल केले जाऊ शकते, जे मूळ कॉलरला पॅरामीटर म्हणून पास करेल.

आमच्या नवीन `CounterFactory` च्या आत, जे इतर सर्व काउंटर्स व्यवस्थापित करेल, आम्ही एक मॅपिंग जोडू जे मालकाला त्याच्या काउंटर कॉन्ट्रॅक्टच्या ॲड्रेसशी जोडेल:

```solidity
mapping(address => Counter) _counters;
```

Ethereum मध्ये, मॅपिंग हे javascript मधील ऑब्जेक्ट्सच्या समतुल्य आहेत, ते A प्रकारच्या की ला B प्रकारच्या व्हॅल्यूवर मॅप करण्यास सक्षम करतात. या प्रकरणात आपण मालकाच्या ॲड्रेसला त्याच्या काउंटरच्या इन्स्टन्ससह मॅप करतो.

कोणासाठीही नवीन काउंटर सुरू करणे असे दिसेल:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

आम्ही प्रथम तपासतो की त्या व्यक्तीकडे आधीपासूनच काउंटर आहे की नाही. जर त्याच्याकडे काउंटर नसेल, तर आम्ही त्याचा ॲड्रेस `Counter` कन्स्ट्रक्टरला पास करून एक नवीन काउंटर सुरू करतो आणि नव्याने तयार केलेला इन्स्टन्स मॅपिंगला नियुक्त करतो.

विशिष्ट काउंटरची गणना मिळविण्यासाठी ते असे दिसेल:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

पहिले फंक्शन तपासते की दिलेल्या ॲड्रेससाठी काउंटर कॉन्ट्रॅक्ट अस्तित्वात आहे की नाही आणि नंतर इन्स्टन्समधून `getCount` पद्धत कॉल करते. दुसरे फंक्शन: `getMyCount` हे `getCount` फंक्शनला थेट msg.sender पास करण्यासाठी एक छोटा मार्ग आहे.

`increment` फंक्शन बऱ्यापैकी समान आहे परंतु मूळ ट्रान्झॅक्शन सेंडरला `Counter` कॉन्ट्रॅक्टकडे पास करते:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

लक्षात घ्या की जर खूप वेळा कॉल केला गेला, तर आमचा काउंटर संभाव्यतः ओव्हरफ्लोचा बळी ठरू शकतो. या संभाव्य प्रकरणापासून संरक्षण करण्यासाठी आपण शक्य तितके [SafeMath लायब्ररी](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) वापरली पाहिजे.

आमचा कॉन्ट्रॅक्ट डिप्लॉय करण्यासाठी, तुम्हाला `CounterFactory` आणि `Counter` या दोन्हीचा कोड प्रदान करणे आवश्यक असेल. उदाहरणार्थ Remix मध्ये डिप्लॉय करताना तुम्हाला CounterFactory निवडण्याची आवश्यकता असेल.

येथे संपूर्ण कोड आहे:

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

कम्पाइल केल्यानंतर, Remix डिप्लॉय विभागात तुम्ही डिप्लॉय करण्यासाठी फॅक्टरी निवडाल:

![Remix मध्ये डिप्लॉय करण्यासाठी फॅक्टरी निवडणे](./counterfactory-deploy.png)

त्यानंतर तुम्ही तुमच्या कॉन्ट्रॅक्ट फॅक्टरीसोबत खेळू शकता आणि बदलणारे मूल्य तपासू शकता. तुम्हाला स्मार्ट कॉन्ट्रॅक्टला वेगळ्या ॲड्रेसवरून कॉल करायचा असल्यास, तुम्हाला Remix च्या अकाउंट निवडीमध्ये ॲड्रेस बदलावा लागेल.
