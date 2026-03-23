---
title: "ஆப்டிமிசம் ஸ்டாண்டர்டு பாலம் ஒப்பந்தத்தின் முழு விவரம்"
description: "ஆப்டிமிசத்திற்கான ஸ்டாண்டர்டு பாலம் எவ்வாறு செயல்படுகிறது? இது ஏன் இப்படிச் செயல்படுகிறது?"
author: Ori Pomerantz
tags: [ "திட்பம்", "பாலம்", "2ம் அடுக்கு" ]
skill: intermediate
published: 2022-03-30
lang: ta
---

[Optimism](https://www.optimism.io/) என்பது ஒரு [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/) ஆகும்.
எத்தேரியம் மெயின்நெட்டை விட (அடுக்கு 1 அல்லது L1 என்றும் அழைக்கப்படுகிறது) ஆப்டிமிஸ்டிக் ரோலப்களால் மிகவும் குறைந்த விலையில் பரிவர்த்தனைகளைச் செயல்படுத்த முடியும், ஏனெனில் நெட்வொர்க்கில் உள்ள ஒவ்வொரு முனைக்கும் பதிலாக சில முனைகளால் மட்டுமே பரிவர்த்தனைகள் செயல்படுத்தப்படுகின்றன.
அதே நேரத்தில், தரவு அனைத்தும் L1 இல் எழுதப்பட்டிருப்பதால், மெயின்நெட்டின் அனைத்து ஒருமைப்பாடு மற்றும் கிடைக்கும் தன்மை உத்தரவாதங்களுடன் எல்லாவற்றையும் நிரூபிக்கவும் புனரமைக்கவும் முடியும்.

ஆப்டிமிசத்தில் (அல்லது வேறு எந்த L2 இல்) L1 சொத்துகளைப் பயன்படுத்த, சொத்துகள் [பாலமிடப்பட](/bridges/#prerequisites) வேண்டும்.
இதை அடைவதற்கான ஒரு வழி, பயனர்கள் L1 இல் சொத்துக்களை (ETH மற்றும் [ERC-20 டோக்கன்கள்](/developers/docs/standards/tokens/erc-20/) மிகவும் பொதுவானவை) பூட்டி, L2 இல் பயன்படுத்த சமமான சொத்துக்களைப் பெறுவதாகும்.
இறுதியில், அவற்றை வைத்திருப்பவர் அவற்றை மீண்டும் L1 க்கு பாலமிட விரும்பலாம்.
இதைச் செய்யும்போது, சொத்துகள் L2 இல் எரிக்கப்பட்டு, பின்னர் L1 இல் உள்ள பயனருக்கு மீண்டும் விடுவிக்கப்படுகின்றன.

[ஆப்டிமிசம் ஸ்டாண்டர்டு பாலம்](https://docs.optimism.io/app-developers/bridging/standard-bridge) இப்படித்தான் செயல்படுகிறது.
இந்தக் கட்டுரையில், அந்த பாலம் எவ்வாறு செயல்படுகிறது என்பதைப் பார்ப்பதற்கும், நன்கு எழுதப்பட்ட சொலிடிட்டி குறியீட்டிற்கான எடுத்துக்காட்டாக அதைப் படிப்பதற்கும் அதன் மூலக் குறியீட்டைப் பார்ப்போம்.

## கட்டுப்பாட்டுப் பாய்வுகள் {#control-flows}

பாலத்தில் இரண்டு முக்கியப் பாய்வுகள் உள்ளன:

- டெபாசிட் (L1 இலிருந்து L2 வரை)
- திரும்பப் பெறுதல் (L2 இலிருந்து L1 வரை)

### டெபாசிட் பாய்வு {#deposit-flow}

#### அடுக்கு 1 {#deposit-flow-layer-1}

1. ஒரு ERC-20ஐ டெபாசிட் செய்தால், டெபாசிட் செய்பவர் டெபாசிட் செய்யப்படும் தொகையைச் செலவழிக்க பாலத்திற்கு ஒரு கொடுப்பனவை வழங்குகிறார்.
2. டெபாசிட் செய்பவர் L1 பாலத்தை அழைக்கிறார் (`depositERC20`, `depositERC20To`, `depositETH`, அல்லது `depositETHTo`)
3. L1 பாலம் பாலமிடப்பட்ட சொத்தின் உடைமையைப் பெறுகிறது.
   - ETH: அழைப்பின் ஒரு பகுதியாக சொத்து டெபாசிட் செய்பவரால் மாற்றப்படுகிறது.
   - ERC-20: டெபாசிட் செய்பவர் வழங்கிய கொடுப்பனவைப் பயன்படுத்தி சொத்து பாலத்தால் தனக்கே மாற்றப்படுகிறது.
4. L1 பாலம் L2 பாலத்தில் `finalizeDeposit`ஐ அழைக்க கிராஸ்-டொமைன் செய்தி பொறிமுறையைப் பயன்படுத்துகிறது.

#### அடுக்கு 2 {#deposit-flow-layer-2}

5. `finalizeDeposit` அழைப்பு முறையானதா என்பதை L2 பாலம் சரிபார்க்கிறது:
   - கிராஸ் டொமைன் செய்தி ஒப்பந்தத்திலிருந்து வந்தது
   - முதலில் L1 இல் உள்ள பாலத்திலிருந்து வந்தது
6. L2 இல் உள்ள ERC-20 டோக்கன் ஒப்பந்தம் சரியானதா என்பதை L2 பாலம் சரிபார்க்கிறது:
   - L2 ஒப்பந்தம் அதன் L1 பிரதி டோக்கன்கள் L1 இல் இருந்து வந்ததைப் போலவே இருப்பதாகத் தெரிவிக்கிறது.
   - L2 ஒப்பந்தம் சரியான இடைமுகத்தை ஆதரிப்பதாகத் தெரிவிக்கிறது ([ERC-165](https://eips.ethereum.org/EIPS/eip-165)ஐப் பயன்படுத்தி).
7. L2 ஒப்பந்தம் சரியானதாக இருந்தால், பொருத்தமான முகவரிக்கு பொருத்தமான எண்ணிக்கையிலான டோக்கன்களை உருவாக்க அதை அழைக்கவும். இல்லையெனில், L1 இல் உள்ள டோக்கன்களைப் பயனர் உரிமை கோர அனுமதிக்கும் விதத்தில் திரும்பப் பெறும் செயல்முறையைத் தொடங்கவும்.

### திரும்பப் பெறுதல் பாய்வு {#withdrawal-flow}

#### அடுக்கு 2 {#withdrawal-flow-layer-2}

1. திரும்பப் பெறுபவர் L2 பாலத்தை அழைக்கிறார் (`withdraw` அல்லது `withdrawTo`)
2. L2 பாலம் `msg.sender`க்கு சொந்தமான பொருத்தமான எண்ணிக்கையிலான டோக்கன்களை எரிக்கிறது.
3. L2 பாலம் L1 பாலத்தில் `finalizeETHWithdrawal` அல்லது `finalizeERC20Withdrawal` ஐ அழைக்க கிராஸ்-டொமைன் செய்தி பொறிமுறையைப் பயன்படுத்துகிறது.

#### அடுக்கு 1 {#withdrawal-flow-layer-1}

4. `finalizeETHWithdrawal` அல்லது `finalizeERC20Withdrawal` க்கான அழைப்பு முறையானதா என்பதை L1 பாலம் சரிபார்க்கிறது:
   - கிராஸ் டொமைன் செய்தி பொறிமுறையிலிருந்து வந்தது
   - முதலில் L2 இல் உள்ள பாலத்திலிருந்து வந்தது
5. L1 பாலம் பொருத்தமான சொத்தை (ETH அல்லது ERC-20) பொருத்தமான முகவரிக்கு மாற்றுகிறது.

## அடுக்கு 1 குறியீடு {#layer-1-code}

இது L1, எத்தேரியம் மெயின்நெட்டில் இயங்கும் குறியீடாகும்.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[இந்த இடைமுகம் இங்கு வரையறுக்கப்பட்டுள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
ERC-20 டோக்கன்களைப் பாலமிடுவதற்குத் தேவையான செயல்பாடுகள் மற்றும் வரையறைகள் இதில் அடங்கும்.

```solidity
// SPDX-License-Identifier: MIT
```

[ஆப்டிமிசத்தின் பெரும்பாலான குறியீடு MIT உரிமத்தின் கீழ் வெளியிடப்படுகிறது](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

இதை எழுதும்போது சொலிடிட்டியின் சமீபத்திய பதிப்பு 0.8.12 ஆகும்.
பதிப்பு 0.9.0 வெளியிடப்படும் வரை, இந்தக் குறியீடு அதனுடன் இணக்கமாக இருக்குமா இல்லையா என்பது எங்களுக்குத் தெரியாது.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * நிகழ்வுகள் *
     **********/

    event ERC20DepositInitiated(
```

ஆப்டிமிசம் பாலம் சொற்களஞ்சியத்தில் _டெபாசிட்_ என்பது L1 இலிருந்து L2 க்கு மாற்றுவதையும், _திரும்பப் பெறுதல்_ என்பது L2 இலிருந்து L1 க்கு மாற்றுவதையும் குறிக்கிறது.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

பெரும்பாலான சந்தர்ப்பங்களில் L1 இல் உள்ள ஒரு ERC-20 இன் முகவரி L2 இல் உள்ள சமமான ERC-20 இன் முகவரியாக இருக்காது.
[டோக்கன் முகவரிகளின் பட்டியலை நீங்கள் இங்கே பார்க்கலாம்](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 உள்ள முகவரி L1 (மெயின்நெட்) மற்றும் `chainId` 10 உள்ள முகவரி L2 (ஆப்டிமிசம்) இல் உள்ளது.
மற்ற இரண்டு `chainId` மதிப்புகள் கோவன் சோதனை நெட்வொர்க்கிற்கும் (42) ஆப்டிமிஸ்டிக் கோவன் சோதனை நெட்வொர்க்கிற்கும் (69) ஆகும்.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

மாற்றங்களுக்குக் குறிப்புகளைச் சேர்க்க முடியும், সেক্ষেত্রে அவை புகாரளிக்கும் நிகழ்வுகளுடன் சேர்க்கப்படும்.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

அதே பாலம் ஒப்பந்தம் இரு திசைகளிலும் இடமாற்றங்களைக் கையாளுகிறது.
L1 பாலத்தைப் பொறுத்தவரை, இது டெபாசிட்களைத் தொடங்குதல் மற்றும் திரும்பப் பெறுவதை இறுதி செய்தல் ஆகியவற்றைக் குறிக்கிறது.

```solidity

    /********************
     * பொது செயல்பாடுகள் *
     ********************/

    /**
     * @dev தொடர்புடைய L2 பாலம் ஒப்பந்தத்தின் முகவரியைப் பெறவும்.
     * @return தொடர்புடைய L2 பாலம் ஒப்பந்தத்தின் முகவரி.
     */
    function l2TokenBridge() external returns (address);
```

இந்தச் செயல்பாடு உண்மையில் தேவையில்லை, ஏனெனில் L2 இல் இது ஒரு முன் வரிசைப்படுத்தப்பட்ட ஒப்பந்தமாகும், எனவே இது எப்போதும் `0x4200000000000000000000000000000000000010` முகவரியில் இருக்கும்.
L2 பாலத்துடனான சமச்சீர்மைக்காக இது இங்கே உள்ளது, ஏனெனில் L1 பாலத்தின் முகவரி அறிவது அற்பமானதல்ல.

```solidity
    /**
     * @dev L2 இல் அழைப்பாளரின் இருப்புக்கு ERC20 தொகையை டெபாசிட் செய்யவும்.
     * @param _l1Token நாங்கள் டெபாசிட் செய்யும் L1 ERC20 இன் முகவரி
     * @param _l2Token L1 இன் அந்தந்த L2 ERC20 இன் முகவரி
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20 இன் அளவு
     * @param _l2Gas L2 இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2க்கு அனுப்ப விருப்பத் தரவு. இந்தத் தரவு வழங்கப்பட்டுள்ளது
     *        வெளிப்புற ஒப்பந்தங்களுக்கான வசதிக்காக மட்டுமே. அதிகபட்சமாகச் செயல்படுத்துவதைத் தவிர
     *        நீளம், இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கம் பற்றி எந்த உத்தரவாதமும் அளிக்காது.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` அளவுரு என்பது பரிவர்த்தனை செலவழிக்க அனுமதிக்கப்படும் L2 கேஸ் அளவாகும்.
[ஒரு குறிப்பிட்ட (உயர்) வரம்பு வரை, இது இலவசம்](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), எனவே ERC-20 ஒப்பந்தம் உருவாக்கும் போது மிகவும் விசித்திரமான ஒன்றைச் செய்யாத வரை, அது ஒரு பிரச்சினையாக இருக்கக்கூடாது.
இந்தப் பொதுவான சூழ்நிலையை இந்தச் செயல்பாடு கவனித்துக்கொள்கிறது, அங்கு ஒரு பயனர் ஒரு வேறுபட்ட பிளாக்செயினில் அதே முகவரிக்கு சொத்துக்களைப் பாலமிடுகிறார்.

```solidity
    /**
     * @dev L2 இல் ஒரு பெறுநரின் இருப்புக்கு ERC20 தொகையை டெபாசிட் செய்யவும்.
     * @param _l1Token நாங்கள் டெபாசிட் செய்யும் L1 ERC20 இன் முகவரி
     * @param _l2Token L1 இன் அந்தந்த L2 ERC20 இன் முகவரி
     * @param _to திரும்பப் பெறுதலை வரவு வைக்க L2 முகவரி.
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20 இன் அளவு.
     * @param _l2Gas L2 இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2க்கு அனுப்ப விருப்பத் தரவு. இந்தத் தரவு வழங்கப்பட்டுள்ளது
     *        வெளிப்புற ஒப்பந்தங்களுக்கான வசதிக்காக மட்டுமே. அதிகபட்சமாகச் செயல்படுத்துவதைத் தவிர
     *        நீளம், இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கம் பற்றி எந்த உத்தரவாதமும் அளிக்காது.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

இந்தச் செயல்பாடு `depositERC20` உடன் கிட்டத்தட்ட ஒரே மாதிரியாக உள்ளது, ஆனால் இது ERC-20ஐ வேறு முகவரிக்கு அனுப்ப உங்களை அனுமதிக்கிறது.

```solidity
    /*************************
     * கிராஸ்-செயின் செயல்பாடுகள் *
     *************************/

    /**
     * @dev L2 இலிருந்து L1 க்கு திரும்பப் பெறுவதை முடித்து, பெறுநரின் இருப்புக்கு நிதியை வரவு வைக்கவும்.
     * L1 ERC20 டோக்கன்.
     * L2 இலிருந்து தொடங்கப்பட்ட திரும்பப் பெறுதல் இறுதி செய்யப்படவில்லை என்றால் இந்த அழைப்பு தோல்வியடையும்.
     *
     * @param _l1Token finalizeWithdrawal க்கான L1 டோக்கனின் முகவரி.
     * @param _l2Token திரும்பப் பெறுதல் தொடங்கப்பட்ட L2 டோக்கனின் முகவரி.
     * @param _from பரிமாற்றத்தைத் தொடங்கும் L2 முகவரி.
     * @param _to திரும்பப் பெறுதலை வரவு வைக்க L1 முகவரி.
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20 இன் அளவு.
     * @param _data L2 இல் அனுப்புநர் வழங்கிய தரவு. இந்தத் தரவு வழங்கப்பட்டுள்ளது
     *   வெளிப்புற ஒப்பந்தங்களுக்கான வசதிக்காக மட்டுமே. அதிகபட்சமாகச் செயல்படுத்துவதைத் தவிர
     *   நீளம், இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கம் பற்றி எந்த உத்தரவாதமும் அளிக்காது.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

ஆப்டிமிசத்தில் திரும்பப் பெறுதல் (மற்றும் L2 இலிருந்து L1 க்கான பிற செய்திகள்) ஒரு இரு-படி செயல்முறையாகும்:

1. L2 இல் ஒரு தொடக்கப் பரிவர்த்தனை.
2. L1 இல் ஒரு இறுதி அல்லது உரிமை கோரும் பரிவர்த்தனை.
   L2 பரிவர்த்தனைக்கான [தவறு சவால் காலம்](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) முடிந்த பிறகு இந்தப் பரிவர்த்தனை நடக்க வேண்டும்.

### IL1StandardBridge {#il1standardbridge}

[இந்த இடைமுகம் இங்கு வரையறுக்கப்பட்டுள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
இந்தக் கோப்பில் ETH க்கான நிகழ்வு மற்றும் செயல்பாட்டு வரையறைகள் உள்ளன.
இந்த வரையறைகள் ERC-20 க்காக மேலே உள்ள `IL1ERC20Bridge` இல் வரையறுக்கப்பட்டவற்றைப் போலவே உள்ளன.

சில ERC-20 டோக்கன்களுக்கு தனிப்பயன் செயலாக்கம் தேவைப்படுவதாலும், ஸ்டாண்டர்டு பாலத்தால் கையாள முடியாததாலும், பாலம் இடைமுகம் இரண்டு கோப்புகளுக்கு இடையில் பிரிக்கப்பட்டுள்ளது.
இந்த வழியில், அத்தகைய டோக்கனைக் கையாளும் தனிப்பயன் பாலம் `IL1ERC20Bridge`ஐ செயல்படுத்த முடியும் மற்றும் ETH ஐயும் பாலமிட வேண்டியதில்லை.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * நிகழ்வுகள் *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

L1 மற்றும் L2 டோக்கன் முகவரிகள் இல்லாமல், இந்த நிகழ்வு ERC-20 பதிப்பிற்கு (`ERC20DepositInitiated`) கிட்டத்தட்ட ஒத்ததாக உள்ளது.
மற்ற நிகழ்வுகளுக்கும் செயல்பாடுகளுக்கும் இதுவே பொருந்தும்.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * பொது செயல்பாடுகள் *
     ********************/

    /**
     * @dev L2 இல் அழைப்பாளரின் இருப்புக்கு ETH இன் ஒரு பகுதியை டெபாசிட் செய்யவும்.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev L2 இல் பெறுநரின் இருப்புக்கு ETH இன் ஒரு பகுதியை டெபாசிட் செய்யவும்.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * கிராஸ்-செயின் செயல்பாடுகள் *
     *************************/

    /**
     * @dev L2 இலிருந்து L1 க்கு திரும்பப் பெறுவதை முடித்து, பெறுநரின் இருப்புக்கு நிதியை வரவு வைக்கவும்.
     * L1 ETH டோக்கன். xDomainMessenger மட்டுமே இந்தச் செயல்பாட்டை அழைக்க முடியும் என்பதால், அது ஒருபோதும் அழைக்கப்படாது
     * திரும்பப் பெறுவது இறுதி செய்யப்படும் முன்.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[இந்த ஒப்பந்தம்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) இரண்டு பாலங்களாலும் ([L1](#the-l1-bridge-contract) மற்றும் [L2](#the-l2-bridge-contract)) மற்ற அடுக்குக்கு செய்திகளை அனுப்ப மரபுரிமையாகப் பெறப்படுகிறது.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[இந்த இடைமுகம்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) கிராஸ் டொமைன் மெசஞ்சரைப் பயன்படுத்தி, மற்ற அடுக்குக்கு செய்திகளை எப்படி அனுப்புவது என்று ஒப்பந்தத்திற்குச் சொல்கிறது.
இந்த கிராஸ் டொமைன் மெசஞ்சர் முற்றிலும் வேறுபட்ட அமைப்பு, மேலும் அதன் சொந்த கட்டுரைக்குத் தகுதியானது, அதை நான் எதிர்காலத்தில் எழுத நம்புகிறேன்.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev கிராஸ்-டொமைன் தகவல்தொடர்புகளைச் செய்யும் ஒப்பந்தங்களுக்கான உதவி ஒப்பந்தம்
 *
 * பயன்படுத்தப்பட்ட தொகுப்பி: மரபுரிமை பெற்ற ஒப்பந்தத்தால் வரையறுக்கப்பட்டது
 */
contract CrossDomainEnabled {
    /*************
     * மாறிகள் *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * கட்டமைப்பாளர் *
     ***************/

    /**
     * @param _messenger தற்போதைய அடுக்கில் உள்ள கிராஸ்-டொமைன் மெசஞ்சரின் முகவரி.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

ஒப்பந்தம் தெரிந்து கொள்ள வேண்டிய ஒரே அளவுரு, இந்த அடுக்கில் உள்ள கிராஸ் டொமைன் மெசஞ்சரின் முகவரி ஆகும்.
இந்த அளவுரு ஒருமுறை கட்டமைப்பாளரில் அமைக்கப்பட்டது, அது ஒருபோதும் மாறாது.

```solidity

    /**********************
     * செயல்பாட்டு மாற்றியமைப்பாளர்கள் *
     **********************/

    /**
     * மாற்றியமைக்கப்பட்ட செயல்பாடு ஒரு குறிப்பிட்ட கிராஸ்-டொமைன் கணக்கிலிருந்து மட்டுமே அழைக்கக்கூடியது என்பதை இது செயல்படுத்துகிறது.
     * @param _sourceDomainAccount இந்தச் செயல்பாட்டை அழைக்க அங்கீகரிக்கப்பட்ட அசல் டொமைனில் உள்ள ஒரே கணக்கு.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

கிராஸ் டொமைன் செய்தி அனுப்புதல் அது இயங்கும் பிளாக்செயினில் (எத்தேரியம் மெயின்நெட் அல்லது ஆப்டிமிசம்) உள்ள எந்தவொரு ஒப்பந்தத்தாலும் அணுகக்கூடியது.
ஆனால் ஒவ்வொரு பக்கத்திலும் உள்ள பாலம் மறுபக்கத்தில் உள்ள பாலத்திலிருந்து வந்தால் மட்டுமே சில செய்திகளை நம்ப வேண்டும்.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

பொருத்தமான கிராஸ் டொமைன் மெசஞ்சரிடமிருந்து (`மெசஞ்சர்`, கீழே நீங்கள் காண்பது போல்) வரும் செய்திகளை மட்டுமே நம்ப முடியும்.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

மற்றொரு அடுக்குடன் ஒரு செய்தியை அனுப்பிய முகவரியை கிராஸ் டொமைன் மெசஞ்சர் வழங்கும் வழி [`.xDomainMessageSender()` செயல்பாடு](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128) ஆகும்.
செய்தியால் தொடங்கப்பட்ட பரிவர்த்தனையில் அது அழைக்கப்படும் வரை இந்தத் தகவலை வழங்க முடியும்.

நாங்கள் பெற்ற செய்தி மற்ற பாலத்திலிருந்து வந்ததா என்பதை நாங்கள் உறுதி செய்ய வேண்டும்.

```solidity

        _;
    }

    /**********************
     * உள் செயல்பாடுகள் *
     **********************/

    /**
     * மெசஞ்சரைப் பெறுகிறது, பொதுவாக சேமிப்பகத்திலிருந்து. ஒரு குழந்தை ஒப்பந்தம் தேவைப்பட்டால் இந்தச் செயல்பாடு வெளிப்படுத்தப்படும்
     * மேலெழுத வேண்டும்.
     * @return பயன்படுத்தப்பட வேண்டிய கிராஸ்-டொமைன் மெசஞ்சர் ஒப்பந்தத்தின் முகவரி.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

இந்த செயல்பாடு கிராஸ் டொமைன் மெசஞ்சரை வழங்குகிறது.
எந்த கிராஸ் டொமைன் மெசஞ்சரைப் பயன்படுத்த வேண்டும் என்பதைக் குறிப்பிட ஒரு நெறிமுறையைப் பயன்படுத்த, இதிலிருந்து மரபுரிமையாகப் பெறப்பட்ட ஒப்பந்தங்களை அனுமதிக்க, `மெசஞ்சர்` என்ற மாறியை விட ஒரு செயல்பாட்டைப் பயன்படுத்துகிறோம்.

```solidity

    /**
     * மற்றொரு டொமைனில் உள்ள கணக்கிற்கு ஒரு செய்தியை அனுப்புகிறது
     * @param _crossDomainTarget இலக்கு டொமைனில் உத்தேசிக்கப்பட்ட பெறுநர்
     * @param _message இலக்குக்கு அனுப்ப வேண்டிய தரவு (பொதுவாக ஒரு செயல்பாட்டிற்கு calldata உடன்
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit இலக்கு டொமைனில் செய்தியைப் பெறுவதற்கான கேஸ் லிமிட்.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

இறுதியாக, மற்ற அடுக்குக்கு ஒரு செய்தியை அனுப்பும் செயல்பாடு.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) என்பது பாதிப்புகள் மற்றும் பிற சாத்தியமான சிக்கல்களைத் தேட ஒவ்வொரு ஒப்பந்தத்திலும் ஆப்டிமிசம் இயங்கும் ஒரு நிலையான பகுப்பாய்வியாகும்.
இந்த விஷயத்தில், பின்வரும் வரி இரண்டு பாதிப்புகளைத் தூண்டுகிறது:

1. [மறுநுழைவு நிகழ்வுகள்](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [தீங்கற்ற மறுநுழைவு](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

இந்த விஷயத்தில், `getCrossDomainMessenger()` ஒரு நம்பகமான முகவரியை வழங்குவதை நாங்கள் அறிந்திருப்பதால், மறுநுழைவு பற்றி நாங்கள் கவலைப்படவில்லை, ஸ்லித்தருக்கு அதை அறிய வழி இல்லை என்றாலும்.

### L1 பாலம் ஒப்பந்தம் {#the-l1-bridge-contract}

[இந்த ஒப்பந்தத்திற்கான மூலக் குறியீடு இங்கே உள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

இடைமுகங்கள் மற்ற ஒப்பந்தங்களின் ஒரு பகுதியாக இருக்கலாம், எனவே அவை பரந்த அளவிலான சொலிடிட்டி பதிப்புகளை ஆதரிக்க வேண்டும்.
ஆனால் பாலம் என்பது எங்கள் ஒப்பந்தம், மேலும் அது எந்த சொலிடிட்டி பதிப்பைப் பயன்படுத்துகிறது என்பதில் நாங்கள் கண்டிப்பாக இருக்க முடியும்.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) மற்றும் [IL1StandardBridge](#IL1StandardBridge) மேலே விளக்கப்பட்டுள்ளன.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[இந்த இடைமுகம்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) L2 இல் உள்ள ஸ்டாண்டர்டு பாலத்தைக் கட்டுப்படுத்த செய்திகளை உருவாக்க உதவுகிறது.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[இந்த இடைமுகம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ERC-20 ஒப்பந்தங்களைக் கட்டுப்படுத்த உதவுகிறது.
[இதைப் பற்றி மேலும் இங்கே படிக்கலாம்](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[மேலே விளக்கப்பட்டுள்ளபடி](#crossdomainenabled), இந்த ஒப்பந்தம் இன்டர்லேயர் செய்தி அனுப்புதலுக்குப் பயன்படுத்தப்படுகிறது.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

`Lib_PredeployAddresses` ([https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)) எப்போதும் ஒரே முகவரியைக் கொண்டிருக்கும் L2 ஒப்பந்தங்களுக்கான முகவரிகளைக் கொண்டுள்ளது. இதில் L2 இல் உள்ள ஸ்டாண்டர்டு பாலம் அடங்கும்.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin's Address utilities](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). ஒப்பந்த முகவரிகளுக்கும் வெளிப்புறமாகச் சொந்தமான கணக்குகளுக்கும் (EOA) இடையிலான வேறுபாட்டிற்கு இது பயன்படுத்தப்படுகிறது.

இது ஒரு சரியான தீர்வு அல்ல என்பதை நினைவில் கொள்க, ஏனெனில் நேரடி அழைப்புகளுக்கும் ஒரு ஒப்பந்தத்தின் கட்டமைப்பாளரிடமிருந்து செய்யப்படும் அழைப்புகளுக்கும் இடையில் வேறுபாடு காட்ட வழி இல்லை, ஆனால் குறைந்தபட்சம் இது சில பொதுவான பயனர் பிழைகளைக் கண்டறிந்து தடுக்க உதவுகிறது.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 தரநிலை](https://eips.ethereum.org/EIPS/eip-20) தோல்வியைப் புகாரளிக்க ஒரு ஒப்பந்தத்திற்கு இரண்டு வழிகளை ஆதரிக்கிறது:

1. திரும்பப்பெறு
2. `false` என்பதைத் திருப்பி அனுப்புக

இரண்டு நிகழ்வுகளையும் கையாள்வது எங்கள் குறியீட்டை மிகவும் சிக்கலாக்கும், எனவே அதற்கு பதிலாக நாங்கள் [OpenZeppelin's `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)ஐப் பயன்படுத்துகிறோம், இது [அனைத்து தோல்விகளும் திரும்பப்பெறுவதில் விளைவதை](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) உறுதி செய்கிறது.

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH மற்றும் ERC20 பாலம் என்பது டெபாசிட் செய்யப்பட்ட L1 நிதிகள் மற்றும் L2 இல் பயன்பாட்டில் உள்ள ஸ்டாண்டர்டு டோக்கன்களை சேமிக்கும் ஒரு ஒப்பந்தமாகும்.
 * இது ஒரு தொடர்புடைய L2 பாலத்தை ஒத்திசைக்கிறது, டெபாசிட்கள் குறித்து அதற்குத் தெரிவிக்கிறது
 * மற்றும் புதிதாக இறுதி செய்யப்பட்ட திரும்பப் பெறுதல்களுக்காக அதைக் கேட்கிறது.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

`IERC20` இடைமுகத்தை ஒவ்வொரு முறையும் பயன்படுத்தும்போது `SafeERC20` ரேப்பரைப் பயன்படுத்த வேண்டும் என்பதைக் குறிப்பிடுவது இந்த வரியாகும்.

```solidity

    /********************************
     * வெளிப்புற ஒப்பந்தக் குறிப்புகள் *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) முகவரி.

```solidity

    // L1 டோக்கனை L2 டோக்கனுக்கு டெபாசிட் செய்யப்பட்ட L1 டோக்கனின் இருப்புக்கு மேப் செய்கிறது.
    mapping(address => mapping(address => uint256)) public deposits;
```

இது போன்ற ஒரு இரட்டை [மேப்பிங்](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) என்பது ஒரு [இரு பரிமாண சிதறிய அணியை](https://en.wikipedia.org/wiki/Sparse_matrix) வரையறுக்கும் வழியாகும்.
இந்தத் தரவு கட்டமைப்பில் உள்ள மதிப்புகள் `deposit[L1 டோக்கன் addr][L2 டோக்கன் addr]` என அடையாளம் காணப்படுகின்றன.
இயல்புநிலை மதிப்பு பூஜ்ஜியம்.
வேறுபட்ட மதிப்புக்கு அமைக்கப்பட்ட செல்கள் மட்டுமே சேமிப்பகத்தில் எழுதப்படும்.

```solidity

    /***************
     * கட்டமைப்பாளர் *
     ***************/

    // இந்த ஒப்பந்தம் ஒரு ப்ராக்ஸியின் பின்னால் வாழ்கிறது, எனவே கட்டமைப்பாளர் அளவுருக்கள் பயன்படுத்தப்படாது.
    constructor() CrossDomainEnabled(address(0)) {}
```

சேமிப்பகத்தில் உள்ள அனைத்து மாறிகளையும் நகலெடுக்க வேண்டிய அவசியமின்றி இந்த ஒப்பந்தத்தை மேம்படுத்த விரும்புகிறோம்.
அதைச் செய்ய, நாங்கள் ஒரு [`ப்ராக்ஸி`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)யைப் பயன்படுத்துகிறோம், இது ப்ராக்ஸி ஒப்பந்தத்தால் சேமிக்கப்பட்ட முகவரியைக் கொண்ட ஒரு தனி ஒப்பந்தத்திற்கு அழைப்புகளை மாற்ற [`delegatecall`](https://solidity-by-example.org/delegatecall/) ஐப் பயன்படுத்தும் ஒரு ஒப்பந்தமாகும் (நீங்கள் மேம்படுத்தும்போது அந்த முகவரியை மாற்றுமாறு ப்ராக்ஸியிடம் கூறுங்கள்).
நீங்கள் `delegatecall` ஐப் பயன்படுத்தும் போது, சேமிப்பகம் _அழைக்கும்_ ஒப்பந்தத்தின் சேமிப்பகமாகவே உள்ளது, எனவே அனைத்து ஒப்பந்த நிலை மாறிகளின் மதிப்புகளும் பாதிக்கப்படாது.

இந்த முறையின் ஒரு விளைவு என்னவென்றால், `delegatecall` இன் _அழைக்கப்பட்ட_ ஒப்பந்தத்தின் சேமிப்பகம் பயன்படுத்தப்படவில்லை, எனவே அதற்குக் கொடுக்கப்பட்ட கட்டமைப்பாளர் மதிப்புகள் முக்கியமில்லை.
`CrossDomainEnabled` கட்டமைப்பாளருக்கு நாம் ஒரு அர்த்தமற்ற மதிப்பை வழங்க முடியும் என்பது இதற்குக் காரணம்.
கீழே உள்ள தொடக்கம் கட்டமைப்பாளரிடமிருந்து பிரிக்கப்பட்டதற்கும் இதுவே காரணம்.

```solidity
    /******************
     * தொடங்குதல் *
     ******************/

    /**
     * @param _l1messenger கிராஸ்-செயின் தகவல்தொடர்புகளுக்குப் பயன்படுத்தப்படும் L1 மெசஞ்சர் முகவரி.
     * @param _l2TokenBridge L2 ஸ்டாண்டர்டு பாலம் முகவரி.
     */
    // slither-disable-next-line external-function
```

இந்த [Slither சோதனை](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ஒப்பந்தக் குறியீட்டிலிருந்து அழைக்கப்படாத செயல்பாடுகளை அடையாளம் கண்டு, எனவே `public` க்கு பதிலாக `external` என அறிவிக்கப்படலாம்.
`external` செயல்பாடுகளின் கேஸ் செலவு குறைவாக இருக்கலாம், ஏனெனில் அவை calldataவில் உள்ள அளவுருக்களுடன் வழங்கப்படலாம்.
`public` என அறிவிக்கப்பட்ட செயல்பாடுகள் ஒப்பந்தத்திற்குள் இருந்து அணுகக்கூடியதாக இருக்க வேண்டும்.
ஒப்பந்தங்கள் தங்கள் சொந்த calldataவை மாற்ற முடியாது, எனவே அளவுருக்கள் நினைவகத்தில் இருக்க வேண்டும்.
அத்தகைய ஒரு செயல்பாடு வெளிப்புறமாக அழைக்கப்படும்போது, calldataவை நினைவகத்திற்கு நகலெடுப்பது அவசியம், இது கேஸ் செலவாகும்.
இந்த விஷயத்தில் செயல்பாடு ஒரு முறை மட்டுமே அழைக்கப்படுகிறது, எனவே திறமையின்மை எங்களுக்கு ஒரு பொருட்டல்ல.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "ஒப்பந்தம் ஏற்கனவே தொடங்கப்பட்டுள்ளது.");
```

`initialize` செயல்பாடு ஒரு முறை மட்டுமே அழைக்கப்பட வேண்டும்.
L1 கிராஸ் டொமைன் மெசஞ்சர் அல்லது L2 டோக்கன் பாலத்தின் முகவரி மாறினால், ஒரு புதிய ப்ராக்ஸியையும், அதை அழைக்கும் ஒரு புதிய பாலத்தையும் உருவாக்குகிறோம்.
முழு அமைப்பும் மேம்படுத்தப்படும்போது தவிர, இது மிகவும் அரிதான நிகழ்வாக நடக்க வாய்ப்பில்லை.

இந்தச் செயல்பாட்டில் _யார்_ அதை அழைக்கலாம் என்பதைக் கட்டுப்படுத்தும் எந்தவொரு பொறிமுறையும் இல்லை என்பதைக் கவனத்தில் கொள்க.
இதன் பொருள், கோட்பாட்டளவில், ஒரு தாக்குதல்காரர் நாங்கள் ப்ராக்ஸியையும் பாலத்தின் முதல் பதிப்பையும் பயன்படுத்தும் வரை காத்திருக்கலாம், பின்னர் சட்டப்பூர்வ பயனர் செய்வதற்கு முன்பு `initialize` செயல்பாட்டை அடைய [முன் ஓட்டம்](https://solidity-by-example.org/hacks/front-running/) செய்யலாம். ஆனால் இதைத் தடுக்க இரண்டு முறைகள் உள்ளன:

1. ஒப்பந்தங்கள் நேரடியாக ஒரு EOA மூலம் பயன்படுத்தப்படாமல், [அவற்றை உருவாக்கும் மற்றொரு ஒப்பந்தத்தைக் கொண்ட பரிவர்த்தனையில்](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) இருந்தால், முழு செயல்முறையும் அணுவாக இருக்கலாம், மேலும் வேறு எந்த பரிவர்த்தனையும் செயல்படுத்தப்படுவதற்கு முன்பு முடிவடையும்.
2. `initialize` க்கான சட்டப்பூர்வ அழைப்பு தோல்வியுற்றால், புதிதாக உருவாக்கப்பட்ட ப்ராக்ஸி மற்றும் பாலத்தை புறக்கணித்து புதியவற்றை உருவாக்குவது எப்போதும் சாத்தியமாகும்.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

பாலம் தெரிந்து கொள்ள வேண்டிய இரண்டு அளவுருக்கள் இவை.

```solidity

    /**************
     * டெபாசிட்டிங் *
     **************/

    /** @dev அனுப்புநர் EOA ஆக இருக்க வேண்டிய மாற்றியமைப்பான். இந்தச் சோதனை ஒரு தீங்கிழைக்கும்
     *  ஒப்பந்தம் வழியாக initcode வழியாக கடந்து செல்லப்படலாம், ஆனால் இது நாம் தவிர்க்க விரும்பும் பயனர் பிழையைக் கவனித்துக்கொள்கிறது.
     */
    modifier onlyEOA() {
        // ஒப்பந்தங்களிலிருந்து டெபாசிட்களைத் தடுக்கப் பயன்படுகிறது (தற்செயலாக இழந்த டோக்கன்களைத் தவிர்க்க)
        require(!Address.isContract(msg.sender), "கணக்கு EOA அல்ல");
        _;
    }
```

OpenZeppelin இன் `முகவரி` பயன்பாடுகள் எங்களுக்குத் தேவைப்படுவதற்கு இதுவே காரணம்.

```solidity
    /**
     * @dev இந்தச் செயல்பாட்டை தரவு இல்லாமல் அழைக்கலாம்
     * L2 இல் அழைப்பாளரின் இருப்புக்கு ETH தொகையை டெபாசிட் செய்ய.
     * பெறுதல் செயல்பாடு தரவை எடுக்காததால், ஒரு பழமைவாத
     * இயல்புநிலைத் தொகை L2 க்கு அனுப்பப்படுகிறது.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

இந்தச் செயல்பாடு சோதனை நோக்கங்களுக்காக உள்ளது.
இது இடைமுக வரையறைகளில் தோன்றவில்லை என்பதைக் கவனியுங்கள் - இது சாதாரண பயன்பாட்டிற்காக அல்ல.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

இந்த இரண்டு செயல்பாடுகளும் உண்மையான ETH டெபாசிட்டைக் கையாளும் செயல்பாடான `_initiateETHDeposit`ஐச் சுற்றியுள்ள ரேப்பர்கள் ஆகும்.

```solidity
    /**
     * @dev ETH ஐச் சேமித்து, L2 ETH கேட்வேக்கு டெபாசிட் குறித்துத் தெரிவிப்பதன் மூலம் டெபாசிட்களுக்கான தர்க்கத்தைச் செய்கிறது.
     * @param _from L1 இல் இருந்து டெபாசிட்டைப் பெற கணக்கு.
     * @param _to L2 இல் டெபாசிட்டைக் கொடுக்க கணக்கு.
     * @param _l2Gas L2 இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2க்கு அனுப்ப விருப்பத் தரவு. இந்தத் தரவு வழங்கப்பட்டுள்ளது
     *        வெளிப்புற ஒப்பந்தங்களுக்கான வசதிக்காக மட்டுமே. அதிகபட்சமாகச் செயல்படுத்துவதைத் தவிர
     *        நீளம், இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கம் பற்றி எந்த உத்தரவாதமும் அளிக்காது.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit அழைப்பிற்கான calldataவை உருவாக்குங்கள்
        bytes memory message = abi.encodeWithSelector(
```

கிராஸ் டொமைன் செய்திகள் செயல்படும் வழி என்னவென்றால், இலக்கு ஒப்பந்தம் செய்தியுடன் அதன் கால்தேட்டாவாக அழைக்கப்படுகிறது.
சொலிடிட்டி ஒப்பந்தங்கள் எப்போதும் அவற்றின் கால்தேட்டாவை [ABI விவரக்குறிப்புகளுக்கு](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) ஏற்ப விளக்குகின்றன.
சொலிடிட்டி செயல்பாடு [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) அந்தக் கால்தேட்டாவை உருவாக்குகிறது.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

இங்கே செய்தி இந்த அளவுருக்களுடன் [ `finalizeDeposit` செயல்பாட்டை](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) அழைப்பதாகும்:

| அளவுரு                          | மதிப்பு                                                                                  | பொருள்                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | முகவரி(0)                                                             | L1 இல் ETH (இது ஒரு ERC-20 டோக்கன் அல்ல) க்கு நிற்க சிறப்பு மதிப்பு                                                                                  |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | ஆப்டிமிசத்தில் ETH ஐ நிர்வகிக்கும் L2 ஒப்பந்தம், `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (இந்த ஒப்பந்தம் உள் ஆப்டிமிசம் பயன்பாட்டிற்கு மட்டுமே) |
| \_from    | \_from                                                             | L1 இல் ETH ஐ அனுப்பும் முகவரி                                                                                                                                           |
| \_to      | \_to                                                               | L2 இல் ETH ஐப் பெறும் முகவரி                                                                                                                                            |
| தொகை                            | msg.value                                                                | அனுப்பப்பட்ட wei இன் அளவு (இது ஏற்கனவே பாலத்திற்கு அனுப்பப்பட்டுள்ளது)                                                                               |
| \_data    | \_data                                                             | டெபாசிட்டில் இணைக்க கூடுதல் தரவு                                                                                                                                        |

```solidity
        // கால்தேட்டாவை L2 இல் அனுப்புங்கள்
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

கிராஸ் டொமைன் மெசஞ்சர் மூலம் செய்தியை அனுப்பவும்.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

இந்த இடமாற்றத்தைக் கேட்கும் எந்தவொரு பரவலாக்கப்பட்ட பயன்பாட்டிற்கும் தெரிவிக்க ஒரு நிகழ்வை வெளியிடுங்கள்.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

இந்த இரண்டு செயல்பாடுகளும் உண்மையான ERC-20 டெபாசிட்டைக் கையாளும் செயல்பாடான `_initiateERC20Deposit`ஐச் சுற்றியுள்ள ரேப்பர்கள் ஆகும்.

```solidity
    /**
     * @dev டெபாசிட் செய்யப்பட்ட டோக்கன் ஒப்பந்தத்திற்கு டெபாசிட் குறித்துத் தெரிவிப்பதன் மூலம் டெபாசிட்களுக்கான தர்க்கத்தைச் செய்கிறது.
     * L2 நிதிகளைப் பூட்ட ஒரு ஹேண்ட்லரை அழைத்தல். (எ.கா., transferFrom)
     *
     * @param _l1Token நாங்கள் டெபாசிட் செய்யும் L1 ERC20 இன் முகவரி
     * @param _l2Token L1 இன் அந்தந்த L2 ERC20 இன் முகவரி
     * @param _from L1 இல் இருந்து டெபாசிட்டைப் பெற கணக்கு
     * @param _to L2 இல் டெபாசிட்டைக் கொடுக்க கணக்கு
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20 இன் அளவு.
     * @param _l2Gas L2 இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2க்கு அனுப்ப விருப்பத் தரவு. இந்தத் தரவு வழங்கப்பட்டுள்ளது
     *        வெளிப்புற ஒப்பந்தங்களுக்கான வசதிக்காக மட்டுமே. அதிகபட்சமாகச் செயல்படுத்துவதைத் தவிர
     *        நீளம், இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கம் பற்றி எந்த உத்தரவாதமும் அளிக்காது.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

இந்தச் செயல்பாடு மேலே உள்ள `_initiateETHDeposit`ஐப் போன்றது, சில முக்கியமான வேறுபாடுகளுடன்.
முதல் வேறுபாடு என்னவென்றால், இந்தச் செயல்பாடு டோக்கன் முகவரிகளையும், அளவுருக்களாக மாற்ற வேண்டிய தொகையையும் பெறுகிறது.
ETH ஐப் பொறுத்தவரை, பாலத்திற்கான அழைப்பில் ஏற்கனவே சொத்து பாலக் கணக்கிற்கு மாற்றுவது (`msg.value`) அடங்கும்.

```solidity
        // L1 இல் டெபாசிட் தொடங்கப்பட்டதும், L1 பாலம் எதிர்கால திரும்பப் பெறுதல்களுக்காக நிதியைத் தனக்குத்தானே மாற்றும். safeTransferFrom ஒப்பந்தத்தில் குறியீடு உள்ளதா என்பதையும் சரிபார்க்கிறது, எனவே _from ஒரு EOA அல்லது முகவரி(0) ஆக இருந்தால் இது தோல்வியடையும்.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 டோக்கன் இடமாற்றங்கள் ETH இலிருந்து வேறுபட்ட செயல்முறையைப் பின்பற்றுகின்றன:

1. பயனர் (`_from`) பொருத்தமான டோக்கன்களை மாற்ற பாலத்திற்கு ஒரு கொடுப்பனவை வழங்குகிறார்.
2. பயனர் டோக்கன் ஒப்பந்தத்தின் முகவரி, தொகை போன்றவற்றைக் கொண்டு பாலத்தை அழைக்கிறார்.
3. பாலம் டெபாசிட் செயல்முறையின் ஒரு பகுதியாக டோக்கன்களை (தனக்கே) மாற்றுகிறது.

முதல் படி கடைசி இரண்டு பரிவர்த்தனையிலிருந்து ஒரு தனி பரிவர்த்தனையில் நடக்கலாம்.
இருப்பினும், முன்-ஓட்டம் ஒரு பிரச்சனை அல்ல, ஏனெனில் `_initiateERC20Deposit` (`depositERC20` மற்றும் `depositERC20To`) ஐ அழைக்கும் இரண்டு செயல்பாடுகள் `_from` அளவுருவாக `msg.sender` உடன் மட்டுமே இந்தச் செயல்பாட்டை அழைக்கின்றன.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) க்கான கால்தேட்டாவை உருவாக்குங்கள்
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // கால்தேட்டாவை L2 இல் அனுப்புங்கள்
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

`deposits` தரவு அமைப்பில் டெபாசிட் செய்யப்பட்ட டோக்கன்களின் அளவைச் சேர்க்கவும்.
ஒரே L1 ERC-20 டோக்கனுக்குரிய பல முகவரிகள் L2 இல் இருக்கலாம், எனவே டெபாசிட்களைக் கண்காணிக்க பாலத்தின் L1 ERC-20 டோக்கன் இருப்பைப் பயன்படுத்துவது போதுமானதல்ல.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * கிராஸ்-செயின் செயல்பாடுகள் *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 பாலம் L2 கிராஸ் டொமைன் மெசஞ்சருக்கு ஒரு செய்தியை அனுப்புகிறது, இது L1 கிராஸ் டொமைன் மெசஞ்சரை இந்தச் செயல்பாட்டை அழைக்கச் செய்கிறது ([செய்தியை இறுதி செய்யும் பரிவர்த்தனை](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1 இல் சமர்ப்பிக்கப்பட்டவுடன், நிச்சயமாக).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

இது கிராஸ் டொமைன் மெசஞ்சரிடமிருந்து மற்றும் L2 டோக்கன் பாலத்திலிருந்து உருவாகும் ஒரு _சட்டப்பூர்வமான_ செய்தி என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.
இந்தச் செயல்பாடு பாலத்திலிருந்து ETH ஐத் திரும்பப் பெறப் பயன்படுகிறது, எனவே இது அங்கீகரிக்கப்பட்ட அழைப்பாளரால் மட்டுமே அழைக்கப்படுவதை நாங்கள் உறுதி செய்ய வேண்டும்.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH ஐ மாற்றுவதற்கான வழி, `msg.value` இல் wei இன் தொகையுடன் பெறுநரை அழைப்பதாகும்.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH இடமாற்றம் தோல்வியடைந்தது");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

திரும்பப் பெறுவது பற்றிய ஒரு நிகழ்வை வெளியிடுங்கள்.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

இந்தச் செயல்பாடு மேலே உள்ள `finalizeETHWithdrawal` ஐப் போன்றது, ERC-20 டோக்கன்களுக்குத் தேவையான மாற்றங்களுடன்.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` தரவு கட்டமைப்பைப் புதுப்பிக்கவும்.

```solidity

        // L1 இல் திரும்பப் பெறுவது இறுதி செய்யப்பட்டதும், L1 பாலம் திரும்பப் பெறுபவருக்கு நிதியை மாற்றுகிறது.
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * தற்காலிகம் - ETH ஐ இடம்பெயர்தல் *
     *****************************/

    /**
     * @dev கணக்கிற்கு ETH இருப்பைச் சேர்க்கிறது. இது ETH
     * பழைய நுழைவாயிலிலிருந்து புதிய நுழைவாயிலுக்கு இடம்பெயர்வதை அனுமதிக்க வேண்டும்.
     * குறிப்பு: இது ஒரு மேம்பாட்டிற்கு மட்டுமே விடப்பட்டுள்ளது, எனவே பழைய ஒப்பந்தத்திலிருந்து இடம்பெயர்ந்த ETH ஐப் பெற முடிகிறது.
     * 
     */
    function donateETH() external payable {}
}
```

பாலத்தின் முந்தைய செயலாக்கம் இருந்தது.
இந்த செயலாக்கத்திலிருந்து இதற்கு மாறியபோது, நாங்கள் அனைத்து சொத்துகளையும் நகர்த்த வேண்டியிருந்தது.
ERC-20 டோக்கன்களை நகர்த்தலாம்.
இருப்பினும், ஒரு ஒப்பந்தத்திற்கு ETH ஐ மாற்றுவதற்கு அந்த ஒப்பந்தத்தின் ஒப்புதல் தேவை, அதை `donateETH` எங்களுக்கு வழங்குகிறது.

## L2 இல் ERC-20 டோக்கன்கள் {#erc-20-tokens-on-l2}

ஒரு ERC-20 டோக்கன் ஸ்டாண்டர்டு பாலத்தில் பொருந்துவதற்கு, அது ஸ்டாண்டர்டு பாலத்தை, மற்றும் _மட்டுமே_ ஸ்டாண்டர்டு பாலத்தை டோக்கனை உருவாக்க அனுமதிக்க வேண்டும்.
ஆப்டிமிசத்தில் புழக்கத்தில் உள்ள டோக்கன்களின் எண்ணிக்கை L1 பாலம் ஒப்பந்தத்திற்குள் பூட்டப்பட்ட டோக்கன்களின் எண்ணிக்கைக்கு சமம் என்பதை பாலங்கள் உறுதி செய்ய வேண்டியது அவசியம்.
L2 இல் அதிகப்படியான டோக்கன்கள் இருந்தால், சில பயனர்கள் தங்கள் சொத்துக்களை மீண்டும் L1 க்கு பாலமிட முடியாது.
நம்பகமான பாலத்திற்கு பதிலாக, நாங்கள் அடிப்படையில் [பகுதி இருப்பு வங்கியை](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) மீண்டும் உருவாக்குவோம்.
L1 இல் அதிகப்படியான டோக்கன்கள் இருந்தால், அந்த டோக்கன்களில் சில பாலம் ஒப்பந்தத்திற்குள் என்றென்றும் பூட்டப்படும், ஏனெனில் L2 டோக்கன்களை எரிக்காமல் அவற்றை விடுவிக்க வழி இல்லை.

### IL2StandardERC20 {#il2standarderc20}

ஸ்டாண்டர்டு பாலத்தைப் பயன்படுத்தும் L2 இல் உள்ள ஒவ்வொரு ERC-20 டோக்கனும் [இந்த இடைமுகத்தை](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) வழங்க வேண்டும், இது ஸ்டாண்டர்டு பாலத்திற்குத் தேவையான செயல்பாடுகள் மற்றும் நிகழ்வுகளைக் கொண்டுள்ளது.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[ஸ்டாண்டர்டு ERC-20 இடைமுகம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) `mint` மற்றும் `burn` செயல்பாடுகளை உள்ளடக்கவில்லை.
அந்த முறைகள் [ERC-20 தரநிலை](https://eips.ethereum.org/EIPS/eip-20) மூலம் தேவைப்படாது, இது டோக்கன்களை உருவாக்குவதற்கும் அழிப்பதற்கும் உள்ள பொறிமுறைகளை குறிப்பிடாமல் விட்டுவிடுகிறது.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 இடைமுகம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) ஒரு ஒப்பந்தம் என்னென்ன செயல்பாடுகளை வழங்குகிறது என்பதைக் குறிப்பிடப் பயன்படுகிறது.
[தரநிலையை இங்கே படிக்கலாம்](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

இந்த ஒப்பந்தத்தில் இணைக்கப்பட்ட L1 டோக்கனின் முகவரியை இந்தச் செயல்பாடு வழங்குகிறது.
எதிர் திசையில் இதேபோன்ற செயல்பாடு எங்களிடம் இல்லை என்பதை நினைவில் கொள்க.
L2 ஆதரவு திட்டமிடப்பட்டதா இல்லையா என்பதைப் பொருட்படுத்தாமல், எந்த L1 டோக்கனையும் நாங்கள் பாலமிட வேண்டும்.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

டோக்கன்களை உருவாக்க (create) மற்றும் எரிக்க (destroy) செயல்பாடுகள் மற்றும் நிகழ்வுகள்.
டோக்கன்களின் எண்ணிக்கை சரியானது (L1 இல் பூட்டப்பட்ட டோக்கன்களின் எண்ணிக்கைக்கு சமம்) என்பதை உறுதிப்படுத்த இந்தச் செயல்பாடுகளை இயக்கக்கூடிய ஒரே நிறுவனம் பாலமாக இருக்க வேண்டும்.

### L2StandardERC20 {#L2StandardERC20}

[இது `IL2StandardERC20` இடைமுகத்தின் எங்கள் செயல்படுத்தலாகும்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
உங்களுக்கு ஏதேனும் தனிப்பயன் தர்க்கம் தேவைப்படாவிட்டால், இதைப் பயன்படுத்த வேண்டும்.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 ஒப்பந்தம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
ஆப்டிமிசம் சக்கரத்தை மீண்டும் கண்டுபிடிப்பதில் நம்பிக்கை கொள்ளவில்லை, குறிப்பாக சக்கரம் நன்கு தணிக்கை செய்யப்பட்டு, சொத்துக்களை வைத்திருக்க போதுமான நம்பகத்தன்மையுடன் இருக்க வேண்டும்.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

எங்களுக்குத் தேவைப்படும் மற்றும் ERC-20 பொதுவாக இல்லாத இரண்டு கூடுதல் கட்டமைப்பு அளவுருக்கள் இவை.

```solidity

    /**
     * @param _l2Bridge L2 ஸ்டாண்டர்டு பாலத்தின் முகவரி.
     * @param _l1Token தொடர்புடைய L1 டோக்கனின் முகவரி.
     * @param _name ERC20 பெயர்.
     * @param _symbol ERC20 சின்னம்.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

முதலில் நாம் மரபுரிமையாகப் பெறும் ஒப்பந்தத்திற்கான கட்டமைப்பாளரை அழைக்கவும் (`ERC20(_name, _symbol)`) பின்னர் எங்கள் சொந்த மாறிகளை அமைக்கவும்.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "L2 பாலம் மட்டுமே உருவாக்கி எரிக்க முடியும்");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) இப்படித்தான் செயல்படுகிறது.
ஒவ்வொரு இடைமுகமும் பல ஆதரிக்கப்படும் செயல்பாடுகளாகும், மேலும் அந்தச் செயல்பாடுகளின் [ABI செயல்பாட்டு தேர்வாளர்களின்](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [பிரத்தியேகமான அல்லது](https://en.wikipedia.org/wiki/Exclusive_or) என அடையாளம் காணப்படுகிறது.

L2 பாலம் ERC-165 ஐ அது சொத்துக்களை அனுப்பும் ERC-20 ஒப்பந்தம் ஒரு `IL2StandardERC20` என்பதை உறுதிப்படுத்த ஒரு நல்ல சோதனையாகப் பயன்படுத்துகிறது.

**குறிப்பு:** `supportsInterface` க்கு தவறான பதில்களை வழங்குவதிலிருந்து மோசடி ஒப்பந்தத்தைத் தடுக்க எதுவும் இல்லை, எனவே இது ஒரு ஆரோக்கியமான சோதனை வழிமுறையாகும், _ஒரு பாதுகாப்பு வழிமுறை அல்ல_.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

L2 பாலம் மட்டுமே சொத்துக்களை உருவாக்கி எரிக்க அனுமதிக்கப்படுகிறது.

`_mint` மற்றும் `_burn` உண்மையில் [OpenZeppelin ERC-20 ஒப்பந்தத்தில்](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) வரையறுக்கப்பட்டுள்ளன.
அந்த ஒப்பந்தம் அவற்றை வெளிப்புறமாக வெளிப்படுத்தவில்லை, ஏனெனில் டோக்கன்களை உருவாக்குவதற்கும் எரிப்பதற்கும் உள்ள நிபந்தனைகள் ERC-20 ஐப் பயன்படுத்துவதற்கான வழிகளின் எண்ணிக்கையைப் போலவே மாறுபட்டவை.

## L2 பாலம் குறியீடு {#l2-bridge-code}

இது ஆப்டிமிசத்தில் பாலத்தை இயக்கும் குறியீடாகும்.
[இந்த ஒப்பந்தத்திற்கான ஆதாரம் இங்கே உள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) இடைமுகம் மேலே நாம் பார்த்த [L1 க்கு சமமானதற்கு](#IL1ERC20Bridge) மிகவும் ஒத்ததாகும்.
இரண்டு குறிப்பிடத்தக்க வேறுபாடுகள் உள்ளன:

1. L1 இல் நீங்கள் டெபாசிட்களைத் தொடங்கி, திரும்பப் பெறுதல்களை இறுதி செய்கிறீர்கள்.
   இங்கே நீங்கள் திரும்பப் பெறுதல்களைத் தொடங்கி, டெபாசிட்களை இறுதி செய்கிறீர்கள்.
2. L1 இல் ETH மற்றும் ERC-20 டோக்கன்களுக்கு இடையில் வேறுபாடு காண்பது அவசியம்.
   L2 இல் நாம் இரண்டிற்கும் ஒரே செயல்பாடுகளைப் பயன்படுத்தலாம், ஏனெனில் ஆப்டிமிசத்தில் உள்ள ETH இருப்புகள் உள்நாட்டில் [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) முகவரியுடன் ERC-20 டோக்கனாகக் கையாளப்படுகின்றன.

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 ஸ்டாண்டர்டு பாலம் என்பது L1 ஸ்டாண்டர்டு பாலத்துடன் இணைந்து செயல்படும் ஒரு ஒப்பந்தமாகும்.
 * L1 மற்றும் L2 க்கு இடையில் ETH மற்றும் ERC20 மாற்றங்களை இயக்கவும்.
 * L1 ஸ்டாண்டர்டு பாலத்தில் டெபாசிட்கள் குறித்துக் கேட்கும் போது இந்த ஒப்பந்தம் புதிய டோக்கன்களுக்கு ஒரு மின்ட்டராகச் செயல்படுகிறது.
 * திரும்பப் பெறுவதற்காக உத்தேசிக்கப்பட்ட டோக்கன்களை எரிப்பதாகவும் இந்த ஒப்பந்தம் செயல்படுகிறது, L1 நிதிகளை விடுவிப்பதற்காக L1 பாலத்திற்குத் தெரிவிக்கிறது.
 * 
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * வெளிப்புற ஒப்பந்தக் குறிப்புகள் *
     ********************************/

    address public l1TokenBridge;
```

L1 பாலத்தின் முகவரியைக் கண்காணிக்கவும்.
L1 க்கு சமமானதைக் காட்டிலும், இங்கே இந்த மாறி எங்களுக்குத் _தேவை_ என்பதைக் கவனத்தில் கொள்க.
L1 பாலத்தின் முகவரி முன்கூட்டியே தெரியாது.

```solidity

    /***************
     * கட்டமைப்பாளர் *
     ***************/

    /**
     * @param _l2CrossDomainMessenger இந்த ஒப்பந்தத்தால் பயன்படுத்தப்படும் கிராஸ்-டொமைன் மெசஞ்சர்.
     * @param _l1TokenBridge பிரதான சங்கிலியில் பயன்படுத்தப்பட்ட L1 பாலத்தின் முகவரி.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * திரும்பப் பெறுதல் *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

இந்த இரண்டு செயல்பாடுகளும் திரும்பப் பெறுதல்களைத் தொடங்குகின்றன.
L1 டோக்கன் முகவரியைக் குறிப்பிட வேண்டிய அவசியமில்லை என்பதைக் கவனத்தில் கொள்க.
L2 டோக்கன்கள் L1 க்கு சமமானவற்றின் முகவரியை எங்களுக்குத் தெரிவிக்கும் என்று எதிர்பார்க்கப்படுகிறது.

```solidity

    /**
     * @dev டோக்கனை எரிப்பதன் மூலம் மற்றும் திரும்பப் பெறுவது குறித்து L1 டோக்கன் கேட்வேக்குத் தெரிவிப்பதன் மூலம்
     *      திரும்பப் பெறுதல்களுக்கான தர்க்கத்தைச் செய்கிறது.
     * @param _l2Token திரும்பப் பெறுதல் தொடங்கப்பட்ட L2 டோக்கனின் முகவரி.
     * @param _from L2 இல் இருந்து திரும்பப் பெறுவதைக் கணக்கிடுங்கள்.
     * @param _to L1 இல் திரும்பப் பெறுவதைக் கணக்கிடுங்கள்.
     * @param _amount திரும்பப் பெற வேண்டிய டோக்கனின் அளவு.
     * @param _l1Gas பயன்படுத்தப்படாதது, ஆனால் சாத்தியமான முன்னோக்கி பொருந்தக்கூடிய கருத்தில் சேர்க்கப்பட்டுள்ளது.
     * @param _data L1 க்கு அனுப்ப விருப்பத் தரவு. இந்தத் தரவு வழங்கப்பட்டுள்ளது
     *        வெளிப்புற ஒப்பந்தங்களுக்கான வசதிக்காக மட்டுமே. அதிகபட்சமாகச் செயல்படுத்துவதைத் தவிர
     *        நீளம், இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கம் பற்றி எந்த உத்தரவாதமும் அளிக்காது.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // திரும்பப் பெறுதல் தொடங்கப்பட்டதும், அடுத்தடுத்த L2 பயன்பாட்டைத் தடுக்க திரும்பப் பெறுபவரின் நிதியை நாங்கள் எரிக்கிறோம்.
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

நாங்கள் `_from` அளவுருவைச் சார்ந்திருக்கவில்லை, ஆனால் `msg.sender`ஐச் சார்ந்திருக்கிறோம், இது போலியாக மாற்றுவது மிகவும் கடினமானது (எனக்குத் தெரிந்தவரை சாத்தியமற்றது).

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) க்கான கால்தேட்டாவை உருவாக்குங்கள்
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1 இல் ETH மற்றும் ERC-20 க்கு இடையில் வேறுபாடு காண்பது அவசியம்.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // செய்தியை L1 பாலத்திற்கு அனுப்பவும்
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * கிராஸ்-செயின் செயல்பாடு: டெபாசிட் செய்தல் *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

இந்தச் செயல்பாடு `L1StandardBridge`ஆல் அழைக்கப்படுகிறது.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

செய்தியின் ஆதாரம் சட்டப்பூர்வமானது என்பதை உறுதிப்படுத்தவும்.
இந்தச் செயல்பாடு `_mint`ஐ அழைப்பதால் இது முக்கியமானது, மேலும் L1 இல் பாலத்திற்குச் சொந்தமான டோக்கன்களால் மூடப்படாத டோக்கன்களை வழங்கப் பயன்படுத்தப்படலாம்.

```solidity
        // இலக்கு டோக்கன் இணக்கமாக உள்ளதா எனச் சரிபார்த்து, L1 இல் டெபாசிட் செய்யப்பட்ட டோக்கன் இங்குள்ள L2 டெபாசிட் செய்யப்பட்ட டோக்கன் பிரதிநிதித்துவத்துடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கவும்.
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

ஆரோக்கிய சோதனைகள்:

1. சரியான இடைமுகம் ஆதரிக்கப்படுகிறது
2. L2 ERC-20 ஒப்பந்தத்தின் L1 முகவரி டோக்கன்களின் L1 மூலத்துடன் பொருந்துகிறது.

```solidity
        ) {
            // டெபாசிட் இறுதி செய்யப்பட்டதும், அதே அளவு டோக்கன்களுடன் L2 இல் உள்ள கணக்கிற்கு நாங்கள் வரவு வைக்கிறோம்.
            //
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

ஆரோக்கிய சோதனைகள் தேர்ச்சி பெற்றால், டெபாசிட்டை இறுதி செய்யவும்:

1. டோக்கன்களை உருவாக்கவும்
2. பொருத்தமான நிகழ்வை வெளியிடுங்கள்

```solidity
        } else {
            // டெபாசிட் செய்யப்படும் L2 டோக்கன் அதன் L1 டோக்கனின் சரியான முகவரி குறித்து உடன்படவில்லை, அல்லது சரியான இடைமுகத்தை ஆதரிக்கவில்லை.
            // இது ஒரு தீங்கிழைக்கும் L2 டோக்கன் இருந்தால், அல்லது ஒரு பயனர் எப்படியாவது தவறான L2 டோக்கன் முகவரியை டெபாசிட் செய்யக் குறிப்பிட்டால் மட்டுமே இது நடக்க வேண்டும்.
            // எந்தவொரு சந்தர்ப்பத்திலும், நாங்கள் இங்கே செயல்முறையை நிறுத்தி, பயனர்கள் தங்கள் நிதியை சில சந்தர்ப்பங்களில் வெளியேற்றுவதற்காக ஒரு திரும்பப் பெறுதல் செய்தியை உருவாக்குகிறோம்.
            // தீங்கிழைக்கும் டோக்கன் ஒப்பந்தங்களை முற்றிலும் தடுக்க வழி இல்லை, ஆனால் இது பயனர் பிழையைக் கட்டுப்படுத்துகிறது மற்றும் தீங்கிழைக்கும் ஒப்பந்த நடத்தை வடிவங்களை ஓரளவு குறைக்கிறது.

```

ஒரு பயனர் தவறான L2 டோக்கன் முகவரியைப் பயன்படுத்தி கண்டறியக்கூடிய பிழை செய்தால், டெபாசிட்டை ரத்துசெய்து L1 இல் டோக்கன்களைத் திருப்பி அனுப்ப விரும்புகிறோம்.
L2 இலிருந்து இதைச் செய்ய ஒரே வழி, தவறு சவால் காலம் காத்திருக்க வேண்டிய ஒரு செய்தியை அனுப்புவதாகும், ஆனால் அது டோக்கன்களை நிரந்தரமாக இழப்பதை விட பயனருக்கு மிகவும் நல்லது.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // டெபாசிட்டை அனுப்புநருக்குத் திருப்பி அனுப்ப இங்கே _to மற்றும் _from ஐ மாற்றியது
                _from,
                _amount,
                _data
            );

            // செய்தியை L1 பாலத்திற்கு அனுப்பவும்
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## முடிவுரை {#conclusion}

சொத்து இடமாற்றங்களுக்கான மிகவும் நெகிழ்வான பொறிமுறையே ஸ்டாண்டர்டு பாலம் ஆகும்.
இருப்பினும், இது மிகவும் பொதுவானதாக இருப்பதால், இது எப்போதும் பயன்படுத்த எளிதான பொறிமுறை அல்ல.
குறிப்பாகத் திரும்பப் பெறுதல்களுக்கு, பெரும்பாலான பயனர்கள் சவால் காலத்திற்கு காத்திருக்காத மற்றும் திரும்பப் பெறுவதை இறுதி செய்ய மெர்க்கிள் ஆதாரம் தேவையில்லாத [மூன்றாம் தரப்புப் பாலங்களைப்](https://optimism.io/apps#bridge) பயன்படுத்த விரும்புகிறார்கள்.

இந்தப் பாலங்கள் பொதுவாக L1 இல் சொத்துக்களைக் கொண்டிருப்பதன் மூலம் வேலை செய்கின்றன, அதை அவை ஒரு சிறிய கட்டணத்திற்கு உடனடியாக வழங்குகின்றன (பெரும்பாலும் ஒரு ஸ்டாண்டர்டு பாலம் திரும்பப் பெறுதலுக்கான கேஸ் செலவை விடக் குறைவு).
பாலம் (அல்லது அதை இயக்கும் நபர்கள்) L1 சொத்துக்கள் பற்றாக்குறையாக இருக்கும் என்று எதிர்பார்க்கும்போது, அது L2 இலிருந்து போதுமான சொத்துக்களை மாற்றுகிறது. இவை மிகவும் பெரிய திரும்பப் பெறுதல்கள் என்பதால், திரும்பப் பெறுதல் செலவு ஒரு பெரிய தொகையில் செலுத்தப்படுகிறது மற்றும் இது மிகவும் சிறிய சதவீதமாகும்.

இந்தப் கட்டுரை, அடுக்கு 2 எவ்வாறு செயல்படுகிறது மற்றும் தெளிவான மற்றும் பாதுகாப்பான சொலிடிட்டி குறியீட்டை எவ்வாறு எழுதுவது என்பது பற்றி மேலும் புரிந்துகொள்ள உங்களுக்கு உதவியது என்று நம்புகிறோம்.

[எனது மேலும் பணிகளை இங்கே பார்க்கவும்](https://cryptodocguy.pro/).
