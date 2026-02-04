---
title: "Optimism स्टँडर्ड ब्रिज कॉन्ट्रॅक्ट वॉकथ्रू"
description: Optimism साठी स्टँडर्ड ब्रिज कसे काम करते? ते अशा प्रकारे का काम करते?
author: ओरी पोमेरँट्झ
tags: [ "सॉलिडिटी", "ब्रिज", "स्तर 2" ]
skill: intermediate
published: 2022-03-30
lang: mr
---

[Optimism](https://www.optimism.io/) हा एक [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/) आहे.
ऑप्टिमिस्टिक रोलअप्स Ethereum मेननेटपेक्षा (ज्याला लेयर 1 किंवा L1 असेही म्हणतात) खूपच कमी किमतीत ट्रान्झॅक्शन्सवर प्रक्रिया करू शकतात कारण ट्रान्झॅक्शन्सवर नेटवर्कवरील प्रत्येक नोडऐवजी फक्त काही नोड्सद्वारे प्रक्रिया केली जाते.
त्याच वेळी, सर्व डेटा L1 वर लिहिला जातो जेणेकरून मेननेटच्या सर्व इंटिग्रिटी आणि उपलब्धतेच्या हमीसह सर्वकाही सिद्ध आणि पुनर्रचना करता येईल.

Optimism वर (किंवा इतर कोणत्याही L2 वर) L1 मालमत्ता वापरण्यासाठी, मालमत्ता [ब्रिज](/bridges/#prerequisites) करणे आवश्यक आहे.
हे साध्य करण्याचा एक मार्ग म्हणजे वापरकर्त्यांनी L1 वर मालमत्ता (ETH आणि [ERC-20 टोकन](/developers/docs/standards/tokens/erc-20/) हे सर्वात सामान्य आहेत) लॉक करणे आणि L2 वर वापरण्यासाठी समतुल्य मालमत्ता प्राप्त करणे.
शेवटी, ज्या कोणाकडे ते असतील, त्यांना ते L1 वर परत ब्रिज करायचे असतील.
असे करताना, मालमत्ता L2 वर बर्न केली जाते आणि नंतर L1 वर वापरकर्त्याला परत दिली जाते.

[Optimism स्टँडर्ड ब्रिज](https://docs.optimism.io/app-developers/bridging/standard-bridge) अशा प्रकारे काम करते.
या लेखात आम्ही त्या ब्रिजच्या सोर्स कोडचा आढावा घेऊ आणि ते कसे काम करते हे पाहू आणि चांगल्या प्रकारे लिहिलेल्या Solidity कोडचे उदाहरण म्हणून त्याचा अभ्यास करू.

## कंट्रोल फ्लो {#control-flows}

ब्रिजमध्ये दोन मुख्य फ्लो आहेत:

- डिपॉझिट (L1 पासून L2 पर्यंत)
- विड्रॉवल (L2 पासून L1 पर्यंत)

### डिपॉझिट फ्लो {#deposit-flow}

#### लेयर 1 {#deposit-flow-layer-1}

1. जर ERC-20 डिपॉझिट करत असाल, तर डिपॉझिटर ब्रिजला डिपॉझिट होणारी रक्कम खर्च करण्याची परवानगी देतो.
2. डिपॉझिटर L1 ब्रिजला कॉल करतो (`depositERC20`, `depositERC20To`, `depositETH`, किंवा `depositETHTo`)
3. L1 ब्रिज ब्रिज केलेल्या मालमत्तेचा ताबा घेतो
   - ETH: मालमत्ता डिपॉझिटरद्वारे कॉलचा भाग म्हणून हस्तांतरित केली जाते
   - ERC-20: मालमत्ता ब्रिजद्वारे स्वतःकडे हस्तांतरित केली जाते, डिपॉझिटरने दिलेल्या परवानगीचा वापर करून
4. L1 ब्रिज L2 ब्रिजवर `finalizeDeposit` कॉल करण्यासाठी क्रॉस-डोमेन मेसेज मेकॅनिझम वापरतो

#### लेयर 2 {#deposit-flow-layer-2}

5. L2 ब्रिज `finalizeDeposit` साठी केलेला कॉल वैध आहे की नाही हे तपासतो:
   - क्रॉस डोमेन मेसेज कॉन्ट्रॅक्टमधून आला आहे
   - मूळतः L1 वरील ब्रिजमधून होता
6. L2 ब्रिज L2 वरील ERC-20 टोकन कॉन्ट्रॅक्ट योग्य आहे की नाही हे तपासतो:
   - L2 कॉन्ट्रॅक्ट रिपोर्ट करतो की त्याचा L1 समकक्ष L1 वरून आलेल्या टोकनसारखाच आहे
   - L2 कॉन्ट्रॅक्ट रिपोर्ट करतो की तो योग्य इंटरफेस ([ERC-165 वापरून](https://eips.ethereum.org/EIPS/eip-165)) सपोर्ट करतो.
7. जर L2 कॉन्ट्रॅक्ट योग्य असेल, तर योग्य ऍड्रेसवर योग्य संख्येने टोकन मिंट करण्यासाठी त्याला कॉल करा. जर नसेल, तर वापरकर्त्याला L1 वर टोकन क्लेम करण्याची परवानगी देण्यासाठी विड्रॉवल प्रक्रिया सुरू करा.

### विड्रॉवल फ्लो {#withdrawal-flow}

#### लेयर 2 {#withdrawal-flow-layer-2}

1. विड्रॉवर L2 ब्रिजला कॉल करतो (`withdraw` किंवा `withdrawTo`)
2. L2 ब्रिज `msg.sender` शी संबंधित योग्य संख्येने टोकन बर्न करतो
3. L2 ब्रिज L1 ब्रिजवर `finalizeETHWithdrawal` किंवा `finalizeERC20Withdrawal` कॉल करण्यासाठी क्रॉस-डोमेन मेसेज मेकॅनिझम वापरतो

#### लेयर 1 {#withdrawal-flow-layer-1}

4. L1 ब्रिज `finalizeETHWithdrawal` किंवा `finalizeERC20Withdrawal` साठी केलेला कॉल वैध आहे की नाही हे तपासतो:
   - क्रॉस डोमेन मेसेज मेकॅनिझममधून आला आहे
   - मूळतः L2 वरील ब्रिजमधून होता
5. L1 ब्रिज योग्य मालमत्ता (ETH किंवा ERC-20) योग्य ऍड्रेसवर हस्तांतरित करतो

## लेयर 1 कोड {#layer-1-code}

हा कोड L1, Ethereum मेननेटवर चालतो.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[हा इंटरफेस येथे परिभाषित केला आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
यात ERC-20 टोकन्स ब्रिज करण्यासाठी आवश्यक फंक्शन्स आणि परिभाषा समाविष्ट आहेत.

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism चा बहुतेक कोड MIT परवान्याअंतर्गत प्रसिद्ध केला जातो](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

लिहिताना Solidity ची नवीनतम आवृत्ती 0.8.12 आहे.
आवृत्ती 0.9.0 प्रसिद्ध होईपर्यंत, आम्हाला माहित नाही की हा कोड त्याच्याशी सुसंगत आहे की नाही.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Optimism ब्रिजच्या परिभाषेत _deposit_ म्हणजे L1 पासून L2 मध्ये हस्तांतरण, आणि _withdrawal_ म्हणजे L2 पासून L1 मध्ये हस्तांतरण.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

बहुतेक प्रकरणांमध्ये L1 वरील ERC-20 चा ऍड्रेस L2 वरील समतुल्य ERC-20 च्या ऍड्रेस सारखा नसतो.
[तुम्ही येथे टोकन ऍड्रेसची सूची पाहू शकता](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 असलेला ऍड्रेस L1 (मेननेट) वर आहे आणि `chainId` 10 असलेला ऍड्रेस L2 (Optimism) वर आहे.
इतर दोन `chainId` मूल्ये Kovan चाचणी नेटवर्क (42) आणि ऑप्टिमिस्टिक Kovan चाचणी नेटवर्क (69) साठी आहेत.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

हस्तांतरणांमध्ये नोट्स जोडणे शक्य आहे, अशावेळी त्या रिपोर्ट करणाऱ्या इव्हेंट्समध्ये जोडल्या जातात.

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

समान ब्रिज कॉन्ट्रॅक्ट दोन्ही दिशांना हस्तांतरण हाताळतो.
L1 ब्रिजच्या बाबतीत, याचा अर्थ डिपॉझिटची सुरुवात आणि विड्रॉवलचे अंतिमकरण.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

या फंक्शनची खरोखर गरज नाही, कारण L2 वर तो एक प्रीडिप्लॉयड कॉन्ट्रॅक्ट आहे, त्यामुळे तो नेहमी `0x4200000000000000000000000000000000000010` या ऍड्रेसवर असतो.
हे L2 ब्रिजसोबत सममितीसाठी येथे आहे, कारण L1 ब्रिजचा ऍड्रेस जाणून घेणे सोपे _नाही_.

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` पॅरामीटर हे L2 गॅसची रक्कम आहे जी ट्रान्झॅक्शन खर्च करू शकते.
[एका विशिष्ट (उच्च) मर्यादेपर्यंत, हे विनामूल्य आहे](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), त्यामुळे जोपर्यंत ERC-20 कॉन्ट्रॅक्ट मिंटिंग करताना काहीतरी विचित्र करत नाही, तोपर्यंत ही समस्या नसावी.
हे फंक्शन सामान्य परिस्थितीची काळजी घेते, जिथे वापरकर्ता वेगळ्या ब्लॉकचेनवर समान ऍड्रेसवर मालमत्ता ब्रिज करतो.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

हे फंक्शन `depositERC20` शी जवळजवळ समान आहे, परंतु ते तुम्हाला ERC-20 वेगळ्या ऍड्रेसवर पाठवू देते.

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

Optimism मध्ये विड्रॉवल (आणि L2 पासून L1 पर्यंतचे इतर मेसेजेस) ही दोन टप्प्यांची प्रक्रिया आहे:

1. L2 वर एक आरंभिक ट्रान्झॅक्शन.
2. L1 वर एक अंतिम किंवा क्लेमिंग ट्रान्झॅक्शन.
   L2 ट्रान्झॅक्शनसाठी [फॉल्ट चॅलेंज कालावधी](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) संपल्यानंतर हा ट्रान्झॅक्शन होणे आवश्यक आहे.

### IL1StandardBridge {#il1standardbridge}

[हा इंटरफेस येथे परिभाषित केला आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
या फाइलमध्ये ETH साठी इव्हेंट आणि फंक्शन परिभाषा आहेत.
या परिभाषा वरील `IL1ERC20Bridge` मध्ये ERC-20 साठी परिभाषित केलेल्या परिभाषांशी खूप सारख्या आहेत.

ब्रिज इंटरफेस दोन फाइल्समध्ये विभागलेला आहे कारण काही ERC-20 टोकन्सना सानुकूल प्रक्रिया आवश्यक असते आणि ते स्टँडर्ड ब्रिजद्वारे हाताळले जाऊ शकत नाहीत.
अशा प्रकारे असा टोकन हाताळणारा सानुकूल ब्रिज `IL1ERC20Bridge` लागू करू शकतो आणि त्याला ETH ब्रिज करण्याची गरज नाही.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

हा इव्हेंट ERC-20 आवृत्ती (`ERC20DepositInitiated`) शी जवळजवळ समान आहे, फक्त L1 आणि L2 टोकन ऍड्रेस वगळता.
इतर इव्हेंट्स आणि फंक्शन्ससाठीही हेच सत्य आहे.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[हा कॉन्ट्रॅक्ट](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) दोन्ही ब्रिजेस ([L1](#the-l1-bridge-contract) आणि [L2](#the-l2-bridge-contract)) द्वारे दुसऱ्या लेयरवर मेसेज पाठवण्यासाठी वारसा म्हणून मिळतो.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[हा इंटरफेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) क्रॉस डोमेन मेसेंजरचा वापर करून दुसऱ्या लेयरवर मेसेज कसे पाठवायचे हे कॉन्ट्रॅक्टला सांगतो.
हा क्रॉस डोमेन मेसेंजर एक संपूर्ण वेगळी प्रणाली आहे, आणि त्याला स्वतःचा लेख आवश्यक आहे, जो मी भविष्यात लिहिण्याची आशा करतो.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

कॉन्ट्रॅक्टला माहित असणे आवश्यक असलेले एक पॅरामीटर, या लेयरवरील क्रॉस डोमेन मेसेंजरचा ऍड्रेस.
हे पॅरामीटर कन्स्ट्रक्टरमध्ये एकदाच सेट केले जाते आणि कधीही बदलत नाही.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

क्रॉस डोमेन मेसेजिंग ज्या ब्लॉकचेनवर चालू आहे (Ethereum मेननेट किंवा Optimism) त्यावरील कोणत्याही कॉन्ट्रॅक्टद्वारे उपलब्ध आहे.
परंतु आम्हाला प्रत्येक बाजूच्या ब्रिजला _फक्त_ विशिष्ट मेसेजेवर विश्वास ठेवण्याची गरज आहे जर ते दुसऱ्या बाजूच्या ब्रिजवरून आले असतील.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

केवळ योग्य क्रॉस डोमेन मेसेंजर (`messenger`, जसे आपण खाली पाहता) कडून आलेल्या मेसेजेवर विश्वास ठेवला जाऊ शकतो.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

क्रॉस डोमेन मेसेंजर दुसऱ्या लेयरवर मेसेज पाठवणाऱ्या ऍड्रेसला देण्याचा मार्ग म्हणजे [`.xDomainMessageSender()` फंक्शन](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
जोपर्यंत मेसेजद्वारे सुरू केलेल्या ट्रान्झॅक्शनमध्ये तो कॉल केला जातो तोपर्यंत तो ही माहिती देऊ शकतो.

आम्हाला मिळालेला मेसेज दुसऱ्या ब्रिजवरून आला आहे याची खात्री करणे आवश्यक आहे.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

हे फंक्शन क्रॉस डोमेन मेसेंजर परत करते.
आपण `messenger` व्हेरिएबलऐवजी फंक्शन वापरतो कारण यातून वारसा घेणाऱ्या कॉन्ट्रॅक्ट्सना कोणता क्रॉस डोमेन मेसेंजर वापरायचा हे निर्दिष्ट करण्यासाठी एक अल्गोरिदम वापरण्याची परवानगी मिळते.

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

शेवटी, दुसऱ्या लेयरवर मेसेज पाठवणारे फंक्शन.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[स्लिथर](https://github.com/crytic/slither) हा एक स्टॅटिक अॅनालाइझर आहे जो Optimism प्रत्येक कॉन्ट्रॅक्टवर असुरक्षितता आणि इतर संभाव्य समस्या शोधण्यासाठी चालवतो.
या प्रकरणात, खालील ओळ दोन असुरक्षितता दर्शवते:

1. [पुनर्प्रवेश इव्हेंट्स](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [सौम्य पुनर्प्रवेश](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

या प्रकरणात आम्हाला पुनर्प्रवेशाची चिंता नाही, आम्हाला माहित आहे की `getCrossDomainMessenger()` एक विश्वासार्ह ऍड्रेस परत करतो, जरी स्लिथरला हे माहित नसले तरी.

### L1 ब्रिज कॉन्ट्रॅक्ट {#the-l1-bridge-contract}

[या कॉन्ट्रॅक्टचा सोर्स कोड येथे आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

हे इंटरफेस इतर कॉन्ट्रॅक्ट्सचा भाग असू शकतात, त्यामुळे त्यांना Solidity च्या विस्तृत आवृत्त्यांना समर्थन द्यावे लागते.
परंतु ब्रिज स्वतः आमचा कॉन्ट्रॅक्ट आहे, आणि आम्ही ते कोणती Solidity आवृत्ती वापरते याबद्दल कठोर असू शकतो.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) आणि [IL1StandardBridge](#IL1StandardBridge) वर स्पष्ट केले आहेत.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[हा इंटरफेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) आम्हाला L2 वरील स्टँडर्ड ब्रिज नियंत्रित करण्यासाठी मेसेज तयार करण्याची परवानगी देतो.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[हा इंटरफेस](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) आम्हाला ERC-20 कॉन्ट्रॅक्ट नियंत्रित करण्याची परवानगी देतो.
[तुम्ही याबद्दल येथे अधिक वाचू शकता](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[वर स्पष्ट केल्याप्रमाणे](#crossdomainenabled), हा कॉन्ट्रॅक्ट इंटरलेअर मेसेजिंगसाठी वापरला जातो.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) मध्ये L2 कॉन्ट्रॅक्ट्सचे ऍड्रेस आहेत ज्यांचे ऍड्रेस नेहमी समान असतात. यात L2 वरील स्टँडर्ड ब्रिजचा समावेश आहे.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin's Address युटिलिटीज](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). हे कॉन्ट्रॅक्ट ऍड्रेस आणि बाह्य मालकीच्या खात्यांशी (EOA) संबंधित ऍड्रेसमध्ये फरक करण्यासाठी वापरले जाते.

लक्षात ठेवा की हे एक परिपूर्ण समाधान नाही, कारण थेट कॉल आणि कॉन्ट्रॅक्टच्या कन्स्ट्रक्टरमधून केलेल्या कॉलमध्ये फरक करण्याचा कोणताही मार्ग नाही, परंतु किमान हे आम्हाला काही सामान्य वापरकर्त्याच्या चुका ओळखण्यास आणि टाळण्यास मदत करते.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 स्टँडर्ड](https://eips.ethereum.org/EIPS/eip-20) कॉन्ट्रॅक्टला अपयश कळवण्यासाठी दोन मार्गांना समर्थन देते:

1. रिव्हर्ट
2. `false` परत करणे

दोन्ही प्रकरणे हाताळल्याने आमचा कोड अधिक क्लिष्ट होईल, म्हणून त्याऐवजी आम्ही [OpenZeppelin's `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) वापरतो, जे [सर्व अपयशांचे परिणाम रिव्हर्टमध्ये होतील याची खात्री करते](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

ही ओळ आम्ही प्रत्येक वेळी `IERC20` इंटरफेस वापरताना `SafeERC20` रॅपर वापरण्याचे कसे निर्दिष्ट करतो हे दर्शवते.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) चा ऍड्रेस.

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

अशा प्रकारची दुहेरी [मॅपिंग](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) [द्विमितीय विरळ अ‍ॅरे](https://en.wikipedia.org/wiki/Sparse_matrix) परिभाषित करण्याचा एक मार्ग आहे.
या डेटा स्ट्रक्चरमधील मूल्ये `deposit[L1 token addr][L2 token addr]` म्हणून ओळखली जातात.
डीफॉल्ट मूल्य शून्य आहे.
फक्त ज्या सेल्स वेगळ्या मूल्यावर सेट केल्या आहेत त्या स्टोरेजमध्ये लिहिल्या जातात.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

स्टोरेजमधील सर्व व्हेरिएबल्स कॉपी न करता हा कॉन्ट्रॅक्ट अपग्रेड करण्याची इच्छा आहे.
हे करण्यासाठी आम्ही एक [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) वापरतो, जो एका वेगळ्या कॉन्ट्रॅक्टवर कॉल हस्तांतरित करण्यासाठी [`delegatecall`](https://solidity-by-example.org/delegatecall/) वापरतो, ज्याचा ऍड्रेस प्रॉक्सी कॉन्ट्रॅक्टद्वारे संग्रहित केला जातो (तुम्ही अपग्रेड करता तेव्हा तुम्ही प्रॉक्सीला तो ऍड्रेस बदलण्यास सांगता).
तुम्ही `delegatecall` वापरता तेव्हा स्टोरेज _कॉलिंग_ कॉन्ट्रॅक्टचाच राहतो, त्यामुळे सर्व कॉन्ट्रॅक्ट स्थिती व्हेरिएबल्सच्या मूल्यांवर कोणताही परिणाम होत नाही.

या पॅटर्नचा एक परिणाम असा आहे की `delegatecall` चा _कॉल केलेला_ कॉन्ट्रॅक्टचा स्टोरेज वापरला जात नाही आणि त्यामुळे त्याला पास केलेले कन्स्ट्रक्टर मूल्ये महत्त्वाची नसतात.
हेच कारण आहे की आम्ही `CrossDomainEnabled` कन्स्ट्रक्टरला एक निरर्थक मूल्य देऊ शकतो.
हेच कारण आहे की खालील इनिशियलायझेशन कन्स्ट्रक्टरपासून वेगळे आहे.

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

ही [स्लिथर टेस्ट](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) अशी फंक्शन्स ओळखते जी कॉन्ट्रॅक्ट कोडमधून कॉल केली जात नाहीत आणि त्यामुळे `public` ऐवजी `external` घोषित केली जाऊ शकतात.
`external` फंक्शन्सची गॅस किंमत कमी असू शकते, कारण त्यांना कॉलडेटा मध्ये पॅरामीटर्स दिले जाऊ शकतात.
`public` म्हणून घोषित केलेली फंक्शन्स कॉन्ट्रॅक्टमधून प्रवेश करण्यायोग्य असणे आवश्यक आहे.
कॉन्ट्रॅक्ट्स स्वतःचे कॉलडेटा बदलू शकत नाहीत, म्हणून पॅरामीटर्स मेमरीमध्ये असणे आवश्यक आहे.
जेव्हा असे फंक्शन बाहेरून कॉल केले जाते, तेव्हा कॉलडेटा मेमरीमध्ये कॉपी करणे आवश्यक असते, ज्याला गॅस लागतो.
या प्रकरणात फंक्शन फक्त एकदाच कॉल केले जाते, त्यामुळे अकार्यक्षमतेचा आम्हाला फरक पडत नाही.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` फंक्शन फक्त एकदाच कॉल केले पाहिजे.
जर L1 क्रॉस डोमेन मेसेंजर किंवा L2 टोकन ब्रिजचा ऍड्रेस बदलला, तर आम्ही एक नवीन प्रॉक्सी आणि एक नवीन ब्रिज तयार करतो जो त्याला कॉल करतो.
संपूर्ण प्रणाली अपग्रेड केल्याशिवाय हे घडण्याची शक्यता नाही, जी एक खूप दुर्मिळ घटना आहे.

लक्षात ठेवा की या फंक्शनमध्ये अशी कोणतीही यंत्रणा नाही जी _कोण_ कॉल करू शकतो यावर निर्बंध घालते.
याचा अर्थ असा की सैद्धांतिकदृष्ट्या एक आक्रमणकर्ता आम्ही प्रॉक्सी आणि ब्रिजची पहिली आवृत्ती तैनात करेपर्यंत थांबू शकतो आणि नंतर वैध वापरकर्त्यापूर्वी `initialize` फंक्शनवर पोहोचण्यासाठी [फ्रंट-रन](https://solidity-by-example.org/hacks/front-running/) करू शकतो. परंतु हे टाळण्यासाठी दोन पद्धती आहेत:

1. जर कॉन्ट्रॅक्ट्स थेट EOA द्वारे तैनात न करता [दुसऱ्या कॉन्ट्रॅक्टने त्यांना तयार करणाऱ्या ट्रान्झॅक्शनमध्ये](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) तैनात केले गेले, तर संपूर्ण प्रक्रिया अणु असू शकते, आणि इतर कोणताही ट्रान्झॅक्शन कार्यान्वित होण्यापूर्वी पूर्ण होऊ शकते.
2. जर `initialize` साठीचा वैध कॉल अयशस्वी झाला, तर नवीन तयार केलेला प्रॉक्सी आणि ब्रिज दुर्लक्षित करणे आणि नवीन तयार करणे नेहमीच शक्य आहे.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

हे दोन पॅरामीटर्स आहेत जे ब्रिजला माहित असणे आवश्यक आहे.

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

हेच कारण आहे की आम्हाला OpenZeppelin च्या `Address` युटिलिटीजची आवश्यकता होती.

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

हे फंक्शन चाचणी उद्देशांसाठी अस्तित्वात आहे.
लक्षात घ्या की ते इंटरफेस परिभाषांमध्ये दिसत नाही - ते सामान्य वापरासाठी नाही.

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

ही दोन फंक्शन्स `_initiateETHDeposit` या फंक्शनच्या भोवती रॅपर्स आहेत, जे प्रत्यक्ष ETH डिपॉझिट हाताळते.

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

क्रॉस डोमेन मेसेजेस ज्या प्रकारे काम करतात ते म्हणजे डेस्टिनेशन कॉन्ट्रॅक्टला त्याच्या कॉलडेटा म्हणून मेसेजसह कॉल केले जाते.
Solidity कॉन्ट्रॅक्ट्स नेहमी त्यांच्या कॉलडेटाचा अर्थ
[ABI स्पेसिफिकेशन्स](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) नुसार लावतात.
Solidity फंक्शन [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) तो कॉलडेटा तयार करते.

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

येथे मेसेज म्हणजे या पॅरामीटर्ससह [the `finalizeDeposit` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) कॉल करणे:

| पॅरामीटर                        | मूल्य                                                                                    | अर्थ                                                                                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | ETH (जे ERC-20 टोकन नाही) साठी L1 वर उभे राहण्यासाठी विशेष मूल्य                                                                                     |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism वर ETH व्यवस्थापित करणारा L2 कॉन्ट्रॅक्ट, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (हा कॉन्ट्रॅक्ट फक्त अंतर्गत Optimism वापरासाठी आहे) |
| \_from    | \_from                                                             | L1 वर ETH पाठवणारा ऍड्रेस                                                                                                                                               |
| \_to      | \_to                                                               | L2 वर ETH प्राप्त करणारा ऍड्रेस                                                                                                                                         |
| रक्कम                           | msg.value                                                                | पाठवलेली wei ची रक्कम (जी आधीच ब्रिजला पाठवली गेली आहे)                                                                                              |
| \_data    | \_data                                                             | डिपॉझिटला जोडण्यासाठी अतिरिक्त डेटा                                                                                                                                     |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

क्रॉस डोमेन मेसेंजरद्वारे मेसेज पाठवा.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

या हस्तांतरणाची माहिती ऐकणाऱ्या कोणत्याही विकेंद्रित ऍप्लिकेशनला कळवण्यासाठी एक इव्हेंट उत्सर्जित करा.

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

ही दोन फंक्शन्स `_initiateERC20Deposit` या फंक्शनच्या भोवती रॅपर्स आहेत, जे प्रत्यक्ष ERC-20 डिपॉझिट हाताळते.

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g., transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

हे फंक्शन वरील `_initiateETHDeposit` शी सारखे आहे, काही महत्त्वाच्या फरकांसह.
पहिला फरक म्हणजे हे फंक्शन टोकन ऍड्रेस आणि हस्तांतरित करण्याची रक्कम पॅरामीटर्स म्हणून प्राप्त करते.
ETH च्या बाबतीत ब्रिजवर केलेल्या कॉलमध्ये ब्रिज खात्यावर मालमत्तेचे हस्तांतरण (`msg.value`) आधीच समाविष्ट असते.

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 टोकन हस्तांतरण ETH पासून वेगळ्या प्रक्रियेचे पालन करते:

1. वापरकर्ता (`_from`) योग्य टोकन हस्तांतरित करण्यासाठी ब्रिजला परवानगी देतो.
2. वापरकर्ता टोकन कॉन्ट्रॅक्टच्या ऍड्रेस, रक्कम इत्यादीसह ब्रिजला कॉल करतो.
3. ब्रिज डिपॉझिट प्रक्रियेचा भाग म्हणून टोकन (स्वतःला) हस्तांतरित करतो.

पहिला टप्पा शेवटच्या दोन टप्प्यांपासून वेगळ्या ट्रान्झॅक्शनमध्ये होऊ शकतो.
तथापि, फ्रंट-रनिंग ही समस्या नाही कारण `_initiateERC20Deposit` ला कॉल करणारी दोन फंक्शन्स (`depositERC20` आणि `depositERC20To`) या फंक्शनला फक्त `_from` पॅरामीटर म्हणून `msg.sender` सह कॉल करतात.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

डिपॉझिट केलेल्या टोकन्सची रक्कम `deposits` डेटा स्ट्रक्चरमध्ये जोडा.
L2 वर एकाच L1 ERC-20 टोकनला संबंधित अनेक ऍड्रेस असू शकतात, त्यामुळे डिपॉझिटचा मागोवा ठेवण्यासाठी ब्रिजच्या L1 ERC-20 टोकनच्या बॅलन्सचा वापर करणे पुरेसे नाही.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

L2 ब्रिज L2 क्रॉस डोमेन मेसेंजरला एक मेसेज पाठवतो ज्यामुळे L1 क्रॉस डोमेन मेसेंजर या फंक्शनला कॉल करतो (एकदा L1 वर [मेसेज अंतिम करणारा ट्रान्झॅक्शन](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) सबमिट झाला की).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

हा एक _वैध_ मेसेज आहे याची खात्री करा, जो क्रॉस डोमेन मेसेंजरवरून येत आहे आणि L2 टोकन ब्रिजपासून सुरू होत आहे.
हे फंक्शन ब्रिजमधून ETH काढण्यासाठी वापरले जाते, त्यामुळे आम्हाला खात्री करावी लागेल की ते फक्त अधिकृत कॉलरद्वारेच कॉल केले जाईल.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH हस्तांतरित करण्याचा मार्ग म्हणजे `msg.value` मध्ये wei च्या रकमेसह प्राप्तकर्त्याला कॉल करणे.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

विड्रॉवलबद्दल एक इव्हेंट उत्सर्जित करा.

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

हे फंक्शन वरील `finalizeETHWithdrawal` शी सारखे आहे, ERC-20 टोकनसाठी आवश्यक बदलांसह.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` डेटा स्ट्रक्चर अपडेट करा.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

ब्रिजची पूर्वीची अंमलबजावणी होती.
जेव्हा आम्ही त्या अंमलबजावणीवरून यावर आलो, तेव्हा आम्हाला सर्व मालमत्ता हलवावी लागली.
ERC-20 टोकन फक्त हलवले जाऊ शकतात.
तथापि, एका कॉन्ट्रॅक्टवर ETH हस्तांतरित करण्यासाठी तुम्हाला त्या कॉन्ट्रॅक्टची मंजुरी आवश्यक आहे, जी `donateETH` आपल्याला प्रदान करते.

## L2 वरील ERC-20 टोकन्स {#erc-20-tokens-on-l2}

एखाद्या ERC-20 टोकनला स्टँडर्ड ब्रिजमध्ये बसण्यासाठी, त्याला स्टँडर्ड ब्रिजला, आणि _फक्त_ स्टँडर्ड ब्रिजला, टोकन मिंट करण्याची परवानगी देणे आवश्यक आहे.
हे आवश्यक आहे कारण ब्रिजेसना हे सुनिश्चित करणे आवश्यक आहे की Optimism वर फिरणाऱ्या टोकन्सची संख्या L1 ब्रिज कॉन्ट्रॅक्टमध्ये लॉक केलेल्या टोकन्सच्या संख्येइतकी आहे.
जर L2 वर खूप जास्त टोकन असतील तर काही वापरकर्ते त्यांची मालमत्ता L1 वर परत ब्रिज करू शकणार नाहीत.
एका विश्वासार्ह ब्रिजऐवजी, आम्ही मूलतः [फ्रॅक्शनल रिझर्व्ह बँकिंग](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) पुन्हा तयार करू.
जर L1 वर खूप जास्त टोकन असतील, तर त्यापैकी काही टोकन ब्रिज कॉन्ट्रॅक्टमध्ये कायमचे लॉक राहतील कारण L2 टोकन बर्न केल्याशिवाय त्यांना रिलीज करण्याचा कोणताही मार्ग नाही.

### IL2StandardERC20 {#il2standarderc20}

L2 वरील प्रत्येक ERC-20 टोकन जो स्टँडर्ड ब्रिज वापरतो, त्याला [हा इंटरफेस](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) प्रदान करणे आवश्यक आहे, ज्यात स्टँडर्ड ब्रिजला आवश्यक असलेली फंक्शन्स आणि इव्हेंट्स आहेत.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[The standard ERC-20 interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) मध्ये `mint` आणि `burn` फंक्शन्स समाविष्ट नाहीत.
त्या पद्धती [the ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20) द्वारे आवश्यक नाहीत, जे टोकन तयार आणि नष्ट करण्याच्या यंत्रणा अनिर्दिष्ट ठेवते.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[The ERC-165 interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) एक कॉन्ट्रॅक्ट कोणती फंक्शन्स प्रदान करतो हे निर्दिष्ट करण्यासाठी वापरले जाते.
[तुम्ही येथे स्टँडर्ड वाचू शकता](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

हे फंक्शन या कॉन्ट्रॅक्टवर ब्रिज केलेल्या L1 टोकनचा ऍड्रेस प्रदान करते.
लक्षात घ्या की आमच्याकडे उलट दिशेने समान फंक्शन नाही.
आम्हाला कोणताही L1 टोकन ब्रिज करण्याची क्षमता आवश्यक आहे, मग ते लागू करताना L2 सपोर्टची योजना होती की नाही.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

टोकन मिंट (तयार करणे) आणि बर्न (नष्ट करणे) करण्यासाठी फंक्शन्स आणि इव्हेंट्स.
ब्रिज ही एकमेव संस्था असावी जी ही फंक्शन्स चालवू शकेल जेणेकरून टोकन्सची संख्या योग्य असेल (L1 वर लॉक केलेल्या टोकन्सच्या संख्येइतकी).

### L2StandardERC20 {#L2StandardERC20}

[ही `IL2StandardERC20` इंटरफेसची आमची अंमलबजावणी आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
तुम्हाला काही प्रकारच्या सानुकूल तर्काची आवश्यकता नसल्यास, तुम्ही हे वापरावे.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[The OpenZeppelin ERC-20 contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism चाक पुन्हा शोधण्यावर विश्वास ठेवत नाही, विशेषतः जेव्हा चाक चांगले ऑडिट केलेले असते आणि मालमत्ता ठेवण्यासाठी पुरेसे विश्वासार्ह असणे आवश्यक असते.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

हे दोन अतिरिक्त कॉन्फिगरेशन पॅरामीटर्स आहेत ज्यांची आम्हाला आवश्यकता आहे आणि ERC-20 ला सामान्यतः नसते.

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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

प्रथम ज्या कॉन्ट्रॅक्टमधून आपण वारसा घेतो त्याच्या कन्स्ट्रक्टरला कॉल करा (`ERC20(_name, _symbol)`) आणि नंतर आमचे स्वतःचे व्हेरिएबल्स सेट करा.

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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) अशा प्रकारे काम करते.
प्रत्येक इंटरफेस समर्थित फंक्शन्सची संख्या आहे आणि त्या फंक्शन्सच्या [ABI फंक्शन सिलेक्टर्स](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) चा [exclusive or](https://en.wikipedia.org/wiki/Exclusive_or) म्हणून ओळखला जातो.

L2 ब्रिज ERC-165 चा वापर सॅनिटि चेक म्हणून करतो की ज्या ERC-20 कॉन्ट्रॅक्टला तो मालमत्ता पाठवतो तो `IL2StandardERC20` आहे याची खात्री करण्यासाठी.

**टीप:** दुष्ट कॉन्ट्रॅक्टला `supportsInterface` ला चुकीची उत्तरे देण्यापासून रोखण्यासाठी काहीही नाही, म्हणून ही एक सॅनिटि चेक यंत्रणा आहे, _सुरक्षा_ यंत्रणा नाही.

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

फक्त L2 ब्रिजला मालमत्ता मिंट आणि बर्न करण्याची परवानगी आहे.

`_mint` आणि `_burn` प्रत्यक्षात [OpenZeppelin ERC-20 कॉन्ट्रॅक्ट](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) मध्ये परिभाषित आहेत.
तो कॉन्ट्रॅक्ट त्यांना बाहेरून उघड करत नाही, कारण टोकन मिंट आणि बर्न करण्याच्या अटी ERC-20 वापरण्याच्या विविध मार्गांइतक्याच विविध आहेत.

## L2 ब्रिज कोड {#l2-bridge-code}

हा कोड Optimism वर ब्रिज चालवतो.
[या कॉन्ट्रॅक्टचा सोर्स येथे आहे](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) इंटरफेस वरील [L1 समकक्ष](#IL1ERC20Bridge) शी खूप सारखा आहे.
दोन महत्त्वपूर्ण फरक आहेत:

1. L1 वर तुम्ही डिपॉझिट सुरू करता आणि विड्रॉवल अंतिम करता.
   येथे तुम्ही विड्रॉवल सुरू करता आणि डिपॉझिट अंतिम करता.
2. L1 वर ETH आणि ERC-20 टोकनमध्ये फरक करणे आवश्यक आहे.
   L2 वर आपण दोघांसाठी समान फंक्शन्स वापरू शकतो कारण अंतर्गतपणे Optimism वरील ETH बॅलन्स ERC-20 टोकन म्हणून [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) ऍड्रेससह हाताळले जातात.

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

L1 ब्रिजच्या ऍड्रेसचा मागोवा ठेवा.
लक्षात घ्या की L1 समकक्षाच्या उलट, येथे आम्हाला _आवश्यक_ हे व्हेरिएबल आहे.
L1 ब्रिजचा ऍड्रेस आगाऊ माहित नसतो.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

ही दोन फंक्शन्स विड्रॉवल सुरू करतात.
लक्षात घ्या की L1 टोकन ऍड्रेस निर्दिष्ट करण्याची गरज नाही.
L2 टोकन्सनी आम्हाला L1 समकक्षाचा ऍड्रेस सांगावा अशी अपेक्षा आहे.

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

लक्षात घ्या की आम्ही `_from` पॅरामीटरवर अवलंबून नाही तर `msg.sender` वर आहोत जे खोटे करणे खूप कठीण आहे (मला माहित आहे तोपर्यंत अशक्य).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

मेसेजचा स्त्रोत वैध आहे याची खात्री करा.
हे महत्त्वाचे आहे कारण हे फंक्शन `_mint` ला कॉल करते आणि ब्रिजच्या L1 वरील टोकनने कव्हर न केलेल्या टोकन देण्यासाठी वापरले जाऊ शकते.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

सॅनिटि चेक्स:

1. योग्य इंटरफेस समर्थित आहे
2. L2 ERC-20 कॉन्ट्रॅक्टचा L1 ऍड्रेस टोकनच्या L1 स्त्रोताशी जुळतो

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

जर सॅनिटि चेक्स पास झाले, तर डिपॉझिट अंतिम करा:

1. टोकन मिंट करा
2. योग्य इव्हेंट उत्सर्जित करा

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

जर वापरकर्त्याने चुकीचा L2 टोकन ऍड्रेस वापरून ओळखता येणारी चूक केली असेल, तर आम्ही डिपॉझिट रद्द करून L1 वर टोकन परत करू इच्छितो.
L2 वरून हे करण्याचा एकमेव मार्ग म्हणजे एक मेसेज पाठवणे ज्याला फॉल्ट चॅलेंज कालावधीची वाट पाहावी लागेल, परंतु वापरकर्त्यासाठी टोकन कायमचे गमावण्यापेक्षा ते बरेच चांगले आहे.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## निष्कर्ष {#conclusion}

स्टँडर्ड ब्रिज मालमत्ता हस्तांतरणासाठी सर्वात लवचिक यंत्रणा आहे.
तथापि, ते इतके सामान्य असल्यामुळे ते वापरण्यास नेहमीच सोपे नसते.
विशेषतः विड्रॉवलसाठी, बहुतेक वापरकर्ते [तृतीय पक्ष ब्रिज](https://optimism.io/apps#bridge) वापरण्यास प्राधान्य देतात जे चॅलेंज कालावधीची वाट पाहत नाहीत आणि विड्रॉवल अंतिम करण्यासाठी मर्केल प्रूफची आवश्यकता नसते.

हे ब्रिज सामान्यतः L1 वर मालमत्ता ठेवून काम करतात, जे ते थोड्या शुल्कासाठी त्वरित प्रदान करतात (अनेकदा स्टँडर्ड ब्रिज विड्रॉवलसाठी गॅसच्या खर्चापेक्षा कमी).
जेव्हा ब्रिज (किंवा ते चालवणारे लोक) L1 मालमत्तेची कमतरता भासेल अशी अपेक्षा करतात तेव्हा ते L2 वरून पुरेशी मालमत्ता हस्तांतरित करतात. हे खूप मोठे विड्रॉवल असल्याने, विड्रॉवल खर्च मोठ्या रकमेवर वितरित केला जातो आणि तो खूपच लहान टक्केवारी असतो.

आशा आहे की या लेखामुळे तुम्हाला लेयर 2 कसे काम करते, आणि स्पष्ट आणि सुरक्षित Solidity कोड कसा लिहायचा याबद्दल अधिक समजण्यास मदत झाली असेल.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).
