---
title: सॉलिडिटी स्मार्ट अनुबंध से ERC-20 टोकन का स्थानांतरण और अनुमोदन
description: सॉलिडिटी का उपयोग करके एक DEX स्मार्ट अनुबंध बनाएँ जो ERC-20 टोकन स्थानांतरण और अनुमोदन को संभालता है।
author: "jdourlens"
tags: [ "स्मार्ट अनुबंध", "टोकन", "सोलिडीटी", "erc-20" ]
skill: intermediate
lang: hi
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

पिछले ट्यूटोरियल में हमने एथेरियम ब्लॉकचेन पर [सॉलिडिटी में एक ERC-20 टोकन की शारीरिक रचना](/developers/tutorials/understand-the-erc-20-token-smart-contract/) का अध्ययन किया। इस लेख में हम देखेंगे कि हम सॉलिडिटी भाषा का उपयोग करके एक टोकन के साथ इंटरैक्ट करने के लिए एक स्मार्ट अनुबंध का उपयोग कैसे कर सकते हैं।

इस स्मार्ट अनुबंध के लिए, हम एक वास्तविक डमी विकेंद्रीकृत एक्सचेंज बनाएंगे जहां एक यूज़र हमारे नए तैनात [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) के लिए ईथर का ट्रेड कर सकता है।

इस ट्यूटोरियल के लिए हम आधार के रूप में पिछले ट्यूटोरियल में लिखे गए कोड का उपयोग करेंगे। हमारा DEX अपने कंस्ट्रक्टर में अनुबंध का एक उदाहरण तत्काल करेगा और इसके संचालन करेगा:

- टोकन को ईथर में एक्सचेंज करना
- ईथर को टोकन में एक्सचेंज करना

हम अपना सरल ERC20 कोडबेस जोड़कर अपना विकेंद्रीकृत एक्सचेंज कोड शुरू करेंगे:

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

हमारा नया DEX स्मार्ट अनुबंध ERC-20 को तैनात करेगा और सभी आपूर्ति प्राप्त करेगा:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

तो अब हमारे पास अपना DEX है और इसमें सभी टोकन रिज़र्व उपलब्ध हैं। अनुबंध में दो फ़ंक्शन हैं:

- `buy`: यूज़र ईथर भेज सकता है और बदले में टोकन प्राप्त कर सकता है
- `sell`: यूज़र ईथर वापस पाने के लिए टोकन भेजने का निर्णय ले सकता है

## बाय फंक्शन {#the-buy-function}

आइए बाय फंक्शन को कोड करें। हमें पहले यह जांचना होगा कि मैसेज में ईथर की कितनी मात्रा है और यह सत्यापित करना होगा कि अनुबंधों के पास पर्याप्त टोकन हैं और मैसेज में कुछ ईथर है। यदि अनुबंध के पास पर्याप्त टोकन हैं तो वह यूज़र को टोकन की संख्या भेजेगा और `Bought` इवेंट को एमिट करेगा।

ध्यान दें कि यदि हम किसी त्रुटि के मामले में require फंक्शन को कॉल करते हैं, तो भेजा गया ईथर सीधे वापस कर दिया जाएगा और यूज़र को वापस दे दिया जाएगा।

चीजों को सरल रखने के लिए, हम सिर्फ 1 Wei के लिए 1 टोकन एक्सचेंज करते हैं।

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "आपको कुछ ईथर भेजने की आवश्यकता है");
    require(amountTobuy <= dexBalance, "रिज़र्व में पर्याप्त टोकन नहीं हैं");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

उस स्थिति में जहां खरीद सफल होती है, हमें ट्रांज़ैक्शन में दो इवेंट देखने चाहिए: टोकन `Transfer` और `Bought` इवेंट।

![ट्रांज़ैक्शन में दो इवेंट्स: ट्रांसफर और बॉट](./transfer-and-bought-events.png)

## सेल फंक्शन {#the-sell-function}

सेल के लिए जिम्मेदार फंक्शन को पहले यह आवश्यक होगा कि यूज़र ने पहले से approve फंक्शन को कॉल करके राशि को स्वीकृत कर लिया हो। ट्रांसफर को स्वीकृत करने के लिए यह आवश्यक है कि DEX द्वारा इंस्टेंटिऐट किए गए ERC20Basic टोकन को यूज़र द्वारा कॉल किया जाए। यह पहले DEX अनुबंध के `token()` फ़ंक्शन को कॉल करके उस पते को पुनः प्राप्त करने के लिए प्राप्त किया जा सकता है जहां DEX ने `token` नामक ERC20Basic अनुबंध को तैनात किया था। फिर हम अपने सत्र में उस अनुबंध का एक उदाहरण बनाते हैं और उसके `approve` फ़ंक्शन को कॉल करते हैं। फिर हम DEX के `sell` फ़ंक्शन को कॉल करने और अपने टोकन को ईथर के लिए वापस स्वैप करने में सक्षम हैं। उदाहरण के लिए, एक इंटरैक्टिव ब्राउनी सत्र में यह ऐसा दिखता है:

```python
#### इंटरैक्टिव ब्राउनी कंसोल में पायथन...

# DEX को डिप्लॉय करें
dex = DEX.deploy({'from':account1})

# टोकन के लिए ईथर स्वैप करने के लिए बाय फंक्शन को कॉल करें
# 1e18, wei में अंकित 1 ईथर है
dex.buy({'from': account2, 1e18})

# ERC20 टोकन के लिए डिप्लॉयमेंट पता प्राप्त करें
# जिसे DEX अनुबंध निर्माण के दौरान डिप्लॉय किया गया था
# dex.token() टोकन के लिए डिप्लॉय किया गया पता लौटाता है
token = ERC20Basic.at(dex.token())

# टोकन के अप्रूव फंक्शन को कॉल करें
# dex पते को स्पेंडर के रूप में स्वीकृत करें
# और यह आपके कितने टोकन खर्च कर सकता है
token.approve(dex.address, 3e18, {'from':account2})

```

फिर जब सेल फंक्शन को कॉल किया जाता है, तो हम जांचेंगे कि कॉलर पते से अनुबंध पते पर ट्रांसफर सफल था या नहीं और फिर ईथर को कॉलर पते पर वापस भेज देंगे।

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "आपको कम से कम कुछ टोकन बेचने की ज़रूरत है");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "टोकन अलाउंस की जाँच करें");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

यदि सब कुछ काम करता है तो आपको ट्रांज़ैक्शन में 2 इवेंट (`Transfer` और `Sold`) और आपका टोकन बैलेंस और ईथर बैलेंस अपडेट होना चाहिए।

![ट्रांज़ैक्शन में दो इवेंट: ट्रांसफर और सोल्ड](./transfer-and-sold-events.png)

<Divider />

इस ट्यूटोरियल से हमने देखा कि ERC-20 टोकन के बैलेंस और अलाउंस की जांच कैसे करें और इंटरफ़ेस का उपयोग करके ERC20 स्मार्ट अनुबंध के `Transfer` और `TransferFrom` को कैसे कॉल करें।

एक बार जब आप एक ट्रांज़ैक्शन करते हैं तो हमारे पास आपके अनुबंध के लिए किए गए [ट्रांज़ैक्शन के बारे में प्रतीक्षा करने और विवरण प्राप्त करने](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) के लिए एक जावास्क्रिप्ट ट्यूटोरियल है और जब तक आपके पास ABI है तब तक [टोकन ट्रांसफर या किसी अन्य इवेंट द्वारा उत्पन्न इवेंट को डिकोड करने के लिए एक ट्यूटोरियल](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) है।

ट्यूटोरियल के लिए पूरा कोड यहां दिया गया है:

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "आपको कुछ ईथर भेजने की आवश्यकता है");
        require(amountTobuy <= dexBalance, "रिज़र्व में पर्याप्त टोकन नहीं हैं");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "आपको कम से कम कुछ टोकन बेचने की ज़रूरत है");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "टोकन अलाउंस की जाँच करें");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
