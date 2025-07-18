---
title: स्मार्ट अनुबंध भाषाएं
description: अवलोकन और दो मुख्य स्मार्ट अनुबंध भाषाओं – Solidity और Vyper की तुलना।
lang: hi
---

एथेरियम के बारे में एक बड़ा पहलू यह है कि स्मार्ट अनुबंध को अपेक्षाकृत डेवलपर के अनुकूल भाषाओं का उपयोग करके प्रोग्राम किया जा सकता है। यदि आप Python या किसी [कर्ली-ब्रैकेट भाषा](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) को जानते हैं, तो आप परिचित वाक्यविन्यास वाली भाषा पा सकते हैं।

दो सबसे सक्रिय और अनुरक्षित भाषाएं हैं:

- Solidity
- Vyper

रीमिक्स IDE Solidity और Vyper दोनों में अनुबंध बनाने और परीक्षण करने के लिए एक व्यापक विकास परिवेश प्रदान करता है। कोडिंग शुरू करने के लिए [इन-ब्राउज़र रीमिक्स IDE आज़माएं](https://remix.ethereum.org)।

अधिक अनुभवी डेवलपर्स भी Yul का उपयोग करना चाह सकते हैं, यह [एथेरियम वर्चुअल मशीन](/developers/docs/evm/) या Yul+ के लिए एक मध्यवर्ती भाषा है, जो Yul का एक्सटेंशन है।

यदि आप उत्सुक हैं और नई भाषाओं का परीक्षण करने में मदद करना चाहते हैं जो अभी भी गहन विकास के अधीन हैं, तो आप Fe के साथ प्रयोग कर सकते हैं, जो उभरती हुई स्मार्ट अनुबंध भाषा है जो अभी भी अपनी प्रारंभिक अवस्था में है।

## आवश्यक शर्तें {#prerequisites}

प्रोग्रामिंग भाषाओं, विशेष रूप से JavaScript या Python का पिछला ज्ञान, आपको स्मार्ट अनुबंध भाषाओं में अंतर की समझ बनाने में मदद कर सकता है। हम यह भी अनुशंसा करते हैं कि आप भाषा की तुलना में बहुत अधिक गहराई में जाने से पहले स्मार्ट अनुबंधों को एक अवधारणा के रूप में समझ लें। [स्मार्ट अनुबंधों का परिचय](/developers/docs/smart-contracts/)।

## Solidity {#solidity}

- स्मार्ट अनुबंधों को लागू करने के लिए ऑब्जेक्ट-ओरिएंटेड, उच्च-स्तरीय भाषा।
- कर्ली-ब्रैकेट भाषा जो C++ से सबसे अधिक गहराई से प्रभावित हुई है।
- स्टैटिक रूप से टाइप किया गया (वेरिएबल का प्रकार संकलन समय पर जाना जाता है)।
- समर्थन करता है:
  - विरासत (आप अन्य अनुबंधों का विस्तार कर सकते हैं)।
  - लाइब्रेरी (आप पुन: प्रयोज्य कोड बना सकते हैं जिसे आप विभिन्न अनुबंधों से कॉल कर सकते हैं – जैसे अन्य ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग भाषाओं में स्टैटिक वर्ग में स्टैटिक फंक्शंस)।
  - जटिल यूज़र-परिभाषित प्रकार।

### जरूरी लिंक {#important-links}

- [प्रलेखन](https://docs.soliditylang.org/en/latest/)
- [Solidity भाषा का पोर्टल](https://soliditylang.org/)
- [उदाहरण के लिए Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter चैटरूम](https://gitter.im/ethereum/solidity) को [Solidity Matrix चैटरूम](https://matrix.to/#/#ethereum_solidity:gitter.im) से जोड़ा गया
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Solidity ब्लॉग](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### उदाहरण अनुबंध {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

इस उदाहरण से आपको यह पता चल जाना चाहिए कि Solidity अनुबंध वाक्यविन्यास कैसा है। फंक्शंस और वेरिएबल्स के ज़्यादा विस्तृत विवरण के लिए, [डॉक्स देखें](https://docs.soliditylang.org/en/latest/contracts.html)।

## Vyper {#vyper}

- Pythonic प्रोग्रामिंग भाषा
- मजबूत टाइपिंग
- छोटा और समझने योग्य कंपाइलर कोड
- कुशल बाइटकोड जेनरेशन
- अनुबंधों को अधिक सुरक्षित और ऑडिट करना आसान बनाने के उद्देश्य से Solidity की तुलना में जानबूझकर कम विशेषताएं दी गई हैं। Vyper इनका समर्थन नहीं करता है:
  - संशोधक
  - इनहेरिटेंस
  - इनलाइन असेंबली
  - फंक्शन ओवरलोडिंग
  - ऑपरेटर ओवरलोडिंग
  - पुनरावर्ती कॉलिंग
  - अनंत-लंबाई के लूप
  - बाइनरी निश्चित बिंदु

अधिक जानकारी के लिए, [Vyper तर्क पढ़ें](https://vyper.readthedocs.io/en/latest/index.html)।

### जरूरी लिंक {#important-links-1}

- [प्रलेखन](https://vyper.readthedocs.io)
- [उदाहरण के तौर पर Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [उदाहरण के तौर पर अधिक Vyper](https://vyper-by-example.org/)
- [गिटहब](https://github.com/vyperlang/vyper)
- [Vyper समुदाय Discord चैट](https://discord.gg/SdvKC79cJk)
- [चीट शीट](https://reference.auditless.com/cheatsheet)
- [Vyper के लिए स्मार्ट अनुबंध विकास ढांचे और उपकरण](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper स्मार्ट अनुबंध को सुरक्षित और हैक करने के तरीके सीखें](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - Vyper कमजोरी के उदाहरण](https://www.vyperexamples.com/reentrancy)
- [विकास के लिए Vyper हब](https://github.com/zcor/vyper-dev)
- [Vyper ने स्मार्ट अनुबंध उदाहरणों को सबसे ज्यादा हिट किया](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [बहुत बढ़िया Vyper क्यूरेटेड संसाधन](https://github.com/spadebuilders/awesome-vyper)

### उदाहरण {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

इस उदाहरण से आपको यह पता चल जाना चाहिए कि Vyper अनुबंध वाक्यविन्यास कैसा है। फंक्शंस और वेरिएबल्स के ज़्यादा विस्तृत विवरण के लिए, [डॉक्स देखें](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)।

## Yul और Yul+ {#yul}

यदि आप एथेरियम के लिए नए हैं और अभी तक स्मार्ट अनुबंध भाषाओं के साथ कोई कोडिंग नहीं की है, तो हम अनुशंसा करते हैं कि आप Solidity या Vyper के साथ शुरुआत करें। स्मार्ट अनुबंध सुरक्षा सर्वोत्तम प्रथाओं और EVM के साथ काम करने की बारीकियों से परिचित होने के बाद ही Yul या Yul+ को देखें।

**Yul**

- एथेरियम के लिए मध्यवर्ती भाषा।
- [EVM](/developers/docs/evm) और [Ewasm](https://github.com/ewasm), एक एथेरियम फ्लेवर्ड WebAssembly का समर्थन करता है, और इसे दोनों प्लेटफार्मों के प्रयोग करने योग्य सामान्य भाजक के रूप में डिज़ाइन किया गया है।
- उच्च-स्तरीय अनुकूलन चरणों के लिए अच्छा लक्ष्य जो EVM और Ewasm दोनों प्लेटफार्मों को समान रूप से लाभान्वित कर सकता है।

**Yul+**

- Yul के लिए एक निम्न-स्तरीय, अत्यधिक कुशल एक्सटेंशन।
- प्रारंभ में [आशावादी रोलअप](/developers/docs/scaling/optimistic-rollups/) अनुबंध के लिए डिज़ाइन किया गया था।
- Yul+ को Yul के लिए एक प्रयोगात्मक अपग्रेड प्रस्ताव के रूप में देखा जा सकता है, इसमें नई सुविधाएँ जोड़ सकते हैं।

### जरूरी लिंक {#important-links-2}

- [Yul प्रलेखन](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ प्रलेखन](https://github.com/fuellabs/yulp)
- [Yul+ खेल का मैदान](https://yulp.fuel.sh/)
- [Yul+ परिचय पोस्ट](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### उदाहरण अनुबंध {#example-contract-2}

निम्नलिखित सरल उदाहरण एक पावर फंक्शन को लागू करता है। इसे `solc --strict-assembly --bin input.yul` का उपयोग करके संकलित किया जा सकता है। उदाहरण input.yul फ़ाइल में स्टोर किया जाना चाहिए।

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

यदि आप पहले से ही स्मार्ट अनुबंधों के साथ अच्छी तरह से अनुभवी हैं, तो Yul में एक पूर्ण ERC20 कार्यान्वयन [यहां](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) पाया जा सकता है।

## Fe {#fe}

- एथेरियम वर्चुअल मशीन (EVM) के लिए स्टैटिक रूप से टाइप की गई भाषा।
- Python और Rust से प्रेरित।
- सीखने में आसान होने का लक्ष्य है -- यहां तक कि उन डेवलपर्स के लिए भी जो एथेरियम पारिस्थितिकी इकोसिस्टम में नए हैं।
- Fe का विकास अभी भी अपने शुरुआती चरण में है, जनवरी 2021 में भाषा की अल्फा रिलीज़ हुई थी।

### जरूरी लिंक {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe की घोषणा](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 रोडमैप](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord चैट](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### उदाहरण अनुबंध {#example-contract-3}

निम्नलिखित Fe में लागू एक साधारण अनुबंध है।

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

किसी भी अन्य प्रोग्रामिंग भाषा की तरह, यह ज्यादातर सही काम के साथ-साथ व्यक्तिगत प्राथमिकताओं के लिए सही उपकरण चुनने के बारे में है।

यदि आपने अभी तक किसी भी भाषा को आजमाया नहीं है, तो यहां कुछ बातें दी गई हैं जिन पर आपको विचार करना चाहिए:

### Solidity के बारे में क्या अच्छा है? {#solidity-advantages}

- यदि आप एक नौसिखिया हैं, तो कई ट्यूटोरियल और सीखने के उपकरण उपलब्ध हैं। इसके बारे में अधिक जानकारी के लिए [कोडिंग द्वारा सीखें](/developers/learning-tools/) सेक्शन देखें।
- अच्छा डेवलपर टूलींग उपलब्ध है।
- Solidity में एक बड़ा डिवेलपर समुदाय है, जिसका अर्थ है कि आपको अपने प्रश्नों के उत्तर बहुत जल्दी मिल जाएंगे।

### Vyper के बारे में क्या बढ़िया है? {#vyper-advatages}

- Python डेवलपर के लिए आरंभ करने का शानदार तरीका जो स्मार्ट अनुबंध लिखना चाहते हैं।
- Vyper में कम विशेषताएं हैं जो विचारों के त्वरित प्रोटोटाइप के लिए इसे शानदार बनाती हैं।
- Vyper का उद्देश्य ऑडिट करना आसान और अधिकतम मानव-पठनीय होना है।

### Yul और Yul+ के बारे में क्या बढ़िया है? {#yul-advantages}

- सरलीकृत और कार्यात्मक निम्न-स्तरीय भाषा।
- अधूरी EVM के बहुत करीब पहुंचने देता है, जो आपके अनुबंधों के गैस उपयोग को अनुकूलित करने में मदद कर सकता है।

## भाषा की तुलना {#language-comparisons}

मूल वाक्यविन्यास, अनुबंध जीवनचक्र, इंटरफेस, ऑपरेटर, डेटा संरचनाएं, फंक्शंस, नियंत्रण प्रवाह आदि की तुलना के लिए [Auditless द्वारा इस चीटशीट](https://reference.auditless.com/cheatsheet/) को देखें

## अग्रिम पठन {#further-reading}

- [OpenZeppelin द्वारा Solidity अनुबंध लाइब्रेरी](https://docs.openzeppelin.com/contracts)
- [उदाहरण के लिए Solidity](https://solidity-by-example.org)
