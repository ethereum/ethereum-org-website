---
title: "సేఫ్టీ రైల్స్‌తో ERC-20"
description: "చిన్న చిన్న తప్పులను నివారించడంలో ప్రజలకు ఎలా సహాయపడాలి"
author: "ఓరి పోమెరాంట్జ్"
lang: te
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 భద్రత"
published: 2022-08-15
---

## పరిచయం {#introduction}

ఎథీరియం గురించిన గొప్ప విషయాలలో ఒకటి ఏమిటంటే, మీ లావాదేవీలను సవరించగల లేదా రద్దు చేయగల కేంద్ర అధికారం ఏదీ లేదు. ఎథీరియంతో ఉన్న పెద్ద సమస్యలలో ఒకటి ఏమిటంటే, వినియోగదారుల తప్పులను లేదా అక్రమ లావాదేవీలను రద్దు చేసే అధికారం ఉన్న కేంద్ర అధికారం ఏదీ లేదు. ఈ ఆర్టికల్‌లో మీరు [ERC-20](/developers/docs/standards/tokens/erc-20/) టోకెన్‌లతో వినియోగదారులు చేసే కొన్ని సాధారణ తప్పుల గురించి, అలాగే ఆ తప్పులను నివారించడంలో వినియోగదారులకు సహాయపడే లేదా కేంద్ర అధికారానికి కొంత అధికారాన్ని ఇచ్చే (ఉదాహరణకు ఖాతాలను స్తంభింపజేయడానికి) ERC-20 కాంట్రాక్ట్‌లను ఎలా సృష్టించాలో నేర్చుకుంటారు.

మేము [OpenZeppelin ERC-20 టోకెన్ కాంట్రాక్ట్](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)ని ఉపయోగిస్తాము, అయితే ఈ ఆర్టికల్ దానిని చాలా వివరంగా వివరించదు అని గమనించండి. మీరు ఈ సమాచారాన్ని [ఇక్కడ](/developers/tutorials/erc20-annotated-code) కనుగొనవచ్చు.

మీరు పూర్తి సోర్స్ కోడ్‌ను చూడాలనుకుంటే:

1. [Remix IDE](https://remix.ethereum.org/)ని తెరవండి.
2. క్లోన్ GitHub చిహ్నాన్ని క్లిక్ చేయండి (![clone github icon](icon-clone.png)).
3. GitHub రిపోజిటరీ `https://github.com/qbzzt/20220815-erc20-safety-rails`ని క్లోన్ చేయండి.
4. **contracts > erc20-safety-rails.sol**ని తెరవండి.

ఈ రిపోజిటరీ OpenZeppelin Contracts 4.7.2 కోసం వ్రాయబడిందని గమనించండి, ఇక్కడ ఈ ఆర్టికల్ ఓవర్‌రైడ్ చేసే ఫంక్షన్‌ను `_beforeTokenTransfer` అని పిలుస్తారు. ఈ ఆర్టికల్ ప్రస్తుత OpenZeppelin Contracts 5.xని ఉపయోగిస్తుంది, ఇక్కడ మీరు దానికి బదులుగా `_update`ని ఓవర్‌రైడ్ చేస్తారు, కాబట్టి ఈ ఆర్టికల్‌లోని కోడ్ రిపోజిటరీలోని కోడ్ నుండి కొద్దిగా భిన్నంగా ఉంటుంది.

## ERC-20 కాంట్రాక్ట్‌ను సృష్టించడం {#creating-an-erc-20-contract}

మనం సేఫ్టీ రైల్ కార్యాచరణను జోడించడానికి ముందు మనకు ఒక ERC-20 కాంట్రాక్ట్ అవసరం. ఈ ఆర్టికల్‌లో మనం [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)ని ఉపయోగిస్తాము. దీన్ని మరొక బ్రౌజర్‌లో తెరిచి, ఈ సూచనలను అనుసరించండి:

1. **ERC20**ని ఎంచుకోండి.
2. ఈ సెట్టింగ్‌లను నమోదు చేయండి:

   | పరామితి | విలువ |
   | -------------- | ------------------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None (**Permit**ని అన్‌చెక్ చేయండి) |
   | Access Control | Ownable |
   | Upgradability | None |

3. పైకి స్క్రోల్ చేసి, వేరే వాతావరణాన్ని ఉపయోగించడానికి **Open in Remix** (Remix కోసం) లేదా **Download**ని క్లిక్ చేయండి. మీరు Remixని ఉపయోగిస్తున్నారని నేను అనుకుంటున్నాను, మీరు వేరేదాన్ని ఉపయోగిస్తే తగిన మార్పులు చేయండి.
4. ఇప్పుడు మనకు పూర్తిగా పనిచేసే ERC-20 కాంట్రాక్ట్ ఉంది. దిగుమతి చేసిన కోడ్‌ను చూడటానికి మీరు `.deps` > `npm`ని విస్తరించవచ్చు.
5. ఇది ERC-20 కాంట్రాక్ట్‌గా పనిచేస్తుందో లేదో చూడటానికి కాంట్రాక్ట్‌ను కంపైల్ చేయండి, డిప్లాయ్ చేయండి మరియు దానితో ప్రయోగాలు చేయండి. మీరు Remixని ఎలా ఉపయోగించాలో నేర్చుకోవాలనుకుంటే, [ఈ ట్యుటోరియల్‌ని ఉపయోగించండి](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## సాధారణ తప్పులు {#common-mistakes}

### తప్పులు {#the-mistakes}

వినియోగదారులు కొన్నిసార్లు తప్పు చిరునామాకు టోకెన్‌లను పంపుతారు. వారు ఏమి చేయాలనుకుంటున్నారో తెలుసుకోవడానికి మేము వారి మనస్సులను చదవలేనప్పటికీ, ఎక్కువగా జరిగే మరియు సులభంగా గుర్తించగల రెండు రకాల లోపాలు ఉన్నాయి:

1. కాంట్రాక్ట్ యొక్క స్వంత చిరునామాకు టోకెన్‌లను పంపడం. ఉదాహరణకు, [Optimism యొక్క OP టోకెన్](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) రెండు నెలల కంటే తక్కువ వ్యవధిలో [120,000 కంటే ఎక్కువ](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP టోకెన్‌లను కూడబెట్టుకోగలిగింది. ఇది ప్రజలు కోల్పోయిన గణనీయమైన సంపదను సూచిస్తుంది.

2. ఖాళీ చిరునామాకు టోకెన్‌లను పంపడం, అంటే [బాహ్యంగా స్వంతమైన ఖాతా (externally owned account - EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) లేదా [స్మార్ట్ కాంట్రాక్ట్](/developers/docs/smart-contracts)కి సంబంధించని చిరునామా. ఇది ఎంత తరచుగా జరుగుతుందనే దానిపై నా వద్ద గణాంకాలు లేనప్పటికీ, [ఒక సంఘటన వల్ల 20,000,000 టోకెన్‌లు నష్టపోయి ఉండవచ్చు](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### బదిలీలను నిరోధించడం {#preventing-transfers}

OpenZeppelin ERC-20 కాంట్రాక్ట్‌లో బ్యాలెన్స్‌లలో ప్రతి మార్పు, అది బదిలీ అయినా, ముద్రించినా లేదా దహనం చేసినా, [ఒక అంతర్గత ఫంక్షన్, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) ద్వారా వెళుతుంది. ఏదైనా సమస్య ఉంటే రివర్ట్ చేసే తనిఖీల వంటి మన స్వంత కార్యాచరణను దానికి జోడించడానికి మనం దానిని ఓవర్‌రైడ్ చేయవచ్చు.

అలా చేయడానికి, కన్స్ట్రక్టర్ తర్వాత ఈ ఫంక్షన్‌ను జోడించండి:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

మీకు Solidity గురించి పెద్దగా పరిచయం లేకపోతే ఈ ఫంక్షన్‌లోని కొన్ని భాగాలు కొత్తగా ఉండవచ్చు:

```solidity
        internal virtual
```

`virtual` కీవర్డ్ అంటే మనం `ERC20` నుండి కార్యాచరణను వారసత్వంగా పొంది, ఈ ఫంక్షన్‌ను ఓవర్‌రైడ్ చేసినట్లే, ఇతర కాంట్రాక్ట్‌లు మన నుండి వారసత్వంగా పొందవచ్చు మరియు ఈ ఫంక్షన్‌ను ఓవర్‌రైడ్ చేయవచ్చు.

```solidity
        override(ERC20)
```

మనం `_update` యొక్క ERC20 టోకెన్ నిర్వచనాన్ని [ఓవర్‌రైడ్ చేస్తున్నామని](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) స్పష్టంగా పేర్కొనాలి. సాధారణంగా, భద్రతా కోణం నుండి, అవ్యక్తమైన వాటి కంటే స్పష్టమైన నిర్వచనాలు చాలా మెరుగ్గా ఉంటాయి - మీరు ఏదైనా చేశారని అది మీ కళ్ళ ముందే ఉంటే మీరు మర్చిపోలేరు. మనం ఏ సూపర్‌క్లాస్ యొక్క `_update`ని ఓవర్‌రైడ్ చేస్తున్నామో పేర్కొనడానికి కూడా అదే కారణం.

```solidity
        super._update(from, to, value);
```

ఈ లైన్ మనం వారసత్వంగా పొందిన కాంట్రాక్ట్ లేదా కాంట్రాక్ట్‌ల యొక్క `_update` ఫంక్షన్‌ను పిలుస్తుంది. ఈ సందర్భంలో, అది కేవలం `ERC20` మాత్రమే, `Ownable`కి ఈ ఫంక్షన్ లేదు. ఖాళీ హుక్ వలె కాకుండా, `ERC20._update` అనేది వాస్తవానికి టోకెన్‌లను తరలించేది, కాబట్టి దానిని పిలవడం చాలా అవసరం. మన తనిఖీలు ఈ కాల్‌కు ముందు జరుగుతాయి, కాబట్టి బ్యాలెన్స్ మార్పులు జరగకముందే అవి రివర్ట్ చేయగలవు.

### అవసరాలను కోడింగ్ చేయడం {#coding-the-requirements}

మనం ఈ అవసరాలను ఫంక్షన్‌కు జోడించాలనుకుంటున్నాము. టోకెన్‌లను దహనం చేసినప్పుడు కూడా `_update` పిలువబడుతుంది కాబట్టి, `to`ని `address(0)`కి సెట్ చేయడంతో, `address(0)` కానప్పుడు మాత్రమే మనం `to`ని తనిఖీ చేస్తాము:

- `to` చిరునామా `address(this)`కి సమానంగా ఉండకూడదు, ఇది ERC-20 కాంట్రాక్ట్ యొక్క చిరునామా.
- `to` చిరునామా ఖాళీగా ఉండకూడదు, ఇది ఈ రెండింటిలో ఒకటి అయి ఉండాలి:
  - బాహ్య యాజమాన్య ఖాతా (EOA). ఒక చిరునామా EOA అవునా కాదా అని మనం నేరుగా తనిఖీ చేయలేము, కానీ మనం చిరునామా యొక్క ETH బ్యాలెన్స్‌ని తనిఖీ చేయవచ్చు. EOAలు ఇకపై ఉపయోగించబడకపోయినా, దాదాపు ఎల్లప్పుడూ బ్యాలెన్స్‌ను కలిగి ఉంటాయి - వాటిని చివరి Wei వరకు క్లియర్ చేయడం కష్టం.
  - స్మార్ట్ కాంట్రాక్ట్. ఒక చిరునామా స్మార్ట్ కాంట్రాక్ట్ అవునా కాదా అని పరీక్షించడం కొంచెం కష్టం. బాహ్య కోడ్ పొడవును తనిఖీ చేసే ఆప్‌కోడ్ ఒకటి ఉంది, దానిని [`EXTCODESIZE`](https://www.evm.codes/#3b) అని పిలుస్తారు. Solidityలో మీరు దానిని [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types)తో పొందవచ్చు, దీనిని కంపైలర్ `EXTCODESIZE`గా మారుస్తుంది. ఇక్కడ మనం ఆప్‌కోడ్‌ను నేరుగా ఎలా పిలవాలో చూపించడానికి EVM అసెంబ్లీ అయిన [Yul](https://docs.soliditylang.org/en/latest/yul.html)ని ఉపయోగిస్తాము. [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) నుండి EOA కూడా కోడ్‌ను (కాంట్రాక్ట్‌కు ప్రాతినిధ్యం అప్పగింత) కలిగి ఉండవచ్చని గమనించండి, కాబట్టి ఈ తనిఖీ కోడ్ ఉన్న ఖాతాలను గుర్తిస్తుంది, ఖచ్చితంగా కాంట్రాక్ట్‌లను కాదు. మన ప్రయోజనం కోసం, ఖాళీ చిరునామాలను తిరస్కరించడం, అది సరిపోతుంది.

పూర్తి ఫంక్షన్ ఇక్కడ ఉంది:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // దహనం చేయు (Literal translation of 'burn' works well in Telugu crypto contexts to signify permanent destruction.) అనేది టోకెన్ (A digital asset on Ethereum following a standard (ERC-20, ERC-721). NOT a physical coin or voucher.)లను చిరునామా (A unique hexadecimal identifier (0x...) for an Ethereum account. NOT a physical location.)(0) కు పంపుతుంది, దీన్ని బ్లాక్ (Always transliterated in tech contexts.) చేయవద్దు
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

కొత్త కోడ్‌ను లైన్ బై లైన్ పరిశీలిద్దాం:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

ఇది మొదటి అవసరం, `to` మరియు `this(address)` ఒకేలా లేవని తనిఖీ చేయండి.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

ఒక చిరునామా కాంట్రాక్ట్ అవునా కాదా అని మనం ఈ విధంగా తనిఖీ చేస్తాము. మనం Yul నుండి నేరుగా అవుట్‌పుట్‌ను స్వీకరించలేము, కాబట్టి దానికి బదులుగా ఫలితాన్ని ఉంచడానికి మనం ఒక వేరియబుల్‌ను నిర్వచిస్తాము (ఈ సందర్భంలో `isToContract`). Yul పనిచేసే విధానం ఏమిటంటే ప్రతి ఆప్‌కోడ్ ఒక ఫంక్షన్‌గా పరిగణించబడుతుంది. కాబట్టి ముందుగా మనం కాంట్రాక్ట్ పరిమాణాన్ని పొందడానికి [`EXTCODESIZE`](https://www.evm.codes/#3b)ని పిలుస్తాము, ఆపై అది సున్నా కాదని తనిఖీ చేయడానికి [`GT`](https://www.evm.codes/#11)ని ఉపయోగిస్తాము (మనం అన్‌సైన్డ్ పూర్ణాంకాలతో వ్యవహరిస్తున్నాము, కాబట్టి అది ప్రతికూలంగా ఉండదు). ఆపై మనం ఫలితాన్ని `isToContract`కి వ్రాస్తాము.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

మరియు చివరగా, ఖాళీ చిరునామాల కోసం మనకు అసలు తనిఖీ ఉంది.

## అడ్మినిస్ట్రేటివ్ యాక్సెస్ {#admin-access}

కొన్నిసార్లు తప్పులను రద్దు చేయగల అడ్మినిస్ట్రేటర్ ఉండటం ఉపయోగకరంగా ఉంటుంది. దుర్వినియోగం అయ్యే అవకాశాన్ని తగ్గించడానికి, ఈ అడ్మినిస్ట్రేటర్ ఒక [మల్టీసిగ్](https://blog.logrocket.com/security-choices-multi-signature-wallets/) కావచ్చు, తద్వారా ఒక చర్యపై బహుళ వ్యక్తులు అంగీకరించాల్సి ఉంటుంది. ఈ ఆర్టికల్‌లో మనం రెండు అడ్మినిస్ట్రేటివ్ ఫీచర్‌లను కలిగి ఉంటాము:

1. ఖాతాలను స్తంభింపజేయడం మరియు అన్‌ఫ్రీజ్ చేయడం. ఉదాహరణకు, ఖాతా రాజీపడినప్పుడు ఇది ఉపయోగకరంగా ఉంటుంది.
2. ఆస్తుల క్లీనప్.

   కొన్నిసార్లు మోసగాళ్లు చట్టబద్ధతను పొందడానికి నిజమైన టోకెన్ కాంట్రాక్ట్‌కు మోసపూరిత టోకెన్‌లను పంపుతారు. ఉదాహరణకు, [ఇక్కడ చూడండి](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). చట్టబద్ధమైన ERC-20 కాంట్రాక్ట్ [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). దానిలా నటించే స్కామ్ [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   ప్రజలు పొరపాటున మన కాంట్రాక్ట్‌కు చట్టబద్ధమైన ERC-20 టోకెన్‌లను పంపే అవకాశం కూడా ఉంది, వాటిని బయటకు తీయడానికి ఒక మార్గం ఉండాలని కోరుకోవడానికి ఇది మరొక కారణం.

అడ్మినిస్ట్రేటివ్ యాక్సెస్‌ను ప్రారంభించడానికి ఓపెన్‌జెప్పెలిన్ రెండు యంత్రాంగాలను అందిస్తుంది:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) కాంట్రాక్ట్‌లకు ఒకే యజమాని ఉంటారు. `onlyOwner` [మాడిఫైయర్](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) ఉన్న ఫంక్షన్‌లను ఆ యజమాని మాత్రమే పిలవగలరు. యజమానులు యాజమాన్యాన్ని వేరొకరికి బదిలీ చేయవచ్చు లేదా దానిని పూర్తిగా వదులుకోవచ్చు. అన్ని ఇతర ఖాతాల హక్కులు సాధారణంగా ఒకేలా ఉంటాయి.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) కాంట్రాక్ట్‌లు [రోల్ బేస్డ్ యాక్సెస్ కంట్రోల్ (role based access control - RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)ని కలిగి ఉంటాయి.

సరళత కోసం, ఈ ఆర్టికల్‌లో మనం `Ownable`ని ఉపయోగిస్తాము.

### కాంట్రాక్ట్‌లను స్తంభింపజేయడం మరియు అన్‌ఫ్రీజ్ చేయడం {#freezing-and-thawing-contracts}

కాంట్రాక్ట్‌లను స్తంభింపజేయడానికి మరియు అన్‌ఫ్రీజ్ చేయడానికి అనేక మార్పులు అవసరం:

- ఏ చిరునామాలు స్తంభింపజేయబడ్డాయో ట్రాక్ చేయడానికి చిరునామాల నుండి [బూలియన్‌లకు](https://en.wikipedia.org/wiki/Boolean_data_type) ఒక [మ్యాపింగ్](https://docs.soliditylang.org/en/latest/types.html#mapping-types). అన్ని విలువలు ప్రారంభంలో సున్నాగా ఉంటాయి, ఇది బూలియన్ విలువల కోసం తప్పుగా (false) అన్వయించబడుతుంది. అప్రమేయంగా ఖాతాలు స్తంభింపజేయబడవు కాబట్టి మనకు కావాల్సింది ఇదే.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- ఖాతా స్తంభింపజేయబడినప్పుడు లేదా అన్‌ఫ్రీజ్ చేయబడినప్పుడు ఆసక్తి ఉన్న ఎవరికైనా తెలియజేయడానికి [ఘటనలు](https://docs.soliditylang.org/en/latest/contracts.html#events). సాంకేతికంగా చెప్పాలంటే ఈ చర్యలకు ఘటనలు అవసరం లేదు, కానీ ఆఫ్‌చైన్ కోడ్ ఈ ఘటనలను వినడానికి మరియు ఏమి జరుగుతుందో తెలుసుకోవడానికి ఇది సహాయపడుతుంది. వేరొకరికి సంబంధించినది ఏదైనా జరిగినప్పుడు స్మార్ట్ కాంట్రాక్ట్ వాటిని విడుదల చేయడం మంచి పద్ధతిగా పరిగణించబడుతుంది.

  ఘటనలు ఇండెక్స్ చేయబడతాయి కాబట్టి ఖాతా స్తంభింపజేయబడిన లేదా అన్‌ఫ్రీజ్ చేయబడిన అన్ని సమయాల కోసం శోధించడం సాధ్యమవుతుంది.

  ```solidity
    // ఖాతా (A digital identity on Ethereum with an address, balance, and optional code.)లు స్తంభింపజేయబడినప్పుడు లేదా స్తంభన తొలగించబడినప్పుడు
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- ఖాతాలను స్తంభింపజేయడానికి మరియు అన్‌ఫ్రీజ్ చేయడానికి ఫంక్షన్‌లు. ఈ రెండు ఫంక్షన్‌లు దాదాపు ఒకేలా ఉంటాయి, కాబట్టి మనం ఫ్రీజ్ ఫంక్షన్‌ను మాత్రమే పరిశీలిస్తాము.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) అని గుర్తించబడిన ఫంక్షన్‌లను ఇతర స్మార్ట్ కాంట్రాక్ట్‌ల నుండి లేదా నేరుగా లావాదేవీ ద్వారా పిలవవచ్చు.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // ఖాతా (A digital identity on Ethereum with an address, balance, and optional code.)ను స్తంభింపజేయు
  ```

  ఖాతా ఇప్పటికే స్తంభింపజేయబడి ఉంటే, రివర్ట్ చేయండి. లేకపోతే, దానిని స్తంభింపజేసి, ఒక ఘటనను `emit` చేయండి.

- స్తంభింపజేసిన ఖాతా నుండి డబ్బు తరలించబడకుండా నిరోధించడానికి `_update`ని మార్చండి. స్తంభింపజేసిన ఖాతాలోకి డబ్బును ఇంకా బదిలీ చేయవచ్చని గమనించండి. ఈ లైన్‌ను ఫంక్షన్ ప్రారంభంలో, `if` బ్లాక్ వెలుపల ఉంచండి, తద్వారా ఇది స్తంభింపజేసిన ఖాతా నుండి టోకెన్‌లను దహనం చేయడాన్ని కూడా నిరోధిస్తుంది.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### ఆస్తుల క్లీనప్ {#asset-cleanup}

ఈ కాంట్రాక్ట్ కలిగి ఉన్న ERC-20 టోకెన్‌లను విడుదల చేయడానికి, అవి చెందిన టోకెన్ కాంట్రాక్ట్‌లోని ఫంక్షన్‌ను మనం పిలవాలి, అది [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) లేదా [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve) కావచ్చు. ఈ సందర్భంలో అలవెన్సులపై గ్యాస్‌ను వృధా చేయడంలో అర్థం లేదు, మనం నేరుగా బదిలీ చేయవచ్చు.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

మనం చిరునామాను స్వీకరించినప్పుడు కాంట్రాక్ట్ కోసం ఆబ్జెక్ట్‌ను సృష్టించడానికి ఇది సింటాక్స్. దీన్ని ఉపయోగించడానికి మనకు OpenZeppelin ERC-20 కాంట్రాక్ట్ కోసం ఇంటర్‌ఫేస్ అయిన [IERC20 కోసం నిర్వచనం](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) అవసరం. విజార్డ్ యొక్క `import {ERC20} from ...` లైన్ `ERC20`ని మాత్రమే తీసుకువస్తుంది, కాబట్టి ఫైల్ ఎగువన ఉన్న ఇతర దిగుమతుల పక్కన ఈ లైన్‌ను జోడించండి:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

ఇది క్లీనప్ ఫంక్షన్, కాబట్టి మనం ఎలాంటి టోకెన్‌లను వదిలివేయకూడదనుకుంటున్నాము. వినియోగదారు నుండి మాన్యువల్‌గా బ్యాలెన్స్‌ను పొందే బదులు, మనం ఈ ప్రక్రియను ఆటోమేట్ చేయవచ్చు.

## ముగింపు {#conclusion}

ఇది సరైన పరిష్కారం కాదు - "వినియోగదారు తప్పు చేశారు" అనే సమస్యకు సరైన పరిష్కారం లేదు. అయితే, ఈ రకమైన తనిఖీలను ఉపయోగించడం కనీసం కొన్ని తప్పులను నివారించగలదు. ఖాతాలను స్తంభింపజేసే సామర్థ్యం ప్రమాదకరమైనప్పటికీ, దొంగిలించబడిన నిధులను హ్యాకర్‌కు నిరాకరించడం ద్వారా కొన్ని హ్యాక్‌ల నష్టాన్ని పరిమితం చేయడానికి దీనిని ఉపయోగించవచ్చు.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
