---
title: "ऑप्टिमिज्म स्टैंडर्ड ब्रिज कॉन्ट्रैक्ट वॉकथ्रू"
description: "ऑप्टिमिज्म के लिए स्टैंडर्ड ब्रिज कैसे काम करता है? यह इस तरह से क्यों काम करता है?"
author: "ओरी पोमेरेन्ट्ज़"
tags: [ "सोलिडीटी", "ब्रिज", "परत 2" ]
skill: intermediate
published: 2022-03-30
lang: hi
---

[Optimism](https://www.optimism.io/) एक [ऑप्टिमिस्टिक रोलअप](/developers/docs/scaling/optimistic-rollups/) है।
ऑप्टिमिस्टिक रोलअप, Ethereum मेननेट (जिसे लेयर 1 या L1 भी कहा जाता है) की तुलना में बहुत कम कीमत पर ट्रांज़ैक्शन को प्रोसेस कर सकते हैं क्योंकि ट्रांज़ैक्शन नेटवर्क पर हर नोड के बजाय केवल कुछ नोड्स द्वारा प्रोसेस किए जाते हैं।
साथ ही, सभी डेटा L1 पर लिखे जाते हैं ताकि मेननेट की सभी अखंडता और उपलब्धता गारंटी के साथ सब कुछ साबित और पुनर्निर्मित किया जा सके।

ऑप्टिमिज्म (या किसी अन्य L2) पर L1 परिसंपत्तियों का उपयोग करने के लिए, परिसंपत्तियों को [ब्रिज](/bridges/#prerequisites) करने की आवश्यकता होती है।
इसे प्राप्त करने का एक तरीका यह है कि यूज़र L1 पर परिसंपत्तियों (ETH और [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) सबसे आम हैं) को लॉक करें, और L2 पर उपयोग करने के लिए समकक्ष परिसंपत्तियां प्राप्त करें।
अंततः, जिसके पास भी वे होते हैं, वह उन्हें L1 पर वापस ब्रिज करना चाह सकता है।
ऐसा करने पर, संपत्ति L2 पर बर्न हो जाती है और फिर L1 पर यूज़र को वापस जारी कर दी जाती है।

यह वह तरीका है जिससे [ऑप्टिमिज्म स्टैंडर्ड ब्रिज](https://docs.optimism.io/app-developers/bridging/standard-bridge) काम करता है।
इस लेख में हम उस ब्रिज के सोर्स कोड पर जाते हैं यह देखने के लिए कि यह कैसे काम करता है और अच्छी तरह से लिखे गए Solidity कोड के उदाहरण के रूप में इसका अध्ययन करते हैं।

## कंट्रोल फ्लो {#control-flows}

ब्रिज में दो मुख्य फ्लो हैं:

- जमा (L1 से L2 तक)
- निकासी (L2 से L1 तक)

### जमा फ्लो {#deposit-flow}

#### लेयर 1 {#deposit-flow-layer-1}

1. यदि ERC-20 जमा कर रहे हैं, तो जमाकर्ता ब्रिज को जमा की जा रही राशि खर्च करने के लिए भत्ता देता है
2. जमाकर्ता L1 ब्रिज (`depositERC20`, `depositERC20To`, `depositETH`, या `depositETHTo`) को कॉल करता है
3. L1 ब्रिज, ब्रिज की गई संपत्ति का कब्ज़ा ले लेता है
   - ETH: संपत्ति को कॉल के हिस्से के रूप में जमाकर्ता द्वारा स्थानांतरित किया जाता है
   - ERC-20: संपत्ति को ब्रिज द्वारा जमाकर्ता द्वारा प्रदान किए गए भत्ते का उपयोग करके स्वयं को स्थानांतरित किया जाता है
4. L1 ब्रिज, L2 ब्रिज पर `finalizeDeposit` को कॉल करने के लिए क्रॉस-डोमेन संदेश तंत्र का उपयोग करता है

#### लेयर 2 {#deposit-flow-layer-2}

5. L2 ब्रिज `finalizeDeposit` के कॉल को सत्यापित करता है कि वह वैध है:
   - क्रॉस डोमेन संदेश अनुबंध से आया है
   - मूल रूप से L1 पर ब्रिज से था
6. L2 ब्रिज यह जाँचता है कि L2 पर ERC-20 टोकन अनुबंध सही है या नहीं:
   - L2 अनुबंध रिपोर्ट करता है कि उसका L1 समकक्ष वही है जहां से टोकन L1 पर आए थे
   - L2 अनुबंध रिपोर्ट करता है कि यह सही इंटरफ़ेस का समर्थन करता है ([ERC-165 का उपयोग करके](https://eips.ethereum.org/EIPS/eip-165))।
7. यदि L2 अनुबंध सही है, तो उपयुक्त पते पर उपयुक्त संख्या में टोकन बनाने के लिए इसे कॉल करें। यदि नहीं, तो यूज़र को L1 पर टोकन का दावा करने की अनुमति देने के लिए निकासी प्रक्रिया शुरू करें।

### निकासी फ्लो {#withdrawal-flow}

#### लेयर 2 {#withdrawal-flow-layer-2}

1. निकासीकर्ता L2 ब्रिज (`withdraw` या `withdrawTo`) को कॉल करता है
2. L2 ब्रिज `msg.sender` से संबंधित टोकन की उचित संख्या को बर्न करता है
3. L2 ब्रिज, L1 ब्रिज पर `finalizeETHWithdrawal` या `finalizeERC20Withdrawal` को कॉल करने के लिए क्रॉस-डोमेन संदेश तंत्र का उपयोग करता है

#### लेयर 1 {#withdrawal-flow-layer-1}

4. L1 ब्रिज `finalizeETHWithdrawal` या `finalizeERC20Withdrawal` के कॉल को सत्यापित करता है कि वह वैध है:
   - क्रॉस डोमेन संदेश तंत्र से आया है
   - मूल रूप से L2 पर ब्रिज से था
5. L1 ब्रिज उपयुक्त संपत्ति (ETH या ERC-20) को उपयुक्त पते पर स्थानांतरित करता है

## लेयर 1 कोड {#layer-1-code}

यह वह कोड है जो L1, Ethereum मेननेट पर चलता है।

### IL1ERC20Bridge {#IL1ERC20Bridge}

[यह इंटरफ़ेस यहाँ परिभाषित किया गया है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)।
इसमें ERC-20 टोकन को ब्रिज करने के लिए आवश्यक फ़ंक्शन और परिभाषाएँ शामिल हैं।

```solidity
// SPDX-License-Identifier: MIT
```

[ऑप्टिमिज्म का अधिकांश कोड MIT लाइसेंस के तहत जारी किया गया है](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)।

```solidity
pragma solidity >0.5.0 <0.9.0;
```

लिखने के समय Solidity का नवीनतम संस्करण 0.8.12 है।
जब तक संस्करण 0.9.0 जारी नहीं हो जाता, हम नहीं जानते कि यह कोड इसके साथ संगत है या नहीं।

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * इवेंट्स *
     **********/

    event ERC20DepositInitiated(
```

ऑप्टिमिज्म ब्रिज शब्दावली में _deposit_ का अर्थ L1 से L2 में स्थानांतरण है, और _withdrawal_ का अर्थ L2 से L1 में स्थानांतरण है।

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

अधिकांश मामलों में L1 पर एक ERC-20 का पता L2 पर समकक्ष ERC-20 के पते के समान नहीं होता है।
[आप टोकन पतों की सूची यहां देख सकते हैं](https://static.optimism.io/optimism.tokenlist.json)।
`chainId` 1 वाला पता L1 (मेननेट) पर है और `chainId` 10 वाला पता L2 (ऑप्टिमिज्म) पर है।
अन्य दो `chainId` मान कोवन टेस्ट नेटवर्क (42) और ऑप्टिमिस्टिक कोवन टेस्ट नेटवर्क (69) के लिए हैं।

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

स्थानांतरण में नोट्स जोड़ना संभव है, जिस स्थिति में वे उन्हें रिपोर्ट करने वाले इवेंट्स में जोड़े जाते हैं।

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

एक ही ब्रिज अनुबंध दोनों दिशाओं में स्थानांतरण को संभालता है।
L1 ब्रिज के मामले में, इसका मतलब जमा की शुरुआत और निकासी को अंतिम रूप देना है।

```solidity

    /********************
     * सार्वजनिक फ़ंक्शन *
     ********************/

    /**
     * @dev संबंधित L2 ब्रिज अनुबंध का पता प्राप्त करें।
     * @return संबंधित L2 ब्रिज अनुबंध का पता।
     */
    function l2TokenBridge() external returns (address);
```

इस फ़ंक्शन की वास्तव में आवश्यकता नहीं है, क्योंकि L2 पर यह एक पूर्व-तैनात अनुबंध है, इसलिए यह हमेशा पते `0x4200000000000000000000000000000000000010` पर होता है।
यह यहां L2 ब्रिज के साथ समरूपता के लिए है, क्योंकि L1 ब्रिज का पता जानना मामूली नहीं है।

```solidity
    /**
     * @dev L2 पर कॉलर की शेष राशि में ERC20 की राशि जमा करें।
     * @param _l1Token हम जिस L1 ERC20 को जमा कर रहे हैं उसका पता
     * @param _l2Token L1 संबंधित L2 ERC20 का पता
     * @param _amount जमा करने के लिए ERC20 की राशि
     * @param _l2Gas L2 पर जमा को पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data L2 को अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा प्रदान किया गया है
     *        पूरी तरह से बाहरी अनुबंधों की सुविधा के रूप में। अधिकतम लागू करने के अलावा
     *        लंबाई, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` पैरामीटर L2 गैस की वह राशि है जिसे ट्रांज़ैक्शन खर्च करने की अनुमति है।
[एक निश्चित (उच्च) सीमा तक, यह मुफ़्त है](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), इसलिए जब तक ERC-20 अनुबंध मिन्टिंग के समय कुछ वास्तव में अजीब नहीं करता है, यह एक मुद्दा नहीं होना चाहिए।
यह फ़ंक्शन सामान्य परिदृश्य का ध्यान रखता है, जहां एक यूज़र एक अलग ब्लॉकचेन पर एक ही पते पर संपत्ति को ब्रिज करता है।

```solidity
    /**
     * @dev L2 पर प्राप्तकर्ता की शेष राशि में ERC20 की राशि जमा करें।
     * @param _l1Token हम जिस L1 ERC20 को जमा कर रहे हैं उसका पता
     * @param _l2Token L1 संबंधित L2 ERC20 का पता
     * @param _to L2 पता जिसमें निकासी जमा करनी है।
     * @param _amount जमा करने के लिए ERC20 की राशि।
     * @param _l2Gas L2 पर जमा को पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data L2 को अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा प्रदान किया गया है
     *        पूरी तरह से बाहरी अनुबंधों की सुविधा के रूप में। अधिकतम लागू करने के अलावा
     *        लंबाई, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
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

यह फ़ंक्शन `depositERC20` के लगभग समान है, लेकिन यह आपको ERC-20 को एक अलग पते पर भेजने की सुविधा देता है।

```solidity
    /*************************
     * क्रॉस-चेन फ़ंक्शन *
     *************************/

    /**
     * @dev L2 से L1 में निकासी पूरी करें, और धन को प्राप्तकर्ता की
     * L1 ERC20 टोकन की शेष राशि में जमा करें।
     * यदि L2 से आरंभ की गई निकासी को अंतिम रूप नहीं दिया गया है तो यह कॉल विफल हो जाएगा।
     *
     * @param _l1Token L1 टोकन का पता जिसके लिए finalizeWithdrawal करना है।
     * @param _l2Token L2 टोकन का पता जहां निकासी शुरू की गई थी।
     * @param _from स्थानांतरण शुरू करने वाला L2 पता।
     * @param _to L1 पता जिसमें निकासी जमा करनी है।
     * @param _amount जमा करने के लिए ERC20 की राशि।
     * @param _data L2 पर प्रेषक द्वारा प्रदान किया गया डेटा। यह डेटा प्रदान किया गया है
     *   पूरी तरह से बाहरी अनुबंधों की सुविधा के रूप में। अधिकतम लागू करने के अलावा
     *   लंबाई, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
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

ऑप्टिमिज्म में निकासी (और L2 से L1 के अन्य संदेश) एक दो-चरणीय प्रक्रिया है:

1. L2 पर एक प्रारंभिक ट्रांज़ैक्शन।
2. L1 पर एक अंतिम या दावा करने वाला ट्रांज़ैक्शन।
   यह ट्रांज़ैक्शन L2 ट्रांज़ैक्शन के लिए [फॉल्ट चैलेंज अवधि](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) समाप्त होने के बाद होना चाहिए।

### IL1StandardBridge {#il1standardbridge}

[यह इंटरफ़ेस यहाँ परिभाषित किया गया है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)।
इस फ़ाइल में ETH के लिए इवेंट और फ़ंक्शन परिभाषाएँ हैं।
ये परिभाषाएँ ERC-20 के लिए ऊपर `IL1ERC20Bridge` में परिभाषित परिभाषाओं के बहुत समान हैं।

ब्रिज इंटरफ़ेस को दो फ़ाइलों के बीच विभाजित किया गया है क्योंकि कुछ ERC-20 टोकन को कस्टम प्रोसेसिंग की आवश्यकता होती है और उन्हें स्टैंडर्ड ब्रिज द्वारा नियंत्रित नहीं किया जा सकता है।
इस तरह से कस्टम ब्रिज जो ऐसे टोकन को संभालता है, `IL1ERC20Bridge` को लागू कर सकता है और उसे ETH को भी ब्रिज करने की आवश्यकता नहीं होती है।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * इवेंट्स *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

यह इवेंट ERC-20 संस्करण (`ERC20DepositInitiated`) के लगभग समान है, सिवाय L1 और L2 टोकन पतों के बिना।
यही बात अन्य इवेंट्स और फ़ंक्शन के लिए भी सच है।

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
     * @dev ETH की एक राशि को L2 पर कॉलर की शेष राशि में जमा करें।
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev L2 पर प्राप्तकर्ता की शेष राशि में ETH की राशि जमा करें।
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
     * @dev L2 से L1 में निकासी पूरी करें, और धन को प्राप्तकर्ता की
     * L1 ETH टोकन की शेष राशि में जमा करें। चूंकि केवल xDomainMessenger ही इस फ़ंक्शन को कॉल कर सकता है, इसलिए इसे कभी भी
     * निकासी को अंतिम रूप दिए जाने से पहले कॉल नहीं किया जाएगा।
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

[यह अनुबंध](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) दोनों ब्रिज ([L1](#the-l1-bridge-contract) और [L2](#the-l2-bridge-contract)) द्वारा दूसरी लेयर को संदेश भेजने के लिए इनहेरिट किया गया है।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* इंटरफ़ेस इम्पोर्ट */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[यह इंटरफ़ेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) अनुबंध को बताता है कि क्रॉस डोमेन मैसेंजर का उपयोग करके दूसरी लेयर को संदेश कैसे भेजें।
यह क्रॉस डोमेन मैसेंजर एक पूरी तरह से अलग सिस्टम है, और इसके अपने लेख का हकदार है, जिसे मैं भविष्य में लिखने की उम्मीद करता हूं।

```solidity
/**
 * @title CrossDomainEnabled
 * @dev क्रॉस-डोमेन संचार करने वाले अनुबंधों के लिए हेल्पर अनुबंध
 *
 * कंपाइलर का उपयोग किया गया: इनहेरिट करने वाले अनुबंध द्वारा परिभाषित
 */
contract CrossDomainEnabled {
    /*************
     * चर *
     *************/

    // मैसेंजर अनुबंध का उपयोग दूसरे डोमेन से संदेश भेजने और प्राप्त करने के लिए किया जाता है।
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

एक पैरामीटर जो अनुबंध को जानना आवश्यक है, वह है इस लेयर पर क्रॉस डोमेन मैसेंजर का पता।
यह पैरामीटर एक बार, कंस्ट्रक्टर में सेट किया जाता है, और कभी नहीं बदलता है।

```solidity

    /**********************
     * फ़ंक्शन संशोधक *
     **********************/

    /**
     * यह सुनिश्चित करता है कि संशोधित फ़ंक्शन केवल एक विशिष्ट क्रॉस-डोमेन खाते द्वारा कॉल करने योग्य है।
     * @param _sourceDomainAccount मूल डोमेन पर एकमात्र खाता जो इस फ़ंक्शन को कॉल करने के लिए
     *  प्रमाणित है।
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

क्रॉस डोमेन मैसेजिंग उस ब्लॉकचेन पर किसी भी अनुबंध द्वारा सुलभ है जहां यह चल रहा है (या तो Ethereum मेननेट या ऑप्टिमिज्म)।
लेकिन हमें प्रत्येक तरफ ब्रिज की आवश्यकता है ताकि कुछ संदेशों पर _केवल_ भरोसा किया जा सके यदि वे दूसरी तरफ के ब्रिज से आते हैं।

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

केवल उपयुक्त क्रॉस डोमेन मैसेंजर (`messenger`, जैसा कि आप नीचे देखते हैं) से संदेशों पर भरोसा किया जा सकता है।

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

जिस तरह से क्रॉस डोमेन मैसेंजर उस पते को प्रदान करता है जिसने दूसरी लेयर के साथ एक संदेश भेजा है, वह [`.xDomainMessageSender()` फ़ंक्शन](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128) है।
जब तक इसे उस ट्रांज़ैक्शन में कॉल किया जाता है जिसे संदेश द्वारा शुरू किया गया था, यह इस जानकारी को प्रदान कर सकता है।

हमें यह सुनिश्चित करने की आवश्यकता है कि हमें जो संदेश मिला है वह दूसरे ब्रिज से आया है।

```solidity

        _;
    }

    /**********************
     * आंतरिक फ़ंक्शन *
     **********************/

    /**
     * मैसेंजर प्राप्त करता है, आमतौर पर स्टोरेज से। यह फ़ंक्शन उस स्थिति में उजागर होता है जब किसी चाइल्ड अनुबंध को
     * ओवरराइड करने की आवश्यकता होती है।
     * @return क्रॉस-डोमेन मैसेंजर अनुबंध का पता जिसका उपयोग किया जाना चाहिए।
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

यह फ़ंक्शन क्रॉस डोमेन मैसेंजर लौटाता है।
हम `messenger` चर के बजाय एक फ़ंक्शन का उपयोग करते हैं ताकि इससे इनहेरिट करने वाले अनुबंध एक एल्गोरिथम का उपयोग कर सकें यह निर्दिष्ट करने के लिए कि किस क्रॉस डोमेन मैसेंजर का उपयोग करना है।

```solidity

    /**
     * दूसरे डोमेन पर एक खाते में एक संदेश भेजता है
     * @param _crossDomainTarget गंतव्य डोमेन पर इच्छित प्राप्तकर्ता
     * @param _message लक्ष्य को भेजने के लिए डेटा (आमतौर पर `onlyFromCrossDomainAccount()` के साथ एक फ़ंक्शन के लिए calldata)
     * @param _gasLimit लक्ष्य डोमेन पर संदेश की रसीद के लिए gasLimit।
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

अंत में, वह फ़ंक्शन जो दूसरी लेयर को एक संदेश भेजता है।

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) एक स्टैटिक एनालाइज़र है जिसे ऑप्टिमिज्म हर अनुबंध पर चलाता है ताकि कमजोरियों और अन्य संभावित समस्याओं की तलाश की जा सके।
इस मामले में, निम्नलिखित लाइन दो कमजोरियों को ट्रिगर करती है:

1. [रीएंट्रेंसी इवेंट्स](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [सौम्य रीएंट्रेंसी](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

इस मामले में हम रीएंट्रेंसी के बारे में चिंतित नहीं हैं, हम जानते हैं कि `getCrossDomainMessenger()` एक भरोसेमंद पता लौटाता है, भले ही Slither के पास यह जानने का कोई तरीका न हो।

### L1 ब्रिज अनुबंध {#the-l1-bridge-contract}

[इस अनुबंध का सोर्स कोड यहाँ है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

इंटरफ़ेस अन्य अनुबंधों का हिस्सा हो सकते हैं, इसलिए उन्हें Solidity संस्करणों की एक विस्तृत श्रृंखला का समर्थन करना होता है।
लेकिन ब्रिज खुद हमारा अनुबंध है, और हम इस बारे में सख्त हो सकते हैं कि यह किस Solidity संस्करण का उपयोग करता है।

```solidity
/* इंटरफ़ेस इम्पोर्ट */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) और [IL1StandardBridge](#IL1StandardBridge) को ऊपर समझाया गया है।

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[यह इंटरफ़ेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) हमें L2 पर स्टैंडर्ड ब्रिज को नियंत्रित करने के लिए संदेश बनाने की सुविधा देता है।

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[यह इंटरफ़ेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) हमें ERC-20 अनुबंधों को नियंत्रित करने की सुविधा देता है।
[आप इसके बारे में और यहां पढ़ सकते हैं](/developers/tutorials/erc20-annotated-code/#the-interface)।

```solidity
/* लाइब्रेरी इम्पोर्ट */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[जैसा कि ऊपर बताया गया है](#crossdomainenabled), इस अनुबंध का उपयोग इंटरलेयर मैसेजिंग के लिए किया जाता है।

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) में L2 अनुबंधों के लिए पते हैं जिनका पता हमेशा समान होता है। इसमें L2 पर स्टैंडर्ड ब्रिज शामिल है।

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin की पता उपयोगिताएँ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)। इसका उपयोग अनुबंध पतों और बाह्य रूप से स्वामित्व वाले खातों (EOA) से संबंधित पतों के बीच अंतर करने के लिए किया जाता है।

ध्यान दें कि यह एक आदर्श समाधान नहीं है, क्योंकि सीधे कॉल और एक अनुबंध के कंस्ट्रक्टर से किए गए कॉल के बीच अंतर करने का कोई तरीका नहीं है, लेकिन कम से कम यह हमें कुछ सामान्य यूज़र त्रुटियों को पहचानने और रोकने की सुविधा देता है।

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 मानक](https://eips.ethereum.org/EIPS/eip-20) एक अनुबंध के लिए विफलता की रिपोर्ट करने के दो तरीकों का समर्थन करता है:

1. रिवर्ट करें
2. `false` लौटाएं

दोनों मामलों को संभालने से हमारा कोड और अधिक जटिल हो जाएगा, इसलिए इसके बजाय हम [OpenZeppelin के `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) का उपयोग करते हैं, जो यह सुनिश्चित करता है कि [सभी विफलताएं एक रिवर्ट में परिणत हों](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)।

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH और ERC20 ब्रिज एक अनुबंध है जो जमा किए गए L1 फंड और L2 पर उपयोग में आने वाले स्टैंडर्ड टोकन को संग्रहीत करता है।
 * यह एक संबंधित L2 ब्रिज को सिंक्रनाइज़ करता है, इसे जमा के बारे में सूचित करता है
 * और नई अंतिम रूप दी गई निकासी के लिए इसे सुनता है।
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

यह लाइन है कि हम `IERC20` इंटरफ़ेस का उपयोग करते समय हर बार `SafeERC20` रैपर का उपयोग करने के लिए कैसे निर्दिष्ट करते हैं।

```solidity

    /********************************
     * बाहरी अनुबंध संदर्भ *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) का पता।

```solidity

    // जमा किए गए L1 टोकन की शेष राशि के लिए L1 टोकन को L2 टोकन से मैप करता है
    mapping(address => mapping(address => uint256)) public deposits;
```

इस तरह की एक डबल [मैपिंग](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) [दो-आयामी स्पार्स ऐरे](https://en.wikipedia.org/wiki/Sparse_matrix) को परिभाषित करने का तरीका है।
इस डेटा संरचना में मान `deposit[L1 token addr][L2 token addr]` के रूप में पहचाने जाते हैं।
डिफ़ॉल्ट मान शून्य है।
केवल वे सेल जो एक अलग मान पर सेट हैं, स्टोरेज में लिखे जाते हैं।

```solidity

    /***************
     * कंस्ट्रक्टर *
     ***************/

    // यह अनुबंध एक प्रॉक्सी के पीछे रहता है, इसलिए कंस्ट्रक्टर पैरामीटर का उपयोग नहीं किया जाएगा।
    constructor() CrossDomainEnabled(address(0)) {}
```

स्टोरेज में सभी चर को कॉपी किए बिना इस अनुबंध को अपग्रेड करने में सक्षम होना चाहते हैं।
ऐसा करने के लिए हम एक [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) का उपयोग करते हैं, एक अनुबंध जो एक अलग अनुबंध में कॉल स्थानांतरित करने के लिए [`delegatecall`](https://solidity-by-example.org/delegatecall/) का उपयोग करता है जिसका पता प्रॉक्सी अनुबंध द्वारा संग्रहीत किया जाता है (जब आप अपग्रेड करते हैं तो आप प्रॉक्सी को उस पते को बदलने के लिए कहते हैं)।
जब आप `delegatecall` का उपयोग करते हैं तो स्टोरेज _कॉलिंग_ अनुबंध का स्टोरेज बना रहता है, इसलिए सभी अनुबंध स्थिति चर के मान अप्रभावित रहते हैं।

इस पैटर्न का एक प्रभाव यह है कि `delegatecall` के _कॉल किए गए_ अनुबंध का स्टोरेज उपयोग नहीं किया जाता है और इसलिए इसे पास किए गए कंस्ट्रक्टर मानों का कोई मतलब नहीं है।
यही कारण है कि हम `CrossDomainEnabled` कंस्ट्रक्टर को एक निरर्थक मान प्रदान कर सकते हैं।
यह भी कारण है कि नीचे आरंभीकरण कंस्ट्रक्टर से अलग है।

```solidity
    /******************
     * आरंभीकरण *
     ******************/

    /**
     * @param _l1messenger L1 Messenger पता जिसका उपयोग क्रॉस-चेन संचार के लिए किया जा रहा है।
     * @param _l2TokenBridge L2 स्टैंडर्ड ब्रिज पता।
     */
    // slither-disable-next-line external-function
```

यह [Slither परीक्षण](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) उन फ़ंक्शन की पहचान करता है जिन्हें अनुबंध कोड से नहीं बुलाया जाता है और इसलिए उन्हें `public` के बजाय `external` घोषित किया जा सकता है।
`external` फ़ंक्शन की गैस लागत कम हो सकती है, क्योंकि उन्हें calldata में पैरामीटर के साथ प्रदान किया जा सकता है।
`public` घोषित फ़ंक्शन अनुबंध के भीतर से सुलभ होने चाहिए।
अनुबंध अपने स्वयं के calldata को संशोधित नहीं कर सकते हैं, इसलिए पैरामीटर मेमोरी में होने चाहिए।
जब ऐसे फ़ंक्शन को बाह्य रूप से कॉल किया जाता है, तो calldata को मेमोरी में कॉपी करना आवश्यक होता है, जिसमें गैस लगती है।
इस मामले में फ़ंक्शन को केवल एक बार कॉल किया जाता है, इसलिए अक्षमता हमारे लिए कोई मायने नहीं रखती है।

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` फ़ंक्शन को केवल एक बार कॉल किया जाना चाहिए।
यदि L1 क्रॉस डोमेन मैसेंजर या L2 टोकन ब्रिज का पता बदलता है, तो हम एक नया प्रॉक्सी और एक नया ब्रिज बनाते हैं जो इसे कॉल करता है।
यह तब तक होने की संभावना नहीं है जब तक कि पूरे सिस्टम को अपग्रेड नहीं किया जाता है, जो एक बहुत ही दुर्लभ घटना है।

ध्यान दें कि इस फ़ंक्शन में कोई तंत्र नहीं है जो यह प्रतिबंधित करता है कि _कौन_ इसे कॉल कर सकता है।
इसका मतलब है कि सिद्धांत रूप में एक हमलावर तब तक इंतजार कर सकता है जब तक हम प्रॉक्सी और ब्रिज के पहले संस्करण को तैनात नहीं करते और फिर वैध यूज़र के करने से पहले `initialize` फ़ंक्शन तक पहुंचने के लिए [फ्रंट-रन](https://solidity-by-example.org/hacks/front-running/) कर सकता है। लेकिन इसे रोकने के दो तरीके हैं:

1. यदि अनुबंध सीधे एक EOA द्वारा नहीं बल्कि [एक ट्रांज़ैक्शन में जिसमें एक और अनुबंध उन्हें बनाता है](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) तैनात किए जाते हैं, तो पूरी प्रक्रिया परमाणु हो सकती है, और किसी भी अन्य ट्रांज़ैक्शन के निष्पादित होने से पहले समाप्त हो सकती है।
2. यदि `initialize` के लिए वैध कॉल विफल हो जाती है, तो नए बनाए गए प्रॉक्सी और ब्रिज को अनदेखा करना और नए बनाना हमेशा संभव होता है।

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

ये दो पैरामीटर हैं जिन्हें ब्रिज को जानना आवश्यक है।

```solidity

    /**************
     * जमा करना *
     **************/

    /** @dev प्रेषक को EOA होने की आवश्यकता वाला संशोधक। इस जाँच को एक दुर्भावनापूर्ण
     *  अनुबंध द्वारा initcode के माध्यम से बायपास किया जा सकता है, लेकिन यह उस यूज़र त्रुटि का ध्यान रखता है जिससे हम बचना चाहते हैं।
     */
    modifier onlyEOA() {
        // अनुबंधों से जमा को रोकने के लिए उपयोग किया जाता है (गलती से खोए हुए टोकन से बचें)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

यही कारण है कि हमें OpenZeppelin की `Address` उपयोगिताओं की आवश्यकता थी।

```solidity
    /**
     * @dev इस फ़ंक्शन को बिना किसी डेटा के कॉल किया जा सकता है
     * L2 पर कॉलर की शेष राशि में ETH की राशि जमा करने के लिए।
     * चूंकि प्राप्त फ़ंक्शन डेटा नहीं लेता है, एक रूढ़िवादी
     * डिफ़ॉल्ट राशि L2 को अग्रेषित की जाती है।
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

ये दो फ़ंक्शन `_initiateETHDeposit` के आसपास रैपर हैं, वह फ़ंक्शन जो वास्तविक ETH जमा को संभालता है।

```solidity
    /**
     * @dev ETH को संग्रहीत करके और L2 ETH गेटवे को
     * जमा के बारे में सूचित करके जमा के लिए तर्क करता है।
     * @param _from L1 पर जमा को खींचने के लिए खाता।
     * @param _to L2 पर जमा देने के लिए खाता।
     * @param _l2Gas L2 पर जमा को पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data L2 को अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा प्रदान किया गया है
     *        पूरी तरह से बाहरी अनुबंधों की सुविधा के रूप में। अधिकतम लागू करने के अलावा
     *        लंबाई, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit कॉल के लिए calldata का निर्माण करें
        bytes memory message = abi.encodeWithSelector(
```

जिस तरह से क्रॉस डोमेन संदेश काम करते हैं वह यह है कि गंतव्य अनुबंध को उसके calldata के रूप में संदेश के साथ कॉल किया जाता है।
Solidity अनुबंध हमेशा अपने calldata की व्याख्या
[ABI विनिर्देशों](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) के अनुसार करते हैं।
Solidity फ़ंक्शन [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) उस calldata को बनाता है।

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

यहां संदेश इन मापदंडों के साथ [`finalizeDeposit` फ़ंक्शन](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) को कॉल करना है:

| पैरामीटर                        | मूल्य                                                                                    | अर्थ                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | L1 पर ETH (जो एक ERC-20 टोकन नहीं है) के लिए खड़े होने के लिए विशेष मान                                                                            |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | L2 अनुबंध जो ऑप्टिमिज्म पर ETH का प्रबंधन करता है, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (यह अनुबंध केवल आंतरिक ऑप्टिमिज्म उपयोग के लिए है) |
| \_from    | \_from                                                             | L1 पर वह पता जो ETH भेजता है                                                                                                                                          |
| \_to      | \_to                                                               | L2 पर वह पता जो ETH प्राप्त करता है                                                                                                                                   |
| राशि                            | msg.value                                                                | भेजे गए wei की राशि (जो पहले ही ब्रिज को भेजी जा चुकी है)                                                                                          |
| \_data    | \_data                                                             | जमा में संलग्न करने के लिए अतिरिक्त डेटा                                                                                                                              |

```solidity
        // L2 में calldata भेजें
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

क्रॉस डोमेन मैसेंजर के माध्यम से संदेश भेजें।

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

इस स्थानांतरण के बारे में सुनने वाले किसी भी विकेंद्रीकृत अनुप्रयोग को सूचित करने के लिए एक इवेंट उत्सर्जित करें।

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

ये दो फ़ंक्शन `_initiateERC20Deposit` के आसपास रैपर हैं, वह फ़ंक्शन जो वास्तविक ERC-20 जमा को संभालता है।

```solidity
    /**
     * @dev L2 जमा किए गए टोकन को सूचित करके जमा के लिए तर्क करता है
     * अनुबंध को जमा के बारे में और L1 फंड को लॉक करने के लिए एक हैंडलर को कॉल करता है। (जैसे, transferFrom)
     *
     * @param _l1Token हम जिस L1 ERC20 को जमा कर रहे हैं उसका पता
     * @param _l2Token L1 संबंधित L2 ERC20 का पता
     * @param _from L1 पर जमा को खींचने के लिए खाता
     * @param _to L2 पर जमा देने के लिए खाता
     * @param _amount जमा करने के लिए ERC20 की राशि।
     * @param _l2Gas L2 पर जमा को पूरा करने के लिए आवश्यक गैस सीमा।
     * @param _data L2 को अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा प्रदान किया गया है
     *        पूरी तरह से बाहरी अनुबंधों की सुविधा के रूप में। अधिकतम लागू करने के अलावा
     *        लंबाई, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
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
पहला अंतर यह है कि यह फ़ंक्शन टोकन पते और स्थानांतरित करने के लिए राशि को पैरामीटर के रूप में प्राप्त करता है।
ETH के मामले में ब्रिज पर कॉल में पहले से ही ब्रिज खाते में संपत्ति का स्थानांतरण शामिल है (`msg.value`)।

```solidity
        // जब L1 पर एक जमा शुरू किया जाता है, तो L1 ब्रिज भविष्य के लिए फंड को खुद को स्थानांतरित करता है
        // निकासी। safeTransferFrom यह भी जांचता है कि अनुबंध में कोड है या नहीं, इसलिए यह विफल हो जाएगा यदि
        // _from एक EOA या address(0) है।
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 टोकन स्थानांतरण ETH से एक अलग प्रक्रिया का पालन करते हैं:

1. यूज़र (`_from`) उपयुक्त टोकन स्थानांतरित करने के लिए ब्रिज को एक भत्ता देता है।
2. यूज़र टोकन अनुबंध के पते, राशि आदि के साथ ब्रिज को कॉल करता है।
3. ब्रिज जमा प्रक्रिया के हिस्से के रूप में टोकन (स्वयं को) स्थानांतरित करता है।

पहला चरण अंतिम दो से एक अलग ट्रांज़ैक्शन में हो सकता है।
हालांकि, फ्रंट-रनिंग कोई समस्या नहीं है क्योंकि `_initiateERC20Deposit` (`depositERC20` और `depositERC20To`) को कॉल करने वाले दो फ़ंक्शन केवल `msg.sender` को `_from` पैरामीटर के रूप में इस फ़ंक्शन को कॉल करते हैं।

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) के लिए calldata का निर्माण करें
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // L2 में calldata भेजें
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

`deposits` डेटा संरचना में जमा किए गए टोकन की राशि जोड़ें।
L2 पर कई पते हो सकते हैं जो एक ही L1 ERC-20 टोकन के अनुरूप हों, इसलिए जमा का ट्रैक रखने के लिए ब्रिज के L1 ERC-20 टोकन की शेष राशि का उपयोग करना पर्याप्त नहीं है।

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

L2 ब्रिज L2 क्रॉस डोमेन मैसेंजर को एक संदेश भेजता है जो L1 क्रॉस डोमेन मैसेंजर को इस फ़ंक्शन को कॉल करने का कारण बनता है (एक बार जब [संदेश को अंतिम रूप देने वाला ट्रांज़ैक्शन](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1 पर सबमिट किया जाता है, निश्चित रूप से)।

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

सुनिश्चित करें कि यह एक _वैध_ संदेश है, जो क्रॉस डोमेन मैसेंजर से आ रहा है और L2 टोकन ब्रिज से उत्पन्न हो रहा है।
इस फ़ंक्शन का उपयोग ब्रिज से ETH निकालने के लिए किया जाता है, इसलिए हमें यह सुनिश्चित करना होगा कि इसे केवल अधिकृत कॉलर द्वारा ही कॉल किया जाए।

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH स्थानांतरित करने का तरीका `msg.value` में wei की राशि के साथ प्राप्तकर्ता को कॉल करना है।

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

निकासी के बारे में एक इवेंट उत्सर्जित करें।

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

यह फ़ंक्शन ऊपर `finalizeETHWithdrawal` के समान है, जिसमें ERC-20 टोकन के लिए आवश्यक परिवर्तन हैं।

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` डेटा संरचना को अपडेट करें।

```solidity

        // जब L1 पर एक निकासी को अंतिम रूप दिया जाता है, तो L1 ब्रिज फंड को निकासीकर्ता को स्थानांतरित करता है
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * अस्थायी - ETH माइग्रेट करना *
     *****************************/

    /**
     * @dev खाते में ETH शेष राशि जोड़ता है। इसका उद्देश्य ETH को
     * एक पुराने गेटवे से एक नए गेटवे पर माइग्रेट करने की अनुमति देना है।
     * नोट: यह केवल एक अपग्रेड के लिए छोड़ा गया है ताकि हम पुराने अनुबंध से माइग्रेट किए गए ETH को प्राप्त करने में सक्षम हो सकें
     *
     */
    function donateETH() external payable {}
}
```

ब्रिज का एक पहले का कार्यान्वयन था।
जब हम कार्यान्वयन से इस पर चले गए, तो हमें सभी संपत्तियों को स्थानांतरित करना पड़ा।
ERC-20 टोकन को बस स्थानांतरित किया जा सकता है।
हालांकि, एक अनुबंध में ETH स्थानांतरित करने के लिए आपको उस अनुबंध की मंजूरी की आवश्यकता होती है, जो `donateETH` हमें प्रदान करता है।

## L2 पर ERC-20 टोकन {#erc-20-tokens-on-l2}

एक ERC-20 टोकन को स्टैंडर्ड ब्रिज में फिट होने के लिए, इसे स्टैंडर्ड ब्रिज, और _केवल_ स्टैंडर्ड ब्रिज को टोकन मिंट करने की अनुमति देने की आवश्यकता है।
यह आवश्यक है क्योंकि ब्रिज को यह सुनिश्चित करने की आवश्यकता है कि ऑप्टिमिज्म पर परिचालित टोकन की संख्या L1 ब्रिज अनुबंध के अंदर बंद टोकन की संख्या के बराबर हो।
यदि L2 पर बहुत अधिक टोकन हैं तो कुछ यूज़र अपनी संपत्ति को L1 पर वापस ब्रिज नहीं कर पाएंगे।
एक विश्वसनीय ब्रिज के बजाय, हम अनिवार्य रूप से [फ्रैक्शनल रिजर्व बैंकिंग](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) को फिर से बनाएंगे।
यदि L1 पर बहुत अधिक टोकन हैं, तो उनमें से कुछ टोकन ब्रिज अनुबंध के अंदर हमेशा के लिए बंद रहेंगे क्योंकि L2 टोकन को बर्न किए बिना उन्हें जारी करने का कोई तरीका नहीं है।

### IL2StandardERC20 {#il2standarderc20}

L2 पर प्रत्येक ERC-20 टोकन जो स्टैंडर्ड ब्रिज का उपयोग करता है, उसे [यह इंटरफ़ेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) प्रदान करने की आवश्यकता है, जिसमें स्टैंडर्ड ब्रिज को आवश्यक फ़ंक्शन और इवेंट्स हैं।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[स्टैंडर्ड ERC-20 इंटरफ़ेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) में `mint` और `burn` फ़ंक्शन शामिल नहीं हैं।
वे विधियाँ [ERC-20 मानक](https://eips.ethereum.org/EIPS/eip-20) द्वारा आवश्यक नहीं हैं, जो टोकन बनाने और नष्ट करने के तंत्र को अनिर्दिष्ट छोड़ देता है।

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 इंटरफ़ेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) का उपयोग यह निर्दिष्ट करने के लिए किया जाता है कि एक अनुबंध कौन से फ़ंक्शन प्रदान करता है।
[आप मानक को यहां पढ़ सकते हैं](https://eips.ethereum.org/EIPS/eip-165)।

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

यह फ़ंक्शन L1 टोकन का पता प्रदान करता है जिसे इस अनुबंध से ब्रिज किया गया है।
ध्यान दें कि हमारे पास विपरीत दिशा में कोई समान फ़ंक्शन नहीं है।
हमें किसी भी L1 टोकन को ब्रिज करने में सक्षम होना चाहिए, भले ही इसे लागू करते समय L2 समर्थन की योजना बनाई गई हो या नहीं।

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

टोकन को मिंट (बनाने) और बर्न (नष्ट) करने के लिए फ़ंक्शन और इवेंट्स।
ब्रिज को एकमात्र इकाई होनी चाहिए जो यह सुनिश्चित करने के लिए इन कार्यों को चला सके कि टोकन की संख्या सही है (L1 पर लॉक किए गए टोकन की संख्या के बराबर)।

### L2StandardERC20 {#L2StandardERC20}

[यह `IL2StandardERC20` इंटरफ़ेस का हमारा कार्यान्वयन है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)।
जब तक आपको किसी प्रकार के कस्टम तर्क की आवश्यकता न हो, आपको इसका उपयोग करना चाहिए।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 अनुबंध](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)।
ऑप्टिमिज्म पहिया को फिर से आविष्कार करने में विश्वास नहीं करता है, खासकर जब पहिया अच्छी तरह से ऑडिट किया गया हो और संपत्ति रखने के लिए पर्याप्त भरोसेमंद होना चाहिए।

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

ये दो अतिरिक्त कॉन्फ़िगरेशन पैरामीटर हैं जिनकी हमें आवश्यकता है और ERC-20 को सामान्य रूप से नहीं होती है।

```solidity

    /**
     * @param _l2Bridge L2 स्टैंडर्ड ब्रिज का पता।
     * @param _l1Token संबंधित L1 टोकन का पता।
     * @param _name ERC20 नाम।
     * @param _symbol ERC20 प्रतीक।
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

यह वह तरीका है जिससे [ERC-165](https://eips.ethereum.org/EIPS/eip-165) काम करता है।
प्रत्येक इंटरफ़ेस समर्थित फ़ंक्शन की एक संख्या है, और इसे उन फ़ंक्शन के [ABI फ़ंक्शन चयनकर्ताओं](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) के [एक्सक्लूसिव या](https://en.wikipedia.org/wiki/Exclusive_or) के रूप में पहचाना जाता है।

L2 ब्रिज ERC-165 का उपयोग एक सैनिटी चेक के रूप में करता है ताकि यह सुनिश्चित हो सके कि वह ERC-20 अनुबंध जिसमें वह संपत्ति भेजता है, एक `IL2StandardERC20` है।

**नोट:** दुष्ट अनुबंध को `supportsInterface` के लिए झूठे उत्तर प्रदान करने से रोकने के लिए कुछ भी नहीं है, इसलिए यह एक सैनिटी चेक तंत्र है, _न_ कि एक सुरक्षा तंत्र।

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

केवल L2 ब्रिज को संपत्ति मिंट और बर्न करने की अनुमति है।

`_mint` और `_burn` वास्तव में [OpenZeppelin ERC-20 अनुबंध](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) में परिभाषित हैं।
वह अनुबंध बस उन्हें बाह्य रूप से उजागर नहीं करता है, क्योंकि टोकन को मिंट और बर्न करने की शर्तें उतनी ही विविध हैं जितनी ERC-20 का उपयोग करने के तरीके।

## L2 ब्रिज कोड {#l2-bridge-code}

यह कोड है जो ऑप्टिमिज्म पर ब्रिज चलाता है।
[इस अनुबंध का स्रोत यहाँ है](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* इंटरफ़ेस इम्पोर्ट */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) इंटरफ़ेस हमारे द्वारा ऊपर देखे गए [L1 समकक्ष](#IL1ERC20Bridge) के बहुत समान है।
दो महत्वपूर्ण अंतर हैं:

1. L1 पर आप जमा शुरू करते हैं और निकासी को अंतिम रूप देते हैं।
   यहां आप निकासी शुरू करते हैं और जमा को अंतिम रूप देते हैं।
2. L1 पर ETH और ERC-20 टोकन के बीच अंतर करना आवश्यक है।
   L2 पर हम दोनों के लिए समान फ़ंक्शन का उपयोग कर सकते हैं क्योंकि आंतरिक रूप से ऑप्टिमिज्म पर ETH शेष राशि को पते [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) के साथ एक ERC-20 टोकन के रूप में संभाला जाता है।

```solidity
/* लाइब्रेरी इम्पोर्ट */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* अनुबंध इम्पोर्ट */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 स्टैंडर्ड ब्रिज एक अनुबंध है जो L1 स्टैंडर्ड ब्रिज के साथ मिलकर काम करता है
 * L1 और L2 के बीच ETH और ERC20 संक्रमण को सक्षम करने के लिए।
 * यह अनुबंध नए टोकन के लिए एक मिंटर के रूप में कार्य करता है जब यह L1 स्टैंडर्ड में जमा के बारे में सुनता है
 * ब्रिज।
 * यह अनुबंध निकासी के लिए इच्छित टोकन के बर्नर के रूप में भी कार्य करता है, L1 को सूचित करता है
 * L1 फंड जारी करने के लिए ब्रिज।
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * बाहरी अनुबंध संदर्भ *
     ********************************/

    address public l1TokenBridge;
```

L1 ब्रिज के पते का ट्रैक रखें।
ध्यान दें कि L1 समकक्ष के विपरीत, यहाँ हमें इस चर की _आवश्यकता_ है।
L1 ब्रिज का पता पहले से ज्ञात नहीं है।

```solidity

    /***************
     * कंस्ट्रक्टर *
     ***************/

    /**
     * @param _l2CrossDomainMessenger इस अनुबंध द्वारा उपयोग किया जाने वाला क्रॉस-डोमेन मैसेंजर।
     * @param _l1TokenBridge मुख्य चेन पर तैनात L1 ब्रिज का पता।
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
ध्यान दें कि L1 टोकन पता निर्दिष्ट करने की कोई आवश्यकता नहीं है।
L2 टोकन से यह अपेक्षा की जाती है कि वे हमें L1 समकक्ष का पता बताएं।

```solidity

    /**
     * @dev टोकन को बर्न करके और सूचित करके निकासी के लिए तर्क करता है
     *      निकासी के L1 टोकन गेटवे।
     * @param _l2Token L2 टोकन का पता जहां निकासी शुरू की गई है।
     * @param _from L2 पर निकासी को खींचने के लिए खाता।
     * @param _to L1 पर निकासी देने के लिए खाता।
     * @param _amount निकालने के लिए टोकन की राशि।
     * @param _l1Gas अप्रयुक्त, लेकिन संभावित फॉरवर्ड संगतता विचारों के लिए शामिल है।
     * @param _data L1 को अग्रेषित करने के लिए वैकल्पिक डेटा। यह डेटा प्रदान किया गया है
     *        पूरी तरह से बाहरी अनुबंधों की सुविधा के रूप में। अधिकतम लागू करने के अलावा
     *        लंबाई, ये अनुबंध इसकी सामग्री के बारे में कोई गारंटी नहीं देते हैं।
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // जब एक निकासी शुरू की जाती है, तो हम बाद के L2 को रोकने के लिए निकासीकर्ता के फंड को बर्न करते हैं
        // उपयोग
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

ध्यान दें कि हम `_from` पैरामीटर पर निर्भर नहीं हैं, बल्कि `msg.sender` पर निर्भर हैं, जिसे नकली बनाना बहुत कठिन है (जहां तक ​​मुझे पता है, असंभव है)।

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) के लिए calldata का निर्माण करें
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

        // L1 ब्रिज तक संदेश भेजें
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
यह महत्वपूर्ण है क्योंकि यह फ़ंक्शन `_mint` को कॉल करता है और उन टोकन को देने के लिए उपयोग किया जा सकता है जो L1 पर ब्रिज के स्वामित्व वाले टोकन द्वारा कवर नहीं किए गए हैं।

```solidity
        // जांचें कि लक्ष्य टोकन अनुपालन कर रहा है और
        // सत्यापित करें कि L1 पर जमा किया गया टोकन यहां L2 जमा किए गए टोकन प्रतिनिधित्व से मेल खाता है
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

सैनिटी चेक:

1. सही इंटरफ़ेस समर्थित है
2. L2 ERC-20 अनुबंध का L1 पता टोकन के L1 स्रोत से मेल खाता है

```solidity
        ) {
            // जब एक जमा को अंतिम रूप दिया जाता है, तो हम L2 पर खाते में समान राशि
            // टोकन जमा करते हैं।
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

यदि सैनिटी चेक पास हो जाते हैं, तो जमा को अंतिम रूप दें:

1. टोकन मिंट करें
2. उपयुक्त इवेंट उत्सर्जित करें

```solidity
        } else {
            // या तो L2 टोकन जिसमें जमा किया जा रहा है, उसके L1 टोकन के सही पते के बारे में असहमत है,
            // या सही इंटरफ़ेस का समर्थन नहीं करता है।
            // यह केवल तभी होना चाहिए जब कोई दुर्भावनापूर्ण L2 टोकन हो, या यदि किसी यूज़र ने किसी तरह
            // जमा करने के लिए गलत L2 टोकन पता निर्दिष्ट किया हो।
            // किसी भी मामले में, हम यहां प्रक्रिया को रोकते हैं और एक निकासी
            // संदेश का निर्माण करते हैं ताकि यूज़र कुछ मामलों में अपना धन निकाल सकें।
            // दुर्भावनापूर्ण टोकन अनुबंधों को पूरी तरह से रोकने का कोई तरीका नहीं है, लेकिन यह यूज़र त्रुटि को सीमित करता है
            // और दुर्भावनापूर्ण अनुबंध व्यवहार के कुछ रूपों को कम करता है।
```

यदि किसी यूज़र ने गलत L2 टोकन पते का उपयोग करके एक पता लगाने योग्य त्रुटि की है, तो हम जमा को रद्द करना चाहते हैं और L1 पर टोकन वापस करना चाहते हैं।
L2 से ऐसा करने का एकमात्र तरीका एक संदेश भेजना है जिसे फॉल्ट चैलेंज अवधि का इंतजार करना होगा, लेकिन यह यूज़र के लिए स्थायी रूप से टोकन खोने से कहीं बेहतर है।

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // जमा को प्रेषक को वापस उछालने के लिए यहां _to और _from को स्विच किया गया है
                _from,
                _amount,
                _data
            );

            // L1 ब्रिज तक संदेश भेजें
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## निष्कर्ष {#conclusion}

स्टैंडर्ड ब्रिज संपत्ति हस्तांतरण के लिए सबसे लचीला तंत्र है।
हालांकि, क्योंकि यह बहुत सामान्य है, यह हमेशा उपयोग करने के लिए सबसे आसान तंत्र नहीं है।
विशेष रूप से निकासी के लिए, अधिकांश यूज़र [तृतीय पक्ष ब्रिज](https://optimism.io/apps#bridge) का उपयोग करना पसंद करते हैं जो चुनौती अवधि की प्रतीक्षा नहीं करते हैं और निकासी को अंतिम रूप देने के लिए मर्केल प्रूफ की आवश्यकता नहीं होती है।

ये ब्रिज आमतौर पर L1 पर संपत्ति रखकर काम करते हैं, जिसे वे तुरंत एक छोटे से शुल्क (अक्सर एक स्टैंडर्ड ब्रिज निकासी के लिए गैस की लागत से कम) के लिए प्रदान करते हैं।
जब ब्रिज (या इसे चलाने वाले लोग) L1 संपत्ति पर कमी का अनुमान लगाते हैं, तो यह L2 से पर्याप्त संपत्ति स्थानांतरित करता है। चूंकि ये बहुत बड़ी निकासी हैं, निकासी लागत एक बड़ी राशि पर परिशोधित होती है और यह बहुत छोटा प्रतिशत है।

उम्मीद है कि इस लेख ने आपको लेयर 2 कैसे काम करता है, और स्पष्ट और सुरक्षित Solidity कोड कैसे लिखना है, के बारे में अधिक समझने में मदद की होगी।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।
