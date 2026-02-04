---
title: Solidity स्मार्ट कॉन्ट्रॅक्टमधून ERC-20 टोकनचे हस्तांतरण आणि मंजूरी
description: Solidity वापरून एक DEX स्मार्ट कॉन्ट्रॅक्ट तयार करा जो ERC-20 टोकन हस्तांतरण आणि मंजुरी हाताळतो.
author: "jdourlens"
tags: [ "स्मार्ट कॉन्ट्रॅक्ट", "tokens", "सॉलिडिटी", "erc-20" ]
skill: intermediate
lang: mr
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

मागील ट्युटोरियलमध्ये आपण Ethereum ब्लॉकचेनवरील [Solidity मधील ERC-20 टोकनची रचना](/developers/tutorials/understand-the-erc-20-token-smart-contract/) अभ्यासली. या लेखात आपण पाहू की Solidity भाषा वापरून टोकनसोबत संवाद साधण्यासाठी आपण स्मार्ट कॉन्ट्रॅक्टचा कसा वापर करू शकतो.

या स्मार्ट कॉन्ट्रॅक्टसाठी, आम्ही एक प्रत्यक्ष डमी विकेंद्रित एक्सचेंज तयार करू जिथे वापरकर्ता आमच्या नवीन तैनात केलेल्या [ERC-20 टोकनच्या](/developers/docs/standards/tokens/erc-20/) बदल्यात ईथरचा व्यापार करू शकतो.

या ट्युटोरियलसाठी आम्ही मागील ट्युटोरियलमध्ये लिहिलेला कोड आधार म्हणून वापरणार आहोत. आमचा DEX त्याच्या कन्स्ट्रक्टरमध्ये कॉन्ट्रॅक्टचा इन्स्टन्स तयार करेल आणि खालील कार्ये पार पाडेल:

- टोकनची ईथरमध्ये देवाणघेवाण करणे
- ईथरची टोकनमध्ये देवाणघेवाण करणे

आपण आपला सोपा ERC20 कोडबेस जोडून आपला विकेंद्रित एक्सचेंज कोड सुरू करू:

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

आमचा नवीन DEX स्मार्ट कॉन्ट्रॅक्ट ERC-20 तैनात करेल आणि पुरवलेल्या सर्व गोष्टी मिळवेल:

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

तर आता आपल्याकडे आपला DEX आहे आणि त्यात सर्व टोकन राखीव निधी उपलब्ध आहे. कॉन्ट्रॅक्टमध्ये दोन फंक्शन्स आहेत:

- `buy`: वापरकर्ता ईथर पाठवून बदल्यात टोकन्स मिळवू शकतो
- `sell`: वापरकर्ता ईथर परत मिळवण्यासाठी टोकन्स पाठवण्याचा निर्णय घेऊ शकतो

## `buy` फंक्शन {#the-buy-function}

चला `buy` फंक्शन कोड करूया. आपल्याला आधी मेसेजमध्ये किती ईथर आहे हे तपासावे लागेल आणि कॉन्ट्रॅक्ट्सकडे पुरेसे टोकन आहेत आणि मेसेजमध्ये काही ईथर आहे याची पडताळणी करावी लागेल. जर कॉन्ट्रॅक्टकडे पुरेसे टोकन असतील, तर ते वापरकर्त्याला टोकनची संख्या पाठवेल आणि `Bought` इव्हेंट उत्सर्जित करेल.

लक्षात घ्या की त्रुटीच्या बाबतीत आपण `require` फंक्शन कॉल केल्यास, पाठवलेले ईथर थेट परत केले जाईल आणि वापरकर्त्याला परत दिले जाईल.

गोष्टी सोप्या ठेवण्यासाठी, आम्ही फक्त 1 Wei साठी 1 टोकन एक्सचेंज करतो.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "तुम्हाला काही ईथर पाठवणे आवश्यक आहे");
    require(amountTobuy <= dexBalance, "रिझर्व्हमध्ये पुरेसे टोकन्स नाहीत");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

`buy` यशस्वी झाल्यास, आपल्याला ट्रांझॅक्शनमध्ये दोन इव्हेंट दिसले पाहिजेत: टोकन `Transfer` आणि `Bought` इव्हेंट.

![ट्रांझॅक्शनमधील दोन इव्हेंट: Transfer आणि Bought](./transfer-and-bought-events.png)

## `sell` फंक्शन {#the-sell-function}

विक्रीसाठी जबाबदार फंक्शनला आधी `approve` फंक्शन कॉल करून वापरकर्त्याकडून रकमेला मंजुरी देण्याची आवश्यकता असेल. हस्तांतरणाला मंजुरी देण्यासाठी DEX द्वारे तयार केलेल्या ERC20Basic टोकनला वापरकर्त्याद्वारे कॉल करणे आवश्यक आहे. हे साध्य करण्यासाठी प्रथम DEX कॉन्ट्रॅक्टचे `token()` फंक्शन कॉल करून तो ऍड्रेस मिळवावा लागेल जिथे DEX ने `token` नावाचा ERC20Basic कॉन्ट्रॅक्ट तैनात केला आहे. त्यानंतर आम्ही आमच्या सेशनमध्ये त्या कॉन्ट्रॅक्टचा एक इन्स्टन्स तयार करतो आणि त्याचे `approve` फंक्शन कॉल करतो. त्यानंतर आपण DEX चे `sell` फंक्शन कॉल करू शकतो आणि आपले टोकन परत ईथरसाठी स्वॅप करू शकतो. उदाहरणार्थ, इंटरऍक्टिव्ह ब्राउनी सेशनमध्ये हे असे दिसते:

```python
#### इंटरऍक्टिव्ह ब्राउनी कन्सोलमधील पायथन...

# DEX तैनात करा
dex = DEX.deploy({'from':account1})

# टोकनसाठी ईथर स्वॅप करण्याकरिता `buy` फंक्शन कॉल करा
# 1e18 म्हणजे 1 ईथर wei मध्ये दर्शवलेले
dex.buy({'from': account2, 1e18})

# ERC20 टोकनसाठी डिप्लॉयमेंट ऍड्रेस मिळवा
# जे DEX कॉन्ट्रॅक्ट तयार करताना तैनात केले होते
# dex.token() टोकनसाठी तैनात केलेला ऍड्रेस परत करतो
token = ERC20Basic.at(dex.token())

# टोकनचे `approve` फंक्शन कॉल करा
# dex ऍड्रेसला स्पेंडर म्हणून मंजूर करा
# आणि ते तुमचे किती टोकन खर्च करू शकते
token.approve(dex.address, 3e18, {'from':account2})

```

मग जेव्हा `sell` फंक्शन कॉल केले जाते, तेव्हा आम्ही कॉलरच्या ऍड्रेसवरून कॉन्ट्रॅक्ट ऍड्रेसवर हस्तांतरण यशस्वी झाले आहे की नाही हे तपासू आणि नंतर ईथर कॉलरच्या ऍड्रेसवर परत पाठवू.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "तुम्हाला किमान काही टोकन्स विकणे आवश्यक आहे");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "टोकन भत्ता तपासा");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

जर सर्व काही व्यवस्थित चालले, तर तुम्हाला ट्रांझॅक्शनमध्ये 2 इव्हेंट (`Transfer` आणि `Sold`) दिसले पाहिजेत आणि तुमचा टोकन बॅलन्स आणि ईथर बॅलन्स अपडेट झालेला दिसेल.

![ट्रांझॅक्शनमधील दोन इव्हेंट: Transfer आणि Sold](./transfer-and-sold-events.png)

<Divider />

या ट्युटोरियलमधून आपण ERC-20 टोकनचा बॅलन्स आणि भत्ता कसा तपासावा आणि इंटरफेस वापरून ERC20 स्मार्ट कॉन्ट्रॅक्टचे `Transfer` आणि `TransferFrom` कसे कॉल करावे हे पाहिले.

एकदा तुम्ही व्यवहार केल्यावर, तुमच्याकडे तुमच्या करारासाठी केलेल्या [व्यवहारांची प्रतीक्षा करण्यासाठी आणि तपशील मिळवण्यासाठी](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) एक जावास्क्रिप्ट ट्युटोरियल आहे आणि जोपर्यंत तुमच्याकडे ABI असेल तोपर्यंत [टोकन हस्तांतरणाद्वारे किंवा इतर कोणत्याही इव्हेंट्सद्वारे तयार केलेले इव्हेंट्स डीकोड करण्यासाठी एक ट्युटोरियल](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) आहे.

ट्युटोरियलसाठी संपूर्ण कोड येथे आहे:

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
        require(amountTobuy > 0, "तुम्हाला काही ईथर पाठवणे आवश्यक आहे");
        require(amountTobuy <= dexBalance, "रिझर्व्हमध्ये पुरेसे टोकन्स नाहीत");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "तुम्हाला किमान काही टोकन्स विकणे आवश्यक आहे");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "टोकन भत्ता तपासा");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
