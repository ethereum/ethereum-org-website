---
title: "ஸ்மார்ட் ஒப்பந்தங்களின் கட்டமைப்பு"
description: "ஸ்மார்ட் ஒப்பந்தத்தின் கட்டமைப்பு பற்றிய ஆழமான பார்வை – செயல்பாடுகள், தரவு மற்றும் மாறிகள்."
lang: ta
---

ஸ்மார்ட் ஒப்பந்தம் என்பது Ethereum இல் உள்ள ஒரு முகவரியில் இயங்கும் ஒரு நிரலாகும். அவை ஒரு பரிவர்த்தனையைப் பெறும்போது செயல்படக்கூடிய தரவு மற்றும் செயல்பாடுகளால் (functions) ஆனவை. ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்குவது பற்றிய ஒரு கண்ணோட்டம் இங்கே.

## முன்நிபந்தனைகள் {#prerequisites}

முதலில் [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/) பற்றிப் படித்திருப்பதை உறுதிசெய்யவும். JavaScript அல்லது Python போன்ற நிரலாக்க மொழிகளை நீங்கள் ஏற்கனவே அறிந்திருக்கிறீர்கள் என்று இந்த ஆவணம் கருதுகிறது.

## தரவு {#data}

எந்தவொரு ஒப்பந்தத் தரவும் ஒரு இடத்திற்கு ஒதுக்கப்பட வேண்டும்: `storage` அல்லது `memory`. ஸ்மார்ட் ஒப்பந்தத்தில் சேமிப்பகத்தை (storage) மாற்றுவது செலவுமிக்கது, எனவே உங்கள் தரவு எங்கு இருக்க வேண்டும் என்பதை நீங்கள் கருத்தில் கொள்ள வேண்டும்.

### சேமிப்பகம் {#storage}

நிலையான தரவு சேமிப்பகம் (storage) என்று குறிப்பிடப்படுகிறது மற்றும் இது நிலை மாறிகளால் (state variables) குறிக்கப்படுகிறது. இந்த மதிப்புகள் பிளாக்செயினில் நிரந்தரமாக சேமிக்கப்படும். தொகுக்கப்படும்போது (compile) பிளாக்செயினில் எவ்வளவு சேமிப்பகம் தேவை என்பதை ஒப்பந்தம் கண்காணிக்க, நீங்கள் அதன் வகையை (type) அறிவிக்க வேண்டும்.

```solidity
// Solidity உதாரணம்
contract SimpleStorage {
    uint storedData; // நிலை மாறி
    // ...
}
```

```python
# Vyper உதாரணம்
storedData: int128
```

நீங்கள் ஏற்கனவே பொருள் சார்ந்த (object-oriented) மொழிகளில் நிரலாக்கம் செய்திருந்தால், பெரும்பாலான வகைகளை நீங்கள் அறிந்திருக்கலாம். இருப்பினும், நீங்கள் [Ethereum](/) மேம்பாட்டிற்குப் புதியவராக இருந்தால், `address` உங்களுக்குப் புதியதாக இருக்கும்.

ஒரு `address` வகையானது 20 பைட்டுகள் அல்லது 160 பிட்களுக்குச் சமமான Ethereum முகவரியைக் கொண்டிருக்கலாம். இது முன்னணியில் 0x உடன் ஹெக்ஸாடெசிமல் குறியீட்டில் திரும்பும்.

பிற வகைகள் பின்வருமாறு:

- பூலியன் (boolean)
- முழு எண் (integer)
- நிலையான புள்ளி எண்கள் (fixed point numbers)
- நிலையான அளவு பைட் வரிசைகள் (fixed-size byte arrays)
- மாறும் அளவு பைட் வரிசைகள் (dynamically sized byte arrays)
- விகிதமுறு மற்றும் முழு எண் லிட்டரல்கள் (rational and integer literals)
- சரம் லிட்டரல்கள் (string literals)
- ஹெக்ஸாடெசிமல் லிட்டரல்கள் (hexadecimal literals)
- எனம்கள் (enums)

கூடுதல் விளக்கத்திற்கு, ஆவணங்களைப் பார்க்கவும்:

- [Vyper வகைகளைப் பார்க்கவும்](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity வகைகளைப் பார்க்கவும்](https://docs.soliditylang.org/en/latest/types.html#value-types)

### நினைவகம் {#memory}

ஒரு ஒப்பந்தச் செயல்பாட்டின் (function) செயலாக்க வாழ்நாளில் மட்டுமே சேமிக்கப்படும் மதிப்புகள் நினைவக மாறிகள் (memory variables) என்று அழைக்கப்படுகின்றன. இவை பிளாக்செயினில் நிரந்தரமாக சேமிக்கப்படாததால், இவற்றைப் பயன்படுத்துவது மிகவும் மலிவானது.

EVM எவ்வாறு தரவைச் சேமிக்கிறது (Storage, Memory, and the Stack) என்பதைப் பற்றி [Solidity ஆவணங்களில்](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) மேலும் அறிக.

### சுற்றுச்சூழல் மாறிகள் {#environment-variables}

உங்கள் ஒப்பந்தத்தில் நீங்கள் வரையறுக்கும் மாறிகளுக்கு கூடுதலாக, சில சிறப்பு உலகளாவிய மாறிகள் (global variables) உள்ளன. அவை முதன்மையாக பிளாக்செயின் அல்லது தற்போதைய பரிவர்த்தனை பற்றிய தகவல்களை வழங்கப் பயன்படுத்தப்படுகின்றன.

எடுத்துக்காட்டுகள்:

| **பண்பு (Prop)**  | **நிலை மாறி (State variable)** | **விளக்கம்**                                  |
| ----------------- | ------------------------------ | -------------------------------------------- |
| `block.timestamp` | uint256                        | தற்போதைய பிளாக் எபோக் நேரமுத்திரை (timestamp) |
| `msg.sender`      | address                        | செய்தியை அனுப்புபவர் (தற்போதைய அழைப்பு)      |

## செயல்பாடுகள் {#functions}

மிகவும் எளிமையான சொற்களில், செயல்பாடுகள் (functions) உள்வரும் பரிவர்த்தனைகளுக்குப் பதிலளிக்கும் வகையில் தகவலைப் பெறலாம் அல்லது தகவலை அமைக்கலாம்.

இரண்டு வகையான செயல்பாட்டு அழைப்புகள் (function calls) உள்ளன:

- `internal` – இவை EVM அழைப்பை உருவாக்காது
  - உள் செயல்பாடுகள் மற்றும் நிலை மாறிகளை உள்நாட்டில் மட்டுமே அணுக முடியும் (அதாவது, தற்போதைய ஒப்பந்தம் அல்லது அதிலிருந்து பெறப்பட்ட ஒப்பந்தங்களுக்குள் இருந்து)
- `external` – இவை EVM அழைப்பை உருவாக்குகின்றன
  - வெளிப்புற செயல்பாடுகள் ஒப்பந்த இடைமுகத்தின் (interface) ஒரு பகுதியாகும், அதாவது அவற்றை பிற ஒப்பந்தங்களிலிருந்தும் பரிவர்த்தனைகள் மூலமாகவும் அழைக்கலாம். ஒரு வெளிப்புற செயல்பாடு `f` ஐ உள்நாட்டில் அழைக்க முடியாது (அதாவது, `f()` வேலை செய்யாது, ஆனால் `this.f()` வேலை செய்யும்).

அவை `public` அல்லது `private` ஆகவும் இருக்கலாம்

- `public` செயல்பாடுகளை ஒப்பந்தத்திற்குள் இருந்து உள்நாட்டிலோ அல்லது செய்திகள் வழியாக வெளிப்புறமாகவோ அழைக்கலாம்
- `private` செயல்பாடுகள் அவை வரையறுக்கப்பட்ட ஒப்பந்தத்திற்கு மட்டுமே தெரியும், பெறப்பட்ட ஒப்பந்தங்களில் அல்ல

செயல்பாடுகள் மற்றும் நிலை மாறிகள் இரண்டையும் பொது (public) அல்லது தனிப்பட்டதாக (private) மாற்றலாம்

ஒப்பந்தத்தில் நிலை மாறியைப் புதுப்பிப்பதற்கான ஒரு செயல்பாடு இங்கே:

```solidity
// Solidity உதாரணம்
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` வகையின் அளவுரு (parameter) `value` செயல்பாட்டிற்குள் அனுப்பப்படுகிறது: `update_name`
- இது `public` என அறிவிக்கப்பட்டுள்ளது, அதாவது யார் வேண்டுமானாலும் இதை அணுகலாம்
- இது `view` என அறிவிக்கப்படவில்லை, எனவே இது ஒப்பந்த நிலையை மாற்றலாம்

### View செயல்பாடுகள் {#view-functions}

இந்த செயல்பாடுகள் ஒப்பந்தத்தின் தரவின் நிலையை மாற்றாது என்று உறுதியளிக்கின்றன. பொதுவான எடுத்துக்காட்டுகள் "getter" செயல்பாடுகள் – எடுத்துக்காட்டாக, பயனரின் இருப்பைப் (balance) பெற நீங்கள் இதைப் பயன்படுத்தலாம்.

```solidity
// Solidity உதாரணம்
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

நிலையை மாற்றுவதாகக் கருதப்படுவது எது:

1. நிலை மாறிகளுக்கு எழுதுதல்.
2. [நிகழ்வுகளை வெளியிடுதல் (Emitting events)](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [பிற ஒப்பந்தங்களை உருவாக்குதல்](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` ஐப் பயன்படுத்துதல்.
5. அழைப்புகள் (calls) மூலம் ஈதரை அனுப்புதல்.
6. `view` அல்லது `pure` எனக் குறிக்கப்படாத எந்தவொரு செயல்பாட்டையும் அழைத்தல்.
7. குறைந்த-நிலை அழைப்புகளைப் (low-level calls) பயன்படுத்துதல்.
8. குறிப்பிட்ட ஆப்கோடுகளைக் (opcodes) கொண்ட இன்லைன் அசெம்பிளியைப் பயன்படுத்துதல்.

### Constructor செயல்பாடுகள் {#constructor-functions}

ஒப்பந்தம் முதன்முதலில் பயன்படுத்தப்படும்போது (deployed) `constructor` செயல்பாடுகள் ஒருமுறை மட்டுமே செயல்படுத்தப்படும். பல வகுப்பு அடிப்படையிலான (class-based) நிரலாக்க மொழிகளில் உள்ள `constructor` ஐப் போலவே, இந்த செயல்பாடுகள் பெரும்பாலும் நிலை மாறிகளை அவற்றின் குறிப்பிட்ட மதிப்புகளுக்குத் துவக்குகின்றன.

```solidity
// Solidity உதாரணம்
// ஒப்பந்தத்தின் தரவை துவக்குகிறது, `owner` ஐ
// ஒப்பந்தத்தை உருவாக்கியவரின் முகவரிக்கு அமைக்கிறது.
constructor() public {
    // அனைத்து ஸ்மார்ட் ஒப்பந்தங்களும் அதன் செயல்பாடுகளைத் தூண்டுவதற்கு வெளிப்புற பரிவர்த்தனைகளையே நம்பியுள்ளன.
    // `msg` என்பது கொடுக்கப்பட்ட பரிவர்த்தனை தொடர்பான தரவை உள்ளடக்கிய ஒரு உலகளாவிய மாறி,
    // அனுப்புநரின் முகவரி மற்றும் பரிவர்த்தனையில் சேர்க்கப்பட்டுள்ள ETH மதிப்பு போன்றவை இதில் அடங்கும்.
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper உதாரணம்

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### உள்ளமைக்கப்பட்ட செயல்பாடுகள் {#built-in-functions}

உங்கள் ஒப்பந்தத்தில் நீங்கள் வரையறுக்கும் மாறிகள் மற்றும் செயல்பாடுகளுக்கு கூடுதலாக, சில சிறப்பு உள்ளமைக்கப்பட்ட செயல்பாடுகள் (built-in functions) உள்ளன. மிகவும் வெளிப்படையான எடுத்துக்காட்டு:

- `address.send()` – Solidity
- `send(address)` – Vyper

இவை ஒப்பந்தங்கள் மற்ற கணக்குகளுக்கு ETH ஐ அனுப்ப அனுமதிக்கின்றன.

## செயல்பாடுகளை எழுதுதல் {#writing-functions}

உங்கள் செயல்பாட்டிற்குத் தேவையானது:

- அளவுரு மாறி மற்றும் வகை (அது அளவுருக்களை ஏற்றுக் கொண்டால்)
- internal/external அறிவிப்பு
- pure/view/payable அறிவிப்பு
- திரும்பும் வகை (அது ஒரு மதிப்பை வழங்கினால்)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // நிலை மாறி

    // ஒப்பந்தம் பயன்படுத்தப்படும்போது (deployed) அழைக்கப்பட்டு மதிப்பைத் துவக்குகிறது
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get செயல்பாடு
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set செயல்பாடு
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

ஒரு முழுமையான ஒப்பந்தம் இதுபோன்று இருக்கலாம். இங்கே `constructor` செயல்பாடு `dapp_name` மாறிக்கு ஆரம்ப மதிப்பை வழங்குகிறது.

## நிகழ்வுகள் மற்றும் பதிவுகள் {#events-and-logs}

நிகழ்வுகள் (Events) உங்கள் ஸ்மார்ட் ஒப்பந்தத்தை உங்கள் முன்பக்கம் (frontend) அல்லது பிற சந்தாதாரர் பயன்பாடுகளுடன் தொடர்பு கொள்ள உதவுகின்றன. ஒரு பரிவர்த்தனை சரிபார்க்கப்பட்டு ஒரு பிளாக்கில் சேர்க்கப்பட்டவுடன், ஸ்மார்ட் ஒப்பந்தங்கள் நிகழ்வுகளை வெளியிடலாம் மற்றும் தகவல்களைப் பதிவு செய்யலாம், பின்னர் முன்பக்கம் அதைச் செயலாக்கிப் பயன்படுத்தலாம்.

## சிறுகுறிப்பு எடுத்துக்காட்டுகள் {#annotated-examples}

இவை Solidity இல் எழுதப்பட்ட சில எடுத்துக்காட்டுகள். நீங்கள் குறியீட்டுடன் விளையாட விரும்பினால், [Remix](http://remix.ethereum.org) இல் அவற்றுடன் தொடர்பு கொள்ளலாம்.

### Hello world {#hello-world}

```solidity
// சொற்பொருள் பதிப்பைப் (semantic versioning) பயன்படுத்தி, Solidity-இன் பதிப்பைக் குறிப்பிடுகிறது.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` என்ற பெயரில் ஒரு ஒப்பந்தத்தை வரையறுக்கிறது.
// ஒப்பந்தம் என்பது செயல்பாடுகள் மற்றும் தரவுகளின் (அதன் நிலை) தொகுப்பாகும்.
// பயன்படுத்தப்பட்டவுடன் (deployed), ஒரு ஒப்பந்தம் Ethereum பிளாக்செயினில் ஒரு குறிப்பிட்ட முகவரியில் இருக்கும்.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` வகையிலான `message` என்ற நிலை மாறியை (state variable) அறிவிக்கிறது.
    // நிலை மாறிகள் என்பவை ஒப்பந்த சேமிப்பகத்தில் நிரந்தரமாக சேமிக்கப்படும் மதிப்புகளைக் கொண்ட மாறிகள் ஆகும்.
    // `public` என்ற முக்கிய சொல் ஒப்பந்தத்திற்கு வெளியேயும் மாறிகளை அணுகக்கூடியதாக ஆக்குகிறது
    // மேலும் மற்ற ஒப்பந்தங்கள் அல்லது வாடிக்கையாளர்கள் மதிப்பை அணுக அழைக்கும் ஒரு செயல்பாட்டை உருவாக்குகிறது.
    string public message;

    // பல class-அடிப்படையிலான object-oriented மொழிகளைப் போலவே, constructor என்பது
    // ஒப்பந்தம் உருவாக்கப்படும் போது மட்டுமே செயல்படுத்தப்படும் ஒரு சிறப்புச் செயல்பாடாகும்.
    // ஒப்பந்தத்தின் தரவைத் துவக்க Constructors பயன்படுத்தப்படுகின்றன.
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // `initMessage` என்ற string அளபுருவை (argument) ஏற்றுக்கொண்டு மதிப்பை
        // ஒப்பந்தத்தின் `message` சேமிப்பக மாறியில் (storage variable) அமைக்கிறது.
        message = initMessage;
    }

    // ஒரு string அளபுருவை ஏற்றுக்கொள்ளும் public செயல்பாடு
    // மற்றும் `message` சேமிப்பக மாறியைப் புதுப்பிக்கிறது.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // ஒரு `address` என்பது மின்னஞ்சல் முகவரியுடன் ஒப்பிடத்தக்கது - இது Ethereum இல் ஒரு கணக்கை அடையாளம் காணப் பயன்படுகிறது.
    // முகவரிகள் ஒரு ஸ்மார்ட் ஒப்பந்தம் அல்லது வெளிப்புற (பயனர்) கணக்குகளைக் குறிக்கலாம்.
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // ஒரு `mapping` என்பது அடிப்படையில் ஒரு hash table தரவு அமைப்பாகும்.
    // இந்த `mapping` ஒரு முகவரிக்கு (டோக்கன் வைத்திருப்பவர்) ஒரு unsigned integer-ஐ (டோக்கன் இருப்பு) ஒதுக்குகிறது.
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // பிளாக்செயினில் செயல்பாடுகளைப் பதிவு செய்ய Events அனுமதிக்கின்றன.
    // ஒப்பந்த நிலை மாற்றங்களுக்கு எதிர்வினையாற்ற Ethereum வாடிக்கையாளர்கள் events-ஐக் கவனிக்கலாம்.
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // ஒப்பந்தத்தின் தரவை துவக்குகிறது, `owner` ஐ
    // ஒப்பந்தத்தை உருவாக்கியவரின் முகவரிக்கு அமைக்கிறது.
    constructor() public {
        // அனைத்து ஸ்மார்ட் ஒப்பந்தங்களும் அதன் செயல்பாடுகளைத் தூண்டுவதற்கு வெளிப்புற பரிவர்த்தனைகளையே நம்பியுள்ளன.
        // `msg` என்பது கொடுக்கப்பட்ட பரிவர்த்தனை தொடர்பான தரவை உள்ளடக்கிய ஒரு உலகளாவிய மாறி,
        // அனுப்புநரின் முகவரி மற்றும் பரிவர்த்தனையில் சேர்க்கப்பட்டுள்ள ETH மதிப்பு போன்றவை இதில் அடங்கும்.
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // புதிய டோக்கன்களின் அளவை உருவாக்கி அவற்றை ஒரு முகவரிக்கு அனுப்புகிறது.
    function mint(address receiver, uint amount) public {
        // `require` என்பது சில நிபந்தனைகளைச் செயல்படுத்தப் பயன்படும் ஒரு கட்டுப்பாட்டு அமைப்பாகும்.
        // ஒரு `require` அறிக்கை `false` என மதிப்பிடப்பட்டால், ஒரு exception தூண்டப்படும்,
        // இது தற்போதைய அழைப்பின் போது நிலையில் செய்யப்பட்ட அனைத்து மாற்றங்களையும் மாற்றியமைக்கிறது (reverts).
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // ஒப்பந்த உரிமையாளர் மட்டுமே இந்த செயல்பாட்டை அழைக்க முடியும்
        require(msg.sender == owner, "You are not the owner.");

        // அதிகபட்ச டோக்கன்களின் அளவைச் செயல்படுத்துகிறது
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` இன் இருப்பை `amount` அளவு அதிகரிக்கிறது
        balances[receiver] += amount;
    }

    // எந்தவொரு அழைப்பாளரிடமிருந்தும் ஒரு முகவரிக்கு இருக்கும் டோக்கன்களின் அளவை அனுப்புகிறது.
    function transfer(address receiver, uint amount) public {
        // அனுப்புநரிடம் அனுப்ப போதுமான டோக்கன்கள் இருக்க வேண்டும்
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // இரண்டு முகவரிகளின் டோக்கன் இருப்புகளை சரிசெய்கிறது
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // முன்னர் வரையறுக்கப்பட்ட event-ஐ வெளியிடுகிறது
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Unique digital asset {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// பிற கோப்புகளிலிருந்து குறியீடுகளை தற்போதைய ஒப்பந்தத்தில் இறக்குமதி செய்கிறது.
// இந்த நிலையில், OpenZeppelin இலிருந்து தொடர்ச்சியான உதவி ஒப்பந்தங்கள்.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// வெளிப்புற ஒப்பந்தங்களிலிருந்து செயல்பாடுகள் மற்றும் முக்கிய சொற்களைப் பெற (inherit) `is` என்ற முக்கிய சொல் பயன்படுத்தப்படுகிறது.
// இந்த நிலையில், `CryptoPizza` ஆனது `IERC721` மற்றும் `ERC165` ஒப்பந்தங்களிலிருந்து பெறுகிறது.
// மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // எண்கணித செயல்பாடுகளைப் பாதுகாப்பாகச் செய்ய OpenZeppelin இன் SafeMath நூலகத்தைப் பயன்படுத்துகிறது.
    // மேலும் அறிய: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity இல் உள்ள Constant நிலை மாறிகள் மற்ற மொழிகளைப் போலவே இருக்கும்
    // ஆனால் compile செய்யும் நேரத்தில் மாறிலியாக (constant) இருக்கும் ஒரு வெளிப்பாட்டிலிருந்து (expression) நீங்கள் மதிப்பை ஒதுக்க வேண்டும்.
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct வகைகள் உங்கள் சொந்த வகையை வரையறுக்க அனுமதிக்கின்றன
    // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza structs இன் வெற்று வரிசையை (array) உருவாக்குகிறது
    Pizza[] public pizzas;

    // பீட்சா ID இலிருந்து அதன் உரிமையாளரின் முகவரிக்கு Mapping செய்கிறது
    mapping(uint256 => address) public pizzaToOwner;

    // உரிமையாளரின் முகவரியிலிருந்து சொந்தமான டோக்கன்களின் எண்ணிக்கைக்கு Mapping செய்கிறது
    mapping(address => uint256) public ownerPizzaCount;

    // டோக்கன் ID இலிருந்து அங்கீகரிக்கப்பட்ட முகவரிக்கு Mapping செய்கிறது
    mapping(uint256 => address) pizzaApprovals;

    // நீங்கள் mappings-ஐ ஒன்றோடொன்று இணைக்கலாம் (nest), இந்த உதாரணம் உரிமையாளரை ஆபரேட்டர் ஒப்புதல்களுக்கு வரைபடமாக்குகிறது
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // string (பெயர்) மற்றும் DNA இலிருந்து சீரற்ற (random) பீட்சாவை உருவாக்குவதற்கான Internal செயல்பாடு
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` என்ற முக்கிய சொல், இந்த செயல்பாடு
        // இந்த ஒப்பந்தம் மற்றும் இதிலிருந்து பெறப்பட்ட ஒப்பந்தங்களுக்குள் மட்டுமே தெரியும் என்பதைக் குறிக்கிறது
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` என்பது பீட்சா ஏற்கனவே உள்ளதா எனச் சரிபார்க்கும் ஒரு function modifier ஆகும்
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // பீட்சாக்களை வரிசையில் (array) சேர்த்து ID ஐப் பெறுகிறது
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // பீட்சா உரிமையாளரும் தற்போதைய பயனரும் ஒருவரா எனச் சரிபார்க்கிறது
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0) என்பது பூஜ்ஜிய முகவரி என்பதை நினைவில் கொள்க,
        // இது pizza[id] இன்னும் ஒரு குறிப்பிட்ட பயனருக்கு ஒதுக்கப்படவில்லை என்பதைக் குறிக்கிறது.

        assert(pizzaToOwner[id] == address(0));

        // பீட்சாவை உரிமையாளருக்கு Map செய்கிறது
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // string (பெயர்) இலிருந்து சீரற்ற பீட்சாவை உருவாக்குகிறது
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // string (பெயர்) மற்றும் உரிமையாளரின் (உருவாக்கியவர்) முகவரியிலிருந்து சீரற்ற DNA ஐ உருவாக்குகிறது
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` எனக் குறிக்கப்பட்ட செயல்பாடுகள் நிலையைப் படிக்கவோ மாற்றவோ மாட்டாது என உறுதியளிக்கின்றன
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // string (பெயர்) + முகவரி (உரிமையாளர்) இலிருந்து சீரற்ற uint ஐ உருவாக்குகிறது
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // உரிமையாளர் கண்டறிந்த பீட்சாக்களின் வரிசையை (array) வழங்குகிறது
    function getPizzasByOwner(address _owner)
        public
        // `view` எனக் குறிக்கப்பட்ட செயல்பாடுகள் நிலையை மாற்ற மாட்டாது என உறுதியளிக்கின்றன
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // மதிப்புகளைச் சேமிக்க `memory` சேமிப்பக இருப்பிடத்தைப் பயன்படுத்துகிறது
        // இந்தச் செயல்பாட்டு அழைப்பின் வாழ்க்கைச் சுழற்சிக்கு மட்டுமே.
        // மேலும் அறிய: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // பீட்சா மற்றும் உரிமையை வேறு முகவரிக்கு மாற்றுகிறது
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // இறக்குமதி செய்யப்பட்ட IERC721 ஒப்பந்தத்தில் வரையறுக்கப்பட்ட event-ஐ வெளியிடுகிறது
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /* *
     * கொடுக்கப்பட்ட டோக்கன் ID இன் உரிமையை மற்றொரு முகவரிக்குப் பாதுகாப்பாக மாற்றுகிறது
     * இலக்கு முகவரி ஒரு ஒப்பந்தமாக இருந்தால், அது `onERC721Received` ஐச் செயல்படுத்த வேண்டும்,
     * இது பாதுகாப்பான பரிமாற்றத்தின் போது அழைக்கப்பட்டு, `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` என்ற மேஜிக் மதிப்பை வழங்கும்;
     * இல்லையெனில், பரிமாற்றம் மாற்றியமைக்கப்படும் (reverted). */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /* *
     * கொடுக்கப்பட்ட டோக்கன் ID இன் உரிமையை மற்றொரு முகவரிக்குப் பாதுகாப்பாக மாற்றுகிறது
     * இலக்கு முகவரி ஒரு ஒப்பந்தமாக இருந்தால், அது `onERC721Received` ஐச் செயல்படுத்த வேண்டும்,
     * இது பாதுகாப்பான பரிமாற்றத்தின் போது அழைக்கப்பட்டு, `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` என்ற மேஜிக் மதிப்பை வழங்கும்;
     * இல்லையெனில், பரிமாற்றம் மாற்றியமைக்கப்படும் (reverted). */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /* *
     * இலக்கு முகவரியில் `onERC721Received` ஐ அழைப்பதற்கான Internal செயல்பாடு
     * இலக்கு முகவரி ஒரு ஒப்பந்தமாக இல்லாவிட்டால் அழைப்பு செயல்படுத்தப்படாது */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // பீட்சாவை எரிக்கிறது (Burns) - டோக்கனை முழுமையாக அழிக்கிறது
    // `external` function modifier என்பது இந்தச் செயல்பாடு
    // ஒப்பந்த இடைமுகத்தின் ஒரு பகுதி மற்றும் பிற ஒப்பந்தங்கள் இதை அழைக்கலாம் என்பதாகும்
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // முகவரி வாரியாக பீட்சாக்களின் எண்ணிக்கையை வழங்குகிறது
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id மூலம் கண்டறியப்பட்ட பீட்சாவின் உரிமையாளரை வழங்குகிறது
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // பீட்சாவின் உரிமையை மாற்ற பிற முகவரியை அங்கீகரிக்கிறது
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // குறிப்பிட்ட பீட்சாவிற்கான அங்கீகரிக்கப்பட்ட முகவரியை வழங்குகிறது
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /* *
     * கொடுக்கப்பட்ட டோக்கன் ID இன் தற்போதைய ஒப்புதலை அழிக்க Private செயல்பாடு
     * கொடுக்கப்பட்ட முகவரி டோக்கனின் உண்மையான உரிமையாளராக இல்லாவிட்டால் மாற்றியமைக்கப்படும் (Reverts) */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /* * கொடுக்கப்பட்ட ஆபரேட்டரின் ஒப்புதலை அமைக்கிறது அல்லது நீக்குகிறது
     * அனுப்புநரின் சார்பாக அனைத்து டோக்கன்களையும் மாற்ற ஒரு ஆபரேட்டர் அனுமதிக்கப்படுகிறார் */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // ஒரு ஆபரேட்டர் கொடுக்கப்பட்ட உரிமையாளரால் அங்கீகரிக்கப்பட்டுள்ளாரா என்பதைக் கூறுகிறது
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // பீட்சாவின் உரிமையை எடுத்துக்கொள்கிறது - அங்கீகரிக்கப்பட்ட பயனர்களுக்கு மட்டுமே
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // பீட்சா உள்ளதா எனச் சரிபார்க்கிறது
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // முகவரி உரிமையாளரா அல்லது பீட்சாவை மாற்ற அங்கீகரிக்கப்பட்டுள்ளதா எனச் சரிபார்க்கிறது
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // இதன் காரணமாக solium சரிபார்ப்பை முடக்கு
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // பீட்சா தனித்துவமானதா மற்றும் இதுவரை இல்லையா எனச் சரிபார்க்கவும்
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // இலக்கு முகவரி ஒரு ஒப்பந்தமா என்பதை வழங்குகிறது
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // தற்போது ஒரு முகவரியில் ஒப்பந்தம் உள்ளதா எனச் சரிபார்க்க சிறந்த வழி எதுவும் இல்லை
        // அந்த முகவரியில் உள்ள குறியீட்டின் அளவைச் சரிபார்ப்பதைத் தவிர.
        // https://ethereum.stackexchange.com/a/14016/36603 ஐப் பார்க்கவும்
        // இது எவ்வாறு செயல்படுகிறது என்பது பற்றிய கூடுதல் விவரங்களுக்கு.
        // TODO செரினிட்டி (Serenity) வெளியீட்டிற்கு முன் இதை மீண்டும் சரிபார்க்கவும், ஏனெனில் அனைத்து முகவரிகளும்
        // அப்போது ஒப்பந்தங்களாக இருக்கும்.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## மேலும் படிக்க {#further-reading}

ஸ்மார்ட் ஒப்பந்தங்கள் பற்றிய முழுமையான கண்ணோட்டத்திற்கு Solidity மற்றும் Vyper இன் ஆவணங்களைப் பார்க்கவும்:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [Ethereum மெய்நிகர் இயந்திரம் (EVM)](/developers/docs/evm/)

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [ஒப்பந்த அளவு வரம்பை எதிர்த்துப் போராட ஒப்பந்தங்களைக் குறைத்தல்](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– உங்கள் ஸ்மார்ட் ஒப்பந்தத்தின் அளவைக் குறைப்பதற்கான சில நடைமுறை குறிப்புகள்._
- [நிகழ்வுகளுடன் ஸ்மார்ட் ஒப்பந்தங்களிலிருந்து தரவைப் பதிவுசெய்தல்](/developers/tutorials/logging-events-smart-contracts/) _– ஸ்மார்ட் ஒப்பந்த நிகழ்வுகள் மற்றும் தரவைப் பதிவுசெய்ய அவற்றை எவ்வாறு பயன்படுத்தலாம் என்பதற்கான அறிமுகம்._
- [Solidity இலிருந்து பிற ஒப்பந்தங்களுடன் தொடர்பு கொள்ளுங்கள்](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– ஏற்கனவே உள்ள ஒப்பந்தத்திலிருந்து ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு பயன்படுத்துவது மற்றும் அதனுடன் எவ்வாறு தொடர்புகொள்வது._