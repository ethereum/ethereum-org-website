---
title: ERC-223 टोकन स्टँडर्ड
description: ERC-223 फंजिबल टोकन स्टँडर्डचा आढावा, ते कसे कार्य करते आणि ERC-20 सोबत त्याची तुलना.
lang: mr
---

## परिचय {#introduction}

### ERC-223 म्हणजे काय? {#what-is-erc223}

ERC-223 हे फंजिबल टोकन्ससाठी एक स्टँडर्ड आहे, जे ERC-20 स्टँडर्डसारखेच आहे. मुख्य फरक हा आहे की ERC-223 केवळ टोकन API परिभाषित करत नाही तर प्रेषकाकडून प्राप्तकर्त्याकडे टोकन्स हस्तांतरित करण्याचे लॉजिक देखील परिभाषित करते. हे एक कम्युनिकेशन मॉडेल सादर करते जे प्राप्तकर्त्याच्या बाजूने टोकन हस्तांतरण हाताळण्याची परवानगी देते.

### ERC-20 मधील फरक {#erc20-differences}

ERC-223 हे ERC-20 च्या काही मर्यादा दूर करते आणि टोकन कॉन्ट्रॅक्ट आणि टोकन्स प्राप्त करू शकणाऱ्या कॉन्ट्रॅक्टमधील संवादाची एक नवीन पद्धत सादर करते. अशा काही गोष्टी आहेत ज्या ERC-223 सह शक्य आहेत परंतु ERC-20 सह नाहीत:

- प्राप्तकर्त्याच्या बाजूने टोकन हस्तांतरण हाताळणी: प्राप्तकर्ते शोधू शकतात की ERC-223 टोकन जमा केले जात आहे.
- अयोग्यरित्या पाठवलेल्या टोकन्सचा नकार: जर एखाद्या वापरकर्त्याने ERC-223 टोकन्स अशा कॉन्ट्रॅक्टला पाठवले ज्याला टोकन्स प्राप्त करायचे नाहीत, तर कॉन्ट्रॅक्ट व्यवहार नाकारू शकते, ज्यामुळे टोकनचे नुकसान टळते.
- हस्तांतरणामध्ये मेटाडेटा: ERC-223 टोकन्समध्ये मेटाडेटा समाविष्ट असू शकतो, ज्यामुळे टोकन व्यवहारांना कोणतीही माहिती जोडता येते.

## पूर्व शर्ती {#prerequisites}

- [खाती](/developers/docs/accounts)
- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [टोकन स्टँडर्ड्स](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## मुख्य भाग {#body}

ERC-223 हे एक टोकन स्टँडर्ड आहे जे स्मार्ट कॉन्ट्रॅक्ट्समध्ये टोकन्ससाठी API लागू करते. हे अशा कॉन्ट्रॅक्ट्ससाठी API देखील घोषित करते ज्यांना ERC-223 टोकन्स प्राप्त करायचे आहेत. जे कॉन्ट्रॅक्ट्स ERC-223 रिसीव्हर API ला सपोर्ट करत नाहीत ते ERC-223 टोकन्स प्राप्त करू शकत नाहीत, ज्यामुळे वापरकर्त्याची चूक टळते.

जर एखादे स्मार्ट कॉन्ट्रॅक्ट खालील पद्धती आणि घटना लागू करत असेल तर त्याला ERC-223 सुसंगत टोकन कॉन्ट्रॅक्ट म्हटले जाऊ शकते. एकदा डिप्लॉय झाल्यानंतर, ते इथेरियमवर तयार केलेल्या टोकन्सचा मागोवा ठेवण्यासाठी जबाबदार असेल.

कॉन्ट्रॅक्टमध्ये केवळ हीच फंक्शन्स असणे बंधनकारक नाही आणि डेव्हलपर या कॉन्ट्रॅक्टमध्ये वेगवेगळ्या टोकन स्टँडर्ड्समधील इतर कोणतेही वैशिष्ट्य जोडू शकतो. उदाहरणार्थ, `approve` आणि `transferFrom` फंक्शन्स ERC-223 स्टँडर्डचा भाग नाहीत परंतु आवश्यक असल्यास ही फंक्शन्स लागू केली जाऊ शकतात.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) मधून:

### पद्धती {#methods}

ERC-223 टोकनने खालील पद्धती लागू करणे आवश्यक आहे:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ज्या कॉन्ट्रॅक्टला ERC-223 टोकन्स प्राप्त करायचे आहेत त्याने खालील पद्धत लागू करणे आवश्यक आहे:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

जर ERC-223 टोकन्स अशा कॉन्ट्रॅक्टला पाठवले गेले जे `tokenReceived(..)` फंक्शन लागू करत नाही, तर हस्तांतरण अयशस्वी झाले पाहिजे आणि टोकन्स प्रेषकाच्या बॅलन्समधून हलवले जाऊ नयेत.

### घटना {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### उदाहरणे {#examples}

ERC-223 टोकनचे API हे ERC-20 सारखेच आहे, त्यामुळे UI डेव्हलपमेंटच्या दृष्टिकोनातून कोणताही फरक नाही. येथे एकमेव अपवाद असा आहे की ERC-223 टोकन्समध्ये `approve` + `transferFrom` फंक्शन्स नसू शकतात कारण ती या स्टँडर्डसाठी पर्यायी आहेत.

#### Solidity उदाहरणे {#solidity-example}

खालील उदाहरण एक मूलभूत ERC-223 टोकन कॉन्ट्रॅक्ट कसे कार्य करते हे स्पष्ट करते:

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

आता आम्हाला असे दुसरे कॉन्ट्रॅक्ट हवे आहे जे `tokenA` च्या ठेवी स्वीकारेल, असे गृहीत धरून की tokenA हे ERC-223 टोकन आहे. कॉन्ट्रॅक्टने फक्त tokenA स्वीकारले पाहिजे आणि इतर कोणतेही टोकन्स नाकारले पाहिजेत. जेव्हा कॉन्ट्रॅक्टला tokenA प्राप्त होते तेव्हा त्याने `Deposit()` घटना उत्सर्जित केली पाहिजे आणि अंतर्गत `deposits` व्हेरिएबलचे मूल्य वाढवले पाहिजे.

येथे कोड आहे:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // एकमेव टोकन जे आम्हाला स्वीकारायचे आहे.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // हे समजून घेणे महत्त्वाचे आहे की या फंक्शनमध्ये
        // msg.sender हा प्राप्त होत असलेल्या टोकनचा पत्ता आहे,
        // msg.value नेहमी 0 असते कारण बहुतांश प्रकरणांमध्ये टोकन कॉन्ट्रॅक्टकडे इथरची मालकी नसते किंवा ते इथर पाठवत नाही,
        // _from हा टोकन हस्तांतरणाचा प्रेषक आहे,
        // _value हे जमा केलेल्या टोकन्सचे प्रमाण आहे.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## वारंवार विचारले जाणारे प्रश्न {#faq}

### जर आपण कॉन्ट्रॅक्टला काही tokenB पाठवले तर काय होईल? {#sending-tokens}

व्यवहार अयशस्वी होईल आणि टोकन्सचे हस्तांतरण होणार नाही. टोकन्स प्रेषकाच्या पत्त्यावर परत केले जातील.

### आपण या कॉन्ट्रॅक्टमध्ये ठेव कशी जमा करू शकतो? {#contract-deposits}

`RecipientContract` चा पत्ता निर्दिष्ट करून, ERC-223 टोकनच्या `transfer(address,uint256)` किंवा `transfer(address,uint256,bytes)` फंक्शनला कॉल करा.

### जर आपण या कॉन्ट्रॅक्टमध्ये ERC-20 टोकन हस्तांतरित केले तर काय होईल? {#erc-20-transfers}

जर ERC-20 टोकन `RecipientContract` ला पाठवले गेले, तर टोकन्स हस्तांतरित केले जातील, परंतु हस्तांतरण ओळखले जाणार नाही (कोणतीही `Deposit()` घटना फायर केली जाणार नाही आणि ठेवींचे मूल्य बदलणार नाही). अवांछित ERC-20 ठेवी फिल्टर केल्या जाऊ शकत नाहीत किंवा रोखल्या जाऊ शकत नाहीत.

### जर टोकन जमा झाल्यानंतर आपल्याला एखादे फंक्शन कार्यान्वित करायचे असेल तर काय? {#function-execution}

असे करण्याचे अनेक मार्ग आहेत. या उदाहरणात आपण अशा पद्धतीचा अवलंब करू ज्यामुळे ERC-223 हस्तांतरण इथर हस्तांतरणासारखेच होईल:

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

जेव्हा `RecipientContract` ला ERC-223 टोकन प्राप्त होईल तेव्हा कॉन्ट्रॅक्ट टोकन व्यवहाराचा `_data` पॅरामीटर म्हणून एन्कोड केलेले फंक्शन कार्यान्वित करेल, अगदी इथर व्यवहार फंक्शन कॉल्सना व्यवहार `data` म्हणून कसे एन्कोड करतात त्याप्रमाणेच. अधिक माहितीसाठी [डेटा फील्ड](/developers/docs/transactions/#the-data-field) वाचा.

वरील उदाहरणात ERC-223 टोकन `transfer(address,uin256,bytes calldata _data)` फंक्शनसह `RecipientContract` च्या पत्त्यावर हस्तांतरित केले जाणे आवश्यक आहे. जर डेटा पॅरामीटर `0xc2985578` (एका `foo()` फंक्शनची स्वाक्षरी) असेल तर टोकन जमा झाल्यानंतर foo() फंक्शन कॉल केले जाईल आणि Foo() घटना फायर केली जाईल.

पॅरामीटर्स टोकन हस्तांतरणाच्या `data` मध्ये देखील एन्कोड केले जाऊ शकतात, उदाहरणार्थ आपण `_someNumber` साठी 12345 मूल्यासह bar() फंक्शन कॉल करू शकतो. या प्रकरणात `data` हे `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` असणे आवश्यक आहे जेथे `0x0423a132` ही `bar(uint256)` फंक्शनची स्वाक्षरी आहे आणि `00000000000000000000000000000000000000000000000000000000000004d2` हे uint256 म्हणून 12345 आहे.

## मर्यादा {#limitations}

जरी ERC-223 हे ERC-20 स्टँडर्डमध्ये आढळणाऱ्या अनेक समस्यांचे निराकरण करत असले तरी, त्याच्या स्वतःच्या काही मर्यादा आहेत:

- अवलंब आणि सुसंगतता: ERC-223 अद्याप मोठ्या प्रमाणावर स्वीकारले गेलेले नाही, ज्यामुळे विद्यमान टूल्स आणि प्लॅटफॉर्म्ससह त्याची सुसंगतता मर्यादित होऊ शकते.
- बॅकवर्ड सुसंगतता: ERC-223 हे ERC-20 शी बॅकवर्ड सुसंगत नाही, याचा अर्थ असा की विद्यमान ERC-20 कॉन्ट्रॅक्ट्स आणि टूल्स बदलांशिवाय ERC-223 टोकन्ससह कार्य करणार नाहीत.
- गॅस खर्च: ERC-223 हस्तांतरणांमधील अतिरिक्त तपासण्या आणि कार्यक्षमतेमुळे ERC-20 व्यवहारांच्या तुलनेत जास्त गॅस खर्च येऊ शकतो.

## पुढील वाचन {#further-reading}

- [EIP-223: ERC-223 टोकन स्टँडर्ड](https://eips.ethereum.org/EIPS/eip-223)
- [प्रारंभिक ERC-223 प्रस्ताव](https://github.com/ethereum/eips/issues/223)