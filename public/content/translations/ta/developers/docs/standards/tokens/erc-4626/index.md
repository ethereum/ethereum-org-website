---
title: ERC-4626 வில்லைகளாக்கப்பட்ட பெட்டகத் தரநிலை
description: வருவாய் ஈட்டும் பெட்டகங்களுக்கான ஒரு தரநிலை.
lang: ta
---

## அறிமுகம் {#introduction}

ERC-4626 என்பது வருவாய் ஈட்டும் பெட்டகங்களின் தொழில்நுட்ப அளவுருக்களை மேம்படுத்தவும் ஒன்றிணைக்கவும் உருவாக்கப்பட்ட ஒரு தரநிலையாகும். இது ஒற்றை அடிப்படை ERC-20 வில்லையின் பங்குகளைப் பிரதிநிதித்துவப்படுத்தும் வில்லைகளாக்கப்பட்ட வருவாய் ஈட்டும் பெட்டகங்களுக்கான நிலையான API-ஐ வழங்குகிறது. ERC-4626 ஆனது ERC-20 ஐப் பயன்படுத்தும் வில்லைகளாக்கப்பட்ட பெட்டகங்களுக்கான விருப்ப நீட்டிப்பையும் கோடிட்டுக் காட்டுகிறது, இது வில்லைகளை வைப்பிலிட, திரும்பப் பெற மற்றும் இருப்புகளைப் படிக்க அடிப்படை செயல்பாட்டை வழங்குகிறது.

**வருவாய் ஈட்டும் பெட்டகங்களில் ERC-4626 இன் பங்கு**

கடனளிப்புச் சந்தைகள், திரட்டிகள் மற்றும் இயல்பாகவே வட்டி ஈட்டும் வில்லைகள் ஆகியவை பயனர்கள் தங்களின் கிரிப்டோ வில்லைகளில் சிறந்த வருவாயைக் கண்டறிய வெவ்வேறு உத்திகளைச் செயல்படுத்துவதன் மூலம் உதவுகின்றன. இந்த உத்திகள் சிறிய மாறுபாடுகளுடன் செய்யப்படுகின்றன, அவை பிழைகளுக்கு ஆளாகலாம் அல்லது மேம்பாட்டு வளங்களை வீணாக்கலாம்.

வருவாய் ஈட்டும் பெட்டகங்களில் உள்ள ERC-4626 ஆனது ஒருங்கிணைப்பு முயற்சியைக் குறைக்கும் மற்றும் மிகவும் நிலையான மற்றும் வலுவான செயலாக்க வடிவங்களை உருவாக்குவதன் மூலம் டெவலப்பர்களிடமிருந்து சிறிய சிறப்பு முயற்சியுடன் பல்வேறு பயன்பாடுகளில் வருவாய்க்கான அணுகலைத் திறக்கும்.

ERC-4626 வில்லை [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) இல் முழுமையாக விவரிக்கப்பட்டுள்ளது.

**ஒத்திசைவற்ற பெட்டக நீட்டிப்பு (ERC-7540)**

ERC-4626 ஆனது ஒரு குறிப்பிட்ட வரம்பு வரை அணு வைப்புகள் மற்றும் மீட்புகளுக்கு உகந்ததாக உள்ளது. வரம்பை அடைந்தால், புதிய வைப்புகள் அல்லது மீட்புகளைச் சமர்ப்பிக்க முடியாது. பெட்டகத்துடன் இடைமுகப்படுத்துவதற்கான முன்நிபந்தனையாக ஒத்திசைவற்ற செயல்கள் அல்லது தாமதங்களைக் கொண்ட எந்தவொரு திறன் ஒப்பந்தம் அமைப்புக்கும் இந்த வரம்பு சரியாகச் செயல்படாது (எ.கா., நிஜ உலக சொத்து நெறிமுறைகள், குறைவான பிணையம் கொண்ட கடனளிப்பு நெறிமுறைகள், குறுக்கு-சங்கிலி கடனளிப்பு நெறிமுறைகள், திரவ ஸ்டேக்கிங் டோக்கன் (LST) அல்லது காப்பீட்டுப் பாதுகாப்பு தொகுதிகள்).

ERC-7540 ஆனது ஒத்திசைவற்ற பயன்பாட்டு நிகழ்வுகளுக்கு ERC-4626 பெட்டகங்களின் பயன்பாட்டை விரிவுபடுத்துகிறது. ஒத்திசைவற்ற கோரிக்கைகளை உரிமைக்கோரல் செய்ய தற்போதுள்ள பெட்டக இடைமுகம் (`deposit`/`withdraw`/`mint`/`redeem`) முழுமையாகப் பயன்படுத்தப்படுகிறது.

ERC-7540 நீட்டிப்பு [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) இல் முழுமையாக விவரிக்கப்பட்டுள்ளது.

**பல-சொத்து பெட்டக நீட்டிப்பு (ERC-7575)**

ERC-4626 ஆல் ஆதரிக்கப்படாத ஒரு விடுபட்ட பயன்பாட்டு நிகழ்வு, நீர்மை வழங்குபவர் (LP) வில்லைகள் போன்ற பல சொத்துகள் அல்லது நுழைவுப் புள்ளிகளைக் கொண்ட பெட்டகங்கள் ஆகும். ERC-4626 ஆனது ஒரு ERC-20 ஆக இருக்க வேண்டும் என்ற தேவையால் இவை பொதுவாகக் கையாள முடியாதவை அல்லது இணக்கமற்றவை.

ERC-7575 ஆனது ERC-4626 செயலாக்கத்திலிருந்து ERC-20 வில்லை செயலாக்கத்தை வெளிப்புறமாக்குவதன் மூலம் பல சொத்துகளைக் கொண்ட பெட்டகங்களுக்கான ஆதரவைச் சேர்க்கிறது.

ERC-7575 நீட்டிப்பு [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) இல் முழுமையாக விவரிக்கப்பட்டுள்ளது.

## முன்நிபந்தனைகள் {#prerequisites}

இந்தப் பக்கத்தை நன்கு புரிந்துகொள்ள, முதலில் [வில்லைத் தரநிலைகள்](/developers/docs/standards/tokens/) மற்றும் [ERC-20](/developers/docs/standards/tokens/erc-20/) பற்றிப் படிக்குமாறு பரிந்துரைக்கிறோம்.

## ERC-4626 செயல்பாடுகள் மற்றும் அம்சங்கள்: {#body}

### முறைகள் {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

இந்தச் செயல்பாடு கணக்கியல், வைப்பிலிடுதல், திரும்பப் பெறுதல் ஆகியவற்றிற்காகப் பெட்டகத்திற்குப் பயன்படுத்தப்படும் அடிப்படை வில்லையின் முகவரியை வழங்குகிறது.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

இந்தச் செயல்பாடு பெட்டகத்தால் வைத்திருக்கப்படும் அடிப்படைச் சொத்துகளின் மொத்த அளவை வழங்குகிறது.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

இந்தச் செயல்பாடு வழங்கப்பட்ட `assets` அளவிற்காகப் பெட்டகத்தால் பரிமாறப்படும் `shares` அளவை வழங்குகிறது.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

இந்தச் செயல்பாடு வழங்கப்பட்ட `shares` அளவிற்காகப் பெட்டகத்தால் பரிமாறப்படும் `assets` அளவை வழங்குகிறது.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

இந்தச் செயல்பாடு `receiver` க்காக அச்சிடப்பட்ட பங்குகளுடன், ஒற்றை [`deposit`](#deposit) அழைப்பில் வைப்பிலிடக்கூடிய அடிப்படைச் சொத்துகளின் அதிகபட்ச அளவை வழங்குகிறது.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

இந்தச் செயல்பாடு பயனர்கள் தற்போதைய தொகுதியில் தங்கள் வைப்பின் விளைவுகளை உருவகப்படுத்த அனுமதிக்கிறது.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

இந்தச் செயல்பாடு அடிப்படை வில்லைகளின் `assets` ஐப் பெட்டகத்தில் வைப்பிலிட்டு, `shares` இன் உரிமையை `receiver` க்கு வழங்குகிறது.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

இந்தச் செயல்பாடு `receiver` க்காக அச்சிடப்பட்ட பங்குகளுடன், ஒற்றை [`mint`](#mint) அழைப்பில் அச்சிடக்கூடிய பங்குகளின் அதிகபட்ச அளவை வழங்குகிறது.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

இந்தச் செயல்பாடு பயனர்கள் தற்போதைய தொகுதியில் தங்கள் அச்சிடுதலின் விளைவுகளை உருவகப்படுத்த அனுமதிக்கிறது.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

இந்தச் செயல்பாடு அடிப்படை வில்லைகளின் `assets` ஐ வைப்பிலிடுவதன் மூலம் `receiver` க்குச் சரியாக `shares` பெட்டகப் பங்குகளை அச்சிடுகிறது.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

இந்தச் செயல்பாடு ஒற்றை [`withdraw`](#withdraw) அழைப்பின் மூலம் `owner` இருப்பிலிருந்து திரும்பப் பெறக்கூடிய அடிப்படைச் சொத்துகளின் அதிகபட்ச அளவை வழங்குகிறது.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

இந்தச் செயல்பாடு பயனர்கள் தற்போதைய தொகுதியில் தங்கள் திரும்பப் பெறுதலின் விளைவுகளை உருவகப்படுத்த அனுமதிக்கிறது.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

இந்தச் செயல்பாடு `owner` இலிருந்து `shares` ஐ எரித்து, பெட்டகத்திலிருந்து `receiver` க்குச் சரியாக `assets` வில்லையை அனுப்புகிறது.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

இந்தச் செயல்பாடு [`redeem`](#redeem) அழைப்பின் மூலம் `owner` இருப்பிலிருந்து மீட்கக்கூடிய பங்குகளின் அதிகபட்ச அளவை வழங்குகிறது.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

இந்தச் செயல்பாடு பயனர்கள் தற்போதைய தொகுதியில் தங்கள் மீட்பின் விளைவுகளை உருவகப்படுத்த அனுமதிக்கிறது.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

இந்தச் செயல்பாடு `owner` இலிருந்து ஒரு குறிப்பிட்ட எண்ணிக்கையிலான `shares` ஐ மீட்டு, பெட்டகத்திலிருந்து `receiver` க்கு அடிப்படை வில்லையின் `assets` ஐ அனுப்புகிறது.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

புழக்கத்தில் உள்ள மீட்கப்படாத பெட்டகப் பங்குகளின் மொத்த எண்ணிக்கையை வழங்குகிறது.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` தற்போது கொண்டுள்ள பெட்டகப் பங்குகளின் மொத்த அளவை வழங்குகிறது.

### இடைமுகத்தின் வரைபடம் {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### நிகழ்வுகள் {#events}

#### வைப்பு நிகழ்வு {#deposit-event}

[`mint`](#mint) மற்றும் [`deposit`](#deposit) முறைகள் வழியாகப் பெட்டகத்தில் வில்லைகள் வைப்பிலிடப்படும்போது **கட்டாயம்** வெளியிடப்பட வேண்டும்.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

இதில் `sender` என்பது `shares` க்காக `assets` ஐப் பரிமாறி, அந்த `shares` ஐ `owner` க்கு மாற்றிய பயனர் ஆவார்.

#### திரும்பப் பெறுதல் நிகழ்வு {#withdraw-event}

[`redeem`](#redeem) அல்லது [`withdraw`](#withdraw) முறைகளில் வைப்பிலிடுபவரால் பெட்டகத்திலிருந்து பங்குகள் திரும்பப் பெறப்படும்போது **கட்டாயம்** வெளியிடப்பட வேண்டும்.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

இதில் `sender` என்பது திரும்பப் பெறுதலைத் தூண்டி, `owner` க்குச் சொந்தமான `shares` ஐ `assets` க்காகப் பரிமாறிய பயனர் ஆவார். `receiver` என்பது திரும்பப் பெறப்பட்ட `assets` ஐப் பெற்ற பயனர் ஆவார்.

## மேலும் படிக்க {#further-reading}

- [EIP-4626: வில்லைகளாக்கப்பட்ட பெட்டகத் தரநிலை](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub களஞ்சியம்](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)