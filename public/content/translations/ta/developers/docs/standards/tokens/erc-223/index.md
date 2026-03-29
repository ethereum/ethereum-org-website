---
title: "ERC-223 டோக்கன் தரநிலை"
description: "ERC-223 ஃபஞ்சிபிள் டோக்கன் தரநிலை, அது எவ்வாறு செயல்படுகிறது மற்றும் ERC-20 உடனான ஒப்பீடு பற்றிய ஒரு கண்ணோட்டம்."
lang: ta
---

## அறிமுகம் {#introduction}

### ERC-223 என்றால் என்ன? {#what-is-erc223}

ERC-223 என்பது ERC-20 தரநிலையைப் போன்ற ஃபஞ்சிபிள் டோக்கன்களுக்கான ஒரு தரநிலையாகும். முக்கிய வேறுபாடு என்னவென்றால், ERC-223 டோக்கன் API-ஐ மட்டும் வரையறுக்காமல், அனுப்புநரிடமிருந்து பெறுநருக்கு டோக்கன்களை மாற்றுவதற்கான தர்க்கத்தையும் வரையறுக்கிறது. இது பெறுநரின் பக்கத்தில் டோக்கன் பரிமாற்றங்களைக் கையாள அனுமதிக்கும் ஒரு தகவல் தொடர்பு மாதிரியை அறிமுகப்படுத்துகிறது.

### ERC-20 இலிருந்து வேறுபாடுகள் {#erc20-differences}

ERC-223 ஆனது ERC-20 இன் சில வரம்புகளை நிவர்த்தி செய்கிறது மற்றும் டோக்கன் ஒப்பந்தத்திற்கும் டோக்கன்களைப் பெறக்கூடிய ஒப்பந்தத்திற்கும் இடையிலான புதிய தொடர்பு முறையை அறிமுகப்படுத்துகிறது. ERC-20 இல் சாத்தியமில்லாத ஆனால் ERC-223 இல் சாத்தியமான சில விஷயங்கள் உள்ளன:

- பெறுநரின் பக்கத்தில் டோக்கன் பரிமாற்றத்தைக் கையாளுதல்: ஒரு ERC-223 டோக்கன் டெபாசிட் செய்யப்படுவதைப் பெறுநர்கள் கண்டறிய முடியும்.
- தவறாக அனுப்பப்பட்ட டோக்கன்களை நிராகரித்தல்: டோக்கன்களைப் பெறக் கூடாத ஒரு ஒப்பந்தத்திற்கு பயனர் ERC-223 டோக்கன்களை அனுப்பினால், அந்த ஒப்பந்தம் பரிவர்த்தனையை நிராகரிக்கலாம், இதனால் டோக்கன் இழப்பு தடுக்கப்படும்.
- பரிமாற்றங்களில் மெட்டாடேட்டா: ERC-223 டோக்கன்களில் மெட்டாடேட்டாவைச் சேர்க்கலாம், இது டோக்கன் பரிவர்த்தனைகளுடன் தன்னிச்சையான தகவல்களை இணைக்க அனுமதிக்கிறது.

## முன்நிபந்தனைகள் {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts)
- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## முக்கிய பகுதி {#body}

ERC-223 என்பது ஸ்மார்ட் ஒப்பந்தங்களுக்குள் டோக்கன்களுக்கான API-ஐ செயல்படுத்தும் ஒரு டோக்கன் தரநிலையாகும். இது ERC-223 டோக்கன்களைப் பெற வேண்டிய ஒப்பந்தங்களுக்கான API-ஐயும் அறிவிக்கிறது. ERC-223 ரிசீவர் API-ஐ ஆதரிக்காத ஒப்பந்தங்கள் ERC-223 டோக்கன்களைப் பெற முடியாது, இது பயனர் பிழையைத் தடுக்கிறது.

ஒரு ஸ்மார்ட் ஒப்பந்தம் பின்வரும் முறைகள் மற்றும் நிகழ்வுகளைச் செயல்படுத்தினால், அதை ERC-223 இணக்கமான டோக்கன் ஒப்பந்தம் என்று அழைக்கலாம். பயன்படுத்தப்பட்டவுடன், Ethereum இல் உருவாக்கப்பட்ட டோக்கன்களைக் கண்காணிக்கும் பொறுப்பு இதற்கு இருக்கும்.

ஒப்பந்தம் இந்த செயல்பாடுகளை மட்டுமே கொண்டிருக்க வேண்டிய கட்டாயமில்லை, மேலும் ஒரு டெவலப்பர் வெவ்வேறு டோக்கன் தரநிலைகளிலிருந்து வேறு எந்த அம்சத்தையும் இந்த ஒப்பந்தத்தில் சேர்க்கலாம். எடுத்துக்காட்டாக, `approve` மற்றும் `transferFrom` செயல்பாடுகள் ERC-223 தரநிலையின் ஒரு பகுதியாக இல்லை, ஆனால் தேவைப்பட்டால் இந்த செயல்பாடுகளைச் செயல்படுத்தலாம்.

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

`tokenReceived(..)` செயல்பாட்டைச் செயல்படுத்தாத ஒரு ஒப்பந்தத்திற்கு ERC-223 டோக்கன்கள் அனுப்பப்பட்டால், பரிமாற்றம் தோல்வியடைய வேண்டும் மற்றும் அனுப்புநரின் இருப்பிலிருந்து டோக்கன்கள் நகர்த்தப்படக்கூடாது.

### நிகழ்வுகள் {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### எடுத்துக்காட்டுகள் {#examples}

ERC-223 டோக்கனின் API ஆனது ERC-20 ஐப் போலவே உள்ளது, எனவே UI மேம்பாட்டுப் பார்வையில் எந்த வித்தியாசமும் இல்லை. இங்குள்ள ஒரே விதிவிலக்கு என்னவென்றால், ERC-223 டோக்கன்களில் `approve` + `transferFrom` செயல்பாடுகள் இல்லாமல் இருக்கலாம், ஏனெனில் இவை இந்த தரநிலைக்கு விருப்பமானவை.

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

இப்போது tokenA ஒரு ERC-223 டோக்கன் என்று கருதி, `tokenA` இன் டெபாசிட்களை ஏற்க மற்றொரு ஒப்பந்தம் நமக்குத் தேவை. ஒப்பந்தம் tokenA ஐ மட்டுமே ஏற்க வேண்டும் மற்றும் வேறு எந்த டோக்கன்களையும் நிராகரிக்க வேண்டும். ஒப்பந்தம் tokenA ஐப் பெறும்போது அது ஒரு `Deposit()` நிகழ்வை வெளியிட வேண்டும் மற்றும் உள் `deposits` மாறியின் மதிப்பை அதிகரிக்க வேண்டும்.

இதோ குறியீடு:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // நாம் ஏற்றுக்கொள்ள விரும்பும் ஒரே டோக்கன்.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // இந்தச் செயல்பாட்டிற்குள் என்பதைப் புரிந்துகொள்வது முக்கியம்
        // msg.sender என்பது பெறப்படும் டோக்கனின் முகவரியாகும்,
        // பெரும்பாலான சந்தர்ப்பங்களில் டோக்கன் ஒப்பந்தம் ஈதரை (ether) வைத்திருக்கவோ அல்லது அனுப்பவோ செய்யாது என்பதால், msg.value எப்போதும் 0 ஆக இருக்கும்,
        // _from என்பது டோக்கன் பரிமாற்றத்தை அனுப்புபவர்,
        // _value என்பது டெபாசிட் செய்யப்பட்ட டோக்கன்களின் அளவு.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## அடிக்கடி கேட்கப்படும் கேள்விகள் {#faq}

### ஒப்பந்தத்திற்கு சில tokenB ஐ அனுப்பினால் என்ன நடக்கும்? {#sending-tokens}

பரிவர்த்தனை தோல்வியடையும், மேலும் டோக்கன்களின் பரிமாற்றம் நடக்காது. டோக்கன்கள் அனுப்புநரின் முகவரிக்குத் திருப்பித் தரப்படும்.

### இந்த ஒப்பந்தத்தில் நாம் எவ்வாறு டெபாசிட் செய்வது? {#contract-deposits}

`RecipientContract` இன் முகவரியைக் குறிப்பிட்டு, ERC-223 டோக்கனின் `transfer(address,uint256)` அல்லது `transfer(address,uint256,bytes)` செயல்பாட்டை அழைக்கவும்.

### இந்த ஒப்பந்தத்திற்கு ERC-20 டோக்கனை மாற்றினால் என்ன நடக்கும்? {#erc-20-transfers}

`RecipientContract` க்கு ERC-20 டோக்கன் அனுப்பப்பட்டால், டோக்கன்கள் மாற்றப்படும், ஆனால் பரிமாற்றம் அங்கீகரிக்கப்படாது (`Deposit()` நிகழ்வு எதுவும் தூண்டப்படாது, மேலும் டெபாசிட் மதிப்பு மாறாது). தேவையற்ற ERC-20 டெபாசிட்களை வடிகட்டவோ அல்லது தடுக்கவோ முடியாது.

### டோக்கன் டெபாசிட் முடிந்த பிறகு சில செயல்பாடுகளைச் செயல்படுத்த விரும்பினால் என்ன செய்வது? {#function-execution}

அவ்வாறு செய்ய பல வழிகள் உள்ளன. இந்த எடுத்துக்காட்டில், ERC-223 பரிமாற்றங்களை ஈதர் பரிமாற்றங்களுக்கு ஒத்ததாக மாற்றும் முறையைப் பின்பற்றுவோம்:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // நாம் ஏற்றுக்கொள்ள விரும்பும் ஒரே டோக்கன்.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // உள்வரும் பரிவர்த்தனையைக் கையாண்டு, அடுத்தடுத்த சார்பு அழைப்பை (function call) செய்யவும்.
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

`RecipientContract` ஒரு ERC-223 டோக்கனைப் பெறும்போது, ஈதர் பரிவர்த்தனைகள் செயல்பாட்டு அழைப்புகளை பரிவர்த்தனை `data` ஆக எவ்வாறு குறியாக்கம் செய்கின்றனவோ அதேபோல, டோக்கன் பரிவர்த்தனையின் `_data` அளவுருவாக குறியாக்கம் செய்யப்பட்ட ஒரு செயல்பாட்டை ஒப்பந்தம் செயல்படுத்தும். மேலும் தகவலுக்கு [தரவுப் புலம்](/developers/docs/transactions/#the-data-field) என்பதைப் படிக்கவும்.

மேலே உள்ள எடுத்துக்காட்டில், `transfer(address,uin256,bytes calldata _data)` செயல்பாட்டுடன் `RecipientContract` இன் முகவரிக்கு ஒரு ERC-223 டோக்கன் மாற்றப்பட வேண்டும். தரவு அளவுரு `0xc2985578` ஆக இருந்தால் (இது `foo()` செயல்பாட்டின் கையொப்பம்), டோக்கன் டெபாசிட் பெறப்பட்ட பிறகு foo() செயல்பாடு அழைக்கப்படும் மற்றும் Foo() நிகழ்வு தூண்டப்படும்.

டோக்கன் பரிமாற்றத்தின் `data` இலும் அளவுருக்களைக் குறியாக்கம் செய்யலாம், எடுத்துக்காட்டாக `_someNumber` க்கு 12345 மதிப்புடன் bar() செயல்பாட்டை நாம் அழைக்கலாம். இந்த நிலையில் `data` ஆனது `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ஆக இருக்க வேண்டும், இதில் `0x0423a132` என்பது `bar(uint256)` செயல்பாட்டின் கையொப்பம் மற்றும் `00000000000000000000000000000000000000000000000000000000000004d2` என்பது uint256 ஆக 12345 ஆகும்.

## வரம்புகள் {#limitations}

ERC-20 தரநிலையில் காணப்படும் பல சிக்கல்களை ERC-223 நிவர்த்தி செய்தாலும், அது அதன் சொந்த வரம்புகள் இல்லாமல் இல்லை:

- தத்தெடுப்பு மற்றும் இணக்கத்தன்மை: ERC-223 இன்னும் பரவலாக ஏற்றுக்கொள்ளப்படவில்லை, இது தற்போதுள்ள கருவிகள் மற்றும் தளங்களுடனான அதன் இணக்கத்தன்மையைக் கட்டுப்படுத்தலாம்.
- பின்தங்கிய இணக்கத்தன்மை: ERC-223 ஆனது ERC-20 உடன் பின்தங்கிய இணக்கத்தன்மை கொண்டதல்ல, அதாவது தற்போதுள்ள ERC-20 ஒப்பந்தங்கள் மற்றும் கருவிகள் மாற்றங்கள் இல்லாமல் ERC-223 டோக்கன்களுடன் செயல்படாது.
- எரிவாயு செலவுகள்: ERC-223 பரிமாற்றங்களில் உள்ள கூடுதல் சரிபார்ப்புகள் மற்றும் செயல்பாடுகள் ERC-20 பரிவர்த்தனைகளுடன் ஒப்பிடும்போது அதிக எரிவாயு செலவுகளுக்கு வழிவகுக்கும்.

## மேலும் படிக்க {#further-reading}

- [EIP-223: ERC-223 டோக்கன் தரநிலை](https://eips.ethereum.org/EIPS/eip-223)
- [ஆரம்ப ERC-223 முன்மொழிவு](https://github.com/ethereum/eips/issues/223)