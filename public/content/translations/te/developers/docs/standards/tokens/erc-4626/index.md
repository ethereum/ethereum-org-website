---
title: ⁨ERC-4626 టోకనైజ్డ్ ఖజానా ప్రమాణం⁩
description: ⁨దిగుబడినిచ్చే ఖజానాల కోసం ఒక ప్రమాణం.⁩
lang: te
---

## పరిచయం {#introduction}

ERC-4626 అనేది దిగుబడినిచ్చే ఖజానాల సాంకేతిక పారామితులను ఆప్టిమైజ్ చేయడానికి మరియు ఏకీకృతం చేయడానికి ఒక ప్రమాణం. ఇది ఒకే అంతర్లీన ERC-20 టోకెన్ యొక్క షేర్లను సూచించే టోకనైజ్డ్ దిగుబడినిచ్చే ఖజానాల కోసం ప్రామాణిక APIని అందిస్తుంది. ERC-4626 అనేది ERC-20ని ఉపయోగించే టోకనైజ్డ్ ఖజానాల కోసం ఐచ్ఛిక పొడిగింపును కూడా వివరిస్తుంది, ఇది డిపాజిట్ చేయడానికి, టోకెన్‌లను ఉపసంహరించుకోవడానికి మరియు బ్యాలెన్స్‌లను చదవడానికి ప్రాథమిక కార్యాచరణను అందిస్తుంది.

**దిగుబడినిచ్చే ఖజానాలలో ERC-4626 పాత్ర**

రుణం ఇవ్వడం మార్కెట్‌లు, అగ్రిగేటర్‌లు మరియు అంతర్గతంగా వడ్డీనిచ్చే టోకెన్‌లు విభిన్న వ్యూహాలను అమలు చేయడం ద్వారా వినియోగదారులు తమ క్రిప్టో టోకెన్‌లపై ఉత్తమ దిగుబడిని కనుగొనడంలో సహాయపడతాయి. ఈ వ్యూహాలు స్వల్ప వైవిధ్యంతో చేయబడతాయి, ఇవి లోపాలకు గురయ్యే అవకాశం ఉంది లేదా అభివృద్ధి వనరులను వృధా చేయవచ్చు.

దిగుబడినిచ్చే ఖజానాలలోని ERC-4626 మరింత స్థిరమైన మరియు పటిష్టమైన అమలు నమూనాలను సృష్టించడం ద్వారా డెవలపర్‌ల నుండి తక్కువ ప్రత్యేక కృషితో వివిధ అప్లికేషన్‌లలో ఏకీకరణ ప్రయత్నాన్ని తగ్గిస్తుంది మరియు దిగుబడికి ప్రాప్యతను అన్‌లాక్ చేస్తుంది.

ERC-4626 టోకెన్ [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)లో పూర్తిగా వివరించబడింది.

**అసమకాలిక ఖజానా పొడిగింపు (ERC-7540)**

ERC-4626 ఒక పరిమితి వరకు అటామిక్ డిపాజిట్‌లు మరియు విముక్తి (redemptions) కోసం ఆప్టిమైజ్ చేయబడింది. పరిమితిని చేరుకున్నట్లయితే, కొత్త డిపాజిట్లు లేదా విముక్తులు సమర్పించబడవు. ఖజానాతో ఇంటర్‌ఫేస్ చేయడానికి (ఉదా., వాస్తవ-ప్రపంచ ఆస్తి ప్రోటోకాల్‌లు, తక్కువ పూచీకత్తుతో రుణం ఇవ్వడం ప్రోటోకాల్‌లు, క్రాస్-చైన్ రుణం ఇవ్వడం ప్రోటోకాల్‌లు, లిక్విడ్ స్టేకింగ్ టోకెన్‌లు (LST) లేదా బీమా భద్రతా మాడ్యూల్స్) ముందస్తు అవసరంగా అసమకాలిక చర్యలు లేదా జాప్యాలు ఉన్న ఏ స్మార్ట్ కాంట్రాక్ట్ సిస్టమ్‌కైనా ఈ పరిమితి సరిగ్గా పనిచేయదు.

ERC-7540 అసమకాలిక వినియోగ సందర్భాల కోసం ERC-4626 ఖజానాల ప్రయోజనాన్ని విస్తరిస్తుంది. అసమకాలిక అభ్యర్థనలను క్లెయిమ్ చేయడానికి ఇప్పటికే ఉన్న ఖజానా ఇంటర్‌ఫేస్ (`deposit`/`withdraw`/`mint`/`redeem`) పూర్తిగా ఉపయోగించబడుతుంది.

ERC-7540 పొడిగింపు [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)లో పూర్తిగా వివరించబడింది.

**బహుళ-ఆస్తి ఖజానా పొడిగింపు (ERC-7575)**

ERC-4626 ద్వారా మద్దతు లేని ఒక తప్పిపోయిన వినియోగ సందర్భం ఏమిటంటే, ద్రవ్యత సమకూర్చేవారు (LP) టోకెన్‌ల వంటి బహుళ ఆస్తులు లేదా ప్రవేశ బిందువులను కలిగి ఉన్న ఖజానాలు. ERC-4626 స్వయంగా ERC-20 కావాలనే ఆవశ్యకత కారణంగా ఇవి సాధారణంగా నిర్వహించడానికి కష్టంగా ఉంటాయి లేదా అనుగుణంగా ఉండవు.

ERC-7575 అనేది ERC-4626 అమలు నుండి ERC-20 టోకెన్ అమలును బాహ్యీకరించడం ద్వారా బహుళ ఆస్తులతో కూడిన ఖజానాలకు మద్దతును జోడిస్తుంది.

ERC-7575 పొడిగింపు [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)లో పూర్తిగా వివరించబడింది.

## ముందస్తు అవసరాలు {#prerequisites}

ఈ పేజీని బాగా అర్థం చేసుకోవడానికి, మీరు ముందుగా [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/) మరియు [ERC-20](/developers/docs/standards/tokens/erc-20/) గురించి చదవాలని మేము సిఫార్సు చేస్తున్నాము.

## ERC-4626 విధులు మరియు లక్షణాలు: {#body}

### పద్ధతులు {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

ఈ ఫంక్షన్ అకౌంటింగ్, డిపాజిట్ చేయడం, ఉపసంహరణ కోసం ఖజానాకు ఉపయోగించే అంతర్లీన టోకెన్ యొక్క చిరునామాను అందిస్తుంది.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

ఈ ఫంక్షన్ ఖజానా వద్ద ఉన్న మొత్తం అంతర్లీన ఆస్తుల మొత్తాన్ని అందిస్తుంది.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

ఈ ఫంక్షన్ అందించిన `assets` మొత్తానికి ఖజానా ద్వారా మార్పిడి చేయబడే `shares` మొత్తాన్ని అందిస్తుంది.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

ఈ ఫంక్షన్ అందించిన `shares` మొత్తానికి ఖజానా ద్వారా మార్పిడి చేయబడే `assets` మొత్తాన్ని అందిస్తుంది.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

ఈ ఫంక్షన్ `receiver` కోసం ముద్రించబడిన షేర్లతో, ఒకే [`deposit`](#deposit) కాల్‌లో డిపాజిట్ చేయగల గరిష్ట అంతర్లీన ఆస్తుల మొత్తాన్ని అందిస్తుంది.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

ఈ ఫంక్షన్ వినియోగదారులు ప్రస్తుత బ్లాక్ వద్ద వారి డిపాజిట్ యొక్క ప్రభావాలను అనుకరించడానికి అనుమతిస్తుంది.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

ఈ ఫంక్షన్ అంతర్లీన టోకెన్‌ల `assets`ని ఖజానాలో డిపాజిట్ చేస్తుంది మరియు `shares` యాజమాన్యాన్ని `receiver`కి మంజూరు చేస్తుంది.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

ఈ ఫంక్షన్ `receiver` కోసం ముద్రించబడిన షేర్లతో, ఒకే [`mint`](#mint) కాల్‌లో ముద్రించగల గరిష్ట షేర్ల మొత్తాన్ని అందిస్తుంది.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

ఈ ఫంక్షన్ వినియోగదారులు ప్రస్తుత బ్లాక్ వద్ద వారి ముద్రణ (mint) యొక్క ప్రభావాలను అనుకరించడానికి అనుమతిస్తుంది.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

ఈ ఫంక్షన్ అంతర్లీన టోకెన్‌ల `assets`ని డిపాజిట్ చేయడం ద్వారా `receiver`కి ఖచ్చితంగా `shares` ఖజానా షేర్లను ముద్రిస్తుంది.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

ఈ ఫంక్షన్ ఒకే [`withdraw`](#withdraw) కాల్‌తో `owner` బ్యాలెన్స్ నుండి ఉపసంహరించుకోగల గరిష్ట అంతర్లీన ఆస్తుల మొత్తాన్ని అందిస్తుంది.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

ఈ ఫంక్షన్ వినియోగదారులు ప్రస్తుత బ్లాక్ వద్ద వారి ఉపసంహరణ యొక్క ప్రభావాలను అనుకరించడానికి అనుమతిస్తుంది.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

ఈ ఫంక్షన్ `owner` నుండి `shares`ని బర్న్ చేస్తుంది మరియు ఖజానా నుండి `receiver`కి ఖచ్చితంగా `assets` టోకెన్‌ను పంపుతుంది.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

ఈ ఫంక్షన్ [`redeem`](#redeem) కాల్ ద్వారా `owner` బ్యాలెన్స్ నుండి రీడీమ్ చేయగల గరిష్ట షేర్ల మొత్తాన్ని అందిస్తుంది.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

ఈ ఫంక్షన్ వినియోగదారులు ప్రస్తుత బ్లాక్ వద్ద వారి విముక్తి (redemption) యొక్క ప్రభావాలను అనుకరించడానికి అనుమతిస్తుంది.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

ఈ ఫంక్షన్ `owner` నుండి నిర్దిష్ట సంఖ్యలో `shares`ని రీడీమ్ చేస్తుంది మరియు ఖజానా నుండి `receiver`కి అంతర్లీన టోకెన్ యొక్క `assets`ని పంపుతుంది.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

చలామణిలో ఉన్న రీడీమ్ చేయని ఖజానా షేర్ల మొత్తం సంఖ్యను అందిస్తుంది.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` ప్రస్తుతం కలిగి ఉన్న ఖజానా షేర్ల మొత్తం మొత్తాన్ని అందిస్తుంది.

### ఇంటర్‌ఫేస్ యొక్క మ్యాప్ {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### ఈవెంట్‌లు {#events}

#### డిపాజిట్ ఈవెంట్ {#deposit-event}

[`mint`](#mint) మరియు [`deposit`](#deposit) పద్ధతుల ద్వారా టోకెన్‌లను ఖజానాలో డిపాజిట్ చేసినప్పుడు **తప్పనిసరిగా** విడుదల చేయబడాలి.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ఇక్కడ `sender` అనేది `shares` కోసం `assets`ని మార్పిడి చేసిన వినియోగదారు, మరియు ఆ `shares`ని `owner`కి బదిలీ చేసినవారు.

#### ఉపసంహరణ ఈవెంట్ {#withdraw-event}

[`redeem`](#redeem) లేదా [`withdraw`](#withdraw) పద్ధతులలో డిపాజిటర్ ద్వారా ఖజానా నుండి షేర్లను ఉపసంహరించుకున్నప్పుడు **తప్పనిసరిగా** విడుదల చేయబడాలి.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ఇక్కడ `sender` అనేది ఉపసంహరణను ప్రేరేపించిన మరియు `owner` యాజమాన్యంలోని `shares`ని `assets` కోసం మార్పిడి చేసిన వినియోగదారు. `receiver` అనేది ఉపసంహరించుకున్న `assets`ని స్వీకరించిన వినియోగదారు.

## మరింత చదవడానికి {#further-reading}

- [EIP-4626: టోకనైజ్డ్ ఖజానా ప్రమాణం](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub రెపో](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)