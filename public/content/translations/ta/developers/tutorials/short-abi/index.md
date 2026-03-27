---
title: "கால்-டேட்டா (Calldata) மேம்படுத்தலுக்கான சுருக்கமான ABI-கள்"
description: "ஆப்டிமிஸ்டிக் ரோலப்களுக்கான (Optimistic Rollups) ஸ்மார்ட் ஒப்பந்தங்களை மேம்படுத்துதல்"
author: "ஓரி பொமரன்ட்ஸ்"
lang: ta
tags: ["லேயர் 2"]
skill: intermediate
breadcrumb: "சுருக்கமான ABI-கள்"
published: 2022-04-01
---

## அறிமுகம் {#introduction}

இந்தக் கட்டுரையில், [ஆப்டிமிஸ்டிக் ரோலப்கள்](/developers/docs/scaling/optimistic-rollups) (optimistic rollups), அவற்றில் பரிவர்த்தனைகளுக்கான செலவு மற்றும் அந்த மாறுபட்ட செலவு அமைப்பு, எத்தேரியம் மெயின்நெட்டை விட வெவ்வேறு விஷயங்களுக்கு எவ்வாறு மேம்படுத்தக் கோருகிறது என்பதைப் பற்றி நீங்கள் அறிந்துகொள்வீர்கள். இந்த மேம்படுத்தலை எவ்வாறு செயல்படுத்துவது என்பதையும் நீங்கள் கற்றுக்கொள்வீர்கள்.

### முழுமையான வெளிப்படுத்தல் {#full-disclosure}

நான் ஒரு முழுநேர [Optimism](https://www.optimism.io/) பணியாளர், எனவே இந்தக் கட்டுரையில் உள்ள எடுத்துக்காட்டுகள் Optimism-இல் இயங்கும். இருப்பினும், இங்கு விளக்கப்பட்டுள்ள நுட்பம் மற்ற ரோலப்களுக்கும் சிறப்பாகச் செயல்பட வேண்டும்.

### கலைச்சொற்கள் {#terminology}

ரோலப்களைப் பற்றி விவாதிக்கும்போது, 'லேயர் 1' (L1) என்ற சொல் மெயின்நெட் (Mainnet) எனப்படும் தயாரிப்பு எத்தேரியம் நெட்வொர்க்கிற்குப் பயன்படுத்தப்படுகிறது. 'லேயர் 2' (L2) என்ற சொல் ரோலப் அல்லது பாதுகாப்பிற்காக L1-ஐச் சார்ந்திருக்கும், ஆனால் அதன் பெரும்பாலான செயலாக்கங்களை ஆஃப்செயினில் (offchain) செய்யும் வேறு எந்த அமைப்புக்கும் பயன்படுத்தப்படுகிறது.

## L2 பரிவர்த்தனைகளின் செலவை நாம் எவ்வாறு மேலும் குறைக்கலாம்? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[ஆப்டிமிஸ்டிக் ரோலப்கள்](/developers/docs/scaling/optimistic-rollups) ஒவ்வொரு வரலாற்றுப் பரிவர்த்தனையின் பதிவையும் பாதுகாக்க வேண்டும், இதனால் எவரும் அவற்றைச் சரிபார்த்து தற்போதைய நிலை சரியானது என்பதை உறுதிப்படுத்த முடியும். எத்தேரியம் மெயின்நெட்டிற்குள் தரவைப் பெறுவதற்கான மலிவான வழி, அதை கால்-டேட்டாவாக (calldata) எழுதுவதாகும். இந்தத் தீர்வு [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) மற்றும் [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) ஆகிய இரண்டாலும் தேர்ந்தெடுக்கப்பட்டது.

### L2 பரிவர்த்தனைகளின் செலவு {#cost-of-l2-transactions}

L2 பரிவர்த்தனைகளின் செலவு இரண்டு கூறுகளைக் கொண்டுள்ளது:

1. L2 செயலாக்கம், இது பொதுவாக மிகவும் மலிவானது
2. L1 சேமிப்பகம், இது மெயின்நெட் கேஸ் (gas) செலவுகளுடன் பிணைக்கப்பட்டுள்ளது

நான் இதை எழுதும்போது, Optimism-இல் L2 கேஸின் செலவு 0.001 [Gwei](/developers/docs/gas/#pre-london) ஆக உள்ளது. மறுபுறம், L1 கேஸின் செலவு தோராயமாக 40 gwei ஆகும். [தற்போதைய விலைகளை நீங்கள் இங்கே பார்க்கலாம்](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

ஒரு பைட் கால்-டேட்டாவிற்கு 4 கேஸ் (அது பூஜ்ஜியமாக இருந்தால்) அல்லது 16 கேஸ் (அது வேறு எந்த மதிப்பாக இருந்தாலும்) செலவாகும். EVM-இல் மிகவும் விலையுயர்ந்த செயல்பாடுகளில் ஒன்று சேமிப்பகத்தில் எழுதுவதாகும். L2-இல் சேமிப்பகத்தில் 32-பைட் சொல்லை எழுதுவதற்கான அதிகபட்ச செலவு 22100 கேஸ் ஆகும். தற்போது, இது 22.1 gwei ஆகும். எனவே நாம் கால்-டேட்டாவின் ஒரு பூஜ்ஜிய பைட்டைச் சேமிக்க முடிந்தால், நம்மால் சேமிப்பகத்தில் சுமார் 200 பைட்டுகளை எழுத முடியும், மேலும் லாபகரமாக இருக்க முடியும்.

### ABI {#the-abi}

பெரும்பாலான பரிவர்த்தனைகள் வெளிப்புறமாகச் சொந்தமான கணக்கிலிருந்து (externally-owned account) ஒரு ஒப்பந்தத்தை அணுகுகின்றன. பெரும்பாலான ஒப்பந்தங்கள் Solidity-இல் எழுதப்பட்டுள்ளன, மேலும் அவற்றின் தரவுப் புலத்தை [பயன்பாட்டு பைனரி இடைமுகத்தின் (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) படி விளக்குகின்றன.

இருப்பினும், ABI ஆனது L1-க்காக வடிவமைக்கப்பட்டது, அங்கு ஒரு பைட் கால்-டேட்டாவிற்கு தோராயமாக நான்கு எண்கணித செயல்பாடுகளுக்குச் சமமான செலவு ஆகும், ஆனால் L2-இல் ஒரு பைட் கால்-டேட்டாவிற்கு ஆயிரத்திற்கும் மேற்பட்ட எண்கணித செயல்பாடுகளுக்கான செலவு ஆகும். கால்-டேட்டா இவ்வாறு பிரிக்கப்பட்டுள்ளது:

| பிரிவு (Section) | நீளம் (Length) | பைட்டுகள் (Bytes) | வீணான பைட்டுகள் (Wasted bytes) | வீணான கேஸ் (Wasted gas) | தேவையான பைட்டுகள் (Necessary bytes) | தேவையான கேஸ் (Necessary gas) |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Function selector   |      4 |   0-3 |            3 |         48 |               1 |            16 |
| Zeroes              |     12 |  4-15 |           12 |         48 |               0 |             0 |
| Destination address |     20 | 16-35 |            0 |          0 |              20 |           320 |
| Amount              |     32 | 36-67 |           17 |         64 |              15 |           240 |
| Total               |     68 |       |              |        160 |                 |           576 |

விளக்கம்:

- **Function selector**: ஒப்பந்தத்தில் 256-க்கும் குறைவான செயல்பாடுகள் உள்ளன, எனவே அவற்றை ஒரு பைட்டைக் கொண்டு வேறுபடுத்தலாம். இந்தப் பைட்டுகள் பொதுவாக பூஜ்ஜியமற்றவை, எனவே [பதினாறு கேஸ் செலவாகும்](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeroes**: இருபது-பைட் முகவரியை வைத்திருக்க முப்பத்திரண்டு-பைட் சொல் தேவையில்லை என்பதால் இந்தப் பைட்டுகள் எப்போதும் பூஜ்ஜியமாகவே இருக்கும். பூஜ்ஜியத்தைக் கொண்டிருக்கும் பைட்டுகளுக்கு நான்கு கேஸ் செலவாகும் ([மஞ்சள் தாளைப் பார்க்கவும்](https://ethereum.github.io/yellowpaper/paper.pdf), பிற்சேர்க்கை G, ப. 27, `G`<sub>`txdatazero`</sub>-க்கான மதிப்பு).
- **Amount**: இந்த ஒப்பந்தத்தில் `decimals` பதினெட்டு (வழக்கமான மதிப்பு) என்றும், நாம் பரிமாற்றும் டோக்கன்களின் அதிகபட்ச அளவு 10<sup>18</sup> ஆக இருக்கும் என்றும் வைத்துக்கொண்டால், நமக்கு அதிகபட்சமாக 10<sup>36</sup> கிடைக்கும். 256<sup>15</sup> &gt; 10<sup>36</sup>, எனவே பதினைந்து பைட்டுகள் போதுமானது.

L1-இல் 160 கேஸ் வீணாவது பொதுவாகப் புறக்கணிக்கத்தக்கது. ஒரு பரிவர்த்தனைக்குக் குறைந்தது [21,000 கேஸ்](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) செலவாகும், எனவே கூடுதல் 0.8% ஒரு பொருட்டல்ல. இருப்பினும், L2-இல், விஷயங்கள் வேறுபட்டவை. பரிவர்த்தனையின் முழுச் செலவும் அதை L1-இல் எழுதுவதே ஆகும். பரிவர்த்தனை கால்-டேட்டாவுடன், 109 பைட்டுகள் பரிவர்த்தனை தலைப்பு (இலக்கு முகவரி, கையொப்பம் போன்றவை) உள்ளன. எனவே மொத்தச் செலவு `109*16+576+160=2480` ஆகும், மேலும் அதில் சுமார் 6.5%-ஐ நாம் வீணாக்குகிறோம்.

## இலக்கை நீங்கள் கட்டுப்படுத்தாதபோது செலவுகளைக் குறைத்தல் {#reducing-costs-when-you-dont-control-the-destination}

இலக்கு ஒப்பந்தத்தின் மீது உங்களுக்குக் கட்டுப்பாடு இல்லை என்று வைத்துக்கொண்டால், [இதைப் போன்ற](https://github.com/qbzzt/ethereum.org-20220330-shortABI) ஒரு தீர்வை நீங்கள் இன்னும் பயன்படுத்தலாம். தொடர்புடைய கோப்புகளைப் பார்ப்போம்.

### Token.sol {#token-sol}

[இது இலக்கு ஒப்பந்தம்](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol). இது ஒரு கூடுதல் அம்சத்துடன் கூடிய நிலையான ERC-20 ஒப்பந்தமாகும். இந்த `faucet` செயல்பாடு எந்தவொரு பயனரும் பயன்படுத்தச் சில டோக்கன்களைப் பெற அனுமதிக்கிறது. இது ஒரு தயாரிப்பு ERC-20 ஒப்பந்தத்தைப் பயனற்றதாக்கும், ஆனால் சோதனையை எளிதாக்குவதற்கு மட்டுமே ERC-20 இருக்கும்போது இது வாழ்க்கையை எளிதாக்குகிறது.

```solidity
    /* *
     * @dev அழைப்பாளருக்கு விளையாட 1000 டோக்கன்களை வழங்குகிறது */
    function faucet() external {
        _mint(msg.sender, 1000);
    } // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[இது குறுகிய கால்-டேட்டாவுடன் பரிவர்த்தனைகள் அழைக்க வேண்டிய ஒப்பந்தமாகும்](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol). இதை வரியாகப் பார்ப்போம்.

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

அதை எவ்வாறு அழைப்பது என்பதை அறிய நமக்கு டோக்கன் செயல்பாடு தேவை.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

நாம் ப்ராக்ஸியாக (proxy) இருக்கும் டோக்கனின் முகவரி.

```solidity

    /* *
     * @dev டோக்கன் முகவரியைக் குறிப்பிடவும்
     * @param tokenAddr_ ERC-20 ஒப்பந்த முகவரி */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    } // constructor
```

டோக்கன் முகவரி மட்டுமே நாம் குறிப்பிட வேண்டிய ஒரே அளவுருவாகும்.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

கால்-டேட்டாவிலிருந்து ஒரு மதிப்பைப் படிக்கவும்.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

நாம் ஒரு 32-பைட் (256-பிட்) சொல்லை நினைவகத்தில் ஏற்றி, நமக்குத் தேவையான புலத்தின் பகுதியாக இல்லாத பைட்டுகளை அகற்றப் போகிறோம். இந்த அல்காரிதம் 32 பைட்டுகளுக்கு மேல் உள்ள மதிப்புகளுக்கு வேலை செய்யாது, மேலும் கால்-டேட்டாவின் முடிவைத் தாண்டி நம்மால் படிக்க முடியாது. L1-இல் கேஸைச் சேமிக்க இந்தச் சோதனைகளைத் தவிர்ப்பது அவசியமாக இருக்கலாம், ஆனால் L2-இல் கேஸ் மிகவும் மலிவானது, இது நாம் நினைக்கும் எந்தவொரு சரிபார்ப்புகளையும் செயல்படுத்துகிறது.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

`fallback()`-க்கான அழைப்பிலிருந்து தரவை நாம் நகலெடுத்திருக்கலாம் (கீழே காண்க), ஆனால் EVM-இன் அசெம்பிளி மொழியான [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)-ஐப் பயன்படுத்துவது எளிதானது.

இங்கே நாம் `startByte` முதல் `startByte+31` வரையிலான பைட்டுகளை ஸ்டாக்கில் (stack) படிக்க [CALLDATALOAD ஆப்கோடைப் (opcode)](https://www.evm.codes/#35) பயன்படுத்துகிறோம். பொதுவாக, Yul-இல் ஒரு ஆப்கோடின் தொடரியல் `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` ஆகும்.

```solidity

        _retVal = _retVal >> (256-length*8);
```

மிகவும் குறிப்பிடத்தக்க `length` பைட்டுகள் மட்டுமே புலத்தின் ஒரு பகுதியாகும், எனவே மற்ற மதிப்புகளை அகற்ற நாம் [வலது-நகர்வு (right-shift)](https://en.wikipedia.org/wiki/Logical_shift) செய்கிறோம். இது மதிப்பை புலத்தின் வலதுபுறத்திற்கு நகர்த்துவதன் கூடுதல் நன்மையைக் கொண்டுள்ளது, எனவே இது மதிப்பு பெருக்கல் 256<sup>ஏதோ ஒன்று</sup> என்பதை விட மதிப்பு மட்டுமே ஆகும்.

```solidity

        return _retVal;
    }


    fallback() external {
```

Solidity ஒப்பந்தத்திற்கான அழைப்பு எந்தவொரு செயல்பாட்டு கையொப்பங்களுடனும் பொருந்தாதபோது, அது [`fallback()` செயல்பாட்டை](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) அழைக்கிறது (ஒன்று இருப்பதாகக் கருதி). `CalldataInterpreter` விஷயத்தில், வேறு எந்த `external` அல்லது `public` செயல்பாடுகளும் இல்லாததால் _எந்தவொரு_ அழைப்பும் இங்கு வருகிறது.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

கால்-டேட்டாவின் முதல் பைட்டைப் படிக்கவும், இது செயல்பாட்டைக் கூறுகிறது. ஒரு செயல்பாடு இங்கு கிடைக்காமல் இருப்பதற்கு இரண்டு காரணங்கள் உள்ளன:

1. `pure` அல்லது `view` ஆக இருக்கும் செயல்பாடுகள் நிலையை மாற்றாது மற்றும் கேஸ் செலவாகாது (ஆஃப்செயினில் அழைக்கப்படும்போது). அவற்றின் கேஸ் செலவைக் குறைக்க முயற்சிப்பதில் எந்த அர்த்தமும் இல்லை.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)-ஐச் சார்ந்திருக்கும் செயல்பாடுகள். `msg.sender`-இன் மதிப்பு அழைப்பாளராக இல்லாமல், `CalldataInterpreter`-இன் முகவரியாக இருக்கும்.

துரதிர்ஷ்டவசமாக, [ERC-20 விவரக்குறிப்புகளைப் பார்க்கும்போது](https://eips.ethereum.org/EIPS/eip-20), இது `transfer` என்ற ஒரு செயல்பாட்டை மட்டுமே விட்டுவிடுகிறது. இது நமக்கு இரண்டு செயல்பாடுகளை மட்டுமே விட்டுவிடுகிறது: `transfer` (ஏனெனில் நாம் `transferFrom`-ஐ அழைக்கலாம்) மற்றும் `faucet` (ஏனெனில் நம்மை அழைத்தவருக்கு டோக்கன்களைத் திருப்பி அனுப்பலாம்).

```solidity

        // டோக்கனின் நிலையை மாற்றும் முறைகளை இதைப் பயன்படுத்தி அழைக்கவும்
        // calldata-விலிருந்து பெறப்பட்ட தகவல்

        // faucet
        if (_func == 1) {
```

`faucet()`-க்கான அழைப்பு, இதில் அளவுருக்கள் இல்லை.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

நாம் `token.faucet()`-ஐ அழைத்த பிறகு நமக்கு டோக்கன்கள் கிடைக்கும். இருப்பினும், ப்ராக்ஸி ஒப்பந்தமாக, நமக்கு டோக்கன்கள் **தேவையில்லை**. நம்மை அழைத்த EOA (வெளிப்புறமாகச் சொந்தமான கணக்கு) அல்லது ஒப்பந்தத்திற்குத் தேவை. எனவே நம்முடைய அனைத்து டோக்கன்களையும் நம்மை அழைத்தவருக்கு மாற்றுகிறோம்.

```solidity
        // transfer (இதற்கான அனுமதி நம்மிடம் உள்ளது என கருதுக)
        if (_func == 2) {
```

டோக்கன்களை மாற்றுவதற்கு இரண்டு அளவுருக்கள் தேவை: இலக்கு முகவரி மற்றும் அளவு.

```solidity
            token.transferFrom(
                msg.sender,
```

அழைப்பாளர்கள் தங்களுக்குச் சொந்தமான டோக்கன்களை மட்டுமே மாற்ற அனுமதிக்கிறோம்

```solidity
                address(uint160(calldataVal(1, 20))),
```

இலக்கு முகவரி பைட் #1-இல் தொடங்குகிறது (பைட் #0 என்பது செயல்பாடு). ஒரு முகவரியாக, இது 20-பைட்டுகள் நீளமானது.

```solidity
                calldataVal(21, 2)
```

இந்த குறிப்பிட்ட ஒப்பந்தத்திற்கு, எவரும் மாற்ற விரும்பும் அதிகபட்ச டோக்கன்களின் எண்ணிக்கை இரண்டு பைட்டுகளில் (65536-க்கும் குறைவானது) பொருந்தும் என்று கருதுகிறோம்.

```solidity
            );
        }
```

ஒட்டுமொத்தமாக, ஒரு பரிமாற்றத்திற்கு 35 பைட்டுகள் கால்-டேட்டா தேவைப்படுகிறது:

| பிரிவு (Section) | நீளம் (Length) | பைட்டுகள் (Bytes) |
| ------------------- | -----: | ----: |
| Function selector   |      1 |     0 |
| Destination address |     32 |  1-32 |
| Amount              |      2 | 33-34 |

```solidity
    } // fallback

} // contract CalldataInterpreter
```

### test.js {#test-js}

[இந்த ஜாவாஸ்கிரிப்ட் யூனிட் சோதனை](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) இந்த வழிமுறையை எவ்வாறு பயன்படுத்துவது (மற்றும் அது சரியாக வேலை செய்கிறதா என்பதை எவ்வாறு சரிபார்ப்பது) என்பதைக் காட்டுகிறது. நீங்கள் [chai](https://www.chaijs.com/) மற்றும் [ethers](https://docs.ethers.io/v5/)-ஐப் புரிந்துகொள்கிறீர்கள் என்று நான் கருதுகிறேன், மேலும் ஒப்பந்தத்திற்குப் பொருந்தக்கூடிய பகுதிகளை மட்டுமே விளக்குகிறேன்.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

இரண்டு ஒப்பந்தங்களையும் பயன்படுத்துவதன் மூலம் தொடங்குகிறோம்.

```javascript
    // விளையாடுவதற்கு டோக்கன்களைப் பெறுக
    const faucetTx = {
```

பரிவர்த்தனைகளை உருவாக்க நாம் பொதுவாகப் பயன்படுத்தும் உயர்மட்ட செயல்பாடுகளை (`token.faucet()` போன்றவை) பயன்படுத்த முடியாது, ஏனெனில் நாம் ABI-ஐப் பின்பற்றுவதில்லை. அதற்குப் பதிலாக, நாமே பரிவர்த்தனையை உருவாக்கி பின்னர் அதை அனுப்ப வேண்டும்.

```javascript
      to: cdi.address,
      data: "0x01"
```

பரிவர்த்தனைக்கு நாம் வழங்க வேண்டிய இரண்டு அளவுருக்கள் உள்ளன:

1. `to`, இலக்கு முகவரி. இது கால்-டேட்டா இன்டர்ப்ரெட்டர் (calldata interpreter) ஒப்பந்தமாகும்.
2. `data`, அனுப்ப வேண்டிய கால்-டேட்டா. faucet அழைப்பைப் பொறுத்தவரை, தரவு ஒரு பைட், `0x01` ஆகும்.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

நாம் இலக்கை (`faucetTx.to`) ஏற்கனவே குறிப்பிட்டுள்ளதாலும், பரிவர்த்தனையில் கையொப்பமிட வேண்டியிருப்பதாலும் [கையொப்பமிடுபவரின் `sendTransaction` முறையை](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) அழைக்கிறோம்.

```javascript
// faucet டோக்கன்களைச் சரியாக வழங்குகிறதா எனச் சரிபார்க்கவும்
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

இங்கே நாம் இருப்பைச் சரிபார்க்கிறோம். `view` செயல்பாடுகளில் கேஸைச் சேமிக்க வேண்டிய அவசியமில்லை, எனவே அவற்றை வழக்கம் போல் இயக்குகிறோம்.

```javascript
// CDI-க்கு அனுமதியை வழங்கவும் (ஒப்புதல்களை ப்ராக்ஸி செய்ய முடியாது)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

பரிமாற்றங்களைச் செய்ய கால்-டேட்டா இன்டர்ப்ரெட்டருக்கு அனுமதியை வழங்கவும்.

```javascript
// டோக்கன்களைப் பரிமாற்றம் செய்க
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

ஒரு பரிமாற்றப் பரிவர்த்தனையை உருவாக்கவும். முதல் பைட் "0x02", அதைத் தொடர்ந்து இலக்கு முகவரி, இறுதியாக அளவு (0x0100, இது தசமத்தில் 256 ஆகும்).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // நம்மிடம் 256 டோக்கன்கள் குறைவாக உள்ளதா எனச் சரிபார்க்கவும்
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // மேலும் நமது இலக்கு முகவரி அவற்றைப் பெற்றதா என்பதையும் சரிபார்க்கவும்
    expect (await token.balanceOf(destAddr)).to.equal(256)
  }) // it
}) // describe
```

## இலக்கு ஒப்பந்தத்தை நீங்கள் கட்டுப்படுத்தும்போது செலவைக் குறைத்தல் {#reducing-the-cost-when-you-do-control-the-destination-contract}

இலக்கு ஒப்பந்தத்தின் மீது உங்களுக்குக் கட்டுப்பாடு இருந்தால், `msg.sender` சரிபார்ப்புகளைத் தவிர்க்கும் செயல்பாடுகளை நீங்கள் உருவாக்கலாம், ஏனெனில் அவை கால்-டேட்டா இன்டர்ப்ரெட்டரை நம்புகின்றன. [இது எவ்வாறு செயல்படுகிறது என்பதற்கான உதாரணத்தை இங்கே, `control-contract` கிளையில் பார்க்கலாம்](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

ஒப்பந்தம் வெளிப்புறப் பரிவர்த்தனைகளுக்கு மட்டுமே பதிலளிப்பதாக இருந்தால், ஒரே ஒரு ஒப்பந்தத்தை வைத்திருப்பதன் மூலம் நாம் சமாளிக்க முடியும். இருப்பினும், அது [தொகுப்புத்தன்மையை (composability)](/developers/docs/smart-contracts/composability/) உடைக்கும். சாதாரண ERC-20 அழைப்புகளுக்குப் பதிலளிக்கும் ஒரு ஒப்பந்தத்தையும், குறுகிய கால்-டேட்டாவுடன் பரிவர்த்தனைகளுக்குப் பதிலளிக்கும் மற்றொரு ஒப்பந்தத்தையும் வைத்திருப்பது மிகவும் சிறந்தது.

### Token.sol {#token-sol-2}

இந்த எடுத்துக்காட்டில் நாம் `Token.sol`-ஐ மாற்றலாம். இது ப்ராக்ஸி மட்டுமே அழைக்கக்கூடிய பல செயல்பாடுகளை வைத்திருக்க அனுமதிக்கிறது. புதிய பகுதிகள் இங்கே:

```solidity
    // CalldataInterpreter முகவரியைக் குறிப்பிட அனுமதிக்கப்பட்ட ஒரே முகவரி
    address owner;

    // CalldataInterpreter முகவரி
    address proxy = address(0);
```

அங்கீகரிக்கப்பட்ட ப்ராக்ஸியின் அடையாளத்தை ERC-20 ஒப்பந்தம் தெரிந்துகொள்ள வேண்டும். இருப்பினும், இந்த மாறியை கன்ஸ்ட்ரக்டரில் (constructor) அமைக்க முடியாது, ஏனெனில் நமக்கு இன்னும் மதிப்பு தெரியாது. ப்ராக்ஸி அதன் கன்ஸ்ட்ரக்டரில் டோக்கனின் முகவரியை எதிர்பார்ப்பதால் இந்த ஒப்பந்தம் முதலில் உருவாக்கப்படுகிறது.

```solidity
    /* *
     * @dev ERC20 constructor-ஐ அழைக்கிறது. */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

உருவாக்குபவரின் முகவரி (`owner` என்று அழைக்கப்படுகிறது) இங்கே சேமிக்கப்படுகிறது, ஏனெனில் ப்ராக்ஸியை அமைக்க அனுமதிக்கப்பட்ட ஒரே முகவரி அதுதான்.

```solidity
    /* *
     * @dev ப்ராக்ஸிக்கான (CalldataInterpreter) முகவரியை அமைக்கவும்.
     * உரிமையாளரால் ஒரு முறை மட்டுமே அழைக்கப்பட முடியும் */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    } // function setProxy
```

ப்ராக்ஸிக்குச் சிறப்பு அணுகல் உள்ளது, ஏனெனில் அது பாதுகாப்புச் சரிபார்ப்புகளைத் தவிர்க்கலாம். ப்ராக்ஸியை நாம் நம்பலாம் என்பதை உறுதிப்படுத்த, `owner` மட்டுமே இந்தச் செயல்பாட்டை அழைக்க அனுமதிக்கிறோம், அதுவும் ஒரு முறை மட்டுமே. `proxy` உண்மையான மதிப்பைப் பெற்றவுடன் (பூஜ்ஜியம் அல்ல), அந்த மதிப்பை மாற்ற முடியாது, எனவே உரிமையாளர் முரட்டுத்தனமாக மாற முடிவு செய்தாலும் அல்லது அதற்கான நினைவூட்டல் (mnemonic) வெளிப்படுத்தப்பட்டாலும், நாம் இன்னும் பாதுகாப்பாக இருக்கிறோம்.

```solidity
    /* *
     * @dev சில செயல்பாடுகள் ப்ராக்ஸியால் மட்டுமே அழைக்கப்படலாம். */
    modifier onlyProxy {
```

இது ஒரு [`modifier` செயல்பாடு](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), இது மற்ற செயல்பாடுகள் வேலை செய்யும் முறையை மாற்றியமைக்கிறது.

```solidity
      require(msg.sender == proxy);
```

முதலில், நாம் ப்ராக்ஸியால் அழைக்கப்பட்டோம், வேறு யாராலும் அல்ல என்பதைச் சரிபார்க்கவும். இல்லையெனில், `revert` செய்யவும்.

```solidity
      _;
    }
```

அப்படியானால், நாம் மாற்றியமைக்கும் செயல்பாட்டை இயக்கவும்.

```solidity
   /* கணக்குகளுக்காக ப்ராக்ஸியை உண்மையாகவே ப்ராக்ஸி செய்ய அனுமதிக்கும் செயல்பாடுகள் */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

இவை பொதுவாக டோக்கன்களை மாற்றும் அல்லது அனுமதியை அங்கீகரிக்கும் நிறுவனத்திடமிருந்து நேரடியாகச் செய்தி வர வேண்டிய மூன்று செயல்பாடுகள் ஆகும். இங்கே இந்தச் செயல்பாடுகளின் ப்ராக்ஸி பதிப்பு உள்ளது, இது:

1. `onlyProxy()` மூலம் மாற்றியமைக்கப்படுகிறது, எனவே வேறு யாரும் அவற்றைக் கட்டுப்படுத்த அனுமதிக்கப்படுவதில்லை.
2. பொதுவாக `msg.sender` ஆக இருக்கும் முகவரியைக் கூடுதல் அளவுருவாகப் பெறுகிறது.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

ப்ராக்ஸி செய்யப்பட்ட செயல்பாடுகள் `msg.sender` அளவுருவைப் பெறுகின்றன மற்றும் `transfer`-க்கு அனுமதி தேவையில்லை என்பதைத் தவிர, கால்-டேட்டா இன்டர்ப்ரெட்டர் மேலே உள்ளதைப் போலவே இருக்கும்.

```solidity
        // transfer (அனுமதி தேவையில்லை)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

முந்தைய சோதனைக் குறியீட்டிற்கும் இதற்கும் இடையே சில மாற்றங்கள் உள்ளன.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

எந்த ப்ராக்ஸியை நம்ப வேண்டும் என்பதை ERC-20 ஒப்பந்தத்திற்கு நாம் கூற வேண்டும்

```js
console.log("CalldataInterpreter addr:", cdi.address)

// அனுமதிகளைச் சரிபார்க்க இரண்டு கையொப்பமிடுபவர்கள் (signers) தேவை
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` மற்றும் `transferFrom()`-ஐச் சரிபார்க்க நமக்கு இரண்டாவது கையொப்பமிடுபவர் தேவை. அதை `poorSigner` என்று அழைக்கிறோம், ஏனெனில் அது நமது டோக்கன்கள் எதையும் பெறாது (நிச்சயமாக, அதற்கு ETH இருக்க வேண்டும்).

```js
// டோக்கன்களைப் பரிமாற்றம் செய்க
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 ஒப்பந்தம் ப்ராக்ஸியை (`cdi`) நம்புவதால், பரிமாற்றங்களை ரிலே (relay) செய்ய நமக்கு அனுமதி தேவையில்லை.

```js
// approval மற்றும் transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// approve / transferFrom இணைச் செயல்பாடு சரியாகச் செய்யப்பட்டதா எனச் சரிபார்க்கவும்
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

இரண்டு புதிய செயல்பாடுகளைச் சோதிக்கவும். `transferFromTx`-க்கு இரண்டு முகவரி அளவுருக்கள் தேவை என்பதை நினைவில் கொள்ளவும்: அனுமதியை வழங்குபவர் மற்றும் பெறுபவர்.

## முடிவுரை {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) மற்றும் [Arbitrum](https://developer.offchainlabs.com/docs/special_features) ஆகிய இரண்டும் L1-இல் எழுதப்பட்ட கால்-டேட்டாவின் அளவைக் குறைப்பதற்கான வழிகளைத் தேடுகின்றன, எனவே பரிவர்த்தனைகளின் செலவையும் குறைக்கின்றன. இருப்பினும், பொதுவான தீர்வுகளைத் தேடும் உள்கட்டமைப்பு வழங்குநர்களாக, எங்கள் திறன்கள் வரம்புக்குட்பட்டவை. டாப் (dapp) டெவலப்பராக, உங்களிடம் பயன்பாடு சார்ந்த அறிவு உள்ளது, இது பொதுவான தீர்வில் எங்களால் முடிந்ததை விட உங்கள் கால்-டேட்டாவைச் சிறப்பாக மேம்படுத்த உங்களை அனுமதிக்கிறது. உங்கள் தேவைகளுக்கான சிறந்த தீர்வை நீங்கள் கண்டறிய இந்தக் கட்டுரை உதவும் என்று நம்புகிறோம்.

[எனது மேலும் பல பணிகளுக்கு இங்கே பார்க்கவும்](https://cryptodocguy.pro/).