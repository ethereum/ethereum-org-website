---
title: Solidity स्मार्ट कॉन्ट्रॅक्टमधून ERC-20 टोकन्सचे हस्तांतरण आणि मंजुरी
description: Solidity वापरून ERC-20 टोकन हस्तांतरण आणि मंजुरी हाताळणारे DEX स्मार्ट कॉन्ट्रॅक्ट तयार करा.
author: "jdourlens"
tags: ["स्मार्ट कॉन्ट्रॅक्ट्स", "टोकन्स", "solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 हस्तांतरण
lang: mr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

मागील ट्युटोरिअलमध्ये आपण इथेरियम ब्लॉकचेनवर [Solidity मधील ERC-20 टोकनची रचना](/developers/tutorials/understand-the-erc-20-token-smart-contract/) अभ्यासली. या लेखामध्ये आपण Solidity भाषेचा वापर करून टोकनशी संवाद साधण्यासाठी स्मार्ट कॉन्ट्रॅक्ट कसे वापरू शकतो हे पाहू.

या स्मार्ट कॉन्ट्रॅक्टसाठी, आपण एक वास्तविक डमी विकेंद्रित एक्सचेंज (DEX) तयार करू जिथे वापरकर्ता आपल्या नव्याने प्रस्थापित केलेल्या [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) साठी इथरचा व्यापार करू शकतो.

या ट्युटोरिअलसाठी आपण मागील ट्युटोरिअलमध्ये लिहिलेला कोड आधार म्हणून वापरू. आमचे DEX त्याच्या कन्स्ट्रक्टरमध्ये कॉन्ट्रॅक्टचा एक इन्स्टन्स तयार करेल आणि खालील ऑपरेशन्स करेल:

- टोकन्सची इथरमध्ये अदलाबदल करणे
- इथरची टोकन्समध्ये अदलाबदल करणे

आपण आपला साधा ERC20 कोडबेस जोडून आपल्या विकेंद्रित एक्सचेंज कोडची सुरुवात करू:

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

आपले नवीन DEX स्मार्ट कॉन्ट्रॅक्ट ERC-20 प्रस्थापित करेल आणि पुरवलेले सर्व मिळवेल:

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

तर आता आपल्याकडे आपले DEX आहे आणि त्यात सर्व टोकन रिझर्व्ह उपलब्ध आहे. कॉन्ट्रॅक्टमध्ये दोन फंक्शन्स आहेत:

- `buy`: वापरकर्ता इथर पाठवू शकतो आणि बदल्यात टोकन्स मिळवू शकतो
- `sell`: वापरकर्ता इथर परत मिळवण्यासाठी टोकन्स पाठवण्याचा निर्णय घेऊ शकतो

## buy फंक्शन {#the-buy-function}

चला buy फंक्शन कोड करूया. आपल्याला प्रथम संदेशामध्ये असलेल्या इथरची रक्कम तपासावी लागेल आणि कॉन्ट्रॅक्ट्सकडे पुरेसे टोकन्स आहेत आणि संदेशामध्ये काही इथर आहे याची पडताळणी करावी लागेल. जर कॉन्ट्रॅक्टकडे पुरेसे टोकन्स असतील तर ते वापरकर्त्याला टोकन्सची संख्या पाठवेल आणि `Bought` घटना उत्सर्जित करेल.

लक्षात घ्या की जर आपण त्रुटीच्या बाबतीत require फंक्शन कॉल केले तर पाठवलेले इथर थेट परत केले जाईल आणि वापरकर्त्याला परत दिले जाईल.

गोष्टी सोप्या ठेवण्यासाठी, आपण फक्त 1 Wei साठी 1 टोकनची अदलाबदल करतो.

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

खरेदी यशस्वी झाल्यास आपल्याला व्यवहारामध्ये दोन घटना दिसल्या पाहिजेत: टोकन `Transfer` आणि `Bought` घटना.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell फंक्शन {#the-sell-function}

विक्रीसाठी जबाबदार असलेल्या फंक्शनला प्रथम वापरकर्त्याने approve फंक्शन कॉल करून रक्कम मंजूर करणे आवश्यक असेल. हस्तांतरण मंजूर करण्यासाठी DEX द्वारे इन्स्टन्शिएट केलेल्या ERC20Basic टोकनला वापरकर्त्याने कॉल करणे आवश्यक आहे. हे प्रथम DEX कॉन्ट्रॅक्टच्या `token()` फंक्शनला कॉल करून साध्य केले जाऊ शकते जेणेकरून DEX ने `token` नावाचे ERC20Basic कॉन्ट्रॅक्ट कुठे प्रस्थापित केले आहे तो पत्ता मिळवता येईल. त्यानंतर आपण आपल्या सेशनमध्ये त्या कॉन्ट्रॅक्टचा एक इन्स्टन्स तयार करतो आणि त्याच्या `approve` फंक्शनला कॉल करतो. त्यानंतर आपण DEX च्या `sell` फंक्शनला कॉल करू शकतो आणि इथरसाठी आपले टोकन्स परत अदलाबदल करू शकतो. उदाहरणार्थ, एका संवादात्मक Brownie सेशनमध्ये हे असे दिसते:

```python
#### संवादात्मक Brownie कन्सोलमध्ये Python...

# DEX प्रस्थापित करा
dex = DEX.deploy({'from':account1})

# इथरची टोकनसोबत अदलाबदल करण्यासाठी buy फंक्शन कॉल करा
# 1e18 म्हणजे Wei मध्ये दर्शवलेले 1 इथर आहे
dex.buy({'from': account2, 1e18})

# ERC20 टोकनचा प्रस्थापना पत्ता मिळवा
# जे DEX कॉन्ट्रॅक्ट तयार करताना प्रस्थापित केले गेले होते
# dex.token() टोकनसाठी प्रस्थापित केलेला पत्ता परत करते
token = ERC20Basic.at(dex.token())

# टोकनचे approve फंक्शन कॉल करा
# dex पत्ता खर्च करणारा (spender) म्हणून मंजूर करा
# आणि त्याला तुमचे किती टोकन खर्च करण्याची परवानगी आहे
token.approve(dex.address, 3e18, {'from':account2})

```

त्यानंतर जेव्हा sell फंक्शन कॉल केले जाते, तेव्हा आपण कॉलरच्या पत्त्यावरून कॉन्ट्रॅक्टच्या पत्त्यावर हस्तांतरण यशस्वी झाले की नाही ते तपासू आणि नंतर कॉलरच्या पत्त्यावर इथर परत पाठवू.

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

जर सर्वकाही व्यवस्थित काम करत असेल तर तुम्हाला व्यवहारामध्ये 2 घटना (एक `Transfer` आणि `Sold`) दिसल्या पाहिजेत आणि तुमचा टोकन बॅलन्स आणि इथर बॅलन्स अपडेट झालेला दिसेल.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

या ट्युटोरिअलमधून आपण ERC-20 टोकनचा बॅलन्स आणि मंजुरी कशी तपासायची आणि इंटरफेस वापरून ERC20 स्मार्ट कॉन्ट्रॅक्टचे `Transfer` आणि `TransferFrom` कसे कॉल करायचे ते पाहिले.

एकदा तुम्ही व्यवहार केल्यानंतर, तुमच्या कॉन्ट्रॅक्टवर केलेल्या व्यवहारांची [प्रतीक्षा करण्यासाठी आणि त्याबद्दल तपशील मिळवण्यासाठी](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) आमच्याकडे एक JavaScript ट्युटोरिअल आहे आणि जोपर्यंत तुमच्याकडे ABI आहे तोपर्यंत [टोकन हस्तांतरण किंवा इतर कोणत्याही घटनांद्वारे व्युत्पन्न केलेल्या घटना डिकोड करण्यासाठी एक ट्युटोरिअल](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) आहे.

ट्युटोरिअलसाठी संपूर्ण कोड येथे आहे:

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