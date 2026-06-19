---
title: स्मार्ट अनुबंधों की संरचना
description: स्मार्ट अनुबंध की संरचना पर एक विस्तृत नज़र – फ़ंक्शन, डेटा और चर (variables)।
lang: hi
---

स्मार्ट अनुबंध एक प्रोग्राम है जो इथेरियम पर एक पते (address) पर चलता है। वे डेटा और फ़ंक्शन से बने होते हैं जो लेन-देन प्राप्त होने पर निष्पादित (execute) हो सकते हैं। यहाँ स्मार्ट अनुबंध के घटकों का अवलोकन दिया गया है।

## पूर्वापेक्षाएँ {#prerequisites}

सुनिश्चित करें कि आपने पहले [स्मार्ट अनुबंधों](/developers/docs/smart-contracts/) के बारे में पढ़ लिया है। यह दस्तावेज़ मानकर चलता है कि आप पहले से ही JavaScript या Python जैसी प्रोग्रामिंग भाषाओं से परिचित हैं।

## डेटा {#data}

किसी भी अनुबंध डेटा को एक स्थान पर असाइन किया जाना चाहिए: या तो `storage` या `memory` में। स्मार्ट अनुबंध में स्टोरेज को संशोधित करना महंगा होता है, इसलिए आपको यह विचार करने की आवश्यकता है कि आपका डेटा कहाँ रहना चाहिए।

### स्टोरेज {#storage}

स्थायी डेटा को स्टोरेज कहा जाता है और इसे स्थिति (state) चर (variables) द्वारा दर्शाया जाता है। ये मान ब्लॉकचेन पर स्थायी रूप से संग्रहीत हो जाते हैं। आपको प्रकार (type) घोषित करने की आवश्यकता है ताकि अनुबंध संकलित (compile) होने पर यह ट्रैक रख सके कि उसे ब्लॉकचेन पर कितने स्टोरेज की आवश्यकता है।

```solidity
// Solidity उदाहरण
contract SimpleStorage {
    uint storedData; // स्थिति चर
    // ...
}
```

```python
# Vyper उदाहरण
storedData: int128
```

यदि आपने पहले से ही ऑब्जेक्ट-ओरिएंटेड भाषाओं में प्रोग्रामिंग की है, तो आप संभवतः अधिकांश प्रकारों से परिचित होंगे। हालाँकि, यदि आप [इथेरियम](/) विकास में नए हैं, तो `address` आपके लिए नया होना चाहिए।

एक `address` प्रकार एक इथेरियम पता रख सकता है जो 20 बाइट्स या 160 बिट्स के बराबर होता है। यह 0x से शुरू होने वाले हेक्साडेसिमल नोटेशन में वापस आता है।

अन्य प्रकारों में शामिल हैं:

- बूलियन (boolean)
- पूर्णांक (integer)
- फिक्स्ड पॉइंट नंबर
- फिक्स्ड-साइज़ बाइट एरे
- डायनेमिकली साइज़्ड बाइट एरे
- रैशनल और इंटीजर लिटरल्स
- स्ट्रिंग लिटरल्स
- हेक्साडेसिमल लिटरल्स
- एनम्स (enums)

अधिक स्पष्टीकरण के लिए, दस्तावेज़ देखें:

- [Vyper प्रकार देखें](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity प्रकार देखें](https://docs.soliditylang.org/en/latest/types.html#value-types)

### मेमोरी {#memory}

वे मान जो केवल अनुबंध फ़ंक्शन के निष्पादन के जीवनकाल के लिए संग्रहीत किए जाते हैं, मेमोरी चर (memory variables) कहलाते हैं। चूँकि ये ब्लॉकचेन पर स्थायी रूप से संग्रहीत नहीं होते हैं, इसलिए इनका उपयोग करना बहुत सस्ता होता है।

EVM डेटा (स्टोरेज, मेमोरी और स्टैक) को कैसे संग्रहीत करता है, इसके बारे में [Solidity दस्तावेज़ों](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) में अधिक जानें।

### पर्यावरण चर (Environment variables) {#environment-variables}

आपके द्वारा अपने अनुबंध पर परिभाषित किए गए चरों के अलावा, कुछ विशेष वैश्विक चर (global variables) होते हैं। इनका उपयोग मुख्य रूप से ब्लॉकचेन या वर्तमान लेन-देन के बारे में जानकारी प्रदान करने के लिए किया जाता है।

उदाहरण:

| **प्रॉप (Prop)** | **स्थिति चर (State variable)** | **विवरण** |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | वर्तमान ब्लॉक एपॉक टाइमस्टैम्प        |
| `msg.sender`      | address            | संदेश भेजने वाला (वर्तमान कॉल) |

## फ़ंक्शन {#functions}

सबसे सरल शब्दों में, फ़ंक्शन आने वाले लेन-देन के जवाब में जानकारी प्राप्त कर सकते हैं या जानकारी सेट कर सकते हैं।

फ़ंक्शन कॉल दो प्रकार के होते हैं:

- `internal` – ये EVM कॉल नहीं बनाते हैं
  - आंतरिक फ़ंक्शन और स्थिति चर केवल आंतरिक रूप से एक्सेस किए जा सकते हैं (यानी, वर्तमान अनुबंध या इससे प्राप्त अनुबंधों के भीतर से)
- `external` – ये EVM कॉल बनाते हैं
  - बाहरी फ़ंक्शन अनुबंध इंटरफ़ेस का हिस्सा होते हैं, जिसका अर्थ है कि उन्हें अन्य अनुबंधों से और लेन-देन के माध्यम से कॉल किया जा सकता है। एक बाहरी फ़ंक्शन `f` को आंतरिक रूप से कॉल नहीं किया जा सकता है (यानी, `f()` काम नहीं करता है, लेकिन `this.f()` काम करता है)।

वे `public` या `private` भी हो सकते हैं

- `public` फ़ंक्शन को अनुबंध के भीतर से आंतरिक रूप से या संदेशों के माध्यम से बाहरी रूप से कॉल किया जा सकता है
- `private` फ़ंक्शन केवल उस अनुबंध के लिए दृश्यमान होते हैं जिसमें वे परिभाषित होते हैं और प्राप्त (derived) अनुबंधों में नहीं

फ़ंक्शन और स्थिति चर दोनों को सार्वजनिक (public) या निजी (private) बनाया जा सकता है

यहाँ अनुबंध पर स्थिति चर को अपडेट करने के लिए एक फ़ंक्शन दिया गया है:

```solidity
// Solidity उदाहरण
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` प्रकार का पैरामीटर `value` फ़ंक्शन में पास किया जाता है: `update_name`
- इसे `public` घोषित किया गया है, जिसका अर्थ है कि कोई भी इसे एक्सेस कर सकता है
- इसे `view` घोषित नहीं किया गया है, इसलिए यह अनुबंध की स्थिति को संशोधित कर सकता है

### व्यू (View) फ़ंक्शन {#view-functions}

ये फ़ंक्शन अनुबंध के डेटा की स्थिति को संशोधित न करने का वादा करते हैं। सामान्य उदाहरण "गेटर (getter)" फ़ंक्शन हैं - उदाहरण के लिए आप इसका उपयोग उपयोगकर्ता का बैलेंस प्राप्त करने के लिए कर सकते हैं।

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

स्थिति को संशोधित करना क्या माना जाता है:

1. स्थिति चरों में लिखना।
2. [घटनाएँ उत्सर्जित (emit) करना](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)।
3. [अन्य अनुबंध बनाना](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)।
4. `selfdestruct` का उपयोग करना।
5. कॉल के माध्यम से ईथर भेजना।
6. किसी भी ऐसे फ़ंक्शन को कॉल करना जिसे `view` या `pure` के रूप में चिह्नित नहीं किया गया है।
7. लो-लेवल कॉल का उपयोग करना।
8. इनलाइन असेंबली का उपयोग करना जिसमें कुछ ओपकोड (opcodes) होते हैं।

### कंस्ट्रक्टर फ़ंक्शन {#constructor-functions}

`constructor` फ़ंक्शन केवल एक बार निष्पादित होते हैं जब अनुबंध पहली बार तैनात किया जाता है। कई क्लास-आधारित प्रोग्रामिंग भाषाओं में `constructor` की तरह, ये फ़ंक्शन अक्सर स्थिति चरों को उनके निर्दिष्ट मानों पर इनिशियलाइज़ करते हैं।

```solidity
// Solidity उदाहरण
// अनुबंध के डेटा को प्रारंभ करता है, `owner` को सेट करता है
// अनुबंध निर्माता के पते पर।
constructor() public {
    // सभी स्मार्ट अनुबंध अपने कार्यों को ट्रिगर करने के लिए बाहरी लेन-देन पर निर्भर करते हैं।
    // `msg` एक वैश्विक चर है जिसमें दिए गए लेन-देन पर प्रासंगिक डेटा शामिल है,
    // जैसे कि प्रेषक का पता और लेन-देन में शामिल ETH मूल्य।
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

### अंतर्निहित (Built-in) फ़ंक्शन {#built-in-functions}

आपके द्वारा अपने अनुबंध पर परिभाषित किए गए चरों और फ़ंक्शन के अलावा, कुछ विशेष अंतर्निहित फ़ंक्शन होते हैं। सबसे स्पष्ट उदाहरण है:

- `address.send()` – Solidity
- `send(address)` – Vyper

ये अनुबंधों को अन्य खातों में ETH भेजने की अनुमति देते हैं।

## फ़ंक्शन लिखना {#writing-functions}

आपके फ़ंक्शन को आवश्यकता है:

- पैरामीटर चर और प्रकार (यदि यह पैरामीटर स्वीकार करता है)
- आंतरिक/बाहरी (internal/external) की घोषणा
- शुद्ध/दृश्य/देय (pure/view/payable) की घोषणा
- रिटर्न प्रकार (यदि यह कोई मान लौटाता है)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // स्थिति चर

    // अनुबंध तैनात होने पर कॉल किया जाता है और मूल्य को प्रारंभ करता है
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get फ़ंक्शन
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set फ़ंक्शन
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

एक पूर्ण अनुबंध कुछ इस तरह दिख सकता है। यहाँ `constructor` फ़ंक्शन `dapp_name` चर के लिए एक प्रारंभिक मान प्रदान करता है।

## घटनाएँ और लॉग {#events-and-logs}

घटनाएँ आपके स्मार्ट अनुबंध को आपके फ्रंटएंड या अन्य सब्सक्राइबिंग एप्लिकेशन के साथ संवाद करने में सक्षम बनाती हैं। एक बार जब कोई लेन-देन मान्य हो जाता है और ब्लॉक में जुड़ जाता है, तो स्मार्ट अनुबंध घटनाएँ उत्सर्जित कर सकते हैं और जानकारी लॉग कर सकते हैं, जिसे फ्रंटएंड फिर प्रोसेस और उपयोग कर सकता है।

## एनोटेट किए गए उदाहरण {#annotated-examples}

ये Solidity में लिखे गए कुछ उदाहरण हैं। यदि आप कोड के साथ प्रयोग करना चाहते हैं, तो आप [Remix](https://remix.ethereum.org) में उनके साथ इंटरैक्ट कर सकते हैं।

### हैलो वर्ल्ड {#hello-world}

```solidity
// सिमेंटिक वर्ज़निंग का उपयोग करके Solidity का संस्करण निर्दिष्ट करता है।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध कार्यों और डेटा (इसकी स्थिति) का एक संग्रह है।
// एक बार तैनात होने के बाद, एक अनुबंध इथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` प्रकार का एक स्थिति चर `message` घोषित करता है।
    // स्थिति चर वे चर होते हैं जिनके मूल्य स्थायी रूप से अनुबंध स्टोरेज में संग्रहीत होते हैं।
    // `public` कीवर्ड चरों को अनुबंध के बाहर से सुलभ बनाता है
    // और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मूल्य तक पहुंचने के लिए कॉल कर सकते हैं।
    string public message;

    // कई क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, एक कंस्ट्रक्टर
    // एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
    // कंस्ट्रक्टर का उपयोग अनुबंध के डेटा को प्रारंभ करने के लिए किया जाता है।
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // एक स्ट्रिंग तर्क `initMessage` स्वीकार करता है और मूल्य को
        // अनुबंध के `message` स्टोरेज चर में सेट करता है)।
        message = initMessage;
    }

    // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है
    // और `message` स्टोरेज चर को अपडेट करता है।
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### टोकन {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // एक पता ईमेल पते के तुलनीय है - इसका उपयोग इथेरियम पर किसी खाते की पहचान करने के लिए किया जाता है।
    // पते एक स्मार्ट अनुबंध या बाहरी (उपयोगकर्ता) खातों का प्रतिनिधित्व कर सकते हैं।
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // एक `mapping` अनिवार्य रूप से एक हैश टेबल डेटा संरचना है।
    // यह `mapping` एक पते (टोकन धारक) को एक अहस्ताक्षरित पूर्णांक (टोकन बैलेंस) प्रदान करता है।
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // घटनाएँ ब्लॉकचेन पर गतिविधि की लॉगिंग की अनुमति देती हैं।
    // इथेरियम क्लाइंट अनुबंध की स्थिति में बदलावों पर प्रतिक्रिया देने के लिए घटनाओं को सुन सकते हैं।
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // अनुबंध के डेटा को प्रारंभ करता है, `owner` को सेट करता है
    // अनुबंध निर्माता के पते पर।
    constructor() public {
        // सभी स्मार्ट अनुबंध अपने कार्यों को ट्रिगर करने के लिए बाहरी लेन-देन पर निर्भर करते हैं।
        // `msg` एक वैश्विक चर है जिसमें दिए गए लेन-देन पर प्रासंगिक डेटा शामिल है,
        // जैसे कि प्रेषक का पता और लेन-देन में शामिल ETH मूल्य।
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // नए टोकन की एक मात्रा बनाता है और उन्हें एक पते पर भेजता है।
    function mint(address receiver, uint amount) public {
        // `require` एक नियंत्रण संरचना है जिसका उपयोग कुछ शर्तों को लागू करने के लिए किया जाता है।
        // यदि एक `require` कथन `false` का मूल्यांकन करता है, तो एक अपवाद ट्रिगर होता है,
        // जो वर्तमान कॉल के दौरान स्थिति में किए गए सभी परिवर्तनों को वापस कर देता है।
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // केवल अनुबंध स्वामी ही इस फ़ंक्शन को कॉल कर सकता है
        require(msg.sender == owner, "You are not the owner.");

        // टोकन की अधिकतम मात्रा लागू करता है
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` के बैलेंस को `amount` से बढ़ाता है
        balances[receiver] += amount;
    }

    // किसी भी कॉलर से एक पते पर मौजूदा टोकन की एक मात्रा भेजता है।
    function transfer(address receiver, uint amount) public {
        // भेजने के लिए प्रेषक के पास पर्याप्त टोकन होने चाहिए
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // दोनों पतों के टोकन बैलेंस को समायोजित करता है
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // पहले परिभाषित घटना का उत्सर्जन करता है
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### अद्वितीय डिजिटल संपत्ति {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// अन्य फ़ाइलों से प्रतीकों को वर्तमान अनुबंध में आयात करता है।
// इस मामले में, OpenZeppelin से सहायक अनुबंधों की एक श्रृंखला।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` कीवर्ड का उपयोग बाहरी अनुबंधों से कार्यों और कीवर्ड को इनहेरिट करने के लिए किया जाता है।
// इस मामले में, `CryptoPizza` `IERC721` और `ERC165` अनुबंधों से इनहेरिट करता है।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // अंकगणितीय कार्यों को सुरक्षित रूप से करने के लिए OpenZeppelin की SafeMath लाइब्रेरी का उपयोग करता है।
    // अधिक जानें: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity में निरंतर स्थिति चर अन्य भाषाओं के समान हैं
    // लेकिन आपको एक ऐसे व्यंजक से असाइन करना होगा जो संकलन समय पर निरंतर हो।
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct प्रकार आपको अपना स्वयं का प्रकार परिभाषित करने देते हैं
    // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza structs का एक खाली ऐरे बनाता है
    Pizza[] public pizzas;

    // पिज्जा ID से उसके मालिक के पते तक मैपिंग
    mapping(uint256 => address) public pizzaToOwner;

    // मालिक के पते से स्वामित्व वाले टोकन की संख्या तक मैपिंग
    mapping(address => uint256) public ownerPizzaCount;

    // टोकन ID से स्वीकृत पते तक मैपिंग
    mapping(uint256 => address) pizzaApprovals;

    // आप मैपिंग को नेस्ट कर सकते हैं, यह उदाहरण मालिक को ऑपरेटर की स्वीकृतियों से मैप करता है
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // स्ट्रिंग (नाम) और DNA से एक यादृच्छिक पिज्जा बनाने के लिए आंतरिक फ़ंक्शन
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` कीवर्ड का अर्थ है कि यह फ़ंक्शन केवल
        // इस अनुबंध और इस अनुबंध से प्राप्त अनुबंधों के भीतर दिखाई देता है
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` एक फ़ंक्शन संशोधक है जो जांचता है कि क्या पिज्जा पहले से मौजूद है
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // पिज्जा के ऐरे में पिज्जा जोड़ता है और id प्राप्त करता है
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // जांचता है कि पिज्जा का मालिक वर्तमान उपयोगकर्ता के समान है
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // ध्यान दें कि address(0) शून्य पता है,
        // जो यह दर्शाता है कि pizza[id] अभी तक किसी विशेष उपयोगकर्ता को आवंटित नहीं किया गया है।

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

    // स्ट्रिंग (नाम) और मालिक (निर्माता) के पते से यादृच्छिक DNA उत्पन्न करता है
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` के रूप में चिह्नित फ़ंक्शन स्थिति को न पढ़ने या संशोधित न करने का वादा करते हैं
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // स्ट्रिंग (नाम) + पते (मालिक) से यादृच्छिक uint उत्पन्न करता है
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // मालिक द्वारा पाए गए पिज्जा का ऐरे लौटाता है
    function getPizzasByOwner(address _owner)
        public
        // `view` के रूप में चिह्नित फ़ंक्शन स्थिति को संशोधित न करने का वादा करते हैं
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory` स्टोरेज स्थान का उपयोग मूल्यों को केवल
        // इस फ़ंक्शन कॉल के जीवनचक्र के लिए संग्रहीत करने के लिए करता है।
        // अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // पिज्जा और स्वामित्व को अन्य पते पर स्थानांतरित करता है
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // आयातित IERC721 अनुबंध में परिभाषित घटना का उत्सर्जन करता है
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * दिए गए टोकन ID के स्वामित्व को सुरक्षित रूप से किसी अन्य पते पर स्थानांतरित करता है
     * यदि लक्ष्य पता एक अनुबंध है, तो इसे `onERC721Received` लागू करना चाहिए,
     * जिसे सुरक्षित स्थानांतरण पर कॉल किया जाता है, और जादुई मूल्य
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` लौटाना चाहिए;
     * अन्यथा, स्थानांतरण वापस कर दिया जाता है।
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * दिए गए टोकन ID के स्वामित्व को सुरक्षित रूप से किसी अन्य पते पर स्थानांतरित करता है
     * यदि लक्ष्य पता एक अनुबंध है, तो इसे `onERC721Received` लागू करना चाहिए,
     * जिसे सुरक्षित स्थानांतरण पर कॉल किया जाता है, और जादुई मूल्य
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` लौटाना चाहिए;
     * अन्यथा, स्थानांतरण वापस कर दिया जाता है।
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
     * लक्ष्य पते पर `onERC721Received` को लागू करने के लिए आंतरिक फ़ंक्शन
     * यदि लक्ष्य पता एक अनुबंध नहीं है तो कॉल निष्पादित नहीं की जाती है
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

    // पिज्जा को बर्न करता है - टोकन को पूरी तरह से नष्ट कर देता है
    // `external` फ़ंक्शन संशोधक का अर्थ है कि यह फ़ंक्शन
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

    // पते के अनुसार पिज्जा की संख्या लौटाता है
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id द्वारा पाए गए पिज्जा का मालिक लौटाता है
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // पिज्जा के स्वामित्व को स्थानांतरित करने के लिए अन्य पते को स्वीकृति देता है
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
     * दिए गए टोकन ID की वर्तमान स्वीकृति को साफ़ करने के लिए निजी फ़ंक्शन
     * यदि दिया गया पता वास्तव में टोकन का मालिक नहीं है तो वापस कर देता है
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
     * एक ऑपरेटर को प्रेषक की ओर से उनके सभी टोकन स्थानांतरित करने की अनुमति है
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // बताता है कि क्या किसी दिए गए मालिक द्वारा ऑपरेटर को स्वीकृति दी गई है
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

    // जांचता है कि क्या पिज्जा मौजूद है
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // जांचता है कि क्या पता मालिक है या पिज्जा स्थानांतरित करने के लिए स्वीकृत है
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // solium जांच को अक्षम करें क्योंकि
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // जांचें कि क्या पिज्जा अद्वितीय है और अभी तक मौजूद नहीं है
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

    // लौटाता है कि क्या लक्ष्य पता एक अनुबंध है
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // वर्तमान में यह जांचने का कोई बेहतर तरीका नहीं है कि किसी पते में कोई अनुबंध है या नहीं
        // बजाय इसके कि उस पते पर कोड के आकार की जांच की जाए।
        // देखें https://ethereum.stackexchange.com/a/14016/36603
        // यह कैसे काम करता है, इसके बारे में अधिक जानकारी के लिए।
        // TODO Serenity रिलीज़ से पहले इसे फिर से जांचें, क्योंकि तब सभी पते
        // अनुबंध होंगे।
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## आगे की पढ़ाई {#further-reading}

स्मार्ट अनुबंधों के अधिक पूर्ण अवलोकन के लिए Solidity और Vyper के दस्तावेज़ देखें:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## संबंधित विषय {#related-topics}

- [स्मार्ट अनुबंध](/developers/docs/smart-contracts/)
- [इथेरियम वर्चुअल मशीन](/developers/docs/evm/)

## संबंधित ट्यूटोरियल {#related-tutorials}

- [अनुबंध आकार सीमा से लड़ने के लिए अनुबंधों का आकार कम करना](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– आपके स्मार्ट अनुबंध के आकार को कम करने के लिए कुछ व्यावहारिक सुझाव।_
- [घटनाओं के साथ स्मार्ट अनुबंधों से डेटा लॉग करना](/developers/tutorials/logging-events-smart-contracts/) _– स्मार्ट अनुबंध घटनाओं का परिचय और आप डेटा लॉग करने के लिए उनका उपयोग कैसे कर सकते हैं।_
- [Solidity से अन्य अनुबंधों के साथ इंटरैक्ट करें](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– मौजूदा अनुबंध से स्मार्ट अनुबंध कैसे तैनात करें और उसके साथ कैसे इंटरैक्ट करें।_