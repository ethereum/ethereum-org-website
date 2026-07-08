---
title: "Optimism ప్రామాణిక వారధి కాంట్రాక్ట్ వాక్‌త్రూ"
description: "Optimism కోసం ప్రామాణిక వారధి ఎలా పనిచేస్తుంది? ఇది ఈ విధంగా ఎందుకు పనిచేస్తుంది?"
author: "ఓరి పోమెరాంట్జ్"
tags: ["Solidity", "వారధి", "లేయర్ 2 (l2)"]
skill: intermediate
breadcrumb: "Optimism వారధి"
published: 2022-03-30
lang: te
---

[Optimism](https://www.optimism.io/) అనేది ఒక [ఆశావాద రోలప్](/developers/docs/scaling/optimistic-rollups/).
ఆశావాద రోల్అప్‌లు ఎథీరియం మెయిన్‌నెట్ (దీనిని లేయర్ 1 (l1) అని కూడా పిలుస్తారు) కంటే చాలా తక్కువ ధరకు లావాదేవీలను ప్రాసెస్ చేయగలవు, ఎందుకంటే నెట్‌వర్క్‌లోని ప్రతి నోడ్‌కు బదులుగా లావాదేవీలు కొన్ని నోడ్‌ల ద్వారా మాత్రమే ప్రాసెస్ చేయబడతాయి.
అదే సమయంలో, డేటా అంతా l1కి వ్రాయబడుతుంది, కాబట్టి మెయిన్‌నెట్ యొక్క అన్ని సమగ్రత మరియు లభ్యత హామీలతో ప్రతిదీ నిరూపించబడుతుంది మరియు పునర్నిర్మించబడుతుంది.

Optimism (లేదా ఏదైనా ఇతర l2)లో l1 ఆస్తులను ఉపయోగించడానికి, ఆస్తులను [వారధి](/bridges/#prerequisites) ద్వారా పంపాలి.
దీన్ని సాధించడానికి ఒక మార్గం ఏమిటంటే, వినియోగదారులు l1లో ఆస్తులను (ETH మరియు [ERC-20 టోకెన్‌లు](/developers/docs/standards/tokens/erc-20/) అత్యంత సాధారణమైనవి) లాక్ చేయడం మరియు l2లో ఉపయోగించడానికి సమానమైన ఆస్తులను స్వీకరించడం.
చివరికి, వాటిని కలిగి ఉన్నవారు వాటిని తిరిగి l1కి వారధి ద్వారా పంపాలనుకోవచ్చు.
ఇలా చేస్తున్నప్పుడు, ఆస్తులు l2లో దహనం చేయబడతాయి మరియు ఆ తర్వాత l1లో వినియోగదారుకు తిరిగి విడుదల చేయబడతాయి.

[Optimism ప్రామాణిక వారధి](https://docs.optimism.io/app-developers/bridging/standard-bridge) ఈ విధంగానే పనిచేస్తుంది.
ఈ కథనంలో, ఆ వారధి ఎలా పనిచేస్తుందో చూడటానికి దాని సోర్స్ కోడ్‌ను పరిశీలిస్తాము మరియు బాగా వ్రాయబడిన Solidity కోడ్‌కు ఉదాహరణగా దానిని అధ్యయనం చేస్తాము.

## నియంత్రణ ప్రవాహాలు {#control-flows}

వారధికి రెండు ప్రధాన ప్రవాహాలు ఉన్నాయి:

- డిపాజిట్ (l1 నుండి l2కి)
- ఉపసంహరణ (l2 నుండి l1కి)

### డిపాజిట్ ప్రవాహం {#deposit-flow}

#### లేయర్ 1 (l1) {#deposit-flow-layer-1}

1. ERC-20ని డిపాజిట్ చేస్తుంటే, డిపాజిట్ చేసేవారు డిపాజిట్ చేయబడుతున్న మొత్తాన్ని ఖర్చు చేయడానికి వారధికి అనుమతి మొత్తం ఇస్తారు
2. డిపాజిట్ చేసేవారు l1 వారధిని పిలుస్తారు (`depositERC20`, `depositERC20To`, `depositETH`, లేదా `depositETHTo`)
3. l1 వారధి వారధి చేయబడిన ఆస్తిని స్వాధీనం చేసుకుంటుంది
   - ETH: కాల్‌లో భాగంగా డిపాజిట్ చేసేవారి ద్వారా ఆస్తి బదిలీ చేయబడుతుంది
   - ERC-20: డిపాజిట్ చేసేవారు అందించిన అనుమతి మొత్తం ఉపయోగించి వారధి ఆస్తిని తనకు తానుగా బదిలీ చేసుకుంటుంది
4. l1 వారధి l2 వారధిపై `finalizeDeposit`ని పిలవడానికి క్రాస్-డొమైన్ సందేశం యంత్రాంగాన్ని ఉపయోగిస్తుంది

#### లేయర్ 2 (l2) {#deposit-flow-layer-2}

5. l2 వారధి `finalizeDeposit`కి కాల్ చట్టబద్ధమైనదో లేదో ధృవీకరిస్తుంది:
   - క్రాస్ డొమైన్ సందేశం కాంట్రాక్ట్ నుండి వచ్చింది
   - వాస్తవానికి l1లోని వారధి నుండి వచ్చింది
6. l2లోని ERC-20 టోకెన్ కాంట్రాక్ట్ సరైనదో కాదో l2 వారధి తనిఖీ చేస్తుంది:
   - l2 కాంట్రాక్ట్ దాని l1 కౌంటర్‌పార్ట్ l1లో టోకెన్‌లు వచ్చిన దానితో సమానంగా ఉందని నివేదిస్తుంది
   - l2 కాంట్రాక్ట్ సరైన ఇంటర్‌ఫేస్‌కు మద్దతు ఇస్తుందని నివేదిస్తుంది ([ERC-165ని ఉపయోగించి](https://eips.ethereum.org/EIPS/eip-165)).
7. l2 కాంట్రాక్ట్ సరైనదైతే, తగిన చిరునామాకు తగిన సంఖ్యలో టోకెన్‌లను ముద్రించడానికి దాన్ని పిలవండి. కాకపోతే, l1లో టోకెన్‌లను క్లెయిమ్ చేయడానికి వినియోగదారుని అనుమతించడానికి ఉపసంహరణ ప్రక్రియను ప్రారంభించండి.

### ఉపసంహరణ ప్రవాహం {#withdrawal-flow}

#### లేయర్ 2 (l2) {#withdrawal-flow-layer-2}

1. ఉపసంహరించుకునేవారు l2 వారధిని పిలుస్తారు (`withdraw` లేదా `withdrawTo`)
2. l2 వారధి `msg.sender`కి చెందిన తగిన సంఖ్యలో టోకెన్‌లను దహనం చేస్తుంది
3. l2 వారధి l1 వారధిపై `finalizeETHWithdrawal` లేదా `finalizeERC20Withdrawal`ని పిలవడానికి క్రాస్-డొమైన్ సందేశం యంత్రాంగాన్ని ఉపయోగిస్తుంది

#### లేయర్ 1 (l1) {#withdrawal-flow-layer-1}

4. l1 వారధి `finalizeETHWithdrawal` లేదా `finalizeERC20Withdrawal`కి కాల్ చట్టబద్ధమైనదో లేదో ధృవీకరిస్తుంది:
   - క్రాస్ డొమైన్ సందేశం యంత్రాంగం నుండి వచ్చింది
   - వాస్తవానికి l2లోని వారధి నుండి వచ్చింది
5. l1 వారధి తగిన ఆస్తిని (ETH లేదా ERC-20) తగిన చిరునామాకు బదిలీ చేస్తుంది

## లేయర్ 1 (l1) కోడ్ {#layer-1-code}

ఇది l1, ఎథీరియం మెయిన్‌నెట్‌లో రన్ అయ్యే కోడ్.

### IL1ERC20Bridge {#il1erc20bridge}

[ఈ ఇంటర్‌ఫేస్ ఇక్కడ నిర్వచించబడింది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
ఇది ERC-20 టోకెన్‌లను వారధి చేయడానికి అవసరమైన ఫంక్షన్‌లు మరియు నిర్వచనాలను కలిగి ఉంటుంది.

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism యొక్క చాలా కోడ్ MIT లైసెన్స్ క్రింద విడుదల చేయబడింది](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

ఇది వ్రాసే సమయానికి Solidity యొక్క తాజా వెర్షన్ 0.8.12.
వెర్షన్ 0.9.0 విడుదలయ్యే వరకు, ఈ కోడ్ దానికి అనుకూలంగా ఉందో లేదో మాకు తెలియదు.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * ఈవెంట్‌లు *
     **********/

    event ERC20DepositInitiated(
```

Optimism వారధి పరిభాషలో _డిపాజిట్_ అంటే l1 నుండి l2కి బదిలీ చేయడం మరియు _ఉపసంహరణ_ అంటే l2 నుండి l1కి బదిలీ చేయడం.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

చాలా సందర్భాలలో l1లోని ERC-20 చిరునామా l2లోని సమానమైన ERC-20 చిరునామాతో సమానంగా ఉండదు.
[మీరు టోకెన్ చిరునామాల జాబితాను ఇక్కడ చూడవచ్చు](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1 ఉన్న చిరునామా l1 (మెయిన్‌నెట్)లో ఉంది మరియు `chainId` 10 ఉన్న చిరునామా l2 (Optimism)లో ఉంది.
మిగిలిన రెండు `chainId` విలువలు Kovan టెస్ట్ నెట్‌వర్క్ (42) మరియు Optimistic Kovan టెస్ట్ నెట్‌వర్క్ (69) కోసం ఉన్నాయి.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

బదిలీలకు గమనికలను జోడించడం సాధ్యమవుతుంది, ఆ సందర్భంలో అవి వాటిని నివేదించే ఈవెంట్‌లకు జోడించబడతాయి.

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

అదే వారధి కాంట్రాక్ట్ రెండు దిశలలో బదిలీలను నిర్వహిస్తుంది.
l1 వారధి విషయంలో, దీని అర్థం డిపాజిట్ల ప్రారంభం మరియు ఉపసంహరణల ముగింపు.

```solidity

    /********************
     * పబ్లిక్ ఫంక్షన్‌లు *
     ********************/

    /**
     * @dev సంబంధిత లేయర్ 2 (l2) వారధి కాంట్రాక్ట్ యొక్క చిరునామాను పొందండి.
     * @return సంబంధిత లేయర్ 2 (l2) వారధి కాంట్రాక్ట్ యొక్క చిరునామా.
     */
    function l2TokenBridge() external returns (address);
```

ఈ ఫంక్షన్ నిజంగా అవసరం లేదు, ఎందుకంటే l2లో ఇది ముందుగా డిప్లాయ్ చేయబడిన కాంట్రాక్ట్, కాబట్టి ఇది ఎల్లప్పుడూ `0x4200000000000000000000000000000000000010` చిరునామాలో ఉంటుంది.
ఇది l2 వారధితో సమరూపత కోసం ఇక్కడ ఉంది, ఎందుకంటే l1 వారధి చిరునామా తెలుసుకోవడం అంత సులభం _కాదు_.

```solidity
    /**
     * @dev లేయర్ 2 (l2) లోని కాలర్ బ్యాలెన్స్‌కు కొంత ERC-20 ని డిపాజిట్ చేయండి.
     * @param _l1Token మనం డిపాజిట్ చేస్తున్న లేయర్ 1 (l1) ERC-20 యొక్క చిరునామా
     * @param _l2Token లేయర్ 1 (l1) కి సంబంధించిన లేయర్ 2 (l2) ERC-20 యొక్క చిరునామా
     * @param _amount డిపాజిట్ చేయాల్సిన ERC-20 మొత్తం
     * @param _l2Gas లేయర్ 2 (l2) లో డిపాజిట్‌ను పూర్తి చేయడానికి అవసరమైన గ్యాస్ పరిమితి.
     * @param _data లేయర్ 2 (l2) కి ఫార్వార్డ్ చేయడానికి ఐచ్ఛిక డేటా. ఈ డేటా బాహ్య కాంట్రాక్ట్ లకు
     *        కేవలం సౌలభ్యం కోసం అందించబడింది. గరిష్ట పొడవును అమలు చేయడం మినహా,
     *        ఈ కాంట్రాక్ట్ లు దాని కంటెంట్ గురించి ఎలాంటి హామీలను అందించవు.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` పరామితి అనేది లావాదేవీ ఖర్చు చేయడానికి అనుమతించబడిన l2 గ్యాస్ మొత్తం.
[ఒక నిర్దిష్ట (అధిక) పరిమితి వరకు, ఇది ఉచితం](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), కాబట్టి ERC-20 కాంట్రాక్ట్ ముద్రించేటప్పుడు నిజంగా వింతగా ఏదైనా చేస్తే తప్ప, ఇది సమస్య కాకూడదు.
వినియోగదారు వేరొక బ్లాక్‌చైన్‌లోని అదే చిరునామాకు ఆస్తులను వారధి ద్వారా పంపే సాధారణ దృష్టాంతాన్ని ఈ ఫంక్షన్ చూసుకుంటుంది.

```solidity
    /**
     * @dev లేయర్ 2 (l2) లోని గ్రహీత బ్యాలెన్స్‌కు కొంత ERC-20 ని డిపాజిట్ చేయండి.
     * @param _l1Token మనం డిపాజిట్ చేస్తున్న లేయర్ 1 (l1) ERC-20 యొక్క చిరునామా
     * @param _l2Token లేయర్ 1 (l1) కి సంబంధించిన లేయర్ 2 (l2) ERC-20 యొక్క చిరునామా
     * @param _to ఉపసంహరణను క్రెడిట్ చేయడానికి లేయర్ 2 (l2) చిరునామా.
     * @param _amount డిపాజిట్ చేయాల్సిన ERC-20 మొత్తం.
     * @param _l2Gas లేయర్ 2 (l2) లో డిపాజిట్‌ను పూర్తి చేయడానికి అవసరమైన గ్యాస్ పరిమితి.
     * @param _data లేయర్ 2 (l2) కి ఫార్వార్డ్ చేయడానికి ఐచ్ఛిక డేటా. ఈ డేటా బాహ్య కాంట్రాక్ట్ లకు
     *        కేవలం సౌలభ్యం కోసం అందించబడింది. గరిష్ట పొడవును అమలు చేయడం మినహా,
     *        ఈ కాంట్రాక్ట్ లు దాని కంటెంట్ గురించి ఎలాంటి హామీలను అందించవు.
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

ఈ ఫంక్షన్ దాదాపు `depositERC20` వలె ఉంటుంది, కానీ ఇది ERC-20ని వేరే చిరునామాకు పంపడానికి మిమ్మల్ని అనుమతిస్తుంది.

```solidity
    /*************************
     * క్రాస్-చైన్ ఫంక్షన్‌లు *
     *************************/

    /**
     * @dev లేయర్ 2 (l2) నుండి లేయర్ 1 (l1) కి ఉపసంహరణను పూర్తి చేయండి మరియు గ్రహీత యొక్క
     * లేయర్ 1 (l1) ERC-20 టోకెన్ బ్యాలెన్స్‌కు నిధులను క్రెడిట్ చేయండి.
     * లేయర్ 2 (l2) నుండి ప్రారంభించబడిన ఉపసంహరణ ఖరారు కాకపోతే ఈ కాల్ విఫలమవుతుంది.
     *
     * @param _l1Token finalizeWithdrawal కోసం లేయర్ 1 (l1) టోకెన్ యొక్క చిరునామా.
     * @param _l2Token ఉపసంహరణ ప్రారంభించబడిన లేయర్ 2 (l2) టోకెన్ యొక్క చిరునామా.
     * @param _from బదిలీని ప్రారంభించే లేయర్ 2 (l2) చిరునామా.
     * @param _to ఉపసంహరణను క్రెడిట్ చేయడానికి లేయర్ 1 (l1) చిరునామా.
     * @param _amount డిపాజిట్ చేయాల్సిన ERC-20 మొత్తం.
     * @param _data లేయర్ 2 (l2) లో పంపినవారు అందించిన డేటా. ఈ డేటా బాహ్య కాంట్రాక్ట్ లకు
     *   కేవలం సౌలభ్యం కోసం అందించబడింది. గరిష్ట పొడవును అమలు చేయడం మినహా,
     *   ఈ కాంట్రాక్ట్ లు దాని కంటెంట్ గురించి ఎలాంటి హామీలను అందించవు.
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

Optimismలో ఉపసంహరణలు (మరియు l2 నుండి l1కి ఇతర సందేశాలు) రెండు దశల ప్రక్రియ:

1. l2లో ప్రారంభ లావాదేవీ.
2. l1లో ముగించే లేదా క్లెయిమ్ చేసే లావాదేవీ.
   l2 లావాదేవీకి సంబంధించిన [ఫాల్ట్ ఛాలెంజ్ వ్యవధి](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) ముగిసిన తర్వాత ఈ లావాదేవీ జరగాలి.

### IL1StandardBridge {#il1standardbridge}

[ఈ ఇంటర్‌ఫేస్ ఇక్కడ నిర్వచించబడింది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
ఈ ఫైల్ ETH కోసం ఈవెంట్ మరియు ఫంక్షన్ నిర్వచనాలను కలిగి ఉంది.
ఈ నిర్వచనాలు ERC-20 కోసం పైన `IL1ERC20Bridge`లో నిర్వచించిన వాటికి చాలా పోలి ఉంటాయి.

కొన్ని ERC-20 టోకెన్‌లకు అనుకూల ప్రాసెసింగ్ అవసరం మరియు ప్రామాణిక వారధి ద్వారా నిర్వహించబడవు కాబట్టి వారధి ఇంటర్‌ఫేస్ రెండు ఫైల్‌ల మధ్య విభజించబడింది.
ఈ విధంగా అటువంటి టోకెన్‌ను నిర్వహించే అనుకూల వారధి `IL1ERC20Bridge`ని అమలు చేయగలదు మరియు ETHని కూడా వారధి చేయాల్సిన అవసరం లేదు.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * ఈవెంట్‌లు *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

ఈ ఈవెంట్ l1 మరియు l2 టోకెన్ చిరునామాలు లేకుండా మినహా, ERC-20 వెర్షన్ (`ERC20DepositInitiated`)కి దాదాపు సమానంగా ఉంటుంది.
ఇతర ఈవెంట్‌లు మరియు ఫంక్షన్‌లకు కూడా ఇదే వర్తిస్తుంది.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * పబ్లిక్ ఫంక్షన్‌లు *
     ********************/

    /**
     * @dev లేయర్ 2 (l2) లోని కాలర్ బ్యాలెన్స్‌కు కొంత ETH ని డిపాజిట్ చేయండి.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev లేయర్ 2 (l2) లోని గ్రహీత బ్యాలెన్స్‌కు కొంత ETH ని డిపాజిట్ చేయండి.
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
     * క్రాస్-చైన్ ఫంక్షన్‌లు *
     *************************/

    /**
     * @dev లేయర్ 2 (l2) నుండి లేయర్ 1 (l1) కి ఉపసంహరణను పూర్తి చేయండి మరియు గ్రహీత యొక్క
     * లేయర్ 1 (l1) ETH టోకెన్ బ్యాలెన్స్‌కు నిధులను క్రెడిట్ చేయండి. xDomainMessenger మాత్రమే ఈ ఫంక్షన్‌ను కాల్ చేయగలదు కాబట్టి, ఉపసంహరణ ఖరారు కావడానికి ముందు ఇది ఎప్పటికీ కాల్ చేయబడదు.
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

ఇతర లేయర్‌కు సందేశాలను పంపడానికి [ఈ కాంట్రాక్ట్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) రెండు వారధుల ([l1](#the-l1-bridge-contract) మరియు [l2](#l2-bridge-code)) ద్వారా వారసత్వంగా పొందబడుతుంది.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* ఇంటర్‌ఫేస్ దిగుమతులు */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[ఈ ఇంటర్‌ఫేస్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) క్రాస్ డొమైన్ మెసెంజర్‌ని ఉపయోగించి ఇతర లేయర్‌కు సందేశాలను ఎలా పంపాలో కాంట్రాక్ట్‌కు చెబుతుంది.
ఈ క్రాస్ డొమైన్ మెసెంజర్ అనేది పూర్తిగా మరొక సిస్టమ్, మరియు దీనికి దాని స్వంత కథనం అవసరం, భవిష్యత్తులో నేను దానిని వ్రాయాలని ఆశిస్తున్నాను.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev క్రాస్-డొమైన్ కమ్యూనికేషన్‌లను నిర్వహించే కాంట్రాక్ట్ ల కోసం సహాయక కాంట్రాక్ట్
 *
 * ఉపయోగించిన కంపైలర్: వారసత్వంగా పొందిన కాంట్రాక్ట్ ద్వారా నిర్వచించబడింది
 */
contract CrossDomainEnabled {
    /*************
     * వేరియబుల్స్ *
     *************/

    // ఇతర డొమైన్ నుండి సందేశం పంపడానికి మరియు స్వీకరించడానికి ఉపయోగించే మెసెంజర్ కాంట్రాక్ట్.
    address public messenger;

    /***************
     * కన్స్ట్రక్టర్ *
     ***************/

    /**
     * @param _messenger ప్రస్తుత లేయర్‌లోని CrossDomainMessenger యొక్క చిరునామా.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

కాంట్రాక్ట్ తెలుసుకోవలసిన ఒక పరామితి, ఈ లేయర్‌లోని క్రాస్ డొమైన్ మెసెంజర్ చిరునామా.
ఈ పరామితి కన్స్ట్రక్టర్‌లో ఒకసారి సెట్ చేయబడుతుంది మరియు ఎప్పటికీ మారదు.

```solidity

    /**********************
     * ఫంక్షన్ మాడిఫైయర్‌లు *
     **********************/

    /**
     * సవరించిన ఫంక్షన్‌ను నిర్దిష్ట క్రాస్-డొమైన్ ఖాతా ద్వారా మాత్రమే కాల్ చేయవచ్చని అమలు చేస్తుంది.
     * @param _sourceDomainAccount ఈ ఫంక్షన్‌ను కాల్ చేయడానికి ప్రామాణీకరించబడిన
     *  మూల డొమైన్‌లోని ఏకైక ఖాతా.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

క్రాస్ డొమైన్ సందేశం అది రన్ అవుతున్న బ్లాక్‌చైన్‌లోని (ఎథీరియం మెయిన్‌నెట్ లేదా Optimism) ఏదైనా కాంట్రాక్ట్ ద్వారా యాక్సెస్ చేయబడుతుంది.
కానీ ప్రతి వైపు ఉన్న వారధి ఇతర వైపు ఉన్న వారధి నుండి వస్తే _మాత్రమే_ నిర్దిష్ట సందేశాలను విశ్వసించేలా మనకు అవసరం.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

తగిన క్రాస్ డొమైన్ మెసెంజర్ (`messenger`, మీరు క్రింద చూసినట్లుగా) నుండి వచ్చే సందేశాలను మాత్రమే విశ్వసించవచ్చు.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

క్రాస్ డొమైన్ మెసెంజర్ ఇతర లేయర్‌తో సందేశాన్ని పంపిన చిరునామాను అందించే విధానం [`.xDomainMessageSender()` ఫంక్షన్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
సందేశం ద్వారా ప్రారంభించబడిన లావాదేవీలో దీనిని పిలిచినంత కాలం ఇది ఈ సమాచారాన్ని అందించగలదు.

మనం స్వీకరించిన సందేశం ఇతర వారధి నుండి వచ్చిందని మనం నిర్ధారించుకోవాలి.

```solidity

        _;
    }

    /**********************
     * అంతర్గత ఫంక్షన్‌లు *
     **********************/

    /**
     * సాధారణంగా నిల్వ నుండి మెసెంజర్‌ను పొందుతుంది. చైల్డ్ కాంట్రాక్ట్ ఓవర్‌రైడ్ చేయవలసి వస్తే ఈ ఫంక్షన్ బహిర్గతం చేయబడుతుంది.
     * @return ఉపయోగించాల్సిన క్రాస్-డొమైన్ మెసెంజర్ కాంట్రాక్ట్ యొక్క చిరునామా.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

ఈ ఫంక్షన్ క్రాస్ డొమైన్ మెసెంజర్‌ను అందిస్తుంది.
ఏ క్రాస్ డొమైన్ మెసెంజర్‌ని ఉపయోగించాలో పేర్కొనడానికి అల్గారిథమ్‌ను ఉపయోగించడానికి దీని నుండి వారసత్వంగా పొందే కాంట్రాక్ట్‌లను అనుమతించడానికి మనం `messenger` వేరియబుల్‌కు బదులుగా ఫంక్షన్‌ను ఉపయోగిస్తాము.

```solidity

    /**
     * మరొక డొమైన్‌లోని ఖాతాకు సందేశం పంపుతుంది
     * @param _crossDomainTarget గమ్యస్థాన డొమైన్‌లో ఉద్దేశించిన గ్రహీత
     * @param _message లక్ష్యానికి పంపాల్సిన డేటా (సాధారణంగా `onlyFromCrossDomainAccount()` ఉన్న ఫంక్షన్‌కు కాల్ డేటా)
     * @param _gasLimit లక్ష్య డొమైన్‌లో సందేశం రసీదు కోసం గ్యాస్ పరిమితి.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

చివరగా, ఇతర లేయర్‌కు సందేశాన్ని పంపే ఫంక్షన్.

```solidity
    ) internal {
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events, రీఎంట్రెన్సీ-benign
```

[స్లిదర్](https://github.com/crytic/slither) అనేది దుర్బలత్వాలు మరియు ఇతర సంభావ్య సమస్యల కోసం వెతకడానికి ప్రతి కాంట్రాక్ట్‌పై Optimism రన్ చేసే స్టాటిక్ ఎనలైజర్.
ఈ సందర్భంలో, కింది లైన్ రెండు దుర్బలత్వాలను ప్రేరేపిస్తుంది:

1. [రీఎంట్రెన్సీ ఈవెంట్‌లు](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [నిరపాయమైన రీఎంట్రెన్సీ](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

ఈ సందర్భంలో మనం రీఎంట్రెన్సీ గురించి ఆందోళన చెందడం లేదు, స్లిదర్‌కు అది తెలుసుకునే మార్గం లేకపోయినా, `getCrossDomainMessenger()` నమ్మదగిన చిరునామాను అందిస్తుందని మనకు తెలుసు.

### l1 వారధి కాంట్రాక్ట్ {#the-l1-bridge-contract}

[ఈ కాంట్రాక్ట్ కోసం సోర్స్ కోడ్ ఇక్కడ ఉంది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

ఇంటర్‌ఫేస్‌లు ఇతర కాంట్రాక్ట్‌లలో భాగం కావచ్చు, కాబట్టి అవి విస్తృత శ్రేణి Solidity వెర్షన్‌లకు మద్దతు ఇవ్వాలి.
కానీ వారధి అనేది మన కాంట్రాక్ట్, మరియు అది ఏ Solidity వెర్షన్‌ను ఉపయోగిస్తుందనే దాని గురించి మనం ఖచ్చితంగా ఉండవచ్చు.

```solidity
/* ఇంటర్‌ఫేస్ దిగుమతులు */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) మరియు [IL1StandardBridge](#il1standardbridge) పైన వివరించబడ్డాయి.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[ఈ ఇంటర్‌ఫేస్](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) l2లో ప్రామాణిక వారధిని నియంత్రించడానికి సందేశాలను సృష్టించడానికి మమ్మల్ని అనుమతిస్తుంది.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[ఈ ఇంటర్‌ఫేస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ERC-20 కాంట్రాక్ట్‌లను నియంత్రించడానికి మమ్మల్ని అనుమతిస్తుంది.
[మీరు దీని గురించి ఇక్కడ మరింత చదవవచ్చు](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* లైబ్రరీ దిగుమతులు */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[పైన వివరించినట్లుగా](#crossdomainenabled), ఈ కాంట్రాక్ట్ ఇంటర్‌లేయర్ సందేశం కోసం ఉపయోగించబడుతుంది.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) ఎల్లప్పుడూ ఒకే చిరునామాను కలిగి ఉండే l2 కాంట్రాక్ట్‌ల చిరునామాలను కలిగి ఉంటుంది. ఇందులో l2లోని ప్రామాణిక వారధి ఉంటుంది.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[ఓపెన్‌జెప్పెలిన్ యొక్క చిరునామా యుటిలిటీలు](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). కాంట్రాక్ట్ చిరునామాలు మరియు బాహ్యంగా స్వంతమైన ఖాతాలకు (EOA) చెందిన వాటి మధ్య తేడాను గుర్తించడానికి ఇది ఉపయోగించబడుతుంది.

ఇది సరైన పరిష్కారం కాదని గమనించండి, ఎందుకంటే డైరెక్ట్ కాల్‌లు మరియు కాంట్రాక్ట్ కన్స్ట్రక్టర్ నుండి చేసిన కాల్‌ల మధ్య తేడాను గుర్తించడానికి మార్గం లేదు, కానీ కనీసం ఇది కొన్ని సాధారణ వినియోగదారు లోపాలను గుర్తించడానికి మరియు నిరోధించడానికి మమ్మల్ని అనుమతిస్తుంది.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 ప్రమాణం](https://eips.ethereum.org/EIPS/eip-20) వైఫల్యాన్ని నివేదించడానికి కాంట్రాక్ట్ కోసం రెండు మార్గాలకు మద్దతు ఇస్తుంది:

1. రివర్ట్
2. `false`ని తిరిగి ఇవ్వడం

రెండు కేసులను నిర్వహించడం మన కోడ్‌ను మరింత క్లిష్టతరం చేస్తుంది, కాబట్టి దానికి బదులుగా మనం [ఓపెన్‌జెప్పెలిన్ యొక్క `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)ని ఉపయోగిస్తాము, ఇది [అన్ని వైఫల్యాలు రివర్ట్‌కు దారితీసేలా](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) నిర్ధారిస్తుంది.

```solidity
/**
 * @title L1StandardBridge
 * @dev లేయర్ 1 (l1) ETH మరియు ERC-20 వారధి అనేది డిపాజిట్ చేయబడిన లేయర్ 1 (l1) నిధులను మరియు లేయర్ 2 (l2) లో వాడుకలో ఉన్న ప్రామాణిక
 * టోకెన్ లను నిల్వ చేసే ఒక కాంట్రాక్ట్. ఇది సంబంధిత లేయర్ 2 (l2) వారధి ని సమకాలీకరిస్తుంది, డిపాజిట్ల గురించి దానికి తెలియజేస్తుంది
 * మరియు కొత్తగా ఖరారు చేయబడిన ఉపసంహరణ ల కోసం దానిని వింటుంది.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

మనం `IERC20` ఇంటర్‌ఫేస్‌ని ఉపయోగించిన ప్రతిసారీ `SafeERC20` ర్యాపర్‌ని ఉపయోగించడాన్ని ఈ లైన్ ద్వారా పేర్కొంటాము.

```solidity

    /********************************
     * బాహ్య కాంట్రాక్ట్ సూచనలు *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) యొక్క చిరునామా.

```solidity

    // డిపాజిట్ చేయబడిన లేయర్ 1 (l1) టోకెన్ బ్యాలెన్స్‌కు లేయర్ 1 (l1) టోకెన్ నుండి లేయర్ 2 (l2) టోకెన్ కు మ్యాప్ చేస్తుంది
    mapping(address => mapping(address => uint256)) public deposits;
```

ఇలాంటి డబుల్ [మ్యాపింగ్](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) అనేది మీరు [ద్విమితీయ స్పార్స్ శ్రేణిని](https://en.wikipedia.org/wiki/Sparse_matrix) నిర్వచించే మార్గం.
ఈ డేటా నిర్మాణంలోని విలువలు `deposit[L1 token addr][L2 token addr]`గా గుర్తించబడతాయి.
డిఫాల్ట్ విలువ సున్నా.
వేరే విలువకు సెట్ చేయబడిన సెల్‌లు మాత్రమే నిల్వకు వ్రాయబడతాయి.

```solidity

    /***************
     * కన్స్ట్రక్టర్ *
     ***************/

    // ఈ కాంట్రాక్ట్ ప్రాక్సీ వెనుక ఉంటుంది, కాబట్టి కన్స్ట్రక్టర్ పారామితులు ఉపయోగించబడవు.
    constructor() CrossDomainEnabled(address(0)) {}
```

నిల్వలోని అన్ని వేరియబుల్స్‌ను కాపీ చేయాల్సిన అవసరం లేకుండా ఈ కాంట్రాక్ట్‌ను అప్‌గ్రేడ్ చేయగలగాలి.
అలా చేయడానికి మనం [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)ని ఉపయోగిస్తాము, ఇది ప్రతినిధి కాంట్రాక్ట్ ద్వారా నిల్వ చేయబడిన చిరునామా ఉన్న ప్రత్యేక కాంట్రాక్ట్‌కు కాల్‌లను బదిలీ చేయడానికి [`delegatecall`](https://solidity-by-example.org/delegatecall/)ని ఉపయోగించే కాంట్రాక్ట్ (మీరు అప్‌గ్రేడ్ చేసినప్పుడు ఆ చిరునామాను మార్చమని మీరు ప్రాక్సీకి చెబుతారు).
మీరు `delegatecall`ని ఉపయోగించినప్పుడు నిల్వ అనేది _కాల్ చేసే_ కాంట్రాక్ట్ యొక్క నిల్వగా మిగిలిపోతుంది, కాబట్టి అన్ని కాంట్రాక్ట్ స్థితి వేరియబుల్స్ యొక్క విలువలు ప్రభావితం కావు.

ఈ నమూనా యొక్క ఒక ప్రభావం ఏమిటంటే, `delegatecall` ద్వారా _కాల్ చేయబడిన_ కాంట్రాక్ట్ యొక్క నిల్వ ఉపయోగించబడదు మరియు అందువల్ల దానికి పంపబడిన కన్స్ట్రక్టర్ విలువల వల్ల పట్టింపు లేదు.
ఈ కారణంగానే మనం `CrossDomainEnabled` కన్స్ట్రక్టర్‌కు అర్థరహితమైన విలువను అందించగలము.
క్రింద ఉన్న ప్రారంభీకరణ కన్స్ట్రక్టర్ నుండి వేరుగా ఉండటానికి కూడా ఇదే కారణం.

```solidity
    /******************
     * ప్రారంభించడం *
     ******************/

    /**
     * @param _l1messenger క్రాస్-చైన్ కమ్యూనికేషన్‌ల కోసం ఉపయోగించబడుతున్న లేయర్ 1 (l1) మెసెంజర్ చిరునామా.
     * @param _l2TokenBridge లేయర్ 2 (l2) ప్రామాణిక వారధి చిరునామా.
     */
    // స్లిదర్-disable-next-line external-function
```

ఈ [స్లిదర్ పరీక్ష](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) కాంట్రాక్ట్ కోడ్ నుండి కాల్ చేయబడని ఫంక్షన్‌లను గుర్తిస్తుంది మరియు అందువల్ల `public`కి బదులుగా `external`గా ప్రకటించబడవచ్చు.
`external` ఫంక్షన్‌ల గ్యాస్ ధర తక్కువగా ఉండవచ్చు, ఎందుకంటే వాటికి కాల్ డేటాలో పారామితులను అందించవచ్చు.
`public`గా ప్రకటించబడిన ఫంక్షన్‌లు కాంట్రాక్ట్ లోపల నుండి యాక్సెస్ చేయబడాలి.
కాంట్రాక్ట్‌లు వాటి స్వంత కాల్ డేటాను సవరించలేవు, కాబట్టి పారామితులు మెమరీలో ఉండాలి.
అటువంటి ఫంక్షన్‌ను బాహ్యంగా పిలిచినప్పుడు, కాల్ డేటాను మెమరీకి కాపీ చేయడం అవసరం, దీనికి గ్యాస్ ఖర్చవుతుంది.
ఈ సందర్భంలో ఫంక్షన్ ఒకసారి మాత్రమే పిలువబడుతుంది, కాబట్టి అసమర్థత మనకు పట్టింపు లేదు.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` ఫంక్షన్ ఒకసారి మాత్రమే పిలువబడాలి.
l1 క్రాస్ డొమైన్ మెసెంజర్ లేదా l2 టోకెన్ వారధి చిరునామా మారితే, మనం కొత్త ప్రాక్సీని మరియు దాన్ని పిలిచే కొత్త వారధిని సృష్టిస్తాము.
మొత్తం సిస్టమ్ అప్‌గ్రేడ్ చేయబడినప్పుడు మినహా ఇది జరగడానికి అవకాశం లేదు, ఇది చాలా అరుదైన సంఘటన.

ఈ ఫంక్షన్‌ను _ఎవరు_ పిలవగలరో పరిమితం చేసే యంత్రాంగం ఏదీ లేదని గమనించండి.
దీని అర్థం సిద్ధాంతపరంగా దాడి చేసే వ్యక్తి మనం ప్రాక్సీని మరియు వారధి యొక్క మొదటి వెర్షన్‌ను డిప్లాయ్ చేయు వరకు వేచి ఉండి, ఆపై చట్టబద్ధమైన వినియోగదారు కంటే ముందుగా `initialize` ఫంక్షన్‌ను చేరుకోవడానికి [ముందుగా అమలు చేయడం](https://solidity-by-example.org/hacks/front-running/) చేయవచ్చు. కానీ దీనిని నిరోధించడానికి రెండు పద్ధతులు ఉన్నాయి:

1. కాంట్రాక్ట్‌లు నేరుగా EOA ద్వారా కాకుండా [వాటిని సృష్టించే మరొక కాంట్రాక్ట్ ఉన్న లావాదేవీలో](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) డిప్లాయ్ చేయబడితే, మొత్తం ప్రక్రియ అటామిక్‌గా ఉంటుంది మరియు మరే ఇతర లావాదేవీ అమలు చేయబడక ముందే పూర్తవుతుంది.
2. `initialize`కి చట్టబద్ధమైన కాల్ విఫలమైతే, కొత్తగా సృష్టించబడిన ప్రాక్సీ మరియు వారధిని విస్మరించి కొత్త వాటిని సృష్టించడం ఎల్లప్పుడూ సాధ్యమే.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

వారధి తెలుసుకోవలసిన రెండు పారామితులు ఇవి.

```solidity

    /**************
     * డిపాజిట్ చేయడం *
     **************/

    /** @dev పంపినవారు EOA అయి ఉండాలని అవసరం అయ్యే మాడిఫైయర్. ఈ తనిఖీని హానికరమైన
     *  కాంట్రాక్ట్ initcode ద్వారా దాటవేయవచ్చు, కానీ ఇది మనం నివారించాలనుకుంటున్న వినియోగదారు లోపాన్ని చూసుకుంటుంది.
     */
    modifier onlyEOA() {
        // కాంట్రాక్ట్ ల నుండి డిపాజిట్లను ఆపడానికి ఉపయోగించబడుతుంది (ప్రమాదవశాత్తు కోల్పోయిన టోకెన్ లను నివారించండి)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

మనకు ఓపెన్‌జెప్పెలిన్ యొక్క `Address` యుటిలిటీలు అవసరం కావడానికి ఇదే కారణం.

```solidity
    /**
     * @dev లేయర్ 2 (l2) లోని కాలర్ బ్యాలెన్స్‌కు కొంత ETH ని డిపాజిట్ చేయడానికి
     * ఈ ఫంక్షన్‌ను డేటా లేకుండా కాల్ చేయవచ్చు.
     * స్వీకరించే ఫంక్షన్ డేటాను తీసుకోదు కాబట్టి, ఒక సంప్రదాయ
     * డిఫాల్ట్ మొత్తం లేయర్ 2 (l2) కి ఫార్వార్డ్ చేయబడుతుంది.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

ఈ ఫంక్షన్ పరీక్ష ప్రయోజనాల కోసం ఉంది.
ఇది ఇంటర్‌ఫేస్ నిర్వచనాలలో కనిపించదని గమనించండి - ఇది సాధారణ ఉపయోగం కోసం కాదు.

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

ఈ రెండు ఫంక్షన్‌లు `_initiateETHDeposit` చుట్టూ ఉన్న ర్యాపర్‌లు, ఇది వాస్తవ ETH డిపాజిట్‌ను నిర్వహించే ఫంక్షన్.

```solidity
    /**
     * @dev ETH ని నిల్వ చేయడం ద్వారా మరియు డిపాజిట్ గురించి లేయర్ 2 (l2) ETH గేట్‌వేకి తెలియజేయడం ద్వారా డిపాజిట్ల కోసం లాజిక్‌ను నిర్వహిస్తుంది.
     * @param _from లేయర్ 1 (l1) లో డిపాజిట్‌ను లాగడానికి ఖాతా.
     * @param _to లేయర్ 2 (l2) లో డిపాజిట్ ఇవ్వడానికి ఖాతా.
     * @param _l2Gas లేయర్ 2 (l2) లో డిపాజిట్‌ను పూర్తి చేయడానికి అవసరమైన గ్యాస్ పరిమితి.
     * @param _data లేయర్ 2 (l2) కి ఫార్వార్డ్ చేయడానికి ఐచ్ఛిక డేటా. ఈ డేటా బాహ్య కాంట్రాక్ట్ లకు
     *        కేవలం సౌలభ్యం కోసం అందించబడింది. గరిష్ట పొడవును అమలు చేయడం మినహా,
     *        ఈ కాంట్రాక్ట్ లు దాని కంటెంట్ గురించి ఎలాంటి హామీలను అందించవు.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit కాల్ కోసం కాల్ డేటా ని నిర్మించండి
        bytes memory message = abi.encodeWithSelector(
```

క్రాస్ డొమైన్ సందేశాలు పనిచేసే విధానం ఏమిటంటే, గమ్యస్థాన కాంట్రాక్ట్ సందేశాన్ని దాని కాల్ డేటాగా పిలుస్తుంది.
Solidity కాంట్రాక్ట్‌లు ఎల్లప్పుడూ వాటి కాల్ డేటాను [ABI స్పెసిఫికేషన్‌లకు](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) అనుగుణంగా అర్థం చేసుకుంటాయి.
Solidity ఫంక్షన్ [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) ఆ కాల్ డేటాను సృష్టిస్తుంది.

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

ఇక్కడ సందేశం ఏమిటంటే, ఈ పారామితులతో [`finalizeDeposit` ఫంక్షన్‌ను](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) పిలవడం:

| పరామితి | విలువ                          | అర్థం                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | l1లో ETH (ఇది ERC-20 టోకెన్ కాదు) కోసం నిలబడే ప్రత్యేక విలువ                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimismలో ETHని నిర్వహించే l2 కాంట్రాక్ట్, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (ఈ కాంట్రాక్ట్ అంతర్గత Optimism ఉపయోగం కోసం మాత్రమే) |
| \_from    | \_from                         | ETHని పంపే l1లోని చిరునామా                                                                                                         |
| \_to      | \_to                           | ETHని స్వీకరించే l2లోని చిరునామా                                                                                                      |
| amount    | msg.value                      | పంపబడిన Wei మొత్తం (ఇది ఇప్పటికే వారధికి పంపబడింది)                                                                               |
| \_data    | \_data                         | డిపాజిట్‌కు జోడించడానికి అదనపు డేటా                                                                                                     |

```solidity
        // లేయర్ 2 (l2) లోకి కాల్ డేటా ని పంపండి
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

క్రాస్ డొమైన్ మెసెంజర్ ద్వారా సందేశాన్ని పంపండి.

```solidity
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

ఈ బదిలీని వినే ఏదైనా వికేంద్రీకృత అప్లికేషన్ (dapp)కి తెలియజేయడానికి ఈవెంట్‌ను విడుదల చేయండి.

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

ఈ రెండు ఫంక్షన్‌లు `_initiateERC20Deposit` చుట్టూ ఉన్న ర్యాపర్‌లు, ఇది వాస్తవ ERC-20 డిపాజిట్‌ను నిర్వహించే ఫంక్షన్.

```solidity
    /**
     * @dev డిపాజిట్ గురించి లేయర్ 2 (l2) డిపాజిట్ చేయబడిన టోకెన్
     * కాంట్రాక్ట్ కి తెలియజేయడం ద్వారా మరియు లేయర్ 1 (l1) నిధులను లాక్ చేయడానికి హ్యాండ్లర్‌ను కాల్ చేయడం ద్వారా డిపాజిట్ల కోసం లాజిక్‌ను నిర్వహిస్తుంది. (ఉదా., transferFrom)
     *
     * @param _l1Token మనం డిపాజిట్ చేస్తున్న లేయర్ 1 (l1) ERC-20 యొక్క చిరునామా
     * @param _l2Token లేయర్ 1 (l1) కి సంబంధించిన లేయర్ 2 (l2) ERC-20 యొక్క చిరునామా
     * @param _from లేయర్ 1 (l1) లో డిపాజిట్‌ను లాగడానికి ఖాతా
     * @param _to లేయర్ 2 (l2) లో డిపాజిట్ ఇవ్వడానికి ఖాతా
     * @param _amount డిపాజిట్ చేయాల్సిన ERC-20 మొత్తం.
     * @param _l2Gas లేయర్ 2 (l2) లో డిపాజిట్‌ను పూర్తి చేయడానికి అవసరమైన గ్యాస్ పరిమితి.
     * @param _data లేయర్ 2 (l2) కి ఫార్వార్డ్ చేయడానికి ఐచ్ఛిక డేటా. ఈ డేటా బాహ్య కాంట్రాక్ట్ లకు
     *        కేవలం సౌలభ్యం కోసం అందించబడింది. గరిష్ట పొడవును అమలు చేయడం మినహా,
     *        ఈ కాంట్రాక్ట్ లు దాని కంటెంట్ గురించి ఎలాంటి హామీలను అందించవు.
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

ఈ ఫంక్షన్ పైన ఉన్న `_initiateETHDeposit`కి సమానంగా ఉంటుంది, కొన్ని ముఖ్యమైన తేడాలతో.
మొదటి వ్యత్యాసం ఏమిటంటే, ఈ ఫంక్షన్ టోకెన్ చిరునామాలను మరియు బదిలీ చేయవలసిన మొత్తాన్ని పారామితులుగా స్వీకరిస్తుంది.
ETH విషయంలో వారధికి చేసే కాల్‌లో ఇప్పటికే వారధి ఖాతాకు ఆస్తి బదిలీ ఉంటుంది (`msg.value`).

```solidity
        // లేయర్ 1 (l1) లో డిపాజిట్ ప్రారంభించబడినప్పుడు, లేయర్ 1 (l1) వారధి భవిష్యత్తు కోసం నిధులను తనకు తానుగా బదిలీ చేస్తుంది
        // ఉపసంహరణ లు. safeTransferFrom కాంట్రాక్ట్ లో కోడ్ ఉందో లేదో కూడా తనిఖీ చేస్తుంది, కాబట్టి ఇది విఫలమవుతుంది
        // _from అనేది EOA లేదా చిరునామా(0) అయితే.
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events, రీఎంట్రెన్సీ-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 టోకెన్ బదిలీలు ETH నుండి భిన్నమైన ప్రక్రియను అనుసరిస్తాయి:

1. వినియోగదారు (`_from`) తగిన టోకెన్‌లను బదిలీ చేయడానికి వారధికి అనుమతి మొత్తం ఇస్తారు.
2. వినియోగదారు టోకెన్ కాంట్రాక్ట్ చిరునామా, మొత్తం మొదలైన వాటితో వారధిని పిలుస్తారు.
3. డిపాజిట్ ప్రక్రియలో భాగంగా వారధి టోకెన్‌లను (తనకు తానుగా) బదిలీ చేస్తుంది.

మొదటి దశ చివరి రెండింటి నుండి ప్రత్యేక లావాదేవీలో జరగవచ్చు.
అయినప్పటికీ, ముందుగా అమలు చేయడం సమస్య కాదు ఎందుకంటే `_initiateERC20Deposit`ని పిలిచే రెండు ఫంక్షన్‌లు (`depositERC20` మరియు `depositERC20To`) `_from` పరామితిగా `msg.sender`తో మాత్రమే ఈ ఫంక్షన్‌ను పిలుస్తాయి.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) కోసం కాల్ డేటా ని నిర్మించండి
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // లేయర్ 2 (l2) లోకి కాల్ డేటా ని పంపండి
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events, రీఎంట్రెన్సీ-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

డిపాజిట్ చేయబడిన టోకెన్‌ల మొత్తాన్ని `deposits` డేటా నిర్మాణానికి జోడించండి.
అదే l1 ERC-20 టోకెన్‌కు అనుగుణంగా l2లో బహుళ చిరునామాలు ఉండవచ్చు, కాబట్టి డిపాజిట్‌లను ట్రాక్ చేయడానికి l1 ERC-20 టోకెన్ యొక్క వారధి బ్యాలెన్స్‌ను ఉపయోగించడం సరిపోదు.

```solidity

        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * క్రాస్-చైన్ ఫంక్షన్‌లు *
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

l2 వారధి l2 క్రాస్ డొమైన్ మెసెంజర్‌కు సందేశాన్ని పంపుతుంది, ఇది l1 క్రాస్ డొమైన్ మెసెంజర్ ఈ ఫంక్షన్‌ను పిలిచేలా చేస్తుంది (వాస్తవానికి, [సందేశాన్ని ముగించే లావాదేవీ](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) l1లో సమర్పించబడిన తర్వాత).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

ఇది క్రాస్ డొమైన్ మెసెంజర్ నుండి వస్తున్న మరియు l2 టోకెన్ వారధితో ఉద్భవించిన _చట్టబద్ధమైన_ సందేశం అని నిర్ధారించుకోండి.
ఈ ఫంక్షన్ వారధి నుండి ETHని ఉపసంహరించుకోవడానికి ఉపయోగించబడుతుంది, కాబట్టి ఇది అధీకృత కాలర్ ద్వారా మాత్రమే పిలువబడుతుందని మనం నిర్ధారించుకోవాలి.

```solidity
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETHని బదిలీ చేయడానికి మార్గం ఏమిటంటే, `msg.value`లో Wei మొత్తంతో గ్రహీతను పిలవడం.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

ఉపసంహరణ గురించి ఈవెంట్‌ను విడుదల చేయండి.

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

ఈ ఫంక్షన్ ERC-20 టోకెన్‌ల కోసం అవసరమైన మార్పులతో పైన ఉన్న `finalizeETHWithdrawal`కి సమానంగా ఉంటుంది.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` డేటా నిర్మాణాన్ని నవీకరించండి.

```solidity

        // లేయర్ 1 (l1) లో ఉపసంహరణ ఖరారు అయినప్పుడు, లేయర్ 1 (l1) వారధి నిధులను ఉపసంహరించుకునేవారికి బదిలీ చేస్తుంది
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * తాత్కాలికం - ETH ని వలస పంపడం *
     *****************************/

    /**
     * @dev ఖాతాకు ETH బ్యాలెన్స్‌ను జోడిస్తుంది. పాత గేట్‌వే నుండి కొత్త గేట్‌వేకి ETH ని
     * వలస పంపడానికి అనుమతించడానికి ఇది ఉద్దేశించబడింది.
     * గమనిక: పాత కాంట్రాక్ట్ నుండి వలస వచ్చిన ETH ని స్వీకరించడానికి వీలుగా ఇది ఒక అప్‌గ్రేడ్ కోసం మాత్రమే వదిలివేయబడింది
     */
    function donateETH() external payable {}
}
```

వారధి యొక్క మునుపటి అమలు ఉంది.
మనం ఆ అమలు నుండి దీనికి మారినప్పుడు, మనం అన్ని ఆస్తులను తరలించాల్సి వచ్చింది.
ERC-20 టోకెన్‌లను సులభంగా తరలించవచ్చు.
అయినప్పటికీ, కాంట్రాక్ట్‌కు ETHని బదిలీ చేయడానికి మీకు ఆ కాంట్రాక్ట్ ఆమోదం అవసరం, అదే `donateETH` మనకు అందిస్తుంది.

## l2లో ERC-20 టోకెన్‌లు {#erc-20-tokens-on-l2}

ERC-20 టోకెన్ ప్రామాణిక వారధికి సరిపోవాలంటే, అది ప్రామాణిక వారధిని మరియు ప్రామాణిక వారధిని _మాత్రమే_ టోకెన్‌ను ముద్రించడానికి అనుమతించాలి.
ఇది అవసరం ఎందుకంటే Optimismలో చెలామణి అవుతున్న టోకెన్‌ల సంఖ్య l1 వారధి కాంట్రాక్ట్ లోపల లాక్ చేయబడిన టోకెన్‌ల సంఖ్యకు సమానంగా ఉండేలా వారధులు నిర్ధారించుకోవాలి.
l2లో చాలా టోకెన్‌లు ఉంటే కొంతమంది వినియోగదారులు తమ ఆస్తులను తిరిగి l1కి వారధి ద్వారా పంపలేరు.
విశ్వసనీయ వారధికి బదులుగా, మనం తప్పనిసరిగా [ఫ్రాక్షనల్ రిజర్వ్ బ్యాంకింగ్](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)ని పునఃసృష్టిస్తాము.
l1లో చాలా టోకెన్‌లు ఉంటే, ఆ టోకెన్‌లలో కొన్ని ఎప్పటికీ వారధి కాంట్రాక్ట్ లోపల లాక్ చేయబడి ఉంటాయి ఎందుకంటే l2 టోకెన్‌లను దహనం చేయకుండా వాటిని విడుదల చేయడానికి మార్గం లేదు.

### IL2StandardERC20 {#il2standarderc20}

ప్రామాణిక వారధిని ఉపయోగించే l2లోని ప్రతి ERC-20 టోకెన్ [ఈ ఇంటర్‌ఫేస్‌ను](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) అందించాలి, ఇది ప్రామాణిక వారధికి అవసరమైన ఫంక్షన్‌లు మరియు ఈవెంట్‌లను కలిగి ఉంటుంది.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[ప్రామాణిక ERC-20 ఇంటర్‌ఫేస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) `mint` మరియు `burn` ఫంక్షన్‌లను కలిగి ఉండదు.
ఆ పద్ధతులు [ERC-20 ప్రమాణం](https://eips.ethereum.org/EIPS/eip-20) ద్వారా అవసరం లేదు, ఇది టోకెన్‌లను సృష్టించడానికి మరియు నాశనం చేయడానికి యంత్రాంగాలను పేర్కొనకుండా వదిలివేస్తుంది.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

కాంట్రాక్ట్ ఏ ఫంక్షన్‌లను అందిస్తుందో పేర్కొనడానికి [ERC-165 ఇంటర్‌ఫేస్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) ఉపయోగించబడుతుంది.
[మీరు ప్రమాణాన్ని ఇక్కడ చదవవచ్చు](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

ఈ ఫంక్షన్ ఈ కాంట్రాక్ట్‌కు వారధి చేయబడిన l1 టోకెన్ చిరునామాను అందిస్తుంది.
వ్యతిరేక దిశలో మనకు ఇలాంటి ఫంక్షన్ లేదని గమనించండి.
అది అమలు చేయబడినప్పుడు l2 మద్దతు ప్లాన్ చేయబడిందా లేదా అనే దానితో సంబంధం లేకుండా మనం ఏదైనా l1 టోకెన్‌ను వారధి చేయగలగాలి.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

టోకెన్‌లను ముద్రించడానికి (సృష్టించడానికి) మరియు దహనం చేయడానికి (నాశనం చేయడానికి) ఫంక్షన్‌లు మరియు ఈవెంట్‌లు.
టోకెన్‌ల సంఖ్య సరైనదని (l1లో లాక్ చేయబడిన టోకెన్‌ల సంఖ్యకు సమానం) నిర్ధారించడానికి ఈ ఫంక్షన్‌లను రన్ చేయగల ఏకైక ఎంటిటీ వారధి మాత్రమే అయి ఉండాలి.

### L2StandardERC20 {#l2standarderc20}

[ఇది `IL2StandardERC20` ఇంటర్‌ఫేస్ యొక్క మన అమలు](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
మీకు ఏదైనా అనుకూల లాజిక్ అవసరమైతే తప్ప, మీరు దీన్ని ఉపయోగించాలి.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[ఓపెన్‌జెప్పెలిన్ ERC-20 కాంట్రాక్ట్](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism చక్రాన్ని తిరిగి ఆవిష్కరించడాన్ని విశ్వసించదు, ప్రత్యేకించి చక్రం బాగా ఆడిట్ చేయబడినప్పుడు మరియు ఆస్తులను కలిగి ఉండటానికి తగినంత నమ్మదగినదిగా ఉండాలి.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

ఇవి మనకు అవసరమైన రెండు అదనపు కాన్ఫిగరేషన్ పారామితులు మరియు ERC-20కి సాధారణంగా అవసరం లేదు.

```solidity

    /**
     * @param _l2Bridge లేయర్ 2 (l2) ప్రామాణిక వారధి యొక్క చిరునామా.
     * @param _l1Token సంబంధిత లేయర్ 1 (l1) టోకెన్ యొక్క చిరునామా.
     * @param _name ERC-20 పేరు.
     * @param _symbol ERC-20 చిహ్నం.
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

ముందుగా మనం వారసత్వంగా పొందే కాంట్రాక్ట్ (`ERC20(_name, _symbol)`) కోసం కన్స్ట్రక్టర్‌ను పిలవండి మరియు ఆపై మన స్వంత వేరియబుల్స్‌ను సెట్ చేయండి.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // స్లిదర్-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) పనిచేసే విధానం ఇది.
ప్రతి ఇంటర్‌ఫేస్ అనేది మద్దతు ఉన్న ఫంక్షన్‌ల సంఖ్య, మరియు ఆ ఫంక్షన్‌ల యొక్క [ABI ఫంక్షన్ సెలెక్టర్ల](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) [ఎక్స్‌క్లూజివ్ ఆర్](https://en.wikipedia.org/wiki/Exclusive_or)గా గుర్తించబడుతుంది.

l2 వారధి ఆస్తులను పంపే ERC-20 కాంట్రాక్ట్ `IL2StandardERC20` అని నిర్ధారించుకోవడానికి ERC-165ని శానిటీ చెక్‌గా ఉపయోగిస్తుంది.

**గమనిక:** `supportsInterface`కి తప్పుడు సమాధానాలు అందించకుండా రోగ్ కాంట్రాక్ట్‌ను నిరోధించడానికి ఏమీ లేదు, కాబట్టి ఇది శానిటీ చెక్ యంత్రాంగం, భద్రతా యంత్రాంగం _కాదు_.

```solidity
    // స్లిదర్-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // స్లిదర్-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

l2 వారధి మాత్రమే ఆస్తులను ముద్రించడానికి మరియు దహనం చేయడానికి అనుమతించబడుతుంది.

`_mint` మరియు `_burn` వాస్తవానికి [ఓపెన్‌జెప్పెలిన్ ERC-20 కాంట్రాక్ట్](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)లో నిర్వచించబడ్డాయి.
ఆ కాంట్రాక్ట్ వాటిని బాహ్యంగా బహిర్గతం చేయదు, ఎందుకంటే టోకెన్‌లను ముద్రించడానికి మరియు దహనం చేయడానికి షరతులు ERC-20ని ఉపయోగించే మార్గాల సంఖ్య వలె వైవిధ్యంగా ఉంటాయి.

## లేయర్ 2 (l2) వారధి కోడ్ {#l2-bridge-code}

ఇది Optimismలో వారధిని రన్ చేసే కోడ్.
[ఈ కాంట్రాక్ట్ కోసం సోర్స్ ఇక్కడ ఉంది](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* ఇంటర్‌ఫేస్ దిగుమతులు */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ఇంటర్‌ఫేస్ మనం పైన చూసిన [l1 సమానమైన దానికి](#il1erc20bridge) చాలా పోలి ఉంటుంది.
రెండు ముఖ్యమైన తేడాలు ఉన్నాయి:

1. l1లో మీరు డిపాజిట్లను ప్రారంభిస్తారు మరియు ఉపసంహరణలను ముగిస్తారు.
   ఇక్కడ మీరు ఉపసంహరణలను ప్రారంభిస్తారు మరియు డిపాజిట్లను ముగిస్తారు.
2. l1లో ETH మరియు ERC-20 టోకెన్‌ల మధ్య తేడాను గుర్తించడం అవసరం.
   l2లో మనం రెండింటికీ ఒకే ఫంక్షన్‌లను ఉపయోగించవచ్చు ఎందుకంటే అంతర్గతంగా Optimismలో ETH బ్యాలెన్స్‌లు [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) చిరునామాతో ERC-20 టోకెన్‌గా నిర్వహించబడతాయి.

```solidity
/* లైబ్రరీ దిగుమతులు */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* కాంట్రాక్ట్ దిగుమతులు */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev లేయర్ 2 (l2) ప్రామాణిక వారధి అనేది లేయర్ 1 (l1) మరియు లేయర్ 2 (l2) మధ్య ETH మరియు ERC-20 పరివర్తనలను ప్రారంభించడానికి
 * లేయర్ 1 (l1) ప్రామాణిక వారధి తో కలిసి పనిచేసే ఒక కాంట్రాక్ట్.
 * లేయర్ 1 (l1) ప్రామాణిక వారధి లోకి డిపాజిట్ల గురించి విన్నప్పుడు ఈ కాంట్రాక్ట్ కొత్త టోకెన్ లను ముద్రించేదిగా పనిచేస్తుంది.
 * ఈ కాంట్రాక్ట్ ఉపసంహరణ కోసం ఉద్దేశించిన టోకెన్ లను దహనం చేసేదిగా కూడా పనిచేస్తుంది, లేయర్ 1 (l1) నిధులను విడుదల చేయడానికి లేయర్ 1 (l1)
 * వారధి కి తెలియజేస్తుంది.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * బాహ్య కాంట్రాక్ట్ సూచనలు *
     ********************************/

    address public l1TokenBridge;
```

l1 వారధి చిరునామాను ట్రాక్ చేయండి.
l1 సమానమైన దానికి భిన్నంగా, ఇక్కడ మనకు ఈ వేరియబుల్ _అవసరం_ అని గమనించండి.
l1 వారధి చిరునామా ముందుగా తెలియదు.

```solidity

    /***************
     * కన్స్ట్రక్టర్ *
     ***************/

    /**
     * @param _l2CrossDomainMessenger ఈ కాంట్రాక్ట్ ద్వారా ఉపయోగించబడే క్రాస్-డొమైన్ మెసెంజర్.
     * @param _l1TokenBridge ప్రధాన చైన్‌కు డిప్లాయ్ చేయబడిన లేయర్ 1 (l1) వారధి యొక్క చిరునామా.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * ఉపసంహరించుకోవడం *
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

ఈ రెండు ఫంక్షన్‌లు ఉపసంహరణలను ప్రారంభిస్తాయి.
l1 టోకెన్ చిరునామాను పేర్కొనవలసిన అవసరం లేదని గమనించండి.
l2 టోకెన్‌లు l1 సమానమైన చిరునామాను మనకు చెబుతాయని భావిస్తున్నారు.

```solidity

    /**
     * @dev టోకెన్ ని దహనం చేయడం ద్వారా మరియు ఉపసంహరణ గురించి లేయర్ 1 (l1) టోకెన్ గేట్‌వేకి తెలియజేయడం ద్వారా
     *      ఉపసంహరణ ల కోసం లాజిక్‌ను నిర్వహిస్తుంది.
     * @param _l2Token ఉపసంహరణ ప్రారంభించబడిన లేయర్ 2 (l2) టోకెన్ యొక్క చిరునామా.
     * @param _from లేయర్ 2 (l2) లో ఉపసంహరణ ను లాగడానికి ఖాతా.
     * @param _to లేయర్ 1 (l1) లో ఉపసంహరణ ఇవ్వడానికి ఖాతా.
     * @param _amount ఉపసంహరించుకోవాల్సిన టోకెన్ మొత్తం.
     * @param _l1Gas ఉపయోగించబడలేదు, కానీ సంభావ్య ఫార్వర్డ్ అనుకూలత పరిశీలనల కోసం చేర్చబడింది.
     * @param _data లేయర్ 1 (l1) కి ఫార్వార్డ్ చేయడానికి ఐచ్ఛిక డేటా. ఈ డేటా బాహ్య కాంట్రాక్ట్ లకు
     *        కేవలం సౌలభ్యం కోసం అందించబడింది. గరిష్ట పొడవును అమలు చేయడం మినహా,
     *        ఈ కాంట్రాక్ట్ లు దాని కంటెంట్ గురించి ఎలాంటి హామీలను అందించవు.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // ఉపసంహరణ ప్రారంభించబడినప్పుడు, తదుపరి లేయర్ 2 (l2) ని నిరోధించడానికి మేము ఉపసంహరించుకునేవారి నిధులను దహనం చేస్తాము
        // వినియోగం
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

మనం `_from` పరామితిపై _కాకుండా_ నకిలీ చేయడం చాలా కష్టమైన (నాకు తెలిసినంత వరకు అసాధ్యం) `msg.sender`పై ఆధారపడుతున్నామని గమనించండి.

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) కోసం కాల్ డేటా ని నిర్మించండి
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

l1లో ETH మరియు ERC-20 మధ్య తేడాను గుర్తించడం అవసరం.

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

        // లేయర్ 1 (l1) వారధి కి సందేశం పంపండి
        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * క్రాస్-చైన్ ఫంక్షన్: డిపాజిట్ చేయడం *
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

ఈ ఫంక్షన్ `L1StandardBridge` ద్వారా పిలువబడుతుంది.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

సందేశం యొక్క మూలం చట్టబద్ధమైనదని నిర్ధారించుకోండి.
ఇది ముఖ్యం ఎందుకంటే ఈ ఫంక్షన్ `_mint`ని పిలుస్తుంది మరియు l1లో వారధి స్వంతమైన టోకెన్‌ల ద్వారా కవర్ చేయబడని టోకెన్‌లను ఇవ్వడానికి ఉపయోగించవచ్చు.

```solidity
        // లక్ష్య టోకెన్ కంప్లైంట్ అని తనిఖీ చేయండి మరియు
        // లేయర్ 1 (l1) లో డిపాజిట్ చేయబడిన టోకెన్ ఇక్కడ ఉన్న లేయర్ 2 (l2) డిపాజిట్ చేయబడిన టోకెన్ ప్రాతినిధ్యంతో సరిపోలుతుందని ధృవీకరించండి
        if (
            // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

శానిటీ తనిఖీలు:

1. సరైన ఇంటర్‌ఫేస్‌కు మద్దతు ఉంది
2. l2 ERC-20 కాంట్రాక్ట్ యొక్క l1 చిరునామా టోకెన్‌ల l1 మూలంతో సరిపోలుతుంది

```solidity
        ) {
            // డిపాజిట్ ఖరారు అయినప్పుడు, మేము లేయర్ 2 (l2) లోని ఖాతాకు అదే మొత్తంలో క్రెడిట్ చేస్తాము
            // టోకెన్ లు.
            // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

శానిటీ తనిఖీలు ఉత్తీర్ణత సాధిస్తే, డిపాజిట్‌ను ముగించండి:

1. టోకెన్‌లను ముద్రించండి
2. తగిన ఈవెంట్‌ను విడుదల చేయండి

```solidity
        } else {
            // డిపాజిట్ చేయబడుతున్న లేయర్ 2 (l2) టోకెన్ సరైన చిరునామా గురించి అంగీకరించదు
            // దాని లేయర్ 1 (l1) టోకెన్ యొక్క, లేదా సరైన ఇంటర్‌ఫేస్‌కు మద్దతు ఇవ్వదు.
            // హానికరమైన లేయర్ 2 (l2) టోకెన్ ఉంటే లేదా వినియోగదారు ఏదో ఒకవిధంగా ఉంటే మాత్రమే ఇది జరగాలి
            // డిపాజిట్ చేయడానికి తప్పు లేయర్ 2 (l2) టోకెన్ చిరునామా ను పేర్కొన్నారు.
            // ఏదైనా సందర్భంలో, మేము ఇక్కడ ప్రక్రియను ఆపివేసి, ఉపసంహరణ ను నిర్మిస్తాము
            // సందేశం తద్వారా వినియోగదారులు కొన్ని సందర్భాల్లో తమ నిధులను బయటకు తీయగలరు.
            // హానికరమైన టోకెన్ కాంట్రాక్ట్ లను పూర్తిగా నిరోధించడానికి మార్గం లేదు, కానీ ఇది పరిమితం చేస్తుంది
            // వినియోగదారు లోపం మరియు కొన్ని రకాల హానికరమైన కాంట్రాక్ట్ ప్రవర్తనను తగ్గిస్తుంది.
```

వినియోగదారు తప్పు l2 టోకెన్ చిరునామాను ఉపయోగించడం ద్వారా గుర్తించదగిన లోపం చేస్తే, మనం డిపాజిట్‌ను రద్దు చేసి, l1లో టోకెన్‌లను తిరిగి ఇవ్వాలనుకుంటున్నాము.
l2 నుండి మనం దీన్ని చేయగల ఏకైక మార్గం ఫాల్ట్ ఛాలెంజ్ వ్యవధి కోసం వేచి ఉండాల్సిన సందేశాన్ని పంపడం, కానీ టోకెన్‌లను శాశ్వతంగా కోల్పోవడం కంటే వినియోగదారుకు ఇది చాలా మంచిది.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // డిపాజిట్‌ను పంపినవారికి తిరిగి పంపడానికి ఇక్కడ _to మరియు _from ని మార్చాము
                _from,
                _amount,
                _data
            );

            // లేయర్ 1 (l1) వారధి కి సందేశం పంపండి
            // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // స్లిదర్-disable-next-line రీఎంట్రెన్సీ-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## ముగింపు {#conclusion}

ఆస్తి బదిలీలకు ప్రామాణిక వారధి అత్యంత సౌకర్యవంతమైన యంత్రాంగం.
అయినప్పటికీ, ఇది చాలా సాధారణమైనది కాబట్టి ఇది ఎల్లప్పుడూ ఉపయోగించడానికి సులభమైన యంత్రాంగం కాదు.
ముఖ్యంగా ఉపసంహరణల కోసం, చాలా మంది వినియోగదారులు ఛాలెంజ్ వ్యవధి కోసం వేచి ఉండని మరియు ఉపసంహరణను ముగించడానికి మెర్కల్ రుజువు అవసరం లేని [మూడవ పక్ష వారధులను](https://optimism.io/apps#bridge) ఉపయోగించడానికి ఇష్టపడతారు.

ఈ వారధులు సాధారణంగా l1లో ఆస్తులను కలిగి ఉండటం ద్వారా పనిచేస్తాయి, వీటిని వారు చిన్న రుసుముతో (తరచుగా ప్రామాణిక వారధి ఉపసంహరణ కోసం గ్యాస్ ధర కంటే తక్కువ) వెంటనే అందిస్తారు.
వారధి (లేదా దానిని నడుపుతున్న వ్యక్తులు) l1 ఆస్తులు తక్కువగా ఉంటాయని ఊహించినప్పుడు అది l2 నుండి తగినంత ఆస్తులను బదిలీ చేస్తుంది.
ఇవి చాలా పెద్ద ఉపసంహరణలు కాబట్టి, ఉపసంహరణ ఖర్చు పెద్ద మొత్తంలో రుణ విమోచన చేయబడుతుంది మరియు చాలా తక్కువ శాతంగా ఉంటుంది.

లేయర్ 2 (l2) ఎలా పనిచేస్తుందో మరియు స్పష్టమైన మరియు సురక్షితమైన Solidity కోడ్‌ను ఎలా వ్రాయాలో మరింత అర్థం చేసుకోవడానికి ఈ కథనం మీకు సహాయపడిందని ఆశిస్తున్నాము.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
