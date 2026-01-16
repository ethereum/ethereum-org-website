---
title: "ERC-20 टोकन स्मार्ट अनुबंध को समझें"
description: "पूर्ण सॉलिडिटी स्मार्ट अनुबंध उदाहरण और स्पष्टीकरण के साथ ERC-20 टोकन मानक को लागू करने का तरीका जानें।"
author: "jdourlens"
tags: [ "स्मार्ट अनुबंध", "टोकन", "सोलिडीटी", "erc-20" ]
skill: beginner
lang: hi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

एथेरियम पर सबसे महत्वपूर्ण [स्मार्ट अनुबंध मानकों](/developers/docs/standards/) में से एक को [ERC-20](/developers/docs/standards/tokens/erc-20/) के रूप में जाना जाता है, जो कि फंजिबल टोकन कार्यान्वयन के लिए एथेरियम ब्लॉकचेन पर सभी स्मार्ट अनुबंधों के लिए उपयोग किए जाने वाले तकनीकी मानक के रूप में उभरा है।

ERC-20 उन सामान्य नियमों की सूची को परिभाषित करता है जिनका सभी फंजिबल एथेरियम टोकन को पालन करना चाहिए। परिणामस्वरूप, यह टोकन मानक सभी प्रकार के डेवलपर्स को सटीक रूप से भविष्यवाणी करने का अधिकार देता है कि नए टोकन बड़े एथेरियम सिस्टम के भीतर कैसे काम करेंगे। यह डेवलपर्स के कार्यों को सरल और आसान बनाता है, क्योंकि वे यह जानते हुए अपने काम के साथ आगे बढ़ सकते हैं कि हर बार एक नया टोकन जारी होने पर प्रत्येक नए प्रोजेक्ट को फिर से करने की आवश्यकता नहीं होगी, जब तक कि टोकन नियमों का पालन करता है।

यहां, एक इंटरफ़ेस के रूप में प्रस्तुत किया गया है, वे फ़ंक्शन हैं जिन्हें एक ERC-20 को लागू करना होगा। यदि आप सुनिश्चित नहीं हैं कि एक इंटरफ़ेस क्या है: [Solidity में OOP प्रोग्रामिंग](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) पर हमारा लेख देखें।

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

यहां प्रत्येक फ़ंक्शन किस लिए है, इसकी लाइन-दर-लाइन व्याख्या दी गई है। इसके बाद हम ERC-20 टोकन का एक सरल कार्यान्वयन प्रस्तुत करेंगे।

## गेटर्स {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

अस्तित्व में टोकन की मात्रा लौटाता है। यह फ़ंक्शन एक गेटर है और अनुबंध की स्थिति को संशोधित नहीं करता है। ध्यान रखें कि सॉलिडिटी में कोई फ़्लोट नहीं हैं। इसलिए अधिकांश टोकन 18 दशमलव अपनाते हैं और 1 टोकन के लिए कुल आपूर्ति और अन्य परिणाम 1000000000000000000 के रूप में लौटाएंगे। हर टोकन में 18 दशमलव नहीं होते हैं और यह कुछ ऐसा है जिस पर आपको टोकन से निपटने के दौरान वास्तव में ध्यान देने की आवश्यकता है।

```solidity
function balanceOf(address account) external view returns (uint256);
```

एक पते (`account`) के स्वामित्व वाले टोकन की मात्रा लौटाता है। यह फ़ंक्शन एक गेटर है और अनुबंध की स्थिति को संशोधित नहीं करता है।

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 मानक एक पते को दूसरे पते को भत्ता देने की अनुमति देता है ताकि उससे टोकन प्राप्त किया जा सके। यह गेटर उन टोकन की शेष संख्या लौटाता है जिन्हें `spender` को `owner` की ओर से खर्च करने की अनुमति होगी। यह फ़ंक्शन एक गेटर है और अनुबंध की स्थिति को संशोधित नहीं करता है और डिफ़ॉल्ट रूप से 0 लौटाना चाहिए।

## फ़ंक्शन {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

फ़ंक्शन कॉलर पते (`msg.sender`) से प्राप्तकर्ता पते पर टोकन की `amount` ले जाता है। यह फ़ंक्शन बाद में परिभाषित `Transfer` इवेंट का उत्सर्जन करता है। यदि स्थानांतरण संभव था तो यह सही लौटाता है।

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`allowance` की राशि सेट करें जिसे `spender` को फ़ंक्शन कॉलर (`msg.sender`) बैलेंस से स्थानांतरित करने की अनुमति है। यह फ़ंक्शन Approval इवेंट का उत्सर्जन करता है। फ़ंक्शन यह लौटाता है कि भत्ता सफलतापूर्वक सेट किया गया था या नहीं।

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

`sender` से `recipient` को भत्ता तंत्र का उपयोग करके टोकन की `amount` ले जाता है। फिर राशि कॉलर के भत्ते से काट ली जाती है। यह फ़ंक्शन `Transfer` इवेंट का उत्सर्जन करता है।

## घटनाएँ {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

यह इवेंट तब उत्सर्जित होता है जब टोकन की मात्रा (value) `from` पते से `to` पते पर भेजी जाती है।

नए टोकन मिंट करने के मामले में, स्थानांतरण आमतौर पर 0x00..0000 पते `from` होता है, जबकि टोकन बर्न करने के मामले में स्थानांतरण 0x00..0000 `to` होता है।

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

यह इवेंट तब उत्सर्जित होता है जब `owner` द्वारा `spender` द्वारा उपयोग किए जाने के लिए टोकन की राशि (`value`) को मंजूरी दी जाती है।

## ERC-20 टोकन का एक बुनियादी कार्यान्वयन {#a-basic-implementation-of-erc-20-tokens}

यहाँ आपके ERC-20 टोकन को आधारित करने के लिए सबसे सरल कोड है:

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

ERC-20 टोकन मानक का एक और उत्कृष्ट कार्यान्वयन [OpenZeppelin ERC-20 कार्यान्वयन](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) है।
