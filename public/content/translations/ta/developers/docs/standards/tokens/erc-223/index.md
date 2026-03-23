---
title: "ERC-223 தரநிலைக் குறி"
description: "ERC-223 fungible தரநிலைக் குறியின் மேலோட்டம், அது எவ்வாறு செயல்படுகிறது மற்றும் ERC-20 உடனான ஒப்பீடு."
lang: ta
---

## அறிமுகம் {#introduction}

### ERC-223 என்றால் என்ன? {#what-is-erc223}

ERC-223 என்பது ERC-20 தரநிலையைப் போன்ற fungible டோக்கன்களுக்கான ஒரு தரநிலையாகும். முக்கிய வேறுபாடு என்னவென்றால், ERC-223 டோக்கன் பயன்பாட்டு நிரலாக்க இடைமுகத்தை மட்டும் வரையறுக்காமல், அனுப்புநரிடமிருந்து பெறுநருக்கு டோக்கன்களை மாற்றுவதற்கான தர்க்கத்தையும் வரையறுக்கிறது. பெறுநரின் பக்கத்தில் டோக்கன் இடமாற்றங்களைக் கையாள அனுமதிக்கும் ஒரு தொடர்பு மாதிரியை இது அறிமுகப்படுத்துகிறது.

### ERC-20 இலிருந்து வேறுபாடுகள் {#erc20-differences}

ERC-223, ERC-20-இன் சில வரம்புகளை நிவர்த்தி செய்கிறது மற்றும் டோக்கன் ஒப்பந்தத்திற்கும் டோக்கன்களைப் பெறக்கூடிய ஒரு ஒப்பந்தத்திற்கும் இடையில் ஒரு புதிய தொடர்பு முறையை அறிமுகப்படுத்துகிறது. ERC-223 உடன் சாத்தியமான சில விஷயங்கள் ERC-20 உடன் சாத்தியமில்லை:

- பெறுநரின் பக்கத்தில் டோக்கன் பரிமாற்றத்தைக் கையாளுதல்: ஒரு ERC-223 டோக்கன் டெபாசிட் செய்யப்படுகிறது என்பதை பெறுநர்களால் கண்டறிய முடியும்.
- முறையற்ற முறையில் அனுப்பப்பட்ட டோக்கன்களை நிராகரித்தல்: ஒரு பயனர், டோக்கன்களைப் பெறக் கூடாத ஒப்பந்தத்திற்கு ERC-223 டோக்கன்களை அனுப்பினால், அந்த ஒப்பந்தம் பரிவர்த்தனையை நிராகரித்து, டோக்கன் இழப்பைத் தடுக்கும்.
- பரிமாற்றங்களில் உள்ள மீதரவு: ERC-223 டோக்கன்கள் மீதரவை உள்ளடக்கலாம், இது டோக்கன் பரிவர்த்தனைகளுடன் தன்னிச்சையான தகவல்களை இணைக்க அனுமதிக்கிறது.

## முன்னேற்றக் கட்டுரை {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts)
- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## உள்ளடக்கம் {#body}

ERC-223 என்பது ஸ்மார்ட் ஒப்பந்தங்களுக்குள் உள்ள டோக்கன்களுக்காக ஒரு பயன்பாட்டு நிரலாக்க இடைமுகத்தை (API) செயல்படுத்தும் ஒரு டோக்கன் தரநிலையாகும். ERC-223 டோக்கன்களைப் பெற வேண்டிய ஒப்பந்தங்களுக்காக இது ஒரு பயன்பாட்டு நிரலாக்க இடைமுகத்தையும் (API) அறிவிக்கிறது. ERC-223 பெறுநர் பயன்பாட்டு நிரலாக்க இடைமுகத்தை (API) ஆதரிக்காத ஒப்பந்தங்களால் ERC-223 டோக்கன்களைப் பெற முடியாது, இது பயனர் பிழையைத் தடுக்கிறது.

ஒரு ஸ்மார்ட் ஒப்பந்தம் பின்வரும் முறைகள் மற்றும் நிகழ்வுகளைச் செயல்படுத்தினால், அது ஒரு ERC-223 இணக்கமான டோக்கன் ஒப்பந்தம் என்று அழைக்கப்படலாம். செயல்பாட்டிற்கு வந்தவுடன், அது
Ethereum-இல் உருவாக்கப்பட்ட டோக்கன்களைக் கண்காணிக்கும் பொறுப்பை ஏற்கும்.

இந்தச் செயல்பாடுகளை மட்டும் கொண்டிருக்க வேண்டிய கட்டாயம் இந்த ஒப்பந்தத்திற்கு இல்லை மற்றும் ஒரு உருவாக்குநர் வெவ்வேறு டோக்கன் தரநிலைகளிலிருந்து வேறு எந்த அம்சத்தையும் இந்த ஒப்பந்தத்தில் சேர்க்கலாம். உதாரணமாக, `approve` மற்றும் `transferFrom` செயல்பாடுகள் ERC-223 தரநிலையின் ஒரு பகுதியாக இல்லை, ஆனால் தேவைப்பட்டால் இந்த செயல்பாடுகளைச் செயல்படுத்தலாம்.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) இலிருந்து:

### முறைகள் {#methods}

ERC-223 டோக்கன் பின்வரும் முறைகளைச் செயல்படுத்த வேண்டும்:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 டோக்கன்களைப் பெற வேண்டிய ஒரு ஒப்பந்தம் பின்வரும் முறையைச் செயல்படுத்த வேண்டும்:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

`tokenReceived(..)` செயல்பாட்டைச் செயல்படுத்தாத ஒப்பந்தத்திற்கு ERC-223 டோக்கன்கள் அனுப்பப்பட்டால், பரிமாற்றம் தோல்வியடைய வேண்டும் மற்றும் டோக்கன்கள் அனுப்புநரின் இருப்பிலிருந்து நகர்த்தப்படக்கூடாது.

### நிகழ்வுகள் {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### எடுத்துக்காட்டுகள் {#examples}

ERC-223 டோக்கனின் பயன்பாட்டு நிரலாக்க இடைமுகம் (API) ERC-20-ஐப் போன்றது, எனவே UI மேம்பாட்டுக் கண்ணோட்டத்தில் எந்த வேறுபாடும் இல்லை. இங்குள்ள ஒரே விதிவிலக்கு என்னவென்றால், ERC-223 டோக்கன்களில் `approve` + `transferFrom` செயல்பாடுகள் இல்லாமல் இருக்கலாம், ஏனெனில் இவை இந்த தரநிலைக்கு விருப்பத்தேர்வானவை.

#### Solidity எடுத்துக்காட்டுகள் {#solidity-example}

ஒரு அடிப்படை ERC-223 டோக்கன் ஒப்பந்தம் எவ்வாறு செயல்படுகிறது என்பதை பின்வரும் எடுத்துக்காட்டு விளக்குகிறது:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

இப்போது, tokenA ஒரு ERC-223 டோக்கன் என்று கருதி, `tokenA`-இன் டெபாசிட்களை ஏற்க மற்றொரு ஒப்பந்தம் நமக்குத் தேவை. அந்த ஒப்பந்தம் tokenA-ஐ மட்டுமே ஏற்க வேண்டும் மற்றும் வேறு எந்த டோக்கன்களையும் நிராகரிக்க வேண்டும். ஒப்பந்தம் tokenA-ஐப் பெறும்போது, அது ஒரு `Deposit()` நிகழ்வை வெளியிட வேண்டும் மற்றும் உள் `deposits` மாறியின் மதிப்பை அதிகரிக்க வேண்டும்.

இதோ அந்தக் குறியீடு:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // நாம் ஏற்க விரும்பும் ஒரே டோக்கன்.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // இந்தச் செயல்பாட்டிற்குள் என்பதைப் புரிந்துகொள்வது அவசியம்
        // msg.sender என்பது பெறப்படும் டோக்கனின் முகவரி,
        // msg.value எப்போதுமே 0 ஆக இருக்கும், ஏனெனில் டோக்கன் ஒப்பந்தம் பெரும்பாலான சந்தர்ப்பங்களில் ஈதரை சொந்தமாக வைத்திருக்கவோ அல்லது அனுப்பவோ இல்லை,
        // _from      என்பது டோக்கன் பரிமாற்றத்தை அனுப்புபவர்,
        // _value     என்பது டெபாசிட் செய்யப்பட்ட டோக்கன்களின் அளவு.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Frequently asked questions {#faq}

### நாம் சில tokenB-ஐ ஒப்பந்தத்திற்கு அனுப்பினால் என்ன நடக்கும்? {#sending-tokens}

பரிவர்த்தனை தோல்வியடையும், மற்றும் டோக்கன்களின் பரிமாற்றம் நடக்காது. டோக்கன்கள் அனுப்புநரின் முகவரிக்குத் திருப்பி அனுப்பப்படும்.

### இந்த ஒப்பந்தத்தில் நாம் எப்படி டெபாசிட் செய்வது? {#contract-deposits}

`RecipientContract`-இன் முகவரியைக் குறிப்பிடும் ERC-223 டோக்கனின் `transfer(address,uint256)` அல்லது `transfer(address,uint256,bytes)` செயல்பாட்டை அழைக்கவும்.

### நாம் ஒரு ERC-20 டோக்கனை இந்த ஒப்பந்தத்திற்கு மாற்றினால் என்ன நடக்கும்? {#erc-20-transfers}

`RecipientContract`-க்கு ஒரு ERC-20 டோக்கன் அனுப்பப்பட்டால், டோக்கன்கள் மாற்றப்படும், ஆனால் அந்தப் பரிமாற்றம் அங்கீகரிக்கப்படாது (`Deposit()` நிகழ்வு எதுவும் வெளியிடப்படாது, மேலும் டெபாசிட் மதிப்பு மாறாது). தேவையற்ற ERC-20 டெபாசிட்களை வடிகட்டவோ அல்லது தடுக்கவோ முடியாது.

### டோக்கன் டெபாசிட் முடிந்த பிறகு சில செயல்பாடுகளை இயக்க விரும்பினால் என்ன செய்வது? {#function-execution}

அவ்வாறு செய்ய பல வழிகள் உள்ளன. இந்த எடுத்துக்காட்டில், ERC-223 பரிமாற்றங்களை ஈதர் பரிமாற்றங்களைப் போலவே ஆக்கும் முறையைப் பின்பற்றுவோம்:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // நாம் ஏற்க விரும்பும் ஒரே டோக்கன்.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // உள்வரும் பரிவர்த்தனையைக் கையாண்டு, அடுத்தடுத்த செயல்பாட்டு அழைப்பைச் செய்யவும்.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

`RecipientContract` ஒரு ERC-223 டோக்கனைப் பெறும்போது, ஈதர் பரிவர்த்தனைகள் செயல்பாட்டு அழைப்புகளை பரிவர்த்தனை `data`-ஆகக் குறியாக்கம் செய்வதைப் போலவே, அந்த ஒப்பந்தமும் டோக்கன் பரிவர்த்தனையின் `_data` அளவுருவாகக் குறியாக்கம் செய்யப்பட்ட ஒரு செயல்பாட்டை இயக்கும். மேலும் தகவலுக்கு [தரவுப் புலம்](/developers/docs/transactions/#the-data-field)-த்தைப் படிக்கவும்.

மேலே உள்ள எடுத்துக்காட்டில், ஒரு ERC-223 டோக்கன் `transfer(address,uin256,bytes calldata _data)` செயல்பாட்டுடன் `RecipientContract`-இன் முகவரிக்கு மாற்றப்பட வேண்டும். தரவு அளவுரு `0xc2985578` (`foo()` செயல்பாட்டின் கையொப்பம்) ஆக இருந்தால், டோக்கன் டெபாசிட் பெறப்பட்ட பிறகு foo() செயல்பாடு அழைக்கப்பட்டு, Foo() நிகழ்வு வெளியிடப்படும்.

டோக்கன் பரிமாற்றத்தின் `data`-விலும் அளவுருக்களை குறியாக்கம் செய்யலாம், உதாரணமாக, `_someNumber`-க்கு 12345 மதிப்புடன் bar() செயல்பாட்டை நாம் அழைக்கலாம். இந்த நிலையில் `data`, `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ஆக இருக்க வேண்டும், இதில் `0x0423a132` என்பது `bar(uint256)` செயல்பாட்டின் கையொப்பம் மற்றும் `00000000000000000000000000000000000000000000000000000000000004d2` என்பது uint256 ஆக 12345 ஆகும்.

## வரம்புகள் {#limitations}

ERC-223, ERC-20 தரநிலையில் காணப்படும் பல சிக்கல்களை நிவர்த்தி செய்தாலும், அதற்கும் சில வரம்புகள் உள்ளன:

- ஏற்றுக்கொள்ளுதல் மற்றும் இணக்கத்தன்மை: ERC-223 இன்னும் பரவலாக ஏற்றுக்கொள்ளப்படவில்லை, இது தற்போதுள்ள கருவிகள் மற்றும் தளங்களுடனான அதன் இணக்கத்தன்மையைக் கட்டுப்படுத்தக்கூடும்.
- பழையவற்றுடன் இணக்கத்தன்மை: ERC-223, ERC-20 உடன் பழையவற்றிற்கு இணக்கத்தன்மை கொண்டதல்ல, அதாவது தற்போதுள்ள ERC-20 ஒப்பந்தங்கள் மற்றும் கருவிகள் மாற்றங்கள் இல்லாமல் ERC-223 டோக்கன்களுடன் வேலை செய்யாது.
- கேஸ் செலவுகள்: ERC-223 பரிமாற்றங்களில் உள்ள கூடுதல் சோதனைகள் மற்றும் செயல்பாடுகள், ERC-20 பரிவர்த்தனைகளுடன் ஒப்பிடும்போது அதிக கேஸ் செலவுகளை ஏற்படுத்தக்கூடும்.

## மேலும் வாசிக்க {#further-reading}

- [EIP-223: ERC-223 தரநிலைக் குறி](https://eips.ethereum.org/EIPS/eip-223)
- [ஆரம்ப ERC-223 முன்மொழிவு](https://github.com/ethereum/eips/issues/223)
