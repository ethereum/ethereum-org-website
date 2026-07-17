---
title: "स्मार्ट अनुबंध भाषाएं"
description: "दो मुख्य स्मार्ट अनुबंध भाषाओं – Solidity और Vyper का अवलोकन और तुलना।"
lang: hi
---

[इथेरियम](/) के बारे में एक बेहतरीन बात यह है कि स्मार्ट अनुबंधों को अपेक्षाकृत डेवलपर-अनुकूल भाषाओं का उपयोग करके प्रोग्राम किया जा सकता है। यदि आप Python या किसी [कर्ली-ब्रैकेट भाषा](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) के अनुभवी हैं, तो आप परिचित सिंटैक्स वाली भाषा पा सकते हैं।

दो सबसे सक्रिय और मेंटेन की जाने वाली भाषाएं हैं:

- Solidity
- Vyper

Remix IDE, Solidity और Vyper दोनों में अनुबंध बनाने और परीक्षण करने के लिए एक व्यापक विकास वातावरण प्रदान करता है। कोडिंग शुरू करने के लिए [इन-ब्राउज़र Remix IDE आज़माएं](https://remix.ethereum.org)।

अधिक अनुभवी डेवलपर Yul का उपयोग करना भी चाह सकते हैं, जो [इथेरियम वर्चुअल मशीन (EVM)](/developers/docs/evm/) के लिए एक मध्यवर्ती भाषा है, या Yul+, जो Yul का एक एक्सटेंशन है।

यदि आप उत्सुक हैं और उन नई भाषाओं का परीक्षण करने में मदद करना पसंद करते हैं जो अभी भी भारी विकास के अधीन हैं, तो आप Fe के साथ प्रयोग कर सकते हैं, जो एक उभरती हुई स्मार्ट अनुबंध भाषा है और वर्तमान में अभी भी अपने शुरुआती चरण में है।

## पूर्वापेक्षाएं {#prerequisites}

प्रोग्रामिंग भाषाओं, विशेष रूप से JavaScript या Python का पूर्व ज्ञान, आपको स्मार्ट अनुबंध भाषाओं में अंतर को समझने में मदद कर सकता है। हम यह भी सलाह देते हैं कि भाषा की तुलना में बहुत गहराई तक जाने से पहले आप स्मार्ट अनुबंधों को एक अवधारणा के रूप में समझें। [स्मार्ट अनुबंधों का परिचय](/developers/docs/smart-contracts/)।

## Solidity {#solidity}

- स्मार्ट अनुबंधों को लागू करने के लिए ऑब्जेक्ट-ओरिएंटेड, उच्च-स्तरीय भाषा।
- कर्ली-ब्रैकेट भाषा जो C++ से सबसे अधिक गहराई से प्रभावित हुई है।
- स्टैटिकली टाइप्ड (वेरिएबल का प्रकार कंपाइल समय पर ज्ञात होता है)।
- समर्थन करती है:
  - इनहेरिटेंस (आप अन्य अनुबंधों का विस्तार कर सकते हैं)।
  - लाइब्रेरी (आप पुन: प्रयोज्य कोड बना सकते हैं जिसे आप विभिन्न अनुबंधों से कॉल कर सकते हैं - जैसे अन्य ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग भाषाओं में एक स्टैटिक क्लास में स्टैटिक फ़ंक्शन)।
  - जटिल उपयोगकर्ता-परिभाषित प्रकार।

### महत्वपूर्ण लिंक {#important-links}

- [दस्तावेज़ीकरण](https://docs.soliditylang.org/en/latest/)
- [Solidity भाषा पोर्टल](https://soliditylang.org/)
- [उदाहरण द्वारा Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter चैटरूम](https://gitter.im/ethereum/solidity) जो [Solidity Matrix चैटरूम](https://matrix.to/#/#ethereum_solidity:gitter.im) से जुड़ा है
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Solidity ब्लॉग](https://blog.soliditylang.org/)
- [Solidity ट्विटर](https://twitter.com/solidity_lang)

### उदाहरण अनुबंध {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" कीवर्ड वेरिएबल्स को
    // अन्य अनुबंधों से सुलभ बनाता है
    address public minter;
    mapping (address => uint) public balances;

    // इवेंट्स क्लाइंट्स को आपके द्वारा घोषित विशिष्ट
    // अनुबंध परिवर्तनों पर प्रतिक्रिया करने की अनुमति देते हैं
    event Sent(address from, address to, uint amount);

    // कंस्ट्रक्टर कोड केवल तभी चलता है जब अनुबंध
    // बनाया जाता है
    constructor() {
        minter = msg.sender;
    }

    // किसी पते पर नए बनाए गए सिक्कों की एक राशि भेजता है
    // इसे केवल अनुबंध निर्माता द्वारा ही कॉल किया जा सकता है
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // मौजूदा सिक्कों की एक राशि भेजता है
    // किसी भी कॉलर से किसी पते पर
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

यह उदाहरण आपको इस बात का अंदाज़ा देगा कि Solidity अनुबंध का सिंटैक्स कैसा होता है। फ़ंक्शंस और वेरिएबल्स के अधिक विस्तृत विवरण के लिए, [दस्तावेज़ देखें](https://docs.soliditylang.org/en/latest/contracts.html)।

## Vyper {#vyper}

- पायथोनिक (Pythonic) प्रोग्रामिंग भाषा
- स्ट्रॉन्ग टाइपिंग
- छोटा और समझने योग्य कंपाइलर कोड
- कुशल बाइटकोड जनरेशन
- अनुबंधों को अधिक सुरक्षित और ऑडिट करने में आसान बनाने के उद्देश्य से जानबूझकर Solidity की तुलना में कम विशेषताएं हैं। Vyper इनका समर्थन नहीं करता है:
  - मॉडिफायर्स
  - इनहेरिटेंस
  - इनलाइन असेंबली
  - फ़ंक्शन ओवरलोडिंग
  - ऑपरेटर ओवरलोडिंग
  - रिकर्सिव कॉलिंग
  - अनंत-लंबाई वाले लूप
  - बाइनरी फिक्स्ड पॉइंट्स

अधिक जानकारी के लिए, [Vyper का तर्क पढ़ें](https://vyper.readthedocs.io/en/latest/index.html)।

### महत्वपूर्ण लिंक {#important-links-1}

- [दस्तावेज़ीकरण](https://vyper.readthedocs.io)
- [उदाहरण द्वारा Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [उदाहरण द्वारा और अधिक Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper समुदाय डिस्कॉर्ड चैट](https://discord.gg/SdvKC79cJk)
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Vyper के लिए स्मार्ट अनुबंध विकास फ्रेमवर्क और टूल](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper स्मार्ट अनुबंधों को सुरक्षित करना और हैक करना सीखें](https://github.com/SupremacyTeam/VyperPunk)
- [विकास के लिए Vyper हब](https://github.com/zcor/vyper-dev)
- [Vyper के सबसे बेहतरीन स्मार्ट अनुबंध उदाहरण](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper क्यूरेटेड संसाधन](https://github.com/spadebuilders/awesome-vyper)

### उदाहरण {#example}

```python
# खुली नीलामी

# नीलामी पैरामीटर्स
# लाभार्थी को सबसे ऊंची बोली लगाने वाले से पैसा मिलता है
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# नीलामी की वर्तमान स्थिति
highestBidder: public(address)
highestBid: public(uint256)

# अंत में true पर सेट किया जाता है, किसी भी बदलाव की अनुमति नहीं देता है
ended: public(bool)

# रिफंड की गई बोलियों का ट्रैक रखें ताकि हम विथड्रॉ पैटर्न का पालन कर सकें
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` के साथ एक साधारण नीलामी बनाएं
# सेकंड का बोली समय, जो कि
# लाभार्थी पते `_beneficiary` की ओर से हो।
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# भेजे गए मूल्य के साथ नीलामी में बोली लगाएं
# जो इस लेनदेन के साथ भेजा गया है।
# मूल्य केवल तभी वापस किया जाएगा जब
# नीलामी नहीं जीती जाती है।
@external
@payable
def bid():
    # जांचें कि क्या बोली लगाने की अवधि समाप्त हो गई है।
    assert block.timestamp < self.auctionEnd
    # जांचें कि क्या बोली पर्याप्त रूप से अधिक है
    assert msg.value > self.highestBid
    # पिछले सबसे ऊंची बोली लगाने वाले के लिए रिफंड को ट्रैक करें
    self.pendingReturns[self.highestBidder] += self.highestBid
    # नई सबसे ऊंची बोली को ट्रैक करें
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# पहले रिफंड की गई बोली को निकालें। विथड्रॉ पैटर्न का उपयोग
# यहां सुरक्षा समस्या से बचने के लिए किया जाता है। यदि रिफंड सीधे
# bid() के हिस्से के रूप में भेजे जाते, तो एक दुर्भावनापूर्ण बोली लगाने वाला अनुबंध ब्लॉक कर सकता था
# उन रिफंड्स को और इस प्रकार नई उच्च बोलियों को आने से रोक सकता था।
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# नीलामी समाप्त करें और सबसे ऊंची बोली
# लाभार्थी को भेजें।
@external
def endAuction():
    # उन फ़ंक्शंस को संरचित करने के लिए यह एक अच्छा दिशानिर्देश है जो इंटरैक्ट करते हैं
    # अन्य अनुबंधों के साथ (यानी, वे फ़ंक्शंस को कॉल करते हैं या ईथर भेजते हैं)
    # तीन चरणों में:
    # 1. शर्तों की जांच करना
    # 2. क्रियाएं करना (संभावित रूप से शर्तों को बदलना)
    # 3. अन्य अनुबंधों के साथ इंटरैक्ट करना
    # यदि ये चरण आपस में मिल जाते हैं, तो दूसरा अनुबंध वापस
    # वर्तमान अनुबंध में कॉल कर सकता है और स्थिति को संशोधित कर सकता है या
    # प्रभावों (ईथर भुगतान) को कई बार निष्पादित करने का कारण बन सकता है।
    # यदि आंतरिक रूप से कॉल किए गए फ़ंक्शंस में बाहरी
    # अनुबंधों के साथ इंटरैक्शन शामिल है, तो उन्हें भी बाहरी अनुबंधों के साथ
    # इंटरैक्शन माना जाना चाहिए।

    # 1. शर्तें
    # जांचें कि क्या नीलामी का समाप्ति समय आ गया है
    assert block.timestamp >= self.auctionEnd
    # जांचें कि क्या यह फ़ंक्शन पहले ही कॉल किया जा चुका है
    assert not self.ended

    # 2. प्रभाव
    self.ended = True

    # 3. इंटरैक्शन
    send(self.beneficiary, self.highestBid)
```

यह उदाहरण आपको इस बात का अंदाज़ा देगा कि Vyper अनुबंध का सिंटैक्स कैसा होता है। फ़ंक्शंस और वेरिएबल्स के अधिक विस्तृत विवरण के लिए, [दस्तावेज़ देखें](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)।

## Yul और Yul+ {#yul}

यदि आप इथेरियम में नए हैं और अभी तक स्मार्ट अनुबंध भाषाओं के साथ कोई कोडिंग नहीं की है, तो हम Solidity या Vyper के साथ शुरुआत करने की सलाह देते हैं। Yul या Yul+ को तभी देखें जब आप स्मार्ट अनुबंध सुरक्षा सर्वोत्तम प्रथाओं और EVM के साथ काम करने की बारीकियों से परिचित हो जाएं।

**Yul**

- इथेरियम के लिए मध्यवर्ती भाषा।
- [EVM](/developers/docs/evm) और [Ewasm](https://github.com/ewasm) (एक इथेरियम फ्लेवर्ड WebAssembly) का समर्थन करता है, और इसे दोनों प्लेटफार्मों के एक उपयोगी सामान्य भाजक (common denominator) के रूप में डिज़ाइन किया गया है।
- उच्च-स्तरीय अनुकूलन (optimisation) चरणों के लिए अच्छा लक्ष्य जो EVM और Ewasm दोनों प्लेटफार्मों को समान रूप से लाभान्वित कर सकता है।

**Yul+**

- Yul का एक निम्न-स्तरीय, अत्यधिक कुशल एक्सटेंशन।
- शुरुआत में एक [ऑप्टिमिस्टिक रोलअप](/developers/docs/scaling/optimistic-rollups/) अनुबंध के लिए डिज़ाइन किया गया था।
- Yul+ को Yul के लिए एक प्रयोगात्मक अपग्रेड प्रस्ताव के रूप में देखा जा सकता है, जो इसमें नई सुविधाएँ जोड़ता है।

### महत्वपूर्ण लिंक {#important-links-2}

- [Yul दस्तावेज़ीकरण](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ दस्तावेज़ीकरण](https://github.com/fuellabs/yulp)
- [Yul+ परिचय पोस्ट](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### उदाहरण अनुबंध {#example-contract-2}

निम्नलिखित सरल उदाहरण एक पावर फ़ंक्शन को लागू करता है। इसे `solc --strict-assembly --bin input.yul` का उपयोग करके संकलित (compile) किया जा सकता है। उदाहरण को input.yul फ़ाइल में संग्रहीत किया जाना चाहिए।

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

यदि आप पहले से ही स्मार्ट अनुबंधों के साथ अच्छी तरह से अनुभवी हैं, तो Yul में एक पूर्ण ERC-20 कार्यान्वयन [यहां](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) पाया जा सकता है।

## Fe {#fe}

- इथेरियम वर्चुअल मशीन (EVM) के लिए स्टैटिकली टाइप्ड भाषा।
- Python और Rust से प्रेरित।
- इसका उद्देश्य सीखना आसान होना है -- यहां तक कि उन डेवलपर्स के लिए भी जो इथेरियम इकोसिस्टम में नए हैं।
- Fe का विकास अभी भी अपने शुरुआती चरण में है, भाषा का अल्फा रिलीज़ जनवरी 2021 में हुआ था।

### महत्वपूर्ण लिंक {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe घोषणा](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 रोडमैप](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe डिस्कॉर्ड चैट](https://discord.com/invite/ywpkAXFjZH)
- [Fe ट्विटर](https://twitter.com/official_fe)

### उदाहरण अनुबंध {#example-contract-3}

निम्नलिखित Fe में लागू किया गया एक सरल अनुबंध है।

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

## कैसे चुनें {#how-to-choose}

किसी भी अन्य प्रोग्रामिंग भाषा की तरह, यह मुख्य रूप से सही काम के लिए सही टूल चुनने के साथ-साथ व्यक्तिगत प्राथमिकताओं के बारे में है।

यदि आपने अभी तक किसी भी भाषा की कोशिश नहीं की है, तो यहां कुछ बातों पर विचार किया गया है:

### Solidity के बारे में क्या बढ़िया है? {#solidity-advantages}

- यदि आप एक शुरुआती हैं, तो वहां कई ट्यूटोरियल और सीखने के उपकरण मौजूद हैं। इसके बारे में [कोडिंग द्वारा सीखें](/developers/learning-tools/) अनुभाग में अधिक देखें।
- अच्छे डेवलपर टूलिंग उपलब्ध हैं।
- Solidity का एक बड़ा डेवलपर समुदाय है, जिसका अर्थ है कि आपको अपने सवालों के जवाब बहुत जल्दी मिलने की संभावना है।

### Vyper के बारे में क्या बढ़िया है? {#vyper-advatages}

- उन Python डेवलपर्स के लिए शुरुआत करने का शानदार तरीका जो स्मार्ट अनुबंध लिखना चाहते हैं।
- Vyper में कम संख्या में विशेषताएं हैं जो इसे विचारों की त्वरित प्रोटोटाइपिंग के लिए बहुत अच्छा बनाती हैं।
- Vyper का उद्देश्य ऑडिट करने में आसान और अधिकतम मानव-पठनीय होना है।

### Yul और Yul+ के बारे में क्या बढ़िया है? {#yul-advantages}

- सरल और कार्यात्मक निम्न-स्तरीय भाषा।
- रॉ (raw) EVM के बहुत करीब जाने की अनुमति देता है, जो आपके अनुबंधों के गैस उपयोग को अनुकूलित करने में मदद कर सकता है।

## भाषा की तुलना {#language-comparisons}

बुनियादी सिंटैक्स, अनुबंध जीवनचक्र, इंटरफेस, ऑपरेटर, डेटा संरचनाओं, फ़ंक्शंस, नियंत्रण प्रवाह (control flow), और बहुत कुछ की तुलना के लिए Auditless द्वारा इस [चीटशीट](https://reference.auditless.com/cheatsheet/) को देखें।

## आगे की पढ़ाई {#further-reading}

- [ओपनजेपेलिन द्वारा Solidity अनुबंध लाइब्रेरी](https://docs.openzeppelin.com/contracts/5.x/)
- [उदाहरण द्वारा Solidity](https://solidity-by-example.org)
