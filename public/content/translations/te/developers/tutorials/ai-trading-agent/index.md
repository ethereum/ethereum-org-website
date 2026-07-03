---
title: "ఎథీరియంపై మీ స్వంత కృత్రిమ మేధ ట్రేడింగ్ ఏజెంట్‌ను తయారు చేసుకోండి"
description: "ఈ ట్యుటోరియల్‌లో మీరు ఒక సాధారణ కృత్రిమ మేధ ట్రేడింగ్ ఏజెంట్‌ను ఎలా తయారు చేయాలో నేర్చుకుంటారు. ఈ ఏజెంట్ బ్లాక్‌చైన్ నుండి సమాచారాన్ని చదువుతుంది, ఆ సమాచారం ఆధారంగా సిఫార్సు కోసం LLMని అడుగుతుంది, LLM సిఫార్సు చేసిన ట్రేడ్‌ను చేస్తుంది, ఆపై వేచి ఉండి మళ్లీ పునరావృతం చేస్తుంది."
author: "ఓరి పోమెరాంజ్"
tags:
  - AI
  - ట్రేడింగ్
  - ఏజెంట్
  - python
skill: intermediate
breadcrumb: "కృత్రిమ మేధ ట్రేడింగ్ ఏజెంట్"
published: 2026-02-13
lang: te
sidebarDepth: 3
---

ఈ ట్యుటోరియల్‌లో మీరు ఒక సాధారణ కృత్రిమ మేధ ట్రేడింగ్ ఏజెంట్‌ను ఎలా నిర్మించాలో నేర్చుకుంటారు. ఈ ఏజెంట్ ఈ దశలను ఉపయోగించి పనిచేస్తుంది:

1. టోకెన్ యొక్క ప్రస్తుత మరియు గత ధరలను, అలాగే ఇతర సంబంధిత సమాచారాన్ని చదవడం
2. ఈ సమాచారంతో పాటు, అది ఎలా సంబంధితంగా ఉంటుందో వివరించడానికి నేపథ్య సమాచారంతో ఒక ప్రశ్నను (query) రూపొందించడం
3. ప్రశ్నను సమర్పించి, అంచనా వేసిన ధరను తిరిగి పొందడం
4. సిఫార్సు ఆధారంగా ట్రేడ్ చేయడం
5. వేచి ఉండి, మళ్లీ పునరావృతం చేయడం

ఈ ఏజెంట్ సమాచారాన్ని ఎలా చదవాలో, ఉపయోగించదగిన సమాధానాన్ని ఇచ్చే ప్రశ్నగా దానిని ఎలా మార్చాలో మరియు ఆ సమాధానాన్ని ఎలా ఉపయోగించాలో ప్రదర్శిస్తుంది. ఇవన్నీ కృత్రిమ మేధ ఏజెంట్ కోసం అవసరమైన దశలు. AIలో ఎక్కువగా ఉపయోగించే భాష కాబట్టి ఈ ఏజెంట్ Pythonలో అమలు చేయబడింది.

## దీన్ని ఎందుకు చేయాలి? {#why-do-this}

ఆటోమేటెడ్ ట్రేడింగ్ ఏజెంట్‌లు డెవలపర్‌లకు ట్రేడింగ్ వ్యూహాన్ని ఎంచుకోవడానికి మరియు అమలు చేయడానికి అనుమతిస్తాయి. [కృత్రిమ మేధ ఏజెంట్‌లు](/ai-agents) మరింత సంక్లిష్టమైన మరియు డైనమిక్ ట్రేడింగ్ వ్యూహాలను అనుమతిస్తాయి, డెవలపర్ ఉపయోగించడాన్ని పరిగణించని సమాచారం మరియు అల్గారిథమ్‌లను కూడా ఇవి ఉపయోగించగలవు.

## సాధనాలు {#tools}

ఈ ట్యుటోరియల్ కోట్‌లు మరియు ట్రేడింగ్ కోసం [Python](https://www.python.org/), [Web3 లైబ్రరీ](https://web3py.readthedocs.io/en/stable/) మరియు [యూనిస్వాప్ v3](https://github.com/Uniswap/v3-periphery)ని ఉపయోగిస్తుంది.

### Python ఎందుకు? {#python}

AI కోసం అత్యంత విస్తృతంగా ఉపయోగించే భాష [Python](https://www.python.org/), కాబట్టి మేము దానిని ఇక్కడ ఉపయోగిస్తాము. మీకు Python తెలియకపోయినా చింతించకండి. ఈ భాష చాలా స్పష్టంగా ఉంటుంది మరియు అది ఖచ్చితంగా ఏమి చేస్తుందో నేను వివరిస్తాను.

[Web3 లైబ్రరీ](https://web3py.readthedocs.io/en/stable/) అనేది అత్యంత సాధారణ Python ఎథీరియం API. ఇది ఉపయోగించడానికి చాలా సులభం.

### బ్లాక్‌చైన్‌పై ట్రేడింగ్ {#trading-on-blockchain}

ఎథీరియంపై టోకెన్‌లను ట్రేడ్ చేయడానికి మిమ్మల్ని అనుమతించే [అనేక వికేంద్రీకృత ఎక్స్ఛేంజీలు (DEX)](/apps/categories/defi/) ఉన్నాయి. అయితే, [ఆర్బిట్రేజ్](/developers/docs/smart-contracts/composability/#better-user-experience) కారణంగా అవి ఒకే విధమైన మార్పిడి రేట్లను కలిగి ఉంటాయి.

[యూనిస్వాప్](https://app.uniswap.org/) అనేది విస్తృతంగా ఉపయోగించే DEX, దీనిని మనం కోట్‌లు (టోకెన్ సాపేక్ష విలువలను చూడటానికి) మరియు ట్రేడ్‌ల కోసం ఉపయోగించవచ్చు.

### OpenAI {#openai}

లార్జ్ లాంగ్వేజ్ మోడల్ (LLM) కోసం, నేను [OpenAI](https://openai.com/)తో ప్రారంభించాలని ఎంచుకున్నాను. ఈ ట్యుటోరియల్‌లో అప్లికేషన్‌ను రన్ చేయడానికి మీరు API యాక్సెస్ కోసం చెల్లించాల్సి ఉంటుంది. కనీస చెల్లింపు $5 అనేది సరిపోతుంది.

## అభివృద్ధి, దశలవారీగా {#step-by-step}

అభివృద్ధిని సులభతరం చేయడానికి, మేము దశలవారీగా ముందుకు వెళ్తాము. ప్రతి దశ GitHubలో ఒక బ్రాంచ్.

### ప్రారంభించడం {#getting-started}

UNIX లేదా Linux ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install)తో సహా) కింద ప్రారంభించడానికి దశలు ఉన్నాయి

1. మీకు ఇదివరకే లేకపోతే, [Python](https://www.python.org/downloads/)ని డౌన్‌లోడ్ చేసి ఇన్‌స్టాల్ చేయండి.

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

5. వర్చువల్ ఎన్విరాన్‌మెంట్‌ను యాక్టివేట్ చేయండి.

   ```sh
   source .venv/bin/activate
   ```

6. Python మరియు Web3 సరిగ్గా పనిచేస్తున్నాయో లేదో ధృవీకరించడానికి, `python3`ని రన్ చేయండి మరియు దానికి ఈ ప్రోగ్రామ్‌ను అందించండి. మీరు దీన్ని `>>>` ప్రాంప్ట్ వద్ద నమోదు చేయవచ్చు; ఫైల్‌ను సృష్టించాల్సిన అవసరం లేదు.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### బ్లాక్‌చైన్ నుండి చదవడం {#read-blockchain}

తదుపరి దశ బ్లాక్‌చైన్ నుండి చదవడం. అలా చేయడానికి, మీరు `02-read-quote` బ్రాంచ్‌కి మారాలి, ఆపై ప్రోగ్రామ్‌ను రన్ చేయడానికి `uv`ని ఉపయోగించాలి.

```sh
git checkout 02-read-quote
uv run agent.py
```

మీరు `Quote` ఆబ్జెక్ట్‌ల జాబితాను స్వీకరించాలి, ప్రతి దానిలో టైమ్‌స్టాంప్, ధర మరియు ఆస్తి (ప్రస్తుతం ఎల్లప్పుడూ `WETH/USDC`) ఉంటాయి.

ఇక్కడ లైన్-బై-లైన్ వివరణ ఉంది.

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

మనకు అవసరమైన లైబ్రరీలను దిగుమతి చేయండి. వాటిని ఉపయోగించినప్పుడు క్రింద వివరించబడ్డాయి.

```python
print = functools.partial(print, flush=True)
```

Python యొక్క `print`ని ఎల్లప్పుడూ అవుట్‌పుట్‌ను వెంటనే ఫ్లష్ చేసే వెర్షన్‌తో భర్తీ చేస్తుంది. ఎక్కువసేపు రన్ అయ్యే స్క్రిప్ట్‌లో ఇది ఉపయోగకరంగా ఉంటుంది ఎందుకంటే స్టేటస్ అప్‌డేట్‌లు లేదా డీబగ్గింగ్ అవుట్‌పుట్ కోసం మనం వేచి ఉండకూడదు.

```python
MAINNET_URL = "https://eth.drpc.org"
```

మెయిన్‌నెట్‌కి వెళ్లడానికి ఒక URL. మీరు [నోడ్ యాజ్ ఎ సర్వీస్](/developers/docs/nodes-and-clients/nodes-as-a-service/) నుండి ఒకదాన్ని పొందవచ్చు లేదా [చైన్‌లిస్ట్](https://chainlist.org/chain/1)లో ప్రకటించిన వాటిలో ఒకదాన్ని ఉపయోగించవచ్చు.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ఎథీరియం మెయిన్‌నెట్ బ్లాక్ సాధారణంగా ప్రతి పన్నెండు సెకన్లకు జరుగుతుంది, కాబట్టి ఒక నిర్దిష్ట వ్యవధిలో మనం ఆశించే బ్లాక్‌ల సంఖ్య ఇవి. ఇది ఖచ్చితమైన సంఖ్య కాదని గమనించండి. [బ్లాక్ ప్రతిపాదకుడు](/developers/docs/consensus-mechanisms/pos/block-proposal/) డౌన్ అయినప్పుడు, ఆ బ్లాక్ దాటవేయబడుతుంది మరియు తదుపరి బ్లాక్ కోసం సమయం 24 సెకన్లు అవుతుంది. టైమ్‌స్టాంప్ కోసం ఖచ్చితమైన బ్లాక్‌ను పొందాలనుకుంటే, మనం [బైనరీ సెర్చ్](https://en.wikipedia.org/wiki/Binary_search)ని ఉపయోగిస్తాము. అయితే, మన ప్రయోజనాల కోసం ఇది సరిపోతుంది. భవిష్యత్తును అంచనా వేయడం అనేది ఖచ్చితమైన శాస్త్రం కాదు.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

సైకిల్ పరిమాణం. మేము ప్రతి సైకిల్‌కు ఒకసారి కోట్‌లను సమీక్షిస్తాము మరియు తదుపరి సైకిల్ ముగింపులో విలువను అంచనా వేయడానికి ప్రయత్నిస్తాము.

```python
# మనం చదువుతున్న పూల్ యొక్క చిరునామా
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

కోట్ విలువలు [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) చిరునామా వద్ద ఉన్న యూనిస్వాప్ 3 USDC/WETH పూల్ నుండి తీసుకోబడ్డాయి. ఈ చిరునామా ఇప్పటికే చెక్‌సమ్ రూపంలో ఉంది, కానీ కోడ్‌ను తిరిగి ఉపయోగించగలిగేలా చేయడానికి [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address)ని ఉపయోగించడం మంచిది.

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

మనం సంప్రదించాల్సిన రెండు కాంట్రాక్ట్‌ల కోసం ఇవి [ABIలు](https://docs.soliditylang.org/en/latest/abi-spec.html). కోడ్‌ను సంక్షిప్తంగా ఉంచడానికి, మనం కాల్ చేయాల్సిన ఫంక్షన్‌లను మాత్రమే చేర్చుతాము.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) లైబ్రరీని ప్రారంభించండి మరియు ఎథీరియం నోడ్‌కి కనెక్ట్ చేయండి.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Pythonలో డేటా క్లాస్‌ని సృష్టించడానికి ఇది ఒక మార్గం. కాంట్రాక్ట్‌కి కనెక్ట్ చేయడానికి [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) డేటా రకం ఉపయోగించబడుతుంది. `(frozen=True)`ని గమనించండి. Pythonలో [బూలియన్‌లు](https://en.wikipedia.org/wiki/Boolean_data_type) `True` లేదా `False`గా క్యాపిటలైజ్ చేయబడి నిర్వచించబడతాయి. ఈ డేటా క్లాస్ `frozen`, అంటే ఫీల్డ్‌లను సవరించలేము.

ఇండెంటేషన్‌ను గమనించండి. [C-ఉత్పన్న భాషలకు](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) భిన్నంగా, Python బ్లాక్‌లను సూచించడానికి ఇండెంటేషన్‌ను ఉపయోగిస్తుంది. కింది నిర్వచనం ఈ డేటా క్లాస్‌లో భాగం కాదని Python ఇంటర్‌ప్రెటర్‌కు తెలుసు ఎందుకంటే ఇది డేటా క్లాస్ ఫీల్డ్‌ల వలె అదే ఇండెంటేషన్ వద్ద ప్రారంభం కాదు.

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

దశాంశ భిన్నాలను ఖచ్చితంగా నిర్వహించడానికి [`Decimal`](https://docs.python.org/3/library/decimal.html) రకం ఉపయోగించబడుతుంది.

```python
    def get_price(self, block: int) -> Decimal:
```

Pythonలో ఫంక్షన్‌ను నిర్వచించే విధానం ఇది. ఇది ఇప్పటికీ `PoolInfo`లో భాగమని చూపించడానికి నిర్వచనం ఇండెంట్ చేయబడింది.

డేటా క్లాస్‌లో భాగమైన ఫంక్షన్‌లో మొదటి పారామితి ఎల్లప్పుడూ `self`, ఇక్కడ కాల్ చేసిన డేటా క్లాస్ ఇన్‌స్టాన్స్. ఇక్కడ మరొక పారామితి ఉంది, బ్లాక్ సంఖ్య.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

మనం భవిష్యత్తును చదవగలిగితే, ట్రేడింగ్ కోసం మనకు AI అవసరం లేదు.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 నుండి EVMలో ఫంక్షన్‌ను కాల్ చేయడానికి సింటాక్స్ ఇది: `<contract object>.functions.<function name>().call(<parameters>)`. పారామితులు EVM ఫంక్షన్ యొక్క పారామితులు (ఏవైనా ఉంటే; ఇక్కడ లేవు) లేదా బ్లాక్‌చైన్ ప్రవర్తనను సవరించడానికి [పేరున్న పారామితులు](https://en.wikipedia.org/wiki/Named_parameter) కావచ్చు. ఇక్కడ మనం రన్ చేయాలనుకుంటున్న [బ్లాక్ సంఖ్యను](/developers/docs/apis/json-rpc/#default-block) పేర్కొనడానికి `block_identifier` అనే ఒకదాన్ని ఉపయోగిస్తాము.

ఫలితం [ఈ స్ట్రక్ట్, అర్రే రూపంలో](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72) ఉంటుంది. మొదటి విలువ రెండు టోకెన్‌ల మధ్య మార్పిడి రేటు యొక్క ఫంక్షన్.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

ఆన్‌చైన్ లెక్కలను తగ్గించడానికి, యూనిస్వాప్ v3 వాస్తవ మార్పిడి కారకాన్ని నిల్వ చేయదు, బదులుగా దాని వర్గమూలాన్ని (square root) నిల్వ చేస్తుంది. EVM ఫ్లోటింగ్ పాయింట్ గణితం లేదా భిన్నాలకు మద్దతు ఇవ్వదు కాబట్టి, వాస్తవ విలువకు బదులుగా, ప్రతిస్పందన <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math> గా ఉంటుంది.

```python
         # (టోకెన్0 కి టోకెన్1)
        return 1/(raw_price * self.decimal_factor)
```

మనకు లభించే ముడి ధర అనేది ప్రతి `token1`కి మనకు లభించే `token0` సంఖ్య. మన పూల్‌లో `token0` అనేది USDC (US డాలర్ వలె అదే విలువ కలిగిన స్టేబుల్‌కాయిన్) మరియు `token1` అనేది [WETH](https://opensea.io/learn/blockchain/what-is-weth). మనకు నిజంగా కావాల్సిన విలువ WETHకి డాలర్ల సంఖ్య, దానికి విలోమం కాదు.

దశాంశ కారకం అనేది రెండు టోకెన్‌ల కోసం [దశాంశ కారకాల](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) మధ్య నిష్పత్తి.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

ఈ డేటా క్లాస్ ఒక కోట్‌ను సూచిస్తుంది: ఒక నిర్దిష్ట సమయంలో ఒక నిర్దిష్ట ఆస్తి ధర. ఈ సమయంలో, `asset` ఫీల్డ్ అసంబద్ధం ఎందుకంటే మనం ఒకే పూల్‌ను ఉపయోగిస్తాము మరియు అందువల్ల ఒకే ఆస్తిని కలిగి ఉంటాము. అయితే, మనం తర్వాత మరిన్ని ఆస్తులను జోడిస్తాము.

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

ఈ ఫంక్షన్ ఒక చిరునామాను తీసుకుంటుంది మరియు ఆ చిరునామా వద్ద ఉన్న టోకెన్ కాంట్రాక్ట్ గురించి సమాచారాన్ని అందిస్తుంది. కొత్త [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)ని సృష్టించడానికి, మనం `w3.eth.contract`కి చిరునామా మరియు ABIని అందిస్తాము.

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

ఈ ఫంక్షన్ [ఒక నిర్దిష్ట పూల్](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) గురించి మనకు అవసరమైన ప్రతిదాన్ని అందిస్తుంది. `f"<string>"` సింటాక్స్ అనేది ఒక [ఫార్మాట్ చేయబడిన స్ట్రింగ్](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

`Quote` ఆబ్జెక్ట్‌ను పొందండి. `block_number` కోసం డిఫాల్ట్ విలువ `None` (విలువ లేదు).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

బ్లాక్ సంఖ్య పేర్కొనబడకపోతే, `w3.eth.block_number`ని ఉపయోగించండి, ఇది తాజా బ్లాక్ సంఖ్య. ఇది [ఒక `if` స్టేట్‌మెంట్](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) కోసం సింటాక్స్.

డిఫాల్ట్‌ను కేవలం `w3.eth.block_number`కి సెట్ చేయడం మంచిది అనిపించవచ్చు, కానీ అది సరిగ్గా పనిచేయదు ఎందుకంటే అది ఫంక్షన్ నిర్వచించబడిన సమయంలోని బ్లాక్ సంఖ్య అవుతుంది. ఎక్కువసేపు రన్ అయ్యే ఏజెంట్‌లో, ఇది ఒక సమస్య అవుతుంది.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

మానవులు మరియు లార్జ్ లాంగ్వేజ్ మోడల్స్ (LLMలు) చదవగలిగే ఫార్మాట్‌కి ఫార్మాట్ చేయడానికి [`datetime` లైబ్రరీని](https://docs.python.org/3/library/datetime.html) ఉపయోగించండి. విలువను రెండు దశాంశ స్థానాలకు రౌండ్ చేయడానికి [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize)ని ఉపయోగించండి.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Pythonలో మీరు `list[<type>]`ని ఉపయోగించి ఒక నిర్దిష్ట రకాన్ని మాత్రమే కలిగి ఉండే [జాబితాను](https://docs.python.org/3/library/stdtypes.html#typesseq-list) నిర్వచిస్తారు.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Pythonలో ఒక [`for` లూప్](https://docs.python.org/3/tutorial/controlflow.html#for-statements) సాధారణంగా జాబితాపై పునరావృతమవుతుంది. కోట్‌లను కనుగొనడానికి బ్లాక్ సంఖ్యల జాబితా [`range`](https://docs.python.org/3/library/stdtypes.html#range) నుండి వస్తుంది.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

ప్రతి బ్లాక్ సంఖ్య కోసం, ఒక `Quote` ఆబ్జెక్ట్‌ను పొందండి మరియు దానిని `quotes` జాబితాకు జోడించండి. ఆపై ఆ జాబితాను తిరిగి ఇవ్వండి.

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

ఇది స్క్రిప్ట్ యొక్క ప్రధాన కోడ్. పూల్ సమాచారాన్ని చదవండి, పన్నెండు కోట్‌లను పొందండి మరియు వాటిని [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) చేయండి.

### ప్రాంప్ట్‌ను సృష్టించడం {#prompt}

తరువాత, మనం ఈ కోట్‌ల జాబితాను LLM కోసం ప్రాంప్ట్‌గా మార్చాలి మరియు ఆశించిన భవిష్యత్తు విలువను పొందాలి.

```sh
git checkout 03-create-prompt
uv run agent.py
```

అవుట్‌పుట్ ఇప్పుడు LLMకి ప్రాంప్ట్‌గా ఉంటుంది, దీనికి సమానంగా:

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


2026-02-02T17:56 సమయానికి WETH/USDC విలువ ఎంత ఉంటుందని మీరు ఆశిస్తున్నారు?

మీ సమాధానాన్ని రెండు దశాంశ స్థానాలకు రౌండ్ చేసిన ఒకే సంఖ్యగా అందించండి,
మరే ఇతర వచనం లేకుండా.
```

ఇక్కడ `WETH/USDC` మరియు `WBTC/WETH` అనే రెండు ఆస్తుల కోసం కోట్‌లు ఉన్నాయని గమనించండి. మరొక ఆస్తి నుండి కోట్‌లను జోడించడం అంచనా ఖచ్చితత్వాన్ని మెరుగుపరుస్తుంది.

#### ప్రాంప్ట్ ఎలా ఉంటుంది {#prompt-explanation}

ఈ ప్రాంప్ట్ మూడు విభాగాలను కలిగి ఉంటుంది, ఇవి LLM ప్రాంప్ట్‌లలో చాలా సాధారణం.

1. సమాచారం. LLMలు వాటి శిక్షణ నుండి చాలా సమాచారాన్ని కలిగి ఉంటాయి, కానీ అవి సాధారణంగా తాజా సమాచారాన్ని కలిగి ఉండవు. ఇక్కడ మనం తాజా కోట్‌లను తిరిగి పొందడానికి ఇదే కారణం. ప్రాంప్ట్‌కు సమాచారాన్ని జోడించడాన్ని [రిట్రీవల్ ఆగ్మెంటెడ్ జనరేషన్ (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) అంటారు.

2. అసలు ప్రశ్న. మనం తెలుసుకోవాలనుకుంటున్నది ఇదే.

3. అవుట్‌పుట్ ఫార్మాటింగ్ సూచనలు. సాధారణంగా, ఒక LLM అది ఎలా వచ్చిందో వివరణతో కూడిన అంచనాను మనకు ఇస్తుంది. ఇది మానవులకు మంచిది, కానీ కంప్యూటర్ ప్రోగ్రామ్‌కు కేవలం తుది ఫలితం మాత్రమే అవసరం.

#### కోడ్ వివరణ {#prompt-code}

ఇక్కడ కొత్త కోడ్ ఉంది.

```python
from datetime import datetime, timezone, timedelta
```

మనం అంచనా వేయాలనుకుంటున్న సమయాన్ని LLMకి అందించాలి. భవిష్యత్తులో "n నిమిషాలు/గంటలు/రోజులు" సమయాన్ని పొందడానికి, మనం [`timedelta` క్లాస్‌ని](https://docs.python.org/3/library/datetime.html#datetime.timedelta) ఉపయోగిస్తాము.

```python
# మనం చదువుతున్న పూల్స్ యొక్క చిరునామాలు
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

మనం చదవాల్సిన రెండు పూల్స్ ఉన్నాయి.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (టోకెన్0 కి టోకెన్1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC పూల్‌లో, ఒక `token1` (WETH) కొనడానికి మనకు ఎన్ని `token0` (USDC) అవసరమో తెలుసుకోవాలనుకుంటున్నాము. WETH/WBTC పూల్‌లో, ఒక `token0` (WBTC, ఇది ర్యాప్డ్ బిట్‌కాయిన్) కొనడానికి మనకు ఎన్ని `token1` (WETH) అవసరమో తెలుసుకోవాలనుకుంటున్నాము. పూల్ నిష్పత్తిని రివర్స్ చేయాలా వద్దా అని మనం ట్రాక్ చేయాలి.

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

పూల్‌ను రివర్స్ చేయాలా వద్దా అని తెలుసుకోవడానికి, మనం దానిని `read_pool`కి ఇన్‌పుట్‌గా పొందుతాము. అలాగే, ఆస్తి చిహ్నం సరిగ్గా సెటప్ చేయబడాలి.

`<a> if <b> else <c>` సింటాక్స్ అనేది [టెర్నరీ కండిషనల్ ఆపరేటర్](https://en.wikipedia.org/wiki/Ternary_conditional_operator)కి సమానమైన Python, ఇది C-ఉత్పన్న భాషలో `<b> ? <a> : <c>` అవుతుంది.

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

Pythonలో [మల్టీ-లైన్ స్ట్రింగ్ లిటరల్స్](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... `"""` గా వ్రాయబడతాయి.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

ఇక్కడ, మనం `format_quotes`తో ప్రతి కోట్ జాబితా కోసం ఒక స్ట్రింగ్‌ను రూపొందించడానికి [MapReduce](https://en.wikipedia.org/wiki/MapReduce) ప్యాటర్న్‌ను ఉపయోగిస్తాము, ఆపై ప్రాంప్ట్‌లో ఉపయోగించడానికి వాటిని ఒకే స్ట్రింగ్‌గా తగ్గిస్తాము.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

మిగిలిన ప్రాంప్ట్ ఊహించిన విధంగానే ఉంటుంది.

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

రెండు పూల్స్‌ను సమీక్షించండి మరియు రెండింటి నుండి కోట్‌లను పొందండి.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

మనం అంచనా వేయాలనుకుంటున్న భవిష్యత్తు సమయాన్ని నిర్ణయించండి మరియు ప్రాంప్ట్‌ను సృష్టించండి.

### LLMతో ఇంటర్‌ఫేసింగ్ {#interface-llm}

తరువాత, మనం వాస్తవ LLMని ప్రాంప్ట్ చేస్తాము మరియు ఆశించిన భవిష్యత్తు విలువను స్వీకరిస్తాము. నేను OpenAIని ఉపయోగించి ఈ ప్రోగ్రామ్‌ను వ్రాసాను, కాబట్టి మీరు వేరే ప్రొవైడర్‌ను ఉపయోగించాలనుకుంటే, మీరు దానిని సర్దుబాటు చేయాలి.

1. [OpenAI ఖాతాను](https://auth.openai.com/create-account) పొందండి
2. [ఖాతాకు నిధులు సమకూర్చండి](https://platform.openai.com/settings/organization/billing/overview)—వ్రాసే సమయానికి కనీస మొత్తం $5
3. [API కీని సృష్టించండి](https://platform.openai.com/settings/organization/api-keys)
4. కమాండ్ లైన్‌లో, API కీని ఎగుమతి చేయండి, తద్వారా మీ ప్రోగ్రామ్ దానిని ఉపయోగించగలదు

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. ఏజెంట్‌ను చెక్అవుట్ చేసి రన్ చేయండి

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

ఇక్కడ కొత్త కోడ్ ఉంది.

```python
from openai import OpenAI

open_ai = OpenAI()  # క్లయింట్ OPENAI_API_KEY ఎన్విరాన్‌మెంట్ వేరియబుల్‌ను చదువుతుంది
```

OpenAI APIని దిగుమతి చేసి ఇన్‌స్టాన్షియేట్ చేయండి.

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

ధరను అవుట్‌పుట్ చేయండి మరియు కొనుగోలు లేదా విక్రయ సిఫార్సును అందించండి.

#### అంచనాలను పరీక్షించడం {#testing-the-predictions}

ఇప్పుడు మనం అంచనాలను రూపొందించగలం కాబట్టి, మనం ఉపయోగకరమైన అంచనాలను ఉత్పత్తి చేస్తున్నామా లేదా అని అంచనా వేయడానికి చారిత్రక డేటాను కూడా ఉపయోగించవచ్చు.

```sh
uv run test-predictor.py
```

ఆశించిన ఫలితం దీనికి సమానంగా ఉంటుంది:

```
Prediction for 2026-01-05T19:50: predicted 3138.93 USD, real 3218.92 USD, error 79.99 USD
Prediction for 2026-01-06T19:56: predicted 3243.39 USD, real 3221.08 USD, error 22.31 USD
Prediction for 2026-01-07T20:02: predicted 3223.24 USD, real 3146.89 USD, error 76.35 USD
Prediction for 2026-01-08T20:11: predicted 3150.47 USD, real 3092.04 USD, error 58.43 USD
.
.
.
Prediction for 2026-01-31T22:33: predicted 2637.73 USD, real 2417.77 USD, error 219.96 USD
Prediction for 2026-02-01T22:41: predicted 2381.70 USD, real 2318.84 USD, error 62.86 USD
Prediction for 2026-02-02T22:49: predicted 2234.91 USD, real 2349.28 USD, error 114.37 USD
Mean prediction error over 29 predictions: 83.87103448275862068965517241 USD
Mean change per recommendation: 4.787931034482758620689655172 USD
Standard variance of changes: 104.42 USD
Profitable days: 51.72%
Losing days: 48.28%
```

టెస్టర్‌లో ఎక్కువ భాగం ఏజెంట్‌కి సమానంగా ఉంటుంది, కానీ ఇక్కడ కొత్తవి లేదా సవరించబడిన భాగాలు ఉన్నాయి.

```python
CYCLES_FOR_TEST = 40 # బ్యాక్‌టెస్ట్ కోసం, మనం ఎన్ని సైకిల్స్ పరీక్షిస్తాము

# చాలా కోట్స్ పొందండి
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

మనం `CYCLES_FOR_TEST` (ఇక్కడ 40గా పేర్కొనబడింది) రోజుల వెనుకకు చూస్తాము.

```python
# అంచనాలను సృష్టించండి మరియు వాటిని నిజమైన చరిత్రతో తనిఖీ చేయండి

total_error = Decimal(0)
changes = []
```

మనకు ఆసక్తి ఉన్న రెండు రకాల లోపాలు ఉన్నాయి. మొదటిది, `total_error`, ప్రిడిక్టర్ చేసిన లోపాల మొత్తం.

రెండవది, `changes`ని అర్థం చేసుకోవడానికి, మనం ఏజెంట్ ప్రయోజనాన్ని గుర్తుంచుకోవాలి. ఇది WETH/USDC నిష్పత్తిని (ETH ధర) అంచనా వేయడం కాదు. ఇది విక్రయ మరియు కొనుగోలు సిఫార్సులను జారీ చేయడం. ప్రస్తుతం ధర $2000 ఉండి, రేపు $2010 ఉంటుందని అంచనా వేస్తే, వాస్తవ ఫలితం $2020 ఉండి మనం అదనపు డబ్బు సంపాదిస్తే మనం పట్టించుకోము. కానీ అది $2010 అని అంచనా వేసి, ఆ సిఫార్సు ఆధారంగా ETH కొని, ధర $1990కి పడిపోతే మనం _ఖచ్చితంగా_ పట్టించుకుంటాము.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

పూర్తి చరిత్ర (అంచనా కోసం ఉపయోగించిన విలువలు మరియు దానిని పోల్చడానికి వాస్తవ-ప్రపంచ విలువ) అందుబాటులో ఉన్న కేసులను మాత్రమే మనం చూడగలం. అంటే సరికొత్త కేసు `CYCLES_BACK` క్రితం ప్రారంభమైనది అయి ఉండాలి.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

ఏజెంట్ ఉపయోగించే సంఖ్యకు సమానమైన నమూనాలను పొందడానికి [స్లైస్‌లను](https://www.w3schools.com/python/ref_func_slice.asp) ఉపయోగించండి. ఇక్కడ మరియు తదుపరి విభాగానికి మధ్య ఉన్న కోడ్ ఏజెంట్‌లో మనకు ఉన్న అదే గెట్-ఎ-ప్రిడిక్షన్ కోడ్.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

అంచనా వేసిన ధర, వాస్తవ ధర మరియు అంచనా వేసిన సమయంలోని ధరను పొందండి. సిఫార్సు కొనుగోలు చేయాలా లేదా విక్రయించాలా అని నిర్ణయించడానికి అంచనా వేసిన సమయంలోని ధర మనకు అవసరం.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

లోపాన్ని లెక్కించండి మరియు దానిని మొత్తానికి జోడించండి.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` కోసం, ఒక ETH కొనడం లేదా అమ్మడం వల్ల కలిగే ద్రవ్య ప్రభావాన్ని మనం కోరుకుంటున్నాము. కాబట్టి ముందుగా, మనం సిఫార్సును నిర్ణయించాలి, ఆపై వాస్తవ ధర ఎలా మారిందో అంచనా వేయాలి మరియు సిఫార్సు డబ్బు సంపాదించిందా (సానుకూల మార్పు) లేదా డబ్బు ఖర్చు చేసిందా (ప్రతికూల మార్పు) అని అంచనా వేయాలి.

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

లాభదాయకమైన రోజుల సంఖ్య మరియు నష్టపోయిన రోజుల సంఖ్యను లెక్కించడానికి [`filter`](https://www.w3schools.com/python/ref_func_filter.asp)ని ఉపయోగించండి. ఫలితం ఒక ఫిల్టర్ ఆబ్జెక్ట్, పొడవును పొందడానికి మనం దానిని జాబితాగా మార్చాలి.

### లావాదేవీలను సమర్పించడం {#submit-txn}

ఇప్పుడు మనం వాస్తవానికి లావాదేవీలను సమర్పించాలి. అయితే, సిస్టమ్ నిరూపించబడకముందే, ఈ సమయంలో నేను నిజమైన డబ్బు ఖర్చు చేయాలనుకోవడం లేదు. బదులుగా, మనం మెయిన్‌నెట్ యొక్క స్థానిక ఫోర్క్‌ను సృష్టిస్తాము మరియు ఆ నెట్‌వర్క్‌లో "ట్రేడ్" చేస్తాము.

స్థానిక ఫోర్క్‌ను సృష్టించడానికి మరియు ట్రేడింగ్‌ను ప్రారంభించడానికి ఇక్కడ దశలు ఉన్నాయి.

1. [Foundry](https://getfoundry.sh/introduction/installation)ని ఇన్‌స్టాల్ చేయండి

2. [`anvil`](https://getfoundry.sh/anvil/overview)ని ప్రారంభించండి

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry కోసం డిఫాల్ట్ URL, http://localhost:8545లో వింటోంది, కాబట్టి బ్లాక్‌చైన్‌ను మార్చడానికి మనం ఉపయోగించే [`cast` కమాండ్](https://getfoundry.sh/cast/overview) కోసం URLని పేర్కొనాల్సిన అవసరం లేదు.

3. `anvil`లో రన్ చేస్తున్నప్పుడు, ETH ఉన్న పది టెస్ట్ ఖాతాలు ఉన్నాయి—మొదటి దాని కోసం ఎన్విరాన్‌మెంట్ వేరియబుల్స్‌ను సెట్ చేయండి

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. మనం ఉపయోగించాల్సిన కాంట్రాక్ట్‌లు ఇవి. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) అనేది మనం వాస్తవానికి ట్రేడ్ చేయడానికి ఉపయోగించే యూనిస్వాప్ v3 కాంట్రాక్ట్. మనం నేరుగా పూల్ ద్వారా ట్రేడ్ చేయవచ్చు, కానీ ఇది చాలా సులభం.

   దిగువన ఉన్న రెండు వేరియబుల్స్ WETH మరియు USDC మధ్య మార్పిడి చేయడానికి అవసరమైన యూనిస్వాప్ v3 పాత్‌లు.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ప్రతి టెస్ట్ ఖాతాలో 10,000 ETH ఉంటుంది. ట్రేడింగ్ కోసం 1000 WETH పొందడానికి 1000 ETHని ర్యాప్ చేయడానికి WETH కాంట్రాక్ట్‌ను ఉపయోగించండి.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC కోసం 500 WETHని ట్రేడ్ చేయడానికి `SwapRouter`ని ఉపయోగించండి.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` కాల్ ఒక అనుమతి మొత్తాన్ని సృష్టిస్తుంది, ఇది మన టోకెన్‌లలో కొన్నింటిని ఖర్చు చేయడానికి `SwapRouter`ని అనుమతిస్తుంది. కాంట్రాక్ట్‌లు ఈవెంట్‌లను పర్యవేక్షించలేవు, కాబట్టి మనం టోకెన్‌లను నేరుగా `SwapRouter` కాంట్రాక్ట్‌కి బదిలీ చేస్తే, దానికి చెల్లించినట్లు తెలియదు. బదులుగా, మనం `SwapRouter` కాంట్రాక్ట్‌ను కొంత మొత్తాన్ని ఖర్చు చేయడానికి అనుమతిస్తాము, ఆపై `SwapRouter` దానిని చేస్తుంది. ఇది `SwapRouter` ద్వారా కాల్ చేయబడిన ఫంక్షన్ ద్వారా చేయబడుతుంది, కాబట్టి అది విజయవంతమైందో లేదో దానికి తెలుస్తుంది.

7. మీ వద్ద రెండు టోకెన్‌లు తగినంత ఉన్నాయో లేదో ధృవీకరించండి.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

ఇప్పుడు మన వద్ద WETH మరియు USDC ఉన్నాయి కాబట్టి, మనం వాస్తవానికి ఏజెంట్‌ను రన్ చేయవచ్చు.

```sh
git checkout 05-trade
uv run agent.py
```

అవుట్‌పుట్ దీనికి సమానంగా ఉంటుంది:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Current price: 1843.16
In 2026-02-06T23:07, expected price: 1724.41 USD
Account balances before trade:
USDC Balance: 927301.578272
WETH Balance: 500
Sell, I expect the price to go down by 118.75 USD
Approve transaction sent: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Approve transaction mined.
Sell transaction sent: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Sell transaction mined.
Account balances after trade:
USDC Balance: 929143.797116
WETH Balance: 499
```

దీన్ని వాస్తవానికి ఉపయోగించడానికి, మీకు కొన్ని చిన్న మార్పులు అవసరం.

- లైన్ 14లో, `MAINNET_URL`ని `https://eth.drpc.org` వంటి నిజమైన యాక్సెస్ పాయింట్‌కి మార్చండి
- లైన్ 28లో, `PRIVATE_KEY`ని మీ స్వంత ప్రైవేట్ కీకి మార్చండి
- మీరు చాలా సంపన్నులైతే మరియు నిరూపించబడని ఏజెంట్ కోసం ప్రతిరోజూ 1 ETHని కొనగలిగితే లేదా అమ్మగలిగితే తప్ప, `WETH_TRADE_AMOUNT`ని తగ్గించడానికి మీరు 29ని మార్చాలనుకోవచ్చు

#### కోడ్ వివరణ {#trading-code}

ఇక్కడ కొత్త కోడ్ ఉంది.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

దశ 4లో మనం ఉపయోగించిన అవే వేరియబుల్స్.

```python
WETH_TRADE_AMOUNT=1
```

ట్రేడ్ చేయాల్సిన మొత్తం.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

వాస్తవానికి ట్రేడ్ చేయడానికి, మనకు `approve` ఫంక్షన్ అవసరం. మనం ముందు మరియు తర్వాత బ్యాలెన్స్‌లను కూడా చూపించాలనుకుంటున్నాము, కాబట్టి మనకు `balanceOf` కూడా అవసరం.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABIలో మనకు కేవలం `exactInput` అవసరం. ఖచ్చితంగా ఒక WETHని కొనుగోలు చేయడానికి మనం ఉపయోగించగల సంబంధిత ఫంక్షన్ `exactOutput` ఉంది, కానీ సరళత కోసం మనం రెండు సందర్భాల్లోనూ `exactInput`ని ఉపయోగిస్తాము.

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

లావాదేవీ పారామితులు. ఇక్కడ మనకు ఒక ఫంక్షన్ అవసరం ఎందుకంటే [నాన్స్](https://en.wikipedia.org/wiki/Cryptographic_nonce) ప్రతిసారీ మారాలి.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` కోసం టోకెన్ అనుమతి మొత్తాన్ని ఆమోదించండి.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3లో మనం లావాదేవీని పంపే విధానం ఇది. ముందుగా మనం లావాదేవీని నిర్మించడానికి [`Contract` ఆబ్జెక్ట్‌ను](https://web3py.readthedocs.io/en/stable/web3.contract.html) ఉపయోగిస్తాము. ఆపై మనం `PRIVATE_KEY`ని ఉపయోగించి లావాదేవీపై సంతకం చేయడానికి [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction)ని ఉపయోగిస్తాము. చివరగా, లావాదేవీని పంపడానికి మనం [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction)ని ఉపయోగిస్తాము.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

లావాదేవీ మైన్ చేయబడే వరకు [`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) వేచి ఉంటుంది. అవసరమైతే అది రశీదును తిరిగి ఇస్తుంది.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETHని విక్రయించేటప్పుడు ఇవి పారామితులు.

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

`SELL_PARAMS`కి భిన్నంగా, కొనుగోలు పారామితులు మారవచ్చు. ఇన్‌పుట్ మొత్తం 1 WETH ధర, ఇది `quote`లో అందుబాటులో ఉంటుంది.

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

`buy()` మరియు `sell()` ఫంక్షన్‌లు దాదాపు ఒకేలా ఉంటాయి. ముందుగా మనం `SwapRouter` కోసం తగినంత అనుమతి మొత్తాన్ని ఆమోదిస్తాము, ఆపై సరైన పాత్ మరియు మొత్తంతో దానికి కాల్ చేస్తాము.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

రెండు కరెన్సీలలో వినియోగదారు బ్యాలెన్స్‌లను నివేదించండి.

```python
print("Account balances before trade:")
balances()

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
    sell()

print("Account balances after trade:")
balances()
```

ఈ ఏజెంట్ ప్రస్తుతం ఒకసారి మాత్రమే పనిచేస్తుంది. అయితే, మీరు దీన్ని [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) నుండి రన్ చేయడం ద్వారా లేదా 368-400 లైన్‌లను లూప్‌లో చుట్టడం ద్వారా మరియు తదుపరి సైకిల్ సమయం వచ్చే వరకు వేచి ఉండటానికి [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep)ని ఉపయోగించడం ద్వారా నిరంతరం పనిచేసేలా మార్చవచ్చు.

## సాధ్యమయ్యే మెరుగుదలలు {#improvements}

ఇది పూర్తి ప్రొడక్షన్ వెర్షన్ కాదు; ఇది కేవలం ప్రాథమికాలను నేర్పడానికి ఒక ఉదాహరణ మాత్రమే. మెరుగుదలల కోసం ఇక్కడ కొన్ని ఆలోచనలు ఉన్నాయి.

### తెలివైన ట్రేడింగ్ {#smart-trading}

ఏమి చేయాలో నిర్ణయించేటప్పుడు ఏజెంట్ విస్మరించే రెండు ముఖ్యమైన వాస్తవాలు ఉన్నాయి.

- _ఆశించిన మార్పు యొక్క పరిమాణం_. తగ్గుదల పరిమాణంతో సంబంధం లేకుండా, ధర తగ్గుతుందని భావిస్తే ఏజెంట్ నిర్ణీత మొత్తంలో `WETH`ని విక్రయిస్తుంది.
  చిన్న మార్పులను విస్మరించడం మరియు ధర ఎంత తగ్గుతుందని మనం ఆశిస్తున్నాము అనే దాని ఆధారంగా విక్రయించడం మంచిది.
- _ప్రస్తుత పోర్ట్‌ఫోలియో_. మీ పోర్ట్‌ఫోలియోలో 10% WETHలో ఉంటే మరియు ధర పెరుగుతుందని మీరు భావిస్తే, బహుశా మరింత కొనుగోలు చేయడం సమంజసం. కానీ మీ పోర్ట్‌ఫోలియోలో 90% WETHలో ఉంటే, మీరు తగినంతగా ఎక్స్‌పోజ్ అయి ఉండవచ్చు మరియు మరింత కొనుగోలు చేయాల్సిన అవసరం లేదు. ధర తగ్గుతుందని మీరు ఆశిస్తే దీనికి విరుద్ధంగా ఉంటుంది.

### మీ ట్రేడింగ్ వ్యూహాన్ని రహస్యంగా ఉంచాలనుకుంటే ఏమి చేయాలి? {#secret}

AI విక్రేతలు మీరు వారి LLMలకు పంపే ప్రశ్నలను చూడగలరు, ఇది మీ ఏజెంట్‌తో మీరు అభివృద్ధి చేసిన అద్భుతమైన ట్రేడింగ్ సిస్టమ్‌ను బహిర్గతం చేస్తుంది. చాలా మంది వ్యక్తులు ఉపయోగించే ట్రేడింగ్ సిస్టమ్ పనికిరానిది ఎందుకంటే మీరు కొనుగోలు చేయాలనుకున్నప్పుడు చాలా మంది కొనుగోలు చేయడానికి ప్రయత్నిస్తారు (మరియు ధర పెరుగుతుంది) మరియు మీరు విక్రయించాలనుకున్నప్పుడు విక్రయించడానికి ప్రయత్నిస్తారు (మరియు ధర తగ్గుతుంది).

ఈ సమస్యను నివారించడానికి, మీరు ఉదాహరణకు [LM-Studio](https://lmstudio.ai/)ని ఉపయోగించి స్థానికంగా LLMని రన్ చేయవచ్చు.

### AI బాట్ నుండి కృత్రిమ మేధ ఏజెంట్‌కి {#bot-to-agent}

ఇది [ఒక AI బాట్, కృత్రిమ మేధ ఏజెంట్ కాదు](/ai-agents/#ai-agents-vs-ai-bots) అని మీరు మంచి వాదన చేయవచ్చు. ఇది ముందే నిర్వచించబడిన సమాచారంపై ఆధారపడే సాపేక్షంగా సరళమైన వ్యూహాన్ని అమలు చేస్తుంది. ఉదాహరణకు, యూనిస్వాప్ v3 పూల్స్ మరియు వాటి తాజా విలువల జాబితాను అందించడం ద్వారా మరియు ఏ కలయిక ఉత్తమ అంచనా విలువను కలిగి ఉందో అడగడం ద్వారా మనం స్వీయ-మెరుగుదలను ప్రారంభించవచ్చు.

### స్లిప్పేజ్ రక్షణ {#slippage-protection}

ప్రస్తుతం [స్లిప్పేజ్ రక్షణ](https://uniswapv3book.com/milestone_3/slippage-protection.html) లేదు. ప్రస్తుత కోట్ $2000 ఉండి, ఆశించిన ధర $2100 అయితే, ఏజెంట్ కొనుగోలు చేస్తుంది. అయితే, ఏజెంట్ కొనుగోలు చేయడానికి ముందు ధర $2200కి పెరిగితే, ఇకపై కొనుగోలు చేయడంలో అర్థం లేదు.

స్లిప్పేజ్ రక్షణను అమలు చేయడానికి, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) యొక్క 325 మరియు 334 లైన్‌లలో `amountOutMinimum` విలువను పేర్కొనండి.

## ముగింపు {#conclusion}

కృత్రిమ మేధ ఏజెంట్‌లతో ప్రారంభించడానికి మీకు ఇప్పుడు తగినంత తెలుసని ఆశిస్తున్నాము. ఇది ఈ విషయం యొక్క సమగ్ర అవలోకనం కాదు; దానికి అంకితం చేయబడిన మొత్తం పుస్తకాలు ఉన్నాయి, కానీ మీరు ప్రారంభించడానికి ఇది సరిపోతుంది. అభినందనలు!

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).