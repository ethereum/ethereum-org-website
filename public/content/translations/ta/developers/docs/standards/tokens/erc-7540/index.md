---
title: ERC-7540 ஒத்திசைவற்ற வில்லைகளாக்கப்பட்ட பெட்டகத் தரநிலை
description: வில்லைகளாக்கப்பட்ட பெட்டகங்களுக்கான ஒத்திசைவற்ற வைப்பு மற்றும் மீட்பு ஓட்டங்களைச் சேர்க்கும் ERC-4626 இன் நீட்டிப்பு.
lang: ta
---

## அறிமுகம் {#introduction}

ERC-7540 ஆனது ஒத்திசைவற்ற வைப்பு மற்றும் மீட்பு ஓட்டங்களுக்கான ஆதரவைச் சேர்ப்பதன் மூலம் [ERC-4626 வில்லைகளாக்கப்பட்ட பெட்டகத் தரநிலையை](/developers/docs/standards/tokens/erc-4626/) நீட்டிக்கிறது. இது கோரிக்கை-பின்னர்-உரிமைக்கோரல் (request-then-claim) முறையை அறிமுகப்படுத்துகிறது: பயனர்கள் முதலில் ஒரு கோரிக்கையைச் சமர்ப்பிக்கிறார்கள் (தங்கள் சொத்துக்கள் அல்லது பங்குகளைப் பூட்டுவதன் மூலம்), பின்னர் பெட்டகம் அதைச் செயலாக்கிய பிறகு முடிவை உரிமைக்கோருகிறார்கள்.

ஒரு பெட்டகத்தால் ஒரே பரிவர்த்தனையில் உடனடியாக இறுதித் தீர்வு செய்ய முடியாதபோது இது தேவைப்படுகிறது, எடுத்துக்காட்டாக:

- வில்லைகளாக்கப்பட்ட கருவூலங்கள், தனியார் கடன் மற்றும் T+1 அல்லது T+2 இறுதித் தீர்வு சுழற்சிகளைக் கொண்ட பிற சொத்துக்கள் போன்ற நிஜ உலக சொத்துக்கள் (RWA) நெறிமுறைகள்
- கடன் மதிப்பீடுகள் புறச்சங்கிலியில் நடக்கும் குறைவான பிணையம் கொண்ட கடனளிப்பு
- பிரிட்ஜிங் தாமதங்களை ஏற்படுத்தும் குறுக்கு-சங்கிலி பெட்டக உத்திகள்
- பிணைப்பு நீக்கக் காலங்களைக் கொண்ட திரவ ஸ்டேக்கிங் டோக்கன்கள் (LST)

பெட்டகங்கள் வைப்புகளில் மட்டும், மீட்புகளில் மட்டும் அல்லது இரண்டிலும் ஒத்திசைவற்றதாக இருக்கத் தேர்வுசெய்யலாம். இந்த நெகிழ்வுத்தன்மையானது, அடிப்படை உத்திக்குத் தேவைப்படும் இடங்களில் மட்டுமே ஒத்திசைவற்ற ஓட்டங்களைச் சேர்க்க பெட்டக உருவாக்குநர்களை அனுமதிக்கிறது, அதே நேரத்தில் மறுபக்கத்தை ஒத்திசைவாக வைத்திருக்க உதவுகிறது.

## முன்நிபந்தனைகள் {#prerequisites}

இந்தப் பக்கத்தை நன்கு புரிந்துகொள்ள, முதலில் [வில்லைத் தரநிலைகள்](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) மற்றும் [ERC-4626](/developers/docs/standards/tokens/erc-4626/) பற்றிப் படிக்குமாறு பரிந்துரைக்கிறோம்.

## ERC-4626 மற்றும் ERC-7540 {#comparison}

ERC-4626 இல், ஒரு வைப்பு அணுரீதியாக இறுதித் தீர்வு செய்யப்படுகிறது: முதலீட்டாளர் சொத்துக்களை அனுப்புகிறார் மற்றும் ஒரே பரிவர்த்தனையில் பங்குகளைத் திரும்பப் பெறுகிறார்.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 இதை இரண்டு படிகளாகப் பிரிக்கிறது. முதலீட்டாளர் முதலில் சொத்துக்களைப் பூட்ட `requestDeposit()` ஐ அழைக்கிறார், பின்னர் பெட்டக மேலாளர் கோரிக்கையைச் செயலாக்கும் வரை காத்திருக்கிறார். நிறைவேற்றப்பட்டதும், முதலீட்டாளர் தங்கள் பங்குகளை உரிமைக்கோர `deposit()` ஐ அழைக்கிறார். பரிமாற்ற விகிதங்கள் கோரிக்கை நேரத்தில் அல்லாமல், நிறைவேற்றப்படும் நேரத்திலேயே தீர்மானிக்கப்படுகின்றன.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

மீட்பு ஓட்டமும் இதே வழியில் செயல்படுகிறது: `requestRedeem()` பங்குகளைப் பூட்டுகிறது, மேலும் நிறைவேற்றப்பட்டதும் முதலீட்டாளர் சொத்துக்களை உரிமைக்கோர `redeem()` ஐ அழைக்கிறார்.

## ERC-7540 செயல்பாடுகள் மற்றும் அம்சங்கள் {#body}

ERC-7540 முழுமையான ERC-4626 இடைமுகத்தைப் பெறுகிறது, ஆனால் `deposit`/`mint`/`withdraw`/`redeem` ஆகியவற்றை உரிமைக்கோரல் செயல்பாடுகளாக மாற்றியமைக்கிறது. புதிய `requestDeposit` மற்றும் `requestRedeem` செயல்பாடுகள் ஆரம்பக் கோரிக்கைப் படியைக் கையாளுகின்றன.

ஒவ்வொரு கோரிக்கையும் மூன்று நிலைகள் வழியாக நகர்கிறது: நிலுவையில் உள்ளது (சமர்ப்பிக்கப்பட்டது, செயலாக்கத்திற்காகக் காத்திருக்கிறது), உரிமைக்கோரக்கூடியது (நிறைவேற்றப்பட்டது மற்றும் விலையிடப்பட்டது), மற்றும் உரிமைக்கோரப்பட்டது (முதலீட்டாளர் தங்கள் பங்குகள் அல்லது சொத்துக்களைச் சேகரித்துவிட்டார்).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### வைப்புக் கோரிக்கை ஓட்டம் {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` இலிருந்து `assets` ஐ பெட்டகத்திற்குப் பரிமாற்றம் செய்து, வைப்பு செய்வதற்கான கோரிக்கையைச் சமர்ப்பிக்கிறது. `controller` முகவரி கோரிக்கையின் கட்டுப்பாட்டைப் பெறுகிறது. கோரிக்கைத் தொகுப்பைக் குறிக்கும் `requestId` ஐ வழங்குகிறது.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

கொடுக்கப்பட்ட `controller` மற்றும் `requestId` க்கான நிலுவையில் உள்ள (இன்னும் உரிமைக்கோர முடியாத) வைப்புக் கோரிக்கையில் உள்ள `assets` இன் அளவை வழங்குகிறது.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

கொடுக்கப்பட்ட `controller` மற்றும் `requestId` க்கான உரிமைக்கோரக்கூடிய (நிறைவேற்றப்பட்ட ஆனால் இன்னும் உரிமைக்கோரப்படாத) வைப்புக் கோரிக்கையில் உள்ள `assets` இன் அளவை வழங்குகிறது.

#### வைப்புகளை உரிமைக்கோருதல் {#claiming-deposits}

ஒரு வைப்புக் கோரிக்கை உரிமைக்கோரக்கூடியதாக மாறியதும், பயனர் தங்கள் பங்குகளை உரிமைக்கோர நிலையான ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) அல்லது [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) செயல்பாட்டை அழைக்கிறார். ERC-7540 இல், இந்தச் செயல்பாடுகள் இனி சொத்துக்களைப் பரிமாற்றம் செய்யாது (அது ஏற்கனவே கோரிக்கை நேரத்தில் நடந்துவிட்டது). அவை பெறுநருக்குப் பங்குகளை மட்டுமே அச்சிடுகின்றன.

### மீட்புக் கோரிக்கை ஓட்டம் {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` இலிருந்து `shares` ஐப் பூட்டி, மீட்பதற்கான கோரிக்கையைச் சமர்ப்பிக்கிறது. `controller` முகவரி கோரிக்கையின் கட்டுப்பாட்டைப் பெறுகிறது.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

கொடுக்கப்பட்ட `controller` மற்றும் `requestId` க்கான நிலுவையில் உள்ள மீட்புக் கோரிக்கையில் உள்ள `shares` இன் அளவை வழங்குகிறது.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

கொடுக்கப்பட்ட `controller` மற்றும் `requestId` க்கான உரிமைக்கோரக்கூடிய மீட்புக் கோரிக்கையில் உள்ள `shares` இன் அளவை வழங்குகிறது.

#### மீட்புகளை உரிமைக்கோருதல் {#claiming-redemptions}

ஒரு மீட்புக் கோரிக்கை உரிமைக்கோரக்கூடியதாக மாறியதும், பயனர் தங்கள் சொத்துக்களை உரிமைக்கோர நிலையான ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) அல்லது [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) செயல்பாட்டை அழைக்கிறார்.

### ஆபரேட்டர் மேலாண்மை {#operator-management}

ERC-7540 ஆனது ஒரு பயனரின் சார்பாகக் கோரிக்கைகளை நிர்வகிக்க மூன்றாம் தரப்பினரை அனுமதிக்கும் ஆபரேட்டர் முறையை ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909) இலிருந்து) உள்ளடக்கியுள்ளது.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

வைப்பு/மீட்புக் கோரிக்கைகள் மற்றும் உரிமைக்கோரல்களுக்காக `msg.sender` சார்பாகச் செயல்பட `operator` ஐ அங்கீகரிக்கிறது அல்லது திரும்பப் பெறுகிறது.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`controller` சார்பாகச் செயல்பட `operator` அங்கீகரிக்கப்பட்டுள்ளதா என்பதை வழங்குகிறது.

### கோரிக்கை ஐடிகள் {#request-ids}

கோரிக்கை ஐடிகள் வெவ்வேறு கோரிக்கைத் தொகுப்புகளை வேறுபடுத்துகின்றன. ஒரே `requestId` ஐப் பகிரும் அனைத்துக் கோரிக்கைகளும் பதிலீடு செய்யக்கூடியவை (fungible): அவை ஒன்றாக நிலைகளுக்கு இடையே மாறுகின்றன மற்றும் ஒரே பரிமாற்ற விகிதத்தைப் பெறுகின்றன.

ஒரு பெட்டகம் அனைத்துக் கோரிக்கைகளுக்கும் `requestId = 0` ஐ வழங்கும்போது, `controller` முகவரி மட்டுமே கோரிக்கை நிலையை வேறுபடுத்துகிறது. ஒரே கட்டுப்படுத்தியிடமிருந்து வரும் பல கோரிக்கைகள் ஒருங்கிணைக்கப்படுகின்றன.

### நிகழ்வுகள் {#events}

#### DepositRequest நிகழ்வு {#depositrequest-event}

[`requestDeposit`](#requestdeposit) வழியாக ஒரு வைப்புக் கோரிக்கை சமர்ப்பிக்கப்படும்போது இது வெளியிடப்பட வேண்டும்.

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest நிகழ்வு {#redeemrequest-event}

[`requestRedeem`](#requestredeem) வழியாக ஒரு மீட்புக் கோரிக்கை சமர்ப்பிக்கப்படும்போது இது வெளியிடப்பட வேண்டும்.

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet நிகழ்வு {#operatorset-event}

[`setOperator`](#setoperator) வழியாக ஒரு ஆபரேட்டர் அங்கீகரிக்கப்படும்போது அல்லது திரும்பப் பெறப்படும்போது இது வெளியிடப்பட வேண்டும்.

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### முன்னோட்டச் செயல்பாடுகள் {#preview-functions}

முன்னோட்டச் செயல்பாடுகள் ஒத்திசைவற்ற ஓட்டங்களுக்கு மட்டுமே மீளமை செய்யப்பட வேண்டும், ஏனெனில் கோரிக்கை நிறைவேற்றப்படும் வரை பரிமாற்ற விகிதம் தெரியாது. ஒரு ஒத்திசைவற்ற-வைப்பு பெட்டகத்தில், `previewDeposit` மற்றும் `previewMint` ஆகியவை மீளமை செய்யப்பட வேண்டும், அதே நேரத்தில் `previewRedeem` மற்றும் `previewWithdraw` ஆகியவை ERC-4626 இல் உள்ளதைப் போலவே தொடர்ந்து செயல்படும் (மற்றும் ஒத்திசைவற்ற-மீட்பு பெட்டகத்திற்கு நேர்மாறாக). இது ERC-4626 இலிருந்து ஒரு முக்கிய நடத்தை வேறுபாடாகும்.

## மேலும் படிக்க {#further-reading}

- [EIP-7540: ஒத்திசைவற்ற ERC-4626 வில்லைகளாக்கப்பட்ட பெட்டகங்கள்](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: வில்லைகளாக்கப்பட்ட பெட்டகத் தரநிலை](https://eips.ethereum.org/EIPS/eip-4626)
- [ஓப்பன்செப்பெலின் ERC-7540 செயலாக்கம்](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)