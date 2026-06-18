---
title: ERC-20 टोकन स्मार्ट कॉन्ट्रॅक्ट समजून घ्या
description: संपूर्ण Solidity स्मार्ट कॉन्ट्रॅक्ट उदाहरणासह आणि स्पष्टीकरणासह ERC-20 टोकन मानक कसे लागू करावे ते शिका.
author: "jdourlens"
tags:
  - स्मार्ट कॉन्ट्रॅक्ट्स
  - टोकन्स
  - Solidity
  - ERC-20
skill: beginner
breadcrumb: ERC-20 टोकनच्या मूलभूत गोष्टी
lang: mr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

इथेरियमवरील सर्वात लक्षणीय [स्मार्ट कॉन्ट्रॅक्ट मानकांपैकी](/developers/docs/standards/) एक [ERC-20](/developers/docs/standards/tokens/erc-20/) म्हणून ओळखले जाते, जे विनिमयक्षम टोकन अंमलबजावणीसाठी इथेरियम ब्लॉकचेनवरील सर्व स्मार्ट कॉन्ट्रॅक्ट्ससाठी वापरले जाणारे तांत्रिक मानक म्हणून उदयास आले आहे.

ERC-20 नियमांची एक सामायिक सूची परिभाषित करते ज्याचे सर्व विनिमयक्षम इथेरियम टोकन्सनी पालन केले पाहिजे. परिणामी, हे टोकन मानक सर्व प्रकारच्या डेव्हलपर्सना मोठ्या इथेरियम प्रणालीमध्ये नवीन टोकन्स कसे कार्य करतील याचा अचूक अंदाज लावण्यास सक्षम करते. यामुळे डेव्हलपर्सची कामे सोपी आणि सुलभ होतात, कारण जोपर्यंत टोकन नियमांचे पालन करत आहे, तोपर्यंत प्रत्येक वेळी नवीन टोकन रिलीज झाल्यावर प्रत्येक नवीन प्रकल्प पुन्हा करण्याची आवश्यकता नसेल हे जाणून ते त्यांचे काम पुढे चालू ठेवू शकतात.

येथे, इंटरफेस म्हणून सादर केलेली, ERC-20 ने लागू करणे आवश्यक असलेली फंक्शन्स आहेत. जर तुम्हाला इंटरफेस म्हणजे काय याबद्दल खात्री नसेल: तर [Solidity मधील OOP प्रोग्रामिंग](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) बद्दलचा आमचा लेख तपासा.

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

## गेटर्स (Getters) {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

अस्तित्वात असलेल्या टोकन्सची रक्कम परत करते. हे फंक्शन एक गेटर आहे आणि कॉन्ट्रॅक्टची स्थिती बदलत नाही. लक्षात ठेवा की Solidity मध्ये कोणतेही फ्लोट्स (floats) नाहीत. त्यामुळे बहुतेक टोकन्स 18 दशांश स्वीकारतात आणि एकूण पुरवठा आणि इतर निकाल 1 टोकनसाठी 1000000000000000000 असे परत करतील. प्रत्येक टोकनमध्ये 18 दशांश नसतात आणि टोकन्स हाताळताना तुम्हाला याकडे खरोखर लक्ष देणे आवश्यक आहे.

```solidity
function balanceOf(address account) external view returns (uint256);
```

एखाद्या पत्त्याच्या (`account`) मालकीच्या टोकन्सची रक्कम परत करते. हे फंक्शन एक गेटर आहे आणि कॉन्ट्रॅक्टची स्थिती बदलत नाही.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 मानक एका पत्त्याला दुसऱ्या पत्त्यावरून टोकन्स मिळवण्यास सक्षम होण्यासाठी मंजुरी देण्याची परवानगी देते. हा गेटर उर्वरित टोकन्सची संख्या परत करतो जे `spender` ला `owner` च्या वतीने खर्च करण्याची परवानगी दिली जाईल. हे फंक्शन एक गेटर आहे आणि कॉन्ट्रॅक्टची स्थिती बदलत नाही आणि डीफॉल्टनुसार 0 परत केले पाहिजे.

## फंक्शन्स (Functions) {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

फंक्शन कॉलर पत्त्यावरून (`msg.sender`) प्राप्तकर्त्याच्या पत्त्यावर टोकन्सची `amount` हलवते. हे फंक्शन नंतर परिभाषित केलेली `Transfer` घटना उत्सर्जित करते. जर हस्तांतरण शक्य असेल तर ते true परत करते.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

फंक्शन कॉलरच्या (`msg.sender`) बॅलन्समधून `spender` ला हस्तांतरित करण्याची परवानगी असलेल्या `allowance` ची रक्कम सेट करा. हे फंक्शन Approval घटना उत्सर्जित करते. मंजुरी यशस्वीरित्या सेट केली गेली की नाही हे फंक्शन परत करते.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

मंजुरी यंत्रणेचा वापर करून `sender` वरून `recipient` वर टोकन्सची `amount` हलवते. त्यानंतर कॉलरच्या मंजुरीमधून रक्कम वजा केली जाते. हे फंक्शन `Transfer` घटना उत्सर्जित करते.

## घटना (Events) {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

जेव्हा टोकन्सची रक्कम (मूल्य) `from` पत्त्यावरून `to` पत्त्यावर पाठविली जाते तेव्हा ही घटना उत्सर्जित होते.

नवीन टोकन्स मिंटिंग करण्याच्या बाबतीत, हस्तांतरण सहसा 0x00..0000 पत्त्यावरून (`from`) होते, तर टोकन्स जाळण्याच्या बाबतीत हस्तांतरण 0x00..0000 पत्त्यावर (`to`) होते.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

जेव्हा टोकन्सची रक्कम (`value`) `owner` द्वारे `spender` ला वापरण्यासाठी मंजूर केली जाते तेव्हा ही घटना उत्सर्जित होते.

## ERC-20 टोकन्सची मूलभूत अंमलबजावणी {#a-basic-implementation-of-erc-20-tokens}

तुमचे ERC-20 टोकन आधारित करण्यासाठी येथे सर्वात सोपा कोड आहे:

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

ERC-20 टोकन मानकाची आणखी एक उत्कृष्ट अंमलबजावणी म्हणजे [ओपनझेपलिन ERC-20 अंमलबजावणी](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).