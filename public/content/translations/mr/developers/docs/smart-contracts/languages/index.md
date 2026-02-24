---
title: "स्मार्ट कॉन्ट्रॅक्ट भाषा"
description: "दोन मुख्य स्मार्ट कॉन्ट्रॅक्ट भाषा - Solidity आणि Vyper यांचा आढावा आणि तुलना."
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
    # with other contracts (i.e., they call functions or send ether)
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
