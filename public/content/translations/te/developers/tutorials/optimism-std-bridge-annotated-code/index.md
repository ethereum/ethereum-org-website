---
title: "ఆప్టిమిజం స్టాండర్డ్ బ్రిడ్జ్ కాంట్రాక్ట్ విశ్లేషణ"
description: "ఆప్టిమిజం కోసం స్టాండర్డ్ బ్రిడ్జ్ ఎలా పనిచేస్తుంది? ఇది ఈ విధంగా ఎందుకు పనిచేస్తుంది?"
author: Ori Pomerantz
tags: [ "దృఢత్వం", "బ్రిడ్జ్", "లేయర్ 2" ]
skill: intermediate
published: 2022-03-30
lang: te
---

[Optimism](https://www.optimism.io/) అనేది ఒక [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/).
ఆప్టిమిస్టిక్ రోలప్‌లు ఇథిరియం మెయిన్‌నెట్ (లేయర్ 1 లేదా L1 అని కూడా పిలుస్తారు) కంటే చాలా తక్కువ ధరకు లావాదేవీలను ప్రాసెస్ చేయగలవు, ఎందుకంటే లావాదేవీలు నెట్‌వర్క్‌లోని ప్రతి నోడ్ ద్వారా కాకుండా, కొన్ని నోడ్‌ల ద్వారా మాత్రమే ప్రాసెస్ చేయబడతాయి.
అదే సమయంలో, డేటా మొత్తం L1కి వ్రాయబడుతుంది, కాబట్టి మెయిన్‌నెట్ యొక్క అన్ని సమగ్రత మరియు లభ్యత హామీలతో ప్రతిదీ నిరూపించబడుతుంది మరియు పునర్నిర్మించబడుతుంది.

Optimism (లేదా ఏదైనా ఇతర L2)లో L1 ఆస్తులను ఉపయోగించడానికి, ఆస్తులను [బ్రిడ్జ్ చేయాలి](/bridges/#prerequisites).
దీనిని సాధించడానికి ఒక మార్గం ఏమిటంటే, వినియోగదారులు L1పై ఆస్తులను (ETH మరియు [ERC-20 టోకెన్లు](/developers/docs/standards/tokens/erc-20/) అత్యంత సాధారణమైనవి) లాక్ చేసి, L2లో ఉపయోగించడానికి సమానమైన ఆస్తులను స్వీకరించడం.
చివరికి, వాటిని పొందిన ఎవరైనా వాటిని తిరిగి L1కి బ్రిడ్జ్ చేయాలనుకోవచ్చు.
ఇలా చేస్తున్నప్పుడు, ఆస్తులు L2లో బర్న్ చేయబడతాయి మరియు ఆ తర్వాత L1లో వినియోగదారునికి తిరిగి విడుదల చేయబడతాయి.

[Optimism స్టాండర్డ్ బ్రిడ్జ్](https://docs.optimism.io/app-developers/bridging/standard-bridge) ఈ విధంగా పనిచేస్తుంది.
ఈ వ్యాసంలో మేము ఆ బ్రిడ్జ్ ఎలా పనిచేస్తుందో చూడటానికి దాని సోర్స్ కోడ్‌ను పరిశీలిస్తాము మరియు దానిని బాగా వ్రాసిన Solidity కోడ్‌కు ఉదాహరణగా అధ్యయనం చేస్తాము.

## కంట్రోల్ ఫ్లోస్ {#control-flows}

బ్రిడ్జ్‌కు రెండు ప్రధాన ఫ్లోలు ఉన్నాయి:

- డిపాజిట్ (L1 నుండి L2కి)
- విత్‌డ్రాయల్ (L2 నుండి L1కి)

### డిపాజిట్ ఫ్లో {#deposit-flow}

#### లేయర్ 1 {#deposit-flow-layer-1}

1. ERC-20ని డిపాజిట్ చేస్తుంటే, డిపాజిటర్ డిపాజిట్ చేయబడుతున్న మొత్తాన్ని ఖర్చు చేయడానికి బ్రిడ్జ్‌కు అనుమతి ఇస్తాడు
2. డిపాజిటర్ L1 బ్రిడ్జ్‌ని పిలుస్తాడు (`depositERC20`, `depositERC20To`, `depositETH`, లేదా `depositETHTo`)
3. L1 బ్రిడ్జ్ బ్రిడ్జ్ చేయబడిన ఆస్తిని స్వాధీనం చేసుకుంటుంది
   - ETH: కాల్‌లో భాగంగా డిపాజిటర్ ద్వారా ఆస్తి బదిలీ చేయబడుతుంది
   - ERC-20: డిపాజిటర్ అందించిన అనుమతిని ఉపయోగించి బ్రిడ్జ్ ద్వారా ఆస్తి దానికి బదిలీ చేయబడుతుంది
4. L1 బ్రిడ్జ్ క్రాస్-డొమైన్ మెసేజ్ మెకానిజంను ఉపయోగించి L2 బ్రిడ్జ్‌పై `finalizeDeposit`ని పిలుస్తుంది

#### లేయర్ 2 {#deposit-flow-layer-2}

5. L2 బ్రిడ్జ్ `finalizeDeposit`కి వచ్చిన కాల్ చట్టబద్ధమైనదని ధృవీకరిస్తుంది:
   - క్రాస్ డొమైన్ మెసేజ్ కాంట్రాక్ట్ నుండి వచ్చింది
   - వాస్తవానికి L1లోని బ్రిడ్జ్ నుండి వచ్చింది
6. L2 బ్రిడ్జ్ L2లోని ERC-20 టోకెన్ కాంట్రాక్ట్ సరైనదేనా అని తనిఖీ చేస్తుంది:
   - L2 కాంట్రాక్ట్ దాని L1 ప్రతిరూపం L1 నుండి టోకెన్లు వచ్చిన దానితో సమానమని నివేదిస్తుంది
   - L2 కాంట్రాక్ట్ అది సరైన ఇంటర్‌ఫేస్‌కు మద్దతు ఇస్తుందని నివేదిస్తుంది ([ERC-165ని ఉపయోగించి](https://eips.ethereum.org/EIPS/eip-165)).
7. L2 కాంట్రాక్ట్ సరైనది అయితే, తగిన చిరునామాకు తగినన్ని టోకెన్‌లను ముద్రించడానికి దానిని కాల్ చేయండి. కాకపోతే, L1పై టోకెన్‌లను క్లెయిమ్ చేయడానికి వినియోగదారుని అనుమతించడానికి విత్‌డ్రాయల్ ప్రక్రియను ప్రారంభించండి.

### విత్‌డ్రాయల్ ఫ్లో {#withdrawal-flow}

#### లేయర్ 2 {#withdrawal-flow-layer-2}

1. విత్‌డ్రాయర్ L2 బ్రిడ్జ్‌ని పిలుస్తాడు (`withdraw` లేదా `withdrawTo`)
2. L2 బ్రిడ్జ్ `msg.sender`కి చెందిన తగిన సంఖ్యలో టోకెన్‌లను బర్న్ చేస్తుంది
3. L2 బ్రిడ్జ్ క్రాస్-డొమైన్ మెసేజ్ మెకానిజంను ఉపయోగించి L1 బ్రిడ్జ్‌పై `finalizeETHWithdrawal` లేదా `finalizeERC20Withdrawal`ని పిలుస్తుంది

#### లేయర్ 1 {#withdrawal-flow-layer-1}

4. L1 బ్రిడ్జ్ `finalizeETHWithdrawal` లేదా `finalizeERC20Withdrawal`కి వచ్చిన కాల్ చట్టబద్ధమైనదని ధృవీకరిస్తుంది:
   - క్రాస్ డొమైన్ మెసేజ్ మెకానిజం నుండి వచ్చింది
   - వాస్తవానికి L2లోని బ్రిడ్జ్ నుండి వచ్చింది
5. L1 బ్రిడ్జ్ తగిన ఆస్తిని (ETH లేదా ERC-20) తగిన చిరునామాకు బదిలీ చేస్తుంది

## లేయర్ 1 కోడ్ {#layer-1-code}

ఇది L1, ఇథిరియం మెయిన్‌నెట్‌పై నడిచే కోడ్.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[ఈ ఇంటర్‌ఫేస్ ఇక్కడ నిర్వచించబడింది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
ఇందులో ERC-20 టోకెన్‌లను బ్రిడ్జ్ చేయడానికి అవసరమైన ఫంక్షన్‌లు మరియు నిర్వచనాలు ఉంటాయి.

```solidity
// SPDX-License-Identifier: MIT
```

[ఆప్టిమిజం యొక్క చాలా కోడ్ MIT లైసెన్సు క్రింద విడుదల చేయబడింది](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

ఈ రచన సమయంలో Solidity యొక్క తాజా వెర్షన్ 0.8.12.
వెర్షన్ 0.9.0 విడుదలయ్యే వరకు, ఈ కోడ్ దానికి అనుకూలంగా ఉందో లేదో మాకు తెలియదు.

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

ఆప్టిమిజం బ్రిడ్జ్ పరిభాషలో _deposit_ అంటే L1 నుండి L2కి బదిలీ, మరియు _withdrawal_ అంటే L2 నుండి L1కి బదిలీ.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

చాలా సందర్భాలలో L1లోని ERC-20 యొక్క చిరునామా L2లోని సమానమైన ERC-20 చిరునామాతో సమానంగా ఉండదు.
[మీరు టోకెన్ చిరునామాల జాబితాను ఇక్కడ చూడవచ్చు](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 ఉన్న చిరునామా L1 (మెయిన్‌నెట్) పై ఉంది మరియు `chainId` 10 ఉన్న చిరునామా L2 (ఆప్టిమిజం) పై ఉంది.
మిగిలిన రెండు `chainId` విలువలు కోవన్ టెస్ట్ నెట్‌వర్క్ (42) మరియు ఆప్టిమిస్టిక్ కోవన్ టెస్ట్ నెట్‌వర్క్ (69) కోసం ఉన్నాయి.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

బదిలీలకు గమనికలను జోడించడం సాధ్యమే, ఈ సందర్భంలో అవి వాటిని నివేదించే ఈవెంట్‌లకు జోడించబడతాయి.

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

అదే బ్రిడ్జ్ కాంట్రాక్ట్ రెండు దిశలలో బదిలీలను నిర్వహిస్తుంది.
L1 బ్రిడ్జ్ విషయంలో, దీని అర్థం డిపాజిట్‌లను ప్రారంభించడం మరియు విత్‌డ్రాయల్‌లను ఖరారు చేయడం.

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

ఈ ఫంక్షన్ నిజంగా అవసరం లేదు, ఎందుకంటే L2లో ఇది ముందుగా డిప్లాయ్ చేయబడిన కాంట్రాక్ట్, కాబట్టి ఇది ఎల్లప్పుడూ `0x4200000000000000000000000000000000000010` చిరునామాలో ఉంటుంది.
ఇది L2 బ్రిడ్జ్‌తో సౌష్టవం కోసం ఇక్కడ ఉంది, ఎందుకంటే L1 బ్రిడ్జ్ యొక్క చిరునామాను తెలుసుకోవడం చాలా సులభం కాదు.

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

`_l2Gas` పరామితి లావాదేవీ ఖర్చు చేయడానికి అనుమతించబడిన L2 గ్యాస్ మొత్తం.
[ఒక నిర్దిష్ట (అధిక) పరిమితి వరకు, ఇది ఉచితం](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), కాబట్టి ERC-20 కాంట్రాక్ట్ మింటింగ్ చేసేటప్పుడు నిజంగా వింతగా ఏమీ చేయకపోతే, అది ఒక సమస్య కాకూడదు.
ఈ ఫంక్షన్ ఒక వినియోగదారు వేరొక బ్లాక్‌చైన్‌లోని అదే చిరునామాకు ఆస్తులను బ్రిడ్జ్ చేసే సాధారణ దృశ్యాన్ని చూసుకుంటుంది.

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

ఈ ఫంక్షన్ దాదాపుగా `depositERC20`తో సమానంగా ఉంటుంది, కానీ ఇది వేరొక చిరునామాకు ERC-20ని పంపడానికి మిమ్మల్ని అనుమతిస్తుంది.

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

ఆప్టిమిజంలో విత్‌డ్రాయల్స్ (మరియు L2 నుండి L1కి ఇతర సందేశాలు) రెండు దశల ప్రక్రియ:

1. L2లో ఒక ప్రారంభ లావాదేవీ.
2. L1లో ఒక ఖరారు చేసే లేదా క్లెయిమ్ చేసే లావాదేవీ.
   L2 లావాదేవీ కోసం [ఫాల్ట్ ఛాలెంజ్ వ్యవధి](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) ముగిసిన తర్వాత ఈ లావాదేవీ జరగాలి.

### IL1StandardBridge {#il1standardbridge}

[ఈ ఇంటర్‌ఫేస్ ఇక్కడ నిర్వచించబడింది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
ఈ ఫైల్‌లో ETH కోసం ఈవెంట్ మరియు ఫంక్షన్ నిర్వచనాలు ఉన్నాయి.
ఈ నిర్వచనాలు పైన ERC-20 కోసం `IL1ERC20Bridge`లో నిర్వచించిన వాటికి చాలా పోలి ఉంటాయి.

కొన్ని ERC-20 టోకెన్‌లకు కస్టమ్ ప్రాసెసింగ్ అవసరం మరియు స్టాండర్డ్ బ్రిడ్జ్ ద్వారా నిర్వహించబడనందున బ్రిడ్జ్ ఇంటర్‌ఫేస్ రెండు ఫైల్‌ల మధ్య విభజించబడింది.
ఈ విధంగా అలాంటి టోకెన్‌ను నిర్వహించే కస్టమ్ బ్రిడ్జ్ `IL1ERC20Bridge`ని అమలు చేయగలదు మరియు ETHని కూడా బ్రిడ్జ్ చేయవలసిన అవసరం లేదు.

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

ఈ ఈవెంట్ ERC-20 వెర్షన్ (`ERC20DepositInitiated`)తో దాదాపు సమానంగా ఉంటుంది, L1 మరియు L2 టోకెన్ చిరునామాలు మినహా.
ఇతర ఈవెంట్‌లు మరియు ఫంక్షన్‌లకు కూడా ఇదే వర్తిస్తుంది.

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

[ఈ కాంట్రాక్ట్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) ఇతర లేయర్‌కు సందేశాలను పంపడానికి రెండు బ్రిడ్జ్‌ల ([L1](#the-l1-bridge-contract) మరియు [L2](#the-l2-bridge-contract)) ద్వారా వారసత్వంగా పొందబడుతుంది.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[ఈ ఇంటర్‌ఫేస్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) క్రాస్ డొమైన్ మెసెంజర్‌ను ఉపయోగించి ఇతర లేయర్‌కు సందేశాలను ఎలా పంపాలో కాంట్రాక్ట్‌కు చెబుతుంది.
ఈ క్రాస్ డొమైన్ మెసెంజర్ పూర్తిగా వేరే సిస్టమ్, మరియు దాని స్వంత వ్యాసం అవసరం, దీనిని నేను భవిష్యత్తులో వ్రాయాలని ఆశిస్తున్నాను.

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

కాంట్రాక్ట్‌కు తెలియాల్సిన ఒక పరామితి, ఈ లేయర్‌లోని క్రాస్ డొమైన్ మెసెంజర్ యొక్క చిరునామా.
ఈ పరామితి కన్‌స్ట్రక్టర్‌లో ఒక్కసారి సెట్ చేయబడుతుంది మరియు ఎప్పటికీ మారదు.

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

క్రాస్ డొమైన్ మెసేజింగ్ అది నడుస్తున్న బ్లాక్‌చైన్‌లోని (ఇథిరియం మెయిన్‌నెట్ లేదా ఆప్టిమిజం) ఏ కాంట్రాక్ట్ ద్వారానైనా యాక్సెస్ చేయబడుతుంది.
కానీ ప్రతి వైపు ఉన్న బ్రిడ్జ్ ఇతర వైపు ఉన్న బ్రిడ్జ్ నుండి వచ్చినట్లయితే _మాత్రమే_ కొన్ని సందేశాలను విశ్వసించాలి.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

తగిన క్రాస్ డొమైన్ మెసెంజర్ (`messenger`, మీరు క్రింద చూసినట్లుగా) నుండి వచ్చిన సందేశాలను మాత్రమే విశ్వసించవచ్చు.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

క్రాస్ డొమైన్ మెసెంజర్ ఇతర లేయర్‌తో సందేశాన్ని పంపిన చిరునామాను అందించే మార్గం [`.xDomainMessageSender()` ఫంక్షన్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
సందేశం ద్వారా ప్రారంభించబడిన లావాదేవీలో ఇది పిలవబడినంత కాలం ఇది ఈ సమాచారాన్ని అందించగలదు.

మాకు వచ్చిన సందేశం ఇతర బ్రిడ్జ్ నుండి వచ్చిందని మేము నిర్ధారించుకోవాలి.

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

ఈ ఫంక్షన్ క్రాస్ డొమైన్ మెసెంజర్‌ను తిరిగి ఇస్తుంది.
మేము `messenger` వేరియబుల్‌కు బదులుగా ఒక ఫంక్షన్‌ను ఉపయోగిస్తాము, దీని నుండి వారసత్వంగా వచ్చే కాంట్రాక్టులు ఏ క్రాస్ డొమైన్ మెసెంజర్‌ను ఉపయోగించాలో పేర్కొనడానికి ఒక అల్గారిథమ్‌ను ఉపయోగించడానికి అనుమతిస్తాయి.

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

చివరగా, ఇతర లేయర్‌కు సందేశాన్ని పంపే ఫంక్షన్.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) అనేది బలహీనతలు మరియు ఇతర సంభావ్య సమస్యల కోసం ప్రతి కాంట్రాక్ట్‌పై ఆప్టిమిజం నడిపే ఒక స్టాటిక్ అనలైజర్.
ఈ సందర్భంలో, కింది లైన్ రెండు బలహీనతలను ప్రేరేపిస్తుంది:

1. [రీఎంట్రాన్సీ ఈవెంట్‌లు](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [నిరపాయమైన రీఎంట్రాన్సీ](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

ఈ సందర్భంలో, `getCrossDomainMessenger()` ఒక విశ్వసనీయ చిరునామాను తిరిగి ఇస్తుందని మాకు తెలిసినప్పటికీ, Slitherకు అది తెలుసుకునే మార్గం లేనప్పటికీ, మేము రీఎంట్రాన్సీ గురించి ఆందోళన చెందము.

### L1 బ్రిడ్జ్ కాంట్రాక్ట్ {#the-l1-bridge-contract}

[ఈ కాంట్రాక్ట్ కోసం సోర్స్ కోడ్ ఇక్కడ ఉంది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

ఇంటర్‌ఫేస్‌లు ఇతర కాంట్రాక్టులలో భాగంగా ఉండవచ్చు, కాబట్టి అవి విస్తృత శ్రేణి Solidity వెర్షన్‌లకు మద్దతు ఇవ్వాలి.
కానీ బ్రిడ్జ్ అనేది మన కాంట్రాక్ట్, మరియు అది ఏ Solidity వెర్షన్‌ను ఉపయోగిస్తుందనే దానిపై మేము కఠినంగా ఉండవచ్చు.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) మరియు [IL1StandardBridge](#IL1StandardBridge) పైన వివరించబడ్డాయి.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[ఈ ఇంటర్‌ఫేస్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) L2లోని స్టాండర్డ్ బ్రిడ్జ్‌ను నియంత్రించడానికి సందేశాలను సృష్టించడానికి మాకు అనుమతిస్తుంది.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[ఈ ఇంటర్‌ఫేస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ERC-20 కాంట్రాక్టులను నియంత్రించడానికి మాకు అనుమతిస్తుంది.
[మీరు దాని గురించి ఇక్కడ మరింత చదవవచ్చు](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[పైన వివరించినట్లు](#crossdomainenabled), ఈ కాంట్రాక్ట్ ఇంటర్‌లేయర్ మెసేజింగ్ కోసం ఉపయోగించబడుతుంది.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) ఎల్లప్పుడూ ఒకే చిరునామాను కలిగి ఉండే L2 కాంట్రాక్టుల కోసం చిరునామాలను కలిగి ఉంటుంది. ఇందులో L2లోని స్టాండర్డ్ బ్రిడ్జ్ కూడా ఉంటుంది.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[ఓపెన్‌జెప్పెలిన్ యొక్క అడ్రస్ యుటిలిటీస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). ఇది కాంట్రాక్ట్ చిరునామాలు మరియు బాహ్యంగా యాజమాన్య ఖాతాలకు (EOA) చెందిన వాటి మధ్య తేడాను గుర్తించడానికి ఉపయోగించబడుతుంది.

గమనించండి, ఇది ఒక పరిపూర్ణ పరిష్కారం కాదు, ఎందుకంటే ప్రత్యక్ష కాల్స్ మరియు కాంట్రాక్ట్ కన్‌స్ట్రక్టర్ నుండి చేసిన కాల్స్ మధ్య తేడాను గుర్తించడానికి మార్గం లేదు, కానీ కనీసం ఇది కొన్ని సాధారణ వినియోగదారు లోపాలను గుర్తించడానికి మరియు నివారించడానికి మాకు అనుమతిస్తుంది.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 స్టాండర్డ్](https://eips.ethereum.org/EIPS/eip-20) వైఫల్యాన్ని నివేదించడానికి ఒక కాంట్రాక్ట్‌కు రెండు మార్గాలకు మద్దతు ఇస్తుంది:

1. తిరిగి వెళ్లు
2. `false`ని తిరిగి ఇవ్వండి

రెండు కేసులను నిర్వహించడం మా కోడ్‌ను మరింత క్లిష్టతరం చేస్తుంది, కాబట్టి బదులుగా మేము [ఓపెన్‌జెప్పెలిన్ యొక్క `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)ను ఉపయోగిస్తాము, ఇది [అన్ని వైఫల్యాలు తిరిగి వెళ్ళడానికి దారితీస్తాయని](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) నిర్ధారిస్తుంది.

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

మేము `IERC20` ఇంటర్‌ఫేస్‌ను ఉపయోగించిన ప్రతిసారీ `SafeERC20` రేపర్‌ను ఉపయోగించమని పేర్కొనడానికి ఈ లైన్ మార్గం.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) యొక్క చిరునామా.

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

ఇటువంటి డబుల్ [మ్యాపింగ్](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) మీరు [రెండు-డైమెన్షనల్ స్పార్స్ శ్రేణిని](https://en.wikipedia.org/wiki/Sparse_matrix) నిర్వచించే మార్గం.
ఈ డేటా స్ట్రక్చర్‌లోని విలువలు `deposit[L1 టోకెన్ addr][L2 టోకెన్ addr]`గా గుర్తించబడతాయి.
డిఫాల్ట్ విలువ సున్నా.
వేరొక విలువకు సెట్ చేయబడిన సెల్స్ మాత్రమే స్టోరేజ్‌కు వ్రాయబడతాయి.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

స్టోరేజ్‌లోని అన్ని వేరియబుల్స్‌ను కాపీ చేయకుండానే ఈ కాంట్రాక్ట్‌ను అప్‌గ్రేడ్ చేయగలగాలి.
అలా చేయడానికి, మేము [`ప్రాక్సీ`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)ని ఉపయోగిస్తాము, ఇది ప్రాక్సీ కాంట్రాక్ట్ ద్వారా నిల్వ చేయబడిన చిరునామా ఉన్న వేరొక కాంట్రాక్ట్‌కు కాల్స్‌ను బదిలీ చేయడానికి [`delegatecall`](https://solidity-by-example.org/delegatecall/)ని ఉపయోగించే ఒక కాంట్రాక్ట్ (మీరు అప్‌గ్రేడ్ చేసినప్పుడు మీరు ప్రాక్సీకి ఆ చిరునామాను మార్చమని చెబుతారు).
మీరు `delegatecall`ని ఉపయోగించినప్పుడు, స్టోరేజ్ _కాలింగ్_ కాంట్రాక్ట్ యొక్క స్టోరేజ్‌గానే ఉంటుంది, కాబట్టి అన్ని కాంట్రాక్ట్ స్టేట్ వేరియబుల్స్ యొక్క విలువలు ప్రభావితం కావు.

ఈ నమూనా యొక్క ఒక ప్రభావం ఏమిటంటే, `delegatecall` యొక్క _కాల్డ్_ అయిన కాంట్రాక్ట్ యొక్క స్టోరేజ్ ఉపయోగించబడదు మరియు అందువల్ల దానికి పంపిన కన్‌స్ట్రక్టర్ విలువలు పట్టింపు లేదు.
`CrossDomainEnabled` కన్‌స్ట్రక్టర్‌కు మేము ఒక అర్థరహిత విలువను అందించడానికి ఇదే కారణం.
కింది ఇనిషియలైజేషన్ కన్‌స్ట్రక్టర్ నుండి వేరుగా ఉండటానికి కూడా ఇదే కారణం.

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

ఈ [Slither టెస్ట్](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) కాంట్రాక్ట్ కోడ్ నుండి పిలవబడని మరియు అందువల్ల `public`కు బదులుగా `external`గా ప్రకటించగల ఫంక్షన్‌లను గుర్తిస్తుంది.
`external` ఫంక్షన్‌ల యొక్క గ్యాస్ ఖర్చు తక్కువగా ఉండవచ్చు, ఎందుకంటే వాటికి కాల్‌డేటాలో పరామితులు అందించబడవచ్చు.
`public`గా ప్రకటించబడిన ఫంక్షన్‌లు కాంట్రాక్ట్ లోపల నుండి యాక్సెస్ చేయగలవుగా ఉండాలి.
కాంట్రాక్టులు తమ సొంత కాల్‌డేటాను మార్చలేవు, కాబట్టి పరామితులు మెమరీలో ఉండాలి.
అటువంటి ఫంక్షన్‌ను బాహ్యంగా పిలిచినప్పుడు, కాల్‌డేటాను మెమరీకి కాపీ చేయడం అవసరం, దీనికి గ్యాస్ ఖర్చవుతుంది.
ఈ సందర్భంలో, ఫంక్షన్ ఒక్కసారి మాత్రమే పిలవబడుతుంది, కాబట్టి అసమర్థత మాకు పట్టింపు లేదు.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` ఫంక్షన్ ఒక్కసారి మాత్రమే పిలవబడాలి.
L1 క్రాస్ డొమైన్ మెసెంజర్ లేదా L2 టోకెన్ బ్రిడ్జ్ యొక్క చిరునామా మారితే, మేము కొత్త ప్రాక్సీని మరియు దానిని పిలిచే కొత్త బ్రిడ్జ్‌ను సృష్టిస్తాము.
మొత్తం సిస్టమ్ అప్‌గ్రేడ్ చేయబడినప్పుడు తప్ప ఇది జరగడం చాలా అరుదు.

గమనించండి, ఈ ఫంక్షన్‌లో _ఎవరు_ దీనిని పిలవగలరో పరిమితం చేసే ఏ యంత్రాంగం లేదు.
దీని అర్థం, సిద్ధాంతపరంగా ఒక దాడి చేసేవాడు మేము ప్రాక్సీని మరియు బ్రిడ్జ్ యొక్క మొదటి వెర్షన్‌ను డిప్లాయ్ చేసే వరకు వేచి ఉండి, ఆ తర్వాత చట్టబద్ధమైన వినియోగదారు చేసే ముందు `initialize` ఫంక్షన్‌ను చేరుకోవడానికి [ఫ్రంట్-రన్](https://solidity-by-example.org/hacks/front-running/) చేయగలడు. కానీ దీనిని నివారించడానికి రెండు పద్ధతులు ఉన్నాయి:

1. కాంట్రాక్టులు నేరుగా EOA ద్వారా కాకుండా [వాటిని సృష్టించడానికి మరొక కాంట్రాక్ట్ ఉన్న లావాదేవీలో](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) డిప్లాయ్ చేయబడితే, మొత్తం ప్రక్రియ పరమాణువుగా ఉంటుంది, మరియు ఏ ఇతర లావాదేవీ అమలు చేయబడకముందే పూర్తి అవుతుంది.
2. `initialize`కు చట్టబద్ధమైన కాల్ విఫలమైతే, కొత్తగా సృష్టించబడిన ప్రాక్సీ మరియు బ్రిడ్జ్‌ను విస్మరించి, కొత్త వాటిని సృష్టించడం ఎల్లప్పుడూ సాధ్యమే.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

బ్రిడ్జ్‌కు తెలియాల్సిన రెండు పరామితులు ఇవి.

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

ఓపెన్‌జెప్పెలిన్ యొక్క `Address` యుటిలిటీస్ మాకు అవసరం కావడానికి ఇదే కారణం.

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

ఈ ఫంక్షన్ పరీక్ష ప్రయోజనాల కోసం ఉంది.
గమనించండి, ఇది ఇంటర్‌ఫేస్ నిర్వచనాలలో కనిపించదు - ఇది సాధారణ ఉపయోగం కోసం కాదు.

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

ఈ రెండు ఫంక్షన్‌లు `_initiateETHDeposit` చుట్టూ రేపర్స్, ఇది వాస్తవ ETH డిపాజిట్‌ను నిర్వహించే ఫంక్షన్.

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

క్రాస్ డొమైన్ సందేశాలు పనిచేసే విధానం ఏమిటంటే, గమ్యస్థాన కాంట్రాక్ట్ దాని కాల్‌డేటాగా సందేశంతో పిలవబడుతుంది.
Solidity కాంట్రాక్టులు ఎల్లప్పుడూ తమ కాల్‌డేటాను
[ABI స్పెసిఫికేషన్‌లకు](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) అనుగుణంగా వివరిస్తాయి.
Solidity ఫంక్షన్ [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) ఆ కాల్‌డేటాను సృష్టిస్తుంది.

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

ఇక్కడి సందేశం ఈ పరామితులతో [`finalizeDeposit` ఫంక్షన్‌ను](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) పిలవడం:

| పరామితి                         | విలువ                                                                                    | అర్థం                                                                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_l1Token | చిరునామా(0)                                                           | L1లో ETH (ఇది ఒక ERC-20 టోకెన్ కాదు) కోసం ప్రత్యేక విలువ                                                                                        |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | ఆప్టిమిజంలో ETHని నిర్వహించే L2 కాంట్రాక్ట్, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (ఈ కాంట్రాక్ట్ అంతర్గత ఆప్టిమిజం ఉపయోగం కోసం మాత్రమే) |
| \_from    | \_from                                                             | ETHని పంపే L1లోని చిరునామా                                                                                                                                         |
| \_to      | \_to                                                               | ETHని స్వీకరించే L2లోని చిరునామా                                                                                                                                   |
| మొత్తం                          | msg.value                                                                | పంపిన wei మొత్తం (ఇది ఇప్పటికే బ్రిడ్జ్‌కు పంపబడింది)                                                                                           |
| \_data    | \_data                                                             | డిపాజిట్‌కు జోడించడానికి అదనపు డేటా                                                                                                                                |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

సందేశాన్ని క్రాస్ డొమైన్ మెసెంజర్ ద్వారా పంపండి.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

ఈ బదిలీ గురించి వినే ఏ వికేంద్రీకృత అప్లికేషన్‌కు తెలియజేయడానికి ఒక ఈవెంట్‌ను విడుదల చేయండి.

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

ఈ రెండు ఫంక్షన్‌లు `_initiateERC20Deposit` చుట్టూ రేపర్స్, ఇది వాస్తవ ERC-20 డిపాజిట్‌ను నిర్వహించే ఫంక్షన్.

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

ఈ ఫంక్షన్ పైన ఉన్న `_initiateETHDeposit`తో సమానంగా ఉంటుంది, కొన్ని ముఖ్యమైన తేడాలతో.
మొదటి తేడా ఏమిటంటే, ఈ ఫంక్షన్ టోకెన్ చిరునామాలను మరియు బదిలీ చేయాల్సిన మొత్తాన్ని పరామితులుగా స్వీకరిస్తుంది.
ETH విషయంలో, బ్రిడ్జ్‌కు కాల్ ఇప్పటికే బ్రిడ్జ్ ఖాతాకు ఆస్తి బదిలీని కలిగి ఉంటుంది (`msg.value`).

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 టోకెన్ బదిలీలు ETH నుండి భిన్నమైన ప్రక్రియను అనుసరిస్తాయి:

1. వినియోగదారు (`_from`) తగిన టోకెన్‌లను బదిలీ చేయడానికి బ్రిడ్జ్‌కు అనుమతి ఇస్తాడు.
2. వినియోగదారు టోకెన్ కాంట్రాక్ట్ చిరునామా, మొత్తం మొదలైన వాటితో బ్రిడ్జ్‌ను పిలుస్తాడు.
3. బ్రిడ్జ్ డిపాజిట్ ప్రక్రియలో భాగంగా టోకెన్‌లను (దానికి) బదిలీ చేస్తుంది.

మొదటి దశ చివరి రెండు నుండి వేరొక లావాదేవీలో జరగవచ్చు.
అయినప్పటికీ, ఫ్రంట్-రన్నింగ్ ఒక సమస్య కాదు ఎందుకంటే `_initiateERC20Deposit` (`depositERC20` మరియు `depositERC20To`) అని పిలిచే రెండు ఫంక్షన్‌లు ఈ ఫంక్షన్‌ను `msg.sender`ని `_from` పరామితిగా మాత్రమే పిలుస్తాయి.

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

డిపాజిట్ చేయబడిన టోకెన్ల మొత్తాన్ని `deposits` డేటా స్ట్రక్చర్‌కు జోడించండి.
అదే L1 ERC-20 టోకెన్‌కు సంబంధించిన అనేక చిరునామాలు L2లో ఉండవచ్చు, కాబట్టి డిపాజిట్‌లను ట్రాక్ చేయడానికి బ్రిడ్జ్ యొక్క L1 ERC-20 టోకెన్ బ్యాలెన్స్‌ను ఉపయోగించడం సరిపోదు.

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

L2 బ్రిడ్జ్ L2 క్రాస్ డొమైన్ మెసెంజర్‌కు సందేశాన్ని పంపుతుంది, ఇది L1 క్రాస్ డొమైన్ మెసెంజర్ ఈ ఫంక్షన్‌ను పిలవడానికి కారణమవుతుంది (వాస్తవానికి, [సందేశాన్ని ఖరారు చేసే లావాదేవీ](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1లో సమర్పించబడిన తర్వాత).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

ఇది క్రాస్ డొమైన్ మెసెంజర్ నుండి మరియు L2 టోకెన్ బ్రిడ్జ్ నుండి వచ్చిన ఒక _చట్టబద్ధమైన_ సందేశం అని నిర్ధారించుకోండి.
ఈ ఫంక్షన్ బ్రిడ్జ్ నుండి ETHని ఉపసంహరించుకోవడానికి ఉపయోగించబడుతుంది, కాబట్టి ఇది అధీకృత కాలర్ ద్వారా మాత్రమే పిలవబడుతుందని మేము నిర్ధారించుకోవాలి.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETHని బదిలీ చేయడానికి మార్గం `msg.value`లో wei మొత్తంతో గ్రహీతను పిలవడం.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

విత్‌డ్రాయల్ గురించి ఒక ఈవెంట్‌ను విడుదల చేయండి.

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

ఈ ఫంక్షన్ పైన ఉన్న `finalizeETHWithdrawal`తో సమానంగా ఉంటుంది, ERC-20 టోకెన్‌ల కోసం అవసరమైన మార్పులతో.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` డేటా స్ట్రక్చర్‌ను అప్‌డేట్ చేయండి.

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

బ్రిడ్జ్ యొక్క మునుపటి అమలు ఒకటి ఉండేది.
మేము ఆ అమలు నుండి దీనికి మారినప్పుడు, మేము అన్ని ఆస్తులను తరలించవలసి వచ్చింది.
ERC-20 టోకెన్‌లను కేవలం తరలించవచ్చు.
అయితే, ఒక కాంట్రాక్ట్‌కు ETHని బదిలీ చేయడానికి మీకు ఆ కాంట్రాక్ట్ ఆమోదం అవసరం, అదే `donateETH` మాకు అందిస్తుంది.

## L2లో ERC-20 టోకెన్లు {#erc-20-tokens-on-l2}

ఒక ERC-20 టోకెన్ స్టాండర్డ్ బ్రిడ్జ్‌కు సరిపోవాలంటే, అది స్టాండర్డ్ బ్రిడ్జ్‌కు, మరియు _మాత్రమే_ స్టాండర్డ్ బ్రిడ్జ్‌కు టోకెన్‌లను ముద్రించడానికి అనుమతించాలి.
ఆప్టిమిజంలో చలామణిలో ఉన్న టోకెన్ల సంఖ్య L1 బ్రిడ్జ్ కాంట్రాక్ట్‌లో లాక్ చేయబడిన టోకెన్ల సంఖ్యకు సమానంగా ఉందని బ్రిడ్జ్‌లు నిర్ధారించుకోవాలి కాబట్టి ఇది అవసరం.
L2లో ఎక్కువ టోకెన్లు ఉంటే, కొంతమంది వినియోగదారులు తమ ఆస్తులను తిరిగి L1కి బ్రిడ్జ్ చేయలేరు.
విశ్వసనీయమైన బ్రిడ్జ్‌కు బదులుగా, మేము తప్పనిసరిగా [ఫ్రాక్షనల్ రిజర్వ్ బ్యాంకింగ్‌ను](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) పునఃసృష్టిస్తాము.
L1లో ఎక్కువ టోకెన్లు ఉంటే, ఆ టోకెన్లలో కొన్ని బ్రిడ్జ్ కాంట్రాక్ట్‌లో శాశ్వతంగా లాక్ చేయబడి ఉంటాయి, ఎందుకంటే L2 టోకెన్‌లను బర్న్ చేయకుండా వాటిని విడుదల చేయడానికి మార్గం లేదు.

### IL2StandardERC20 {#il2standarderc20}

L2లో స్టాండర్డ్ బ్రిడ్జ్‌ను ఉపయోగించే ప్రతి ERC-20 టోకెన్ [ఈ ఇంటర్‌ఫేస్‌ను](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) అందించాలి, ఇందులో స్టాండర్డ్ బ్రిడ్జ్‌కు అవసరమైన ఫంక్షన్‌లు మరియు ఈవెంట్‌లు ఉంటాయి.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[స్టాండర్డ్ ERC-20 ఇంటర్‌ఫేస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)లో `mint` మరియు `burn` ఫంక్షన్‌లు ఉండవు.
ఆ పద్ధతులు [ERC-20 స్టాండర్డ్](https://eips.ethereum.org/EIPS/eip-20)చే అవసరం లేదు, ఇది టోకెన్‌లను సృష్టించడానికి మరియు నాశనం చేయడానికి యంత్రాంగాలను పేర్కొనలేదు.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 ఇంటర్‌ఫేస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) ఒక కాంట్రాక్ట్ ఏ ఫంక్షన్‌లను అందిస్తుందో పేర్కొనడానికి ఉపయోగించబడుతుంది.
[మీరు ఇక్కడ స్టాండర్డ్ చదవవచ్చు](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

ఈ ఫంక్షన్ ఈ కాంట్రాక్ట్‌కు బ్రిడ్జ్ చేయబడిన L1 టోకెన్ చిరునామాను అందిస్తుంది.
గమనించండి, వ్యతిరేక దిశలో మనకు సమానమైన ఫంక్షన్ లేదు.
L2 మద్దతు అది అమలు చేయబడినప్పుడు ప్రణాళిక చేయబడిందా లేదా అనే దానితో సంబంధం లేకుండా మేము ఏ L1 టోకెన్‌ను అయినా బ్రిడ్జ్ చేయగలగాలి.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

టోకెన్‌లను ముద్రించడానికి (సృష్టించడానికి) మరియు బర్న్ చేయడానికి (నాశనం చేయడానికి) ఫంక్షన్‌లు మరియు ఈవెంట్‌లు.
టోకెన్ల సంఖ్య సరైనదని (L1లో లాక్ చేయబడిన టోకెన్ల సంఖ్యకు సమానం) నిర్ధారించడానికి బ్రిడ్జ్ మాత్రమే ఈ ఫంక్షన్‌లను అమలు చేయగల ఏకైక సంస్థగా ఉండాలి.

### L2StandardERC20 {#L2StandardERC20}

[ఇది `IL2StandardERC20` ఇంటర్‌ఫేస్ యొక్క మా అమలు](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
మీకు ఏ రకమైన కస్టమ్ లాజిక్ అవసరం లేకపోతే, మీరు దీనిని ఉపయోగించాలి.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[ఓపెన్‌జెప్పెలిన్ ERC-20 కాంట్రాక్ట్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
ఆప్టిమిజం చక్రాన్ని తిరిగి ఆవిష్కరించడంలో నమ్మకం లేదు, ప్రత్యేకించి ఆ చక్రం బాగా ఆడిట్ చేయబడి, ఆస్తులను కలిగి ఉండేంత విశ్వసనీయంగా ఉండాల్సినప్పుడు.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

మాకు అవసరమైన మరియు సాధారణంగా ERC-20కి అవసరం లేని రెండు అదనపు కాన్ఫిగరేషన్ పరామితులు ఇవి.

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

మొదట మనం వారసత్వంగా వచ్చే కాంట్రాక్ట్ కోసం కన్‌స్ట్రక్టర్‌ను పిలిచి (`ERC20(_name, _symbol)`) ఆ తర్వాత మన సొంత వేరియబుల్స్‌ను సెట్ చేయాలి.

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

ఇది [ERC-165](https://eips.ethereum.org/EIPS/eip-165) పనిచేసే విధానం.
ప్రతి ఇంటర్‌ఫేస్ అనేక మద్దతు ఉన్న ఫంక్షన్‌లను కలిగి ఉంటుంది, మరియు ఆ ఫంక్షన్‌ల యొక్క [ABI ఫంక్షన్ సెలెక్టర్ల](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) యొక్క [ఎక్స్‌క్లూజివ్ లేదా](https://en.wikipedia.org/wiki/Exclusive_or)గా గుర్తించబడుతుంది.

L2 బ్రిడ్జ్ అది ఆస్తులను పంపే ERC-20 కాంట్రాక్ట్ ఒక `IL2StandardERC20` అని నిర్ధారించుకోవడానికి ERC-165ని ఒక శానిటీ చెక్‌గా ఉపయోగిస్తుంది.

**గమనిక:** `supportsInterface`కు తప్పుడు సమాధానాలు ఇవ్వకుండా రోగ్ కాంట్రాక్ట్‌లను నిరోధించడానికి ఏమీ లేదు, కాబట్టి ఇది ఒక శానిటీ చెక్ మెకానిజం, _కాదు_ ఒక భద్రతా మెకానిజం.

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

L2 బ్రిడ్జ్ మాత్రమే ఆస్తులను ముద్రించడానికి మరియు బర్న్ చేయడానికి అనుమతించబడుతుంది.

`_mint` మరియు `_burn` వాస్తవానికి [ఓపెన్‌జెప్పెలిన్ ERC-20 కాంట్రాక్ట్‌లో](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) నిర్వచించబడ్డాయి.
ఆ కాంట్రాక్ట్ వాటిని బాహ్యంగా బహిర్గతం చేయదు, ఎందుకంటే టోకెన్‌లను ముద్రించడానికి మరియు బర్న్ చేయడానికి పరిస్థితులు ERC-20ని ఉపయోగించే మార్గాల సంఖ్యంత వైవిధ్యంగా ఉంటాయి.

## L2 బ్రిడ్జ్ కోడ్ {#l2-bridge-code}

ఇది ఆప్టిమిజంలో బ్రిడ్జ్‌ను నడిపే కోడ్.
[ఈ కాంట్రాక్ట్ కోసం సోర్స్ ఇక్కడ ఉంది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ఇంటర్‌ఫేస్ పైన మనం చూసిన [L1 సమానమైన](#IL1ERC20Bridge)దానికి చాలా పోలి ఉంటుంది.
రెండు ముఖ్యమైన తేడాలు ఉన్నాయి:

1. L1లో మీరు డిపాజిట్‌లను ప్రారంభిస్తారు మరియు విత్‌డ్రాయల్స్‌ను ఖరారు చేస్తారు.
   ఇక్కడ మీరు విత్‌డ్రాయల్స్‌ను ప్రారంభిస్తారు మరియు డిపాజిట్‌లను ఖరారు చేస్తారు.
2. L1లో ETH మరియు ERC-20 టోకెన్ల మధ్య తేడాను గుర్తించడం అవసరం.
   L2లో మేము రెండింటికీ ఒకే ఫంక్షన్‌లను ఉపయోగించవచ్చు, ఎందుకంటే ఆప్టిమిజంలో అంతర్గతంగా ETH బ్యాలెన్స్‌లు [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) చిరునామాతో ERC-20 టోకెన్‌గా నిర్వహించబడతాయి.

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

L1 బ్రిడ్జ్ చిరునామాను ట్రాక్ చేయండి.
L1 సమానమైన దానికి విరుద్ధంగా, ఇక్కడ మాకు ఈ వేరియబుల్ _అవసరం_ అని గమనించండి.
L1 బ్రిడ్జ్ చిరునామా ముందుగానే తెలియదు.

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

ఈ రెండు ఫంక్షన్‌లు విత్‌డ్రాయల్స్‌ను ప్రారంభిస్తాయి.
L1 టోకెన్ చిరునామాను పేర్కొనవలసిన అవసరం లేదని గమనించండి.
L2 టోకెన్లు మాకు L1 సమానమైన చిరునామాను చెబుతాయని ఆశించబడుతుంది.

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

గమనించండి, మేము `_from` పరామితిపై ఆధారపడటం లేదు కానీ `msg.sender`పై ఆధారపడుతున్నాము, ఇది నకిలీ చేయడం చాలా కష్టం (నాకు తెలిసినంతవరకు అసాధ్యం).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1లో ETH మరియు ERC-20 మధ్య తేడాను గుర్తించడం అవసరం.

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

ఈ ఫంక్షన్ `L1StandardBridge` ద్వారా పిలవబడుతుంది.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

సందేశం యొక్క మూలం చట్టబద్ధమైనదని నిర్ధారించుకోండి.
ఇది ముఖ్యం ఎందుకంటే ఈ ఫంక్షన్ `_mint`ను పిలుస్తుంది మరియు L1లో బ్రిడ్జ్ యాజమాన్యంలోని టోకెన్ల ద్వారా కవర్ చేయబడని టోకెన్లను ఇవ్వడానికి ఉపయోగించబడుతుంది.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

శానిటీ చెక్స్:

1. సరైన ఇంటర్‌ఫేస్‌కు మద్దతు ఉంది
2. L2 ERC-20 కాంట్రాక్ట్ యొక్క L1 చిరునామా టోకెన్ల L1 మూలంతో సరిపోలుతుంది

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

శానిటీ చెక్స్ పాస్ అయితే, డిపాజిట్‌ను ఖరారు చేయండి:

1. టోకెన్లను ముద్రించండి
2. తగిన ఈవెంట్‌ను విడుదల చేయండి

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

ఒక వినియోగదారు తప్పు L2 టోకెన్ చిరునామాను ఉపయోగించడం ద్వారా గుర్తించగల లోపాన్ని చేస్తే, మేము డిపాజిట్‌ను రద్దు చేసి, L1లో టోకెన్లను తిరిగి ఇవ్వాలనుకుంటున్నాము.
L2 నుండి మేము దీనిని చేయగల ఏకైక మార్గం ఫాల్ట్ ఛాలెంజ్ వ్యవధి కోసం వేచి ఉండవలసిన సందేశాన్ని పంపడం, కానీ అది వినియోగదారుకు టోకెన్లను శాశ్వతంగా కోల్పోవడం కంటే చాలా మంచిది.

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

## ముగింపు {#conclusion}

ఆస్తి బదిలీల కోసం స్టాండర్డ్ బ్రిడ్జ్ అత్యంత అనువైన యంత్రాంగం.
అయితే, ఇది చాలా సాధారణమైనది కాబట్టి, ఇది ఎల్లప్పుడూ ఉపయోగించడానికి సులభమైన యంత్రాంగం కాదు.
ముఖ్యంగా విత్‌డ్రాయల్స్ కోసం, చాలా మంది వినియోగదారులు ఛాలెంజ్ వ్యవధి కోసం వేచి ఉండని మరియు విత్‌డ్రాయల్‌ను ఖరారు చేయడానికి మెర్కిల్ ప్రూఫ్ అవసరం లేని [థర్డ్ పార్టీ బ్రిడ్జ్‌లను](https://optimism.io/apps#bridge) ఉపయోగించడానికి ఇష్టపడతారు.

ఈ బ్రిడ్జ్‌లు సాధారణంగా L1లో ఆస్తులను కలిగి ఉండటం ద్వారా పనిచేస్తాయి, అవి తక్షణమే చిన్న రుసుముకు అందిస్తాయి (తరచుగా స్టాండర్డ్ బ్రిడ్జ్ విత్‌డ్రాయల్ కోసం గ్యాస్ ఖర్చు కంటే తక్కువ).
బ్రిడ్జ్ (లేదా దానిని నడుపుతున్న వ్యక్తులు) L1 ఆస్తుల కొరతను ఊహించినప్పుడు, అది L2 నుండి తగినన్ని ఆస్తులను బదిలీ చేస్తుంది. ఇవి చాలా పెద్ద విత్‌డ్రాయల్స్ కాబట్టి, విత్‌డ్రాయల్ ఖర్చు పెద్ద మొత్తంపై రుణ విమోచన చేయబడుతుంది మరియు చాలా తక్కువ శాతంగా ఉంటుంది.

ఈ వ్యాసం లేయర్ 2 ఎలా పనిచేస్తుందో, మరియు స్పష్టంగా మరియు సురక్షితంగా ఉండే Solidity కోడ్‌ను ఎలా వ్రాయాలో మరింత అర్థం చేసుకోవడానికి మీకు సహాయపడిందని ఆశిస్తున్నాము.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
