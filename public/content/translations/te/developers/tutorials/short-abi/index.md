---
title: "కాల్‌డేటా ఆప్టిమైజేషన్ కోసం చిన్న ABIలు"
description: "ఆప్టిమిస్టిక్ రోలప్‌ల కోసం స్మార్ట్ కాంట్రాక్ట్‌లను ఆప్టిమైజ్ చేయడం"
author: "ఓరి పోమెరాంట్జ్"
lang: te
tags: [ "లేయర్ 2" ]
skill: "మధ్యస్థ"
published: 2022-04-01
---

## పరిచయం {#introduction}

ఈ ఆర్టికల్‌లో, మీరు [ఆప్టిమిస్టిక్ రోలప్‌లు](/developers/docs/scaling/optimistic-rollups), వాటిపై లావాదేవీల ఖర్చు, మరియు Ethereum మెయిన్‌నెట్‌లో కంటే భిన్నమైన విషయాల కోసం ఆప్టిమైజ్ చేయడానికి ఆ విభిన్న వ్యయ నిర్మాణం మనల్ని ఎలా కోరుతుందో తెలుసుకుంటారు.
ఈ ఆప్టిమైజేషన్‌ను ఎలా అమలు చేయాలో కూడా మీరు తెలుసుకుంటారు.

### పూర్తి బహిర్గతం {#full-disclosure}

నేను పూర్తి సమయం [Optimism](https://www.optimism.io/) ఉద్యోగిని, కాబట్టి ఈ ఆర్టికల్‌లోని ఉదాహరణలు Optimismలో రన్ అవుతాయి.
అయితే, ఇక్కడ వివరించిన టెక్నిక్ ఇతర రోలప్‌లకు కూడా అలాగే పని చేయాలి.

### పదజాలం {#terminology}

రోలప్‌ల గురించి చర్చిస్తున్నప్పుడు, 'లేయర్ 1' (L1) అనే పదం మెయిన్‌నెట్, అంటే ఉత్పత్తి Ethereum నెట్‌వర్క్ కోసం ఉపయోగించబడుతుంది.
'లేయర్ 2' (L2) అనే పదం రోలప్ లేదా భద్రత కోసం L1పై ఆధారపడి ఉండే ఏదైనా ఇతర సిస్టమ్ కోసం ఉపయోగించబడుతుంది, కానీ దాని ప్రాసెసింగ్‌లో ఎక్కువ భాగాన్ని ఆఫ్‌చెయిన్‌లో చేస్తుంది.

## L2 లావాదేవీల ఖర్చును మనం ఇంకా ఎలా తగ్గించగలం? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[ఆప్టిమిస్టిక్ రోలప్‌లు](/developers/docs/scaling/optimistic-rollups) ప్రతి చారిత్రక లావాదేవీ రికార్డును భద్రపరచాలి, తద్వారా ఎవరైనా వాటి ద్వారా వెళ్లి ప్రస్తుత స్థితి సరైనదని ధృవీకరించగలరు.
Ethereum మెయిన్‌నెట్‌లోకి డేటాను పొందడానికి చౌకైన మార్గం దానిని కాల్‌డేటాగా వ్రాయడం.
ఈ పరిష్కారాన్ని [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) మరియు [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) రెండూ ఎంచుకున్నాయి.

### L2 లావాదేవీల ఖర్చు {#cost-of-l2-transactions}

L2 లావాదేవీల ఖర్చు రెండు భాగాలతో కూడి ఉంటుంది:

1. L2 ప్రాసెసింగ్, ఇది సాధారణంగా చాలా చౌకగా ఉంటుంది
2. L1 నిల్వ, ఇది మెయిన్‌నెట్ గ్యాస్ ఖర్చులకు ముడిపడి ఉంటుంది

నేను ఇది వ్రాస్తున్నప్పుడు, Optimismలో L2 గ్యాస్ ధర 0.001 [Gwei](/developers/docs/gas/#pre-london).
మరోవైపు, L1 గ్యాస్ ధర సుమారుగా 40 gwei.
[మీరు ప్రస్తుత ధరలను ఇక్కడ చూడవచ్చు](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

ఒక బైట్ కాల్‌డేటాకు 4 గ్యాస్ (అది సున్నా అయితే) లేదా 16 గ్యాస్ (ఏదైనా ఇతర విలువ అయితే) ఖర్చు అవుతుంది.
EVMలో అత్యంత ఖరీదైన కార్యకలాపాలలో ఒకటి నిల్వకు వ్రాయడం.
L2లో నిల్వకు 32-బైట్ పదాన్ని వ్రాయడానికి గరిష్ట ఖర్చు 22100 గ్యాస్. ప్రస్తుతం, ఇది 22.1 gwei.
కాబట్టి మనం కాల్‌డేటా యొక్క ఒక్క సున్నా బైట్‌ను ఆదా చేయగలిగితే, మనం నిల్వకు సుమారు 200 బైట్‌లను వ్రాయగలుగుతాము మరియు ఇప్పటికీ లాభపడతాము.

### ABI {#the-abi}

లావాదేవీలలో అధిక భాగం బాహ్య-యాజమాన్య ఖాతా నుండి ఒక కాంట్రాక్ట్‌ను యాక్సెస్ చేస్తాయి.
చాలా కాంట్రాక్ట్‌లు Solidityలో వ్రాయబడ్డాయి మరియు వాటి డేటా ఫీల్డ్‌ను [అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) ప్రకారం అన్వయిస్తాయి.

అయితే, ABI L1 కోసం రూపొందించబడింది, ఇక్కడ ఒక బైట్ కాల్‌డేటా సుమారుగా నాలుగు అంకగణిత కార్యకలాపాలతో సమానంగా ఖర్చవుతుంది, L2లో కాదు, ఇక్కడ ఒక బైట్ కాల్‌డేటా వెయ్యి కంటే ఎక్కువ అంకగణిత కార్యకలాపాలకు ఖర్చవుతుంది.
కాల్‌డేటా ఈ విధంగా విభజించబడింది:

| విభాగం             | పొడవు | బైట్‌లు | వృధా అయిన బైట్‌లు | వృధా అయిన గ్యాస్ | అవసరమైన బైట్‌లు | అవసరమైన గ్యాస్ |
| ------------------ | ----: | ------: | ----------------: | ---------------: | --------------: | -------------: |
| ఫంక్షన్ సెలెక్టర్  |     4 |     0-3 |                 3 |               48 |               1 |             16 |
| సున్నాలు           |    12 |    4-15 |                12 |               48 |               0 |              0 |
| గమ్యస్థాన చిరునామా |    20 |   16-35 |                 0 |                0 |              20 |            320 |
| మొత్తం             |    32 |   36-67 |                17 |               64 |              15 |            240 |
| మొత్తం             |    68 |         |                   |              160 |                 |            576 |

వివరణ:

- **ఫంక్షన్ సెలెక్టర్**: కాంట్రాక్ట్‌లో 256 కంటే తక్కువ ఫంక్షన్‌లు ఉన్నాయి, కాబట్టి మనం వాటిని ఒకే బైట్‌తో వేరు చేయవచ్చు.
  ఈ బైట్‌లు సాధారణంగా సున్నా కానివి మరియు అందువల్ల [పదహారు గ్యాస్ ఖర్చు](https://eips.ethereum.org/EIPS/eip-2028) అవుతుంది.
- **సున్నాలు**: ఈ బైట్‌లు ఎల్లప్పుడూ సున్నాగా ఉంటాయి, ఎందుకంటే ఇరవై-బైట్ చిరునామాను నిల్వ చేయడానికి ముప్పై-రెండు-బైట్ పదం అవసరం లేదు.
  సున్నాను కలిగి ఉన్న బైట్‌లకు నాలుగు గ్యాస్ ఖర్చవుతుంది ([పసుపు పత్రాన్ని చూడండి](https://ethereum.github.io/yellowpaper/paper.pdf), అనుబంధం G,
  p. 27, `G`<sub>`txdatazero`</sub> కోసం విలువ).
- **మొత్తం**: ఈ కాంట్రాక్ట్‌లో `డెసిమల్స్` పద్దెనిమిది (సాధారణ విలువ) అని మరియు మేము బదిలీ చేసే టోకెన్ల గరిష్ట మొత్తం 10<sup>18</sup> అని మనం ఊహించుకుంటే, మనం 10<sup>36</sup> గరిష్ట మొత్తాన్ని పొందుతాము.
  256<sup>15</sup> > 10<sup>36</sup>, కాబట్టి పదిహేను బైట్‌లు సరిపోతాయి.

L1లో 160 గ్యాస్ వృధా కావడం సాధారణంగా చాలా తక్కువ. ఒక లావాదేవీకి కనీసం [21,000 గ్యాస్](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) ఖర్చవుతుంది, కాబట్టి అదనపు 0.8% పట్టింపు లేదు.
అయితే, L2లో, విషయాలు భిన్నంగా ఉంటాయి. లావాదేవీ మొత్తం ఖర్చు దాదాపుగా దానిని L1కి వ్రాయడమే.
లావాదేవీ కాల్‌డేటాతో పాటు, 109 బైట్ల లావాదేవీ హెడర్ (గమ్యస్థాన చిరునామా, సంతకం మొదలైనవి) ఉంటుంది.
అందువల్ల మొత్తం ఖర్చు `109*16+576+160=2480`, మరియు మనం అందులో సుమారు 6.5% వృధా చేస్తున్నాము.

## మీరు గమ్యస్థానాన్ని నియంత్రించనప్పుడు ఖర్చులను తగ్గించడం {#reducing-costs-when-you-dont-control-the-destination}

గమ్యస్థాన కాంట్రాక్ట్‌పై మీకు నియంత్రణ లేదని అనుకుంటే, మీరు ఇప్పటికీ [దీని](https://github.com/qbzzt/ethereum.org-20220330-shortABI) లాంటి పరిష్కారాన్ని ఉపయోగించవచ్చు.
సంబంధిత ఫైళ్లను చూద్దాం.

### Token.sol {#token-sol}

[ఇది గమ్యస్థాన కాంట్రాక్ట్](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
ఇది ఒక అదనపు ఫీచర్‌తో కూడిన ప్రామాణిక ERC-20 కాంట్రాక్ట్.
ఈ `faucet` ఫంక్షన్ ఏ వినియోగదారుడైనా ఉపయోగించడానికి కొన్ని టోకెన్‌లను పొందడానికి అనుమతిస్తుంది.
ఇది ఉత్పత్తి ERC-20 కాంట్రాక్ట్‌ను పనికిరానిదిగా చేస్తుంది, కానీ ఒక ERC-20 కేవలం పరీక్షను సులభతరం చేయడానికి ఉన్నప్పుడు ఇది జీవితాన్ని సులభతరం చేస్తుంది.

```solidity
    /**
     * @dev కాలర్‌కు ఆడుకోవడానికి 1000 టోకెన్‌లను ఇస్తుంది
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[ఇది తక్కువ కాల్‌డేటాతో లావాదేవీలు కాల్ చేయాల్సిన కాంట్రాక్ట్](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
దాన్ని లైన్ వారీగా చూద్దాం.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

దాన్ని ఎలా కాల్ చేయాలో తెలుసుకోవడానికి మనకు టోకెన్ ఫంక్షన్ అవసరం.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

మనం ప్రాక్సీగా ఉన్న టోకెన్ చిరునామా.

```solidity
    /**
     * @dev టోకెన్ చిరునామాను పేర్కొనండి
     * @param tokenAddr_ ERC-20 కాంట్రాక్ట్ చిరునామా
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

టోకెన్ చిరునామా మాత్రమే మనం పేర్కొనవలసిన పారామీటర్.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

కాల్‌డేటా నుండి ఒక విలువను చదవండి.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal పొడవు పరిమితి 32 బైట్లు");

        require(length + startByte <= msg.data.length,
            "calldataVal కాల్‌డేటాసైజ్ దాటి చదవడానికి ప్రయత్నిస్తోంది");
```

మనం ఒకే 32-బైట్ (256-బిట్) పదాన్ని మెమరీకి లోడ్ చేయబోతున్నాము మరియు మనకు కావలసిన ఫీల్డ్‌లో భాగం కాని బైట్‌లను తీసివేయబోతున్నాము.
ఈ అల్గోరిథం 32 బైట్ల కంటే ఎక్కువ పొడవు ఉన్న విలువల కోసం పని చేయదు మరియు వాస్తవానికి మనం కాల్‌డేటా చివరిని దాటి చదవలేము.
L1లో గ్యాస్‌ను ఆదా చేయడానికి ఈ పరీక్షలను దాటవేయడం అవసరం కావచ్చు, కానీ L2లో గ్యాస్ చాలా చౌకగా ఉంటుంది, ఇది మనం ఆలోచించగల ఏవైనా శానిటీ చెక్‌లను అనుమతిస్తుంది.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

మనం `fallback()` (క్రింద చూడండి) కు కాల్ నుండి డేటాను కాపీ చేసి ఉండవచ్చు, కానీ EVM యొక్క అసెంబ్లీ భాష అయిన [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)ను ఉపయోగించడం సులభం.

ఇక్కడ మనం `startByte` నుండి `startByte+31` వరకు బైట్‌లను స్టాక్‌లోకి చదవడానికి [CALLDATALOAD ఆప్‌కోడ్](https://www.evm.codes/#35)ను ఉపయోగిస్తాము.
సాధారణంగా, Yulలోని ఒక ఆప్‌కోడ్ యొక్క సింటాక్స్ `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity
        _retVal = _retVal >> (256-length*8);
```

అత్యంత ముఖ్యమైన `length` బైట్‌లు మాత్రమే ఫీల్డ్‌లో భాగంగా ఉంటాయి, కాబట్టి ఇతర విలువలను వదిలించుకోవడానికి మేము [రైట్-షిఫ్ట్](https://en.wikipedia.org/wiki/Logical_shift) చేస్తాము.
ఇది విలువను ఫీల్డ్ యొక్క కుడి వైపుకు తరలించే అదనపు ప్రయోజనాన్ని కలిగి ఉంది, కాబట్టి ఇది విలువ 256<sup>something</sup> రెట్లు కాకుండా స్వయంగా విలువ అవుతుంది.

```solidity
        return _retVal;
    }


    fallback() external {
```

Solidity కాంట్రాక్ట్‌కు చేసిన కాల్ ఏ ఫంక్షన్ సంతకాలతో సరిపోలకపోతే, అది [the `fallback()` ఫంక్షన్](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)ను కాల్ చేస్తుంది (ఒకటి ఉందని ఊహిస్తూ).
`CalldataInterpreter` విషయంలో, _ఏ_ కాల్ అయినా ఇక్కడికి వస్తుంది ఎందుకంటే ఇతర `external` లేదా `public` ఫంక్షన్‌లు లేవు.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

కాల్‌డేటా యొక్క మొదటి బైట్‌ను చదవండి, ఇది మనకు ఫంక్షన్‌ను తెలియజేస్తుంది.
ఇక్కడ ఒక ఫంక్షన్ అందుబాటులో లేకపోవడానికి రెండు కారణాలు ఉన్నాయి:

1. `pure` లేదా `view`గా ఉండే ఫంక్షన్‌లు స్థితిని మార్చవు మరియు గ్యాస్ ఖర్చు చేయవు (ఆఫ్‌చెయిన్‌లో కాల్ చేసినప్పుడు).
   వాటి గ్యాస్ ధరను తగ్గించడానికి ప్రయత్నించడంలో అర్థం లేదు.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)పై ఆధారపడే ఫంక్షన్‌లు.
   `msg.sender` యొక్క విలువ కాలర్ కాదు, `CalldataInterpreter` యొక్క చిరునామా అవుతుంది.

దురదృష్టవశాత్తు, [ERC-20 స్పెసిఫికేషన్‌లను చూస్తే](https://eips.ethereum.org/EIPS/eip-20), ఇది కేవలం ఒక ఫంక్షన్, `transfer`ను మాత్రమే వదిలివేస్తుంది.
ఇది మనకు కేవలం రెండు ఫంక్షన్‌లను మాత్రమే మిగిల్చింది: `transfer` (ఎందుకంటే మనం `transferFrom`ని కాల్ చేయవచ్చు) మరియు `faucet` (ఎందుకంటే మనల్ని పిలిచిన వారికి టోకెన్‌లను తిరిగి బదిలీ చేయవచ్చు).

```solidity
        // కాల్‌డేటా నుండి సమాచారాన్ని ఉపయోగించి
        // టోకెన్ యొక్క స్థితిని మార్చే పద్ధతులను కాల్ చేయండి

        // ఫాసెట్
        if (_func == 1) {
```

`faucet()`కు కాల్, దీనికి పారామితులు లేవు.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

మనం `token.faucet()`ని కాల్ చేసిన తర్వాత మనకు టోకెన్‌లు వస్తాయి. అయితే, ప్రాక్సీ కాంట్రాక్ట్‌గా, మాకు టోకెన్‌లు **అవసరం** లేదు.
మనల్ని పిలిచిన EOA (బాహ్యంగా యాజమాన్యంలోని ఖాతా) లేదా కాంట్రాక్ట్‌కు అవసరం.
కాబట్టి మనం మన టోకెన్లన్నింటినీ మనల్ని పిలిచిన వారికి బదిలీ చేస్తాము.

```solidity
        // బదిలీ (దానికి మాకు అనుమతి ఉందని ఊహించుకోండి)
        if (_func == 2) {
```

టోకెన్లను బదిలీ చేయడానికి రెండు పారామితులు అవసరం: గమ్యస్థాన చిరునామా మరియు మొత్తం.

```solidity
            token.transferFrom(
                msg.sender,
```

కాలర్‌లు వారి స్వంత టోకెన్‌లను బదిలీ చేయడానికి మాత్రమే మేము అనుమతిస్తాము

```solidity
                address(uint160(calldataVal(1, 20))),
```

గమ్యస్థాన చిరునామా బైట్ #1 వద్ద ప్రారంభమవుతుంది (బైట్ #0 ఫంక్షన్).
చిరునామాగా, ఇది 20-బైట్ల పొడవు ఉంటుంది.

```solidity
                calldataVal(21, 2)
```

ఈ ప్రత్యేక కాంట్రాక్ట్ కోసం, ఎవరైనా బదిలీ చేయాలనుకునే గరిష్ట సంఖ్యలో టోకెన్‌లు రెండు బైట్‌లలో (65536 కంటే తక్కువ) సరిపోతాయని మేము ఊహిస్తాము.

```solidity
            );
        }
```

మొత్తంమీద, బదిలీకి 35 బైట్ల కాల్‌డేటా పడుతుంది:

| విభాగం             | పొడవు | బైట్‌లు |
| ------------------ | ----: | ------: |
| ఫంక్షన్ సెలెక్టర్  |     1 |       0 |
| గమ్యస్థాన చిరునామా |    32 |    1-32 |
| మొత్తం             |     2 |   33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[ఈ జావాస్క్రిప్ట్ యూనిట్ టెస్ట్](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ఈ మెకానిజంను ఎలా ఉపయోగించాలో (మరియు అది సరిగ్గా పనిచేస్తుందో లేదో ఎలా ధృవీకరించాలో) చూపిస్తుంది.
మీకు [chai](https://www.chaijs.com/) మరియు [ethers](https://docs.ethers.io/v5/) గురించి అర్థమైందని నేను భావిస్తున్నాను మరియు కాంట్రాక్ట్‌కు ప్రత్యేకంగా వర్తించే భాగాలను మాత్రమే వివరిస్తాను.

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

రెండు కాంట్రాక్టులను డిప్లోయ్ చేయడం ద్వారా మేము ప్రారంభిస్తాము.

```javascript
    // Get tokens to play with
    const faucetTx = {
```

లావాదేవీలను సృష్టించడానికి మేము సాధారణంగా ఉపయోగించే ఉన్నత-స్థాయి ఫంక్షన్‌లను (ఉదాహరణకు `token.faucet()`) ఉపయోగించలేము, ఎందుకంటే మేము ABIని అనుసరించడం లేదు.
బదులుగా, మనమే లావాదేవీని నిర్మించి, ఆపై పంపాలి.

```javascript
      to: cdi.address,
      data: "0x01"
```

లావాదేవీ కోసం మనం అందించాల్సిన రెండు పారామితులు ఉన్నాయి:

1. `to`, గమ్యస్థాన చిరునామా.
   ఇది కాల్‌డేటా ఇంటర్‌ప్రెటర్ కాంట్రాక్ట్.
2. `data`, పంపాల్సిన కాల్‌డేటా.
   ఫాసెట్ కాల్ విషయంలో, డేటా ఒకే బైట్, `0x01`.

```javascript
    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

మేము [సైనర్ యొక్క `sendTransaction` పద్ధతిని](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) కాల్ చేస్తాము ఎందుకంటే మేము ఇప్పటికే గమ్యాన్ని (`faucetTx.to`) పేర్కొన్నాము మరియు లావాదేవీపై సంతకం చేయాలి.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

ఇక్కడ మేము బ్యాలెన్స్‌ని ధృవీకరిస్తాము.
`view` ఫంక్షన్లపై గ్యాస్ ఆదా చేయాల్సిన అవసరం లేదు, కాబట్టి మేము వాటిని సాధారణంగా నడుపుతాము.

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

బదిలీలు చేయడానికి కాల్‌డేటా ఇంటర్‌ప్రెటర్‌కు అనుమతి ఇవ్వండి.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

బదిలీ లావాదేవీని సృష్టించండి. మొదటి బైట్ "0x02", తర్వాత గమ్యస్థాన చిరునామా, మరియు చివరగా మొత్తం (0x0100, ఇది దశాంశంలో 256).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## మీరు గమ్యస్థాన కాంట్రాక్ట్‌ను నియంత్రించినప్పుడు ఖర్చులను తగ్గించడం {#reducing-the-cost-when-you-do-control-the-destination-contract}

మీరు గమ్యస్థాన కాంట్రాక్ట్‌పై నియంత్రణ కలిగి ఉంటే, మీరు కాల్‌డేటా ఇంటర్‌ప్రెటర్‌ను విశ్వసించే కారణంగా `msg.sender` తనిఖీలను దాటవేసే ఫంక్షన్‌లను సృష్టించవచ్చు.
[ఇది ఎలా పనిచేస్తుందో మీరు ఇక్కడ ఒక ఉదాహరణను `control-contract` బ్రాంచ్‌లో చూడవచ్చు](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

కాంట్రాక్ట్ బాహ్య లావాదేవీలకు మాత్రమే ప్రతిస్పందిస్తున్నట్లయితే, మనం కేవలం ఒక కాంట్రాక్ట్‌తో సరిపెట్టుకోవచ్చు.
అయితే, అది [కంపోజబిలిటీ](/developers/docs/smart-contracts/composability/)ని దెబ్బతీస్తుంది.
సాధారణ ERC-20 కాల్స్‌కు ప్రతిస్పందించే కాంట్రాక్ట్, మరియు చిన్న కాల్ డేటాతో లావాదేవీలకు ప్రతిస్పందించే మరొక కాంట్రాక్ట్ ఉండటం చాలా మంచిది.

### Token.sol {#token-sol-2}

ఈ ఉదాహరణలో మనం `Token.sol`ని మార్చవచ్చు.
ఇది ప్రాక్సీ మాత్రమే కాల్ చేయగల అనేక ఫంక్షన్‌లను కలిగి ఉండటానికి మాకు అనుమతిస్తుంది.
కొత్త భాగాలు ఇక్కడ ఉన్నాయి:

```solidity
    // CalldataInterpreter చిరునామాను పేర్కొనడానికి అనుమతించబడిన ఏకైక చిరునామా
    address owner;

    // CalldataInterpreter చిరునామా
    address proxy = address(0);
```

ERC-20 కాంట్రాక్ట్‌కు అధీకృత ప్రాక్సీ యొక్క గుర్తింపు తెలియాలి.
అయితే, మనం ఈ వేరియబుల్‌ని కన్‌స్ట్రక్టర్‌లో సెట్ చేయలేము, ఎందుకంటే మనకు ఇంకా విలువ తెలియదు.
ఈ కాంట్రాక్ట్ మొదట ఇన్‌స్టాన్షియేట్ చేయబడింది ఎందుకంటే ప్రాక్సీ దాని కన్‌స్ట్రక్టర్‌లో టోకెన్ చిరునామాను ఆశిస్తుంది.

```solidity
    /**
     * @dev ERC20 కన్‌స్ట్రక్టర్‌ను పిలుస్తుంది.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

సృష్టికర్త యొక్క చిరునామా (దీనిని `owner` అని పిలుస్తారు) ఇక్కడ నిల్వ చేయబడుతుంది ఎందుకంటే ప్రాక్సీని సెట్ చేయడానికి అనుమతించబడిన ఏకైక చిరునామా అదే.

```solidity
    /**
     * @dev ప్రాక్సీ (CalldataInterpreter) కోసం చిరునామాను సెట్ చేయండి.
     * యజమాని ద్వారా ఒక్కసారి మాత్రమే కాల్ చేయవచ్చు
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

ప్రాక్సీకి విశేష ప్రాప్యత ఉంది, ఎందుకంటే ఇది భద్రతా తనిఖీలను దాటవేయగలదు.
మేము ప్రాక్సీని విశ్వసించగలమని నిర్ధారించుకోవడానికి మేము `owner` ని మాత్రమే ఈ ఫంక్షన్‌ను కాల్ చేయడానికి అనుమతిస్తాము మరియు ఒక్కసారి మాత్రమే.
`proxy` కి నిజమైన విలువ (సున్నా కాదు) ఒకసారి ఉంటే, ఆ విలువ మారదు, కాబట్టి యజమాని మోసపూరితంగా మారాలని నిర్ణయించుకున్నా, లేదా దాని కోసం స్మృతిచిహ్నం వెల్లడైనా, మేము ఇప్పటికీ సురక్షితంగా ఉన్నాము.

```solidity
    /**
     * @dev కొన్ని ఫంక్షన్లను ప్రాక్సీ ద్వారా మాత్రమే కాల్ చేయవచ్చు.
     */
    modifier onlyProxy {
```

ఇది ఒక [`modifier` ఫంక్షన్](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), ఇది ఇతర ఫంక్షన్లు పనిచేసే విధానాన్ని మారుస్తుంది.

```solidity
      require(msg.sender == proxy);
```

మొదట, మేము ప్రాక్సీ ద్వారా పిలువబడ్డామని మరియు మరెవరూ కాదని ధృవీకరించండి.
కాకపోతే, `revert` చేయండి.

```solidity
      _;
    }
```

అలా అయితే, మేము సవరించే ఫంక్షన్‌ను అమలు చేయండి.

```solidity
   /* ఖాతాల కోసం ప్రాక్సీని వాస్తవానికి ప్రాక్సీ చేయడానికి అనుమతించే ఫంక్షన్లు */

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

ఇవి మూడు కార్యకలాపాలు, వీటికి సాధారణంగా టోకెన్లను బదిలీ చేసే లేదా అనుమతిని ఆమోదించే సంస్థ నుండి నేరుగా సందేశం రావాలి.
ఇక్కడ ఈ కార్యకలాపాల యొక్క ప్రాక్సీ వెర్షన్ ఉంది:

1. `onlyProxy()` ద్వారా సవరించబడింది, కాబట్టి మరెవరూ వాటిని నియంత్రించడానికి అనుమతించబడరు.
2. సాధారణంగా `msg.sender` గా ఉండే చిరునామాను అదనపు పారామీటర్‌గా పొందుతుంది.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

కాల్‌డేటా ఇంటర్‌ప్రెటర్ పైన ఉన్న దానితో దాదాపు సమానంగా ఉంటుంది, ప్రాక్సీ చేయబడిన ఫంక్షన్‌లు `msg.sender` పారామీటర్‌ను స్వీకరిస్తాయి మరియు `ట్రాన్స్‌ఫర్` కోసం అనుమతి అవసరం లేదు.

```solidity
        // బదిలీ (అనుమతి అవసరం లేదు)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // ఆమోదించండి
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // బదిలీFrom
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

మునుపటి పరీక్ష సంకేత భాష మరియు దీని మధ్య కొన్ని మార్పులు ఉన్నాయి.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ఏ ప్రాక్సీని విశ్వసించాలో ERC-20 కాంట్రాక్ట్‌కు మనం చెప్పాలి

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` మరియు `transferFrom()` ని తనిఖీ చేయడానికి మనకు రెండవ సైనర్ అవసరం.
మేము దానిని `poorSigner` అని పిలుస్తాము ఎందుకంటే దానికి మా టోకెన్లు ఏవీ రావు (దానికి ETH ఉండాలి, వాస్తవానికి).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 కాంట్రాక్ట్ ప్రాక్సీ (`cdi`) ని విశ్వసిస్తున్నందున, బదిలీలను రిలే చేయడానికి మాకు అనుమతి అవసరం లేదు.

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

రెండు కొత్త ఫంక్షన్లను పరీక్షించండి.
`transferFromTx` కి రెండు చిరునామా పారామితులు అవసరమని గమనించండి: అనుమతి ఇచ్చేవాడు మరియు గ్రహీత.

## ముగింపు {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) మరియు [Arbitrum](https://developer.offchainlabs.com/docs/special_features) రెండూ L1కి వ్రాయబడిన కాల్‌డేటా పరిమాణాన్ని మరియు అందువల్ల లావాదేవీల ఖర్చును తగ్గించే మార్గాలను అన్వేషిస్తున్నాయి.
అయితే, సాధారణ పరిష్కారాల కోసం చూస్తున్న మౌలిక సదుపాయాల ప్రదాతలుగా, మా సామర్థ్యాలు పరిమితంగా ఉన్నాయి.
డాప్స్ డెవలపర్‌గా, మీకు అప్లికేషన్-నిర్దిష్ట పరిజ్ఞానం ఉంది, ఇది ఒక సాధారణ పరిష్కారంలో మేము చేయగలిగిన దానికంటే మెరుగ్గా మీ కాల్‌డేటాను ఆప్టిమైజ్ చేయడానికి మిమ్మల్ని అనుమతిస్తుంది.
ఈ ఆర్టికల్ మీ అవసరాలకు ఆదర్శవంతమైన పరిష్కారాన్ని కనుగొనడంలో మీకు సహాయపడుతుందని ఆశిస్తున్నాము.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

