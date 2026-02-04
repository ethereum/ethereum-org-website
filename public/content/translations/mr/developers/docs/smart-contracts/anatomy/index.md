---
title: "स्मार्ट करारांची रचना"
description: "स्मार्ट कराराच्या रचनेचा सखोल अभ्यास – फंक्शन्स, डेटा आणि व्हेरिएबल्स."
lang: mr
---

स्मार्ट करार हा एक प्रोग्राम आहे जो Ethereum वरील एका पत्त्यावर (address) चालतो. ते डेटा आणि फंक्शन्सचे बनलेले असतात जे व्यवहार (transaction) प्राप्त झाल्यावर कार्यान्वित होऊ शकतात. स्मार्ट करार कशाने बनलेला आहे याचा आढावा येथे आहे.

## पूर्वतयारी {#prerequisites}

आपण प्रथम [स्मार्ट करार](/developers/docs/smart-contracts/) बद्दल वाचले असल्याची खात्री करा. हा दस्तऐवज असे गृहीत धरतो की आपण आधीच JavaScript किंवा Python सारख्या प्रोग्रामिंग भाषांशी परिचित आहात.

## डेटा {#data}

कोणताही करार डेटा एका स्थानावर नियुक्त करणे आवश्यक आहे: एकतर `storage` किंवा `memory` मध्ये. स्मार्ट करारामध्ये स्टोरेजमध्ये बदल करणे महाग आहे, त्यामुळे तुमचा डेटा कोठे राहावा याचा विचार करणे आवश्यक आहे.

### स्टोरेज {#storage}

पर्सिस्टंट डेटाला स्टोरेज म्हणून संबोधले जाते आणि ते स्टेट व्हेरिएबल्सद्वारे दर्शविले जाते. ही मूल्ये कायमस्वरूपी ब्लॉकचेनवर संग्रहित केली जातात. तुम्ही प्रकार घोषित करणे आवश्यक आहे जेणेकरून करार संकलित (compile) झाल्यावर त्याला ब्लॉकचेनवर किती स्टोरेजची आवश्यकता आहे याचा मागोवा ठेवू शकेल.

```solidity
// सॉलिडिटी उदाहरण
contract SimpleStorage {
    uint storedData; // स्टेट व्हेरिएबल
    // ...
}
```

```python
# Vyper उदाहरण
storedData: int128
```

जर तुम्ही आधीच ऑब्जेक्ट-ओरिएंटेड भाषा प्रोग्राम केल्या असतील, तर तुम्ही बहुतांश प्रकारांशी परिचित असाल. तथापि, जर तुम्ही Ethereum विकासासाठी नवीन असाल तर `address` तुमच्यासाठी नवीन असावा.

एक `address` प्रकार Ethereum पत्ता धारण करू शकतो जो 20 बाइट्स किंवा 160 बिट्सच्या समान असतो. हे अग्रगण्य 0x सह हेक्साडेसिमल नोटेशनमध्ये परत येते.

इतर प्रकारांमध्ये हे समाविष्ट आहे:

- बुलियन
- पूर्णांक
- फिक्स्ड पॉइंट नंबर्स
- निश्चित-आकाराचे बाइट अॅरे
- डायनॅमिक आकाराचे बाइट अॅरे
- रेशनल आणि पूर्णांक लिटरल्स
- स्ट्रिंग लिटरल्स
- हेक्साडेसिमल लिटरल्स
- एनम्स

अधिक स्पष्टीकरणासाठी, डॉक्सवर एक नजर टाका:

- [Vyper प्रकार पहा](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity प्रकार पहा](https://docs.soliditylang.org/en/latest/types.html#value-types)

### मेमरी {#memory}

जी मूल्ये केवळ करार फंक्शनच्या अंमलबजावणीच्या जीवनकाळासाठी संग्रहित केली जातात त्यांना मेमरी व्हेरिएबल्स म्हणतात. हे ब्लॉकचेनवर कायमस्वरूपी संग्रहित नसल्यामुळे, ते वापरण्यासाठी खूप स्वस्त आहेत.

EVM डेटा (स्टोरेज, मेमरी आणि स्टॅक) कसे संग्रहित करते याबद्दल [Solidity डॉक्स](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) मध्ये अधिक जाणून घ्या.

### एनव्हायरनमेंट व्हेरिएबल्स {#environment-variables}

आपण आपल्या करारावर परिभाषित केलेल्या व्हेरिएबल्सव्यतिरिक्त, काही विशेष ग्लोबल व्हेरिएबल्स आहेत. ते प्रामुख्याने ब्लॉकचेन किंवा सध्याच्या व्यवहाराबद्दल माहिती प्रदान करण्यासाठी वापरले जातात.

उदाहरणे:

| **प्रॉप**         | **स्टेट व्हेरिएबल** | **वर्णन**                                     |
| ----------------- | ------------------- | --------------------------------------------- |
| `block.timestamp` | uint256             | सध्याचा ब्लॉक इपॉक टाइमस्टॅम्प                |
| `msg.sender`      | पत्ता               | संदेशाचा प्रेषक (चालू कॉल) |

## फंक्शन्स {#functions}

अत्यंत सोप्या भाषेत सांगायचे झाल्यास, फंक्शन्स येणाऱ्या व्यवहारांना प्रतिसाद म्हणून माहिती मिळवू शकतात किंवा सेट करू शकतात.

फंक्शन कॉलचे दोन प्रकार आहेत:

- `internal` – हे EVM कॉल तयार करत नाहीत
  - अंतर्गत फंक्शन्स आणि स्टेट व्हेरिएबल्सना फक्त अंतर्गतच प्रवेश केला जाऊ शकतो (म्हणजे, चालू करारातून किंवा त्यातून मिळवलेल्या करारांमधून)
- `external` – हे EVM कॉल तयार करतात
  - बाह्य फंक्शन्स करार इंटरफेसचा भाग आहेत, याचा अर्थ ते इतर करारांमधून आणि व्यवहारांद्वारे कॉल केले जाऊ शकतात. एक बाह्य फंक्शन `f` अंतर्गत कॉल केले जाऊ शकत नाही (म्हणजे, `f()` कार्य करत नाही, परंतु `this.f()` कार्य करते).

ते `public` किंवा `private` देखील असू शकतात

- `public` फंक्शन्स कराराच्या आतून अंतर्गत किंवा संदेशांद्वारे बाह्यरित्या कॉल केले जाऊ शकतात
- `private` फंक्शन्स फक्त त्या करारासाठी दिसतात ज्यात ते परिभाषित केले आहेत आणि व्युत्पन्न करारांमध्ये नाहीत

फंक्शन्स आणि स्टेट व्हेरिएबल्स दोन्ही सार्वजनिक किंवा खाजगी केले जाऊ शकतात

करारावरील स्टेट व्हेरिएबल अपडेट करण्यासाठी येथे एक फंक्शन आहे:

```solidity
// Solidity उदाहरण
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` प्रकारचा पॅरामीटर `value` फंक्शनमध्ये पास केला जातो: `update_name`
- हे `सार्वजनिक` म्हणून घोषित केले आहे, म्हणजे कोणीही त्यात प्रवेश करू शकतो
- हे `व्ह्यू` म्हणून घोषित केलेले नाही, त्यामुळे ते कराराची स्थिती सुधारित करू शकते

### व्ह्यू फंक्शन्स {#view-functions}

ही फंक्शन्स कराराच्या डेटाच्या स्थितीमध्ये बदल न करण्याचे वचन देतात. सामान्य उदाहरणे म्हणजे "गेटर" फंक्शन्स – उदाहरणार्थ, तुम्ही याचा वापर वापरकर्त्याची शिल्लक मिळवण्यासाठी करू शकता.

```solidity
// सॉलिडिटी उदाहरण
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

स्टेट सुधारित करणे म्हणजे काय:

1. स्टेट व्हेरिएबल्समध्ये लिहिणे.
2. [इव्हेंट्स एमिट करणे](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [इतर करार तयार करणे](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` वापरणे.
5. कॉलद्वारे इथर पाठवणे.
6. `व्ह्यू` किंवा `प्युअर` म्हणून चिन्हांकित नसलेले कोणतेही फंक्शन कॉल करणे.
7. लो-लेव्हल कॉल्स वापरणे.
8. विशिष्ट ऑपकोड असलेले इनलाइन असेंब्ली वापरणे.

### कन्स्ट्रक्टर फंक्शन्स {#constructor-functions}

`constructor` फंक्शन्स फक्त एकदाच कार्यान्वित होतात जेव्हा करार प्रथम तैनात केला जातो. अनेक वर्ग-आधारित प्रोग्रामिंग भाषांमधील `कन्स्ट्रक्टर` प्रमाणे, ही फंक्शन्स अनेकदा स्टेट व्हेरिएबल्सना त्यांच्या निर्दिष्ट मूल्यांमध्ये सुरू करतात.

```solidity
// सॉलिडिटी उदाहरण
// कराराचा डेटा सुरू करते, `मालक` सेट करते
// करार निर्मात्याच्या पत्त्यावर.
constructor() public {
    // सर्व स्मार्ट करार त्यांची कार्ये सुरू करण्यासाठी बाह्य व्यवहारांवर अवलंबून असतात.
    // `msg` एक ग्लोबल व्हेरिएबल आहे ज्यात दिलेल्या व्यवहारावरील संबंधित डेटा समाविष्ट असतो,
    // जसे की प्रेषकाचा पत्ता आणि व्यवहारामध्ये समाविष्ट असलेले ETH मूल्य.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
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

### अंगभूत फंक्शन्स {#built-in-functions}

आपण आपल्या करारावर परिभाषित केलेल्या व्हेरिएबल्स आणि फंक्शन्स व्यतिरिक्त, काही विशेष अंगभूत फंक्शन्स आहेत. सर्वात स्पष्ट उदाहरण आहे:

- `address.send()` – Solidity
- `send(address)` – Vyper

हे करारांना इतर खात्यांवर ETH पाठविण्याची परवानगी देतात.

## फंक्शन्स लिहिणे {#writing-functions}

तुमच्या फंक्शनला आवश्यक आहे:

- पॅरामीटर व्हेरिएबल आणि प्रकार (जर ते पॅरामीटर्स स्वीकारत असेल तर)
- अंतर्गत/बाह्य ची घोषणा
- प्युअर/व्ह्यू/पेएबल ची घोषणा
- रिटर्न्स प्रकार (जर ते मूल्य परत करत असेल तर)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // स्टेट व्हेरिएबल

    // जेव्हा करार तैनात केला जातो आणि मूल्य सुरू करतो तेव्हा कॉल केला जातो
    constructor() public {
        dapp_name = "माझे उदाहरण dapp";
    }

    // फंक्शन मिळवा
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // फंक्शन सेट करा
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

एक संपूर्ण करार काहीसा असा दिसू शकतो. येथे `कन्स्ट्रक्टर` फंक्शन `dapp_name` व्हेरिएबलसाठी प्रारंभिक मूल्य प्रदान करते.

## इव्हेंट्स आणि लॉग {#events-and-logs}

इव्हेंट्स तुमच्या स्मार्ट कराराला तुमच्या फ्रंटएंड किंवा इतर सदस्यत्व घेतलेल्या ॲप्लिकेशन्ससह संवाद साधण्यास सक्षम करतात. एकदा व्यवहार प्रमाणित झाल्यावर आणि ब्लॉकमध्ये जोडला गेल्यावर, स्मार्ट करार इव्हेंट एमिट करू शकतात आणि माहिती लॉग करू शकतात, ज्यावर फ्रंटएंड नंतर प्रक्रिया आणि उपयोग करू शकतो.

## भाष्य केलेली उदाहरणे {#annotated-examples}

ही Solidity मध्ये लिहिलेली काही उदाहरणे आहेत. तुम्हाला कोडसोबत खेळायचे असल्यास, तुम्ही [Remix](http://remix.ethereum.org) मध्ये त्यांच्याशी संवाद साधू शकता.

### हॅलो वर्ल्ड {#hello-world}

```solidity
// सिमेंटिक व्हर्जनिंग वापरून Solidity चे व्हर्जन निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` नावाच्या कराराची व्याख्या करते.
// करार म्हणजे फंक्शन्स आणि डेटा (त्याची स्थिती) यांचा संग्रह.
// एकदा तैनात केल्यावर, करार Ethereum ब्लॉकचेनवरील एका विशिष्ट पत्त्यावर राहतो.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` प्रकाराचे `message` नावाचे स्टेट व्हेरिएबल घोषित करते.
    // स्टेट व्हेरिएबल्स म्हणजे अशी व्हेरिएबल्स ज्यांची मूल्ये करार स्टोरेजमध्ये कायमस्वरूपी संग्रहित केली जातात.
    // `public` कीवर्ड व्हेरिएबल्सना कराराच्या बाहेरून प्रवेश करण्यायोग्य बनवतो
    // आणि एक फंक्शन तयार करतो जे इतर करार किंवा क्लायंट मूल्यामध्ये प्रवेश करण्यासाठी कॉल करू शकतात.
    string public message;

    // अनेक वर्ग-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणे, कन्स्ट्रक्टर हे
    // एक विशेष फंक्शन आहे जे केवळ करार निर्मितीवर कार्यान्वित केले जाते.
    // कन्स्ट्रक्टरचा वापर कराराचा डेटा सुरू करण्यासाठी केला जातो.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // `initMessage` हे स्ट्रिंग वितर्क स्वीकारते आणि मूल्य सेट करते
        // कराराच्या `message` स्टोरेज व्हेरिएबलमध्ये).
        message = initMessage;
    }

    // एक सार्वजनिक फंक्शन जे स्ट्रिंग वितर्क स्वीकारते
    // आणि `message` स्टोरेज व्हेरिएबल अपडेट करते.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### टोकन {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `पत्ता` हा ईमेल पत्त्याच्या तुलनेत आहे - तो Ethereum वरील खाते ओळखण्यासाठी वापरला जातो.
    // पत्ते स्मार्ट करार किंवा बाह्य (वापरकर्ता) खात्यांचे प्रतिनिधित्व करू शकतात.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `मॅपिंग` ही मूलत: हॅश टेबल डेटा संरचना आहे.
    // हे `मॅपिंग` एका पत्त्याला (टोकन धारक) एक अनसाईन्ड पूर्णांक (टोकन शिल्लक) नियुक्त करते.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // इव्हेंट्स ब्लॉकचेनवरील क्रियाकलाप लॉग करण्याची परवानगी देतात.
    // Ethereum क्लायंट करार स्थितीतील बदलांवर प्रतिक्रिया देण्यासाठी इव्हेंट्स ऐकू शकतात.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // कराराचा डेटा सुरू करते, `मालक` सेट करते
    // करार निर्मात्याच्या पत्त्यावर.
    constructor() public {
        // सर्व स्मार्ट करार त्यांची कार्ये सुरू करण्यासाठी बाह्य व्यवहारांवर अवलंबून असतात.
        // `msg` एक ग्लोबल व्हेरिएबल आहे ज्यात दिलेल्या व्यवहारावरील संबंधित डेटा समाविष्ट असतो,
        // जसे की प्रेषकाचा पत्ता आणि व्यवहारामध्ये समाविष्ट असलेले ETH मूल्य.
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // नवीन टोकनची रक्कम तयार करते आणि ती पत्त्यावर पाठवते.
    function mint(address receiver, uint amount) public {
        // `require` ही एक नियंत्रण रचना आहे जी विशिष्ट अटी लागू करण्यासाठी वापरली जाते.
        // जर `require` विधान `false` म्हणून मूल्यांकन केले जाते, तर एक अपवाद ट्रिगर होतो,
        // जो चालू कॉल दरम्यान स्थितीत केलेले सर्व बदल परत करतो.
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // फक्त करार मालक हे फंक्शन कॉल करू शकतो
        require(msg.sender == owner, "तुम्ही मालक नाही.");

        // टोकनची कमाल रक्कम लागू करते
        require(amount < 1e60, "कमाल जारीकरण ओलांडले");

        // `amount` ने `receiver` ची शिल्लक वाढवते
        balances[receiver] += amount;
    }

    // कोणत्याही कॉलरकडून विद्यमान टोकनची रक्कम पत्त्यावर पाठवते.
    function transfer(address receiver, uint amount) public {
        // प्रेषकाकडे पाठवण्यासाठी पुरेसे टोकन असणे आवश्यक आहे
        require(amount <= balances[msg.sender], "अपुरी शिल्लक.");

        // दोन पत्त्यांची टोकन शिल्लक समायोजित करते
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // पूर्वी परिभाषित केलेला इव्हेंट एमिट करते
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### युनिक डिजिटल मालमत्ता {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// चालू करारामध्ये इतर फाईल्समधून चिन्हे आयात करते.
// या प्रकरणात, OpenZeppelin कडून मदतनीस करारांची मालिका.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` कीवर्ड बाह्य करारांमधून फंक्शन्स आणि कीवर्ड्स वारसा म्हणून घेण्यासाठी वापरला जातो.
// या प्रकरणात, `CryptoPizza` `IERC721` आणि `ERC165` करारांमधून वारसा घेते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // अंकगणित क्रिया सुरक्षितपणे करण्यासाठी OpenZeppelin च्या SafeMath लायब्ररीचा वापर करते.
    // अधिक जाणून घ्या: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity मधील स्थिर स्टेट व्हेरिएबल्स इतर भाषांसारखेच आहेत
    // परंतु तुम्ही एका अभिव्यक्तीतून नियुक्त करणे आवश्यक आहे जे संकलन वेळी स्थिर असते.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // स्ट्रक्ट प्रकार तुम्हाला तुमचा स्वतःचा प्रकार परिभाषित करू देतात
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza स्ट्रक्ट्सचा एक रिकामा अॅरे तयार करते
    Pizza[] public pizzas;

    // पिझ्झा आयडीपासून त्याच्या मालकाच्या पत्त्यापर्यंत मॅपिंग
    mapping(uint256 => address) public pizzaToOwner;

    // मालकाच्या पत्त्यापासून मालकीच्या टोकनच्या संख्येपर्यंत मॅपिंग
    mapping(address => uint256) public ownerPizzaCount;

    // टोकन आयडीपासून मंजूर पत्त्यापर्यंत मॅपिंग
    mapping(uint256 => address) pizzaApprovals;

    // तुम्ही मॅपिंग नेस्ट करू शकता, हे उदाहरण मालकाचे ऑपरेटर मंजुरीसाठी मॅप करते
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // स्ट्रिंग (नाव) आणि DNA वरून यादृच्छिक Pizza तयार करण्यासाठी अंतर्गत फंक्शन
    function _createPizza(string memory _name, uint256 _dna)
        // `अंतर्गत` कीवर्डचा अर्थ असा आहे की हे फंक्शन फक्त दिसते
        // या करारामध्ये आणि या करारातून मिळविलेल्या करारांमध्ये
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` हे एक फंक्शन मॉडिफायर आहे जे पिझ्झा आधीच अस्तित्वात आहे की नाही हे तपासते
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Pizzas च्या अॅरेमध्ये Pizza जोडते आणि आयडी मिळवते
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Pizza मालक सध्याच्या वापरकर्त्यासारखाच आहे हे तपासते
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // लक्षात घ्या की address(0) हा शून्य पत्ता आहे,
        // हे सूचित करते की pizza[id] अद्याप विशिष्ट वापरकर्त्याला वाटप केलेले नाही.

        assert(pizzaToOwner[id] == address(0));

        // Pizza ला मालकाशी मॅप करते
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // स्ट्रिंग (नाव) वरून यादृच्छिक Pizza तयार करते
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // स्ट्रिंग (नाव) आणि मालकाच्या (निर्माता) पत्त्यावरून यादृच्छिक DNA तयार करते
    function generateRandomDna(string memory _str, address _owner)
        public
        // `प्युअर` म्हणून चिन्हांकित केलेली फंक्शन्स स्टेटमधून वाचण्याचे किंवा त्यात बदल न करण्याचे वचन देतात
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // स्ट्रिंग (नाव) + पत्ता (मालक) पासून यादृच्छिक uint तयार करते
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // मालकाने शोधलेल्या Pizzas चा अॅरे परत करते
    function getPizzasByOwner(address _owner)
        public
        // `व्ह्यू` म्हणून चिन्हांकित केलेली फंक्शन्स स्टेटमध्ये बदल न करण्याचे वचन देतात
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // केवळ यासाठी मूल्ये संग्रहित करण्यासाठी `मेमरी` स्टोरेज स्थान वापरते
        // या फंक्शन कॉलचे जीवनचक्र.
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Pizza आणि मालकी दुसऱ्या पत्त्यावर हस्तांतरित करते
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "अवैध पत्ता.");
        require(_exists(_pizzaId), "पिझ्झा अस्तित्वात नाही.");
        require(_from != _to, "त्याच पत्त्यावर हस्तांतरित करू शकत नाही.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "पत्ता मंजूर नाही.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // आयात केलेल्या IERC721 करारामध्ये परिभाषित केलेला इव्हेंट एमिट करते
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * दिलेल्या टोकन आयडीची मालकी सुरक्षितपणे दुसऱ्या पत्त्यावर हस्तांतरित करते
     * जर लक्ष्य पत्ता करार असेल, तर त्याने `onERC721Received` लागू केले पाहिजे,
     * जे सुरक्षित हस्तांतरणावर कॉल केले जाते, आणि जादूई मूल्य परत करते
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * अन्यथा, हस्तांतरण परत केले जाते.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * दिलेल्या टोकन आयडीची मालकी सुरक्षितपणे दुसऱ्या पत्त्यावर हस्तांतरित करते
     * जर लक्ष्य पत्ता करार असेल, तर त्याने `onERC721Received` लागू केले पाहिजे,
     * जे सुरक्षित हस्तांतरणावर कॉल केले जाते, आणि जादूई मूल्य परत करते
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * अन्यथा, हस्तांतरण परत केले जाते.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "onERC721Received लागू करणे आवश्यक आहे.");
    }

    /**
     * लक्ष्य पत्त्यावर `onERC721Received` सुरू करण्यासाठी अंतर्गत फंक्शन
     * जर लक्ष्य पत्ता करार नसेल तर कॉल कार्यान्वित होत नाही
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

    // पिझ्झा जाळतो - टोकन पूर्णपणे नष्ट करतो
    // `बाह्य` फंक्शन मॉडिफायरचा अर्थ असा आहे की हे फंक्शन आहे
    // करार इंटरफेसचा भाग आणि इतर करार त्याला कॉल करू शकतात
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "अवैध पत्ता.");
        require(_exists(_pizzaId), "पिझ्झा अस्तित्वात नाही.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "पत्ता मंजूर नाही.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // पत्त्यानुसार Pizzas ची संख्या परत करते
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // आयडीनुसार सापडलेल्या Pizza चा मालक परत करते
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "अवैध पिझ्झा आयडी.");
        return owner;
    }

    // Pizza ची मालकी हस्तांतरित करण्यासाठी दुसऱ्या पत्त्याला मंजूर करते
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "पिझ्झा मालक असणे आवश्यक आहे.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // विशिष्ट Pizza साठी मंजूर केलेला पत्ता परत करते
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "पिझ्झा अस्तित्वात नाही.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * दिलेल्या टोकन आयडीची चालू मंजुरी साफ करण्यासाठी खाजगी फंक्शन
     * दिलेला पत्ता खरोखर टोकनचा मालक नसल्यास परत करते
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "पिझ्झा मालक असणे आवश्यक आहे.");
        require(_exists(_pizzaId), "पिझ्झा अस्तित्वात नाही.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * दिलेल्या ऑपरेटरची मंजुरी सेट किंवा अनसेट करते
     * ऑपरेटरला त्यांच्या वतीने प्रेषकाचे सर्व टोकन हस्तांतरित करण्याची परवानगी आहे
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "स्वतःचा पत्ता मंजूर करू शकत नाही");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // दिलेला मालक ऑपरेटरला मंजूर करतो की नाही हे सांगते
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Pizza ची मालकी घेते - फक्त मंजूर वापरकर्त्यांसाठी
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "पत्ता मंजूर नाही.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Pizza अस्तित्वात आहे की नाही हे तपासते
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // पत्ता मालक आहे की Pizza हस्तांतरित करण्यासाठी मंजूर आहे हे तपासते
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Pizza युनिक आहे आणि अद्याप अस्तित्वात नाही हे तपासा
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
        require(result, "अशा नावाचा पिझ्झा आधीच अस्तित्वात आहे.");
        _;
    }

    // लक्ष्य पत्ता करार आहे की नाही हे परत करते
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // सध्या पत्त्यावर करार आहे की नाही हे तपासण्याचा कोणताही चांगला मार्ग नाही
        // त्या पत्त्यावरील कोडचा आकार तपासण्यापेक्षा.
        // हे कसे कार्य करते याबद्दल अधिक माहितीसाठी https://ethereum.stackexchange.com/a/14016/36603 पहा.
        // TODO Serenity रिलीज होण्यापूर्वी हे पुन्हा तपासा, कारण तेव्हा सर्व पत्ते
        // करार असतील.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## पुढील वाचन {#further-reading}

स्मार्ट करारांच्या अधिक संपूर्ण विहंगावलोकनासाठी Solidity आणि Vyper चे दस्तऐवजीकरण पहा:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## संबंधित विषय {#related-topics}

- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [Ethereum व्हर्च्युअल मशीन](/developers/docs/evm/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [करार आकार मर्यादेशी लढण्यासाठी करार कमी करणे](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– तुमच्या स्मार्ट कराराचा आकार कमी करण्यासाठी काही व्यावहारिक टिप्स._
- [इव्हेंटसह स्मार्ट करारांमधून डेटा लॉग करणे](/developers/tutorials/logging-events-smart-contracts/) _– स्मार्ट करार इव्हेंटची ओळख आणि डेटा लॉग करण्यासाठी तुम्ही त्यांचा कसा वापर करू शकता._
- [Solidity वरून इतर करारांशी संवाद साधा](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– विद्यमान करारातून स्मार्ट करार कसा तैनात करायचा आणि त्याच्याशी संवाद कसा साधायचा._
