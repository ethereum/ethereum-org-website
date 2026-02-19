---
title: "ஸ்மார்ட் ஒப்பந்த மொழிகள்"
description: "இரண்டு முக்கிய ஸ்மார்ட் ஒப்பந்த மொழிகளான – Solidity மற்றும் Vyper ஆகியவற்றின் மேலோட்டம் மற்றும் ஒப்பீடு."
lang: ta
---

Ethereum பற்றிய ஒரு சிறந்த அம்சம் என்னவென்றால், ஸ்மார்ட் ஒப்பந்தங்களை ஒப்பீட்டளவில் உருவாக்குநர்களுக்கு-நட்பான மொழிகளைப் பயன்படுத்தி நிரல்படுத்தலாம். நீங்கள் Python அல்லது ஏதேனும் [நெளி-அடைப்புக்குறி மொழியில்](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) அனுபவம் வாய்ந்தவராக இருந்தால், பழக்கமான தொடரியல் கொண்ட மொழியைக் காணலாம்.

மிகவும் செயலில் உள்ள மற்றும் பராமரிக்கப்படும் இரண்டு மொழிகள்:

- Solidity
- Vyper

Remix IDE ஆனது Solidity மற்றும் Vyper இரண்டிலும் ஒப்பந்தங்களை உருவாக்குவதற்கும் சோதிப்பதற்கும் ஒரு விரிவான மேம்பாட்டு சூழலை வழங்குகிறது. குறியீட்டு முறையைத் தொடங்க [உலாவியில் உள்ள Remix IDEஐ முயற்சிக்கவும்](https://remix.ethereum.org).

அதிக அனுபவம் வாய்ந்த உருவாக்குநர்கள் (டெவலப்பர்கள்) [Ethereum மெய்நிகர் இயந்திரத்திற்கான](/developers/docs/evm/) இடைநிலை மொழியான Yul அல்லது Yul-இன் நீட்டிப்பான Yul+ ஐப் பயன்படுத்த விரும்பலாம்.

நீங்கள் ஆர்வமாக இருந்து, இன்னும் அதிக வளர்ச்சியில் இருக்கும் புதிய மொழிகளைச் சோதிக்க உதவ விரும்பினால், தற்போது ஆரம்ப நிலையில் உள்ள வளர்ந்து வரும் ஸ்மார்ட் ஒப்பந்த மொழியான Fe-ஐ நீங்கள் பரிசோதனை செய்யலாம்.

## முன்னேற்றக் கட்டுரை {#prerequisites}

நிரலாக்க மொழிகள், குறிப்பாக ஜாவாஸ்கிரிப்ட் அல்லது பைதான் பற்றிய முந்தைய அறிவு, ஸ்மார்ட் ஒப்பந்த மொழிகளில் உள்ள வேறுபாடுகளைப் புரிந்துகொள்ள உங்களுக்கு உதவும். மொழி ஒப்பீடுகளில் ஆழமாகச் செல்வதற்கு முன், ஸ்மார்ட் ஒப்பந்தங்களை ஒரு கருத்தாகப் புரிந்துகொள்ளுமாறு நாங்கள் பரிந்துரைக்கிறோம். [ஸ்மார்ட் ஒப்பந்தங்களுக்கான அறிமுகம்](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- ஸ்மார்ட் ஒப்பந்தங்களை செயல்படுத்துவதற்கான பொருள் சார்ந்த, உயர் மட்ட மொழி.
- C++ ஆல் மிகவும் ஆழமாகப் பாதிக்கப்பட்ட நெளி-அடைப்புக்குறி மொழி.
- நிலையாகத் தட்டச்சு செய்யப்பட்டது (ஒரு மாறியின் வகை தொகுக்கும் நேரத்தில் அறியப்படுகிறது).
- ஆதரிக்கிறது:
  - மரபுரிமை (நீங்கள் பிற ஒப்பந்தங்களை நீட்டிக்கலாம்).
  - நூலகங்கள் (நீங்கள் வெவ்வேறு ஒப்பந்தங்களிலிருந்து அழைக்கக்கூடிய மீண்டும் பயன்படுத்தக்கூடிய குறியீட்டை உருவாக்கலாம் - மற்ற பொருள் சார்ந்த நிரலாக்க மொழிகளில் ஒரு நிலையான வகுப்பில் உள்ள நிலையான செயல்பாடுகளைப் போல).
  - சிக்கலான பயனர் வரையறுத்த வகைகள்.

### முக்கிய இணைப்புகள் {#important-links}

- [ஆவணங்கள்](https://docs.soliditylang.org/en/latest/)
- [Solidity மொழி நுழைவாயில்](https://soliditylang.org/)
- [எடுத்துக்காட்டு மூலம் Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter அரட்டை அறை](https://gitter.im/ethereum/solidity) [Solidity Matrix அரட்டை அறைக்கு](https://matrix.to/#/#ethereum_solidity:gitter.im) இணைக்கப்பட்டுள்ளது
- [ஏமாற்றுத் தாள்](https://reference.auditless.com/cheatsheet)
- [Solidity வலைப்பதிவு](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### எடுத்துக்காட்டு ஒப்பந்தம் {#example-contract}

```solidity
// SPDX-உரிமம்-அடையாளங்காட்டி: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" என்ற முக்கியச் சொல் மாறிகளை
    // மற்ற ஒப்பந்தங்களிலிருந்து அணுகக்கூடியதாக ஆக்குகிறது
    address public minter;
    mapping (address => uint) public balances;

    // நீங்கள் அறிவிக்கும் குறிப்பிட்ட ஒப்பந்த மாற்றங்களுக்குப்
    // பயனளிக்க நிகழ்வுகள் வாடிக்கையாளர்களை அனுமதிக்கின்றன
    event Sent(address from, address to, uint amount);

    // ஒப்பந்தம் உருவாக்கப்படும் போது மட்டுமே
    // கட்டமைப்புக் குறியீடு இயக்கப்படும்
    constructor() {
        minter = msg.sender;
    }

    // புதிதாக உருவாக்கப்பட்ட நாணயங்களின் ஒரு தொகையை ஒரு முகவரிக்கு அனுப்புகிறது
    // ஒப்பந்தத்தை உருவாக்கியவரால் மட்டுமே அழைக்க முடியும்
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // ஏற்கனவே உள்ள நாணயங்களின் தொகையை
    // எந்த அழைப்பாளரிடமிருந்தும் ஒரு முகவரிக்கு அனுப்புகிறது
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "போதுமான இருப்பு இல்லை.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

இந்த எடுத்துக்காட்டு Solidity ஒப்பந்த தொடரியல் எப்படி இருக்கும் என்பதைப் பற்றிய ஒரு உணர்வைத் தரும். செயல்பாடுகள் மற்றும் மாறிகள் பற்றிய விரிவான விளக்கத்திற்கு, [ஆவணங்களைப் பார்க்கவும்](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonic நிரலாக்க மொழி
- அலகுகளுக்கான ஆதரவு உட்பட (எ. கா. நேர முத்திரை, வினாடிகள், wei, வினாடிக்கு wei, வினாடிக்கு சதுர மீட்டர்)
- சிறிய மற்றும் புரிந்துகொள்ளக்கூடிய தொகுப்பிக் குறியீடு
- திறமையான பைட் குறியீடு உருவாக்கம்
- ஒப்பந்தங்களை மிகவும் பாதுகாப்பானதாகவும், தணிக்கை செய்வதை எளிதாகவும் மாற்றும் நோக்கத்துடன் Solidity-ஐ விட வேண்டுமென்றே குறைவான அம்சங்களைக் கொண்டுள்ளது. Vyper ஆதரிக்காது:
  - மாற்றமைப்பான்கள்
  - மரபுரிமை
  - இன்லைன் அசெம்பிளி
  - செயல்பாட்டை ஓவர்லோடிங் செய்தல்
  - ஆபரேட்டர் ஓவர்லோடிங்
  - சுழல்நிலை அழைப்பு
  - முடிவற்ற நீள சுழற்சிகள்
  - பைனரி நிலையான புள்ளிகள்

மேலும் தகவலுக்கு, [Vyper காரணத்தைப் படிக்கவும்](https://vyper.readthedocs.io/en/latest/index.html).

### முக்கிய இணைப்புகள் {#important-links-1}

- [ஆவணங்கள்](https://vyper.readthedocs.io)
- [எடுத்துக்காட்டு மூலம் Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [எடுத்துக்காட்டு மூலம் மேலும் Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper சமூக Discord அரட்டை](https://discord.gg/SdvKC79cJk)
- [ஏமாற்றுத் தாள்](https://reference.auditless.com/cheatsheet)
- [Vyper க்கான ஸ்மார்ட் ஒப்பந்த மேம்பாட்டு கட்டமைப்புகள் மற்றும் கருவிகள்](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper ஸ்மார்ட் ஒப்பந்தங்களைப் பாதுகாக்கவும் ஹேக் செய்யவும் கற்றுக்கொள்ளுங்கள்](https://github.com/SupremacyTeam/VyperPunk)
- [மேம்பாட்டிற்கான Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper சிறந்த ஹிட்ஸ் ஸ்மார்ட் ஒப்பந்த எடுத்துக்காட்டுகள்](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [அற்புதமான Vyper தொகுக்கப்பட்ட வளங்கள்](https://github.com/spadebuilders/awesome-vyper)

### எடுத்துக்காட்டு {#example}

```python
# திறந்த ஏலம்

# ஏல அளவுருக்கள்

# பயனாளி அதிக ஏலம் எடுத்தவரிடமிருந்து பணத்தைப் பெறுகிறார்

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# ஏலத்தின் தற்போதைய நிலை

highestBidder: public(address)
highestBid: public(uint256)

# முடிவில் உண்மை என அமைக்கப்பட்டது, எந்த மாற்றத்தையும் அனுமதிக்காது

ended: public(bool)

# திரும்பப் பெறும் முறையைப் பின்பற்ற, திருப்பிச் செலுத்தப்பட்ட ஏலங்களைக் கண்காணிக்கவும்

pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` விநாடிகள் ஏல நேரத்துடன் # பயனாளி முகவரி `_beneficiary` சார்பாக

# ஒரு எளிய ஏலத்தை உருவாக்கவும்.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# இந்த பரிவர்த்தனையுடன் அனுப்பப்பட்ட மதிப்புடன்

# ஏலத்தில் ஏலம் எடுக்கவும்.

# ஏலத்தில் வெற்றி பெறாவிட்டால் மட்டுமே

# மதிப்பு திருப்பித் தரப்படும்.

@external
@payable
def bid():
    # ஏலக் காலம் முடிந்துவிட்டதா எனச் சரிபார்க்கவும்.
    assert block.timestamp < self.auctionEnd
    # ஏலம் போதுமான அளவு அதிகமாக உள்ளதா எனச் சரிபார்க்கவும்
    assert msg.value > self.highestBid
    # முந்தைய அதிக ஏலதாரருக்கான பணத்தைத் திரும்பப் பெறுவதைக் கண்காணிக்கவும்
    self.pendingReturns[self.highestBidder] += self.highestBid
    # புதிய அதிக ஏலத்தைக் கண்காணிக்கவும்
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# முன்னர் திருப்பிச் செலுத்தப்பட்ட ஏலத்தை திரும்பப் பெறவும். திரும்பப் பெறும் முறை

# பாதுகாப்புச் சிக்கலைத் தவிர்ப்பதற்காக இங்கு பயன்படுத்தப்படுகிறது. பணத்தைத் திரும்பப்பெறுதல் நேரடியாக

# bid()-இன் ஒரு பகுதியாக அனுப்பப்பட்டால், ஒரு தீங்கிழைக்கும் ஏல ஒப்பந்தம் அந்தப்

# பணத்தைத் திரும்பப் பெறுவதைத் தடுக்கலாம், இதனால் புதிய அதிக ஏலங்கள் வருவதைத் தடுக்கலாம்.

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# ஏலத்தை முடித்து, அதிக ஏலத்தை

# பயனாளிக்கு அனுப்பவும்.

@external
def endAuction():
    # மற்ற ஒப்பந்தங்களுடன் தொடர்பு கொள்ளும் செயல்பாடுகளை கட்டமைப்பது ஒரு நல்ல வழிகாட்டியாகும்
    # (அதாவது, அவை செயல்பாடுகளை அழைக்கின்றன அல்லது ஈதரை அனுப்புகின்றன)
    # மூன்று கட்டங்களாக:
    # 1. நிபந்தனைகளைச் சரிபார்த்தல்
    # 2. செயல்களைச் செய்தல் (சாத்தியமான மாற்றும் நிபந்தனைகள்)
    # 3. மற்ற ஒப்பந்தங்களுடன் தொடர்புகொள்வது
    # இந்த கட்டங்கள் கலந்திருந்தால், மற்ற ஒப்பந்தம்
    # தற்போதைய ஒப்பந்தத்திற்கு மீண்டும் அழைத்து நிலையை மாற்றலாம் அல்லது விளைவுகளை ஏற்படுத்தலாம்
    # (ஈதர் செலுத்துதல்) பலமுறை செய்யப்பட வேண்டும்.
    # உள்நாட்டில் அழைக்கப்படும் செயல்பாடுகளில் வெளிப்புற ஒப்பந்தங்களுடனான தொடர்பு அடங்கும் என்றால்,
    # அவையும் வெளிப்புற ஒப்பந்தங்களுடனான தொடர்பு என்று
    # கருதப்பட வேண்டும்.

    # 1. நிபந்தனைகள்
    # ஏலத்தின் இறுதி நேரம் வந்துவிட்டதா எனச் சரிபார்க்கவும்
    assert block.timestamp >= self.auctionEnd
    # இந்தச் செயல்பாடு ஏற்கனவே அழைக்கப்பட்டுள்ளதா எனச் சரிபார்க்கவும்
    assert not self.ended

    # 2. விளைவுகள்
    self.ended = True

    # 3. தொடர்பு
    send(self.beneficiary, self.highestBid)
```

இந்த எடுத்துக்காட்டு Vyper ஒப்பந்த தொடரியல் எப்படி இருக்கும் என்பதைப் பற்றிய ஒரு உணர்வைத் தரும். செயல்பாடுகள் மற்றும் மாறிகள் பற்றிய விரிவான விளக்கத்திற்கு, [ஆவணங்களைப் பார்க்கவும்](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul மற்றும் Yul+ {#yul}

நீங்கள் Ethereum-க்கு புதியவராகவும், இன்னும் ஸ்மார்ட் ஒப்பந்த மொழிகளுடன் எந்த குறியீட்டு முறையையும் செய்யவில்லை என்றால், Solidity அல்லது Vyper உடன் தொடங்க நாங்கள் பரிந்துரைக்கிறோம். ஸ்மார்ட் ஒப்பந்த பாதுகாப்பு சிறந்த நடைமுறைகள் மற்றும் EVM உடன் பணிபுரியும் பிரத்தியேகங்கள் உங்களுக்குப் பழக்கமானவுடன் மட்டுமே Yul அல்லது Yul+ ஐப் பார்க்கவும்.

**Yul**

- Ethereum க்கான இடைநிலை மொழி.
- [EVM](/developers/docs/evm) மற்றும் [Ewasm](https://github.com/ewasm), ஒரு Ethereum சுவையூட்டப்பட்ட WebAssembly ஐ ஆதரிக்கிறது, மேலும் இரு தளங்களின் பயன்படுத்தக்கூடிய பொதுவான வகுப்பாக வடிவமைக்கப்பட்டுள்ளது.
- EVM மற்றும் Ewasm தளங்களுக்கு சமமாக பயனளிக்கக்கூடிய உயர் மட்ட தேர்வுமுறை நிலைகளுக்கான நல்ல இலக்கு.

**Yul+**

- Yul-க்கான குறைந்த-நிலை, அதிக செயல்திறன் கொண்ட நீட்டிப்பு.
- ஆரம்பத்தில் ஒரு [ஆப்டிமிஸ்டிக் ரோலப்](/developers/docs/scaling/optimistic-rollups/) ஒப்பந்தத்திற்காக வடிவமைக்கப்பட்டது.
- Yul+ ஆனது Yul க்கான ஒரு சோதனை மேம்படுத்தல் முன்மொழிவாகக் கருதப்படலாம், அதில் புதிய அம்சங்களைச் சேர்க்கிறது.

### முக்கிய இணைப்புகள் {#important-links-2}

- [Yul ஆவணங்கள்](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ ஆவணங்கள்](https://github.com/fuellabs/yulp)
- [Yul+ அறிமுக இடுகை](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### எடுத்துக்காட்டு ஒப்பந்தம் {#example-contract-2}

பின்வரும் எளிய எடுத்துக்காட்டு ஒரு சக்தி செயல்பாட்டை செயல்படுத்துகிறது. `solc --strict-assembly --bin input.yul` ஐப் பயன்படுத்தி இதைத் தொகுக்கலாம். எடுத்துக்காட்டு
input.yul கோப்பில் சேமிக்கப்பட வேண்டும்.

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

நீங்கள் ஏற்கனவே ஸ்மார்ட் ஒப்பந்தங்களில் நன்கு அனுபவம் பெற்றிருந்தால், Yul இல் ஒரு முழு ERC20 செயலாக்கத்தை [இங்கே](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) காணலாம்.

## Fe {#fe}

- Ethereum மெய்நிகர் இயந்திரத்திற்கான (EVM) நிலையாகத் தட்டச்சு செய்யப்பட்ட மொழி.
- Python மற்றும் Rust ஆல் ஈர்க்கப்பட்டது.
- Ethereum சூழலுக்குப் புதிய உருவாக்குநர்களுக்கு (டெவலப்பர்களுக்கு) கூட -- கற்றுக்கொள்வதை எளிதாக்குவதை நோக்கமாகக் கொண்டுள்ளது.
- Fe மேம்பாடு இன்னும் ஆரம்ப கட்டத்தில் உள்ளது, இந்த மொழி ஜனவரி 2021 இல் அதன் ஆல்பா வெளியீட்டைக் கொண்டிருந்தது.

### முக்கிய இணைப்புகள் {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe அறிவிப்பு](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 சாலை வரைபடம்](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord அரட்டை](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### எடுத்துக்காட்டு ஒப்பந்தம் {#example-contract-3}

பின்வருவது Fe இல் செயல்படுத்தப்பட்ட ஒரு எளிய ஒப்பந்தம்.

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

## எப்படித் தேர்ந்தெடுப்பது {#how-to-choose}

மற்ற எந்த நிரலாக்க மொழியைப் போலவே, இது பெரும்பாலும் சரியான வேலைக்கு சரியான கருவியைத் தேர்ந்தெடுப்பது மற்றும் தனிப்பட்ட விருப்பத்தேர்வுகளைப் பற்றியது.

நீங்கள் இன்னும் எந்த மொழியையும் முயற்சிக்கவில்லை என்றால், கருத்தில் கொள்ள வேண்டிய சில விஷயங்கள் இங்கே உள்ளன:

### Solidity பற்றி என்ன சிறந்தது? {#solidity-advantages}

- நீங்கள் ஒரு தொடக்கக்காரராக இருந்தால், பல பயிற்சிகள் மற்றும் கற்றல் கருவிகள் உள்ளன. [குறியீட்டு மூலம் கற்கவும்](/developers/learning-tools/) பிரிவில் அதைப் பற்றி மேலும் பார்க்கவும்.
- நல்ல உருவாக்குநர் கருவி கிடைக்கிறது.
- Solidity ஒரு பெரிய உருவாக்குநர் சமூகத்தைக் கொண்டுள்ளது, அதாவது உங்கள் கேள்விகளுக்கான பதில்களை மிக விரைவாகக் கண்டுபிடிப்பீர்கள்.

### Vyper பற்றி என்ன சிறந்தது? {#vyper-advatages}

- ஸ்மார்ட் ஒப்பந்தங்களை எழுத விரும்பும் Python டெவலப்பர்களுக்குத் தொடங்குவதற்கான சிறந்த வழி.
- Vyper குறைவான அம்சங்களைக் கொண்டுள்ளது, இது யோசனைகளை விரைவாக முன்மாதிரி செய்வதற்கு சிறந்ததாக அமைகிறது.
- Vyper தணிக்கை செய்வது எளிதாகவும், மனிதர்களால் அதிகபட்சமாகப் படிக்கக்கூடியதாகவும் இருப்பதை நோக்கமாகக் கொண்டுள்ளது.

### Yul மற்றும் Yul+ பற்றி என்ன சிறந்தது? {#yul-advantages}

- எளிமையான மற்றும் செயல்பாட்டு குறைந்த-நிலை மொழி.
- மூல EVM-க்கு மிக நெருக்கமாகச் செல்ல அனுமதிக்கிறது, இது உங்கள் ஒப்பந்தங்களின் எரிவாயு பயன்பாட்டை மேம்படுத்த உதவும்.

## மொழி ஒப்பீடுகள் {#language-comparisons}

அடிப்படை தொடரியல், ஒப்பந்த வாழ்க்கைச் சுழற்சி, இடைமுகங்கள், ஆபரேட்டர்கள், தரவுக் கட்டமைப்புகள், செயல்பாடுகள், கட்டுப்பாட்டு ஓட்டம் மற்றும் பலவற்றின் ஒப்பீடுகளுக்கு ஆடிட்லெஸ்ஸின் இந்த [ஏமாற்றுத் தாளைப்](https://reference.auditless.com/cheatsheet/) பார்க்கவும்

## மேலும் வாசிக்க {#further-reading}

- [OpenZeppelin வழங்கும் Solidity ஒப்பந்தங்கள் நூலகம்](https://docs.openzeppelin.com/contracts/5.x/)
- [எடுத்துக்காட்டு மூலம் Solidity](https://solidity-by-example.org)
