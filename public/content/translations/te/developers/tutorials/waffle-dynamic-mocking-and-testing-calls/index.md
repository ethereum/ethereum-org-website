---
title: "వాఫిల్: డైనమిక్ మాకింగ్ మరియు కాంట్రాక్ట్ కాల్స్‌ను పరీక్షించడం"
description: "డైనమిక్ మాకింగ్ మరియు కాంట్రాక్ట్ కాల్స్ పరీక్షించడం కోసం అధునాతన వాఫిల్ ట్యుటోరియల్"
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "స్మార్ట్ కాంట్రాక్టులు",
    "దృఢత్వం",
    "పరీక్షించడం",
    "మాకింగ్"
  ]
skill: intermediate
lang: te
published: 2020-11-14
---

## ఈ ట్యుటోరియల్ దేని గురించి? {#what-is-this-tutorial-about}

ఈ ట్యుటోరియల్‌లో మీరు వీటిని ఎలా చేయాలో నేర్చుకుంటారు:

- డైనమిక్ మాకింగ్‌ను ఉపయోగించండి
- స్మార్ట్ కాంట్రాక్టుల మధ్య పరస్పర చర్యలను పరీక్షించండి

అంచనాలు:

- `Solidity`లో ఒక సాధారణ స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా వ్రాయాలో మీకు ఇప్పటికే తెలుసు
- `JavaScript` మరియు `TypeScript` గురించి మీకు బాగా తెలుసు
- మీరు ఇతర `Waffle` ట్యుటోరియల్స్ చేసారు లేదా దాని గురించి ఒకటి రెండు విషయాలు తెలుసు

## డైనమిక్ మాకింగ్ {#dynamic-mocking}

డైనమిక్ మాకింగ్ ఎందుకు ఉపయోగపడుతుంది? సరే, ఇది ఇంటిగ్రేషన్ టెస్ట్‌లకు బదులుగా యూనిట్ టెస్ట్‌లను వ్రాయడానికి మమ్మల్ని అనుమతిస్తుంది. దాని అర్థం ఏమిటి? దీని అర్థం మనం స్మార్ట్ కాంట్రాక్టుల డిపెండెన్సీల గురించి ఆందోళన చెందాల్సిన అవసరం లేదు, తద్వారా వాటన్నింటినీ పూర్తి ఏకాంతంలో పరీక్షించవచ్చు. మీరు దానిని ఖచ్చితంగా ఎలా చేయగలరో నేను మీకు చూపిస్తాను.

### **1.  ప్రాజెక్ట్** {#1-project}

మేము ప్రారంభించడానికి ముందు ఒక సాధారణ node.js ప్రాజెక్ట్‌ను సిద్ధం చేయాలి:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# లేదా మీరు npm వాడుతుంటే
npm init
```

టైప్‌స్క్రిప్ట్ మరియు టెస్ట్ డిపెండెన్సీలను జోడించడంతో ప్రారంభిద్దాం - మోచా & చాయ్:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# లేదా మీరు npm వాడుతుంటే
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

ఇప్పుడు `Waffle` మరియు `ethers` ని జోడిద్దాం:

```bash
yarn add --dev ethereum-waffle ethers
# లేదా మీరు npm వాడుతుంటే
npm install ethereum-waffle ethers --save-dev
```

మీ ప్రాజెక్ట్ నిర్మాణం ఇప్పుడు ఇలా ఉండాలి:

```
.
├── contracts
├── package.json
└── test
```

### **2.  స్మార్ట్ కాంట్రాక్ట్** {#2-smart-contract}

డైనమిక్ మాకింగ్ ప్రారంభించడానికి, మనకు డిపెండెన్సీలతో కూడిన స్మార్ట్ కాంట్రాక్ట్ అవసరం. చింతించకండి, నేను మీకు సహాయం చేస్తాను!

ఇక్కడ `Solidity`లో వ్రాసిన ఒక సాధారణ స్మార్ట్ కాంట్రాక్ట్ ఉంది, దీని ఏకైక ఉద్దేశ్యం మనం ధనవంతులమా కాదా అని తనిఖీ చేయడం. మన దగ్గర తగినన్ని టోకెన్లు ఉన్నాయో లేదో తనిఖీ చేయడానికి ఇది ERC20 టోకెన్‌ను ఉపయోగిస్తుంది. దీన్ని `./contracts/AmIRichAlready.sol`లో ఉంచండి.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

మేము డైనమిక్ మాకింగ్ ఉపయోగించాలనుకుంటున్నాము కాబట్టి మాకు పూర్తి ERC20 అవసరం లేదు, అందుకే మేము కేవలం ఒక ఫంక్షన్‌తో IERC20 ఇంటర్‌ఫేస్‌ను ఉపయోగిస్తున్నాము.

ఈ కాంట్రాక్ట్‌ను రూపొందించడానికి సమయం ఆసన్నమైంది! దాని కోసం మేము `Waffle`ని ఉపయోగిస్తాము. మొదట, మేము కంపైలేషన్ ఎంపికలను పేర్కొనే ఒక సాధారణ `waffle.json` కాన్ఫిగ్ ఫైల్‌ను సృష్టించబోతున్నాము.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

ఇప్పుడు మనం వాఫిల్‌తో కాంట్రాక్ట్‌ను నిర్మించడానికి సిద్ధంగా ఉన్నాము:

```bash
npx waffle
```

సులభం, కదా? `build/` ఫోల్డర్‌లో కాంట్రాక్ట్ మరియు ఇంటర్‌ఫేస్‌కు సంబంధించిన రెండు ఫైల్‌లు కనిపించాయి. పరీక్ష కోసం మేము వాటిని తర్వాత ఉపయోగిస్తాము.

### **3.  పరీక్షించడం** {#3-testing}

వాస్తవ పరీక్ష కోసం `AmIRichAlready.test.ts` అనే ఫైల్‌ను సృష్టిద్దాం. అన్నింటికంటే ముందు, మనం దిగుమతులను నిర్వహించాలి. తర్వాత మనకు అవి అవసరం:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

JS డిపెండెన్సీలు మినహా, మనము నిర్మించిన కాంట్రాక్ట్ మరియు ఇంటర్‌ఫేస్‌ను దిగుమతి చేసుకోవాలి:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

పరీక్షించడానికి `Waffle` `chai`ని ఉపయోగిస్తుంది. అయితే, మనం దానిని ఉపయోగించే ముందు, `Waffle` యొక్క మ్యాచ్‌లను `chai`లోకే ఇంజెక్ట్ చేయాలి:

```typescript
use(solidity)
```

ప్రతి పరీక్షకు ముందు కాంట్రాక్ట్ స్థితిని రీసెట్ చేసే `beforeEach()` ఫంక్షన్‌ను మనం అమలు చేయాలి. అక్కడ మనకేం కావాలో ముందు ఆలోచిద్దాం. ఒక కాంట్రాక్ట్‌ను అమలు చేయడానికి మాకు రెండు విషయాలు కావాలి: ఒక వాలెట్ మరియు `AmIRichAlready` కాంట్రాక్ట్ కోసం ఒక ఆర్గ్యుమెంట్‌గా పాస్ చేయడానికి ఒక అమలు చేయబడిన ERC20 కాంట్రాక్ట్.

ముందుగా మనం ఒక వాలెట్‌ను సృష్టిస్తాము:

```typescript
const [wallet] = new MockProvider().getWallets()
```

అప్పుడు మనం ఒక ERC20 కాంట్రాక్ట్‌ను అమలు చేయాలి. ఇక్కడే క్లిష్టమైన భాగం ఉంది - మన దగ్గర ఒక ఇంటర్‌ఫేస్ మాత్రమే ఉంది. ఇక్కడే `Waffle` మనల్ని రక్షించడానికి వస్తుంది. `Waffle`లో ఒక మ్యాజికల్ `deployMockContract()` ఫంక్షన్ ఉంది, ఇది ఇంటర్‌ఫేస్ యొక్క _abi_ని మాత్రమే ఉపయోగించి కాంట్రాక్ట్‌ను సృష్టిస్తుంది:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

ఇప్పుడు వాలెట్ మరియు అమలు చేయబడిన ERC20 రెండింటితో, మనం ముందుకు వెళ్లి `AmIRichAlready` కాంట్రాక్ట్‌ను అమలు చేయవచ్చు:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

వీటన్నింటితో, మా `beforeEach()` ఫంక్షన్ పూర్తయింది. ఇప్పటివరకు మీ `AmIRichAlready.test.ts` ఫైల్ ఇలా ఉండాలి:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

`AmIRichAlready` కాంట్రాక్ట్ కోసం మొదటి టెస్ట్ వ్రాద్దాం. మన టెస్ట్ దేని గురించి ఉండాలని మీరు అనుకుంటున్నారు? అవును, మీరు చెప్పింది నిజమే! మనం ఇప్పటికే ధనవంతులమా కాదా అని తనిఖీ చేయాలి :)

కానీ ఒక్క నిమిషం ఆగండి. మన మాక్డ్ కాంట్రాక్ట్‌కు ఏ విలువలు తిరిగి ఇవ్వాలో ఎలా తెలుస్తుంది? `balanceOf()` ఫంక్షన్ కోసం మేము ఏ లాజిక్‌ను అమలు చేయలేదు. మళ్ళీ, వాఫిల్ ఇక్కడ సహాయపడుతుంది. మా మాక్డ్ కాంట్రాక్ట్‌లో ఇప్పుడు కొన్ని కొత్త ఫ్యాన్సీ విషయాలు ఉన్నాయి:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

ఈ జ్ఞానంతో మనం చివరకు మన మొదటి పరీక్షను వ్రాయగలము:

```typescript
it("వాలెట్‌లో 1000000 టోకెన్‌ల కంటే తక్కువ ఉంటే ఫాల్స్‌ని అందిస్తుంది", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

ఈ పరీక్షను భాగాలుగా విభజిద్దాం:

1. మేము మా మాక్ ERC20 కాంట్రాక్ట్‌ను ఎల్లప్పుడూ 999999 టోకెన్‌ల బ్యాలెన్స్‌ను తిరిగి ఇచ్చేలా సెట్ చేసాము.
2. `contract.check()` పద్ధతి `false`ని తిరిగి ఇస్తుందో లేదో తనిఖీ చేయండి.

మేము దీన్ని ప్రారంభించడానికి సిద్ధంగా ఉన్నాము:

![ఒక పరీక్ష పాస్ అవుతోంది](./test-one.png)

కాబట్టి పరీక్ష పనిచేస్తుంది, కానీ... ఇంకా మెరుగుపరచడానికి కొంత ఆస్కారం ఉంది. `balanceOf()` ఫంక్షన్ ఎల్లప్పుడూ 999999ని తిరిగి ఇస్తుంది. ఫంక్షన్ ఏదైనా తిరిగి ఇవ్వాల్సిన వాలెట్‌ను పేర్కొనడం ద్వారా మనం దానిని మెరుగుపరచవచ్చు - నిజమైన కాంట్రాక్ట్ లాగానే:

```typescript
it("వాలెట్‌లో 1000001 టోకెన్‌ల కంటే తక్కువ ఉంటే ఫాల్స్‌ని అందిస్తుంది", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

ఇప్పటివరకు, మనం తగినంత ధనవంతులు కానప్పుడు మాత్రమే పరీక్షించాము. దానికి బదులుగా వ్యతిరేకతను పరీక్షిద్దాం:

```typescript
it("వాలెట్‌లో కనీసం 1000001 టోకెన్లు ఉంటే ట్రూని అందిస్తుంది", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

మీరు పరీక్షలను నడుపుతారు...

![రెండు పరీక్షలు పాస్ అవుతున్నాయి](test-two.png)

...మరియు ఇక్కడ మీరు ఉన్నారు! మా కాంట్రాక్ట్ ఉద్దేశించిన విధంగా పనిచేస్తున్నట్లు అనిపిస్తుంది :)

## కాంట్రాక్ట్ కాల్స్‌ను పరీక్షించడం {#testing-contract-calls}

ఇప్పటివరకు ఏమి చేసామో సంగ్రహిద్దాం. మేము మా `AmIRichAlready` కాంట్రాక్ట్ యొక్క కార్యాచరణను పరీక్షించాము మరియు ఇది సరిగ్గా పనిచేస్తున్నట్లు అనిపిస్తుంది. అంటే మనం పూర్తి చేసాము, కదా? ఖచ్చితంగా కాదు! వాఫిల్ మన కాంట్రాక్ట్‌ను మరింత పరీక్షించడానికి అనుమతిస్తుంది. కానీ సరిగ్గా ఎలా? సరే, వాఫిల్ యొక్క ఆయుధశాలలో `calledOnContract()` మరియు `calledOnContractWith()` మ్యాచ్‌చర్‌లు ఉన్నాయి. మా కాంట్రాక్ట్ ERC20 మాక్ కాంట్రాక్ట్‌ను పిలిచిందో లేదో తనిఖీ చేయడానికి అవి మమ్మల్ని అనుమతిస్తాయి. ఈ మ్యాచ్‌చర్‌లలో ఒకదానితో ఇక్కడ ఒక ప్రాథమిక పరీక్ష ఉంది:

```typescript
it("ERC20 టోకెన్‌పై కాంట్రాక్ట్ బ్యాలెన్స్‌ఆఫ్‌ను పిలిచిందో లేదో తనిఖీ చేస్తుంది", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

మనం ఇంకా ముందుకు వెళ్లి, నేను మీకు చెప్పిన ఇతర మ్యాచ్‌చర్‌తో ఈ పరీక్షను మెరుగుపరచవచ్చు:

```typescript
it("ERC20 టోకెన్‌పై నిర్దిష్ట వాలెట్‌తో కాంట్రాక్ట్ బ్యాలెన్స్‌ఆఫ్‌ను పిలిచిందో లేదో తనిఖీ చేస్తుంది", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

పరీక్షలు సరైనవో కాదో తనిఖీ చేద్దాం:

![మూడు పరీక్షలు పాస్ అవుతున్నాయి](test-three.png)

గొప్పది, అన్ని పరీక్షలు ఆకుపచ్చగా ఉన్నాయి.

వాఫిల్‌తో కాంట్రాక్ట్ కాల్స్‌ను పరీక్షించడం చాలా సులభం. మరియు ఇక్కడ ఉత్తమ భాగం ఉంది. ఈ మ్యాచ్‌చర్‌లు సాధారణ మరియు మాక్డ్ కాంట్రాక్టులు రెండింటితోనూ పనిచేస్తాయి! ఇతర సాంకేతికతల కోసం ప్రసిద్ధ టెస్టింగ్ లైబ్రరీల విషయంలో లాగా, కోడ్‌ను ఇంజెక్ట్ చేయడం కంటే వాఫిల్ EVM కాల్స్‌ను రికార్డ్ చేసి ఫిల్టర్ చేయడం దీనికి కారణం.

## ముగింపు రేఖ {#the-finish-line}

అభినందనలు! ఇప్పుడు కాంట్రాక్ట్ కాల్స్‌ను పరీక్షించడానికి మరియు కాంట్రాక్టులను డైనమిక్‌గా మాక్ చేయడానికి వాఫిల్‌ను ఎలా ఉపయోగించాలో మీకు తెలుసు. కనుగొనడానికి ఇంకా చాలా ఆసక్తికరమైన ఫీచర్లు ఉన్నాయి. నేను వాఫిల్ డాక్యుమెంటేషన్‌లోకి ప్రవేశించమని సిఫార్సు చేస్తున్నాను.

వాఫిల్ డాక్యుమెంటేషన్ [ఇక్కడ](https://ethereum-waffle.readthedocs.io/) అందుబాటులో ఉంది.

ఈ ట్యుటోరియల్ కోసం సోర్స్ కోడ్‌ను [ఇక్కడ](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) కనుగొనవచ్చు.

మీరు ఆసక్తి చూపే ట్యుటోరియల్స్:

- [వాఫిల్‌తో స్మార్ట్ కాంట్రాక్టులను పరీక్షించడం](/developers/tutorials/waffle-test-simple-smart-contract/)
