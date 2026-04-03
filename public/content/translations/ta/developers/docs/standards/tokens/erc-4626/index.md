---
title: "ERC-4626 டோக்கனாக்கப்பட்ட வால்ட் தரநிலை"
description: "வருவாய் ஈட்டும் வால்ட்டுகளுக்கான (yield bearing vaults) ஒரு தரநிலை."
lang: ta
---

## அறிமுகம் {#introduction}

ERC-4626 என்பது வருவாய் ஈட்டும் வால்ட்டுகளின் (yield-bearing vaults) தொழில்நுட்ப அளவுருக்களை மேம்படுத்தவும் ஒருங்கிணைக்கவும் பயன்படும் ஒரு தரநிலையாகும். இது ஒற்றை அடிப்படை ERC-20 டோக்கனின் பங்குகளைப் பிரதிநிதித்துவப்படுத்தும் டோக்கனாக்கப்பட்ட வருவாய் ஈட்டும் வால்ட்டுகளுக்கான நிலையான API-ஐ வழங்குகிறது. ERC-4626 ஆனது ERC-20 ஐப் பயன்படுத்தும் டோக்கனாக்கப்பட்ட வால்ட்டுகளுக்கான விருப்ப நீட்டிப்பையும் கோடிட்டுக் காட்டுகிறது, இது டோக்கன்களை டெபாசிட் செய்தல், திரும்பப் பெறுதல் மற்றும் இருப்புகளைப் படித்தல் போன்ற அடிப்படை செயல்பாடுகளை வழங்குகிறது.

**வருவாய் ஈட்டும் வால்ட்டுகளில் ERC-4626 இன் பங்கு**

கடன் வழங்கும் சந்தைகள், அக்ரிகேட்டர்கள் மற்றும் இயல்பாகவே வட்டி ஈட்டும் டோக்கன்கள் ஆகியவை வெவ்வேறு உத்திகளைச் செயல்படுத்துவதன் மூலம் பயனர்கள் தங்கள் கிரிப்டோ டோக்கன்களில் சிறந்த வருவாயைக் கண்டறிய உதவுகின்றன. இந்த உத்திகள் சிறிய மாறுபாடுகளுடன் செய்யப்படுகின்றன, இது பிழைகளுக்கு ஆளாகலாம் அல்லது மேம்பாட்டு வளங்களை வீணாக்கலாம்.

வருவாய் ஈட்டும் வால்ட்டுகளில் உள்ள ERC-4626, ஒருங்கிணைப்பு முயற்சியைக் குறைக்கும் மற்றும் மிகவும் நிலையான மற்றும் வலுவான செயலாக்க வடிவங்களை உருவாக்குவதன் மூலம் டெவலப்பர்களிடமிருந்து சிறிய சிறப்பு முயற்சியுடன் பல்வேறு பயன்பாடுகளில் வருவாய்க்கான அணுகலைத் திறக்கும்.

ERC-4626 டோக்கன் [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) இல் முழுமையாக விவரிக்கப்பட்டுள்ளது.

**ஒத்திசைவற்ற வால்ட் நீட்டிப்பு (ERC-7540)**

ERC-4626 ஆனது ஒரு குறிப்பிட்ட வரம்பு வரை அணுக்கரு டெபாசிட்கள் (atomic deposits) மற்றும் மீட்புகளுக்கு (redemptions) உகந்ததாக உள்ளது. வரம்பை அடைந்தால், புதிய டெபாசிட்கள் அல்லது மீட்புகளைச் சமர்ப்பிக்க முடியாது. வால்ட்டுடன் இடைமுகப்படுத்துவதற்கான முன்நிபந்தனையாக ஒத்திசைவற்ற செயல்கள் அல்லது தாமதங்களைக் கொண்ட எந்தவொரு ஸ்மார்ட் ஒப்பந்த அமைப்புக்கும் இந்த வரம்பு சரியாகச் செயல்படாது (எ.கா., நிஜ-உலக சொத்து நெறிமுறைகள், குறைவான பிணையம் கொண்ட கடன் வழங்கும் நெறிமுறைகள், கிராஸ்-செயின் கடன் வழங்கும் நெறிமுறைகள், லிக்விட் ஸ்டேக்கிங் டோக்கன்கள் அல்லது காப்பீட்டுப் பாதுகாப்பு தொகுதிகள்).

ERC-7540 ஆனது ஒத்திசைவற்ற பயன்பாட்டு நிகழ்வுகளுக்கு ERC-4626 வால்ட்டுகளின் பயன்பாட்டை விரிவுபடுத்துகிறது. ஒத்திசைவற்ற கோரிக்கைகளைப் பெற, தற்போதுள்ள வால்ட் இடைமுகம் (`deposit`/`withdraw`/`mint`/`redeem`) முழுமையாகப் பயன்படுத்தப்படுகிறது.

ERC-7540 நீட்டிப்பு [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) இல் முழுமையாக விவரிக்கப்பட்டுள்ளது.

**பல-சொத்து வால்ட் நீட்டிப்பு (ERC-7575)**

ERC-4626 ஆல் ஆதரிக்கப்படாத ஒரு விடுபட்ட பயன்பாட்டு நிகழ்வு, பல சொத்துக்கள் அல்லது லிக்விடிட்டி புரொவைடர் (LP) டோக்கன்கள் போன்ற நுழைவுப் புள்ளிகளைக் கொண்ட வால்ட்டுகள் ஆகும். ERC-4626 ஆனது ஒரு ERC-20 ஆக இருக்க வேண்டும் என்ற தேவையால் இவை பொதுவாகக் கையாள முடியாதவை அல்லது இணக்கமற்றவை.

ERC-7575 ஆனது ERC-4626 செயலாக்கத்திலிருந்து ERC-20 டோக்கன் செயலாக்கத்தை வெளிப்புறமாக்குவதன் மூலம் பல சொத்துக்களைக் கொண்ட வால்ட்டுகளுக்கான ஆதரவைச் சேர்க்கிறது.

ERC-7575 நீட்டிப்பு [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) இல் முழுமையாக விவரிக்கப்பட்டுள்ளது.

## முன்நிபந்தனைகள் {#prerequisites}

இந்தப் பக்கத்தை நன்கு புரிந்துகொள்ள, முதலில் [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/) மற்றும் [ERC-20](/developers/docs/standards/tokens/erc-20/) பற்றிப் படிக்குமாறு பரிந்துரைக்கிறோம்.

## ERC-4626 செயல்பாடுகள் மற்றும் அம்சங்கள்: {#body}

### முறைகள் {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

கணக்கியல், டெபாசிட் செய்தல், திரும்பப் பெறுதல் ஆகியவற்றிற்காக வால்ட்டிற்குப் பயன்படுத்தப்படும் அடிப்படை டோக்கனின் முகவரியை இந்தச் செயல்பாடு வழங்குகிறது.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

வால்ட்டில் உள்ள அடிப்படை சொத்துகளின் மொத்த அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

வழங்கப்பட்ட `assets` (சொத்துகள்) அளவிற்கு வால்ட்டால் பரிமாறப்படும் `shares` (பங்குகள்) அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

வழங்கப்பட்ட `shares` (பங்குகள்) அளவிற்கு வால்ட்டால் பரிமாறப்படும் `assets` (சொத்துகள்) அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

`receiver` க்காகப் பங்குகள் உருவாக்கப்பட்டு (minted), ஒரே ஒரு [`deposit`](#deposit) அழைப்பில் டெபாசிட் செய்யக்கூடிய அடிப்படை சொத்துகளின் அதிகபட்ச அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

தற்போதைய பிளாக்கில் பயனர்கள் தங்கள் டெபாசிட்டின் விளைவுகளை உருவகப்படுத்த (simulate) இந்தச் செயல்பாடு அனுமதிக்கிறது.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

இந்தச் செயல்பாடு அடிப்படை டோக்கன்களின் `assets` ஐ வால்ட்டில் டெபாசிட் செய்து, `shares` இன் உரிமையை `receiver` க்கு வழங்குகிறது.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

`receiver` க்காகப் பங்குகள் உருவாக்கப்பட்டு, ஒரே ஒரு [`mint`](#mint) அழைப்பில் உருவாக்கக்கூடிய (mint) பங்குகளின் அதிகபட்ச அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

தற்போதைய பிளாக்கில் பயனர்கள் தங்கள் மின்ட்டின் (mint) விளைவுகளை உருவகப்படுத்த இந்தச் செயல்பாடு அனுமதிக்கிறது.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

அடிப்படை டோக்கன்களின் `assets` ஐ டெபாசிட் செய்வதன் மூலம், இந்தச் செயல்பாடு சரியாக `shares` வால்ட் பங்குகளை `receiver` க்கு உருவாக்குகிறது (mints).

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

ஒரே ஒரு [`withdraw`](#withdraw) அழைப்பின் மூலம் `owner` இருப்பிலிருந்து திரும்பப் பெறக்கூடிய அடிப்படை சொத்துகளின் அதிகபட்ச அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

தற்போதைய பிளாக்கில் பயனர்கள் தங்கள் திரும்பப் பெறுதலின் விளைவுகளை உருவகப்படுத்த இந்தச் செயல்பாடு அனுமதிக்கிறது.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

இந்தச் செயல்பாடு `owner` இடமிருந்து `shares` ஐ எரிக்கிறது (burns) மற்றும் வால்ட்டிலிருந்து சரியாக `assets` டோக்கனை `receiver` க்கு அனுப்புகிறது.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

ஒரு [`redeem`](#redeem) அழைப்பின் மூலம் `owner` இருப்பிலிருந்து மீட்கக்கூடிய பங்குகளின் அதிகபட்ச அளவை இந்தச் செயல்பாடு வழங்குகிறது.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

தற்போதைய பிளாக்கில் பயனர்கள் தங்கள் மீட்பின் விளைவுகளை உருவகப்படுத்த இந்தச் செயல்பாடு அனுமதிக்கிறது.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

இந்தச் செயல்பாடு `owner` இடமிருந்து ஒரு குறிப்பிட்ட எண்ணிக்கையிலான `shares` ஐ மீட்டு, வால்ட்டிலிருந்து அடிப்படை டோக்கனின் `assets` ஐ `receiver` க்கு அனுப்புகிறது.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

புழக்கத்தில் உள்ள மீட்கப்படாத வால்ட் பங்குகளின் மொத்த எண்ணிக்கையை வழங்குகிறது.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` தற்போது வைத்திருக்கும் வால்ட் பங்குகளின் மொத்த அளவை வழங்குகிறது.

### இடைமுகத்தின் வரைபடம் {#mapOfTheInterface}

![ERC-4626 இடைமுகத்தின் வரைபடம்](./map-of-erc-4626.png)

### நிகழ்வுகள் {#events}

#### டெபாசிட் நிகழ்வு

[`mint`](#mint) மற்றும் [`deposit`](#deposit) முறைகள் வழியாக வால்ட்டில் டோக்கன்கள் டெபாசிட் செய்யப்படும்போது **கட்டாயம்** வெளியிடப்பட வேண்டும் (emitted).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

இதில் `sender` என்பவர் `assets` ஐ `shares` ஆக மாற்றி, அந்த `shares` ஐ `owner` க்கு மாற்றிய பயனர் ஆவார்.

#### திரும்பப் பெறுதல் நிகழ்வு

[`redeem`](#redeem) அல்லது [`withdraw`](#withdraw) முறைகளில் டெபாசிட் செய்தவரால் வால்ட்டிலிருந்து பங்குகள் திரும்பப் பெறப்படும்போது **கட்டாயம்** வெளியிடப்பட வேண்டும்.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

இதில் `sender` என்பவர் திரும்பப் பெறுதலைத் தூண்டி, `owner` க்குச் சொந்தமான `shares` ஐ `assets` ஆக மாற்றிய பயனர் ஆவார். `receiver` என்பவர் திரும்பப் பெறப்பட்ட `assets` ஐப் பெற்ற பயனர் ஆவார்.

## மேலும் படிக்க {#further-reading}

- [EIP-4626: டோக்கனாக்கப்பட்ட வால்ட் தரநிலை](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub ரெப்போ](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)