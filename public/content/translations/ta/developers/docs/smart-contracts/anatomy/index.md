---
title: ஸ்மார்ட் ஒப்பந்தங்களின் உடற்கூறியல்
description: ஒரு ஸ்மார்ட் ஒப்பந்தத்தின் உடற்கூறியல் பற்றிய ஆழமான பார்வை – செயல்பாடுகள், தரவு மற்றும் மாறிகள்.
lang: ta
---

ஸ்மார்ட் ஒப்பந்தம் என்பது எத்தேரியத்தில் ஒரு முகவரியில் இயங்கும் ஒரு நிரலாகும். அவை ஒரு பரிவர்த்தனையைப் பெற்றவுடன் செயல்படுத்தக்கூடிய தரவு மற்றும் செயல்பாடுகளால் ஆனவை. ஒரு ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்குவது என்ன என்பது பற்றிய மேலோட்டம் இங்கே உள்ளது.

## முன்னேற்றக் கட்டுரை {#prerequisites}

முதலில் [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/) பற்றி நீங்கள் படித்திருப்பதை உறுதிப்படுத்திக் கொள்ளுங்கள். ஜாவாஸ்கிரிப்ட் அல்லது பைத்தான் போன்ற நிரலாக்க மொழிகளுடன் நீங்கள் ஏற்கனவே பரிச்சயமானவர் என்று இந்த ஆவணம் கருதுகிறது.

## தரவு {#data}

எந்தவொரு ஒப்பந்தத் தரவும் ஒரு இருப்பிடத்திற்கு ஒதுக்கப்பட வேண்டும்: ஒன்று `storage` அல்லது `memory`. ஒரு ஸ்மார்ட் ஒப்பந்தத்தில் சேமிப்பகத்தை மாற்றுவது செலவு மிக்கது, எனவே உங்கள் தரவு எங்கே இருக்க வேண்டும் என்பதை நீங்கள் கருத்தில் கொள்ள வேண்டும்.

### சேமிப்பகம் {#storage}

தொடர்ச்சியான தரவு சேமிப்பகம் என குறிப்பிடப்படுகிறது மற்றும் நிலை மாறிகளால் குறிப்பிடப்படுகிறது. இந்த மதிப்புகள் பிளாக்செயினில் நிரந்தரமாக சேமிக்கப்படுகின்றன. நீங்கள் வகையை அறிவிக்க வேண்டும், இதனால் ஒப்பந்தம் தொகுக்கப்படும்போது பிளாக்செயினில் எவ்வளவு சேமிப்பிடம் தேவைப்படுகிறது என்பதை கண்காணிக்க முடியும்.

```solidity
// சொலிடிட்டி எடுத்துக்காட்டு
contract SimpleStorage {
    uint storedData; // நிலை மாறி
    // ...
}
```

```python
# வைப்பர் எடுத்துக்காட்டு
storedData: int128
```

நீங்கள் ஏற்கனவே பொருள் சார்ந்த நிரலாக்க மொழிகளை நிரலாக்கம் செய்திருந்தால், பெரும்பாலான வகைகளை நீங்கள் அறிந்திருக்க வாய்ப்புள்ளது. இருப்பினும், நீங்கள் எத்தேரியம் உருவாக்கத்திற்குப் புதியவராக இருந்தால், `address` உங்களுக்குப் புதிதாக இருக்க வேண்டும்.

ஒரு `address` வகை ஒரு எத்தேரியம் முகவரியை வைத்திருக்க முடியும், இது 20 பைட்டுகள் அல்லது 160 பிட்டுகளுக்குச் சமம். இது முன்னணி 0x உடன் ஹெக்ஸாடெசிமல் குறியீட்டில் திரும்புகிறது.

பிற வகைகள்:

- பூலியன்
- முழு எண்
- நிலையான புள்ளி எண்கள்
- நிலையான அளவு பைட் வரிசைகள்
- மாறும் அளவிலான பைட் வரிசைகள்
- விகிதமுறு மற்றும் முழு எண் எழுத்துருக்கள்
- சரம் எழுத்துருக்கள்
- ஹெக்ஸாடெசிமல் எழுத்துருக்கள்
- எண்கள்

மேலும் விளக்கத்திற்கு, இந்த ஆவணங்களைப் பாருங்கள்:

- [வைப்பர் வகைகளைப் பார்க்கவும்](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [சொலிடிட்டி வகைகளைப் பார்க்கவும்](https://docs.soliditylang.org/en/latest/types.html#value-types)

### நினைவகம் {#memory}

ஒரு ஒப்பந்த செயல்பாட்டின் செயலாக்கத்தின் வாழ்நாளில் மட்டுமே சேமிக்கப்படும் மதிப்புகள் நினைவக மாறிகள் என்று அழைக்கப்படுகின்றன. இவை பிளாக்செயினில் நிரந்தரமாக சேமிக்கப்படாததால், அவற்றைப் பயன்படுத்துவது மிகவும் மலிவானது.

EVM தரவை (சேமிப்பகம், நினைவகம் மற்றும் அடுக்கு) எவ்வாறு சேமிக்கிறது என்பதைப் பற்றி [சொலிடிட்டி ஆவணங்களில்](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) மேலும் அறியவும்.

### சூழல் மாறிகள் {#environment-variables}

உங்கள் ஒப்பந்தத்தில் நீங்கள் வரையறுக்கும் மாறிகளுக்கு கூடுதலாக, சில சிறப்பு உலகளாவிய மாறிகள் உள்ளன. அவை முதன்மையாக பிளாக்செயின் அல்லது தற்போதைய பரிவர்த்தனை பற்றிய தகவல்களை வழங்க பயன்படுத்தப்படுகின்றன.

எடுத்துக்காட்டுகள்:

| **பண்பு**         | **நிலை மாறி**                                                                                                                                                                                                                                                                                                                                                                                                               | **விளக்கம்**                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `block.timestamp` | uint256                                                                                                                                                                                                                                                                                                                                                                                                                     | தற்போதைய பிளாக் யுக நேரமுத்திரை                            |
| `msg.sender`      | மிகவும் பொதுவாக, இது வெளிப்புறமாக சொந்தமான கணக்கு (EOA) அல்லது ஒப்பந்தத்தை குறிக்கிறது (இது இலக்கு முகவரி) பெறலாம் அல்லது பிளாக்செயினில் பரிமாற்றங்களை அனுப்பலாம் (மூல முகவரி). மேலும் குறிப்பாக, இது ஒரு ஈ. சி. டி. எஸ். ஏ பொது விசையின் கெக்காக் ஹாஷின் சரியான 160 பிட்கள் ஆகும் | செய்தியை அனுப்புபவர் (தற்போதைய அழைப்பு) |

## செயல்பாடுகள் {#functions}

மிகவும் எளிமையான சொற்களில், உள்வரும் பரிவர்த்தனைகளுக்கு பதிலளிக்கும் விதமாக செயல்பாடுகள் தகவல்களைப் பெறலாம் அல்லது அமைக்கலாம்.

செயல்பாட்டு அழைப்புகளில் இரண்டு வகைகள் உள்ளன:

- `internal` – இவை ஒரு EVM அழைப்பை உருவாக்காது
  - உள்ளக செயல்பாடுகள் மற்றும் நிலை மாறிகளை உள்வழியாக மட்டுமே அணுக முடியும் (அதாவது, தற்போதைய ஒப்பந்தத்திற்குள் அல்லது அதிலிருந்து பெறப்பட்ட ஒப்பந்தங்களிலிருந்து)
- `external` – இவை ஒரு EVM அழைப்பை உருவாக்குகின்றன
  - வெளிப்புற செயல்பாடுகள் ஒப்பந்த இடைமுகத்தின் ஒரு பகுதியாகும், அதாவது அவற்றை மற்ற ஒப்பந்தங்களிலிருந்தும் பரிவர்த்தனைகள் வழியாகவும் அழைக்கலாம். ஒரு வெளிப்புற செயல்பாடு `f` ஐ உள்வழியாக அழைக்க முடியாது (அதாவது, `f()` வேலை செய்யாது, ஆனால் `this.f()` வேலை செய்யும்).

அவை `public` அல்லது `private` ஆகவும் இருக்கலாம்

- `public` செயல்பாடுகளை ஒப்பந்தத்திற்குள் இருந்தே உள்வழியாகவோ அல்லது செய்திகள் மூலம் வெளிப்புறமாகவோ அழைக்கப்படலாம்
- `private` செயல்பாடுகள் அவை வரையறுக்கப்பட்ட ஒப்பந்தத்திற்கு மட்டுமே தெரியும் மற்றும் பெறப்பட்ட ஒப்பந்தங்களில் தெரியாது

செயல்பாடுகள் மற்றும் நிலை மாறிகள் இரண்டையும் பொது அல்லது தனியாராக ஆக்கலாம்

ஒரு ஒப்பந்தத்தில் ஒரு நிலை மாறியைப் புதுப்பிப்பதற்கான ஒரு செயல்பாடு இங்கே உள்ளது:

```solidity
// சொலிடிட்டி எடுத்துக்காட்டு
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` வகையின் `value` என்ற அளவுரு `update_name` என்ற செயல்பாட்டிற்கு அனுப்பப்படுகிறது
- இது `public` என அறிவிக்கப்பட்டுள்ளது, அதாவது யார் வேண்டுமானாலும் அதை அணுகலாம்
- இது `view` என அறிவிக்கப்படவில்லை, எனவே இது ஒப்பந்த நிலையை மாற்றியமைக்க முடியும்

### காட்சி செயல்பாடுகள் {#view-functions}

இந்த செயல்பாடுகள் ஒப்பந்தத்தின் தரவு நிலையை மாற்றியமைக்காது என்று உறுதியளிக்கின்றன. பொதுவான எடுத்துக்காட்டுகள் "getter" செயல்பாடுகள் ஆகும் – எடுத்துக்காட்டாக, ஒரு பயனரின் இருப்பைப் பெற இதைப் பயன்படுத்தலாம்.

```solidity
// சொலிடிட்டி எடுத்துக்காட்டு
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

நிலையை மாற்றுவதாகக் கருதப்படுபவை:

1. நிலை மாறிகளில் எழுதுதல்.
2. [நிகழ்வுகளை வெளியிடுதல்](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [பிற ஒப்பந்தங்களை உருவாக்குதல்](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct`-ஐப் பயன்படுத்துதல்.
5. அழைப்புகள் மூலம் ஈதரை அனுப்புதல்.
6. `view` அல்லது `pure` எனக் குறிக்கப்படாத எந்தச் செயல்பாட்டையும் அழைத்தல்.
7. தாழ்-நிலை அழைப்புகளைப் பயன்படுத்துதல்.
8. குறிப்பிட்ட ஆப்கோடுகளைக் கொண்டிருக்கும் இன்லைன் அசெம்பிளியைப் பயன்படுத்துதல்.

### உருவாக்கிச் செயல்பாடுகள் {#constructor-functions}

`constructor` செயல்பாடுகள் ஒப்பந்தம் முதலில் வரிசைப்படுத்தப்படும்போது ஒருமுறை மட்டுமே செயல்படுத்தப்படுகின்றன. பல வகுப்பு-அடிப்படையிலான நிரலாக்க மொழிகளில் உள்ள `constructor` போலவே, இந்தச் செயல்பாடுகள் பெரும்பாலும் நிலை மாறிகளை அவற்றின் குறிப்பிட்ட மதிப்புகளுக்கு துவக்குகின்றன.

```solidity
// சொலிடிட்டி எடுத்துக்காட்டு
// ஒப்பந்தத்தின் தரவைத் துவக்கி, `owner`-ஐ அமைக்கிறது
// ஒப்பந்தத்தை உருவாக்கியவரின் முகவரிக்கு.
constructor() public {
    // அனைத்து ஸ்மார்ட் ஒப்பந்தங்களும் அவற்றின் செயல்பாடுகளைத் தூண்டுவதற்கு வெளிப்புற பரிவர்த்தனைகளைச் சார்ந்துள்ளன.
    // `msg` என்பது கொடுக்கப்பட்ட பரிவர்த்தனையில் தொடர்புடைய தரவை உள்ளடக்கிய ஒரு உலகளாவிய மாறி,
    // அனுப்புநரின் முகவரி மற்றும் பரிவர்த்தனையில் சேர்க்கப்பட்டுள்ள ETH மதிப்பு போன்றவை.
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# வைப்பர் எடுத்துக்காட்டு

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### உள்ளமைக்கப்பட்ட செயல்பாடுகள் {#built-in-functions}

உங்கள் ஒப்பந்தத்தில் நீங்கள் வரையறுக்கும் மாறிகள் மற்றும் செயல்பாடுகளுக்கு கூடுதலாக, சில சிறப்பு உள்ளமைக்கப்பட்ட செயல்பாடுகள் உள்ளன. மிகவும் தெளிவான உதாரணம்:

- `address.send()` – சொலிடிட்டி
- `send(address)` – வைப்பர்

இவை ஒப்பந்தங்கள் பிற கணக்குகளுக்கு ETH அனுப்ப அனுமதிக்கின்றன.

## செயல்பாடுகளை எழுதுதல் {#writing-functions}

உங்கள் செயல்பாட்டிற்குத் தேவை:

- அளவுரு மாறி மற்றும் வகை (அது அளவுருக்களை ஏற்றுக்கொண்டால்)
- உள்ளக/வெளிப்புற அறிவிப்பு
- pure/view/payable-இன் அறிவிப்பு
- திரும்பும் வகை (அது ஒரு மதிப்பைத் திருப்பினால்)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // நிலை மாறி

    // ஒப்பந்தம் வரிசைப்படுத்தப்படும்போது அழைக்கப்பட்டு மதிப்பை துவக்குகிறது
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // பெறுவதற்கான செயல்பாடு
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // அமைப்பதற்கான செயல்பாடு
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

ஒரு முழுமையான ஒப்பந்தம் இதுபோல இருக்கலாம். இங்கே `constructor` செயல்பாடு `dapp_name` மாறிக்கு ஒரு ஆரம்ப மதிப்பை வழங்குகிறது.

## நிகழ்வுகள் மற்றும் பதிவுகள் {#events-and-logs}

நிகழ்வுகள் உங்கள் ஸ்மார்ட் ஒப்பந்தம் உங்கள் முன்பக்கம் அல்லது பிற சந்தா செலுத்தும் பயன்பாடுகளுடன் தொடர்பு கொள்ள உதவுகின்றன. ஒரு பரிவர்த்தனை சரிபார்க்கப்பட்டு ஒரு பிளாக்கில் சேர்க்கப்பட்டவுடன், ஸ்மார்ட் ஒப்பந்தங்கள் நிகழ்வுகளை வெளியிடலாம் மற்றும் தகவல்களைப் பதிவு செய்யலாம், அவற்றை முன்பக்கம் பின்னர் செயலாக்கிப் பயன்படுத்தலாம்.

## குறிப்புரைக்கப்பட்ட எடுத்துக்காட்டுகள் {#annotated-examples}

இவை சொலிடிட்டியில் எழுதப்பட்ட சில எடுத்துக்காட்டுகள். நீங்கள் குறியீட்டுடன் விளையாட விரும்பினால், [Remix](http://remix.ethereum.org)-இல் அவற்றுடன் தொடர்பு கொள்ளலாம்.

### ஹலோ வேர்ல்ட் {#hello-world}

```solidity
// சொலிடிட்டியின் பதிப்பைக் குறிப்பிடுகிறது, சொற்பொருள் பதிப்பைப் பயன்படுத்துகிறது.
// மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` என்ற பெயரில் ஒரு ஒப்பந்தத்தை வரையறுக்கிறது.
// ஒரு ஒப்பந்தம் என்பது செயல்பாடுகள் மற்றும் தரவுகளின் (அதன் நிலை) தொகுப்பாகும்.
// வரிசைப்படுத்தப்பட்டதும், ஒரு ஒப்பந்தம் எத்தேரியம் பிளாக்செயினில் ஒரு குறிப்பிட்ட முகவரியில் இருக்கும்.
// மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` வகையின் `message` என்ற நிலை மாறியை அறிவிக்கிறது.
    // நிலை மாறிகள் என்பவை ஒப்பந்தச் சேமிப்பகத்தில் நிரந்தரமாக சேமிக்கப்படும் மதிப்புகளைக் கொண்ட மாறிகள்.
    // `public` என்ற திறவுச்சொல் மாறிகளை ஒரு ஒப்பந்தத்திற்கு வெளியே இருந்து அணுகக்கூடியதாக ஆக்குகிறது
    // மேலும் மதிப்பை அணுகுவதற்காக மற்ற ஒப்பந்தங்கள் அல்லது வாடிக்கையாளர்கள் அழைக்கக்கூடிய ஒரு செயல்பாட்டை உருவாக்குகிறது.
    string public message;

    // பல வகுப்பு அடிப்படையிலான பொருள் சார்ந்த மொழிகளைப் போலவே, ஒரு கன்ஸ்ட்ரக்டர் என்பது
    // ஒப்பந்தம் உருவாக்கப்படும்போது மட்டுமே செயல்படுத்தப்படும் ஒரு சிறப்பு செயல்பாடு.
    // ஒப்பந்தத்தின் தரவைத் துவக்க கன்ஸ்ட்ரக்டர்கள் பயன்படுத்தப்படுகின்றன.
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // `initMessage` என்ற ஒரு சர வாதத்தை ஏற்றுக்கொண்டு மதிப்பை அமைக்கிறது
        // ஒப்பந்தத்தின் `message` சேமிப்பக மாறிக்குள்).
        message = initMessage;
    }

    // ஒரு சர வாதத்தை ஏற்கும் ஒரு பொதுச் செயல்பாடு
    // மற்றும் `message` சேமிப்பக மாறியைப் புதுப்பிக்கிறது.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### டோக்கன் {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // ஒரு `address` என்பது மின்னஞ்சல் முகவரியுடன் ஒப்பிடத்தக்கது - இது எத்தேரியத்தில் ஒரு கணக்கை அடையாளம் காணப் பயன்படுகிறது.
    // முகவரிகள் ஒரு ஸ்மார்ட் ஒப்பந்தம் அல்லது ஒரு வெளிப்புற (பயனர்) கணக்குகளைக் குறிக்கலாம்.
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // ஒரு `mapping` என்பது அடிப்படையில் ஒரு ஹாஷ் அட்டவணை தரவுக் கட்டமைப்பாகும்.
    // இந்த `mapping` ஒரு கையொப்பமிடப்படாத முழு எண்ணை (டோக்கன் இருப்பு) ஒரு முகவரிக்கு (டோக்கன் வைத்திருப்பவர்) ஒதுக்குகிறது.
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // நிகழ்வுகள் பிளாக்செயினில் செயல்பாட்டைப் பதிவு செய்ய அனுமதிக்கின்றன.
    // எத்தேரியம் வாடிக்கையாளர்கள் ஒப்பந்த நிலை மாற்றங்களுக்கு வினைபுரிய நிகழ்வுகளைக் கேட்கலாம்.
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // ஒப்பந்தத்தின் தரவைத் துவக்கி, `owner`-ஐ அமைக்கிறது
    // ஒப்பந்தத்தை உருவாக்கியவரின் முகவரிக்கு.
    constructor() public {
        // அனைத்து ஸ்மார்ட் ஒப்பந்தங்களும் அவற்றின் செயல்பாடுகளைத் தூண்டுவதற்கு வெளிப்புற பரிவர்த்தனைகளைச் சார்ந்துள்ளன.
        // `msg` என்பது கொடுக்கப்பட்ட பரிவர்த்தனையில் தொடர்புடைய தரவை உள்ளடக்கிய ஒரு உலகளாவிய மாறி,
        // அனுப்புநரின் முகவரி மற்றும் பரிவர்த்தனையில் சேர்க்கப்பட்டுள்ள ETH மதிப்பு போன்றவை.
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // புதிய டோக்கன்களின் ஒரு அளவை உருவாக்கி அவற்றை ஒரு முகவரிக்கு அனுப்புகிறது.
    function mint(address receiver, uint amount) public {
        // `require` என்பது சில நிபந்தனைகளைச் செயல்படுத்தப் பயன்படும் ஒரு கட்டுப்பாட்டுக் கட்டமைப்பாகும்.
        // ஒரு `require` அறிக்கை `false` என மதிப்பிடப்பட்டால், ஒரு விதிவிலக்கு தூண்டப்படுகிறது,
        // இது தற்போதைய அழைப்பின் போது நிலையில் செய்யப்பட்ட அனைத்து மாற்றங்களையும் மாற்றியமைக்கிறது.
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // ஒப்பந்த உரிமையாளர் மட்டுமே இந்தச் செயல்பாட்டை அழைக்க முடியும்
        require(msg.sender == owner, "You are not the owner.");

        // டோக்கன்களின் அதிகபட்ச அளவைச் செயல்படுத்துகிறது
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver`-இன் இருப்பை `amount` ஆல் அதிகரிக்கிறது
        balances[receiver] += amount;
    }

    // ஏற்கனவே உள்ள டோக்கன்களின் ஒரு அளவை எந்தவொரு அழைப்பாளரிடமிருந்தும் ஒரு முகவரிக்கு அனுப்புகிறது.
    function transfer(address receiver, uint amount) public {
        // அனுப்புநரிடம் அனுப்ப போதுமான டோக்கன்கள் இருக்க வேண்டும்
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // இரண்டு முகவரிகளின் டோக்கன் இருப்புகளைச் சரிசெய்கிறது
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // முன்பு வரையறுக்கப்பட்ட நிகழ்வை வெளியிடுகிறது
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### தனித்துவமான டிஜிட்டல் சொத்து {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// மற்ற கோப்புகளிலிருந்து சின்னங்களை தற்போதைய ஒப்பந்தத்திற்குள் இறக்குமதி செய்கிறது.
// இந்த விஷயத்தில், OpenZeppelin-இல் இருந்து ஒரு தொடர் உதவி ஒப்பந்தங்கள்.
// மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` என்ற திறவுச்சொல் வெளிப்புற ஒப்பந்தங்களிலிருந்து செயல்பாடுகள் மற்றும் திறவுச்சொற்களைப் பெறப் பயன்படுகிறது.
// இந்த விஷயத்தில், `CryptoPizza` `IERC721` மற்றும் `ERC165` ஒப்பந்தங்களிலிருந்து பெறப்படுகிறது.
// மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // எண்கணித செயல்பாடுகளைப் பாதுகாப்பாகச் செய்ய OpenZeppelin-இன் SafeMath நூலகத்தைப் பயன்படுத்துகிறது.
    // மேலும் அறிக: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // சொலிடிட்டியில் உள்ள நிலையான நிலை மாறிகள் மற்ற மொழிகளைப் போலவே இருக்கும்
    // ஆனால் நீங்கள் தொகுக்கும் நேரத்தில் நிலையானதாக இருக்கும் ஒரு கோவையிலிருந்து ஒதுக்க வேண்டும்.
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // அமைப்பு வகைகள் உங்கள் சொந்த வகையை வரையறுக்க உங்களை அனுமதிக்கின்றன
    // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // பிஸ்ஸா அமைப்புகளின் வெற்று வரிசையை உருவாக்குகிறது
    Pizza[] public pizzas;

    // பிஸ்ஸா ஐடியிலிருந்து அதன் உரிமையாளரின் முகவரிக்கு மேப்பிங்
    mapping(uint256 => address) public pizzaToOwner;

    // உரிமையாளரின் முகவரியிலிருந்து சொந்தமான டோக்கன்களின் எண்ணிக்கைக்கு மேப்பிங்
    mapping(address => uint256) public ownerPizzaCount;

    // டோக்கன் ஐடியிலிருந்து அங்கீகரிக்கப்பட்ட முகவரிக்கு மேப்பிங்
    mapping(uint256 => address) pizzaApprovals;

    // நீங்கள் மேப்பிங்குகளை உள்ளடக்கலாம், இந்த எடுத்துக்காட்டு உரிமையாளரை ஆபரேட்டர் ஒப்புதல்களுக்கு மேப் செய்கிறது
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // சரம் (பெயர்) மற்றும் டிஎன்ஏவிலிருந்து ஒரு சீரற்ற பிஸ்ஸாவை உருவாக்க உள்ளக செயல்பாடு
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` என்ற திறவுச்சொல் இந்தச் செயல்பாடு மட்டுமே தெரியும் என்று பொருள்
        // இந்த ஒப்பந்தம் மற்றும் இந்த ஒப்பந்தத்திலிருந்து பெறப்பட்ட ஒப்பந்தங்களுக்குள்
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` என்பது பிஸ்ஸா ஏற்கனவே உள்ளதா என்று சரிபார்க்கும் ஒரு செயல்பாடு மாற்றியாகும்
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // பிஸ்ஸா வரிசையில் பிஸ்ஸாவைச் சேர்த்து ஐடியைப் பெறுகிறது
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // பிஸ்ஸா உரிமையாளர் தற்போதைய பயனருடன் ஒரே மாதிரியாக இருக்கிறார் என்பதைச் சரிபார்க்கிறது
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // முகவரி(0) என்பது பூஜ்ஜிய முகவரி என்பதை நினைவில் கொள்க,
        // இது pizza[id] இன்னும் ஒரு குறிப்பிட்ட பயனருக்கு ஒதுக்கப்படவில்லை என்பதைக் குறிக்கிறது.

        assert(pizzaToOwner[id] == address(0));

        // பிஸ்ஸாவை உரிமையாளருக்கு வரைபடமாக்குகிறது
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // சரத்திலிருந்து (பெயர்) ஒரு சீரற்ற பிஸ்ஸாவை உருவாக்குகிறது
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // சரம் (பெயர்) மற்றும் உரிமையாளரின் (உருவாக்குபவர்) முகவரியிலிருந்து சீரற்ற டிஎன்ஏவை உருவாக்குகிறது
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` எனக் குறிக்கப்பட்ட செயல்பாடுகள் நிலையிலிருந்து படிக்கவோ அல்லது மாற்றவோ மாட்டோம் என்று உறுதியளிக்கின்றன
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // சரம் (பெயர்) + முகவரி (உரிமையாளர்) இலிருந்து சீரற்ற uint-ஐ உருவாக்குகிறது
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // உரிமையாளரால் கண்டறியப்பட்ட பிஸ்ஸாக்களின் வரிசையைத் திருப்புகிறது
    function getPizzasByOwner(address _owner)
        public
        // `view` எனக் குறிக்கப்பட்ட செயல்பாடுகள் நிலையை மாற்றியமைக்காது என்று உறுதியளிக்கின்றன
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // மதிப்புகளைச் சேமிப்பதற்காக `memory` சேமிப்பக இருப்பிடத்தைப் பயன்படுத்துகிறது
        // இந்தச் செயல்பாட்டு அழைப்பின் வாழ்நாள் சுழற்சி.
        // மேலும் அறிக: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // பிஸ்ஸா மற்றும் உரிமையை மற்றொரு முகவரிக்கு மாற்றுகிறது
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // இறக்குமதி செய்யப்பட்ட IERC721 ஒப்பந்தத்தில் வரையறுக்கப்பட்ட நிகழ்வை வெளியிடுகிறது
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * கொடுக்கப்பட்ட டோக்கன் ஐடியின் உரிமையை மற்றொரு முகவரிக்கு பாதுகாப்பாக மாற்றுகிறது
     * இலக்கு முகவரி ஒரு ஒப்பந்தமாக இருந்தால், அது `onERC721Received` என்பதை செயல்படுத்த வேண்டும்,
     * இது பாதுகாப்பான பரிமாற்றத்தின் போது அழைக்கப்பட்டு, மாய மதிப்பைத் திருப்புகிறது
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * இல்லையெனில், பரிமாற்றம் மாற்றியமைக்கப்படுகிறது.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * கொடுக்கப்பட்ட டோக்கன் ஐடியின் உரிமையை மற்றொரு முகவரிக்கு பாதுகாப்பாக மாற்றுகிறது
     * இலக்கு முகவரி ஒரு ஒப்பந்தமாக இருந்தால், அது `onERC721Received` என்பதை செயல்படுத்த வேண்டும்,
     * இது பாதுகாப்பான பரிமாற்றத்தின் போது அழைக்கப்பட்டு, மாய மதிப்பைத் திருப்புகிறது
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * இல்லையெனில், பரிமாற்றம் மாற்றியமைக்கப்படுகிறது.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * இலக்கு முகவரியில் `onERC721Received` ஐ அழைக்க உள்ளக செயல்பாடு
     * இலக்கு முகவரி ஒரு ஒப்பந்தம் இல்லையென்றால் அழைப்பு செயல்படுத்தப்படாது
     */
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

    // ஒரு பிஸ்ஸாவை எரிக்கிறது - டோக்கனை முழுமையாக அழிக்கிறது
    // `external` செயல்பாடு மாற்றி என்பது இந்தச் செயல்பாடு
    // ஒப்பந்த இடைமுகத்தின் ஒரு பகுதியாகும், மற்ற ஒப்பந்தங்கள் அதை அழைக்கலாம்
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

    // முகவரி மூலம் பிஸ்ஸாக்களின் எண்ணிக்கையைத் திருப்புகிறது
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // ஐடி மூலம் கண்டறியப்பட்ட பிஸ்ஸாவின் உரிமையாளரைத் திருப்புகிறது
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // பிஸ்ஸாவின் உரிமையை மாற்றுவதற்கு மற்றொரு முகவரியை அங்கீகரிக்கிறது
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // குறிப்பிட்ட பிஸ்ஸாவிற்கு அங்கீகரிக்கப்பட்ட முகவரியைத் திருப்புகிறது
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * கொடுக்கப்பட்ட டோக்கன் ஐடியின் தற்போதைய ஒப்புதலை அழிக்க தனிப்பட்ட செயல்பாடு
     * கொடுக்கப்பட்ட முகவரி உண்மையில் டோக்கனின் உரிமையாளர் இல்லையென்றால் மாற்றியமைக்கிறது
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * கொடுக்கப்பட்ட ஆபரேட்டரின் ஒப்புதலை அமைக்கிறது அல்லது நீக்குகிறது
     * ஒரு ஆபரேட்டர் தங்கள் சார்பாக அனுப்புநரின் அனைத்து டோக்கன்களையும் மாற்ற அனுமதிக்கப்படுகிறார்
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // கொடுக்கப்பட்ட உரிமையாளரால் ஒரு ஆபரேட்டர் அங்கீகரிக்கப்பட்டுள்ளாரா என்பதைக் கூறுகிறது
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // பிஸ்ஸாவின் உரிமையை எடுக்கிறது - அங்கீகரிக்கப்பட்ட பயனர்களுக்கு மட்டுமே
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // பிஸ்ஸா இருக்கிறதா என்று சரிபார்க்கிறது
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // முகவரி உரிமையாளரா அல்லது பிஸ்ஸாவை மாற்ற அங்கீகரிக்கப்பட்டுள்ளதா என்று சரிபார்க்கிறது
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Solium சரிபார்ப்பை முடக்கு, ஏனெனில்
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // பிஸ்ஸா தனித்துவமானதா மற்றும் இன்னும் இல்லை என்பதைச் சரிபார்க்கவும்
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

    // இலக்கு முகவரி ஒரு ஒப்பந்தமா இல்லையா என்பதைத் திருப்புகிறது
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // தற்போது ஒரு முகவரியில் ஒரு ஒப்பந்தம் உள்ளதா என்பதை சரிபார்க்க இதைவிட சிறந்த வழி இல்லை
        // அந்த முகவரியில் உள்ள குறியீட்டின் அளவை சரிபார்ப்பதை விட.
        // இது எப்படி வேலை செய்கிறது என்பது பற்றிய மேலும் விவரங்களுக்கு https://ethereum.stackexchange.com/a/14016/36603-ஐப் பார்க்கவும்.
        // TODO செரினிட்டி வெளியீட்டிற்கு முன் இதை மீண்டும் சரிபார்க்கவும், ஏனெனில் அப்போது அனைத்து முகவரிகளும்
        // ஒப்பந்தங்களாக இருக்கும்.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## மேலும் வாசிக்க {#further-reading}

ஸ்மார்ட் ஒப்பந்தங்கள் பற்றிய முழுமையான மேலோட்டத்திற்கு சொலிடிட்டி மற்றும் வைப்பரின் ஆவணங்களைப் பார்க்கவும்:

- [சொலிடிட்டி](https://docs.soliditylang.org/)
- [வைப்பர்](https://docs.vyperlang.org/en/stable/)

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [எத்தேரியம் மெய்நிகர் இயந்திரம்](/developers/docs/evm/)

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [ஒப்பந்த அளவு வரம்பை எதிர்த்துப் போராட ஒப்பந்தங்களைக் குறைத்தல்](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– உங்கள் ஸ்மார்ட் ஒப்பந்தத்தின் அளவைக் குறைப்பதற்கான சில நடைமுறை உதவிக்குறிப்புகள்._
- [நிகழ்வுகளுடன் ஸ்மார்ட் ஒப்பந்தங்களிலிருந்து தரவைப் பதிவுசெய்தல்](/developers/tutorials/logging-events-smart-contracts/) _– ஸ்மார்ட் ஒப்பந்த நிகழ்வுகள் மற்றும் தரவைப் பதிவு செய்ய அவற்றை எவ்வாறு பயன்படுத்தலாம் என்பதற்கான ஒரு அறிமுகம்._
- [சொலிடிட்டியில் இருந்து பிற ஒப்பந்தங்களுடன் தொடர்புகொள்வது](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– ஏற்கனவே உள்ள ஒப்பந்தத்திலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு வரிசைப்படுத்துவது மற்றும் அதனுடன் தொடர்புகொள்வது._
