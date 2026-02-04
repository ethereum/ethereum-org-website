---
title: "Waffle: डायनॅमिक मॉकिंग आणि कॉन्ट्रॅक्ट कॉल्सची चाचणी"
description: डायनॅमिक मॉकिंग आणि कॉन्ट्रॅक्ट कॉल्सच्या चाचणीसाठी प्रगत Waffle ट्यूटोरियल
author: "डॅनियल इझडेब्स्की"
tags:
  [
    "waffle",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "सॉलिडिटी",
    "चाचणी",
    "मॉक करणे"
  ]
skill: intermediate
lang: mr
published: 2020-11-14
---

## हे ट्यूटोरियल कशाबद्दल आहे? {#what-is-this-tutorial-about}

या ट्यूटोरियलमध्ये तुम्ही हे कसे करायचे ते शिकाल:

- डायनॅमिक मॉकिंगचा वापर करणे
- स्मार्ट कॉन्ट्रॅक्ट्समधील संवादांची चाचणी घेणे

गृहीतके:

- तुम्हाला `Solidity` मध्ये साधा स्मार्ट कॉन्ट्रॅक्ट कसा लिहायचा हे आधीच माहीत आहे
- तुम्हाला `JavaScript` आणि `TypeScript` ची माहिती आहे
- तुम्ही इतर `Waffle` ट्यूटोरियल्स केले आहेत किंवा त्याबद्दल तुम्हाला थोडेफार माहीत आहे

## डायनॅमिक मॉकिंग {#dynamic-mocking}

डायनॅमिक मॉकिंग उपयुक्त का आहे? बरं, ते आपल्याला इंटिग्रेशन टेस्ट्सऐवजी युनिट टेस्ट्स लिहिण्याची परवानगी देते. याचा अर्थ काय? याचा अर्थ असा आहे की आपल्याला स्मार्ट कॉन्ट्रॅक्टच्या अवलंबनांबद्दल (dependencies) काळजी करण्याची गरज नाही, त्यामुळे आपण त्या सर्वांची पूर्णपणे वेगळे ठेवून चाचणी घेऊ शकतो. तुम्ही हे नक्की कसे करू शकता, हे मी तुम्हाला दाखवतो.

### **१.** प्रोजेक्ट\*\* {#1-project}

सुरू करण्यापूर्वी, आपल्याला एक साधा node.js प्रोजेक्ट तयार करणे आवश्यक आहे:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

चला typescript आणि test dependencies - mocha आणि chai जोडून सुरुवात करूया:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

आता `Waffle` आणि `ethers` जोडूया:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

तुमच्या प्रोजेक्टची रचना आता अशी दिसली पाहिजे:

```
.
├── contracts
├── package.json
└── test
```

### **२.** स्मार्ट कॉन्ट्रॅक्ट\*\* {#2-smart-contract}

डायनॅमिक मॉकिंग सुरू करण्यासाठी, आपल्याला अवलंबित्व (dependencies) असलेल्या स्मार्ट कॉन्ट्रॅक्टची आवश्यकता आहे. काळजी करू नका, मी सर्व तयारी केली आहे!

येथे `Solidity` मध्ये लिहिलेला एक साधा स्मार्ट कॉन्ट्रॅक्ट आहे, ज्याचा एकमेव उद्देश आपण श्रीमंत आहोत की नाही हे तपासणे आहे. आपल्याकडे पुरेसे टोकन्स आहेत की नाही हे तपासण्यासाठी ते ERC20 टोकन वापरते. ते `./contracts/AmIRichAlready.sol` मध्ये ठेवा.

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

आपल्याला डायनॅमिक मॉकिंग वापरायचे असल्यामुळे, आपल्याला संपूर्ण ERC20 ची गरज नाही, म्हणूनच आपण फक्त एका फंक्शनसह IERC20 इंटरफेस वापरत आहोत.

हा कॉन्ट्रॅक्ट तयार करण्याची वेळ झाली आहे! त्यासाठी आपण `Waffle` वापरणार आहोत. प्रथम, आपण एक साधी `waffle.json` कॉन्फिग फाइल तयार करणार आहोत जी कंपाईलेशन पर्याय निर्दिष्ट करते.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

आता आपण Waffle सह कॉन्ट्रॅक्ट तयार करण्यासाठी सज्ज आहोत:

```bash
npx waffle
```

सोपे आहे, नाही का? `build/` फोल्डरमध्ये कॉन्ट्रॅक्ट आणि इंटरफेसशी संबंधित दोन फाइल्स दिसू लागल्या. चाचणीसाठी आपण त्यांचा वापर नंतर करणार आहोत.

### **३.** चाचणी\*\* {#3-testing}

प्रत्यक्ष चाचणीसाठी `AmIRichAlready.test.ts` नावाची फाइल तयार करूया. सर्वप्रथम, आपल्याला इम्पोर्ट्स हाताळावे लागतील. आपल्याला नंतर त्यांची आवश्यकता असेल:

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

JS अवलंबित्व वगळता, आपल्याला आपला तयार केलेला कॉन्ट्रॅक्ट आणि इंटरफेस इम्पोर्ट करणे आवश्यक आहे:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

चाचणीसाठी Waffle `chai` वापरते. तथापि, आपण ते वापरण्यापूर्वी, आपल्याला Waffle चे मॅचर्स थेट chai मध्ये इंजेक्ट करावे लागतील:

```typescript
use(solidity)
```

आपल्याला `beforeEach()` फंक्शन लागू करण्याची आवश्यकता आहे, जे प्रत्येक चाचणीपूर्वी कॉन्ट्रॅक्टची स्थिती (state) रीसेट करेल. चला आधी विचार करूया की आपल्याला तिथे कशाची गरज आहे. कॉन्ट्रॅक्ट डिप्लॉय करण्यासाठी आपल्याला दोन गोष्टींची आवश्यकता आहे: एक वॉलेट आणि एक डिप्लॉय केलेला ERC20 कॉन्ट्रॅक्ट, जो `AmIRichAlready` कॉन्ट्रॅक्टसाठी एक आर्गुमेंट म्हणून पास करता येईल.

प्रथम, आपण एक वॉलेट तयार करतो:

```typescript
const [wallet] = new MockProvider().getWallets()
```

मग आपल्याला ERC20 कॉन्ट्रॅक्ट डिप्लॉय करण्याची आवश्यकता आहे. येथे एक अवघड गोष्ट आहे - आपल्याकडे फक्त एक इंटरफेस आहे. इथेच Waffle आपल्या मदतीला येतो. Waffle मध्ये एक जादुई `deployMockContract()` फंक्शन आहे जे केवळ इंटरफेसच्या _abi_ चा वापर करून कॉन्ट्रॅक्ट तयार करते:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

आता वॉलेट आणि डिप्लॉय केलेला ERC20 या दोन्हींसह, आपण `AmIRichAlready` कॉन्ट्रॅक्ट डिप्लॉय करू शकतो:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

या सर्वांसह, आपले `beforeEach()` फंक्शन पूर्ण झाले आहे. आतापर्यंत तुमची `AmIRichAlready.test.ts` फाइल अशी दिसली पाहिजे:

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

`AmIRichAlready` कॉन्ट्रॅक्टसाठी पहिली चाचणी लिहूया. तुम्हाला काय वाटते, आपली चाचणी कशाबद्दल असावी? होय, तुमचे बरोबर आहे! आपण आधीच श्रीमंत आहोत की नाही हे तपासले पाहिजे :)

पण एक मिनिट थांबा. आपल्या मॉक्ड कॉन्ट्रॅक्टला कोणती मूल्ये परत करायची आहेत हे कसे कळेल? आपण `balanceOf()` फंक्शनसाठी कोणतीही लॉजिक लागू केलेली नाही. येथे पुन्हा Waffle मदत करू शकते. आपल्या मॉक्ड कॉन्ट्रॅक्टमध्ये आता काही नवीन आकर्षक गोष्टी आहेत:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

या माहितीसह आपण अखेरीस आपली पहिली चाचणी लिहू शकतो:

```typescript
it("जर वॉलेटमध्ये 1000000 पेक्षा कमी टोकन असतील तर false परत करते", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

चला ही चाचणी भागांमध्ये विभागूया:

1. आपण आपला मॉक्ड ERC20 कॉन्ट्रॅक्ट नेहमी 999999 टोकनची शिल्लक (बॅलन्स) परत करण्यासाठी सेट करतो.
2. `contract.check()` पद्धत `false` परत करते की नाही ते तपासा.

हे सुरू करण्यासाठी आपण तयार आहोत:

![एक चाचणी यशस्वी](./test-one.png)

तर चाचणी काम करत आहे, पण... अजूनही सुधारणेला वाव आहे. `balanceOf()` फंक्शन नेहमी 999999 परत करेल. आपण एका विशिष्ट वॉलेटसाठी फंक्शनने काय परत करावे हे नमूद करून त्यात सुधारणा करू शकतो - अगदी खऱ्या कॉन्ट्रॅक्टप्रमाणे:

```typescript
it("जर वॉलेटमध्ये 1000001 पेक्षा कमी टोकन असतील तर false परत करते", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

आतापर्यंत, आपण फक्त अशा स्थितीची चाचणी केली आहे जिथे आपण पुरेसे श्रीमंत नाही. चला याच्या उलट चाचणी घेऊया:

```typescript
it("जर वॉलेटमध्ये किमान 1000001 टोकन असतील तर true परत करते", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

तुम्ही चाचण्या चालवता...

![दोन चाचण्या यशस्वी](test-two.png)

...आणि हे बघा! आपला कॉन्ट्रॅक्ट अपेक्षेप्रमाणे काम करत आहे असे दिसते :)

## कॉन्ट्रॅक्ट कॉल्सची चाचणी {#testing-contract-calls}

आपण आतापर्यंत काय केले आहे याचा सारांश घेऊया. आपण आपल्या `AmIRichAlready` कॉन्ट्रॅक्टच्या कार्यक्षमतेची चाचणी घेतली आहे आणि ते योग्यरित्या काम करत असल्याचे दिसते. म्हणजे आपले काम झाले, बरोबर? अगदी नाही! Waffle आपल्याला आपल्या कॉन्ट्रॅक्टची आणखी चाचणी घेण्याची परवानगी देते. पण नक्की कसे? बरं, Waffle च्या भांडारात `calledOnContract()` आणि `calledOnContractWith()` मॅचर्स आहेत. आपल्या कॉन्ट्रॅक्टने ERC20 मॉक्ड कॉन्ट्रॅक्टला कॉल केला आहे की नाही हे तपासण्याची ते आपल्याला परवानगी देतील. या मॅचर्सपैकी एकासह येथे एक मूलभूत चाचणी दिली आहे:

```typescript
it("कॉन्ट्रॅक्टने ERC20 टोकनवर balanceOf कॉल केला आहे की नाही हे तपासते", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

मी तुम्हाला सांगितलेल्या दुसऱ्या मॅचरने आपण आणखी पुढे जाऊन ही चाचणी सुधारू शकतो:

```typescript
it("कॉन्ट्रॅक्टने ERC20 टोकनवर विशिष्ट वॉलेटसह balanceOf कॉल केला आहे की नाही हे तपासते", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

चला चाचण्या बरोबर आहेत की नाही ते तपासूया:

![तीन चाचण्या यशस्वी](test-three.png)

छान, सर्व चाचण्या यशस्वी झाल्या आहेत.

Waffle सह कॉन्ट्रॅक्ट कॉल्सची चाचणी घेणे खूप सोपे आहे. आणि सर्वात चांगली गोष्ट ही आहे. हे मॅचर्स सामान्य आणि मॉक्ड दोन्ही कॉन्ट्रॅक्ट्ससोबत काम करतात! याचे कारण असे आहे की Waffle इतर तंत्रज्ञानासाठी लोकप्रिय चाचणी लायब्ररींप्रमाणे कोड इंजेक्ट करण्याऐवजी EVM कॉल्सची नोंद ठेवते आणि फिल्टर करते.

## अंतिम टप्पा {#the-finish-line}

अभिनंदन! आता तुम्हाला कॉन्ट्रॅक्ट कॉल्सची चाचणी घेण्यासाठी आणि कॉन्ट्रॅक्ट्सना डायनॅमिकपणे मॉक करण्यासाठी Waffle कसे वापरावे हे माहित झाले आहे. शोधण्यासाठी आणखी बरीच मनोरंजक वैशिष्ट्ये आहेत. मी Waffle च्या डॉक्युमेंटेशनमध्ये अधिक माहिती घेण्याची शिफारस करतो.

Waffle चे डॉक्युमेंटेशन [येथे](https://ethereum-waffle.readthedocs.io/) उपलब्ध आहे.

या ट्यूटोरियलसाठी सोर्स कोड [येथे](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) मिळू शकेल.

तुम्हाला यातही स्वारस्य असू शकेल अशी ट्यूटोरियल्स:

- [Waffle सह स्मार्ट कॉन्ट्रॅक्टची चाचणी](/developers/tutorials/waffle-test-simple-smart-contract/)
