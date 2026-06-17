---
title: इथेरियमवर तुमचा स्वतःचा एआय ट्रेडिंग एजंट बनवा
description: या ट्युटोरियलमध्ये तुम्ही एक सोपा एआय ट्रेडिंग एजंट कसा बनवायचा हे शिकाल. हा एजंट ब्लॉकचेनवरून माहिती वाचतो, त्या माहितीच्या आधारे LLM कडून शिफारस मागतो, LLM ने सुचवलेला व्यापार करतो आणि नंतर थांबून पुन्हा तीच प्रक्रिया करतो.
author: ओरी पोमेरँट्झ
tags: ["AI", "ट्रेडिंग", "एजंट", "python"]
skill: intermediate
breadcrumb: एआय ट्रेडिंग एजंट
published: 2026-02-13
lang: mr
sidebarDepth: 3
---

या ट्युटोरियलमध्ये तुम्ही एक सोपा एआय ट्रेडिंग एजंट कसा बनवायचा हे शिकाल. हा एजंट खालील टप्प्यांचा वापर करून काम करतो:

1. टोकनच्या सध्याच्या आणि मागील किमती, तसेच इतर संभाव्य संबंधित माहिती वाचा
2. ही माहिती कशी संबंधित असू शकते हे स्पष्ट करण्यासाठी पार्श्वभूमी माहितीसह, या माहितीचा वापर करून एक क्वेरी तयार करा
3. क्वेरी सबमिट करा आणि अंदाजित किंमत परत मिळवा
4. शिफारसीवर आधारित व्यापार करा
5. थांबा आणि पुन्हा करा

हा एजंट माहिती कशी वाचायची, तिचे एका क्वेरीमध्ये कसे भाषांतर करायचे ज्यामुळे उपयुक्त उत्तर मिळेल आणि त्या उत्तराचा वापर कसा करायचा हे दाखवतो. एआय एजंटसाठी या सर्व आवश्यक पायऱ्या आहेत. हा एजंट Python मध्ये लागू केला आहे कारण AI मध्ये वापरली जाणारी ही सर्वात सामान्य भाषा आहे.

## हे का करावे? {#why-do-this}

स्वयंचलित ट्रेडिंग एजंट्स डेव्हलपर्सना ट्रेडिंग रणनीती निवडण्याची आणि अंमलात आणण्याची परवानगी देतात. [एआय एजंट्स](/ai-agents) अधिक गुंतागुंतीच्या आणि गतिमान ट्रेडिंग रणनीतींना अनुमती देतात, ज्यामध्ये डेव्हलपरने वापरण्याचा विचारही केला नसेल अशी माहिती आणि अल्गोरिदम वापरण्याची शक्यता असते.

## साधने {#tools}

हे ट्युटोरियल कोट्स आणि ट्रेडिंगसाठी [Python](https://www.python.org/), [Web3 लायब्ररी](https://web3py.readthedocs.io/en/stable/) आणि [युनिस्वॅप v3](https://github.com/Uniswap/v3-periphery) वापरते.

### Python का? {#python}

AI साठी सर्वात जास्त वापरली जाणारी भाषा [Python](https://www.python.org/) आहे, म्हणून आपण ती येथे वापरत आहोत. तुम्हाला Python येत नसेल तरी काळजी करू नका. ही भाषा अतिशय स्पष्ट आहे आणि ती नेमके काय करते हे मी स्पष्ट करेन.

[Web3 लायब्ररी](https://web3py.readthedocs.io/en/stable/) हे सर्वात सामान्य Python इथेरियम API आहे. ते वापरण्यास अगदी सोपे आहे.

### ब्लॉकचेनवर ट्रेडिंग {#trading-on-blockchain}

असे [अनेक डिस्ट्रिब्युटेड एक्सचेंजेस (DEX)](/apps/categories/defi/) आहेत जे तुम्हाला इथेरियमवर टोकनचा व्यापार करू देतात. तथापि, [आर्बिट्रेज](/developers/docs/smart-contracts/composability/#better-user-experience) मुळे त्यांचे विनिमय दर साधारणपणे समान असतात.

[युनिस्वॅप](https://app.uniswap.org/) हे मोठ्या प्रमाणावर वापरले जाणारे DEX आहे जे आपण कोट्स (टोकनचे सापेक्ष मूल्य पाहण्यासाठी) आणि व्यापार या दोन्हीसाठी वापरू शकतो.

### OpenAI {#openai}

लार्ज लँग्वेज मॉडेलसाठी, मी [OpenAI](https://openai.com/) सह सुरुवात करण्याचे निवडले. या ट्युटोरियलमधील ॲप्लिकेशन चालवण्यासाठी तुम्हाला API ॲक्सेससाठी पैसे द्यावे लागतील. $5 चे किमान पेमेंट पुरेसे आहे.

## डेव्हलपमेंट, टप्प्याटप्प्याने {#step-by-step}

डेव्हलपमेंट सोपी करण्यासाठी, आपण टप्प्याटप्प्याने पुढे जाऊ. प्रत्येक टप्पा GitHub मधील एक शाखा (branch) आहे.

### सुरुवात करणे {#getting-started}

UNIX किंवा Linux (ज्यामध्ये [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) समाविष्ट आहे) अंतर्गत सुरुवात करण्यासाठी काही पायऱ्या आहेत

1. जर तुमच्याकडे आधीपासून नसेल, तर [Python](https://www.python.org/downloads/) डाउनलोड आणि इन्स्टॉल करा.

2. GitHub रिपॉझिटरी क्लोन करा.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) इन्स्टॉल करा. तुमच्या सिस्टीमवरील कमांड वेगळी असू शकते.

   ```sh
   pipx install uv
   ```

4. लायब्ररी डाउनलोड करा.

   ```sh
   uv sync
   ```

5. व्हर्च्युअल एन्व्हायर्नमेंट ॲक्टिव्हेट करा.

   ```sh
   source .venv/bin/activate
   ```

6. Python आणि Web3 योग्यरित्या काम करत आहेत हे तपासण्यासाठी, `python3` रन करा आणि त्याला हा प्रोग्राम द्या. तुम्ही तो `>>>` प्रॉम्प्टवर एंटर करू शकता; फाईल तयार करण्याची गरज नाही.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### ब्लॉकचेनवरून वाचणे {#read-blockchain}

पुढची पायरी म्हणजे ब्लॉकचेनवरून वाचणे. ते करण्यासाठी, तुम्हाला `02-read-quote` शाखेत बदल करणे आवश्यक आहे आणि नंतर प्रोग्राम चालवण्यासाठी `uv` वापरणे आवश्यक आहे.

```sh
git checkout 02-read-quote
uv run agent.py
```

तुम्हाला `Quote` ऑब्जेक्ट्सची यादी मिळायला हवी, ज्यामध्ये प्रत्येकासोबत टाइमस्टॅम्प, किंमत आणि ॲसेट (सध्या नेहमी `WETH/USDC`) असेल.

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

आपल्याला आवश्यक असलेल्या लायब्ररी इम्पोर्ट करा. त्यांचा वापर केल्यावर खाली स्पष्टीकरण दिले आहे.

```python
print = functools.partial(print, flush=True)
```

Python च्या `print` ला अशा आवृत्तीने बदलते जी नेहमी आउटपुट त्वरित फ्लश करते. हे दीर्घकाळ चालणाऱ्या स्क्रिप्टमध्ये उपयुक्त आहे कारण आपल्याला स्टेटस अपडेट्स किंवा डीबगिंग आउटपुटसाठी वाट पाहायची नसते.

```python
MAINNET_URL = "https://eth.drpc.org"
```

मुख्यनेटवर जाण्यासाठी एक URL. तुम्ही [नोड ॲज अ सर्व्हिस](/developers/docs/nodes-and-clients/nodes-as-a-service/) कडून एक मिळवू शकता किंवा [चेनलिस्ट](https://chainlist.org/chain/1) मध्ये जाहिरात केलेल्यांपैकी एक वापरू शकता.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

इथरियम मेननेट ब्लॉक साधारणपणे दर बारा सेकंदांनी तयार होतो, त्यामुळे एका विशिष्ट कालावधीत तयार होणाऱ्या ब्लॉक्सची ही अपेक्षित संख्या आहे. लक्षात घ्या की हा अचूक आकडा नाही. जेव्हा [ब्लॉक प्रस्तावक](/developers/docs/consensus-mechanisms/pos/block-proposal/) डाउन असतो, तेव्हा तो ब्लॉक वगळला जातो आणि पुढील ब्लॉकसाठी 24 सेकंद लागतात. जर आपल्याला टाइमस्टॅम्पसाठी अचूक ब्लॉक मिळवायचा असेल, तर आपण [बायनरी सर्च](https://en.wikipedia.org/wiki/Binary_search) वापरू. तथापि, आपल्या उद्देशांसाठी हे पुरेसे जवळचे आहे. भविष्याचा अंदाज लावणे हे अचूक विज्ञान नाही.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

सायकलचा आकार. आपण प्रति सायकल एकदा कोट्सचे पुनरावलोकन करतो आणि पुढील सायकलच्या शेवटी मूल्याचा अंदाज लावण्याचा प्रयत्न करतो.

```python
# आपण वाचत असलेल्या पूलचा पत्ता
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

कोट मूल्ये [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) पत्त्यावरील युनिस्वॅप 3 USDC/WETH पूलवरून घेतली आहेत. हा पत्ता आधीपासूनच चेकसम स्वरूपात आहे, परंतु कोड पुन्हा वापरण्यायोग्य बनवण्यासाठी [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) वापरणे चांगले.

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

आपल्याला संपर्क साधायच्या असलेल्या दोन कॉन्ट्रॅक्ट्ससाठी हे [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) आहेत. कोड संक्षिप्त ठेवण्यासाठी, आपण फक्त आपल्याला कॉल करायच्या असलेल्या फंक्शन्सचा समावेश करतो.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) लायब्ररी सुरू करा आणि इथेरियम नोडशी कनेक्ट करा.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Python मध्ये डेटा क्लास तयार करण्याचा हा एक मार्ग आहे. कॉन्ट्रॅक्टशी कनेक्ट करण्यासाठी [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) डेटा प्रकार वापरला जातो. `(frozen=True)` लक्षात घ्या. Python मध्ये [बुलियन्स](https://en.wikipedia.org/wiki/Boolean_data_type) `True` किंवा `False` म्हणून परिभाषित केले जातात, जे कॅपिटलाइज्ड असतात. हा डेटा क्लास `frozen` आहे, याचा अर्थ फील्ड्स सुधारित केले जाऊ शकत नाहीत.

इंडेंटेशन लक्षात घ्या. [C-व्युत्पन्न भाषांच्या](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) तुलनेत, Python ब्लॉक्स दर्शवण्यासाठी इंडेंटेशन वापरते. Python इंटरप्रिटरला माहित असते की खालील व्याख्या या डेटा क्लासचा भाग नाही कारण ती डेटा क्लास फील्ड्सच्या समान इंडेंटेशनवर सुरू होत नाही.

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

दशांश अपूर्णांक अचूकपणे हाताळण्यासाठी [`Decimal`](https://docs.python.org/3/library/decimal.html) प्रकार वापरला जातो.

```python
    def get_price(self, block: int) -> Decimal:
```

Python मध्ये फंक्शन परिभाषित करण्याचा हा मार्ग आहे. ती अजूनही `PoolInfo` चा भाग आहे हे दर्शवण्यासाठी व्याख्या इंडेंट केली आहे.

डेटा क्लासचा भाग असलेल्या फंक्शनमध्ये पहिला पॅरामीटर नेहमी `self` असतो, जो येथे कॉल केलेला डेटा क्लास इन्स्टन्स आहे. येथे आणखी एक पॅरामीटर आहे, ब्लॉक नंबर.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

जर आपण भविष्य वाचू शकलो असतो, तर आपल्याला ट्रेडिंगसाठी AI ची गरज भासली नसती.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 वरून EVM वरील फंक्शनला कॉल करण्यासाठी सिंटॅक्स असा आहे: `<contract object>.functions.<function name>().call(<parameters>)`. पॅरामीटर्स EVM फंक्शनचे पॅरामीटर्स असू शकतात (असल्यास; येथे नाहीत) किंवा ब्लॉकचेन वर्तन सुधारण्यासाठी [नेम्ड पॅरामीटर्स](https://en.wikipedia.org/wiki/Named_parameter) असू शकतात. येथे आपण ज्यामध्ये रन करायचे आहे तो [ब्लॉक नंबर](/developers/docs/apis/json-rpc/#default-block) निर्दिष्ट करण्यासाठी `block_identifier` वापरतो.

याचा परिणाम [हे स्ट्रक्ट, ॲरे स्वरूपात](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72) आहे. पहिले मूल्य हे दोन टोकन्समधील विनिमय दराचे फंक्शन आहे.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

ऑनचेन गणने कमी करण्यासाठी, युनिस्वॅप v3 वास्तविक विनिमय घटक साठवत नाही तर त्याचे वर्गमूळ साठवते. कारण EVM फ्लोटिंग पॉइंट गणित किंवा अपूर्णांकांना समर्थन देत नाही, वास्तविक मूल्याऐवजी, प्रतिसाद <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math> असा असतो.

```python
         # (टोकन1 प्रति टोकन0)
        return 1/(raw_price * self.decimal_factor)
```

आपल्याला मिळणारी कच्ची किंमत म्हणजे प्रत्येक `token1` साठी आपल्याला मिळणाऱ्या `token0` ची संख्या. आपल्या पूलमध्ये `token0` हे USDC (यूएस डॉलरच्या समान मूल्य असलेले स्टेबलकॉइन) आहे आणि `token1` हे [WETH](https://opensea.io/learn/blockchain/what-is-weth) आहे. आपल्याला खरोखर हवे असलेले मूल्य प्रति WETH डॉलर्सची संख्या आहे, त्याचे व्यस्त नाही.

दशांश घटक हे दोन टोकन्ससाठी [दशांश घटकांमधील](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) गुणोत्तर आहे.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

हा डेटा क्लास एका कोटचे प्रतिनिधित्व करतो: दिलेल्या वेळेत विशिष्ट ॲसेटची किंमत. या टप्प्यावर, `asset` फील्ड अप्रासंगिक आहे कारण आपण एकच पूल वापरतो आणि त्यामुळे एकच ॲसेट आहे. तथापि, आपण नंतर अधिक ॲसेट्स जोडू.

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

हे फंक्शन एक पत्ता घेते आणि त्या पत्त्यावरील टोकन कॉन्ट्रॅक्टबद्दल माहिती परत करते. नवीन [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) तयार करण्यासाठी, आपण `w3.eth.contract` ला पत्ता आणि ABI प्रदान करतो.

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

हे फंक्शन आपल्याला [विशिष्ट पूल](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) बद्दल आवश्यक असलेली प्रत्येक गोष्ट परत करते. `f"<string>"` हा सिंटॅक्स एक [फॉर्मेटेड स्ट्रिंग](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) आहे.

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

`Quote` ऑब्जेक्ट मिळवा. `block_number` साठी डीफॉल्ट मूल्य `None` (कोणतेही मूल्य नाही) आहे.

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

जर ब्लॉक नंबर निर्दिष्ट केला नसेल, तर `w3.eth.block_number` वापरा, जो नवीनतम ब्लॉक नंबर आहे. हा [एका `if` स्टेटमेंटसाठी](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) सिंटॅक्स आहे.

असे वाटू शकते की डीफॉल्ट फक्त `w3.eth.block_number` वर सेट करणे चांगले झाले असते, परंतु ते चांगले काम करत नाही कारण तो फंक्शन परिभाषित केल्याच्या वेळचा ब्लॉक नंबर असेल. दीर्घकाळ चालणाऱ्या एजंटमध्ये, ही एक समस्या असेल.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

मानवांसाठी आणि लार्ज लँग्वेज मॉडेल्स (LLMs) साठी वाचनीय स्वरूपात फॉरमॅट करण्यासाठी [`datetime` लायब्ररी](https://docs.python.org/3/library/datetime.html) वापरा. मूल्य दोन दशांश स्थानांपर्यंत पूर्ण करण्यासाठी [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) वापरा.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python मध्ये तुम्ही `list[<type>]` वापरून एक [यादी](https://docs.python.org/3/library/stdtypes.html#typesseq-list) परिभाषित करता ज्यामध्ये फक्त विशिष्ट प्रकार असू शकतो.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python मध्ये [`for` लूप](https://docs.python.org/3/tutorial/controlflow.html#for-statements) साधारणपणे यादीवर पुनरावृत्ती करतो. कोट्स शोधण्यासाठी ब्लॉक नंबरची यादी [`range`](https://docs.python.org/3/library/stdtypes.html#range) मधून येते.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

प्रत्येक ब्लॉक नंबरसाठी, एक `Quote` ऑब्जेक्ट मिळवा आणि तो `quotes` यादीमध्ये जोडा. नंतर ती यादी परत करा.

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

पुढे, आपल्याला या कोट्सच्या यादीचे LLM साठी प्रॉम्प्टमध्ये रूपांतर करणे आणि अपेक्षित भविष्यातील मूल्य मिळवणे आवश्यक आहे.

```sh
git checkout 03-create-prompt
uv run agent.py
```

आउटपुट आता LLM साठी एक प्रॉम्प्ट असणार आहे, यासारखे:

```
हे कोट्स दिल्यास:
ॲसेट: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

ॲसेट: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


2026-02-02T17:56 या वेळेत WETH/USDC चे मूल्य काय असेल अशी तुमची अपेक्षा आहे?

तुमचे उत्तर इतर कोणत्याही मजकुराशिवाय, दोन दशांश स्थानांपर्यंत पूर्ण केलेला एकच क्रमांक म्हणून द्या.
```

लक्षात घ्या की येथे दोन ॲसेट्ससाठी कोट्स आहेत, `WETH/USDC` आणि `WBTC/WETH`. दुसऱ्या ॲसेटमधील कोट्स जोडल्याने अंदाजाची अचूकता सुधारू शकते.

#### प्रॉम्प्ट कसा दिसतो {#prompt-explanation}

या प्रॉम्प्टमध्ये तीन विभाग आहेत, जे LLM प्रॉम्प्ट्समध्ये अगदी सामान्य आहेत.

1. माहिती. LLMs कडे त्यांच्या प्रशिक्षणातून बरीच माहिती असते, परंतु त्यांच्याकडे सहसा नवीनतम माहिती नसते. याच कारणामुळे आपल्याला येथे नवीनतम कोट्स मिळवणे आवश्यक आहे. प्रॉम्प्टमध्ये माहिती जोडण्याला [रिट्रायव्हल ऑगमेंटेड जनरेशन (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) म्हणतात.

2. प्रत्यक्ष प्रश्न. हेच आपल्याला जाणून घ्यायचे आहे.

3. आउटपुट फॉरमॅटिंग सूचना. साधारणपणे, LLM आपल्याला एक अंदाज देईल आणि तो कसा काढला याचे स्पष्टीकरण देईल. हे मानवांसाठी चांगले आहे, परंतु संगणक प्रोग्रामला फक्त अंतिम उत्तराची आवश्यकता असते.

#### कोड स्पष्टीकरण {#prompt-code}

येथे नवीन कोड आहे.

```python
from datetime import datetime, timezone, timedelta
```

आपल्याला ज्या वेळेसाठी अंदाज हवा आहे ती वेळ LLM ला प्रदान करणे आवश्यक आहे. भविष्यात "n मिनिटे/तास/दिवस" वेळ मिळवण्यासाठी, आपण [`timedelta` क्लास](https://docs.python.org/3/library/datetime.html#datetime.timedelta) वापरतो.

```python
# आपण वाचत असलेल्या पूल्सचे पत्ते
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

आपल्याला वाचण्यासाठी दोन पूल्स आहेत.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (टोकन1 प्रति टोकन0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC पूलमध्ये, आपल्याला एक `token1` (WETH) खरेदी करण्यासाठी किती `token0` (USDC) लागतील हे जाणून घ्यायचे आहे. WETH/WBTC पूलमध्ये, आपल्याला एक `token0` (WBTC, जे रॅप्ड बिटकॉइन आहे) खरेदी करण्यासाठी किती `token1` (WETH) लागतील हे जाणून घ्यायचे आहे. पूलचे गुणोत्तर उलट करणे आवश्यक आहे की नाही याचा मागोवा घेणे आपल्याला आवश्यक आहे.

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

पूल उलट करणे आवश्यक आहे की नाही हे जाणून घेण्यासाठी, आपण ते `read_pool` ला इनपुट म्हणून मिळवतो. तसेच, ॲसेट चिन्ह योग्यरित्या सेट करणे आवश्यक आहे.

`<a> if <b> else <c>` हा सिंटॅक्स [टर्नरी कंडिशनल ऑपरेटरचा](https://en.wikipedia.org/wiki/Ternary_conditional_operator) Python समतुल्य आहे, जो C-व्युत्पन्न भाषेत `<b> ? <a> : <c>` असेल.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

हे फंक्शन एक स्ट्रिंग तयार करते जे `Quote` ऑब्जेक्ट्सच्या यादीला फॉरमॅट करते, असे गृहीत धरून की ते सर्व एकाच ॲसेटला लागू होतात.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python मध्ये [मल्टी-लाइन स्ट्रिंग लिटरल्स](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... `"""` असे लिहिले जातात.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

येथे, आपण `format_quotes` सह प्रत्येक कोट यादीसाठी एक स्ट्रिंग तयार करण्यासाठी [मॅप-रिड्यूस (MapReduce)](https://en.wikipedia.org/wiki/MapReduce) पॅटर्न वापरतो, नंतर प्रॉम्प्टमध्ये वापरण्यासाठी त्यांना एकाच स्ट्रिंगमध्ये रिड्यूस करतो.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

उर्वरित प्रॉम्प्ट अपेक्षेप्रमाणे आहे.

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

दोन्ही पूल्सचे पुनरावलोकन करा आणि दोन्हीकडून कोट्स मिळवा.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

आपल्याला ज्यासाठी अंदाज हवा आहे तो भविष्यातील वेळ बिंदू निश्चित करा आणि प्रॉम्प्ट तयार करा.

### LLM शी इंटरफेस करणे {#interface-llm}

पुढे, आपण प्रत्यक्ष LLM ला प्रॉम्प्ट देतो आणि अपेक्षित भविष्यातील मूल्य प्राप्त करतो. मी हा प्रोग्राम OpenAI वापरून लिहिला आहे, त्यामुळे जर तुम्हाला वेगळा प्रदाता वापरायचा असेल, तर तुम्हाला त्यात बदल करावे लागतील.

1. [OpenAI खाते](https://auth.openai.com/create-account) मिळवा
2. [खात्यात निधी जमा करा](https://platform.openai.com/settings/organization/billing/overview)—लिहिण्याच्या वेळी किमान रक्कम $5 आहे
3. [API की तयार करा](https://platform.openai.com/settings/organization/api-keys)
4. कमांड लाइनमध्ये, API की एक्सपोर्ट करा जेणेकरून तुमचा प्रोग्राम ती वापरू शकेल

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. चेकआउट करा आणि एजंट रन करा

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

येथे नवीन कोड आहे.

```python
from openai import OpenAI

open_ai = OpenAI()  # क्लायंट OPENAI_API_KEY एन्व्हायर्नमेंट व्हेरिएबल वाचतो
```

OpenAI API इम्पोर्ट करा आणि इन्स्टॅन्शिएट करा.

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

प्रतिसाद तयार करण्यासाठी OpenAI API (`open_ai.chat.completions.create`) ला कॉल करा.

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

किंमत आउटपुट करा आणि खरेदी किंवा विक्रीची शिफारस द्या.

#### अंदाजांची चाचणी करणे {#testing-the-predictions}

आता आपण अंदाज तयार करू शकत असल्याने, आपण उपयुक्त अंदाज तयार करतो की नाही याचे मूल्यांकन करण्यासाठी आपण ऐतिहासिक डेटा देखील वापरू शकतो.

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
29 अंदाजांवरील सरासरी अंदाज त्रुटी: 83.87103448275862068965517241 USD
प्रति शिफारस सरासरी बदल: 4.787931034482758620689655172 USD
बदलांचे प्रमाणित विचलन: 104.42 USD
फायदेशीर दिवस: 51.72%
तोट्याचे दिवस: 48.28%
```

टेस्टरचा बहुतांश भाग एजंटसारखाच आहे, परंतु येथे नवीन किंवा सुधारित केलेले भाग आहेत.

```python
CYCLES_FOR_TEST = 40 # बॅकटेस्टसाठी, आपण किती चक्रांवर चाचणी करतो

# अनेक कोट्स मिळवा
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

आपण `CYCLES_FOR_TEST` (येथे 40 म्हणून निर्दिष्ट केलेले) दिवस मागे पाहतो.

```python
# अंदाज तयार करा आणि खऱ्या इतिहासासोबत त्यांना तपासा

total_error = Decimal(0)
changes = []
```

आपल्याला दोन प्रकारच्या त्रुटींमध्ये स्वारस्य आहे. पहिली, `total_error`, ही फक्त प्रेडिक्टरने केलेल्या त्रुटींची बेरीज आहे.

दुसरी, `changes` समजून घेण्यासाठी, आपल्याला एजंटचा उद्देश लक्षात ठेवणे आवश्यक आहे. WETH/USDC गुणोत्तराचा (ETH किंमत) अंदाज लावणे हा त्याचा उद्देश नाही. विक्री आणि खरेदीच्या शिफारसी जारी करणे हा त्याचा उद्देश आहे. जर सध्या किंमत $2000 असेल आणि त्याने उद्या $2010 चा अंदाज लावला, तर वास्तविक परिणाम $2020 असल्यास आणि आपण अतिरिक्त पैसे कमवल्यास आपल्याला हरकत नाही. परंतु जर त्याने $2010 चा अंदाज लावला, आणि त्या शिफारसीवर आधारित ETH खरेदी केले, आणि किंमत $1990 पर्यंत घसरली, तर आपल्याला _नक्कीच_ हरकत असेल.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

आपण फक्त अशा प्रकरणांकडे पाहू शकतो जिथे संपूर्ण इतिहास (अंदाजासाठी वापरलेली मूल्ये आणि त्याची तुलना करण्यासाठी वास्तविक जगातील मूल्य) उपलब्ध आहे. याचा अर्थ सर्वात नवीन प्रकरण ते असले पाहिजे जे `CYCLES_BACK` पूर्वी सुरू झाले.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

एजंट वापरतो तितकेच नमुने मिळवण्यासाठी [स्लाइसेस](https://www.w3schools.com/python/ref_func_slice.asp) वापरा. येथून पुढील सेगमेंटपर्यंतचा कोड हा एजंटमध्ये असलेल्या गेट-अ-प्रेडिक्शन कोडसारखाच आहे.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

अंदाजित किंमत, वास्तविक किंमत आणि अंदाजाच्या वेळची किंमत मिळवा. शिफारस खरेदीची होती की विक्रीची हे ठरवण्यासाठी आपल्याला अंदाजाच्या वेळची किंमत आवश्यक आहे.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

त्रुटी शोधा आणि ती एकूणमध्ये जोडा.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` साठी, आपल्याला एक ETH खरेदी किंवा विक्री करण्याचा आर्थिक परिणाम हवा आहे. त्यामुळे प्रथम, आपल्याला शिफारस निश्चित करणे आवश्यक आहे, नंतर वास्तविक किंमत कशी बदलली आणि शिफारसीमुळे पैसे मिळाले (सकारात्मक बदल) की पैसे खर्च झाले (नकारात्मक बदल) याचे मूल्यांकन करणे आवश्यक आहे.

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

परिणामांचा अहवाल द्या.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

फायदेशीर दिवसांची संख्या आणि तोट्याच्या दिवसांची संख्या मोजण्यासाठी [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) वापरा. परिणाम एक फिल्टर ऑब्जेक्ट आहे, ज्याची लांबी मिळवण्यासाठी आपल्याला त्याचे यादीमध्ये रूपांतर करणे आवश्यक आहे.

### व्यवहार सबमिट करणे {#submit-txn}

आता आपल्याला प्रत्यक्षात व्यवहार सबमिट करणे आवश्यक आहे. तथापि, सिस्टीम सिद्ध होण्यापूर्वी, मला या टप्प्यावर खरे पैसे खर्च करायचे नाहीत. त्याऐवजी, आपण मुख्यनेटचा एक स्थानिक फोर्क तयार करू आणि त्या नेटवर्कवर "व्यापार" करू.

स्थानिक फोर्क तयार करण्यासाठी आणि ट्रेडिंग सक्षम करण्यासाठी येथे पायऱ्या आहेत.

1. [Foundry](https://getfoundry.sh/introduction/installation) इन्स्टॉल करा

2. [`anvil`](https://getfoundry.sh/anvil/overview) सुरू करा

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry च्या डीफॉल्ट URL, http://localhost:8545 वर ऐकत आहे, त्यामुळे ब्लॉकचेन हाताळण्यासाठी आपण वापरत असलेल्या [`cast` कमांडसाठी](https://getfoundry.sh/cast/overview) आपल्याला URL निर्दिष्ट करण्याची आवश्यकता नाही.

3. `anvil` मध्ये रन करताना, ETH असलेली दहा चाचणी खाती असतात—पहिल्या खात्यासाठी एन्व्हायर्नमेंट व्हेरिएबल्स सेट करा

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. हे कॉन्ट्रॅक्ट्स आपल्याला वापरणे आवश्यक आहे. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) हे युनिस्वॅप v3 कॉन्ट्रॅक्ट आहे जे आपण प्रत्यक्षात व्यापार करण्यासाठी वापरतो. आपण थेट पूलद्वारे व्यापार करू शकतो, परंतु हे खूप सोपे आहे.

   तळाचे दोन व्हेरिएबल्स हे WETH आणि USDC मध्ये अदलाबदल करण्यासाठी आवश्यक असलेले युनिस्वॅप v3 पाथ्स आहेत.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. प्रत्येक चाचणी खात्यात 10,000 ETH आहेत. ट्रेडिंगसाठी 1000 WETH मिळवण्यासाठी 1000 ETH रॅप करण्यासाठी WETH कॉन्ट्रॅक्ट वापरा.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC साठी 500 WETH चा व्यापार करण्यासाठी `SwapRouter` वापरा.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` कॉल एक मंजुरी तयार करतो जी `SwapRouter` ला आपले काही टोकन्स खर्च करण्याची परवानगी देते. कॉन्ट्रॅक्ट्स घटनांवर लक्ष ठेवू शकत नाहीत, त्यामुळे जर आपण थेट `SwapRouter` कॉन्ट्रॅक्टमध्ये टोकन्स हस्तांतरित केले, तर त्याला पैसे दिले गेले आहेत हे कळणार नाही. त्याऐवजी, आपण `SwapRouter` कॉन्ट्रॅक्टला ठराविक रक्कम खर्च करण्याची परवानगी देतो आणि नंतर `SwapRouter` ते करते. हे `SwapRouter` द्वारे कॉल केलेल्या फंक्शनद्वारे केले जाते, त्यामुळे ते यशस्वी झाले की नाही हे त्याला समजते.

7. तुमच्याकडे दोन्ही टोकन्स पुरेशा प्रमाणात आहेत याची खात्री करा.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

आता आपल्याकडे WETH आणि USDC असल्याने, आपण प्रत्यक्षात एजंट रन करू शकतो.

```sh
git checkout 05-trade
uv run agent.py
```

आउटपुट यासारखे दिसेल:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
सध्याची किंमत: 1843.16
2026-02-06T23:07 मध्ये, अपेक्षित किंमत: 1724.41 USD
व्यापारापूर्वी खात्यातील शिल्लक:
USDC शिल्लक: 927301.578272
WETH शिल्लक: 500
विक्री करा, मला किंमत 118.75 USD ने खाली जाण्याची अपेक्षा आहे
मंजूर करा व्यवहार पाठवला: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
मंजूर करा व्यवहार माइन झाला.
विक्री व्यवहार पाठवला: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
विक्री व्यवहार माइन झाला.
व्यापारानंतर खात्यातील शिल्लक:
USDC शिल्लक: 929143.797116
WETH शिल्लक: 499
```

प्रत्यक्षात ते वापरण्यासाठी, तुम्हाला काही किरकोळ बदल करावे लागतील.

- ओळ 14 मध्ये, `MAINNET_URL` ला वास्तविक ॲक्सेस पॉइंटमध्ये बदला, जसे की `https://eth.drpc.org`
- ओळ 28 मध्ये, `PRIVATE_KEY` ला तुमच्या स्वतःच्या खाजगी की मध्ये बदला
- जोपर्यंत तुम्ही खूप श्रीमंत नाही आणि सिद्ध न झालेल्या एजंटसाठी दररोज 1 ETH खरेदी किंवा विक्री करू शकत नाही, तोपर्यंत तुम्हाला `WETH_TRADE_AMOUNT` कमी करण्यासाठी 29 बदलण्याची इच्छा असू शकते

#### कोड स्पष्टीकरण {#trading-code}

येथे नवीन कोड आहे.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

आपण पायरी 4 मध्ये वापरलेले तेच व्हेरिएबल्स.

```python
WETH_TRADE_AMOUNT=1
```

व्यापार करायची रक्कम.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

प्रत्यक्षात व्यापार करण्यासाठी, आपल्याला `approve` फंक्शनची आवश्यकता आहे. आपल्याला आधीची आणि नंतरची शिल्लक देखील दाखवायची आहे, त्यामुळे आपल्याला `balanceOf` ची देखील आवश्यकता आहे.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI मध्ये आपल्याला फक्त `exactInput` ची आवश्यकता आहे. एक संबंधित फंक्शन आहे, `exactOutput`, जे आपण नेमके एक WETH खरेदी करण्यासाठी वापरू शकतो, परंतु साधेपणासाठी आपण दोन्ही प्रकरणांमध्ये फक्त `exactInput` वापरतो.

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

व्यवहार पॅरामीटर्स. आपल्याला येथे एका फंक्शनची आवश्यकता आहे कारण [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) प्रत्येक वेळी बदलला पाहिजे.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` साठी टोकन मंजुरी मंजूर करा.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3 मध्ये आपण अशा प्रकारे व्यवहार पाठवतो. प्रथम आपण व्यवहार तयार करण्यासाठी [`Contract` ऑब्जेक्ट](https://web3py.readthedocs.io/en/stable/web3.contract.html) वापरतो. नंतर आपण `PRIVATE_KEY` वापरून, व्यवहारावर स्वाक्षरी करण्यासाठी [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) वापरतो. शेवटी, आपण व्यवहार पाठवण्यासाठी [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) वापरतो.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) व्यवहार माइन होईपर्यंत वाट पाहते. आवश्यक असल्यास ते पावती परत करते.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH विकताना हे पॅरामीटर्स असतात.

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

`SELL_PARAMS` च्या तुलनेत, खरेदी पॅरामीटर्स बदलू शकतात. इनपुट रक्कम ही 1 WETH ची किंमत आहे, जी `quote` मध्ये उपलब्ध आहे.

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

`buy()` आणि `sell()` फंक्शन्स जवळजवळ सारखीच आहेत. प्रथम आपण `SwapRouter` साठी पुरेशी मंजुरी मंजूर करतो आणि नंतर आपण योग्य पाथ आणि रकमेसह त्याला कॉल करतो.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

दोन्ही चलनांमधील वापरकर्त्याच्या शिल्लक रकमेचा अहवाल द्या.

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

हा एजंट सध्या फक्त एकदाच काम करतो. तथापि, तुम्ही त्याला [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) वरून रन करून किंवा ओळी 368-400 एका लूपमध्ये गुंडाळून आणि पुढील सायकलची वेळ येईपर्यंत वाट पाहण्यासाठी [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) वापरून सतत काम करण्यासाठी बदलू शकता.

## संभाव्य सुधारणा {#improvements}

ही संपूर्ण प्रॉडक्शन आवृत्ती नाही; मूलभूत गोष्टी शिकवण्यासाठी हे केवळ एक उदाहरण आहे. सुधारणांसाठी येथे काही कल्पना आहेत.

### अधिक स्मार्ट ट्रेडिंग {#smart-trading}

काय करायचे हे ठरवताना एजंट दोन महत्त्वाच्या तथ्यांकडे दुर्लक्ष करतो.

- _अपेक्षित बदलाचे प्रमाण_. घसरणीचे प्रमाण कितीही असले तरी, किंमत कमी होण्याची अपेक्षा असल्यास एजंट `WETH` ची निश्चित रक्कम विकतो.
  किरकोळ बदलांकडे दुर्लक्ष करणे आणि किंमत किती कमी होईल या अपेक्षेवर आधारित विक्री करणे अधिक चांगले होईल.
- _सध्याचा पोर्टफोलिओ_. जर तुमचा 10% पोर्टफोलिओ WETH मध्ये असेल आणि तुम्हाला वाटत असेल की किंमत वाढेल, तर कदाचित अधिक खरेदी करणे अर्थपूर्ण ठरेल. परंतु जर तुमचा 90% पोर्टफोलिओ WETH मध्ये असेल, तर तुमच्याकडे पुरेसे एक्सपोजर असू शकते आणि अधिक खरेदी करण्याची आवश्यकता नाही. जर तुम्हाला किंमत कमी होण्याची अपेक्षा असेल तर याच्या उलट सत्य आहे.

### जर तुम्हाला तुमची ट्रेडिंग रणनीती गुप्त ठेवायची असेल तर काय? {#secret}

AI विक्रेते तुम्ही त्यांच्या LLMs ला पाठवलेल्या क्वेरीज पाहू शकतात, ज्यामुळे तुम्ही तुमच्या एजंटसोबत विकसित केलेली उत्कृष्ट ट्रेडिंग सिस्टीम उघड होऊ शकते. खूप लोक वापरत असलेली ट्रेडिंग सिस्टीम निरुपयोगी असते कारण जेव्हा तुम्हाला खरेदी करायची असते तेव्हा खूप लोक खरेदी करण्याचा प्रयत्न करतात (आणि किंमत वाढते) आणि जेव्हा तुम्हाला विक्री करायची असते तेव्हा विक्री करण्याचा प्रयत्न करतात (आणि किंमत कमी होते).

ही समस्या टाळण्यासाठी तुम्ही स्थानिक पातळीवर LLM रन करू शकता, उदाहरणार्थ, [LM-Studio](https://lmstudio.ai/) वापरून.

### एआय बॉट कडून एआय एजंट कडे {#bot-to-agent}

तुम्ही असा चांगला युक्तिवाद करू शकता की हा [एक एआय बॉट आहे, एआय एजंट नाही](/ai-agents/#ai-agents-vs-ai-bots). तो पूर्व-परिभाषित माहितीवर अवलंबून असलेली तुलनेने सोपी रणनीती लागू करतो. आपण स्व-सुधारणा सक्षम करू शकतो, उदाहरणार्थ, युनिस्वॅप v3 पूल्सची यादी आणि त्यांची नवीनतम मूल्ये प्रदान करून आणि कोणत्या संयोजनाचे सर्वोत्तम भविष्यसूचक मूल्य आहे हे विचारून.

### स्लिपेज संरक्षण {#slippage-protection}

सध्या कोणतेही [स्लिपेज संरक्षण](https://uniswapv3book.com/milestone_3/slippage-protection.html) नाही. जर सध्याचा कोट $2000 असेल आणि अपेक्षित किंमत $2100 असेल, तर एजंट खरेदी करेल. तथापि, जर एजंटने खरेदी करण्यापूर्वी किंमत $2200 पर्यंत वाढली, तर खरेदी करण्यात काही अर्थ नाही.

स्लिपेज संरक्षण लागू करण्यासाठी, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) च्या ओळी 325 आणि 334 मध्ये `amountOutMinimum` मूल्य निर्दिष्ट करा.

## निष्कर्ष {#conclusion}

आशा आहे की, आता तुम्हाला एआय एजंट्ससह सुरुवात करण्यासाठी पुरेसे ज्ञान मिळाले असेल. हे या विषयाचे सर्वसमावेशक विहंगावलोकन नाही; त्यासाठी संपूर्ण पुस्तके समर्पित आहेत, परंतु तुम्हाला सुरुवात करण्यासाठी हे पुरेसे आहे. शुभेच्छा!

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).