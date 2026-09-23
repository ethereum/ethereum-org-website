---
title: "திறன் ஒப்பந்த மொழிகள்"
description: "Solidity மற்றும் Vyper ஆகிய இரண்டு முக்கிய திறன் ஒப்பந்த மொழிகளின் மேலோட்டம் மற்றும் ஒப்பீடு."
lang: ta
---

[எத்திரியம்](/) பற்றிய ஒரு சிறந்த அம்சம் என்னவென்றால், திறன் ஒப்பந்தங்களை ஒப்பீட்டளவில் டெவலப்பர்களுக்கு ஏற்ற மொழிகளைப் பயன்படுத்தி நிரலாக்கம் செய்யலாம். உங்களுக்கு Python அல்லது ஏதேனும் [சுருள்-அடைப்புக்குறி மொழியில் (curly-bracket language)](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) அனுபவம் இருந்தால், பழக்கமான தொடரியல் (syntax) கொண்ட ஒரு மொழியை நீங்கள் கண்டறியலாம்.

மிகவும் சுறுசுறுப்பான மற்றும் பராமரிக்கப்படும் இரண்டு மொழிகள்:

- Solidity
- Vyper

Remix ஒருங்கிணைந்த மேம்பாட்டுச் சூழல் (IDE) ஆனது Solidity மற்றும் Vyper இரண்டிலும் ஒப்பந்தங்களை உருவாக்குவதற்கும் சோதிப்பதற்கும் ஒரு விரிவான மேம்பாட்டுச் சூழலை வழங்குகிறது. குறியீட்டை எழுதத் தொடங்க [உலாவியில் உள்ள Remix IDE-ஐ முயன்று பார்க்கவும்](https://remix.ethereum.org).

அதிக அனுபவமுள்ள டெவலப்பர்கள் [எத்தேரியம் மெய்நிகர் இயந்திரம் (EVM)](/developers/docs/evm/)-க்கான இடைநிலை மொழியான Yul அல்லது Yul-இன் நீட்டிப்பான Yul+ ஐப் பயன்படுத்த விரும்பலாம்.

நீங்கள் ஆர்வமாக இருந்து, இன்னும் தீவிர மேம்பாட்டில் உள்ள புதிய மொழிகளைச் சோதிக்க உதவ விரும்பினால், தற்போது ஆரம்ப கட்டத்தில் உள்ள வளர்ந்து வரும் திறன் ஒப்பந்த மொழியான Fe-ஐ நீங்கள் பரிசோதிக்கலாம்.

## முன்நிபந்தனைகள் {#prerequisites}

நிரலாக்க மொழிகள், குறிப்பாக JavaScript அல்லது Python பற்றிய முன் அறிவு, திறன் ஒப்பந்த மொழிகளில் உள்ள வேறுபாடுகளைப் புரிந்துகொள்ள உதவும். மொழி ஒப்பீடுகளைப் பற்றி ஆழமாக ஆராய்வதற்கு முன், திறன் ஒப்பந்தங்களை ஒரு கருத்தாகப் புரிந்துகொள்ளுமாறு நாங்கள் பரிந்துரைக்கிறோம். [திறன் ஒப்பந்தங்கள் அறிமுகம்](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- திறன் ஒப்பந்தங்களைச் செயல்படுத்துவதற்கான பொருள் சார்ந்த (Object-oriented), உயர்நிலை மொழி.
- C++ ஆல் மிகவும் ஆழமாகப் பாதிக்கப்பட்ட சுருள்-அடைப்புக்குறி மொழி.
- நிலையான வகைப்படுத்தப்பட்டது (Statically typed - ஒரு மாறியின் வகை தொகுக்கும் நேரத்தில் (compile time) அறியப்படும்).
- ஆதரிப்பவை:
  - மரபுரிமை (Inheritance - நீங்கள் பிற ஒப்பந்தங்களை நீட்டிக்கலாம்).
  - நிரலகங்கள் (Libraries - வெவ்வேறு ஒப்பந்தங்களிலிருந்து நீங்கள் அழைக்கக்கூடிய மறுபயன்பாட்டு குறியீட்டை உருவாக்கலாம் - மற்ற பொருள் சார்ந்த நிரலாக்க மொழிகளில் உள்ள நிலையான வகுப்பில் உள்ள நிலையான செயல்பாடுகளைப் போல).
  - சிக்கலான பயனர் வரையறுக்கப்பட்ட வகைகள் (Complex user-defined types).

### முக்கியமான இணைப்புகள் {#important-links}

- [ஆவணங்கள்](https://docs.soliditylang.org/en/latest/)
- [Solidity மொழி போர்ட்டல்](https://soliditylang.org/)
- [எடுத்துக்காட்டுடன் Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter அரட்டை அறை](https://gitter.im/ethereum/solidity) [Solidity Matrix அரட்டை அறையுடன்](https://matrix.to/#/#ethereum_solidity:gitter.im) இணைக்கப்பட்டுள்ளது
- [சீட் ஷீட் (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Solidity வலைப்பதிவு](https://blog.soliditylang.org/)
- [Solidity ட்விட்டர்](https://twitter.com/solidity_lang)

### எடுத்துக்காட்டு ஒப்பந்தம் {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" என்ற முக்கியச்சொல் மாறிகளை
    // மற்ற ஒப்பந்தங்களிலிருந்து அணுகக்கூடியதாக மாற்றுகிறது
    address public minter;
    mapping (address => uint) public balances;

    // நிகழ்வுகள் (Events) வாடிக்கையாளர்களை குறிப்பிட்ட
    // நீங்கள் அறிவிக்கும் ஒப்பந்த மாற்றங்களுக்கு எதிர்வினையாற்ற அனுமதிக்கின்றன
    event Sent(address from, address to, uint amount);

    // கட்டமைப்பாளர் (Constructor) குறியீடு ஒப்பந்தம்
    // உருவாக்கப்படும் போது மட்டுமே இயக்கப்படும்
    constructor() {
        minter = msg.sender;
    }

    // புதிதாக உருவாக்கப்பட்ட நாணயங்களின் ஒரு தொகையை ஒரு முகவரிக்கு அனுப்புகிறது
    // ஒப்பந்தத்தை உருவாக்கியவரால் மட்டுமே அழைக்கப்பட முடியும்
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // ஏற்கனவே உள்ள நாணயங்களின் ஒரு தொகையை
    // எந்தவொரு அழைப்பாளரிடமிருந்தும் ஒரு முகவரிக்கு அனுப்புகிறது
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

இந்த எடுத்துக்காட்டு Solidity ஒப்பந்தத் தொடரியல் எப்படி இருக்கும் என்பதைப் பற்றிய ஒரு உணர்வை உங்களுக்கு வழங்கும். செயல்பாடுகள் மற்றும் மாறிகள் பற்றிய விரிவான விளக்கத்திற்கு, [ஆவணங்களைப் பார்க்கவும்](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonic நிரலாக்க மொழி
- வலுவான வகைப்படுத்தல் (Strong typing)
- சிறிய மற்றும் புரிந்துகொள்ளக்கூடிய கம்பைலர் குறியீடு
- திறமையான பைட் குறியீடு உருவாக்கம்
- ஒப்பந்தங்களை மிகவும் பாதுகாப்பானதாகவும் தணிக்கை செய்ய எளிதானதாகவும் மாற்றும் நோக்கத்துடன் Solidity-ஐ விட வேண்டுமென்றே குறைவான அம்சங்களைக் கொண்டுள்ளது. Vyper இவற்றை ஆதரிக்காது:
  - மாற்றிகள் (Modifiers)
  - மரபுரிமை (Inheritance)
  - இன்லைன் அசெம்பிளி (Inline assembly)
  - செயல்பாடு ஓவர்லோடிங் (Function overloading)
  - ஆபரேட்டர் ஓவர்லோடிங் (Operator overloading)
  - சுழல்நிலை அழைப்பு (Recursive calling)
  - முடிவிலி நீள சுழல்கள் (Infinite-length loops)
  - பைனரி நிலையான புள்ளிகள் (Binary fixed points)

v0.4.0 முதல், Vyper ஒரு [தொகுதி அமைப்பை (module system)](https://docs.vyperlang.org/en/stable/using-modules.html) ஆதரிக்கிறது. குறியீடு மறுபயன்பாடு வகுப்பு மரபுரிமைக்கு (class inheritance) பதிலாக, கலவை (composition) மூலம் அடையப்படுகிறது.

மேலும் தகவலுக்கு, [Vyper-இன் பகுத்தறிவைப் படிக்கவும்](https://vyper.readthedocs.io/en/latest/index.html).

### முக்கியமான இணைப்புகள் {#important-links-1}

- [ஆவணங்கள்](https://vyper.readthedocs.io)
- [எடுத்துக்காட்டுடன் Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [எடுத்துக்காட்டுடன் மேலும் Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper சமூக டிஸ்கார்ட் அரட்டை](https://discord.gg/SdvKC79cJk)
- [சீட் ஷீட் (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Vyper-க்கான திறன் ஒப்பந்த மேம்பாட்டு கட்டமைப்புகள் மற்றும் கருவிகள்](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper திறன் ஒப்பந்தங்களைப் பாதுகாக்கவும் ஹேக் செய்யவும் கற்றுக்கொள்ளுங்கள்](https://github.com/SupremacyTeam/VyperPunk)
- [மேம்பாட்டிற்கான Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper-இன் சிறந்த திறன் ஒப்பந்த எடுத்துக்காட்டுகள்](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [சிறந்த Vyper தொகுக்கப்பட்ட வளங்கள்](https://github.com/spadebuilders/awesome-vyper)

### எடுத்துக்காட்டு {#example}

```python
# திறந்த ஏலம்

# ஏல அளவுருக்கள்
# பயனாளி அதிக ஏலம் கேட்பவரிடமிருந்து பணத்தைப் பெறுகிறார்
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# ஏலத்தின் தற்போதைய நிலை
highestBidder: public(address)
highestBid: public(uint256)

# முடிவில் true என அமைக்கப்படும், எந்த மாற்றத்தையும் அனுமதிக்காது
ended: public(bool)

# திரும்பப் பெறப்பட்ட ஏலங்களைக் கண்காணிக்கவும், இதனால் நாம் திரும்பப் பெறும் (withdraw) முறையைப் பின்பற்றலாம்
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` உடன் ஒரு எளிய ஏலத்தை உருவாக்கவும்
# வினாடிகள் ஏல நேரம், இதன் சார்பாக
# பயனாளி முகவரி `_beneficiary`.
@deploy
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# அனுப்பப்பட்ட மதிப்புடன் ஏலத்தில் கேட்கவும்
# இந்த பரிவர்த்தனையுடன் சேர்த்து.
# இந்த மதிப்பு திரும்பப் பெறப்படும், ஒருவேளை
# ஏலத்தில் வெற்றி பெறவில்லை என்றால்.
@external
@payable
def bid():
    # ஏலக் காலம் முடிந்துவிட்டதா என சரிபார்க்கவும்.
    assert block.timestamp < self.auctionEnd
    # ஏலத் தொகை போதுமான அளவு அதிகமாக உள்ளதா என சரிபார்க்கவும்
    assert msg.value > self.highestBid
    # முந்தைய அதிக ஏலம் கேட்டவருக்கான பணத்தைத் திரும்பப் பெறுவதைக் கண்காணிக்கவும்
    self.pendingReturns[self.highestBidder] += self.highestBid
    # புதிய அதிக ஏலத்தைக் கண்காணிக்கவும்
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# முன்பு திரும்பப் பெறப்பட்ட ஏலத்தை திரும்பப் பெறவும். திரும்பப் பெறும் (withdraw) முறை
# ஒரு பாதுகாப்பு சிக்கலைத் தவிர்க்க இங்கு பயன்படுத்தப்படுகிறது. பணத்தைத் திரும்பப் பெறுதல் நேரடியாக
# bid() இன் ஒரு பகுதியாக அனுப்பப்பட்டால், ஒரு தீங்கிழைக்கும் ஏல ஒப்பந்தம்
# அந்தப் பணத்தைத் திரும்பப் பெறுவதைத் தடுக்கலாம், இதனால் புதிய அதிக ஏலங்கள் வருவதைத் தடுக்கலாம்.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# ஏலத்தை முடித்து, அதிக ஏலத் தொகையை
# பயனாளிக்கு அனுப்பவும்.
@external
def endAuction():
    # தொடர்பு கொள்ளும் சார்புகளை (functions) கட்டமைப்பது ஒரு நல்ல வழிகாட்டுதலாகும்
    # மற்ற ஒப்பந்தங்களுடன் (அதாவது, அவை சார்புகளை அழைக்கின்றன அல்லது ஈதரை அனுப்புகின்றன)
    # மூன்று கட்டங்களாக:
    # 1. நிபந்தனைகளை சரிபார்த்தல்
    # 2. செயல்களைச் செய்தல் (நிபந்தனைகளை மாற்றக்கூடும்)
    # 3. மற்ற ஒப்பந்தங்களுடன் தொடர்புகொள்ளுதல்
    # இந்த கட்டங்கள் கலக்கப்பட்டால், மற்ற ஒப்பந்தம் தற்போதைய ஒப்பந்தத்திற்குள்
    # மீண்டும் அழைத்து நிலையை மாற்றலாம் அல்லது விளைவுகளை
    # (ஈதர் செலுத்துதல்) பல முறை செய்யப்படுவதற்கு காரணமாகலாம்.
    # உள்நாட்டில் அழைக்கப்படும் சார்புகள் வெளிப்புற
    # ஒப்பந்தங்களுடனான தொடர்புகளை உள்ளடக்கியிருந்தால், அவையும்
    # வெளிப்புற ஒப்பந்தங்களுடனான தொடர்புகளாகவே கருதப்பட வேண்டும்.

    # 1. நிபந்தனைகள்
    # ஏல முடிவு நேரம் எட்டப்பட்டுவிட்டதா என சரிபார்க்கவும்
    assert block.timestamp >= self.auctionEnd
    # இந்த சார்பு ஏற்கனவே அழைக்கப்பட்டுள்ளதா என சரிபார்க்கவும்
    assert not self.ended

    # 2. விளைவுகள்
    self.ended = True

    # 3. தொடர்பு
    send(self.beneficiary, self.highestBid)
```

இந்த எடுத்துக்காட்டு Vyper ஒப்பந்தத் தொடரியல் எப்படி இருக்கும் என்பதைப் பற்றிய ஒரு உணர்வை உங்களுக்கு வழங்கும். செயல்பாடுகள் மற்றும் மாறிகள் பற்றிய விரிவான விளக்கத்திற்கு, [ஆவணங்களைப் பார்க்கவும்](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul மற்றும் Yul+ {#yul}

நீங்கள் எத்திரியத்திற்குப் புதியவராக இருந்து, திறன் ஒப்பந்த மொழிகளுடன் இன்னும் எந்தக் குறியீட்டையும் செய்யவில்லை என்றால், Solidity அல்லது Vyper உடன் தொடங்குமாறு பரிந்துரைக்கிறோம். திறன் ஒப்பந்தப் பாதுகாப்புச் சிறந்த நடைமுறைகள் மற்றும் EVM உடன் பணிபுரியும் பிரத்தியேகங்களை நீங்கள் நன்கு அறிந்தவுடன் மட்டுமே Yul அல்லது Yul+ ஐப் பார்க்கவும்.

**Yul**

- எத்திரியத்திற்கான இடைநிலை மொழி.
- [EVM](/developers/docs/evm) மற்றும் எத்திரியம் சுவையிலான WebAssembly-ஆன [Ewasm](https://github.com/ewasm) ஆகியவற்றை ஆதரிக்கிறது, மேலும் இது இரு தளங்களுக்கும் பயன்படுத்தக்கூடிய பொதுவான வகுப்பியாக வடிவமைக்கப்பட்டுள்ளது.
- EVM மற்றும் Ewasm தளங்கள் இரண்டிற்கும் சமமாகப் பயனளிக்கக்கூடிய உயர்நிலை மேம்படுத்தல் (optimisation) நிலைகளுக்கான நல்ல இலக்கு.

**Yul+**

- Yul-இன் குறைந்த-நிலை, மிகவும் திறமையான நீட்டிப்பு.
- ஆரம்பத்தில் ஒரு [ஆப்டிமிஸ்டிக் ரோல்அப்](/developers/docs/scaling/optimistic-rollups/) ஒப்பந்தத்திற்காக வடிவமைக்கப்பட்டது.
- Yul+ ஆனது Yul-க்கான ஒரு சோதனை மேம்படுத்தல் முன்மொழிவாகப் பார்க்கப்படலாம், இது அதில் புதிய அம்சங்களைச் சேர்க்கிறது.

### முக்கியமான இணைப்புகள் {#important-links-2}

- [Yul ஆவணங்கள்](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ ஆவணங்கள்](https://github.com/fuellabs/yulp)
- [Yul+ அறிமுகப் பதிவு](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### எடுத்துக்காட்டு ஒப்பந்தம் {#example-contract-2}

பின்வரும் எளிய எடுத்துக்காட்டு ஒரு அடுக்குச் செயல்பாட்டைச் (power function) செயல்படுத்துகிறது. இதை `solc --strict-assembly --bin input.yul` ஐப் பயன்படுத்தித் தொகுக்கலாம். இந்த எடுத்துக்காட்டு input.yul கோப்பில் சேமிக்கப்பட வேண்டும்.

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

நீங்கள் ஏற்கனவே திறன் ஒப்பந்தங்களில் நல்ல அனுபவம் பெற்றிருந்தால், Yul-இல் முழுமையான ERC-20 செயலாக்கத்தை [இங்கே](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) காணலாம்.

## Fe {#fe}

- எத்தேரியம் மெய்நிகர் இயந்திரம் (EVM)-க்கான நிலையான வகைப்படுத்தப்பட்ட மொழி.
- Python மற்றும் Rust ஆகியவற்றால் ஈர்க்கப்பட்டது.
- எத்திரியம் சுற்றுச்சூழல் அமைப்புக்குப் புதிய டெவலப்பர்களுக்கும் கூட -- கற்றுக்கொள்ள எளிதாக இருக்க வேண்டும் என்பதை நோக்கமாகக் கொண்டுள்ளது.
- Fe மேம்பாடு இன்னும் ஆரம்ப கட்டத்திலேயே உள்ளது, இந்த மொழி ஜனவரி 2021 இல் அதன் ஆல்பா வெளியீட்டைக் கொண்டிருந்தது.

### முக்கியமான இணைப்புகள் {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe அறிவிப்பு](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 வழிகாட்டி வரைபடம்](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe டிஸ்கார்ட் அரட்டை](https://discord.com/invite/ywpkAXFjZH)
- [Fe ட்விட்டர்](https://twitter.com/official_fe)

### எடுத்துக்காட்டு ஒப்பந்தம் {#example-contract-3}

பின்வருவது Fe-இல் செயல்படுத்தப்பட்ட ஒரு எளிய ஒப்பந்தமாகும்.

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

வேறு எந்த நிரலாக்க மொழியையும் போலவே, இது பெரும்பாலும் சரியான வேலைக்குச் சரியான கருவியைத் தேர்ந்தெடுப்பது மற்றும் தனிப்பட்ட விருப்பங்களைப் பொறுத்தது.

நீங்கள் இன்னும் எந்த மொழியையும் முயற்சிக்கவில்லை என்றால் கருத்தில் கொள்ள வேண்டிய சில விஷயங்கள் இங்கே:

### Solidity-இல் என்ன சிறப்பம்சம் உள்ளது? {#solidity-advantages}

- நீங்கள் ஒரு தொடக்கக்காரராக இருந்தால், பல பயிற்சிகள் மற்றும் கற்றல் கருவிகள் உள்ளன. அதைப் பற்றி [குறியீட்டு மூலம் கற்றுக்கொள்ளுங்கள்](/developers/learning-tools/) பிரிவில் மேலும் காண்க.
- நல்ல டெவலப்பர் கருவிகள் கிடைக்கின்றன.
- Solidity ஒரு பெரிய டெவலப்பர் சமூகத்தைக் கொண்டுள்ளது, அதாவது உங்கள் கேள்விகளுக்கான பதில்களை நீங்கள் மிக விரைவாகக் கண்டறியலாம்.

### Vyper-இல் என்ன சிறப்பம்சம் உள்ளது? {#vyper-advatages}

- திறன் ஒப்பந்தங்களை எழுத விரும்பும் Python டெவலப்பர்கள் தொடங்குவதற்குச் சிறந்த வழி.
- Vyper குறைந்த எண்ணிக்கையிலான அம்சங்களைக் கொண்டுள்ளது, இது யோசனைகளை விரைவாக முன்மாதிரி (prototyping) செய்வதற்குச் சிறந்ததாக அமைகிறது.
- Vyper தணிக்கை செய்ய எளிதானதாகவும் அதிகபட்சமாக மனிதர்கள் படிக்கக்கூடியதாகவும் இருக்க வேண்டும் என்பதை நோக்கமாகக் கொண்டுள்ளது.

### Yul மற்றும் Yul+-இல் என்ன சிறப்பம்சம் உள்ளது? {#yul-advantages}

- எளிமையான மற்றும் செயல்பாட்டு குறைந்த-நிலை மொழி.
- மூல EVM-க்கு மிக நெருக்கமாகச் செல்ல அனுமதிக்கிறது, இது உங்கள் ஒப்பந்தங்களின் எரிவாயு பயன்பாட்டை மேம்படுத்த உதவும்.

## மொழி ஒப்பீடுகள் {#language-comparisons}

அடிப்படைத் தொடரியல், ஒப்பந்த வாழ்க்கைச் சுழற்சி, இடைமுகங்கள், ஆபரேட்டர்கள், தரவுக் கட்டமைப்புகள், செயல்பாடுகள், கட்டுப்பாட்டு ஓட்டம் மற்றும் பலவற்றின் ஒப்பீடுகளுக்கு Auditless-இன் இந்த [சீட் ஷீட்டைப் (cheatsheet) பார்க்கவும்](https://reference.auditless.com/cheatsheet/)

## மேலும் படிக்க {#further-reading}

- [ஓப்பன்செப்பெலின் வழங்கும் Solidity ஒப்பந்தங்கள் நிரலகம்](https://docs.openzeppelin.com/contracts/5.x/)
- [எடுத்துக்காட்டுடன் Solidity](https://solidity-by-example.org)