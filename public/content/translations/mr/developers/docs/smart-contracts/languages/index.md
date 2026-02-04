---
title: स्मार्ट कॉन्ट्रॅक्ट भाषा
description: दोन मुख्य स्मार्ट कॉन्ट्रॅक्ट भाषा - Solidity आणि Vyper यांचा आढावा आणि तुलना.
lang: mr
---

Ethereum बद्दल एक उत्तम गोष्ट ही आहे की स्मार्ट कॉन्ट्रॅक्ट्स तुलनेने विकसक-अनुकूल भाषा वापरून प्रोग्राम केले जाऊ शकतात. तुम्ही Python किंवा कोणत्याही [कर्ली-ब्रॅकेट भाषेमध्ये](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) अनुभवी असाल, तर तुम्हाला परिचित सिंटॅक्स असलेली भाषा सापडू शकते.

दोन सर्वात सक्रिय आणि देखरेख केलेल्या भाषा आहेत:

- Solidity
- Vyper

Remix IDE हे Solidity आणि Vyper या दोन्हीमधील कॉन्ट्रॅक्ट्स तयार करण्यासाठी आणि तपासण्यासाठी एक सर्वसमावेशक विकास वातावरण प्रदान करते. कोडिंग सुरू करण्यासाठी [ब्राउझर-मधील Remix IDE वापरून पाहा](https://remix.ethereum.org).

अधिक अनुभवी विकसक [Ethereum Virtual Machine](/developers/docs/evm/) साठी एक मध्यस्थ भाषा Yul, किंवा Yul+ जे Yul चे विस्तारीकरण आहे, वापरू शकतात.

तुम्ही उत्सुक असाल आणि मोठ्या प्रमाणात विकासाधीन असलेल्या नवीन भाषा तपासण्यात मदत करू इच्छित असाल, तर तुम्ही Fe सह प्रयोग करू शकता, जी एक उदयोन्मुख स्मार्ट कॉन्ट्रॅक्ट भाषा आहे आणि सध्या तिच्या सुरुवातीच्या टप्प्यात आहे.

## पूर्वतयारी {#prerequisites}

प्रोग्रामिंग भाषांचे, विशेषतः JavaScript किंवा Python चे पूर्वीचे ज्ञान, तुम्हाला स्मार्ट कॉन्ट्रॅक्ट भाषांमधील फरक समजून घेण्यास मदत करू शकते. आम्ही शिफारस करतो की भाषांच्या तुलनेत खोलवर जाण्यापूर्वी तुम्ही स्मार्ट कॉन्ट्रॅक्ट्स एक संकल्पना म्हणून समजून घ्या. [स्मार्ट कॉन्ट्रॅक्ट्सची ओळख](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- स्मार्ट कॉन्ट्रॅक्ट्स लागू करण्यासाठी ऑब्जेक्ट-ओरिएंटेड, उच्च-स्तरीय भाषा.
- कर्ली-ब्रॅकेट भाषा जी C++ द्वारे सर्वाधिक प्रभावित झाली आहे.
- स्टॅटिकली टाइप केलेली (व्हेरिएबलचा प्रकार कंपाइल वेळेस ज्ञात असतो).
- समर्थन करते:
  - इनहेरिटन्स (तुम्ही इतर कॉन्ट्रॅक्ट्स विस्तारित करू शकता).
  - लायब्ररीज (तुम्ही पुन्हा वापरण्यायोग्य कोड तयार करू शकता जो तुम्ही वेगवेगळ्या कॉन्ट्रॅक्ट्समधून कॉल करू शकता – जसे की इतर ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग भाषांमधील स्टॅटिक क्लासमधील स्टॅटिक फंक्शन्स).
  - जटिल वापरकर्ता-परिभाषित प्रकार.

### महत्वाच्या लिंक्स {#important-links}

- [दस्तऐवजीकरण](https://docs.soliditylang.org/en/latest/)
- [Solidity लँग्वेज पोर्टल](https://soliditylang.org/)
- [उदाहरणांसह Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter चॅटरूम](https://gitter.im/ethereum/solidity) जे [Solidity Matrix चॅटरूम](https://matrix.to/#/#ethereum_solidity:gitter.im) शी जोडलेले आहे
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Solidity ब्लॉग](https://blog.soliditylang.org/)
- [Solidity ट्विटर](https://twitter.com/solidity_lang)

### उदाहरण कॉन्ट्रॅक्ट {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "पब्लिक" हा कीवर्ड व्हेरिएबल्स
    // इतर कॉन्ट्रॅक्ट्समधून ॲक्सेस करण्यायोग्य बनवतो
    address public minter;
    mapping (address => uint) public balances;

    // इव्हेंट्स क्लायंटना तुम्ही घोषित केलेल्या विशिष्ट
    // कॉन्ट्रॅक्ट बदलांवर प्रतिक्रिया देण्यास अनुमती देतात
    event Sent(address from, address to, uint amount);

    // कन्स्ट्रक्टर कोड फक्त कॉन्ट्रॅक्ट
    // तयार झाल्यावर चालतो
    constructor() {
        minter = msg.sender;
    }

    // एका ॲड्रेसवर नवीन तयार केलेल्या कॉइन्सची रक्कम पाठवते
    // फक्त कॉन्ट्रॅक्ट तयार करणाऱ्याद्वारे कॉल केले जाऊ शकते
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // अस्तित्वात असलेल्या कॉइन्सची रक्कम
    // कोणत्याही कॉलरकडून एका ॲड्रेसवर पाठवते
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "अपुरी शिल्लक.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

हे उदाहरण तुम्हाला Solidity कॉन्ट्रॅक्ट सिंटॅक्स कसा असतो याची कल्पना देईल. फंक्शन्स आणि व्हेरिएबल्सच्या अधिक तपशीलवार वर्णनासाठी, [डॉक्युमेंट्स पहा](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- पायथॉनिक प्रोग्रामिंग भाषा
- स्ट्रॉंग टायपिंग
- लहान आणि समजण्याजोगा कंपाइलर कोड
- कार्यक्षम बाईटकोड निर्मिती
- Solidity पेक्षा मुद्दामहून कमी वैशिष्ट्ये आहेत, ज्याचा उद्देश कॉन्ट्रॅक्ट्स अधिक सुरक्षित आणि ऑडिट करण्यास सोपे बनवणे आहे. Vyper समर्थन करत नाही:
  - मॉडिफायर्स
  - इनहेरिटन्स
  - इनलाइन असेंब्ली
  - फंक्शन ओव्हरलोडिंग
  - ऑपरेटर ओव्हरलोडिंग
  - रिकर्सिव्ह कॉलिंग
  - अनंत-लांबीचे लूप्स
  - बायनरी फिक्स्ड पॉइंट्स

अधिक माहितीसाठी, [Vyper रॅशनल वाचा](https://vyper.readthedocs.io/en/latest/index.html).

### महत्वाच्या लिंक्स {#important-links-1}

- [दस्तऐवजीकरण](https://vyper.readthedocs.io)
- [उदाहरणांसह Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [उदाहरणांसह अधिक Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper कम्युनिटी डिस्कॉर्ड चॅट](https://discord.gg/SdvKC79cJk)
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Vyper साठी स्मार्ट कॉन्ट्रॅक्ट डेव्हलपमेंट फ्रेमवर्क आणि टूल्स](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper स्मार्ट कॉन्ट्रॅक्ट्स सुरक्षित करणे आणि हॅक करणे शिका](https://github.com/SupremacyTeam/VyperPunk)
- [विकासासाठी Vyper हब](https://github.com/zcor/vyper-dev)
- [Vyper ग्रेटेस्ट हिट्स स्मार्ट कॉन्ट्रॅक्ट उदाहरणे](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [अप्रतिम Vyper क्युरेटेड संसाधने](https://github.com/spadebuilders/awesome-vyper)

### उदाहरण {#example}

```python
# ओपन ऑक्शन

# लिलाव पॅरामीटर्स
# लाभार्थीला सर्वाधिक बोली लावणाऱ्याकडून पैसे मिळतात
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# लिलावाची सद्यस्थिती
highestBidder: public(address)
highestBid: public(uint256)

# शेवटी खरे वर सेट केले, कोणताही बदल करण्यास मनाई करते
ended: public(bool)

# परत केलेल्या बोलींचा मागोवा ठेवा जेणेकरून आम्ही काढण्याच्या पद्धतीचे अनुसरण करू शकू
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` सह एक साधा लिलाव तयार करा
# लाभार्थीच्या वतीने सेकंदांची बोली वेळ
# लाभार्थी पत्ता `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# पाठवलेल्या मूल्याने लिलावावर बोली लावा
# या व्यवहारासोबत.
# मूल्य फक्त परत केले जाईल जर
# लिलाव जिंकला नाही.
@external
@payable
def bid():
    # बोलीचा कालावधी संपला आहे का ते तपासा.
    assert block.timestamp < self.auctionEnd
    # बोली पुरेशी आहे का ते तपासा
    assert msg.value > self.highestBid
    # मागील उच्च बोली लावणाऱ्यासाठी परताव्याचा मागोवा घ्या
    self.pendingReturns[self.highestBidder] += self.highestBid
    # नवीन उच्च बोलीचा मागोवा घ्या
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# पूर्वी परत केलेली बोली काढा. काढण्याची पद्धत
# येथे सुरक्षा समस्या टाळण्यासाठी वापरली जाते. जर परतावे थेट
# bid() चा भाग म्हणून पाठवले गेले, तर एक दुर्भावनापूर्ण बोली करार ब्लॉक करू शकतो
# ते परतावे आणि त्यामुळे नवीन उच्च बोली येण्यापासून रोखू शकतो.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# लिलाव समाप्त करा आणि सर्वोच्च बोली पाठवा
# लाभार्थीला.
@external
def endAuction():
    # संवाद साधणाऱ्या फंक्शन्सची रचना करणे हे एक चांगले मार्गदर्शक तत्त्व आहे
    # इतर करारांसह (म्हणजे, ते फंक्शन्सना कॉल करतात किंवा इथर पाठवतात)
    # तीन टप्प्यांमध्ये:
    # 1. अटी तपासणे
    # 2. क्रिया करणे (संभाव्यतः अटी बदलणे)
    # 3. इतर करारांशी संवाद साधणे
    # जर हे टप्पे मिसळले गेले, तर दुसरा करार कॉल करू शकतो
    # सध्याच्या करारामध्ये परत आणि स्थिती सुधारित करू शकतो किंवा
    # परिणाम (इथर पेआउट) अनेक वेळा केले जाऊ शकतात.
    # जर अंतर्गत कॉल केलेल्या फंक्शन्समध्ये बाह्य करारांसह
    # संवाद समाविष्ट असेल, तर त्यांना देखील बाह्य करारांसह
    # संवाद मानले पाहिजे.

    # 1. अटी
    # लिलावाची समाप्तीची वेळ आली आहे का ते तपासा
    assert block.timestamp >= self.auctionEnd
    # हे फंक्शन आधीच कॉल केले आहे का ते तपासा
    assert not self.ended

    # 2. परिणाम
    self.ended = True

    # 3. संवाद
    send(self.beneficiary, self.highestBid)
```

हे उदाहरण तुम्हाला Vyper कॉन्ट्रॅक्ट सिंटॅक्स कसा असतो याची कल्पना देईल. फंक्शन्स आणि व्हेरिएबल्सच्या अधिक तपशीलवार वर्णनासाठी, [डॉक्युमेंट्स पहा](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul आणि Yul+ {#yul}

तुम्ही Ethereum साठी नवीन असाल आणि अद्याप स्मार्ट कॉन्ट्रॅक्ट भाषांसह कोडिंग केले नसेल, तर आम्ही Solidity किंवा Vyper सह प्रारंभ करण्याची शिफारस करतो. स्मार्ट कॉन्ट्रॅक्ट सुरक्षा सर्वोत्तम पद्धती आणि EVM सह काम करण्याच्या तपशीलांशी तुम्ही परिचित झाल्यावरच Yul किंवा Yul+ चा विचार करा.

**Yul**

- Ethereum साठी मध्यस्थ भाषा.
- [EVM](/developers/docs/evm) आणि [Ewasm](https://github.com/ewasm), एक Ethereum फ्लेवर्ड वेबअसेंब्ली, ला समर्थन देते आणि दोन्ही प्लॅटफॉर्म्सचा वापरण्यायोग्य समान विभाजक म्हणून डिझाइन केले आहे.
- उच्च-स्तरीय ऑप्टिमायझेशन टप्प्यांसाठी चांगले लक्ष्य जे EVM आणि Ewasm दोन्ही प्लॅटफॉर्मला समान फायदा देऊ शकतात.

**Yul+**

- Yul चे एक निम्न-स्तरीय, अत्यंत कार्यक्षम विस्तारीकरण.
- सुरुवातीला [optimistic rollup](/developers/docs/scaling/optimistic-rollups/) कॉन्ट्रॅक्टसाठी डिझाइन केलेले.
- Yul+ ला Yul साठी एक प्रायोगिक अपग्रेड प्रस्ताव म्हणून पाहिले जाऊ शकते, जे त्यात नवीन वैशिष्ट्ये जोडते.

### महत्वाच्या लिंक्स {#important-links-2}

- [Yul दस्तऐवजीकरण](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ दस्तऐवजीकरण](https://github.com/fuellabs/yulp)
- [Yul+ परिचय पोस्ट](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### उदाहरण कॉन्ट्रॅक्ट {#example-contract-2}

पुढील सोपे उदाहरण पॉवर फंक्शन लागू करते. `solc --strict-assembly --bin input.yul` वापरून ते संकलित केले जाऊ शकते. उदाहरण
input.yul फाईलमध्ये संग्रहित केले पाहिजे.

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

जर तुम्ही स्मार्ट कॉन्ट्रॅक्टमध्ये आधीच चांगले अनुभवी असाल, तर Yul मधील संपूर्ण ERC20 अंमलबजावणी [येथे](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) आढळू शकते.

## Fe {#fe}

- Ethereum व्हर्च्युअल मशीन (EVM) साठी स्टॅटिकली टाइप केलेली भाषा.
- Python आणि Rust पासून प्रेरित.
- अगदी Ethereum इकोसिस्टममध्ये नवीन असलेल्या विकसकांसाठीही शिकण्यास सोपे बनविण्याचे उद्दिष्ट आहे.
- Fe चा विकास अजूनही सुरुवातीच्या टप्प्यात आहे, या भाषेची अल्फा आवृत्ती जानेवारी २०२१ मध्ये प्रसिद्ध झाली.

### महत्वाच्या लिंक्स {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe घोषणा](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 रोडमॅप](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe डिस्कॉर्ड चॅट](https://discord.com/invite/ywpkAXFjZH)
- [Fe ट्विटर](https://twitter.com/official_fe)

### उदाहरण कॉन्ट्रॅक्ट {#example-contract-3}

खालील एक Fe मध्ये अंमलात आणलेले एक साधे कॉन्ट्रॅक्ट आहे.

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

## कसे निवडावे {#how-to-choose}

इतर कोणत्याही प्रोग्रामिंग भाषेप्रमाणे, हे बहुतेक योग्य कामासाठी योग्य साधन निवडण्याबद्दल तसेच वैयक्तिक पसंतींबद्दल आहे.

तुम्ही अजून कोणतीही भाषा वापरून पाहिली नसेल, तर विचारात घेण्यासाठी येथे काही गोष्टी आहेत:

### Solidity बद्दल काय छान आहे? {#solidity-advantages}

- तुम्ही नवशिके असाल, तर तेथे अनेक ट्युटोरियल्स आणि शिकण्याची साधने उपलब्ध आहेत. त्याबद्दल अधिक माहिती [कोडिंगद्वारे शिका](/developers/learning-tools/) विभागात पहा.
- चांगली विकसक टूलींग उपलब्ध आहे.
- Solidity चा एक मोठा विकसक समुदाय आहे, याचा अर्थ तुम्हाला तुमच्या प्रश्नांची उत्तरे बहुधा पटकन मिळतील.

### Vyper बद्दल काय छान आहे? {#vyper-advatages}

- Python डेव्हलपर्ससाठी ज्यांना स्मार्ट कॉन्ट्रॅक्ट लिहायचे आहेत त्यांच्यासाठी सुरुवात करण्याचा उत्तम मार्ग.
- Vyper मध्ये कमी वैशिष्ट्ये आहेत ज्यामुळे ते कल्पनांच्या जलद प्रोटोटाइपिंगसाठी उत्तम आहे.
- Vyper चे उद्दिष्ट ऑडिट करण्यास सोपे आणि जास्तीत जास्त मानवी-वाचनीय असणे हे आहे.

### Yul आणि Yul+ बद्दल काय छान आहे? {#yul-advantages}

- सरळ आणि कार्यात्मक निम्न-स्तरीय भाषा.
- रॉ EVM च्या खूप जवळ जाण्याची परवानगी देते, जे तुमच्या कॉन्ट्रॅक्ट्सचा गॅस वापर ऑप्टिमाइझ करण्यात मदत करू शकते.

## भाषांची तुलना {#language-comparisons}

मूलभूत सिंटॅक्स, कॉन्ट्रॅक्ट लाइफसायकल, इंटरफेस, ऑपरेटर, डेटा स्ट्रक्चर्स, फंक्शन्स, कंट्रोल फ्लो, आणि बरेच काही यांच्या तुलनेसाठी Auditless द्वारे हे [चीटशीट](https://reference.auditless.com/cheatsheet/) पहा

## पुढील वाचन {#further-reading}

- [OpenZeppelin द्वारे Solidity कॉन्ट्रॅक्ट्स लायब्ररी](https://docs.openzeppelin.com/contracts/5.x/)
- [उदाहरणांसह Solidity](https://solidity-by-example.org)
