---
title: "इथेरियम पर अपना खुद का एआई ट्रेडिंग एजेंट बनाएँ"
description: "इस ट्यूटोरियल में आप सीखेंगे कि एक सरल एआई ट्रेडिंग एजेंट कैसे बनाया जाता है। यह एजेंट ब्लॉकचेन से जानकारी पढ़ता है, उस जानकारी के आधार पर LLM से सुझाव मांगता है, LLM द्वारा सुझाए गए ट्रेड को निष्पादित करता है, और फिर प्रतीक्षा करता है और दोहराता है।"
author: "ओरी पोमेरेंट्ज़"
tags:
  - AI
  - ट्रेडिंग
  - एजेंट
  - Python
skill: intermediate
breadcrumb: "एआई ट्रेडिंग एजेंट"
published: 2026-02-13
lang: hi
sidebarDepth: 3
---

इस ट्यूटोरियल में आप सीखेंगे कि एक सरल एआई ट्रेडिंग एजेंट कैसे बनाया जाता है। यह एजेंट इन चरणों का उपयोग करके काम करता है:

1. किसी टोकन की वर्तमान और पिछली कीमतों के साथ-साथ अन्य संभावित प्रासंगिक जानकारी पढ़ें
2. इस जानकारी के साथ एक क्वेरी (query) बनाएँ, साथ ही यह समझाने के लिए पृष्ठभूमि की जानकारी दें कि यह कैसे प्रासंगिक हो सकती है
3. क्वेरी सबमिट करें और अनुमानित कीमत प्राप्त करें
4. सुझाव के आधार पर ट्रेड करें
5. प्रतीक्षा करें और दोहराएँ

यह एजेंट प्रदर्शित करता है कि जानकारी को कैसे पढ़ा जाए, इसे एक ऐसी क्वेरी में कैसे बदला जाए जो एक उपयोगी उत्तर दे, और उस उत्तर का उपयोग कैसे किया जाए। ये सभी एक एआई एजेंट के लिए आवश्यक चरण हैं। इस एजेंट को Python में लागू किया गया है क्योंकि यह AI में उपयोग की जाने वाली सबसे आम भाषा है।

## ऐसा क्यों करें? {#why-do-this}

स्वचालित ट्रेडिंग एजेंट डेवलपर्स को एक ट्रेडिंग रणनीति चुनने और निष्पादित करने की अनुमति देते हैं। [एआई एजेंट](/ai-agents) अधिक जटिल और गतिशील ट्रेडिंग रणनीतियों की अनुमति देते हैं, जो संभावित रूप से ऐसी जानकारी और एल्गोरिदम का उपयोग करते हैं जिनके उपयोग पर डेवलपर ने विचार भी नहीं किया होगा।

## उपकरण {#tools}

यह ट्यूटोरियल कोट्स (quotes) और ट्रेडिंग के लिए [Python](https://www.python.org/), [Web3 लाइब्रेरी](https://web3py.readthedocs.io/en/stable/), और [यूनिस्वैप v3 (Uniswap v3)](https://github.com/Uniswap/v3-periphery) का उपयोग करता है।

### Python क्यों? {#python}

AI के लिए सबसे व्यापक रूप से उपयोग की जाने वाली भाषा [Python](https://www.python.org/) है, इसलिए हम यहाँ इसका उपयोग करते हैं। यदि आप Python नहीं जानते हैं तो चिंता न करें। यह भाषा बहुत स्पष्ट है, और मैं ठीक से समझाऊंगा कि यह क्या करती है।

[Web3 लाइब्रेरी](https://web3py.readthedocs.io/en/stable/) सबसे आम Python इथेरियम API है। इसका उपयोग करना काफी आसान है।

### ब्लॉकचेन पर ट्रेडिंग {#trading-on-blockchain}

ऐसे [कई विकेंद्रीकृत एक्सचेंज (DEX)](/apps/categories/defi/) हैं जो आपको इथेरियम पर टोकन ट्रेड करने देते हैं। हालाँकि, [आर्बिट्रेज (arbitrage)](/developers/docs/smart-contracts/composability/#better-user-experience) के कारण उनकी विनिमय दरें समान होती हैं।

[यूनिस्वैप](https://app.uniswap.org/) एक व्यापक रूप से उपयोग किया जाने वाला DEX है जिसका उपयोग हम कोट्स (टोकन के सापेक्ष मूल्यों को देखने के लिए) और ट्रेड दोनों के लिए कर सकते हैं।

### OpenAI {#openai}

एक बड़े भाषा मॉडल (LLM) के लिए, मैंने [OpenAI](https://openai.com/) के साथ शुरुआत करना चुना। इस ट्यूटोरियल में एप्लिकेशन चलाने के लिए आपको API एक्सेस के लिए भुगतान करना होगा। $5 का न्यूनतम भुगतान पर्याप्त से अधिक है।

## विकास, चरण दर चरण {#step-by-step}

विकास को सरल बनाने के लिए, हम चरणों में आगे बढ़ते हैं। प्रत्येक चरण GitHub में एक ब्रांच है।

### शुरुआत करना {#getting-started}

UNIX या Linux ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install) सहित) के तहत शुरुआत करने के चरण यहाँ दिए गए हैं:

1. यदि आपके पास यह पहले से नहीं है, तो [Python](https://www.python.org/downloads/) डाउनलोड और इंस्टॉल करें।

2. GitHub रिपॉजिटरी को क्लोन करें।

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) इंस्टॉल करें। आपके सिस्टम पर कमांड अलग हो सकता है।

   ```sh
   pipx install uv
   ```

4. लाइब्रेरी डाउनलोड करें।

   ```sh
   uv sync
   ```

5. वर्चुअल एनवायरनमेंट को सक्रिय करें।

   ```sh
   source .venv/bin/activate
   ```

6. यह सत्यापित करने के लिए कि Python और Web3 सही ढंग से काम कर रहे हैं, `python3` चलाएँ और इसे यह प्रोग्राम प्रदान करें। आप इसे `>>>` प्रॉम्प्ट पर दर्ज कर सकते हैं; कोई फ़ाइल बनाने की आवश्यकता नहीं है।

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### ब्लॉकचेन से पढ़ना {#read-blockchain}

अगला कदम ब्लॉकचेन से पढ़ना है। ऐसा करने के लिए, आपको `02-read-quote` ब्रांच में बदलना होगा और फिर प्रोग्राम चलाने के लिए `uv` का उपयोग करना होगा।

```sh
git checkout 02-read-quote
uv run agent.py
```

आपको `Quote` ऑब्जेक्ट्स की एक सूची प्राप्त होनी चाहिए, जिनमें से प्रत्येक में एक टाइमस्टैम्प, एक कीमत और एसेट (वर्तमान में हमेशा `WETH/USDC`) हो।

यहाँ पंक्ति-दर-पंक्ति स्पष्टीकरण दिया गया है।

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

हमें जिन लाइब्रेरी की आवश्यकता है उन्हें आयात (import) करें। उपयोग किए जाने पर उन्हें नीचे समझाया गया है।

```python
print = functools.partial(print, flush=True)
```

Python के `print` को एक ऐसे संस्करण से बदलता है जो हमेशा आउटपुट को तुरंत फ्लश करता है। यह लंबे समय तक चलने वाली स्क्रिप्ट में उपयोगी है क्योंकि हम स्टेटस अपडेट या डिबगिंग आउटपुट के लिए प्रतीक्षा नहीं करना चाहते हैं।

```python
MAINNET_URL = "https://eth.drpc.org"
```

मेननेट तक पहुँचने के लिए एक URL। आप [नोड एज़ ए सर्विस (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) से एक प्राप्त कर सकते हैं या [Chainlist](https://chainlist.org/chain/1) में विज्ञापित किसी एक का उपयोग कर सकते हैं।

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

एक इथेरियम मेननेट ब्लॉक आमतौर पर हर बारह सेकंड में होता है, इसलिए ये उन ब्लॉकों की संख्या है जिनकी हम एक समयावधि में होने की उम्मीद करेंगे। ध्यान दें कि यह एक सटीक आंकड़ा नहीं है। जब [ब्लॉक प्रस्तावक](/developers/docs/consensus-mechanisms/pos/block-proposal/) डाउन होता है, तो वह ब्लॉक छोड़ दिया जाता है, और अगले ब्लॉक का समय 24 सेकंड होता है। यदि हम किसी टाइमस्टैम्प के लिए सटीक ब्लॉक प्राप्त करना चाहते हैं, तो हम [बाइनरी सर्च (binary search)](https://en.wikipedia.org/wiki/Binary_search) का उपयोग करेंगे। हालाँकि, यह हमारे उद्देश्यों के लिए काफी करीब है। भविष्य की भविष्यवाणी करना कोई सटीक विज्ञान नहीं है।

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

चक्र (cycle) का आकार। हम प्रति चक्र एक बार कोट्स की समीक्षा करते हैं और अगले चक्र के अंत में मूल्य का अनुमान लगाने का प्रयास करते हैं।

```python
# उस पूल का पता जिसे हम पढ़ रहे हैं
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

कोट मूल्य [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) पते पर यूनिस्वैप 3 USDC/WETH पूल से लिए गए हैं। यह पता पहले से ही चेकसम (checksum) रूप में है, लेकिन कोड को पुन: प्रयोज्य बनाने के लिए [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) का उपयोग करना बेहतर है।

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

ये उन दो अनुबंधों के लिए [ABIs](https://docs.soliditylang.org/en/latest/abi-spec.html) हैं जिनसे हमें संपर्क करने की आवश्यकता है। कोड को संक्षिप्त रखने के लिए, हम केवल उन्हीं फ़ंक्शंस को शामिल करते हैं जिन्हें हमें कॉल करने की आवश्यकता है।

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) लाइब्रेरी आरंभ करें और एक इथेरियम नोड से कनेक्ट करें।

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Python में डेटा क्लास बनाने का यह एक तरीका है। [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) डेटा प्रकार का उपयोग अनुबंध से जुड़ने के लिए किया जाता है। `(frozen=True)` पर ध्यान दें। Python में [बूलियन (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) को `True` या `False` के रूप में परिभाषित किया जाता है, जो बड़े अक्षरों (capitalized) में होते हैं। यह डेटा क्लास `frozen` है, जिसका अर्थ है कि फ़ील्ड्स को संशोधित नहीं किया जा सकता है।

इंडेंटेशन (indentation) पर ध्यान दें। [C-व्युत्पन्न भाषाओं](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) के विपरीत, Python ब्लॉक को दर्शाने के लिए इंडेंटेशन का उपयोग करता है। Python इंटरप्रेटर जानता है कि निम्नलिखित परिभाषा इस डेटा क्लास का हिस्सा नहीं है क्योंकि यह डेटा क्लास फ़ील्ड्स के समान इंडेंटेशन पर शुरू नहीं होती है।

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) प्रकार का उपयोग दशमलव अंशों को सटीक रूप से संभालने के लिए किया जाता है।

```python
    def get_price(self, block: int) -> Decimal:
```

Python में फ़ंक्शन को परिभाषित करने का यह तरीका है। परिभाषा को यह दिखाने के लिए इंडेंट किया गया है कि यह अभी भी `PoolInfo` का हिस्सा है।

एक फ़ंक्शन में जो डेटा क्लास का हिस्सा है, पहला पैरामीटर हमेशा `self` होता है, जो डेटा क्लास इंस्टेंस है जिसे यहाँ कॉल किया गया है। यहाँ एक और पैरामीटर है, ब्लॉक नंबर।

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

यदि हम भविष्य पढ़ सकते, तो हमें ट्रेडिंग के लिए AI की आवश्यकता नहीं होती।

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3 से EVM पर फ़ंक्शन कॉल करने का सिंटैक्स यह है: `<contract object>.functions.<function name>().call(<parameters>)`। पैरामीटर EVM फ़ंक्शन के पैरामीटर (यदि कोई हो; यहाँ कोई नहीं हैं) या ब्लॉकचेन व्यवहार को संशोधित करने के लिए [नामित पैरामीटर (named parameters)](https://en.wikipedia.org/wiki/Named_parameter) हो सकते हैं। यहाँ हम एक का उपयोग करते हैं, `block_identifier`, उस [ब्लॉक नंबर](/developers/docs/apis/json-rpc/#default-block) को निर्दिष्ट करने के लिए जिसमें हम चलाना चाहते हैं।

परिणाम [यह स्ट्रक्ट (struct) है, ऐरे (array) रूप में](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)। पहला मान दो टोकन के बीच विनिमय दर का एक फ़ंक्शन है।

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

ऑनचेन गणनाओं को कम करने के लिए, यूनिस्वैप v3 वास्तविक विनिमय कारक को संग्रहीत नहीं करता है बल्कि इसके वर्गमूल (square root) को संग्रहीत करता है। चूँकि EVM फ्लोटिंग पॉइंट गणित या अंशों का समर्थन नहीं करता है, वास्तविक मान के बजाय, प्रतिक्रिया <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math> है।

```python
         # (टोकन1 प्रति टोकन0)
        return 1/(raw_price * self.decimal_factor)
```

हमें जो कच्ची कीमत (raw price) मिलती है, वह `token0` की संख्या है जो हमें प्रत्येक `token1` के लिए मिलती है। हमारे पूल में `token0` USDC (अमेरिकी डॉलर के समान मूल्य वाला स्टेबलकॉइन) है और `token1` [WETH](https://opensea.io/learn/blockchain/what-is-weth) है। हम वास्तव में जो मूल्य चाहते हैं वह प्रति WETH डॉलर की संख्या है, न कि इसका उल्टा।

दशमलव कारक (decimal factor) दो टोकन के लिए [दशमलव कारकों](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) के बीच का अनुपात है।

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

यह डेटा क्लास एक कोट का प्रतिनिधित्व करता है: किसी दिए गए समय पर किसी विशिष्ट एसेट की कीमत। इस बिंदु पर, `asset` फ़ील्ड अप्रासंगिक है क्योंकि हम एक ही पूल का उपयोग करते हैं और इसलिए हमारे पास एक ही एसेट है। हालाँकि, हम बाद में और एसेट जोड़ेंगे।

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

यह फ़ंक्शन एक पता लेता है और उस पते पर टोकन अनुबंध के बारे में जानकारी देता है। एक नया [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) बनाने के लिए, हम `w3.eth.contract` को पता और ABI प्रदान करते हैं।

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

यह फ़ंक्शन [एक विशिष्ट पूल](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) के बारे में हमारी ज़रूरत की हर चीज़ देता है। सिंटैक्स `f"<string>"` एक [स्वरूपित स्ट्रिंग (formatted string)](https://docs.python.org/3/reference/lexical_analysis.html#f-strings) है।

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

एक `Quote` ऑब्जेक्ट प्राप्त करें। `block_number` के लिए डिफ़ॉल्ट मान `None` (कोई मान नहीं) है।

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

यदि कोई ब्लॉक नंबर निर्दिष्ट नहीं किया गया था, तो `w3.eth.block_number` का उपयोग करें, जो नवीनतम ब्लॉक नंबर है। यह [एक `if` स्टेटमेंट](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) के लिए सिंटैक्स है।

ऐसा लग सकता है कि डिफ़ॉल्ट को केवल `w3.eth.block_number` पर सेट करना बेहतर होता, लेकिन यह अच्छी तरह से काम नहीं करता है क्योंकि यह फ़ंक्शन परिभाषित होने के समय का ब्लॉक नंबर होगा। लंबे समय तक चलने वाले एजेंट में, यह एक समस्या होगी।

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

इसे मनुष्यों और बड़े भाषा मॉडल (LLMs) के लिए पठनीय प्रारूप में स्वरूपित करने के लिए [`datetime` लाइब्रेरी](https://docs.python.org/3/library/datetime.html) का उपयोग करें। मान को दो दशमलव स्थानों तक पूर्णांकित करने के लिए [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) का उपयोग करें।

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python में आप एक [सूची (list)](https://docs.python.org/3/library/stdtypes.html#typesseq-list) परिभाषित करते हैं जिसमें `list[<type>]` का उपयोग करके केवल एक विशिष्ट प्रकार हो सकता है।

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python में एक [`for` लूप](https://docs.python.org/3/tutorial/controlflow.html#for-statements) आमतौर पर एक सूची पर पुनरावृति (iterate) करता है। कोट्स खोजने के लिए ब्लॉक नंबरों की सूची [`range`](https://docs.python.org/3/library/stdtypes.html#range) से आती है।

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

प्रत्येक ब्लॉक नंबर के लिए, एक `Quote` ऑब्जेक्ट प्राप्त करें और इसे `quotes` सूची में जोड़ें। फिर उस सूची को वापस करें।

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

यह स्क्रिप्ट का मुख्य कोड है। पूल की जानकारी पढ़ें, बारह कोट्स प्राप्त करें, और उन्हें [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) करें।

### एक प्रॉम्प्ट बनाना {#prompt}

इसके बाद, हमें कोट्स की इस सूची को LLM के लिए एक प्रॉम्प्ट में बदलना होगा और एक अपेक्षित भविष्य का मूल्य प्राप्त करना होगा।

```sh
git checkout 03-create-prompt
uv run agent.py
```

आउटपुट अब LLM के लिए एक प्रॉम्प्ट होने जा रहा है, जो इसके समान है:

```
इन कोट्स को देखते हुए:
एसेट: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

एसेट: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


आप 2026-02-02T17:56 समय पर WETH/USDC का मूल्य क्या होने की उम्मीद करेंगे?

अपना उत्तर बिना किसी अन्य टेक्स्ट के, दो दशमलव स्थानों तक पूर्णांकित एक एकल संख्या के रूप में प्रदान करें।
```

ध्यान दें कि यहाँ दो एसेट्स, `WETH/USDC` और `WBTC/WETH` के लिए कोट्स हैं। किसी अन्य एसेट से कोट्स जोड़ने से भविष्यवाणी की सटीकता में सुधार हो सकता है।

#### एक प्रॉम्प्ट कैसा दिखता है {#prompt-explanation}

इस प्रॉम्प्ट में तीन खंड हैं, जो LLM प्रॉम्प्ट्स में काफी आम हैं।

1. जानकारी। LLMs के पास उनके प्रशिक्षण से बहुत सारी जानकारी होती है, लेकिन उनके पास आमतौर पर नवीनतम जानकारी नहीं होती है। यही कारण है कि हमें यहाँ नवीनतम कोट्स प्राप्त करने की आवश्यकता है। प्रॉम्प्ट में जानकारी जोड़ने को [रिट्रीवल ऑगमेंटेड जनरेशन (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) कहा जाता है।

2. वास्तविक प्रश्न। यह वह है जो हम जानना चाहते हैं।

3. आउटपुट स्वरूपण निर्देश। आम तौर पर, एक LLM हमें एक अनुमान देगा और साथ ही यह स्पष्टीकरण भी देगा कि वह इस तक कैसे पहुँचा। यह मनुष्यों के लिए बेहतर है, लेकिन एक कंप्यूटर प्रोग्राम को केवल अंतिम परिणाम (bottom line) की आवश्यकता होती है।

#### कोड स्पष्टीकरण {#prompt-code}

यहाँ नया कोड है।

```python
from datetime import datetime, timezone, timedelta
```

हमें LLM को वह समय प्रदान करना होगा जिसके लिए हम अनुमान चाहते हैं। भविष्य में "n मिनट/घंटे/दिन" का समय प्राप्त करने के लिए, हम [`timedelta` क्लास](https://docs.python.org/3/library/datetime.html#datetime.timedelta) का उपयोग करते हैं।

```python
# उन पूलों के पते जिन्हें हम पढ़ रहे हैं
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

हमारे पास दो पूल हैं जिन्हें हमें पढ़ना है।

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

WETH/USDC पूल में, हम जानना चाहते हैं कि एक `token1` (WETH) खरीदने के लिए हमें कितने `token0` (USDC) की आवश्यकता है। WETH/WBTC पूल में, हम जानना चाहते हैं कि एक `token0` (WBTC, जो रैप्ड बिटकॉइन है) खरीदने के लिए हमें कितने `token1` (WETH) की आवश्यकता है। हमें यह ट्रैक करने की आवश्यकता है कि क्या पूल के अनुपात को उलटने की आवश्यकता है।

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

यह जानने के लिए कि क्या किसी पूल को उलटने की आवश्यकता है, हम इसे `read_pool` के इनपुट के रूप में प्राप्त करते हैं। इसके अलावा, एसेट प्रतीक को सही ढंग से सेट करने की आवश्यकता है।

सिंटैक्स `<a> if <b> else <c>` [टर्नरी कंडीशनल ऑपरेटर (ternary conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) का Python समतुल्य है, जो C-व्युत्पन्न भाषा में `<b> ? <a> : <c>` होगा।

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

यह फ़ंक्शन एक स्ट्रिंग बनाता है जो `Quote` ऑब्जेक्ट्स की एक सूची को स्वरूपित करता है, यह मानते हुए कि वे सभी एक ही एसेट पर लागू होते हैं।

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python में [मल्टी-लाइन स्ट्रिंग लिटरल्स (multi-line string literals)](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) को `"""` .... `"""` के रूप में लिखा जाता है।

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

यहाँ, हम `format_quotes` के साथ प्रत्येक कोट सूची के लिए एक स्ट्रिंग उत्पन्न करने के लिए [MapReduce](https://en.wikipedia.org/wiki/MapReduce) पैटर्न का उपयोग करते हैं, फिर उन्हें प्रॉम्प्ट में उपयोग के लिए एक एकल स्ट्रिंग में कम (reduce) करते हैं।

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

बाकी प्रॉम्प्ट उम्मीद के मुताबिक है।

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

दोनों पूलों की समीक्षा करें और दोनों से कोट्स प्राप्त करें।

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

भविष्य के उस समय बिंदु का निर्धारण करें जिसके लिए हम अनुमान चाहते हैं, और प्रॉम्प्ट बनाएँ।

### LLM के साथ इंटरफेसिंग {#interface-llm}

इसके बाद, हम एक वास्तविक LLM को प्रॉम्प्ट करते हैं और एक अपेक्षित भविष्य का मूल्य प्राप्त करते हैं। मैंने यह प्रोग्राम OpenAI का उपयोग करके लिखा है, इसलिए यदि आप किसी भिन्न प्रदाता का उपयोग करना चाहते हैं, तो आपको इसे समायोजित करना होगा।

1. एक [OpenAI खाता](https://auth.openai.com/create-account) प्राप्त करें
2. [खाते में फंड डालें](https://platform.openai.com/settings/organization/billing/overview)—लिखते समय न्यूनतम राशि $5 है
3. [एक API कुंजी बनाएँ](https://platform.openai.com/settings/organization/api-keys)
4. कमांड लाइन में, API कुंजी निर्यात (export) करें ताकि आपका प्रोग्राम इसका उपयोग कर सके

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. चेकआउट करें और एजेंट चलाएँ

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

यहाँ नया कोड है।

```python
from openai import OpenAI

open_ai = OpenAI()  # क्लाइंट OPENAI_API_KEY एनवायरनमेंट वेरिएबल को पढ़ता है
```

OpenAI API को आयात करें और इंस्टेंटिएट (instantiate) करें।

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

प्रतिक्रिया बनाने के लिए OpenAI API (`open_ai.chat.completions.create`) को कॉल करें।

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

कीमत आउटपुट करें और खरीदने या बेचने का सुझाव प्रदान करें।

#### भविष्यवाणियों का परीक्षण {#testing-the-predictions}

अब जब हम भविष्यवाणियाँ उत्पन्न कर सकते हैं, तो हम यह आकलन करने के लिए ऐतिहासिक डेटा का भी उपयोग कर सकते हैं कि क्या हम उपयोगी भविष्यवाणियाँ उत्पन्न करते हैं।

```sh
uv run test-predictor.py
```

अपेक्षित परिणाम इसके समान है:

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

अधिकांश टेस्टर एजेंट के समान है, लेकिन यहाँ वे भाग हैं जो नए या संशोधित हैं।

```python
CYCLES_FOR_TEST = 40 # बैकटेस्ट के लिए, हम कितने चक्रों का परीक्षण करते हैं

# बहुत सारे कोट्स प्राप्त करें
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

हम `CYCLES_FOR_TEST` (यहाँ 40 के रूप में निर्दिष्ट) दिन पीछे देखते हैं।

```python
# भविष्यवाणियां बनाएं और वास्तविक इतिहास के साथ उनकी जांच करें

total_error = Decimal(0)
changes = []
```

दो प्रकार की त्रुटियाँ हैं जिनमें हमारी रुचि है। पहली, `total_error`, केवल भविष्यवक्ता द्वारा की गई त्रुटियों का योग है।

दूसरी, `changes` को समझने के लिए, हमें एजेंट के उद्देश्य को याद रखना होगा। यह WETH/USDC अनुपात (ETH कीमत) की भविष्यवाणी करने के लिए नहीं है। यह बेचने और खरीदने के सुझाव जारी करने के लिए है। यदि कीमत वर्तमान में $2000 है और यह कल $2010 की भविष्यवाणी करता है, तो हमें कोई आपत्ति नहीं है यदि वास्तविक परिणाम $2020 है और हम अतिरिक्त पैसा कमाते हैं। लेकिन हमें _आपत्ति_ है यदि इसने $2010 की भविष्यवाणी की, और उस सुझाव के आधार पर ETH खरीदा, और कीमत गिरकर $1990 हो गई।

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

हम केवल उन मामलों को देख सकते हैं जहाँ पूरा इतिहास (भविष्यवाणी के लिए उपयोग किए गए मान और इसकी तुलना करने के लिए वास्तविक दुनिया का मान) उपलब्ध है। इसका मतलब है कि सबसे नया मामला वह होना चाहिए जो `CYCLES_BACK` पहले शुरू हुआ था।

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

एजेंट द्वारा उपयोग किए जाने वाले नमूनों की समान संख्या प्राप्त करने के लिए [स्लाइस (slices)](https://www.w3schools.com/python/ref_func_slice.asp) का उपयोग करें। यहाँ और अगले खंड के बीच का कोड वही भविष्यवाणी-प्राप्त-करें कोड है जो हमारे पास एजेंट में है।

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

अनुमानित कीमत, वास्तविक कीमत और भविष्यवाणी के समय की कीमत प्राप्त करें। हमें यह निर्धारित करने के लिए भविष्यवाणी के समय की कीमत की आवश्यकता है कि सुझाव खरीदने का था या बेचने का।

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

त्रुटि का पता लगाएँ, और इसे कुल में जोड़ें।

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` के लिए, हम एक ETH खरीदने या बेचने का मौद्रिक प्रभाव चाहते हैं। इसलिए पहले, हमें सुझाव निर्धारित करने की आवश्यकता है, फिर आकलन करें कि वास्तविक कीमत कैसे बदली, और क्या सुझाव ने पैसा कमाया (सकारात्मक परिवर्तन) या पैसा खर्च कराया (नकारात्मक परिवर्तन)।

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

परिणाम रिपोर्ट करें।

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

लाभदायक दिनों की संख्या और नुकसान वाले दिनों की संख्या गिनने के लिए [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) का उपयोग करें। परिणाम एक फ़िल्टर ऑब्जेक्ट है, जिसे लंबाई प्राप्त करने के लिए हमें एक सूची में बदलने की आवश्यकता है।

### लेन-देन सबमिट करना {#submit-txn}

अब हमें वास्तव में लेन-देन सबमिट करने की आवश्यकता है। हालाँकि, मैं इस बिंदु पर, सिस्टम के सिद्ध होने से पहले वास्तविक पैसा खर्च नहीं करना चाहता। इसके बजाय, हम मेननेट का एक स्थानीय फ़ोर्क बनाएँगे, और उस नेटवर्क पर "ट्रेड" करेंगे।

स्थानीय फ़ोर्क बनाने और ट्रेडिंग सक्षम करने के चरण यहाँ दिए गए हैं।

1. [Foundry](https://getfoundry.sh/introduction/installation) इंस्टॉल करें

2. [`anvil`](https://getfoundry.sh/anvil/overview) शुरू करें

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` Foundry के लिए डिफ़ॉल्ट URL, http://localhost:8545 पर सुन रहा है, इसलिए हमें [`cast` कमांड](https://getfoundry.sh/cast/overview) के लिए URL निर्दिष्ट करने की आवश्यकता नहीं है जिसका उपयोग हम ब्लॉकचेन में हेरफेर करने के लिए करते हैं।

3. `anvil` में चलाते समय, दस परीक्षण खाते होते हैं जिनमें ETH होता है—पहले वाले के लिए एनवायरनमेंट वेरिएबल्स सेट करें

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. ये वे अनुबंध हैं जिनका हमें उपयोग करने की आवश्यकता है। [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) वह यूनिस्वैप v3 अनुबंध है जिसका उपयोग हम वास्तव में ट्रेड करने के लिए करते हैं। हम सीधे पूल के माध्यम से ट्रेड कर सकते हैं, लेकिन यह बहुत आसान है।

   नीचे के दो वेरिएबल WETH और USDC के बीच स्वैप करने के लिए आवश्यक यूनिस्वैप v3 पथ हैं।

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. प्रत्येक परीक्षण खाते में 10,000 ETH हैं। ट्रेडिंग के लिए 1000 WETH प्राप्त करने के लिए 1000 ETH को रैप करने के लिए WETH अनुबंध का उपयोग करें।

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. USDC के लिए 500 WETH ट्रेड करने के लिए `SwapRouter` का उपयोग करें।

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` कॉल एक व्यय सीमा बनाती है जो `SwapRouter` को हमारे कुछ टोकन खर्च करने की अनुमति देती है। अनुबंध घटनाएँ की निगरानी नहीं कर सकते हैं, इसलिए यदि हम सीधे `SwapRouter` अनुबंध में टोकन ट्रांसफर करते हैं, तो उसे पता नहीं चलेगा कि उसे भुगतान किया गया था। इसके बजाय, हम `SwapRouter` अनुबंध को एक निश्चित राशि खर्च करने की अनुमति देते हैं, और फिर `SwapRouter` ऐसा करता है। यह `SwapRouter` द्वारा कॉल किए गए फ़ंक्शन के माध्यम से किया जाता है, इसलिए यह जानता है कि क्या यह सफल रहा।

7. सत्यापित करें कि आपके पास दोनों टोकन पर्याप्त मात्रा में हैं।

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

अब जब हमारे पास WETH और USDC हैं, तो हम वास्तव में एजेंट चला सकते हैं।

```sh
git checkout 05-trade
uv run agent.py
```

आउटपुट इसके समान दिखेगा:

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

वास्तव में इसका उपयोग करने के लिए, आपको कुछ मामूली बदलावों की आवश्यकता है।

- पंक्ति 14 में, `MAINNET_URL` को एक वास्तविक एक्सेस पॉइंट में बदलें, जैसे कि `https://eth.drpc.org`
- पंक्ति 28 में, `PRIVATE_KEY` को अपनी निजी कुंजी में बदलें
- जब तक आप बहुत अमीर नहीं हैं और एक अप्रमाणित एजेंट के लिए हर दिन 1 ETH खरीद या बेच नहीं सकते, आप `WETH_TRADE_AMOUNT` को कम करने के लिए 29 को बदलना चाह सकते हैं

#### कोड स्पष्टीकरण {#trading-code}

यहाँ नया कोड है।

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

वही वेरिएबल्स जिनका उपयोग हमने चरण 4 में किया था।

```python
WETH_TRADE_AMOUNT=1
```

ट्रेड करने की राशि।

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

वास्तव में ट्रेड करने के लिए, हमें `approve` फ़ंक्शन की आवश्यकता है। हम पहले और बाद के बैलेंस भी दिखाना चाहते हैं, इसलिए हमें `balanceOf` की भी आवश्यकता है।

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI में हमें केवल `exactInput` की आवश्यकता है। एक संबंधित फ़ंक्शन, `exactOutput` है, जिसका उपयोग हम ठीक एक WETH खरीदने के लिए कर सकते हैं, लेकिन सरलता के लिए हम दोनों मामलों में केवल `exactInput` का उपयोग करते हैं।

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) और `SwapRouter` अनुबंध के लिए Web3 परिभाषाएँ।

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

लेन-देन पैरामीटर। हमें यहाँ एक फ़ंक्शन की आवश्यकता है क्योंकि [नॉन्स](https://en.wikipedia.org/wiki/Cryptographic_nonce) हर बार बदलना चाहिए।

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` के लिए टोकन व्यय सीमा को स्वीकृति दें।

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

इस तरह हम Web3 में लेन-देन भेजते हैं। पहले हम लेन-देन बनाने के लिए [`Contract` ऑब्जेक्ट](https://web3py.readthedocs.io/en/stable/web3.contract.html) का उपयोग करते हैं। फिर हम `PRIVATE_KEY` का उपयोग करके लेन-देन पर हस्ताक्षर करने के लिए [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) का उपयोग करते हैं। अंत में, हम लेन-देन भेजने के लिए [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) का उपयोग करते हैं।

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) लेन-देन के माइन होने तक प्रतीक्षा करता है। यदि आवश्यक हो तो यह रसीद देता है।

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH बेचते समय ये पैरामीटर होते हैं।

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

`SELL_PARAMS` के विपरीत, खरीद पैरामीटर बदल सकते हैं। इनपुट राशि 1 WETH की लागत है, जैसा कि `quote` में उपलब्ध है।

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

`buy()` और `sell()` फ़ंक्शन लगभग समान हैं। पहले हम `SwapRouter` के लिए पर्याप्त व्यय सीमा को स्वीकृति देते हैं, और फिर हम इसे सही पथ और राशि के साथ कॉल करते हैं।

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

दोनों मुद्राओं में उपयोगकर्ता बैलेंस रिपोर्ट करें।

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

यह एजेंट वर्तमान में केवल एक बार काम करता है। हालाँकि, आप इसे [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) से चलाकर या 368-400 पंक्तियों को एक लूप में लपेटकर और अगले चक्र के समय तक प्रतीक्षा करने के लिए [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) का उपयोग करके लगातार काम करने के लिए बदल सकते हैं।

## संभावित सुधार {#improvements}

यह पूर्ण उत्पादन संस्करण नहीं है; यह केवल मूल बातें सिखाने के लिए एक उदाहरण है। सुधार के लिए यहाँ कुछ विचार दिए गए हैं।

### स्मार्ट ट्रेडिंग {#smart-trading}

दो महत्वपूर्ण तथ्य हैं जिन्हें एजेंट यह तय करते समय अनदेखा करता है कि क्या करना है।

- _अनुमानित परिवर्तन का परिमाण_। यदि कीमत में गिरावट की उम्मीद है, तो एजेंट गिरावट के परिमाण की परवाह किए बिना `WETH` की एक निश्चित राशि बेचता है।
  तर्कसंगत रूप से, मामूली बदलावों को अनदेखा करना और इस आधार पर बेचना बेहतर होगा कि हम कीमत में कितनी गिरावट की उम्मीद करते हैं।
- _वर्तमान पोर्टफोलियो_। यदि आपके पोर्टफोलियो का 10% WETH में है और आपको लगता है कि कीमत बढ़ेगी, तो शायद और खरीदना समझदारी है। लेकिन यदि आपके पोर्टफोलियो का 90% WETH में है, तो आप पर्याप्त रूप से एक्सपोज़्ड हो सकते हैं, और अधिक खरीदने की कोई आवश्यकता नहीं है। यदि आप कीमत कम होने की उम्मीद करते हैं तो इसका उल्टा सच है।

### क्या होगा यदि आप अपनी ट्रेडिंग रणनीति को गुप्त रखना चाहते हैं? {#secret}

AI विक्रेता आपके द्वारा उनके LLMs को भेजी गई क्वेरी देख सकते हैं, जो आपके एजेंट के साथ विकसित किए गए जीनियस ट्रेडिंग सिस्टम को उजागर कर सकता है। एक ट्रेडिंग सिस्टम जिसका बहुत से लोग उपयोग करते हैं वह बेकार है क्योंकि जब आप खरीदना चाहते हैं तो बहुत से लोग खरीदने की कोशिश करते हैं (और कीमत बढ़ जाती है) और जब आप बेचना चाहते हैं तो बेचने की कोशिश करते हैं (और कीमत कम हो जाती है)।

इस समस्या से बचने के लिए आप स्थानीय रूप से एक LLM चला सकते हैं, उदाहरण के लिए, [LM-Studio](https://lmstudio.ai/) का उपयोग करके।

### एआई बॉट से एआई एजेंट तक {#bot-to-agent}

आप एक अच्छा तर्क दे सकते हैं कि यह [एक एआई बॉट है, एआई एजेंट नहीं](/ai-agents/#ai-agents-vs-ai-bots)। यह एक अपेक्षाकृत सरल रणनीति लागू करता है जो पूर्वनिर्धारित जानकारी पर निर्भर करती है। हम आत्म-सुधार को सक्षम कर सकते हैं, उदाहरण के लिए, यूनिस्वैप v3 पूलों की एक सूची और उनके नवीनतम मूल्य प्रदान करके और यह पूछकर कि किस संयोजन का सबसे अच्छा भविष्य कहनेवाला मूल्य (predictive value) है।

### स्लिपेज सुरक्षा {#slippage-protection}

वर्तमान में कोई [स्लिपेज सुरक्षा](https://uniswapv3book.com/milestone_3/slippage-protection.html) नहीं है। यदि वर्तमान कोट $2000 है, और अपेक्षित कीमत $2100 है, तो एजेंट खरीदेगा। हालाँकि, यदि एजेंट के खरीदने से पहले लागत $2200 तक बढ़ जाती है, तो अब और खरीदने का कोई मतलब नहीं है।

स्लिपेज सुरक्षा लागू करने के लिए, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) की पंक्तियों 325 और 334 में एक `amountOutMinimum` मान निर्दिष्ट करें।

## निष्कर्ष {#conclusion}

उम्मीद है, अब आप एआई एजेंटों के साथ शुरुआत करने के लिए पर्याप्त जानते हैं। यह विषय का व्यापक अवलोकन नहीं है; इसके लिए पूरी किताबें समर्पित हैं, लेकिन यह आपको शुरू करने के लिए पर्याप्त है। शुभकामनाएँ!

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।