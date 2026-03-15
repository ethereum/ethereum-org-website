---
title: "स्मार्ट अनुबंधों की संरचना"
description: "एक स्मार्ट संपर्क की संरचना में गहराई से देखें – फंक्शन, डेटा और वेरिएबल्स।"
lang: hi
---

एक स्मार्ट अनुबंध एक प्रोग्राम है जो एथेरियम पर एक पते पर चलता है। वे डेटा और फंक्शंस से बने होते हैं जो लेनदेन प्राप्त करने पर निष्पादित हो सकते हैं। स्मार्ट अनुबंध क्या होता है, इसका अवलोकन यहां दिया गया है।

## पूर्वापेक्षाएं {#prerequisites}

पहले सुनिश्चित करें कि आपने [स्मार्ट अनुबंधों](/developers/docs/smart-contracts/) के बारे में पढ़ा है। यह दस्तावेज़ मानता है कि आप JavaScript या Python जैसी प्रोग्रामिंग भाषाओं से पहले से ही परिचित हैं।

## डेटा {#data}

किसी भी अनुबंध डेटा को एक स्थान पर निर्दिष्ट किया जाना चाहिए: या तो `storage` या `memory` पर। स्मार्ट अनुबंध में भंडारण को संशोधित करना महंगा है, इसलिए आपको यह विचार करने की आवश्यकता है कि आपका डेटा कहां रहना चाहिए।

### भंडारण {#storage}

लगातार डेटा को भंडारण के रूप में संदर्भित किया जाता है और इसे स्टेट वेरिएबल्स द्वारा दर्शाया जाता है। ये मान ब्लॉकचेन पर स्थायी रूप से संग्रहित हो जाते हैं। आपको प्रकार घोषित करने की आवश्यकता है ताकि अनुबंध इस बात पर नज़र रख सके कि संकलित होने पर ब्लॉकचेन पर उसे कितने भंडारण की आवश्यकता है।

```solidity
// Solidity उदाहरण
contract SimpleStorage {
    uint storedData; // स्टेट वैरिएबल
    // ...
}
```

```python
# Vyper उदाहरण
storedData: int128
```

यदि आपने पहले से ही ऑब्जेक्ट-ओरिएंटेड भाषाओं को प्रोग्राम किया है, तो आप संभवतः अधिकांश प्रकारों से परिचित होंगे। हालांकि, यदि आप Ethereum विकास में नए हैं तो `address` आपके लिए नया होना चाहिए।

एक `address` प्रकार एक Ethereum पता रख सकता है जो 20 बाइट्स या 160 बिट्स के बराबर होता है। यह हेक्साडेसिमल नोटेशन में अग्रणी 0x के साथ लौटता है।

अन्य प्रकारों में शामिल हैं:

- बूलियन
- पूर्णांक
- निश्चित बिंदु संख्याएँ
- निश्चित आकार की बाइट सरणियाँ
- गतिशील आकार की बाइट सरणियाँ
- परिमेय और पूर्णांक लिटरल
- स्ट्रिंग लिटरल
- हेक्साडेसिमल लिटरल
- एनम्स

अधिक स्पष्टीकरण के लिए, दस्तावेज़ों पर एक नज़र डालें:

- [Vyper प्रकार देखें](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity प्रकार देखें](https://docs.soliditylang.org/en/latest/types.html#value-types)

### मेमोरी {#memory}

मान जो केवल अनुबंध फंक्शन के निष्पादन के जीवनकाल के लिए संग्रहित होते हैं, उन्हें मेमोरी वेरिएबल्स कहा जाता है। चूंकि ये ब्लॉकचेन पर स्थायी रूप से संग्रहित नहीं होते हैं, इसलिए इनका उपयोग करना बहुत सस्ता होता है।

[Solidity डॉक्स](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) में EVM डेटा (स्टोरेज, मेमोरी और स्टैक) कैसे संग्रहीत करता है, इसके बारे में अधिक जानें।

### पर्यावरण वैरिएबल {#environment-variables}

आपके अनुबंध पर आपके द्वारा परिभाषित वेरिएबल्स के अलावा, कुछ विशेष वैश्विक वेरिएबल्स हैं। वे मुख्य रूप से ब्लॉकचेन या वर्तमान लेनदेन के बारे में जानकारी प्रदान करने के लिए उपयोग किए जाते हैं।

उदाहरण

| **प्रॉप**         | **स्टेट वेरिएबल** | **विवरण**                                        |
| ----------------- | ----------------- | ------------------------------------------------ |
| `block.timestamp` | uint256           | वर्तमान ब्लॉक युग टाइमस्टैम्प                    |
| `msg.sender`      | पता               | संदेश का प्रेषक (वर्तमान कॉल) |

## फ़ंक्शन {#functions}

सबसे सरल शब्दों में, फंक्शंस आने वाले लेनदेन के जवाब में जानकारी प्राप्त कर सकते हैं या जानकारी सेट कर सकते हैं।

फंक्शन कॉल दो प्रकार के होते हैं:

- `internal` – ये EVM कॉल नहीं बनाते हैं
  - आंतरिक फ़ंक्शन और स्टेट वैरिएबल को केवल आंतरिक रूप से एक्सेस किया जा सकता है (यानी, वर्तमान अनुबंध या इससे प्राप्त होने वाले अनुबंधों के भीतर से)
- `external` – ये EVM कॉल बनाते हैं
  - बाहरी फंक्शंस अनुबंध इंटरफ़ेस का हिस्सा हैं, जिसका अर्थ है कि उन्हें अन्य अनुबंधों से और लेनदेन के माध्यम से कॉल किया जा सकता है। एक बाहरी फ़ंक्शन `f` को आंतरिक रूप से कॉल नहीं किया जा सकता है (यानी, `f()` काम नहीं करता है, लेकिन `this.f()` काम करता है)।

वे `public` या `private` भी हो सकते हैं

- `public` फ़ंक्शन को अनुबंध के भीतर से आंतरिक रूप से या संदेशों के माध्यम से बाहरी रूप से कॉल किया जा सकता है
- `private` फ़ंक्शन केवल उस अनुबंध के लिए दिखाई देते हैं जिसमें उन्हें परिभाषित किया गया है और व्युत्पन्न अनुबंधों में नहीं

दोनों फंक्शंस और स्टेट वेरिएबल्स को सार्वजनिक या निजी बनाया जा सकता है

अनुबंध पर एक स्टेट वेरिएबल्स को अपडेट करने के लिए एक फंक्शन यहां है:

```solidity
// Solidity उदाहरण
function update_name(string value) public {
    dapp_name = value;
}
```

- प्रकार `string` का पैरामीटर `value` फ़ंक्शन: `update_name` में पास किया जाता है
- इसे `public` घोषित किया गया है, जिसका अर्थ है कि कोई भी इसे एक्सेस कर सकता है
- इसे `view` घोषित नहीं किया गया है, इसलिए यह अनुबंध की स्थिति को संशोधित कर सकता है

### व्यू फ़ंक्शन {#view-functions}

ये फंक्शंस अनुबंध के डेटा की स्थिति को संशोधित नहीं करने का वादा करते हैं। सामान्य उदाहरण "गेटर" फंक्शंस हैं – उदाहरण के लिए आप इसका उपयोग यूज़र की शेष राशि प्राप्त करने के लिए कर सकते हैं।

```solidity
// Solidity उदाहरण
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

संशोधित स्थिति क्या मानी जाती है:

1. स्टेट वेरिएबल्स के लिए लेखन।
2. [इवेंट्स उत्सर्जित करना](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)।
3. [अन्य अनुबंध बनाना](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)।
4. `selfdestruct` का उपयोग करना।
5. कॉल के माध्यम से ईथर भेजना।
6. किसी भी ऐसे फ़ंक्शन को कॉल करना जो `view` या `pure` के रूप में चिह्नित नहीं है।
7. निम्न-स्तरीय कॉल का उपयोग करना।
8. इनलाइन असेंबली का उपयोग करना जिसमें कुछ ऑप्कोड होते हैं।

### कंस्ट्रक्टर फ़ंक्शन {#constructor-functions}

`constructor` फ़ंक्शन केवल एक बार निष्पादित होते हैं जब अनुबंध पहली बार परिनियोजित होता है। कई वर्ग-आधारित प्रोग्रामिंग भाषाओं में `constructor` की तरह, ये फ़ंक्शन अक्सर स्टेट वैरिएबल को उनके निर्दिष्ट मानों पर प्रारंभ करते हैं।

```solidity
// Solidity उदाहरण
// अनुबंध के डेटा को प्रारंभ करता है, `owner` को
// अनुबंध निर्माता के पते पर सेट करता है।
constructor() public {
    // सभी स्मार्ट अनुबंध अपने कार्यों को ट्रिगर करने के लिए बाहरी लेनदेन पर निर्भर करते हैं।
    // `msg` एक वैश्विक वैरिएबल है जिसमें दिए गए लेनदेन पर प्रासंगिक डेटा शामिल है,
    // जैसे प्रेषक का पता और लेनदेन में शामिल ETH मान।
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper उदाहरण

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### बिल्ट-इन फ़ंक्शन {#built-in-functions}

आपके अनुबंध पर आपके द्वारा परिभाषित वेरिएबल्स और फंक्शंस के अलावा, कुछ विशेष बिल्ट-इन फंक्शंस हैं। सबसे स्पष्ट उदाहरण है:

- `address.send()` – Solidity
- `send(address)` – Vyper

ये अनुबंधों को ETH को अन्य खातों में भेजने की अनुमति देते हैं।

## फ़ंक्शन लिखना {#writing-functions}

आपका फंक्शन निम्न आवश्यक करता है:

- पैरामीटर वेरिएबल और प्रकार (यदि यह पैरामीटर स्वीकार करता है)
- internal/external की घोषणा
- pure/view/payable की घोषणा
- रिटर्न प्रकार (यदि यह मान लौटाता है)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // जब अनुबंध परिनियोजित होता है और मान को प्रारंभ करता है तब कॉल किया जाता है
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // फ़ंक्शन प्राप्त करें
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // फ़ंक्शन सेट करें
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

एक पूर्ण अनुबंध कुछ इस तरह दिख सकता है। यहाँ `constructor` फ़ंक्शन `dapp_name` वैरिएबल के लिए एक प्रारंभिक मान प्रदान करता है।

## इवेंट्स और लॉग {#events-and-logs}

इवेंट्स आपके स्मार्ट अनुबंध को आपके फ़्रंटएंड या अन्य सदस्यता लेने वाले एप्लिकेशन के साथ संवाद करने में सक्षम बनाते हैं। एक बार लेनदेन मान्य हो जाने और एक ब्लॉक में जोड़े जाने के बाद, स्मार्ट अनुबंध इवेंट्स का उत्सर्जन कर सकते हैं और जानकारी लॉग कर सकते हैं, जिसे फ्रंटएंड तब संसाधित और उपयोग कर सकता है।

## एनोटेट किए गए उदाहरण {#annotated-examples}

ये Solidity में लिखे गए कुछ उदाहरण हैं। यदि आप कोड के साथ खेलना चाहते हैं, तो आप [Remix](http://remix.ethereum.org) में उनके साथ इंटरैक्ट कर सकते हैं।

### हैलो वर्ल्ड {#hello-world}

```solidity
// सिमेंटिक वर्जनिंग का उपयोग करते हुए, Solidity का संस्करण निर्दिष्ट करता है।
// और जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध फ़ंक्शन और डेटा (इसकी स्थिति) का एक संग्रह है।
// एक बार परिनियोजित होने के बाद, एक अनुबंध Ethereum ब्लॉकचेन पर एक विशिष्ट पते पर रहता है।
// और जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` प्रकार के एक स्टेट वैरिएबल `message` की घोषणा करता है।
    // स्टेट वैरिएबल ऐसे वैरिएबल होते हैं जिनके मान अनुबंध भंडारण में स्थायी रूप से संग्रहीत होते हैं।
    // कीवर्ड `public` वैरिएबल को एक अनुबंध के बाहर से सुलभ बनाता है
    // और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
    string public message;

    // कई वर्ग-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, एक कंस्ट्रक्टर
    // एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
    // कंस्ट्रक्टर का उपयोग अनुबंध के डेटा को प्रारंभ करने के लिए किया जाता है।
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // एक स्ट्रिंग तर्क `initMessage` स्वीकार करता है और मान सेट करता है
        // अनुबंध के `message` भंडारण वैरिएबल में)।
        message = initMessage;
    }

    // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है
    // और `message` भंडारण वैरिएबल को अपडेट करता है।
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### टोकन {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // एक `address` एक ईमेल पते के बराबर है - इसका उपयोग Ethereum पर एक खाते की पहचान करने के लिए किया जाता है।
    // पते एक स्मार्ट अनुबंध या बाहरी (उपयोगकर्ता) खातों का प्रतिनिधित्व कर सकते हैं।
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // एक `mapping` अनिवार्य रूप से एक हैश टेबल डेटा संरचना है।
    // यह `mapping` एक अहस्ताक्षरित पूर्णांक (टोकन शेष) को एक पते (टोकन धारक) को निर्दिष्ट करता है।
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // इवेंट्स ब्लॉकचेन पर गतिविधि की लॉगिंग की अनुमति देते हैं।
    // अनुबंध की स्थिति में परिवर्तन पर प्रतिक्रिया करने के लिए Ethereum क्लाइंट इवेंट्स सुन सकते हैं।
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // अनुबंध के डेटा को प्रारंभ करता है, `owner` को
    // अनुबंध निर्माता के पते पर सेट करता है।
    constructor() public {
        // सभी स्मार्ट अनुबंध अपने कार्यों को ट्रिगर करने के लिए बाहरी लेनदेन पर निर्भर करते हैं।
        // `msg` एक वैश्विक वैरिएबल है जिसमें दिए गए लेनदेन पर प्रासंगिक डेटा शामिल है,
        // जैसे प्रेषक का पता और लेनदेन में शामिल ETH मान।
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // नए टोकन की एक राशि बनाता है और उन्हें एक पते पर भेजता है।
    function mint(address receiver, uint amount) public {
        // `require` एक नियंत्रण संरचना है जिसका उपयोग कुछ शर्तों को लागू करने के लिए किया जाता है।
        // यदि कोई `require` कथन `false` का मूल्यांकन करता है, तो एक अपवाद चालू हो जाता है,
        // जो वर्तमान कॉल के दौरान स्थिति में किए गए सभी परिवर्तनों को वापस कर देता है।
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // केवल अनुबंध का मालिक ही इस फ़ंक्शन को कॉल कर सकता है
        require(msg.sender == owner, "You are not the owner.");

        // टोकन की अधिकतम राशि लागू करता है
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` की शेष राशि को `amount` से बढ़ाता है
        balances[receiver] += amount;
    }

    // किसी भी कॉलर से मौजूदा टोकन की एक राशि एक पते पर भेजता है।
    function transfer(address receiver, uint amount) public {
        // प्रेषक के पास भेजने के लिए पर्याप्त टोकन होने चाहिए
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // दो पतों के टोकन शेष को समायोजित करता है
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // पहले परिभाषित इवेंट का उत्सर्जन करता है
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### अद्वितीय डिजिटल संपत्ति {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// अन्य फ़ाइलों से प्रतीकों को वर्तमान अनुबंध में आयात करता है।
// इस मामले में, OpenZeppelin से सहायक अनुबंधों की एक श्रृंखला।
// और जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` कीवर्ड का उपयोग बाहरी अनुबंधों से कार्यों और कीवर्ड को विरासत में लेने के लिए किया जाता है।
// इस मामले में, `CryptoPizza` `IERC721` और `ERC165` अनुबंधों से विरासत में मिला है।
// और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // अंकगणितीय संचालन को सुरक्षित रूप से करने के लिए OpenZeppelin की SafeMath लाइब्रेरी का उपयोग करता है।
    // और जानें: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity में लगातार स्टेट वैरिएबल अन्य भाषाओं के समान हैं
    // लेकिन आपको एक ऐसे एक्सप्रेशन से असाइन करना होगा जो कंपाइल समय पर स्थिर हो।
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // स्ट्रक्ट प्रकार आपको अपना स्वयं का प्रकार परिभाषित करने देते हैं
    // और जानें: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // पिज्जा स्ट्रक्ट्स की एक खाली सरणी बनाता है
    Pizza[] public pizzas;

    // पिज्जा आईडी से उसके मालिक के पते तक मैपिंग
    mapping(uint256 => address) public pizzaToOwner;

    // मालिक के पते से स्वामित्व वाले टोकन की संख्या तक मैपिंग
    mapping(address => uint256) public ownerPizzaCount;

    // टोकन आईडी से स्वीकृत पते पर मैपिंग
    mapping(uint256 => address) pizzaApprovals;

    // आप मैपिंग को नेस्ट कर सकते हैं, यह उदाहरण ऑपरेटर अनुमोदन के लिए मालिक को मैप करता है
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // स्ट्रिंग (नाम) और डीएनए से एक यादृच्छिक पिज्जा बनाने के लिए आंतरिक फ़ंक्शन
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` कीवर्ड का मतलब है कि यह फ़ंक्शन केवल
        // इस अनुबंध और इस अनुबंध को प्राप्त करने वाले अनुबंधों के भीतर दिखाई देता है
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` एक फ़ंक्शन संशोधक है जो जांचता है कि पिज्जा पहले से मौजूद है या नहीं
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // पिज्जा की सरणी में पिज्जा जोड़ता है और आईडी प्राप्त करता है
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // जांचता है कि पिज्जा का मालिक वर्तमान उपयोगकर्ता के समान है
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // ध्यान दें कि address(0) शून्य पता है,
        // यह दर्शाता है कि pizza[id] अभी तक किसी विशेष उपयोगकर्ता को आवंटित नहीं किया गया है।

        assert(pizzaToOwner[id] == address(0));

        // पिज्जा को मालिक से मैप करता है
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // स्ट्रिंग (नाम) से एक यादृच्छिक पिज्जा बनाता है
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // स्ट्रिंग (नाम) और मालिक (निर्माता) के पते से यादृच्छिक डीएनए उत्पन्न करता है
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` के रूप में चिह्नित फ़ंक्शन स्थिति से पढ़ने या संशोधित न करने का वादा करते हैं
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // स्ट्रिंग (नाम) + पता (मालिक) से यादृच्छिक uint उत्पन्न करता है
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // मालिक द्वारा पाए गए पिज्जा की सरणी लौटाता है
    function getPizzasByOwner(address _owner)
        public
        // `view` के रूप में चिह्नित फ़ंक्शन स्थिति को संशोधित न करने का वादा करते हैं
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // केवल इस फ़ंक्शन कॉल के जीवनचक्र के लिए मानों को संग्रहीत करने के लिए `memory` भंडारण स्थान का उपयोग करता है।
        // और जानें: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // पिज्जा और स्वामित्व को दूसरे पते पर स्थानांतरित करता है
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // आयातित IERC721 अनुबंध में परिभाषित इवेंट का उत्सर्जन करता है
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * किसी दिए गए टोकन आईडी के स्वामित्व को सुरक्षित रूप से दूसरे पते पर स्थानांतरित करता है
     * यदि लक्ष्य पता एक अनुबंध है, तो इसे `onERC721Received` लागू करना होगा,
     * जिसे एक सुरक्षित हस्तांतरण पर कहा जाता है, और जादू मान
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` लौटाता है;
     * अन्यथा, हस्तांतरण वापस कर दिया जाता है।
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * किसी दिए गए टोकन आईडी के स्वामित्व को सुरक्षित रूप से दूसरे पते पर स्थानांतरित करता है
     * यदि लक्ष्य पता एक अनुबंध है, तो इसे `onERC721Received` लागू करना होगा,
     * जिसे एक सुरक्षित हस्तांतरण पर कहा जाता है, और जादू मान
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` लौटाता है;
     * अन्यथा, हस्तांतरण वापस कर दिया जाता है।
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * किसी लक्ष्य पते पर `onERC721Received` को लागू करने के लिए आंतरिक फ़ंक्शन
     * यदि लक्ष्य पता एक अनुबंध नहीं है तो कॉल निष्पादित नहीं किया जाता है
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // एक पिज्जा को जलाता है - टोकन को पूरी तरह से नष्ट कर देता है
    // `external` फ़ंक्शन संशोधक का मतलब है कि यह फ़ंक्शन
    // अनुबंध इंटरफ़ेस का हिस्सा है और अन्य अनुबंध इसे कॉल कर सकते हैं
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // पते द्वारा पिज्जा की गिनती लौटाता है
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // आईडी द्वारा पाए गए पिज्जा के मालिक को लौटाता है
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // पिज्जा के स्वामित्व को स्थानांतरित करने के लिए दूसरे पते को मंजूरी देता है
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // विशिष्ट पिज्जा के लिए स्वीकृत पता लौटाता है
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * किसी दिए गए टोकन आईडी की वर्तमान स्वीकृति को साफ़ करने के लिए निजी फ़ंक्शन
     * यदि दिया गया पता वास्तव में टोकन का स्वामी नहीं है तो रिवर्ट करता है
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * किसी दिए गए ऑपरेटर की स्वीकृति को सेट या अनसेट करता है
     * एक ऑपरेटर को उनकी ओर से प्रेषक के सभी टोकन स्थानांतरित करने की अनुमति है
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // बताता है कि क्या कोई ऑपरेटर किसी दिए गए मालिक द्वारा अनुमोदित है
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // पिज्जा का स्वामित्व लेता है - केवल स्वीकृत उपयोगकर्ताओं के लिए
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // जांचता है कि पिज्जा मौजूद है या नहीं
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // जांचता है कि पता मालिक है या पिज्जा स्थानांतरित करने के लिए अनुमोदित है
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Solium जांच अक्षम करें क्योंकि
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // जांचें कि पिज्जा अद्वितीय है और अभी तक मौजूद नहीं है
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // लौटाता है कि लक्ष्य पता एक अनुबंध है या नहीं
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // वर्तमान में यह जांचने का कोई बेहतर तरीका नहीं है कि किसी पते में कोई अनुबंध है या नहीं
        // उस पते पर कोड के आकार की जांच करने से।
        // यह कैसे काम करता है, इसके बारे में अधिक जानकारी के लिए https://ethereum.stackexchange.com/a/14016/36603
        // देखें।
        // TODO Serenity रिलीज से पहले इसे फिर से जांचें, क्योंकि तब सभी पते
        // अनुबंध होंगे।
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## आगे की रीडिंग {#further-reading}

स्मार्ट अनुबंधों के अधिक संपूर्ण अवलोकन के लिए Solidity और Vyper के प्रलेखन देखें:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## संबंधित विषय {#related-topics}

- [स्मार्ट अनुबंध](/developers/docs/smart-contracts/)
- [एथेरियम वर्चुअल मशीन](/developers/docs/evm/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [अनुबंध आकार सीमा से लड़ने के लिए अनुबंधों का आकार छोटा करना](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- आपके स्मार्ट अनुबंध के आकार को कम करने के लिए कुछ व्यावहारिक सुझाव।_
- [इवेंट्स के साथ स्मार्ट अनुबंधों से डेटा लॉगिंग](/developers/tutorials/logging-events-smart-contracts/) _– स्मार्ट अनुबंध इवेंट्स का परिचय और आप डेटा लॉग करने के लिए उनका उपयोग कैसे कर सकते हैं।_
- [Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– मौजूदा अनुबंध से स्मार्ट अनुबंध कैसे परिनियोजित करें और इसके साथ इंटरैक्ट करें।_
