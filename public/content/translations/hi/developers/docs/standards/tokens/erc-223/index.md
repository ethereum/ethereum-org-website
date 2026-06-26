---
title: "ERC-223 टोकन मानक"
description: "ERC-223 फंजिबल टोकन मानक, यह कैसे काम करता है, और ERC-20 के साथ इसकी तुलना का अवलोकन।"
lang: hi
---

## परिचय {#introduction}

### ERC-223 क्या है? {#what-is-erc223}

ERC-223 फंजिबल टोकन के लिए एक मानक है, जो ERC-20 मानक के समान है। मुख्य अंतर यह है कि ERC-223 न केवल टोकन API को परिभाषित करता है बल्कि प्रेषक से प्राप्तकर्ता को टोकन ट्रांसफर करने के लॉजिक को भी परिभाषित करता है। यह एक संचार मॉडल पेश करता है जो टोकन ट्रांसफर को प्राप्तकर्ता की ओर से संभालने की अनुमति देता है।

### ERC-20 से अंतर {#erc20-differences}

ERC-223, ERC-20 की कुछ सीमाओं को दूर करता है और टोकन अनुबंध और टोकन प्राप्त करने वाले अनुबंध के बीच बातचीत का एक नया तरीका पेश करता है। कुछ चीजें हैं जो ERC-223 के साथ संभव हैं लेकिन ERC-20 के साथ नहीं:

- प्राप्तकर्ता की ओर से टोकन ट्रांसफर को संभालना: प्राप्तकर्ता यह पता लगा सकते हैं कि ERC-223 टोकन जमा किया जा रहा है।
- गलत तरीके से भेजे गए टोकन की अस्वीकृति: यदि कोई उपयोगकर्ता किसी ऐसे अनुबंध में ERC-223 टोकन भेजता है जिसे टोकन प्राप्त नहीं करना चाहिए, तो अनुबंध लेन-देन को अस्वीकार कर सकता है, जिससे टोकन के नुकसान को रोका जा सकता है।
- ट्रांसफर में मेटाडेटा: ERC-223 टोकन में मेटाडेटा शामिल हो सकता है, जिससे टोकन लेन-देन के साथ मनमानी जानकारी (arbitrary information) संलग्न की जा सकती है।

## पूर्वापेक्षाएँ {#prerequisites}

- [खाते](/developers/docs/accounts)
- [स्मार्ट अनुबंध](/developers/docs/smart-contracts/)
- [टोकन मानक](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## मुख्य भाग {#body}

ERC-223 एक टोकन मानक है जो स्मार्ट अनुबंधों के भीतर टोकन के लिए एक API लागू करता है। यह उन अनुबंधों के लिए भी एक API घोषित करता है जिन्हें ERC-223 टोकन प्राप्त करने चाहिए। जो अनुबंध ERC-223 रिसीवर API का समर्थन नहीं करते हैं, वे ERC-223 टोकन प्राप्त नहीं कर सकते हैं, जिससे उपयोगकर्ता की त्रुटि को रोका जा सकता है।

यदि कोई स्मार्ट अनुबंध निम्नलिखित विधियों (methods) और घटनाओं (events) को लागू करता है, तो इसे ERC-223 संगत टोकन अनुबंध कहा जा सकता है। एक बार तैनात (deploy) होने के बाद, यह इथेरियम पर बनाए गए टोकन का ट्रैक रखने के लिए जिम्मेदार होगा।

अनुबंध में केवल इन्हीं कार्यों (functions) का होना अनिवार्य नहीं है और एक डेवलपर इस अनुबंध में विभिन्न टोकन मानकों से कोई अन्य सुविधा जोड़ सकता है। उदाहरण के लिए, `approve` और `transferFrom` कार्य ERC-223 मानक का हिस्सा नहीं हैं, लेकिन यदि आवश्यक हो तो इन कार्यों को लागू किया जा सकता है।

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) से:

### विधियाँ (Methods) {#methods}

ERC-223 टोकन को निम्नलिखित विधियों को लागू करना चाहिए:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

एक अनुबंध जिसे ERC-223 टोकन प्राप्त करने चाहिए, उसे निम्नलिखित विधि को लागू करना चाहिए:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

यदि ERC-223 टोकन किसी ऐसे अनुबंध में भेजे जाते हैं जो `tokenReceived(..)` कार्य को लागू नहीं करता है, तो ट्रांसफर विफल होना चाहिए और टोकन को प्रेषक के बैलेंस से नहीं हटाया जाना चाहिए।

### घटनाएँ {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### उदाहरण {#examples}

ERC-223 टोकन का API, ERC-20 के समान है, इसलिए UI विकास के दृष्टिकोण से कोई अंतर नहीं है। यहाँ एकमात्र अपवाद यह है कि ERC-223 टोकन में `approve` + `transferFrom` कार्य नहीं हो सकते हैं क्योंकि ये इस मानक के लिए वैकल्पिक हैं।

#### Solidity उदाहरण {#solidity-example}

निम्नलिखित उदाहरण दर्शाता है कि एक बुनियादी ERC-223 टोकन अनुबंध कैसे काम करता है:

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

अब हम चाहते हैं कि एक अन्य अनुबंध `tokenA` की जमा राशि (deposits) स्वीकार करे, यह मानते हुए कि tokenA एक ERC-223 टोकन है। अनुबंध को केवल tokenA स्वीकार करना चाहिए और किसी भी अन्य टोकन को अस्वीकार करना चाहिए। जब अनुबंध tokenA प्राप्त करता है तो उसे एक `Deposit()` घटना उत्सर्जित (emit) करनी चाहिए और आंतरिक `deposits` चर (variable) का मान बढ़ाना चाहिए।

यहाँ कोड है:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // एकमात्र टोकन जिसे हम स्वीकार करना चाहते हैं।
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // यह समझना महत्वपूर्ण है कि इस फ़ंक्शन के भीतर
        // msg.sender उस टोकन का पता है जिसे प्राप्त किया जा रहा है,
        // msg.value हमेशा 0 होता है क्योंकि अधिकांश मामलों में टोकन अनुबंध के पास ईथर नहीं होता है या वह इसे नहीं भेजता है,
        // _from टोकन ट्रांसफर का प्रेषक है,
        // _value जमा किए गए टोकन की मात्रा है।
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## अक्सर पूछे जाने वाले प्रश्न {#faq}

### क्या होगा यदि हम अनुबंध में कुछ tokenB भेजते हैं? {#sending-tokens}

लेन-देन विफल हो जाएगा, और टोकन का ट्रांसफर नहीं होगा। टोकन प्रेषक के पते पर वापस कर दिए जाएंगे।

### हम इस अनुबंध में जमा (deposit) कैसे कर सकते हैं? {#contract-deposits}

`RecipientContract` का पता निर्दिष्ट करते हुए, ERC-223 टोकन के `transfer(address,uint256)` या `transfer(address,uint256,bytes)` कार्य को कॉल करें।

### क्या होगा यदि हम इस अनुबंध में ERC-20 टोकन ट्रांसफर करते हैं? {#erc-20-transfers}

यदि `RecipientContract` में ERC-20 टोकन भेजा जाता है, तो टोकन ट्रांसफर हो जाएंगे, लेकिन ट्रांसफर को मान्यता नहीं मिलेगी (कोई `Deposit()` घटना फायर नहीं होगी, और जमा मूल्य नहीं बदलेगा)। अवांछित ERC-20 जमा को फ़िल्टर या रोका नहीं जा सकता है।

### क्या होगा यदि हम टोकन जमा पूरा होने के बाद कोई कार्य (function) निष्पादित करना चाहते हैं? {#function-execution}

ऐसा करने के कई तरीके हैं। इस उदाहरण में हम उस विधि का पालन करेंगे जो ERC-223 ट्रांसफर को ईथर ट्रांसफर के समान बनाती है:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // एकमात्र टोकन जिसे हम स्वीकार करना चाहते हैं।
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // आने वाले लेन-देन को संभालें और एक अनुवर्ती फ़ंक्शन कॉल निष्पादित करें।
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

जब `RecipientContract` को ERC-223 टोकन प्राप्त होगा, तो अनुबंध टोकन लेन-देन के `_data` पैरामीटर के रूप में एन्कोड किए गए कार्य को निष्पादित करेगा, ठीक उसी तरह जैसे ईथर लेन-देन कार्य कॉल को लेन-देन `data` के रूप में एन्कोड करते हैं। अधिक जानकारी के लिए [डेटा फ़ील्ड](/developers/docs/transactions/#the-data-field) पढ़ें।

उपरोक्त उदाहरण में एक ERC-223 टोकन को `transfer(address,uin256,bytes calldata _data)` कार्य के साथ `RecipientContract` के पते पर ट्रांसफर किया जाना चाहिए। यदि डेटा पैरामीटर `0xc2985578` (एक `foo()` कार्य का हस्ताक्षर) होगा, तो टोकन जमा प्राप्त होने के बाद foo() कार्य लागू (invoke) किया जाएगा और Foo() घटना फायर की जाएगी।

पैरामीटर को टोकन ट्रांसफर के `data` में भी एन्कोड किया जा सकता है, उदाहरण के लिए हम `_someNumber` के लिए 12345 मान के साथ bar() कार्य को कॉल कर सकते हैं। इस मामले में `data` को `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` होना चाहिए जहाँ `0x0423a132`, `bar(uint256)` कार्य का हस्ताक्षर है और `00000000000000000000000000000000000000000000000000000000000004d2`, uint256 के रूप में 12345 है।

## सीमाएँ {#limitations}

जबकि ERC-223, ERC-20 मानक में पाई जाने वाली कई समस्याओं का समाधान करता है, यह अपनी सीमाओं के बिना नहीं है:

- अपनाना और संगतता (Adoption and Compatibility): ERC-223 को अभी तक व्यापक रूप से नहीं अपनाया गया है, जो मौजूदा उपकरणों और प्लेटफार्मों के साथ इसकी संगतता को सीमित कर सकता है।
- बैकवर्ड संगतता (Backward Compatibility): ERC-223, ERC-20 के साथ बैकवर्ड संगत नहीं है, जिसका अर्थ है कि मौजूदा ERC-20 अनुबंध और उपकरण बिना संशोधन के ERC-223 टोकन के साथ काम नहीं करेंगे।
- गैस लागत: ERC-223 ट्रांसफर में अतिरिक्त जाँच और कार्यक्षमता के परिणामस्वरूप ERC-20 लेन-देन की तुलना में अधिक गैस लागत आ सकती है।

## आगे की पढ़ाई {#further-reading}

- [EIP-223: ERC-223 टोकन मानक](https://eips.ethereum.org/EIPS/eip-223)
- [प्रारंभिक ERC-223 प्रस्ताव](https://github.com/ethereum/eips/issues/223)