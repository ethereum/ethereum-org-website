---
title: "कॉलडेटा ऑप्टिमायझेशनसाठी लहान ABI"
description: "ऑप्टिमिस्टिक रोलअपसाठी स्मार्ट कॉन्ट्रॅक्ट्स ऑप्टिमाइझ करणे"
author: "ओरी पोमेरँट्झ"
lang: mr
tags: [ "स्तर 2" ]
skill: intermediate
published: 2022-04-01
---

## प्रस्तावना {#introduction}

या लेखात, आपण [optimistic rollups](/developers/docs/scaling/optimistic-rollups) बद्दल शिकाल, त्यावरील व्यवहारांची किंमत, आणि ती वेगळी किंमत संरचना Ethereum मेननेटपेक्षा आपल्याला वेगवेगळ्या गोष्टींसाठी ऑप्टिमाइझ करण्याची आवश्यकता कशी निर्माण करते.
हे ऑप्टिमायझेशन कसे लागू करायचे हे देखील आपण शिकाल.

### संपूर्ण प्रकटीकरण {#full-disclosure}

मी एक पूर्णवेळ [Optimism](https://www.optimism.io/) कर्मचारी आहे, त्यामुळे या लेखातील उदाहरणे Optimism वर चालतील.
तथापि, येथे स्पष्ट केलेले तंत्र इतर रोलअपसाठी देखील तितकेच चांगले कार्य करेल.

### परिभाषा {#terminology}

रोलअपवर चर्चा करताना, 'स्तर 1' (L1) ही संज्ञा मेननेटसाठी वापरली जाते, जे उत्पादन Ethereum नेटवर्क आहे.
'स्तर 2' (L2) ही संज्ञा रोलअप किंवा इतर कोणत्याही प्रणालीसाठी वापरली जाते जी सुरक्षिततेसाठी L1 वर अवलंबून असते परंतु तिची बहुतेक प्रक्रिया ऑफचेन करते.

## आपण L2 व्यवहारांची किंमत आणखी कशी कमी करू शकतो? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[ऑप्टिमिस्टिक रोलअप्सना](/developers/docs/scaling/optimistic-rollups) प्रत्येक ऐतिहासिक व्यवहाराचा रेकॉर्ड जतन करावा लागतो जेणेकरून कोणीही त्यातून जाऊन सध्याची स्थिती योग्य आहे हे सत्यापित करू शकेल.
Ethereum मेननेटमध्ये डेटा मिळवण्याचा सर्वात स्वस्त मार्ग म्हणजे तो कॅलडेटा म्हणून लिहिणे.
हे समाधान [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) आणि [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) या दोघांनी निवडले होते.

### L2 व्यवहारांची किंमत {#cost-of-l2-transactions}

L2 व्यवहारांच्या किंमतीत दोन घटक असतात:

1. L2 प्रक्रिया, जी सहसा अत्यंत स्वस्त असते
2. L1 स्टोरेज, जे मेननेट गॅस खर्चाशी जोडलेले आहे

मी हे लिहित असताना, Optimism वर L2 गॅसची किंमत 0.001 [Gwei](/developers/docs/gas/#pre-london) आहे.
दुसरीकडे, L1 गॅसची किंमत अंदाजे 40 gwei आहे.
[आपण सध्याच्या किमती येथे पाहू शकता](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

कॅलडेटाच्या एका बाइटला एकतर 4 गॅस (जर तो शून्य असेल तर) किंवा 16 गॅस (जर ते इतर कोणतेही मूल्य असेल तर) लागतात.
EVM वरील सर्वात महागड्या क्रियांपैकी एक म्हणजे स्टोरेजमध्ये लिहिणे.
L2 वर स्टोरेजमध्ये 32-बाइट शब्द लिहिण्याची कमाल किंमत 22100 गॅस आहे. सध्या, हे 22.1 gwei आहे.
म्हणून जर आपण कॅलडेटाचा एक शून्य बाइट वाचवू शकलो, तर आपण स्टोरेजमध्ये सुमारे 200 बाइट्स लिहू शकू आणि तरीही फायद्यात राहू.

### ABI {#the-abi}

बहुतेक व्यवहार बाह्य-मालकीच्या खात्यातून करारावर प्रवेश करतात.
बहुतेक कॉन्ट्रॅक्ट्स Solidity मध्ये लिहिलेले आहेत आणि [ऍप्लिकेशन बायनरी इंटरफेस (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) नुसार त्यांचे डेटा फील्ड इंटरप्रिट करतात.

तथापि, ABI हे L1 साठी डिझाइन केले होते, जिथे कॅलडेटाच्या एका बाइटची किंमत अंदाजे चार अंकगणितीय क्रियांइतकी असते, L2 साठी नाही, जिथे कॅलडेटाच्या एका बाइटची किंमत हजारहून अधिक अंकगणितीय क्रियांइतकी असते.
कॅलडेटा खालीलप्रमाणे विभागलेला आहे:

| विभाग           | लांबी | बाइट्स | वाया गेलेले बाइट्स | वाया गेलेला गॅस | आवश्यक बाइट्स | आवश्यक गॅस |
| --------------- | ----: | -----: | -----------------: | --------------: | ------------: | ---------: |
| फंक्शन सिलेक्टर |     4 |    0-3 |                  3 |              48 |             1 |         16 |
| शून्य           |    12 |   4-15 |                 12 |              48 |             0 |          0 |
| गंतव्य पत्ता    |    20 |  16-35 |                  0 |               0 |            20 |        320 |
| रक्कम           |    32 |  36-67 |                 17 |              64 |            15 |        240 |
| एकूण            |    68 |        |                    |             160 |               |        576 |

स्पष्टीकरण:

- **फंक्शन सिलेक्टर**: कॉन्ट्रॅक्टमध्ये 256 पेक्षा कमी फंक्शन्स आहेत, त्यामुळे आपण त्यांना एका बाइटने वेगळे करू शकतो.
  हे बाइट्स सहसा गैर-शून्य असतात आणि त्यामुळे [सोळा गॅस खर्च येतो](https://eips.ethereum.org/EIPS/eip-2028).
- **शून्य**: हे बाइट्स नेहमी शून्य असतात कारण वीस-बाइट पत्त्याला ठेवण्यासाठी बत्तीस-बाइट शब्दाची आवश्यकता नसते.
  शून्य धारण करणार्‍या बाइट्सना चार गॅस खर्च येतो ([पिवळे पेपर पहा](https://ethereum.github.io/yellowpaper/paper.pdf), परिशिष्ट G,
  पृ. 27, `G`<sub>`txdatazero`</sub> चे मूल्य).
- **रक्कम**: जर आपण असे गृहीत धरले की या कॉन्ट्रॅक्टमध्ये `decimals` अठरा आहे (सामान्य मूल्य) आणि आपण हस्तांतरित करत असलेल्या टोकन्सची कमाल रक्कम 10<sup>18</sup> असेल, तर आपल्याला 10<sup>36</sup> ची कमाल रक्कम मिळते.
  256<sup>15</sup> > 10<sup>36</sup>, म्हणून पंधरा बाइट्स पुरेसे आहेत.

L1 वर 160 गॅसचा अपव्यय सहसा नगण्य असतो. एका व्यवहाराला किमान [21,000 गॅस](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) खर्च येतो, त्यामुळे अतिरिक्त 0.8% ने काही फरक पडत नाही.
तथापि, L2 वर, गोष्टी वेगळ्या आहेत. व्यवहाराचा जवळजवळ संपूर्ण खर्च तो L1 वर लिहिण्याचा असतो.
व्यवहार कॅलडेटा व्यतिरिक्त, 109 बाइट्सचे व्यवहार हेडर (गंतव्य पत्ता, स्वाक्षरी, इ.) आहे.
म्हणून एकूण खर्च `109*16+576+160=2480` आहे, आणि आपण त्यापैकी सुमारे 6.5% वाया घालवत आहोत.

## जेव्हा आपण गंतव्यस्थानावर नियंत्रण ठेवत नाही तेव्हा खर्च कमी करणे {#reducing-costs-when-you-dont-control-the-destination}

आपले गंतव्य कॉन्ट्रॅक्टवर नियंत्रण नाही असे गृहीत धरून, आपण तरीही [यासारखा](https://github.com/qbzzt/ethereum.org-20220330-shortABI) उपाय वापरू शकता.
चला संबंधित फाइल्स पाहूया.

### Token.sol {#token-sol}

[हे गंतव्य कॉन्ट्रॅक्ट आहे](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
हे एक मानक ERC-20 कॉन्ट्रॅक्ट आहे, ज्यात एक अतिरिक्त वैशिष्ट्य आहे.
हे `faucet` फंक्शन कोणत्याही वापरकर्त्याला वापरण्यासाठी काही टोकन मिळवू देते.
हे एका उत्पादन ERC-20 कॉन्ट्रॅक्टला निरुपयोगी बनवेल, परंतु जेव्हा एखादे ERC-20 केवळ चाचणी सुलभ करण्यासाठी अस्तित्वात असते तेव्हा ते जीवन सोपे करते.

```solidity
    /**
     * @dev कॉलरला खेळण्यासाठी 1000 टोकन देते
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // फंक्शन फॉसेट
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[हे ते कॉन्ट्रॅक्ट आहे ज्याला व्यवहारांनी लहान कॅलडेटासह कॉल करणे अपेक्षित आहे](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
चला ओळीनुसार पाहूया.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

त्याला कसे कॉल करायचे हे जाणून घेण्यासाठी आम्हाला टोकन फंक्शनची आवश्यकता आहे.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

ज्या टोकनसाठी आम्ही प्रॉक्सी आहोत त्याचा पत्ता.

```solidity

    /**
     * @dev टोकनचा पत्ता निर्दिष्ट करा
     * @param tokenAddr_ ERC-20 कॉन्ट्रॅक्टचा पत्ता
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // कन्स्ट्रक्टर
```

आम्हाला निर्दिष्ट करण्याची आवश्यकता असलेला टोकन पत्ता हा एकमेव पॅरामीटर आहे.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

कॅलडेटा मधून मूल्य वाचा.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal लांबीची मर्यादा 32 बाइट्स आहे");

        require(length + startByte <= msg.data.length,
            "calldataVal calldatasize च्या पलीकडे वाचण्याचा प्रयत्न करत आहे");
```

आपण मेमरीमध्ये एकच 32-बाइट (256-बिट) शब्द लोड करणार आहोत आणि जे बाइट्स आपल्याला हव्या असलेल्या फील्डचा भाग नाहीत ते काढून टाकणार आहोत.
हे अल्गोरिदम 32 बाइटपेक्षा जास्त लांबीच्या मूल्यांसाठी कार्य करत नाही, आणि अर्थातच आपण कॅलडेटाच्या शेवटाच्या पुढे वाचू शकत नाही.
L1 वर गॅस वाचवण्यासाठी या चाचण्या वगळणे आवश्यक असू शकते, परंतु L2 वर गॅस अत्यंत स्वस्त आहे, ज्यामुळे आपण विचार करू शकणाऱ्या कोणत्याही सॅनिटी तपासण्या शक्य होतात.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

आपण `fallback()` (खाली पहा) च्या कॉलमधून डेटा कॉपी करू शकलो असतो, परंतु EVM ची असेंब्ली भाषा [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) वापरणे सोपे आहे.

येथे आपण स्टॅकमध्ये `startByte` ते `startByte+31` बाइट्स वाचण्यासाठी [CALLDATALOAD ऑपकोड](https://www.evm.codes/#35) वापरतो.
सर्वसाधारणपणे, Yul मधील ऑपकोडचे सिंटॅक्स `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` असे आहे.

```solidity

        _retVal = _retVal >> (256-length*8);
```

केवळ सर्वात लक्षणीय `length` बाइट्स फील्डचा भाग आहेत, म्हणून आपण इतर मूल्ये काढून टाकण्यासाठी [राइट-शिफ्ट](https://en.wikipedia.org/wiki/Logical_shift) करतो.
याचा अतिरिक्त फायदा असा आहे की ते मूल्य फील्डच्या उजवीकडे हलवते, त्यामुळे ते मूल्य स्वतःच आहे, 256<sup>something</sup> पट मूल्य नाही.

```solidity

        return _retVal;
    }


    fallback() external {
```

जेव्हा Solidity कॉन्ट्रॅक्टला केलेला कॉल कोणत्याही फंक्शन सिग्नेचरशी जुळत नाही, तेव्हा ते (एक आहे असे गृहीत धरून) [`fallback()` फंक्शन](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) कॉल करते.
`CalldataInterpreter` च्या बाबतीत, _कोणताही_ कॉल येथे येतो कारण इतर कोणतेही `external` किंवा `public` फंक्शन्स नाहीत.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

कॅलडेटाचा पहिला बाइट वाचा, जो आपल्याला फंक्शन सांगतो.
येथे एखादे फंक्शन उपलब्ध नसण्याची दोन कारणे आहेत:

1. `pure` किंवा `view` असणारी फंक्शन्स स्थिती बदलत नाहीत आणि त्यांना गॅस लागत नाही (जेव्हा ऑफचेन कॉल केले जाते).
   त्यांचा गॅस खर्च कमी करण्याचा प्रयत्न करण्यात काही अर्थ नाही.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) वर अवलंबून असलेली फंक्शन्स.
   `msg.sender` चे मूल्य `CalldataInterpreter` चा पत्ता असेल, कॉलरचा नाही.

दुर्दैवाने, [ERC-20 स्पेसिफिकेशन्स पाहिल्यास](https://eips.ethereum.org/EIPS/eip-20), फक्त एकच फंक्शन उरते, `transfer`.
यामुळे आपल्याकडे फक्त दोन फंक्शन्स उरतात: `transfer` (कारण आपण `transferFrom` कॉल करू शकतो) आणि `faucet` (कारण आपण ज्याने आपल्याला कॉल केला आहे त्याला टोकन परत हस्तांतरित करू शकतो).

```solidity

        // कॅलडेटामधील माहिती वापरून टोकनच्या स्थिती बदलणाऱ्या पद्धतींना कॉल करा
        // 

        // फॉसेट
        if (_func == 1) {
```

`faucet()` ला कॉल, ज्यामध्ये पॅरामीटर्स नाहीत.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

आपण `token.faucet()` कॉल केल्यावर आपल्याला टोकन्स मिळतात. तथापि, प्रॉक्सी कॉन्ट्रॅक्ट म्हणून, आम्हाला टोकनची **गरज** नाही.
आपल्याला कॉल करणार्‍या EOA (बाह्य मालकीच्या खात्याला) किंवा कॉन्ट्रॅक्टला गरज आहे.
म्हणून आम्ही आमचे सर्व टोकन ज्याने आम्हाला कॉल केला आहे त्याला हस्तांतरित करतो.

```solidity
        // हस्तांतरण (आपल्याकडे त्यासाठी भत्ता आहे असे गृहीत धरा)
        if (_func == 2) {
```

टोकन हस्तांतरित करण्यासाठी दोन पॅरामीटर्स आवश्यक आहेत: गंतव्य पत्ता आणि रक्कम.

```solidity
            token.transferFrom(
                msg.sender,
```

आम्ही फक्त कॉल करणाऱ्यांना त्यांच्या मालकीचे टोकन हस्तांतरित करण्याची परवानगी देतो

```solidity
                address(uint160(calldataVal(1, 20))),
```

गंतव्य पत्ता बाइट #1 पासून सुरू होतो (बाइट #0 हे फंक्शन आहे).
एक पत्ता म्हणून, तो 20-बाइट लांब आहे.

```solidity
                calldataVal(21, 2)
```

या विशिष्ट कॉन्ट्रॅक्टसाठी आपण असे गृहीत धरतो की कोणीही हस्तांतरित करू इच्छित असलेल्या टोकनची कमाल संख्या दोन बाइटमध्ये (65536 पेक्षा कमी) बसते.

```solidity
            );
        }
```

एकंदरीत, हस्तांतरणासाठी 35 बाइट्सचा कॅलडेटा लागतो:

| विभाग           | लांबी | बाइट्स |
| --------------- | ----: | -----: |
| फंक्शन सिलेक्टर |     1 |      0 |
| गंतव्य पत्ता    |    32 |   1-32 |
| रक्कम           |     2 |  33-34 |

```solidity
    }   // फॉलबॅक

}       // कॉन्ट्रॅक्ट CalldataInterpreter
```

### test.js {#test-js}

[हे JavaScript युनिट टेस्ट](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) आपल्याला हे तंत्र कसे वापरावे (आणि ते योग्यरित्या कार्य करते की नाही हे कसे सत्यापित करावे) हे दाखवते.
मी असे गृहीत धरणार आहे की तुम्हाला [chai](https://www.chaijs.com/) आणि [ethers](https://docs.ethers.io/v5/) समजतात आणि केवळ कॉन्ट्रॅक्टवर विशेषतः लागू होणारे भाग स्पष्ट करणार आहे.

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

आम्ही व्यवहार तयार करण्यासाठी सामान्यतः वापरत असलेली उच्च-स्तरीय फंक्शन्स (जसे की `token.faucet()`) वापरू शकत नाही, कारण आम्ही ABI चे पालन करत नाही.
त्याऐवजी, आपल्याला स्वतः व्यवहार तयार करून तो पाठवावा लागेल.

```javascript
      to: cdi.address,
      data: "0x01"
```

व्यवहारासाठी आपल्याला दोन पॅरामीटर्स द्यावे लागतील:

1. `to`, गंतव्य पत्ता.
   हा कॅलडेटा इंटरप्रिटर कॉन्ट्रॅक्ट आहे.
2. `data`, पाठवण्यासाठी कॅलडेटा.
   फॉसेट कॉलच्या बाबतीत, डेटा एकच बाइट आहे, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

आम्ही [साईनरच्या `sendTransaction` पद्धतीला](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) कॉल करतो कारण आम्ही आधीच गंतव्य (`faucetTx.to`) निर्दिष्ट केले आहे आणि आम्हाला व्यवहार स्वाक्षरी केलेला हवा आहे.

```javascript
// फॉसेट टोकन योग्यरित्या पुरवतो का ते तपासा
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

येथे आपण शिल्लक तपासतो.
`view` फंक्शन्सवर गॅस वाचवण्याची गरज नाही, म्हणून आपण त्यांना सामान्यपणे चालवतो.

```javascript
// CDI ला भत्ता द्या (मंजुरी प्रॉक्सी केली जाऊ शकत नाही)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

हस्तांतरण करण्यासाठी कॅलडेटा इंटरप्रिटरला भत्ता द्या.

```javascript
// टोकन हस्तांतरित करा
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

एक हस्तांतरण व्यवहार तयार करा. पहिला बाइट "0x02" आहे, त्यानंतर गंतव्य पत्ता आणि शेवटी रक्कम (0x0100, जे दशांश मध्ये 256 आहे).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // तपासा की आपल्याकडे 256 टोकन कमी आहेत
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // आणि ते आपल्या गंतव्यस्थानाला मिळाले आहेत
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // ते
})      // वर्णन करा
```

## जेव्हा तुम्ही गंतव्य कॉन्ट्रॅक्टवर नियंत्रण ठेवता तेव्हा खर्च कमी करणे {#reducing-the-cost-when-you-do-control-the-destination-contract}

जर तुमचे गंतव्य कॉन्ट्रॅक्टवर नियंत्रण असेल तर तुम्ही अशी फंक्शन्स तयार करू शकता जी `msg.sender` तपासण्यांना बायपास करतात कारण ते कॅलडेटा इंटरप्रिटरवर विश्वास ठेवतात.
[हे कसे कार्य करते याचे उदाहरण तुम्ही येथे पाहू शकता, `control-contract` शाखेत](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

जर कॉन्ट्रॅक्ट केवळ बाह्य व्यवहारांना प्रतिसाद देत असेल, तर आपण फक्त एका कॉन्ट्रॅक्टने काम चालवू शकलो असतो.
तथापि, ते [कंपोझिबिलिटी](/developers/docs/smart-contracts/composability/) खंडित करेल.
सामान्य ERC-20 कॉल्सला प्रतिसाद देणारा एक कॉन्ट्रॅक्ट आणि लहान कॉल डेटासह व्यवहारांना प्रतिसाद देणारा दुसरा कॉन्ट्रॅक्ट असणे खूप चांगले आहे.

### Token.sol {#token-sol-2}

या उदाहरणात आपण `Token.sol` मध्ये बदल करू शकतो.
हे आपल्याला अनेक फंक्शन्स ठेवण्याची परवानगी देते जे फक्त प्रॉक्सी कॉल करू शकते.
हे नवीन भाग आहेत:

```solidity
    // CalldataInterpreter पत्ता निर्दिष्ट करण्याची परवानगी असलेला एकमेव पत्ता
    address owner;

    // CalldataInterpreter पत्ता
    address proxy = address(0);
```

ERC-20 कॉन्ट्रॅक्टला अधिकृत प्रॉक्सीची ओळख माहित असणे आवश्यक आहे.
तथापि, आपण हे व्हेरिएबल कन्स्ट्रक्टरमध्ये सेट करू शकत नाही, कारण आपल्याला अद्याप मूल्य माहित नाही.
हा कॉन्ट्रॅक्ट प्रथम इन्स्टंटिएट केला जातो कारण प्रॉक्सीला त्याच्या कन्स्ट्रक्टरमध्ये टोकनच्या पत्त्याची अपेक्षा असते.

```solidity
    /**
     * @dev ERC20 कन्स्ट्रक्टरला कॉल करते.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

निर्मात्याचा पत्ता (ज्याला `owner` म्हणतात) येथे संग्रहित केला जातो कारण प्रॉक्सी सेट करण्याची परवानगी असलेला तो एकमेव पत्ता आहे.

```solidity
    /**
     * @dev प्रॉक्सीसाठी (CalldataInterpreter) पत्ता सेट करा.
     * मालकाद्वारे फक्त एकदाच कॉल केले जाऊ शकते
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "फक्त मालकाद्वारे कॉल केले जाऊ शकते");
        require(proxy == address(0), "प्रॉक्सी आधीच सेट आहे");

        proxy = _proxy;
    }    // फंक्शन setProxy
```

प्रॉक्सीला विशेषाधिकारित प्रवेश आहे, कारण ते सुरक्षा तपासण्या बायपास करू शकते.
आपण प्रॉक्सीवर विश्वास ठेवू शकतो याची खात्री करण्यासाठी, आम्ही फक्त `owner` ला हे फंक्शन कॉल करू देतो, आणि फक्त एकदाच.
एकदा `proxy` चे वास्तविक मूल्य (शून्य नाही) आले की, ते मूल्य बदलू शकत नाही, त्यामुळे मालकाने बदमाश होण्याचा निर्णय घेतला तरी, किंवा त्यासाठीचा मेमोनिक उघड झाला तरी, आपण तरीही सुरक्षित आहोत.

```solidity
    /**
     * @dev काही फंक्शन्स फक्त प्रॉक्सीद्वारे कॉल केली जाऊ शकतात.
     */
    modifier onlyProxy {
```

हे एक [`modifier` फंक्शन](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) आहे, ते इतर फंक्शन्सच्या कार्यपद्धतीत बदल करते.

```solidity
      require(msg.sender == proxy);
```

प्रथम, सत्यापित करा की आपल्याला प्रॉक्सीने आणि इतर कोणीही कॉल केलेला नाही.
नसल्यास, `revert` करा.

```solidity
      _;
    }
```

तसे असल्यास, आपण सुधारित करत असलेले फंक्शन चालवा.

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

या तीन क्रिया आहेत ज्यांना सामान्यतः टोकन हस्तांतरित करणाऱ्या किंवा भत्ता मंजूर करणाऱ्या घटकाकडून थेट संदेश येण्याची आवश्यकता असते.
येथे आमच्याकडे या ऑपरेशन्सची प्रॉक्सी आवृत्ती आहे जी:

1. `onlyProxy()` द्वारे सुधारित केले आहे जेणेकरून इतर कोणालाही त्यांना नियंत्रित करण्याची परवानगी नाही.
2. जो पत्ता सामान्यतः `msg.sender` असतो तो अतिरिक्त पॅरामीटर म्हणून मिळवतो.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

कॅलडेटा इंटरप्रिटर वरील इंटरप्रिटरसारखाच आहे, फक्त प्रॉक्सी केलेल्या फंक्शन्सना `msg.sender` पॅरामीटर मिळतो आणि `transfer` साठी भत्त्याची गरज नसते.

```solidity
        // हस्तांतरण (भत्त्याची गरज नाही)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // मंजूर करा
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

मागील टेस्टिंग कोड आणि या कोडमध्ये काही बदल आहेत.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

आम्हाला ERC-20 कॉन्ट्रॅक्टला कोणत्या प्रॉक्सीवर विश्वास ठेवावा हे सांगावे लागेल

```js
console.log("CalldataInterpreter addr:", cdi.address)

// भत्ते तपासण्यासाठी दोन स्वाक्षरीकर्त्यांची आवश्यकता आहे
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` आणि `transferFrom()` तपासण्यासाठी आम्हाला दुसऱ्या स्वाक्षरीकर्त्याची आवश्यकता आहे.
आम्ही त्याला `poorSigner` म्हणतो कारण त्याला आमचे कोणतेही टोकन मिळत नाहीत (अर्थात, त्याच्याकडे ETH असणे आवश्यक आहे).

```js
// टोकन हस्तांतरित करा
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

कारण ERC-20 कॉन्ट्रॅक्ट प्रॉक्सी (`cdi`) वर विश्वास ठेवतो, आम्हाला हस्तांतरण रिले करण्यासाठी भत्त्याची गरज नाही.

```js
// मंजूरी आणि transferFrom
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

// approve / transferFrom कॉम्बो योग्यरित्या केले होते की नाही हे तपासा
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

दोन नवीन फंक्शन्सची चाचणी घ्या.
लक्षात घ्या की `transferFromTx` ला दोन पत्ता पॅरामीटर्स आवश्यक आहेत: भत्त्याचा दाता आणि स्वीकारकर्ता.

## निष्कर्ष {#conclusion}

दोन्ही [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) आणि [Arbitrum](https://developer.offchainlabs.com/docs/special_features) L1 वर लिहिलेल्या कॅलडेटाचा आकार आणि त्यामुळे व्यवहारांची किंमत कमी करण्याचे मार्ग शोधत आहेत.
तथापि, सामान्य उपायांचा शोध घेणारे पायाभूत सुविधा प्रदाते म्हणून, आमच्या क्षमता मर्यादित आहेत.
dapp डेव्हलपर म्हणून, आपल्याकडे अनुप्रयोगा-विशिष्ट ज्ञान आहे, जे आपल्याला सामान्य समाधानापेक्षा आपले कॅलडेटा अधिक चांगल्या प्रकारे ऑप्टिमाइझ करू देते.
आशा आहे की, हा लेख आपल्याला आपल्या गरजांसाठी आदर्श समाधान शोधण्यात मदत करेल.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).

