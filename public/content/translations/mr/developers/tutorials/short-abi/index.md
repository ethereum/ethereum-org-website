---
title: "कॉल डेटा ऑप्टिमायझेशनसाठी शॉर्ट ABIs"
description: "ऑप्टिमिस्टिक रोलअप्ससाठी स्मार्ट कॉन्ट्रॅक्ट्स ऑप्टिमाइझ करणे"
author: ओरी पोमेरँट्झ
lang: mr
tags: ["स्तर २ (l2)"]
skill: intermediate
breadcrumb: "शॉर्ट ABIs"
published: 2022-04-01
---

## परिचय {#introduction}

या लेखामध्ये, तुम्ही [ऑप्टिमिस्टिक रोलअप्स](/developers/docs/scaling/optimistic-rollups), त्यावरील व्यवहारांचा खर्च आणि त्या वेगळ्या खर्च रचनेमुळे आपल्याला इथरियम मेननेटपेक्षा वेगळ्या गोष्टींसाठी कसे ऑप्टिमाइझ करावे लागते याबद्दल शिकाल.
तुम्ही हे ऑप्टिमायझेशन कसे लागू करायचे हे देखील शिकाल.

### पूर्ण प्रकटीकरण {#full-disclosure}

मी [ऑप्टिमिझम्](https://www.optimism.io/) चा पूर्णवेळ कर्मचारी आहे, त्यामुळे या लेखातील उदाहरणे ऑप्टिमिझम् वर चालतील.
तथापि, येथे स्पष्ट केलेले तंत्र इतर रोलअप्ससाठी देखील तितकेच चांगले काम करेल.

### परिभाषिक शब्द {#terminology}

रोलअप्सवर चर्चा करताना, 'स्तर १ (l1)' हा शब्द मुख्यनेट, म्हणजेच उत्पादन इथेरियम नेटवर्कसाठी वापरला जातो.
'स्तर २ (l2)' हा शब्द रोलअप किंवा इतर कोणत्याही प्रणालीसाठी वापरला जातो जी सुरक्षिततेसाठी L1 वर अवलंबून असते परंतु तिची बहुतांश प्रक्रिया साखळीबाह्य करते.

## आपण L2 व्यवहारांचा खर्च आणखी कसा कमी करू शकतो? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[ऑप्टिमिस्टिक रोलअप्स](/developers/docs/scaling/optimistic-rollups) ला प्रत्येक ऐतिहासिक व्यवहाराची नोंद जतन करावी लागते जेणेकरून कोणालाही ते तपासता येतील आणि सध्याची स्थिती योग्य असल्याची पडताळणी करता येईल.
इथरियम मेननेटमध्ये डेटा मिळवण्याचा सर्वात स्वस्त मार्ग म्हणजे तो कॉल डेटा म्हणून लिहिणे.
हा उपाय [ऑप्टिमिझम्](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) आणि [आर्बिट्रम्](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) या दोन्हीनी निवडला होता.

### L2 व्यवहारांचा खर्च {#cost-of-l2-transactions}

L2 व्यवहारांचा खर्च दोन घटकांनी बनलेला असतो:

1. L2 प्रक्रिया, जी सहसा अत्यंत स्वस्त असते
2. L1 स्टोरेज, जे मुख्यनेट गॅस खर्चाशी जोडलेले असते

मी हे लिहित असताना, ऑप्टिमिझम् वर L2 गॅसचा खर्च 0.001 [Gwei](/developers/docs/gas/#pre-london) आहे.
दुसरीकडे, L1 गॅसचा खर्च अंदाजे 40 Gwei आहे.
[तुम्ही सध्याच्या किमती येथे पाहू शकता](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

कॉल डेटाच्या एका बाइटसाठी 4 गॅस (जर तो शून्य असेल) किंवा 16 गॅस (जर ते इतर कोणतेही मूल्य असेल) खर्च येतो.
EVM वरील सर्वात महागड्या ऑपरेशन्सपैकी एक म्हणजे स्टोरेजमध्ये लिहिणे.
L2 वरील स्टोरेजमध्ये 32-बाइट शब्द लिहिण्याचा जास्तीत जास्त खर्च 22100 गॅस आहे. सध्या, हे 22.1 Gwei आहे.
त्यामुळे जर आपण कॉल डेटाचा एक शून्य बाइट वाचवू शकलो, तर आपण स्टोरेजमध्ये सुमारे 200 बाइट्स लिहू शकू आणि तरीही फायद्यात राहू.

### ABI {#the-abi}

बहुतांश व्यवहार बाह्य मालकीच्या खात्यातून (externally-owned account) कॉन्ट्रॅक्टमध्ये प्रवेश करतात.
बहुतेक कॉन्ट्रॅक्ट्स Solidity मध्ये लिहिलेले असतात आणि त्यांच्या डेटा फील्डचा अर्थ [ॲप्लिकेशन बायनरी इंटरफेस (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) नुसार लावतात.

तथापि, ABI हे L1 साठी डिझाइन केले गेले होते, जिथे कॉल डेटाच्या एका बाइटचा खर्च अंदाजे चार अंकगणितीय ऑपरेशन्सइतका असतो, L2 साठी नाही जिथे कॉल डेटाच्या एका बाइटचा खर्च हजारहून अधिक अंकगणितीय ऑपरेशन्सइतका असतो.
कॉल डेटा खालीलप्रमाणे विभागलेला आहे:

| विभाग | लांबी | बाइट्स | वाया गेलेले बाइट्स | वाया गेलेला गॅस | आवश्यक बाइट्स | आवश्यक गॅस |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| फंक्शन सिलेक्टर | 4 | 0-3 | 3 | 48 | 1 | 16 |
| शून्ये | 12 | 4-15 | 12 | 48 | 0 | 0 |
| गंतव्य पत्ता | 20 | 16-35 | 0 | 0 | 20 | 320 |
| रक्कम | 32 | 36-67 | 17 | 64 | 15 | 240 |
| एकूण | 68 | | | 160 | | 576 |

स्पष्टीकरण:

- **फंक्शन सिलेक्टर**: कॉन्ट्रॅक्टमध्ये 256 पेक्षा कमी फंक्शन्स आहेत, त्यामुळे आपण त्यांना एका बाइटने वेगळे करू शकतो.
  हे बाइट्स सामान्यतः शून्य नसतात आणि त्यामुळे [सोळा गॅस खर्च येतो](https://eips.ethereum.org/EIPS/eip-2028).
- **शून्ये**: हे बाइट्स नेहमी शून्य असतात कारण वीस-बाइट पत्ता साठवण्यासाठी बत्तीस-बाइट शब्दाची आवश्यकता नसते.
  शून्य असलेल्या बाइट्ससाठी चार गॅस खर्च येतो ([येलो पेपर पहा](https://ethereum.github.io/yellowpaper/paper.pdf), परिशिष्ट G,
  पृष्ठ 27, `G`<sub>`txdatazero`</sub> चे मूल्य).
- **रक्कम**: जर आपण असे गृहीत धरले की या कॉन्ट्रॅक्टमध्ये `decimals` अठरा आहे (सामान्य मूल्य) आणि आपण हस्तांतरण करत असलेल्या टोकन्सची जास्तीत जास्त रक्कम 10<sup>18</sup> असेल, तर आपल्याला जास्तीत जास्त 10<sup>36</sup> रक्कम मिळते.
  256<sup>15</sup> &gt; 10<sup>36</sup>, त्यामुळे पंधरा बाइट्स पुरेसे आहेत.

L1 वर 160 गॅस वाया जाणे सामान्यतः नगण्य असते. एका व्यवहारासाठी किमान [21,000 गॅस](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) खर्च येतो, त्यामुळे अतिरिक्त 0.8% ने काही फरक पडत नाही.
तथापि, L2 वर, गोष्टी वेगळ्या आहेत. व्यवहाराचा जवळजवळ संपूर्ण खर्च तो L1 वर लिहिण्यात जातो.
व्यवहाराच्या कॉल डेटा व्यतिरिक्त, 109 बाइट्सचा व्यवहार हेडर (गंतव्य पत्ता, स्वाक्षरी इ.) असतो.
त्यामुळे एकूण खर्च `109*16+576+160=2480` आहे, आणि आपण त्यापैकी सुमारे 6.5% वाया घालवत आहोत.

## जेव्हा तुमचे गंतव्यावर नियंत्रण नसते तेव्हा खर्च कमी करणे {#reducing-costs-when-you-dont-control-the-destination}

तुमचे गंतव्य कॉन्ट्रॅक्टवर नियंत्रण नाही असे गृहीत धरून, तुम्ही तरीही [यासारखा](https://github.com/qbzzt/ethereum.org-20220330-shortABI) उपाय वापरू शकता.
चला संबंधित फाइल्स पाहूया.

### Token.sol {#token-sol}

[हे गंतव्य कॉन्ट्रॅक्ट आहे](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
हे एक मानक ERC-20 कॉन्ट्रॅक्ट आहे, ज्यामध्ये एक अतिरिक्त वैशिष्ट्य आहे.
हे `faucet` फंक्शन कोणत्याही वापरकर्त्याला वापरण्यासाठी काही टोकन मिळवू देते.
हे उत्पादन ERC-20 कॉन्ट्रॅक्ट निरुपयोगी बनवेल, परंतु जेव्हा ERC-20 केवळ चाचणी सुलभ करण्यासाठी अस्तित्वात असते तेव्हा ते काम सोपे करते.

```solidity
    /**
     * @dev कॉलरला खेळण्यासाठी 1000 टोकन देते
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[हे ते कॉन्ट्रॅक्ट आहे ज्याला व्यवहारांनी लहान कॉल डेटासह कॉल करणे अपेक्षित आहे](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
चला ते ओळीनुसार पाहूया.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

त्याला कसे कॉल करायचे हे जाणून घेण्यासाठी आपल्याला टोकन फंक्शनची आवश्यकता आहे.

```solidity
कॉन्ट्रॅक्ट CalldataInterpreter {

    OrisUselessToken public immutable token;
```

ज्या टोकनसाठी आपण प्रॉक्सी आहोत त्याचा पत्ता.

```solidity

    /**
     * @dev टोकन पत्ता निर्दिष्ट करा
     * @param tokenAddr_ ERC-20 कॉन्ट्रॅक्ट पत्ता
     */
    कन्स्ट्रक्टर(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

टोकन पत्ता हा एकमेव पॅरामीटर आहे जो आपल्याला निर्दिष्ट करणे आवश्यक आहे.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

कॉल डेटामधून मूल्य वाचा.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

आपण मेमरीमध्ये एकच 32-बाइट (256-बिट) शब्द लोड करणार आहोत आणि आपल्याला हव्या असलेल्या फील्डचा भाग नसलेले बाइट्स काढून टाकणार आहोत.
हा अल्गोरिदम 32 बाइट्सपेक्षा जास्त लांबीच्या मूल्यांसाठी काम करत नाही, आणि अर्थातच आपण कॉल डेटाच्या शेवटी वाचू शकत नाही.
L1 वर गॅस वाचवण्यासाठी या चाचण्या वगळणे आवश्यक असू शकते, परंतु L2 वर गॅस अत्यंत स्वस्त आहे, ज्यामुळे आपण विचार करू शकणाऱ्या कोणत्याही सॅनिटी चेक्स सक्षम होतात.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

आपण `fallback()` च्या कॉलवरून डेटा कॉपी करू शकलो असतो (खाली पहा), परंतु EVM ची असेंब्ली भाषा [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) वापरणे सोपे आहे.

येथे आपण स्टॅकमध्ये `startByte` ते `startByte+31` बाइट्स वाचण्यासाठी [CALLDATALOAD ऑपकोड](https://www.evm.codes/#35) वापरतो.
सर्वसाधारणपणे, Yul मधील ऑपकोडचा सिंटॅक्स `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` असा असतो.

```solidity

        _retVal = _retVal >> (256-length*8);
```

केवळ सर्वात महत्त्वपूर्ण `length` बाइट्स फील्डचा भाग आहेत, त्यामुळे इतर मूल्यांपासून मुक्त होण्यासाठी आपण [उजवीकडे-शिफ्ट (right-shift)](https://en.wikipedia.org/wiki/Logical_shift) करतो.
याचा अतिरिक्त फायदा असा आहे की मूल्य फील्डच्या उजवीकडे हलवले जाते, त्यामुळे ते मूल्य गुणिले 256<sup>काहीतरी</sup> ऐवजी स्वतःच मूल्य असते.

```solidity

        return _retVal;
    }


    fallback() external {
```

जेव्हा Solidity कॉन्ट्रॅक्टचा कॉल कोणत्याही फंक्शन स्वाक्षरीशी जुळत नाही, तेव्हा तो [`fallback()` फंक्शनला](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) कॉल करतो (तेथे एक आहे असे गृहीत धरून).
`CalldataInterpreter` च्या बाबतीत, _कोणताही_ कॉल येथे येतो कारण इतर कोणतीही `external` किंवा `public` फंक्शन्स नाहीत.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

कॉल डेटाचा पहिला बाइट वाचा, जो आपल्याला फंक्शन सांगतो.
येथे फंक्शन उपलब्ध न होण्याची दोन कारणे आहेत:

1. जी फंक्शन्स `pure` किंवा `view` आहेत ती स्थिती बदलत नाहीत आणि त्यांना गॅस खर्च येत नाही (जेव्हा साखळीबाह्य कॉल केले जाते).
   त्यांचा गॅस खर्च कमी करण्याचा प्रयत्न करण्यात काही अर्थ नाही.
2. जी फंक्शन्स [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) वर अवलंबून असतात.
   `msg.sender` चे मूल्य `CalldataInterpreter` चा पत्ता असणार आहे, कॉलरचा नाही.

दुर्दैवाने, [ERC-20 वैशिष्ट्यांकडे पाहता](https://eips.ethereum.org/EIPS/eip-20), यामुळे केवळ एकच फंक्शन उरते, `transfer`.
यामुळे आपल्याकडे फक्त दोन फंक्शन्स उरतात: `transfer` (कारण आपण `transferFrom` ला कॉल करू शकतो) आणि `faucet` (कारण ज्याने आपल्याला कॉल केला त्याला आपण टोकन्स परत हस्तांतरित करू शकतो).

```solidity

        // याचा वापर करून टोकनच्या स्थिती बदलणाऱ्या पद्धतींना कॉल करा
        // कॉल डेटामधील माहिती

        // faucet
        if (_func == 1) {
```

`faucet()` ला कॉल, ज्यामध्ये पॅरामीटर्स नाहीत.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

आपण `token.faucet()` ला कॉल केल्यानंतर आपल्याला टोकन्स मिळतात. तथापि, प्रॉक्सी कॉन्ट्रॅक्ट म्हणून, आपल्याला टोकन्सची **आवश्यकता** नाही.
ज्या EOA (बाह्य मालकीचे खाते) किंवा कॉन्ट्रॅक्टने आपल्याला कॉल केला त्याला त्याची आवश्यकता असते.
त्यामुळे आपण आपले सर्व टोकन्स ज्याने आपल्याला कॉल केला त्याला हस्तांतरित करतो.

```solidity
        // हस्तांतरण (गृहीत धरा की आपल्याकडे त्यासाठी मंजुरी आहे)
        if (_func == 2) {
```

टोकन्स हस्तांतरित करण्यासाठी दोन पॅरामीटर्स आवश्यक आहेत: गंतव्य पत्ता आणि रक्कम.

```solidity
            token.transferFrom(
                msg.sender,
```

आपण कॉलरना केवळ त्यांच्या मालकीचे टोकन्स हस्तांतरित करण्याची परवानगी देतो

```solidity
                address(uint160(calldataVal(1, 20))),
```

गंतव्य पत्ता बाइट #1 पासून सुरू होतो (बाइट #0 हे फंक्शन आहे).
पत्ता म्हणून, तो 20-बाइट्स लांब आहे.

```solidity
                calldataVal(21, 2)
```

या विशिष्ट कॉन्ट्रॅक्टसाठी आपण असे गृहीत धरतो की कोणालाही हस्तांतरित करायच्या असलेल्या टोकन्सची जास्तीत जास्त संख्या दोन बाइट्समध्ये बसते (65536 पेक्षा कमी).

```solidity
            );
        }
```

एकूणच, हस्तांतरणासाठी 35 बाइट्सचा कॉल डेटा लागतो:

| विभाग | लांबी | बाइट्स |
| ------------------- | -----: | ----: |
| फंक्शन सिलेक्टर | 1 | 0 |
| गंतव्य पत्ता | 32 | 1-32 |
| रक्कम | 2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[ही JavaScript युनिट चाचणी](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) आपल्याला ही यंत्रणा कशी वापरायची (आणि ती योग्यरित्या कार्य करते हे कसे तपासायचे) हे दर्शवते.
मी असे गृहीत धरणार आहे की तुम्हाला [chai](https://www.chaijs.com/) आणि [ethers](https://docs.ethers.io/v5/) समजते आणि केवळ कॉन्ट्रॅक्टला विशेषतः लागू होणारे भाग स्पष्ट करेन.

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

आपण दोन्ही कॉन्ट्रॅक्ट्स तैनात करून सुरुवात करतो.

```javascript
    // खेळण्यासाठी टोकन मिळवा
    const faucetTx = {
```

आपण व्यवहार तयार करण्यासाठी सामान्यतः वापरत असलेली उच्च-स्तरीय फंक्शन्स (जसे की `token.faucet()`) वापरू शकत नाही, कारण आपण ABI चे पालन करत नाही.
त्याऐवजी, आपल्याला स्वतः व्यवहार तयार करावा लागेल आणि नंतर तो पाठवावा लागेल.

```javascript
      to: cdi.address,
      data: "0x01"
```

व्यवहारासाठी आपल्याला दोन पॅरामीटर्स प्रदान करणे आवश्यक आहे:

1. `to`, गंतव्य पत्ता.
   हे कॉल डेटा इंटरप्रिटर कॉन्ट्रॅक्ट आहे.
2. `data`, पाठवायचा कॉल डेटा.
   फॉसेट कॉलच्या बाबतीत, डेटा एकच बाइट आहे, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

आपण [स्वाक्षरीकर्त्याच्या `sendTransaction` पद्धतीला](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) कॉल करतो कारण आपण आधीच गंतव्यस्थान (`faucetTx.to`) निर्दिष्ट केले आहे आणि आपल्याला व्यवहारावर स्वाक्षरी करणे आवश्यक आहे.

```javascript
// फॉसेट टोकन योग्यरित्या प्रदान करते का ते तपासा
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

येथे आपण शिल्लक तपासतो.
`view` फंक्शन्सवर गॅस वाचवण्याची गरज नाही, त्यामुळे आपण त्यांना फक्त सामान्यपणे चालवतो.

```javascript
// CDI ला मंजुरी द्या (मंजुरी प्रॉक्सी केली जाऊ शकत नाही)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

कॉल डेटा इंटरप्रिटरला हस्तांतरण करण्यास सक्षम होण्यासाठी मंजुरी द्या.

```javascript
// टोकन हस्तांतरित करा
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

हस्तांतरण व्यवहार तयार करा. पहिला बाइट "0x02" आहे, त्यानंतर गंतव्य पत्ता आणि शेवटी रक्कम (0x0100, जी दशमान पद्धतीत 256 आहे).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // आपल्याकडे 256 टोकन कमी आहेत का ते तपासा
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // आणि ते आपल्या गंतव्यस्थानाला मिळाले आहेत का
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## जेव्हा तुमचे गंतव्य कॉन्ट्रॅक्टवर नियंत्रण असते तेव्हा खर्च कमी करणे {#reducing-the-cost-when-you-do-control-the-destination-contract}

जर तुमचे गंतव्य कॉन्ट्रॅक्टवर नियंत्रण असेल तर तुम्ही अशी फंक्शन्स तयार करू शकता जी `msg.sender` तपासण्यांना बायपास करतात कारण त्यांचा कॉल डेटा इंटरप्रिटरवर विश्वास असतो.
[हे कसे कार्य करते याचे उदाहरण तुम्ही येथे, `control-contract` शाखेमध्ये पाहू शकता](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

जर कॉन्ट्रॅक्ट केवळ बाह्य व्यवहारांना प्रतिसाद देत असेल, तर आपण फक्त एकच कॉन्ट्रॅक्ट ठेवून काम चालवू शकलो असतो.
तथापि, त्यामुळे [संयोज्यता](/developers/docs/smart-contracts/composability/) खंडित होईल.
सामान्य ERC-20 कॉल्सना प्रतिसाद देणारे एक कॉन्ट्रॅक्ट आणि लहान कॉल डेटासह व्यवहारांना प्रतिसाद देणारे दुसरे कॉन्ट्रॅक्ट असणे अधिक चांगले आहे.

### Token.sol {#token-sol-2}

या उदाहरणामध्ये आपण `Token.sol` सुधारित करू शकतो.
यामुळे आपल्याला अशी अनेक फंक्शन्स मिळतात ज्यांना केवळ प्रॉक्सी कॉल करू शकते.
येथे नवीन भाग आहेत:

```solidity
    // CalldataInterpreter पत्ता निर्दिष्ट करण्याची परवानगी असलेला एकमेव पत्ता
    address owner;

    // CalldataInterpreter पत्ता
    address proxy = address(0);
```

ERC-20 कॉन्ट्रॅक्टला अधिकृत प्रॉक्सीची ओळख माहित असणे आवश्यक आहे.
तथापि, आपण हे व्हेरिएबल कन्स्ट्रक्टरमध्ये सेट करू शकत नाही, कारण आपल्याला अद्याप मूल्य माहित नाही.
हे कॉन्ट्रॅक्ट प्रथम इन्स्टॅन्शिएट केले जाते कारण प्रॉक्सीला त्याच्या कन्स्ट्रक्टरमध्ये टोकनचा पत्ता अपेक्षित असतो.

```solidity
    /**
     * @dev ERC20 कन्स्ट्रक्टरला कॉल करते.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

निर्मात्याचा पत्ता (ज्याला `owner` म्हटले जाते) येथे साठवला जातो कारण प्रॉक्सी सेट करण्याची परवानगी असलेला तो एकमेव पत्ता आहे.

```solidity
    /**
     * @dev प्रॉक्सीसाठी (CalldataInterpreter) पत्ता सेट करा.
     * मालकाद्वारे फक्त एकदाच कॉल केले जाऊ शकते
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

प्रॉक्सीला विशेषाधिकार प्राप्त प्रवेश आहे, कारण ती सुरक्षा तपासण्या बायपास करू शकते.
आपण प्रॉक्सीवर विश्वास ठेवू शकतो याची खात्री करण्यासाठी आपण केवळ `owner` ला या फंक्शनला कॉल करू देतो, आणि तेही फक्त एकदाच.
एकदा `proxy` ला वास्तविक मूल्य (शून्य नाही) मिळाले की, ते मूल्य बदलू शकत नाही, त्यामुळे मालकाने फसवणूक करण्याचे ठरवले तरीही, किंवा त्यासाठीचे निमोनिक उघड झाले तरीही, आपण सुरक्षित राहतो.

```solidity
    /**
     * @dev काही फंक्शन्सना फक्त प्रॉक्सीद्वारे कॉल केले जाऊ शकते.
     */
    modifier onlyProxy {
```

हे एक [`modifier` फंक्शन](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) आहे, ते इतर फंक्शन्स ज्या प्रकारे कार्य करतात त्यात बदल करते.

```solidity
      require(msg.sender == proxy);
```

प्रथम, आपल्याला प्रॉक्सीने कॉल केला आहे आणि इतर कोणीही नाही याची पडताळणी करा.
नसल्यास, `revert`.

```solidity
      _;
    }
```

तसे असल्यास, आपण सुधारित केलेले फंक्शन चालवा.

```solidity
   /* फंक्शन्स जे प्रॉक्सीला खात्यांसाठी प्रत्यक्षात प्रॉक्सी करण्याची परवानगी देतात */

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

ही तीन ऑपरेशन्स आहेत ज्यांना सामान्यतः टोकन्स हस्तांतरित करणाऱ्या किंवा मंजुरी देणाऱ्या घटकाकडून थेट संदेश येणे आवश्यक असते.
येथे आपल्याकडे या ऑपरेशन्सची प्रॉक्सी आवृत्ती आहे जी:

1. `onlyProxy()` द्वारे सुधारित केली आहे जेणेकरून इतर कोणालाही त्यांना नियंत्रित करण्याची परवानगी नाही.
2. जो पत्ता सामान्यतः `msg.sender` असेल तो अतिरिक्त पॅरामीटर म्हणून मिळवते.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

कॉल डेटा इंटरप्रिटर वरील इंटरप्रिटरसारखाच आहे, फक्त प्रॉक्सी केलेल्या फंक्शन्सना `msg.sender` पॅरामीटर मिळतो आणि `transfer` साठी मंजुरीची आवश्यकता नसते.

```solidity
        // हस्तांतरण (मंजुरीची आवश्यकता नाही)
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

मागील चाचणी कोड आणि या कोडमध्ये काही बदल आहेत.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

आपल्याला ERC-20 कॉन्ट्रॅक्टला कोणत्या प्रॉक्सीवर विश्वास ठेवायचा हे सांगणे आवश्यक आहे

```js
console.log("CalldataInterpreter addr:", cdi.address)

// मंजुरी सत्यापित करण्यासाठी दोन स्वाक्षरीकर्त्यांची आवश्यकता आहे
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` आणि `transferFrom()` तपासण्यासाठी आपल्याला दुसऱ्या स्वाक्षरीकर्त्याची आवश्यकता आहे.
आपण त्याला `poorSigner` म्हणतो कारण त्याला आपले कोणतेही टोकन्स मिळत नाहीत (अर्थातच, त्याच्याकडे ETH असणे आवश्यक आहे).

```js
// टोकन हस्तांतरित करा
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

कारण ERC-20 कॉन्ट्रॅक्टचा प्रॉक्सीवर (`cdi`) विश्वास आहे, आपल्याला हस्तांतरण रिले करण्यासाठी मंजुरीची आवश्यकता नाही.

```js
// मंजुरी आणि transferFrom
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

// approve / transferFrom कॉम्बो योग्यरित्या केले गेले का ते तपासा
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

दोन नवीन फंक्शन्सची चाचणी करा.
लक्षात घ्या की `transferFromTx` ला दोन पत्ता पॅरामीटर्स आवश्यक आहेत: मंजुरी देणारा आणि प्राप्तकर्ता.

## निष्कर्ष {#conclusion}

[ऑप्टिमिझम्](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) आणि [आर्बिट्रम्](https://developer.offchainlabs.com/docs/special_features) दोन्ही L1 वर लिहिलेल्या कॉल डेटाचा आकार आणि त्यामुळे व्यवहारांचा खर्च कमी करण्याचे मार्ग शोधत आहेत.
तथापि, सामान्य उपायांच्या शोधात असलेले पायाभूत सुविधा प्रदाते म्हणून, आमच्या क्षमता मर्यादित आहेत.
विकेंद्रित ॲप्लिकेशन (dapp) डेव्हलपर म्हणून, तुमच्याकडे ॲप्लिकेशन-विशिष्ट ज्ञान आहे, जे तुम्हाला तुमचा कॉल डेटा आम्ही सामान्य उपायामध्ये करू शकलो असतो त्यापेक्षा अधिक चांगल्या प्रकारे ऑप्टिमाइझ करू देते.
आशा आहे की, हा लेख तुम्हाला तुमच्या गरजांसाठी आदर्श उपाय शोधण्यात मदत करेल.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).