---
title: ERC-223 வில்லை தரநிலை
description: ERC-223 மாற்றத்தக்க வில்லை தரநிலை, அது எவ்வாறு செயல்படுகிறது மற்றும் ERC-20 உடனான ஒப்பீடு பற்றிய ஒரு கண்ணோட்டம்.
lang: ta
---

## அறிமுகம் {#introduction}

### ERC-223 என்றால் என்ன? {#what-is-erc223}

ERC-223 என்பது ERC-20 தரநிலையைப் போன்ற மாற்றத்தக்க வில்லைகளுக்கான (fungible tokens) ஒரு தரநிலையாகும். முக்கிய வேறுபாடு என்னவென்றால், ERC-223 வில்லை API-ஐ மட்டும் வரையறுக்காமல், அனுப்புநரிடமிருந்து பெறுநருக்கு வில்லைகளைப் பரிமாற்றம் செய்வதற்கான தர்க்கத்தையும் வரையறுக்கிறது. இது பெறுநரின் தரப்பில் வில்லை பரிமாற்றங்களைக் கையாள அனுமதிக்கும் ஒரு தகவல் தொடர்பு மாதிரியை அறிமுகப்படுத்துகிறது.

### ERC-20 இலிருந்து வேறுபாடுகள் {#erc20-differences}

ERC-223 ஆனது ERC-20 இன் சில வரம்புகளை நிவர்த்தி செய்கிறது மற்றும் வில்லை ஒப்பந்தத்திற்கும் வில்லைகளைப் பெறக்கூடிய ஒப்பந்தத்திற்கும் இடையிலான புதிய தொடர்பு முறையை அறிமுகப்படுத்துகிறது. ERC-20 இல் சாத்தியமில்லாத ஆனால் ERC-223 இல் சாத்தியமான சில விஷயங்கள் உள்ளன:

- பெறுநரின் தரப்பில் வில்லை பரிமாற்றத்தைக் கையாளுதல்: ஒரு ERC-223 வில்லை டெபாசிட் செய்யப்படுவதைப் பெறுநர்கள் கண்டறிய முடியும்.
- தவறாக அனுப்பப்பட்ட வில்லைகளை நிராகரித்தல்: வில்லைகளைப் பெறக் கூடாத ஒரு ஒப்பந்தத்திற்கு பயனர் ERC-223 வில்லைகளை அனுப்பினால், அந்த ஒப்பந்தம் பரிவர்த்தனையை நிராகரிக்கலாம், இதனால் வில்லை இழப்பு தடுக்கப்படும்.
- பரிமாற்றங்களில் மீத்தரவு: ERC-223 வில்லைகளில் மீத்தரவைச் சேர்க்க முடியும், இது வில்லை பரிவர்த்தனைகளுடன் தன்னிச்சையான தகவல்களை இணைக்க அனுமதிக்கிறது.

## முன்நிபந்தனைகள் {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts)
- [திறன் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [வில்லை தரநிலைகள்](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## உள்ளடக்கம் {#body}

ERC-223 என்பது திறன் ஒப்பந்தங்களுக்குள் வில்லைகளுக்கான API-ஐச் செயல்படுத்தும் ஒரு வில்லை தரநிலையாகும். இது ERC-223 வில்லைகளைப் பெற வேண்டிய ஒப்பந்தங்களுக்கான API-ஐயும் அறிவிக்கிறது. ERC-223 பெறுநர் API-ஐ ஆதரிக்காத ஒப்பந்தங்களால் ERC-223 வில்லைகளைப் பெற முடியாது, இது பயனர் பிழையைத் தடுக்கிறது.

ஒரு திறன் ஒப்பந்தம் பின்வரும் முறைகள் மற்றும் நிகழ்வுகளைச் செயல்படுத்தினால், அதை ERC-223 இணக்கமான வில்லை ஒப்பந்தம் என்று அழைக்கலாம். இது பயன்படுத்தப்பட்டவுடன், எத்திரியத்தில் உருவாக்கப்பட்ட வில்லைகளைக் கண்காணிக்கும் பொறுப்பை இது ஏற்கும்.

ஒப்பந்தம் இந்த செயல்பாடுகளை மட்டுமே கொண்டிருக்க வேண்டிய கட்டாயமில்லை, மேலும் ஒரு டெவலப்பர் வெவ்வேறு வில்லை தரநிலைகளிலிருந்து வேறு எந்த அம்சத்தையும் இந்த ஒப்பந்தத்தில் சேர்க்கலாம். எடுத்துக்காட்டாக, `approve` மற்றும் `transferFrom` செயல்பாடுகள் ERC-223 தரநிலையின் ஒரு பகுதியல்ல, ஆனால் தேவைப்பட்டால் இந்த செயல்பாடுகளைச் செயல்படுத்தலாம்.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) இலிருந்து:

### முறைகள் {#methods}

ERC-223 வில்லை பின்வரும் முறைகளைச் செயல்படுத்த வேண்டும்:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 வில்லைகளைப் பெற வேண்டிய ஒரு ஒப்பந்தம் பின்வரும் முறையைச் செயல்படுத்த வேண்டும்:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

`tokenReceived(..)` செயல்பாட்டைச் செயல்படுத்தாத ஒரு ஒப்பந்தத்திற்கு ERC-223 வில்லைகள் அனுப்பப்பட்டால், பரிமாற்றம் தோல்வியடைய வேண்டும் மற்றும் அனுப்புநரின் இருப்பிலிருந்து வில்லைகள் நகர்த்தப்படக்கூடாது.

### நிகழ்வுகள் {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### எடுத்துக்காட்டுகள் {#examples}

ERC-223 வில்லையின் API ஆனது ERC-20 ஐப் போன்றது, எனவே UI மேம்பாட்டுப் பார்வையில் எந்த வித்தியாசமும் இல்லை. இங்குள்ள ஒரே விதிவிலக்கு என்னவென்றால், ERC-223 வில்லைகளில் `approve` + `transferFrom` செயல்பாடுகள் இல்லாமல் இருக்கலாம், ஏனெனில் இவை இந்தத் தரநிலைக்கு விருப்பமானவை (optional).

#### Solidity எடுத்துக்காட்டுகள் {#solidity-example}

ஒரு அடிப்படை ERC-223 வில்லை ஒப்பந்தம் எவ்வாறு செயல்படுகிறது என்பதைப் பின்வரும் எடுத்துக்காட்டு விளக்குகிறது:

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

இப்போது tokenA என்பது ஒரு ERC-223 வில்லை என்று கருதி, `tokenA` இன் டெபாசிட்டுகளை ஏற்க மற்றொரு ஒப்பந்தம் நமக்குத் தேவை. ஒப்பந்தம் tokenA ஐ மட்டுமே ஏற்க வேண்டும் மற்றும் வேறு எந்த வில்லைகளையும் நிராகரிக்க வேண்டும். ஒப்பந்தம் tokenA ஐப் பெறும்போது அது ஒரு `Deposit()` நிகழ்வை வெளியிட வேண்டும் மற்றும் உள் `deposits` மாறியின் மதிப்பை அதிகரிக்க வேண்டும்.

இதோ அதற்கான குறியீடு:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // நாம் ஏற்க விரும்பும் ஒரே வில்லை.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // இந்தச் செயல்பாட்டிற்குள் பின்வருவனவற்றைப் புரிந்துகொள்வது முக்கியம்
        // msg.sender என்பது பெறப்படும் ஒரு வில்லையின் முகவரி,
        // பெரும்பாலான சந்தர்ப்பங்களில் வில்லை ஒப்பந்தம் ஈதரை வைத்திருக்கவோ அல்லது அனுப்பவோ செய்யாது என்பதால் msg.value எப்போதும் 0 ஆக இருக்கும்,
        // _from என்பது வில்லை பரிமாற்றத்தை அனுப்புபவர்,
        // _value என்பது வைப்பிலிடப்பட்ட வில்லைகளின் அளவு.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## அடிக்கடி கேட்கப்படும் கேள்விகள் {#faq}

### ஒப்பந்தத்திற்கு சில tokenB ஐ அனுப்பினால் என்ன நடக்கும்? {#sending-tokens}

பரிவர்த்தனை தோல்வியடையும், மேலும் வில்லைகளின் பரிமாற்றம் நடக்காது. வில்லைகள் அனுப்புநரின் முகவரிக்குத் திருப்பித் தரப்படும்.

### இந்த ஒப்பந்தத்தில் நாம் எவ்வாறு டெபாசிட் செய்யலாம்? {#contract-deposits}

`RecipientContract` இன் முகவரியைக் குறிப்பிட்டு, ERC-223 வில்லையின் `transfer(address,uint256)` அல்லது `transfer(address,uint256,bytes)` செயல்பாட்டை அழைக்கவும்.

### இந்த ஒப்பந்தத்திற்கு ERC-20 வில்லையைப் பரிமாற்றம் செய்தால் என்ன நடக்கும்? {#erc-20-transfers}

ஒரு ERC-20 வில்லை `RecipientContract` க்கு அனுப்பப்பட்டால், வில்லைகள் பரிமாற்றம் செய்யப்படும், ஆனால் பரிமாற்றம் அங்கீகரிக்கப்படாது (`Deposit()` நிகழ்வு எதுவும் தூண்டப்படாது, மேலும் டெபாசிட் மதிப்பு மாறாது). தேவையற்ற ERC-20 டெபாசிட்டுகளை வடிகட்டவோ அல்லது தடுக்கவோ முடியாது.

### வில்லை டெபாசிட் முடிந்த பிறகு சில செயல்பாடுகளைச் செயல்படுத்த விரும்பினால் என்ன செய்வது? {#function-execution}

அவ்வாறு செய்ய பல வழிகள் உள்ளன. இந்த எடுத்துக்காட்டில், ERC-223 பரிமாற்றங்களை ஈதர் பரிமாற்றங்களுக்கு ஒத்ததாக மாற்றும் முறையைப் பின்பற்றுவோம்:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // நாம் ஏற்க விரும்பும் ஒரே வில்லை.
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

`RecipientContract` ஒரு ERC-223 வில்லையைப் பெறும்போது, ஈதர் பரிவர்த்தனைகள் செயல்பாட்டு அழைப்புகளை பரிவர்த்தனை `data` ஆக எவ்வாறு குறியாக்கம் செய்கின்றனவோ அதேபோல, வில்லை பரிவர்த்தனையின் `_data` அளவுருவாகக் குறியாக்கம் செய்யப்பட்ட ஒரு செயல்பாட்டை ஒப்பந்தம் செயல்படுத்தும். மேலும் தகவலுக்கு [தரவுப் புலத்தைப் (data field)](/developers/docs/transactions/#the-data-field) படிக்கவும்.

மேற்கண்ட எடுத்துக்காட்டில், ஒரு ERC-223 வில்லை `transfer(address,uin256,bytes calldata _data)` செயல்பாட்டுடன் `RecipientContract` இன் முகவரிக்குப் பரிமாற்றம் செய்யப்பட வேண்டும். தரவு அளவுரு `0xc2985578` ஆக இருந்தால் (ஒரு `foo()` செயல்பாட்டின் கையொப்பம்), வில்லை டெபாசிட் பெறப்பட்ட பிறகு foo() செயல்பாடு அழைக்கப்படும் மற்றும் Foo() நிகழ்வு தூண்டப்படும்.

அளவுருக்களை வில்லை பரிமாற்றத்தின் `data` இலும் குறியாக்கம் செய்யலாம், எடுத்துக்காட்டாக `_someNumber` க்கு 12345 மதிப்புடன் bar() செயல்பாட்டை நாம் அழைக்கலாம். இந்த நிலையில் `data` ஆனது `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ஆக இருக்க வேண்டும், இதில் `0x0423a132` என்பது `bar(uint256)` செயல்பாட்டின் கையொப்பம் மற்றும் `00000000000000000000000000000000000000000000000000000000000004d2` என்பது uint256 ஆக 12345 ஆகும்.

## வரம்புகள் {#limitations}

ERC-20 தரநிலையில் காணப்படும் பல சிக்கல்களை ERC-223 நிவர்த்தி செய்தாலும், அது அதன் சொந்த வரம்புகள் இல்லாமல் இல்லை:

- தத்தெடுப்பு மற்றும் இணக்கத்தன்மை: ERC-223 இன்னும் பரவலாக ஏற்றுக்கொள்ளப்படவில்லை, இது தற்போதுள்ள கருவிகள் மற்றும் தளங்களுடனான அதன் இணக்கத்தன்மையைக் கட்டுப்படுத்தலாம்.
- பின்தங்கிய இணக்கத்தன்மை (Backward Compatibility): ERC-223 ஆனது ERC-20 உடன் பின்தங்கிய இணக்கத்தன்மையைக் கொண்டிருக்கவில்லை, அதாவது தற்போதுள்ள ERC-20 ஒப்பந்தங்கள் மற்றும் கருவிகள் மாற்றங்கள் இல்லாமல் ERC-223 வில்லைகளுடன் செயல்படாது.
- எரிவாயு செலவுகள்: ERC-223 பரிமாற்றங்களில் உள்ள கூடுதல் சரிபார்ப்புகள் மற்றும் செயல்பாடுகள் ERC-20 பரிவர்த்தனைகளுடன் ஒப்பிடும்போது அதிக எரிவாயு செலவுகளுக்கு வழிவகுக்கும்.

## மேலும் படிக்க {#further-reading}

- [EIP-223: ERC-223 வில்லை தரநிலை](https://eips.ethereum.org/EIPS/eip-223)
- [ஆரம்ப ERC-223 முன்மொழிவு](https://github.com/ethereum/eips/issues/223)