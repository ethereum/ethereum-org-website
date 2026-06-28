---
title: "स्मार्ट कॉन्ट्रॅक्ट भाषा"
description: "दोन मुख्य स्मार्ट कॉन्ट्रॅक्ट भाषांचे विहंगावलोकन आणि तुलना – Solidity आणि Vyper."
lang: mr
---

[इथेरियम](/) बद्दल एक उत्तम गोष्ट म्हणजे स्मार्ट कॉन्ट्रॅक्ट्स तुलनेने डेव्हलपर-अनुकूल भाषा वापरून प्रोग्राम केले जाऊ शकतात. जर तुम्हाला Python किंवा कोणत्याही [कर्ली-ब्रॅकेट भाषेचा (curly-bracket language)](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) अनुभव असेल, तर तुम्हाला ओळखीच्या सिंटॅक्स असलेली भाषा मिळू शकते.

दोन सर्वात सक्रिय आणि देखभाल केल्या जाणाऱ्या भाषा आहेत:

- Solidity
- Vyper

Remix IDE हे Solidity आणि Vyper या दोन्ही भाषांमध्ये कॉन्ट्रॅक्ट्स तयार करण्यासाठी आणि तपासण्यासाठी एक सर्वसमावेशक डेव्हलपमेंट वातावरण प्रदान करते. कोडिंग सुरू करण्यासाठी [इन-ब्राउझर Remix IDE वापरून पहा](https://remix.ethereum.org).

अधिक अनुभवी डेव्हलपर्स Yul, जी [इथेरियम व्हर्च्युअल मशीन (EVM)](/developers/docs/evm/) साठी एक इंटरमीडिएट भाषा आहे, किंवा Yul+, जे Yul चे एक्स्टेंशन आहे, वापरू इच्छितात.

जर तुम्ही उत्सुक असाल आणि अजूनही मोठ्या प्रमाणावर डेव्हलपमेंट सुरू असलेल्या नवीन भाषांची चाचणी घेण्यास मदत करू इच्छित असाल, तर तुम्ही Fe सोबत प्रयोग करू शकता, जी एक उदयोन्मुख स्मार्ट कॉन्ट्रॅक्ट भाषा आहे आणि सध्या ती तिच्या सुरुवातीच्या टप्प्यात आहे.

## पूर्व शर्ती {#prerequisites}

प्रोग्रामिंग भाषांचे, विशेषतः JavaScript किंवा Python चे पूर्वज्ञान तुम्हाला स्मार्ट कॉन्ट्रॅक्ट भाषांमधील फरक समजून घेण्यास मदत करू शकते. भाषांच्या तुलनेत खूप खोलवर जाण्यापूर्वी तुम्ही स्मार्ट कॉन्ट्रॅक्ट्स ही संकल्पना समजून घ्यावी अशी आम्ही शिफारस करतो. [स्मार्ट कॉन्ट्रॅक्ट्सची ओळख](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- स्मार्ट कॉन्ट्रॅक्ट्स लागू करण्यासाठी ऑब्जेक्ट-ओरिएंटेड, हाय-लेव्हल भाषा.
- कर्ली-ब्रॅकेट भाषा जी C++ द्वारे सर्वात जास्त प्रभावित झाली आहे.
- स्टॅटिकली टाईप केलेली (व्हेरिएबलचा प्रकार कंपाईल करताना माहित असतो).
- समर्थन करते:
  - इनहेरिटन्स (तुम्ही इतर कॉन्ट्रॅक्ट्स एक्सटेंड करू शकता).
  - लायब्ररी (तुम्ही पुन्हा वापरता येण्याजोगा कोड तयार करू शकता जो तुम्ही वेगवेगळ्या कॉन्ट्रॅक्ट्समधून कॉल करू शकता – जसे इतर ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग भाषांमध्ये स्टॅटिक क्लासमधील स्टॅटिक फंक्शन्स).
  - कॉम्प्लेक्स युझर-डिफाईंड प्रकार.

### महत्त्वाच्या लिंक्स {#important-links}

- [डॉक्युमेंटेशन](https://docs.soliditylang.org/en/latest/)
- [Solidity लँग्वेज पोर्टल](https://soliditylang.org/)
- [Solidity बाय एक्झाम्पल](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter चॅटरूम](https://gitter.im/ethereum/solidity) जी [Solidity मॅट्रिक्स चॅटरूमशी](https://matrix.to/#/#ethereum_solidity:gitter.im) जोडलेली आहे
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Solidity ब्लॉग](https://blog.soliditylang.org/)
- [Solidity ट्विटर्](https://twitter.com/solidity_lang)

### उदाहरण कॉन्ट्रॅक्ट {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" कीवर्ड व्हेरिएबल्सना
    // इतर कॉन्ट्रॅक्ट्समधून ॲक्सेसिबल बनवतो
    address public minter;
    mapping (address => uint) public balances;

    // इव्हेंट्स क्लायंट्सना तुम्ही घोषित केलेल्या विशिष्ट
    // कॉन्ट्रॅक्ट बदलांवर प्रतिक्रिया देण्याची परवानगी देतात
    event Sent(address from, address to, uint amount);

    // कन्स्ट्रक्टर कोड फक्त तेव्हाच चालवला जातो जेव्हा कॉन्ट्रॅक्ट
    // तयार केले जाते
    constructor() {
        minter = msg.sender;
    }

    // एखाद्या ॲड्रेसवर नव्याने तयार केलेल्या कॉइन्सची रक्कम पाठवतो
    // फक्त कॉन्ट्रॅक्ट निर्मात्याद्वारे कॉल केले जाऊ शकते
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // विद्यमान कॉइन्सची रक्कम पाठवतो
    // कोणत्याही कॉलरकडून एखाद्या ॲड्रेसवर
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

हे उदाहरण तुम्हाला Solidity कॉन्ट्रॅक्टचा सिंटॅक्स कसा असतो याची कल्पना देईल. फंक्शन्स आणि व्हेरिएबल्सच्या अधिक तपशीलवार वर्णनासाठी, [डॉक्युमेंटेशन पहा](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- पायथॉनिक (Pythonic) प्रोग्रामिंग भाषा
- स्ट्रॉंग टायपिंग
- लहान आणि समजण्याजोगा कंपायलर कोड
- कार्यक्षम बाइटकोड निर्मिती
- कॉन्ट्रॅक्ट्स अधिक सुरक्षित आणि ऑडिट करण्यासाठी सोपे बनवण्याच्या उद्देशाने जाणीवपूर्वक Solidity पेक्षा कमी वैशिष्ट्ये आहेत. Vyper खालील गोष्टींना समर्थन देत नाही:
  - मॉडिफायर्स
  - इनहेरिटन्स
  - इनलाईन असेंब्ली
  - फंक्शन ओव्हरलोडिंग
  - ऑपरेटर ओव्हरलोडिंग
  - रिकर्सिव्ह कॉलिंग
  - इनफायनाईट-लेंथ लूप्स
  - बायनरी फिक्स्ड पॉईंट्स

अधिक माहितीसाठी, [Vyper चे रॅशनल (rationale) वाचा](https://vyper.readthedocs.io/en/latest/index.html).

### महत्त्वाच्या लिंक्स {#important-links-1}

- [डॉक्युमेंटेशन](https://vyper.readthedocs.io)
- [Vyper बाय एक्झाम्पल](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [मोअर Vyper बाय एक्झाम्पल](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper कम्युनिटी डिस्कॉर्ड् चॅट](https://discord.gg/SdvKC79cJk)
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Vyper साठी स्मार्ट कॉन्ट्रॅक्ट डेव्हलपमेंट फ्रेमवर्क्स आणि टूल्स](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper स्मार्ट कॉन्ट्रॅक्ट्स सुरक्षित करणे आणि हॅक करणे शिका](https://github.com/SupremacyTeam/VyperPunk)
- [डेव्हलपमेंटसाठी Vyper हब](https://github.com/zcor/vyper-dev)
- [Vyper ग्रेटेस्ट हिट्स स्मार्ट कॉन्ट्रॅक्ट उदाहरणे](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [ऑसम Vyper क्युरेटेड रिसोर्सेस](https://github.com/spadebuilders/awesome-vyper)

### उदाहरण {#example}

```python
# खुला लिलाव

# लिलावाचे पॅरामीटर्स
# लाभार्थीला सर्वाधिक बोली लावणाऱ्याकडून पैसे मिळतात
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# लिलावाची सद्यस्थिती
highestBidder: public(address)
highestBid: public(uint256)

# शेवटी true वर सेट केले जाते, कोणत्याही बदलास अनुमती देत नाही
ended: public(bool)

# रिफंड केलेल्या बोलींचा मागोवा ठेवा जेणेकरून आपण विथड्रॉ पॅटर्न फॉलो करू शकू
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` सह एक साधा लिलाव तयार करा
# सेकंदांची बोलीची वेळ, च्या वतीने
# लाभार्थी ॲड्रेस `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# पाठवलेल्या मूल्यासह लिलावावर बोली लावा
# या ट्रान्झॅक्शनसोबत.
# मूल्य फक्त तेव्हाच रिफंड केले जाईल जर
# लिलाव जिंकला नाही.
@external
@payable
def bid():
    # बोलीची वेळ संपली आहे का ते तपासा.
    assert block.timestamp < self.auctionEnd
    # बोली पुरेशी जास्त आहे का ते तपासा
    assert msg.value > self.highestBid
    # मागील सर्वाधिक बोली लावणाऱ्याच्या रिफंडचा मागोवा घ्या
    self.pendingReturns[self.highestBidder] += self.highestBid
    # नवीन सर्वाधिक बोलीचा मागोवा घ्या
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# पूर्वी रिफंड केलेली बोली काढून घ्या. विथड्रॉ पॅटर्नचा वापर
# येथे सुरक्षिततेची समस्या टाळण्यासाठी केला जातो. जर रिफंड थेट
# bid() चा भाग म्हणून पाठवले असते, तर एक दुर्भावनापूर्ण बोली लावणारे कॉन्ट्रॅक्ट
# ते रिफंड ब्लॉक करू शकले असते आणि त्यामुळे नवीन उच्च बोली येण्यापासून रोखू शकले असते.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# लिलाव समाप्त करा आणि सर्वाधिक बोली
# लाभार्थीला पाठवा.
@external
def endAuction():
    # संवाद साधणाऱ्या फंक्शन्सची रचना करणे हे एक चांगले मार्गदर्शक तत्त्व आहे
    # इतर कॉन्ट्रॅक्ट्सशी (म्हणजेच, ते फंक्शन्स कॉल करतात किंवा इथर पाठवतात)
    # तीन टप्प्यांत:
    # 1. अटी तपासणे
    # 2. कृती करणे (संभाव्यतः अटी बदलणे)
    # 3. इतर कॉन्ट्रॅक्ट्सशी संवाद साधणे
    # जर हे टप्पे मिसळले गेले, तर दुसरे कॉन्ट्रॅक्ट
    # सध्याच्या कॉन्ट्रॅक्टमध्ये परत कॉल करू शकते आणि स्थिती बदलू शकते किंवा
    # परिणाम (इथर पेआउट) अनेक वेळा घडवून आणू शकते.
    # जर अंतर्गत कॉल केलेल्या फंक्शन्समध्ये बाह्य
    # कॉन्ट्रॅक्ट्सशी संवाद समाविष्ट असेल, तर त्यांनाही संवाद मानले पाहिजे
    # बाह्य कॉन्ट्रॅक्ट्सशी.

    # 1. अटी
    # लिलावाची अंतिम वेळ गाठली आहे का ते तपासा
    assert block.timestamp >= self.auctionEnd
    # हे फंक्शन आधीच कॉल केले गेले आहे का ते तपासा
    assert not self.ended

    # 2. परिणाम
    self.ended = True

    # 3. संवाद
    send(self.beneficiary, self.highestBid)
```

हे उदाहरण तुम्हाला Vyper कॉन्ट्रॅक्टचा सिंटॅक्स कसा असतो याची कल्पना देईल. फंक्शन्स आणि व्हेरिएबल्सच्या अधिक तपशीलवार वर्णनासाठी, [डॉक्युमेंटेशन पहा](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul आणि Yul+ {#yul}

जर तुम्ही इथेरियमसाठी नवीन असाल आणि अद्याप स्मार्ट कॉन्ट्रॅक्ट भाषांसोबत कोणतेही कोडिंग केले नसेल, तर आम्ही Solidity किंवा Vyper ने सुरुवात करण्याची शिफारस करतो. जेव्हा तुम्हाला स्मार्ट कॉन्ट्रॅक्ट सुरक्षेच्या सर्वोत्तम पद्धती आणि EVM सोबत काम करण्याच्या विशिष्ट गोष्टींची माहिती होईल, तेव्हाच Yul किंवा Yul+ कडे वळा.

**Yul**

- इथेरियमसाठी इंटरमीडिएट भाषा.
- [EVM](/developers/docs/evm) आणि [Ewasm](https://github.com/ewasm) (इथेरियम फ्लेवर्ड WebAssembly) ला समर्थन देते, आणि दोन्ही प्लॅटफॉर्म्सचा वापरण्यायोग्य कॉमन डिनॉमिनेटर (common denominator) म्हणून डिझाइन केलेली आहे.
- हाय-लेव्हल ऑप्टिमायझेशन टप्प्यांसाठी एक चांगले लक्ष्य जे EVM आणि Ewasm या दोन्ही प्लॅटफॉर्म्सना समान फायदा देऊ शकते.

**Yul+**

- Yul चे एक लो-लेव्हल, अत्यंत कार्यक्षम एक्स्टेंशन.
- सुरुवातीला [ऑप्टिमिस्टिक रोलअप](/developers/docs/scaling/optimistic-rollups/) कॉन्ट्रॅक्टसाठी डिझाइन केलेले.
- Yul+ कडे Yul चा एक प्रायोगिक अपग्रेड प्रस्ताव म्हणून पाहिले जाऊ शकते, जे त्यात नवीन वैशिष्ट्ये जोडते.

### महत्त्वाच्या लिंक्स {#important-links-2}

- [Yul डॉक्युमेंटेशन](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ डॉक्युमेंटेशन](https://github.com/fuellabs/yulp)
- [Yul+ परिचयात्मक पोस्ट](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### उदाहरण कॉन्ट्रॅक्ट {#example-contract-2}

खालील साधे उदाहरण पॉवर फंक्शन लागू करते. हे `solc --strict-assembly --bin input.yul` वापरून कंपाईल केले जाऊ शकते. हे उदाहरण input.yul फाईलमध्ये स्टोअर केले पाहिजे.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

जर तुम्हाला आधीच स्मार्ट कॉन्ट्रॅक्ट्सचा चांगला अनुभव असेल, तर Yul मधील संपूर्ण ERC-20 अंमलबजावणी [येथे](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) आढळू शकते.

## Fe {#fe}

- इथेरियम व्हर्च्युअल मशीन (EVM) साठी स्टॅटिकली टाईप केलेली भाषा.
- Python आणि Rust द्वारे प्रेरित.
- शिकण्यास सोपी असण्याचे उद्दिष्ट आहे -- अगदी इथेरियम इकोसिस्टममध्ये नवीन असलेल्या डेव्हलपर्ससाठीही.
- Fe ची डेव्हलपमेंट अजूनही सुरुवातीच्या टप्प्यात आहे, या भाषेचे अल्फा रिलीज जानेवारी 2021 मध्ये झाले होते.

### महत्त्वाच्या लिंक्स {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe ची घोषणा](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 रोडमॅप](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe डिस्कॉर्ड् चॅट](https://discord.com/invite/ywpkAXFjZH)
- [Fe ट्विटर्](https://twitter.com/official_fe)

### उदाहरण कॉन्ट्रॅक्ट {#example-contract-3}

खाली Fe मध्ये लागू केलेले एक साधे कॉन्ट्रॅक्ट आहे.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## कशी निवड करावी {#how-to-choose}

इतर कोणत्याही प्रोग्रामिंग भाषेप्रमाणेच, हे मुख्यत्वे योग्य कामासाठी योग्य साधन निवडण्यावर तसेच वैयक्तिक पसंतीवर अवलंबून असते.

जर तुम्ही अद्याप यापैकी कोणतीही भाषा वापरून पाहिली नसेल, तर येथे काही गोष्टी विचारात घेण्यासारख्या आहेत:

### Solidity बद्दल उत्तम काय आहे? {#solidity-advantages}

- जर तुम्ही नवशिक्या असाल, तर तिथे अनेक ट्युटोरियल्स आणि शिकण्याची साधने उपलब्ध आहेत. याबद्दल अधिक माहिती [कोडिंगद्वारे शिका](/developers/learning-tools/) विभागात पहा.
- चांगली डेव्हलपर टूल्स उपलब्ध आहेत.
- Solidity ची डेव्हलपर कम्युनिटी मोठी आहे, याचा अर्थ तुम्हाला तुमच्या प्रश्नांची उत्तरे बहुधा खूप लवकर मिळतील.

### Vyper बद्दल उत्तम काय आहे? {#vyper-advatages}

- स्मार्ट कॉन्ट्रॅक्ट्स लिहू इच्छिणाऱ्या Python डेव्हलपर्ससाठी सुरुवात करण्याचा एक उत्तम मार्ग.
- Vyper मध्ये कमी वैशिष्ट्ये आहेत ज्यामुळे ते कल्पनांचे जलद प्रोटोटायपिंग करण्यासाठी उत्तम ठरते.
- Vyper चे उद्दिष्ट ऑडिट करण्यासाठी सोपे आणि जास्तीत जास्त मानवांना वाचता येण्याजोगे असणे हे आहे.

### Yul आणि Yul+ बद्दल उत्तम काय आहे? {#yul-advantages}

- साधी आणि कार्यक्षम लो-लेव्हल भाषा.
- रॉ (raw) EVM च्या खूप जवळ जाण्याची अनुमती देते, जे तुमच्या कॉन्ट्रॅक्ट्सचा गॅस वापर ऑप्टिमाइझ करण्यात मदत करू शकते.

## भाषांची तुलना {#language-comparisons}

मूलभूत सिंटॅक्स, कॉन्ट्रॅक्ट जीवनचक्र, इंटरफेसेस, ऑपरेटर्स, डेटा स्ट्रक्चर्स, फंक्शन्स, कंट्रोल फ्लो आणि अधिकच्या तुलनेसाठी Auditless ची ही [चीटशीट पहा](https://reference.auditless.com/cheatsheet/)

## पुढील वाचन {#further-reading}

- [ओपनझेपलिन द्वारे Solidity कॉन्ट्रॅक्ट्स लायब्ररी](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity बाय एक्झाम्पल](https://solidity-by-example.org)