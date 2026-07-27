---
title: ⁦ERC-7540⁩ అసమకాలిక టోకనైజ్డ్ ఖజానా ప్రమాణం
description: టోకనైజ్డ్ ఖజానాల కోసం అసమకాలిక డిపాజిట్ మరియు విముక్తి (redemption) ఫ్లోలను జోడించే ⁦ERC-4626⁩ యొక్క పొడిగింపు.
lang: te
---

## పరిచయం {#introduction}

ERC-7540 అసమకాలిక డిపాజిట్ మరియు విముక్తి (redemption) ఫ్లోలకు మద్దతును జోడించడం ద్వారా [ERC-4626 టోకనైజ్డ్ ఖజానా ప్రమాణాన్ని](/developers/docs/standards/tokens/erc-4626/) పొడిగిస్తుంది. ఇది రిక్వెస్ట్-తర్వాత-క్లెయిమ్ (request-then-claim) పద్ధతిని పరిచయం చేస్తుంది: వినియోగదారులు ముందుగా ఒక అభ్యర్థనను సమర్పిస్తారు (వారి ఆస్తులు లేదా షేర్లను లాక్ చేస్తారు), ఆపై ఖజానా దానిని ప్రాసెస్ చేసిన తర్వాత ఫలితాన్ని క్లెయిమ్ చేస్తారు.

ఒక ఖజానా ఒకే లావాదేవీలో తక్షణమే తుది పరిష్కారం చేయలేనప్పుడు ఇది అవసరం, ఉదాహరణకు:

- టోకనైజ్డ్ ట్రెజరీలు, ప్రైవేట్ క్రెడిట్ మరియు T+1 లేదా T+2 తుది పరిష్కారం సైకిల్స్ ఉన్న ఇతర ఆస్తుల వంటి వాస్తవ ప్రపంచ ఆస్తులు (RWA) ప్రోటోకాల్‌లు
- క్రెడిట్ అంచనాలు ఆఫ్‌చైన్‌లో జరిగే అండర్‌కొలేటరలైజ్డ్ రుణం ఇవ్వడం
- బ్రిడ్జింగ్ వల్ల జాప్యాలు ఏర్పడే క్రాస్-చైన్ ఖజానా వ్యూహాలు
- అన్‌బాండింగ్ వ్యవధులు ఉన్న లిక్విడ్ స్టేకింగ్ టోకెన్ (LST)లు

ఖజానాలు డిపాజిట్లపై మాత్రమే, విముక్తులపై మాత్రమే లేదా రెండింటిపైనా అసమకాలికంగా ఉండటానికి ఎంచుకోవచ్చు. ఈ సౌలభ్యం ఖజానా డెవలపర్‌లను అంతర్లీన వ్యూహం అవసరమైన చోట మాత్రమే అసమకాలిక ఫ్లోలను జోడించడానికి అనుమతిస్తుంది, అదే సమయంలో మరొక వైపు సమకాలికంగా ఉంచుతుంది.

## ముందస్తు అవసరాలు {#prerequisites}

ఈ పేజీని బాగా అర్థం చేసుకోవడానికి, మీరు ముందుగా [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) మరియు [ERC-4626](/developers/docs/standards/tokens/erc-4626/) గురించి చదవాలని మేము సిఫార్సు చేస్తున్నాము.

## ERC-4626 vs ERC-7540 {#comparison}

ERC-4626లో, డిపాజిట్ అటామిక్‌గా తుది పరిష్కారం అవుతుంది: పెట్టుబడిదారుడు ఆస్తులను పంపుతాడు మరియు ఒకే లావాదేవీలో షేర్లను తిరిగి పొందుతాడు.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 దీనిని రెండు దశలుగా విభజిస్తుంది. పెట్టుబడిదారుడు ముందుగా ఆస్తులను లాక్ చేయడానికి `requestDeposit()`ని కాల్ చేస్తాడు, ఆపై అభ్యర్థనను ప్రాసెస్ చేయడానికి ఖజానా మేనేజర్ కోసం వేచి ఉంటాడు. నెరవేరిన తర్వాత, పెట్టుబడిదారుడు వారి షేర్లను క్లెయిమ్ చేయడానికి `deposit()`ని కాల్ చేస్తాడు. మారకపు రేట్లు అభ్యర్థన సమయంలో కాకుండా, నెరవేర్చిన సమయంలో నిర్ణయించబడతాయి.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

విముక్తి ఫ్లో కూడా అదే విధంగా పనిచేస్తుంది: `requestRedeem()` షేర్లను లాక్ చేస్తుంది మరియు నెరవేరిన తర్వాత పెట్టుబడిదారుడు ఆస్తులను క్లెయిమ్ చేయడానికి `redeem()`ని కాల్ చేస్తాడు.

## ERC-7540 విధులు మరియు లక్షణాలు {#body}

ERC-7540 పూర్తి ERC-4626 ఇంటర్‌ఫేస్‌ను వారసత్వంగా పొందుతుంది కానీ `deposit`/`mint`/`withdraw`/`redeem`లను క్లెయిమ్ విధులుగా తిరిగి ఉపయోగిస్తుంది. కొత్త `requestDeposit` మరియు `requestRedeem` విధులు ప్రారంభ అభ్యర్థన దశను నిర్వహిస్తాయి.

ప్రతి అభ్యర్థన మూడు స్థితుల గుండా వెళుతుంది: పెండింగ్ (సమర్పించబడింది, ప్రాసెసింగ్ కోసం వేచి ఉంది), క్లెయిమ్ చేయదగినది (నెరవేర్చబడింది మరియు ధర నిర్ణయించబడింది) మరియు క్లెయిమ్ చేయబడింది (పెట్టుబడిదారుడు వారి షేర్లు లేదా ఆస్తులను సేకరించారు).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### డిపాజిట్ అభ్యర్థన ఫ్లో {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner` నుండి `assets`ని ఖజానాలోకి బదిలీ చేస్తుంది మరియు డిపాజిట్ చేయడానికి అభ్యర్థనను సమర్పిస్తుంది. `controller` చిరునామా అభ్యర్థన యొక్క నియంత్రణను పొందుతుంది. అభ్యర్థన బ్యాచ్‌ను గుర్తించే `requestId`ని అందిస్తుంది.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

ఇచ్చిన `controller` మరియు `requestId` కోసం పెండింగ్‌లో ఉన్న (ఇంకా క్లెయిమ్ చేయలేని) డిపాజిట్ అభ్యర్థనలోని `assets` మొత్తాన్ని అందిస్తుంది.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

ఇచ్చిన `controller` మరియు `requestId` కోసం క్లెయిమ్ చేయదగిన (నెరవేర్చబడింది కానీ ఇంకా క్లెయిమ్ చేయబడని) డిపాజిట్ అభ్యర్థనలోని `assets` మొత్తాన్ని అందిస్తుంది.

#### డిపాజిట్లను క్లెయిమ్ చేయడం {#claiming-deposits}

డిపాజిట్ అభ్యర్థన క్లెయిమ్ చేయదగినదిగా మారిన తర్వాత, వినియోగదారుడు వారి షేర్లను క్లెయిమ్ చేయడానికి ప్రామాణిక ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) లేదా [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) విధిని కాల్ చేస్తారు. ERC-7540లో, ఈ విధులు ఇకపై ఆస్తులను బదిలీ చేయవు (అది అభ్యర్థన సమయంలోనే జరిగింది). అవి రిసీవర్‌కు షేర్లను మాత్రమే ముద్రిస్తాయి.

### విముక్తి అభ్యర్థన ఫ్లో {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner` నుండి `shares`ని లాక్ చేస్తుంది మరియు విముక్తి చేయడానికి అభ్యర్థనను సమర్పిస్తుంది. `controller` చిరునామా అభ్యర్థన యొక్క నియంత్రణను పొందుతుంది.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

ఇచ్చిన `controller` మరియు `requestId` కోసం పెండింగ్‌లో ఉన్న విముక్తి అభ్యర్థనలోని `shares` మొత్తాన్ని అందిస్తుంది.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

ఇచ్చిన `controller` మరియు `requestId` కోసం క్లెయిమ్ చేయదగిన విముక్తి అభ్యర్థనలోని `shares` మొత్తాన్ని అందిస్తుంది.

#### విముక్తులను క్లెయిమ్ చేయడం {#claiming-redemptions}

విముక్తి అభ్యర్థన క్లెయిమ్ చేయదగినదిగా మారిన తర్వాత, వినియోగదారుడు వారి ఆస్తులను క్లెయిమ్ చేయడానికి ప్రామాణిక ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) లేదా [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) విధిని కాల్ చేస్తారు.

### ఆపరేటర్ నిర్వహణ {#operator-management}

ERC-7540 ఒక ఆపరేటర్ పద్ధతిని ([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909) నుండి) కలిగి ఉంటుంది, ఇది వినియోగదారు తరపున అభ్యర్థనలను నిర్వహించడానికి మూడవ పక్షాలను అనుమతిస్తుంది.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

డిపాజిట్/విముక్తి అభ్యర్థనలు మరియు క్లెయిమ్‌ల కోసం `msg.sender` తరపున వ్యవహరించడానికి `operator`ని ఆమోదిస్తుంది లేదా ఉపసంహరిస్తుంది.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`controller` తరపున వ్యవహరించడానికి `operator` ఆమోదించబడిందో లేదో అందిస్తుంది.

### అభ్యర్థన IDలు {#request-ids}

అభ్యర్థన IDలు అభ్యర్థనల యొక్క విభిన్న బ్యాచ్‌ల మధ్య తేడాను చూపుతాయి. ఒకే `requestId`ని పంచుకునే అన్ని అభ్యర్థనలు ఫంజిబుల్ (fungible): అవి స్థితుల మధ్య కలిసి మారుతాయి మరియు ఒకే మారకపు రేటును పొందుతాయి.

ఒక ఖజానా అన్ని అభ్యర్థనల కోసం `requestId = 0`ని అందించినప్పుడు, `controller` చిరునామా మాత్రమే అభ్యర్థన స్థితిని వేరు చేస్తుంది. ఒకే కంట్రోలర్ నుండి బహుళ అభ్యర్థనలు సమగ్రపరచబడతాయి.

### ఈవెంట్‌లు {#events}

#### DepositRequest ఈవెంట్ {#depositrequest-event}

[`requestDeposit`](#requestdeposit) ద్వారా డిపాజిట్ అభ్యర్థన సమర్పించబడినప్పుడు తప్పనిసరిగా వెలువరించాలి.

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest ఈవెంట్ {#redeemrequest-event}

[`requestRedeem`](#requestredeem) ద్వారా విముక్తి అభ్యర్థన సమర్పించబడినప్పుడు తప్పనిసరిగా వెలువరించాలి.

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet ఈవెంట్ {#operatorset-event}

[`setOperator`](#setoperator) ద్వారా ఆపరేటర్ ఆమోదించబడినప్పుడు లేదా ఉపసంహరించబడినప్పుడు తప్పనిసరిగా వెలువరించాలి.

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### ప్రివ్యూ విధులు {#preview-functions}

అభ్యర్థన నెరవేరే వరకు మారకపు రేటు తెలియదు కాబట్టి, ప్రివ్యూ విధులు అసమకాలికంగా ఉన్న ఫ్లోల కోసం మాత్రమే రివర్ట్ చేయాలి. అసమకాలిక-డిపాజిట్ ఖజానాలో, `previewDeposit` మరియు `previewMint` తప్పనిసరిగా రివర్ట్ చేయాలి, అయితే `previewRedeem` మరియు `previewWithdraw` ERC-4626లో వలె పని చేస్తూనే ఉంటాయి (మరియు అసమకాలిక-విముక్తి ఖజానాకు దీనికి విరుద్ధంగా ఉంటుంది). ఇది ERC-4626 నుండి ఒక ముఖ్యమైన ప్రవర్తనా వ్యత్యాసం.

## మరింత చదవడానికి {#further-reading}

- [EIP-7540: అసమకాలిక ERC-4626 టోకనైజ్డ్ ఖజానాలు](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: టోకనైజ్డ్ ఖజానా ప్రమాణం](https://eips.ethereum.org/EIPS/eip-4626)
- [ఓపెన్‌జెప్పెలిన్ ERC-7540 అమలు](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)