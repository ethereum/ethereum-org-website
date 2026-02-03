---
title: ERC-4626 టోకనైజ్డ్ వాల్ట్ ప్రమాణం
description: దిగుబడినిచ్చే వాల్ట్‌ల కోసం ఒక ప్రమాణం.
lang: te
---

## పరిచయం {#introduction}

ERC-4626 అనేది దిగుబడినిచ్చే వాల్ట్‌ల సాంకేతిక పారామితులను ఆప్టిమైజ్ చేయడానికి మరియు ఏకీకృతం చేయడానికి ఒక ప్రమాణం. ఇది ఒకే అంతర్లీన ERC-20 టోకెన్ యొక్క వాటాలను సూచించే టోకనైజ్డ్ దిగుబడినిచ్చే వాల్ట్‌ల కోసం ఒక ప్రామాణిక APIని అందిస్తుంది. ERC-4626 ERC-20ని ఉపయోగించే టోకనైజ్డ్ వాల్ట్‌ల కోసం ఒక ఐచ్ఛిక పొడిగింపును కూడా వివరిస్తుంది, ఇది టోకెన్‌లను డిపాజిట్ చేయడం, ఉపసంహరించుకోవడం మరియు బ్యాలెన్స్‌లను చదవడం కోసం ప్రాథమిక కార్యాచరణను అందిస్తుంది.

**దిగుబడినిచ్చే వాల్ట్‌లలో ERC-4626 పాత్ర**

రుణ మార్కెట్లు, అగ్రిగేటర్లు మరియు అంతర్గతంగా వడ్డీనిచ్చే టోకెన్లు వివిధ వ్యూహాలను అమలు చేయడం ద్వారా వినియోగదారులు వారి క్రిప్టో టోకెన్లపై ఉత్తమ దిగుబడిని కనుగొనడంలో సహాయపడతాయి. ఈ వ్యూహాలు స్వల్ప వ్యత్యాసంతో చేయబడతాయి, ఇది దోషాలకు దారితీయవచ్చు లేదా అభివృద్ధి వనరులను వృధా చేయవచ్చు.

దిగుబడినిచ్చే వాల్ట్‌లలోని ERC-4626 ఏకీకరణ ప్రయత్నాన్ని తగ్గిస్తుంది మరియు మరింత స్థిరమైన మరియు దృఢమైన అమలు నమూనాలను సృష్టించడం ద్వారా డెవలపర్‌ల నుండి తక్కువ ప్రత్యేక ప్రయత్నంతో వివిధ అప్లికేషన్‌లలో దిగుబడికి ప్రాప్యతను అన్‌లాక్ చేస్తుంది.

ERC-4626 టోకెన్ గురించి [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626)లో పూర్తిగా వివరించబడింది.

**అసమకాలిక వాల్ట్ పొడిగింపు (ERC-7540)**

ERC-4626 ఒక పరిమితి వరకు అటామిక్ డిపాజిట్లు మరియు రిడెంప్షన్‌ల కోసం ఆప్టిమైజ్ చేయబడింది. పరిమితిని చేరుకుంటే, కొత్త డిపాజిట్లు లేదా రిడెంప్షన్‌లు సమర్పించబడవు. వాల్ట్‌తో ఇంటర్‌ఫేస్ చేయడానికి ముందస్తు షరతుగా అసమకాలిక చర్యలు లేదా జాప్యాలు ఉన్న ఏ స్మార్ట్ కాంట్రాక్ట్ సిస్టమ్‌కైనా ఈ పరిమితి బాగా పనిచేయదు (ఉదా., వాస్తవ-ప్రపంచ ఆస్తి ప్రోటోకాల్‌లు, అండర్‌కొలేటరలైజ్డ్ లెండింగ్ ప్రోటోకాల్‌లు, క్రాస్-చైన్ లెండింగ్ ప్రోటోకాల్‌లు, లిక్విడ్ స్టేకింగ్ టోకెన్‌లు లేదా ఇన్సూరెన్స్ సేఫ్టీ మాడ్యూల్స్).

ERC-7540 అసమకాలిక వినియోగ కేసుల కోసం ERC-4626 వాల్ట్‌ల యొక్క ప్రయోజనాన్ని విస్తరిస్తుంది. అసమకాలిక అభ్యర్థనలను క్లెయిమ్ చేయడానికి ఇప్పటికే ఉన్న వాల్ట్ ఇంటర్‌ఫేస్ (`deposit`/`withdraw`/`mint`/`redeem`) పూర్తిగా ఉపయోగించబడుతుంది.

ERC-7540 పొడిగింపు గురించి [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540)లో పూర్తిగా వివరించబడింది.

**బహుళ-ఆస్తి వాల్ట్ పొడిగింపు (ERC-7575)**

ERC-4626 మద్దతు ఇవ్వని ఒక వినియోగ సందర్భం ఏమిటంటే లిక్విడిటీ ప్రొవైడర్ (LP) టోకెన్‌ల వంటి బహుళ ఆస్తులు లేదా ఎంట్రీ పాయింట్‌లను కలిగి ఉన్న వాల్ట్‌లు. ERC-4626 స్వయంగా ERC-20గా ఉండాలనే అవసరం కారణంగా ఇవి సాధారణంగా గజిబిజిగా లేదా అననుకూలంగా ఉంటాయి.

ERC-7575, ERC-4626 అమలు నుండి ERC-20 టోకెన్ అమలును బాహ్యీకరించడం ద్వారా బహుళ ఆస్తులతో కూడిన వాల్ట్‌లకు మద్దతును జోడిస్తుంది.

ERC-7575 పొడిగింపు గురించి [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575)లో పూర్తిగా వివరించబడింది.

## అవసరాలు {#prerequisites}

ఈ పేజీని బాగా అర్థం చేసుకోవడానికి, మీరు ముందుగా [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/) మరియు [ERC-20](/developers/docs/standards/tokens/erc-20/) గురించి చదవాలని మేము సిఫార్సు చేస్తున్నాము.

## ERC-4626 ఫంక్షన్లు మరియు ఫీచర్లు: {#body}

### పద్ధతులు {#methods}

#### ఆస్తి {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

ఈ ఫంక్షన్ అకౌంటింగ్, డిపాజిట్ చేయడం, ఉపసంహరించుకోవడం కోసం వాల్ట్ కోసం ఉపయోగించే అంతర్లీన టోకెన్ చిరునామాను అందిస్తుంది.

#### మొత్తంఆస్తులు {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

ఈ ఫంక్షన్ వాల్ట్ ద్వారా కలిగి ఉన్న అంతర్లీన ఆస్తుల మొత్తం మొత్తాన్ని అందిస్తుంది.

#### వాటాలుగా మార్చండి {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

ఈ ఫంక్షన్ అందించిన `assets` మొత్తానికి వాల్ట్ ద్వారా మార్పిడి చేయబడే `shares` మొత్తాన్ని అందిస్తుంది.

#### ఆస్తులుగా మార్చండి {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

ఈ ఫంక్షన్ అందించిన `shares` మొత్తానికి వాల్ట్ ద్వారా మార్పిడి చేయబడే `assets` మొత్తాన్ని అందిస్తుంది.

#### గరిష్ట డిపాజిట్ {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

ఈ ఫంక్షన్ `రిసీవర్` కోసం ముద్రించిన వాటాలతో, ఒకే [`deposit`](#deposit) కాల్‌లో డిపాజిట్ చేయగల గరిష్ట మొత్తంలో అంతర్లీన ఆస్తులను అందిస్తుంది.

#### డిపాజిట్ ప్రివ్యూ {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

ఈ ఫంక్షన్ ప్రస్తుత బ్లాక్‌లో వారి డిపాజిట్ యొక్క ప్రభావాలను అనుకరించడానికి వినియోగదారులను అనుమతిస్తుంది.

#### డిపాజిట్ {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

ఈ ఫంక్షన్ అంతర్లీన టోకెన్‌ల `assets`ను వాల్ట్‌లోకి డిపాజిట్ చేస్తుంది మరియు `receiver`కి `shares` యాజమాన్యాన్ని మంజూరు చేస్తుంది.

#### గరిష్ట మింట్ {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

ఈ ఫంక్షన్ `రిసీవర్` కోసం ముద్రించిన వాటాలతో, ఒకే [`mint`](#mint) కాల్‌లో ముద్రించగల గరిష్ట వాటాల మొత్తాన్ని అందిస్తుంది.

#### మింట్ ప్రివ్యూ {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

ఈ ఫంక్షన్ ప్రస్తుత బ్లాక్‌లో వారి మింట్ యొక్క ప్రభావాలను అనుకరించడానికి వినియోగదారులను అనుమతిస్తుంది.

#### మింట్ {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

ఈ ఫంక్షన్ అంతర్లీన టోకెన్‌ల `assets`ను డిపాజిట్ చేయడం ద్వారా `receiver`కి సరిగ్గా `shares` వాల్ట్ షేర్‌లను మింట్ చేస్తుంది.

#### గరిష్ట ఉపసంహరణ {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

ఈ ఫంక్షన్ ఒకే [`withdraw`](#withdraw) కాల్‌తో `owner` బ్యాలెన్స్ నుండి ఉపసంహరించుకోగల గరిష్ట మొత్తంలో అంతర్లీన ఆస్తులను అందిస్తుంది.

#### ఉపసంహరణ ప్రివ్యూ {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

ఈ ఫంక్షన్ ప్రస్తుత బ్లాక్‌లో వారి ఉపసంహరణ యొక్క ప్రభావాలను అనుకరించడానికి వినియోగదారులను అనుమతిస్తుంది.

#### ఉపసంహరించు {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

ఈ ఫంక్షన్ `owner` నుండి `shares`ను బర్న్ చేస్తుంది మరియు వాల్ట్ నుండి `receiver`కి సరిగ్గా `assets` టోకెన్‌ను పంపుతుంది.

#### గరిష్ట రీడీమ్ {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

ఈ ఫంక్షన్ ఒక [`redeem`](#redeem) కాల్ ద్వారా `owner` బ్యాలెన్స్ నుండి రీడీమ్ చేయగల గరిష్ట వాటాల మొత్తాన్ని అందిస్తుంది.

#### రీడీమ్ ప్రివ్యూ {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

ఈ ఫంక్షన్ ప్రస్తుత బ్లాక్‌లో వారి రిడెంప్షన్ యొక్క ప్రభావాలను అనుకరించడానికి వినియోగదారులను అనుమతిస్తుంది.

#### రీడీమ్ {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

ఈ ఫంక్షన్ `owner` నుండి నిర్దిష్ట సంఖ్యలో `shares`ను రీడీమ్ చేస్తుంది మరియు వాల్ట్ నుండి `receiver`కి అంతర్లీన టోకెన్ యొక్క `assets`ను పంపుతుంది.

#### మొత్తంసప్లై {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

ప్రచారంలో ఉన్న రీడీమ్ చేయని వాల్ట్ వాటాల మొత్తం సంఖ్యను అందిస్తుంది.

#### బ్యాలెన్స్ఆఫ్ {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

`owner` ప్రస్తుతం కలిగి ఉన్న వాల్ట్ వాటాల మొత్తం మొత్తాన్ని అందిస్తుంది.

### ఇంటర్‌ఫేస్ యొక్క మ్యాప్ {#mapOfTheInterface}

![ERC-4626 ఇంటర్‌ఫేస్ యొక్క మ్యాప్](./map-of-erc-4626.png)

### ఈవెంట్‌లు {#events}

#### డిపాజిట్ ఈవెంట్

[`mint`](#mint) మరియు [`deposit`](#deposit) పద్ధతుల ద్వారా వాల్ట్‌లోకి టోకెన్‌లను డిపాజిట్ చేసినప్పుడు **తప్పక** విడుదల చేయాలి.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ఇక్కడ `sender` `assets`ను `shares` కోసం మార్పిడి చేసిన వినియోగదారుడు మరియు ఆ `shares`ను `owner`కి బదిలీ చేశారు.

#### ఉపసంహరణ ఈవెంట్

[`redeem`](#redeem) లేదా [`withdraw`](#withdraw) పద్ధతులలో డిపాజిటర్ ద్వారా వాల్ట్ నుండి వాటాలను ఉపసంహరించుకున్నప్పుడు **తప్పక** విడుదల చేయాలి.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

ఇక్కడ `sender` ఉపసంహరణను ప్రేరేపించిన వినియోగదారుడు మరియు `owner` యాజమాన్యంలోని `shares`ను `assets` కోసం మార్పిడి చేసుకున్నాడు. `receiver` ఉపసంహరించబడిన `assets`ను అందుకున్న వినియోగదారుడు.

## మరింత సమాచారం {#further-reading}

- [EIP-4626: టోకనైజ్డ్ వాల్ట్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub రెపో](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
