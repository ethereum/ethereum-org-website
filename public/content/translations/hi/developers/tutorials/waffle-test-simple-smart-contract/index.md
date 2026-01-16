---
title: Waffle लाइब्रेरी के साथ सरल स्मार्ट अनुबंध का परीक्षण
description: शुरुआती लोगों के लिए ट्यूटोरियल
author: Ewa Kowalska
tags: [ "स्मार्ट अनुबंध", "सोलिडीटी", "Waffle", "परिक्षण" ]
skill: beginner
lang: hi
published: 2021-02-26
---

## इस ट्यूटोरियल में आप सीखेंगे कि कैसे {#in-this-tutorial-youll-learn-how-to}

- वॉलेट बैलेंस के बदलावों का परीक्षण करें
- निर्दिष्ट तर्कों के साथ इवेंट्स के उत्सर्जन का परीक्षण करें
- यह पुष्टि करें कि एक लेनदेन को रिवर्ट कर दिया गया था

## मान्यताएँ {#assumptions}

- आप एक नया JavaScript या TypeScript प्रोजेक्ट बना सकते हैं
- आपके पास JavaScript में परीक्षणों का कुछ बुनियादी अनुभव है
- आपने yarn या npm जैसे कुछ पैकेज मैनेजरों का उपयोग किया है
- आपके पास स्मार्ट अनुबंधों और Solidity का बहुत ही बुनियादी ज्ञान है

## शुरुआत करना {#getting-started}

यह ट्यूटोरियल yarn का उपयोग करके परीक्षण सेटअप और रन को दर्शाता है, लेकिन यदि आप npm पसंद करते हैं तो कोई समस्या नहीं है - मैं आधिकारिक Waffle [प्रलेखन](https://ethereum-waffle.readthedocs.io/en/latest/index.html) का उचित संदर्भ प्रदान करूंगा।

## निर्भरताएँ इंस्टॉल करें {#install-dependencies}

अपने प्रोजेक्ट की dev निर्भरताओं में ethereum-waffle और typescript निर्भरताएँ [जोड़ें](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)।

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## उदाहरण स्मार्ट अनुबंध {#example-smart-contract}

ट्यूटोरियल के दौरान हम एक सरल स्मार्ट अनुबंध उदाहरण - EtherSplitter पर काम करेंगे। यह किसी को भी कुछ wei भेजने और इसे दो पूर्वनिर्धारित रिसीवरों के बीच समान रूप से विभाजित करने की अनुमति देने के अलावा और कुछ नहीं करता है।
स्प्लिट फ़ंक्शन के लिए यह आवश्यक है कि wei की संख्या सम हो, अन्यथा यह रिवर्ट हो जाएगा। दोनों रिसीवरों के लिए यह एक wei ट्रांसफर करता है, जिसके बाद ट्रांसफर इवेंट का उत्सर्जन होता है।

EtherSplitter कोड के स्निपेट को `src/EtherSplitter.sol` में रखें।

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
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## अनुबंध को कंपाइल करें {#compile-the-contract}

अनुबंध को [कंपाइल करने](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) के लिए package.json फ़ाइल में निम्नलिखित प्रविष्टि जोड़ें:

```json
"scripts": {
    "build": "waffle"
  }
```

अगला, प्रोजेक्ट रूट डायरेक्टरी में Waffle कॉन्फ़िगरेशन फ़ाइल बनाएँ - `waffle.json` - और फिर वहाँ निम्नलिखित कॉन्फ़िगरेशन पेस्ट करें:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` चलाएँ। परिणामस्वरूप, JSON प्रारूप में EtherSplitter कंपाइल किए गए अनुबंध के साथ `build` डायरेक्टरी दिखाई देगी।

## परीक्षण सेटअप {#test-setup}

Waffle के साथ परीक्षण के लिए Chai मैचर्स और Mocha का उपयोग करना आवश्यक है, इसलिए आपको उन्हें अपने प्रोजेक्ट में [जोड़ना](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) होगा। अपनी package.json फ़ाइल को अपडेट करें और स्क्रिप्ट्स भाग में `test` प्रविष्टि जोड़ें:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

यदि आप अपने परीक्षणों को [निष्पादित](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) करना चाहते हैं, तो बस `yarn test` चलाएँ।

## परीक्षण {#testing}

अब `test` डायरेक्टरी बनाएँ और नई फ़ाइल `test\EtherSplitter.test.ts` बनाएँ।
नीचे दिए गए स्निपेट को कॉपी करें और इसे हमारी परीक्षण फ़ाइल में पेस्ट करें।

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // यहां परीक्षण जोड़ें
})
```

शुरू करने से पहले कुछ शब्द।
`MockProvider` ब्लॉकचेन का एक मॉक संस्करण प्रदान करता है। यह मॉक वॉलेट भी प्रदान करता है जो हमें EtherSplitter अनुबंध का परीक्षण करने के लिए काम आएंगे। हम प्रोवाइडर पर `getWallets()` विधि को कॉल करके दस वॉलेट तक प्राप्त कर सकते हैं। उदाहरण में, हम तीन वॉलेट प्राप्त करते हैं - प्रेषक के लिए और दो रिसीवरों के लिए।

अगला, हम 'स्प्लिटर' नामक एक चर घोषित करते हैं - यह हमारा मॉक EtherSplitter अनुबंध है। यह `deployContract` विधि द्वारा एक एकल परीक्षण के प्रत्येक निष्पादन से पहले बनाया जाता है। यह विधि पहले पैरामीटर के रूप में पास किए गए वॉलेट (हमारे मामले में प्रेषक का वॉलेट) से एक अनुबंध की तैनाती का अनुकरण करती है। दूसरा पैरामीटर परीक्षण किए गए अनुबंध का ABI और बाइटकोड है - हम वहां `build` डायरेक्टरी से कंपाइल किए गए EtherSplitter अनुबंध की json फ़ाइल पास करते हैं। तीसरा पैरामीटर अनुबंध के कंस्ट्रक्टर तर्कों के साथ एक ऐरे है, जो हमारे मामले में, रिसीवरों के दो पते हैं।

## changeBalances {#changebalances}

सबसे पहले, हम जांचेंगे कि क्या स्प्लिट विधि वास्तव में रिसीवरों के वॉलेट के बैलेंस को बदलती है। यदि हम प्रेषक के खाते से 50 wei विभाजित करते हैं, तो हम उम्मीद करेंगे कि दोनों रिसीवरों का बैलेंस 25 wei बढ़ जाएगा। हम Waffle के `changeBalances` मैचर का उपयोग करेंगे:

```ts
it("खाता बैलेंस बदलता है", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

मैचर के पहले पैरामीटर के रूप में, हम रिसीवरों के वॉलेट का एक ऐरे पास करते हैं, और दूसरे के रूप में - संबंधित खातों पर अपेक्षित वृद्धि का एक ऐरे।
यदि हम किसी एक विशिष्ट वॉलेट का बैलेंस जांचना चाहते हैं, तो हम `changeBalance` मैचर का भी उपयोग कर सकते हैं, जिसके लिए ऐरे पास करने की आवश्यकता नहीं होती है, जैसा कि नीचे दिए गए उदाहरण में है:

```ts
it("खाता बैलेंस बदलता है", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

ध्यान दें कि `changeBalance` और `changeBalances` दोनों ही मामलों में हम स्प्लिट फ़ंक्शन को कॉलबैक के रूप में पास करते हैं क्योंकि मैचर को कॉल से पहले और बाद में बैलेंस की स्थिति तक पहुंचने की आवश्यकता होती है।

अगला, हम परीक्षण करेंगे कि क्या प्रत्येक wei के ट्रांसफर के बाद ट्रांसफर इवेंट उत्सर्जित हुआ था। हम Waffle से एक और मैचर की ओर रुख करेंगे:

## Emit {#emit}

```ts
it("पहले रिसीवर को ट्रांसफर पर इवेंट उत्सर्जित करता है", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("दूसरे रिसीवर को ट्रांसफर पर इवेंट उत्सर्जित करता है", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` मैचर हमें यह जांचने की अनुमति देता है कि क्या किसी अनुबंध ने एक विधि को कॉल करने पर एक इवेंट उत्सर्जित किया है। `emit` मैचर के पैरामीटर के रूप में, हम उस मॉक अनुबंध को प्रदान करते हैं जिसके बारे में हम भविष्यवाणी करते हैं कि वह इवेंट उत्सर्जित करेगा, उस इवेंट के नाम के साथ। हमारे मामले में, मॉक अनुबंध `splitter` है और इवेंट का नाम - `Transfer`। हम उन तर्कों के सटीक मानों को भी सत्यापित कर सकते हैं जिनके साथ इवेंट उत्सर्जित हुआ था - हम `withArgs` मैचर में उतने ही तर्क पास करते हैं, जितने हमारी इवेंट घोषणा अपेक्षा करती है। EtherSplitter अनुबंध के मामले में, हम ट्रांसफर किए गए wei राशि के साथ प्रेषक और रिसीवर के पते पास करते हैं।

## revertedWith {#revertedwith}

अंतिम उदाहरण के रूप में, हम जांचेंगे कि क्या wei की विषम संख्या के मामले में लेनदेन को रिवर्ट कर दिया गया था। हम `revertedWith` मैचर का उपयोग करेंगे:

```ts
it("जब Wei राशि विषम हो तो रिवर्ट हो जाता है", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

परीक्षण, यदि पास हो जाता है, तो हमें यह आश्वासन देगा कि लेनदेन वास्तव में रिवर्ट कर दिया गया था। हालाँकि, हमारे द्वारा `require` कथन में पास किए गए संदेशों और `revertedWith` में अपेक्षित संदेश के बीच एक सटीक मिलान भी होना चाहिए। यदि हम EtherSplitter अनुबंध के कोड पर वापस जाते हैं, तो wei राशि के लिए `require` कथन में, हम संदेश प्रदान करते हैं: 'Uneven wei amount not allowed'। यह उस संदेश से मेल खाता है जिसकी हम अपने परीक्षण में अपेक्षा करते हैं। यदि वे बराबर नहीं होते, तो परीक्षण विफल हो जाता।

## बधाई हो! {#congratulations}

आपने Waffle के साथ स्मार्ट अनुबंधों के परीक्षण की दिशा में अपना पहला बड़ा कदम उठाया है!
