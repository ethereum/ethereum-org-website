---
title: "కాల్ డేటా ఆప్టిమైజేషన్ కోసం షార్ట్ ABIలు"
description: "ఆప్టిమిస్టిక్ రోల్అప్‌ల కోసం స్మార్ట్ కాంట్రాక్ట్‌లను ఆప్టిమైజ్ చేయడం"
author: "ఓరి పోమెరాంట్జ్"
lang: te
tags: ["లేయర్ 2 (L2)"]
skill: intermediate
breadcrumb: "షార్ట్ ABIలు"
published: 2022-04-01
---

## పరిచయం {#introduction}

ఈ ఆర్టికల్‌లో, మీరు [ఆప్టిమిస్టిక్ రోల్అప్‌లు](/developers/docs/scaling/optimistic-rollups), వాటిపై లావాదేవీల ఖర్చు మరియు ఆ విభిన్న వ్యయ నిర్మాణం ఎథీరియం మెయిన్‌నెట్‌లో కంటే విభిన్న విషయాల కోసం ఆప్టిమైజ్ చేయడానికి మనల్ని ఎలా కోరుతుందో తెలుసుకుంటారు.
ఈ ఆప్టిమైజేషన్‌ను ఎలా అమలు చేయాలో కూడా మీరు నేర్చుకుంటారు.

### పూర్తి బహిర్గతం {#full-disclosure}

నేను పూర్తి సమయం [Optimism](https://www.optimism.io/) ఉద్యోగిని, కాబట్టి ఈ ఆర్టికల్‌లోని ఉదాహరణలు Optimismలో రన్ అవుతాయి.
అయినప్పటికీ, ఇక్కడ వివరించిన సాంకేతికత ఇతర రోల్అప్‌లకు కూడా అంతే బాగా పనిచేస్తుంది.

### పదజాలం {#terminology}

రోల్అప్‌ల గురించి చర్చిస్తున్నప్పుడు, 'లేయర్ 1 (L1)' అనే పదం ప్రొడక్షన్ ఎథీరియం నెట్‌వర్క్ అయిన మెయిన్‌నెట్ కోసం ఉపయోగించబడుతుంది.
'లేయర్ 2 (L2)' అనే పదం రోలప్ లేదా భద్రత కోసం L1పై ఆధారపడే కానీ దాని ప్రాసెసింగ్‌లో ఎక్కువ భాగం ఆఫ్‌చైన్‌లో చేసే ఏదైనా ఇతర సిస్టమ్ కోసం ఉపయోగించబడుతుంది.

## L2 లావాదేవీల ఖర్చును మనం మరింత ఎలా తగ్గించవచ్చు? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[ఆప్టిమిస్టిక్ రోల్అప్‌లు](/developers/docs/scaling/optimistic-rollups) ప్రతి చారిత్రక లావాదేవీ రికార్డును భద్రపరచాలి, తద్వారా ఎవరైనా వాటిని పరిశీలించి ప్రస్తుత స్థితి సరైనదేనా అని ధృవీకరించగలరు.
ఈ ఆర్టికల్ రాసినప్పుడు, ఎథీరియం మెయిన్‌నెట్‌లోకి డేటాను పొందడానికి చౌకైన మార్గం దానిని కాల్ డేటాగా రాయడం.
ఈ పరిష్కారాన్ని [Optimism](https://docs.optimism.io/op-stack/protocol/overview) మరియు [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) రెండూ ఎంచుకున్నాయి.
Dencun అప్‌గ్రేడ్ (మార్చి 2024) నుండి, రోల్అప్‌లు ఈ డేటాను బదులుగా [బ్లాబ్‌లలో](/roadmap/danksharding/) పోస్ట్ చేయగలవు, ఇవి చాలా చౌకైనవి.

### L2 లావాదేవీల ఖర్చు {#cost-of-l2-transactions}

L2 లావాదేవీల ఖర్చు రెండు భాగాలను కలిగి ఉంటుంది:

1. L2 ప్రాసెసింగ్, ఇది సాధారణంగా చాలా చౌకగా ఉంటుంది
2. L1 నిల్వ, ఇది మెయిన్‌నెట్ గ్యాస్ ఖర్చులతో ముడిపడి ఉంటుంది

నేను 2022లో ఈ ఆర్టికల్ రాసినప్పుడు, Optimismలో L2 గ్యాస్ ఖర్చు 0.001 [Gwei](/developers/docs/gas/#what-is-gas).
మరోవైపు, L1 గ్యాస్ ఖర్చు సుమారు 40 Gwei.

కాల్ డేటా యొక్క ఒక బైట్ ఖర్చు 4 గ్యాస్ (అది సున్నా అయితే) లేదా 16 గ్యాస్ (అది మరేదైనా విలువ అయితే).
EVMలో అత్యంత ఖరీదైన ఆపరేషన్లలో ఒకటి నిల్వకు రాయడం.
L2లో నిల్వకు 32-బైట్ పదాన్ని రాయడానికి గరిష్ట ఖర్చు 22100 గ్యాస్. ఆ సమయంలో, ఇది 22.1 Gwei.
కాబట్టి మనం కాల్ డేటా యొక్క ఒకే సున్నా బైట్‌ను ఆదా చేయగలిగితే, మనం నిల్వకు సుమారు 200 బైట్‌లను రాయగలుగుతాము మరియు ఇప్పటికీ లాభంలో ఉంటాము.

#### 2024లో L2 ఖర్చులు ఎలా మారాయి {#how-l2-costs-changed-in-2024}

ఈ ఆర్టికల్ రాసినప్పటి నుండి OP స్టాక్ [L1 డేటా రుసుము](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) ఫార్ములా రెండుసార్లు మారింది:

- [Ecotone అప్‌గ్రేడ్](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (మార్చి 2024)తో, OP స్టాక్ చైన్‌లు లావాదేవీ డేటాను బ్లాబ్‌లకు పోస్ట్ చేయడం ప్రారంభించాయి, ఇవి ప్రత్యేక (మరియు సాధారణంగా చాలా తక్కువ) బ్లాబ్ ప్రాథమిక రుసుము ద్వారా ధర నిర్ణయించబడతాయి.
- [Fjord అప్‌గ్రేడ్](https://docs.optimism.io/op-stack/transactions/fees#fjord) (జూలై 2024)తో, L1 డేటా రుసుము [FastLZ](https://github.com/ariya/FastLZ) కుదింపు తర్వాత లావాదేవీ పరిమాణం యొక్క అంచనాపై ఆధారపడి ఉంటుంది, ప్రతి లావాదేవీకి కనీసం 100 బైట్‌లు ఉంటాయి ([స్పెసిఫికేషన్ చూడండి](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

ఇది ఈ ఆర్టికల్‌లోని మిగిలిన విశ్లేషణను మూడు విధాలుగా మారుస్తుంది:

1. సున్నా బైట్‌లు బాగా కుదించబడతాయి, కాబట్టి అవి దాదాపు ఉచితం.
   దిగువన ఉన్న బైట్‌కు 4 మరియు 16 గ్యాస్ గణాంకాలు L1 కాల్ డేటా ఖర్చు, ఈ రోజు OP స్టాక్ చైన్‌లో లావాదేవీ డేటా కోసం మీరు చెల్లించేది కాదు.
2. 100-బైట్ కనీస పరిమితి కంటే తక్కువ, చిన్న కాల్ డేటా దేనినీ ఆదా చేయదు.
   ఉదాహరణకు, అక్టోబర్ 2026లో OP మెయిన్‌నెట్‌లో ప్రామాణిక ERC-20 `transfer` (68 బైట్‌ల కాల్ డేటా) మరియు ఈ ఆర్టికల్‌లోని 23-బైట్ షార్ట్ వెర్షన్ ఖచ్చితంగా అదే L1 డేటా రుసుమును చెల్లించి ఉండేవి, కనీసం, సుమారు 1 Gwei (10<sup>-9</sup> ETH).
3. బ్లాబ్ స్పేస్ చౌకగా ఉన్నందున, L2 ఎగ్జిక్యూషన్ రుసుము ఇప్పుడు తరచుగా L1 డేటా రుసుము కంటే ఎక్కువగా ఉంటుంది.
   0.001 Gwei L2 గ్యాస్ ధర వద్ద, 1000 గ్యాస్ ఖర్చు 1 Gwei, ఆ మొత్తం L1 డేటా రుసుముతో సమానం, కాబట్టి ప్రతినిధి కాంట్రాక్ట్ ద్వారా వెళ్ళే అదనపు ఎగ్జిక్యూషన్ గ్యాస్ అది ఆదా చేసే బైట్‌ల కంటే ఎక్కువ ఖర్చు అవుతుంది.

సూత్రం ఇప్పటికీ వర్తిస్తుంది: తక్కువ కుదించబడిన బైట్‌లు అంటే తక్కువ L1 డేటా రుసుము.
బాగా కుదించబడని చాలా డేటా ఉన్న లావాదేవీలకు మరియు L1 డేటా ఖరీదైన చైన్‌లలో లేదా సమయాల్లో షార్ట్ ABIలు అత్యంత అర్ధవంతంగా ఉంటాయి.
నిర్దిష్ట లావాదేవీ ఎంత చెల్లిస్తుందో చూడటానికి, సంతకం చేయని లావాదేవీతో [`GasPriceOracle` ప్రీడిప్లాయ్](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) పై `getL1Fee` ని కాల్ చేయండి.
ఉదాహరణకు, [Foundry](https://getfoundry.sh/introduction/installation/) యొక్క `cast` ని ఉపయోగించి:

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

ఫలితం Weiలో ఉంటుంది.

### అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI) {#the-abi}

అత్యధిక లావాదేవీలు బాహ్య యాజమాన్య ఖాతా నుండి కాంట్రాక్ట్‌ను యాక్సెస్ చేస్తాయి.
చాలా కాంట్రాక్ట్‌లు Solidityలో వ్రాయబడ్డాయి మరియు [అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) ప్రకారం వాటి డేటా ఫీల్డ్‌ను వివరిస్తాయి.

అయితే, ABI L1 కోసం రూపొందించబడింది, ఇక్కడ కాల్ డేటా యొక్క ఒక బైట్ ఖర్చు సుమారు నాలుగు అంకగణిత ఆపరేషన్లతో సమానంగా ఉంటుంది, L2 కోసం కాదు ఇక్కడ (2022 ధరల వద్ద) కాల్ డేటా యొక్క ఒక బైట్ ఖర్చు వెయ్యికి పైగా అంకగణిత ఆపరేషన్ల కంటే ఎక్కువగా ఉంటుంది.
కాల్ డేటా ఈ విధంగా విభజించబడింది:

| విభాగం | పొడవు | బైట్‌లు | వృధా అయిన బైట్‌లు | వృధా అయిన గ్యాస్ | అవసరమైన బైట్‌లు | అవసరమైన గ్యాస్ |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| ఫంక్షన్ సెలెక్టర్ | 4 | 0-3 | 3 | 48 | 1 | 16 |
| సున్నాలు | 12 | 4-15 | 12 | 48 | 0 | 0 |
| గమ్యస్థాన చిరునామా | 20 | 16-35 | 0 | 0 | 20 | 320 |
| మొత్తం | 32 | 36-67 | 17 | 68 | 15 | 240 |
| మొత్తం | 68 | | | 164 | | 576 |

వివరణ:

- **ఫంక్షన్ సెలెక్టర్**: కాంట్రాక్ట్ 256 కంటే తక్కువ ఫంక్షన్‌లను కలిగి ఉంది, కాబట్టి మనం వాటిని ఒకే బైట్‌తో వేరు చేయవచ్చు.
  ఈ బైట్‌లు సాధారణంగా సున్నా కానివి మరియు అందువల్ల [పదహారు గ్యాస్ ఖర్చు అవుతుంది](https://eips.ethereum.org/EIPS/eip-2028).
- **సున్నాలు**: ఈ బైట్‌లు ఎల్లప్పుడూ సున్నాగా ఉంటాయి ఎందుకంటే ఇరవై-బైట్ చిరునామాను ఉంచడానికి ముప్పై-రెండు-బైట్ పదం అవసరం లేదు.
  సున్నాను కలిగి ఉన్న బైట్‌లకు నాలుగు గ్యాస్ ఖర్చు అవుతుంది ([ఎల్లో పేపర్ చూడండి](https://ethereum.github.io/yellowpaper/paper.pdf), అపెండిక్స్ G,
  పేజీ 27, `G`<sub>`txdatazero`</sub> కోసం విలువ).
- **మొత్తం**: ఈ కాంట్రాక్ట్‌లో `decimals` పద్దెనిమిది (సాధారణ విలువ) అని మరియు మనం బదిలీ చేసే టోకెన్‌ల గరిష్ట మొత్తం 10<sup>18</sup> అని మనం ఊహిస్తే, మనకు గరిష్టంగా 10<sup>36</sup> మొత్తం వస్తుంది.
  256<sup>15</sup> &gt; 10<sup>36</sup>, కాబట్టి పదిహేను బైట్‌లు సరిపోతాయి.

L1లో 164 గ్యాస్ వృధా కావడం సాధారణంగా చాలా తక్కువ. ఒక లావాదేవీకి కనీసం [21,000 గ్యాస్](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) ఖర్చవుతుంది, కాబట్టి అదనంగా 0.8% పట్టింపు లేదు.
అయితే, 2022లో L2లో, పరిస్థితులు భిన్నంగా ఉన్నాయి. లావాదేవీ యొక్క దాదాపు మొత్తం ఖర్చు దానిని L1కి రాయడమే.
లావాదేవీ కాల్ డేటాతో పాటు, 109 బైట్‌ల లావాదేవీ హెడర్ (గమ్యస్థాన చిరునామా, సంతకం మొదలైనవి) ఉన్నాయి.
కాబట్టి మొత్తం ఖర్చు `109*16+576+164=2484`, మరియు మనం అందులో సుమారు 6.6% వృధా చేస్తున్నాము.

## మీరు గమ్యస్థానాన్ని నియంత్రించనప్పుడు ఖర్చులను తగ్గించడం {#reducing-costs-when-you-dont-control-the-destination}

మీకు గమ్యస్థాన కాంట్రాక్ట్‌పై నియంత్రణ లేదని ఊహిస్తే, మీరు ఇప్పటికీ [దీనిలాంటి](https://github.com/qbzzt/ethereum.org-20220330-shortABI) పరిష్కారాన్ని ఉపయోగించవచ్చు.

దీన్ని రన్ చేయడానికి, మీకు [Node.js](https://nodejs.org/) మరియు git అవసరం:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

ఈ పరీక్ష కాంట్రాక్ట్‌లను Hardhat యొక్క అంతర్నిర్మిత స్థానిక నెట్‌వర్క్‌కు డిప్లాయ్ చేస్తుంది, కాబట్టి మీకు ఎలాంటి ETH అవసరం లేదు.
రిపోజిటరీ Hardhat 2.9ని ఉపయోగిస్తుంది, కాబట్టి Node.js యొక్క ప్రస్తుత వెర్షన్‌లలో మీ Node.js వెర్షన్‌కు మద్దతు లేదని ఇది హెచ్చరిస్తుంది, కానీ పరీక్ష ఇప్పటికీ పాస్ అవుతుంది.

సంబంధిత ఫైల్‌లను పరిశీలిద్దాం.

### Token.sol {#token-sol}

[ఇది గమ్యస్థాన కాంట్రాక్ట్](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
ఇది ఒక అదనపు ఫీచర్‌తో కూడిన ప్రామాణిక ERC-20 కాంట్రాక్ట్.
ఈ `faucet` ఫంక్షన్ ఏ వినియోగదారుకైనా ఉపయోగించడానికి కొంత టోకెన్‌ను పొందేలా చేస్తుంది.
ఇది ప్రొడక్షన్ ERC-20 కాంట్రాక్ట్‌ను పనికిరాకుండా చేస్తుంది, కానీ కేవలం టెస్టింగ్‌ను సులభతరం చేయడానికి మాత్రమే ERC-20 ఉన్నప్పుడు ఇది పనిని సులభతరం చేస్తుంది.

```solidity
    /**
     * @dev ఆడుకోవడానికి కాలర్‌కు 1000 టోకెన్‌లను ఇస్తుంది
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[ఇది చిన్న కాల్ డేటాతో లావాదేవీలు కాల్ చేయాల్సిన కాంట్రాక్ట్](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
దీన్ని లైన్ బై లైన్ పరిశీలిద్దాం.

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

మనం ప్రతినిధిగా ఉన్న టోకెన్ యొక్క చిరునామా.

```solidity

    /**
     * @dev టోకెన్ చిరునామాను పేర్కొనండి
     * @param tokenAddr_ ERC-20 కాంట్రాక్ట్ చిరునామా
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // కన్స్ట్రక్టర్
```

మనం పేర్కొనవలసిన ఏకైక పరామితి టోకెన్ చిరునామా.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

కాల్ డేటా నుండి విలువను చదవండి.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

మనం మెమరీకి ఒకే 32-బైట్ (256-బిట్) పదాన్ని లోడ్ చేయబోతున్నాము మరియు మనకు కావాల్సిన ఫీల్డ్‌లో భాగం కాని బైట్‌లను తీసివేయబోతున్నాము.
ఈ అల్గారిథమ్ 32 బైట్‌ల కంటే ఎక్కువ పొడవు ఉన్న విలువల కోసం పనిచేయదు మరియు కాల్ డేటా ముగింపును దాటి మనం చదవలేము.
L1లో గ్యాస్‌ను ఆదా చేయడానికి ఈ పరీక్షలను దాటవేయడం అవసరం కావచ్చు, కానీ L2లో గ్యాస్ చాలా చౌకగా ఉంటుంది, ఇది మనం ఆలోచించగల ఏవైనా తనిఖీలను అనుమతిస్తుంది.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

మనం కాల్ నుండి డేటాను `fallback()` కు కాపీ చేసి ఉండవచ్చు (క్రింద చూడండి), కానీ EVM యొక్క అసెంబ్లీ భాష అయిన [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) ని ఉపయోగించడం సులభం.

ఇక్కడ మనం స్టాక్‌లోకి `startByte` నుండి `startByte+31` బైట్‌లను చదవడానికి [CALLDATALOAD ఆప్‌కోడ్](https://www.evm.codes/#35) ని ఉపయోగిస్తాము.
సాధారణంగా, Yulలో ఆప్‌కోడ్ యొక్క సింటాక్స్ `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

అత్యంత ముఖ్యమైన `length` బైట్‌లు మాత్రమే ఫీల్డ్‌లో భాగం, కాబట్టి ఇతర విలువలను వదిలించుకోవడానికి మనం [కుడివైపుకి మారుస్తాము (right-shift)](https://en.wikipedia.org/wiki/Logical_shift).
ఇది విలువను ఫీల్డ్ యొక్క కుడి వైపుకు తరలించే అదనపు ప్రయోజనాన్ని కలిగి ఉంది, కాబట్టి ఇది విలువ ఇంటూ 256<sup>ఏదో ఒకటి</sup> కాకుండా విలువ మాత్రమే అవుతుంది.

```solidity

        return _retVal;
    }


    fallback() external {
```

Solidity కాంట్రాక్ట్‌కు కాల్ ఏ ఫంక్షన్ సంతకాలతో సరిపోలకపోతే, అది [`fallback()` ఫంక్షన్](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) ని కాల్ చేస్తుంది (ఒకటి ఉందని ఊహిస్తే).
`CalldataInterpreter` విషయంలో, ఇతర `external` లేదా `public` ఫంక్షన్‌లు లేనందున _ఏదైనా_ కాల్ ఇక్కడికి వస్తుంది.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

కాల్ డేటా యొక్క మొదటి బైట్‌ను చదవండి, ఇది మనకు ఫంక్షన్‌ను చెబుతుంది.
ఇక్కడ ఫంక్షన్ అందుబాటులో ఉండకపోవడానికి రెండు కారణాలు ఉన్నాయి:

1. `pure` లేదా `view` అయిన ఫంక్షన్‌లు స్థితిని మార్చవు మరియు గ్యాస్ ఖర్చు చేయవు (ఆఫ్‌చైన్‌లో కాల్ చేసినప్పుడు).
   వాటి గ్యాస్ ఖర్చును తగ్గించడానికి ప్రయత్నించడంలో అర్థం లేదు.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) పై ఆధారపడే ఫంక్షన్‌లు.
   `msg.sender` యొక్క విలువ `CalldataInterpreter` యొక్క చిరునామా అవుతుంది, కాలర్ కాదు.

దురదృష్టవశాత్తు, [ERC-20 స్పెసిఫికేషన్‌లను పరిశీలిస్తే](https://eips.ethereum.org/EIPS/eip-20), ఇది ఒక ప్రామాణిక ఫంక్షన్, `transfer` ని మాత్రమే వదిలివేస్తుంది (ఎందుకంటే మనం `transferFrom` ని కాల్ చేయవచ్చు).
మన టెస్ట్ టోకెన్ `faucet` ని కూడా కలిగి ఉంది, దీనికి మనం మద్దతు ఇవ్వగలము ఎందుకంటే మనల్ని ఎవరు కాల్ చేసినా వారికి టోకెన్‌లను తిరిగి బదిలీ చేయవచ్చు.

```solidity

        // టోకెన్ యొక్క స్థితిని మార్చే పద్ధతులను కాల్ చేయండి, దీనిని ఉపయోగించి
        // కాల్ డేటా నుండి సమాచారం

        // ఫాసెట్
        if (_func == 1) {
```

పారామితులు లేని `faucet()` కు కాల్.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

మనం `token.faucet()` ని కాల్ చేసిన తర్వాత మనకు టోకెన్‌లు వస్తాయి. అయితే, ప్రతినిధి కాంట్రాక్ట్‌గా, మనకు టోకెన్‌లు **అవసరం** లేదు.
మనల్ని కాల్ చేసిన EOA (బాహ్య యాజమాన్య ఖాతా) లేదా కాంట్రాక్ట్‌కు అవి అవసరం.
కాబట్టి మనల్ని ఎవరు కాల్ చేసినా వారికి మన టోకెన్‌లన్నింటినీ బదిలీ చేస్తాము.

```solidity
        // బదిలీ (దీని కోసం మనకు అనుమతి మొత్తం ఉందని అనుకుందాం)
        if (_func == 2) {
```

టోకెన్‌లను బదిలీ చేయడానికి రెండు పారామితులు అవసరం: గమ్యస్థాన చిరునామా మరియు మొత్తం.

```solidity
            token.transferFrom(
                msg.sender,
```

కాలర్‌లు తమ స్వంత టోకెన్‌లను బదిలీ చేయడానికి మాత్రమే మనం అనుమతిస్తాము

```solidity
                address(uint160(calldataVal(1, 20))),
```

గమ్యస్థాన చిరునామా బైట్ #1 వద్ద ప్రారంభమవుతుంది (బైట్ #0 ఫంక్షన్).
చిరునామాగా, ఇది 20-బైట్‌ల పొడవు ఉంటుంది.

```solidity
                calldataVal(21, 2)
```

ఈ నిర్దిష్ట కాంట్రాక్ట్ కోసం ఎవరైనా బదిలీ చేయాలనుకునే గరిష్ట టోకెన్‌ల సంఖ్య రెండు బైట్‌లలో (65536 కంటే తక్కువ) సరిపోతుందని మనం ఊహిస్తాము.

```solidity
            );
        }
```

మొత్తంమీద, బదిలీకి 23 బైట్‌ల కాల్ డేటా పడుతుంది:

| విభాగం | పొడవు | బైట్‌లు |
| ------------------- | -----: | ----: |
| ఫంక్షన్ సెలెక్టర్ | 1 | 0 |
| గమ్యస్థాన చిరునామా | 20 | 1-20 |
| మొత్తం | 2 | 21-22 |

```solidity
    }   // ఫాల్‌బ్యాక్

}       // కాంట్రాక్ట్ CalldataInterpreter
```

### test.js {#test-js}

[ఈ JavaScript యూనిట్ టెస్ట్](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ఈ యంత్రాంగాన్ని ఎలా ఉపయోగించాలో (మరియు ఇది సరిగ్గా పనిచేస్తుందో లేదో ఎలా ధృవీకరించాలో) మనకు చూపుతుంది.
మీకు [chai](https://www.chaijs.com/) మరియు [ethers](https://docs.ethers.org/v5/) అర్థమవుతాయని నేను ఊహిస్తున్నాను మరియు కాంట్రాక్ట్‌కు ప్రత్యేకంగా వర్తించే భాగాలను మాత్రమే వివరిస్తాను.

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

మేము రెండు కాంట్రాక్ట్‌లను డిప్లాయ్ చేయడం ద్వారా ప్రారంభిస్తాము.

```javascript
    // ఆడుకోవడానికి టోకెన్‌లను పొందండి
    const faucetTx = {
```

లావాదేవీలను సృష్టించడానికి మనం సాధారణంగా ఉపయోగించే హై-లెవల్ ఫంక్షన్‌లను (ఉదాహరణకు `token.faucet()`) ఉపయోగించలేము, ఎందుకంటే మనం ABIని అనుసరించము.
బదులుగా, మనం లావాదేవీని మనమే నిర్మించి, ఆపై దానిని పంపాలి.

```javascript
      to: cdi.address,
      data: "0x01"
```

లావాదేవీ కోసం మనం అందించాల్సిన రెండు పారామితులు ఉన్నాయి:

1. `to`, గమ్యస్థాన చిరునామా.
   ఇది కాల్ డేటా ఇంటర్‌ప్రెటర్ కాంట్రాక్ట్.
2. `data`, పంపాల్సిన కాల్ డేటా.
   ఫాసెట్ కాల్ విషయంలో, డేటా ఒకే బైట్, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

మనం [సంతకం చేసేవారి `sendTransaction` పద్ధతిని](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) కాల్ చేస్తాము ఎందుకంటే మనం ఇప్పటికే గమ్యస్థానాన్ని (`faucetTx.to`) పేర్కొన్నాము మరియు లావాదేవీకి సంతకం చేయాలి.

```javascript
// faucet టోకెన్‌లను సరిగ్గా అందిస్తుందో లేదో తనిఖీ చేయండి
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

ఇక్కడ మనం బ్యాలెన్స్‌ని ధృవీకరిస్తాము.
`view` ఫంక్షన్‌లపై గ్యాస్‌ను ఆదా చేయాల్సిన అవసరం లేదు, కాబట్టి మనం వాటిని సాధారణంగా రన్ చేస్తాము.

```javascript
// CDIకి అనుమతి మొత్తం ఇవ్వండి (ఆమోదాలను ప్రాక్సీ చేయలేము)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

బదిలీలు చేయగలిగేలా కాల్ డేటా ఇంటర్‌ప్రెటర్‌కు అనుమతి మొత్తాన్ని ఇవ్వండి.

```javascript
// టోకెన్‌లను బదిలీ చేయండి
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

బదిలీ లావాదేవీని సృష్టించండి. మొదటి బైట్ "0x02", ఆ తర్వాత గమ్యస్థాన చిరునామా మరియు చివరగా మొత్తం (0x0100, ఇది దశాంశంలో 256).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // మన వద్ద 256 టోకెన్‌లు తక్కువగా ఉన్నాయో లేదో తనిఖీ చేయండి
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // మరియు మన గమ్యస్థానం వాటిని పొందిందో లేదో
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## మీరు గమ్యస్థాన కాంట్రాక్ట్‌ను నియంత్రించినప్పుడు ఖర్చును తగ్గించడం {#reducing-the-cost-when-you-do-control-the-destination-contract}

మీకు గమ్యస్థాన కాంట్రాక్ట్‌పై నియంత్రణ ఉంటే, మీరు `msg.sender` తనిఖీలను దాటవేసే ఫంక్షన్‌లను సృష్టించవచ్చు ఎందుకంటే అవి కాల్ డేటా ఇంటర్‌ప్రెటర్‌ను విశ్వసిస్తాయి.
[ఇది ఎలా పనిచేస్తుందో దానికి ఉదాహరణను మీరు ఇక్కడ, `control-contract` బ్రాంచ్‌లో చూడవచ్చు](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
దీన్ని రన్ చేయడానికి, మీరు ఇంతకు ముందు క్లోన్ చేసిన రిపోజిటరీలోని ఆ బ్రాంచ్‌కి మారండి మరియు పరీక్షను మళ్లీ రన్ చేయండి:

```sh
git checkout control-contract
npx hardhat test
```

కాంట్రాక్ట్ బాహ్య లావాదేవీలకు మాత్రమే ప్రతిస్పందిస్తుంటే, మనం కేవలం ఒక కాంట్రాక్ట్‌ను కలిగి ఉండటం ద్వారా పని కానివ్వవచ్చు.
అయితే, అది [కూర్పు సామర్థ్యం](/developers/docs/smart-contracts/composability/)ను విచ్ఛిన్నం చేస్తుంది.
సాధారణ ERC-20 కాల్‌లకు ప్రతిస్పందించే కాంట్రాక్ట్ మరియు చిన్న కాల్ డేటాతో లావాదేవీలకు ప్రతిస్పందించే మరొక కాంట్రాక్ట్‌ను కలిగి ఉండటం చాలా మంచిది.

### Token.sol {#token-sol-2}

ఈ ఉదాహరణలో మనం `Token.sol` ని సవరించవచ్చు.
ఇది ప్రతినిధి మాత్రమే కాల్ చేయగల అనేక ఫంక్షన్‌లను కలిగి ఉండటానికి మనల్ని అనుమతిస్తుంది.
కొత్త భాగాలు ఇక్కడ ఉన్నాయి:

```solidity
    // CalldataInterpreter చిరునామాను పేర్కొనడానికి అనుమతించబడిన ఏకైక చిరునామా
    address owner;

    // CalldataInterpreter చిరునామా
    address proxy = address(0);
```

ERC-20 కాంట్రాక్ట్‌కు అధీకృత ప్రతినిధి యొక్క గుర్తింపు తెలుసుకోవాలి.
అయినప్పటికీ, మనం ఈ వేరియబుల్‌ను కన్స్ట్రక్టర్‌లో సెట్ చేయలేము, ఎందుకంటే మనకు ఇంకా విలువ తెలియదు.
ఈ కాంట్రాక్ట్ మొదట ఇన్‌స్టాన్షియేట్ చేయబడుతుంది ఎందుకంటే ప్రతినిధి దాని కన్స్ట్రక్టర్‌లో టోకెన్ చిరునామాను ఆశిస్తుంది.

```solidity
    /**
     * @dev ERC20 కన్స్ట్రక్టర్‌ను కాల్ చేస్తుంది.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

సృష్టికర్త యొక్క చిరునామా (`owner` అని పిలుస్తారు) ఇక్కడ నిల్వ చేయబడుతుంది ఎందుకంటే ప్రతినిధిని సెట్ చేయడానికి అనుమతించబడిన ఏకైక చిరునామా అదే.

```solidity
    /**
     * @dev ప్రాక్సీ (CalldataInterpreter) కోసం చిరునామాను సెట్ చేయండి.
     * యజమాని ద్వారా ఒకసారి మాత్రమే కాల్ చేయబడుతుంది
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

ప్రతినిధికి ప్రత్యేక యాక్సెస్ ఉంది, ఎందుకంటే ఇది భద్రతా తనిఖీలను దాటవేయగలదు.
మనం ప్రతినిధిని విశ్వసించగలమని నిర్ధారించుకోవడానికి మనం `owner` ని మాత్రమే ఈ ఫంక్షన్‌ను కాల్ చేయడానికి అనుమతిస్తాము మరియు అది కూడా ఒక్కసారే.
ఒకసారి `proxy` నిజమైన విలువను (సున్నా కాదు) కలిగి ఉంటే, ఆ విలువ మారదు, కాబట్టి యజమాని మోసపూరితంగా మారాలని నిర్ణయించుకున్నా, లేదా దాని కోసం నిమోనిక్ వెల్లడైనా, మనం ఇప్పటికీ సురక్షితంగా ఉంటాము.

```solidity
    /**
     * @dev కొన్ని ఫంక్షన్‌లు ప్రాక్సీ ద్వారా మాత్రమే కాల్ చేయబడతాయి.
     */
    modifier onlyProxy {
```

ఇది ఒక [`modifier` ఫంక్షన్](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), ఇది ఇతర ఫంక్షన్‌లు పనిచేసే విధానాన్ని సవరిస్తుంది.

```solidity
      require(msg.sender == proxy);
```

ముందుగా, మనం ప్రతినిధి ద్వారా కాల్ చేయబడ్డామని మరియు మరెవరి ద్వారా కాదని ధృవీకరించండి.
లేకపోతే, `revert`.

```solidity
      _;
    }
```

అలా అయితే, మనం సవరించే ఫంక్షన్‌ను రన్ చేయండి.

```solidity
   /* ఖాతాల కోసం ప్రాక్సీని వాస్తవానికి ప్రాక్సీ చేయడానికి అనుమతించే ఫంక్షన్‌లు */

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

ఇవి సాధారణంగా టోకెన్‌లను బదిలీ చేసే లేదా అనుమతి మొత్తాన్ని ఆమోదించే ఎంటిటీ నుండి నేరుగా సందేశం రావాల్సిన మూడు ఆపరేషన్‌లు.
ఇక్కడ మనకు ఈ ఆపరేషన్‌ల యొక్క ప్రతినిధి వెర్షన్ ఉంది, ఇది:

1. `onlyProxy()` ద్వారా సవరించబడింది కాబట్టి వాటిని నియంత్రించడానికి మరెవరికీ అనుమతి లేదు.
2. సాధారణంగా `msg.sender` అయ్యే చిరునామాను అదనపు పరామితిగా పొందుతుంది.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

కాల్ డేటా ఇంటర్‌ప్రెటర్ పైన ఉన్నదానితో దాదాపు సమానంగా ఉంటుంది, అయితే ప్రాక్సీ చేయబడిన ఫంక్షన్‌లు `msg.sender` పరామితిని పొందుతాయి మరియు `transfer` కోసం అనుమతి మొత్తం అవసరం లేదు.

```solidity
        // బదిలీ (అనుమతి మొత్తం అవసరం లేదు)
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

మునుపటి టెస్టింగ్ కోడ్ మరియు దీని మధ్య కొన్ని మార్పులు ఉన్నాయి.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ఏ ప్రతినిధిని విశ్వసించాలో మనం ERC-20 కాంట్రాక్ట్‌కు చెప్పాలి

```js
console.log("CalldataInterpreter addr:", cdi.address)

// అనుమతి మొత్తాలను ధృవీకరించడానికి ఇద్దరు సంతకం చేసేవారు అవసరం
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` మరియు `transferFrom()` ని తనిఖీ చేయడానికి మనకు రెండవ సంతకం చేసేవారు అవసరం.
మనం దానిని `poorSigner` అని పిలుస్తాము ఎందుకంటే ఇది మన టోకెన్‌లలో దేనినీ పొందదు (వాస్తవానికి దీనికి ETH ఉండాలి).

```js
// టోకెన్‌లను బదిలీ చేయండి
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 కాంట్రాక్ట్ ప్రతినిధిని (`cdi`) విశ్వసిస్తుంది కాబట్టి, బదిలీలను రిలే చేయడానికి మనకు అనుమతి మొత్తం అవసరం లేదు.

```js
// ఆమోదం మరియు transferFrom
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

// approve / transferFrom కాంబో సరిగ్గా జరిగిందో లేదో తనిఖీ చేయండి
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

రెండు కొత్త ఫంక్షన్‌లను పరీక్షించండి.
`transferFromTx` కి రెండు చిరునామా పారామితులు అవసరమని గమనించండి: అనుమతి మొత్తాన్ని ఇచ్చేవారు మరియు స్వీకరించేవారు.

## ముగింపు {#conclusion}

[Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) మరియు [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) రెండూ ఇప్పుడు లావాదేవీల ఖర్చును తగ్గించడానికి, L1కి రాసే డేటాను కుదిస్తాయి మరియు ప్రతి లావాదేవీకి దాని కుదించబడిన పరిమాణం ఆధారంగా ఛార్జ్ చేస్తాయి.
అయితే, సాధారణ పరిష్కారాల కోసం చూస్తున్న మౌలిక సదుపాయాల ప్రొవైడర్లుగా, మా సామర్థ్యాలు పరిమితం.
dapp డెవలపర్‌గా, మీకు అప్లికేషన్-నిర్దిష్ట జ్ఞానం ఉంది, ఇది సాధారణ పరిష్కారంలో మేము చేయగలిగిన దానికంటే మీ కాల్ డేటాను మరింత మెరుగ్గా ఆప్టిమైజ్ చేయడానికి మిమ్మల్ని అనుమతిస్తుంది.
ఈ ఆర్టికల్ మీ అవసరాలకు అనువైన పరిష్కారాన్ని కనుగొనడంలో మీకు సహాయపడుతుందని ఆశిస్తున్నాము.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).

