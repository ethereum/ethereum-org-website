---
title: எத்தேரியத்தில் உங்கள் சொந்த AI வர்த்தக முகவரை உருவாக்குங்கள்
description: இந்த டுடோரியலில் ஒரு எளிய AI வர்த்தக முகவரை எவ்வாறு உருவாக்குவது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள். இந்த முகவர் பிளாக்செயினிலிருந்து தகவல்களைப் படிக்கிறது, அந்தத் தகவலின் அடிப்படையில் ஒரு பரிந்துரைக்காக ஒரு LLM-ஐக் கேட்கிறது, LLM பரிந்துரைக்கும் வர்த்தகத்தைச் செய்கிறது, பின்னர் காத்திருந்து மீண்டும் செய்கிறது.
author: Ori Pomerantz
tags: [ "AI", "வர்த்தகம்", "ஏஜென்ட்", "python" ]
skill: intermediate
published: 2026-02-13
lang: ta
sidebarDepth: 3
---

இந்த டுடோரியலில் ஒரு எளிய AI வர்த்தக முகவரை எவ்வாறு உருவாக்குவது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள். இந்த முகவர் இந்தப் படிகளைப் பயன்படுத்தி வேலை செய்கிறது:

1. ஒரு டோக்கனின் தற்போதைய மற்றும் கடந்த கால விலைகளையும், மற்ற சாத்தியமான தொடர்புடைய தகவல்களையும் படிக்கவும்
2. இந்தத் தகவலுடன், அது எவ்வாறு தொடர்புடையதாக இருக்கலாம் என்பதை விளக்குவதற்கான பின்னணித் தகவலுடன் ஒரு வினவலை உருவாக்கவும்
3. வினவலைச் சமர்ப்பித்து, கணிக்கப்பட்ட விலையைத் திரும்பப் பெறவும்
4. பரிந்துரையின் அடிப்படையில் வர்த்தகம் செய்யவும்
5. காத்திருந்து மீண்டும் செய்யவும்

இந்த முகவர் தகவலை எவ்வாறு படிப்பது, பயன்படுத்தக்கூடிய பதிலைத் தரும் வினவலாக மாற்றுவது, மற்றும் அந்தப் பதிலை எவ்வாறு பயன்படுத்துவது என்பதை நிரூபிக்கிறது. இவை அனைத்தும் ஒரு AI முகவருக்குத் தேவையான படிகள். இந்த முகவர் Python-இல் செயல்படுத்தப்படுகிறது, ஏனெனில் இது AI-இல் பயன்படுத்தப்படும் மிகவும் பொதுவான மொழியாகும்.

## இதை ஏன் செய்ய வேண்டும்? {#why-do-this}

தானியங்கு வர்த்தக முகவர்கள், உருவாக்குநர்கள் (டெவலப்பர்கள்) ஒரு வர்த்தக உத்தியைத் தேர்ந்தெடுத்து செயல்படுத்த அனுமதிக்கின்றன. [AI முகவர்கள்](/ai-agents) மேலும் சிக்கலான மற்றும் மாறும் வர்த்தக உத்திகளை அனுமதிக்கின்றன, உருவாக்குநர்கள் (டெவலப்பர்கள்) பயன்படுத்தக் கூட கருதாத தகவல் மற்றும் அல்காரிதம்களை இது சாத்தியமாகப் பயன்படுத்துகிறது.

## கருவிகள் {#tools}

இந்த டுடோரியல் மேற்கோள்கள் மற்றும் வர்த்தகத்திற்காக [Python](https://www.python.org/), [Web3 நூலகம்](https://web3py.readthedocs.io/en/stable/) மற்றும் [Uniswap v3](https://github.com/Uniswap/v3-periphery) ஆகியவற்றைப் பயன்படுத்துகிறது.

### ஏன் Python? {#python}

AI-க்கு மிகவும் பரவலாகப் பயன்படுத்தப்படும் மொழி [Python](https://www.python.org/) என்பதால், நாங்கள் அதை இங்கே பயன்படுத்துகிறோம். உங்களுக்கு Python தெரியாவிட்டால் கவலைப்பட வேண்டாம். மொழி மிகவும் தெளிவாக உள்ளது, அது என்ன செய்கிறது என்பதை நான் சரியாக விளக்குகிறேன்.

[Web3 நூலகம்](https://web3py.readthedocs.io/en/stable/) என்பது மிகவும் பொதுவான Python எத்தேரியம் பயன்பாட்டு நிரலாக்க இடைமுகம் (API) ஆகும். இதைப் பயன்படுத்துவது மிகவும் எளிதானது.

### பிளாக்செயினில் வர்த்தகம் செய்தல் {#trading-on-blockchain}

எத்தேரியத்தில் டோக்கன்களை வர்த்தகம் செய்ய உங்களை அனுமதிக்கும் [பல பரவலாக்கப்பட்ட பரிமாற்றங்கள் (DEX)](/apps/categories/defi/) உள்ளன. இருப்பினும், [ஆர்பிட்ரேஜ்](/developers/docs/smart-contracts/composability/#better-user-experience) காரணமாக அவை ஒரே மாதிரியான மாற்று விகிதங்களைக் கொண்டிருக்கின்றன.

[Uniswap](https://app.uniswap.org/) என்பது பரவலாகப் பயன்படுத்தப்படும் ஒரு DEX ஆகும், அதை நாம் மேற்கோள்கள் (டோக்கன் சார்பு மதிப்புகளைப் பார்க்க) மற்றும் வர்த்தகங்கள் ஆகிய இரண்டிற்கும் பயன்படுத்தலாம்.

### OpenAI {#openai}

ஒரு பெரிய மொழி மாதிரிக்கு, நான் [OpenAI](https://openai.com/)-உடன் தொடங்கத் தேர்ந்தெடுத்தேன். இந்த டுடோரியலில் உள்ள பயன்பாட்டை இயக்க நீங்கள் பயன்பாட்டு நிரலாக்க இடைமுக (API) அணுகலுக்கு பணம் செலுத்த வேண்டும். குறைந்தபட்ச கட்டணமான $5 போதுமானதை விட அதிகமாக உள்ளது.

## படிப்படியான உருவாக்கம் {#step-by-step}

உருவாக்கத்தை எளிதாக்க, நாம் நிலைகளில் தொடர்கிறோம். ஒவ்வொரு படியும் GitHub-இல் ஒரு கிளை.

### தொடங்குதல் {#getting-started}

UNIX அல்லது Linux ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install) உட்பட) கீழ் தொடங்குவதற்கான படிகள் உள்ளன

1. உங்களிடம் ஏற்கனவே இல்லை என்றால், [Python](https://www.python.org/downloads/)-ஐ பதிவிறக்கம் செய்து நிறுவவும்.

2. GitHub களஞ்சியத்தை நகலெடுக்கவும்.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/)-ஐ நிறுவவும். உங்கள் கணினியில் உள்ள கட்டளை வித்தியாசமாக இருக்கலாம்.

   ```sh
   pipx install uv
   ```

4. நூலகங்களைப் பதிவிறக்கவும்.

   ```sh
   uv sync
   ```

5. மெய்நிகர் சூழலைச் செயல்படுத்தவும்.

   ```sh
   source .venv/bin/activate
   ```

6. Python மற்றும் Web3 சரியாக வேலை செய்கின்றனவா என்பதைச் சரிபார்க்க, `python3`-ஐ இயக்கி, இந்த நிரலை அதற்கு வழங்கவும். நீங்கள் அதை `>>>` ப்ராம்ட்டில் உள்ளிடலாம்; ஒரு கோப்பை உருவாக்க வேண்டிய அவசியமில்லை.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### பிளாக்செயினிலிருந்து படித்தல் {#read-blockchain}

அடுத்த படி பிளாக்செயினிலிருந்து படிப்பதாகும். அதைச் செய்ய, நீங்கள் `02-read-quote` கிளைக்கு மாற வேண்டும், பின்னர் நிரலை இயக்க `uv`-ஐப் பயன்படுத்தவும்.

```sh
git checkout 02-read-quote
uv run agent.py
```

நீங்கள் `Quote` பொருட்களின் பட்டியலைப் பெறுவீர்கள், ஒவ்வொன்றும் ஒரு நேரமுத்திரை, ஒரு விலை, மற்றும் சொத்து (தற்போது எப்போதும் `WETH/USDC`) ஆகியவற்றுடன்.

இதோ ஒரு வரிக்கு வரி விளக்கம்.

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

நமக்குத் தேவையான நூலகங்களை இறக்குமதி செய்யவும். அவை பயன்படுத்தப்படும்போது கீழே விளக்கப்பட்டுள்ளன.

```python
print = functools.partial(print, flush=True)
```

Python-இன் `print`-ஐ, வெளியீட்டை உடனடியாக எப்போதும் ஃப்ளஷ் செய்யும் ஒரு பதிப்புடன் மாற்றுகிறது. இது நீண்ட நேரம் இயங்கும் ஒரு ஸ்கிரிப்டில் பயனுள்ளதாக இருக்கும், ஏனெனில் நாம் நிலை புதுப்பிப்புகள் அல்லது பிழைதிருத்த வெளியீட்டிற்காகக் காத்திருக்க விரும்பவில்லை.

```python
MAINNET_URL = "https://eth.drpc.org"
```

மெயின்நெட்டிற்குச் செல்ல ஒரு URL. நீங்கள் [சேவையாக முனை](/developers/docs/nodes-and-clients/nodes-as-a-service/) என்பதிலிருந்து ஒன்றைப் பெறலாம் அல்லது [Chainlist](https://chainlist.org/chain/1)-இல் விளம்பரப்படுத்தப்பட்டவற்றில் ஒன்றைப் பயன்படுத்தலாம்.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

ஒரு எத்தேரியம் மெயின்நெட் பிளாக் பொதுவாக ஒவ்வொரு பன்னிரண்டு வினாடிகளுக்கும் நடக்கும், எனவே இவை ஒரு காலப்பகுதியில் நடக்கும் என்று நாம் எதிர்பார்க்கும் பிளாக்குகளின் எண்ணிக்கையாகும். இது ஒரு துல்லியமான எண்ணிக்கை அல்ல என்பதை நினைவில் கொள்ளவும். [பிளாக் ப்ரோபோஸர்](/developers/docs/consensus-mechanisms/pos/block-proposal/) செயலிழந்தால், அந்த பிளாக் தவிர்க்கப்பட்டு, அடுத்த பிளாக்கிற்கான நேரம் 24 வினாடிகள் ஆகும். ஒரு நேரமுத்திரைக்கு சரியான பிளாக்கைப் பெற நாம் விரும்பினால், நாம் [பைனரி தேடலை](https://en.wikipedia.org/wiki/Binary_search)ப் பயன்படுத்துவோம். இருப்பினும், இது எங்கள் நோக்கங்களுக்குப் போதுமான அளவு நெருக்கமாக உள்ளது. எதிர்காலத்தைக் கணிப்பது ஒரு துல்லியமான அறிவியல் அல்ல.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

சுழற்சியின் அளவு. நாம் ஒவ்வொரு சுழற்சிக்கும் ஒரு முறை மேற்கோள்களை மதிப்பாய்வு செய்து, அடுத்த சுழற்சியின் முடிவில் மதிப்பை மதிப்பிட முயற்சிக்கிறோம்.

```python
# நாம் படிக்கும் பூலின் முகவரி
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

மேற்கோள் மதிப்புகள் Uniswap 3 USDC/WETH பூலிலிருந்து [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) என்ற முகவரியில் எடுக்கப்படுகின்றன. இந்த முகவரி ஏற்கனவே செக்சம் வடிவத்தில் உள்ளது, ஆனால் குறியீட்டை மீண்டும் பயன்படுத்தக்கூடியதாக மாற்ற [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address)-ஐப் பயன்படுத்துவது நல்லது.

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

நாம் தொடர்பு கொள்ள வேண்டிய இரண்டு ஒப்பந்தங்களுக்கான [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) இவை. குறியீட்டைச் சுருக்கமாக வைத்திருக்க, நாம் அழைக்க வேண்டிய செயல்பாடுகளை மட்டுமே சேர்க்கிறோம்.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) நூலகத்தைத் தொடங்கி, ஒரு எத்தேரியம் முனையுடன் இணைக்கவும்.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

இது Python-இல் ஒரு டேட்டா கிளாஸை உருவாக்குவதற்கான ஒரு வழி. [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) தரவு வகை ஒப்பந்தத்துடன் இணைக்கப் பயன்படுகிறது. ` (frozen=True)`-ஐக் கவனிக்கவும். Python-இல் [பூலியன்கள்](https://en.wikipedia.org/wiki/Boolean_data_type) `True` அல்லது `False` என்று பெரிய எழுத்தில் வரையறுக்கப்பட்டுள்ளன. இந்த டேட்டா கிளாஸ் `frozen` ஆகும், அதாவது புலங்களை மாற்ற முடியாது.

உள்தள்ளலைக் கவனிக்கவும். [சி-பெறப்பட்ட மொழிகளுக்கு](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) மாறாக, Python பிளாக்குகளைக் குறிக்க உள்தள்ளலைப் பயன்படுத்துகிறது. பின்வரும் வரையறை இந்த டேட்டா கிளாஸின் ஒரு பகுதியாக இல்லை என்பதை Python இண்டர்பிரெட்டருக்குத் தெரியும், ஏனெனில் அது டேட்டா கிளாஸ் புலங்களின் அதே உள்தள்ளலில் தொடங்கவில்லை.

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

இது Python-இல் ஒரு செயல்பாட்டை வரையறுக்கும் வழி. வரையறை, அது இன்னும் `PoolInfo`-இன் ஒரு பகுதி என்பதைக் காட்ட உள்தள்ளப்பட்டுள்ளது.

ஒரு டேட்டா கிளாஸின் பகுதியாக இருக்கும் ஒரு செயல்பாட்டில் முதல் அளவுரு எப்போதும் `self` ஆகும், இது இங்கு அழைத்த டேட்டா கிளாஸ் நிகழ்வு. இங்கே மற்றொரு அளவுரு, பிளாக் எண் உள்ளது.

```python
        assert block <= w3.eth.block_number, "பிளாக் எதிர்காலத்தில் உள்ளது"
```

நாம் எதிர்காலத்தைப் படிக்க முடிந்தால், வர்த்தகத்திற்கு நமக்கு AI தேவையில்லை.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3-இலிருந்து EVM-இல் ஒரு செயல்பாட்டை அழைப்பதற்கான தொடரியல் இதுவாகும்: `<contract object>.functions.<function name>"().call(<parameters>)`. அளவுருக்கள் EVM செயல்பாட்டின் அளவுருக்களாக (ஏதேனும் இருந்தால்; இங்கே இல்லை) அல்லது பிளாக்செயின் நடத்தையை மாற்றுவதற்கான [பெயரிடப்பட்ட அளவுருக்களாக](https://en.wikipedia.org/wiki/Named_parameter) இருக்கலாம். நாம் இயக்க விரும்பும் [பிளாக் எண்ணைக்](/developers/docs/apis/json-rpc/#default-block) குறிப்பிட, இங்கே நாம் `block_identifier` ஐப் பயன்படுத்துகிறோம்.

இதன் விளைவு [இந்த struct, அணி வடிவத்தில்](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72) ஆகும். முதல் மதிப்பு என்பது இரண்டு டோக்கன்களுக்கு இடையிலான மாற்று விகிதத்தின் ஒரு செயல்பாடாகும்.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

ஆன்செயின் கணக்கீடுகளைக் குறைக்க, Uniswap v3 உண்மையான மாற்று காரணியைச் சேமிக்காமல் அதன் வர்க்க மூலத்தைச் சேமிக்கிறது. EVM மிதவைப் புள்ளி கணிதம் அல்லது பின்னங்களை ஆதரிக்காததால், உண்மையான மதிப்புக்கு பதிலாக, பதில் <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math> ஆகும்.

```python
         # (டோக்கன்1 க்கு டோக்கன்0)
        return 1/(raw_price * self.decimal_factor)
```

நாம் பெறும் மூல விலை என்பது ஒவ்வொரு `token1`-க்கும் நாம் பெறும் `token0`-இன் எண்ணிக்கையாகும். நமது பூலில் `token0` என்பது USDC (அமெரிக்க டாலரின் அதே மதிப்பைக் கொண்ட ஒரு ஸ்டேபிள்காயின்) மற்றும் `token1` என்பது [WETH](https://opensea.io/learn/blockchain/what-is-weth) ஆகும். நாம் உண்மையில் விரும்பும் மதிப்பு ஒரு WETH-க்கான டாலர்களின் எண்ணிக்கை, அதன் நேர்மாறு அல்ல.

தசம காரணி என்பது இரண்டு டோக்கன்களுக்கான [தசம காரணிகளுக்கு](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) இடையிலான விகிதமாகும்.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

இந்த டேட்டா கிளாஸ் ஒரு மேற்கோளைக் குறிக்கிறது: ஒரு குறிப்பிட்ட நேரத்தில் ஒரு குறிப்பிட்ட சொத்தின் விலை. இந்த நேரத்தில், `asset` புலம் பொருத்தமற்றது, ஏனெனில் நாம் ஒரே ஒரு பூலைப் பயன்படுத்துகிறோம், எனவே ஒரே ஒரு சொத்து உள்ளது. இருப்பினும், நாம் பின்னர் மேலும் சொத்துக்களைச் சேர்ப்போம்.

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

இந்தச் செயல்பாடு ஒரு முகவரியை எடுத்து, அந்த முகவரியில் உள்ள டோக்கன் ஒப்பந்தம் பற்றிய தகவலைத் தருகிறது. ஒரு புதிய [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) ஐ உருவாக்க, நாம் முகவரி மற்றும் பயன்பாடு பைனரி இடைமுகம் (ABI)-ஐ `w3.eth.contract`-க்கு வழங்குகிறோம்.

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

இந்தச் செயல்பாடு [ஒரு குறிப்பிட்ட பூல்](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) பற்றி நமக்குத் தேவையான அனைத்தையும் தருகிறது. `f"<string>"` தொடரியல் ஒரு [வடிவமைக்கப்பட்ட சரம்](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) ஆகும்.

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

ஒரு `Quote` பொருளைப் பெறவும். `block_number`-க்கான இயல்புநிலை மதிப்பு `None` (மதிப்பு இல்லை) ஆகும்.

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

ஒரு பிளாக் எண் குறிப்பிடப்படவில்லை என்றால், `w3.eth.block_number`-ஐப் பயன்படுத்தவும், இது சமீபத்திய பிளாக் எண் ஆகும். இது [ஒரு `if` கூற்றிற்கான](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) தொடரியல் ஆகும்.

இயல்புநிலையை `w3.eth.block_number` என அமைப்பது சிறப்பாக இருந்திருக்கும் என்று தோன்றலாம், ஆனால் அது நன்றாக வேலை செய்யாது, ஏனெனில் அது செயல்பாடு வரையறுக்கப்படும் நேரத்தில் பிளாக் எண்ணாக இருக்கும். நீண்டகாலமாக இயங்கும் ஒரு முகவரில் இது ஒரு பிரச்சனையாக இருக்கும்.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

மனிதர்கள் மற்றும் பெரிய மொழி மாதிரிகள் (LLMs) படிக்கக்கூடிய வடிவத்திற்கு அதை வடிவமைக்க [the `datetime` library](https://docs.python.org/3/library/datetime.html) ஐப் பயன்படுத்தவும். மதிப்பை இரண்டு தசம இடங்களுக்கு округляಲು [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) ஐப் பயன்படுத்தவும்.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python இல் நீங்கள் `list[<type>]` ஐப் பயன்படுத்தி ஒரு குறிப்பிட்ட வகையை மட்டுமே கொண்டிருக்கக்கூடிய ஒரு [பட்டியலை](https://docs.python.org/3/library/stdtypes.html#typesseq-list) வரையறுக்கிறீர்கள்.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python இல் ஒரு [`for` loop](https://docs.python.org/3/tutorial/controlflow.html#for-statements) பொதுவாக ஒரு பட்டியலை மீண்டும் செய்கிறது. மேற்கோள்களைக் கண்டறிய வேண்டிய பிளாக் எண்களின் பட்டியல் [`range`](https://docs.python.org/3/library/stdtypes.html#range)-இலிருந்து வருகிறது.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

ஒவ்வொரு பிளாக் எண்ணுக்கும், ஒரு `Quote` பொருளைப் பெற்று அதை `quotes` பட்டியலில் சேர்க்கவும். பிறகு அந்தப் பட்டியலைத் திருப்பி அனுப்பவும்.

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

இது ஸ்கிரிப்டின் முக்கிய குறியீடு. பூல் தகவலைப் படித்து, பன்னிரண்டு மேற்கோள்களைப் பெற்று, அவற்றை [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) செய்யவும்.

### ஒரு ப்ராம்ப்டை உருவாக்குதல் {#prompt}

அடுத்து, இந்த மேற்கோள்களின் பட்டியலை ஒரு LLM-க்கான ப்ராம்ப்டாக மாற்றி, எதிர்பார்க்கப்படும் எதிர்கால மதிப்பைப் பெற வேண்டும்.

```sh
git checkout 03-create-prompt
uv run agent.py
```

வெளியீடு இப்போது ஒரு LLM-க்கான ப்ராம்ப்டாக இருக்கும், இது போன்றது:

```
இந்தப் மேற்கோள்களைக் கருத்தில் கொள்ளுங்கள்:
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


2026-02-02T17:56 நேரத்தில் WETH/USDC-க்கான மதிப்பு என்னவாக இருக்கும் என்று நீங்கள் எதிர்பார்க்கிறீர்கள்?

உங்கள் பதிலை இரண்டு தசம இடங்களுக்குச் சுருக்கி ஒரு ஒற்றை எண்ணாக வழங்கவும்,
வேறு எந்த உரையும் இல்லாமல்.
```

இங்கே `WETH/USDC` மற்றும் `WBTC/WETH` ஆகிய இரண்டு சொத்துக்களுக்கான மேற்கோள்கள் இருப்பதை கவனியுங்கள். மற்றொரு சொத்திலிருந்து மேற்கோள்களைச் சேர்ப்பது கணிப்புத் துல்லியத்தை மேம்படுத்தக்கூடும்.

#### ஒரு ப்ராம்ட் எப்படி இருக்கும் {#prompt-explanation}

இந்த ப்ராம்ட் மூன்று பிரிவுகளைக் கொண்டுள்ளது, அவை LLM ப்ராம்ட்களில் மிகவும் பொதுவானவை.

1. தகவல். LLMகள் தங்கள் பயிற்சியிலிருந்து நிறைய தகவல்களைக் கொண்டுள்ளன, ஆனால் அவை பொதுவாக சமீபத்திய தகவல்களைக் கொண்டிருக்காது. இதனால்தான் நாம் இங்கே சமீபத்திய மேற்கோள்களைப் பெற வேண்டும். ஒரு ப்ராம்ட்டில் தகவல்களைச் சேர்ப்பது [மீட்பு மேம்படுத்தப்பட்ட உருவாக்கம் (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) என்று அழைக்கப்படுகிறது.

2. உண்மையான கேள்வி. இதைத்தான் நாம் தெரிந்து கொள்ள விரும்புகிறோம்.

3. வெளியீட்டு வடிவமைப்பு வழிமுறைகள். பொதுவாக, ஒரு LLM அது எப்படி மதிப்பிட்டது என்ற விளக்கத்துடன் ஒரு மதிப்பீட்டை நமக்கு வழங்கும். இது மனிதர்களுக்கு நல்லது, ஆனால் ஒரு கணினி நிரலுக்கு முடிவு மட்டுமே தேவை.

#### குறியீடு விளக்கம் {#prompt-code}

இதோ புதிய குறியீடு.

```python
from datetime import datetime, timezone, timedelta
```

நாம் ஒரு மதிப்பீட்டை விரும்பும் நேரத்தை LLM-க்கு வழங்க வேண்டும். எதிர்காலத்தில் "n நிமிடங்கள்/மணிநேரங்கள்/நாட்கள்" என்ற நேரத்தைப் பெற, நாம் [the `timedelta` class](https://docs.python.org/3/library/datetime.html#datetime.timedelta)-ஐப் பயன்படுத்துகிறோம்.

```python
# நாம் படிக்கும் பூல்களின் முகவரிகள்
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

நாம் படிக்க வேண்டிய இரண்டு பூல்கள் உள்ளன.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "பிளாக் எதிர்காலத்தில் உள்ளது"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (டோக்கன்1 க்கு டோக்கன்0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC பூலில், `token0` (USDC) இல் இருந்து ஒரு `token1` (WETH)-ஐ வாங்க எவ்வளவு தேவை என்பதை அறிய விரும்புகிறோம். WETH/WBTC பூலில், `token0` (WBTC, இது வ்ராப்ட் பிட்காயின்) ஐ வாங்க எவ்வளவு `token1` (WETH) தேவை என்பதை நாம் அறிய விரும்புகிறோம். பூலின் விகிதம் மாற்றப்பட வேண்டுமா என்பதைக் கண்காணிக்க வேண்டும்.

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

ஒரு பூல் மாற்றப்பட வேண்டுமா என்பதை அறிய, அதை `read_pool`-க்கு உள்ளீடாகப் பெறுகிறோம். மேலும், சொத்தின் சின்னம் சரியாக அமைக்கப்பட வேண்டும்.

`<a> if <b> else <c>` தொடரியல் Python-இன் [மும்மை நிபந்தனை ஆபரேட்டருக்கு](https://en.wikipedia.org/wiki/Ternary_conditional_operator) சமமானது, இது C-பெறப்பட்ட மொழியில் `<b> ?` ஆக இருக்கும். <a> : <c>\`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"சொத்து: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

இந்தச் செயல்பாடு, `Quote` பொருட்களின் பட்டியலை வடிவமைக்கும் ஒரு சரத்தை உருவாக்குகிறது, அவை அனைத்தும் ஒரே சொத்துக்குப் பொருந்தும் என்று கருதி.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python-இல் [பல-வரி சரங்கள்](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... என எழுதப்படுகின்றன. `"""`.

```python
இந்த மேற்கோள்களைக் கருத்தில் கொள்ளுங்கள்:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

இங்கே, ஒவ்வொரு மேற்கோள் பட்டியலுக்கும் `format_quotes`-உடன் ஒரு சரத்தை உருவாக்க [MapReduce](https://en.wikipedia.org/wiki/MapReduce) முறையைப் பயன்படுத்துகிறோம், பின்னர் அவற்றை ப்ராம்ட்டில் பயன்படுத்த ஒரு ஒற்றை சரமாக குறைக்கிறோம்.

```python
{asset}-க்கான மதிப்பு {expected_time} நேரத்தில் என்னவாக இருக்கும் என்று எதிர்பார்க்கிறீர்கள்?

உங்கள் பதிலை இரண்டு தசம இடங்களுக்குச் சுருக்கி ஒரு ஒற்றை எண்ணாக வழங்கவும்,
வேறு எந்த உரையும் இல்லாமல்.
    """
```

ப்ராம்ட்டின் மீதமுள்ள பகுதி எதிர்பார்த்தபடியே உள்ளது.

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

இரண்டு பூல்களையும் மதிப்பாய்வு செய்து, இரண்டிலிருந்தும் மேற்கோள்களைப் பெறவும்.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

நாம் மதிப்பீட்டை விரும்பும் எதிர்கால நேரப் புள்ளியைத் தீர்மானித்து, ப்ராம்ப்டை உருவாக்கவும்.

### ஒரு LLM உடன் இடைமுகம் செய்தல் {#interface-llm}

அடுத்து, நாம் ஒரு உண்மையான LLM-ஐ ப்ராம்ட் செய்து, எதிர்பார்க்கப்படும் எதிர்கால மதிப்பைப் பெறுகிறோம். நான் இந்த நிரலை OpenAI-ஐப் பயன்படுத்தி எழுதினேன், எனவே நீங்கள் வேறு ஒரு வழங்குநரைப் பயன்படுத்த விரும்பினால், நீங்கள் அதை சரிசெய்ய வேண்டும்.

1. ஒரு [OpenAI கணக்கை](https://auth.openai.com/create-account)ப் பெறவும்

2. [கணக்கிற்கு நிதியளிக்கவும்](https://platform.openai.com/settings/organization/billing/overview)—எழுதுகின்ற நேரத்தில் குறைந்தபட்சத் தொகை $5 ஆகும்

3. [ஒரு பயன்பாட்டு நிரலாக்க இடைமுகம் (API) விசையை உருவாக்கவும்](https://platform.openai.com/settings/organization/api-keys)

4. கட்டளை வரியில், உங்கள் நிரல் அதைப் பயன்படுத்தும் வகையில் பயன்பாட்டு நிரலாக்க இடைமுகம் (API) விசையை ஏற்றுமதி செய்யவும்

   ```sh
   export OPENAI_API_KEY=sk-<விசையின் மீதமுள்ள பகுதி இங்கே வரும்>
   ```

5. முகவரை சரிபார்த்து இயக்கவும்

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

இதோ புதிய குறியீடு.

```python
from openai import OpenAI

open_ai = OpenAI() # வாடிக்கையாளர் OPENAI_API_KEY சூழல் மாறியைப் படிக்கிறார்
```

OpenAI பயன்பாட்டு நிரலாக்க இடைமுகம் (API)-ஐ இறக்குமதி செய்து செயல்படுத்தவும்.

```python
response = open_ai.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "பயனர்", "content": prompt}
    ],
    temperature=0.0,
    max_tokens=16,
)
```

பதிலை உருவாக்க OpenAI பயன்பாட்டு நிரலாக்க இடைமுகம் (API)-ஐ (`open_ai.chat.completions.create`) அழைக்கவும்.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("தற்போதைய விலை:", wethusdc_quotes[-1].price)
print(f"{future_time}-இல், எதிர்பார்க்கப்படும் விலை: {expected_price} USD")

if (expected_price > current_price):
    print(f"வாங்கு, விலை {expected_price - current_price} USD உயரும் என்று எதிர்பார்க்கிறேன்")
else:
    print(f"விற்பனை செய், விலை {current_price - expected_price} USD குறையும் என்று எதிர்பார்க்கிறேன்")
```

விலையை வெளியிட்டு, வாங்க அல்லது விற்க பரிந்துரையை வழங்கவும்.

#### கணிப்புகளைச் சோதித்தல் {#testing-the-predictions}

இப்போது நாம் கணிப்புகளை உருவாக்க முடியும் என்பதால், நாம் பயனுள்ள கணிப்புகளை உருவாக்குகிறோமா என்பதை மதிப்பிடுவதற்கு வரலாற்றுத் தரவையும் பயன்படுத்தலாம்.

```sh
uv run test-predictor.py
```

எதிர்பார்க்கப்படும் முடிவு இது போன்றது:

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
29 கணிப்புகளின் சராசரி கணிப்பு பிழை: 83.87103448275862068965517241 USD
ஒரு பரிந்துரைக்கான சராசரி மாற்றம்: 4.787931034482758620689655172 USD
மாற்றங்களின் நிலையான மாறுபாடு: 104.42 USD
இலாபகரமான நாட்கள்: 51.72%
இழப்பு நாட்கள்: 48.28%
```

சோதனையாளரின் பெரும்பகுதி முகவரைப் போலவே உள்ளது, ஆனால் புதிய அல்லது மாற்றியமைக்கப்பட்ட பகுதிகள் இங்கே உள்ளன.

```python
CYCLES_FOR_TEST = 40 # பேக்டெஸ்டுக்கு, நாம் எத்தனை சுழற்சிகளைச் சோதிக்கிறோம்

# நிறைய மேற்கோள்களைப் பெறவும்
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

நாம் `CYCLES_FOR_TEST` (இங்கே 40 என குறிப்பிடப்பட்டுள்ளது) நாட்களை பின்னோக்கிப் பார்க்கிறோம்.

```python
# கணிப்புகளை உருவாக்கி அவற்றை உண்மையான வரலாற்றுடன் சரிபார்க்கவும்

total_error = Decimal(0)
changes = []
```

நாம் ஆர்வமாக உள்ள இரண்டு வகையான பிழைகள் உள்ளன. முதலாவது, `total_error`, கணிப்பாளர் செய்த பிழைகளின் மொத்தமாகும்.

இரண்டாவதாக, `changes`-ஐப் புரிந்து கொள்ள, முகவரின் நோக்கத்தை நாம் நினைவில் கொள்ள வேண்டும். WETH/USDC விகிதத்தை (ETH விலை) கணிப்பது அல்ல. விற்பனை மற்றும் வாங்குதல் பரிந்துரைகளை வழங்குவதே அதன் நோக்கம். விலை தற்போது $2000 ஆக இருந்து, நாளை $2010 ஆக இருக்கும் என்று கணித்தால், உண்மையான முடிவு $2020 ஆக இருந்தால், நாம் கூடுதல் பணம் சம்பாதிப்பதால் கவலைப்பட மாட்டோம். ஆனால், அது $2010 என்று கணித்து, அந்தப் பரிந்துரையின் அடிப்படையில் ETH ஐ வாங்கி, விலை $1990 ஆகக் குறைந்தால் நாம் கவலைப்படுவோம்.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

முழுமையான வரலாறு (கணிப்பிற்காகப் பயன்படுத்தப்பட்ட மதிப்புகள் மற்றும் அதை ஒப்பிடுவதற்கான உண்மையான மதிப்பு) கிடைக்கும் நிகழ்வுகளை மட்டுமே நாம் பார்க்க முடியும். இதன் பொருள் புதிய வழக்கு `CYCLES_BACK` முன்பு தொடங்கியதாக இருக்க வேண்டும்.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

முகவர் பயன்படுத்தும் மாதிரிகளின் அதே எண்ணிக்கையைப் பெற [ஸ்லைஸ்களை](https://www.w3schools.com/python/ref_func_slice.asp)ப் பயன்படுத்தவும். இங்குள்ள மற்றும் அடுத்த பிரிவிற்கு இடையிலான குறியீடு, முகவரில் நாம் வைத்திருக்கும் அதே கணிப்பு-பெறும் குறியீடு ஆகும்.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

கணிக்கப்பட்ட விலை, உண்மையான விலை மற்றும் கணிப்பு நேரத்தில் இருந்த விலை ஆகியவற்றைப் பெறவும். பரிந்துரை வாங்குவதா அல்லது விற்பதா என்பதைத் தீர்மானிக்க கணிப்பு நேரத்தில் இருந்த விலை நமக்குத் தேவை.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"{prediction_time}-க்கான கணிப்பு: கணிக்கப்பட்டது {predicted_price} USD, உண்மையானது {real_price} USD, பிழை {error} USD")
```

பிழையைக் கண்டுபிடித்து, அதை மொத்தத்துடன் சேர்க்கவும்.

```python
    recomended_action = 'வாங்க' என்றால் predicted_price > prediction_time_price else 'விற்பனை'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'வாங்க' else -price_increase)
```

`changes`-க்கு, ஒரு ETH-ஐ வாங்குவதன் அல்லது விற்பதன் பணத் தாக்கத்தை நாம் விரும்புகிறோம். எனவே முதலில், நாம் பரிந்துரையைத் தீர்மானிக்க வேண்டும், பின்னர் உண்மையான விலை எவ்வாறு மாறியது என்பதை மதிப்பீடு செய்ய வேண்டும், மற்றும் பரிந்துரை பணம் சம்பாதித்ததா (நேர்மறை மாற்றம்) அல்லது பணத்தை இழந்ததா (எதிர்மறை மாற்றம்) என்பதை மதிப்பிட வேண்டும்.

```python
print (f"{len(wethusdc_quotes)-CYCLES_BACK} கணிப்புகளுக்கான சராசரி கணிப்பு பிழை: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"ஒரு பரிந்துரைக்கான சராசரி மாற்றம்: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"மாற்றங்களின் நிலையான மாறுபாடு: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

முடிவுகளைப் புகாரளிக்கவும்.

```python
print (f"இலாபகரமான நாட்கள்: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"இழப்பு நாட்கள்: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

இலாபகரமான நாட்கள் மற்றும் செலவுமிக்க நாட்களின் எண்ணிக்கையைக் கணக்கிட [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) ஐப் பயன்படுத்தவும். முடிவு ஒரு ஃபில்டர் பொருள், நீளத்தைப் பெற அதை ஒரு பட்டியலாக மாற்ற வேண்டும்.

### பரிவர்த்தனைகளைச் சமர்ப்பித்தல் {#submit-txn}

இப்போது நாம் உண்மையில் பரிவர்த்தனைகளைச் சமர்ப்பிக்க வேண்டும். இருப்பினும், அமைப்பு நிரூபிக்கப்படுவதற்கு முன்பு, இந்த நேரத்தில் நான் உண்மையான பணத்தைச் செலவழிக்க விரும்பவில்லை. அதற்கு பதிலாக, மெயின்நெட்டின் ஒரு உள்ளூர் ஃபோர்க்கை உருவாக்கி, அந்த நெட்வொர்க்கில் "வர்த்தகம்" செய்வோம்.

ஒரு உள்ளூர் ஃபோர்க்கை உருவாக்கி, வர்த்தகத்தை இயக்குவதற்கான படிகள் இங்கே.

1. [Foundry](https://getfoundry.sh/introduction/installation)-ஐ நிறுவவும்

2. [`anvil`](https://getfoundry.sh/anvil/overview)-ஐத் தொடங்கவும்

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry-க்கான இயல்புநிலை URL, http://localhost:8545-இல் கேட்கிறது, எனவே நாம் பிளாக்செயினைக் கையாளப் பயன்படுத்தும் [the `cast` command](https://getfoundry.sh/cast/overview)-க்கான URL-ஐக் குறிப்பிடத் தேவையில்லை.

3. `anvil`-இல் இயக்கும்போது, ETH உள்ள பத்து சோதனை கணக்குகள் உள்ளன—முதலாவதுக்கான சூழல் மாறிகளை அமைக்கவும்

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. நாம் பயன்படுத்த வேண்டிய ஒப்பந்தங்கள் இவை. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) என்பது நாம் உண்மையில் வர்த்தகம் செய்யப் பயன்படுத்தும் Uniswap v3 ஒப்பந்தமாகும். நாம் நேரடியாக பூல் வழியாக வர்த்தகம் செய்யலாம், ஆனால் இது மிகவும் எளிதானது.

   கீழே உள்ள இரண்டு மாறிகளும் WETH மற்றும் USDC இடையே மாற்றத் தேவையான Uniswap v3 பாதைகள் ஆகும்.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. ஒவ்வொரு சோதனை கணக்கிலும் 10,000 ETH உள்ளது. வர்த்தகத்திற்காக 1000 WETH பெற 1000 ETH-ஐ வ்ராப் செய்ய WETH ஒப்பந்தத்தைப் பயன்படுத்தவும்.

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

   `approve` அழைப்பு, `SwapRouter` எங்கள் டோக்கன்களில் சிலவற்றை செலவழிக்க அனுமதிக்கும் ஒரு அனுமதியை உருவாக்குகிறது. ஒப்பந்தங்கள் நிகழ்வுகளைக் கண்காணிக்க முடியாது, எனவே நாம் நேரடியாக `SwapRouter` ஒப்பந்தத்திற்கு டோக்கன்களை மாற்றினால், அது பணம் செலுத்தப்பட்டதை அறியாது. அதற்கு பதிலாக, `SwapRouter` ஒப்பந்தத்தை ஒரு குறிப்பிட்ட தொகையைச் செலவழிக்க அனுமதிக்கிறோம், பின்னர் `SwapRouter` அதைச் செய்கிறது. இது `SwapRouter` ஆல் அழைக்கப்படும் ஒரு செயல்பாடு மூலம் செய்யப்படுகிறது, எனவே அது வெற்றிகரமாக இருந்ததா என்பதை அறியும்.

7. உங்களிடம் இரண்டு டோக்கன்களும் போதுமான அளவு உள்ளதா என்பதைச் சரிபார்க்கவும்.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

இப்போது நம்மிடம் WETH மற்றும் USDC இருப்பதால், நாம் உண்மையில் முகவரை இயக்கலாம்.

```sh
git checkout 05-trade
uv run agent.py
```

வெளியீடு இது போன்று இருக்கும்:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
தற்போதைய விலை: 1843.16
2026-02-06T23:07-இல், எதிர்பார்க்கப்படும் விலை: 1724.41 USD
வர்த்தகத்திற்கு முன் கணக்கு இருப்புகள்:
USDC இருப்பு: 927301.578272
WETH இருப்பு: 500
விற்பனை செய், விலை 118.75 USD குறையும் என்று எதிர்பார்க்கிறேன்
அனுமதி பரிவர்த்தனை அனுப்பப்பட்டது: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
அனுமதி பரிவர்த்தனை மைன் செய்யப்பட்டது.
விற்பனை பரிவர்த்தனை அனுப்பப்பட்டது: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
விற்பனை பரிவர்த்தனை மைன் செய்யப்பட்டது.
வர்த்தகத்திற்குப் பிறகு கணக்கு இருப்புகள்:
USDC இருப்பு: 929143.797116
WETH இருப்பு: 499
```

இதை உண்மையில் பயன்படுத்த, உங்களுக்கு சில சிறிய மாற்றங்கள் தேவை.

- வரி 14-இல், `MAINNET_URL`-ஐ `https://eth.drpc.org` போன்ற ஒரு உண்மையான அணுகல் புள்ளிக்கு மாற்றவும்
- வரி 28-இல், `PRIVATE_KEY`-ஐ உங்கள் சொந்த தனிப்பட்ட விசைக்கு மாற்றவும்
- நீங்கள் மிகவும் செல்வந்தராக இருந்து, நிரூபிக்கப்படாத ஒரு முகவருக்காக ஒவ்வொரு நாளும் 1 ETH வாங்கவோ அல்லது விற்கவோ முடியாவிட்டால், `WETH_TRADE_AMOUNT`-ஐக் குறைக்க 29-ஐ மாற்ற விரும்பலாம்

#### குறியீடு விளக்கம் {#trading-code}

இதோ புதிய குறியீடு.

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

உண்மையில் வர்த்தகம் செய்ய, நமக்கு `approve` செயல்பாடு தேவை. நாம் முன்பும் பின்பும் இருப்புகளைக் காட்ட விரும்புகிறோம், எனவே நமக்கு `balanceOf` உம் தேவை.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` பயன்பாடு பைனரி இடைமுகம் (ABI)-இல் நமக்கு `exactInput` மட்டுமே தேவை. சரியாக ஒரு WETH-ஐ வாங்க நாம் பயன்படுத்தக்கூடிய `exactOutput` என்ற தொடர்புடைய செயல்பாடு உள்ளது, ஆனால் எளிமைக்காக நாம் இரண்டு நிகழ்வுகளிலும் `exactInput`-ஐ மட்டுமே பயன்படுத்துகிறோம்.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`கணக்கு`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) மற்றும் `SwapRouter` ஒப்பந்தத்திற்கான Web3 வரையறைகள்.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

பரிவர்த்தனை அளவுருக்கள். ஒவ்வொரு முறையும் [நான்ஸ்](https://en.wikipedia.org/wiki/Cryptographic_nonce) மாற வேண்டும் என்பதால், இங்கு நமக்கு ஒரு செயல்பாடு தேவை.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter`-க்கு ஒரு டோக்கன் அனுமதியை அங்கீகரிக்கவும்.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3-இல் ஒரு பரிவர்த்தனையை இப்படித்தான் அனுப்புகிறோம். முதலில் பரிவர்த்தனையை உருவாக்க [the `Contract` object](https://web3py.readthedocs.io/en/stable/web3.contract.html) ஐப் பயன்படுத்துகிறோம். பின்னர் பரிவர்த்தனையில் கையொப்பமிட `PRIVATE_KEY` ஐப் பயன்படுத்தி [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) ஐப் பயன்படுத்துகிறோம். இறுதியாக, பரிவர்த்தனையை அனுப்ப [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) ஐப் பயன்படுத்துகிறோம்.

```python
    print(f"அனுமதி பரிவர்த்தனை அனுப்பப்பட்டது: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("அனுமதி பரிவர்த்தனை மைன் செய்யப்பட்டது.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) பரிவர்த்தனை மைன் செய்யப்படும் வரை காத்திருக்கிறது. தேவைப்பட்டால் அது ரசீதைத் திருப்பித் தருகிறது.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

இவை WETH விற்கும் போது அளவுருக்கள்.

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

`SELL_PARAMS`-க்கு மாறாக, வாங்குதல் அளவுருக்கள் மாறலாம். உள்ளீட்டுத் தொகை 1 WETH இன் விலை, இது `quote`-இல் கிடைக்கிறது.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"வாங்க பரிவர்த்தனை அனுப்பப்பட்டது: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("வாங்க பரிவர்த்தனை மைன் செய்யப்பட்டது.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"விற்பனை பரிவர்த்தனை அனுப்பப்பட்டது: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("விற்பனை பரிவர்த்தனை மைன் செய்யப்பட்டது.")
```

`buy()` மற்றும் `sell()` செயல்பாடுகள் கிட்டத்தட்ட ஒரே மாதிரியானவை. முதலில் நாம் `SwapRouter`-க்கு போதுமான அனுமதியை அங்கீகரிக்கிறோம், பின்னர் அதை சரியான பாதை மற்றும் தொகையுடன் அழைக்கிறோம்.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} இருப்பு: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} இருப்பு: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

இரண்டு நாணயங்களிலும் பயனர் இருப்புகளைப் புகாரளிக்கவும்.

```python
print("வர்த்தகத்திற்கு முன் கணக்கு இருப்புகள்:")
balances()

if (expected_price > current_price):
    print(f"வாங்கு, விலை {expected_price - current_price} USD உயரும் என்று எதிர்பார்க்கிறேன்")
    buy(wethusdc_quotes[-1])
else:
    print(f"விற்பனை செய், விலை {current_price - expected_price} USD குறையும் என்று எதிர்பார்க்கிறேன்")
    sell()

print("வர்த்தகத்திற்குப் பிறகு கணக்கு இருப்புகள்:")
balances()
```

இந்த முகவர் தற்போது ஒரு முறை மட்டுமே வேலை செய்கிறது. இருப்பினும், நீங்கள் அதை [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html)-இலிருந்து இயக்குவதன் மூலமாகவோ அல்லது வரிகள் 368-400-ஐ ஒரு லூப்பில் வைத்து, அடுத்த சுழற்சிக்கான நேரம் வரும் வரை காத்திருக்க [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep)-ஐப் பயன்படுத்துவதன் மூலமாகவோ அதைத் தொடர்ந்து வேலை செய்யும்படி மாற்றலாம்.

## சாத்தியமான மேம்பாடுகள் {#improvements}

இது ஒரு முழுமையான தயாரிப்பு பதிப்பு அல்ல; இது அடிப்படைகளைக் கற்பிப்பதற்கான ஒரு எடுத்துக்காட்டு மட்டுமே. மேம்பாடுகளுக்கான சில யோசனைகள் இங்கே உள்ளன.

### புத்திசாலித்தனமான வர்த்தகம் {#smart-trading}

என்ன செய்ய வேண்டும் என்பதைத் தீர்மானிக்கும் போது முகவர் புறக்கணிக்கும் இரண்டு முக்கியமான உண்மைகள் உள்ளன.

- _எதிர்பார்க்கப்படும் மாற்றத்தின் அளவு_. விலை குறையும் என்று எதிர்பார்க்கப்பட்டால், சரிவின் அளவைப் பொருட்படுத்தாமல் முகவர் ஒரு குறிப்பிட்ட அளவு `WETH`-ஐ விற்கிறது.
  சிறு மாற்றங்களைப் புறக்கணித்து, விலை எவ்வளவு குறையும் என்று நாம் எதிர்பார்க்கிறோம் என்பதன் அடிப்படையில் விற்பது நல்லது என்று வாதிடலாம்.
- _தற்போதைய போர்ட்ஃபோலியோ_. உங்கள் போர்ட்ஃபோலியோவில் 10% WETH-இல் இருந்தால், விலை உயரும் என்று நீங்கள் நினைத்தால், மேலும் வாங்குவது அர்த்தமுள்ளதாக இருக்கும். ஆனால் உங்கள் போர்ட்ஃபோலியோவில் 90% WETH-இல் இருந்தால், நீங்கள் போதுமான அளவு வெளிப்பட்டிருக்கலாம், மேலும் வாங்க வேண்டிய அவசியமில்லை. விலை குறையும் என்று நீங்கள் எதிர்பார்த்தால் இதன் நேர்மாறானது உண்மை.

### உங்கள் வர்த்தக உத்தியை ரகசியமாக வைத்திருக்க விரும்பினால் என்ன செய்வது? {#secret}

AI விற்பனையாளர்கள் நீங்கள் அவர்களின் LLMகளுக்கு அனுப்பும் வினவல்களைப் பார்க்க முடியும், இது உங்கள் முகவருடன் நீங்கள் உருவாக்கிய மேதை வர்த்தக அமைப்பை வெளிப்படுத்தக்கூடும். பலர் பயன்படுத்தும் ஒரு வர்த்தக அமைப்பு பயனற்றது, ஏனெனில் நீங்கள் வாங்க விரும்பும் போது பலர் வாங்க முயற்சிப்பார்கள் (மற்றும் விலை உயரும்) மற்றும் நீங்கள் விற்க விரும்பும் போது விற்க முயற்சிப்பார்கள் (மற்றும் விலை குறைகிறது).

இந்த சிக்கலைத் தவிர்க்க, நீங்கள் உள்நாட்டில் ஒரு LLM-ஐ இயக்கலாம், எடுத்துக்காட்டாக, [LM-Studio](https://lmstudio.ai/)-ஐப் பயன்படுத்தி.

### AI பாட்-டிலிருந்து AI முகவருக்கு {#bot-to-agent}

இது [ஒரு AI பாட், AI முகவர் அல்ல](/ai-agents/#ai-agents-vs-ai-bots) என்பதற்கு நீங்கள் ஒரு நல்ல வாதத்தை முன்வைக்கலாம். இது முன்னரே வரையறுக்கப்பட்ட தகவலை நம்பியிருக்கும் ஒப்பீட்டளவில் எளிமையான உத்தியைச் செயல்படுத்துகிறது. உதாரணமாக, Uniswap v3 பூல்களின் பட்டியலையும் அவற்றின் சமீபத்திய மதிப்புகளையும் வழங்கி, எந்தக் கலவை சிறந்த முன்கணிப்பு மதிப்பைக் கொண்டுள்ளது என்று கேட்பதன் மூலம் நாம் சுய-முன்னேற்றத்தை இயக்கலாம்.

### ஸ்லிப்பேஜ் பாதுகாப்பு {#slippage-protection}

தற்போது எந்த [ஸ்லிப்பேஜ் பாதுகாப்பும்](https://uniswapv3book.com/milestone_3/slippage-protection.html) இல்லை. தற்போதைய மேற்கோள் $2000 ஆக இருந்து, எதிர்பார்க்கப்படும் விலை $2100 ஆக இருந்தால், முகவர் வாங்கும். இருப்பினும், முகவர் வாங்குவதற்கு முன்பு விலை $2200 ஆக உயர்ந்தால், இனி வாங்குவதில் அர்த்தமில்லை.

ஸ்லிப்பேஜ் பாதுகாப்பைச் செயல்படுத்த, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325)-இன் 325 மற்றும் 334 வரிகளில் ஒரு `amountOutMinimum` மதிப்பைக் குறிப்பிடவும்.

## முடிவுரை {#conclusion}

நம்புகிறோம், இப்போது நீங்கள் AI முகவர்களுடன் தொடங்குவதற்கு போதுமான அளவு அறிந்திருப்பீர்கள். இது இந்த விஷயத்தின் முழுமையான கண்ணோட்டம் அல்ல; அதற்காக முழு புத்தகங்களும் அர்ப்பணிக்கப்பட்டுள்ளன, ஆனால் இது நீங்கள் தொடங்குவதற்கு போதுமானது. நல்ல அதிர்ஷ்டம்!

[எனது மேலும் பணிகளை இங்கே பார்க்கவும்](https://cryptodocguy.pro/).
