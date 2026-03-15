---
title: "कॉलडेटा ऑप्टिमाइज़ेशन के लिए शॉर्ट ABI"
description: "आशावादी रोलअप के लिए स्मार्ट अनुबंधों का ऑप्टिमाइज़ेशन"
author: "ओरी पोमेरेन्ट्ज़"
lang: hi
tags: [ "परत 2" ]
skill: intermediate
published: 2022-04-01
---

## परिचय {#introduction}

इस लेख में, आप [आशावादी रोलअप](/developers/docs/scaling/optimistic-rollups), उन पर लेनदेन की लागत और विभिन्न लागत संरचना के लिए हमें एथेरियम मेननेट की तुलना में विभिन्न चीजों के लिए ऑप्टिमाइज़ करने की आवश्यकता कैसे है, के बारे में सीखते हैं।
आप यह भी सीखते हैं कि इस ऑप्टिमाइज़ेशन को कैसे लागू किया जाए।

### पूर्ण प्रकटीकरण {#full-disclosure}

मैं एक पूर्णकालिक [Optimism](https://www.optimism.io/) कर्मचारी हूं, इसलिए इस लेख के उदाहरण Optimism पर चलेंगे।
हालांकि, यहां बताई गई तकनीक को अन्य रोलअप के लिए भी उतना ही अच्छा काम करना चाहिए।

### शब्दावली {#terminology}

रोलअप पर चर्चा करते समय, 'परत 1' (L1) शब्द का उपयोग मेननेट, उत्पादन एथेरियम नेटवर्क के लिए किया जाता है।
'परत 2' (L2) शब्द का उपयोग रोलअप या किसी अन्य सिस्टम के लिए किया जाता है जो सुरक्षा के लिए L1 पर निर्भर करता है लेकिन अपनी अधिकांश प्रोसेसिंग ऑफ-चेन करता है।

## हम L2 लेनदेन की लागत को और कैसे कम कर सकते हैं? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[आशावादी रोलअप](/developers/docs/scaling/optimistic-rollups) को हर ऐतिहासिक लेनदेन का रिकॉर्ड रखना होता है ताकि कोई भी उनके माध्यम से जाकर यह सत्यापित कर सके कि वर्तमान स्थिति सही है।
एथेरियम मेननेट में डेटा प्राप्त करने का सबसे सस्ता तरीका इसे कॉलडेटा के रूप में लिखना है।
यह समाधान [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) और [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) दोनों द्वारा चुना गया था।

### L2 लेनदेन की लागत {#cost-of-l2-transactions}

L2 लेनदेन की लागत दो घटकों से बनी है:

1. L2 प्रोसेसिंग, जो आमतौर पर बहुत सस्ती होती है
2. L1 भंडारण, जो मेननेट गैस लागत से बंधा है

जैसा कि मैं यह लिख रहा हूं, Optimism पर L2 गैस की लागत 0.001 [Gwei](/developers/docs/gas/#pre-london) है।
दूसरी ओर, L1 गैस की लागत लगभग 40 gwei है।
[आप यहां वर्तमान मूल्य देख सकते हैं](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)।

कॉलडेटा के एक बाइट की लागत या तो 4 गैस (यदि यह शून्य है) या 16 गैस (यदि यह कोई अन्य मान है) है।
EVM पर सबसे महंगे ऑपरेशनों में से एक भंडारण में लिखना है।
L2 पर भंडारण के लिए 32-बाइट शब्द लिखने की अधिकतम लागत 22100 गैस है। वर्तमान में, यह 22.1 gwei है।
इसलिए यदि हम कॉलडेटा का एक भी शून्य बाइट बचा सकते हैं, तो हम भंडारण में लगभग 200 बाइट्स लिखने में सक्षम होंगे और फिर भी आगे निकल जाएंगे।

### ABI {#the-abi}

ज़्यादातर लेनदेन बाहरी स्वामित्व वाले खाते से अनुबंध तक पहुंचते हैं।
अधिकांश अनुबंध Solidity में लिखे गए हैं और [एप्लिकेशन बाइनरी इंटरफ़ेस (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) के अनुसार उनके डेटा फ़ील्ड की व्याख्या करते हैं।

हालांकि, ABI को L1 के लिए डिज़ाइन किया गया था, जहां कॉलडेटा के एक बाइट की लागत लगभग चार अंकगणितीय ऑपरेशनों के बराबर होती है, न कि L2 जहां कॉलडेटा के एक बाइट की लागत एक हजार से अधिक अंकगणितीय ऑपरेशनों से अधिक होती है।
कॉलडेटा को इस तरह विभाजित किया गया है:

| सेक्शन           | लंबाई | बाइट्स | व्यर्थ बाइट्स | व्यर्थ गैस | आवश्यक बाइट्स | आवश्यक गैस |
| ---------------- | ----: | -----: | ------------: | ---------: | ------------: | ---------: |
| फ़ंक्शन चयनकर्ता |     4 |    0-3 |             3 |         48 |             1 |         16 |
| शून्य            |    12 |   4-15 |            12 |         48 |             0 |          0 |
| गंतव्य पता       |    20 |  16-35 |             0 |          0 |            20 |        320 |
| राशि             |    32 |  36-67 |            17 |         64 |            15 |        240 |
| कुल              |    68 |        |               |        160 |               |        576 |

स्पष्टीकरण:

- **फ़ंक्शन चयनकर्ता**: अनुबंध में 256 से कम फ़ंक्शन हैं, इसलिए हम उन्हें एक बाइट से अलग कर सकते हैं।
  ये बाइट्स आमतौर पर गैर-शून्य होते हैं और इसलिए [सोलह गैस की लागत](https://eips.ethereum.org/EIPS/eip-2028) होती है।
- **शून्य**: ये बाइट्स हमेशा शून्य होते हैं क्योंकि बीस-बाइट के पते को रखने के लिए बत्तीस-बाइट शब्द की आवश्यकता नहीं होती है।
  शून्य रखने वाले बाइट्स की लागत चार गैस होती है ([येलो पेपर देखें](https://ethereum.github.io/yellowpaper/paper.pdf), परिशिष्ट G,
  p. 27, `G`<sub>`txdatazero`</sub> के लिए मान)।
- **राशि**: यदि हम मानते हैं कि इस अनुबंध में `डेसिमल` अठारह (सामान्य मान) है और हमारे द्वारा हस्तांतरित किए जाने वाले टोकन की अधिकतम राशि 10<sup>18</sup> होगी, तो हमें 10<sup>36</sup> की अधिकतम राशि मिलती है।
  256<sup>15</sup> &gt; 10<sup>36</sup>, इसलिए पंद्रह बाइट्स पर्याप्त हैं।

L1 पर 160 गैस की बर्बादी सामान्य रूप से नगण्य है। एक लेनदेन में कम से कम [21,000 गैस](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) की लागत आती है, इसलिए अतिरिक्त 0.8% कोई मायने नहीं रखता।
हालांकि, L2 पर, चीजें अलग हैं। लगभग लेनदेन की पूरी लागत इसे L1 पर लिख रही है।
लेनदेन कॉलडेटा के अलावा, लेनदेन हेडर के 109 बाइट्स (गंतव्य पता, हस्ताक्षर, आदि) हैं।
इसलिए कुल लागत `109*16+576+160=2480` है, और हम इसका लगभग 6.5% बर्बाद कर रहे हैं।

## जब आप गंतव्य को नियंत्रित नहीं करते हैं तो लागत कम करना {#reducing-costs-when-you-dont-control-the-destination}

यह मानते हुए कि आपका गंतव्य अनुबंध पर नियंत्रण नहीं है, आप अभी भी [इस](https://github.com/qbzzt/ethereum.org-20220330-shortABI) जैसे समाधान का उपयोग कर सकते हैं।
चलिए प्रासंगिक फाइलों पर चलते हैं।

### Token.sol {#token-sol}

[यह गंतव्य अनुबंध है](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)।
यह एक मानक ERC-20 अनुबंध है, जिसमें एक अतिरिक्त सुविधा है।
यह `faucet` फंक्शन किसी भी यूज़र को उपयोग करने के लिए कुछ टोकन प्राप्त करने देता है।
यह एक उत्पादन ERC-20 अनुबंध को बेकार बना देगा, लेकिन यह जीवन को आसान बनाता है जब एक ERC-20 केवल परीक्षण की सुविधा के लिए मौजूद होता है।

```solidity
    /**
     * @dev कॉलर को खेलने के लिए 1000 टोकन देता है
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // फंक्शन फोसेट
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[यह वह अनुबंध है जिसे लेनदेन छोटे कॉलडेटा के साथ कॉल करने वाले हैं](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)।
आइए इसे लाइन-दर-लाइन देखें।

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

हमें यह जानने के लिए टोकन फ़ंक्शन की आवश्यकता है कि इसे कैसे कॉल किया जाए।

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

टोकन का पता जिसके लिए हम एक प्रॉक्सी हैं।

```solidity

    /**
     * @dev टोकन पता निर्दिष्ट करें
     * @param tokenAddr_ ERC-20 अनुबंध पता
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // कंस्ट्रक्टर
```

टोकन पता एकमात्र पैरामीटर है जिसे हमें निर्दिष्ट करने की आवश्यकता है।

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

कॉलडेटा से एक मान पढ़ें।

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal लंबाई सीमा 32 बाइट्स है");

        require(length + startByte <= msg.data.length,
            "calldataVal कॉलगैस आकार से परे पढ़ने की कोशिश कर रहा है");
```

हम मेमोरी में एक 32-बाइट (256-बिट) शब्द लोड करने जा रहे हैं और उन बाइट्स को हटाने जा रहे हैं जो हमारे इच्छित फ़ील्ड का हिस्सा नहीं हैं।
यह एल्गोरिथम 32 बाइट्स से अधिक लंबे मानों के लिए काम नहीं करता है, और निश्चित रूप से हम कॉलडेटा के अंत से आगे नहीं पढ़ सकते हैं।
L1 पर गैस बचाने के लिए इन परीक्षणों को छोड़ना आवश्यक हो सकता है, लेकिन L2 पर गैस बहुत सस्ती है, जो हमारे द्वारा सोचे जा सकने वाले किसी भी विवेक जांच को सक्षम करती है।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

हम `fallback()` (नीचे देखें) पर कॉल से डेटा कॉपी कर सकते थे, लेकिन EVM की असेंबली भाषा [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) का उपयोग करना आसान है।

यहां हम स्टैक में बाइट्स `startByte` से `startByte+31` पढ़ने के लिए [CALLDATALOAD ओपकोड](https://www.evm.codes/#35) का उपयोग करते हैं।
सामान्य तौर पर, Yul में एक ओपकोड का सिंटैक्स `<opcode name>(<पहला स्टैक मान, यदि कोई हो>,<दूसरा स्टैक मान, यदि कोई हो>...)` होता है।

```solidity

        _retVal = _retVal >> (256-length*8);
```

केवल सबसे महत्वपूर्ण `length` बाइट्स फ़ील्ड का हिस्सा हैं, इसलिए हम अन्य मानों से छुटकारा पाने के लिए [राइट-शिफ्ट](https://en.wikipedia.org/wiki/Logical_shift) करते हैं।
इसका अतिरिक्त लाभ यह है कि यह मान को फ़ील्ड के दाईं ओर ले जाता है, इसलिए यह मान स्वयं है बजाय मान गुणा 256<sup>something</sup> के।

```solidity

        return _retVal;
    }


    fallback() external {
```

जब एक Solidity अनुबंध के लिए एक कॉल किसी भी फ़ंक्शन हस्ताक्षर से मेल नहीं खाती है, तो यह [the `fallback()` फ़ंक्शन](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) को कॉल करता है (यह मानते हुए कि एक है)।
`CalldataInterpreter` के मामले में, _कोई_ भी कॉल यहां पहुंचती है क्योंकि कोई अन्य `external` या `public` फ़ंक्शन नहीं हैं।

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

कॉलडेटा का पहला बाइट पढ़ें, जो हमें फ़ंक्शन बताता है।
दो कारण हैं कि कोई फ़ंक्शन यहां उपलब्ध क्यों नहीं होगा:

1. `pure` या `view` फ़ंक्शन स्थिति नहीं बदलते हैं और गैस की लागत नहीं लेते हैं (जब ऑफ-चेन कहा जाता है)।
   उनकी गैस लागत को कम करने की कोशिश करने का कोई मतलब नहीं है।
2. फ़ंक्शन जो [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) पर निर्भर करते हैं।
   `msg.sender` का मान `CalldataInterpreter` का पता होगा, न कि कॉलर का।

दुर्भाग्य से, [ERC-20 विनिर्देशों को देखते हुए](https://eips.ethereum.org/EIPS/eip-20), यह केवल एक फ़ंक्शन, `transfer` छोड़ता है।
यह हमें केवल दो कार्यों के साथ छोड़ देता है: `transfer` (क्योंकि हम `transferFrom` को कॉल कर सकते हैं) और `faucet` (क्योंकि हम जिसने हमें कॉल किया है, उसे टोकन वापस ट्रांसफर कर सकते हैं)।

```solidity

        // कॉलडेटा से जानकारी का उपयोग करके
        // टोकन की स्थिति बदलने के तरीकों को कॉल करें

        // फोसेट
        if (_func == 1) {
```

`faucet()` पर एक कॉल, जिसमें पैरामीटर नहीं हैं।

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

जब हम `token.faucet()` को कॉल करते हैं तो हमें टोकन मिलते हैं। हालांकि, प्रॉक्सी अनुबंध के रूप में, हमें टोकन की **आवश्यकता** नहीं है।
EOA (बाहरी स्वामित्व वाला खाता) या हमें कॉल करने वाले अनुबंध को इसकी आवश्यकता है।
इसलिए हम अपने सभी टोकन उस व्यक्ति को हस्तांतरित करते हैं जिसने हमें बुलाया था।

```solidity
        // ट्रांसफर (मान लें कि हमारे पास इसके लिए भत्ता है)
        if (_func == 2) {
```

टोकन ट्रांसफर करने के लिए दो पैरामीटर की आवश्यकता होती है: गंतव्य पता और राशि।

```solidity
            token.transferFrom(
                msg.sender,
```

हम केवल कॉल करने वालों को उनके स्वामित्व वाले टोकन को स्थानांतरित करने की अनुमति देते हैं

```solidity
                address(uint160(calldataVal(1, 20))),
```

गंतव्य पता बाइट #1 पर शुरू होता है (बाइट #0 फ़ंक्शन है)।
एक पते के रूप में, यह 20-बाइट्स लंबा है।

```solidity
                calldataVal(21, 2)
```

इस विशेष अनुबंध के लिए हम मानते हैं कि कोई भी व्यक्ति जो अधिकतम संख्या में टोकन स्थानांतरित करना चाहता है, वह दो बाइट्स (65536 से कम) में फिट बैठता है।

```solidity
            );
        }
```

कुल मिलाकर, एक हस्तांतरण में 35 बाइट्स कॉलडेटा लगते हैं:

| सेक्शन           | लंबाई | बाइट्स |
| ---------------- | ----: | -----: |
| फ़ंक्शन चयनकर्ता |     1 |      0 |
| गंतव्य पता       |    32 |   1-32 |
| राशि             |     2 |  33-34 |

```solidity
    }   // फॉलबैक

}       // अनुबंध CalldataInterpreter
```

### test.js {#test-js}

[यह जावास्क्रिप्ट यूनिट परीक्षण](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) हमें दिखाता है कि इस तंत्र का उपयोग कैसे करें (और यह कैसे सत्यापित करें कि यह सही तरीके से काम करता है)।
मैं यह मानने जा रहा हूं कि आप [chai](https://www.chaijs.com/) और [ethers](https://docs.ethers.io/v5/) को समझते हैं और केवल उन हिस्सों की व्याख्या करते हैं जो विशेष रूप से अनुबंध पर लागू होते हैं।

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

हम दोनों अनुबंधों को परिनियोजित करके शुरू करते हैं।

```javascript
    // खेलने के लिए टोकन प्राप्त करें
    const faucetTx = {
```

हम लेनदेन बनाने के लिए सामान्य रूप से उपयोग किए जाने वाले उच्च-स्तरीय कार्यों (जैसे `token.faucet()`) का उपयोग नहीं कर सकते हैं, क्योंकि हम ABI का पालन नहीं करते हैं।
इसके बजाय, हमें स्वयं लेनदेन का निर्माण करना होगा और फिर उसे भेजना होगा।

```javascript
      to: cdi.address,
      data: "0x01"
```

लेनदेन के लिए हमें दो पैरामीटर प्रदान करने की आवश्यकता है:

1. `to`, गंतव्य पता।
   यह कॉलडेटा इंटरप्रेटर अनुबंध है।
2. `data`, भेजने के लिए कॉलडेटा।
   एक फोसेट कॉल के मामले में, डेटा एक बाइट, `0x01` है।

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

हम [हस्ताक्षरकर्ता की `sendTransaction` विधि](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) को कॉल करते हैं क्योंकि हमने पहले ही गंतव्य (`faucetTx.to`) निर्दिष्ट कर दिया है और हमें लेनदेन पर हस्ताक्षर करने की आवश्यकता है।

```javascript
// जांचें कि फोसेट टोकन सही ढंग से प्रदान करता है या नहीं
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

यहां हम शेष राशि की पुष्टि करते हैं।
`view` फ़ंक्शन पर गैस बचाने की कोई आवश्यकता नहीं है, इसलिए हम बस उन्हें सामान्य रूप से चलाते हैं।

```javascript
// CDI को एक भत्ता दें (अनुमोदन को प्रॉक्सी नहीं किया जा सकता है)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

स्थानांतरण करने में सक्षम होने के लिए कॉलडेटा दुभाषिया को एक भत्ता दें।

```javascript
// टोकन ट्रांसफर करें
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

एक स्थानांतरण लेनदेन बनाएं। पहला बाइट "0x02" है, इसके बाद गंतव्य पता है, और अंत में राशि (0x0100, जो दशमलव में 256 है)।

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // जांचें कि हमारे पास 256 टोकन कम हैं
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // और यह कि हमारे गंतव्य को वे मिल गए हैं
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // यह
})      // वर्णन
```

## जब आप गंतव्य अनुबंध को नियंत्रित करते हैं तो लागत कम करना {#reducing-the-cost-when-you-do-control-the-destination-contract}

यदि आपका गंतव्य अनुबंध पर नियंत्रण है, तो आप ऐसे फ़ंक्शन बना सकते हैं जो `msg.sender` जांच को बायपास करते हैं क्योंकि वे कॉलडेटा दुभाषिया पर भरोसा करते हैं।
[आप `control-contract` शाखा में यहां इसका एक उदाहरण देख सकते हैं](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)।

यदि अनुबंध केवल बाहरी लेनदेन का जवाब दे रहा होता, तो हम केवल एक अनुबंध के साथ काम चला सकते थे।
हालांकि, यह [कंपोज़ेबिलिटी](/developers/docs/smart-contracts/composability/) को तोड़ देगा।
सामान्य ERC-20 कॉल का जवाब देने वाला एक अनुबंध होना बहुत बेहतर है, और दूसरा अनुबंध जो छोटे कॉल डेटा के साथ लेनदेन का जवाब देता है।

### Token.sol {#token-sol-2}

इस उदाहरण में हम `Token.sol` को संशोधित कर सकते हैं।
यह हमें कई ऐसे कार्य करने देता है जिन्हें केवल प्रॉक्सी ही कॉल कर सकता है।
यहां नए हिस्से दिए गए हैं:

```solidity
    // CalldataInterpreter पते को निर्दिष्ट करने के लिए अनुमत एकमात्र पता
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

ERC-20 अनुबंध को अधिकृत प्रॉक्सी की पहचान जानने की आवश्यकता है।
हालांकि, हम इस चर को कंस्ट्रक्टर में सेट नहीं कर सकते हैं, क्योंकि हम अभी तक मान नहीं जानते हैं।
यह अनुबंध पहले इंस्टेंट किया गया है क्योंकि प्रॉक्सी अपने कंस्ट्रक्टर में टोकन के पते की अपेक्षा करता है।

```solidity
    /**
     * @dev ERC20 कंस्ट्रक्टर को कॉल करता है।
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

निर्माता का पता (जिसे `owner` कहा जाता है) यहां संग्रहीत किया जाता है क्योंकि प्रॉक्सी सेट करने के लिए यह एकमात्र पता है।

```solidity
    /**
     * @dev प्रॉक्सी (CalldataInterpreter) के लिए पता सेट करें।
     * मालिक द्वारा केवल एक बार कॉल किया जा सकता है
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // फ़ंक्शन setProxy
```

प्रॉक्सी के पास विशेषाधिकार प्राप्त पहुंच है, क्योंकि यह सुरक्षा जांच को बायपास कर सकता है।
यह सुनिश्चित करने के लिए कि हम प्रॉक्सी पर भरोसा कर सकते हैं, हम केवल `owner` को इस फ़ंक्शन को कॉल करने देते हैं, और केवल एक बार।
एक बार जब `proxy` का वास्तविक मान (शून्य नहीं) हो जाता है, तो वह मान नहीं बदल सकता है, इसलिए भले ही मालिक दुष्ट बनने का फैसला करता है, या इसके लिए मेमोनिक का खुलासा हो जाता है, हम अभी भी सुरक्षित हैं।

```solidity
    /**
     * @dev कुछ फंक्शन केवल प्रॉक्सी द्वारा ही कॉल किए जा सकते हैं।
     */
    modifier onlyProxy {
```

यह एक [`modifier` फ़ंक्शन](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) है, यह अन्य फ़ंक्शन के काम करने के तरीके को संशोधित करता है।

```solidity
      require(msg.sender == proxy);
```

सबसे पहले, सत्यापित करें कि हमें प्रॉक्सी द्वारा बुलाया गया था और किसी और ने नहीं।
यदि नहीं, तो `revert`।

```solidity
      _;
    }
```

यदि हां, तो उस फ़ंक्शन को चलाएं जिसे हम संशोधित करते हैं।

```solidity
   /* फ़ंक्शन जो प्रॉक्सी को वास्तव में खातों के लिए प्रॉक्सी करने की अनुमति देते हैं */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

ये तीन ऑपरेशन हैं जिनके लिए सामान्य रूप से संदेश को सीधे टोकन स्थानांतरित करने या भत्ता स्वीकृत करने वाली इकाई से आने की आवश्यकता होती है।
यहां हमारे पास एक प्रॉक्सी संस्करण है जो इन कार्यों को करता है:

1. `onlyProxy()` द्वारा संशोधित किया गया है ताकि किसी और को उन्हें नियंत्रित करने की अनुमति न हो।
2. एक अतिरिक्त पैरामीटर के रूप में वह पता प्राप्त करता है जो सामान्य रूप से `msg.sender` होगा।

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

कॉलडेटा दुभाषिया ऊपर वाले के लगभग समान है, सिवाय इसके कि प्रॉक्सी किए गए फ़ंक्शन को `msg.sender` पैरामीटर प्राप्त होता है और `transfer` के लिए भत्ते की कोई आवश्यकता नहीं होती है।

```solidity
        // ट्रांसफर (भत्ते की कोई आवश्यकता नहीं)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // स्वीकार
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

पिछले परीक्षण कोड और इस एक के बीच कुछ बदलाव हैं।

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

हमें ERC-20 अनुबंध को यह बताने की आवश्यकता है कि किस प्रॉक्सी पर भरोसा करना है

```js
console.log("CalldataInterpreter addr:", cdi.address)

// भत्ते को सत्यापित करने के लिए दो हस्ताक्षरकर्ताओं की आवश्यकता है
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` और `transferFrom()` की जांच के लिए हमें दूसरे हस्ताक्षरकर्ता की आवश्यकता है।
हम इसे `poorSigner` कहते हैं क्योंकि इसे हमारे कोई टोकन नहीं मिलते हैं (निश्चित रूप से, इसमें ETH होना आवश्यक है)।

```js
// टोकन ट्रांसफर करें
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

क्योंकि ERC-20 अनुबंध प्रॉक्सी (`cdi`) पर भरोसा करता है, हमें स्थानान्तरण को रिले करने के लिए एक भत्ते की आवश्यकता नहीं है।

```js
// अनुमोदन और transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// जांचें कि approve / transferFrom कॉम्बो सही तरीके से किया गया था
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

दो नए कार्यों का परीक्षण करें।
ध्यान दें कि `transferFromTx` के लिए दो पता पैरामीटर की आवश्यकता होती है: भत्ता देने वाला और प्राप्त करने वाला।

## निष्कर्ष {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) और [Arbitrum](https://developer.offchainlabs.com/docs/special_features) दोनों ही L1 पर लिखे गए कॉलडेटा के आकार को कम करने और इसलिए लेनदेन की लागत को कम करने के तरीके खोज रहे हैं।
हालांकि, सामान्य समाधानों की तलाश करने वाले बुनियादी ढांचा प्रदाताओं के रूप में, हमारी क्षमताएं सीमित हैं।
डैप डेवलपर के रूप में, आपके पास एप्लिकेशन-विशिष्ट ज्ञान है, जो आपको अपने कॉलडेटा को सामान्य समाधान की तुलना में कहीं बेहतर तरीके से अनुकूलित करने देता है।
उम्मीद है, यह लेख आपको अपनी आवश्यकताओं के लिए आदर्श समाधान खोजने में मदद करेगा।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।

