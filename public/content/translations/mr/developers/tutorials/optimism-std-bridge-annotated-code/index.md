---
title: "ऑप्टिमिझम् स्टँडर्ड सेतू कॉन्ट्रॅक्ट वॉकथ्रू"
description: "ऑप्टिमिझम्साठी स्टँडर्ड सेतू कसा काम करतो? तो अशा प्रकारे का काम करतो?"
author: "ओरी पोमेरँट्झ"
tags:
  - solidity
  - सेतू
  - स्तर २ (l2)
skill: intermediate
breadcrumb: "ऑप्टिमिझम् सेतू"
published: 2022-03-30
lang: mr
---

[ऑप्टिमिझम्](https://www.optimism.io/) हा एक [ऑप्टिमिस्टिक रोलअप](/developers/docs/scaling/optimistic-rollups/) आहे.
ऑप्टिमिस्टिक रोलअप्स इथरियम मेननेट (ज्याला स्तर १ (l1) असेही म्हणतात) पेक्षा खूप कमी किमतीत व्यवहारांवर प्रक्रिया करू शकतात कारण नेटवर्कवरील प्रत्येक नोडऐवजी केवळ काही नोड्सद्वारे व्यवहारांवर प्रक्रिया केली जाते.
त्याच वेळी, सर्व डेटा L1 वर लिहिला जातो जेणेकरून मेननेटच्या सर्व अखंडता आणि उपलब्धतेच्या हमीसह सर्वकाही सिद्ध आणि पुनर्रचित केले जाऊ शकते.

ऑप्टिमिझम् (किंवा इतर कोणत्याही L2) वर L1 मालमत्ता वापरण्यासाठी, मालमत्तांना [सेतू](/bridges/#prerequisites) करणे आवश्यक आहे.
हे साध्य करण्याचा एक मार्ग म्हणजे वापरकर्त्यांनी L1 वर मालमत्ता (ETH आणि [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) सर्वात सामान्य आहेत) लॉक करणे आणि L2 वर वापरण्यासाठी समतुल्य मालमत्ता प्राप्त करणे.
अखेरीस, ज्याच्याकडे ते असतील त्यांना ते परत L1 वर सेतू करण्याची इच्छा असू शकते.
असे करताना, मालमत्ता L2 वर जाळल्या जातात आणि नंतर L1 वर वापरकर्त्याला परत दिल्या जातात.

[ऑप्टिमिझम् स्टँडर्ड सेतू](https://docs.optimism.io/app-developers/bridging/standard-bridge) याच प्रकारे काम करतो.
या लेखात आपण तो सेतू कसा काम करतो हे पाहण्यासाठी त्याच्या सोर्स कोडचा आढावा घेऊ आणि चांगल्या प्रकारे लिहिलेल्या Solidity कोडचे उदाहरण म्हणून त्याचा अभ्यास करू.

## नियंत्रण प्रवाह {#control-flows}

सेतूचे दोन मुख्य प्रवाह आहेत:

- जमा करणे (L1 कडून L2 कडे)
- रक्कम काढणे (L2 कडून L1 कडे)

### जमा करण्याचा प्रवाह {#deposit-flow}

#### स्तर १ (l1) {#deposit-flow-layer-1}

1. जर ERC-20 जमा करत असाल, तर जमाकर्ता सेतूला जमा केली जाणारी रक्कम खर्च करण्यासाठी मंजुरी देतो
2. जमाकर्ता L1 सेतूला कॉल करतो (`depositERC20`, `depositERC20To`, `depositETH`, किंवा `depositETHTo`)
3. L1 सेतू सेतू केलेल्या मालमत्तेचा ताबा घेतो
   - ETH: कॉलचा भाग म्हणून जमाकर्त्याद्वारे मालमत्तेचे हस्तांतरण केले जाते
   - ERC-20: जमाकर्त्याने दिलेल्या मंजुरीचा वापर करून सेतू स्वतःकडे मालमत्तेचे हस्तांतरण करतो
4. L1 सेतू L2 सेतूवरील `finalizeDeposit` ला कॉल करण्यासाठी क्रॉस-डोमेन संदेश यंत्रणेचा वापर करतो

#### स्तर २ (l2) {#deposit-flow-layer-2}

5. L2 सेतू `finalizeDeposit` ला केलेला कॉल कायदेशीर असल्याची पडताळणी करतो:
   - क्रॉस डोमेन संदेश कॉन्ट्रॅक्टमधून आला आहे
   - मूळतः L1 वरील सेतूमधून आला होता
6. L2 सेतू तपासतो की L2 वरील ERC-20 टोकन कॉन्ट्रॅक्ट योग्य आहे की नाही:
   - L2 कॉन्ट्रॅक्ट अहवाल देतो की त्याचा L1 समकक्ष तोच आहे ज्यातून L1 वर टोकन आले होते
   - L2 कॉन्ट्रॅक्ट अहवाल देतो की तो योग्य इंटरफेसचे समर्थन करतो ([ERC-165 वापरून](https://eips.ethereum.org/EIPS/eip-165)).
7. जर L2 कॉन्ट्रॅक्ट योग्य असेल, तर योग्य पत्त्यावर योग्य संख्येने टोकन मिंट करण्यासाठी त्याला कॉल करा. नसल्यास, वापरकर्त्याला L1 वर टोकनचा दावा करण्याची अनुमती देण्यासाठी रक्कम काढण्याची प्रक्रिया सुरू करा.

### रक्कम काढण्याचा प्रवाह {#withdrawal-flow}

#### स्तर २ (l2) {#withdrawal-flow-layer-2}

1. रक्कम काढणारा L2 सेतूला कॉल करतो (`withdraw` किंवा `withdrawTo`)
2. L2 सेतू `msg.sender` च्या मालकीचे योग्य संख्येने टोकन जाळतो
3. L2 सेतू L1 सेतूवरील `finalizeETHWithdrawal` किंवा `finalizeERC20Withdrawal` ला कॉल करण्यासाठी क्रॉस-डोमेन संदेश यंत्रणेचा वापर करतो

#### स्तर १ (l1) {#withdrawal-flow-layer-1}

4. L1 सेतू `finalizeETHWithdrawal` किंवा `finalizeERC20Withdrawal` ला केलेला कॉल कायदेशीर असल्याची पडताळणी करतो:
   - क्रॉस डोमेन संदेश यंत्रणेतून आला आहे
   - मूळतः L2 वरील सेतूमधून आला होता
5. L1 सेतू योग्य मालमत्तेचे (ETH किंवा ERC-20) योग्य पत्त्यावर हस्तांतरण करतो

## स्तर १ (l1) कोड {#layer-1-code}

हा तो कोड आहे जो L1, इथरियम मेननेटवर चालतो.

### IL1ERC20Bridge {#il1erc20bridge}

[हा इंटरफेस येथे परिभाषित केला आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
यात ERC-20 टोकन सेतू करण्यासाठी आवश्यक असलेली फंक्शन्स आणि व्याख्या समाविष्ट आहेत.

```solidity
// SPDX-License-Identifier: MIT
```

[ऑप्टिमिझम् चा बहुतांश कोड MIT परवान्याअंतर्गत प्रकाशित केला आहे](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

हे लिहित असताना Solidity ची नवीनतम आवृत्ती 0.8.12 आहे.
जोपर्यंत आवृत्ती 0.9.0 प्रकाशित होत नाही, तोपर्यंत हा कोड त्याच्याशी सुसंगत आहे की नाही हे आपल्याला माहीत नाही.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * घटना *
     **********/

    event ERC20DepositInitiated(
```

ऑप्टिमिझम् सेतूच्या परिभाषेत _deposit_ (जमा करणे) म्हणजे L1 कडून L2 कडे हस्तांतरण, आणि _withdrawal_ (रक्कम काढणे) म्हणजे L2 कडून L1 कडे हस्तांतरण.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

बहुतेक प्रकरणांमध्ये L1 वरील ERC-20 चा पत्ता L2 वरील समतुल्य ERC-20 च्या पत्त्यासारखा नसतो.
[तुम्ही टोकन पत्त्यांची यादी येथे पाहू शकता](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 असलेला पत्ता L1 (मुख्यनेट) वर आहे आणि `chainId` 10 असलेला पत्ता L2 (ऑप्टिमिझम्) वर आहे.
इतर दोन `chainId` मूल्ये कोव्हान (Kovan) चाचणी नेटवर्क (42) आणि ऑप्टिमिस्टिक कोव्हान चाचणी नेटवर्क (69) साठी आहेत.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

हस्तांतरणांमध्ये नोट्स जोडणे शक्य आहे, अशा परिस्थितीत ते त्यांचा अहवाल देणाऱ्या घटनांमध्ये जोडले जातात.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

तोच सेतू कॉन्ट्रॅक्ट दोन्ही दिशांनी हस्तांतरण हाताळतो.
L1 सेतूच्या बाबतीत, याचा अर्थ जमा करण्याची सुरुवात आणि रक्कम काढण्याची अंतिम प्रक्रिया असा होतो.

```solidity

    /********************
     * सार्वजनिक फंक्शन्स *
     ********************/

    /**
     * @dev संबंधित स्तर २ (l2) सेतू कॉन्ट्रॅक्टचा पत्ता मिळवा.
     * @return संबंधित स्तर २ (l2) सेतू कॉन्ट्रॅक्टचा पत्ता.
     */
    function l2TokenBridge() external returns (address);
```

या फंक्शनची खरोखर गरज नाही, कारण L2 वर तो एक पूर्व-प्रस्थापित केलेला कॉन्ट्रॅक्ट आहे, त्यामुळे तो नेहमी `0x4200000000000000000000000000000000000010` पत्त्यावर असतो.
हे येथे L2 सेतूसह सममितीसाठी आहे, कारण L1 सेतूचा पत्ता जाणून घेणे सोपे _नाही_.

```solidity
    /**
     * @dev कॉलरच्या स्तर २ (l2) वरील शिल्लकीमध्ये ERC-20 ची रक्कम जमा करा.
     * @param _l1Token आपण जमा करत असलेल्या स्तर १ (l1) ERC-20 चा पत्ता
     * @param _l2Token स्तर १ (l1) च्या संबंधित स्तर २ (l2) ERC-20 चा पत्ता
     * @param _amount जमा करायची ERC-20 ची रक्कम
     * @param _l2Gas स्तर २ (l2) वर जमा पूर्ण करण्यासाठी आवश्यक गॅस मर्यादा.
     * @param _data स्तर २ (l2) वर पाठवण्यासाठी पर्यायी डेटा. हा डेटा केवळ बाह्य कॉन्ट्रॅक्ट्सच्या सोयीसाठी प्रदान केला आहे. कमाल लांबी लागू करण्याव्यतिरिक्त, हे कॉन्ट्रॅक्ट्स त्याच्या सामग्रीबद्दल कोणतीही हमी देत नाहीत.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` पॅरामीटर ही L2 गॅसची रक्कम आहे जी व्यवहाराला खर्च करण्याची परवानगी आहे.
[एका विशिष्ट (उच्च) मर्यादेपर्यंत, हे विनामूल्य आहे](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), त्यामुळे जोपर्यंत ERC-20 कॉन्ट्रॅक्ट मिंटिंग करताना काहीतरी खरोखरच विचित्र करत नाही, तोपर्यंत ही समस्या नसावी.
हे फंक्शन सामान्य परिस्थितीची काळजी घेते, जिथे वापरकर्ता वेगवेगळ्या ब्लॉकचेनवरील समान पत्त्यावर मालमत्ता सेतू करतो.

```solidity
    /**
     * @dev प्राप्तकर्त्याच्या स्तर २ (l2) वरील शिल्लकीमध्ये ERC-20 ची रक्कम जमा करा.
     * @param _l1Token आपण जमा करत असलेल्या स्तर १ (l1) ERC-20 चा पत्ता
     * @param _l2Token स्तर १ (l1) च्या संबंधित स्तर २ (l2) ERC-20 चा पत्ता
     * @param _to रक्कम काढणे जमा करण्यासाठी स्तर २ (l2) पत्ता.
     * @param _amount जमा करायची ERC-20 ची रक्कम.
     * @param _l2Gas स्तर २ (l2) वर जमा पूर्ण करण्यासाठी आवश्यक गॅस मर्यादा.
     * @param _data स्तर २ (l2) वर पाठवण्यासाठी पर्यायी डेटा. हा डेटा केवळ बाह्य कॉन्ट्रॅक्ट्सच्या सोयीसाठी प्रदान केला आहे. कमाल लांबी लागू करण्याव्यतिरिक्त, हे कॉन्ट्रॅक्ट्स त्याच्या सामग्रीबद्दल कोणतीही हमी देत नाहीत.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

हे फंक्शन जवळजवळ `depositERC20` सारखेच आहे, परंतु ते तुम्हाला ERC-20 वेगळ्या पत्त्यावर पाठवू देते.

```solidity
    /*************************
     * क्रॉस-चेन फंक्शन्स *
     *************************/

    /**
     * @dev स्तर २ (l2) वरून स्तर १ (l1) मध्ये रक्कम काढणे पूर्ण करा, आणि प्राप्तकर्त्याच्या स्तर १ (l1) ERC-20 टोकन शिल्लकीमध्ये निधी जमा करा.
     * जर स्तर २ (l2) वरून सुरू केलेले रक्कम काढणे अंतिम झाले नसेल तर हा कॉल अयशस्वी होईल.
     *
     * @param _l1Token finalizeWithdrawal करण्यासाठी स्तर १ (l1) टोकनचा पत्ता.
     * @param _l2Token स्तर २ (l2) टोकनचा पत्ता जिथे रक्कम काढणे सुरू केले गेले.
     * @param _from हस्तांतरण सुरू करणारा स्तर २ (l2) पत्ता.
     * @param _to रक्कम काढणे जमा करण्यासाठी स्तर १ (l1) पत्ता.
     * @param _amount जमा करायची ERC-20 ची रक्कम.
     * @param _data प्रेषकाने स्तर २ (l2) वर प्रदान केलेला डेटा. हा डेटा केवळ बाह्य कॉन्ट्रॅक्ट्सच्या सोयीसाठी प्रदान केला आहे. कमाल लांबी लागू करण्याव्यतिरिक्त, हे कॉन्ट्रॅक्ट्स त्याच्या सामग्रीबद्दल कोणतीही हमी देत नाहीत.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

ऑप्टिमिझम् मध्ये रक्कम काढणे (आणि L2 कडून L1 कडे जाणारे इतर संदेश) ही दोन टप्प्यांची प्रक्रिया आहे:

1. L2 वर एक सुरुवातीचा व्यवहार.
2. L1 वर अंतिम किंवा दावा करणारा व्यवहार.
   हा व्यवहार L2 व्यवहारासाठी [दोष आव्हान कालावधी (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) संपल्यानंतर होणे आवश्यक आहे.

### IL1StandardBridge {#il1standardbridge}

[हा इंटरफेस येथे परिभाषित केला आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
या फाईलमध्ये ETH साठी घटना आणि फंक्शनच्या व्याख्या आहेत.
या व्याख्या ERC-20 साठी वर परिभाषित केलेल्या `IL1ERC20Bridge` च्या अगदी समान आहेत.

सेतू इंटरफेस दोन फाईल्समध्ये विभागलेला आहे कारण काही ERC-20 टोकन्सना सानुकूल प्रक्रियेची आवश्यकता असते आणि ते स्टँडर्ड सेतूद्वारे हाताळले जाऊ शकत नाहीत.
अशा प्रकारे अशा टोकनला हाताळणारा सानुकूल सेतू `IL1ERC20Bridge` लागू करू शकतो आणि त्याला ETH सेतू करण्याची आवश्यकता नसते.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * घटना *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

ही घटना ERC-20 आवृत्ती (`ERC20DepositInitiated`) च्या जवळजवळ समान आहे, फक्त L1 आणि L2 टोकन पत्त्यांशिवाय.
इतर घटना आणि फंक्शन्ससाठीही हेच खरे आहे.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * सार्वजनिक फंक्शन्स *
     ********************/

    /**
     * @dev कॉलरच्या स्तर २ (l2) वरील शिल्लकीमध्ये ETH ची रक्कम जमा करा.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev प्राप्तकर्त्याच्या स्तर २ (l2) वरील शिल्लकीमध्ये ETH ची रक्कम जमा करा.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * क्रॉस-चेन फंक्शन्स *
     *************************/

    /**
     * @dev स्तर २ (l2) वरून स्तर १ (l1) मध्ये रक्कम काढणे पूर्ण करा, आणि प्राप्तकर्त्याच्या स्तर १ (l1) ETH टोकन शिल्लकीमध्ये निधी जमा करा. केवळ xDomainMessenger या फंक्शनला कॉल करू शकत असल्याने, रक्कम काढणे अंतिम होण्यापूर्वी याला कधीही कॉल केले जाणार नाही.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

इतर स्तरावर संदेश पाठवण्यासाठी [हा कॉन्ट्रॅक्ट](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) दोन्ही सेतूंद्वारे ([L1](#the-l1-bridge-contract) आणि [L2](#l2-bridge-code)) इनहेरिट केला जातो.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* इंटरफेस इम्पोर्ट्स */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[हा इंटरफेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) क्रॉस डोमेन मेसेंजर वापरून इतर स्तरावर संदेश कसे पाठवायचे हे कॉन्ट्रॅक्टला सांगतो.
हा क्रॉस डोमेन मेसेंजर एक संपूर्ण वेगळी प्रणाली आहे, आणि त्यासाठी एक स्वतंत्र लेख आवश्यक आहे, जो मी भविष्यात लिहीन अशी आशा आहे.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev क्रॉस-डोमेन संप्रेषण करणाऱ्या कॉन्ट्रॅक्ट्ससाठी मदतनीस कॉन्ट्रॅक्ट
 *
 * वापरलेला कंपायलर: इनहेरिटिंग कॉन्ट्रॅक्टद्वारे परिभाषित
 */
contract CrossDomainEnabled {
    /*************
     * व्हेरिएबल्स *
     *************/

    // इतर डोमेनवरून संदेश पाठवण्यासाठी आणि प्राप्त करण्यासाठी वापरले जाणारे मेसेंजर कॉन्ट्रॅक्ट.
    address public messenger;

    /***************
     * कन्स्ट्रक्टर *
     ***************/

    /**
     * @param _messenger वर्तमान स्तरावरील CrossDomainMessenger चा पत्ता.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

कॉन्ट्रॅक्टला माहित असणे आवश्यक असलेले एक पॅरामीटर म्हणजे या स्तरावरील क्रॉस डोमेन मेसेंजरचा पत्ता.
हे पॅरामीटर कन्स्ट्रक्टरमध्ये एकदाच सेट केले जाते आणि कधीही बदलत नाही.

```solidity

    /**********************
     * फंक्शन मॉडिफायर्स *
     **********************/

    /**
     * सुधारित फंक्शन केवळ विशिष्ट क्रॉस-डोमेन खात्याद्वारेच कॉल करण्यायोग्य आहे याची सक्ती करते.
     * @param _sourceDomainAccount मूळ डोमेनमधील एकमेव खाते जे हे फंक्शन कॉल करण्यासाठी प्रमाणित आहे.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

क्रॉस डोमेन मेसेजिंग ज्या ब्लॉकचेनवर चालत आहे (इथरियम मेननेट किंवा ऑप्टिमिझम्) त्यावरील कोणत्याही कॉन्ट्रॅक्टद्वारे ॲक्सेस करण्यायोग्य आहे.
परंतु आपल्याला प्रत्येक बाजूच्या सेतूने _केवळ_ विशिष्ट संदेशांवर विश्वास ठेवणे आवश्यक आहे जर ते दुसऱ्या बाजूच्या सेतूमधून आले असतील.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

केवळ योग्य क्रॉस डोमेन मेसेंजरकडून (`messenger`, जसे तुम्ही खाली पाहू शकता) आलेल्या संदेशांवर विश्वास ठेवला जाऊ शकतो.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

क्रॉस डोमेन मेसेंजर ज्या पद्धतीने इतर स्तरासह संदेश पाठवणाऱ्याचा पत्ता प्रदान करतो तो म्हणजे [`.xDomainMessageSender()` फंक्शन](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
जोपर्यंत संदेशाद्वारे सुरू केलेल्या व्यवहारामध्ये त्याला कॉल केला जातो तोपर्यंत तो ही माहिती देऊ शकतो.

आपल्याला प्राप्त झालेला संदेश दुसऱ्या सेतूमधून आला आहे याची खात्री करणे आवश्यक आहे.

```solidity

        _;
    }

    /**********************
     * अंतर्गत फंक्शन्स *
     **********************/

    /**
     * मेसेंजर मिळवते, सहसा स्टोरेजमधून. जर चाइल्ड कॉन्ट्रॅक्टला ओव्हरराइड करण्याची आवश्यकता असेल तर हे फंक्शन उघड केले जाते.
     * @return वापरल्या जाणाऱ्या क्रॉस-डोमेन मेसेंजर कॉन्ट्रॅक्टचा पत्ता.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

हे फंक्शन क्रॉस डोमेन मेसेंजर परत करते.
कोणता क्रॉस डोमेन मेसेंजर वापरायचा हे निर्दिष्ट करण्यासाठी अल्गोरिदम वापरण्याची अनुमती देण्यासाठी आपण `messenger` व्हेरिएबलऐवजी फंक्शन वापरतो जे यातून इनहेरिट करतात.

```solidity

    /**
     * दुसऱ्या डोमेनमधील खात्यावर संदेश पाठवते
     * @param _crossDomainTarget गंतव्य डोमेनमधील इच्छित प्राप्तकर्ता
     * @param _message लक्ष्याला पाठवायचा डेटा (सहसा `onlyFromCrossDomainAccount()` असलेल्या फंक्शनसाठी कॉल डेटा)
     * @param _gasLimit लक्ष्य डोमेनवर संदेश प्राप्त करण्यासाठी गॅस मर्यादा.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

शेवटी, इतर स्तरावर संदेश पाठवणारे फंक्शन.

```solidity
    ) internal {
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना, पुनर्प्रवेश-benign
```

[स्लिदर](https://github.com/crytic/slither) हा एक स्टॅटिक ॲनालायझर आहे जो ऑप्टिमिझम् प्रत्येक कॉन्ट्रॅक्टवर असुरक्षा आणि इतर संभाव्य समस्या शोधण्यासाठी चालवतो.
या प्रकरणात, खालील ओळ दोन असुरक्षा ट्रिगर करते:

1. [पुनर्प्रवेश घटना](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [सौम्य पुनर्प्रवेश (Benign reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

या प्रकरणात आपल्याला पुनर्प्रवेशाची काळजी नाही कारण आपल्याला माहित आहे की `getCrossDomainMessenger()` एक विश्वासार्ह पत्ता परत करतो, जरी स्लिदरला ते जाणून घेण्याचा कोणताही मार्ग नसला तरीही.

### L1 सेतू कॉन्ट्रॅक्ट {#the-l1-bridge-contract}

[या कॉन्ट्रॅक्टचा सोर्स कोड येथे आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

इंटरफेस इतर कॉन्ट्रॅक्ट्सचा भाग असू शकतात, त्यामुळे त्यांना Solidity आवृत्त्यांच्या विस्तृत श्रेणीचे समर्थन करावे लागते.
परंतु सेतू स्वतः आपला कॉन्ट्रॅक्ट आहे, आणि तो कोणती Solidity आवृत्ती वापरतो याबद्दल आपण कठोर असू शकतो.

```solidity
/* इंटरफेस इम्पोर्ट्स */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) आणि [IL1StandardBridge](#il1standardbridge) वर स्पष्ट केले आहेत.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[हा इंटरफेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) आपल्याला L2 वरील स्टँडर्ड सेतू नियंत्रित करण्यासाठी संदेश तयार करू देतो.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[हा इंटरफेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) आपल्याला ERC-20 कॉन्ट्रॅक्ट्स नियंत्रित करू देतो.
[तुम्ही याबद्दल येथे अधिक वाचू शकता](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* लायब्ररी इम्पोर्ट्स */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[वर स्पष्ट केल्याप्रमाणे](#crossdomainenabled), हा कॉन्ट्रॅक्ट इंटरलेअर मेसेजिंगसाठी वापरला जातो.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) मध्ये L2 कॉन्ट्रॅक्ट्सचे पत्ते आहेत ज्यांचा पत्ता नेहमी समान असतो. यामध्ये L2 वरील स्टँडर्ड सेतूचा समावेश आहे.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[ओपनझेपलिनच्या ॲड्रेस युटिलिटीज](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). याचा वापर कॉन्ट्रॅक्ट पत्ते आणि बाह्य मालकीच्या खात्यांच्या (EOA) पत्त्यांमध्ये फरक करण्यासाठी केला जातो.

लक्षात घ्या की हा एक परिपूर्ण उपाय नाही, कारण थेट कॉल्स आणि कॉन्ट्रॅक्टच्या कन्स्ट्रक्टरमधून केलेल्या कॉल्समध्ये फरक करण्याचा कोणताही मार्ग नाही, परंतु किमान यामुळे आपल्याला काही सामान्य वापरकर्त्यांच्या चुका ओळखता येतात आणि टाळता येतात.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 स्टँडर्ड](https://eips.ethereum.org/EIPS/eip-20) कॉन्ट्रॅक्टला अपयश नोंदवण्यासाठी दोन मार्गांचे समर्थन करते:

1. पूर्ववत करणे
2. `false` परत करणे

दोन्ही प्रकरणे हाताळल्याने आपला कोड अधिक गुंतागुंतीचा होईल, त्यामुळे त्याऐवजी आपण [ओपनझेपलिनचे `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) वापरतो, जे [सर्व अपयशांचा परिणाम पूर्ववत करण्यात होईल](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) याची खात्री करते.

```solidity
/**
 * @title L1StandardBridge
 * @dev स्तर १ (l1) ETH आणि ERC-20 सेतू हे एक कॉन्ट्रॅक्ट आहे जे जमा केलेले स्तर १ (l1) निधी आणि स्तर २ (l2) वर वापरात असलेले मानक टोकन संचयित करते. हे संबंधित स्तर २ (l2) सेतू समक्रमित करते, त्याला ठेवींची माहिती देते आणि नव्याने अंतिम झालेल्या रक्कम काढणे यासाठी ऐकते.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

जेव्हा आपण `IERC20` इंटरफेस वापरतो तेव्हा प्रत्येक वेळी `SafeERC20` रॅपर वापरण्यासाठी आपण या ओळीद्वारे निर्दिष्ट करतो.

```solidity

    /********************************
     * बाह्य कॉन्ट्रॅक्ट संदर्भ *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) चा पत्ता.

```solidity

    // जमा केलेल्या स्तर १ (l1) टोकनच्या शिल्लकीसाठी स्तर १ (l1) टोकनला स्तर २ (l2) टोकनवर मॅप करते
    mapping(address => mapping(address => uint256)) public deposits;
```

अशा प्रकारची दुहेरी [मॅपिंग](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) ही [द्विमितीय स्पार्स ॲरे (two-dimensional sparse array)](https://en.wikipedia.org/wiki/Sparse_matrix) परिभाषित करण्याची पद्धत आहे.
या डेटा स्ट्रक्चरमधील मूल्ये `deposit[L1 token addr][L2 token addr]` म्हणून ओळखली जातात.
डीफॉल्ट मूल्य शून्य आहे.
केवळ वेगळ्या मूल्यावर सेट केलेले सेल्स स्टोरेजमध्ये लिहिले जातात.

```solidity

    /***************
     * कन्स्ट्रक्टर *
     ***************/

    // हे कॉन्ट्रॅक्ट प्रॉक्सीच्या मागे राहते, त्यामुळे कन्स्ट्रक्टर पॅरामीटर्स न वापरलेले राहतील.
    constructor() CrossDomainEnabled(address(0)) {}
```

स्टोरेजमधील सर्व व्हेरिएबल्स कॉपी न करता हा कॉन्ट्रॅक्ट अपग्रेड करण्यास सक्षम असणे.
ते करण्यासाठी आपण [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) वापरतो, एक कॉन्ट्रॅक्ट जो कॉल्स एका वेगळ्या कॉन्ट्रॅक्टकडे हस्तांतरित करण्यासाठी [`delegatecall`](https://solidity-by-example.org/delegatecall/) वापरतो ज्याचा पत्ता प्रॉक्सी कॉन्ट्रॅक्टद्वारे संग्रहित केला जातो (जेव्हा तुम्ही अपग्रेड करता तेव्हा तुम्ही प्रॉक्सीला तो पत्ता बदलण्यास सांगता).
जेव्हा तुम्ही `delegatecall` वापरता तेव्हा स्टोरेज _कॉल करणाऱ्या_ कॉन्ट्रॅक्टचे स्टोरेज राहते, त्यामुळे सर्व कॉन्ट्रॅक्ट स्थिती (state) व्हेरिएबल्सची मूल्ये अप्रभावित राहतात.

या पॅटर्नचा एक परिणाम असा आहे की `delegatecall` द्वारे _कॉल केलेल्या_ कॉन्ट्रॅक्टचे स्टोरेज वापरले जात नाही आणि म्हणून त्याला पास केलेल्या कन्स्ट्रक्टर मूल्यांचा काही फरक पडत नाही.
याच कारणामुळे आपण `CrossDomainEnabled` कन्स्ट्रक्टरला निरर्थक मूल्य देऊ शकतो.
खालील इनिशिएलायझेशन कन्स्ट्रक्टरपासून वेगळे असण्याचे हे देखील एक कारण आहे.

```solidity
    /******************
     * इनिशिएलायझेशन *
     ******************/

    /**
     * @param _l1messenger क्रॉस-चेन संप्रेषणासाठी वापरला जाणारा स्तर १ (l1) मेसेंजर पत्ता.
     * @param _l2TokenBridge स्तर २ (l2) मानक सेतू पत्ता.
     */
    // स्लिदर-disable-next-line external-function
```

ही [स्लिदर चाचणी](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) अशी फंक्शन्स ओळखते ज्यांना कॉन्ट्रॅक्ट कोडमधून कॉल केले जात नाही आणि म्हणून त्यांना `public` ऐवजी `external` घोषित केले जाऊ शकते.
`external` फंक्शन्सची गॅस किंमत कमी असू शकते, कारण त्यांना कॉल डेटामध्ये पॅरामीटर्स प्रदान केले जाऊ शकतात.
`public` घोषित केलेली फंक्शन्स कॉन्ट्रॅक्टच्या आतून ॲक्सेस करण्यायोग्य असणे आवश्यक आहे.
कॉन्ट्रॅक्ट्स त्यांचा स्वतःचा कॉल डेटा सुधारू शकत नाहीत, त्यामुळे पॅरामीटर्स मेमरीमध्ये असणे आवश्यक आहे.
जेव्हा अशा फंक्शनला बाहेरून कॉल केले जाते, तेव्हा कॉल डेटा मेमरीमध्ये कॉपी करणे आवश्यक असते, ज्यासाठी गॅस खर्च होतो.
या प्रकरणात फंक्शनला फक्त एकदाच कॉल केले जाते, त्यामुळे अकार्यक्षमतेचा आपल्याला काही फरक पडत नाही.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` फंक्शनला फक्त एकदाच कॉल केले जावे.
जर L1 क्रॉस डोमेन मेसेंजर किंवा L2 टोकन सेतूचा पत्ता बदलला, तर आपण एक नवीन प्रॉक्सी आणि त्याला कॉल करणारा नवीन सेतू तयार करतो.
संपूर्ण प्रणाली अपग्रेड केल्याशिवाय असे होण्याची शक्यता नाही, जी एक अतिशय दुर्मिळ घटना आहे.

लक्षात घ्या की या फंक्शनमध्ये अशी कोणतीही यंत्रणा नाही जी त्याला _कोण_ कॉल करू शकते हे प्रतिबंधित करते.
याचा अर्थ असा की सिद्धांतानुसार एक हल्लेखोर आपण प्रॉक्सी आणि सेतूची पहिली आवृत्ती प्रस्थापित करेपर्यंत वाट पाहू शकतो आणि नंतर कायदेशीर वापरकर्त्याच्या आधी `initialize` फंक्शनपर्यंत पोहोचण्यासाठी [फ्रंट-रनिंग](https://solidity-by-example.org/hacks/front-running/) करू शकतो. परंतु हे टाळण्यासाठी दोन पद्धती आहेत:

1. जर कॉन्ट्रॅक्ट्स थेट EOA द्वारे प्रस्थापित केले नसून [अशा व्यवहारामध्ये प्रस्थापित केले असतील ज्यामध्ये दुसरा कॉन्ट्रॅक्ट त्यांना तयार करतो](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) तर संपूर्ण प्रक्रिया ॲटॉमिक असू शकते आणि इतर कोणताही व्यवहार कार्यान्वित होण्यापूर्वी पूर्ण होऊ शकते.
2. जर `initialize` ला केलेला कायदेशीर कॉल अयशस्वी झाला तर नव्याने तयार केलेला प्रॉक्सी आणि सेतू दुर्लक्षित करणे आणि नवीन तयार करणे नेहमीच शक्य असते.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

हे दोन पॅरामीटर्स आहेत जे सेतूला माहित असणे आवश्यक आहे.

```solidity

    /**************
     * जमा करणे *
     **************/

    /** @dev प्रेषक EOA असणे आवश्यक करणारा मॉडिफायर. ही तपासणी दुर्भावनापूर्ण कॉन्ट्रॅक्टद्वारे initcode द्वारे बायपास केली जाऊ शकते, परंतु ती आपण टाळू इच्छित असलेल्या वापरकर्त्याच्या त्रुटीची काळजी घेते.
     */
    modifier onlyEOA() {
        // कॉन्ट्रॅक्ट्समधून ठेवी थांबवण्यासाठी वापरले जाते (चुकून हरवलेले टोकन टाळा)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

याच कारणामुळे आपल्याला ओपनझेपलिनच्या `Address` युटिलिटीजची आवश्यकता होती.

```solidity
    /**
     * @dev कॉलरच्या स्तर २ (l2) वरील शिल्लकीमध्ये ETH ची रक्कम जमा करण्यासाठी
     * हे फंक्शन कोणत्याही डेटाशिवाय कॉल केले जाऊ शकते.
     * प्राप्त फंक्शन डेटा घेत नसल्यामुळे, एक पुराणमतवादी
     * डीफॉल्ट रक्कम स्तर २ (l2) वर पाठविली जाते.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

हे फंक्शन चाचणीच्या उद्देशाने अस्तित्वात आहे.
लक्षात घ्या की ते इंटरफेस व्याख्यांमध्ये दिसत नाही - ते सामान्य वापरासाठी नाही.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

ही दोन फंक्शन्स `_initiateETHDeposit` च्या भोवती रॅपर्स आहेत, जे फंक्शन प्रत्यक्ष ETH जमा करणे हाताळते.

```solidity
    /**
     * @dev ETH संचयित करून आणि स्तर २ (l2) ETH गेटवेला ठेवीची माहिती देऊन ठेवींसाठी लॉजिक करते.
     * @param _from स्तर १ (l1) वरून ठेव काढण्यासाठी खाते.
     * @param _to स्तर २ (l2) वर ठेव देण्यासाठी खाते.
     * @param _l2Gas स्तर २ (l2) वर जमा पूर्ण करण्यासाठी आवश्यक गॅस मर्यादा.
     * @param _data स्तर २ (l2) वर पाठवण्यासाठी पर्यायी डेटा. हा डेटा केवळ बाह्य कॉन्ट्रॅक्ट्सच्या सोयीसाठी प्रदान केला आहे. कमाल लांबी लागू करण्याव्यतिरिक्त, हे कॉन्ट्रॅक्ट्स त्याच्या सामग्रीबद्दल कोणतीही हमी देत नाहीत.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit कॉलसाठी कॉल डेटा तयार करा
        bytes memory message = abi.encodeWithSelector(
```

क्रॉस डोमेन संदेश ज्या प्रकारे काम करतात ते म्हणजे गंतव्य कॉन्ट्रॅक्टला संदेश त्याचा कॉल डेटा म्हणून कॉल केला जातो.
Solidity कॉन्ट्रॅक्ट्स नेहमी त्यांच्या कॉल डेटाचा अर्थ [ABI वैशिष्ट्यांनुसार](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) लावतात.
Solidity फंक्शन [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) तो कॉल डेटा तयार करते.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

येथील संदेश या पॅरामीटर्ससह [`finalizeDeposit` फंक्शनला](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) कॉल करण्याचा आहे:

| पॅरामीटर | मूल्य                          | अर्थ                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | L1 वरील ETH (जे ERC-20 टोकन नाही) दर्शवणारे विशेष मूल्य                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | ऑप्टिमिझम् वर ETH व्यवस्थापित करणारा L2 कॉन्ट्रॅक्ट, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (हा कॉन्ट्रॅक्ट केवळ अंतर्गत ऑप्टिमिझम् वापरासाठी आहे) |
| \_from    | \_from                         | L1 वरील पत्ता जो ETH पाठवतो                                                                                                         |
| \_to      | \_to                           | L2 वरील पत्ता जो ETH प्राप्त करतो                                                                                                      |
| amount    | msg.value                      | पाठवलेल्या Wei ची रक्कम (जी आधीच सेतूकडे पाठवली गेली आहे)                                                                               |
| \_data    | \_data                         | जमा करण्यासोबत जोडण्यासाठी अतिरिक्त डेटा                                                                                                     |

```solidity
        // स्तर २ (l2) मध्ये कॉल डेटा पाठवा
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

क्रॉस डोमेन मेसेंजरद्वारे संदेश पाठवा.

```solidity
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

या हस्तांतरणाबद्दल ऐकणाऱ्या कोणत्याही विकेंद्रित ॲप्लिकेशनला (dapp) माहिती देण्यासाठी एक घटना उत्सर्जित करा.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

ही दोन फंक्शन्स `_initiateERC20Deposit` च्या भोवती रॅपर्स आहेत, जे फंक्शन प्रत्यक्ष ERC-20 जमा करणे हाताळते.

```solidity
    /**
     * @dev स्तर २ (l2) जमा केलेल्या टोकन कॉन्ट्रॅक्टला ठेवीची माहिती देऊन आणि स्तर १ (l1) निधी लॉक करण्यासाठी हँडलरला कॉल करून ठेवींसाठी लॉजिक करते. (उदा., transferFrom)
     *
     * @param _l1Token आपण जमा करत असलेल्या स्तर १ (l1) ERC-20 चा पत्ता
     * @param _l2Token स्तर १ (l1) च्या संबंधित स्तर २ (l2) ERC-20 चा पत्ता
     * @param _from स्तर १ (l1) वरून ठेव काढण्यासाठी खाते
     * @param _to स्तर २ (l2) वर ठेव देण्यासाठी खाते
     * @param _amount जमा करायची ERC-20 ची रक्कम.
     * @param _l2Gas स्तर २ (l2) वर जमा पूर्ण करण्यासाठी आवश्यक गॅस मर्यादा.
     * @param _data स्तर २ (l2) वर पाठवण्यासाठी पर्यायी डेटा. हा डेटा केवळ बाह्य कॉन्ट्रॅक्ट्सच्या सोयीसाठी प्रदान केला आहे. कमाल लांबी लागू करण्याव्यतिरिक्त, हे कॉन्ट्रॅक्ट्स त्याच्या सामग्रीबद्दल कोणतीही हमी देत नाहीत.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

हे फंक्शन वरील `_initiateETHDeposit` सारखेच आहे, ज्यामध्ये काही महत्त्वाचे फरक आहेत.
पहिला फरक असा आहे की हे फंक्शन टोकन पत्ते आणि हस्तांतरित करायची रक्कम पॅरामीटर्स म्हणून प्राप्त करते.
ETH च्या बाबतीत सेतूला केलेल्या कॉलमध्ये आधीच सेतू खात्यात मालमत्तेचे हस्तांतरण समाविष्ट असते (`msg.value`).

```solidity
        // जेव्हा स्तर १ (l1) वर ठेव सुरू केली जाते, तेव्हा स्तर १ (l1) सेतू भविष्यातील
        // रक्कम काढणे यासाठी निधी स्वतःकडे हस्तांतरित करतो. safeTransferFrom कॉन्ट्रॅक्टमध्ये कोड आहे की नाही हे देखील तपासते, त्यामुळे जर
        // _from EOA किंवा पत्ता(0) असेल तर हे अयशस्वी होईल.
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना, पुनर्प्रवेश-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 टोकन हस्तांतरण ETH पेक्षा वेगळ्या प्रक्रियेचे अनुसरण करते:

1. वापरकर्ता (`_from`) सेतूला योग्य टोकन हस्तांतरित करण्यासाठी मंजुरी देतो.
2. वापरकर्ता टोकन कॉन्ट्रॅक्टचा पत्ता, रक्कम इत्यादींसह सेतूला कॉल करतो.
3. सेतू जमा करण्याच्या प्रक्रियेचा भाग म्हणून टोकन (स्वतःकडे) हस्तांतरित करतो.

पहिली पायरी शेवटच्या दोन पायऱ्यांपेक्षा वेगळ्या व्यवहारामध्ये होऊ शकते.
तथापि, फ्रंट-रनिंग ही समस्या नाही कारण `_initiateERC20Deposit` ला कॉल करणारी दोन फंक्शन्स (`depositERC20` आणि `depositERC20To`) केवळ `_from` पॅरामीटर म्हणून `msg.sender` सह या फंक्शनला कॉल करतात.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) साठी कॉल डेटा तयार करा
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // स्तर २ (l2) मध्ये कॉल डेटा पाठवा
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना, पुनर्प्रवेश-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // स्लिदर-disable-next-line पुनर्प्रवेश-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

जमा केलेल्या टोकनची रक्कम `deposits` डेटा स्ट्रक्चरमध्ये जोडा.
L2 वर एकाच L1 ERC-20 टोकनशी संबंधित अनेक पत्ते असू शकतात, त्यामुळे ठेवींचा मागोवा ठेवण्यासाठी L1 ERC-20 टोकनच्या सेतूच्या शिल्लक रकमेचा वापर करणे पुरेसे नाही.

```solidity

        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * क्रॉस-चेन फंक्शन्स *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 सेतू L2 क्रॉस डोमेन मेसेंजरला एक संदेश पाठवतो ज्यामुळे L1 क्रॉस डोमेन मेसेंजर या फंक्शनला कॉल करतो (अर्थातच, एकदा [संदेश अंतिम करणारा व्यवहार](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1 वर सबमिट केल्यावर).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

हा एक _कायदेशीर_ संदेश आहे, जो क्रॉस डोमेन मेसेंजरकडून येत आहे आणि L2 टोकन सेतूमधून उगम पावत आहे याची खात्री करा.
हे फंक्शन सेतूमधून ETH काढण्यासाठी वापरले जाते, त्यामुळे आपल्याला हे सुनिश्चित करावे लागेल की ते केवळ अधिकृत कॉलरद्वारे कॉल केले जाते.

```solidity
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH हस्तांतरित करण्याचा मार्ग म्हणजे प्राप्तकर्त्याला `msg.value` मधील Wei च्या रकमेसह कॉल करणे.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

रक्कम काढण्याबद्दल एक घटना उत्सर्जित करा.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

हे फंक्शन वरील `finalizeETHWithdrawal` सारखेच आहे, ज्यामध्ये ERC-20 टोकनसाठी आवश्यक बदल आहेत.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` डेटा स्ट्रक्चर अपडेट करा.

```solidity

        // जेव्हा स्तर १ (l1) वर रक्कम काढणे अंतिम होते, तेव्हा स्तर १ (l1) सेतू निधी काढणाऱ्याला हस्तांतरित करतो
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * तात्पुरते - ETH स्थलांतरित करत आहे *
     *****************************/

    /**
     * @dev खात्यात ETH शिल्लक जोडते. हे जुन्या गेटवेवरून नवीन गेटवेवर ETH
     * स्थलांतरित करण्यास अनुमती देण्यासाठी आहे.
     * टीप: हे केवळ एका अपग्रेडसाठी सोडले आहे जेणेकरून आम्ही जुन्या कॉन्ट्रॅक्टमधून स्थलांतरित ETH प्राप्त करू शकू
     */
    function donateETH() external payable {}
}
```

सेतूची पूर्वीची अंमलबजावणी होती.
जेव्हा आपण त्या अंमलबजावणीवरून यावर गेलो, तेव्हा आपल्याला सर्व मालमत्ता हलवाव्या लागल्या.
ERC-20 टोकन फक्त हलवले जाऊ शकतात.
तथापि, कॉन्ट्रॅक्टमध्ये ETH हस्तांतरित करण्यासाठी तुम्हाला त्या कॉन्ट्रॅक्टच्या मंजुरीची आवश्यकता असते, जे `donateETH` आपल्याला प्रदान करते.

## L2 वरील ERC-20 टोकन्स {#erc-20-tokens-on-l2}

ERC-20 टोकन स्टँडर्ड सेतूमध्ये बसण्यासाठी, त्याने स्टँडर्ड सेतूला, आणि _केवळ_ स्टँडर्ड सेतूला टोकन मिंट करण्याची अनुमती देणे आवश्यक आहे.
हे आवश्यक आहे कारण सेतूंना हे सुनिश्चित करणे आवश्यक आहे की ऑप्टिमिझम् वर फिरणाऱ्या टोकनची संख्या L1 सेतू कॉन्ट्रॅक्टमध्ये लॉक केलेल्या टोकनच्या संख्येइतकी आहे.
जर L2 वर खूप जास्त टोकन असतील तर काही वापरकर्ते त्यांची मालमत्ता परत L1 वर सेतू करू शकणार नाहीत.
विश्वासार्ह सेतूऐवजी, आपण मूलत: [फ्रॅक्शनल रिझर्व्ह बँकिंग (fractional reserve banking)](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) पुन्हा तयार करू.
जर L1 वर खूप जास्त टोकन असतील, तर त्यापैकी काही टोकन सेतू कॉन्ट्रॅक्टमध्ये कायमचे लॉक राहतील कारण L2 टोकन जाळल्याशिवाय त्यांना मुक्त करण्याचा कोणताही मार्ग नाही.

### IL2StandardERC20 {#il2standarderc20}

स्टँडर्ड सेतू वापरणाऱ्या L2 वरील प्रत्येक ERC-20 टोकनने [हा इंटरफेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) प्रदान करणे आवश्यक आहे, ज्यामध्ये स्टँडर्ड सेतूला आवश्यक असलेली फंक्शन्स आणि घटना आहेत.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[स्टँडर्ड ERC-20 इंटरफेसमध्ये](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) `mint` आणि `burn` फंक्शन्स समाविष्ट नाहीत.
त्या पद्धती [ERC-20 स्टँडर्डद्वारे](https://eips.ethereum.org/EIPS/eip-20) आवश्यक नाहीत, जे टोकन तयार आणि नष्ट करण्याच्या यंत्रणा अनिर्दिष्ट ठेवते.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

कॉन्ट्रॅक्ट कोणती फंक्शन्स प्रदान करतो हे निर्दिष्ट करण्यासाठी [ERC-165 इंटरफेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) वापरला जातो.
[तुम्ही स्टँडर्ड येथे वाचू शकता](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

हे फंक्शन L1 टोकनचा पत्ता प्रदान करते जो या कॉन्ट्रॅक्टशी सेतू केलेला आहे.
लक्षात घ्या की आपल्याकडे विरुद्ध दिशेने असे कोणतेही फंक्शन नाही.
जेव्हा त्याची अंमलबजावणी केली गेली तेव्हा L2 समर्थनाचे नियोजन केले होते की नाही याची पर्वा न करता, आपण कोणतेही L1 टोकन सेतू करण्यास सक्षम असणे आवश्यक आहे.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

टोकन मिंट (तयार) आणि जाळण्यासाठी (नष्ट) फंक्शन्स आणि घटना.
टोकनची संख्या योग्य आहे (L1 वर लॉक केलेल्या टोकनच्या संख्येइतकी) हे सुनिश्चित करण्यासाठी सेतू ही एकमेव संस्था असावी जी ही फंक्शन्स चालवू शकते.

### L2StandardERC20 {#l2standarderc20}

[ही आपली `IL2StandardERC20` इंटरफेसची अंमलबजावणी आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
जोपर्यंत तुम्हाला काही प्रकारच्या सानुकूल लॉजिकची आवश्यकता नाही, तोपर्यंत तुम्ही हेच वापरले पाहिजे.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[ओपनझेपलिन ERC-20 कॉन्ट्रॅक्ट](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
ऑप्टिमिझम् चाक पुन्हा शोधण्यावर विश्वास ठेवत नाही, विशेषत: जेव्हा चाकाचे चांगले ऑडिट केले जाते आणि मालमत्ता ठेवण्यासाठी ते पुरेसे विश्वासार्ह असणे आवश्यक असते.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

हे दोन अतिरिक्त कॉन्फिगरेशन पॅरामीटर्स आहेत जे आपल्याला आवश्यक आहेत आणि ERC-20 ला सामान्यतः नसतात.

```solidity

    /**
     * @param _l2Bridge स्तर २ (l2) मानक सेतूचा पत्ता.
     * @param _l1Token संबंधित स्तर १ (l1) टोकनचा पत्ता.
     * @param _name ERC-20 नाव.
     * @param _symbol ERC-20 चिन्ह.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

प्रथम आपण ज्यातून इनहेरिट करतो त्या कॉन्ट्रॅक्टसाठी (`ERC20(_name, _symbol)`) कन्स्ट्रक्टरला कॉल करा आणि नंतर आपले स्वतःचे व्हेरिएबल्स सेट करा.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // स्लिदर-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) याच प्रकारे काम करते.
प्रत्येक इंटरफेस हा समर्थित फंक्शन्सची संख्या असतो, आणि त्या फंक्शन्सच्या [ABI फंक्शन सिलेक्टर्सचा](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [एक्सक्लुझिव्ह ऑर (exclusive or)](https://en.wikipedia.org/wiki/Exclusive_or) म्हणून ओळखला जातो.

L2 सेतू ज्या ERC-20 कॉन्ट्रॅक्टला मालमत्ता पाठवतो तो `IL2StandardERC20` आहे याची खात्री करण्यासाठी सॅनिटी चेक म्हणून ERC-165 वापरतो.

**टीप:** दुष्ट कॉन्ट्रॅक्टला `supportsInterface` ला खोटी उत्तरे देण्यापासून रोखण्यासाठी काहीही नाही, त्यामुळे ही एक सॅनिटी चेक यंत्रणा आहे, सुरक्षा यंत्रणा _नाही_.

```solidity
    // स्लिदर-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // स्लिदर-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

केवळ L2 सेतूला मालमत्ता मिंट आणि जाळण्याची परवानगी आहे.

`_mint` आणि `_burn` प्रत्यक्षात [ओपनझेपलिन ERC-20 कॉन्ट्रॅक्टमध्ये](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) परिभाषित केले आहेत.
तो कॉन्ट्रॅक्ट त्यांना बाहेरून उघड करत नाही, कारण टोकन मिंट आणि जाळण्याच्या अटी ERC-20 वापरण्याच्या मार्गांइतक्याच वैविध्यपूर्ण आहेत.

## L2 सेतू कोड {#l2-bridge-code}

हा तो कोड आहे जो ऑप्टिमिझम् वर सेतू चालवतो.
[या कॉन्ट्रॅक्टचा सोर्स येथे आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* इंटरफेस इम्पोर्ट्स */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) इंटरफेस आपण वर पाहिलेल्या [L1 समकक्षासारखाच](#il1erc20bridge) आहे.
दोन महत्त्वपूर्ण फरक आहेत:

1. L1 वर तुम्ही जमा करण्याची सुरुवात करता आणि रक्कम काढण्याची अंतिम प्रक्रिया करता.
   येथे तुम्ही रक्कम काढण्याची सुरुवात करता आणि जमा करण्याची अंतिम प्रक्रिया करता.
2. L1 वर ETH आणि ERC-20 टोकनमध्ये फरक करणे आवश्यक आहे.
   L2 वर आपण दोघांसाठी समान फंक्शन्स वापरू शकतो कारण अंतर्गतरीत्या ऑप्टिमिझम् वरील ETH शिल्लक [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) पत्त्यासह ERC-20 टोकन म्हणून हाताळली जाते.

```solidity
/* लायब्ररी इम्पोर्ट्स */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* कॉन्ट्रॅक्ट इम्पोर्ट्स */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev स्तर २ (l2) मानक सेतू हे एक कॉन्ट्रॅक्ट आहे जे स्तर १ (l1) आणि स्तर २ (l2) दरम्यान ETH आणि ERC-20 संक्रमणे सक्षम करण्यासाठी स्तर १ (l1) मानक सेतूसह एकत्र काम करते.
 * जेव्हा हे स्तर १ (l1) मानक सेतूमध्ये ठेवींबद्दल ऐकते तेव्हा हे कॉन्ट्रॅक्ट नवीन टोकनसाठी मिंटर म्हणून कार्य करते.
 * हे कॉन्ट्रॅक्ट रक्कम काढणे यासाठी असलेल्या टोकनला जाळणारे म्हणून देखील कार्य करते, स्तर १ (l1) सेतूला स्तर १ (l1) निधी जारी करण्याची माहिती देते.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * बाह्य कॉन्ट्रॅक्ट संदर्भ *
     ********************************/

    address public l1TokenBridge;
```

L1 सेतूच्या पत्त्याचा मागोवा ठेवा.
लक्षात घ्या की L1 समकक्षाच्या विपरीत, येथे आपल्याला या व्हेरिएबलची _आवश्यकता_ आहे.
L1 सेतूचा पत्ता आगाऊ माहित नसतो.

```solidity

    /***************
     * कन्स्ट्रक्टर *
     ***************/

    /**
     * @param _l2CrossDomainMessenger या कॉन्ट्रॅक्टद्वारे वापरलेला क्रॉस-डोमेन मेसेंजर.
     * @param _l1TokenBridge मुख्य साखळीवर तैनात केलेल्या स्तर १ (l1) सेतूचा पत्ता.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * रक्कम काढणे *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

ही दोन फंक्शन्स रक्कम काढण्याची सुरुवात करतात.
लक्षात घ्या की L1 टोकन पत्ता निर्दिष्ट करण्याची आवश्यकता नाही.
L2 टोकन्सनी आपल्याला L1 समकक्षाचा पत्ता सांगणे अपेक्षित आहे.

```solidity

    /**
     * @dev टोकन जाळून आणि स्तर १ (l1) टोकन गेटवेला रक्कम काढणे याबद्दल माहिती देऊन रक्कम काढणे यासाठी लॉजिक करते.
     * @param _l2Token स्तर २ (l2) टोकनचा पत्ता जिथे रक्कम काढणे सुरू केले जाते.
     * @param _from स्तर २ (l2) वरून रक्कम काढणे खेचण्यासाठी खाते.
     * @param _to स्तर १ (l1) वर रक्कम काढणे देण्यासाठी खाते.
     * @param _amount काढायची टोकनची रक्कम.
     * @param _l1Gas न वापरलेले, परंतु संभाव्य फॉरवर्ड सुसंगतता विचारांसाठी समाविष्ट केले आहे.
     * @param _data स्तर १ (l1) वर पाठवण्यासाठी पर्यायी डेटा. हा डेटा केवळ बाह्य कॉन्ट्रॅक्ट्सच्या सोयीसाठी प्रदान केला आहे. कमाल लांबी लागू करण्याव्यतिरिक्त, हे कॉन्ट्रॅक्ट्स त्याच्या सामग्रीबद्दल कोणतीही हमी देत नाहीत.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // जेव्हा रक्कम काढणे सुरू केले जाते, तेव्हा आम्ही त्यानंतरचा स्तर २ (l2)
        // वापर टाळण्यासाठी काढणाऱ्याचा निधी जाळतो
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

लक्षात घ्या की आपण `_from` पॅरामीटरवर अवलंबून _नाही_ तर `msg.sender` वर अवलंबून आहोत जे बनावट करणे खूप कठीण आहे (माझ्या माहितीनुसार, अशक्य आहे).

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) साठी कॉल डेटा तयार करा
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1 वर ETH आणि ERC-20 मध्ये फरक करणे आवश्यक आहे.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // स्तर १ (l1) सेतूपर्यंत संदेश पाठवा
        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * क्रॉस-चेन फंक्शन: जमा करणे *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

हे फंक्शन `L1StandardBridge` द्वारे कॉल केले जाते.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

संदेशाचा स्रोत कायदेशीर असल्याची खात्री करा.
हे महत्त्वाचे आहे कारण हे फंक्शन `_mint` ला कॉल करते आणि L1 वर सेतूच्या मालकीच्या टोकन्सद्वारे कव्हर न केलेले टोकन देण्यासाठी वापरले जाऊ शकते.

```solidity
        // लक्ष्य टोकन सुसंगत आहे का ते तपासा आणि
        // स्तर १ (l1) वरील जमा केलेले टोकन येथील स्तर २ (l2) जमा केलेल्या टोकन प्रतिनिधित्वाशी जुळते याची पडताळणी करा
        if (
            // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

सॅनिटी चेक्स:

1. योग्य इंटरफेस समर्थित आहे
2. L2 ERC-20 कॉन्ट्रॅक्टचा L1 पत्ता टोकनच्या L1 स्रोताशी जुळतो

```solidity
        ) {
            // जेव्हा ठेव अंतिम होते, तेव्हा आम्ही स्तर २ (l2) वरील खात्यात तेवढ्याच रकमेचे
            // टोकन जमा करतो.
            // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

जर सॅनिटी चेक्स पास झाले, तर जमा करण्याची अंतिम प्रक्रिया करा:

1. टोकन मिंट करा
2. योग्य घटना उत्सर्जित करा

```solidity
        } else {
            // एकतर स्तर २ (l2) टोकन ज्यामध्ये जमा केले जात आहे ते योग्य पत्त्याबद्दल असहमत आहे
            // त्याच्या स्तर १ (l1) टोकनच्या, किंवा योग्य इंटरफेसचे समर्थन करत नाही.
            // हे केवळ तेव्हाच घडले पाहिजे जर एखादे दुर्भावनापूर्ण स्तर २ (l2) टोकन असेल, किंवा जर वापरकर्त्याने कसा तरी
            // जमा करण्यासाठी चुकीचा स्तर २ (l2) टोकन पत्ता निर्दिष्ट केला असेल.
            // दोन्ही प्रकरणांमध्ये, आम्ही येथे प्रक्रिया थांबवतो आणि रक्कम काढणे तयार करतो
            // संदेश जेणेकरून वापरकर्ते काही प्रकरणांमध्ये त्यांचा निधी बाहेर काढू शकतील.
            // दुर्भावनापूर्ण टोकन कॉन्ट्रॅक्ट्स पूर्णपणे रोखण्याचा कोणताही मार्ग नाही, परंतु हे मर्यादित करते
            // वापरकर्ता त्रुटी आणि दुर्भावनापूर्ण कॉन्ट्रॅक्ट वर्तनाचे काही प्रकार कमी करते.
```

जर वापरकर्त्याने चुकीचा L2 टोकन पत्ता वापरून शोधण्यायोग्य चूक केली असेल, तर आपल्याला जमा करणे रद्द करायचे आहे आणि L1 वर टोकन परत करायचे आहेत.
L2 वरून आपण हे करू शकण्याचा एकमेव मार्ग म्हणजे एक संदेश पाठवणे ज्याला दोष आव्हान कालावधीची (fault challenge period) प्रतीक्षा करावी लागेल, परंतु वापरकर्त्यासाठी कायमचे टोकन गमावण्यापेक्षा हे खूप चांगले आहे.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // प्रेषकाला ठेव परत करण्यासाठी येथे _to आणि _from बदलले
                _from,
                _amount,
                _data
            );

            // स्तर १ (l1) सेतूपर्यंत संदेश पाठवा
            // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // स्लिदर-disable-next-line पुनर्प्रवेश-घटना
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## निष्कर्ष {#conclusion}

मालमत्ता हस्तांतरणासाठी स्टँडर्ड सेतू ही सर्वात लवचिक यंत्रणा आहे.
तथापि, ती खूप सामान्य असल्यामुळे ती वापरण्यासाठी नेहमीच सर्वात सोपी यंत्रणा नसते.
विशेषतः रक्कम काढण्यासाठी, बहुतेक वापरकर्ते [थर्ड पार्टी सेतू](https://optimism.io/apps#bridge) वापरणे पसंत करतात जे आव्हान कालावधीची प्रतीक्षा करत नाहीत आणि रक्कम काढण्याची अंतिम प्रक्रिया करण्यासाठी मर्केल पुरावा आवश्यक नसतो.

हे सेतू सामान्यतः L1 वर मालमत्ता ठेवून काम करतात, जे ते एका छोट्या शुल्कासाठी (बहुतेकदा स्टँडर्ड सेतूमधून रक्कम काढण्यासाठी लागणाऱ्या गॅसच्या किमतीपेक्षा कमी) त्वरित प्रदान करतात.
जेव्हा सेतूला (किंवा तो चालवणाऱ्या लोकांना) L1 मालमत्तेची कमतरता भासण्याची शक्यता असते तेव्हा तो L2 मधून पुरेशी मालमत्ता हस्तांतरित करतो. हे खूप मोठे रक्कम काढण्याचे व्यवहार असल्याने, रक्कम काढण्याचा खर्च मोठ्या रकमेवर विभागला जातो आणि त्याची टक्केवारी खूपच कमी असते.

आशा आहे की या लेखामुळे तुम्हाला स्तर २ (l2) कसे काम करते आणि स्पष्ट आणि सुरक्षित Solidity कोड कसा लिहायचा याबद्दल अधिक समजण्यास मदत झाली असेल.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).