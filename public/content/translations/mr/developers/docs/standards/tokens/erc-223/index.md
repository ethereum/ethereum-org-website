---
title: "ERC-223 टोकन मानक"
description: "ERC-223 फंजिबल टोकन मानकाचा आढावा, ते कसे कार्य करते, आणि ERC-20 शी तुलना."
lang: mr
---

## प्रस्तावना {#introduction}

### ERC-223 म्हणजे काय? {#what-is-erc223}

ERC-223 हे ERC-20 मानकासारखेच फंजिबल टोकन्ससाठी एक मानक आहे. मुख्य फरक हा आहे की ERC-223 केवळ टोकन API परिभाषित करत नाही, तर प्रेषकाकडून प्राप्तकर्त्याकडे टोकन हस्तांतरित करण्याची तर्कप्रणाली देखील परिभाषित करते. हे एक संवाद मॉडेल सादर करते जे प्राप्तकर्त्याच्या बाजूने टोकन हस्तांतरण हाताळण्याची परवानगी देते.

### ERC-20 मधील फरक {#erc20-differences}

ERC-223 हे ERC-20 च्या काही मर्यादा दूर करते आणि टोकन कॉन्ट्रॅक्ट व टोकन प्राप्त करू शकणाऱ्या कॉन्ट्रॅक्टमध्ये संवादाची एक नवीन पद्धत सादर करते. ERC-223 मध्ये काही गोष्टी शक्य आहेत, पण ERC-20 मध्ये नाहीत:

- प्राप्तकर्त्याच्या बाजूने टोकन हस्तांतरण हाताळणी: प्राप्तकर्ते हे ओळखू शकतात की ERC-223 टोकन जमा केले जात आहे.
- अयोग्यरित्या पाठवलेले टोकन नाकारणे: जर वापरकर्त्याने ERC-223 टोकन अशा कॉन्ट्रॅक्टला पाठवले जे टोकन स्वीकारण्यासाठी बनवलेले नाही, तर ते कॉन्ट्रॅक्ट व्यवहार नाकारू शकते, ज्यामुळे टोकनचे नुकसान टळते.
- हस्तांतरणामध्ये मेटाडेटा: ERC-223 टोकन्समध्ये मेटाडेटा समाविष्ट असू शकतो, ज्यामुळे टोकन व्यवहारांशी कोणतीही माहिती जोडता येते.

## पूर्वतयारी {#prerequisites}

- [खाती](/developers/docs/accounts)
- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [टोकन मानके](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## मुख्य भाग {#body}

ERC-223 हे एक टोकन मानक आहे जे स्मार्ट कॉन्ट्रॅक्ट्समधील टोकन्ससाठी एक API लागू करते. हे ERC-223 टोकन स्वीकारणाऱ्या कॉन्ट्रॅक्ट्ससाठी एक API देखील घोषित करते. जे कॉन्ट्रॅक्ट ERC-223 रिसीव्हर API ला समर्थन देत नाहीत ते ERC-223 टोकन स्वीकारू शकत नाहीत, ज्यामुळे वापरकर्त्याच्या चुका टाळता येतात.

जर एखादे स्मार्ट कॉन्ट्रॅक्ट खालील पद्धती आणि इव्हेंट्स लागू करत असेल तर त्याला ERC-223 सुसंगत टोकन कॉन्ट्रॅक्ट म्हटले जाऊ शकते. एकदा तैनात झाल्यावर,
ते इथेरियमवर तयार केलेल्या टोकन्सचा मागोवा ठेवण्यास जबाबदार असेल.

कॉन्ट्रॅक्टमध्ये केवळ ही फंक्शन्स असणे बंधनकारक नाही आणि एक डेव्हलपर विविध टोकन मानकांमधून या कॉन्ट्रॅक्टमध्ये इतर कोणतीही वैशिष्ट्ये जोडू शकतो. उदाहरणार्थ, `approve` आणि `transferFrom` फंक्शन्स ERC-223 मानकाचा भाग नाहीत, परंतु आवश्यक असल्यास ही फंक्शन्स लागू केली जाऊ शकतात.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) मधून:

### मेथड्स {#methods}

ERC-223 टोकनने खालील पद्धती लागू केल्या पाहिजेत:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 टोकन स्वीकारणाऱ्या कॉन्ट्रॅक्टने खालील पद्धत लागू करणे आवश्यक आहे:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

जर ERC-223 टोकन्स `tokenReceived(..)` फंक्शन लागू न करणाऱ्या कॉन्ट्रॅक्टला पाठवले गेले, तर हस्तांतरण अयशस्वी झाले पाहिजे आणि टोकन्स प्रेषकाच्या बॅलन्समधून हलवले जाऊ नयेत.

### इव्हेंट्स {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### उदाहरणे {#examples}

ERC-223 टोकनचा API हा ERC-20 सारखाच आहे, त्यामुळे UI डेव्हलपमेंटच्या दृष्टिकोनातून कोणताही फरक नाही. येथे एकमेव अपवाद हा आहे की ERC-223 टोकनमध्ये `approve` + `transferFrom` फंक्शन्स असू शकत नाहीत कारण या मानकासाठी ते ऐच्छिक आहेत.

#### Solidity उदाहरणे {#solidity-example}

खालील उदाहरण स्पष्ट करते की एक मूलभूत ERC-223 टोकन कॉन्ट्रॅक्ट कसे कार्य करते:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

आता आपल्याला `tokenA` च्या ठेवी स्वीकारण्यासाठी दुसरा कॉन्ट्रॅक्ट हवा आहे, हे गृहीत धरून की tokenA हे ERC-223 टोकन आहे. कॉन्ट्रॅक्टने फक्त tokenA स्वीकारले पाहिजे आणि इतर कोणतेही टोकन नाकारले पाहिजेत. जेव्हा कॉन्ट्रॅक्टला tokenA प्राप्त होईल, तेव्हा त्याने `Deposit()` इव्हेंट उत्सर्जित केला पाहिजे आणि अंतर्गत `deposits` व्हेरिएबलचे मूल्य वाढवले पाहिजे.

येथे कोड आहे:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // एकमेव टोकन जे आम्हाला स्वीकारायचे आहे.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // हे समजणे महत्त्वाचे आहे की या फंक्शनमध्ये
        // msg.sender हा प्राप्त होणाऱ्या टोकनचा पत्ता आहे,
        // msg.value  नेहमी 0 असतो कारण बहुतेक प्रकरणांमध्ये टोकन कॉन्ट्रॅक्ट ईथरचा मालक नसतो किंवा पाठवत नाही,
        // _from      हा टोकन हस्तांतरणाचा प्रेषक आहे,
        // _value     ही जमा केलेल्या टोकनची रक्कम आहे.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## वारंवार विचारले जाणारे प्रश्न {#faq}

### जर आपण काही tokenB कॉन्ट्रॅक्टला पाठवले तर काय होईल? {#sending-tokens}

व्यवहार अयशस्वी होईल आणि टोकनचे हस्तांतरण होणार नाही. टोकन प्रेषकाच्या पत्त्यावर परत केले जातील.

### आपण या कॉन्ट्रॅक्टमध्ये ठेव कशी करू शकतो? {#contract-deposits}

ERC-223 टोकनचे `transfer(address,uint256)` किंवा `transfer(address,uint256,bytes)` फंक्शन कॉल करा, `RecipientContract` चा पत्ता निर्दिष्ट करून.

### जर आपण या कॉन्ट्रॅक्टला ERC-20 टोकन हस्तांतरित केले तर काय होईल? {#erc-20-transfers}

जर `RecipientContract` ला ERC-20 टोकन पाठवले, तर टोकन हस्तांतरित होतील, परंतु हस्तांतरण ओळखले जाणार नाही (कोणताही `Deposit()` इव्हेंट फायर होणार नाही, आणि ठेवींचे मूल्य बदलणार नाही). अनावश्यक ERC-20 ठेवी फिल्टर किंवा प्रतिबंधित केल्या जाऊ शकत नाहीत.

### टोकन ठेव पूर्ण झाल्यानंतर आपल्याला एखादे फंक्शन कार्यान्वित करायचे असेल तर काय? {#function-execution}

असे करण्याचे अनेक मार्ग आहेत. या उदाहरणात आपण ती पद्धत वापरू जी ERC-223 हस्तांतरणांना ईथर हस्तांतरणांसारखेच बनवते:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // एकमेव टोकन जे आम्हाला स्वीकारायचे आहे.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // येणारा व्यवहार हाताळा आणि त्यानंतरचे फंक्शन कॉल करा.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

जेव्हा `RecipientContract` ला ERC-223 टोकन प्राप्त होईल, तेव्हा कॉन्ट्रॅक्ट टोकन व्यवहाराच्या `_data` पॅरामीटर म्हणून एन्कोड केलेले एक फंक्शन कार्यान्वित करेल, अगदी त्याचप्रमाणे जसे ईथर व्यवहार फंक्शन कॉल्सना व्यवहार `data` म्हणून एन्कोड करतात. अधिक माहितीसाठी [डेटा फील्ड](/developers/docs/transactions/#the-data-field) वाचा.

वरील उदाहरणामध्ये, `transfer(address,uin256,bytes calldata _data)` फंक्शन वापरून `RecipientContract` च्या पत्त्यावर ERC-223 टोकन हस्तांतरित केले जाणे आवश्यक आहे. जर डेटा पॅरामीटर `0xc2985578` (`foo()` फंक्शनची स्वाक्षरी) असेल, तर टोकन ठेव प्राप्त झाल्यानंतर foo() फंक्शन कॉल केले जाईल आणि Foo() इव्हेंट फायर होईल.

टोकन हस्तांतरणाच्या `data` मध्ये पॅरामीटर्स देखील एन्कोड केले जाऊ शकतात, उदाहरणार्थ आपण `_someNumber` साठी 12345 मूल्याने bar() फंक्शन कॉल करू शकतो. या प्रकरणात `data` हा `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` असावा, जिथे `0x0423a132` ही `bar(uint256)` फंक्शनची स्वाक्षरी आहे आणि `00000000000000000000000000000000000000000000000000000000000004d2` हे uint256 म्हणून 12345 आहे.

## मर्यादा {#limitations}

जरी ERC-223 हे ERC-20 मानकात आढळलेल्या अनेक समस्यांचे निराकरण करते, तरी त्याच्या स्वतःच्या काही मर्यादा आहेत:

- स्वीकृती आणि सुसंगतता: ERC-223 अद्याप व्यापकपणे स्वीकारले गेले नाही, जे विद्यमान टूल्स आणि प्लॅटफॉर्मसह त्याची सुसंगतता मर्यादित करू शकते.
- मागील आवृत्तीशी सुसंगतता: ERC-223 हे ERC-20 सोबत बॅकवर्ड सुसंगत नाही, याचा अर्थ असा की विद्यमान ERC-20 कॉन्ट्रॅक्ट्स आणि टूल्स बदलांशिवाय ERC-223 टोकन्ससोबत काम करणार नाहीत.
- गॅस खर्च: ERC-223 हस्तांतरणातील अतिरिक्त तपासण्या आणि कार्यक्षमतेमुळे ERC-20 व्यवहारांच्या तुलनेत गॅसचा खर्च जास्त येऊ शकतो.

## पुढील वाचन {#further-reading}

- [EIP-223: ERC-223 टोकन मानक](https://eips.ethereum.org/EIPS/eip-223)
- [सुरुवातीचा ERC-223 प्रस्ताव](https://github.com/ethereum/eips/issues/223)
