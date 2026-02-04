---
title: ERC-20 टोकन स्मार्ट कॉन्ट्रॅक्ट समजून घ्या
description: संपूर्ण सॉलिडिटी स्मार्ट कॉन्ट्रॅक्ट उदाहरण आणि स्पष्टीकरणासह ERC-20 टोकन स्टँडर्ड कसे अंमलात आणायचे ते शिका.
author: "jdourlens"
tags: [ "स्मार्ट कॉन्ट्रॅक्ट", "tokens", "सॉलिडिटी", "erc-20" ]
skill: beginner
lang: mr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum वरील सर्वात महत्त्वाच्या [स्मार्ट कॉन्ट्रॅक्ट स्टँडर्ड्सपैकी](/developers/docs/standards/) एक [ERC-20](/developers/docs/standards/tokens/erc-20/) म्हणून ओळखले जाते, जे फंजिबल टोकन अंमलबजावणीसाठी Ethereum ब्लॉकचेनवरील सर्व स्मार्ट कॉन्ट्रॅक्ट्ससाठी वापरले जाणारे तांत्रिक मानक म्हणून उदयास आले आहे.

ERC-20 नियमांची एक सामान्य सूची परिभाषित करते ज्याचे सर्व फंजिबल Ethereum टोकन्सनी पालन केले पाहिजे. परिणामी, हे टोकन स्टँडर्ड सर्व प्रकारच्या डेव्हलपर्सना मोठ्या Ethereum प्रणालीमध्ये नवीन टोकन कसे कार्य करतील याचा अचूक अंदाज लावण्यास सक्षम करते. हे डेव्हलपर्सची कामे सोपी करते, कारण ते आपले काम पुढे चालू ठेवू शकतात, हे जाणून की प्रत्येक नवीन प्रोजेक्टला प्रत्येक वेळी नवीन टोकन रिलीज झाल्यावर पुन्हा करण्याची आवश्यकता भासणार नाही, जोपर्यंत टोकन नियमांचे पालन करते.

येथे, एका इंटरफेसच्या स्वरूपात सादर केलेले, ERC-20 ने अंमलात आणायलाच हवे असे फंक्शन्स आहेत. जर तुम्हाला इंटरफेस म्हणजे काय याबद्दल खात्री नसेल तर: [Solidity मध्ये OOP प्रोग्रामिंग](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) वरील आमचा लेख तपासा.

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

प्रत्येक फंक्शन कशासाठी आहे याचे ओळीनुसार स्पष्टीकरण येथे दिले आहे. यानंतर आम्ही ERC-20 टोकनची एक सोपी अंमलबजावणी सादर करू.

## गेटर्स {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

अस्तित्वात असलेल्या टोकन्सची संख्या परत करते. हे फंक्शन एक गेटर आहे आणि कॉन्ट्रॅक्टची स्थिती बदलत नाही. लक्षात ठेवा की सॉलिडिटीमध्ये फ्लोट्स नाहीत. म्हणून, बहुतेक टोकन्स 18 डेसिमल्सचा अवलंब करतात आणि 1 टोकनसाठी 1000000000000000000 असा एकूण पुरवठा आणि इतर परिणाम परत करतील. प्रत्येक टोकनमध्ये 18 डेसिमल्स नसतात आणि टोकन्स हाताळताना ही एक गोष्ट आहे ज्याकडे तुम्हाला खरोखर लक्ष देणे आवश्यक आहे.

```solidity
function balanceOf(address account) external view returns (uint256);
```

एखाद्या ॲड्रेसच्या (`account`) मालकीच्या टोकन्सची संख्या परत करते. हे फंक्शन एक गेटर आहे आणि कॉन्ट्रॅक्टची स्थिती बदलत नाही.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 स्टँडर्ड एका ॲड्रेसला दुसऱ्या ॲड्रेसला त्यातून टोकन मिळवण्यास सक्षम होण्यासाठी भत्ता देण्याची परवानगी देते. हे गेटर `spender` ला `owner` च्या वतीने खर्च करण्याची परवानगी असलेल्या टोकनची उर्वरित संख्या परत करते. हे फंक्शन एक गेटर आहे आणि कॉन्ट्रॅक्टची स्थिती बदलत नाही आणि डीफॉल्टनुसार 0 परत केले पाहिजे.

## फंक्शन्स {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

हे फंक्शन कॉलर ॲड्रेस (`msg.sender`) वरून प्राप्तकर्त्याच्या ॲड्रेसवर टोकन्सची `amount` हलवते. हे फंक्शन नंतर परिभाषित केलेला `Transfer` इव्हेंट उत्सर्जित करते. जर हस्तांतरण शक्य असेल तर ते true परत करते.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

फंक्शन कॉलर (`msg.sender`) च्या बॅलन्समधून `spender` ला हस्तांतरित करण्याची परवानगी असलेल्या `allowance` ची रक्कम सेट करा. हे फंक्शन Approval इव्हेंट उत्सर्जित करते. फंक्शन भत्ता यशस्वीरित्या सेट झाला होता की नाही हे परत करते.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

अलाउन्स मेकॅनिझम वापरून `sender` कडून `recipient` कडे टोकनची `amount` हलवते. त्यानंतर कॉलरच्या भत्त्यामधून रक्कम कापली जाते. हे फंक्शन `Transfer` इव्हेंट उत्सर्जित करते.

## इव्हेंट्स {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

हा इव्हेंट तेव्हा उत्सर्जित होतो जेव्हा टोकनची रक्कम (व्हॅल्यू) `from` ॲड्रेसवरून `to` ॲड्रेसवर पाठविली जाते.

नवीन टोकन मिंट करण्याच्या बाबतीत, हस्तांतरण सामान्यतः 0x00..0000 ॲड्रेस `from` होते तर टोकन बर्न करण्याच्या बाबतीत हस्तांतरण 0x00..0000 `to` होते.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

हा इव्हेंट तेव्हा उत्सर्जित होतो जेव्हा `owner` द्वारे `spender` ला वापरण्यासाठी टोकन्सची रक्कम (`value`) मंजूर केली जाते.

## ERC-20 टोकन्सची मूलभूत अंमलबजावणी {#a-basic-implementation-of-erc-20-tokens}

तुमच्या ERC-20 टोकनचा आधार घेण्यासाठी येथे सर्वात सोपा कोड आहे:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

ERC-20 टोकन स्टँडर्डची आणखी एक उत्कृष्ट अंमलबजावणी म्हणजे [OpenZeppelin ERC-20 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
