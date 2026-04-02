---
title: "ஸ்மார்ட் ஒப்பந்தங்களைச் சோதிக்க Echidna-ஐ எவ்வாறு பயன்படுத்துவது"
description: "ஸ்மார்ட் ஒப்பந்தங்களைத் தானாகச் சோதிக்க Echidna-ஐ எவ்வாறு பயன்படுத்துவது"
author: "ட்ரெயில்ஆஃப்பிட்ஸ்"
lang: ta
tags: ["Solidity", "ஸ்மார்ட் ஒப்பந்தங்கள்", "பாதுகாப்பு", "சோதனை", "ஃபஸ்ஸிங்"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## நிறுவல் {#installation}

Echidna-ஐ docker மூலமாகவோ அல்லது முன்-தொகுக்கப்பட்ட பைனரியைப் பயன்படுத்தியோ நிறுவலாம்.

### docker மூலம் Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_கடைசி கட்டளை eth-security-toolbox-ஐ உங்கள் தற்போதைய கோப்பகத்திற்கான அணுகலைக் கொண்ட ஒரு docker-இல் இயக்குகிறது. உங்கள் ஹோஸ்டிலிருந்து கோப்புகளை மாற்றலாம், மேலும் docker-இலிருந்து கோப்புகளில் கருவிகளை இயக்கலாம்_

docker-இன் உள்ளே, இயக்கவும்:

```bash
solc-select 0.5.11
cd /home/training
```

### பைனரி {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## பண்பு அடிப்படையிலான ஃபஸ்ஸிங் அறிமுகம் {#introduction-to-property-based-fuzzing}

Echidna என்பது ஒரு பண்பு அடிப்படையிலான ஃபஸ்ஸர் (fuzzer) ஆகும், இதை எங்கள் முந்தைய வலைப்பதிவுகளில் விவரித்துள்ளோம் ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### ஃபஸ்ஸிங் {#fuzzing}

[ஃபஸ்ஸிங் (Fuzzing)](https://wikipedia.org/wiki/Fuzzing) என்பது பாதுகாப்பு சமூகத்தில் நன்கு அறியப்பட்ட ஒரு நுட்பமாகும். இது நிரலில் உள்ள பிழைகளைக் கண்டறிய அதிகமாகவோ அல்லது குறைவாகவோ சீரற்ற உள்ளீடுகளை உருவாக்குவதைக் கொண்டுள்ளது. பாரம்பரிய மென்பொருளுக்கான ஃபஸ்ஸர்கள் ([AFL](http://lcamtuf.coredump.cx/afl/) அல்லது [LibFuzzer](https://llvm.org/docs/LibFuzzer.html) போன்றவை) பிழைகளைக் கண்டறியும் திறமையான கருவிகளாக அறியப்படுகின்றன.

உள்ளீடுகளை முற்றிலும் சீரற்ற முறையில் உருவாக்குவதைத் தாண்டி, நல்ல உள்ளீடுகளை உருவாக்க பல நுட்பங்களும் உத்திகளும் உள்ளன, அவற்றுள்:

- ஒவ்வொரு செயல்பாட்டிலிருந்தும் பின்னூட்டத்தைப் பெற்று, அதைப் பயன்படுத்தி உருவாக்கத்தை வழிநடத்துதல். எடுத்துக்காட்டாக, புதிதாக உருவாக்கப்பட்ட உள்ளீடு ஒரு புதிய பாதையைக் கண்டறிய வழிவகுத்தால், அதற்கு நெருக்கமான புதிய உள்ளீடுகளை உருவாக்குவது அர்த்தமுள்ளதாக இருக்கும்.
- கட்டமைப்பு கட்டுப்பாட்டை மதித்து உள்ளீட்டை உருவாக்குதல். எடுத்துக்காட்டாக, உங்கள் உள்ளீட்டில் செக்சம் (checksum) கொண்ட தலைப்பு இருந்தால், செக்சம்-ஐ சரிபார்க்கும் உள்ளீட்டை ஃபஸ்ஸரை உருவாக்க அனுமதிப்பது அர்த்தமுள்ளதாக இருக்கும்.
- புதிய உள்ளீடுகளை உருவாக்க அறியப்பட்ட உள்ளீடுகளைப் பயன்படுத்துதல்: சரியான உள்ளீட்டின் பெரிய தரவுத்தொகுப்பிற்கான அணுகல் உங்களிடம் இருந்தால், உங்கள் ஃபஸ்ஸர் புதிதாக உருவாக்குவதைத் தொடங்குவதற்குப் பதிலாக, அவற்றிலிருந்து புதிய உள்ளீடுகளை உருவாக்க முடியும். இவை பொதுவாக _விதைகள் (seeds)_ என்று அழைக்கப்படுகின்றன.

### பண்பு அடிப்படையிலான ஃபஸ்ஸிங் {#property-based-fuzzing}

Echidna ஒரு குறிப்பிட்ட ஃபஸ்ஸர் குடும்பத்தைச் சேர்ந்தது: [QuickCheck](https://wikipedia.org/wiki/QuickCheck)-ஆல் பெரிதும் ஈர்க்கப்பட்ட பண்பு அடிப்படையிலான ஃபஸ்ஸிங். செயலிழப்புகளைக் கண்டறிய முயற்சிக்கும் கிளாசிக் ஃபஸ்ஸருக்கு மாறாக, Echidna பயனர் வரையறுத்த மாறிலிகளை (invariants) உடைக்க முயற்சிக்கும்.

ஸ்மார்ட் ஒப்பந்தங்களில், மாறிலிகள் என்பவை Solidity சார்புகள் ஆகும், அவை ஒப்பந்தம் அடையக்கூடிய எந்தவொரு தவறான அல்லது செல்லாத நிலையையும் குறிக்கலாம், அவற்றுள்:

- தவறான அணுகல் கட்டுப்பாடு: தாக்குபவர் ஒப்பந்தத்தின் உரிமையாளராகிவிட்டார்.
- தவறான நிலை இயந்திரம்: ஒப்பந்தம் இடைநிறுத்தப்பட்டிருக்கும் போது டோக்கன்களை மாற்ற முடியும்.
- தவறான எண்கணிதம்: பயனர் தனது இருப்பை அண்டர்ஃப்ளோ (underflow) செய்து வரம்பற்ற இலவச டோக்கன்களைப் பெறலாம்.

### Echidna மூலம் ஒரு பண்பைச் சோதித்தல் {#testing-a-property-with-echidna}

Echidna மூலம் ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு சோதிப்பது என்பதைப் பார்ப்போம். இலக்கு பின்வரும் ஸ்மார்ட் ஒப்பந்தம் [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

இந்த டோக்கன் பின்வரும் பண்புகளைக் கொண்டிருக்க வேண்டும் என்று நாம் கருதுவோம்:

- எவரும் அதிகபட்சமாக 1000 டோக்கன்களை வைத்திருக்கலாம்
- டோக்கனை மாற்ற முடியாது (இது ERC-20 டோக்கன் அல்ல)

### ஒரு பண்பை எழுதுதல் {#write-a-property}

Echidna பண்புகள் Solidity சார்புகள் ஆகும். ஒரு பண்பு:

- எந்த வாதமும் (argument) கொண்டிருக்கக்கூடாது
- அது வெற்றிகரமாக இருந்தால் `true` எனத் திரும்ப வேண்டும்
- அதன் பெயர் `echidna` என்று தொடங்க வேண்டும்

Echidna செய்யும் செயல்கள்:

- பண்பைச் சோதிக்க தன்னிச்சையான பரிவர்த்தனைகளைத் தானாகவே உருவாக்கும்.
- ஒரு பண்பு `false` எனத் திரும்ப அல்லது பிழையை எறிய வழிவகுக்கும் எந்தவொரு பரிவர்த்தனைகளையும் புகாரளிக்கும்.
- ஒரு பண்பை அழைக்கும் போது பக்க விளைவுகளை நிராகரிக்கும் (அதாவது, பண்பு ஒரு நிலை மாறியை மாற்றினால், அது சோதனைக்குப் பிறகு நிராகரிக்கப்படும்)

அழைப்பாளர் 1000 டோக்கன்களுக்கு மேல் வைத்திருக்கவில்லை என்பதைப் பின்வரும் பண்பு சரிபார்க்கிறது:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

உங்கள் பண்புகளிலிருந்து உங்கள் ஒப்பந்தத்தைப் பிரிக்க மரபுரிமையைப் (inheritance) பயன்படுத்தவும்:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) பண்பைச் செயல்படுத்துகிறது மற்றும் டோக்கனிலிருந்து மரபுரிமையாகப் பெறுகிறது.

### ஒரு ஒப்பந்தத்தைத் தொடங்குதல் {#initiate-a-contract}

Echidna-க்கு வாதம் இல்லாத ஒரு [கட்டமைப்பாளர் (constructor)](/developers/docs/smart-contracts/anatomy/#constructor-functions) தேவை. உங்கள் ஒப்பந்தத்திற்கு ஒரு குறிப்பிட்ட துவக்கம் தேவைப்பட்டால், நீங்கள் அதை கட்டமைப்பாளரில் செய்ய வேண்டும்.

Echidna-இல் சில குறிப்பிட்ட முகவரிகள் உள்ளன:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` இது கட்டமைப்பாளரை அழைக்கிறது.
- `0x10000`, `0x20000`, மற்றும் `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` இவை மற்ற சார்புகளைச் சீரற்ற முறையில் அழைக்கின்றன.

எங்கள் தற்போதைய எடுத்துக்காட்டில் எங்களுக்கு எந்த குறிப்பிட்ட துவக்கமும் தேவையில்லை, இதன் விளைவாக எங்கள் கட்டமைப்பாளர் காலியாக உள்ளது.

### Echidna-ஐ இயக்குதல் {#run-echidna}

Echidna இதனுடன் தொடங்கப்படுகிறது:

```bash
echidna-test contract.sol
```

contract.sol பல ஒப்பந்தங்களைக் கொண்டிருந்தால், நீங்கள் இலக்கைக் குறிப்பிடலாம்:

```bash
echidna-test contract.sol --contract MyContract
```

### சுருக்கம்: ஒரு பண்பைச் சோதித்தல் {#summary-testing-a-property}

பின்வருபவை எங்கள் எடுத்துக்காட்டில் echidna-இன் ஓட்டத்தை சுருக்கமாகக் கூறுகின்றன:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

`backdoor` அழைக்கப்பட்டால் பண்பு மீறப்படுவதை Echidna கண்டறிந்தது.

## ஃபஸ்ஸிங் பிரச்சாரத்தின் போது அழைக்க வேண்டிய சார்புகளை வடிகட்டுதல் {#filtering-functions-to-call-during-a-fuzzing-campaign}

ஃபஸ் செய்ய வேண்டிய சார்புகளை எவ்வாறு வடிகட்டுவது என்பதைப் பார்ப்போம்.
இலக்கு பின்வரும் ஸ்மார்ட் ஒப்பந்தம்:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

இந்த சிறிய எடுத்துக்காட்டு ஒரு நிலை மாறியை மாற்ற ஒரு குறிப்பிட்ட பரிவர்த்தனைகளின் வரிசையைக் கண்டறிய Echidna-ஐ கட்டாயப்படுத்துகிறது.
இது ஒரு ஃபஸ்ஸருக்கு கடினமானது ([Manticore](https://github.com/trailofbits/manticore) போன்ற குறியீட்டு செயலாக்கக் கருவியைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது).
இதைச் சரிபார்க்க நாம் Echidna-ஐ இயக்கலாம்:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### சார்புகளை வடிகட்டுதல் {#filtering-functions}

இந்த ஒப்பந்தத்தைச் சோதிக்க சரியான வரிசையைக் கண்டறிவதில் Echidna சிக்கலைக் கொண்டுள்ளது, ஏனெனில் இரண்டு மீட்டமைப்பு சார்புகளும் (`reset1` மற்றும் `reset2`) அனைத்து நிலை மாறிகளையும் `false` என அமைக்கும்.
இருப்பினும், மீட்டமைப்பு சார்பை தடுப்புப்பட்டியலில் (blacklist) சேர்க்க அல்லது `f`, `g`, `h` மற்றும் `i` சார்புகளை மட்டும் அனுமதிப்பட்டியலில் (whitelist) சேர்க்க ஒரு சிறப்பு Echidna அம்சத்தைப் பயன்படுத்தலாம்.

சார்புகளைத் தடுப்புப்பட்டியலில் சேர்க்க, இந்த உள்ளமைவு கோப்பைப் பயன்படுத்தலாம்:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

சார்புகளை வடிகட்டுவதற்கான மற்றொரு அணுகுமுறை அனுமதிப்பட்டியலில் உள்ள சார்புகளைப் பட்டியலிடுவதாகும். அதைச் செய்ய, இந்த உள்ளமைவு கோப்பைப் பயன்படுத்தலாம்:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` இயல்பாகவே `true` ஆக இருக்கும்.
- வடிகட்டுதல் பெயரால் மட்டுமே செய்யப்படும் (அளவுருக்கள் இல்லாமல்). உங்களிடம் `f()` மற்றும் `f(uint256)` இருந்தால், `"f"` வடிப்பான் இரண்டு சார்புகளுடனும் பொருந்தும்.

### Echidna-ஐ இயக்குதல் {#run-echidna-1}

`blacklist.yaml` உள்ளமைவு கோப்புடன் Echidna-ஐ இயக்க:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

பண்பைப் பொய்யாக்குவதற்கான பரிவர்த்தனைகளின் வரிசையை Echidna உடனடியாகக் கண்டறியும்.

### சுருக்கம்: சார்புகளை வடிகட்டுதல் {#summary-filtering-functions}

Echidna இதைப் பயன்படுத்தி ஃபஸ்ஸிங் பிரச்சாரத்தின் போது அழைக்க வேண்டிய சார்புகளைத் தடுப்புப்பட்டியலில் அல்லது அனுமதிப்பட்டியலில் சேர்க்கலாம்:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

`filterBlacklist` பூலியனின் மதிப்பைப் பொறுத்து, `f1`, `f2` மற்றும் `f3` ஆகியவற்றைத் தடுப்புப்பட்டியலில் சேர்த்து அல்லது இவற்றை மட்டுமே அழைத்து Echidna ஒரு ஃபஸ்ஸிங் பிரச்சாரத்தைத் தொடங்குகிறது.

## Echidna மூலம் Solidity-இன் assert-ஐ எவ்வாறு சோதிப்பது {#how-to-test-soliditys-assert-with-echidna}

இந்த குறுகிய பயிற்சியில், ஒப்பந்தங்களில் வலியுறுத்தல் (assertion) சரிபார்ப்பைச் சோதிக்க Echidna-ஐ எவ்வாறு பயன்படுத்துவது என்பதைக் காட்டப் போகிறோம். இது போன்ற ஒரு ஒப்பந்தம் நம்மிடம் இருப்பதாக வைத்துக்கொள்வோம்:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### ஒரு வலியுறுத்தலை எழுதுதல் {#write-an-assertion}

அதன் வித்தியாசத்தைத் திருப்பியளித்த பிறகு `tmp` ஆனது `counter`-ஐ விடக் குறைவாகவோ அல்லது சமமாகவோ இருப்பதை உறுதிசெய்ய விரும்புகிறோம். நாம் ஒரு Echidna பண்பை எழுதலாம், ஆனால் `tmp` மதிப்பை எங்காவது சேமிக்க வேண்டும். அதற்குப் பதிலாக, இது போன்ற ஒரு வலியுறுத்தலைப் பயன்படுத்தலாம்:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Echidna-ஐ இயக்குதல் {#run-echidna-2}

வலியுறுத்தல் தோல்வி சோதனையை இயக்க, ஒரு [Echidna உள்ளமைவு கோப்பை](https://github.com/crytic/echidna/wiki/Config) `config.yaml` உருவாக்கவும்:

```yaml
checkAsserts: true
```

இந்த ஒப்பந்தத்தை Echidna-இல் இயக்கும் போது, எதிர்பார்த்த முடிவுகளைப் பெறுகிறோம்:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

நீங்கள் பார்ப்பது போல், `inc` சார்பில் சில வலியுறுத்தல் தோல்விகளை Echidna புகாரளிக்கிறது. ஒரு சார்புக்கு ஒன்றுக்கு மேற்பட்ட வலியுறுத்தல்களைச் சேர்ப்பது சாத்தியமாகும், ஆனால் எந்த வலியுறுத்தல் தோல்வியடைந்தது என்பதை Echidna-ஆல் கூற முடியாது.

### வலியுறுத்தல்களை எப்போது, எப்படிப் பயன்படுத்துவது {#when-and-how-use-assertions}

வெளிப்படையான பண்புகளுக்கு மாற்றாக வலியுறுத்தல்களைப் பயன்படுத்தலாம், குறிப்பாகச் சரிபார்க்க வேண்டிய நிபந்தனைகள் சில செயல்பாடு `f`-இன் சரியான பயன்பாட்டுடன் நேரடியாகத் தொடர்புடையதாக இருந்தால். சில குறியீடுகளுக்குப் பிறகு வலியுறுத்தல்களைச் சேர்ப்பது, அது செயல்படுத்தப்பட்ட உடனேயே சரிபார்ப்பு நடக்கும் என்பதைச் செயல்படுத்தும்:

```solidity
function f(..) public {
    // சில சிக்கலான குறியீடு
    ...
    assert (condition);
    ...
}

```

மாறாக, வெளிப்படையான echidna பண்பைப் பயன்படுத்துவது பரிவர்த்தனைகளைச் சீரற்ற முறையில் செயல்படுத்தும், மேலும் அது எப்போது சரிபார்க்கப்படும் என்பதைச் சரியாகச் செயல்படுத்த எளிதான வழி இல்லை. இந்தத் தீர்வைச் செய்வது இன்னும் சாத்தியமாகும்:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

இருப்பினும், சில சிக்கல்கள் உள்ளன:

- `f` ஆனது `internal` அல்லது `external` என அறிவிக்கப்பட்டால் அது தோல்வியடையும்.
- `f`-ஐ அழைக்க எந்த வாதங்களைப் பயன்படுத்த வேண்டும் என்பது தெளிவாக இல்லை.
- `f` திரும்பினால் (reverts), பண்பு தோல்வியடையும்.

பொதுவாக, வலியுறுத்தல்களை எவ்வாறு பயன்படுத்துவது என்பது குறித்த [ஜான் ரெகரின் பரிந்துரையைப் (John Regehr's recommendation)](https://blog.regehr.org/archives/1091) பின்பற்றப் பரிந்துரைக்கிறோம்:

- வலியுறுத்தல் சரிபார்ப்பின் போது எந்தப் பக்க விளைவையும் கட்டாயப்படுத்த வேண்டாம். எடுத்துக்காட்டாக: `assert(ChangeStateAndReturn() == 1)`
- வெளிப்படையான அறிக்கைகளை வலியுறுத்த வேண்டாம். எடுத்துக்காட்டாக `assert(var >= 0)` இதில் `var` ஆனது `uint` என அறிவிக்கப்பட்டுள்ளது.

இறுதியாக, தயவுசெய்து `assert`-க்கு பதிலாக `require`-ஐ **பயன்படுத்த வேண்டாம்**, ஏனெனில் Echidna-ஆல் அதைக் கண்டறிய முடியாது (ஆனால் ஒப்பந்தம் எப்படியும் திரும்பும்).

### சுருக்கம்: வலியுறுத்தல் சரிபார்ப்பு {#summary-assertion-checking}

பின்வருபவை எங்கள் எடுத்துக்காட்டில் echidna-இன் ஓட்டத்தை சுருக்கமாகக் கூறுகின்றன:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

பெரிய வாதங்களுடன் இந்தச் சார்பு பல முறை அழைக்கப்பட்டால் `inc`-இல் உள்ள வலியுறுத்தல் தோல்வியடையும் என்பதை Echidna கண்டறிந்தது.

## Echidna கார்பஸைச் சேகரித்தல் மற்றும் மாற்றுதல் {#collecting-and-modifying-an-echidna-corpus}

Echidna மூலம் பரிவர்த்தனைகளின் கார்பஸை (corpus) எவ்வாறு சேகரிப்பது மற்றும் பயன்படுத்துவது என்பதைப் பார்ப்போம். இலக்கு பின்வரும் ஸ்மார்ட் ஒப்பந்தம் [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

இந்த சிறிய எடுத்துக்காட்டு ஒரு நிலை மாறியை மாற்ற சில மதிப்புகளைக் கண்டறிய Echidna-ஐ கட்டாயப்படுத்துகிறது. இது ஒரு ஃபஸ்ஸருக்கு கடினமானது ([Manticore](https://github.com/trailofbits/manticore) போன்ற குறியீட்டு செயலாக்கக் கருவியைப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது).
இதைச் சரிபார்க்க நாம் Echidna-ஐ இயக்கலாம்:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

இருப்பினும், இந்த ஃபஸ்ஸிங் பிரச்சாரத்தை இயக்கும் போது கார்பஸைச் சேகரிக்க நாம் இன்னும் Echidna-ஐப் பயன்படுத்தலாம்.

### கார்பஸைச் சேகரித்தல் {#collecting-a-corpus}

கார்பஸ் சேகரிப்பை இயக்க, ஒரு கார்பஸ் கோப்பகத்தை உருவாக்கவும்:

```bash
mkdir corpus-magic
```

மற்றும் ஒரு [Echidna உள்ளமைவு கோப்பு](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

இப்போது நாம் எங்கள் கருவியை இயக்கலாம் மற்றும் சேகரிக்கப்பட்ட கார்பஸைச் சரிபார்க்கலாம்:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna-ஆல் இன்னும் சரியான மேஜிக் மதிப்புகளைக் கண்டறிய முடியவில்லை, ஆனால் அது சேகரித்த கார்பஸை நாம் பார்க்கலாம்.
எடுத்துக்காட்டாக, இந்தக் கோப்புகளில் ஒன்று:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

தெளிவாக, இந்த உள்ளீடு எங்கள் பண்பில் தோல்வியைத் தூண்டாது. இருப்பினும், அடுத்த கட்டத்தில், அதற்காக அதை எவ்வாறு மாற்றுவது என்பதைப் பார்ப்போம்.

### கார்பஸை விதைத்தல் {#seeding-a-corpus}

`magic` சார்பைக் கையாள Echidna-க்கு சில உதவிகள் தேவை. அதற்கான பொருத்தமான அளவுருக்களைப் பயன்படுத்த உள்ளீட்டை நகலெடுத்து மாற்றப் போகிறோம்:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

`magic(42,129,333,0)`-ஐ அழைக்க `new.txt`-ஐ மாற்றுவோம். இப்போது, நாம் Echidna-ஐ மீண்டும் இயக்கலாம்:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

இந்த முறை, பண்பு உடனடியாக மீறப்படுவதை அது கண்டறிந்தது.

## அதிக எரிவாயு நுகர்வு கொண்ட பரிவர்த்தனைகளைக் கண்டறிதல் {#finding-transactions-with-high-gas-consumption}

Echidna மூலம் அதிக எரிவாயு நுகர்வு கொண்ட பரிவர்த்தனைகளை எவ்வாறு கண்டறிவது என்பதைப் பார்ப்போம். இலக்கு பின்வரும் ஸ்மார்ட் ஒப்பந்தம்:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

இங்கே `expensive` அதிக எரிவாயு நுகர்வைக் கொண்டிருக்கலாம்.

தற்போது, Echidna-க்குச் சோதிக்க எப்போதும் ஒரு பண்பு தேவை: இங்கே `echidna_test` எப்போதும் `true` எனத் திரும்பும்.
இதைச் சரிபார்க்க நாம் Echidna-ஐ இயக்கலாம்:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### எரிவாயு நுகர்வை அளவிடுதல் {#measuring-gas-consumption}

Echidna மூலம் எரிவாயு நுகர்வை இயக்க, ஒரு உள்ளமைவு கோப்பை `config.yaml` உருவாக்கவும்:

```yaml
estimateGas: true
```

இந்த எடுத்துக்காட்டில், முடிவுகளைப் புரிந்துகொள்வதை எளிதாக்க பரிவர்த்தனை வரிசையின் அளவையும் குறைப்போம்:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna-ஐ இயக்குதல் {#run-echidna-3}

உள்ளமைவு கோப்பை உருவாக்கியதும், நாம் Echidna-ஐ இப்படி இயக்கலாம்:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- காட்டப்படும் எரிவாயு [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-)-ஆல் வழங்கப்பட்ட மதிப்பீடாகும்.

### எரிவாயுவைக் குறைக்கும் அழைப்புகளை வடிகட்டுதல் {#filtering-out-gas-reducing-calls}

மேலே உள்ள **ஃபஸ்ஸிங் பிரச்சாரத்தின் போது அழைக்க வேண்டிய சார்புகளை வடிகட்டுதல்** குறித்த பயிற்சி, உங்கள் சோதனையிலிருந்து சில சார்புகளை எவ்வாறு அகற்றுவது என்பதைக் காட்டுகிறது.  
துல்லியமான எரிவாயு மதிப்பீட்டைப் பெறுவதற்கு இது முக்கியமானதாக இருக்கலாம்.
பின்வரும் எடுத்துக்காட்டைக் கவனியுங்கள்:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Echidna அனைத்து சார்புகளையும் அழைக்க முடிந்தால், அதிக எரிவாயு செலவைக் கொண்ட பரிவர்த்தனைகளை அது எளிதில் கண்டறியாது:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

அதற்குக் காரணம், செலவு `addrs`-இன் அளவைப் பொறுத்தது மற்றும் சீரற்ற அழைப்புகள் வரிசையை (array) கிட்டத்தட்ட காலியாக விட முனைகின்றன.
இருப்பினும், `pop` மற்றும் `clear`-ஐத் தடுப்புப்பட்டியலில் சேர்ப்பது எங்களுக்குச் சிறந்த முடிவுகளைத் தருகிறது:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### சுருக்கம்: அதிக எரிவாயு நுகர்வு கொண்ட பரிவர்த்தனைகளைக் கண்டறிதல் {#summary-finding-transactions-with-high-gas-consumption}

`estimateGas` உள்ளமைவு விருப்பத்தைப் பயன்படுத்தி அதிக எரிவாயு நுகர்வு கொண்ட பரிவர்த்தனைகளை Echidna கண்டறிய முடியும்:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ஃபஸ்ஸிங் பிரச்சாரம் முடிந்ததும், ஒவ்வொரு சார்புக்கும் அதிகபட்ச எரிவாயு நுகர்வு கொண்ட வரிசையை Echidna புகாரளிக்கும்.