---
title: "Hardhat और Ethers के साथ Waffle का हैलो वर्ल्ड ट्यूटोरियल"
description: "Hardhat और ethers.js के साथ अपना पहला Waffle प्रोजेक्ट बनाएं"
author: "MiZiet"
tags:
  [
    "Waffle",
    "स्मार्ट अनुबंध",
    "Solidity",
    "परिक्षण",
    "Hardhat",
    "ethers.js"
  ]
skill: beginner
lang: hi
published: 2020-10-16
---

इस [वफ़ल](https://ethereum-waffle.readthedocs.io) ट्यूटोरियल में, हम सीखेंगे कि [हार्डहैट](https://hardhat.org/) और [ethers.js](https://docs.ethers.io/v5/) का उपयोग करके एक सरल "हैलो वर्ल्ड" स्मार्ट अनुबंध प्रोजेक्ट कैसे सेट अप करें। फिर हम सीखेंगे कि अपने स्मार्ट अनुबंध में एक नई कार्यक्षमता कैसे जोड़ें और वफ़ल के साथ इसका परीक्षण कैसे करें।

आइए एक नया प्रोजेक्ट बनाने से शुरू करें:

```bash
yarn init
```

या

```bash
npm init
```

और आवश्यक पैकेज इंस्टॉल करें:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

या

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

अगला चरण `npx hardhat` चलाकर एक सैंपल हार्डहैट प्रोजेक्ट बनाना है।

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.3 👷‍

? आप क्या करना चाहते हैं? …
❯ एक सैंपल प्रोजेक्ट बनाएं
एक खाली hardhat.config.js बनाएं
छोड़ें
```

`Create a sample project` चुनें

हमारे प्रोजेक्ट की संरचना इस तरह दिखनी चाहिए:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### अब इनमें से कुछ फ़ाइलों के बारे में बात करते हैं: {#now-lets-talk}

- Greeter.sol - हमारा स्मार्ट अनुबंध जो सॉलिडिटी में लिखा गया है;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("greeting के साथ एक Greeter डिप्लॉय किया जा रहा है:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("greeting को '%s' से '%s' में बदला जा रहा है", greeting, _greeting);
greeting = _greeting;
}
}
```

हमारे स्मार्ट अनुबंध को तीन भागों में बांटा जा सकता है:

1. कंस्ट्रक्टर - जहां हम `greeting` नामक एक स्ट्रिंग प्रकार का वैरिएबल घोषित करते हैं,
2. फंक्शन ग्रीट - एक फंक्शन जो कॉल किए जाने पर `greeting` लौटाएगा,
3. फंक्शन सेटग्रीटिंग - एक फंक्शन जो हमें `greeting` मान को बदलने की अनुमति देता है।

- sample-test.js - हमारी परीक्षण फ़ाइल

```js
describe("Greeter", function () {
  it("बदल जाने के बाद इसे नया ग्रीटिंग लौटाना चाहिए", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### अगले चरण में हमारे स्मार्ट अनुबंध को कंपाइल करना और परीक्षण चलाना शामिल है: {#compiling-and-testing}

वफ़ल परीक्षण Mocha (एक परीक्षण ढांचा) के साथ Chai (एक एसर्शन लाइब्रेरी) का उपयोग करते हैं। आपको बस `npx hardhat test` चलाना है और निम्न संदेश के प्रकट होने की प्रतीक्षा करनी है।

```bash
✓ बदल जाने के बाद इसे नया ग्रीटिंग लौटाना चाहिए
```

### अब तक सब कुछ बढ़िया लग रहा है, आइए अपने प्रोजेक्ट में कुछ और जटिलता जोड़ें <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

एक ऐसी स्थिति की कल्पना करें जहां कोई ग्रीटिंग के रूप में एक खाली स्ट्रिंग जोड़ता है। यह एक उत्साहभरा ग्रीटिंग नहीं होगा, है ना?  
आइए सुनिश्चित करें कि ऐसा न हो:

जब कोई खाली स्ट्रिंग पास करता है तो हम solidity के `revert` का उपयोग करना चाहते हैं। अच्छी बात यह है कि हम वफ़ल के chai मैचर `to.be.revertedWith()` के साथ इस कार्यक्षमता का आसानी से परीक्षण कर सकते हैं।

```js
it("खाली स्ट्रिंग पास करने पर रिवर्ट होना चाहिए", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "ग्रीटिंग खाली नहीं होना चाहिए"
  )
})
```

लगता है हमारा नया परीक्षण पास नहीं हुआ:

```bash
greeting के साथ एक Greeter डिप्लॉय किया जा रहा है: Hello, world!
greeting को 'Hello, world!' से 'Hola, mundo!' में बदला जा रहा है
    ✓ बदल जाने के बाद इसे नया ग्रीटिंग लौटाना चाहिए (1514ms)
greeting के साथ एक Greeter डिप्लॉय किया जा रहा है: Hello, world!
greeting को 'Hello, world!' से '' में बदला जा रहा है
    1) खाली स्ट्रिंग पास करने पर रिवर्ट होना चाहिए


  1 पास (2s)
  1 विफल
```

आइए इस कार्यक्षमता को हमारे स्मार्ट अनुबंध में लागू करें:

```solidity
require(bytes(_greeting).length > 0, "ग्रीटिंग खाली नहीं होना चाहिए");
```

अब, हमारा setGreeting फंक्शन इस तरह दिखता है:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "ग्रीटिंग खाली नहीं होना चाहिए");
console.log("greeting को '%s' से '%s' में बदला जा रहा है", greeting, _greeting);
greeting = _greeting;
}
```

आइए फिर से परीक्षण चलाएँ:

```bash
✓ बदल जाने के बाद इसे नया ग्रीटिंग लौटाना चाहिए (1467ms)
✓ खाली स्ट्रिंग पास करने पर रिवर्ट होना चाहिए (276ms)

2 पास (2s)
```

बधाई हो! आपने यह कर दिखाया :)

### निष्कर्ष {#conclusion}

हमने वफ़ल, हार्डहैट और ethers.js के साथ एक सरल प्रोजेक्ट बनाया। हमने सीखा कि एक प्रोजेक्ट कैसे सेट अप करें, एक परीक्षण कैसे जोड़ें और नई कार्यक्षमता कैसे लागू करें।

अपने स्मार्ट अनुबंधों का परीक्षण करने के लिए और बेहतरीन chai मैचर्स के लिए, [आधिकारिक वफ़ल के दस्तावेज़](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) देखें।
