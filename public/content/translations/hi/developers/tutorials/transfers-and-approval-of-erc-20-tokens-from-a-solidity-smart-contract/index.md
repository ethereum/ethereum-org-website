---
title: "Solidity स्मार्ट अनुबंध से ERC-20 टोकन का ट्रांसफर और स्वीकृति"
description: "Solidity का उपयोग करके एक DEX स्मार्ट अनुबंध बनाएं जो ERC-20 टोकन ट्रांसफर और स्वीकृतियों को संभालता है।"
author: "jdourlens"
tags:
  - स्मार्ट अनुबंध
  - टोकन
  - solidity
  - erc-20
skill: intermediate
breadcrumb: "ERC-20 ट्रांसफर"
lang: hi
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

पिछले ट्यूटोरियल में हमने इथेरियम ब्लॉकचेन पर [Solidity में एक ERC-20 टोकन की संरचना](/developers/tutorials/understand-the-erc-20-token-smart-contract/) का अध्ययन किया था। इस लेख में हम देखेंगे कि हम Solidity भाषा का उपयोग करके किसी टोकन के साथ इंटरैक्ट करने के लिए स्मार्ट अनुबंध का उपयोग कैसे कर सकते हैं।

इस स्मार्ट अनुबंध के लिए, हम एक वास्तविक डमी विकेंद्रीकृत एक्सचेंज (DEX) बनाएंगे जहां एक उपयोगकर्ता हमारे नए तैनात किए गए [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) के लिए ईथर का व्यापार कर सकता है।

इस ट्यूटोरियल के लिए हम उस कोड का उपयोग करेंगे जिसे हमने पिछले ट्यूटोरियल में आधार के रूप में लिखा था। हमारा DEX अपने कंस्ट्रक्टर में अनुबंध का एक उदाहरण (instance) बनाएगा और निम्नलिखित कार्य करेगा:

- टोकन को ईथर में बदलना
- ईथर को टोकन में बदलना

हम अपने सरल ERC20 कोडबेस को जोड़कर अपना विकेंद्रीकृत एक्सचेंज कोड शुरू करेंगे:

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

तो अब हमारे पास हमारा DEX है और इसमें सभी टोकन रिज़र्व उपलब्ध हैं। अनुबंध में दो फ़ंक्शन हैं:

- `buy`: उपयोगकर्ता ईथर भेज सकता है और बदले में टोकन प्राप्त कर सकता है
- `sell`: उपयोगकर्ता ईथर वापस पाने के लिए टोकन भेजने का निर्णय ले सकता है

## buy फ़ंक्शन {#the-buy-function}

आइए buy फ़ंक्शन को कोड करें। हमें सबसे पहले संदेश में मौजूद ईथर की मात्रा की जांच करनी होगी और यह सत्यापित करना होगा कि अनुबंधों के पास पर्याप्त टोकन हैं और संदेश में कुछ ईथर है। यदि अनुबंध के पास पर्याप्त टोकन हैं तो यह उपयोगकर्ता को टोकन की संख्या भेजेगा और `Bought` घटना (event) उत्सर्जित करेगा।

ध्यान दें कि यदि हम किसी त्रुटि के मामले में require फ़ंक्शन को कॉल करते हैं, तो भेजा गया ईथर सीधे वापस (revert) हो जाएगा और उपयोगकर्ता को वापस दे दिया जाएगा।

चीजों को सरल रखने के लिए, हम केवल 1 Wei के लिए 1 टोकन का आदान-प्रदान करते हैं।

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

यदि खरीदारी सफल होती है, तो हमें लेन-देन में दो घटनाएँ देखनी चाहिए: टोकन `Transfer` और `Bought` घटना।

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell फ़ंक्शन {#the-sell-function}

बिक्री के लिए जिम्मेदार फ़ंक्शन को पहले उपयोगकर्ता से approve फ़ंक्शन को कॉल करके राशि को स्वीकृति देने की अपेक्षा होगी। ट्रांसफर को स्वीकृति देने के लिए DEX द्वारा बनाए गए ERC20Basic टोकन को उपयोगकर्ता द्वारा कॉल किया जाना आवश्यक है। इसे पहले DEX अनुबंध के `token()` फ़ंक्शन को कॉल करके प्राप्त किया जा सकता है ताकि उस पते को प्राप्त किया जा सके जहां DEX ने `token` नामक ERC20Basic अनुबंध को तैनात किया था। फिर हम अपने सत्र में उस अनुबंध का एक उदाहरण बनाते हैं और उसके `approve` फ़ंक्शन को कॉल करते हैं। फिर हम DEX के `sell` फ़ंक्शन को कॉल करने और ईथर के लिए अपने टोकन को वापस स्वैप करने में सक्षम होते हैं। उदाहरण के लिए, एक इंटरैक्टिव Brownie सत्र में यह इस तरह दिखता है:

```python
#### इंटरैक्टिव Brownie कंसोल में Python...

# DEX को तैनात करें
dex = DEX.deploy({'from':account1})

# टोकन के लिए ईथर को स्वैप करने के लिए buy फ़ंक्शन को कॉल करें
# 1e18, Wei में दर्शाया गया 1 ईथर है
dex.buy({'from': account2, 1e18})

# ERC20 टोकन के लिए तैनाती का पता प्राप्त करें
# जिसे DEX अनुबंध निर्माण के दौरान तैनात किया गया था
# dex.token() टोकन के लिए तैनात पता लौटाता है
token = ERC20Basic.at(dex.token())

# टोकन के approve फ़ंक्शन को कॉल करें
# dex पते को खर्च करने वाले के रूप में स्वीकृति दें
# और इसे आपके कितने टोकन खर्च करने की अनुमति है
token.approve(dex.address, 3e18, {'from':account2})

```

फिर जब sell फ़ंक्शन को कॉल किया जाता है, तो हम जांचेंगे कि कॉलर के पते से अनुबंध के पते पर ट्रांसफर सफल रहा या नहीं और फिर ईथर को कॉलर के पते पर वापस भेज देंगे।

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

यदि सब कुछ काम करता है तो आपको लेन-देन में 2 घटनाएँ (एक `Transfer` और `Sold`) देखनी चाहिए और आपका टोकन बैलेंस और ईथर बैलेंस अपडेट हो जाना चाहिए।

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

इस ट्यूटोरियल से हमने देखा कि ERC-20 टोकन के बैलेंस और व्यय सीमा (allowance) की जांच कैसे करें और इंटरफ़ेस का उपयोग करके ERC20 स्मार्ट अनुबंध के `Transfer` और `TransferFrom` को कैसे कॉल करें।

एक बार जब आप लेन-देन कर लेते हैं, तो हमारे पास आपके अनुबंध में किए गए [लेन-देन की प्रतीक्षा करने और उसके बारे में विवरण प्राप्त करने](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) के लिए एक JavaScript ट्यूटोरियल है और जब तक आपके पास ABI है, तब तक [टोकन ट्रांसफर या किसी अन्य घटना द्वारा उत्पन्न घटनाओं को डिकोड करने के लिए एक ट्यूटोरियल](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) है।

यहाँ ट्यूटोरियल के लिए पूरा कोड दिया गया है:

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
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```