---
title: "Optimism நிலையான பால ஒப்பந்தத்தின் (standard bridge contract) வழிகாட்டி"
description: "Optimism-க்கான நிலையான பாலம் எவ்வாறு செயல்படுகிறது? இது ஏன் இவ்வாறு செயல்படுகிறது?"
author: "ஓரி பொமரன்ட்ஸ்"
tags: ["Solidity", "பாலம்", "அடுக்கு 2"]
skill: intermediate
breadcrumb: "Optimism பாலம்"
published: 2022-03-30
lang: ta
---

[Optimism](https://www.optimism.io/) என்பது ஒரு [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/) ஆகும்.
நெட்வொர்க்கில் உள்ள ஒவ்வொரு நோடுக்கும் பதிலாக சில நோடுகளால் மட்டுமே பரிவர்த்தனைகள் செயலாக்கப்படுவதால், Ethereum Mainnet-ஐ (அடுக்கு 1 அல்லது L1 என்றும் அழைக்கப்படுகிறது) விட மிகக் குறைந்த விலையில் Optimistic rollup-களால் பரிவர்த்தனைகளைச் செயலாக்க முடியும்.
அதே நேரத்தில், தரவுகள் அனைத்தும் L1-ல் எழுதப்படுவதால், Mainnet-ன் அனைத்து ஒருமைப்பாடு மற்றும் கிடைக்கும் தன்மைக்கான உத்தரவாதங்களுடன் அனைத்தையும் நிரூபிக்கவும் மறுகட்டமைக்கவும் முடியும்.

Optimism-ல் (அல்லது வேறு ஏதேனும் L2-ல்) L1 சொத்துகளைப் பயன்படுத்த, சொத்துகள் [பாலம் (bridged)](/bridges/#prerequisites) செய்யப்பட வேண்டும்.
இதை அடைவதற்கான ஒரு வழி, பயனர்கள் L1-ல் சொத்துகளை (ETH மற்றும் [ERC-20 டோக்கன்கள்](/developers/docs/standards/tokens/erc-20/) மிகவும் பொதுவானவை) லாக் செய்து, L2-ல் பயன்படுத்த சமமான சொத்துகளைப் பெறுவதாகும்.
இறுதியில், அவற்றை வைத்திருப்பவர்கள் அவற்றை மீண்டும் L1-க்கு பாலம் செய்ய விரும்பலாம்.
இதைச் செய்யும்போது, சொத்துகள் L2-ல் எரிக்கப்பட்டு (burned), பின்னர் L1-ல் பயனருக்கு மீண்டும் வெளியிடப்படும்.

[Optimism நிலையான பாலம் (standard bridge)](https://docs.optimism.io/app-developers/bridging/standard-bridge) இவ்வாறுதான் செயல்படுகிறது.
இந்தக் கட்டுரையில், அந்தப் பாலம் எவ்வாறு செயல்படுகிறது என்பதைப் பார்க்க அதன் மூலக் குறியீட்டை (source code) மதிப்பாய்வு செய்கிறோம், மேலும் நன்கு எழுதப்பட்ட Solidity குறியீட்டிற்கு ஒரு உதாரணமாக அதைப் படிக்கிறோம்.

## கட்டுப்பாட்டு ஓட்டங்கள் (Control flows) {#control-flows}

பாலம் இரண்டு முக்கிய ஓட்டங்களைக் கொண்டுள்ளது:

- டெபாசிட் (L1-லிருந்து L2-க்கு)
- திரும்பப் பெறுதல் (L2-லிருந்து L1-க்கு)

### டெபாசிட் ஓட்டம் {#deposit-flow}

#### அடுக்கு 1 {#deposit-flow-layer-1}

1. ERC-20-ஐ டெபாசிட் செய்தால், டெபாசிட் செய்பவர் டெபாசிட் செய்யப்படும் தொகையைச் செலவிட பாலத்திற்கு ஒரு அனுமதியை (allowance) வழங்குகிறார்
2. டெபாசிட் செய்பவர் L1 பாலத்தை அழைக்கிறார் (`depositERC20`, `depositERC20To`, `depositETH`, அல்லது `depositETHTo`)
3. L1 பாலம் பாலம் செய்யப்பட்ட சொத்தை தன் வசம் எடுத்துக்கொள்கிறது
   - ETH: அழைப்பின் ஒரு பகுதியாக டெபாசிட் செய்பவரால் சொத்து மாற்றப்படுகிறது
   - ERC-20: டெபாசிட் செய்பவர் வழங்கிய அனுமதியைப் பயன்படுத்தி பாலம் தனக்குத்தானே சொத்தை மாற்றிக்கொள்கிறது
4. L1 பாலம் L2 பாலத்தில் `finalizeDeposit`-ஐ அழைக்க குறுக்கு-டொமைன் (cross-domain) செய்தி பொறிமுறையைப் பயன்படுத்துகிறது

#### அடுக்கு 2 {#deposit-flow-layer-2}

5. `finalizeDeposit`-க்கான அழைப்பு சட்டபூர்வமானதா என்பதை L2 பாலம் சரிபார்க்கிறது:
   - குறுக்கு டொமைன் செய்தி ஒப்பந்தத்திலிருந்து வந்ததா
   - முதலில் L1-ல் உள்ள பாலத்திலிருந்து வந்ததா
6. L2-ல் உள்ள ERC-20 டோக்கன் ஒப்பந்தம் சரியானதா என்பதை L2 பாலம் சரிபார்க்கிறது:
   - L2 ஒப்பந்தம் அதன் L1 இணையானது L1-ல் டோக்கன்கள் வந்த அதே ஒப்பந்தம் தான் என்று தெரிவிக்கிறது
   - L2 ஒப்பந்தம் சரியான இடைமுகத்தை ஆதரிக்கிறது என்று தெரிவிக்கிறது ([ERC-165-ஐப் பயன்படுத்தி](https://eips.ethereum.org/EIPS/eip-165)).
7. L2 ஒப்பந்தம் சரியானதாக இருந்தால், பொருத்தமான முகவரிக்கு பொருத்தமான எண்ணிக்கையிலான டோக்கன்களை உருவாக்க (mint) அதை அழைக்கவும். இல்லையெனில், L1-ல் டோக்கன்களைப் பெற பயனரை அனுமதிக்க திரும்பப் பெறும் செயல்முறையைத் தொடங்கவும்.

### திரும்பப் பெறும் ஓட்டம் {#withdrawal-flow}

#### அடுக்கு 2 {#withdrawal-flow-layer-2}

1. திரும்பப் பெறுபவர் L2 பாலத்தை அழைக்கிறார் (`withdraw` அல்லது `withdrawTo`)
2. L2 பாலம் `msg.sender`-க்கு சொந்தமான பொருத்தமான எண்ணிக்கையிலான டோக்கன்களை எரிக்கிறது
3. L2 பாலம் L1 பாலத்தில் `finalizeETHWithdrawal` அல்லது `finalizeERC20Withdrawal`-ஐ அழைக்க குறுக்கு-டொமைன் செய்தி பொறிமுறையைப் பயன்படுத்துகிறது

#### அடுக்கு 1 {#withdrawal-flow-layer-1}

4. `finalizeETHWithdrawal` அல்லது `finalizeERC20Withdrawal`-க்கான அழைப்பு சட்டபூர்வமானதா என்பதை L1 பாலம் சரிபார்க்கிறது:
   - குறுக்கு டொமைன் செய்தி பொறிமுறையிலிருந்து வந்ததா
   - முதலில் L2-ல் உள்ள பாலத்திலிருந்து வந்ததா
5. L1 பாலம் பொருத்தமான சொத்தை (ETH அல்லது ERC-20) பொருத்தமான முகவரிக்கு மாற்றுகிறது

## அடுக்கு 1 குறியீடு {#layer-1-code}

இது L1-ல், அதாவது Ethereum Mainnet-ல் இயங்கும் குறியீடாகும்.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[இந்த இடைமுகம் இங்கே வரையறுக்கப்பட்டுள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
இது ERC-20 டோக்கன்களைப் பாலம் செய்வதற்குத் தேவையான செயல்பாடுகள் மற்றும் வரையறைகளை உள்ளடக்கியது.

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism-ன் பெரும்பாலான குறியீடுகள் MIT உரிமத்தின் கீழ் வெளியிடப்படுகின்றன](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

இதை எழுதும் போது Solidity-ன் சமீபத்திய பதிப்பு 0.8.12 ஆகும்.
பதிப்பு 0.9.0 வெளியிடப்படும் வரை, இந்தக் குறியீடு அதனுடன் இணக்கமாக உள்ளதா இல்லையா என்பது எங்களுக்குத் தெரியாது.

```solidity
/* *
 * @title IL1ERC20Bridge */
interface IL1ERC20Bridge {
    /* *********
     * நிகழ்வுகள் *
     ********* */

    event ERC20DepositInitiated(
```

Optimism பாலம் சொற்களஞ்சியத்தில் _டெபாசிட்_ என்பது L1-லிருந்து L2-க்கு மாற்றுவதைக் குறிக்கிறது, மேலும் _திரும்பப் பெறுதல்_ என்பது L2-லிருந்து L1-க்கு மாற்றுவதைக் குறிக்கிறது.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

பெரும்பாலான சந்தர்ப்பங்களில் L1-ல் உள்ள ERC-20-ன் முகவரியும் L2-ல் உள்ள சமமான ERC-20-ன் முகவரியும் ஒன்றாக இருக்காது.
[டோக்கன் முகவரிகளின் பட்டியலை நீங்கள் இங்கே பார்க்கலாம்](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 கொண்ட முகவரி L1-ல் (Mainnet) உள்ளது மற்றும் `chainId` 10 கொண்ட முகவரி L2-ல் (Optimism) உள்ளது.
மற்ற இரண்டு `chainId` மதிப்புகள் Kovan சோதனை நெட்வொர்க் (42) மற்றும் Optimistic Kovan சோதனை நெட்வொர்க் (69) ஆகியவற்றுக்கானவை.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

பரிமாற்றங்களில் குறிப்புகளைச் சேர்க்க முடியும், அவ்வாறான நிலையில் அவை அவற்றைப் புகாரளிக்கும் நிகழ்வுகளில் சேர்க்கப்படும்.

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

அதே பால ஒப்பந்தம் இரு திசைகளிலும் பரிமாற்றங்களைக் கையாளுகிறது.
L1 பாலத்தைப் பொறுத்தவரை, இது டெபாசிட்களைத் தொடங்குவது மற்றும் திரும்பப் பெறுதல்களை முடிப்பது என்பதாகும்.

```solidity

    /* *******************
     * பொதுவான செயல்பாடுகள் *
     ******************* */

    /* *
     * @dev தொடர்புடைய L2 பிரிட்ஜ் ஒப்பந்தத்தின் முகவரியைப் பெறுகிறது.
     * @return தொடர்புடைய L2 பிரிட்ஜ் ஒப்பந்தத்தின் முகவரி. */
    function l2TokenBridge() external returns (address);
```

இந்தச் செயல்பாடு உண்மையில் தேவையில்லை, ஏனெனில் L2-ல் இது முன்பே பயன்படுத்தப்பட்ட ஒப்பந்தமாகும், எனவே இது எப்போதும் `0x4200000000000000000000000000000000000010` என்ற முகவரியில் இருக்கும்.
L1 பாலத்தின் முகவரியை அறிவது எளிதானது _அல்ல_ என்பதால், L2 பாலத்துடனான சமச்சீர்மைக்காக இது இங்கே உள்ளது.

```solidity
    /* *
     * @dev அழைப்பாளரின் L2 இருப்பில் குறிப்பிட்ட அளவு ERC20-ஐ டெபாசிட் செய்கிறது.
     * @param _l1Token நாம் டெபாசிட் செய்யும் L1 ERC20-இன் முகவரி
     * @param _l2Token L1-க்கு தொடர்புடைய L2 ERC20-இன் முகவரி
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20-இன் அளவு
     * @param _l2Gas L2-இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு (Gas limit).
     * @param _data L2-க்கு அனுப்ப வேண்டிய விருப்பத் தரவு. இந்தத் தரவு வெளிப்புற ஒப்பந்தங்களின் வசதிக்காக மட்டுமே வழங்கப்படுகிறது. அதிகபட்ச நீளத்தை செயல்படுத்துவதைத் தவிர, இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கத்தைப் பற்றி எந்த உத்தரவாதத்தையும் வழங்காது. */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` அளவுரு என்பது பரிவர்த்தனை செலவிட அனுமதிக்கப்படும் L2 கேஸ் அளவாகும்.
[ஒரு குறிப்பிட்ட (உயர்) வரம்பு வரை, இது இலவசம்](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), எனவே ERC-20 ஒப்பந்தம் உருவாக்கும் போது (minting) மிகவும் விசித்திரமான ஒன்றைச் செய்யாவிட்டால், இது ஒரு பிரச்சினையாக இருக்கக்கூடாது.
ஒரு பயனர் வேறு பிளாக்செயினில் உள்ள அதே முகவரிக்கு சொத்துகளைப் பாலம் செய்யும் பொதுவான சூழ்நிலையை இந்தச் செயல்பாடு கவனித்துக்கொள்கிறது.

```solidity
    /* *
     * @dev பெறுநரின் L2 இருப்பில் குறிப்பிட்ட அளவு ERC20-ஐ டெபாசிட் செய்கிறது.
     * @param _l1Token நாம் டெபாசிட் செய்யும் L1 ERC20-இன் முகவரி
     * @param _l2Token L1-க்கு தொடர்புடைய L2 ERC20-இன் முகவரி
     * @param _to திரும்பப் பெறுதலை வரவு வைக்க வேண்டிய L2 முகவரி.
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20-இன் அளவு.
     * @param _l2Gas L2-இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2-க்கு அனுப்ப வேண்டிய விருப்பத் தரவு. இந்தத் தரவு வெளிப்புற ஒப்பந்தங்களின் வசதிக்காக மட்டுமே வழங்கப்படுகிறது. அதிகபட்ச நீளத்தை செயல்படுத்துவதைத் தவிர, இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கத்தைப் பற்றி எந்த உத்தரவாதத்தையும் வழங்காது. */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

இந்தச் செயல்பாடு `depositERC20`-ஐப் போலவே இருக்கும், ஆனால் இது ERC-20-ஐ வேறு முகவரிக்கு அனுப்ப உங்களை அனுமதிக்கிறது.

```solidity
    /* ************************
     * கிராஸ்-செயின் செயல்பாடுகள் *
     ************************ */

    /* *
     * @dev L2-இலிருந்து L1-க்கு திரும்பப் பெறுதலை (withdrawal) முடித்து, பெறுநரின் L1 ERC20 டோக்கன் இருப்பில் நிதியை வரவு வைக்கிறது.
     * L2-இல் தொடங்கப்பட்ட திரும்பப் பெறுதல் இறுதி செய்யப்படாவிட்டால் இந்த அழைப்பு தோல்வியடையும்.
     *
     * @param _l1Token திரும்பப் பெறுதலை இறுதி செய்வதற்கான L1 டோக்கனின் முகவரி.
     * @param _l2Token திரும்பப் பெறுதல் தொடங்கப்பட்ட L2 டோக்கனின் முகவரி.
     * @param _from பரிமாற்றத்தைத் தொடங்கும் L2 முகவரி.
     * @param _to திரும்பப் பெறுதலை வரவு வைக்க வேண்டிய L1 முகவரி.
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20-இன் அளவு.
     * @param _data L2-இல் அனுப்புநரால் வழங்கப்பட்ட தரவு. இந்தத் தரவு வெளிப்புற ஒப்பந்தங்களின் வசதிக்காக மட்டுமே வழங்கப்படுகிறது. அதிகபட்ச நீளத்தை செயல்படுத்துவதைத் தவிர, இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கத்தைப் பற்றி எந்த உத்தரவாதத்தையும் வழங்காது. */
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

Optimism-ல் திரும்பப் பெறுதல்கள் (மற்றும் L2-லிருந்து L1-க்கு வரும் பிற செய்திகள்) இரண்டு படி செயல்முறையாகும்:

1. L2-ல் ஒரு தொடக்கப் பரிவர்த்தனை.
2. L1-ல் ஒரு இறுதி அல்லது கோரும் பரிவர்த்தனை.
   L2 பரிவர்த்தனைக்கான [தவறு சவால் காலம் (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) முடிவடைந்த பிறகு இந்தப் பரிவர்த்தனை நடக்க வேண்டும்.

### IL1StandardBridge {#il1standardbridge}

[இந்த இடைமுகம் இங்கே வரையறுக்கப்பட்டுள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
இந்தக் கோப்பு ETH-க்கான நிகழ்வு மற்றும் செயல்பாட்டு வரையறைகளைக் கொண்டுள்ளது.
இந்த வரையறைகள் ERC-20-க்காக மேலே உள்ள `IL1ERC20Bridge`-ல் வரையறுக்கப்பட்டவற்றுக்கு மிகவும் ஒத்தவை.

சில ERC-20 டோக்கன்களுக்கு தனிப்பயன் செயலாக்கம் தேவைப்படுவதாலும், நிலையான பாலத்தால் அவற்றைக் கையாள முடியாததாலும் பால இடைமுகம் இரண்டு கோப்புகளாகப் பிரிக்கப்பட்டுள்ளது.
இதன் மூலம் அத்தகைய டோக்கனைக் கையாளும் தனிப்பயன் பாலம் `IL1ERC20Bridge`-ஐச் செயல்படுத்தலாம் மற்றும் ETH-ஐயும் பாலம் செய்ய வேண்டியதில்லை.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/* *
 * @title IL1StandardBridge */
interface IL1StandardBridge is IL1ERC20Bridge {
    /* *********
     * நிகழ்வுகள் *
     ********* */
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

L1 மற்றும் L2 டோக்கன் முகவரிகள் இல்லாமல் இருப்பதைத் தவிர, இந்த நிகழ்வு ERC-20 பதிப்பிற்கு (`ERC20DepositInitiated`) கிட்டத்தட்ட ஒத்ததாகும்.
மற்ற நிகழ்வுகள் மற்றும் செயல்பாடுகளுக்கும் இது பொருந்தும்.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /* *******************
     * பொதுவான செயல்பாடுகள் *
     ******************* */

    /* *
     * @dev அழைப்பாளரின் L2 இருப்பில் குறிப்பிட்ட அளவு ETH-ஐ டெபாசிட் செய்கிறது.
            .
            .
            . */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /* *
     * @dev பெறுநரின் L2 இருப்பில் குறிப்பிட்ட அளவு ETH-ஐ டெபாசிட் செய்கிறது.
            .
            .
            . */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /* ************************
     * கிராஸ்-செயின் செயல்பாடுகள் *
     ************************ */

    /* *
     * @dev L2-இலிருந்து L1-க்கு திரும்பப் பெறுதலை முடித்து, பெறுநரின் L1 ETH டோக்கன் இருப்பில் நிதியை வரவு வைக்கிறது. xDomainMessenger மட்டுமே இந்தச் செயல்பாட்டை அழைக்க முடியும் என்பதால், திரும்பப் பெறுதல் இறுதி செய்யப்படுவதற்கு முன்பு இது ஒருபோதும் அழைக்கப்படாது.
                .
                .
                . */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

மற்ற அடுக்குக்குச் செய்திகளை அனுப்ப இரு பாலங்களாலும் ([L1](#the-l1-bridge-contract) மற்றும் [L2](#the-l2-bridge-contract)) [இந்த ஒப்பந்தம்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) மரபுரிமையாகப் பெறப்படுகிறது.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* இடைமுக இறக்குமதிகள் */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

குறுக்கு டொமைன் மெசஞ்சரைப் பயன்படுத்தி மற்ற அடுக்குக்கு எவ்வாறு செய்திகளை அனுப்புவது என்பதை [இந்த இடைமுகம்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) ஒப்பந்தத்திற்குச் சொல்கிறது.
இந்தக் குறுக்கு டொமைன் மெசஞ்சர் முற்றிலும் வேறுபட்ட ஒரு அமைப்பாகும், மேலும் இது தனக்கென ஒரு கட்டுரைக்குத் தகுதியானது, அதை நான் எதிர்காலத்தில் எழுதுவேன் என்று நம்புகிறேன்.

```solidity
/* *
 * @title CrossDomainEnabled
 * @dev கிராஸ்-டொமைன் தகவல்தொடர்புகளைச் செய்யும் ஒப்பந்தங்களுக்கான உதவி ஒப்பந்தம்
 *
 * பயன்படுத்தப்பட்ட கம்பைலர்: மரபுரிமையாகப் பெறும் ஒப்பந்தத்தால் வரையறுக்கப்படுகிறது */
contract CrossDomainEnabled {
    /* ************
     * மாறிகள் *
     ************ */

    // மற்ற டொமைனிலிருந்து செய்திகளை அனுப்பவும் பெறவும் பயன்படுத்தப்படும் மெசஞ்சர் ஒப்பந்தம்.
    address public messenger;

    /* **************
     * கன்ஸ்ட்ரக்டர் *
     ************** */

    /* *
     * @param _messenger தற்போதைய லேயரில் உள்ள CrossDomainMessenger-இன் முகவரி. */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

ஒப்பந்தம் தெரிந்து கொள்ள வேண்டிய ஒரு அளவுரு, இந்த அடுக்கில் உள்ள குறுக்கு டொமைன் மெசஞ்சரின் முகவரி.
இந்த அளவுரு கன்ஸ்ட்ரக்டரில் (constructor) ஒரு முறை அமைக்கப்படுகிறது, மேலும் இது ஒருபோதும் மாறாது.

```solidity

    /* *********************
     * ஃபங்ஷன் மாடிஃபையர்கள் *
     ********************* */

    /* *
     * மாற்றியமைக்கப்பட்ட செயல்பாட்டை ஒரு குறிப்பிட்ட கிராஸ்-டொமைன் கணக்கு மட்டுமே அழைக்க முடியும் என்பதைச் செயல்படுத்துகிறது.
     * @param _sourceDomainAccount இந்தச் செயல்பாட்டை அழைக்க அங்கீகரிக்கப்பட்ட, தொடங்கும் டொமைனில் உள்ள ஒரே கணக்கு. */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

குறுக்கு டொமைன் செய்தியிடல் அது இயங்கும் பிளாக்செயினில் உள்ள எந்தவொரு ஒப்பந்தத்தாலும் (Ethereum mainnet அல்லது Optimism) அணுகக்கூடியது.
ஆனால் ஒவ்வொரு பக்கத்திலும் உள்ள பாலம் மற்ற பக்கத்தில் உள்ள பாலத்திலிருந்து வரும் குறிப்பிட்ட செய்திகளை _மட்டுமே_ நம்ப வேண்டும்.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

பொருத்தமான குறுக்கு டொமைன் மெசஞ்சரிலிருந்து (`messenger`, நீங்கள் கீழே பார்ப்பது போல்) வரும் செய்திகளை மட்டுமே நம்ப முடியும்.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

குறுக்கு டொமைன் மெசஞ்சர் மற்ற அடுக்குடன் செய்தியை அனுப்பிய முகவரியை வழங்கும் வழி [`.xDomainMessageSender()` செயல்பாடு](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128) ஆகும்.
செய்தியால் தொடங்கப்பட்ட பரிவர்த்தனையில் இது அழைக்கப்படும் வரை இந்தத் தகவலை வழங்க முடியும்.

நாம் பெற்ற செய்தி மற்ற பாலத்திலிருந்து வந்ததா என்பதை உறுதிப்படுத்த வேண்டும்.

```solidity

        _;
    }

    /* *********************
     * உள் செயல்பாடுகள் *
     ********************* */

    /* *
     * வழக்கமாக சேமிப்பகத்திலிருந்து மெசஞ்சரைப் பெறுகிறது. ஒரு துணை ஒப்பந்தம் மேலெழுத (override) வேண்டியிருந்தால் இந்தச் செயல்பாடு வெளிப்படுத்தப்படுகிறது.
     * @return பயன்படுத்த வேண்டிய கிராஸ்-டொமைன் மெசஞ்சர் ஒப்பந்தத்தின் முகவரி. */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

இந்தச் செயல்பாடு குறுக்கு டொமைன் மெசஞ்சரை வழங்குகிறது.
எந்தக் குறுக்கு டொமைன் மெசஞ்சரைப் பயன்படுத்த வேண்டும் என்பதைக் குறிப்பிட ஒரு அல்காரிதத்தைப் பயன்படுத்த இதிலிருந்து மரபுரிமையாகப் பெறும் ஒப்பந்தங்களை அனுமதிக்க, `messenger` மாறிக்கு பதிலாக ஒரு செயல்பாட்டைப் பயன்படுத்துகிறோம்.

```solidity

    /* *
     * மற்றொரு டொமைனில் உள்ள கணக்கிற்கு ஒரு செய்தியை அனுப்புகிறது
     * @param _crossDomainTarget இலக்கு டொமைனில் உள்ள உத்தேசிக்கப்பட்ட பெறுநர்
     * @param _message இலக்கிற்கு அனுப்ப வேண்டிய தரவு (வழக்கமாக `onlyFromCrossDomainAccount()` உள்ள செயல்பாட்டிற்கான calldata)
     * @param _gasLimit இலக்கு டொமைனில் செய்தியைப் பெறுவதற்கான gasLimit. */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

இறுதியாக, மற்ற அடுக்குக்குச் செய்தியை அனுப்பும் செயல்பாடு.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) என்பது பாதிப்புகள் மற்றும் பிற சாத்தியமான சிக்கல்களைத் தேட ஒவ்வொரு ஒப்பந்தத்திலும் Optimism இயக்கும் ஒரு நிலையான பகுப்பாய்வி (static analyzer) ஆகும்.
இந்த நிலையில், பின்வரும் வரி இரண்டு பாதிப்புகளைத் தூண்டுகிறது:

1. [ரீஎன்ட்ரன்சி நிகழ்வுகள் (Reentrancy events)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [தீங்கற்ற ரீஎன்ட்ரன்சி (Benign reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

இந்த நிலையில் ரீஎன்ட்ரன்சி பற்றி நாங்கள் கவலைப்படவில்லை, Slither-க்கு அதை அறிய வழி இல்லாவிட்டாலும், `getCrossDomainMessenger()` நம்பகமான முகவரியை வழங்குகிறது என்பது எங்களுக்குத் தெரியும்.

### L1 பால ஒப்பந்தம் {#the-l1-bridge-contract}

[இந்த ஒப்பந்தத்திற்கான மூலக் குறியீடு இங்கே உள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

இடைமுகங்கள் பிற ஒப்பந்தங்களின் ஒரு பகுதியாக இருக்கலாம், எனவே அவை பரந்த அளவிலான Solidity பதிப்புகளை ஆதரிக்க வேண்டும்.
ஆனால் பாலம் என்பது நமது ஒப்பந்தமாகும், மேலும் அது எந்த Solidity பதிப்பைப் பயன்படுத்துகிறது என்பதில் நாம் கண்டிப்பாக இருக்க முடியும்.

```solidity
/* இடைமுக இறக்குமதிகள் */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) மற்றும் [IL1StandardBridge](#IL1StandardBridge) ஆகியவை மேலே விளக்கப்பட்டுள்ளன.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

L2-ல் நிலையான பாலத்தைக் கட்டுப்படுத்த செய்திகளை உருவாக்க [இந்த இடைமுகம்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) நம்மை அனுமதிக்கிறது.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

ERC-20 ஒப்பந்தங்களைக் கட்டுப்படுத்த [இந்த இடைமுகம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) நம்மை அனுமதிக்கிறது.
[இதைப் பற்றி நீங்கள் இங்கே மேலும் படிக்கலாம்](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* நூலக இறக்குமதிகள் */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[மேலே விளக்கியபடி](#crossdomainenabled), இந்த ஒப்பந்தம் அடுக்ககளுக்கிடையேயான (interlayer) செய்தியிடலுக்குப் பயன்படுத்தப்படுகிறது.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) எப்போதும் ஒரே முகவரியைக் கொண்ட L2 ஒப்பந்தங்களுக்கான முகவரிகளைக் கொண்டுள்ளது. இதில் L2-ல் உள்ள நிலையான பாலமும் அடங்கும்.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin-ன் முகவரி பயன்பாடுகள் (Address utilities)](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). இது ஒப்பந்த முகவரிகள் மற்றும் வெளிப்புறமாகச் சொந்தமான கணக்குகளுக்கு (EOA) சொந்தமான முகவரிகளை வேறுபடுத்தப் பயன்படுகிறது.

இது ஒரு சரியான தீர்வு அல்ல என்பதை நினைவில் கொள்ளவும், ஏனெனில் நேரடி அழைப்புகள் மற்றும் ஒப்பந்தத்தின் கன்ஸ்ட்ரக்டரிலிருந்து செய்யப்படும் அழைப்புகளை வேறுபடுத்த வழி இல்லை, ஆனால் குறைந்தபட்சம் இது சில பொதுவான பயனர் பிழைகளை அடையாளம் காணவும் தடுக்கவும் அனுமதிக்கிறது.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 தரநிலை](https://eips.ethereum.org/EIPS/eip-20) ஒரு ஒப்பந்தம் தோல்வியைப் புகாரளிக்க இரண்டு வழிகளை ஆதரிக்கிறது:

1. Revert
2. `false`-ஐ வழங்குதல்

இரண்டு நிகழ்வுகளையும் கையாள்வது நமது குறியீட்டை மிகவும் சிக்கலாக்கும், எனவே அதற்குப் பதிலாக [OpenZeppelin-ன் `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)-ஐப் பயன்படுத்துகிறோம், இது [அனைத்து தோல்விகளும் revert-ல் முடிவடைவதை](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) உறுதி செய்கிறது.

```solidity
/* *
 * @title L1StandardBridge
 * @dev L1 ETH மற்றும் ERC20 பிரிட்ஜ் என்பது டெபாசிட் செய்யப்பட்ட L1 நிதிகளையும் L2-இல் பயன்பாட்டில் உள்ள நிலையான டோக்கன்களையும் சேமிக்கும் ஒரு ஒப்பந்தமாகும். இது தொடர்புடைய L2 பிரிட்ஜை ஒத்திசைக்கிறது, டெபாசிட்டுகளைப் பற்றி அதற்குத் தெரிவிக்கிறது மற்றும் புதிதாக இறுதி செய்யப்பட்ட திரும்பப் பெறுதல்களுக்காக அதைக் கண்காணிக்கிறது.
 * */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

`IERC20` இடைமுகத்தைப் பயன்படுத்தும் ஒவ்வொரு முறையும் `SafeERC20` ரேப்பரைப் (wrapper) பயன்படுத்த வேண்டும் என்பதை இந்த வரியில்தான் குறிப்பிடுகிறோம்.

```solidity

    /* *******************************
     * வெளிப்புற ஒப்பந்த குறிப்புகள் *
     ******************************* */

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract)-ன் முகவரி.

```solidity

    // டெபாசிட் செய்யப்பட்ட L1 டோக்கனின் இருப்பிற்கு L1 டோக்கனை L2 டோக்கனுடன் மேப் செய்கிறது
    mapping(address => mapping(address => uint256)) public deposits;
```

இது போன்ற இரட்டை [மேப்பிங் (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) என்பது [இரு பரிமாண ஸ்பார்ஸ் வரிசையை (two-dimensional sparse array)](https://en.wikipedia.org/wiki/Sparse_matrix) வரையறுக்கும் வழியாகும்.
இந்தத் தரவுக் கட்டமைப்பில் உள்ள மதிப்புகள் `deposit[L1 token addr][L2 token addr]` என அடையாளம் காணப்படுகின்றன.
இயல்புநிலை மதிப்பு பூஜ்ஜியமாகும்.
வேறு மதிப்பிற்கு அமைக்கப்பட்ட செல்கள் மட்டுமே சேமிப்பகத்தில் எழுதப்படும்.

```solidity

    /* **************
     * கன்ஸ்ட்ரக்டர் *
     ************** */

    // இந்த ஒப்பந்தம் ஒரு ப்ராக்ஸிக்குப் பின்னால் இயங்குகிறது, எனவே கன்ஸ்ட்ரக்டர் அளவுருக்கள் பயன்படுத்தப்படாது.
    constructor() CrossDomainEnabled(address(0)) {}
```

சேமிப்பகத்தில் உள்ள அனைத்து மாறிகளையும் நகலெடுக்காமல் இந்த ஒப்பந்தத்தை மேம்படுத்த முடியும்.
அதைச் செய்ய, ப்ராக்ஸி ஒப்பந்தத்தால் சேமிக்கப்பட்ட முகவரியைக் கொண்ட ஒரு தனி ஒப்பந்தத்திற்கு அழைப்புகளை மாற்ற [`delegatecall`](https://solidity-by-example.org/delegatecall/)-ஐப் பயன்படுத்தும் ஒப்பந்தமான [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)-ஐப் பயன்படுத்துகிறோம் (நீங்கள் மேம்படுத்தும்போது அந்த முகவரியை மாற்ற ப்ராக்ஸியிடம் கூறுகிறீர்கள்).
நீங்கள் `delegatecall`-ஐப் பயன்படுத்தும்போது, சேமிப்பகம் _அழைக்கும்_ ஒப்பந்தத்தின் சேமிப்பகமாகவே இருக்கும், எனவே அனைத்து ஒப்பந்த நிலை மாறிகளின் மதிப்புகளும் பாதிக்கப்படாது.

இந்த முறையின் ஒரு விளைவு என்னவென்றால், `delegatecall`-ஆல் _அழைக்கப்படும்_ ஒப்பந்தத்தின் சேமிப்பகம் பயன்படுத்தப்படுவதில்லை, எனவே அதற்கு அனுப்பப்படும் கன்ஸ்ட்ரக்டர் மதிப்புகள் ஒரு பொருட்டல்ல.
`CrossDomainEnabled` கன்ஸ்ட்ரக்டருக்கு நாம் ஒரு அர்த்தமற்ற மதிப்பை வழங்க இதுவே காரணம்.
கீழே உள்ள துவக்கம் கன்ஸ்ட்ரக்டரிலிருந்து தனித்தனியாக இருப்பதற்கும் இதுவே காரணம்.

```solidity
    /* *****************
     * துவக்கம் *
     ***************** */

    /* *
     * @param _l1messenger கிராஸ்-செயின் தகவல்தொடர்புகளுக்குப் பயன்படுத்தப்படும் L1 மெசஞ்சர் முகவரி.
     * @param _l2TokenBridge L2 நிலையான பிரிட்ஜ் முகவரி. */
    // slither-disable-next-line external-function
```

இந்த [Slither சோதனை](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ஒப்பந்தக் குறியீட்டிலிருந்து அழைக்கப்படாத செயல்பாடுகளை அடையாளம் காட்டுகிறது, எனவே அவற்றை `public`-க்கு பதிலாக `external` என அறிவிக்கலாம்.
`external` செயல்பாடுகளின் கேஸ் செலவு குறைவாக இருக்கலாம், ஏனெனில் அவற்றுக்கு கால்டேட்டாவில் (calldata) அளவுருக்கள் வழங்கப்படலாம்.
`public` என அறிவிக்கப்பட்ட செயல்பாடுகள் ஒப்பந்தத்திற்குள்ளிருந்து அணுகக்கூடியதாக இருக்க வேண்டும்.
ஒப்பந்தங்கள் அவற்றின் சொந்த கால்டேட்டாவை மாற்ற முடியாது, எனவே அளவுருக்கள் நினைவகத்தில் இருக்க வேண்டும்.
அத்தகைய செயல்பாடு வெளிப்புறமாக அழைக்கப்படும்போது, கால்டேட்டாவை நினைவகத்திற்கு நகலெடுப்பது அவசியமாகும், இதற்கு கேஸ் செலவாகும்.
இந்த நிலையில் செயல்பாடு ஒரு முறை மட்டுமே அழைக்கப்படுகிறது, எனவே திறமையின்மை நமக்கு ஒரு பொருட்டல்ல.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` செயல்பாடு ஒரு முறை மட்டுமே அழைக்கப்பட வேண்டும்.
L1 குறுக்கு டொமைன் மெசஞ்சர் அல்லது L2 டோக்கன் பாலத்தின் முகவரி மாறினால், நாங்கள் ஒரு புதிய ப்ராக்ஸியையும் அதை அழைக்கும் புதிய பாலத்தையும் உருவாக்குகிறோம்.
முழு அமைப்பும் மேம்படுத்தப்படும் போது தவிர இது நடக்க வாய்ப்பில்லை, இது மிகவும் அரிதான நிகழ்வாகும்.

இந்தச் செயல்பாட்டை _யார்_ அழைக்கலாம் என்பதைக் கட்டுப்படுத்தும் எந்தப் பொறிமுறையும் இதில் இல்லை என்பதை நினைவில் கொள்ளவும்.
இதன் பொருள், கோட்பாட்டளவில் ஒரு தாக்குபவர் நாங்கள் ப்ராக்ஸியையும் பாலத்தின் முதல் பதிப்பையும் பயன்படுத்தும் வரை காத்திருந்து, பின்னர் முறையான பயனர் செய்வதற்கு முன் `initialize` செயல்பாட்டை அடைய [முன்கூட்டியே செயல்படலாம் (front-run)](https://solidity-by-example.org/hacks/front-running/). ஆனால் இதைத் தடுக்க இரண்டு முறைகள் உள்ளன:

1. ஒப்பந்தங்கள் நேரடியாக ஒரு EOA-ஆல் பயன்படுத்தப்படாமல், [மற்றொரு ஒப்பந்தம் அவற்றை உருவாக்கும் பரிவர்த்தனையில்](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) பயன்படுத்தப்பட்டால், முழு செயல்முறையும் அணுவாக (atomic) இருக்கலாம், மேலும் வேறு எந்தப் பரிவர்த்தனையும் செயல்படுத்தப்படுவதற்கு முன்பு முடிவடையும்.
2. `initialize`-க்கான முறையான அழைப்பு தோல்வியுற்றால், புதிதாக உருவாக்கப்பட்ட ப்ராக்ஸி மற்றும் பாலத்தைப் புறக்கணித்து புதியவற்றை உருவாக்குவது எப்போதும் சாத்தியமாகும்.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

பாலம் தெரிந்து கொள்ள வேண்டிய இரண்டு அளவுருக்கள் இவை.

```solidity

    /* *************
     * டெபாசிட் செய்தல் *
     ************* */

    /* * @dev அனுப்புநர் EOA ஆக இருக்க வேண்டும் என்று கோரும் மாடிஃபையர். இந்தச் சரிபார்ப்பை initcode மூலம் ஒரு தீங்கிழைக்கும் ஒப்பந்தத்தால் தவிர்க்க முடியும், ஆனால் நாம் தவிர்க்க விரும்பும் பயனர் பிழையை இது கவனித்துக்கொள்கிறது. */
    modifier onlyEOA() {
        // ஒப்பந்தங்களிலிருந்து டெபாசிட்டுகளை நிறுத்தப் பயன்படுகிறது (தவறுதலாக டோக்கன்கள் இழக்கப்படுவதைத் தவிர்க்க)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

OpenZeppelin-ன் `Address` பயன்பாடுகள் நமக்குத் தேவைப்பட்டதற்கு இதுவே காரணம்.

```solidity
    /* *
     * @dev அழைப்பாளரின் L2 இருப்பில் குறிப்பிட்ட அளவு ETH-ஐ டெபாசிட் செய்ய
     * எந்தத் தரவும் இல்லாமல் இந்தச் செயல்பாட்டை அழைக்கலாம்.
     * receive செயல்பாடு தரவை எடுத்துக்கொள்ளாது என்பதால், ஒரு பழமைவாத
     * இயல்புநிலை அளவு L2-க்கு அனுப்பப்படுகிறது. */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

இந்தச் செயல்பாடு சோதனை நோக்கங்களுக்காக உள்ளது.
இது இடைமுக வரையறைகளில் தோன்றவில்லை என்பதைக் கவனியுங்கள் - இது சாதாரண பயன்பாட்டிற்கானது அல்ல.

```solidity
    /* *
     * @inheritdoc IL1StandardBridge */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1StandardBridge */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

இந்த இரண்டு செயல்பாடுகளும் உண்மையான ETH டெபாசிட்டைக் கையாளும் செயல்பாடான `_initiateETHDeposit`-ஐச் சுற்றியுள்ள ரேப்பர்கள் ஆகும்.

```solidity
    /* *
     * @dev ETH-ஐ சேமித்து, டெபாசிட் பற்றி L2 ETH கேட்வேக்கு தெரிவிப்பதன் மூலம் டெபாசிட்டுகளுக்கான தர்க்கத்தைச் செய்கிறது.
     * @param _from L1-இல் டெபாசிட்டைப் பெற வேண்டிய கணக்கு.
     * @param _to L2-இல் டெபாசிட்டை வழங்க வேண்டிய கணக்கு.
     * @param _l2Gas L2-இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2-க்கு அனுப்ப வேண்டிய விருப்பத் தரவு. இந்தத் தரவு வெளிப்புற ஒப்பந்தங்களின் வசதிக்காக மட்டுமே வழங்கப்படுகிறது. அதிகபட்ச நீளத்தை செயல்படுத்துவதைத் தவிர, இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கத்தைப் பற்றி எந்த உத்தரவாதத்தையும் வழங்காது. */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit அழைப்பிற்கான calldata-வை உருவாக்குகிறது
        bytes memory message = abi.encodeWithSelector(
```

குறுக்கு டொமைன் செய்திகள் செயல்படும் விதம் என்னவென்றால், இலக்கு ஒப்பந்தம் செய்தியை அதன் கால்டேட்டாவாகக் கொண்டு அழைக்கப்படுகிறது.
Solidity ஒப்பந்தங்கள் எப்போதும் [ABI விவரக்குறிப்புகளுக்கு](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) ஏற்ப அவற்றின் கால்டேட்டாவை விளக்குகின்றன.
Solidity செயல்பாடு [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) அந்த கால்டேட்டாவை உருவாக்குகிறது.

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

இந்த அளவுருக்களுடன் [`finalizeDeposit` செயல்பாட்டை](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) அழைப்பதே இங்குள்ள செய்தியாகும்:

| அளவுரு | மதிப்பு                          | பொருள்                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | L1-ல் ETH-ஐக் (இது ERC-20 டோக்கன் அல்ல) குறிக்கும் சிறப்பு மதிப்பு                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism-ல் ETH-ஐ நிர்வகிக்கும் L2 ஒப்பந்தம், `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (இந்த ஒப்பந்தம் உள் Optimism பயன்பாட்டிற்கு மட்டுமே) |
| \_from    | \_from                         | ETH-ஐ அனுப்பும் L1-ல் உள்ள முகவரி                                                                                                         |
| \_to      | \_to                           | ETH-ஐப் பெறும் L2-ல் உள்ள முகவரி                                                                                                      |
| amount    | msg.value                      | அனுப்பப்பட்ட wei-ன் அளவு (இது ஏற்கனவே பாலத்திற்கு அனுப்பப்பட்டுள்ளது)                                                                               |
| \_data    | \_data                         | டெபாசிட்டுடன் இணைக்க வேண்டிய கூடுதல் தரவு                                                                                                     |

```solidity
        // L2-க்குள் calldata-வை அனுப்புகிறது
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

குறுக்கு டொமைன் மெசஞ்சர் மூலம் செய்தியை அனுப்பவும்.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

இந்தப் பரிமாற்றத்தைக் கேட்கும் எந்தவொரு பரவலாக்கப்பட்ட பயன்பாட்டிற்கும் தெரிவிக்க ஒரு நிகழ்வை வெளியிடவும்.

```solidity
    /* *
     * @inheritdoc IL1ERC20Bridge */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

இந்த இரண்டு செயல்பாடுகளும் உண்மையான ERC-20 டெபாசிட்டைக் கையாளும் செயல்பாடான `_initiateERC20Deposit`-ஐச் சுற்றியுள்ள ரேப்பர்கள் ஆகும்.

```solidity
    /* *
     * @dev L2 டெபாசிட் செய்யப்பட்ட டோக்கன் ஒப்பந்தத்திற்கு டெபாசிட் பற்றி தெரிவிப்பதன் மூலமும், L1 நிதிகளைப் பூட்ட ஒரு ஹேண்ட்லரை அழைப்பதன் மூலமும் (எ.கா., transferFrom) டெபாசிட்டுகளுக்கான தர்க்கத்தைச் செய்கிறது.
     *
     * @param _l1Token நாம் டெபாசிட் செய்யும் L1 ERC20-இன் முகவரி
     * @param _l2Token L1-க்கு தொடர்புடைய L2 ERC20-இன் முகவரி
     * @param _from L1-இல் டெபாசிட்டைப் பெற வேண்டிய கணக்கு
     * @param _to L2-இல் டெபாசிட்டை வழங்க வேண்டிய கணக்கு
     * @param _amount டெபாசிட் செய்ய வேண்டிய ERC20-இன் அளவு.
     * @param _l2Gas L2-இல் டெபாசிட்டை முடிக்கத் தேவையான கேஸ் வரம்பு.
     * @param _data L2-க்கு அனுப்ப வேண்டிய விருப்பத் தரவு. இந்தத் தரவு வெளிப்புற ஒப்பந்தங்களின் வசதிக்காக மட்டுமே வழங்கப்படுகிறது. அதிகபட்ச நீளத்தை செயல்படுத்துவதைத் தவிர, இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கத்தைப் பற்றி எந்த உத்தரவாதத்தையும் வழங்காது. */
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

இந்தச் செயல்பாடு சில முக்கியமான வேறுபாடுகளுடன் மேலே உள்ள `_initiateETHDeposit`-ஐப் போன்றது.
முதல் வித்தியாசம் என்னவென்றால், இந்தச் செயல்பாடு டோக்கன் முகவரிகள் மற்றும் மாற்றுவதற்கான தொகையை அளவுருக்களாகப் பெறுகிறது.
ETH-ஐப் பொறுத்தவரை, பாலத்திற்கான அழைப்பு ஏற்கனவே பாலக் கணக்கிற்கு சொத்தை மாற்றுவதை உள்ளடக்கியது (`msg.value`).

```solidity
        // L1-இல் ஒரு டெபாசிட் தொடங்கப்படும்போது, L1 பிரிட்ஜ் எதிர்கால
        // திரும்பப் பெறுதல்களுக்காக நிதியைத் தனக்கே மாற்றிக்கொள்கிறது. ஒப்பந்தத்தில் குறியீடு உள்ளதா என்பதையும் safeTransferFrom சரிபார்க்கிறது, எனவே
        // _from ஒரு EOA அல்லது address(0) ஆக இருந்தால் இது தோல்வியடையும்.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 டோக்கன் பரிமாற்றங்கள் ETH-லிருந்து வேறுபட்ட செயல்முறையைப் பின்பற்றுகின்றன:

1. பயனர் (`_from`) பொருத்தமான டோக்கன்களை மாற்ற பாலத்திற்கு ஒரு அனுமதியை வழங்குகிறார்.
2. பயனர் டோக்கன் ஒப்பந்தத்தின் முகவரி, தொகை போன்றவற்றுடன் பாலத்தை அழைக்கிறார்.
3. டெபாசிட் செயல்முறையின் ஒரு பகுதியாக பாலம் டோக்கன்களை (தனக்குத்தானே) மாற்றுகிறது.

முதல் படி கடைசி இரண்டிலிருந்து தனிப் பரிவர்த்தனையில் நடக்கலாம்.
இருப்பினும், `_initiateERC20Deposit`-ஐ அழைக்கும் இரண்டு செயல்பாடுகளும் (`depositERC20` மற்றும் `depositERC20To`) `msg.sender`-ஐ `_from` அளவுருவாகக் கொண்டு மட்டுமே இந்தச் செயல்பாட்டை அழைப்பதால், முன்கூட்டியே செயல்படுவது (front-running) ஒரு பிரச்சினையல்ல.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) க்கான calldata-வை உருவாக்குகிறது
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // L2-க்குள் calldata-வை அனுப்புகிறது
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

டெபாசிட் செய்யப்பட்ட டோக்கன்களின் அளவை `deposits` தரவுக் கட்டமைப்பில் சேர்க்கவும்.
ஒரே L1 ERC-20 டோக்கனுக்கு ஒத்த பல முகவரிகள் L2-ல் இருக்கலாம், எனவே டெபாசிட்களைக் கண்காணிக்க L1 ERC-20 டோக்கனின் பாலத்தின் இருப்பைப் பயன்படுத்துவது போதாது.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /* ************************
     * கிராஸ்-செயின் செயல்பாடுகள் *
     ************************ */

    /* *
     * @inheritdoc IL1StandardBridge */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 பாலம் L2 குறுக்கு டொமைன் மெசஞ்சருக்கு ஒரு செய்தியை அனுப்புகிறது, இது L1 குறுக்கு டொமைன் மெசஞ்சரை இந்தச் செயல்பாட்டை அழைக்கச் செய்கிறது (நிச்சயமாக, [செய்தியை இறுதி செய்யும் பரிவர்த்தனை](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1-ல் சமர்ப்பிக்கப்பட்டவுடன்).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

இது குறுக்கு டொமைன் மெசஞ்சரிலிருந்து வரும் மற்றும் L2 டோக்கன் பாலத்திலிருந்து உருவாகும் ஒரு _சட்டபூர்வமான_ செய்தி என்பதை உறுதிப்படுத்தவும்.
பாலத்திலிருந்து ETH-ஐத் திரும்பப் பெற இந்தச் செயல்பாடு பயன்படுத்தப்படுகிறது, எனவே இது அங்கீகரிக்கப்பட்ட அழைப்பாளரால் மட்டுமே அழைக்கப்படுகிறது என்பதை நாம் உறுதிப்படுத்த வேண்டும்.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH-ஐ மாற்றுவதற்கான வழி, `msg.value`-ல் உள்ள wei-ன் அளவுடன் பெறுநரை அழைப்பதாகும்.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

திரும்பப் பெறுதல் பற்றிய ஒரு நிகழ்வை வெளியிடவும்.

```solidity
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

இந்தச் செயல்பாடு ERC-20 டோக்கன்களுக்கான தேவையான மாற்றங்களுடன் மேலே உள்ள `finalizeETHWithdrawal`-ஐப் போன்றது.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` தரவுக் கட்டமைப்பைப் புதுப்பிக்கவும்.

```solidity

        // L1-இல் திரும்பப் பெறுதல் இறுதி செய்யப்படும்போது, L1 பிரிட்ஜ் நிதியைத் திரும்பப் பெறுபவருக்கு மாற்றுகிறது
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /* ****************************
     * தற்காலிகமானது - ETH-ஐ இடம்பெயர்த்தல் *
     **************************** */

    /* *
     * @dev கணக்கில் ETH இருப்பைச் சேர்க்கிறது. பழைய கேட்வேயிலிருந்து புதிய கேட்வேக்கு ETH-ஐ
     * இடம்பெயர்க்க அனுமதிக்கும் வகையில் இது வடிவமைக்கப்பட்டுள்ளது.
     * குறிப்பு: பழைய ஒப்பந்தத்திலிருந்து இடம்பெயர்ந்த ETH-ஐப் பெறுவதற்காக இது ஒரு மேம்படுத்தலுக்கு (upgrade) மட்டுமே விடப்பட்டுள்ளது */
    function donateETH() external payable {}
}
```

பாலத்தின் முந்தைய செயலாக்கம் ஒன்று இருந்தது.
அந்தச் செயலாக்கத்திலிருந்து இதற்கு மாறியபோது, நாங்கள் அனைத்து சொத்துகளையும் நகர்த்த வேண்டியிருந்தது.
ERC-20 டோக்கன்களை அப்படியே நகர்த்தலாம்.
இருப்பினும், ஒரு ஒப்பந்தத்திற்கு ETH-ஐ மாற்ற உங்களுக்கு அந்த ஒப்பந்தத்தின் ஒப்புதல் தேவை, அதைத்தான் `donateETH` நமக்கு வழங்குகிறது.

## L2-ல் ERC-20 டோக்கன்கள் {#erc-20-tokens-on-l2}

ஒரு ERC-20 டோக்கன் நிலையான பாலத்தில் பொருந்துவதற்கு, அது நிலையான பாலத்தை, மற்றும் நிலையான பாலத்தை _மட்டுமே_, டோக்கனை உருவாக்க (mint) அனுமதிக்க வேண்டும்.
Optimism-ல் புழக்கத்தில் உள்ள டோக்கன்களின் எண்ணிக்கை L1 பால ஒப்பந்தத்திற்குள் லாக் செய்யப்பட்டுள்ள டோக்கன்களின் எண்ணிக்கைக்குச் சமமாக இருப்பதை பாலங்கள் உறுதி செய்ய வேண்டியிருப்பதால் இது அவசியமாகும்.
L2-ல் அதிக டோக்கன்கள் இருந்தால், சில பயனர்களால் தங்கள் சொத்துகளை மீண்டும் L1-க்கு பாலம் செய்ய முடியாது.
நம்பகமான பாலத்திற்குப் பதிலாக, நாங்கள் அடிப்படையில் [பின்ன இருப்பு வங்கியியலை (fractional reserve banking)](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) மீண்டும் உருவாக்குவோம்.
L1-ல் அதிக டோக்கன்கள் இருந்தால், L2 டோக்கன்களை எரிக்காமல் அவற்றை வெளியிட வழி இல்லாததால், அந்த டோக்கன்களில் சில பால ஒப்பந்தத்திற்குள் என்றென்றும் லாக் செய்யப்பட்டிருக்கும்.

### IL2StandardERC20 {#il2standarderc20}

நிலையான பாலத்தைப் பயன்படுத்தும் L2-ல் உள்ள ஒவ்வொரு ERC-20 டோக்கனும் [இந்த இடைமுகத்தை](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) வழங்க வேண்டும், இது நிலையான பாலத்திற்குத் தேவையான செயல்பாடுகள் மற்றும் நிகழ்வுகளைக் கொண்டுள்ளது.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[நிலையான ERC-20 இடைமுகம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) `mint` மற்றும் `burn` செயல்பாடுகளை உள்ளடக்கவில்லை.
அந்த முறைகள் [ERC-20 தரநிலையால்](https://eips.ethereum.org/EIPS/eip-20) தேவைப்படுவதில்லை, இது டோக்கன்களை உருவாக்குவதற்கும் அழிப்பதற்குமான வழிமுறைகளைக் குறிப்பிடாமல் விட்டுவிடுகிறது.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

ஒரு ஒப்பந்தம் என்ன செயல்பாடுகளை வழங்குகிறது என்பதைக் குறிப்பிட [ERC-165 இடைமுகம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) பயன்படுத்தப்படுகிறது.
[நீங்கள் தரநிலையை இங்கே படிக்கலாம்](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

இந்த ஒப்பந்தத்திற்குப் பாலம் செய்யப்பட்ட L1 டோக்கனின் முகவரியை இந்தச் செயல்பாடு வழங்குகிறது.
எதிர் திசையில் இதே போன்ற செயல்பாடு எங்களிடம் இல்லை என்பதை நினைவில் கொள்ளவும்.
அது செயல்படுத்தப்பட்ட போது L2 ஆதரவு திட்டமிடப்பட்டதா இல்லையா என்பதைப் பொருட்படுத்தாமல், எந்தவொரு L1 டோக்கனையும் பாலம் செய்ய நாம் সক্ষমமாக இருக்க வேண்டும்.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

டோக்கன்களை உருவாக்க (mint) மற்றும் அழிக்க (burn) செயல்பாடுகள் மற்றும் நிகழ்வுகள்.
டோக்கன்களின் எண்ணிக்கை சரியாக இருப்பதை (L1-ல் லாக் செய்யப்பட்டுள்ள டோக்கன்களின் எண்ணிக்கைக்குச் சமமாக) உறுதி செய்ய இந்தச் செயல்பாடுகளை இயக்கக்கூடிய ஒரே நிறுவனமாக பாலம் இருக்க வேண்டும்.

### L2StandardERC20 {#L2StandardERC20}

[இது `IL2StandardERC20` இடைமுகத்தின் எங்கள் செயலாக்கமாகும்](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
உங்களுக்கு ஏதேனும் தனிப்பயன் தர்க்கம் தேவைப்படாவிட்டால், நீங்கள் இதைப் பயன்படுத்த வேண்டும்.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 ஒப்பந்தம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism சக்கரத்தை மீண்டும் கண்டுபிடிப்பதில் நம்பிக்கை கொள்ளவில்லை, குறிப்பாக சக்கரம் நன்கு தணிக்கை செய்யப்பட்டு சொத்துகளை வைத்திருக்க போதுமான நம்பகத்தன்மையுடன் இருக்க வேண்டியிருக்கும் போது.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

இவை நமக்குத் தேவைப்படும் மற்றும் ERC-20-க்கு பொதுவாகத் தேவைப்படாத இரண்டு கூடுதல் உள்ளமைவு அளவுருக்கள் ஆகும்.

```solidity

    /* *
     * @param _l2Bridge L2 நிலையான பிரிட்ஜின் முகவரி.
     * @param _l1Token தொடர்புடைய L1 டோக்கனின் முகவரி.
     * @param _name ERC20 பெயர்.
     * @param _symbol ERC20 குறியீடு. */
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

முதலில் நாம் மரபுரிமையாகப் பெறும் ஒப்பந்தத்திற்கான கன்ஸ்ட்ரக்டரை அழைக்கவும் (`ERC20(_name, _symbol)`) பின்னர் நமது சொந்த மாறிகளை அமைக்கவும்.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) இவ்வாறுதான் செயல்படுகிறது.
ஒவ்வொரு இடைமுகமும் ஆதரிக்கப்படும் செயல்பாடுகளின் எண்ணிக்கையாகும், மேலும் அந்தச் செயல்பாடுகளின் [ABI செயல்பாட்டுத் தேர்வாளர்களின் (ABI function selectors)](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [பிரத்தியேக அல்லது (exclusive or)](https://en.wikipedia.org/wiki/Exclusive_or) என அடையாளம் காணப்படுகிறது.

L2 பாலம் சொத்துகளை அனுப்பும் ERC-20 ஒப்பந்தம் ஒரு `IL2StandardERC20` என்பதை உறுதிப்படுத்த ERC-165-ஐ ஒரு பகுத்தறிவுச் சோதனையாகப் (sanity check) பயன்படுத்துகிறது.

**குறிப்பு:** முரட்டு ஒப்பந்தம் `supportsInterface`-க்கு தவறான பதில்களை வழங்குவதைத் தடுக்க எதுவும் இல்லை, எனவே இது ஒரு பகுத்தறிவுச் சோதனை பொறிமுறையாகும், பாதுகாப்பு பொறிமுறை _அல்ல_.

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

L2 பாலம் மட்டுமே சொத்துகளை உருவாக்கவும் அழிக்கவும் அனுமதிக்கப்படுகிறது.

`_mint` மற்றும் `_burn` ஆகியவை உண்மையில் [OpenZeppelin ERC-20 ஒப்பந்தத்தில்](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) வரையறுக்கப்பட்டுள்ளன.
அந்த ஒப்பந்தம் அவற்றை வெளிப்புறமாக வெளிப்படுத்தாது, ஏனெனில் டோக்கன்களை உருவாக்குவதற்கும் அழிப்பதற்குமான நிபந்தனைகள் ERC-20-ஐப் பயன்படுத்துவதற்கான வழிகளின் எண்ணிக்கையைப் போலவே வேறுபட்டவை.

## L2 பாலக் குறியீடு {#l2-bridge-code}

இது Optimism-ல் பாலத்தை இயக்கும் குறியீடாகும்.
[இந்த ஒப்பந்தத்திற்கான ஆதாரம் இங்கே உள்ளது](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* இடைமுக இறக்குமதிகள் */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) இடைமுகம் நாம் மேலே பார்த்த [L1 இணையானதற்கு](#IL1ERC20Bridge) மிகவும் ஒத்ததாகும்.
இரண்டு குறிப்பிடத்தக்க வேறுபாடுகள் உள்ளன:

1. L1-ல் நீங்கள் டெபாசிட்களைத் தொடங்கி திரும்பப் பெறுதல்களை முடிக்கிறீர்கள்.
   இங்கே நீங்கள் திரும்பப் பெறுதல்களைத் தொடங்கி டெபாசிட்களை முடிக்கிறீர்கள்.
2. L1-ல் ETH மற்றும் ERC-20 டோக்கன்களை வேறுபடுத்துவது அவசியமாகும்.
   L2-ல் நாம் இரண்டிற்கும் ஒரே செயல்பாடுகளைப் பயன்படுத்தலாம், ஏனெனில் உள்நாட்டில் Optimism-ல் உள்ள ETH இருப்புகள் [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) என்ற முகவரியுடன் ERC-20 டோக்கனாகக் கையாளப்படுகின்றன.

```solidity
/* நூலக இறக்குமதிகள் */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* ஒப்பந்த இறக்குமதிகள் */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/* *
 * @title L2StandardBridge
 * @dev L2 நிலையான பிரிட்ஜ் என்பது L1 மற்றும் L2-க்கு இடையே ETH மற்றும் ERC20 பரிமாற்றங்களைச் செயல்படுத்த
 * L1 நிலையான பிரிட்ஜுடன் இணைந்து செயல்படும் ஒரு ஒப்பந்தமாகும்.
 * L1 நிலையான பிரிட்ஜில் டெபாசிட்டுகள் செய்யப்படுவதைப் பற்றி அறியும்போது, இந்த ஒப்பந்தம் புதிய டோக்கன்களை உருவாக்குபவராக (minter) செயல்படுகிறது.
 * திரும்பப் பெறுவதற்காக உத்தேசிக்கப்பட்ட டோக்கன்களை அழிப்பவராகவும் (burner) இந்த ஒப்பந்தம் செயல்படுகிறது, L1 நிதியை வெளியிடுமாறு L1 பிரிட்ஜுக்குத் தெரிவிக்கிறது. */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /* *******************************
     * வெளிப்புற ஒப்பந்த குறிப்புகள் *
     ******************************* */

    address public l1TokenBridge;
```

L1 பாலத்தின் முகவரியைக் கண்காணிக்கவும்.
L1 இணையானதற்கு மாறாக, இங்கே நமக்கு இந்த மாறி _தேவை_ என்பதை நினைவில் கொள்ளவும்.
L1 பாலத்தின் முகவரி முன்கூட்டியே தெரியாது.

```solidity

    /* **************
     * கன்ஸ்ட்ரக்டர் *
     ************** */

    /* *
     * @param _l2CrossDomainMessenger இந்த ஒப்பந்தத்தால் பயன்படுத்தப்படும் கிராஸ்-டொமைன் மெசஞ்சர்.
     * @param _l1TokenBridge பிரதான செயினில் (main chain) பயன்படுத்தப்பட்ட L1 பிரிட்ஜின் முகவரி. */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /* **************
     * திரும்பப் பெறுதல் *
     ************** */

    /* *
     * @inheritdoc IL2ERC20Bridge */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /* *
     * @inheritdoc IL2ERC20Bridge */
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
L1 டோக்கன் முகவரியைக் குறிப்பிடத் தேவையில்லை என்பதை நினைவில் கொள்ளவும்.
L2 டோக்கன்கள் L1 இணையான முகவரியை நமக்குச் சொல்லும் என்று எதிர்பார்க்கப்படுகிறது.

```solidity

    /* *
     * @dev டோக்கனை அழிப்பதன் மூலமும், திரும்பப் பெறுதல் பற்றி L1 டோக்கன் கேட்வேக்குத் தெரிவிப்பதன் மூலமும்
     *      திரும்பப் பெறுதல்களுக்கான தர்க்கத்தைச் செய்கிறது.
     * @param _l2Token திரும்பப் பெறுதல் தொடங்கப்பட்ட L2 டோக்கனின் முகவரி.
     * @param _from L2-இல் திரும்பப் பெறுதலைப் பெற வேண்டிய கணக்கு.
     * @param _to L1-இல் திரும்பப் பெறுதலை வழங்க வேண்டிய கணக்கு.
     * @param _amount திரும்பப் பெற வேண்டிய டோக்கனின் அளவு.
     * @param _l1Gas பயன்படுத்தப்படவில்லை, ஆனால் சாத்தியமான முன்னோக்கு இணக்கத்தன்மை (forward compatibility) பரிசீலனைகளுக்காக சேர்க்கப்பட்டுள்ளது.
     * @param _data L1-க்கு அனுப்ப வேண்டிய விருப்பத் தரவு. இந்தத் தரவு வெளிப்புற ஒப்பந்தங்களின் வசதிக்காக மட்டுமே வழங்கப்படுகிறது. அதிகபட்ச நீளத்தை செயல்படுத்துவதைத் தவிர, இந்த ஒப்பந்தங்கள் அதன் உள்ளடக்கத்தைப் பற்றி எந்த உத்தரவாதத்தையும் வழங்காது. */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // திரும்பப் பெறுதல் தொடங்கப்படும்போது, அடுத்தடுத்த L2
        // பயன்பாட்டைத் தடுக்க திரும்பப் பெறுபவரின் நிதியை நாங்கள் அழிக்கிறோம் (burn)
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

நாங்கள் `_from` அளவுருவை நம்பியிருக்கவில்லை, மாறாக `msg.sender`-ஐ நம்பியிருக்கிறோம் என்பதைக் கவனியுங்கள், இது போலியாக உருவாக்குவது மிகவும் கடினம் (எனக்குத் தெரிந்தவரை சாத்தியமற்றது).

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) க்கான calldata-வை உருவாக்குகிறது
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1-ல் ETH மற்றும் ERC-20-ஐ வேறுபடுத்துவது அவசியமாகும்.

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

        // L1 பிரிட்ஜுக்கு செய்தியை அனுப்புகிறது
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /* ***********************************
     * கிராஸ்-செயின் செயல்பாடு: டெபாசிட் செய்தல் *
     *********************************** */

    /* *
     * @inheritdoc IL2ERC20Bridge */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

இந்தச் செயல்பாடு `L1StandardBridge`-ஆல் அழைக்கப்படுகிறது.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

செய்தியின் ஆதாரம் சட்டபூர்வமானது என்பதை உறுதிப்படுத்தவும்.
இது முக்கியமானது, ஏனெனில் இந்தச் செயல்பாடு `_mint`-ஐ அழைக்கிறது மற்றும் L1-ல் பாலம் வைத்திருக்கும் டோக்கன்களால் ஈடுசெய்யப்படாத டோக்கன்களை வழங்கப் பயன்படுத்தப்படலாம்.

```solidity
        // இலக்கு டோக்கன் இணக்கமாக உள்ளதா என்பதைச் சரிபார்த்து,
        // L1-இல் டெபாசிட் செய்யப்பட்ட டோக்கன் இங்குள்ள L2 டெபாசிட் செய்யப்பட்ட டோக்கன் பிரதிநிதித்துவத்துடன் பொருந்துகிறதா என்பதைச் சரிபார்க்கவும்
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

பகுத்தறிவுச் சோதனைகள் (Sanity checks):

1. சரியான இடைமுகம் ஆதரிக்கப்படுகிறது
2. L2 ERC-20 ஒப்பந்தத்தின் L1 முகவரி டோக்கன்களின் L1 ஆதாரத்துடன் பொருந்துகிறது

```solidity
        ) {
            // ஒரு டெபாசிட் இறுதி செய்யப்படும்போது, L2-இல் உள்ள கணக்கில் அதே அளவு
            // டோக்கன்களை வரவு வைக்கிறோம்.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

பகுத்தறிவுச் சோதனைகள் தேர்ச்சி பெற்றால், டெபாசிட்டை முடிக்கவும்:

1. டோக்கன்களை உருவாக்கவும் (Mint)
2. பொருத்தமான நிகழ்வை வெளியிடவும்

```solidity
        } else {
            // டெபாசிட் செய்யப்படும் L2 டோக்கன் அதன் L1 டோக்கனின் சரியான முகவரியைப் பற்றி முரண்படுகிறது
            // அல்லது சரியான இடைமுகத்தை ஆதரிக்கவில்லை.
            // ஒரு தீங்கிழைக்கும் L2 டோக்கன் இருந்தால் அல்லது ஒரு பயனர் எப்படியாவது
            // டெபாசிட் செய்ய தவறான L2 டோக்கன் முகவரியைக் குறிப்பிட்டால் மட்டுமே இது நிகழ வேண்டும்.
            // எந்தவொரு சந்தர்ப்பத்திலும், நாங்கள் செயல்முறையை இங்கு நிறுத்தி, ஒரு திரும்பப் பெறுதல்
            // செய்தியை உருவாக்குகிறோம், இதனால் பயனர்கள் சில சந்தர்ப்பங்களில் தங்கள் நிதியை வெளியே எடுக்க முடியும்.
            // தீங்கிழைக்கும் டோக்கன் ஒப்பந்தங்களை முற்றிலுமாகத் தடுக்க எந்த வழியும் இல்லை, ஆனால் இது
            // பயனர் பிழையைக் கட்டுப்படுத்துகிறது மற்றும் சில வகையான தீங்கிழைக்கும் ஒப்பந்த நடத்தைகளைத் தணிக்கிறது.
```

தவறான L2 டோக்கன் முகவரியைப் பயன்படுத்தி பயனர் கண்டறியக்கூடிய பிழையைச் செய்திருந்தால், நாங்கள் டெபாசிட்டை ரத்து செய்து L1-ல் டோக்கன்களைத் திருப்பித் தர விரும்புகிறோம்.
L2-லிருந்து இதைச் செய்வதற்கான ஒரே வழி, தவறு சவால் காலத்திற்குக் காத்திருக்க வேண்டிய ஒரு செய்தியை அனுப்புவதாகும், ஆனால் டோக்கன்களை நிரந்தரமாக இழப்பதை விட இது பயனருக்கு மிகவும் சிறந்தது.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // டெபாசிட்டை அனுப்புநருக்கே திருப்பி அனுப்ப இங்கு _to மற்றும் _from மாற்றப்பட்டுள்ளது
                _from,
                _amount,
                _data
            );

            // L1 பிரிட்ஜுக்கு செய்தியை அனுப்புகிறது
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## முடிவுரை {#conclusion}

நிலையான பாலம் என்பது சொத்துப் பரிமாற்றங்களுக்கான மிகவும் நெகிழ்வான பொறிமுறையாகும்.
இருப்பினும், இது மிகவும் பொதுவானது என்பதால், இது எப்போதும் பயன்படுத்த எளிதான பொறிமுறையாக இருக்காது.
குறிப்பாகத் திரும்பப் பெறுதல்களுக்கு, பெரும்பாலான பயனர்கள் சவால் காலத்திற்குக் காத்திருக்காத மற்றும் திரும்பப் பெறுதலை முடிக்க Merkle சான்று தேவைப்படாத [மூன்றாம் தரப்பு பாலங்களைப் (third party bridges)](https://optimism.io/apps#bridge) பயன்படுத்த விரும்புகிறார்கள்.

இந்தப் பாலங்கள் பொதுவாக L1-ல் சொத்துகளை வைத்திருப்பதன் மூலம் செயல்படுகின்றன, அவை ஒரு சிறிய கட்டணத்தில் உடனடியாக வழங்குகின்றன (பெரும்பாலும் நிலையான பாலத்தைத் திரும்பப் பெறுவதற்கான கேஸ் செலவை விடக் குறைவு).
பாலம் (அல்லது அதை இயக்குபவர்கள்) L1 சொத்துகளில் பற்றாக்குறை ஏற்படும் என்று எதிர்பார்க்கும் போது, அது L2-லிருந்து போதுமான சொத்துகளை மாற்றுகிறது. இவை மிகப் பெரிய திரும்பப் பெறுதல்கள் என்பதால், திரும்பப் பெறும் செலவு ஒரு பெரிய தொகையில் ஈடுசெய்யப்படுகிறது மற்றும் இது மிகச் சிறிய சதவீதமாகும்.

அடுக்கு 2 எவ்வாறு செயல்படுகிறது மற்றும் தெளிவான மற்றும் பாதுகாப்பான Solidity குறியீட்டை எவ்வாறு எழுதுவது என்பதைப் பற்றி மேலும் புரிந்துகொள்ள இந்தக் கட்டுரை உங்களுக்கு உதவியிருக்கும் என்று நம்புகிறோம்.

[எனது மேலும் பல படைப்புகளுக்கு இங்கே பார்க்கவும்](https://cryptodocguy.pro/).