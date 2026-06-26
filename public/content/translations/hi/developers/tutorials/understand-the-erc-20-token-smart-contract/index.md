---
title: "ERC-20 टोकन स्मार्ट अनुबंध को समझें"
description: "एक संपूर्ण Solidity स्मार्ट अनुबंध उदाहरण और स्पष्टीकरण के साथ ERC-20 टोकन मानक को लागू करना सीखें।"
author: "jdourlens"
tags: ["स्मार्ट अनुबंध", "टोकन", "Solidity", "erc-20"]
skill: beginner
breadcrumb: "ERC-20 टोकन की मूल बातें"
lang: hi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

इथेरियम पर सबसे महत्वपूर्ण [स्मार्ट अनुबंध मानकों](/developers/docs/standards/) में से एक को [ERC-20](/developers/docs/standards/tokens/erc-20/) के रूप में जाना जाता है, जो विनिमेय टोकन (fungible token) कार्यान्वयन के लिए इथेरियम ब्लॉकचेन पर सभी स्मार्ट अनुबंधों के लिए उपयोग किए जाने वाले तकनीकी मानक के रूप में उभरा है।

ERC-20 नियमों की एक सामान्य सूची को परिभाषित करता है जिसका सभी विनिमेय इथेरियम टोकन को पालन करना चाहिए। नतीजतन, यह टोकन मानक सभी प्रकार के डेवलपर्स को सटीक भविष्यवाणी करने का अधिकार देता है कि नए टोकन बड़े इथेरियम सिस्टम के भीतर कैसे कार्य करेंगे। यह डेवलपर्स के कार्यों को सरल और आसान बनाता है, क्योंकि वे अपना काम यह जानकर जारी रख सकते हैं कि जब तक टोकन नियमों का पालन करता है, तब तक हर बार नया टोकन जारी होने पर प्रत्येक नए प्रोजेक्ट को फिर से करने की आवश्यकता नहीं होगी।

यहाँ एक इंटरफ़ेस के रूप में प्रस्तुत किया गया है, वे फ़ंक्शन जिन्हें एक ERC-20 को लागू करना चाहिए। यदि आप सुनिश्चित नहीं हैं कि इंटरफ़ेस क्या है: तो [Solidity में OOP प्रोग्रामिंग](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) के बारे में हमारा लेख देखें।

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

यहाँ प्रत्येक फ़ंक्शन के उद्देश्य का पंक्ति-दर-पंक्ति स्पष्टीकरण दिया गया है। इसके बाद हम ERC-20 टोकन का एक सरल कार्यान्वयन प्रस्तुत करेंगे।

## गेटर्स (Getters) {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

अस्तित्व में मौजूद टोकन की मात्रा लौटाता है। यह फ़ंक्शन एक गेटर है और अनुबंध की स्थिति (state) को संशोधित नहीं करता है। ध्यान रखें कि Solidity में कोई फ्लोट (floats) नहीं होते हैं। इसलिए अधिकांश टोकन 18 दशमलव (decimals) अपनाते हैं और कुल आपूर्ति और अन्य परिणाम 1 टोकन के लिए 1000000000000000000 के रूप में लौटाएंगे। हर टोकन में 18 दशमलव नहीं होते हैं और टोकन के साथ काम करते समय आपको वास्तव में इस पर ध्यान देने की आवश्यकता है।

```solidity
function balanceOf(address account) external view returns (uint256);
```

किसी पते (`account`) के स्वामित्व वाले टोकन की मात्रा लौटाता है। यह फ़ंक्शन एक गेटर है और अनुबंध की स्थिति को संशोधित नहीं करता है।

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 मानक एक पते को दूसरे पते को व्यय सीमा (allowance) देने की अनुमति देता है ताकि वह उससे टोकन प्राप्त कर सके। यह गेटर उन शेष टोकन की संख्या लौटाता है जिन्हें `spender` को `owner` की ओर से खर्च करने की अनुमति होगी। यह फ़ंक्शन एक गेटर है और अनुबंध की स्थिति को संशोधित नहीं करता है और डिफ़ॉल्ट रूप से 0 लौटाना चाहिए।

## फ़ंक्शंस (Functions) {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

टोकन की `amount` को फ़ंक्शन कॉलर पते (`msg.sender`) से प्राप्तकर्ता पते पर ट्रांसफर करता है। यह फ़ंक्शन बाद में परिभाषित `Transfer` घटना (event) को उत्सर्जित (emit) करता है। यदि ट्रांसफर संभव था तो यह true लौटाता है।

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`allowance` की वह मात्रा सेट करें जिसे `spender` को फ़ंक्शन कॉलर (`msg.sender`) के बैलेंस से ट्रांसफर करने की अनुमति है। यह फ़ंक्शन Approval घटना को उत्सर्जित करता है। फ़ंक्शन यह लौटाता है कि क्या व्यय सीमा सफलतापूर्वक सेट की गई थी।

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

व्यय सीमा तंत्र का उपयोग करके टोकन की `amount` को `sender` से `recipient` में ट्रांसफर करता है। फिर कॉलर की व्यय सीमा से राशि काट ली जाती है। यह फ़ंक्शन `Transfer` घटना को उत्सर्जित करता है।

## घटनाएँ (Events) {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

यह घटना तब उत्सर्जित होती है जब टोकन की मात्रा (value) `from` पते से `to` पते पर भेजी जाती है।

नए टोकन की मिंटिंग के मामले में, ट्रांसफर आमतौर पर 0x00..0000 पते से (`from`) होता है, जबकि टोकन को बर्न करने के मामले में ट्रांसफर 0x00..0000 को (`to`) होता है।

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

यह घटना तब उत्सर्जित होती है जब टोकन की मात्रा (`value`) को `owner` द्वारा `spender` के उपयोग के लिए अनुमोदित किया जाता है।

## ERC-20 टोकन का एक बुनियादी कार्यान्वयन {#a-basic-implementation-of-erc-20-tokens}

यहाँ आपके ERC-20 टोकन को आधार बनाने के लिए सबसे सरल कोड दिया गया है:

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

ERC-20 टोकन मानक का एक और उत्कृष्ट कार्यान्वयन [ओपनजेपेलिन ERC-20 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) है।