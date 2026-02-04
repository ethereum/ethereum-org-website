---
title: Waffle लायब्ररीसह साध्या स्मार्ट कॉन्ट्रॅक्टची चाचणी करणे
description: नवशिक्यांसाठी ट्युटोरियल
author: Ewa Kowalska
tags: [ "स्मार्ट कॉन्ट्रॅक्ट", "सॉलिडिटी", "Waffle", "चाचणी" ]
skill: beginner
lang: mr
published: 2021-02-26
---

## या ट्युटोरियलमध्ये तुम्ही शिकाल की कसे {#in-this-tutorial-youll-learn-how-to}

- वॉलेट बॅलन्समधील बदलांची चाचणी करा
- निर्दिष्ट युक्तिवादांसह इव्हेंट्सच्या उत्सर्जनाची चाचणी करा
- एक व्यवहार परत फिरवला गेला आहे हे निश्चित करा

## गृहितके {#assumptions}

- तुम्ही एक नवीन JavaScript किंवा TypeScript प्रकल्प तयार करू शकता
- तुमच्याकडे JavaScript मधील चाचण्यांचा काही मूलभूत अनुभव आहे
- तुम्ही yarn किंवा npm सारखे काही पॅकेज व्यवस्थापक वापरले आहेत
- तुमच्याकडे स्मार्ट कॉन्ट्रॅक्ट्स आणि Solidity चे अतिशय मूलभूत ज्ञान आहे

## सुरुवात करणे {#getting-started}

या ट्युटोरियलमध्ये yarn वापरून टेस्ट सेटअप आणि रन कसे करायचे हे दाखवले आहे, पण जर तुम्ही npm ला प्राधान्य देत असाल तर काही हरकत नाही - मी अधिकृत Waffle [डॉक्युमेंटेशन](https://ethereum-waffle.readthedocs.io/en/latest/index.html) चे योग्य संदर्भ देईन.

## डिपेन्डन्सीज इन्स्टॉल करा {#install-dependencies}

तुमच्या प्रोजेक्टच्या डेव्हलपमेंट डिपेन्डन्सीजमध्ये ethereum-waffle आणि typescript डिपेन्डन्सीज [जोडा](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation).

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## उदाहरण स्मार्ट कॉन्ट्रॅक्ट {#example-smart-contract}

ट्युटोरियल दरम्यान आपण एका साध्या स्मार्ट कॉन्ट्रॅक्टच्या उदाहरणावर काम करू - EtherSplitter. हे कोणालाही काही wei पाठवण्याची आणि ते दोन पूर्वनिर्धारित रिसीव्हर्समध्ये समान रीतीने विभाजित करण्याव्यतिरिक्त फार काही करत नाही.
स्प्लिट फंक्शनला wei ची संख्या सम असणे आवश्यक आहे, अन्यथा ते परत फिरवले जाईल. दोन्ही रिसीव्हर्ससाठी, ते एक wei ट्रान्सफर करते आणि त्यानंतर Transfer इव्हेंटचे उत्सर्जन होते.

EtherSplitter कोडचा स्निपेट `src/EtherSplitter.sol` मध्ये ठेवा.

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
        require(msg.value % 2 == 0, 'विषम wei रक्कम परवानगी नाही');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## कॉन्ट्रॅक्ट कंपाईल करा {#compile-the-contract}

कॉन्ट्रॅक्ट [कंपाईल](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) करण्यासाठी package.json फाईलमध्ये खालील एंट्री जोडा:

```json
"scripts": {
    "build": "waffle"
  }
```

पुढे, प्रोजेक्टच्या रूट डिरेक्टरीमध्ये Waffle कॉन्फिगरेशन फाईल - `waffle.json` - तयार करा आणि नंतर तिथे खालील कॉन्फिगरेशन पेस्ट करा:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` चालवा. परिणामी, JSON फॉरमॅटमध्ये EtherSplitter च्या कंपाईल केलेल्या कॉन्ट्रॅक्टसह `build` डिरेक्टरी दिसेल.

## टेस्ट सेटअप {#test-setup}

Waffle सह चाचणी करण्यासाठी Chai मॅचर्स आणि Mocha वापरणे आवश्यक आहे, म्हणून तुम्हाला ते तुमच्या प्रोजेक्टमध्ये [जोडावे](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) लागतील. तुमची package.json फाईल अपडेट करा आणि स्क्रिप्ट्स विभागात `test` एंट्री जोडा:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

जर तुम्हाला तुमच्या चाचण्या [कार्यान्वित](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) करायच्या असतील, तर फक्त `yarn test` चालवा.

## चाचणी {#testing}

आता `test` डिरेक्टरी तयार करा आणि `test\EtherSplitter.test.ts` ही नवीन फाईल तयार करा.
खालील स्निपेट कॉपी करा आणि ते आपल्या टेस्ट फाईलमध्ये पेस्ट करा.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("इथर स्प्लिटर", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // चाचण्या इथे जोडा
})
```

आपण सुरू करण्यापूर्वी काही शब्द.
`MockProvider` ब्लॉकचेनची एक मॉक आवृत्ती प्रदान करतो. ते मॉक वॉलेट्स देखील प्रदान करते जे EtherSplitter कॉन्ट्रॅक्टच्या चाचणीसाठी आपल्याला उपयोगी पडतील. प्रोव्हायडरवर `getWallets()` पद्धत कॉल करून आपण दहा पर्यंत वॉलेट्स मिळवू शकतो. उदाहरणामध्ये, आपण तीन वॉलेट्स मिळवतो - सेंडरसाठी आणि दोन रिसीव्हर्ससाठी.

पुढे, आपण 'splitter' नावाचा एक व्हेरिएबल घोषित करतो - हा आपला मॉक EtherSplitter कॉन्ट्रॅक्ट आहे. `deployContract` पद्धतीद्वारे प्रत्येक एकाच चाचणीच्या अंमलबजावणीपूर्वी ते तयार केले जाते. ही पद्धत पहिला पॅरामीटर म्हणून पास केलेल्या वॉलेटमधून (आपल्या बाबतीत सेंडरचे वॉलेट) कॉन्ट्रॅक्टच्या डिप्लॉयमेंटचे सिम्युलेशन करते. दुसरा पॅरामीटर चाचणी केलेल्या कॉन्ट्रॅक्टचा ABI आणि बायटेकोड आहे - आपण तिथे `build` डिरेक्टरीमधून कंपाईल केलेल्या EtherSplitter कॉन्ट्रॅक्टची json फाईल पास करतो. तिसरा पॅरामीटर कॉन्ट्रॅक्टच्या कन्स्ट्रक्टर युक्तिवादांसह एक अ‍ॅरे आहे, जे आपल्या बाबतीत, रिसीव्हर्सचे दोन अ‍ॅड्रेस आहेत.

## changeBalances {#changebalances}

प्रथम, आपण तपासू की स्प्लिट पद्धत खरोखर रिसीव्हर्सच्या वॉलेट्समधील बॅलन्स बदलते का. जर आपण सेंडरच्या खात्यातून 50 wei विभाजित केले, तर आपण अपेक्षा करू की दोन्ही रिसीव्हर्सचा बॅलन्स 25 wei ने वाढेल. आपण Waffle चा `changeBalances` मॅचर वापरू:

```ts
it("खात्यांचे बॅलन्स बदलते", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

मॅचरचा पहिला पॅरामीटर म्हणून, आपण रिसीव्हर्सच्या वॉलेट्सचा एक अ‍ॅरे पास करतो, आणि दुसरा म्हणून - संबंधित खात्यांवरील अपेक्षित वाढीचा एक अ‍ॅरे.
जर आपल्याला एका विशिष्ट वॉलेटचा बॅलन्स तपासायचा असेल, तर आपण `changeBalance` मॅचर देखील वापरू शकतो, ज्याला खालील उदाहरणाप्रमाणे अ‍ॅरे पास करण्याची आवश्यकता नाही:

```ts
it("खात्याचा बॅलन्स बदलते", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

लक्षात घ्या की `changeBalance` आणि `changeBalances` या दोन्ही बाबतीत आपण स्प्लिट फंक्शन कॉलबॅक म्हणून पास करतो कारण मॅचरला कॉलच्या आधी आणि नंतरच्या बॅलन्सच्या स्थितीमध्ये प्रवेश करणे आवश्यक आहे.

पुढे, आपण चाचणी करू की प्रत्येक wei च्या ट्रान्सफरनंतर Transfer इव्हेंट उत्सर्जित झाला होता का. आपण Waffle च्या दुसर्‍या मॅचरकडे वळूया:

## Emit {#emit}

```ts
it("पहिल्या रिसीव्हरला हस्तांतरण झाल्यावर इव्हेंट उत्सर्जित करते", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("दुसऱ्या रिसीव्हरला हस्तांतरण झाल्यावर इव्हेंट उत्सर्जित करते", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` मॅचर आपल्याला एखादी पद्धत कॉल केल्यावर कॉन्ट्रॅक्टने इव्हेंट उत्सर्जित केला आहे का हे तपासण्याची परवानगी देतो. `emit` मॅचरचे पॅरामीटर्स म्हणून, आपण तो मॉक कॉन्ट्रॅक्ट प्रदान करतो ज्यातून इव्हेंट उत्सर्जित होईल अशी आपण अपेक्षा करतो, त्यासोबत त्या इव्हेंटचे नावही देतो. आपल्या बाबतीत, मॉक कॉन्ट्रॅक्ट `splitter` आहे आणि इव्हेंटचे नाव - `Transfer` आहे. ज्या युक्तिवादांसह इव्हेंट उत्सर्जित झाला होता त्यांच्या अचूक मूल्यांचीही आपण पडताळणी करू शकतो - आपल्या इव्हेंट डिक्लेरेशनला जितके अपेक्षित आहेत तितके युक्तिवाद आपण `withArgs` मॅचरला पास करतो. EtherSplitter कॉन्ट्रॅक्टच्या बाबतीत, आपण हस्तांतरित wei रकमेसह सेंडर आणि रिसीव्हरचे अ‍ॅड्रेस पास करतो.

## revertedWith {#revertedwith}

शेवटचे उदाहरण म्हणून, आपण तपासू की विषम संख्येच्या wei च्या बाबतीत व्यवहार परत फिरवला गेला होता का. आपण `revertedWith` मॅचर वापरू:

```ts
it("wei रक्कम विषम असताना परत फिरवते", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "विषम wei रक्कम परवानगी नाही"
  )
})
```

चाचणी, जर पास झाली, तर आपल्याला खात्री देईल की व्यवहार खरोखरच परत फिरवला गेला होता. तथापि, `require` स्टेटमेंटमध्ये आपण पास केलेल्या संदेशांमध्ये आणि `revertedWith` मध्ये आपण अपेक्षित असलेल्या संदेशात एक अचूक जुळणी देखील असणे आवश्यक आहे. जर आपण EtherSplitter कॉन्ट्रॅक्टच्या कोडवर परत गेलो, तर wei रकमेसाठीच्या `require` स्टेटमेंटमध्ये, आपण संदेश देतो: 'विषम wei रक्कम परवानगी नाही'. हे आपल्या चाचणीमध्ये अपेक्षित असलेल्या संदेशाशी जुळते. जर ते समान नसते, तर चाचणी अयशस्वी झाली असती.

## अभिनंदन! {#congratulations}

तुम्ही Waffle सह स्मार्ट कॉन्ट्रॅक्ट्सची चाचणी करण्याच्या दिशेने तुमचे पहिले मोठे पाऊल उचलले आहे!
