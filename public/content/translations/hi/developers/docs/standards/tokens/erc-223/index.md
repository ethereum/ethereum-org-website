---
title: "ERC-223 टोकन मानक"
description: "ERC-223 फंजिबल टोकन मानक का अवलोकन, यह कैसे काम करता है, और ERC-20 की तुलना।"
lang: hi
---

## परिचय {#introduction}

### ERC-223 क्या है? {#what-is-erc223}

ERC-223 ERC-20 मानक के समान प्रतिमोच्य टोकन के लिए एक मानक है। मुख्य अंतर यह है कि ERC-223 न केवल टोकन एपीआई को परिभाषित करता है, बल्कि प्रेषक से प्राप्तकर्ता को टोकन स्थानांतरित करने के तर्क को भी परिभाषित करता है। यह एक संचार मॉडल पेश करता है जो टोकन स्थानान्तरण को प्राप्तकर्ता के पक्ष में संभालने की अनुमति देता है।

### ERC-20 से अंतर {#erc20-differences}

ERC-223 ERC-20 की कुछ सीमाओं को संबोधित करता है और टोकन अनुबंध और टोकन प्राप्त करने वाले अनुबंध के बीच बातचीत की एक नई विधि पेश करता है। कुछ चीजें हैं जो ERC-223 के साथ संभव हैं लेकिन ERC-20 के साथ नहीं:

- प्राप्तकर्ता की ओर से टोकन ट्रांसफर हैंडलिंग: प्राप्तकर्ता यह पता लगा सकते हैं कि ERC-223 टोकन जमा किया जा रहा है।
- अनुचित तरीके से भेजे गए टोकन की अस्वीकृति: यदि कोई उपयोगकर्ता टोकन प्राप्त नहीं करने वाले अनुबंध को ERC-223 टोकन भेजता है, तो अनुबंध लेनदेन को अस्वीकार कर सकता है, टोकन हानि को रोक सकता है।
- स्थानान्तरण में मेटाडेटा: ERC-223 टोकन में मेटाडेटा शामिल हो सकता है, जिससे टोकन लेनदेन से मनमानी जानकारी संलग्न की जा सकती है।

## पूर्वापेक्षाएं {#prerequisites}

- [Accounts](/developers/docs/accounts)
- [स्मार्ट कॉन्ट्रैक्ट्स](/डेवलपर्स/डॉक्स/स्मार्ट-कॉन्ट्रैक्ट्स/)
- [टोकन मानक](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-223 एक टोकन मानक है जो स्मार्ट अनुबंधों के भीतर टोकन के लिए एक एपीआई लागू करता है। यह उन अनुबंधों के लिए एक एपीआई भी घोषित करता है जिन्हें ERC-223 टोकन प्राप्त करना है। अनुबंध जो ERC-223 रिसीवर API का समर्थन नहीं करते हैं, उपयोगकर्ता त्रुटि को रोकते हुए ERC-223 टोकन प्राप्त नहीं कर सकते हैं।

यदि कोई स्मार्ट अनुबंध निम्नलिखित विधियों और घटनाओं को लागू करता है, तो इसे ERC-223 संगत टोकन अनुबंध कहा जा सकता है। एक बार तैनात होने के बाद, यह
एथेरियम पर बनाए गए टोकन का ट्रैक रखने के लिए जिम्मेदार होगा।

एक बार तैनात होने के बाद, यह
एथेरियम पर बनाए गए टोकन का ट्रैक रखने के लिए जिम्मेदार होगा। उदाहरण के लिए, 'अनुमोदन' और 'स्थानांतरणफ्रॉम' फ़ंक्शन ERC-223 मानक का हिस्सा नहीं हैं, लेकिन इन कार्यों को लागू किया जा सकता है यदि यह आवश्यक हो।

From [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### तरीके {#methods}

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

ERC-223 टोकन प्राप्त करने वाले अनुबंध को निम्नलिखित विधि को लागू करना चाहिए:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

यदि ERC-223 टोकन किसी ऐसे अनुबंध पर भेजे जाते हैं जो 'tokenReceived(..) को लागू नहीं करता है। ' फ़ंक्शन तो स्थानांतरण विफल होना चाहिए और टोकन को प्रेषक के बैलेंस से स्थानांतरित नहीं किया जाना चाहिए।

### घटनाएँ {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### उदाहरण {#examples}

ERC-223 टोकन का API ERC-20 के समान है, इसलिए UI विकास के दृष्टिकोण से कोई अंतर नहीं है। यहां एकमात्र अपवाद यह है कि ERC-223 टोकन में 'स्वीकृत' + 'transferFrom' फ़ंक्शन नहीं हो सकते हैं क्योंकि ये इस मानक के लिए वैकल्पिक हैं।

#### सॉलिडिटी उदाहरण {#solidity-example}

निम्न उदाहरण दिखाता है कि एक बुनियादी ERC-223 टोकन अनुबंध कैसे संचालित होता है:

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

अब हम 'tokenA' की जमा स्वीकार करने के लिए एक और अनुबंध चाहते हैं, यह मानते हुए कि tokenA एक ERC-223 टोकन है। अनुबंध को केवल टोकनA स्वीकार करना चाहिए और किसी भी अन्य टोकन को अस्वीकार करना चाहिए। जब अनुबंध टोकन प्राप्त करता है तो उसे 'जमा ()' घटना का उत्सर्जन करना चाहिए और आंतरिक 'जमा' चर के मूल्य में वृद्धि करनी चाहिए।

यहाँ कोड है:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // एकमात्र टोकन जिसे हम स्वीकार करना चाहते हैं।
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // यह समझना महत्वपूर्ण है कि इस फ़ंक्शन के भीतर
        // msg.sender प्राप्त किए जा रहे टोकन का पता है,
        // msg.value हमेशा 0 होता है क्योंकि टोकन अनुबंध ज्यादातर मामलों में ईथर का स्वामी नहीं होता है या भेजता नहीं है,
        // _from टोकन हस्तांतरण का प्रेषक है,
        // _value जमा किए गए टोकन की राशि है।
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## अक्सर पूछे जाने वाले सवाल {#faq}

### अगर हम अनुबंध में कुछ टोकन बी भेजते हैं तो क्या होगा? {#sending-tokens}

लेन-देन विफल हो जाएगा, और टोकन का हस्तांतरण नहीं होगा। टोकन प्रेषक के पते पर वापस कर दिए जाएंगे।

### हम इस अनुबंध में जमा कैसे कर सकते हैं? {#contract-deposits}

ERC-223 टोकन के 'ट्रांसफर (एड्रेस, uint256)' या 'ट्रांसफर (एड्रेस, uint256, बाइट्स)' फ़ंक्शन को कॉल करें, जिसमें 'RecipientContract' का पता निर्दिष्ट किया गया हो।

### यदि हम इस अनुबंध में ERC-20 टोकन स्थानांतरित करते हैं तो क्या होगा? {#erc-20-transfers}

यदि ERC-20 टोकन 'RecipientContract' को भेजा जाता है, तो टोकन स्थानांतरित कर दिए जाएंगे, लेकिन हस्तांतरण को मान्यता नहीं दी जाएगी (कोई 'जमा()' घटना निकाल दी जाएगी, और जमा मूल्य नहीं बदलेगा)। अवांछित ERC-20 जमाओं को फ़िल्टर या रोका नहीं जा सकता है।

### क्या होगा यदि हम टोकन जमा पूरा होने के बाद कुछ फ़ंक्शन निष्पादित करना चाहते हैं? {#function-execution}

ऐसा करने के कई तरीके हैं। इस उदाहरण में हम उस विधि का पालन करेंगे जो ERC-223 स्थानान्तरण को ईथर स्थानान्तरण के समान बनाती है:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // एकमात्र टोकन जिसे हम स्वीकार करना चाहते हैं।
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // आने वाले लेन-देन को संभालें और बाद में एक फ़ंक्शन कॉल करें।
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

जब `RecipientContract` को एक ERC-223 टोकन प्राप्त होगा, तो अनुबंध, टोकन लेनदेन के `_data` पैरामीटर के रूप में एन्कोड किए गए एक फ़ंक्शन को निष्पादित करेगा, ठीक वैसे ही जैसे ईथर लेनदेन, लेनदेन `data` के रूप में फ़ंक्शन कॉल को एन्कोड करते हैं। अधिक जानकारी के लिए [डेटा फ़ील्ड](/developers/docs/transactions/#the-data-field) पढ़ें।

उपरोक्त उदाहरण में, एक ERC-223 टोकन को 'RecipientContract' के पते पर 'transfer(address,uin256,bytes calldata _data)' फ़ंक्शन के साथ स्थानांतरित किया जाना चाहिए। यदि डेटा पैरामीटर '0xc2985578' ('foo()' फ़ंक्शन का हस्ताक्षर) होगा, तो टोकन जमा प्राप्त होने के बाद फ़ंक्शन foo() को लागू किया जाएगा और इवेंट Foo() को निकाल दिया जाएगा।

पैरामीटर को टोकन ट्रांसफर के 'डेटा' में भी एन्कोड किया जा सकता है, उदाहरण के लिए हम '_someNumber' के लिए 12345 वैल्यू के साथ bar() फ़ंक्शन को कॉल कर सकते हैं। इस मामले में 'डेटा' '0x0423a13200000000000000000000000000000000000000000000000000000000000004d2' होना चाहिए जहां '0x0423a132' 'बार (uint256)' फ़ंक्शन का हस्ताक्षर है और '00000000000000000000000000000000000000000000000000000000000004d2' uint256 के रूप में 12345 है।

## सीमाएँ {#limitations}

जबकि ERC-223 ERC-20 मानक में पाए जाने वाले कई मुद्दों को संबोधित करता है, यह अपनी सीमाओं के बिना नहीं है:

- अंगीकरण और संगतता: ERC-223 को अभी तक व्यापक रूप से नहीं अपनाया गया है, जो मौजूदा उपकरणों और प्लेटफार्मों के साथ इसकी संगतता को सीमित कर सकता है।
- पश्चगामी संगतता: ERC-223 ERC-20 के साथ पिछड़ा संगत नहीं है, जिसका अर्थ है कि मौजूदा ERC-20 अनुबंध और उपकरण बिना संशोधन के ERC-223 टोकन के साथ काम नहीं करेंगे।
- गैस की लागत: ERC-223 हस्तांतरण में अतिरिक्त जाँच और कार्यात्मकताओं के परिणामस्वरूप ERC-20 लेनदेन की तुलना में गैस की लागत अधिक हो सकती है।

## आगे की रीडिंग {#further-reading}

- [EIP-223: ERC-223 टोकन मानक](https://eips.ethereum.org/EIPS/eip-223)
- [प्रारंभिक ERC-223 प्रस्ताव](https://github.com/ethereum/eips/issues/223)
