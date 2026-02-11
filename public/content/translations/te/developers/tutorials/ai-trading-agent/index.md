---
title: "ఇతీరియముపై మీ స్వంత AI ట్రేడింగ్ ఏజెంట్‌ను తయారు చేయండి"
description: "ఈ ట్యుటోరియల్‌లో మీరు ఒక సాధారణ AI ట్రేడింగ్ ఏజెంట్‌ను ఎలా తయారు చేయాలో నేర్చుకుంటారు. ఈ ఏజెంట్ బ్లాక్ చైను నుండి సమాచారాన్ని చదువుతుంది, ఆ సమాచారం ఆధారంగా సిఫార్సు కోసం LLMని అడుగుతుంది, LLM సిఫార్సు చేసిన ట్రేడ్‌ను నిర్వహిస్తుంది, ఆపై వేచి ఉండి, పునరావృతం చేస్తుంది."
author: "ఓరి పోమెరాంట్జ్"
tags: [ "AI", "ట్రేడింగ్", "ఏజెంట్", "python" ]
skill: "మధ్యస్థ"
published: 2026-02-13
lang: te
sidebarDepth: 3
---

ఈ ట్యుటోరియల్‌లో మీరు ఒక సాధారణ AI ట్రేడింగ్ ఏజెంట్‌ను ఎలా నిర్మించాలో నేర్చుకుంటారు. ఈ ఏజెంట్ ఈ దశలను ఉపయోగించి పనిచేస్తుంది:

1. టోకెన్ యొక్క ప్రస్తుత మరియు గత ధరలను, అలాగే ఇతర సంభావ్యంగా సంబంధిత సమాచారాన్ని చదవండి
2. ఈ సమాచారంతో, అది ఎలా సంబంధితంగా ఉండవచ్చో వివరించడానికి నేపథ్య సమాచారంతో పాటు ఒక క్వెరీని నిర్మించండి
3. క్వెరీని సమర్పించి, అంచనా వేయబడిన ధరను తిరిగి పొందండి
4. సిఫార్సు ఆధారంగా ట్రేడ్ చేయండి
5. వేచి ఉండి, పునరావృతం చేయండి

ఈ ఏజెంట్ సమాచారాన్ని ఎలా చదవాలో, దానిని ఉపయోగపడే జవాబును ఇచ్చే క్వెరీగా అనువదించాలో, మరియు ఆ జవాబును ఎలా ఉపయోగించాలో ప్రదర్శిస్తుంది. ఇవన్నీ AI ఏజెంట్‌కు అవసరమైన దశలు. ఈ ఏజెంట్ Pythonలో అమలు చేయబడింది, ఎందుకంటే ఇది AIలో ఉపయోగించే అత్యంత సాధారణ భాష.

## ఇది ఎందుకు చేయాలి? {#why-do-this}

స్వయంచాలక ట్రేడింగ్ ఏజెంట్లు అభివృద్ధి చేసేవారిని ట్రేడింగ్ వ్యూహాన్ని ఎంచుకోవడానికి మరియు అమలు చేయడానికి అనుమతిస్తాయి. [AI agents](/ai-agents) మరింత సంక్లిష్టమైన మరియు డైనమిక్ ట్రేడింగ్ వ్యూహాలకు అనుమతిస్తాయి, అభివృద్ధి చేసేవాడు ఉపయోగించాలని కూడా పరిగణించని సమాచారం మరియు అల్గారిథమ్‌లను ఉపయోగించే అవకాశం ఉంది.

## ఉపకరణాలు {#tools}

ఈ ట్యుటోరియల్ కోట్స్ మరియు ట్రేడింగ్ కోసం [Python](https://www.python.org/), [Web3 లైబ్రరీ](https://web3py.readthedocs.io/en/stable/), మరియు [Uniswap v3](https://github.com/Uniswap/v3-periphery)ని ఉపయోగిస్తుంది.

### Python ఎందుకు? {#python}

AI కోసం అత్యంత విస్తృతంగా ఉపయోగించే భాష [Python](https://www.python.org/), కాబట్టి మేము ఇక్కడ దానిని ఉపయోగిస్తాము. మీకు Python తెలియకపోయినా చింతించకండి. భాష చాలా స్పష్టంగా ఉంటుంది, మరియు అది ఏమి చేస్తుందో నేను ఖచ్చితంగా వివరిస్తాను.

[Web3 లైబ్రరీ](https://web3py.readthedocs.io/en/stable/) అనేది అత్యంత సాధారణ Python ఇతీరియము API. ఇది ఉపయోగించడానికి చాలా సులభం.

### బ్లాక్ చైనుపై ట్రేడింగ్ {#trading-on-blockchain}

[అనేక వికేంద్రీకృత ఎక్స్ఛేంజ్‌లు (DEX)](/apps/categories/defi/) ఉన్నాయి, ఇవి ఇతీరియముపై టోకెన్‌లను ట్రేడ్ చేయడానికి మిమ్మల్ని అనుమతిస్తాయి. అయినప్పటికీ, [ఆర్బిట్రేజ్](/developers/docs/smart-contracts/composability/#better-user-experience) కారణంగా అవి ఒకే రకమైన ఎక్స్ఛేంజ్ రేట్లను కలిగి ఉంటాయి.

[Uniswap](https://app.uniswap.org/) అనేది విస్తృతంగా ఉపయోగించే DEX, దీనిని మనం కోట్స్ (టోకెన్ సాపేక్ష విలువలను చూడటానికి) మరియు ట్రేడ్‌ల కోసం ఉపయోగించవచ్చు.

### OpenAI {#openai}

ఒక పెద్ద భాషా నమూనా కోసం, నేను [OpenAI](https://openai.com/)తో ప్రారంభించాలని ఎంచుకున్నాను. ఈ ట్యుటోరియల్‌లోని అప్లికేషన్‌ను అమలు చేయడానికి మీరు API యాక్సెస్ కోసం చెల్లించాలి. $5 కనీస చెల్లింపు కంటే ఎక్కువ సరిపోతుంది.

## అభివృద్ధి, దశలవారీగా {#step-by-step}

అభివృద్ధిని సులభతరం చేయడానికి, మేము దశలవారీగా ముందుకు సాగుతాము. ప్రతి దశ GitHubలో ఒక బ్రాంచ్.

### ప్రారంభించడం {#getting-started}

UNIX లేదా Linux కింద ప్రారంభించడానికి దశలు ఉన్నాయి ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install)తో సహా)

1. మీ దగ్గర ఇప్పటికే లేకపోతే, [Python](https://www.python.org/downloads/)ను డౌన్‌లోడ్ చేసి ఇన్‌స్టాల్ చేయండి.

2. GitHub రిపోజిటరీని క్లోన్ చేయండి.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/)ని ఇన్‌స్టాల్ చేయండి. మీ సిస్టమ్‌లోని కమాండ్ భిన్నంగా ఉండవచ్చు.

   ```sh
   pipx install uv
   ```

4. లైబ్రరీలను డౌన్‌లోడ్ చేయండి.

   ```sh
   uv sync
   ```

5. వర్చువల్ ఎన్విరాన్మెంట్‌ను యాక్టివేట్ చేయండి.

   ```sh
   source .venv/bin/activate
   ```

6. Python మరియు Web3 సరిగ్గా పనిచేస్తున్నాయో లేదో ధృవీకరించడానికి, `python3`ను అమలు చేసి, దానికి ఈ ప్రోగ్రామ్‌ను అందించండి. మీరు దానిని `>>>` ప్రాంప్ట్ వద్ద నమోదు చేయవచ్చు; ఫైల్‌ను సృష్టించాల్సిన అవసరం లేదు.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### బ్లాక్ చైను నుండి చదవడం {#read-blockchain}

తదుపరి దశ బ్లాక్ చైను నుండి చదవడం. అలా చేయడానికి, మీరు `02-read-quote` బ్రాంచ్‌కు మారి, ఆపై ప్రోగ్రామ్‌ను అమలు చేయడానికి `uv`ని ఉపయోగించాలి.

```sh
git checkout 02-read-quote
uv run agent.py
```

మీరు `Quote` ఆబ్జెక్ట్‌ల జాబితాను అందుకోవాలి, ప్రతి దానిలో టైమ్‌స్టాంప్, ధర, మరియు ఆస్తి (ప్రస్తుతం ఎల్లప్పుడూ `WETH/USDC`) ఉంటాయి.

ఇక్కడ పంక్తి పంక్తి వివరణ ఉంది.

```python
from web3 import Web3
from web3.contract import Contract
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass
from datetime import datetime, timezone
from pprint import pprint
import time
import functools
import sys
```

మాకు అవసరమైన లైబ్రరీలను దిగుమతి చేయండి. వాటిని ఉపయోగించినప్పుడు కింద వివరించబడ్డాయి.

```python
print = functools.partial(print, flush=True)
```

Python యొక్క `print`ను అవుట్‌పుట్‌ను తక్షణమే ఫ్లష్ చేసే వెర్షన్‌తో భర్తీ చేస్తుంది. ఇది దీర్ఘకాలం నడిచే స్క్రిప్ట్‌లో ఉపయోగపడుతుంది, ఎందుకంటే మేము స్టేటస్ అప్‌డేట్‌లు లేదా డీబగ్గింగ్ అవుట్‌పుట్ కోసం వేచి ఉండాలనుకోము.

```python
MAINNET_URL = "https://eth.drpc.org"
```

మెయిన్‌నెట్‌కు చేరుకోవడానికి ఒక URL. మీరు [నోడ్ యాజ్ ఎ సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service/) నుండి ఒకటి పొందవచ్చు లేదా [Chainlist](https://chainlist.org/chain/1)లో ప్రచారం చేయబడిన వాటిలో ఒకటి ఉపయోగించవచ్చు.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ఒక ఇతీరియము మెయిన్‌నెట్ బ్లాక్ సాధారణంగా ప్రతి పన్నెండు సెకన్లకు జరుగుతుంది, కాబట్టి ఇవి ఒక కాల వ్యవధిలో జరగాలని మేము ఆశించే బ్లాక్‌ల సంఖ్య. ఇది ఖచ్చితమైన సంఖ్య కాదని గమనించండి. [బ్లాక్ ప్రపోజర్](/developers/docs/consensus-mechanisms/pos/block-proposal/) డౌన్ అయినప్పుడు, ఆ బ్లాక్ దాటవేయబడుతుంది మరియు తదుపరి బ్లాక్ సమయం 24 సెకన్లు. మేము టైమ్‌స్టాంప్ కోసం ఖచ్చితమైన బ్లాక్‌ను పొందాలనుకుంటే, మేము [బైనరీ శోధన](https://en.wikipedia.org/wiki/Binary_search)ను ఉపయోగిస్తాము. అయినప్పటికీ, ఇది మన ప్రయోజనాలకు తగినంత దగ్గరగా ఉంది. భవిష్యత్తును అంచనా వేయడం ఖచ్చితమైన శాస్త్రం కాదు.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

చక్రం యొక్క పరిమాణం. మేము ప్రతి చక్రానికి ఒకసారి కోట్‌లను సమీక్షించి, తదుపరి చక్రం చివరిలో విలువను అంచనా వేయడానికి ప్రయత్నిస్తాము.

```python
# The address of the pool we're reading
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

కోట్ విలువలు Uniswap 3 USDC/WETH పూల్ నుండి చిరునామా [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) వద్ద తీసుకోబడ్డాయి. ఈ చిరునామా ఇప్పటికే చెక్‌సమ్ రూపంలో ఉంది, కానీ కోడ్‌ను పునర్వినియోగపరచడానికి [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address)ను ఉపయోగించడం మంచిది.

```python
POOL_ABI = [
    { "name": "slot0", ... },
    { "name": "token0", ... },
    { "name": "token1", ... },
]

ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... }
]
```

ఇవి మేము సంప్రదించాల్సిన రెండు కాంట్రాక్టుల కోసం [ABIలు](https://docs.soliditylang.org/en/latest/abi-spec.html). కోడ్‌ను సంక్షిప్తంగా ఉంచడానికి, మేము కాల్ చేయాల్సిన ఫంక్షన్‌లను మాత్రమే చేర్చుతాము.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) లైబ్రరీని ప్రారంభించి, ఒక ఇతీరియము నోడ్‌కు కనెక్ట్ చేయండి.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

ఇది Pythonలో డేటా క్లాస్‌ను సృష్టించడానికి ఒక మార్గం. [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) డేటా రకం కాంట్రాక్ట్‌కు కనెక్ట్ చేయడానికి ఉపయోగించబడుతుంది. `(frozen=True)`ను గమనించండి. Pythonలో [బూలియన్‌లు](https://en.wikipedia.org/wiki/Boolean_data_type) `True` లేదా `False`గా నిర్వచించబడ్డాయి, క్యాపిటలైజ్ చేయబడ్డాయి. ఈ డేటా క్లాస్ `ఫ్రోజెన్` అంటే ఫీల్డ్‌లను మార్చలేము.

ఇండెంటేషన్‌ను గమనించండి. [C-ఉత్పన్న భాషలకు](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) విరుద్ధంగా, Python బ్లాక్‌లను సూచించడానికి ఇండెంటేషన్‌ను ఉపయోగిస్తుంది. Python ఇంటర్‌ప్రిటర్ తదుపరి నిర్వచనం ఈ డేటా క్లాస్‌లో భాగం కాదని తెలుసుకుంటుంది, ఎందుకంటే ఇది డేటా క్లాస్ ఫీల్డ్‌ల వలె అదే ఇండెంటేషన్‌లో ప్రారంభం కాదు.

```python
@dataclass(frozen=True)
class PoolInfo:
    address: str
    token0: ERC20Token
    token1: ERC20Token
    contract: Contract
    asset: str
    decimal_factor: Decimal = 1
```

[`Decimal`](https://docs.python.org/3/library/decimal.html) రకం దశాంశ భిన్నాలను ఖచ్చితంగా నిర్వహించడానికి ఉపయోగించబడుతుంది.

```python
    def get_price(self, block: int) -> Decimal:
```

ఇది Pythonలో ఫంక్షన్‌ను నిర్వచించే మార్గం. నిర్వచనం `PoolInfo`లో ఇంకా భాగమని చూపించడానికి ఇండెంట్ చేయబడింది.

డేటా క్లాస్‌లో భాగమైన ఫంక్షన్‌లో మొదటి పరామితి ఎల్లప్పుడూ `self`, ఇక్కడ పిలిచిన డేటా క్లాస్ ఉదాహరణ. ఇక్కడ మరొక పరామితి, బ్లాక్ నంబర్ ఉంది.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

మనం భవిష్యత్తును చదవగలిగితే, ట్రేడింగ్ కోసం AI అవసరం లేదు.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

EVM నుండి Web3పై ఫంక్షన్‌ను కాల్ చేయడానికి సింటాక్స్ ఇది: `<contract object>.functions.<function name>().call(<parameters>)`. పరామితులు EVM ఫంక్షన్ యొక్క పరామితులు (ఏవైనా ఉంటే; ఇక్కడ లేవు) లేదా బ్లాక్ చైను ప్రవర్తనను సవరించడానికి [పేరు పెట్టబడిన పరామితులు](https://en.wikipedia.org/wiki/Named_parameter) కావచ్చు. ఇక్కడ మేము ఒకటి, `block_identifier`ను, మనం అమలు చేయాలనుకుంటున్న [బ్లాక్ నంబర్](/developers/docs/apis/json-rpc/#default-block)ను పేర్కొనడానికి ఉపయోగిస్తాము.

ఫలితం [ఈ నిర్మాణం, శ్రేణి రూపంలో](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). మొదటి విలువ రెండు టోకెన్‌ల మధ్య మార్పిడి రేటు యొక్క ఫంక్షన్.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

ఆన్‌చైన్ గణనలను తగ్గించడానికి, Uniswap v3 వాస్తవ మార్పిడి కారకాన్ని నిల్వ చేయదు కానీ దాని వర్గమూలాన్ని నిల్వ చేస్తుంది. EVM ఫ్లోటింగ్ పాయింట్ గణితం లేదా భిన్నాలకు మద్దతు ఇవ్వనందున, వాస్తవ విలువకు బదులుగా, ప్రతిస్పందన <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)
```

మనం పొందే ముడి ధర ప్రతి `token1`కి మనం పొందే `token0` సంఖ్య. మా పూల్‌లో `token0` USDC (యుఎస్ డాలర్‌తో సమానమైన విలువ కలిగిన స్టేబుల్‌కాయిన్) మరియు `token1` [WETH](https://opensea.io/learn/blockchain/what-is-weth). మనం నిజంగా కోరుకునే విలువ WETHకు డాలర్ల సంఖ్య, దాని విలోమం కాదు.

దశాంశ కారకం రెండు టోకెన్‌ల కోసం [దశాంశ కారకాల](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) మధ్య నిష్పత్తి.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

ఈ డేటా క్లాస్ ఒక కోట్‌ను సూచిస్తుంది: ఒక నిర్దిష్ట సమయంలో ఒక నిర్దిష్ట ఆస్తి యొక్క ధర. ఈ సమయంలో, `asset` ఫీల్డ్ అసంబద్ధం ఎందుకంటే మనం ఒకే పూల్‌ను ఉపయోగిస్తాము మరియు అందువల్ల ఒకే ఆస్తిని కలిగి ఉంటాము. అయినప్పటికీ, మేము తరువాత మరిన్ని ఆస్తులను జోడిస్తాము.

```python
def read_token(address: str) -> ERC20Token:
    token = w3.eth.contract(address=address, abi=ERC20_ABI)
    symbol = token.functions.symbol().call()
    decimals = token.functions.decimals().call()

    return ERC20Token(
        address=address,
        symbol=symbol,
        decimals=decimals,
        contract=token
    )
```

ఈ ఫంక్షన్ ఒక చిరునామాను తీసుకుని, ఆ చిరునామాలోని టోకెన్ కాంట్రాక్ట్ గురించిన సమాచారాన్ని తిరిగి ఇస్తుంది. కొత్త [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)ని సృష్టించడానికి, మేము `w3.eth.contract`కు చిరునామా మరియు ABIని అందిస్తాము.

```python
def read_pool(address: str) -> PoolInfo:
    pool_contract = w3.eth.contract(address=address, abi=POOL_ABI)
    token0Address = pool_contract.functions.token0().call()
    token1Address = pool_contract.functions.token1().call()
    token0 = read_token(token0Address)
    token1 = read_token(token1Address)

    return PoolInfo(
        address=address,
        asset=f"{token1.symbol}/{token0.symbol}",
        token0=token0,
        token1=token1,
        contract=pool_contract,
        decimal_factor=Decimal(10) ** Decimal(token0.decimals - token1.decimals)
    )
```

ఈ ఫంక్షన్ [ఒక నిర్దిష్ట పూల్](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) గురించి మనకు కావలసినవన్నీ తిరిగి ఇస్తుంది. `f"<string>"` సింటాక్స్ ఒక [ఫార్మాట్ చేయబడిన స్ట్రింగ్](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

`Quote` ఆబ్జెక్ట్‌ను పొందండి. `block_number` కోసం డిఫాల్ట్ విలువ `None` (విలువ లేదు).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

బ్లాక్ నంబర్ పేర్కొనబడకపోతే, `w3.eth.block_number`ను ఉపయోగించండి, ఇది తాజా బ్లాక్ నంబర్. ఇది [ఒక `if` స్టేట్‌మెంట్](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) కోసం సింటాక్స్.

డిఫాల్ట్‌ను `w3.eth.block_number`కు సెట్ చేయడం మంచిదని అనిపించవచ్చు, కానీ అది సరిగ్గా పనిచేయదు ఎందుకంటే అది ఫంక్షన్ నిర్వచించబడిన సమయంలోని బ్లాక్ నంబర్ అవుతుంది. దీర్ఘకాలం నడిచే ఏజెంట్‌లో, ఇది ఒక సమస్య అవుతుంది.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

మానవులకు మరియు పెద్ద భాషా నమూనాలకు (LLM) చదవగలిగే ఫార్మాట్‌కు ఫార్మాట్ చేయడానికి [`datetime` లైబ్రరీ](https://docs.python.org/3/library/datetime.html)ని ఉపయోగించండి. విలువను రెండు దశాంశ స్థానాలకు గుండ్రంగా చేయడానికి [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize)ను ఉపయోగించండి.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Pythonలో మీరు `list[<type>]`ను ఉపయోగించి ఒక నిర్దిష్ట రకాన్ని మాత్రమే కలిగి ఉండే [జాబితాను](https://docs.python.org/3/library/stdtypes.html#typesseq-list) నిర్వచిస్తారు.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Pythonలో [`for` లూప్](https://docs.python.org/3/tutorial/controlflow.html#for-statements) సాధారణంగా జాబితాపై పునరావృతమవుతుంది. కోట్‌లను కనుగొనడానికి బ్లాక్ నంబర్‌ల జాబితా [`range`](https://docs.python.org/3/library/stdtypes.html#range) నుండి వస్తుంది.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

ప్రతి బ్లాక్ నంబర్ కోసం, `Quote` ఆబ్జెక్ట్‌ను పొంది, దానిని `quotes` జాబితాకు చేర్చండి. ఆ జాబితాను తిరిగి ఇవ్వండి.

```python
pool = read_pool(WETHUSDC_ADDRESS)
quotes = get_quotes(
    pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)

pprint(quotes)
```

ఇది స్క్రిప్ట్ యొక్క ప్రధాన కోడ్. పూల్ సమాచారాన్ని చదివి, పన్నెండు కోట్‌లను పొంది, వాటిని [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) చేయండి.

### ఒక ప్రాంప్ట్ సృష్టిస్తోంది {#prompt}

తరువాత, మనం ఈ కోట్‌ల జాబితాను LLM కోసం ఒక ప్రాంప్ట్‌గా మార్చాలి మరియు ఊహించిన భవిష్యత్ విలువను పొందాలి.

```sh
git checkout 03-create-prompt
uv run agent.py
```

ఇప్పుడు అవుట్‌పుట్ LLM కోసం ఒక ప్రాంప్ట్‌గా ఉంటుంది, ఇలాంటిది:

```
ఈ కోట్‌లను బట్టి:
ఆస్తి: WETH/USDC
 2026-01-20T16:34 3016.21
 .
 .
 .
 2026-02-01T17:49 2299.10

ఆస్తి: WBTC/WETH
 2026-01-20T16:34 29.84
 .
 .
 .
 2026-02-01T17:50 33.46


2026-02-02T17:56 సమయంలో WETH/USDC కోసం విలువ ఏమని మీరు ఆశిస్తారు?

మీ సమాధానాన్ని రెండు దశాంశ స్థానాలకు గుండ్రంగా, ఇతర టెక్స్ట్ లేకుండా ఒకే సంఖ్యగా అందించండి.
```

ఇక్కడ రెండు ఆస్తులు, `WETH/USDC` మరియు `WBTC/WETH` కోసం కోట్‌లు ఉన్నాయని గమనించండి. మరొక ఆస్తి నుండి కోట్‌లను జోడించడం అంచనా యొక్క ఖచ్చితత్వాన్ని మెరుగుపరచవచ్చు.

#### ఒక ప్రాంప్ట్ ఎలా కనిపిస్తుంది {#prompt-explanation}

ఈ ప్రాంప్ట్‌లో మూడు విభాగాలు ఉన్నాయి, ఇవి LLM ప్రాంప్ట్‌లలో చాలా సాధారణం.

1. సమాచారం. LLMలకు వాటి శిక్షణ నుండి చాలా సమాచారం ఉంటుంది, కానీ అవి సాధారణంగా తాజా సమాచారాన్ని కలిగి ఉండవు. ఇక్కడ తాజా కోట్‌లను తిరిగి పొందడానికి ఇది కారణం. ఒక ప్రాంప్ట్‌కు సమాచారాన్ని జోడించడాన్ని [రిట్రీవల్ ఆగ్మెంటెడ్ జనరేషన్ (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) అంటారు.

2. అసలు ప్రశ్న. ఇది మనం తెలుసుకోవాలనుకుంటున్నది.

3. అవుట్‌పుట్ ఫార్మాటింగ్ సూచనలు. సాధారణంగా, ఒక LLM దానిని ఎలా చేరుకుందో వివరణతో ఒక అంచనాను ఇస్తుంది. ఇది మానవులకు మంచిది, కానీ కంప్యూటర్ ప్రోగ్రామ్‌కు కేవలం చివరి ఫలితం మాత్రమే అవసరం.

#### కోడ్ వివరణ {#prompt-code}

ఇక్కడ కొత్త కోడ్ ఉంది.

```python
from datetime import datetime, timezone, timedelta
```

మేము ఏ సమయం కోసం అంచనా వేయాలనుకుంటున్నామో ఆ సమయాన్ని LLMకి అందించాలి. భవిష్యత్తులో "n నిమిషాలు/గంటలు/రోజులు" సమయం పొందడానికి, మేము [`timedelta` క్లాస్](https://docs.python.org/3/library/datetime.html#datetime.timedelta)ను ఉపయోగిస్తాము.

```python
# The addresses of the pools we're reading
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

మేము చదవాల్సిన రెండు పూల్‌లు ఉన్నాయి.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Block is in the future"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC పూల్‌లో, `token1` (WETH) ఒకటి కొనడానికి ఎన్ని `token0` (USDC) అవసరమో తెలుసుకోవాలనుకుంటున్నాము. WETH/WBTC పూల్‌లో, `token0` (WBTC, ఇది చుట్టబడిన Bitcoin) ఒకటి కొనడానికి ఎన్ని `token1` (WETH) అవసరమో తెలుసుకోవాలనుకుంటున్నాము. పూల్ నిష్పత్తిని తిప్పికొట్టాల్సిన అవసరం ఉందో లేదో మనం ట్రాక్ చేయాలి.

```python
def read_pool(address: str, reverse: bool = False) -> PoolInfo:
    .
    .
    .

    return PoolInfo(
        .
        .
        .

        asset= f"{token1.symbol}/{token0.symbol}" if reverse else f"{token0.symbol}/{token1.symbol}",
        reverse=reverse
    )
```

పూల్‌ను తిప్పికొట్టాల్సిన అవసరం ఉందో లేదో తెలుసుకోవడానికి, మేము దానిని `read_pool`కి ఇన్‌పుట్‌గా పొందుతాము. అలాగే, ఆస్తి చిహ్నాన్ని సరిగ్గా సెటప్ చేయాలి.

`<a> if <b> else <c>` సింటాక్స్ C-ఉత్పన్న భాషలో `<b> ? <a> : <c>` అయిన టర్నరీ షరతులతో కూడిన ఆపరేటర్ [ternary conditional operator](https://en.wikipedia.org/wiki/Ternary_conditional_operator) యొక్క Python సమానమైనది.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

ఈ ఫంక్షన్ `Quote` ఆబ్జెక్ట్‌ల జాబితాను ఫార్మాట్ చేసే స్ట్రింగ్‌ను నిర్మిస్తుంది, అవన్నీ ఒకే ఆస్తికి వర్తిస్తాయని ఊహిస్తుంది.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Pythonలో [బహుళ-పంక్తి స్ట్రింగ్ లిటరల్స్](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... అని వ్రాయబడ్డాయి. `"""`.

```python
ఈ కోట్‌లను బట్టి:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

ఇక్కడ, మేము `format_quotes`తో ప్రతి కోట్ జాబితాకు ఒక స్ట్రింగ్‌ను రూపొందించడానికి [మ్యాప్‌రిడ్యూస్](https://en.wikipedia.org/wiki/MapReduce) నమూనాను ఉపయోగిస్తాము, ఆపై వాటిని ప్రాంప్ట్‌లో ఉపయోగించడానికి ఒకే స్ట్రింగ్‌గా తగ్గిస్తాము.

```python
{asset} కోసం {expected_time} సమయంలో విలువ ఏమని మీరు ఆశిస్తారు?

మీ సమాధానాన్ని రెండు దశాంశ స్థానాలకు గుండ్రంగా, ఇతర టెక్స్ట్ లేకుండా ఒకే సంఖ్యగా అందించండి.
    """
```

ప్రాంప్ట్ యొక్క మిగిలిన భాగం ఊహించిన విధంగానే ఉంటుంది.

```python
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

రెండు పూల్‌లను సమీక్షించి, రెండింటి నుండి కోట్‌లను పొందండి.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

మనం ఏ భవిష్యత్ సమయ బిందువు కోసం అంచనా వేయాలనుకుంటున్నామో నిర్ణయించి, ప్రాంప్ట్‌ను సృష్టించండి.

### LLMతో ఇంటర్‌ఫేస్ చేయడం {#interface-llm}

తరువాత, మేము వాస్తవ LLMని ప్రాంప్ట్ చేసి, ఊహించిన భవిష్యత్ విలువను పొందుతాము. నేను ఈ ప్రోగ్రామ్‌ను OpenAI ఉపయోగించి వ్రాశాను, కాబట్టి మీరు వేరే ప్రొవైడర్‌ను ఉపయోగించాలనుకుంటే, మీరు దానిని సర్దుబాటు చేయాలి.

1. [OpenAI ఖాతాను](https://auth.openai.com/create-account) పొందండి

2. [ఖాతాకు నిధులు సమకూర్చండి](https://platform.openai.com/settings/organization/billing/overview)—వ్రాత సమయంలో కనీస మొత్తం $5

3. [API కీని సృష్టించండి](https://platform.openai.com/settings/organization/api-keys)

4. కమాండ్ లైన్‌లో, మీ ప్రోగ్రామ్ దానిని ఉపయోగించడానికి API కీని ఎగుమతి చేయండి

   ```sh
   export OPENAI_API_KEY=sk-<కీ యొక్క మిగిలిన భాగం ఇక్కడ వస్తుంది>
   ```

5. ఏజెంట్‌ను చెక్అవుట్ చేసి అమలు చేయండి

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

ఇక్కడ కొత్త కోడ్ ఉంది.

```python
from openai import OpenAI

open_ai = OpenAI()  # క్లయింట్ OPENAI_API_KEY ఎన్విరాన్మెంట్ వేరియబుల్‌ను చదువుతుంది
```

OpenAI APIని దిగుమతి చేసి, ప్రారంభించండి.

```python
response = open_ai.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ],
    temperature=0.0,
    max_tokens=16,
)
```

ప్రతిస్పందనను సృష్టించడానికి OpenAI API (`open_ai.chat.completions.create`)ని కాల్ చేయండి.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

ధరను అవుట్‌పుట్ చేసి, కొనుగోలు లేదా అమ్మకం సిఫార్సును అందించండి.

#### అంచనాలను పరీక్షించడం {#testing-the-predictions}

ఇప్పుడు మనం అంచనాలను రూపొందించగలం కాబట్టి, మనం ఉపయోగకరమైన అంచనాలను ఉత్పత్తి చేస్తున్నామా లేదా అని అంచనా వేయడానికి చారిత్రక డేటాను కూడా ఉపయోగించవచ్చు.

```sh
uv run test-predictor.py
```

ఊహించిన ఫలితం ఇలాంటిది:

```
2026-01-05T19:50 కోసం అంచనా: అంచనా 3138.93 USD, వాస్తవం 3218.92 USD, లోపం 79.99 USD
2026-01-06T19:56 కోసం అంచనా: అంచనా 3243.39 USD, వాస్తవం 3221.08 USD, లోపం 22.31 USD
2026-01-07T20:02 కోసం అంచనా: అంచనా 3223.24 USD, వాస్తవం 3146.89 USD, లోపం 76.35 USD
2026-01-08T20:11 కోసం అంచనా: అంచనా 3150.47 USD, వాస్తవం 3092.04 USD, లోపం 58.43 USD
.
.
.
2026-01-31T22:33 కోసం అంచనా: అంచనా 2637.73 USD, వాస్తవం 2417.77 USD, లోపం 219.96 USD
2026-02-01T22:41 కోసం అంచనా: అంచనా 2381.70 USD, వాస్తవం 2318.84 USD, లోపం 62.86 USD
2026-02-02T22:49 కోసం అంచనా: అంచనా 2234.91 USD, వాస్తవం 2349.28 USD, లోపం 114.37 USD
29 అంచనాలలో సగటు అంచనా లోపం: 83.87103448275862068965517241 USD
సిఫార్సు başına సగటు మార్పు: 4.787931034482758620689655172 USD
మార్పుల ప్రామాణిక విచలనం: 104.42 USD
లాభదాయక రోజులు: 51.72%
నష్టపోయే రోజులు: 48.28%
```

టెస్టర్ యొక్క చాలా భాగం ఏజెంట్‌తో సమానంగా ఉంటుంది, కానీ ఇక్కడ కొత్త లేదా సవరించిన భాగాలు ఉన్నాయి.

```python
CYCLES_FOR_TEST = 40 # బ్యాక్‌టెస్ట్ కోసం, మేము ఎన్ని చక్రాలను పరీక్షిస్తాము

# చాలా కోట్‌లను పొందండి
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

మేము `CYCLES_FOR_TEST` (ఇక్కడ 40గా పేర్కొనబడింది) రోజుల వెనుకకు చూస్తాము.

```python
# అంచనాలను సృష్టించి, వాటిని వాస్తవ చరిత్రతో సరిచూడండి

total_error = Decimal(0)
changes = []
```

మనం ఆసక్తి చూపే రెండు రకాల లోపాలు ఉన్నాయి. మొదటిది, `total_error`, కేవలం ప్రిడిక్టర్ చేసిన లోపాల మొత్తం.

రెండవది, `changes`ను అర్థం చేసుకోవడానికి, మనం ఏజెంట్ యొక్క ఉద్దేశ్యాన్ని గుర్తుంచుకోవాలి. ఇది WETH/USDC నిష్పత్తిని (ETH ధర) అంచనా వేయడం కాదు. ఇది అమ్మకం మరియు కొనుగోలు సిఫార్సులను జారీ చేయడం. ప్రస్తుతం ధర $2000 అయితే మరియు రేపు $2010 అని అంచనా వేస్తే, వాస్తవ ఫలితం $2020 అయితే మరియు మనం అదనపు డబ్బు సంపాదిస్తే మనకు అభ్యంతరం లేదు. కానీ అది $2010 అని అంచనా వేసి, ఆ సిఫార్సు ఆధారంగా ETH కొనుగోలు చేసి, ధర $1990కి పడిపోతే మనం అభ్యంతరం చెబుతాము.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

మనం పూర్తి చరిత్ర (అంచనా కోసం ఉపయోగించిన విలువలు మరియు దానితో పోల్చడానికి నిజ-ప్రపంచ విలువ) అందుబాటులో ఉన్న కేసులను మాత్రమే చూడగలం. దీని అర్థం కొత్త కేసు `CYCLES_BACK` క్రితం ప్రారంభమైనది అయి ఉండాలి.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

ఏజెంట్ ఉపయోగించే నమూనాల సంఖ్యతో సమానమైన నమూనాలను పొందడానికి [స్లైస్‌లను](https://www.w3schools.com/python/ref_func_slice.asp) ఉపయోగించండి. ఇక్కడి నుండి తదుపరి విభాగానికి మధ్య ఉన్న కోడ్ ఏజెంట్‌లో మనం కలిగి ఉన్న అంచనా-పొందే కోడ్‌తో సమానంగా ఉంటుంది.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

అంచనా వేసిన ధర, నిజమైన ధర, మరియు అంచనా వేసిన సమయంలోని ధరను పొందండి. సిఫార్సు కొనుగోలు లేదా అమ్మకం కోసమా అని నిర్ణయించడానికి మనకు అంచనా సమయంలోని ధర అవసరం.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

లోపాన్ని కనుగొని, దానిని మొత్తానికి జోడించండి.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` కోసం, మనం ఒక ETH కొనుగోలు లేదా అమ్మకం యొక్క ద్రవ్య ప్రభావాన్ని కోరుకుంటున్నాము. కాబట్టి మొదట, మనం సిఫార్సును నిర్ణయించాలి, ఆపై వాస్తవ ధర ఎలా మారిందో అంచనా వేయాలి, మరియు సిఫార్సు డబ్బు సంపాదించిందా (సానుకూల మార్పు) లేదా డబ్బు ఖర్చు చేసిందా (ప్రతికూల మార్పు) అని అంచనా వేయాలి.

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

ఫలితాలను నివేదించండి.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

లాభదాయక రోజుల సంఖ్య మరియు నష్టదాయక రోజుల సంఖ్యను లెక్కించడానికి [`filter`](https://www.w3schools.com/python/ref_func_filter.asp)ను ఉపయోగించండి. ఫలితం ఫిల్టర్ ఆబ్జెక్ట్, దాని పొడవును పొందడానికి మనం జాబితాగా మార్చాలి.

### లావాదేవీలను సమర్పించడం {#submit-txn}

ఇప్పుడు మనం నిజంగా లావాదేవీలను సమర్పించాలి. అయినప్పటికీ, వ్యవస్థ నిరూపించబడకముందే నేను ఈ సమయంలో నిజమైన డబ్బు ఖర్చు చేయాలనుకోవడం లేదు. బదులుగా, మేము మెయిన్‌నెట్ యొక్క స్థానిక ఫోర్క్‌ను సృష్టిస్తాము మరియు ఆ నెట్‌వర్క్‌లో "ట్రేడ్" చేస్తాము.

స్థానిక ఫోర్క్‌ను సృష్టించడానికి మరియు ట్రేడింగ్‌ను ప్రారంభించడానికి ఇక్కడ దశలు ఉన్నాయి.

1. [Foundry](https://getfoundry.sh/introduction/installation) ఇన్‌స్టాల్ చేయండి

2. [`anvil`](https://getfoundry.sh/anvil/overview)ని ప్రారంభించండి

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` ఫౌండ్రీ కోసం డిఫాల్ట్ URL, http://localhost:8545లో వింటోంది, కాబట్టి మనం బ్లాక్ చైనును మార్చడానికి ఉపయోగించే [`cast` కమాండ్](https://getfoundry.sh/cast/overview) కోసం URLను పేర్కొనవలసిన అవసరం లేదు.

3. `anvil`లో నడుస్తున్నప్పుడు, ETH ఉన్న పది టెస్ట్ ఖాతాలు ఉన్నాయి—మొదటి దాని కోసం ఎన్విరాన్మెంట్ వేరియబుల్స్ సెట్ చేయండి

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. ఇవి మనం ఉపయోగించాల్సిన కాంట్రాక్టులు. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) అనేది మనం నిజంగా ట్రేడ్ చేయడానికి ఉపయోగించే Uniswap v3 కాంట్రాక్ట్. మనం నేరుగా పూల్ ద్వారా ట్రేడ్ చేయవచ్చు, కానీ ఇది చాలా సులభం.

   రెండు దిగువ వేరియబుల్స్ WETH మరియు USDC మధ్య మార్పిడి చేయడానికి అవసరమైన Uniswap v3 మార్గాలు.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ప్రతి టెస్ట్ ఖాతాకు 10,000 ETH ఉన్నాయి. ట్రేడింగ్ కోసం 1000 WETH పొందడానికి 1000 ETH చుట్టడానికి WETH కాంట్రాక్ట్‌ను ఉపయోగించండి.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC కోసం 500 WETH ట్రేడ్ చేయడానికి `SwapRouter`ను ఉపయోగించండి.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` కాల్ `SwapRouter` మన టోకెన్‌లలో కొన్నింటిని ఖర్చు చేయడానికి అనుమతించే అనుమతిని సృష్టిస్తుంది. కాంట్రాక్టులు ఈవెంట్‌లను పర్యవేక్షించలేవు, కాబట్టి మనం నేరుగా `SwapRouter` కాంట్రాక్ట్‌కు టోకెన్‌లను బదిలీ చేస్తే, దానికి చెల్లింపు జరిగిందని తెలియదు. బదులుగా, మేము `SwapRouter` కాంట్రాక్ట్‌కు నిర్దిష్ట మొత్తాన్ని ఖర్చు చేయడానికి అనుమతిస్తాము, ఆపై `SwapRouter` దానిని చేస్తుంది. ఇది `SwapRouter` ద్వారా పిలువబడే ఫంక్షన్ ద్వారా జరుగుతుంది, కాబట్టి ఇది విజయవంతమైందో లేదో తెలుసుకుంటుంది.

7. మీకు రెండు టోకెన్‌లు తగినంతగా ఉన్నాయని ధృవీకరించండి.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

ఇప్పుడు మనకు WETH మరియు USDC ఉన్నాయి, మనం నిజంగా ఏజెంట్‌ను అమలు చేయవచ్చు.

```sh
git checkout 05-trade
uv run agent.py
```

అవుట్‌పుట్ ఇలాంటిదిగా ఉంటుంది:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
ప్రస్తుత ధర: 1843.16
2026-02-06T23:07లో, ఊహించిన ధర: 1724.41 USD
ట్రేడ్‌కు ముందు ఖాతా బ్యాలెన్స్‌లు:
USDC బ్యాలెన్స్: 927301.578272
WETH బ్యాలెన్స్: 500
అమ్ము, ధర 118.75 USD తగ్గుతుందని నేను ఆశిస్తున్నాను
అనుమతి లావాదేవీ పంపబడింది: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
అనుమతి లావాదేవీ మైన్ చేయబడింది.
అమ్మకం లావాదేవీ పంపబడింది: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
అమ్మకం లావాదేవీ మైన్ చేయబడింది.
ట్రేడ్ తర్వాత ఖాతా బ్యాలెన్స్‌లు:
USDC బ్యాలెన్స్: 929143.797116
WETH బ్యాలెన్స్: 499
```

నిజంగా దానిని ఉపయోగించడానికి, మీకు కొన్ని చిన్న మార్పులు అవసరం.

- లైన్ 14లో, `MAINNET_URL`ను నిజమైన యాక్సెస్ పాయింట్‌కు మార్చండి, ఉదాహరణకు `https://eth.drpc.org`
- లైన్ 28లో, `PRIVATE_KEY`ను మీ స్వంత ప్రైవేట్ కీకి మార్చండి
- మీరు చాలా ధనవంతులు అయితే మరియు నిరూపించబడని ఏజెంట్ కోసం ప్రతి రోజు 1 ETH కొనుగోలు లేదా అమ్మకం చేయగలిగితే తప్ప, మీరు 29ని మార్చి `WETH_TRADE_AMOUNT`ను తగ్గించాలనుకోవచ్చు

#### కోడ్ వివరణ {#trading-code}

ఇక్కడ కొత్త కోడ్ ఉంది.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

మనం దశ 4లో ఉపయోగించిన అవే వేరియబుల్స్.

```python
WETH_TRADE_AMOUNT=1
```

ట్రేడ్ చేయవలసిన మొత్తం.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

నిజంగా ట్రేడ్ చేయడానికి, మనకు `approve` ఫంక్షన్ అవసరం. మనం ముందు మరియు తరువాత బ్యాలెన్స్‌లను కూడా చూపించాలనుకుంటున్నాము, కాబట్టి మనకు `balanceOf` కూడా అవసరం.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABIలో మనకు కేవలం `exactInput` అవసరం. సంబంధిత ఫంక్షన్, `exactOutput` ఉంది, దానిని మనం సరిగ్గా ఒక WETH కొనడానికి ఉపయోగించవచ్చు, కానీ సులభతరం చేయడానికి మనం రెండు సందర్భాలలోనూ కేవలం `exactInput`ను ఉపయోగిస్తాము.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) మరియు `SwapRouter` కాంట్రాక్ట్ కోసం Web3 నిర్వచనాలు.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

లావాదేవీ పరామితులు. ఇక్కడ మనకు ఒక ఫంక్షన్ అవసరం ఎందుకంటే [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce) ప్రతిసారీ మారాలి.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` కోసం టోకెన్ అనుమతిని ఆమోదించండి.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

ఇది మనం Web3లో లావాదేవీని పంపే విధానం. మొదట మనం లావాదేవీని నిర్మించడానికి [`Contract` ఆబ్జెక్ట్](https://web3py.readthedocs.io/en/stable/web3.contract.html)ను ఉపయోగిస్తాము. అప్పుడు మనం `PRIVATE_KEY`ని ఉపయోగించి, లావాదేవీని సంతకం చేయడానికి [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction)ను ఉపయోగిస్తాము. చివరగా, మనం లావాదేవీని పంపడానికి [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction)ను ఉపయోగిస్తాము.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) లావాదేవీ మైన్ చేయబడే వరకు వేచి ఉంటుంది. అవసరమైతే అది రసీదును తిరిగి ఇస్తుంది.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

ఇవి WETH అమ్మేటప్పుడు పరామితులు.

```python
def make_buy_params(quote: Quote) -> dict:
    return {
        "path": USDC_TO_WETH,
        "recipient": account.address,
        "deadline": 2**256 - 1,
        "amountIn": int(quote.price*WETH_TRADE_AMOUNT) * 10**wethusdc_pool.token0.decimals,
        "amountOutMinimum": 0,
    }
```

`SELL_PARAMS`కి విరుద్ధంగా, కొనుగోలు పరామితులు మారవచ్చు. ఇన్‌పుట్ మొత్తం 1 WETH ఖర్చు, `quote`లో అందుబాటులో ఉంటుంది.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Buy transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Buy transaction mined.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Sell transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Sell transaction mined.")
```

`buy()` మరియు `sell()` ఫంక్షన్‌లు దాదాపు ఒకేలా ఉంటాయి. మొదట మనం `SwapRouter` కోసం తగినంత అనుమతిని ఆమోదిస్తాము, ఆపై మనం దానిని సరైన మార్గం మరియు మొత్తంతో కాల్ చేస్తాము.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

రెండు కరెన్సీలలో వినియోగదారుల బ్యాలెన్స్‌లను నివేదించండి.

```python
print("ట్రేడ్‌కు ముందు ఖాతా బ్యాలెన్స్‌లు:")
balances()

if (expected_price > current_price):
    print(f"కొను, ధర {expected_price - current_price} USD పెరుగుతుందని నేను ఆశిస్తున్నాను")
    buy(wethusdc_quotes[-1])
else:
    print(f"అమ్ము, ధర {current_price - expected_price} USD తగ్గుతుందని నేను ఆశిస్తున్నాను")
    sell()

print("ట్రేడ్ తర్వాత ఖాతా బ్యాలెన్స్‌లు:")
balances()
```

ఈ ఏజెంట్ ప్రస్తుతం ఒకసారి మాత్రమే పనిచేస్తుంది. అయినప్పటికీ, మీరు దానిని [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) నుండి అమలు చేయడం ద్వారా లేదా 368-400 పంక్తులను లూప్‌లో చుట్టి, తదుపరి చక్రం కోసం వేచి ఉండటానికి [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep)ను ఉపయోగించడం ద్వారా నిరంతరం పనిచేసేలా మార్చవచ్చు.

## సాధ్యమయ్యే మెరుగుదలలు {#improvements}

ఇది పూర్తి ఉత్పత్తి వెర్షన్ కాదు; ఇది కేవలం ప్రాథమికాలను బోధించడానికి ఒక ఉదాహరణ. మెరుగుదలల కోసం ఇక్కడ కొన్ని ఆలోచనలు ఉన్నాయి.

### స్మార్టర్ ట్రేడింగ్ {#smart-trading}

ఏమి చేయాలో నిర్ణయించేటప్పుడు ఏజెంట్ విస్మరించే రెండు ముఖ్యమైన వాస్తవాలు ఉన్నాయి.

- _అంచనా వేసిన మార్పు యొక్క పరిమాణం_. ధర తగ్గుతుందని ఊహించినప్పుడు, తగ్గుదల పరిమాణంతో సంబంధం లేకుండా ఏజెంట్ స్థిరమైన మొత్తంలో `WETH`ను అమ్ముతుంది.
  వాస్తవానికి, చిన్న మార్పులను విస్మరించి, మనం ఎంత ధర తగ్గుతుందని ఊహిస్తున్నామో దాని ఆధారంగా అమ్మడం మంచిది.
- _ప్రస్తుత పోర్ట్‌ఫోలియో_. మీ పోర్ట్‌ఫోలియోలో 10% WETHలో ఉంటే మరియు ధర పెరుగుతుందని మీరు భావిస్తే, బహుశా మరింత కొనడం అర్ధవంతం కావచ్చు. కానీ మీ పోర్ట్‌ఫోలియోలో 90% WETHలో ఉంటే, మీరు తగినంతగా బహిర్గతం కావచ్చు మరియు మరింత కొనాల్సిన అవసరం లేదు. మీరు ధర తగ్గుతుందని ఊహించినప్పుడు దీనికి విరుద్ధంగా ఉంటుంది.

### మీరు మీ ట్రేడింగ్ వ్యూహాన్ని రహస్యంగా ఉంచాలనుకుంటే ఏమిటి? {#secret}

AI విక్రేతలు మీరు వారి LLMలకు పంపే ప్రశ్నలను చూడగలరు, ఇది మీరు మీ ఏజెంట్‌తో అభివృద్ధి చేసిన మేధావి ట్రేడింగ్ వ్యవస్థను బహిర్గతం చేయగలదు. చాలా మంది ఉపయోగించే ట్రేడింగ్ సిస్టమ్ పనికిరానిది, ఎందుకంటే మీరు కొనాలనుకున్నప్పుడు చాలా మంది కొనడానికి ప్రయత్నిస్తారు (మరియు ధర పెరుగుతుంది) మరియు మీరు అమ్మాలనుకున్నప్పుడు అమ్మడానికి ప్రయత్నిస్తారు (మరియు ధర తగ్గుతుంది).

ఈ సమస్యను నివారించడానికి మీరు స్థానికంగా LLMని అమలు చేయవచ్చు, ఉదాహరణకు, [LM-Studio](https://lmstudio.ai/)ని ఉపయోగించి.

### AI బాట్ నుండి AI ఏజెంట్‌కు {#bot-to-agent}

ఇది [AI బాట్, AI ఏజెంట్ కాదు](/ai-agents/#ai-agents-vs-ai-bots) అని మీరు మంచి వాదన చేయవచ్చు. ఇది ముందే నిర్వచించబడిన సమాచారంపై ఆధారపడే సాపేక్షంగా సరళమైన వ్యూహాన్ని అమలు చేస్తుంది. మనం స్వీయ-మెరుగుదలను ప్రారంభించవచ్చు, ఉదాహరణకు, Uniswap v3 పూల్‌ల జాబితా మరియు వాటి తాజా విలువలను అందించి, ఏ కలయిక ఉత్తమ అంచనా విలువను కలిగి ఉందో అడగడం ద్వారా.

### స్లిపేజ్ రక్షణ {#slippage-protection}

ప్రస్తుతం [స్లిపేజ్ రక్షణ](https://uniswapv3book.com/milestone_3/slippage-protection.html) లేదు. ప్రస్తుత కోట్ $2000 అయితే, మరియు ఊహించిన ధర $2100 అయితే, ఏజెంట్ కొనుగోలు చేస్తుంది. అయినప్పటికీ, ఏజెంట్ కొనుగోలు చేయడానికి ముందు ఖర్చు $2200కి పెరిగితే, ఇకపై కొనడం అర్ధవంతం కాదు.

స్లిపేజ్ రక్షణను అమలు చేయడానికి, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) యొక్క 325 మరియు 334 పంక్తులలో `amountOutMinimum` విలువను పేర్కొనండి.

## ముగింపు {#conclusion}

ఆశాజనకంగా, ఇప్పుడు మీకు AI ఏజెంట్లతో ప్రారంభించడానికి తగినంత తెలుసు. ఇది విషయంపై సమగ్రమైన అవలోకనం కాదు; దాని కోసం పూర్తి పుస్తకాలు అంకితం చేయబడ్డాయి, కానీ ఇది మిమ్మల్ని ప్రారంభించడానికి సరిపోతుంది. శుభం కలుగు గాక!

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
