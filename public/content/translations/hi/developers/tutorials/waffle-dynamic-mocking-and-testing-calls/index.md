---
title: "Waffle: डायनामिक मॉकिंग और अनुबंध कॉल का परीक्षण"
description: "डायनामिक मॉकिंग और अनुबंध कॉल के परीक्षण के लिए उन्नत Waffle ट्यूटोरियल"
author: "Daniel Izdebski"
tags:
  [
    "वफ़ल",
    "स्मार्ट अनुबंध",
    "सोलिडीटी",
    "परिक्षण",
    "मॉक करना"
  ]
skill: intermediate
lang: hi
published: 2020-11-14
---

## यह ट्यूटोरियल किस बारे में है? {#what-is-this-tutorial-about}

इस ट्यूटोरियल में आप सीखेंगे कि कैसे:

- डायनामिक मॉकिंग का उपयोग करें
- स्मार्ट अनुबंधों के बीच इंटरैक्शन का परीक्षण करें

धारणाएँ:

- आप पहले से ही `Solidity` में एक सरल स्मार्ट अनुबंध लिखना जानते हैं
- आप `JavaScript` और `TypeScript` से परिचित हैं
- आपने अन्य `Waffle` ट्यूटोरियल किए हैं या इसके बारे में एक या दो बातें जानते हैं

## डायनामिक मॉकिंग {#dynamic-mocking}

डायनामिक मॉकिंग उपयोगी क्यों है? खैर, यह हमें एकीकरण परीक्षणों के बजाय यूनिट परीक्षण लिखने की अनुमति देता है। इसका क्या मतलब है? इसका मतलब है कि हमें स्मार्ट अनुबंधों की निर्भरता के बारे में चिंता करने की ज़रूरत नहीं है, इस प्रकार हम उन सभी का पूरी तरह से अलगाव में परीक्षण कर सकते हैं। मैं आपको दिखाता हूँ कि आप इसे ठीक से कैसे कर सकते हैं।

### **1.** परियोजना\*\* {#1-project}

शुरू करने से पहले हमें एक सरल node.js परियोजना तैयार करने की आवश्यकता है:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# या यदि आप npm का उपयोग कर रहे हैं
npm init
```

आइए टाइपस्क्रिप्ट और परीक्षण निर्भरता - mocha और chai जोड़ने के साथ शुरू करें:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# या यदि आप npm का उपयोग कर रहे हैं
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

अब आइए `Waffle` और `ethers` जोड़ें:

```bash
yarn add --dev ethereum-waffle ethers
# या यदि आप npm का उपयोग कर रहे हैं
npm install ethereum-waffle ethers --save-dev
```

आपकी परियोजना संरचना अब इस तरह दिखनी चाहिए:

```
.
├── contracts
├── package.json
└── test
```

### **2.** स्मार्ट अनुबंध\*\* {#2-smart-contract}

डायनामिक मॉकिंग शुरू करने के लिए, हमें निर्भरता वाले स्मार्ट अनुबंध की आवश्यकता है। चिंता न करें, मैंने इसका इंतजाम कर लिया है!

यहाँ `Solidity` में लिखा गया एक सरल स्मार्ट अनुबंध है जिसका एकमात्र उद्देश्य यह जांचना है कि क्या हम अमीर हैं। यह यह जांचने के लिए ERC20 टोकन का उपयोग करता है कि क्या हमारे पास पर्याप्त टोकन हैं। इसे `./contracts/AmIRichAlready.sol` में रखें।

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

चूंकि हम डायनामिक मॉकिंग का उपयोग करना चाहते हैं, हमें पूरे ERC20 की आवश्यकता नहीं है, इसीलिए हम केवल एक फ़ंक्शन के साथ IERC20 इंटरफ़ेस का उपयोग कर रहे हैं।

इस अनुबंध को बनाने का समय आ गया है! उसके लिए हम `Waffle` का उपयोग करेंगे। सबसे पहले, हम एक सरल `waffle.json` कॉन्फिग फाइल बनाएंगे जो संकलन विकल्पों को निर्दिष्ट करती है।

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

अब हम Waffle के साथ अनुबंध बनाने के लिए तैयार हैं:

```bash
npx waffle
```

आसान है, है न? `build/` फ़ोल्डर में अनुबंध और इंटरफ़ेस के अनुरूप दो फाइलें दिखाई दीं। हम बाद में परीक्षण के लिए उनका उपयोग करेंगे।

### **3.** परीक्षण\*\* {#3-testing}

आइए वास्तविक परीक्षण के लिए `AmIRichAlready.test.ts` नामक एक फ़ाइल बनाएं। सबसे पहले, हमें इम्पोर्ट को संभालना होगा। हमें बाद में उनकी आवश्यकता होगी:

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

JS निर्भरता के अलावा, हमें अपने निर्मित अनुबंध और इंटरफ़ेस को आयात करने की आवश्यकता है:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

`Waffle` परीक्षण के लिए `chai` का उपयोग करता है। हालांकि, इसका उपयोग करने से पहले, हमें `Waffle` के मैचर्स को `chai` में ही इंजेक्ट करना होगा:

```typescript
use(solidity)
```

हमें `beforeEach()` फ़ंक्शन को लागू करने की आवश्यकता है जो प्रत्येक परीक्षण से पहले अनुबंध की स्थिति को रीसेट करेगा। आइए पहले सोचते हैं कि हमें वहां क्या चाहिए। एक अनुबंध को डिप्लॉय करने के लिए हमें दो चीजों की आवश्यकता है: एक वॉलेट और `AmIRichAlready` अनुबंध के लिए एक तर्क के रूप में पास करने के लिए एक डिप्लॉय किया गया ERC20 अनुबंध।

सबसे पहले हम एक वॉलेट बनाते हैं:

```typescript
const [wallet] = new MockProvider().getWallets()
```

फिर हमें एक ERC20 अनुबंध को डिप्लॉय करने की आवश्यकता है। यहाँ मुश्किल हिस्सा है - हमारे पास केवल एक इंटरफ़ेस है। यह वह हिस्सा है जहां `Waffle` हमें बचाने के लिए आता है। `Waffle` में एक जादुई `deployMockContract()` फ़ंक्शन है जो केवल इंटरफ़ेस के _abi_ का उपयोग करके एक अनुबंध बनाता है:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

अब वॉलेट और डिप्लॉय किए गए ERC20 दोनों के साथ, हम आगे बढ़ सकते हैं और `AmIRichAlready` अनुबंध को डिप्लॉय कर सकते हैं:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

इन सब के साथ, हमारा `beforeEach()` फ़ंक्शन समाप्त हो गया है। अब तक आपकी `AmIRichAlready.test.ts` फ़ाइल इस तरह दिखनी चाहिए:

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

आइए `AmIRichAlready` अनुबंध के लिए पहला परीक्षण लिखें। आपको क्या लगता है कि हमारा परीक्षण किस बारे में होना चाहिए? हाँ, आप सही हैं! हमें जांचना चाहिए कि क्या हम पहले से ही अमीर हैं :)

लेकिन एक सेकंड रुकिए। हमारे मॉक्ड अनुबंध को कैसे पता चलेगा कि कौन से मान वापस करने हैं? हमने `balanceOf()` फ़ंक्शन के लिए कोई तर्क लागू नहीं किया है। फिर से, `Waffle` यहाँ मदद कर सकता है। हमारे मॉक्ड अनुबंध में अब कुछ नई फैंसी चीजें हैं:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

इस ज्ञान के साथ हम अंततः अपना पहला परीक्षण लिख सकते हैं:

```typescript
it("यदि वॉलेट में 1000000 से कम टोकन हैं तो गलत लौटाता है", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

आइए इस परीक्षण को भागों में तोड़ें:

1. हम अपने मॉक ERC20 अनुबंध को हमेशा 999999 टोकन का बैलेंस लौटाने के लिए सेट करते हैं।
2. जांचें कि क्या `contract.check()` विधि `false` लौटाती है।

हम इसे शुरू करने के लिए तैयार हैं:

![एक परीक्षण पास हो रहा है](./test-one.png)

तो परीक्षण काम करता है, लेकिन... अभी भी सुधार की कुछ गुंजाइश है। `balanceOf()` फ़ंक्शन हमेशा 99999 लौटाएगा। हम इसे एक वॉलेट निर्दिष्ट करके सुधार सकते हैं जिसके लिए फ़ंक्शन को कुछ लौटाना चाहिए - ठीक एक वास्तविक अनुबंध की तरह:

```typescript
it("यदि वॉलेट में 1000001 से कम टोकन हैं तो गलत लौटाता है", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

अब तक, हमने केवल उस मामले का परीक्षण किया है जहां हम पर्याप्त अमीर नहीं हैं। आइए इसके बजाय विपरीत का परीक्षण करें:

```typescript
it("यदि वॉलेट में कम से कम 1000001 टोकन हैं तो सही लौटाता है", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

आप परीक्षण चलाते हैं...

![दो परीक्षण पास हो रहे हैं](test-two.png)

...और यह रहा परिणाम! हमारा अनुबंध इरादे के अनुसार काम करता प्रतीत होता है :)

## अनुबंध कॉल का परीक्षण {#testing-contract-calls}

आइए अब तक जो किया है उसका सारांश दें। हमने अपने `AmIRichAlready` अनुबंध की कार्यक्षमता का परीक्षण किया है और यह ठीक से काम करता प्रतीत होता है। इसका मतलब है कि हमारा काम हो गया, है न? पूरी तरह से नहीं! `Waffle` हमें अपने अनुबंध का और भी परीक्षण करने की अनुमति देता है। लेकिन ठीक कैसे? खैर, `Waffle` के शस्त्रागार में `calledOnContract()` और `calledOnContractWith()` मैचर्स हैं। वे हमें यह जांचने की अनुमति देंगे कि क्या हमारे अनुबंध ने ERC20 मॉक अनुबंध को कॉल किया है। इनमें से एक मैचर के साथ यहाँ एक बुनियादी परीक्षण है:

```typescript
it("जांचता है कि क्या अनुबंध ने ERC20 टोकन पर balanceOf को कॉल किया है", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

हम और भी आगे जा सकते हैं और इस परीक्षण को दूसरे मैचर के साथ सुधार सकते हैं जिसके बारे में मैंने आपको बताया था:

```typescript
it("जांचता है कि क्या अनुबंध ने ERC20 टोकन पर निश्चित वॉलेट के साथ balanceOf को कॉल किया है", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

आइए जांचें कि क्या परीक्षण सही हैं:

![तीन परीक्षण पास हो रहे हैं](test-three.png)

बहुत बढ़िया, सभी परीक्षण हरे हैं।

`Waffle` के साथ अनुबंध कॉल का परीक्षण करना बहुत आसान है। और यहाँ सबसे अच्छी बात है। ये मैचर्स सामान्य और मॉक्ड दोनों अनुबंधों के साथ काम करते हैं! ऐसा इसलिए है क्योंकि `Waffle` EVM कॉल को रिकॉर्ड और फ़िल्टर करता है, न कि कोड इंजेक्ट करता है, जैसा कि अन्य तकनीकों के लिए लोकप्रिय परीक्षण पुस्तकालयों के मामले में होता है।

## अंतिम रेखा {#the-finish-line}

बधाई हो! अब आप जानते हैं कि अनुबंध कॉल का परीक्षण करने और अनुबंधों को गतिशील रूप से मॉक करने के लिए `Waffle` का उपयोग कैसे करें। खोजने के लिए और भी बहुत सी दिलचस्प सुविधाएँ हैं। मैं `Waffle` के प्रलेखन में गोता लगाने की सलाह देता हूँ।

`Waffle` का प्रलेखन [यहाँ](https://ethereum-waffle.readthedocs.io/) उपलब्ध है।

इस ट्यूटोरियल के लिए स्रोत कोड [यहाँ](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) पाया जा सकता है।

ट्यूटोरियल जिनमें आपकी रुचि भी हो सकती है:

- [Waffle के साथ स्मार्ट अनुबंधों का परीक्षण](/developers/tutorials/waffle-test-simple-smart-contract/)
