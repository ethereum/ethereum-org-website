---
title: "ऑप्टिमिज़्म स्टैंडर्ड सेतु अनुबंध वॉकथ्रू"
description: ऑप्टिमिज़्म के लिए मानक सेतु कैसे काम करता है? यह इस तरह से क्यों काम करता है?
author: ओरी पोमेरेंट्ज़
tags:
  - solidity
  - सेतु
  - लेयर 2 (l2)
skill: intermediate
breadcrumb: ऑप्टिमिज़्म सेतु
published: 2022-03-30
lang: hi
---

[ऑप्टिमिज़्म](https://www.optimism.io/) एक [ऑप्टिमिस्टिक रोलअप](/developers/docs/scaling/optimistic-rollups/) है।
ऑप्टिमिस्टिक रोलअप्स इथेरियम मेननेट (जिसे लेयर 1 (l1) के रूप में भी जाना जाता है) की तुलना में बहुत कम कीमत पर लेन-देन को प्रोसेस कर सकते हैं क्योंकि लेन-देन नेटवर्क के हर नोड के बजाय केवल कुछ नोड्स द्वारा प्रोसेस किए जाते हैं।
साथ ही, सारा डेटा L1 पर लिखा जाता है ताकि मेननेट की सभी अखंडता और उपलब्धता की गारंटी के साथ सब कुछ साबित और फिर से बनाया जा सके।

ऑप्टिमिज़्म (या किसी अन्य L2) पर L1 संपत्तियों का उपयोग करने के लिए, संपत्तियों को [सेतु के माध्यम से ट्रांसफर](/bridges/#prerequisites) करने की आवश्यकता होती है।
इसे प्राप्त करने का एक तरीका यह है कि उपयोगकर्ता L1 पर संपत्तियों (ETH और [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) सबसे आम हैं) को लॉक करें, और L2 पर उपयोग करने के लिए समान संपत्तियां प्राप्त करें।
अंततः, जिसके पास भी वे संपत्तियां होंगी, वह उन्हें वापस L1 पर सेतु के माध्यम से ट्रांसफर करना चाह सकता है।
ऐसा करते समय, संपत्तियों को L2 पर बर्न कर दिया जाता है और फिर L1 पर उपयोगकर्ता को वापस जारी कर दिया जाता है।

इसी तरह से [ऑप्टिमिज़्म मानक सेतु](https://docs.optimism.io/app-developers/bridging/standard-bridge) काम करता है।
इस लेख में हम उस सेतु के स्रोत कोड की समीक्षा करेंगे ताकि यह देखा जा सके कि यह कैसे काम करता है और इसे अच्छी तरह से लिखे गए Solidity कोड के उदाहरण के रूप में अध्ययन करेंगे।

## नियंत्रण प्रवाह (Control flows) {#control-flows}

सेतु के दो मुख्य प्रवाह हैं:

- जमा (L1 से L2 तक)
- निकासी (L2 से L1 तक)

### जमा प्रवाह {#deposit-flow}

#### लेयर 1 (l1) {#deposit-flow-layer-1}

1. यदि ERC-20 जमा कर रहे हैं, तो जमाकर्ता सेतु को जमा की जा रही राशि खर्च करने की व्यय सीमा (allowance) देता है
2. जमाकर्ता L1 सेतु को कॉल करता है (`depositERC20`, `depositERC20To`, `depositETH`, या `depositETHTo`)
3. L1 सेतु ब्रिज की गई संपत्ति का कब्ज़ा ले लेता है
   - ETH: संपत्ति को जमाकर्ता द्वारा कॉल के हिस्से के रूप में ट्रांसफर किया जाता है
   - ERC-20: जमाकर्ता द्वारा प्रदान की गई व्यय सीमा का उपयोग करके सेतु द्वारा संपत्ति को स्वयं को ट्रांसफर किया जाता है
4. L1 सेतु L2 सेतु पर `finalizeDeposit` को कॉल करने के लिए क्रॉस-डोमेन संदेश तंत्र का उपयोग करता है

#### लेयर 2 (l2) {#deposit-flow-layer-2}

5. L2 सेतु सत्यापित करता है कि `finalizeDeposit` पर कॉल वैध है:
   - क्रॉस डोमेन संदेश अनुबंध से आया है
   - मूल रूप से L1 पर सेतु से था
6. L2 सेतु जांचता है कि क्या L2 पर ERC-20 टोकन अनुबंध सही है:
   - L2 अनुबंध रिपोर्ट करता है कि इसका L1 समकक्ष वही है जहां से L1 पर टोकन आए थे
   - L2 अनुबंध रिपोर्ट करता है कि यह सही इंटरफ़ेस का समर्थन करता है ([ERC-165 का उपयोग करके](https://eips.ethereum.org/EIPS/eip-165))।
7. यदि L2 अनुबंध सही है, तो उचित पते पर उचित संख्या में टोकन मिंट करने के लिए इसे कॉल करें। यदि नहीं, तो उपयोगकर्ता को L1 पर टोकन का दावा करने की अनुमति देने के लिए निकासी प्रक्रिया शुरू करें।

### निकासी प्रवाह {#withdrawal-flow}

#### लेयर 2 (l2) {#withdrawal-flow-layer-2}

1. निकासी करने वाला L2 सेतु को कॉल करता है (`withdraw` या `withdrawTo`)
2. L2 सेतु `msg.sender` से संबंधित उचित संख्या में टोकन बर्न करता है
3. L2 सेतु L1 सेतु पर `finalizeETHWithdrawal` या `finalizeERC20Withdrawal` को कॉल करने के लिए क्रॉस-डोमेन संदेश तंत्र का उपयोग करता है

#### लेयर 1 (l1) {#withdrawal-flow-layer-1}

4. L1 सेतु सत्यापित करता है कि `finalizeETHWithdrawal` या `finalizeERC20Withdrawal` पर कॉल वैध है:
   - क्रॉस डोमेन संदेश तंत्र से आया है
   - मूल रूप से L2 पर सेतु से था
5. L1 सेतु उचित संपत्ति (ETH या ERC-20) को उचित पते पर ट्रांसफर करता है

## लेयर 1 (l1) कोड {#layer-1-code}

यह वह कोड है जो L1, इथेरियम मेननेट पर चलता है।

### IL1ERC20Bridge {#il1erc20bridge}

[यह इंटरफ़ेस यहाँ परिभाषित किया गया है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)।
इसमें ERC-20 टोकन को सेतु के माध्यम से ट्रांसफर करने के लिए आवश्यक फ़ंक्शन और परिभाषाएँ शामिल हैं।

```solidity
// SPDX-License-Identifier: MIT
```

[ऑप्टिमिज़्म का अधिकांश कोड MIT लाइसेंस के तहत जारी किया गया है](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)।

```solidity
pragma solidity >0.5.0 <0.9.0;
```

लिखते समय Solidity का नवीनतम संस्करण 0.8.12 है।
जब तक संस्करण 0.9.0 जारी नहीं हो जाता, हम नहीं जानते कि यह कोड इसके साथ संगत है या नहीं।

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * घटनाएँ *
     **********/

    event ERC20DepositInitiated(
```

ऑप्टिमिज़्म सेतु शब्दावली में _जमा (deposit)_ का अर्थ L1 से L2 में ट्रांसफर है, और _निकासी (withdrawal)_ का अर्थ L2 से L1 में ट्रांसफर है।

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

ज्यादातर मामलों में L1 पर ERC-20 का पता L2 पर समकक्ष ERC-20 के पते के समान नहीं होता है।
[आप यहाँ टोकन पतों की सूची देख सकते हैं](https://static.optimism.io/optimism.tokenlist.json)।
`chainId` 1 वाला पता L1 (मेननेट) पर है और `chainId` 10 वाला पता L2 (ऑप्टिमिज़्म) पर है।
अन्य दो `chainId` मान Kovan टेस्ट नेटवर्क (42) और Optimistic Kovan टेस्ट नेटवर्क (69) के लिए हैं।

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

ट्रांसफर में नोट्स जोड़ना संभव है, इस स्थिति में उन्हें उन घटनाओं में जोड़ा जाता है जो उनकी रिपोर्ट करती हैं।

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

वही सेतु अनुबंध दोनों दिशाओं में ट्रांसफर को संभालता है।
L1 सेतु के मामले में, इसका मतलब जमा की शुरुआत और निकासी को अंतिम रूप देना है।

```solidity

    /********************
     * सार्वजनिक फ़ंक्शन *
     ********************/

    /**
     * @dev संबंधित लेयर 2 (l2) सेतु अनुबंध का पता प्राप्त करें।
     * @return संबंधित लेयर 2 (l2) सेतु अनुबंध का पता।
     */
    function l2TokenBridge() external returns (address);
```

इस फ़ंक्शन की वास्तव में आवश्यकता नहीं है, क्योंकि L2 पर यह पहले से तैनात (predeployed) अनुबंध है, इसलिए यह हमेशा `0x4200000000000000000000000000000000000010` पते पर होता है।
यह यहाँ L2 सेतु के साथ समरूपता के लिए है, क्योंकि L1 सेतु का पता जानना आसान _नहीं_ है।

```solidity
    /**
     * @dev लेयर 2 (l2) पर कॉलर के बैलेंस में ERC-20 की एक राशि जमा करें।
     * @param _l1Token लेयर 1 (l1) ERC-20 का पता जिसे हम जमा कर रहे हैं
     * @param _l2Token लेयर 1 (l1) के संबंधित लेयर 2 (l2) ERC-20 का पता
     * @param _amount जमा करने के लिए ERC-20 की राशि
     * @param _l2Gas लेयर 2 (l2) पर जमा पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data लेयर 2 (l2) पर अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा केवल
     *        बाहरी अनुबंधों की सुविधा के लिए प्रदान किया जाता है। अधिकतम लंबाई लागू करने के
     *        अलावा, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` पैरामीटर L2 गैस की वह मात्रा है जिसे लेन-देन को खर्च करने की अनुमति है।
[एक निश्चित (उच्च) सीमा तक, यह मुफ़्त है](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), इसलिए जब तक ERC-20 अनुबंध मिंटिंग करते समय कुछ बहुत अजीब नहीं करता, तब तक यह कोई समस्या नहीं होनी चाहिए।
यह फ़ंक्शन उस सामान्य परिदृश्य का ध्यान रखता है, जहाँ कोई उपयोगकर्ता संपत्तियों को एक अलग ब्लॉकचेन पर उसी पते पर सेतु के माध्यम से ट्रांसफर करता है।

```solidity
    /**
     * @dev लेयर 2 (l2) पर प्राप्तकर्ता के बैलेंस में ERC-20 की एक राशि जमा करें।
     * @param _l1Token लेयर 1 (l1) ERC-20 का पता जिसे हम जमा कर रहे हैं
     * @param _l2Token लेयर 1 (l1) के संबंधित लेयर 2 (l2) ERC-20 का पता
     * @param _to लेयर 2 (l2) पता जिसमें निकासी क्रेडिट करनी है।
     * @param _amount जमा करने के लिए ERC-20 की राशि।
     * @param _l2Gas लेयर 2 (l2) पर जमा पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data लेयर 2 (l2) पर अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा केवल
     *        बाहरी अनुबंधों की सुविधा के लिए प्रदान किया जाता है। अधिकतम लंबाई लागू करने के
     *        अलावा, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
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

यह फ़ंक्शन लगभग `depositERC20` के समान है, लेकिन यह आपको ERC-20 को एक अलग पते पर भेजने की अनुमति देता है।

```solidity
    /*************************
     * क्रॉस-चेन फ़ंक्शन *
     *************************/

    /**
     * @dev लेयर 2 (l2) से लेयर 1 (l1) में निकासी पूरी करें, और प्राप्तकर्ता के लेयर 1 (l1) ERC-20 टोकन
     * बैलेंस में फंड क्रेडिट करें।
     * यदि लेयर 2 (l2) से शुरू की गई निकासी को अंतिम रूप नहीं दिया गया है तो यह कॉल विफल हो जाएगी।
     *
     * @param _l1Token लेयर 1 (l1) टोकन का पता जिसके लिए finalizeWithdrawal करना है।
     * @param _l2Token लेयर 2 (l2) टोकन का पता जहां निकासी शुरू की गई थी।
     * @param _from लेयर 2 (l2) पता जो ट्रांसफर शुरू कर रहा है।
     * @param _to लेयर 1 (l1) पता जिसमें निकासी क्रेडिट करनी है।
     * @param _amount जमा करने के लिए ERC-20 की राशि।
     * @param _data लेयर 2 (l2) पर प्रेषक द्वारा प्रदान किया गया डेटा। यह डेटा केवल
     *   बाहरी अनुबंधों की सुविधा के लिए प्रदान किया जाता है। अधिकतम लंबाई लागू करने के
     *   अलावा, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
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

ऑप्टिमिज़्म में निकासी (और L2 से L1 तक अन्य संदेश) एक दो-चरणीय प्रक्रिया है:

1. L2 पर एक प्रारंभिक लेन-देन।
2. L1 पर एक अंतिम रूप देने वाला या दावा करने वाला लेन-देन।
   यह लेन-देन L2 लेन-देन के लिए [दोष चुनौती अवधि (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) समाप्त होने के बाद होना चाहिए।

### IL1StandardBridge {#il1standardbridge}

[यह इंटरफ़ेस यहाँ परिभाषित किया गया है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)।
इस फ़ाइल में ETH के लिए घटना और फ़ंक्शन परिभाषाएँ शामिल हैं।
ये परिभाषाएँ ERC-20 के लिए ऊपर `IL1ERC20Bridge` में परिभाषित परिभाषाओं के समान हैं।

सेतु इंटरफ़ेस को दो फ़ाइलों के बीच विभाजित किया गया है क्योंकि कुछ ERC-20 टोकन को कस्टम प्रोसेसिंग की आवश्यकता होती है और उन्हें मानक सेतु द्वारा नियंत्रित नहीं किया जा सकता है।
इस तरह कस्टम सेतु जो ऐसे टोकन को संभालता है, `IL1ERC20Bridge` को लागू कर सकता है और उसे ETH को भी सेतु के माध्यम से ट्रांसफर करने की आवश्यकता नहीं होती है।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * घटनाएँ *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

यह घटना ERC-20 संस्करण (`ERC20DepositInitiated`) के लगभग समान है, सिवाय इसके कि इसमें L1 और L2 टोकन पते नहीं हैं।
यही बात अन्य घटनाओं और फ़ंक्शंस के लिए भी सच है।

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * सार्वजनिक फ़ंक्शन *
     ********************/

    /**
     * @dev लेयर 2 (l2) पर कॉलर के बैलेंस में ETH की एक राशि जमा करें।
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev लेयर 2 (l2) पर प्राप्तकर्ता के बैलेंस में ETH की एक राशि जमा करें।
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
     * क्रॉस-चेन फ़ंक्शन *
     *************************/

    /**
     * @dev लेयर 2 (l2) से लेयर 1 (l1) में निकासी पूरी करें, और प्राप्तकर्ता के लेयर 1 (l1) ETH टोकन
     * बैलेंस में फंड क्रेडिट करें। चूंकि केवल xDomainMessenger इस फ़ंक्शन को कॉल कर सकता है, इसलिए इसे कभी भी
     * निकासी को अंतिम रूप देने से पहले कॉल नहीं किया जाएगा।
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

[यह अनुबंध](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) दोनों सेतुओं ([L1](#the-l1-bridge-contract) और [L2](#l2-bridge-code)) द्वारा दूसरी लेयर पर संदेश भेजने के लिए इनहेरिट किया जाता है।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* इंटरफ़ेस आयात */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[यह इंटरफ़ेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) अनुबंध को बताता है कि क्रॉस डोमेन मैसेंजर का उपयोग करके दूसरी लेयर पर संदेश कैसे भेजें।
यह क्रॉस डोमेन मैसेंजर एक पूरी तरह से अलग प्रणाली है, और इसके लिए एक अलग लेख की आवश्यकता है, जिसे मैं भविष्य में लिखने की उम्मीद करता हूँ।

```solidity
/**
 * @title CrossDomainEnabled
 * @dev क्रॉस-डोमेन संचार करने वाले अनुबंधों के लिए सहायक अनुबंध
 *
 * प्रयुक्त कंपाइलर: इनहेरिट करने वाले अनुबंध द्वारा परिभाषित
 */
contract CrossDomainEnabled {
    /*************
     * चर *
     *************/

    // अन्य डोमेन से संदेश भेजने और प्राप्त करने के लिए उपयोग किया जाने वाला मैसेंजर अनुबंध।
    address public messenger;

    /***************
     * कंस्ट्रक्टर *
     ***************/

    /**
     * @param _messenger वर्तमान लेयर पर CrossDomainMessenger का पता।
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

एक पैरामीटर जो अनुबंध को जानने की आवश्यकता है, वह इस लेयर पर क्रॉस डोमेन मैसेंजर का पता है।
यह पैरामीटर कंस्ट्रक्टर में एक बार सेट किया जाता है, और कभी नहीं बदलता है।

```solidity

    /**********************
     * फ़ंक्शन संशोधक *
     **********************/

    /**
     * यह लागू करता है कि संशोधित फ़ंक्शन केवल एक विशिष्ट क्रॉस-डोमेन खाते द्वारा कॉल करने योग्य है।
     * @param _sourceDomainAccount मूल डोमेन पर एकमात्र खाता जो
     *  इस फ़ंक्शन को कॉल करने के लिए प्रमाणित है。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

क्रॉस डोमेन मैसेजिंग उस ब्लॉकचेन पर किसी भी अनुबंध द्वारा सुलभ है जहां यह चल रहा है (या तो इथेरियम मेननेट या ऑप्टिमिज़्म)।
लेकिन हमें प्रत्येक पक्ष के सेतु की आवश्यकता है कि वह _केवल_ कुछ संदेशों पर भरोसा करे यदि वे दूसरे पक्ष के सेतु से आते हैं।

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

केवल उपयुक्त क्रॉस डोमेन मैसेंजर (`messenger`, जैसा कि आप नीचे देखते हैं) के संदेशों पर भरोसा किया जा सकता है।

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

क्रॉस डोमेन मैसेंजर जिस तरह से वह पता प्रदान करता है जिसने दूसरी लेयर के साथ संदेश भेजा था, वह [`.xDomainMessageSender()` फ़ंक्शन](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128) है।
जब तक इसे उस लेन-देन में कॉल किया जाता है जो संदेश द्वारा शुरू किया गया था, यह यह जानकारी प्रदान कर सकता है।

हमें यह सुनिश्चित करने की आवश्यकता है कि हमें जो संदेश मिला है वह दूसरे सेतु से आया है।

```solidity

        _;
    }

    /**********************
     * आंतरिक फ़ंक्शन *
     **********************/

    /**
     * मैसेंजर प्राप्त करता है, आमतौर पर स्टोरेज से। यह फ़ंक्शन इस स्थिति में उजागर किया गया है कि किसी चाइल्ड अनुबंध
     * को ओवरराइड करने की आवश्यकता हो।
     * @return क्रॉस-डोमेन मैसेंजर अनुबंध का पता जिसका उपयोग किया जाना चाहिए。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

यह फ़ंक्शन क्रॉस डोमेन मैसेंजर लौटाता है।
हम चर `messenger` के बजाय एक फ़ंक्शन का उपयोग करते हैं ताकि इस अनुबंध से इनहेरिट करने वाले अनुबंधों को यह निर्दिष्ट करने के लिए एक एल्गोरिदम का उपयोग करने की अनुमति मिल सके कि किस क्रॉस डोमेन मैसेंजर का उपयोग करना है।

```solidity

    /**
     * किसी अन्य डोमेन पर किसी खाते को संदेश भेजता है
     * @param _crossDomainTarget गंतव्य डोमेन पर इच्छित प्राप्तकर्ता
     * @param _message लक्ष्य को भेजने के लिए डेटा (आमतौर पर `onlyFromCrossDomainAccount()` वाले
     *  फ़ंक्शन के लिए कॉल डेटा)
     * @param _gasLimit लक्ष्य डोमेन पर संदेश की प्राप्ति के लिए गैस सीमा (gasLimit)।
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

अंत में, वह फ़ंक्शन जो दूसरी लेयर पर संदेश भेजता है।

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[स्लिथर](https://github.com/crytic/slither) एक स्थिर विश्लेषक (static analyzer) है जिसे ऑप्टिमिज़्म कमजोरियों और अन्य संभावित समस्याओं की तलाश के लिए हर अनुबंध पर चलाता है।
इस मामले में, निम्नलिखित पंक्ति दो कमजोरियों को ट्रिगर करती है:

1. [पुन:प्रवेश (reentrancy) घटनाएँ](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [सौम्य पुन:प्रवेश (Benign reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

इस मामले में हम पुन:प्रवेश के बारे में चिंतित नहीं हैं, हम जानते हैं कि `getCrossDomainMessenger()` एक भरोसेमंद पता लौटाता है, भले ही स्लिथर के पास यह जानने का कोई तरीका न हो।

### L1 सेतु अनुबंध {#the-l1-bridge-contract}

[इस अनुबंध का स्रोत कोड यहाँ है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

इंटरफ़ेस अन्य अनुबंधों का हिस्सा हो सकते हैं, इसलिए उन्हें Solidity संस्करणों की एक विस्तृत श्रृंखला का समर्थन करना होगा।
लेकिन सेतु स्वयं हमारा अनुबंध है, और हम इस बारे में सख्त हो सकते हैं कि यह किस Solidity संस्करण का उपयोग करता है।

```solidity
/* इंटरफ़ेस आयात */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) और [IL1StandardBridge](#il1standardbridge) को ऊपर समझाया गया है।

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[यह इंटरफ़ेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) हमें L2 पर मानक सेतु को नियंत्रित करने के लिए संदेश बनाने देता है।

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[यह इंटरफ़ेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) हमें ERC-20 अनुबंधों को नियंत्रित करने देता है।
[आप इसके बारे में यहाँ और पढ़ सकते हैं](/developers/tutorials/erc20-annotated-code/#the-interface)।

```solidity
/* लाइब्रेरी आयात */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[जैसा कि ऊपर बताया गया है](#crossdomainenabled), इस अनुबंध का उपयोग इंटरलेयर मैसेजिंग के लिए किया जाता है।

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) में L2 अनुबंधों के पते हैं जिनका हमेशा एक ही पता होता है। इसमें L2 पर मानक सेतु शामिल है।

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[ओपनजेपेलिन की Address उपयोगिताएँ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)। इसका उपयोग अनुबंध पतों और बाह्य रूप से स्वामित्व वाले खातों (EOA) से संबंधित पतों के बीच अंतर करने के लिए किया जाता है।

ध्यान दें कि यह एक सही समाधान नहीं है, क्योंकि प्रत्यक्ष कॉल और अनुबंध के कंस्ट्रक्टर से की गई कॉल के बीच अंतर करने का कोई तरीका नहीं है, लेकिन कम से कम यह हमें कुछ सामान्य उपयोगकर्ता त्रुटियों को पहचानने और रोकने देता है।

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 मानक](https://eips.ethereum.org/EIPS/eip-20) किसी अनुबंध के लिए विफलता की रिपोर्ट करने के दो तरीकों का समर्थन करता है:

1. रिवर्ट
2. `false` लौटाएं

दोनों मामलों को संभालने से हमारा कोड अधिक जटिल हो जाएगा, इसलिए इसके बजाय हम [ओपनजेपेलिन के `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) का उपयोग करते हैं, जो यह सुनिश्चित करता है कि [सभी विफलताओं का परिणाम रिवर्ट हो](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)।

```solidity
/**
 * @title L1StandardBridge
 * @dev लेयर 1 (l1) ETH और ERC-20 सेतु एक अनुबंध है जो जमा किए गए लेयर 1 (l1) फंड और मानक
 * टोकन संग्रहीत करता है जो लेयर 2 (l2) पर उपयोग में हैं। यह एक संबंधित लेयर 2 (l2) सेतु को सिंक्रनाइज़ करता है, इसे जमा के बारे में सूचित करता है
 * और नई अंतिम रूप दी गई निकासी के लिए इसे सुनता है。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

यह पंक्ति बताती है कि हम हर बार `IERC20` इंटरफ़ेस का उपयोग करते समय `SafeERC20` रैपर का उपयोग कैसे निर्दिष्ट करते हैं।

```solidity

    /********************************
     * बाहरी अनुबंध संदर्भ *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) का पता।

```solidity

    // जमा किए गए लेयर 1 (l1) टोकन के बैलेंस के लिए लेयर 1 (l1) टोकन को लेयर 2 (l2) टोकन से मैप करता है
    mapping(address => mapping(address => uint256)) public deposits;
```

इस तरह की दोहरी [मैपिंग](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) वह तरीका है जिससे आप [दो-आयामी स्पार्स एरे (two-dimensional sparse array)](https://en.wikipedia.org/wiki/Sparse_matrix) को परिभाषित करते हैं।
इस डेटा संरचना में मानों को `deposit[L1 token addr][L2 token addr]` के रूप में पहचाना जाता है।
डिफ़ॉल्ट मान शून्य है।
केवल वे सेल जो एक अलग मान पर सेट हैं, स्टोरेज में लिखे जाते हैं।

```solidity

    /***************
     * कंस्ट्रक्टर *
     ***************/

    // यह अनुबंध एक प्रॉक्सी के पीछे रहता है, इसलिए कंस्ट्रक्टर पैरामीटर अप्रयुक्त रहेंगे।
    constructor() CrossDomainEnabled(address(0)) {}
```

स्टोरेज में सभी चरों को कॉपी किए बिना इस अनुबंध को अपग्रेड करने में सक्षम होना चाहते हैं।
ऐसा करने के लिए हम एक [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) का उपयोग करते हैं, एक अनुबंध जो कॉल को एक अलग अनुबंध में ट्रांसफर करने के लिए [`delegatecall`](https://solidity-by-example.org/delegatecall/) का उपयोग करता है जिसका पता प्रॉक्सी कॉन्ट्रैक्ट द्वारा संग्रहीत किया जाता है (जब आप अपग्रेड करते हैं तो आप प्रॉक्सी को उस पते को बदलने के लिए कहते हैं)।
जब आप `delegatecall` का उपयोग करते हैं तो स्टोरेज _कॉल करने वाले_ अनुबंध का स्टोरेज बना रहता है, इसलिए सभी अनुबंध स्थिति (state) चरों के मान अप्रभावित रहते हैं।

इस पैटर्न का एक प्रभाव यह है कि उस अनुबंध का स्टोरेज जो `delegatecall` का _कॉल किया गया_ है, उपयोग नहीं किया जाता है और इसलिए इसे पास किए गए कंस्ट्रक्टर मान मायने नहीं रखते हैं।
यही कारण है कि हम `CrossDomainEnabled` कंस्ट्रक्टर को एक निरर्थक मान प्रदान कर सकते हैं।
यही कारण है कि नीचे दिया गया इनिशियलाइज़ेशन कंस्ट्रक्टर से अलग है।

```solidity
    /******************
     * आरंभीकरण *
     ******************/

    /**
     * @param _l1messenger लेयर 1 (l1) मैसेंजर पता जिसका उपयोग क्रॉस-चेन संचार के लिए किया जा रहा है।
     * @param _l2TokenBridge लेयर 2 (l2) मानक सेतु का पता।
     */
    // slither-disable-next-line external-function
```

यह [स्लिथर परीक्षण](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) उन फ़ंक्शंस की पहचान करता है जिन्हें अनुबंध कोड से कॉल नहीं किया जाता है और इसलिए उन्हें `public` के बजाय `external` घोषित किया जा सकता है।
`external` फ़ंक्शंस की गैस लागत कम हो सकती है, क्योंकि उन्हें कॉल डेटा (calldata) में पैरामीटर प्रदान किए जा सकते हैं।
`public` घोषित फ़ंक्शंस को अनुबंध के भीतर से सुलभ होना चाहिए।
अनुबंध अपने स्वयं के कॉल डेटा को संशोधित नहीं कर सकते हैं, इसलिए पैरामीटर मेमोरी में होने चाहिए।
जब ऐसे फ़ंक्शन को बाहरी रूप से कॉल किया जाता है, तो कॉल डेटा को मेमोरी में कॉपी करना आवश्यक होता है, जिसमें गैस खर्च होती है।
इस मामले में फ़ंक्शन को केवल एक बार कॉल किया जाता है, इसलिए अक्षमता हमारे लिए मायने नहीं रखती है।

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` फ़ंक्शन को केवल एक बार कॉल किया जाना चाहिए।
यदि L1 क्रॉस डोमेन मैसेंजर या L2 टोकन सेतु का पता बदलता है, तो हम एक नया प्रॉक्सी और एक नया सेतु बनाते हैं जो इसे कॉल करता है।
ऐसा होने की संभावना नहीं है सिवाय इसके कि जब पूरी प्रणाली को अपग्रेड किया जाए, जो एक बहुत ही दुर्लभ घटना है।

ध्यान दें कि इस फ़ंक्शन में ऐसा कोई तंत्र नहीं है जो यह प्रतिबंधित करता हो कि इसे _कौन_ कॉल कर सकता है।
इसका मतलब यह है कि सिद्धांत रूप में एक हमलावर तब तक इंतजार कर सकता है जब तक कि हम प्रॉक्सी और सेतु के पहले संस्करण को तैनात (deploy) नहीं कर देते और फिर वैध उपयोगकर्ता से पहले `initialize` फ़ंक्शन तक पहुंचने के लिए [फ्रंट-रनिंग](https://solidity-by-example.org/hacks/front-running/) कर सकता है। लेकिन इसे रोकने के दो तरीके हैं:

1. यदि अनुबंध सीधे EOA द्वारा तैनात नहीं किए जाते हैं बल्कि [एक ऐसे लेन-देन में होते हैं जिसमें कोई अन्य अनुबंध उन्हें बनाता है](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) तो पूरी प्रक्रिया परमाणु (atomic) हो सकती है, और किसी भी अन्य लेन-देन के निष्पादित होने से पहले समाप्त हो सकती है।
2. यदि `initialize` पर वैध कॉल विफल हो जाती है तो हमेशा नए बनाए गए प्रॉक्सी और सेतु को अनदेखा करना और नए बनाना संभव है।

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

ये दो पैरामीटर हैं जिन्हें सेतु को जानने की आवश्यकता है।

```solidity

    /**************
     * जमा करना *
     **************/

    /** @dev संशोधक जिसके लिए प्रेषक का EOA होना आवश्यक है। इस जांच को एक दुर्भावनापूर्ण
     *  अनुबंध द्वारा initcode के माध्यम से बायपास किया जा सकता है, लेकिन यह उस उपयोगकर्ता त्रुटि का ध्यान रखता है जिससे हम बचना चाहते हैं。
     */
    modifier onlyEOA() {
        // अनुबंधों से जमा रोकने के लिए उपयोग किया जाता है (गलती से खोए हुए टोकन से बचें)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

यही कारण है कि हमें ओपनजेपेलिन की `Address` उपयोगिताओं की आवश्यकता थी।

```solidity
    /**
     * @dev लेयर 2 (l2) पर कॉलर के बैलेंस में ETH की एक राशि जमा करने के लिए
     * इस फ़ंक्शन को बिना किसी डेटा के कॉल किया जा सकता है।
     * चूंकि प्राप्त (receive) फ़ंक्शन डेटा नहीं लेता है, इसलिए एक रूढ़िवादी
     * डिफ़ॉल्ट राशि लेयर 2 (l2) पर अग्रेषित की जाती है。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

यह फ़ंक्शन परीक्षण उद्देश्यों के लिए मौजूद है।
ध्यान दें कि यह इंटरफ़ेस परिभाषाओं में दिखाई नहीं देता है - यह सामान्य उपयोग के लिए नहीं है।

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

ये दो फ़ंक्शन `_initiateETHDeposit` के चारों ओर रैपर हैं, वह फ़ंक्शन जो वास्तविक ETH जमा को संभालता है।

```solidity
    /**
     * @dev ETH को संग्रहीत करके और लेयर 2 (l2) ETH गेटवे को जमा के बारे में सूचित करके जमा के लिए लॉजिक निष्पादित करता है।
     * @param _from लेयर 1 (l1) पर जमा खींचने के लिए खाता।
     * @param _to लेयर 2 (l2) पर जमा देने के लिए खाता।
     * @param _l2Gas लेयर 2 (l2) पर जमा पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data लेयर 2 (l2) पर अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा केवल
     *        बाहरी अनुबंधों की सुविधा के लिए प्रदान किया जाता है। अधिकतम लंबाई लागू करने के
     *        अलावा, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit कॉल के लिए कॉल डेटा बनाएँ
        bytes memory message = abi.encodeWithSelector(
```

क्रॉस डोमेन संदेश जिस तरह से काम करते हैं वह यह है कि गंतव्य अनुबंध को संदेश के साथ उसके कॉल डेटा के रूप में कॉल किया जाता है।
Solidity अनुबंध हमेशा अपने कॉल डेटा की व्याख्या इसके अनुसार करते हैं
[ABI विनिर्देशों](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)।
Solidity फ़ंक्शन [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) वह कॉल डेटा बनाता है।

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

यहाँ संदेश इन मापदंडों के साथ [`finalizeDeposit` फ़ंक्शन](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) को कॉल करना है:

| पैरामीटर | मान | अर्थ |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | L1 पर ETH (जो ERC-20 टोकन नहीं है) के लिए विशेष मान |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | L2 अनुबंध जो ऑप्टिमिज़्म पर ETH का प्रबंधन करता है, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (यह अनुबंध केवल आंतरिक ऑप्टिमिज़्म उपयोग के लिए है) |
| \_from | \_from | L1 पर वह पता जो ETH भेजता है |
| \_to | \_to | L2 पर वह पता जो ETH प्राप्त करता है |
| amount | msg.value | भेजे गए Wei की मात्रा (जो पहले ही सेतु को भेजी जा चुकी है) |
| \_data | \_data | जमा के साथ संलग्न करने के लिए अतिरिक्त डेटा |

```solidity
        // लेयर 2 (l2) में कॉल डेटा भेजें
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

क्रॉस डोमेन मैसेंजर के माध्यम से संदेश भेजें।

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

किसी भी विकेंद्रीकृत एप्लिकेशन (dapp) को सूचित करने के लिए एक घटना (event) उत्सर्जित करें जो इस ट्रांसफर को सुनता है।

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

ये दो फ़ंक्शन `_initiateERC20Deposit` के चारों ओर रैपर हैं, वह फ़ंक्शन जो वास्तविक ERC-20 जमा को संभालता है।

```solidity
    /**
     * @dev लेयर 2 (l2) जमा टोकन अनुबंध को जमा के बारे में सूचित करके और लेयर 1 (l1) फंड को लॉक करने के लिए हैंडलर को कॉल करके जमा के लिए लॉजिक निष्पादित करता है। (उदा., transferFrom)
     *
     * @param _l1Token लेयर 1 (l1) ERC-20 का पता जिसे हम जमा कर रहे हैं
     * @param _l2Token लेयर 1 (l1) के संबंधित लेयर 2 (l2) ERC-20 का पता
     * @param _from लेयर 1 (l1) पर जमा खींचने के लिए खाता
     * @param _to लेयर 2 (l2) पर जमा देने के लिए खाता
     * @param _amount जमा करने के लिए ERC-20 की राशि।
     * @param _l2Gas लेयर 2 (l2) पर जमा पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data लेयर 2 (l2) पर अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा केवल
     *        बाहरी अनुबंधों की सुविधा के लिए प्रदान किया जाता है। अधिकतम लंबाई लागू करने के
     *        अलावा, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं。
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

यह फ़ंक्शन ऊपर दिए गए `_initiateETHDeposit` के समान है, जिसमें कुछ महत्वपूर्ण अंतर हैं।
पहला अंतर यह है कि यह फ़ंक्शन टोकन पते और ट्रांसफर की जाने वाली राशि को पैरामीटर के रूप में प्राप्त करता है।
ETH के मामले में सेतु को कॉल में पहले से ही सेतु खाते (`msg.value`) में संपत्ति का ट्रांसफर शामिल है।

```solidity
        // जब लेयर 1 (l1) पर जमा शुरू किया जाता है, तो लेयर 1 (l1) सेतु भविष्य की
        // निकासी के लिए फंड को स्वयं में ट्रांसफर करता है। safeTransferFrom यह भी जांचता है कि क्या अनुबंध में कोड है, इसलिए यह विफल हो जाएगा यदि
        // _from एक EOA या पता(0) है।
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 टोकन ट्रांसफर ETH से एक अलग प्रक्रिया का पालन करते हैं:

1. उपयोगकर्ता (`_from`) उचित टोकन ट्रांसफर करने के लिए सेतु को व्यय सीमा देता है।
2. उपयोगकर्ता टोकन अनुबंध के पते, राशि आदि के साथ सेतु को कॉल करता है।
3. सेतु जमा प्रक्रिया के हिस्से के रूप में टोकन (स्वयं को) ट्रांसफर करता है।

पहला कदम अंतिम दो से एक अलग लेन-देन में हो सकता है।
हालाँकि, फ्रंट-रनिंग कोई समस्या नहीं है क्योंकि दो फ़ंक्शन जो `_initiateERC20Deposit` (`depositERC20` और `depositERC20To`) को कॉल करते हैं, वे केवल `_from` पैरामीटर के रूप में `msg.sender` के साथ इस फ़ंक्शन को कॉल करते हैं।

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) के लिए कॉल डेटा बनाएँ
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // लेयर 2 (l2) में कॉल डेटा भेजें
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

टोकन की जमा राशि को `deposits` डेटा संरचना में जोड़ें।
L2 पर कई पते हो सकते हैं जो एक ही L1 ERC-20 टोकन के अनुरूप हों, इसलिए जमा का ट्रैक रखने के लिए L1 ERC-20 टोकन के सेतु के बैलेंस का उपयोग करना पर्याप्त नहीं है।

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * क्रॉस-चेन फ़ंक्शन *
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

L2 सेतु L2 क्रॉस डोमेन मैसेंजर को एक संदेश भेजता है जिसके कारण L1 क्रॉस डोमेन मैसेंजर इस फ़ंक्शन को कॉल करता है (बेशक, एक बार जब [संदेश को अंतिम रूप देने वाला लेन-देन](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1 पर सबमिट हो जाता है)।

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

सुनिश्चित करें कि यह एक _वैध_ संदेश है, जो क्रॉस डोमेन मैसेंजर से आ रहा है और L2 टोकन सेतु से उत्पन्न हो रहा है।
इस फ़ंक्शन का उपयोग सेतु से ETH निकालने के लिए किया जाता है, इसलिए हमें यह सुनिश्चित करना होगा कि इसे केवल अधिकृत कॉलर द्वारा ही कॉल किया जाए।

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH ट्रांसफर करने का तरीका प्राप्तकर्ता को `msg.value` में Wei की मात्रा के साथ कॉल करना है।

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

निकासी के बारे में एक घटना उत्सर्जित करें।

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

यह फ़ंक्शन ऊपर दिए गए `finalizeETHWithdrawal` के समान है, जिसमें ERC-20 टोकन के लिए आवश्यक परिवर्तन हैं।

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` डेटा संरचना को अपडेट करें।

```solidity

        // जब लेयर 1 (l1) पर निकासी को अंतिम रूप दिया जाता है, तो लेयर 1 (l1) सेतु फंड को निकालने वाले को ट्रांसफर करता है
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * अस्थायी - ETH माइग्रेट करना *
     *****************************/

    /**
     * @dev खाते में ETH बैलेंस जोड़ता है। इसका उद्देश्य ETH को
     * पुराने गेटवे से नए गेटवे में माइग्रेट करने की अनुमति देना है।
     * नोट: यह केवल एक अपग्रेड के लिए छोड़ा गया है ताकि हम पुराने अनुबंध से
     * माइग्रेट किया गया ETH प्राप्त कर सकें
     */
    function donateETH() external payable {}
}
```

सेतु का एक पूर्व कार्यान्वयन था।
जब हम उस कार्यान्वयन से इस पर गए, तो हमें सभी संपत्तियों को स्थानांतरित करना पड़ा।
ERC-20 टोकन को बस स्थानांतरित किया जा सकता है।
हालाँकि, किसी अनुबंध में ETH ट्रांसफर करने के लिए आपको उस अनुबंध की स्वीकृति की आवश्यकता होती है, जो `donateETH` हमें प्रदान करता है।

## L2 पर ERC-20 टोकन {#erc-20-tokens-on-l2}

एक ERC-20 टोकन को मानक सेतु में फिट होने के लिए, इसे मानक सेतु को, और _केवल_ मानक सेतु को, टोकन मिंट करने की अनुमति देने की आवश्यकता है।
यह आवश्यक है क्योंकि सेतुओं को यह सुनिश्चित करने की आवश्यकता है कि ऑप्टिमिज़्म पर प्रसारित होने वाले टोकन की संख्या L1 सेतु अनुबंध के अंदर लॉक किए गए टोकन की संख्या के बराबर है।
यदि L2 पर बहुत अधिक टोकन हैं तो कुछ उपयोगकर्ता अपनी संपत्तियों को वापस L1 पर सेतु के माध्यम से ट्रांसफर करने में असमर्थ होंगे।
एक विश्वसनीय सेतु के बजाय, हम अनिवार्य रूप से [आंशिक आरक्षित बैंकिंग (fractional reserve banking)](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) को फिर से बनाएंगे।
यदि L1 पर बहुत अधिक टोकन हैं, तो उनमें से कुछ टोकन हमेशा के लिए सेतु अनुबंध के अंदर लॉक रहेंगे क्योंकि L2 टोकन को बर्न किए बिना उन्हें जारी करने का कोई तरीका नहीं है।

### IL2StandardERC20 {#il2standarderc20}

L2 पर प्रत्येक ERC-20 टोकन जो मानक सेतु का उपयोग करता है, उसे [यह इंटरफ़ेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) प्रदान करने की आवश्यकता है, जिसमें वे फ़ंक्शन और घटनाएँ हैं जिनकी मानक सेतु को आवश्यकता है।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[मानक ERC-20 इंटरफ़ेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) में `mint` और `burn` फ़ंक्शन शामिल नहीं हैं।
उन विधियों की [ERC-20 मानक](https://eips.ethereum.org/EIPS/eip-20) द्वारा आवश्यकता नहीं है, जो टोकन बनाने और नष्ट करने के तंत्र को अनिर्दिष्ट छोड़ देता है।

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 इंटरफ़ेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) का उपयोग यह निर्दिष्ट करने के लिए किया जाता है कि अनुबंध कौन से फ़ंक्शन प्रदान करता है।
[आप यहाँ मानक पढ़ सकते हैं](https://eips.ethereum.org/EIPS/eip-165)।

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

यह फ़ंक्शन L1 टोकन का पता प्रदान करता है जिसे इस अनुबंध में सेतु के माध्यम से ट्रांसफर किया गया है।
ध्यान दें कि हमारे पास विपरीत दिशा में समान फ़ंक्शन नहीं है।
हमें किसी भी L1 टोकन को सेतु के माध्यम से ट्रांसफर करने में सक्षम होने की आवश्यकता है, भले ही इसे लागू करते समय L2 समर्थन की योजना बनाई गई थी या नहीं।

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

टोकन मिंट (बनाने) और बर्न (नष्ट करने) के लिए फ़ंक्शन और घटनाएँ।
सेतु एकमात्र इकाई होनी चाहिए जो यह सुनिश्चित करने के लिए इन फ़ंक्शंस को चला सके कि टोकन की संख्या सही है (L1 पर लॉक किए गए टोकन की संख्या के बराबर)।

### L2StandardERC20 {#l2standarderc20}

[यह `IL2StandardERC20` इंटरफ़ेस का हमारा कार्यान्वयन है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)।
जब तक आपको किसी प्रकार के कस्टम लॉजिक की आवश्यकता न हो, आपको इसका उपयोग करना चाहिए।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[ओपनजेपेलिन ERC-20 अनुबंध](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)।
ऑप्टिमिज़्म पहिये का फिर से आविष्कार करने में विश्वास नहीं करता है, खासकर जब पहिया अच्छी तरह से ऑडिट किया गया हो और संपत्तियों को रखने के लिए पर्याप्त भरोसेमंद होने की आवश्यकता हो।

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

ये दो अतिरिक्त कॉन्फ़िगरेशन पैरामीटर हैं जिनकी हमें आवश्यकता है और ERC-20 को सामान्य रूप से नहीं होती है।

```solidity

    /**
     * @param _l2Bridge लेयर 2 (l2) मानक सेतु का पता।
     * @param _l1Token संबंधित लेयर 1 (l1) टोकन का पता।
     * @param _name ERC-20 नाम।
     * @param _symbol ERC-20 प्रतीक。
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

पहले उस अनुबंध के लिए कंस्ट्रक्टर को कॉल करें जिससे हम इनहेरिट करते हैं (`ERC20(_name, _symbol)`) और फिर अपने स्वयं के चर सेट करें।

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

इस तरह [ERC-165](https://eips.ethereum.org/EIPS/eip-165) काम करता है।
प्रत्येक इंटरफ़ेस समर्थित फ़ंक्शंस की एक संख्या है, और इसे उन फ़ंक्शंस के [ABI फ़ंक्शन चयनकर्ताओं](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) के [एक्सक्लूसिव ऑर (exclusive or)](https://en.wikipedia.org/wiki/Exclusive_or) के रूप में पहचाना जाता है।

L2 सेतु ERC-165 का उपयोग एक विवेक परीक्षण (sanity check) के रूप में करता है ताकि यह सुनिश्चित हो सके कि जिस ERC-20 अनुबंध को वह संपत्ति भेजता है वह एक `IL2StandardERC20` है।

**नोट:** दुष्ट अनुबंध को `supportsInterface` के गलत उत्तर प्रदान करने से रोकने के लिए कुछ भी नहीं है, इसलिए यह एक विवेक परीक्षण तंत्र है, सुरक्षा तंत्र _नहीं_।

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

केवल L2 सेतु को संपत्तियों को मिंट और बर्न करने की अनुमति है।

`_mint` और `_burn` वास्तव में [ओपनजेपेलिन ERC-20 अनुबंध](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) में परिभाषित हैं।
वह अनुबंध बस उन्हें बाहरी रूप से उजागर नहीं करता है, क्योंकि टोकन मिंट और बर्न करने की शर्तें उतनी ही विविध हैं जितने ERC-20 का उपयोग करने के तरीके हैं।

## L2 सेतु कोड {#l2-bridge-code}

यह वह कोड है जो ऑप्टिमिज़्म पर सेतु चलाता है।
[इस अनुबंध का स्रोत यहाँ है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* इंटरफ़ेस आयात */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) इंटरफ़ेस ऊपर देखे गए [L1 समकक्ष](#il1erc20bridge) के बहुत समान है।
दो महत्वपूर्ण अंतर हैं:

1. L1 पर आप जमा शुरू करते हैं और निकासी को अंतिम रूप देते हैं।
   यहाँ आप निकासी शुरू करते हैं और जमा को अंतिम रूप देते हैं।
2. L1 पर ETH और ERC-20 टोकन के बीच अंतर करना आवश्यक है।
   L2 पर हम दोनों के लिए समान फ़ंक्शंस का उपयोग कर सकते हैं क्योंकि आंतरिक रूप से ऑप्टिमिज़्म पर ETH बैलेंस को [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) पते वाले ERC-20 टोकन के रूप में नियंत्रित किया जाता है।

```solidity
/* लाइब्रेरी आयात */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* अनुबंध आयात */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev लेयर 2 (l2) मानक सेतु एक अनुबंध है जो लेयर 1 (l1) और लेयर 2 (l2) के बीच ETH और ERC-20 ट्रांज़िशन को
 * सक्षम करने के लिए लेयर 1 (l1) मानक सेतु के साथ मिलकर काम करता है।
 * यह अनुबंध नए टोकन के लिए मिंटर के रूप में कार्य करता है जब यह लेयर 1 (l1) मानक
 * सेतु में जमा के बारे में सुनता है。
 * यह अनुबंध निकासी के लिए अभिप्रेत टोकन के बर्नर के रूप में भी कार्य करता है, लेयर 1 (l1)
 * सेतु को लेयर 1 (l1) फंड जारी करने के लिए सूचित करता है。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * बाहरी अनुबंध संदर्भ *
     ********************************/

    address public l1TokenBridge;
```

L1 सेतु के पते का ट्रैक रखें।
ध्यान दें कि L1 समकक्ष के विपरीत, यहाँ हमें इस चर की _आवश्यकता_ है।
L1 सेतु का पता पहले से ज्ञात नहीं होता है।

```solidity

    /***************
     * कंस्ट्रक्टर *
     ***************/

    /**
     * @param _l2CrossDomainMessenger इस अनुबंध द्वारा उपयोग किया जाने वाला क्रॉस-डोमेन मैसेंजर।
     * @param _l1TokenBridge मुख्य चेन पर तैनात लेयर 1 (l1) सेतु का पता。
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * निकासी *
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

ये दो फ़ंक्शन निकासी शुरू करते हैं।
ध्यान दें कि L1 टोकन पते को निर्दिष्ट करने की कोई आवश्यकता नहीं है।
L2 टोकन से हमें L1 समकक्ष का पता बताने की उम्मीद है।

```solidity

    /**
     * @dev टोकन को बर्न करके और लेयर 1 (l1) टोकन गेटवे को निकासी के बारे में सूचित करके
     *      निकासी के लिए लॉजिक निष्पादित करता है।
     * @param _l2Token लेयर 2 (l2) टोकन का पता जहां निकासी शुरू की गई है।
     * @param _from लेयर 2 (l2) पर निकासी खींचने के लिए खाता।
     * @param _to लेयर 1 (l1) पर निकासी देने के लिए खाता।
     * @param _amount निकालने के लिए टोकन की राशि।
     * @param _l1Gas अप्रयुक्त, लेकिन संभावित फॉरवर्ड संगतता विचारों के लिए शामिल किया गया है।
     * @param _data लेयर 1 (l1) पर अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा केवल
     *        बाहरी अनुबंधों की सुविधा के लिए प्रदान किया जाता है। अधिकतम लंबाई लागू करने के
     *        अलावा, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // जब कोई निकासी शुरू की जाती है, तो हम बाद के लेयर 2 (l2)
        // उपयोग को रोकने के लिए निकालने वाले के फंड को बर्न करते हैं
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

ध्यान दें कि हम `_from` पैरामीटर पर निर्भर _नहीं_ हैं बल्कि `msg.sender` पर निर्भर हैं जिसे नकली बनाना बहुत कठिन है (जहाँ तक मुझे पता है, असंभव है)।

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) के लिए कॉल डेटा बनाएँ
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1 पर ETH और ERC-20 के बीच अंतर करना आवश्यक है।

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

        // लेयर 1 (l1) सेतु तक संदेश भेजें
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * क्रॉस-चेन फ़ंक्शन: जमा करना *
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

यह फ़ंक्शन `L1StandardBridge` द्वारा कॉल किया जाता है।

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

सुनिश्चित करें कि संदेश का स्रोत वैध है।
यह महत्वपूर्ण है क्योंकि यह फ़ंक्शन `_mint` को कॉल करता है और इसका उपयोग उन टोकन को देने के लिए किया जा सकता है जो L1 पर सेतु के स्वामित्व वाले टोकन द्वारा कवर नहीं किए गए हैं।

```solidity
        // जांचें कि लक्ष्य टोकन अनुपालन करता है और
        // सत्यापित करें कि लेयर 1 (l1) पर जमा किया गया टोकन यहां लेयर 2 (l2) जमा टोकन प्रतिनिधित्व से मेल खाता है
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

विवेक परीक्षण (Sanity checks):

1. सही इंटरफ़ेस समर्थित है
2. L2 ERC-20 अनुबंध का L1 पता टोकन के L1 स्रोत से मेल खाता है

```solidity
        ) {
            // जब किसी जमा को अंतिम रूप दिया जाता है, तो हम लेयर 2 (l2) पर खाते में उसी राशि के
            // टोकन क्रेडिट करते हैं।
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

यदि विवेक परीक्षण पास हो जाते हैं, तो जमा को अंतिम रूप दें:

1. टोकन मिंट करें
2. उचित घटना उत्सर्जित करें

```solidity
        } else {
            // या तो लेयर 2 (l2) टोकन जिसमें जमा किया जा रहा है, वह सही पते के बारे में असहमत है
            // अपने लेयर 1 (l1) टोकन के, या सही इंटरफ़ेस का समर्थन नहीं करता है।
            // यह केवल तभी होना चाहिए जब कोई दुर्भावनापूर्ण लेयर 2 (l2) टोकन हो, या यदि किसी उपयोगकर्ता ने किसी तरह
            // जमा करने के लिए गलत लेयर 2 (l2) टोकन पता निर्दिष्ट किया हो।
            // दोनों ही मामलों में, हम यहां प्रक्रिया को रोकते हैं और एक निकासी
            // संदेश बनाते हैं ताकि उपयोगकर्ता कुछ मामलों में अपना फंड निकाल सकें。
            // दुर्भावनापूर्ण टोकन अनुबंधों को पूरी तरह से रोकने का कोई तरीका नहीं है, लेकिन यह
            // उपयोगकर्ता त्रुटि को सीमित करता है और दुर्भावनापूर्ण अनुबंध व्यवहार के कुछ रूपों को कम करता है।
```

यदि किसी उपयोगकर्ता ने गलत L2 टोकन पते का उपयोग करके कोई पता लगाने योग्य त्रुटि की है, तो हम जमा को रद्द करना चाहते हैं और L1 पर टोकन वापस करना चाहते हैं।
L2 से हम ऐसा करने का एकमात्र तरीका एक संदेश भेजना है जिसे दोष चुनौती अवधि (fault challenge period) की प्रतीक्षा करनी होगी, लेकिन यह उपयोगकर्ता के लिए टोकन को स्थायी रूप से खोने से कहीं बेहतर है।

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // जमा को प्रेषक को वापस बाउंस करने के लिए यहां _to और _from को स्विच किया गया
                _from,
                _amount,
                _data
            );

            // लेयर 1 (l1) सेतु तक संदेश भेजें
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## निष्कर्ष {#conclusion}

मानक सेतु संपत्ति ट्रांसफर के लिए सबसे लचीला तंत्र है।
हालाँकि, क्योंकि यह बहुत सामान्य है, इसलिए इसका उपयोग करना हमेशा सबसे आसान तंत्र नहीं होता है।
विशेष रूप से निकासी के लिए, अधिकांश उपयोगकर्ता [थर्ड पार्टी सेतुओं](https://optimism.io/apps#bridge) का उपयोग करना पसंद करते हैं जो चुनौती अवधि की प्रतीक्षा नहीं करते हैं और निकासी को अंतिम रूप देने के लिए मर्कल प्रमाण (Merkle proof) की आवश्यकता नहीं होती है।

ये सेतु आमतौर पर L1 पर संपत्ति रखकर काम करते हैं, जिसे वे एक छोटे से शुल्क (अक्सर मानक सेतु निकासी के लिए गैस की लागत से कम) के लिए तुरंत प्रदान करते हैं।
जब सेतु (या इसे चलाने वाले लोग) को L1 संपत्तियों की कमी होने का अनुमान होता है, तो यह L2 से पर्याप्त संपत्तियों को ट्रांसफर करता है। चूंकि ये बहुत बड़ी निकासी हैं, इसलिए निकासी लागत एक बड़ी राशि पर परिशोधित (amortized) हो जाती है और यह बहुत छोटा प्रतिशत होता है।

उम्मीद है कि इस लेख ने आपको यह समझने में मदद की है कि लेयर 2 (l2) कैसे काम करता है, और स्पष्ट और सुरक्षित Solidity कोड कैसे लिखें।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।