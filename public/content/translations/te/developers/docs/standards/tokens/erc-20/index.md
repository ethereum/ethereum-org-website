---
title: ⁦ERC-20⁩ టోకెన్ ప్రమాణం
description: ఎథీరియంలో ఫంజిబుల్ టోకెన్‌ల ప్రమాణమైన ⁦ERC-20⁩ గురించి తెలుసుకోండి, ఇది పరస్పరం పనిచేయగల టోకెన్ అప్లికేషన్‌లను ప్రారంభిస్తుంది.
lang: te
---

## పరిచయం {#introduction}

**టోకెన్ అంటే ఏమిటి?**

టోకెన్‌లు [ఎథీరియం](/)లో వాస్తవంగా దేనినైనా సూచించగలవు:

- ఆన్‌లైన్ ప్లాట్‌ఫారమ్‌లో కీర్తి పాయింట్‌లు
- గేమ్‌లోని పాత్ర యొక్క నైపుణ్యాలు
- కంపెనీలో వాటా వంటి ఆర్థిక ఆస్తులు
- USD వంటి ఫియట్ కరెన్సీ
- ఒక ఔన్స్ బంగారం
- మరియు మరిన్ని...

ఎథీరియం యొక్క ఇంతటి శక్తివంతమైన ఫీచర్‌ను ఒక బలమైన ప్రమాణం ద్వారా నిర్వహించాలి, కదా? ఇక్కడే ERC-20 తన పాత్రను పోషిస్తుంది! ఈ ప్రమాణం డెవలపర్‌లను ఇతర ఉత్పత్తులు మరియు సేవలతో పరస్పరం పనిచేయగల టోకెన్ అప్లికేషన్‌లను రూపొందించడానికి అనుమతిస్తుంది. ERC-20 ప్రమాణం [ఈథర్](/glossary/#ether)కు అదనపు కార్యాచరణను అందించడానికి కూడా ఉపయోగించబడుతుంది.

**ERC-20 అంటే ఏమిటి?**

ERC-20 ఫంజిబుల్ టోకెన్‌ల కోసం ఒక ప్రమాణాన్ని పరిచయం చేస్తుంది, మరో మాటలో చెప్పాలంటే, ప్రతి టోకెన్ మరొక టోకెన్‌తో (రకం మరియు విలువలో) ఖచ్చితంగా ఒకేలా ఉండే లక్షణాన్ని కలిగి ఉంటాయి. ఉదాహరణకు, ఒక ERC-20 టోకెన్ ETH లాగానే పనిచేస్తుంది, అంటే 1 టోకెన్ ఎల్లప్పుడూ అన్ని ఇతర టోకెన్‌లకు సమానంగా ఉంటుంది.

## ముందస్తు అవసరాలు {#prerequisites}

- [ఖాతాలు](/developers/docs/accounts)
- [స్మార్ట్ కాంట్రాక్ట్‌లు](/developers/docs/smart-contracts/)
- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)

## ప్రధాన భాగం {#body}

నవంబర్ 2015లో ఫాబియన్ వోగెల్‌స్టెల్లర్ ప్రతిపాదించిన ERC-20 (Ethereum Request for Comments 20), స్మార్ట్ కాంట్రాక్ట్‌లలోని టోకెన్‌ల కోసం APIని అమలు చేసే టోకెన్ ప్రమాణం.

ERC-20 అందించే ఉదాహరణ కార్యాచరణలు:

- ఒక ఖాతా నుండి మరొక ఖాతాకు టోకెన్‌లను బదిలీ చేయడం
- ఖాతా యొక్క ప్రస్తుత టోకెన్ బ్యాలెన్స్‌ను పొందడం
- నెట్‌వర్క్‌లో అందుబాటులో ఉన్న టోకెన్ మొత్తం సరఫరాను పొందడం
- ఒక ఖాతా నుండి కొంత మొత్తంలో టోకెన్‌ను థర్డ్-పార్టీ ఖాతా ఖర్చు చేయవచ్చో లేదో ఆమోదించడం

ఒక స్మార్ట్ కాంట్రాక్ట్ కింది పద్ధతులు మరియు ఈవెంట్‌లను అమలు చేస్తే దానిని ERC-20 టోకెన్ కాంట్రాక్ట్ అని పిలవవచ్చు మరియు ఒకసారి డిప్లాయ్ చేసిన తర్వాత, ఎథీరియంలో సృష్టించబడిన టోకెన్‌లను ట్రాక్ చేయడానికి ఇది బాధ్యత వహిస్తుంది.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) నుండి:

### పద్ధతులు {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### ఈవెంట్‌లు {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### ఉదాహరణలు {#web3py-example}

ఎథీరియంలో ఏదైనా ERC-20 టోకెన్ కాంట్రాక్ట్‌ను తనిఖీ చేయడాన్ని మనకు సులభతరం చేయడానికి ఒక ప్రమాణం ఎంత ముఖ్యమో చూద్దాం. ఏదైనా ERC-20 టోకెన్‌కు ఇంటర్‌ఫేస్‌ను సృష్టించడానికి మనకు కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI) మాత్రమే అవసరం. మీరు క్రింద చూడగలిగినట్లుగా, దీన్ని తక్కువ ఘర్షణ ఉదాహరణగా చేయడానికి మేము సరళీకృత ABIని ఉపయోగిస్తాము.

#### Web3.py ఉదాహరణ {#web3py-example-2}

ముందుగా, మీరు [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python లైబ్రరీని ఇన్‌స్టాల్ చేశారని నిర్ధారించుకోండి:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # ర్యాప్డ్ ఈథర్ (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # యూనిస్వాప్ V2: DAI 2

# ఇది ఒక ERC-20 టోకెన్ కాంట్రాక్ట్ యొక్క సరళీకృత కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI).
# ఇది ఈ పద్ధతులను మాత్రమే బహిర్గతం చేస్తుంది: balanceOf(address), decimals(), symbol() మరియు totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## తెలిసిన సమస్యలు {#erc20-issues}

### ERC-20 టోకెన్ స్వీకరణ సమస్య {#reception-issue}

**06/20/2024 నాటికి ఈ సమస్య కారణంగా కనీసం $83,656,418 విలువైన ERC-20 టోకెన్‌లు కోల్పోయాయి. దిగువ జాబితా చేయబడిన విధంగా మీరు ప్రమాణం పైన అదనపు పరిమితుల సమితిని అమలు చేస్తే తప్ప, స్వచ్ఛమైన ERC-20 అమలు ఈ సమస్యకు గురయ్యే అవకాశం ఉందని గమనించండి.**

ERC-20 టోకెన్‌లను నిర్వహించడానికి రూపొందించబడని స్మార్ట్ కాంట్రాక్ట్‌కు ERC-20 టోకెన్‌లను పంపినప్పుడు, ఆ టోకెన్‌లు శాశ్వతంగా కోల్పోవచ్చు. స్వీకరించే కాంట్రాక్ట్‌కు ఇన్‌కమింగ్ టోకెన్‌లను గుర్తించే లేదా ప్రతిస్పందించే కార్యాచరణ లేనందున మరియు ఇన్‌కమింగ్ టోకెన్‌ల గురించి స్వీకరించే కాంట్రాక్ట్‌కు తెలియజేయడానికి ERC-20 ప్రమాణంలో ఎటువంటి యంత్రాంగం లేనందున ఇది జరుగుతుంది. ఈ సమస్య ప్రధానంగా ఈ క్రింది మార్గాల ద్వారా రూపుదిద్దుకుంటుంది:

1.	టోకెన్ బదిలీ యంత్రాంగం
  - ERC-20 టోకెన్‌లు transfer లేదా transferFrom ఫంక్షన్‌లను ఉపయోగించి బదిలీ చేయబడతాయి
	-	వినియోగదారు ఈ ఫంక్షన్‌లను ఉపయోగించి కాంట్రాక్ట్ చిరునామాకు టోకెన్‌లను పంపినప్పుడు, స్వీకరించే కాంట్రాక్ట్ వాటిని నిర్వహించడానికి రూపొందించబడిందా లేదా అనే దానితో సంబంధం లేకుండా టోకెన్‌లు బదిలీ చేయబడతాయి
2.	నోటిఫికేషన్ లేకపోవడం
	-	స్వీకరించే కాంట్రాక్ట్‌కు టోకెన్‌లు పంపబడినట్లు నోటిఫికేషన్ లేదా కాల్‌బ్యాక్ అందదు
	-	స్వీకరించే కాంట్రాక్ట్‌లో టోకెన్‌లను నిర్వహించడానికి ఒక యంత్రాంగం లేకపోతే (ఉదా., ఫాల్‌బ్యాక్ ఫంక్షన్ లేదా టోకెన్ స్వీకరణను నిర్వహించడానికి ప్రత్యేక ఫంక్షన్), టోకెన్‌లు కాంట్రాక్ట్ చిరునామాలో చిక్కుకుపోతాయి
3.	అంతర్నిర్మిత నిర్వహణ లేదు
	-	ERC-20 ప్రమాణంలో స్వీకరించే కాంట్రాక్ట్‌లు అమలు చేయడానికి తప్పనిసరి ఫంక్షన్ లేదు, దీని వలన అనేక కాంట్రాక్ట్‌లు ఇన్‌కమింగ్ టోకెన్‌లను సరిగ్గా నిర్వహించలేని పరిస్థితి ఏర్పడుతుంది

**సాధ్యమైన పరిష్కారాలు**

ERC-20తో ఈ సమస్యను పూర్తిగా నివారించడం సాధ్యం కానప్పటికీ, తుది వినియోగదారుకు టోకెన్‌ల నష్టం జరిగే అవకాశాన్ని గణనీయంగా తగ్గించడానికి అనుమతించే పద్ధతులు ఉన్నాయి:

- వినియోగదారు టోకెన్‌లను టోకెన్ కాంట్రాక్ట్ చిరునామాకే పంపినప్పుడు (ఉదా., USDT టోకెన్ కాంట్రాక్ట్ చిరునామాకు డిపాజిట్ చేయబడిన USDT) అత్యంత సాధారణ సమస్య తలెత్తుతుంది. అటువంటి బదిలీ ప్రయత్నాలను రివర్ట్ చేయడానికి `transfer(..)` ఫంక్షన్‌ను పరిమితం చేయాలని సిఫార్సు చేయబడింది. `transfer(..)` ఫంక్షన్ అమలులో `require(_to != address(this));` తనిఖీని జోడించడాన్ని పరిగణించండి.
- సాధారణంగా `transfer(..)` ఫంక్షన్ కాంట్రాక్ట్‌లకు టోకెన్‌లను డిపాజిట్ చేయడానికి రూపొందించబడలేదు. బదులుగా ERC-20 టోకెన్‌లను కాంట్రాక్ట్‌లకు డిపాజిట్ చేయడానికి `approve(..) & transferFrom(..)` ప్యాటర్న్ ఉపయోగించబడుతుంది. దానితో ఏవైనా కాంట్రాక్ట్‌లకు టోకెన్‌లను డిపాజిట్ చేయడాన్ని అనుమతించకుండా బదిలీ ఫంక్షన్‌ను పరిమితం చేయడం సాధ్యపడుతుంది, అయితే ఇది `transfer(..)` ఫంక్షన్‌తో కాంట్రాక్ట్‌లకు టోకెన్‌లను డిపాజిట్ చేయవచ్చని భావించే కాంట్రాక్ట్‌లతో (ఉదా., యూనిస్వాప్ ద్రవ్యత పూల్స్) అనుకూలతను విచ్ఛిన్నం చేయవచ్చు.
- మీ కాంట్రాక్ట్ ఎప్పుడూ టోకెన్‌లను స్వీకరించకూడదని భావించినప్పటికీ, ERC-20 టోకెన్‌లు మీ కాంట్రాక్ట్‌లో చేరవచ్చని ఎల్లప్పుడూ ఊహించండి. గ్రహీతల వైపు ప్రమాదవశాత్తు జరిగే డిపాజిట్‌లను నిరోధించడానికి లేదా తిరస్కరించడానికి మార్గం లేదు. ప్రమాదవశాత్తు డిపాజిట్ చేయబడిన ERC-20 టోకెన్‌లను సంగ్రహించడానికి అనుమతించే ఫంక్షన్‌ను అమలు చేయాలని సిఫార్సు చేయబడింది.
- ప్రత్యామ్నాయ టోకెన్ ప్రమాణాలను ఉపయోగించడాన్ని పరిగణించండి.

ఈ సమస్య నుండి [ERC-223](/developers/docs/standards/tokens/erc-223) లేదా [ERC-1363](/developers/docs/standards/tokens/erc-1363) వంటి కొన్ని ప్రత్యామ్నాయ ప్రమాణాలు వచ్చాయి.

## తదుపరి పఠనం {#further-reading}

- [EIP-20: ERC-20 టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-20)
- [ఓపెన్‌జెప్పెలిన్ - టోకెన్‌లు](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ఓపెన్‌జెప్పెలిన్ - ERC-20 అమలు](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 టోకెన్‌లకు గైడ్](https://www.alchemy.com/overviews/erc20-solidity)

## ఇతర ఫంజిబుల్ టోకెన్ ప్రమాణాలు {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - టోకనైజ్డ్ వాల్ట్‌లు](/developers/docs/standards/tokens/erc-4626)

## ట్యుటోరియల్స్: ఎథీరియంలో ERC-20తో నిర్మించండి {#tutorials}

- [ERC-20 కాంట్రాక్ట్ వాక్‌త్రూ](/developers/tutorials/erc20-annotated-code/) _– ఓపెన్‌జెప్పెలిన్ ERC-20 కాంట్రాక్ట్ అమలు యొక్క లైన్-బై-లైన్ ఉల్లేఖన వాక్‌త్రూ._
- [సేఫ్టీ రైల్స్‌తో ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– వినియోగదారులు సాధారణ తప్పులను నివారించడంలో సహాయపడటానికి ERC-20 టోకెన్‌లకు రక్షణలను ఎలా జోడించాలి._
- [Ethers.js ఉపయోగించి టోకెన్‌లను పంపడం](/developers/tutorials/send-token-ethersjs/) _– Ethers.js ఉపయోగించి ERC-20 టోకెన్‌లను బదిలీ చేయడానికి ప్రారంభకులకు అనుకూలమైన గైడ్._
- [స్కామ్ టోకెన్‌లు ఉపయోగించే కొన్ని ఉపాయాలు మరియు వాటిని ఎలా గుర్తించాలి](/developers/tutorials/scam-token-tricks/) _– స్కామ్ ERC-20 టోకెన్ ప్యాటర్న్‌లు మరియు వాటిని ఎలా గుర్తించాలో వివరణాత్మక అన్వేషణ._