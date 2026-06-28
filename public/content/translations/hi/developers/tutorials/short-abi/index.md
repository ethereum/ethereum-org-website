---
title: "कॉल डेटा ऑप्टिमाइज़ेशन के लिए शॉर्ट ABIs"
description: "ऑप्टिमिस्टिक रोलअप्स के लिए स्मार्ट कॉन्ट्रैक्ट्स को ऑप्टिमाइज़ करना"
author: "ओरी पोमेरेंट्ज़"
lang: hi
tags: ["लेयर 2"]
skill: intermediate
breadcrumb: "शॉर्ट ABIs"
published: 2022-04-01
---

## परिचय {#introduction}

इस लेख में, आप [ऑप्टिमिस्टिक रोलअप्स](/developers/docs/scaling/optimistic-rollups), उन पर लेन-देन की लागत, और कैसे वह अलग लागत संरचना हमें इथेरियम मेननेट की तुलना में अलग-अलग चीज़ों के लिए ऑप्टिमाइज़ करने की आवश्यकता होती है, के बारे में जानेंगे।
आप यह भी सीखेंगे कि इस ऑप्टिमाइज़ेशन को कैसे लागू किया जाए।

### पूर्ण प्रकटीकरण {#full-disclosure}

मैं एक पूर्णकालिक [ऑप्टिमिज़्म](https://www.optimism.io/) कर्मचारी हूँ, इसलिए इस लेख के उदाहरण ऑप्टिमिज़्म पर चलेंगे।
हालाँकि, यहाँ बताई गई तकनीक अन्य रोलअप्स के लिए भी उतनी ही अच्छी तरह काम करनी चाहिए।

### शब्दावली {#terminology}

रोलअप्स पर चर्चा करते समय, 'लेयर 1 (l1)' शब्द का उपयोग मेननेट, प्रोडक्शन इथेरियम नेटवर्क के लिए किया जाता है।
'लेयर 2 (l2)' शब्द का उपयोग रोलअप या किसी अन्य सिस्टम के लिए किया जाता है जो सुरक्षा के लिए लेयर 1 (l1) पर निर्भर करता है लेकिन अपनी अधिकांश प्रोसेसिंग ऑफचेन करता है।

## हम लेयर 2 (l2) लेन-देन की लागत को और कैसे कम कर सकते हैं? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[ऑप्टिमिस्टिक रोलअप्स](/developers/docs/scaling/optimistic-rollups) को हर ऐतिहासिक लेन-देन का रिकॉर्ड सुरक्षित रखना होता है ताकि कोई भी उन्हें देख सके और सत्यापित कर सके कि वर्तमान स्थिति सही है।
इथेरियम मेननेट में डेटा प्राप्त करने का सबसे सस्ता तरीका इसे कॉल डेटा के रूप में लिखना है।
यह समाधान [ऑप्टिमिज़्म](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) और [आर्बिट्रम](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) दोनों द्वारा चुना गया था।

### लेयर 2 (l2) लेन-देन की लागत {#cost-of-l2-transactions}

लेयर 2 (l2) लेन-देन की लागत दो घटकों से बनी होती है:

1. लेयर 2 (l2) प्रोसेसिंग, जो आमतौर पर बहुत सस्ती होती है
2. लेयर 1 (l1) स्टोरेज, जो मेननेट गैस लागतों से जुड़ी होती है

जब मैं यह लिख रहा हूँ, ऑप्टिमिज़्म पर लेयर 2 (l2) गैस की लागत 0.001 [Gwei](/developers/docs/gas/#pre-london) है।
दूसरी ओर, लेयर 1 (l1) गैस की लागत लगभग 40 Gwei है।
[आप यहाँ वर्तमान कीमतें देख सकते हैं](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)।

कॉल डेटा के एक बाइट की लागत या तो 4 गैस (यदि यह शून्य है) या 16 गैस (यदि यह कोई अन्य मान है) होती है।
EVM पर सबसे महंगे ऑपरेशन्स में से एक स्टोरेज में लिखना है।
लेयर 2 (l2) पर स्टोरेज में 32-बाइट वर्ड लिखने की अधिकतम लागत 22100 गैस है। वर्तमान में, यह 22.1 Gwei है।
इसलिए यदि हम कॉल डेटा का एक भी शून्य बाइट बचा सकते हैं, तो हम स्टोरेज में लगभग 200 बाइट्स लिख सकेंगे और फिर भी फायदे में रहेंगे।

### ABI {#the-abi}

अधिकांश लेन-देन बाहरी रूप से स्वामित्व वाले खाते (externally-owned account) से कॉन्ट्रैक्ट तक पहुँचते हैं।
अधिकांश कॉन्ट्रैक्ट्स Solidity में लिखे जाते हैं और [एप्लिकेशन बाइनरी इंटरफ़ेस (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) के अनुसार अपने डेटा फ़ील्ड की व्याख्या करते हैं।

हालाँकि, ABI को लेयर 1 (l1) के लिए डिज़ाइन किया गया था, जहाँ कॉल डेटा के एक बाइट की लागत लगभग चार अंकगणितीय ऑपरेशन्स के बराबर होती है, न कि लेयर 2 (l2) के लिए जहाँ कॉल डेटा के एक बाइट की लागत एक हज़ार से अधिक अंकगणितीय ऑपरेशन्स से अधिक होती है।
कॉल डेटा को इस प्रकार विभाजित किया गया है:

| अनुभाग | लंबाई | बाइट्स | बर्बाद बाइट्स | बर्बाद गैस | आवश्यक बाइट्स | आवश्यक गैस |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| फ़ंक्शन चयनकर्ता | 4 | 0-3 | 3 | 48 | 1 | 16 |
| शून्य | 12 | 4-15 | 12 | 48 | 0 | 0 |
| गंतव्य पता | 20 | 16-35 | 0 | 0 | 20 | 320 |
| राशि | 32 | 36-67 | 17 | 64 | 15 | 240 |
| कुल | 68 | | | 160 | | 576 |

स्पष्टीकरण:

- **फ़ंक्शन चयनकर्ता**: कॉन्ट्रैक्ट में 256 से कम फ़ंक्शन्स हैं, इसलिए हम उन्हें एक बाइट से अलग कर सकते हैं।
  ये बाइट्स आमतौर पर गैर-शून्य होते हैं और इसलिए [इनकी लागत सोलह गैस होती है](https://eips.ethereum.org/EIPS/eip-2028)।
- **शून्य**: ये बाइट्स हमेशा शून्य होते हैं क्योंकि बीस-बाइट पते को रखने के लिए बत्तीस-बाइट वर्ड की आवश्यकता नहीं होती है।
  शून्य रखने वाले बाइट्स की लागत चार गैस होती है ([येलो पेपर देखें](https://ethereum.github.io/yellowpaper/paper.pdf), परिशिष्ट G,
  पृष्ठ 27, `G`<sub>`txdatazero`</sub> के लिए मान)।
- **राशि**: यदि हम मान लें कि इस कॉन्ट्रैक्ट में `decimals` अठारह (सामान्य मान) है और हम जो अधिकतम टोकन ट्रांसफर करेंगे वह 10<sup>18</sup> होगा, तो हमें 10<sup>36</sup> की अधिकतम राशि मिलती है।
  256<sup>15</sup> &gt; 10<sup>36</sup>, इसलिए पंद्रह बाइट्स पर्याप्त हैं।

लेयर 1 (l1) पर 160 गैस की बर्बादी आमतौर पर नगण्य है। एक लेन-देन की लागत कम से कम [21,000 गैस](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) होती है, इसलिए अतिरिक्त 0.8% से कोई फर्क नहीं पड़ता।
हालाँकि, लेयर 2 (l2) पर, चीजें अलग हैं। लेन-देन की लगभग पूरी लागत इसे लेयर 1 (l1) पर लिखने की होती है।
लेन-देन कॉल डेटा के अलावा, लेन-देन हेडर (गंतव्य पता, हस्ताक्षर, आदि) के 109 बाइट्स होते हैं।
इसलिए कुल लागत `109*16+576+160=2480` है, और हम उसका लगभग 6.5% बर्बाद कर रहे हैं।

## जब आप गंतव्य को नियंत्रित नहीं करते हैं तो लागत कम करना {#reducing-costs-when-you-dont-control-the-destination}

यह मानते हुए कि गंतव्य कॉन्ट्रैक्ट पर आपका नियंत्रण नहीं है, आप अभी भी [इसके](https://github.com/qbzzt/ethereum.org-20220330-shortABI) समान समाधान का उपयोग कर सकते हैं।
आइए प्रासंगिक फ़ाइलों पर नज़र डालें।

### Token.sol {#token-sol}

[यह गंतव्य कॉन्ट्रैक्ट है](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)।
यह एक मानक ERC-20 कॉन्ट्रैक्ट है, जिसमें एक अतिरिक्त विशेषता है।
यह `faucet` फ़ंक्शन किसी भी उपयोगकर्ता को उपयोग करने के लिए कुछ टोकन प्राप्त करने देता है।
यह एक प्रोडक्शन ERC-20 कॉन्ट्रैक्ट को बेकार कर देगा, लेकिन जब कोई ERC-20 केवल परीक्षण की सुविधा के लिए मौजूद होता है तो यह जीवन को आसान बना देता है।

```solidity
    /**
     * @dev कॉलर को खेलने के लिए 1000 टोकन देता है
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[यह वह कॉन्ट्रैक्ट है जिसे लेन-देन को छोटे कॉल डेटा के साथ कॉल करना चाहिए](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)।
आइए इसे पंक्ति दर पंक्ति समझें।

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

हमें यह जानने के लिए टोकन फ़ंक्शन की आवश्यकता है कि इसे कैसे कॉल किया जाए।

```solidity
अनुबंध CalldataInterpreter {

    OrisUselessToken public immutable token;
```

उस टोकन का पता जिसके लिए हम एक प्रॉक्सी हैं।

```solidity

    /**
     * @dev टोकन का पता निर्दिष्ट करें
     * @param tokenAddr_ ERC-20 अनुबंध का पता
     */
    कंस्ट्रक्टर(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

टोकन पता एकमात्र पैरामीटर है जिसे हमें निर्दिष्ट करने की आवश्यकता है।

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

कॉल डेटा से एक मान पढ़ें।

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

हम मेमोरी में एक 32-बाइट (256-बिट) वर्ड लोड करने जा रहे हैं और उन बाइट्स को हटा देंगे जो हमारे इच्छित फ़ील्ड का हिस्सा नहीं हैं।
यह एल्गोरिदम 32 बाइट्स से अधिक लंबे मानों के लिए काम नहीं करता है, और निश्चित रूप से हम कॉल डेटा के अंत के बाद नहीं पढ़ सकते हैं।
लेयर 1 (l1) पर गैस बचाने के लिए इन परीक्षणों को छोड़ना आवश्यक हो सकता है, लेकिन लेयर 2 (l2) पर गैस बेहद सस्ती है, जो हमें जो भी सैनिटी चेक (sanity checks) हम सोच सकते हैं, उन्हें सक्षम बनाती है।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

हम कॉल से डेटा को `fallback()` में कॉपी कर सकते थे (नीचे देखें), लेकिन EVM की असेंबली भाषा [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) का उपयोग करना आसान है।

यहाँ हम स्टैक में `startByte` से `startByte+31` बाइट्स पढ़ने के लिए [CALLDATALOAD ऑपकोड](https://www.evm.codes/#35) का उपयोग करते हैं।
सामान्य तौर पर, Yul में ऑपकोड का सिंटैक्स `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` होता है।

```solidity

        _retVal = _retVal >> (256-length*8);
```

केवल सबसे महत्वपूर्ण `length` बाइट्स फ़ील्ड का हिस्सा हैं, इसलिए हम अन्य मानों से छुटकारा पाने के लिए [राइट-शिफ्ट](https://en.wikipedia.org/wiki/Logical_shift) करते हैं।
इसका अतिरिक्त लाभ यह है कि मान फ़ील्ड के दाईं ओर चला जाता है, इसलिए यह मान गुणा 256<sup>कुछ</sup> के बजाय स्वयं मान होता है।

```solidity

        return _retVal;
    }


    fallback() external {
```

जब किसी Solidity कॉन्ट्रैक्ट को कॉल किसी भी फ़ंक्शन हस्ताक्षर से मेल नहीं खाता है, तो यह [`fallback()` फ़ंक्शन](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) को कॉल करता है (यह मानते हुए कि एक है)।
`CalldataInterpreter` के मामले में, _कोई भी_ कॉल यहाँ आती है क्योंकि कोई अन्य `external` या `public` फ़ंक्शन्स नहीं हैं।

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

कॉल डेटा का पहला बाइट पढ़ें, जो हमें फ़ंक्शन बताता है।
यहाँ किसी फ़ंक्शन के उपलब्ध न होने के दो कारण हैं:

1. जो फ़ंक्शन्स `pure` या `view` हैं, वे स्थिति को नहीं बदलते हैं और उनमें गैस खर्च नहीं होती है (जब ऑफचेन कॉल किया जाता है)।
   उनकी गैस लागत को कम करने का प्रयास करने का कोई मतलब नहीं है।
2. वे फ़ंक्शन्स जो [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) पर निर्भर करते हैं।
   `msg.sender` का मान `CalldataInterpreter` का पता होगा, कॉलर का नहीं।

दुर्भाग्य से, [ERC-20 विनिर्देशों को देखते हुए](https://eips.ethereum.org/EIPS/eip-20), यह केवल एक फ़ंक्शन, `transfer` छोड़ता है।
यह हमारे पास केवल दो फ़ंक्शन्स छोड़ता है: `transfer` (क्योंकि हम `transferFrom` को कॉल कर सकते हैं) और `faucet` (क्योंकि हम टोकन वापस उसी को ट्रांसफर कर सकते हैं जिसने हमें कॉल किया था)।

```solidity

        // का उपयोग करके टोकन की स्थिति बदलने वाली विधियों को कॉल करें
        // कॉल डेटा से जानकारी

        // faucet
        if (_func == 1) {
```

`faucet()` को एक कॉल, जिसमें पैरामीटर नहीं हैं।

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()` को कॉल करने के बाद हमें टोकन मिलते हैं। हालाँकि, प्रॉक्सी कॉन्ट्रैक्ट के रूप में, हमें टोकन की **आवश्यकता** नहीं है।
EOA (बाहरी रूप से स्वामित्व वाला खाता) या कॉन्ट्रैक्ट जिसने हमें कॉल किया था, उसे है।
इसलिए हम अपने सभी टोकन उसी को ट्रांसफर कर देते हैं जिसने हमें कॉल किया था।

```solidity
        // ट्रांसफर (मान लें कि हमारे पास इसके लिए व्यय सीमा है)
        if (_func == 2) {
```

टोकन ट्रांसफर करने के लिए दो मापदंडों की आवश्यकता होती है: गंतव्य पता और राशि।

```solidity
            token.transferFrom(
                msg.sender,
```

हम केवल कॉलर्स को उनके स्वामित्व वाले टोकन ट्रांसफर करने की अनुमति देते हैं

```solidity
                address(uint160(calldataVal(1, 20))),
```

गंतव्य पता बाइट #1 से शुरू होता है (बाइट #0 फ़ंक्शन है)।
पते के रूप में, यह 20-बाइट लंबा है।

```solidity
                calldataVal(21, 2)
```

इस विशेष कॉन्ट्रैक्ट के लिए हम मानते हैं कि कोई भी व्यक्ति अधिकतम जितने टोकन ट्रांसफर करना चाहेगा वह दो बाइट्स (65536 से कम) में फिट बैठता है।

```solidity
            );
        }
```

कुल मिलाकर, एक ट्रांसफर में 35 बाइट्स कॉल डेटा लगता है:

| अनुभाग | लंबाई | बाइट्स |
| ------------------- | -----: | ----: |
| फ़ंक्शन चयनकर्ता | 1 | 0 |
| गंतव्य पता | 32 | 1-32 |
| राशि | 2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[यह JavaScript यूनिट टेस्ट](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) हमें दिखाता है कि इस तंत्र का उपयोग कैसे करें (और यह कैसे सत्यापित करें कि यह सही ढंग से काम करता है)।
मैं यह मानकर चल रहा हूँ कि आप [chai](https://www.chaijs.com/) और [ethers](https://docs.ethers.io/v5/) को समझते हैं और केवल उन हिस्सों की व्याख्या करूँगा जो विशेष रूप से कॉन्ट्रैक्ट पर लागू होते हैं।

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

हम दोनों कॉन्ट्रैक्ट्स को डिप्लॉय करके शुरू करते हैं।

```javascript
    // खेलने के लिए टोकन प्राप्त करें
    const faucetTx = {
```

हम लेन-देन बनाने के लिए उन उच्च-स्तरीय फ़ंक्शन्स का उपयोग नहीं कर सकते हैं जिनका हम सामान्य रूप से उपयोग करते हैं (जैसे `token.faucet()`), क्योंकि हम ABI का पालन नहीं करते हैं।
इसके बजाय, हमें लेन-देन स्वयं बनाना होगा और फिर उसे भेजना होगा।

```javascript
      to: cdi.address,
      data: "0x01"
```

लेन-देन के लिए हमें दो पैरामीटर प्रदान करने होंगे:

1. `to`, गंतव्य पता।
   यह कॉल डेटा इंटरप्रेटर कॉन्ट्रैक्ट है।
2. `data`, भेजने के लिए कॉल डेटा।
   फॉसेट कॉल के मामले में, डेटा एक सिंगल बाइट, `0x01` है।

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

हम [हस्ताक्षरकर्ता के `sendTransaction` मेथड](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) को कॉल करते हैं क्योंकि हमने पहले ही गंतव्य (`faucetTx.to`) निर्दिष्ट कर दिया है और हमें लेन-देन पर हस्ताक्षर करने की आवश्यकता है।

```javascript
// जांचें कि faucet टोकन सही ढंग से प्रदान करता है
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

यहाँ हम शेष राशि (balance) को सत्यापित करते हैं।
`view` फ़ंक्शन्स पर गैस बचाने की कोई आवश्यकता नहीं है, इसलिए हम बस उन्हें सामान्य रूप से चलाते हैं।

```javascript
// CDI को व्यय सीमा दें (अनुमोदन को प्रॉक्सी नहीं किया जा सकता है)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

कॉल डेटा इंटरप्रेटर को ट्रांसफर करने में सक्षम होने के लिए एक व्यय सीमा दें।

```javascript
// टोकन ट्रांसफर करें
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

एक ट्रांसफर लेन-देन बनाएँ। पहला बाइट "0x02" है, उसके बाद गंतव्य पता, और अंत में राशि (0x0100, जो दशमलव में 256 है)।

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // जांचें कि हमारे पास 256 टोकन कम हैं
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // और हमारे गंतव्य को वे मिल गए हैं
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## जब आप गंतव्य कॉन्ट्रैक्ट को नियंत्रित करते हैं तो लागत कम करना {#reducing-the-cost-when-you-do-control-the-destination-contract}

यदि आपका गंतव्य कॉन्ट्रैक्ट पर नियंत्रण है, तो आप ऐसे फ़ंक्शन्स बना सकते हैं जो `msg.sender` जाँच को बायपास करते हैं क्योंकि वे कॉल डेटा इंटरप्रेटर पर भरोसा करते हैं।
[आप यहाँ `control-contract` ब्रांच में इसका एक उदाहरण देख सकते हैं कि यह कैसे काम करता है](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)।

यदि कॉन्ट्रैक्ट केवल बाहरी लेन-देन का जवाब दे रहा होता, तो हम केवल एक कॉन्ट्रैक्ट रखकर काम चला सकते थे।
हालाँकि, यह [संयोजकता](/developers/docs/smart-contracts/composability/) को तोड़ देगा।
एक ऐसा कॉन्ट्रैक्ट होना बहुत बेहतर है जो सामान्य ERC-20 कॉल्स का जवाब देता हो, और दूसरा कॉन्ट्रैक्ट जो छोटे कॉल डेटा वाले लेन-देन का जवाब देता हो।

### Token.sol {#token-sol-2}

इस उदाहरण में हम `Token.sol` को संशोधित कर सकते हैं।
यह हमें कई ऐसे फ़ंक्शन्स रखने देता है जिन्हें केवल प्रॉक्सी ही कॉल कर सकता है।
यहाँ नए भाग दिए गए हैं:

```solidity
    // CalldataInterpreter का पता निर्दिष्ट करने की अनुमति वाला एकमात्र पता
    address owner;

    // CalldataInterpreter का पता
    address proxy = address(0);
```

ERC-20 कॉन्ट्रैक्ट को अधिकृत प्रॉक्सी की पहचान जानने की आवश्यकता है।
हालाँकि, हम इस वेरिएबल को कंस्ट्रक्टर में सेट नहीं कर सकते, क्योंकि हम अभी तक मान नहीं जानते हैं।
यह कॉन्ट्रैक्ट पहले इंस्टेंटिएट (instantiated) किया जाता है क्योंकि प्रॉक्सी अपने कंस्ट्रक्टर में टोकन के पते की अपेक्षा करता है।

```solidity
    /**
     * @dev ERC20 कंस्ट्रक्टर को कॉल करता है।
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

निर्माता का पता (जिसे `owner` कहा जाता है) यहाँ संग्रहीत किया जाता है क्योंकि केवल उसी पते को प्रॉक्सी सेट करने की अनुमति है।

```solidity
    /**
     * @dev प्रॉक्सी (CalldataInterpreter) के लिए पता सेट करें。
     * मालिक द्वारा केवल एक बार कॉल किया जा सकता है
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

प्रॉक्सी के पास विशेषाधिकार प्राप्त पहुँच है, क्योंकि यह सुरक्षा जाँचों को बायपास कर सकता है।
यह सुनिश्चित करने के लिए कि हम प्रॉक्सी पर भरोसा कर सकते हैं, हम केवल `owner` को इस फ़ंक्शन को कॉल करने देते हैं, और वह भी केवल एक बार।
एक बार जब `proxy` का वास्तविक मान (शून्य नहीं) हो जाता है, तो वह मान बदल नहीं सकता है, इसलिए भले ही मालिक दुष्ट (rogue) होने का फैसला करता है, या इसके लिए निमोनिक (mnemonic) का खुलासा हो जाता है, हम अभी भी सुरक्षित हैं।

```solidity
    /**
     * @dev कुछ फ़ंक्शन केवल प्रॉक्सी द्वारा कॉल किए जा सकते हैं।
     */
    modifier onlyProxy {
```

यह एक [`modifier` फ़ंक्शन](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) है, यह अन्य फ़ंक्शन्स के काम करने के तरीके को संशोधित करता है।

```solidity
      require(msg.sender == proxy);
```

सबसे पहले, सत्यापित करें कि हमें प्रॉक्सी द्वारा कॉल किया गया था और किसी और के द्वारा नहीं।
यदि नहीं, तो `revert`।

```solidity
      _;
    }
```

यदि हाँ, तो उस फ़ंक्शन को चलाएँ जिसे हम संशोधित करते हैं।

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

ये तीन ऑपरेशन्स हैं जिनके लिए सामान्य रूप से संदेश को सीधे टोकन ट्रांसफर करने वाली या व्यय सीमा को मंजूरी देने वाली इकाई से आने की आवश्यकता होती है।
यहाँ हमारे पास इन ऑपरेशन्स का एक प्रॉक्सी संस्करण है जो:

1. `onlyProxy()` द्वारा संशोधित किया गया है ताकि किसी और को उन्हें नियंत्रित करने की अनुमति न हो।
2. उस पते को प्राप्त करता है जो सामान्य रूप से एक अतिरिक्त पैरामीटर के रूप में `msg.sender` होगा।

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

कॉल डेटा इंटरप्रेटर लगभग ऊपर वाले के समान है, सिवाय इसके कि प्रॉक्सी किए गए फ़ंक्शन्स को एक `msg.sender` पैरामीटर प्राप्त होता है और `transfer` के लिए व्यय सीमा की कोई आवश्यकता नहीं है।

```solidity
        // ट्रांसफर (व्यय सीमा की कोई आवश्यकता नहीं है)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
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

पिछले परीक्षण कोड और इसके बीच कुछ बदलाव हैं।

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

हमें ERC-20 कॉन्ट्रैक्ट को बताना होगा कि किस प्रॉक्सी पर भरोसा करना है

```js
console.log("CalldataInterpreter addr:", cdi.address)

// व्यय सीमा को सत्यापित करने के लिए दो हस्ताक्षरकर्ताओं की आवश्यकता है
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` और `transferFrom()` की जाँच करने के लिए हमें एक दूसरे हस्ताक्षरकर्ता की आवश्यकता है।
हम इसे `poorSigner` कहते हैं क्योंकि इसे हमारे कोई भी टोकन नहीं मिलते हैं (निश्चित रूप से, इसके पास ETH होना आवश्यक है)।

```js
// टोकन ट्रांसफर करें
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

चूँकि ERC-20 कॉन्ट्रैक्ट प्रॉक्सी (`cdi`) पर भरोसा करता है, इसलिए हमें ट्रांसफर रिले करने के लिए व्यय सीमा की आवश्यकता नहीं है।

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

// जांचें कि approve / transferFrom कॉम्बो सही ढंग से किया गया था
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

दो नए फ़ंक्शन्स का परीक्षण करें।
ध्यान दें कि `transferFromTx` के लिए दो पता मापदंडों की आवश्यकता होती है: व्यय सीमा देने वाला और प्राप्तकर्ता।

## निष्कर्ष {#conclusion}

[ऑप्टिमिज़्म](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) और [आर्बिट्रम](https://developer.offchainlabs.com/docs/special_features) दोनों लेयर 1 (l1) पर लिखे गए कॉल डेटा के आकार को कम करने और इसलिए लेन-देन की लागत को कम करने के तरीके खोज रहे हैं।
हालाँकि, सामान्य समाधानों की तलाश कर रहे बुनियादी ढाँचा प्रदाताओं के रूप में, हमारी क्षमताएँ सीमित हैं।
विकेंद्रीकृत एप्लिकेशन (dapp) डेवलपर के रूप में, आपके पास एप्लिकेशन-विशिष्ट ज्ञान है, जो आपको अपने कॉल डेटा को सामान्य समाधान में हमारे द्वारा किए जा सकने वाले ऑप्टिमाइज़ेशन की तुलना में बहुत बेहतर तरीके से ऑप्टिमाइज़ करने देता है।
उम्मीद है, यह लेख आपको अपनी आवश्यकताओं के लिए आदर्श समाधान खोजने में मदद करेगा।

[मेरे और काम यहाँ देखें](https://cryptodocguy.pro/)।