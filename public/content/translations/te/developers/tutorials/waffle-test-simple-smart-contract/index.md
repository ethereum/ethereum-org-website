---
title: "Waffle లైబ్రరీతో సులభమైన స్మార్ట్ కాంట్రాక్టును పరీక్షిస్తోంది"
description: "ప్రారంభకులకు ట్యుటోరియల్"
author: Ewa Kowalska
tags:
  [
    "స్మార్ట్ కాంట్రాక్టులు",
    "దృఢత్వం",
    "Waffle",
    "పరీక్షించడం"
  ]
skill: beginner
lang: te
published: 2021-02-26
---

## ఈ ట్యుటోరియల్‌లో మీరు ఎలా చేయాలో నేర్చుకుంటారు {#in-this-tutorial-youll-learn-how-to}

- వాలెట్ బ్యాలెన్స్ మార్పులను పరీక్షించండి
- పేర్కొన్న ఆర్గ్యుమెంట్‌లతో ఈవెంట్‌ల ఉద్గారాలను పరీక్షించండి
- ఒక లావాదేవీని తిరిగి పంపినట్లు నిర్ధారించండి

## అనుమానాలు {#assumptions}

- మీరు కొత్త జావాస్క్రిప్ట్ లేదా టైప్‌స్క్రిప్ట్ ప్రాజెక్ట్‌ను సృష్టించవచ్చు
- జావాస్క్రిప్ట్‌లో పరీక్షలతో మీకు కొంత ప్రాథమిక అనుభవం ఉంది
- మీరు యార్న్ లేదా ఎన్‌పిఎమ్ వంటి కొన్ని ప్యాకేజీ మేనేజర్‌లను ఉపయోగించారు
- మీకు స్మార్ట్ కాంట్రాక్టులు మరియు సాలిడిటీ గురించి చాలా ప్రాథమిక పరిజ్ఞానం ఉంది

## ప్రారంభించడం {#getting-started}

ట్యుటోరియల్ యార్న్‌ను ఉపయోగించి టెస్ట్ సెటప్ మరియు రన్‌ను ప్రదర్శిస్తుంది, కానీ మీరు ఎన్‌పిఎమ్‌ను ఇష్టపడితే ఎటువంటి సమస్య లేదు - నేను అధికారిక Waffle [డాక్యుమెంటేషన్](https://ethereum-waffle.readthedocs.io/en/latest/index.html) కు సరైన రిఫరెన్స్‌లను అందిస్తాను.

## డిపెండెన్సీలను ఇన్‌స్టాల్ చేయండి {#install-dependencies}

మీ ప్రాజెక్ట్ యొక్క డెవ్ డిపెండెన్సీలకు [జోడించు](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) ethereum-waffle మరియు టైప్‌స్క్రిప్ట్ డిపెండెన్సీలను.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## ఉదాహరణ స్మార్ట్ కాంట్రాక్ట్ {#example-smart-contract}

ట్యుటోరియల్ సమయంలో మేము ఒక సాధారణ స్మార్ట్ కాంట్రాక్ట్ ఉదాహరణ - EtherSplitter పై పని చేస్తాము. ఎవరినైనా కొంత wei పంపడానికి మరియు ఇద్దరు ముందుగా నిర్వచించిన రిసీవర్ల మధ్య సమానంగా విభజించడానికి అనుమతించడం తప్ప ఇది పెద్దగా ఏమీ చేయదు.
స్ప్లిట్ ఫంక్షన్‌కు wei సంఖ్య సరిగా ఉండాలి, లేకపోతే అది తిరిగి వస్తుంది. ఇద్దరు రిసీవర్ల కోసం ఇది wei బదిలీని నిర్వహిస్తుంది, దాని తరువాత బదిలీ ఈవెంట్ యొక్క ఉద్గారం ఉంటుంది.

`src/EtherSplitter.sol` లో EtherSplitter కోడ్ యొక్క స్నిప్పెట్‌ను ఉంచండి.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'సరిగా లేని wei మొత్తం అనుమతించబడదు');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## కాంట్రాక్ట్‌ను కంపైల్ చేయండి {#compile-the-contract}

కాంట్రాక్ట్‌ను [కంపైల్ చేయడానికి](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) package.json ఫైల్‌కు కింది ఎంట్రీని జోడించండి:

```json
"scripts": {
    "build": "waffle"
  }
```

తరువాత, ప్రాజెక్ట్ రూట్ డైరెక్టరీలో Waffle కాన్ఫిగరేషన్ ఫైల్‌ను సృష్టించండి - `waffle.json` - ఆపై కింది కాన్ఫిగరేషన్‌ను అక్కడ అతికించండి:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` ను అమలు చేయండి. ఫలితంగా, `build` డైరెక్టరీ JSON ఫార్మాట్‌లో EtherSplitter కంపైల్ చేయబడిన కాంట్రాక్ట్‌తో కనిపిస్తుంది.

## టెస్ట్ సెటప్ {#test-setup}

Waffle తో పరీక్షించడానికి చాయ్ మ్యాచర్‌లు మరియు మోచాను ఉపయోగించడం అవసరం, కాబట్టి మీరు వాటిని మీ ప్రాజెక్ట్‌కు [జోడించాలి](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests). మీ package.json ఫైల్‌ను అప్‌డేట్ చేయండి మరియు స్క్రిప్ట్స్ భాగంలో `test` ఎంట్రీని జోడించండి:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

మీరు మీ పరీక్షలను [అమలు చేయాలనుకుంటే](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests), కేవలం `yarn test` ను అమలు చేయండి.

## పరీక్షించడం {#testing}

ఇప్పుడు `test` డైరెక్టరీని సృష్టించండి మరియు కొత్త ఫైల్ `test\EtherSplitter.test.ts` ను సృష్టించండి.
కింది స్నిప్పెట్‌ను కాపీ చేసి, దాన్ని మా టెస్ట్ ఫైల్‌లో అతికించండి.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("ఈథర్ స్ప్లిట్టర్", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // ఇక్కడ పరీక్షలను జోడించండి
})
```

మేము ప్రారంభించడానికి ముందు కొన్ని మాటలు.
`MockProvider` బ్లాక్‌చెయిన్ యొక్క మాక్ వెర్షన్‌తో వస్తుంది. ఇది EtherSplitter కాంట్రాక్ట్‌ను పరీక్షించడానికి మాకు ఉపయోగపడే మాక్ వాలెట్లను కూడా అందిస్తుంది. ప్రొవైడర్‌పై `getWallets()` పద్ధతిని కాల్ చేయడం ద్వారా మనం పది వాలెట్లను పొందవచ్చు. ఉదాహరణలో, మేము మూడు వాలెట్లను పొందుతాము - పంపినవారికి మరియు ఇద్దరు రిసీవర్ల కోసం.

తరువాత, మేము 'స్ప్లిట్టర్' అనే వేరియబుల్‌ను ప్రకటిస్తాము - ఇది మా మాక్ EtherSplitter కాంట్రాక్ట్. `deployContract` పద్ధతి ద్వారా ప్రతి ఒక్క పరీక్ష అమలుకు ముందు ఇది సృష్టించబడుతుంది. ఈ పద్ధతి మొదటి పరామీటర్‌గా పంపబడిన వాలెట్ నుండి (మా విషయంలో పంపినవారి వాలెట్) ఒక కాంట్రాక్ట్ యొక్క విస్తరణను అనుకరిస్తుంది. రెండవ పరామీటర్ పరీక్షించబడిన కాంట్రాక్ట్ యొక్క ABI మరియు బైట్‌కోడ్ - మేము `build` డైరెక్టరీ నుండి కంపైల్ చేయబడిన EtherSplitter కాంట్రాక్ట్ యొక్క json ఫైల్‌ను అక్కడ పంపుతాము. మూడవ పరామీటర్ కాంట్రాక్ట్ యొక్క కన్‌స్ట్రక్టర్ ఆర్గ్యుమెంట్‌లతో కూడిన ఒక శ్రేణి, ఇది మా విషయంలో, రిసీవర్ల యొక్క రెండు చిరునామాలు.

## బ్యాలెన్స్‌లను మార్చండి {#changebalances}

మొదట, స్ప్లిట్ పద్ధతి వాస్తవానికి రిసీవర్ల వాలెట్ల బ్యాలెన్స్‌లను మారుస్తుందో లేదో తనిఖీ చేస్తాము. మేము పంపినవారి ఖాతా నుండి 50 wei విభజిస్తే, ఇద్దరు రిసీవర్ల బ్యాలెన్స్‌లు 25 wei పెరగాలని మేము ఆశిస్తాము. మేము Waffle యొక్క `changeBalances` మ్యాచర్‌ను ఉపయోగిస్తాము:

```ts
it("ఖాతాల బ్యాలెన్స్‌లను మారుస్తుంది", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

మ్యాచర్ యొక్క మొదటి పరామీటర్‌గా, మేము రిసీవర్ల వాలెట్ల శ్రేణిని పంపుతాము, మరియు రెండవదిగా - సంబంధిత ఖాతాలపై ఆశించిన పెరుగుదలల శ్రేణి.
ఒక నిర్దిష్ట వాలెట్ యొక్క బ్యాలెన్స్‌ను తనిఖీ చేయాలనుకుంటే, మేము `changeBalance` మ్యాచర్‌ను కూడా ఉపయోగించవచ్చు, దీనికి క్రింది ఉదాహరణలో వలె శ్రేణులను పంపడం అవసరం లేదు:

```ts
it("ఖాతా బ్యాలెన్స్‌ను మారుస్తుంది", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

`changeBalance` మరియు `changeBalances` రెండింటి సందర్భాల్లోనూ మేము స్ప్లిట్ ఫంక్షన్‌ను కాల్‌బ్యాక్‌గా పంపుతామని గమనించండి, ఎందుకంటే మ్యాచర్‌కు కాల్‌కు ముందు మరియు తరువాత బ్యాలెన్స్‌ల స్థితిని యాక్సెస్ చేయాలి.

తరువాత, ప్రతి wei బదిలీ తర్వాత బదిలీ ఈవెంట్ జారీ చేయబడిందా అని మేము పరీక్షిస్తాము. మేము Waffle నుండి మరొక మ్యాచర్‌కు వెళ్తాము:

## జారీ చేయి {#emit}

```ts
it("మొదటి రిసీవర్‌కు బదిలీపై ఈవెంట్‌ను జారీ చేస్తుంది", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("రెండవ రిసీవర్‌కు బదిలీపై ఈవెంట్‌ను జారీ చేస్తుంది", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` మ్యాచర్ ఒక పద్ధతిని కాల్ చేసినప్పుడు కాంట్రాక్ట్ ఒక ఈవెంట్‌ను జారీ చేసిందో లేదో తనిఖీ చేయడానికి మాకు అనుమతిస్తుంది. `emit` మ్యాచర్‌కు పరామీటర్లుగా, ఈవెంట్‌ను జారీ చేస్తుందని మేము ఊహించిన మాక్ కాంట్రాక్ట్‌ను, ఆ ఈవెంట్ పేరుతో పాటు అందిస్తాము. మా విషయంలో, మాక్ కాంట్రాక్ట్ `స్ప్లిట్టర్` మరియు ఈవెంట్ పేరు - `Transfer`. ఈవెంట్ జారీ చేయబడిన ఆర్గ్యుమెంట్‌ల యొక్క ఖచ్చితమైన విలువలను కూడా మేము ధృవీకరించవచ్చు - మా ఈవెంట్ డిక్లరేషన్ ఆశించినన్ని ఆర్గ్యుమెంట్‌లను `withArgs` మ్యాచర్‌కు పంపుతాము. EtherSplitter కాంట్రాక్ట్ విషయంలో, మేము పంపినవారు మరియు రిసీవర్ యొక్క చిరునామాలను బదిలీ చేయబడిన wei మొత్తంతో పాటు పంపుతాము.

## తో వెనక్కు తిరిగింది {#revertedwith}

చివరి ఉదాహరణగా, సరిగా లేని wei సంఖ్య విషయంలో లావాదేవీ వెనక్కి తిరిగిందో లేదో తనిఖీ చేస్తాము. మేము `revertedWith` మ్యాచర్‌ను ఉపయోగిస్తాము:

```ts
it("Vei మొత్తం సరిగా లేనప్పుడు తిరిగి వస్తుంది", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "సరిగా లేని wei మొత్తం అనుమతించబడదు"
  )
})
```

పరీక్ష, ఉత్తీర్ణత సాధిస్తే, లావాదేవీ వాస్తవంగా వెనక్కి తిరిగిందని మాకు హామీ ఇస్తుంది. అయితే, మేము `require` స్టేట్‌మెంట్‌లో పంపిన సందేశాలు మరియు `revertedWith` లో మనం ఆశించే సందేశం మధ్య ఖచ్చితమైన సరిపోలిక కూడా ఉండాలి. మేము EtherSplitter కాంట్రాక్ట్ కోడ్‌కు తిరిగి వెళితే, wei మొత్తం కోసం `require` స్టేట్‌మెంట్‌లో, మేము ఈ సందేశాన్ని అందిస్తాము: 'సరిగా లేని wei మొత్తం అనుమతించబడదు'. ఇది మా పరీక్షలో మేము ఆశించే సందేశంతో సరిపోలుతుంది. అవి సమానంగా లేకపోతే, పరీక్ష విఫలమవుతుంది.

## అభినందనలు! {#congratulations}

మీరు Waffleతో స్మార్ట్ కాంట్రాక్టులను పరీక్షించడం వైపు మీ మొదటి పెద్ద అడుగు వేశారు!
