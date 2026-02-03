---
title: ERC-20 టోకెన్ ప్రమాణం
description: Ethereum లో ఫంగిబుల్ టోకెన్‌ల కొరకు ప్రమాణమైన ERC-20 గురించి తెలుసుకోండి, ఇది ఇంటర్‌ఆపరేబుల్ టోకెన్ అప్లికేషన్‌లను సాధ్యం చేస్తుంది.
lang: te
---

## పరిచయం {#introduction}

**టోకెన్ అంటే ఏమిటి?**

Ethereumలో టోకెన్‌లు వాస్తవంగా దేనికైనా ప్రాతినిధ్యం వహించగలవు:

- ఒక ఆన్‌లైన్ ప్లాట్‌ఫారమ్‌లో ప్రతిష్టా పాయింట్లు
- ఒక గేమ్‌లోని పాత్ర యొక్క నైపుణ్యాలు
- ఒక కంపెనీలో వాటా వంటి ఆర్థిక ఆస్తులు
- USD వంటి ఫియట్ కరెన్సీ
- ఒక ఔన్స్ బంగారం
- ఇంకా మరిన్ని...

Ethereum యొక్క అటువంటి శక్తివంతమైన ఫీచర్‌ను ఒక పటిష్టమైన ప్రమాణం ద్వారా నిర్వహించబడాలి, కదా? సరిగ్గా ఇక్కడే
ERC-20 దాని పాత్రను పోషిస్తుంది! ఈ ప్రమాణం ఇతర ఉత్పత్తులు మరియు సేవలతో ఇంటర్‌ఆపరేబుల్ అయ్యే టోకెన్ అప్లికేషన్‌లను నిర్మించడానికి డెవలపర్‌లను అనుమతిస్తుంది. [ether](/glossary/#ether)కు అదనపు కార్యాచరణను అందించడానికి ERC-20 ప్రమాణం కూడా ఉపయోగించబడుతుంది.

**ERC-20 అంటే ఏమిటి?**

ERC-20 ఫంగిబుల్ టోకెన్‌ల కోసం ఒక ప్రమాణాన్ని పరిచయం చేస్తుంది, మరో మాటలో చెప్పాలంటే, వాటికి ఒక గుణం ఉంటుంది, అది ప్రతి టోకెన్‌ను మరొక టోకెన్‌తో (రకం మరియు విలువలో) సరిగ్గా
సమానంగా చేస్తుంది. ఉదాహరణకు, ఒక ERC-20 టోకెన్ ETH లాగానే పనిచేస్తుంది, అంటే 1 టోకెన్
అన్ని ఇతర టోకెన్‌లకు సమానంగా ఉంటుంది మరియు ఎల్లప్పుడూ సమానంగా ఉంటుంది.

## అవసరాలు {#prerequisites}

- [ఖాతాలు](/developers/docs/accounts)
- [స్మార్ట్ కాంట్రాక్టులు](/developers/docs/smart-contracts/)
- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)

## బాడీ {#body}

నవంబర్ 2015లో ఫాబియన్ వోగెల్‌స్టెల్లర్ ప్రతిపాదించిన ERC-20 (Ethereum రిక్వెస్ట్ ఫర్ కామెంట్స్ 20) అనేది స్మార్ట్ కాంట్రాక్టులలో టోకెన్‌ల కోసం ఒక APIని
అమలు చేసే టోకెన్ ప్రమాణం.

ERC-20 అందించే ఉదాహరణ కార్యాచరణలు:

- ఒక ఖాతా నుండి మరొక ఖాతాకు టోకెన్‌లను బదిలీ చేయడం
- ఒక ఖాతా యొక్క ప్రస్తుత టోకెన్ బ్యాలెన్స్‌ను పొందడం
- నెట్‌వర్క్‌లో అందుబాటులో ఉన్న టోకెన్ యొక్క మొత్తం సరఫరాను పొందడం
- ఒక ఖాతా నుండి కొంత మొత్తంలో టోకెన్‌ను మూడవ-పక్షం ఖాతా ద్వారా ఖర్చు చేయవచ్చో లేదో ఆమోదించడం

ఒక స్మార్ట్ కాంట్రాక్ట్ కింది పద్ధతులు మరియు ఈవెంట్‌లను అమలు చేస్తే, దానిని ERC-20 టోకెన్ కాంట్రాక్ట్ అని పిలుస్తారు మరియు, ఒకసారి డిప్లాయ్ చేసిన తర్వాత, అది
Ethereumలో సృష్టించబడిన టోకెన్‌లను ట్రాక్ చేయడానికి బాధ్యత వహిస్తుంది.

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

Ethereum లోని ఏ ERC-20 టోకెన్ కాంట్రాక్ట్‌నైనా తనిఖీ చేయడాన్ని మనకు సులభతరం చేయడానికి ఒక ప్రమాణం ఎంత ముఖ్యమైనదో చూద్దాం.
ఏదైనా ERC-20 టోకెన్‌కు ఒక ఇంటర్‌ఫేస్ సృష్టించడానికి మనకు కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI) అవసరం. దిగువన మీరు చూడగలిగినట్లుగా
మేము దీనిని సులభమైన ఉదాహరణగా చేయడానికి ఒక సరళీకృత ABI ని ఉపయోగిస్తాము.

#### Web3.py ఉదాహరణ {#web3py-example}

మొదట, మీరు [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) పైథాన్ లైబ్రరీని ఇన్‌స్టాల్ చేసుకున్నారని నిర్ధారించుకోండి:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # ర్యాప్ చేసిన ఈథర్ (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# ఇది ERC-20 టోకెన్ కాంట్రాక్ట్ యొక్క సరళీకృత కాంట్రాక్ట్ అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI).
# ఇది కేవలం పద్ధతులను మాత్రమే బహిర్గతం చేస్తుంది: balanceOf(address), decimals(), symbol() మరియు totalSupply()
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

**06/20/2024 నాటికి ఈ సమస్య కారణంగా కనీసం $83,656,418 విలువైన ERC-20 టోకెన్లు పోయాయి. దిగువ జాబితా చేసిన విధంగా మీరు ప్రామాణికం పైన అదనపు పరిమితుల సమితిని అమలు చేస్తే తప్ప, స్వచ్ఛమైన ERC-20 అమలు ఈ సమస్యకు గురవుతుందని గమనించండి.**

ERC-20 టోకెన్‌లను నిర్వహించడానికి రూపొందించని స్మార్ట్ కాంట్రాక్టుకు ERC-20 టోకెన్‌లను పంపినప్పుడు, ఆ టోకెన్‌లు శాశ్వతంగా పోవచ్చు. స్వీకరించే కాంట్రాక్ట్‌కు ఇన్‌కమింగ్ టోకెన్‌లను గుర్తించే లేదా ప్రతిస్పందించే కార్యాచరణ లేనందున మరియు ఇన్‌కమింగ్ టోకెన్‌ల గురించి స్వీకరించే కాంట్రాక్ట్‌కు తెలియజేయడానికి ERC-20 ప్రమాణంలో ఎటువంటి యంత్రాంగం లేనందున ఇది జరుగుతుంది. ఈ సమస్య రూపుదిద్దుకునే ప్రధాన మార్గాలు:

1. టోకెన్ బదిలీ యంత్రాంగం

- ERC-20 టోకెన్‌లు ట్రాన్స్‌ఫర్ లేదా ట్రాన్స్‌ఫర్‌ఫ్రమ్ ఫంక్షన్‌లను ఉపయోగించి బదిలీ చేయబడతాయి
  - ఒక వినియోగదారుడు ఈ ఫంక్షన్‌లను ఉపయోగించి కాంట్రాక్ట్ చిరునామాకు టోకెన్‌లను పంపినప్పుడు, స్వీకరించే కాంట్రాక్ట్ వాటిని నిర్వహించడానికి రూపొందించబడిందా లేదా అనే దానితో సంబంధం లేకుండా టోకెన్‌లు బదిలీ చేయబడతాయి

2. నోటిఫికేషన్ లేకపోవడం
   - స్వీకరించే కాంట్రాక్ట్ దానికి టోకెన్‌లు పంపబడ్డాయని నోటిఫికేషన్ లేదా కాల్‌బ్యాక్ అందుకోదు
   - స్వీకరించే కాంట్రాక్ట్‌లో టోకెన్‌లను నిర్వహించడానికి ఒక యంత్రాంగం లేకపోతే (ఉదా., ఫాల్‌బ్యాక్ ఫంక్షన్ లేదా టోకెన్ స్వీకరణను నిర్వహించడానికి ఒక ప్రత్యేక ఫంక్షన్), టోకెన్‌లు సమర్థవంతంగా కాంట్రాక్ట్ చిరునామాలో చిక్కుకుపోతాయి
3. అంతర్నిర్మిత నిర్వహణ లేదు
   - ERC-20 ప్రమాణంలో స్వీకరించే కాంట్రాక్ట్‌లు అమలు చేయడానికి తప్పనిసరి ఫంక్షన్ ఏదీ లేదు, ఇది చాలా కాంట్రాక్ట్‌లు ఇన్‌కమింగ్ టోకెన్‌లను సరిగ్గా నిర్వహించలేని పరిస్థితికి దారితీస్తుంది

**సాధ్యమయ్యే పరిష్కారాలు**

ERC-20 తో ఈ సమస్యను పూర్తిగా నివారించడం సాధ్యం కానప్పటికీ, తుది వినియోగదారునికి టోకెన్‌ల నష్టాన్ని గణనీయంగా తగ్గించే పద్ధతులు ఉన్నాయి:

- ఒక వినియోగదారుడు టోకెన్‌లను టోకెన్ కాంట్రాక్ట్ చిరునామాకే పంపడం అనేది అత్యంత సాధారణ సమస్య (ఉదా., USDT టోకెన్ కాంట్రాక్ట్ చిరునామాకు USDT డిపాజిట్ చేయడం). `transfer(..)` ఫంక్షన్‌ను అటువంటి బదిలీ ప్రయత్నాలను రివర్ట్ చేయడానికి పరిమితం చేయడం సిఫార్సు చేయబడింది. `transfer(..)` ఫంక్షన్ అమలులో `require(_to != address(this));` తనిఖీని జోడించడాన్ని పరిగణించండి.
- `transfer(..)` ఫంక్షన్ సాధారణంగా కాంట్రాక్టులకు టోకెన్‌లను డిపాజిట్ చేయడానికి రూపొందించబడలేదు. `approve(..) `& transferFrom(..)`నమూనా బదులుగా ERC-20 టోకెన్‌లను కాంట్రాక్టులకు డిపాజిట్ చేయడానికి ఉపయోగించబడుతుంది. దానితో ఏ కాంట్రాక్టులలోనైనా టోకెన్‌లను డిపాజిట్ చేయడాన్ని అనుమతించకుండా ట్రాన్స్‌ఫర్ ఫంక్షన్‌ను పరిమితం చేయడం సాధ్యమే, అయితే`trasnfer(..)\` ఫంక్షన్‌తో కాంట్రాక్టులలో టోకెన్‌లను డిపాజిట్ చేయవచ్చని భావించే కాంట్రాక్టులతో ఇది అనుకూలతను దెబ్బతీయవచ్చు (ఉదా., Uniswap లిక్విడిటీ పూల్స్).
- మీ కాంట్రాక్ట్ ఎప్పుడూ దేనినీ స్వీకరించకూడదని అనుకున్నా, ERC-20 టోకెన్‌లు మీ కాంట్రాక్ట్‌లో చేరవచ్చని ఎల్లప్పుడూ ఊహించండి. స్వీకర్తల వైపు నుండి ప్రమాదవశాత్తు డిపాజిట్లను నిరోధించడానికి లేదా తిరస్కరించడానికి మార్గం లేదు. ప్రమాదవశాత్తు డిపాజిట్ చేయబడిన ERC-20 టోకెన్‌లను వెలికి తీయడానికి అనుమతించే ఫంక్షన్‌ను అమలు చేయడం సిఫార్సు చేయబడింది.
- ప్రత్యామ్నాయ టోకెన్ ప్రమాణాలను ఉపయోగించడాన్ని పరిగణించండి.

ఈ సమస్య నుండి [ERC-223](/developers/docs/standards/tokens/erc-223) లేదా [ERC-1363](/developers/docs/standards/tokens/erc-1363) వంటి కొన్ని ప్రత్యామ్నాయ ప్రమాణాలు ఉద్భవించాయి.

## మరింత సమాచారం {#further-reading}

- [EIP-20: ERC-20 టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - టోకెన్‌లు](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 అమలు](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - సాలిడిటీ ERC20 టోకెన్‌లకు గైడ్](https://www.alchemy.com/overviews/erc20-solidity)

## ఇతర ఫంగిబుల్ టోకెన్ ప్రమాణాలు {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - టోకెనైజ్డ్ వాల్ట్‌లు](/developers/docs/standards/tokens/erc-4626)
