---
title: "Ethereum वर तुमचा स्वतःचा AI ट्रेडिंग एजंट बनवा"
description: "या ट्यूटोरियलमध्ये तुम्ही एक साधा AI ट्रेडिंग एजंट कसा बनवायचा हे शिकाल. हा एजंट ब्लॉकचेनवरून माहिती वाचतो, त्या माहितीवर आधारित शिफारशीसाठी LLM ला विचारतो, LLM ने शिफारस केलेला ट्रेड करतो आणि नंतर थांबतो व पुनरावृत्ती करतो."
author: Ori Pomerantz
tags: [ "AI", "ट्रेडिंग", "एजंट", "python" ]
skill: intermediate
published: 2026-02-13
lang: mr
sidebarDepth: 3
---

या ट्यूटोरियलमध्ये तुम्ही एक साधा AI ट्रेडिंग एजंट कसा बनवायचा हे शिकाल. हा एजंट या पायऱ्या वापरून काम करतो:

1. एका टोकनच्या वर्तमान आणि भूतकाळातील किमती, तसेच इतर संभाव्य संबंधित माहिती वाचा
2. ही माहिती संबंधित कशी असू शकते हे स्पष्ट करण्यासाठी पार्श्वभूमी माहितीसह या माहितीसह एक क्वेरी तयार करा
3. क्वेरी सबमिट करा आणि अंदाजित किंमत परत मिळवा
4. शिफारशीवर आधारित ट्रेड करा
5. थांबा आणि पुनरावृत्ती करा

हा एजंट माहिती कशी वाचावी, त्याचे रूपांतर एका क्वेरीमध्ये कसे करावे जे वापरण्यायोग्य उत्तर देते आणि ते उत्तर कसे वापरावे हे दाखवतो. AI एजंटसाठी या सर्व आवश्यक पायऱ्या आहेत. हा एजंट Python मध्ये लागू केला आहे कारण AI मध्ये वापरली जाणारी ही सर्वात सामान्य भाषा आहे.

## हे का करायचे? {#why-do-this}

स्वयंचलित ट्रेडिंग एजंट्स डेव्हलपरना ट्रेडिंग स्ट्रॅटेजी निवडण्याची आणि कार्यान्वित करण्याची परवानगी देतात. [AI एजंट](/ai-agents) अधिक जटिल आणि डायनॅमिक ट्रेडिंग स्ट्रॅटेजीसाठी परवानगी देतात, संभाव्यतः अशी माहिती आणि अल्गोरिदम वापरून ज्याचा वापर करण्याचा डेव्हलपरने विचारही केला नसेल.

## टूल्स {#tools}

हे ट्यूटोरियल कोट्स आणि ट्रेडिंगसाठी [Python](https://www.python.org/), [Web3 लायब्ररी](https://web3py.readthedocs.io/en/stable/), आणि [Uniswap v3](https://github.com/Uniswap/v3-periphery) वापरते.

### Python का? {#python}

AI साठी सर्वात जास्त वापरली जाणारी भाषा [Python](https://www.python.org/) आहे, म्हणून आम्ही येथे ती वापरतो. तुम्हाला Python येत नसेल तरी काळजी करू नका. भाषा खूप स्पष्ट आहे, आणि मी ते नक्की काय करते हे स्पष्ट करेन.

[Web3 लायब्ररी](https://web3py.readthedocs.io/en/stable/) ही सर्वात सामान्य Python Ethereum API आहे. हे वापरण्यास खूप सोपे आहे.

### ब्लॉकचेनवर ट्रेडिंग {#trading-on-blockchain}

असे [अनेक डिस्ट्रिब्युटेड एक्सचेंजेस (DEX)](/apps/categories/defi/) आहेत जे तुम्हाला Ethereum वर टोकन ट्रेड करण्याची परवानगी देतात. तथापि, [आर्बिट्राज](/developers/docs/smart-contracts/composability/#better-user-experience) मुळे त्यांचे एक्सचेंज दर समान असतात.

[Uniswap](https://app.uniswap.org/) हा एक मोठ्या प्रमाणावर वापरला जाणारा DEX आहे जो आपण कोट्स (टोकनचे सापेक्ष मूल्य पाहण्यासाठी) आणि ट्रेड दोन्हीसाठी वापरू शकतो.

### OpenAI {#openai}

लार्ज लँग्वेज मॉडेलसाठी, मी [OpenAI](https://openai.com/) सह सुरुवात करणे निवडले. या ट्यूटोरियलमधील ॲप्लिकेशन चालवण्यासाठी तुम्हाला API ऍक्सेससाठी पैसे द्यावे लागतील. $5 चे किमान पेमेंट पुरेसे आहे.

## विकास, टप्प्याटप्प्याने {#step-by-step}

विकास सुलभ करण्यासाठी, आम्ही टप्प्याटप्प्याने पुढे जातो. प्रत्येक पायरी GitHub मधील एक शाखा आहे.

### सुरुवात करणे {#getting-started}

UNIX किंवा Linux अंतर्गत ( [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) सह) सुरुवात करण्यासाठी पायऱ्या आहेत

1. तुमच्याकडे आधीच नसल्यास, [Python](https://www.python.org/downloads/) डाउनलोड आणि इंस्टॉल करा.

2. GitHub रिपॉझिटरी क्लोन करा.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) इंस्टॉल करा. तुमच्या सिस्टमवरील कमांड वेगळी असू शकते.

   ```sh
   pipx install uv
   ```

4. लायब्ररी डाउनलोड करा.

   ```sh
   uv sync
   ```

5. व्हर्च्युअल एन्व्हायर्नमेंट सक्रिय करा.

   ```sh
   source .venv/bin/activate
   ```

6. Python आणि Web3 योग्यरित्या काम करत आहेत की नाही हे तपासण्यासाठी, `python3` चालवा आणि त्याला हा प्रोग्राम द्या. तुम्ही ते `>>>` प्रॉम्प्टवर टाकू शकता; फाईल तयार करण्याची गरज नाही.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### ब्लॉकचेनवरून वाचन {#read-blockchain}

पुढील पायरी म्हणजे ब्लॉकचेनवरून वाचणे. ते करण्यासाठी, तुम्हाला `02-read-quote` शाखेत बदल करणे आणि नंतर प्रोग्राम चालवण्यासाठी `uv` वापरणे आवश्यक आहे.

```sh
git checkout 02-read-quote
uv run agent.py
```

तुम्हाला `Quote` ऑब्जेक्टची एक यादी मिळेल, प्रत्येकामध्ये टाइमस्टॅम्प, किंमत आणि मालमत्ता (सध्या नेहमी `WETH/USDC`) असेल.

येथे ओळीनुसार स्पष्टीकरण दिले आहे.

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

आपल्याला आवश्यक असलेल्या लायब्ररी आयात करा. जेव्हा ते वापरले जातात तेव्हा ते खाली स्पष्ट केले आहेत.

```python
print = functools.partial(print, flush=True)
```

Python च्या `print` ला अशा आवृत्तीने बदलते जी नेहमी आउटपुट त्वरित फ्लश करते. हे दीर्घकाळ चालणाऱ्या स्क्रिप्टमध्ये उपयुक्त आहे कारण आम्हाला स्टेटस अपडेट किंवा डीबगिंग आउटपुटसाठी प्रतीक्षा करायची नाही.

```python
MAINNET_URL = "https://eth.drpc.org"
```

मेननेटवर जाण्यासाठी एक URL. तुम्ही [नोड ॲज अ सर्व्हिस](/developers/docs/nodes-and-clients/nodes-as-a-service/) मधून एक मिळवू शकता किंवा [चेनलिस्ट](https://chainlist.org/chain/1) मध्ये जाहिरात केलेल्यांपैकी एक वापरू शकता.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

एक Ethereum मेननेट ब्लॉक साधारणपणे दर बारा सेकंदांनी होतो, त्यामुळे वेळेच्या कालावधीत अपेक्षित असलेल्या ब्लॉकची ही संख्या आहे. लक्षात घ्या की हा अचूक आकडा नाही. जेव्हा [ब्लॉक प्रपोजर](/developers/docs/consensus-mechanisms/pos/block-proposal/) डाउन असतो, तेव्हा तो ब्लॉक वगळला जातो आणि पुढील ब्लॉकसाठी वेळ 24 सेकंद असतो. जर आम्हाला टाइमस्टॅम्पसाठी अचूक ब्लॉक हवा असेल तर आम्ही [बायनरी सर्च](https://en.wikipedia.org/wiki/Binary_search) वापरू. तथापि, हे आमच्या उद्देशांसाठी पुरेसे आहे. भविष्याचा अंदाज लावणे हे अचूक विज्ञान नाही.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

सायकलचा आकार. आम्ही प्रत्येक सायकलमध्ये एकदा कोट्सचे पुनरावलोकन करतो आणि पुढील सायकलच्या शेवटी मूल्याचा अंदाज लावण्याचा प्रयत्न करतो.

```python
# आपण वाचत असलेल्या पूलचा ॲड्रेस
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

कोटची मूल्ये [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) या ॲड्रेसवरील Uniswap 3 USDC/WETH पूलमधून घेतली जातात. हा ॲड्रेस आधीच चेकसम फॉर्ममध्ये आहे, परंतु कोड पुन्हा वापरण्यायोग्य बनवण्यासाठी [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) वापरणे चांगले आहे.

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

आपल्याला संपर्क साधण्याची आवश्यकता असलेल्या दोन कॉन्ट्रॅक्ट्ससाठी हे [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) आहेत. कोड संक्षिप्त ठेवण्यासाठी, आम्ही फक्त त्या फंक्शन्सचा समावेश करतो ज्यांना आम्हाला कॉल करण्याची आवश्यकता आहे.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) लायब्ररी सुरू करा आणि Ethereum नोडशी कनेक्ट करा.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Python मध्ये डेटा क्लास तयार करण्याचा हा एक मार्ग आहे. [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) डेटा प्रकार कॉन्ट्रॅक्टशी कनेक्ट करण्यासाठी वापरला जातो. ` (frozen=True)` लक्षात घ्या. Python मध्ये [बुलियन](https://en.wikipedia.org/wiki/Boolean_data_type) `True` किंवा `False` म्हणून कॅपिटलाइज्ड स्वरूपात परिभाषित केले जातात. हा डेटा क्लास `frozen` आहे, म्हणजे फील्ड्समध्ये बदल करता येणार नाही.

इंडेंटेशन लक्षात घ्या. [सी-व्युत्पन्न भाषां](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)च्या तुलनेत, Python ब्लॉक दर्शवण्यासाठी इंडेंटेशन वापरते. Python इंटरप्रिटरला माहित आहे की खालील व्याख्या या डेटा क्लासचा भाग नाही कारण ती डेटा क्लास फील्ड्सप्रमाणे समान इंडेंटेशनवर सुरू होत नाही.

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) प्रकार दशांश अपूर्णांक अचूकपणे हाताळण्यासाठी वापरला जातो.

```python
    def get_price(self, block: int) -> Decimal:
```

Python मध्ये फंक्शन परिभाषित करण्याचा हा मार्ग आहे. व्याख्या `PoolInfo` चा भाग आहे हे दाखवण्यासाठी इंडेंट केलेली आहे.

डेटा क्लासचा भाग असलेल्या फंक्शनमध्ये पहिले पॅरामीटर नेहमी `self` असते, जे येथे कॉल केलेले डेटा क्लासचे उदाहरण आहे. येथे आणखी एक पॅरामीटर आहे, ब्लॉक नंबर.

```python
        assert block <= w3.eth.block_number, "ब्लॉक भविष्यात आहे"
```

जर आपण भविष्य वाचू शकलो असतो, तर आपल्याला ट्रेडिंगसाठी AI ची गरज भासली नसती.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 वरून EVM वर फंक्शन कॉल करण्याची सिंटॅक्स अशी आहे: `<contract object>.functions.<function name>"().call(<parameters>)`. पॅरामीटर्स EVM फंक्शनचे पॅरामीटर्स (असल्यास; येथे नाहीत) किंवा ब्लॉकचेन वर्तन सुधारण्यासाठी [नेम्ड पॅरामीटर्स](https://en.wikipedia.org/wiki/Named_parameter) असू शकतात. येथे आम्ही एक, `block_identifier` वापरतो, [ब्लॉक नंबर](/developers/docs/apis/json-rpc/#default-block) निर्दिष्ट करण्यासाठी ज्यामध्ये आम्हाला चालवायचे आहे.

परिणाम [हा स्ट्रक्ट, ॲरे फॉर्ममध्ये](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72) आहे. पहिले मूल्य दोन टोकन्समधील एक्सचेंज रेटचे फंक्शन आहे.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

ऑनचेन गणना कमी करण्यासाठी, Uniswap v3 वास्तविक एक्सचेंज फॅक्टर साठवत नाही तर त्याचे वर्गमूळ साठवते. कारण EVM फ्लोटिंग पॉइंट मॅथ किंवा फ्रॅक्शन्सला सपोर्ट करत नाही, वास्तविक मूल्याऐवजी, प्रतिसाद <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math> असतो.

```python
         # (token1 प्रति token0)
        return 1/(raw_price * self.decimal_factor)
```

आम्हाला मिळणारी रॉ किंमत म्हणजे प्रत्येक `token1` साठी आम्हाला मिळणाऱ्या `token0` ची संख्या. आमच्या पूलमध्ये `token0` हे USDC (यूएस डॉलरसारखेच मूल्य असलेले स्टेबलकॉइन) आहे आणि `token1` हे [WETH](https://opensea.io/learn/blockchain/what-is-weth) आहे. आम्हाला खरोखर हवे असलेले मूल्य म्हणजे प्रति WETH डॉलरची संख्या, व्यस्त नाही.

डेसिमल फॅक्टर हे दोन टोकन्ससाठी [डेसिमल फॅक्टर्स](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) मधील गुणोत्तर आहे.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

हा डेटा क्लास एक कोट दर्शवतो: एका विशिष्ट वेळी एका विशिष्ट मालमत्तेची किंमत. या टप्प्यावर, `asset` फील्ड अप्रासंगिक आहे कारण आम्ही एकच पूल वापरतो आणि त्यामुळे एकच मालमत्ता आहे. तथापि, आम्ही नंतर अधिक मालमत्ता जोडू.

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

हे फंक्शन एक ॲड्रेस घेते आणि त्या ॲड्रेसवरील टोकन कॉन्ट्रॅक्टबद्दल माहिती देते. नवीन [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) तयार करण्यासाठी, आम्ही `w3.eth.contract` ला ॲड्रेस आणि ABI देतो.

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

हे फंक्शन आम्हाला [एका विशिष्ट पूल](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)बद्दल आवश्यक असलेली प्रत्येक गोष्ट परत करते. `f"<string>"` सिंटॅक्स हे [फॉर्मेटेड स्ट्रिंग](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) आहे.

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

`Quote` ऑब्जेक्ट मिळवा. `block_number` साठी डीफॉल्ट मूल्य `None` आहे (मूल्य नाही).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

जर ब्लॉक नंबर निर्दिष्ट केला नसेल, तर `w3.eth.block_number` वापरा, जो नवीनतम ब्लॉक नंबर आहे. हे [एका `if` स्टेटमेंट](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) साठी सिंटॅक्स आहे.

डीफॉल्ट `w3.eth.block_number` वर सेट करणे चांगले झाले असते असे वाटू शकते, परंतु ते चांगले काम करत नाही कारण फंक्शन परिभाषित केल्याच्या वेळेचा तो ब्लॉक नंबर असेल. दीर्घकाळ चालणाऱ्या एजंटमध्ये, ही एक समस्या असेल.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

मानव आणि लार्ज लँग्वेज मॉडेल्स (LLMs) साठी वाचनीय स्वरूपात फॉरमॅट करण्यासाठी [`datetime` लायब्ररी](https://docs.python.org/3/library/datetime.html) वापरा. मूल्य दोन दशांश स्थानांपर्यंत पूर्णांक करण्यासाठी [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) वापरा.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python मध्ये तुम्ही एक [सूची](https://docs.python.org/3/library/stdtypes.html#typesseq-list) परिभाषित करता ज्यात `list[<type>]` वापरून फक्त एक विशिष्ट प्रकार असू शकतो.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python मध्ये [`for` लूप](https://docs.python.org/3/tutorial/controlflow.html#for-statements) सामान्यतः सूचीवर पुनरावृत्ती करतो. कोट्स शोधण्यासाठी ब्लॉक नंबर्सची सूची [`range`](https://docs.python.org/3/library/stdtypes.html#range) मधून येते.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

प्रत्येक ब्लॉक नंबरसाठी, `Quote` ऑब्जेक्ट मिळवा आणि तो `quotes` सूचीमध्ये जोडा. नंतर ती सूची परत करा.

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

हा स्क्रिप्टचा मुख्य कोड आहे. पूल माहिती वाचा, बारा कोट्स मिळवा आणि त्यांना [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) करा.

### प्रॉम्प्ट तयार करणे {#prompt}

पुढे, आम्हाला या कोट्सच्या सूचीचे LLM साठी प्रॉम्प्टमध्ये रूपांतर करणे आणि अपेक्षित भविष्यकालीन मूल्य मिळवणे आवश्यक आहे.

```sh
git checkout 03-create-prompt
uv run agent.py
```

आउटपुट आता LLM साठी एक प्रॉम्प्ट असेल, यासारखे:

```
हे कोट्स दिले आहेत:
मालमत्ता: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

मालमत्ता: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


तुम्ही 2026-02-02T17:56 वाजता WETH/USDC साठी काय मूल्य अपेक्षित कराल?

तुमचे उत्तर दोन दशांश स्थानांपर्यंत पूर्णांक केलेला एकच क्रमांक म्हणून द्या,
इतर कोणत्याही मजकुराशिवाय.
```

लक्षात घ्या की येथे दोन मालमत्तांसाठी कोट्स आहेत, `WETH/USDC` आणि `WBTC/WETH`. दुसऱ्या मालमत्तेतून कोट्स जोडल्याने अंदाजाची अचूकता सुधारू शकते.

#### प्रॉम्प्ट कसा दिसतो {#prompt-explanation}

या प्रॉम्प्टमध्ये तीन विभाग आहेत, जे LLM प्रॉम्प्टमध्ये खूप सामान्य आहेत.

1. माहिती. LLM कडे त्यांच्या प्रशिक्षणातून खूप माहिती असते, परंतु त्यांच्याकडे सहसा नवीनतम माहिती नसते. हेच कारण आहे की आम्हाला येथे नवीनतम कोट्स पुनर्प्राप्त करण्याची आवश्यकता आहे. प्रॉम्प्टमध्ये माहिती जोडण्याला [रिट्रिव्हल ऑगमेंटेड जनरेशन (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) म्हणतात.

2. वास्तविक प्रश्न. हेच आपल्याला जाणून घ्यायचे आहे.

3. आउटपुट फॉरमॅटिंग सूचना. सामान्यतः, एक LLM आम्हाला एक अंदाज देईल, तो कसा आला याच्या स्पष्टीकरणासह. हे मानवांसाठी चांगले आहे, परंतु संगणक प्रोग्रामला फक्त अंतिम उत्तराची गरज असते.

#### कोड स्पष्टीकरण {#prompt-code}

येथे नवीन कोड आहे.

```python
from datetime import datetime, timezone, timedelta
```

आम्हाला LLM ला तो वेळ प्रदान करण्याची आवश्यकता आहे ज्यासाठी आम्हाला अंदाज हवा आहे. भविष्यात "n मिनिटे/तास/दिवस" वेळ मिळवण्यासाठी, आम्ही [`timedelta` क्लास](https://docs.python.org/3/library/datetime.html#datetime.timedelta) वापरतो.

```python
# आपण वाचत असलेल्या पूल्सचे ॲड्रेस
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

आमच्याकडे दोन पूल्स आहेत जे आम्हाला वाचण्याची गरज आहे.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "ब्लॉक भविष्यात आहे"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 प्रति token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC पूलमध्ये, आम्हाला एक `token1` (WETH) विकत घेण्यासाठी किती `token0` (USDC) लागतील हे जाणून घ्यायचे आहे. WETH/WBTC पूलमध्ये, आम्हाला एक `token0` (WBTC, जे रॅप केलेले Bitcoin आहे) विकत घेण्यासाठी किती `token1` (WETH) लागतील हे जाणून घ्यायचे आहे. आम्हाला पूलचे गुणोत्तर उलट करण्याची गरज आहे का याचा मागोवा घेणे आवश्यक आहे.

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

एखादा पूल उलट करण्याची गरज आहे की नाही हे जाणून घेण्यासाठी, आम्ही ते `read_pool` साठी इनपुट म्हणून घेतो. तसेच, मालमत्तेचे चिन्ह योग्यरित्या सेट करणे आवश्यक आहे.

`<a> if <b> else <c>` ही सिंटॅक्स [टर्नरी कंडिशनल ऑपरेटर](https://en.wikipedia.org/wiki/Ternary_conditional_operator) ची Python समतुल्य आहे, जी C-व्युत्पन्न भाषेत `<b> ? <a> : <c>` असेल.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"मालमत्ता: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

हे फंक्शन `Quote` ऑब्जेक्ट्सच्या सूचीला फॉरमॅट करणारी स्ट्रिंग तयार करते, असे गृहीत धरून की ते सर्व एकाच मालमत्तेवर लागू होतात.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python मध्ये [मल्टी-लाइन स्ट्रिंग लिटरल्स](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... असे लिहिले जातात. `"""`.

```python
हे कोट्स दिले आहेत:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

येथे, आम्ही `format_quotes` सह प्रत्येक कोट सूचीसाठी स्ट्रिंग तयार करण्यासाठी [MapReduce](https://en.wikipedia.org/wiki/MapReduce) पॅटर्न वापरतो, नंतर त्यांना प्रॉम्प्टमध्ये वापरण्यासाठी एकाच स्ट्रिंगमध्ये कमी करतो.

```python
{expected_time} वाजता {asset} साठी तुम्ही काय मूल्य अपेक्षित कराल?

तुमचे उत्तर दोन दशांश स्थानांपर्यंत पूर्णांक केलेला एकच क्रमांक म्हणून द्या,
इतर कोणत्याही मजकुराशिवाय.
    """
```

प्रॉम्प्टचा उर्वरित भाग अपेक्षित आहे.

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

दोन पूल्सचे पुनरावलोकन करा आणि दोन्हींकडून कोट्स मिळवा.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

भविष्यातील वेळेचा बिंदू निश्चित करा ज्यासाठी आम्हाला अंदाज हवा आहे आणि प्रॉम्प्ट तयार करा.

### LLM सह इंटरफेसिंग {#interface-llm}

पुढे, आम्ही प्रत्यक्ष LLM ला प्रॉम्प्ट करतो आणि अपेक्षित भविष्यकालीन मूल्य प्राप्त करतो. मी हा प्रोग्राम OpenAI वापरून लिहिला आहे, त्यामुळे तुम्हाला वेगळा प्रदाता वापरायचा असेल, तर तुम्हाला त्यात बदल करावे लागतील.

1. [OpenAI खाते](https://auth.openai.com/create-account) मिळवा

2. [खात्यात पैसे भरा](https://platform.openai.com/settings/organization/billing/overview)—लिहिण्याच्या वेळी किमान रक्कम $5 आहे

3. [API की तयार करा](https://platform.openai.com/settings/organization/api-keys)

4. कमांड लाइनमध्ये, API की एक्सपोर्ट करा जेणेकरून तुमचा प्रोग्राम ती वापरू शकेल

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. एजंट चेकआउट करा आणि चालवा

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

येथे नवीन कोड आहे.

```python
from openai import OpenAI

open_ai = OpenAI()  # क्लायंट OPENAI_API_KEY पर्यावरण व्हेरिएबल वाचतो
```

OpenAI API इम्पोर्ट आणि इन्स्टॅन्शिएट करा.

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

प्रतिसाद तयार करण्यासाठी OpenAI API (`open_ai.chat.completions.create`) कॉल करा.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("सध्याची किंमत:", wethusdc_quotes[-1].price)
print(f"{future_time} मध्ये, अपेक्षित किंमत: {expected_price} USD")

if (expected_price > current_price):
    print(f"खरेदी करा, मला किंमत {expected_price - current_price} USD ने वाढण्याची अपेक्षा आहे")
else:
    print(f"विक्री करा, मला किंमत {current_price - expected_price} USD ने कमी होण्याची अपेक्षा आहे")
```

किंमत आउटपुट करा आणि खरेदी किंवा विक्रीची शिफारस द्या.

#### अंदाजांची चाचणी {#testing-the-predictions}

आता आपण अंदाज तयार करू शकतो, तेव्हा आपण उपयुक्त अंदाज तयार करतो की नाही हे तपासण्यासाठी ऐतिहासिक डेटा देखील वापरू शकतो.

```sh
uv run test-predictor.py
```

अपेक्षित परिणाम यासारखा आहे:

```
2026-01-05T19:50 साठी अंदाज: अंदाजित 3138.93 USD, वास्तविक 3218.92 USD, त्रुटी 79.99 USD
2026-01-06T19:56 साठी अंदाज: अंदाजित 3243.39 USD, वास्तविक 3221.08 USD, त्रुटी 22.31 USD
2026-01-07T20:02 साठी अंदाज: अंदाजित 3223.24 USD, वास्तविक 3146.89 USD, त्रुटी 76.35 USD
2026-01-08T20:11 साठी अंदाज: अंदाजित 3150.47 USD, वास्तविक 3092.04 USD, त्रुटी 58.43 USD
.
.
.
2026-01-31T22:33 साठी अंदाज: अंदाजित 2637.73 USD, वास्तविक 2417.77 USD, त्रुटी 219.96 USD
2026-02-01T22:41 साठी अंदाज: अंदाजित 2381.70 USD, वास्तविक 2318.84 USD, त्रुटी 62.86 USD
2026-02-02T22:49 साठी अंदाज: अंदाजित 2234.91 USD, वास्तविक 2349.28 USD, त्रुटी 114.37 USD
29 अंदाजांवर सरासरी अंदाज त्रुटी: 83.87103448275862068965517241 USD
प्रति शिफारस सरासरी बदल: 4.787931034482758620689655172 USD
बदलांचे मानक विचलन: 104.42 USD
फायदेशीर दिवस: 51.72%
तोट्याचे दिवस: 48.28%
```

बहुतेक टेस्टर एजंटसारखाच आहे, परंतु येथे काही भाग नवीन किंवा सुधारित आहेत.

```python
CYCLES_FOR_TEST = 40 # बॅकटेस्टसाठी, आम्ही किती सायकलची चाचणी घेतो

# भरपूर कोट्स मिळवा
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

आम्ही `CYCLES_FOR_TEST` (येथे 40 म्हणून निर्दिष्ट) दिवस मागे पाहतो.

```python
# अंदाज तयार करा आणि त्यांना वास्तविक इतिहासासह तपासा

total_error = Decimal(0)
changes = []
```

आपल्याला दोन प्रकारच्या त्रुटींमध्ये रस आहे. पहिली, `total_error`, ही फक्त प्रेडिक्टरने केलेल्या त्रुटींची बेरीज आहे.

दुसरी, `changes`, समजून घेण्यासाठी आपल्याला एजंटचा उद्देश लक्षात ठेवणे आवश्यक आहे. WETH/USDC गुणोत्तराचा (ETH किंमत) अंदाज लावणे हे त्याचे काम नाही. विक्री आणि खरेदीच्या शिफारसी देणे हे त्याचे काम आहे. जर सध्याची किंमत $2000 असेल आणि उद्या $2010 चा अंदाज असेल, तर वास्तविक परिणाम $2020 असल्यास आणि आपण अतिरिक्त पैसे कमावल्यास आपल्याला काही फरक पडत नाही. परंतु जर त्याने $2010 चा अंदाज लावला असेल, आणि त्या शिफारशीवर आधारित ETH विकत घेतले असेल, आणि किंमत $1990 पर्यंत घसरली तर आपल्याला नक्कीच फरक पडतो.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

आपण फक्त अशा प्रकरणांकडे पाहू शकतो जिथे संपूर्ण इतिहास (अंदाजासाठी वापरलेली मूल्ये आणि त्याची तुलना करण्यासाठी वास्तविक-जगातील मूल्य) उपलब्ध आहे. याचा अर्थ नवीन केस ती असली पाहिजे जी `CYCLES_BACK` पूर्वी सुरू झाली.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

एजंट वापरत असलेल्या सॅम्पल्सची संख्या मिळवण्यासाठी [स्लाइस](https://www.w3schools.com/python/ref_func_slice.asp) वापरा. येथून पुढील सेगमेंटपर्यंतचा कोड हा एजंटमध्ये असलेल्या गेट-अ-प्रेडिक्शन कोडसारखाच आहे.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

अपेक्षित किंमत, वास्तविक किंमत आणि अंदाजाच्या वेळेची किंमत मिळवा. खरेदी किंवा विक्रीची शिफारस होती की नाही हे ठरवण्यासाठी आम्हाला अंदाजाच्या वेळेची किंमत आवश्यक आहे.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

त्रुटी काढा आणि ती एकूण त्रुटीमध्ये जोडा.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` साठी, आम्हाला एक ETH विकत घेतल्यास किंवा विकल्यास होणारा आर्थिक परिणाम हवा आहे. त्यामुळे, प्रथम आपल्याला शिफारस निश्चित करणे आवश्यक आहे, नंतर वास्तविक किंमत कशी बदलली आणि शिफारशीमुळे पैसे मिळाले (सकारात्मक बदल) की पैसे गेले (नकारात्मक बदल) हे तपासा.

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

परिणाम कळवा.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

फायदेशीर दिवसांची संख्या आणि तोट्याच्या दिवसांची संख्या मोजण्यासाठी [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) वापरा. परिणाम एक फिल्टर ऑब्जेक्ट आहे, ज्याला लांबी मिळवण्यासाठी आपल्याला सूचीमध्ये रूपांतरित करणे आवश्यक आहे.

### व्यवहार सबमिट करणे {#submit-txn}

आता आपल्याला प्रत्यक्षात व्यवहार सबमिट करणे आवश्यक आहे. तथापि, प्रणाली सिद्ध होण्यापूर्वी या टप्प्यावर मला खरे पैसे खर्च करायचे नाहीत. त्याऐवजी, आम्ही मेननेटचा एक स्थानिक फोर्क तयार करू आणि त्या नेटवर्कवर "ट्रेड" करू.

स्थानिक फोर्क तयार करण्यासाठी आणि ट्रेडिंग सक्षम करण्यासाठी येथे पायऱ्या आहेत.

1. [Foundry](https://getfoundry.sh/introduction/installation) इंस्टॉल करा

2. [`anvil`](https://getfoundry.sh/anvil/overview) सुरू करा

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry साठी डीफॉल्ट URL, http://localhost:8545 वर ऐकत आहे, त्यामुळे आपल्याला ब्लॉकचेन हाताळण्यासाठी वापरल्या जाणाऱ्या [`cast` कमांड](https://getfoundry.sh/cast/overview)साठी URL निर्दिष्ट करण्याची आवश्यकता नाही.

3. `anvil` मध्ये चालवताना, दहा चाचणी खाती आहेत ज्यात ETH आहे—पहिल्यासाठी पर्यावरण व्हेरिएबल्स सेट करा

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. हे कॉन्ट्रॅक्ट्स आहेत जे आपल्याला वापरायचे आहेत. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) हा Uniswap v3 कॉन्ट्रॅक्ट आहे जो आपण प्रत्यक्षात ट्रेड करण्यासाठी वापरतो. आपण थेट पूलमार्फत ट्रेड करू शकलो असतो, पण हे खूप सोपे आहे.

   दोन तळाचे व्हेरिएबल्स हे WETH आणि USDC दरम्यान स्वॅप करण्यासाठी आवश्यक असलेले Uniswap v3 पाथ आहेत.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. प्रत्येक चाचणी खात्यात 10,000 ETH आहेत. ट्रेडिंगसाठी 1000 WETH मिळवण्यासाठी WETH कॉन्ट्रॅक्ट वापरून 1000 ETH रॅप करा.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC साठी 500 WETH ट्रेड करण्यासाठी `SwapRouter` वापरा.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` कॉल एक भत्ता तयार करतो जो `SwapRouter` ला आमचे काही टोकन खर्च करण्याची परवानगी देतो. कॉन्ट्रॅक्ट्स इव्हेंटचे निरीक्षण करू शकत नाहीत, म्हणून जर आपण टोकन थेट `SwapRouter` कॉन्ट्रॅक्टमध्ये हस्तांतरित केले, तर त्याला पैसे दिले गेले आहेत हे कळणार नाही. त्याऐवजी, आम्ही `SwapRouter` कॉन्ट्रॅक्टला एक विशिष्ट रक्कम खर्च करण्याची परवानगी देतो, आणि मग `SwapRouter` ते करतो. हे `SwapRouter` द्वारे कॉल केलेल्या फंक्शनद्वारे केले जाते, त्यामुळे ते यशस्वी झाले की नाही हे त्याला कळते.

7. तुमच्याकडे दोन्ही टोकन पुरेशी आहेत याची पडताळणी करा.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

आता आमच्याकडे WETH आणि USDC आहेत, आम्ही प्रत्यक्षात एजंट चालवू शकतो.

```sh
git checkout 05-trade
uv run agent.py
```

आउटपुट यासारखे दिसेल:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
सध्याची किंमत: 1843.16
2026-02-06T23:07 मध्ये, अपेक्षित किंमत: 1724.41 USD
ट्रेडपूर्वी खात्यातील शिल्लक:
USDC शिल्लक: 927301.578272
WETH शिल्लक: 500
विक्री करा, मला किंमत 118.75 USD ने कमी होण्याची अपेक्षा आहे
ॲप्रूव्ह व्यवहार पाठवला: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
ॲप्रूव्ह व्यवहार माइन झाला.
विक्री व्यवहार पाठवला: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
विक्री व्यवहार माइन झाला.
ट्रेडनंतर खात्यातील शिल्लक:
USDC शिल्लक: 929143.797116
WETH शिल्लक: 499
```

प्रत्यक्षात ते वापरण्यासाठी, तुम्हाला काही किरकोळ बदल करणे आवश्यक आहे.

- ओळ 14 मध्ये, `MAINNET_URL` वास्तविक ऍक्सेस पॉईंटमध्ये बदला, जसे की `https://eth.drpc.org`
- ओळ 28 मध्ये, `PRIVATE_KEY` तुमच्या स्वतःच्या प्रायव्हेट कीमध्ये बदला
- जोपर्यंत तुम्ही खूप श्रीमंत नसाल आणि एका अप्रमाणित एजंटसाठी दररोज 1 ETH खरेदी किंवा विक्री करू शकत नसाल, तोपर्यंत तुम्ही `WETH_TRADE_AMOUNT` कमी करण्यासाठी 29 बदलू शकता.

#### कोड स्पष्टीकरण {#trading-code}

येथे नवीन कोड आहे.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

तेच व्हेरिएबल्स जे आपण पायरी 4 मध्ये वापरले.

```python
WETH_TRADE_AMOUNT=1
```

ट्रेड करण्याची रक्कम.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

प्रत्यक्षात ट्रेड करण्यासाठी, आम्हाला `approve` फंक्शनची आवश्यकता आहे. आम्हाला शिल्लक आधी आणि नंतर दाखवायची आहे, त्यामुळे आम्हाला `balanceOf` ची देखील आवश्यकता आहे.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI मध्ये आपल्याला फक्त `exactInput` ची गरज आहे. `exactOutput` नावाचे एक संबंधित फंक्शन आहे, जे आपण नक्की एक WETH खरेदी करण्यासाठी वापरू शकतो, परंतु सोपेपणासाठी आपण दोन्ही बाबतीत `exactInput` वापरतो.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) आणि `SwapRouter` कॉन्ट्रॅक्टसाठी Web3 व्याख्या.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

व्यवहाराचे पॅरामीटर्स. आम्हाला येथे एका फंक्शनची आवश्यकता आहे कारण [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) प्रत्येक वेळी बदलला पाहिजे.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` साठी टोकन भत्ता मंजूर करा.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3 मध्ये व्यवहार पाठवण्याची ही पद्धत आहे. प्रथम आपण व्यवहार तयार करण्यासाठी [`Contract` ऑब्जेक्ट](https://web3py.readthedocs.io/en/stable/web3.contract.html) वापरतो. नंतर आपण `PRIVATE_KEY` वापरून व्यवहार साइन करण्यासाठी [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) वापरतो. शेवटी, आपण व्यवहार पाठवण्यासाठी [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) वापरतो.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) व्यवहार माइन होईपर्यंत थांबते. गरज भासल्यास ते पावती परत करते.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH विकताना हे पॅरामीटर्स आहेत.

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

`SELL_PARAMS` च्या विपरीत, खरेदी पॅरामीटर्स बदलू शकतात. इनपुट रक्कम 1 WETH ची किंमत आहे, जी `quote` मध्ये उपलब्ध आहे.

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

`buy()` आणि `sell()` फंक्शन्स जवळजवळ सारखीच आहेत. प्रथम आम्ही `SwapRouter` साठी पुरेसा भत्ता मंजूर करतो, आणि नंतर आम्ही त्याला योग्य पथ आणि रकमेसह कॉल करतो.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

दोन्ही चलनांमधील वापरकर्ता शिल्लक कळवा.

```python
print("ट्रेडपूर्वी खात्यातील शिल्लक:")
balances()

if (expected_price > current_price):
    print(f"खरेदी करा, मला किंमत {expected_price - current_price} USD ने वाढण्याची अपेक्षा आहे")
    buy(wethusdc_quotes[-1])
else:
    print(f"विक्री करा, मला किंमत {current_price - expected_price} USD ने कमी होण्याची अपेक्षा आहे")
    sell()

print("ट्रेडनंतर खात्यातील शिल्लक:")
balances()
```

हा एजंट सध्या फक्त एकदाच काम करतो. तथापि, तुम्ही ते [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) वरून चालवून किंवा ओळी 368-400 लूपमध्ये गुंडाळून आणि पुढील सायकलची वेळ होईपर्यंत थांबण्यासाठी [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) वापरून ते सतत काम करण्यासाठी बदलू शकता.

## संभाव्य सुधारणा {#improvements}

ही पूर्ण उत्पादन आवृत्ती नाही; हे फक्त मूलभूत गोष्टी शिकवण्यासाठी एक उदाहरण आहे. सुधारणेसाठी येथे काही कल्पना आहेत.

### स्मार्ट ट्रेडिंग {#smart-trading}

दोन महत्त्वाची तथ्ये आहेत ज्याकडे एजंट काय करायचे हे ठरवताना दुर्लक्ष करतो.

- _अपेक्षित बदलाचे प्रमाण_. किंमत कमी होण्याची अपेक्षा असल्यास एजंट `WETH` ची निश्चित रक्कम विकतो, घसरणीच्या प्रमाणाचा विचार न करता.
  असे म्हणता येईल की किरकोळ बदलांकडे दुर्लक्ष करणे आणि किंमत किती कमी होण्याची अपेक्षा आहे यावर आधारित विक्री करणे चांगले होईल.
- _सध्याचा पोर्टफोलिओ_. जर तुमच्या पोर्टफोलिओचा 10% भाग WETH मध्ये असेल आणि तुम्हाला वाटत असेल की किंमत वाढेल, तर अधिक खरेदी करणे कदाचित योग्य आहे. परंतु जर तुमच्या पोर्टफोलिओचा 90% भाग WETH मध्ये असेल, तर तुम्ही पुरेसे एक्सपोज्ड असाल आणि अधिक खरेदी करण्याची गरज नाही. जर तुम्हाला किंमत कमी होण्याची अपेक्षा असेल तर उलट सत्य आहे.

### जर तुम्हाला तुमची ट्रेडिंग स्ट्रॅटेजी गुप्त ठेवायची असेल तर काय? {#secret}

AI विक्रेते तुम्ही त्यांच्या LLMs ला पाठवलेल्या क्वेरीज पाहू शकतात, ज्यामुळे तुम्ही तुमच्या एजंटसह विकसित केलेली उत्तम ट्रेडिंग प्रणाली उघड होऊ शकते. एक ट्रेडिंग प्रणाली जी खूप लोक वापरतात ती निरुपयोगी आहे कारण खूप लोक खरेदी करण्याचा प्रयत्न करतात जेव्हा तुम्हाला खरेदी करायची असते (आणि किंमत वाढते) आणि विक्री करण्याचा प्रयत्न करतात जेव्हा तुम्हाला विक्री करायची असते (आणि किंमत कमी होते).

ही समस्या टाळण्यासाठी तुम्ही स्थानिक पातळीवर LLM चालवू शकता, उदाहरणार्थ, [LM-Studio](https://lmstudio.ai/) वापरून.

### AI बॉटपासून AI एजंटपर्यंत {#bot-to-agent}

तुम्ही असा चांगला युक्तिवाद करू शकता की हा [एक AI बॉट आहे, AI एजंट नाही](/ai-agents/#ai-agents-vs-ai-bots). हे एक तुलनेने सोपे धोरण लागू करते जे पूर्वनिर्धारित माहितीवर अवलंबून असते. आम्ही स्वयं-सुधारणा सक्षम करू शकतो, उदाहरणार्थ, Uniswap v3 पूल्सची सूची आणि त्यांची नवीनतम मूल्ये देऊन आणि विचारून की कोणत्या संयोजनाचे सर्वोत्तम भविष्यसूचक मूल्य आहे.

### स्लिपेज संरक्षण {#slippage-protection}

सध्या कोणतेही [स्लिपेज संरक्षण](https://uniswapv3book.com/milestone_3/slippage-protection.html) नाही. जर सध्याचा कोट $2000 असेल, आणि अपेक्षित किंमत $2100 असेल, तर एजंट खरेदी करेल. तथापि, एजंट खरेदी करण्यापूर्वी किंमत $2200 पर्यंत वाढल्यास, आता खरेदी करण्यात काही अर्थ नाही.

स्लिपेज संरक्षण लागू करण्यासाठी, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) च्या ओळी 325 आणि 334 मध्ये `amountOutMinimum` मूल्य निर्दिष्ट करा.

## निष्कर्ष {#conclusion}

आशा आहे की, आता तुम्हाला AI एजंट्ससह सुरुवात करण्यासाठी पुरेसे माहित आहे. हे विषयाचे सर्वसमावेशक विहंगावलोकन नाही; त्यासाठी संपूर्ण पुस्तके आहेत, परंतु हे तुम्हाला सुरुवात करण्यासाठी पुरेसे आहे. शुभेच्छा!

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).
