---
title: "எத்திரியத்தில் உங்கள் சொந்த செயற்கை நுண்ணறிவு வர்த்தக முகவரை உருவாக்குங்கள்"
description: "இந்த வழிகாட்டியில் ஒரு எளிய செயற்கை நுண்ணறிவு வர்த்தக முகவரை எவ்வாறு உருவாக்குவது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள். இந்த முகவர் தொகுதிச்சங்கிலியிலிருந்து தகவல்களைப் படிக்கிறது, அந்தத் தகவலின் அடிப்படையில் ஒரு பரிந்துரைக்காக LLM-ஐக் கேட்கிறது, LLM பரிந்துரைக்கும் வர்த்தகத்தைச் செய்கிறது, பின்னர் காத்திருந்து மீண்டும் செய்கிறது."
author: "ஓரி பொமரன்ட்ஸ்"
tags: ["AI", "வர்த்தகம்", "முகவர்", "Python"]
skill: intermediate
breadcrumb: "செயற்கை நுண்ணறிவு வர்த்தக முகவர்"
published: 2026-02-13
lang: ta
sidebarDepth: 3
---

இந்த வழிகாட்டியில் ஒரு எளிய செயற்கை நுண்ணறிவு வர்த்தக முகவரை (AI trading agent) எவ்வாறு உருவாக்குவது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள். இந்த முகவர் பின்வரும் படிகளைப் பயன்படுத்தி செயல்படுகிறது:

1. ஒரு வில்லையின் (token) தற்போதைய மற்றும் கடந்த கால விலைகளையும், அத்துடன் தொடர்புடைய பிற தகவல்களையும் படிக்கிறது
2. இந்தத் தகவல்களுடன், அது எவ்வாறு தொடர்புடையதாக இருக்கலாம் என்பதை விளக்கும் பின்னணித் தகவல்களையும் சேர்த்து ஒரு வினவலை உருவாக்குகிறது
3. வினவலைச் சமர்ப்பித்து, கணிக்கப்பட்ட விலையைத் திரும்பப் பெறுகிறது
4. பரிந்துரையின் அடிப்படையில் வர்த்தகம் செய்கிறது
5. காத்திருந்து மீண்டும் செய்கிறது

இந்த முகவர் தகவல்களை எவ்வாறு படிப்பது, பயன்படுத்தக்கூடிய பதிலைத் தரும் வினவலாக அதை எவ்வாறு மாற்றுவது மற்றும் அந்தப் பதிலை எவ்வாறு பயன்படுத்துவது என்பதை விளக்குகிறது. இவை அனைத்தும் ஒரு செயற்கை நுண்ணறிவு முகவருக்குத் தேவையான படிகளாகும். AI-இல் மிகவும் பொதுவாகப் பயன்படுத்தப்படும் மொழி என்பதால், இந்த முகவர் Python-இல் செயல்படுத்தப்பட்டுள்ளது.

## இதை ஏன் செய்ய வேண்டும்? {#why-do-this}

தானியங்கி வர்த்தக முகவர்கள், உருவாக்குநர்கள் ஒரு வர்த்தக உத்தியைத் (trading strategy) தேர்ந்தெடுத்துச் செயல்படுத்த அனுமதிக்கின்றன. [செயற்கை நுண்ணறிவு முகவர்கள்](/ai-agents) மிகவும் சிக்கலான மற்றும் ஆற்றல்மிக்க வர்த்தக உத்திகளை அனுமதிக்கின்றன, உருவாக்குநர் பயன்படுத்தக் கருதிப் பார்க்காத தகவல்கள் மற்றும் வழிமுறைகளைக் கூட இவை பயன்படுத்தக்கூடும்.

## கருவிகள் {#tools}

இந்த வழிகாட்டி மேற்கோள்கள் மற்றும் வர்த்தகத்திற்கு [Python](https://www.python.org/), [Web3 நிரலகம்](https://web3py.readthedocs.io/en/stable/) மற்றும் [யூனிஸ்வாப் v3](https://github.com/Uniswap/v3-periphery) ஆகியவற்றைப் பயன்படுத்துகிறது.

### ஏன் Python? {#python}

AI-க்கு மிகவும் பரவலாகப் பயன்படுத்தப்படும் மொழி [Python](https://www.python.org/) ஆகும், எனவே அதை நாம் இங்கு பயன்படுத்துகிறோம். உங்களுக்கு Python தெரியாவிட்டாலும் கவலைப்பட வேண்டாம். இந்த மொழி மிகவும் தெளிவானது, மேலும் அது என்ன செய்கிறது என்பதை நான் சரியாக விளக்குவேன்.

[Web3 நிரலகம்](https://web3py.readthedocs.io/en/stable/) என்பது மிகவும் பொதுவான Python எத்திரியம் API ஆகும். இதைப் பயன்படுத்துவது மிகவும் எளிதானது.

### தொகுதிச்சங்கிலியில் வர்த்தகம் {#trading-on-blockchain}

எத்திரியத்தில் வில்லைகளை வர்த்தகம் செய்ய உங்களை அனுமதிக்கும் [பல பரவலாக்கப்பட்ட பரிமாற்றங்கள் (DEX)](/apps/categories/defi/) உள்ளன. இருப்பினும், [விலை வித்தியாசம் (arbitrage)](/developers/docs/smart-contracts/composability/#better-user-experience) காரணமாக அவை ஒரே மாதிரியான பரிமாற்ற விகிதங்களைக் கொண்டிருக்கின்றன.

[யூனிஸ்வாப்](https://app.uniswap.org/) என்பது பரவலாகப் பயன்படுத்தப்படும் ஒரு DEX ஆகும், இதை நாம் மேற்கோள்களுக்கும் (வில்லையின் ஒப்பீட்டு மதிப்புகளைப் பார்க்க) மற்றும் வர்த்தகங்களுக்கும் பயன்படுத்தலாம்.

### OpenAI {#openai}

ஒரு பெரிய மொழி மாதிரிக்கு (large language model), நான் [OpenAI](https://openai.com/) உடன் தொடங்க முடிவு செய்தேன். இந்த வழிகாட்டியில் உள்ள பயன்பாட்டை இயக்க, நீங்கள் API அணுகலுக்குப் பணம் செலுத்த வேண்டும். குறைந்தபட்ச கட்டணமான $5 போதுமானதை விட அதிகமாகும்.

## மேம்பாடு, படிப்படியாக {#step-by-step}

மேம்பாட்டை எளிதாக்க, நாம் கட்டம் கட்டமாகச் செல்கிறோம். ஒவ்வொரு படியும் GitHub-இல் ஒரு கிளையாகும்.

### தொடங்குதல் {#getting-started}

UNIX அல்லது Linux (அதில் [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) அடங்கும்) கீழ் தொடங்குவதற்கான படிகள் உள்ளன

1. உங்களிடம் ஏற்கனவே இல்லையென்றால், [Python](https://www.python.org/downloads/)-ஐப் பதிவிறக்கி நிறுவவும்.

2. GitHub களஞ்சியத்தை (repository) குளோன் செய்யவும்.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/)-ஐ நிறுவவும். உங்கள் கணினியில் உள்ள கட்டளை வேறுபட்டிருக்கலாம்.

   ```sh
   pipx install uv
   ```

4. நிரலகங்களைப் பதிவிறக்கவும்.

   ```sh
   uv sync
   ```

5. மெய்நிகர் சூழலை (virtual environment) செயல்படுத்தவும்.

   ```sh
   source .venv/bin/activate
   ```

6. Python மற்றும் Web3 சரியாக வேலை செய்கிறதா என்பதைச் சரிபார்க்க, `python3`-ஐ இயக்கி, இந்த நிரலை அதற்கு வழங்கவும். நீங்கள் அதை `>>>` வரியில் உள்ளிடலாம்; ஒரு கோப்பை உருவாக்க வேண்டிய அவசியமில்லை.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### தொகுதிச்சங்கிலியிலிருந்து படித்தல் {#read-blockchain}

அடுத்த படி தொகுதிச்சங்கிலியிலிருந்து படிப்பதாகும். அதைச் செய்ய, நீங்கள் `02-read-quote` கிளைக்கு மாற வேண்டும், பின்னர் நிரலை இயக்க `uv`-ஐப் பயன்படுத்த வேண்டும்.

```sh
git checkout 02-read-quote
uv run agent.py
```

நீங்கள் `Quote` பொருள்களின் பட்டியலைப் பெற வேண்டும், ஒவ்வொன்றும் ஒரு நேர முத்திரை (timestamp), ஒரு விலை மற்றும் சொத்து (தற்போது எப்போதும் `WETH/USDC`) ஆகியவற்றைக் கொண்டிருக்கும்.

இதோ வரிக்கு வரி விளக்கம்.

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

நமக்குத் தேவையான நிரலகங்களை இறக்குமதி செய்யவும். அவை பயன்படுத்தப்படும்போது கீழே விளக்கப்பட்டுள்ளன.

```python
print = functools.partial(print, flush=True)
```

Python-இன் `print`-ஐ எப்போதும் வெளியீட்டை உடனடியாக வெளியேற்றும் பதிப்பைக் கொண்டு மாற்றுகிறது. நீண்ட நேரம் இயங்கும் ஸ்கிரிப்ட்டில் இது பயனுள்ளதாக இருக்கும், ஏனெனில் நிலை புதுப்பிப்புகள் அல்லது பிழைத்திருத்த வெளியீட்டிற்காக நாம் காத்திருக்க விரும்பவில்லை.

```python
MAINNET_URL = "https://eth.drpc.org"
```

முதன்மை வலைப்பின்னலுக்குச் செல்வதற்கான URL. நீங்கள் [ஒரு சேவையாக கணு (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) என்பதிலிருந்து ஒன்றைப் பெறலாம் அல்லது [Chainlist](https://chainlist.org/chain/1)-இல் விளம்பரப்படுத்தப்பட்டவற்றில் ஒன்றைப் பயன்படுத்தலாம்.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ஒரு எத்தேரியம் முதன்மை வலைப்பின்னல் தொகுதி பொதுவாக ஒவ்வொரு பன்னிரண்டு வினாடிகளுக்கும் நிகழ்கிறது, எனவே ஒரு குறிப்பிட்ட காலப்பகுதியில் நிகழும் என்று நாம் எதிர்பார்க்கும் தொகுதிகளின் எண்ணிக்கை இவை. இது ஒரு சரியான எண்ணிக்கை அல்ல என்பதை நினைவில் கொள்க. [தொகுதி முன்மொழிபவர்](/developers/docs/consensus-mechanisms/pos/block-proposal/) செயலிழக்கும்போது, அந்தத் தொகுதி தவிர்க்கப்படும், மேலும் அடுத்த தொகுதிக்கான நேரம் 24 வினாடிகள் ஆகும். ஒரு நேர முத்திரைக்குச் சரியான தொகுதியைப் பெற விரும்பினால், நாம் [இருமத் தேடலைப் (binary search)](https://en.wikipedia.org/wiki/Binary_search) பயன்படுத்துவோம். இருப்பினும், இது நமது நோக்கங்களுக்குப் போதுமான அளவு நெருக்கமாக உள்ளது. எதிர்காலத்தைக் கணிப்பது ஒரு துல்லியமான அறிவியல் அல்ல.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

சுழற்சியின் அளவு. ஒரு சுழற்சிக்கு ஒரு முறை மேற்கோள்களை மதிப்பாய்வு செய்து, அடுத்த சுழற்சியின் முடிவில் மதிப்பை மதிப்பிட முயற்சிக்கிறோம்.

```python
# நாம் படிக்கும் திரட்டின் முகவரி
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

மேற்கோள் மதிப்புகள் [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) என்ற முகவரியில் உள்ள யூனிஸ்வாப் 3 USDC/WETH தொகுப்பிலிருந்து (pool) எடுக்கப்படுகின்றன. இந்த முகவரி ஏற்கனவே செக்சம் (checksum) வடிவத்தில் உள்ளது, ஆனால் குறியீட்டை மீண்டும் பயன்படுத்தக்கூடியதாக மாற்ற [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address)-ஐப் பயன்படுத்துவது நல்லது.

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

நாம் தொடர்பு கொள்ள வேண்டிய இரண்டு ஒப்பந்தங்களுக்கான [ABI-கள்](https://docs.soliditylang.org/en/latest/abi-spec.html) இவை. குறியீட்டைச் சுருக்கமாக வைத்திருக்க, நாம் அழைக்க வேண்டிய செயல்பாடுகளை (functions) மட்டுமே சேர்த்துள்ளோம்.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) நிரலகத்தைத் தொடங்கி, ஒரு எத்திரியம் கணுவுடன் இணைக்கவும்.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Python-இல் தரவு வகுப்பை (data class) உருவாக்குவதற்கான ஒரு வழி இது. ஒப்பந்தத்துடன் இணைக்க [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) தரவு வகை பயன்படுத்தப்படுகிறது. `(frozen=True)`-ஐக் கவனிக்கவும். Python-இல் [பூலியன்கள் (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) பெரிய எழுத்துக்களில் `True` அல்லது `False` என வரையறுக்கப்படுகின்றன. இந்தத் தரவு வகுப்பு `frozen` ஆகும், அதாவது புலங்களை (fields) மாற்ற முடியாது.

உள்தள்ளலைக் (indentation) கவனிக்கவும். [C-யிலிருந்து பெறப்பட்ட மொழிகளுக்கு](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) மாறாக, Python தொகுதிகளைக் குறிக்க உள்தள்ளலைப் பயன்படுத்துகிறது. பின்வரும் வரையறை இந்தத் தரவு வகுப்பின் ஒரு பகுதி அல்ல என்பதை Python மொழிபெயர்ப்பான் (interpreter) அறியும், ஏனெனில் இது தரவு வகுப்புப் புலங்களின் அதே உள்தள்ளலில் தொடங்கவில்லை.

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

தசம பின்னங்களைத் துல்லியமாகக் கையாள [`Decimal`](https://docs.python.org/3/library/decimal.html) வகை பயன்படுத்தப்படுகிறது.

```python
    def get_price(self, block: int) -> Decimal:
```

Python-இல் ஒரு செயல்பாட்டை வரையறுக்கும் வழி இதுதான். இது இன்னும் `PoolInfo`-இன் ஒரு பகுதி என்பதைக் காட்ட வரையறை உள்தள்ளப்பட்டுள்ளது.

தரவு வகுப்பின் ஒரு பகுதியாக இருக்கும் ஒரு செயல்பாட்டில், முதல் அளவுரு (parameter) எப்போதும் `self` ஆகும், இது இங்கு அழைக்கப்பட்ட தரவு வகுப்பு நிகழ்வாகும் (instance). இங்கே தொகுதி எண் என்ற மற்றொரு அளவுரு உள்ளது.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

நம்மால் எதிர்காலத்தைப் படிக்க முடிந்தால், வர்த்தகத்திற்கு நமக்கு AI தேவைப்படாது.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3-இலிருந்து EVM-இல் ஒரு செயல்பாட்டை அழைப்பதற்கான தொடரியல் (syntax) இதுதான்: `<contract object>.functions.<function name>().call(<parameters>)`. அளவுருக்கள் EVM செயல்பாட்டின் அளவுருக்களாக (ஏதேனும் இருந்தால்; இங்கே எதுவும் இல்லை) அல்லது தொகுதிச்சங்கிலி நடத்தையை மாற்றுவதற்கான [பெயரிடப்பட்ட அளவுருக்களாக](https://en.wikipedia.org/wiki/Named_parameter) இருக்கலாம். நாம் இயக்க விரும்பும் [தொகுதி எண்ணைக்](/developers/docs/apis/json-rpc/#default-block) குறிப்பிட, இங்கே `block_identifier` என்ற ஒன்றைப் பயன்படுத்துகிறோம்.

இதன் முடிவு [இந்தக் கட்டமைப்பு (struct), அணி (array) வடிவத்தில்](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72) இருக்கும். முதல் மதிப்பு இரண்டு வில்லைகளுக்கு இடையிலான பரிமாற்ற விகிதத்தின் செயல்பாடாகும்.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

சங்கிலிசார் கணக்கீடுகளைக் குறைக்க, யூனிஸ்வாப் v3 உண்மையான பரிமாற்ற காரணியைச் சேமிக்காமல் அதன் வர்க்க மூலத்தைச் (square root) சேமிக்கிறது. EVM மிதவைப் புள்ளி (floating point) கணிதம் அல்லது பின்னங்களை ஆதரிக்காததால், உண்மையான மதிப்பிற்குப் பதிலாக, பதில் <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math> ஆக இருக்கும்.

```python
         # (வில்லை0 ஒன்றுக்கு வில்லை1)
        return 1/(raw_price * self.decimal_factor)
```

நாம் பெறும் மூல விலை என்பது ஒவ்வொரு `token1`-க்கும் நாம் பெறும் `token0`-இன் எண்ணிக்கையாகும். நமது தொகுப்பில் `token0` என்பது USDC (அமெரிக்க டாலரின் அதே மதிப்பைக் கொண்ட ஸ்டேபிள்காயின்) மற்றும் `token1` என்பது [பொதியப்பட்ட ஈதர் (WETH)](https://opensea.io/learn/blockchain/what-is-weth) ஆகும். நாம் உண்மையில் விரும்பும் மதிப்பு ஒரு WETH-க்கு எத்தனை டாலர்கள் என்பதுதான், அதன் தலைகீழ் அல்ல.

தசம காரணி என்பது இரண்டு வில்லைகளுக்கான [தசம காரணிகளுக்கு](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) இடையிலான விகிதமாகும்.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

இந்தத் தரவு வகுப்பு ஒரு மேற்கோளைக் குறிக்கிறது: ஒரு குறிப்பிட்ட நேரத்தில் ஒரு குறிப்பிட்ட சொத்தின் விலை. இந்த கட்டத்தில், `asset` புலம் பொருத்தமற்றது, ஏனெனில் நாம் ஒரு தொகுப்பைப் பயன்படுத்துகிறோம், எனவே ஒரே ஒரு சொத்தை மட்டுமே கொண்டுள்ளோம். இருப்பினும், பின்னர் நாம் மேலும் சொத்துகளைச் சேர்ப்போம்.

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

இந்தச் செயல்பாடு ஒரு முகவரியை எடுத்து, அந்த முகவரியில் உள்ள வில்லை ஒப்பந்தம் பற்றிய தகவலை வழங்குகிறது. புதிய [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)-ஐ உருவாக்க, நாம் முகவரி மற்றும் ABI-ஐ `w3.eth.contract`-க்கு வழங்குகிறோம்.

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

இந்தச் செயல்பாடு [ஒரு குறிப்பிட்ட தொகுப்பைப்](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) பற்றி நமக்குத் தேவையான அனைத்தையும் வழங்குகிறது. `f"<string>"` என்ற தொடரியல் ஒரு [வடிவமைக்கப்பட்ட சரமாகும் (formatted string)](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

ஒரு `Quote` பொருளைப் பெறவும். `block_number`-க்கான இயல்புநிலை மதிப்பு `None` (மதிப்பு இல்லை) ஆகும்.

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

தொகுதி எண் குறிப்பிடப்படவில்லை என்றால், சமீபத்திய தொகுதி எண்ணான `w3.eth.block_number`-ஐப் பயன்படுத்தவும். இது [ஒரு `if` அறிக்கைக்கான](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) தொடரியல் ஆகும்.

இயல்புநிலையை `w3.eth.block_number` என அமைப்பது சிறப்பாக இருந்திருக்கும் என்று தோன்றலாம், ஆனால் அது சரியாக வேலை செய்யாது, ஏனெனில் அது செயல்பாடு வரையறுக்கப்படும் நேரத்தில் உள்ள தொகுதி எண்ணாக இருக்கும். நீண்ட நேரம் இயங்கும் முகவரில், இது ஒரு சிக்கலாக இருக்கும்.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

மனிதர்கள் மற்றும் பெரிய மொழி மாதிரிகள் (LLMs) படிக்கக்கூடிய வடிவத்திற்கு அதை வடிவமைக்க [`datetime` நிரலகத்தைப்](https://docs.python.org/3/library/datetime.html) பயன்படுத்தவும். மதிப்பை இரண்டு தசம இடங்களுக்கு முழுமையாக்க [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize)-ஐப் பயன்படுத்தவும்.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python-இல் ஒரு குறிப்பிட்ட வகையை மட்டுமே கொண்டிருக்கக்கூடிய ஒரு [பட்டியலை](https://docs.python.org/3/library/stdtypes.html#typesseq-list) `list[<type>]`-ஐப் பயன்படுத்தி நீங்கள் வரையறுக்கலாம்.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python-இல் ஒரு [`for` சுழற்சி (loop)](https://docs.python.org/3/tutorial/controlflow.html#for-statements) பொதுவாக ஒரு பட்டியலின் மீது மீண்டும் மீண்டும் செயல்படும். மேற்கோள்களைக் கண்டறிய வேண்டிய தொகுதி எண்களின் பட்டியல் [`range`](https://docs.python.org/3/library/stdtypes.html#range)-இலிருந்து வருகிறது.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

ஒவ்வொரு தொகுதி எண்ணுக்கும், ஒரு `Quote` பொருளைப் பெற்று அதை `quotes` பட்டியலில் சேர்க்கவும். பின்னர் அந்தப் பட்டியலைத் திருப்பி அனுப்பவும்.

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

இது ஸ்கிரிப்ட்டின் முக்கிய குறியீடாகும். தொகுப்புத் தகவலைப் படித்து, பன்னிரண்டு மேற்கோள்களைப் பெற்று, அவற்றை [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) செய்யவும்.

### ஒரு தூண்டுதலை (prompt) உருவாக்குதல் {#prompt}

அடுத்து, இந்த மேற்கோள்களின் பட்டியலை LLM-க்கான ஒரு தூண்டுதலாக மாற்றி, எதிர்பார்க்கப்படும் எதிர்கால மதிப்பைப் பெற வேண்டும்.

```sh
git checkout 03-create-prompt
uv run agent.py
```

வெளியீடு இப்போது LLM-க்கான ஒரு தூண்டுதலாக இருக்கப் போகிறது, இது பின்வருமாறு இருக்கும்:

```
இந்த மேற்கோள்களின் அடிப்படையில்:
சொத்து: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

சொத்து: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


2026-02-02T17:56 நேரத்தில் WETH/USDC-இன் மதிப்பு என்னவாக இருக்கும் என்று எதிர்பார்க்கிறீர்கள்?

உங்கள் பதிலை வேறு எந்த உரையுமின்றி, இரண்டு தசம இடங்களுக்கு முழுமையாக்கப்பட்ட
ஒரே எண்ணாக வழங்கவும்.
```

இங்கே `WETH/USDC` மற்றும் `WBTC/WETH` ஆகிய இரண்டு சொத்துகளுக்கான மேற்கோள்கள் இருப்பதைக் கவனிக்கவும். மற்றொரு சொத்திலிருந்து மேற்கோள்களைச் சேர்ப்பது கணிப்புத் துல்லியத்தை மேம்படுத்தக்கூடும்.

#### ஒரு தூண்டுதல் எப்படி இருக்கும் {#prompt-explanation}

இந்தத் தூண்டுதல் மூன்று பிரிவுகளைக் கொண்டுள்ளது, இவை LLM தூண்டுதல்களில் மிகவும் பொதுவானவை.

1. தகவல். LLM-கள் அவற்றின் பயிற்சியிலிருந்து நிறைய தகவல்களைக் கொண்டுள்ளன, ஆனால் அவை பொதுவாகச் சமீபத்திய தகவல்களைக் கொண்டிருப்பதில்லை. இதனால்தான் நாம் சமீபத்திய மேற்கோள்களை இங்கே மீட்டெடுக்க வேண்டும். ஒரு தூண்டுதலில் தகவலைச் சேர்ப்பது [மீட்டெடுப்பு மேம்படுத்தப்பட்ட உருவாக்கம் (retrieval augmented generation - RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) என்று அழைக்கப்படுகிறது.

2. உண்மையான கேள்வி. இதைத்தான் நாம் தெரிந்து கொள்ள விரும்புகிறோம்.

3. வெளியீட்டு வடிவமைப்பு வழிமுறைகள். பொதுவாக, ஒரு LLM அது எவ்வாறு அந்த முடிவுக்கு வந்தது என்ற விளக்கத்துடன் ஒரு மதிப்பீட்டை நமக்கு வழங்கும். இது மனிதர்களுக்குச் சிறந்தது, ஆனால் ஒரு கணினி நிரலுக்கு இறுதி முடிவு மட்டுமே தேவை.

#### குறியீடு விளக்கம் {#prompt-code}

புதிய குறியீடு இதோ.

```python
from datetime import datetime, timezone, timedelta
```

நாம் எந்த நேரத்திற்கான மதிப்பீட்டை விரும்புகிறோம் என்பதை LLM-க்கு வழங்க வேண்டும். எதிர்காலத்தில் "n நிமிடங்கள்/மணிநேரங்கள்/நாட்கள்" என்ற நேரத்தைப் பெற, நாம் [`timedelta` வகுப்பைப்](https://docs.python.org/3/library/datetime.html#datetime.timedelta) பயன்படுத்துகிறோம்.

```python
# நாம் படிக்கும் திரட்டுகளின் முகவரிகள்
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

நாம் படிக்க வேண்டிய இரண்டு தொகுப்புகள் உள்ளன.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (வில்லை0 ஒன்றுக்கு வில்லை1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC தொகுப்பில், ஒரு `token1` (WETH)-ஐ வாங்க எத்தனை `token0` (USDC) தேவை என்பதை நாம் அறிய விரும்புகிறோம். WETH/WBTC தொகுப்பில், ஒரு `token0` (WBTC, இது பொதியப்பட்ட பிட்காயின்)-ஐ வாங்க எத்தனை `token1` (WETH) தேவை என்பதை நாம் அறிய விரும்புகிறோம். தொகுப்பின் விகிதத்தைத் தலைகீழாக மாற்ற வேண்டுமா என்பதை நாம் கண்காணிக்க வேண்டும்.

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

ஒரு தொகுப்பைத் தலைகீழாக மாற்ற வேண்டுமா என்பதை அறிய, அதை `read_pool`-க்கு உள்ளீடாகப் பெறுகிறோம். மேலும், சொத்தின் குறியீடு சரியாக அமைக்கப்பட வேண்டும்.

`<a> if <b> else <c>` என்ற தொடரியல் என்பது [மும்மை நிபந்தனை இயக்கியின் (ternary conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) Python-க்கு இணையானதாகும், இது C-யிலிருந்து பெறப்பட்ட மொழியில் `<b> ? <a> : <c>` ஆக இருக்கும்.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

இந்தச் செயல்பாடு `Quote` பொருள்களின் பட்டியலை வடிவமைக்கும் ஒரு சரத்தை உருவாக்குகிறது, அவை அனைத்தும் ஒரே சொத்துக்குப் பொருந்தும் என்று கருதுகிறது.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python-இல் [பல வரிச் சர எழுத்துருக்கள் (multi-line string literals)](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... `"""` என எழுதப்படுகின்றன.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

இங்கே, `format_quotes` உடன் ஒவ்வொரு மேற்கோள் பட்டியலுக்கும் ஒரு சரத்தை உருவாக்க [MapReduce](https://en.wikipedia.org/wiki/MapReduce) முறையைப் பயன்படுத்துகிறோம், பின்னர் தூண்டுதலில் பயன்படுத்துவதற்காக அவற்றை ஒற்றைச் சரமாகக் குறைக்கிறோம்.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

தூண்டுதலின் மீதமுள்ள பகுதி எதிர்பார்த்தபடியே உள்ளது.

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

இரண்டு தொகுப்புகளையும் மதிப்பாய்வு செய்து இரண்டிலிருந்தும் மேற்கோள்களைப் பெறவும்.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

நாம் மதிப்பீட்டை விரும்பும் எதிர்கால நேரப் புள்ளியைத் தீர்மானித்து, தூண்டுதலை உருவாக்கவும்.

### LLM உடன் இடைமுகப்படுத்துதல் {#interface-llm}

அடுத்து, நாம் ஒரு உண்மையான LLM-ஐத் தூண்டி, எதிர்பார்க்கப்படும் எதிர்கால மதிப்பைப் பெறுகிறோம். நான் இந்த நிரலை OpenAI-ஐப் பயன்படுத்தி எழுதினேன், எனவே நீங்கள் வேறு வழங்குநரைப் பயன்படுத்த விரும்பினால், நீங்கள் அதைச் சரிசெய்ய வேண்டும்.

1. ஒரு [OpenAI கணக்கைப்](https://auth.openai.com/create-account) பெறவும்
2. [கணக்கிற்கு நிதியளிக்கவும்](https://platform.openai.com/settings/organization/billing/overview)—இதை எழுதும் நேரத்தில் குறைந்தபட்சத் தொகை $5 ஆகும்
3. [ஒரு API திறவுகோலை உருவாக்கவும்](https://platform.openai.com/settings/organization/api-keys)
4. கட்டளை வரியில், API திறவுகோலை ஏற்றுமதி செய்யவும், இதனால் உங்கள் நிரல் அதைப் பயன்படுத்த முடியும்

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. முகவரைச் சரிபார்த்து இயக்கவும்

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

புதிய குறியீடு இதோ.

```python
from openai import OpenAI

open_ai = OpenAI()  # கிளையன்ட் OPENAI_API_KEY சூழல் மாறியைப் படிக்கிறது
```

OpenAI API-ஐ இறக்குமதி செய்து தொடங்கவும்.

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

பதிலை உருவாக்க OpenAI API-ஐ (`open_ai.chat.completions.create`) அழைக்கவும்.

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

விலையை வெளியிட்டு, வாங்குதல் அல்லது விற்றல் பரிந்துரையை வழங்கவும்.

#### கணிப்புகளைச் சோதித்தல் {#testing-the-predictions}

இப்போது நாம் கணிப்புகளை உருவாக்க முடியும் என்பதால், நாம் பயனுள்ள கணிப்புகளை உருவாக்குகிறோமா என்பதை மதிப்பிட வரலாற்றுத் தரவையும் பயன்படுத்தலாம்.

```sh
uv run test-predictor.py
```

எதிர்பார்க்கப்படும் முடிவு பின்வருமாறு இருக்கும்:

```
2026-01-05T19:50-க்கான கணிப்பு: கணிக்கப்பட்டது 3138.93 USD, உண்மையானது 3218.92 USD, பிழை 79.99 USD
2026-01-06T19:56-க்கான கணிப்பு: கணிக்கப்பட்டது 3243.39 USD, உண்மையானது 3221.08 USD, பிழை 22.31 USD
2026-01-07T20:02-க்கான கணிப்பு: கணிக்கப்பட்டது 3223.24 USD, உண்மையானது 3146.89 USD, பிழை 76.35 USD
2026-01-08T20:11-க்கான கணிப்பு: கணிக்கப்பட்டது 3150.47 USD, உண்மையானது 3092.04 USD, பிழை 58.43 USD
.
.
.
2026-01-31T22:33-க்கான கணிப்பு: கணிக்கப்பட்டது 2637.73 USD, உண்மையானது 2417.77 USD, பிழை 219.96 USD
2026-02-01T22:41-க்கான கணிப்பு: கணிக்கப்பட்டது 2381.70 USD, உண்மையானது 2318.84 USD, பிழை 62.86 USD
2026-02-02T22:49-க்கான கணிப்பு: கணிக்கப்பட்டது 2234.91 USD, உண்மையானது 2349.28 USD, பிழை 114.37 USD
29 கணிப்புகளில் சராசரி கணிப்புப் பிழை: 83.87103448275862068965517241 USD
ஒரு பரிந்துரைக்கான சராசரி மாற்றம்: 4.787931034482758620689655172 USD
மாற்றங்களின் நிலையான மாறுபாடு: 104.42 USD
லாபகரமான நாட்கள்: 51.72%
இழப்பு நாட்கள்: 48.28%
```

சோதனையாளரின் (tester) பெரும்பகுதி முகவரைப் போலவே இருக்கும், ஆனால் புதிய அல்லது மாற்றியமைக்கப்பட்ட பகுதிகள் இங்கே உள்ளன.

```python
CYCLES_FOR_TEST = 40 # பின்னோக்கு சோதனைக்கு, நாம் எத்தனை சுழற்சிகள் சோதிக்கிறோம் என்பது

# பல விலைப்புள்ளிகளைப் பெறவும்
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

நாம் `CYCLES_FOR_TEST` (இங்கே 40 எனக் குறிப்பிடப்பட்டுள்ளது) நாட்களுக்குப் பின்னால் பார்க்கிறோம்.

```python
# கணிப்புகளை உருவாக்கி, அவற்றை உண்மையான வரலாற்றுடன் ஒப்பிட்டுப் பார்க்கவும்

total_error = Decimal(0)
changes = []
```

நாம் ஆர்வமாக உள்ள இரண்டு வகையான பிழைகள் உள்ளன. முதலாவது, `total_error`, இது கணிப்பான் செய்த பிழைகளின் கூட்டுத்தொகையாகும்.

இரண்டாவதான `changes`-ஐப் புரிந்து கொள்ள, முகவரின் நோக்கத்தை நாம் நினைவில் கொள்ள வேண்டும். இது WETH/USDC விகிதத்தை (ETH விலை) கணிப்பது அல்ல. இது விற்றல் மற்றும் வாங்குதல் பரிந்துரைகளை வழங்குவதாகும். தற்போது விலை $2000 ஆக இருந்து, நாளை $2010 ஆக இருக்கும் என்று அது கணித்தால், உண்மையான முடிவு $2020 ஆக இருந்து நாம் கூடுதல் பணம் சம்பாதித்தால் நாம் கவலைப்பட மாட்டோம். ஆனால் அது $2010 எனக் கணித்து, அந்தப் பரிந்துரையின் அடிப்படையில் ETH-ஐ வாங்கி, விலை $1990 ஆகக் குறைந்தால் நாம் _நிச்சயமாகக்_ கவலைப்படுவோம்.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

முழுமையான வரலாறு (கணிப்புக்குப் பயன்படுத்தப்பட்ட மதிப்புகள் மற்றும் அதை ஒப்பிடுவதற்கான நிஜ உலக மதிப்பு) கிடைக்கும் நிகழ்வுகளை மட்டுமே நாம் பார்க்க முடியும். இதன் பொருள், புதிய நிகழ்வு என்பது `CYCLES_BACK`-க்கு முன்பு தொடங்கியதாக இருக்க வேண்டும்.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

முகவர் பயன்படுத்தும் அதே எண்ணிக்கையிலான மாதிரிகளைப் பெற [துண்டுகளைப் (slices)](https://www.w3schools.com/python/ref_func_slice.asp) பயன்படுத்தவும். இங்கிருந்து அடுத்த பகுதிக்கு இடையிலான குறியீடு, முகவரில் நாம் வைத்திருக்கும் அதே கணிப்பைப் பெறும் குறியீடாகும்.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

கணிக்கப்பட்ட விலை, உண்மையான விலை மற்றும் கணிப்பின் போது இருந்த விலை ஆகியவற்றைப் பெறவும். பரிந்துரை வாங்குவதா அல்லது விற்பதா என்பதைத் தீர்மானிக்க, கணிப்பின் போது இருந்த விலை நமக்குத் தேவை.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

பிழையைக் கணக்கிட்டு, அதை மொத்தத்துடன் சேர்க்கவும்.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes`-க்கு, ஒரு ETH-ஐ வாங்குவது அல்லது விற்பதன் பணவியல் தாக்கத்தை நாம் விரும்புகிறோம். எனவே முதலில், நாம் பரிந்துரையைத் தீர்மானிக்க வேண்டும், பின்னர் உண்மையான விலை எவ்வாறு மாறியது என்பதையும், பரிந்துரை பணத்தை ஈட்டியதா (நேர்மறையான மாற்றம்) அல்லது பணத்தை இழக்கச் செய்ததா (எதிர்மறையான மாற்றம்) என்பதையும் மதிப்பிட வேண்டும்.

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

முடிவுகளைத் தெரிவிக்கவும்.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

லாபகரமான நாட்களின் எண்ணிக்கை மற்றும் இழப்பு நாட்களின் எண்ணிக்கையைக் கணக்கிட [`filter`](https://www.w3schools.com/python/ref_func_filter.asp)-ஐப் பயன்படுத்தவும். இதன் முடிவு ஒரு வடிகட்டிப் பொருளாகும் (filter object), நீளத்தைப் பெற நாம் அதை ஒரு பட்டியலாக மாற்ற வேண்டும்.

### பரிவர்த்தனைகளைச் சமர்ப்பித்தல் {#submit-txn}

இப்போது நாம் உண்மையில் பரிவர்த்தனைகளைச் சமர்ப்பிக்க வேண்டும். இருப்பினும், அமைப்பு நிரூபிக்கப்படுவதற்கு முன்பு, இந்த கட்டத்தில் உண்மையான பணத்தைச் செலவிட நான் விரும்பவில்லை. அதற்குப் பதிலாக, முதன்மை வலைப்பின்னலின் உள்ளூர் கவையை (local fork) உருவாக்கி, அந்தப் பிணையத்தில் "வர்த்தகம்" செய்வோம்.

உள்ளூர் கவையை உருவாக்கி வர்த்தகத்தை இயக்குவதற்கான படிகள் இங்கே உள்ளன.

1. [Foundry](https://getfoundry.sh/introduction/installation)-ஐ நிறுவவும்

2. [`anvil`](https://getfoundry.sh/anvil/overview)-ஐத் தொடங்கவும்

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry-க்கான இயல்புநிலை URL-ஆன http://localhost:8545-இல் கேட்கிறது, எனவே தொகுதிச்சங்கிலியைக் கையாள நாம் பயன்படுத்தும் [`cast` கட்டளைக்கான](https://getfoundry.sh/cast/overview) URL-ஐக் குறிப்பிட வேண்டியதில்லை.

3. `anvil`-இல் இயங்கும் போது, ETH-ஐக் கொண்ட பத்து சோதனைக் கணக்குகள் உள்ளன—முதலாவது கணக்கிற்கான சூழல் மாறிகளை (environment variables) அமைக்கவும்

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. நாம் பயன்படுத்த வேண்டிய ஒப்பந்தங்கள் இவை. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) என்பது நாம் உண்மையில் வர்த்தகம் செய்யப் பயன்படுத்தும் யூனிஸ்வாப் v3 ஒப்பந்தமாகும். நாம் நேரடியாகத் தொகுப்பின் மூலம் வர்த்தகம் செய்யலாம், ஆனால் இது மிகவும் எளிதானது.

   கீழே உள்ள இரண்டு மாறிகள் WETH மற்றும் USDC-க்கு இடையில் பரிமாற்றம் செய்யத் தேவையான யூனிஸ்வாப் v3 பாதைகளாகும்.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ஒவ்வொரு சோதனைக் கணக்கிலும் 10,000 ETH உள்ளது. வர்த்தகத்திற்காக 1000 WETH-ஐப் பெற, 1000 ETH-ஐப் பொதிய WETH ஒப்பந்தத்தைப் பயன்படுத்தவும்.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 500 WETH-ஐ USDC-க்கு வர்த்தகம் செய்ய `SwapRouter`-ஐப் பயன்படுத்தவும்.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` அழைப்பு ஒரு அனுமதித்தொகையை உருவாக்குகிறது, இது நமது வில்லைகளில் சிலவற்றைச் செலவிட `SwapRouter`-ஐ அனுமதிக்கிறது. ஒப்பந்தங்களால் நிகழ்வுகளைக் கண்காணிக்க முடியாது, எனவே நாம் வில்லைகளை நேரடியாக `SwapRouter` ஒப்பந்தத்திற்குப் பரிமாற்றம் செய்தால், அதற்குப் பணம் செலுத்தப்பட்டதா என்பது தெரியாது. அதற்குப் பதிலாக, ஒரு குறிப்பிட்ட தொகையைச் செலவிட `SwapRouter` ஒப்பந்தத்தை நாம் அனுமதிக்கிறோம், பின்னர் `SwapRouter` அதைச் செய்கிறது. இது `SwapRouter` அழைக்கும் ஒரு செயல்பாட்டின் மூலம் செய்யப்படுகிறது, எனவே அது வெற்றிகரமாக இருந்ததா என்பதை அது அறியும்.

7. இரண்டு வில்லைகளும் உங்களிடம் போதுமான அளவு உள்ளதா என்பதைச் சரிபார்க்கவும்.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

இப்போது நம்மிடம் WETH மற்றும் USDC இருப்பதால், நாம் உண்மையில் முகவரை இயக்கலாம்.

```sh
git checkout 05-trade
uv run agent.py
```

வெளியீடு பின்வருமாறு இருக்கும்:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
தற்போதைய விலை: 1843.16
2026-02-06T23:07-இல், எதிர்பார்க்கப்படும் விலை: 1724.41 USD
வர்த்தகத்திற்கு முன் கணக்கு நிலுவைகள்:
USDC நிலுவை: 927301.578272
WETH நிலுவை: 500
விற்கவும், விலை 118.75 USD குறையும் என்று எதிர்பார்க்கிறேன்
ஒப்புதல் அளிக்கும் பரிவர்த்தனை அனுப்பப்பட்டது: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
ஒப்புதல் அளிக்கும் பரிவர்த்தனை வெட்டியெடுக்கப்பட்டது.
விற்பனைப் பரிவர்த்தனை அனுப்பப்பட்டது: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
விற்பனைப் பரிவர்த்தனை வெட்டியெடுக்கப்பட்டது.
வர்த்தகத்திற்குப் பின் கணக்கு நிலுவைகள்:
USDC நிலுவை: 929143.797116
WETH நிலுவை: 499
```

இதை உண்மையில் பயன்படுத்த, உங்களுக்குச் சில சிறிய மாற்றங்கள் தேவை.

- வரி 14-இல், `MAINNET_URL`-ஐ `https://eth.drpc.org` போன்ற உண்மையான அணுகல் புள்ளிக்கு மாற்றவும்
- வரி 28-இல், `PRIVATE_KEY`-ஐ உங்கள் சொந்த தனிப்பட்ட திறவுகோலுக்கு மாற்றவும்
- நீங்கள் மிகவும் செல்வந்தராக இருந்து, நிரூபிக்கப்படாத ஒரு முகவருக்காக ஒவ்வொரு நாளும் 1 ETH-ஐ வாங்கவோ விற்கவோ முடியாவிட்டால், `WETH_TRADE_AMOUNT`-ஐக் குறைக்க நீங்கள் 29-ஐ மாற்ற விரும்பலாம்

#### குறியீடு விளக்கம் {#trading-code}

புதிய குறியீடு இதோ.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

படி 4-இல் நாம் பயன்படுத்திய அதே மாறிகள்.

```python
WETH_TRADE_AMOUNT=1
```

வர்த்தகம் செய்ய வேண்டிய தொகை.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

உண்மையில் வர்த்தகம் செய்ய, நமக்கு `approve` செயல்பாடு தேவை. வர்த்தகத்திற்கு முன்னும் பின்னும் உள்ள நிலுவைகளைக் காட்டவும் நாம் விரும்புவதால், நமக்கு `balanceOf`-உம் தேவை.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI-இல் நமக்கு `exactInput` மட்டுமே தேவை. சரியாக ஒரு WETH-ஐ வாங்க நாம் பயன்படுத்தக்கூடிய `exactOutput` என்ற தொடர்புடைய செயல்பாடு உள்ளது, ஆனால் எளிமைக்காக நாம் இரண்டு சந்தர்ப்பங்களிலும் `exactInput`-ஐப் பயன்படுத்துகிறோம்.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) மற்றும் `SwapRouter` ஒப்பந்தத்திற்கான Web3 வரையறைகள்.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

பரிவர்த்தனை அளவுருக்கள். ஒவ்வொரு முறையும் [நான்ஸ்](https://en.wikipedia.org/wiki/Cryptographic_nonce) மாற வேண்டும் என்பதால், நமக்கு இங்கே ஒரு செயல்பாடு தேவை.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter`-க்கு ஒரு வில்லை அனுமதித்தொகைக்கு ஒப்புதல் அளிக்கவும்.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3-இல் நாம் ஒரு பரிவர்த்தனையை இப்படித்தான் அனுப்புகிறோம். முதலில் பரிவர்த்தனையை உருவாக்க [`Contract` பொருளைப்](https://web3py.readthedocs.io/en/stable/web3.contract.html) பயன்படுத்துகிறோம். பின்னர் `PRIVATE_KEY`-ஐப் பயன்படுத்தி, பரிவர்த்தனையில் கையொப்பமிட [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction)-ஐப் பயன்படுத்துகிறோம். இறுதியாக, பரிவர்த்தனையை அனுப்ப [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction)-ஐப் பயன்படுத்துகிறோம்.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

பரிவர்த்தனை வெட்டியெடுக்கப்படும் வரை [`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) காத்திருக்கிறது. தேவைப்பட்டால் அது ரசீதைத் திருப்பித் தரும்.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH-ஐ விற்கும்போது இவை அளவுருக்களாகும்.

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

`SELL_PARAMS`-க்கு மாறாக, வாங்கும் அளவுருக்கள் மாறலாம். உள்ளீட்டுத் தொகை என்பது `quote`-இல் கிடைக்கும் 1 WETH-இன் விலையாகும்.

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

`buy()` மற்றும் `sell()` செயல்பாடுகள் கிட்டத்தட்ட ஒரே மாதிரியானவை. முதலில் நாம் `SwapRouter`-க்குப் போதுமான அனுமதித்தொகைக்கு ஒப்புதல் அளிக்கிறோம், பின்னர் சரியான பாதை மற்றும் தொகையுடன் அதை அழைக்கிறோம்.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

இரண்டு நாணயங்களிலும் பயனர் நிலுவைகளைத் தெரிவிக்கவும்.

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

இந்த முகவர் தற்போது ஒரு முறை மட்டுமே வேலை செய்கிறது. இருப்பினும், இதை [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html)-இலிருந்து இயக்குவதன் மூலமாகவோ அல்லது 368-400 வரிகளை ஒரு சுழற்சியில் (loop) மூடி, அடுத்த சுழற்சிக்கான நேரம் வரும் வரை காத்திருக்க [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep)-ஐப் பயன்படுத்துவதன் மூலமாகவோ தொடர்ந்து வேலை செய்யும்படி நீங்கள் மாற்றலாம்.

## சாத்தியமான மேம்பாடுகள் {#improvements}

இது ஒரு முழுமையான தயாரிப்புப் பதிப்பு அல்ல; இது அடிப்படைகளைக் கற்பிப்பதற்கான ஒரு எடுத்துக்காட்டு மட்டுமே. மேம்பாடுகளுக்கான சில யோசனைகள் இங்கே உள்ளன.

### சிறந்த வர்த்தகம் {#smart-trading}

என்ன செய்ய வேண்டும் என்று முடிவெடுக்கும்போது முகவர் புறக்கணிக்கும் இரண்டு முக்கியமான உண்மைகள் உள்ளன.

- _எதிர்பார்க்கப்படும் மாற்றத்தின் அளவு_. விலை குறையும் என்று எதிர்பார்க்கப்பட்டால், சரிவின் அளவைப் பொருட்படுத்தாமல் முகவர் ஒரு நிலையான அளவு `WETH`-ஐ விற்கிறது.
  சிறிய மாற்றங்களைப் புறக்கணித்து, விலை எவ்வளவு குறையும் என்று நாம் எதிர்பார்க்கிறோம் என்பதன் அடிப்படையில் விற்பது சிறப்பாக இருக்கும் என்று வாதிடலாம்.
- _தற்போதைய போர்ட்ஃபோலியோ (portfolio)_. உங்கள் போர்ட்ஃபோலியோவில் 10% WETH-இல் இருந்து, விலை உயரும் என்று நீங்கள் நினைத்தால், மேலும் வாங்குவது அர்த்தமுள்ளதாக இருக்கும். ஆனால் உங்கள் போர்ட்ஃபோலியோவில் 90% WETH-இல் இருந்தால், நீங்கள் போதுமான அளவு வெளிப்பட்டிருக்கலாம், மேலும் வாங்க வேண்டிய அவசியமில்லை. விலை குறையும் என்று நீங்கள் எதிர்பார்த்தால் இதற்கு நேர்மாறானது பொருந்தும்.

### உங்கள் வர்த்தக உத்தியை ரகசியமாக வைத்திருக்க விரும்பினால் என்ன செய்வது? {#secret}

AI விற்பனையாளர்கள் தங்கள் LLM-களுக்கு நீங்கள் அனுப்பும் வினவல்களைப் பார்க்க முடியும், இது உங்கள் முகவருடன் நீங்கள் உருவாக்கிய சிறந்த வர்த்தக அமைப்பை வெளிப்படுத்தக்கூடும். அதிகமான மக்கள் பயன்படுத்தும் ஒரு வர்த்தக அமைப்பு பயனற்றது, ஏனெனில் நீங்கள் வாங்க விரும்பும்போது அதிகமான மக்கள் வாங்க முயற்சிப்பார்கள் (மற்றும் விலை உயரும்) மற்றும் நீங்கள் விற்க விரும்பும்போது விற்க முயற்சிப்பார்கள் (மற்றும் விலை குறையும்).

இந்தச் சிக்கலைத் தவிர்க்க, எடுத்துக்காட்டாக, [LM-Studio](https://lmstudio.ai/)-ஐப் பயன்படுத்தி நீங்கள் ஒரு LLM-ஐ உள்ளூரில் இயக்கலாம்.

### AI பாட்டிலிருந்து (bot) செயற்கை நுண்ணறிவு முகவருக்கு {#bot-to-agent}

இது [ஒரு AI பாட், செயற்கை நுண்ணறிவு முகவர் அல்ல](/ai-agents/#ai-agents-vs-ai-bots) என்று நீங்கள் ஒரு நல்ல வாதத்தை முன்வைக்கலாம். இது முன்வரையறுக்கப்பட்ட தகவல்களை நம்பியிருக்கும் ஒப்பீட்டளவில் எளிமையான உத்தியைச் செயல்படுத்துகிறது. எடுத்துக்காட்டாக, யூனிஸ்வாப் v3 தொகுப்புகளின் பட்டியல் மற்றும் அவற்றின் சமீபத்திய மதிப்புகளை வழங்கி, எந்தக் கலவையானது சிறந்த முன்கணிப்பு மதிப்பைக் கொண்டுள்ளது என்று கேட்பதன் மூலம் நாம் சுய-மேம்பாட்டை இயக்கலாம்.

### விலை நழுவல் பாதுகாப்பு {#slippage-protection}

தற்போது [விலை நழுவல் பாதுகாப்பு](https://uniswapv3book.com/milestone_3/slippage-protection.html) இல்லை. தற்போதைய மேற்கோள் $2000 ஆகவும், எதிர்பார்க்கப்படும் விலை $2100 ஆகவும் இருந்தால், முகவர் வாங்கும். இருப்பினும், முகவர் வாங்குவதற்கு முன் விலை $2200 ஆக உயர்ந்தால், இனி வாங்குவதில் அர்த்தமில்லை.

விலை நழுவல் பாதுகாப்பைச் செயல்படுத்த, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325)-இன் 325 மற்றும் 334 வரிகளில் `amountOutMinimum` மதிப்பைக் குறிப்பிடவும்.

## முடிவுரை {#conclusion}

செயற்கை நுண்ணறிவு முகவர்களுடன் தொடங்குவதற்குப் போதுமான அளவு இப்போது உங்களுக்குத் தெரியும் என்று நம்புகிறோம். இது இந்தத் தலைப்பின் விரிவான கண்ணோட்டம் அல்ல; அதற்காக அர்ப்பணிக்கப்பட்ட முழுப் புத்தகங்களும் உள்ளன, ஆனால் நீங்கள் தொடங்குவதற்கு இது போதுமானது. நல்வாழ்த்துகள்!

[எனது மேலும் பல பணிகளை இங்கே காணவும்](https://cryptodocguy.pro/).