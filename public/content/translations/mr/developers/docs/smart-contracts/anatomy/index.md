---
title: "स्मार्ट कॉन्ट्रॅक्ट्सची रचना"
description: "स्मार्ट कॉन्ट्रॅक्टच्या रचनेचा सखोल आढावा – फंक्शन्स, डेटा आणि व्हेरिएबल्स."
lang: mr
---

स्मार्ट कॉन्ट्रॅक्ट हा एक प्रोग्राम आहे जो इथेरियमवरील एका पत्त्यावर चालतो. ते डेटा आणि फंक्शन्सचे बनलेले असतात जे व्यवहार प्राप्त झाल्यावर कार्यान्वित होऊ शकतात. स्मार्ट कॉन्ट्रॅक्ट कशाचे बनलेले असते याचा हा एक आढावा आहे.

## पूर्वअटी {#prerequisites}

प्रथम तुम्ही [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/) बद्दल वाचले असल्याची खात्री करा. या दस्तऐवजात असे गृहीत धरले आहे की तुम्हाला JavaScript किंवा Python सारख्या प्रोग्रामिंग भाषांची आधीच माहिती आहे.

## डेटा {#data}

कोणताही कॉन्ट्रॅक्ट डेटा एका स्थानावर नियुक्त केलेला असणे आवश्यक आहे: एकतर `storage` किंवा `memory` वर. स्मार्ट कॉन्ट्रॅक्टमध्ये स्टोरेज बदलणे महाग असते, त्यामुळे तुमचा डेटा कुठे असावा याचा विचार करणे आवश्यक आहे.

### स्टोरेज {#storage}

कायमस्वरूपी डेटाला स्टोरेज म्हटले जाते आणि ते स्थिती व्हेरिएबल्सद्वारे दर्शविले जाते. ही मूल्ये ब्लॉकचेनवर कायमस्वरूपी साठवली जातात. तुम्हाला प्रकार (type) घोषित करणे आवश्यक आहे जेणेकरून कॉन्ट्रॅक्ट संकलित (compile) होताना ब्लॉकचेनवर किती स्टोरेज आवश्यक आहे याचा मागोवा ठेवू शकेल.

```solidity
// Solidity उदाहरण
contract SimpleStorage {
    uint storedData; // स्थिती व्हेरिएबल
    // ...
}
```

```python
# Vyper उदाहरण
storedData: int128
```

जर तुम्ही आधीच ऑब्जेक्ट-ओरिएंटेड भाषांमध्ये प्रोग्रामिंग केले असेल, तर तुम्हाला बहुधा बहुतेक प्रकारांची माहिती असेल. तथापि, जर तुम्ही [इथेरियम](/) डेव्हलपमेंटसाठी नवीन असाल तर `address` तुमच्यासाठी नवीन असावे.

`address` प्रकार इथेरियम पत्ता धारण करू शकतो जो 20 बाइट्स किंवा 160 बिट्सच्या समतुल्य असतो. तो 0x ने सुरू होणाऱ्या हेक्साडेसिमल नोटेशनमध्ये परत येतो.

इतर प्रकारांमध्ये हे समाविष्ट आहे:

- बुलियन (boolean)
- इंटिजर (integer)
- फिक्स्ड पॉइंट नंबर्स
- फिक्स्ड-साइज बाइट अ‍ॅरे
- डायनॅमिकली साइज्ड बाइट अ‍ॅरे
- रॅशनल आणि इंटिजर लिटरल्स
- स्ट्रिंग लिटरल्स
- हेक्साडेसिमल लिटरल्स
- एनम्स (enums)

अधिक स्पष्टीकरणासाठी, डॉक्स पहा:

- [Vyper प्रकार पहा](https://docs.vyperlang.org/en/stable/types.html#value-types)
- [Solidity प्रकार पहा](https://docs.soliditylang.org/en/latest/types.html#value-types)

### मेमरी {#memory}

जी मूल्ये केवळ कॉन्ट्रॅक्ट फंक्शनच्या अंमलबजावणीच्या कालावधीसाठी साठवली जातात त्यांना मेमरी व्हेरिएबल्स म्हणतात. ही मूल्ये ब्लॉकचेनवर कायमस्वरूपी साठवली जात नसल्यामुळे, ती वापरण्यासाठी खूप स्वस्त असतात.

EVM डेटा कसा साठवतो (स्टोरेज, मेमरी आणि स्टॅक) याबद्दल [Solidity डॉक्स](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) मध्ये अधिक जाणून घ्या.

### एन्व्हायर्नमेंट व्हेरिएबल्स {#environment-variables}

तुम्ही तुमच्या कॉन्ट्रॅक्टवर परिभाषित केलेल्या व्हेरिएबल्स व्यतिरिक्त, काही विशेष ग्लोबल व्हेरिएबल्स असतात. ते प्रामुख्याने ब्लॉकचेन किंवा वर्तमान व्यवहाराबद्दल माहिती प्रदान करण्यासाठी वापरले जातात.

उदाहरणे:

| **प्रॉप (Prop)** | **स्थिती व्हेरिएबल** | **वर्णन** |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256 | वर्तमान ब्लॉक पर्व (epoch) टाइमस्टॅम्प |
| `msg.sender` | address | संदेश पाठवणारा (वर्तमान कॉल) |

## फंक्शन्स {#functions}

सर्वात सोप्या शब्दांत सांगायचे तर, फंक्शन्स येणाऱ्या व्यवहारांना प्रतिसाद म्हणून माहिती मिळवू शकतात किंवा माहिती सेट करू शकतात.

फंक्शन कॉल्सचे दोन प्रकार आहेत:

- `internal` – हे EVM कॉल तयार करत नाहीत
  - अंतर्गत फंक्शन्स आणि स्थिती व्हेरिएबल्स केवळ अंतर्गतपणे अ‍ॅक्सेस केले जाऊ शकतात (म्हणजेच, वर्तमान कॉन्ट्रॅक्टमधून किंवा त्यातून प्राप्त झालेल्या कॉन्ट्रॅक्ट्समधून)
- `external` – हे EVM कॉल तयार करतात
  - बाह्य फंक्शन्स कॉन्ट्रॅक्ट इंटरफेसचा भाग असतात, याचा अर्थ ते इतर कॉन्ट्रॅक्ट्समधून आणि व्यवहारांद्वारे कॉल केले जाऊ शकतात. बाह्य फंक्शन `f` ला अंतर्गतपणे कॉल केले जाऊ शकत नाही (म्हणजेच, `f()` काम करत नाही, परंतु `this.f()` काम करते).

ते `public` किंवा `private` देखील असू शकतात

- `public` फंक्शन्स कॉन्ट्रॅक्टमधून अंतर्गतपणे किंवा संदेशांद्वारे बाह्यरित्या कॉल केले जाऊ शकतात
- `private` फंक्शन्स केवळ ज्या कॉन्ट्रॅक्टमध्ये ते परिभाषित केले आहेत त्यासाठी दृश्यमान असतात आणि प्राप्त झालेल्या कॉन्ट्रॅक्ट्समध्ये नसतात

फंक्शन्स आणि स्थिती व्हेरिएबल्स दोन्ही सार्वजनिक (public) किंवा खाजगी (private) केले जाऊ शकतात

कॉन्ट्रॅक्टवरील स्थिती व्हेरिएबल अपडेट करण्यासाठी येथे एक फंक्शन आहे:

```solidity
// Solidity उदाहरण
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` प्रकाराचा पॅरामीटर `value` फंक्शनमध्ये पास केला जातो: `update_name`
- ते `public` घोषित केले आहे, याचा अर्थ कोणीही ते अ‍ॅक्सेस करू शकतो
- ते `view` घोषित केलेले नाही, त्यामुळे ते कॉन्ट्रॅक्टची स्थिती बदलू शकते

### व्ह्यू (View) फंक्शन्स {#view-functions}

ही फंक्शन्स कॉन्ट्रॅक्टच्या डेटाची स्थिती न बदलण्याचे वचन देतात. सामान्य उदाहरणे म्हणजे "गेटर (getter)" फंक्शन्स – उदाहरणार्थ, वापरकर्त्याची शिल्लक (balance) प्राप्त करण्यासाठी तुम्ही याचा वापर करू शकता.

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

स्थिती बदलणे कशाला मानले जाते:

1. स्थिती व्हेरिएबल्समध्ये लिहिणे.
2. [घटना (events) उत्सर्जित करणे](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [इतर कॉन्ट्रॅक्ट्स तयार करणे](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` वापरणे.
5. कॉल्सद्वारे इथर पाठवणे.
6. `view` किंवा `pure` म्हणून चिन्हांकित नसलेल्या कोणत्याही फंक्शनला कॉल करणे.
7. लो-लेव्हल कॉल्स वापरणे.
8. विशिष्ट ऑपकोड्स (opcodes) असलेल्या इनलाइन असेंब्लीचा वापर करणे.

### कन्स्ट्रक्टर फंक्शन्स {#constructor-functions}

`constructor` फंक्शन्स केवळ एकदाच कार्यान्वित होतात जेव्हा कॉन्ट्रॅक्ट प्रथम प्रस्थापित केले जाते. अनेक क्लास-आधारित प्रोग्रामिंग भाषांमधील `constructor` प्रमाणे, ही फंक्शन्स अनेकदा स्थिती व्हेरिएबल्स त्यांच्या निर्दिष्ट मूल्यांवर इनिशियलाइज करतात.

```solidity
// Solidity उदाहरण
// कॉन्ट्रॅक्टचा डेटा आरंभ करते, `owner` सेट करते
// कॉन्ट्रॅक्ट निर्मात्याच्या पत्त्यावर.
constructor() public {
    // सर्व स्मार्ट कॉन्ट्रॅक्ट्स त्यांची कार्ये ट्रिगर करण्यासाठी बाह्य व्यवहारांवर अवलंबून असतात.
    // `msg` हे एक ग्लोबल व्हेरिएबल आहे ज्यामध्ये दिलेल्या व्यवहारावरील संबंधित डेटा समाविष्ट असतो,
    // जसे की पाठवणाऱ्याचा पत्ता आणि व्यवहारात समाविष्ट असलेले ETH मूल्य.
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

### अंगभूत (Built-in) फंक्शन्स {#built-in-functions}

तुम्ही तुमच्या कॉन्ट्रॅक्टवर परिभाषित केलेल्या व्हेरिएबल्स आणि फंक्शन्स व्यतिरिक्त, काही विशेष अंगभूत फंक्शन्स असतात. सर्वात स्पष्ट उदाहरण म्हणजे:

- `address.send()` – Solidity
- `send(address)` – Vyper

हे कॉन्ट्रॅक्ट्सना इतर खात्यांवर ETH पाठविण्याची परवानगी देतात.

## फंक्शन्स लिहिणे {#writing-functions}

तुमच्या फंक्शनला याची आवश्यकता असते:

- पॅरामीटर व्हेरिएबल आणि प्रकार (जर ते पॅरामीटर्स स्वीकारत असेल)
- internal/external ची घोषणा
- pure/view/payable ची घोषणा
- रिटर्न्स प्रकार (जर ते मूल्य परत करत असेल)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // स्थिती व्हेरिएबल

    // जेव्हा कॉन्ट्रॅक्ट प्रस्थापित केले जाते तेव्हा कॉल केले जाते आणि मूल्य आरंभ करते
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get फंक्शन
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set फंक्शन
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

एक संपूर्ण कॉन्ट्रॅक्ट काहीसे असे दिसू शकते. येथे `constructor` फंक्शन `dapp_name` व्हेरिएबलसाठी प्रारंभिक मूल्य प्रदान करते.

## घटना आणि नोंदी {#events-and-logs}

घटना तुमच्या स्मार्ट कॉन्ट्रॅक्टला तुमच्या फ्रंटएंड किंवा इतर सबस्क्राइबिंग अ‍ॅप्लिकेशन्सशी संवाद साधण्यास सक्षम करतात. एकदा व्यवहार प्रमाणित झाला आणि ब्लॉकमध्ये जोडला गेला की, स्मार्ट कॉन्ट्रॅक्ट्स घटना उत्सर्जित करू शकतात आणि माहितीची नोंद करू शकतात, ज्यावर फ्रंटएंड नंतर प्रक्रिया करू शकतो आणि वापरू शकतो.

## भाष्य केलेली उदाहरणे {#annotated-examples}

ही Solidity मध्ये लिहिलेली काही उदाहरणे आहेत. जर तुम्हाला कोडसोबत प्रयोग करायचा असेल, तर तुम्ही [Remix](https://remix.ethereum.org) मध्ये त्यांच्याशी संवाद साधू शकता.

### हॅलो वर्ल्ड {#hello-world}

```solidity
// सिमेंटिक व्हर्जनिंग वापरून, Solidity ची आवृत्ती निर्दिष्ट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` नावाचे कॉन्ट्रॅक्ट परिभाषित करते.
// कॉन्ट्रॅक्ट हा फंक्शन्स आणि डेटाचा (त्याची स्थिती) संग्रह असतो.
// एकदा प्रस्थापित केल्यावर, कॉन्ट्रॅक्ट इथेरियम ब्लॉकचेनवरील एका विशिष्ट पत्त्यावर राहते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` प्रकाराचे `message` हे स्थिती व्हेरिएबल घोषित करते.
    // स्थिती व्हेरिएबल्स असे व्हेरिएबल्स असतात ज्यांची मूल्ये कॉन्ट्रॅक्ट स्टोरेजमध्ये कायमस्वरूपी साठवली जातात.
    // `public` कीवर्ड व्हेरिएबल्सना कॉन्ट्रॅक्टच्या बाहेरून प्रवेशयोग्य बनवतो
    // आणि एक फंक्शन तयार करतो ज्याला इतर कॉन्ट्रॅक्ट्स किंवा क्लायंट्स मूल्यात प्रवेश करण्यासाठी कॉल करू शकतात.
    string public message;

    // अनेक क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषांप्रमाणेच, कन्स्ट्रक्टर हे
    // एक विशेष फंक्शन आहे जे केवळ कॉन्ट्रॅक्ट तयार करताना कार्यान्वित केले जाते.
    // कन्स्ट्रक्टर्सचा वापर कॉन्ट्रॅक्टचा डेटा आरंभ करण्यासाठी केला जातो.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // `initMessage` हा स्ट्रिंग आर्ग्युमेंट स्वीकारतो आणि मूल्य सेट करतो
        // कॉन्ट्रॅक्टच्या `message` स्टोरेज व्हेरिएबलमध्ये).
        message = initMessage;
    }

    // एक पब्लिक फंक्शन जे स्ट्रिंग आर्ग्युमेंट स्वीकारते
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
    // एक `पत्ता` ईमेल पत्त्याशी तुलनीय आहे - त्याचा वापर इथेरियमवरील खाते ओळखण्यासाठी केला जातो.
    // पत्ते स्मार्ट कॉन्ट्रॅक्ट किंवा बाह्य (वापरकर्ता) खात्यांचे प्रतिनिधित्व करू शकतात.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` ही मूलत: एक हॅश टेबल डेटा रचना आहे.
    // हे `mapping` एका पत्त्याला (टोकन धारक) एक अनसाइन्ड इंटिजर (टोकन शिल्लक) नियुक्त करते.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // घटना ब्लॉकचेनवरील क्रियाकलापांची नोंद करण्यास अनुमती देतात.
    // कॉन्ट्रॅक्ट स्थिती बदलांवर प्रतिक्रिया देण्यासाठी इथेरियम क्लायंट्स घटना ऐकू शकतात.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // कॉन्ट्रॅक्टचा डेटा आरंभ करते, `owner` सेट करते
    // कॉन्ट्रॅक्ट निर्मात्याच्या पत्त्यावर.
    constructor() public {
        // सर्व स्मार्ट कॉन्ट्रॅक्ट्स त्यांची कार्ये ट्रिगर करण्यासाठी बाह्य व्यवहारांवर अवलंबून असतात.
        // `msg` हे एक ग्लोबल व्हेरिएबल आहे ज्यामध्ये दिलेल्या व्यवहारावरील संबंधित डेटा समाविष्ट असतो,
        // जसे की पाठवणाऱ्याचा पत्ता आणि व्यवहारात समाविष्ट असलेले ETH मूल्य.
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // नवीन टोकनची रक्कम तयार करते आणि त्यांना एका पत्त्यावर पाठवते.
    function mint(address receiver, uint amount) public {
        // `require` ही एक नियंत्रण रचना आहे जी विशिष्ट अटी लागू करण्यासाठी वापरली जाते.
        // जर `require` स्टेटमेंट `false` म्हणून मूल्यमापन करत असेल, तर एक अपवाद (exception) ट्रिगर होतो,
        // जे वर्तमान कॉल दरम्यान स्थितीमध्ये केलेले सर्व बदल पूर्ववत करते.
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // केवळ कॉन्ट्रॅक्ट मालक या फंक्शनला कॉल करू शकतो
        require(msg.sender == owner, "You are not the owner.");

        // टोकनची कमाल मर्यादा लागू करते
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` ची शिल्लक `amount` ने वाढवते
        balances[receiver] += amount;
    }

    // कोणत्याही कॉलरकडून एका पत्त्यावर विद्यमान टोकनची रक्कम पाठवते.
    function transfer(address receiver, uint amount) public {
        // पाठवणाऱ्याकडे पाठवण्यासाठी पुरेसे टोकन असणे आवश्यक आहे
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // दोन पत्त्यांचे टोकन बॅलन्स समायोजित करते
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // पूर्वी परिभाषित केलेली घटना उत्सर्जित करते
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### युनिक डिजिटल मालमत्ता {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// इतर फाइल्समधून वर्तमान कॉन्ट्रॅक्टमध्ये चिन्हे (symbols) आयात करते.
// या प्रकरणात, OpenZeppelin कडील हेल्पर कॉन्ट्रॅक्ट्सची मालिका.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` कीवर्डचा वापर बाह्य कॉन्ट्रॅक्ट्समधून फंक्शन्स आणि कीवर्ड्स इनहेरिट करण्यासाठी केला जातो.
// या प्रकरणात, `CryptoPizza` हे `IERC721` आणि `ERC165` कॉन्ट्रॅक्ट्समधून इनहेरिट करते.
// अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // अंकगणितीय ऑपरेशन्स सुरक्षितपणे करण्यासाठी OpenZeppelin च्या SafeMath लायब्ररीचा वापर करते.
    // अधिक जाणून घ्या: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity मधील कॉन्स्टंट स्थिती व्हेरिएबल्स इतर भाषांसारखेच असतात
    // परंतु तुम्ही अशा एक्स्प्रेशनमधून नियुक्त करणे आवश्यक आहे जे कंपाइल वेळेत कॉन्स्टंट असते.
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct प्रकार तुम्हाला तुमचा स्वतःचा प्रकार परिभाषित करू देतात
    // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza structs चा रिकामा अ‍ॅरे तयार करते
    Pizza[] public pizzas;

    // पिझ्झा ID वरून त्याच्या मालकाच्या पत्त्यावर मॅपिंग
    mapping(uint256 => address) public pizzaToOwner;

    // मालकाच्या पत्त्यावरून मालकीच्या टोकनच्या संख्येपर्यंत मॅपिंग
    mapping(address => uint256) public ownerPizzaCount;

    // टोकन ID वरून मंजूर पत्त्यावर मॅपिंग
    mapping(uint256 => address) pizzaApprovals;

    // तुम्ही मॅपिंग्स नेस्ट करू शकता, हे उदाहरण मालकाला ऑपरेटर मंजुरीसाठी मॅप करते
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // स्ट्रिंग (नाव) आणि DNA मधून यादृच्छिक (random) पिझ्झा तयार करण्यासाठी अंतर्गत फंक्शन
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` कीवर्डचा अर्थ असा आहे की हे फंक्शन केवळ
        // या कॉन्ट्रॅक्टमध्ये आणि या कॉन्ट्रॅक्टमधून डिराइव्ह होणाऱ्या कॉन्ट्रॅक्ट्समध्ये दृश्यमान आहे
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` हे एक फंक्शन मॉडिफायर आहे जे पिझ्झा आधीपासून अस्तित्वात आहे की नाही हे तपासते
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // पिझ्झाच्या अ‍ॅरेमध्ये पिझ्झा जोडते आणि id मिळवते
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // पिझ्झा मालक वर्तमान वापरकर्त्यासारखाच आहे हे तपासते
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // लक्षात घ्या की address(0) हा शून्य पत्ता आहे,
        // जे दर्शवते की pizza[id] अद्याप विशिष्ट वापरकर्त्याला वाटप केलेला नाही.

        assert(pizzaToOwner[id] == address(0));

        // पिझ्झा मालकाला मॅप करते
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // स्ट्रिंग (नाव) मधून यादृच्छिक पिझ्झा तयार करते
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // स्ट्रिंग (नाव) आणि मालकाच्या (निर्माता) पत्त्यावरून यादृच्छिक DNA व्युत्पन्न करते
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` म्हणून चिन्हांकित केलेली फंक्शन्स स्थिती वाचणार नाहीत किंवा सुधारित करणार नाहीत असे वचन देतात
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // स्ट्रिंग (नाव) + पत्ता (मालक) मधून यादृच्छिक uint व्युत्पन्न करते
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // मालकाला सापडलेल्या पिझ्झाचा अ‍ॅरे परत करते
    function getPizzasByOwner(address _owner)
        public
        // `view` म्हणून चिन्हांकित केलेली फंक्शन्स स्थिती सुधारित न करण्याचे वचन देतात
        // अधिक जाणून घ्या: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // मूल्ये केवळ या फंक्शन कॉलच्या
        // जीवनचक्रासाठी साठवण्यासाठी `memory` स्टोरेज स्थानाचा वापर करते.
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

    // पिझ्झा आणि मालकी इतर पत्त्यावर हस्तांतरित करते
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // आयात केलेल्या IERC721 कॉन्ट्रॅक्टमध्ये परिभाषित केलेली घटना उत्सर्जित करते
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * दिलेल्या टोकन ID ची मालकी सुरक्षितपणे दुसऱ्या पत्त्यावर हस्तांतरित करते
     * जर लक्ष्य पत्ता कॉन्ट्रॅक्ट असेल, तर त्याने `onERC721Received` लागू करणे आवश्यक आहे,
     * ज्याला सुरक्षित हस्तांतरणावर कॉल केले जाते, आणि मॅजिक मूल्य परत करते
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * अन्यथा, हस्तांतरण पूर्ववत केले जाते.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * दिलेल्या टोकन ID ची मालकी सुरक्षितपणे दुसऱ्या पत्त्यावर हस्तांतरित करते
     * जर लक्ष्य पत्ता कॉन्ट्रॅक्ट असेल, तर त्याने `onERC721Received` लागू करणे आवश्यक आहे,
     * ज्याला सुरक्षित हस्तांतरणावर कॉल केले जाते, आणि मॅजिक मूल्य परत करते
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * अन्यथा, हस्तांतरण पूर्ववत केले जाते.
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
     * लक्ष्य पत्त्यावर `onERC721Received` लागू करण्यासाठी अंतर्गत फंक्शन
     * जर लक्ष्य पत्ता कॉन्ट्रॅक्ट नसेल तर कॉल कार्यान्वित केला जात नाही
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

    // पिझ्झा बर्न करते - टोकन पूर्णपणे नष्ट करते
    // `external` फंक्शन मॉडिफायरचा अर्थ असा आहे की हे फंक्शन
    // कॉन्ट्रॅक्ट इंटरफेसचा भाग आहे आणि इतर कॉन्ट्रॅक्ट्स त्याला कॉल करू शकतात
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

    // पत्त्यानुसार पिझ्झाची संख्या परत करते
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id द्वारे सापडलेल्या पिझ्झाचा मालक परत करते
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // पिझ्झाची मालकी हस्तांतरित करण्यासाठी इतर पत्त्याला मंजुरी देते
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // विशिष्ट पिझ्झासाठी मंजूर पत्ता परत करते
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * दिलेल्या टोकन ID ची वर्तमान मंजुरी साफ करण्यासाठी खाजगी फंक्शन
     * दिलेला पत्ता खरोखरच टोकनचा मालक नसल्यास पूर्ववत करते
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * दिलेल्या ऑपरेटरची मंजुरी सेट किंवा अनसेट करते
     * ऑपरेटरला पाठवणाऱ्याच्या वतीने त्यांचे सर्व टोकन हस्तांतरित करण्याची परवानगी आहे
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // एखाद्या ऑपरेटरला दिलेल्या मालकाने मंजुरी दिली आहे की नाही हे सांगते
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // पिझ्झाची मालकी घेते - केवळ मंजूर वापरकर्त्यांसाठी
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // पिझ्झा अस्तित्वात आहे की नाही हे तपासते
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // पत्ता मालक आहे की पिझ्झा हस्तांतरित करण्यास मंजूर आहे हे तपासते
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // यामुळे solium तपासणी अक्षम करा
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // पिझ्झा अद्वितीय आहे आणि अद्याप अस्तित्वात नाही हे तपासा
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

    // लक्ष्य पत्ता कॉन्ट्रॅक्ट आहे की नाही हे परत करते
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // सध्या एखाद्या पत्त्यावर कॉन्ट्रॅक्ट आहे की नाही हे तपासण्याचा यापेक्षा चांगला मार्ग नाही
        // त्या पत्त्यावरील कोडचा आकार तपासण्यापेक्षा.
        // पहा https://ethereum.stackexchange.com/a/14016/36603
        // हे कसे कार्य करते याबद्दल अधिक तपशीलांसाठी.
        // TODO Serenity रिलीझपूर्वी हे पुन्हा तपासा, कारण सर्व पत्ते तेव्हा
        // कॉन्ट्रॅक्ट्स असतील.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## पुढील वाचन {#further-reading}

स्मार्ट कॉन्ट्रॅक्ट्सच्या अधिक संपूर्ण आढाव्यासाठी Solidity आणि Vyper चे दस्तऐवजीकरण तपासा:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## संबंधित विषय {#related-topics}

- [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/)
- [इथेरियम व्हर्च्युअल मशीन](/developers/docs/evm/)

## संबंधित ट्युटोरियल्स {#related-tutorials}

- [कॉन्ट्रॅक्ट आकार मर्यादेशी लढण्यासाठी कॉन्ट्रॅक्ट्सचा आकार कमी करणे](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– तुमच्या स्मार्ट कॉन्ट्रॅक्टचा आकार कमी करण्यासाठी काही व्यावहारिक टिप्स._
- [घटनांसह स्मार्ट कॉन्ट्रॅक्ट्समधून डेटाची नोंद करणे](/developers/tutorials/logging-events-smart-contracts/) _– स्मार्ट कॉन्ट्रॅक्ट घटनांचा परिचय आणि डेटाची नोंद करण्यासाठी तुम्ही त्यांचा कसा वापर करू शकता._
- [Solidity मधून इतर कॉन्ट्रॅक्ट्सशी संवाद साधा](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– विद्यमान कॉन्ट्रॅक्टमधून स्मार्ट कॉन्ट्रॅक्ट कसे प्रस्थापित करावे आणि त्याच्याशी संवाद कसा साधावा._
