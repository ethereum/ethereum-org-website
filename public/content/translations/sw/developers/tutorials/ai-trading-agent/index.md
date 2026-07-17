---
title: Tengeneza ajenti wako wa akili bandia wa kufanya biashara kwenye Ethereum
description: Katika mafunzo haya utajifunza jinsi ya kutengeneza ajenti rahisi wa akili bandia wa kufanya biashara. Ajenti huyu anasoma taarifa kutoka kwenye mnyororo wa vitalu, anauliza LLM kwa mapendekezo kulingana na taarifa hizo, anafanya biashara ambayo LLM inapendekeza, na kisha anasubiri na kurudia.
author: Ori Pomerantz
tags: ["AI", "biashara", "ajenti", "Python"]
skill: intermediate
breadcrumb: Ajenti wa akili bandia wa kufanya biashara
published: 2026-02-13
lang: sw
sidebarDepth: 3
---

Katika mafunzo haya utajifunza jinsi ya kujenga ajenti rahisi wa akili bandia wa kufanya biashara. Ajenti huyu anafanya kazi kwa kutumia hatua hizi:

1. Kusoma bei za sasa na za zamani za tokeni, pamoja na taarifa nyingine zinazoweza kuwa muhimu
2. Kujenga swali kwa kutumia taarifa hizi, pamoja na taarifa za msingi kuelezea jinsi zinavyoweza kuwa muhimu
3. Kuwasilisha swali na kupokea makadirio ya bei
4. Kufanya biashara kulingana na pendekezo
5. Kusubiri na kurudia

Ajenti huyu anaonyesha jinsi ya kusoma taarifa, kuzitafsiri kuwa swali linalotoa jibu linaloweza kutumika, na kutumia jibu hilo. Hizi zote ni hatua zinazohitajika kwa ajenti wa akili bandia. Ajenti huyu ametekelezwa kwa Python kwa sababu ndiyo lugha inayotumiwa sana katika AI.

## Kwa nini ufanye hivi? {#why-do-this}

Majenti wa biashara wa kujiendesha wanaruhusu wasanidi kuchagua na kutekeleza mkakati wa biashara. [Majenti wa akili bandia](/ai-agents) wanaruhusu mikakati ya biashara iliyo ngumu zaidi na inayobadilika, ikiwezekana kutumia taarifa na aligoriti ambazo msanidi hata hajafikiria kuzitumia.

## Zana {#tools}

Mafunzo haya yanatumia [Python](https://www.python.org/), [maktaba ya Web3](https://web3py.readthedocs.io/en/stable/), na [Uniswap v3](https://github.com/Uniswap/v3-periphery) kwa nukuu na biashara.

### Kwa nini Python? {#python}

Lugha inayotumiwa sana kwa AI ni [Python](https://www.python.org/), kwa hivyo tunaitumia hapa. Usijali ikiwa hujui Python. Lugha hii iko wazi sana, na nitaelezea kwa usahihi kile inachofanya.

[Maktaba ya Web3](https://web3py.readthedocs.io/en/stable/) ndiyo API ya Ethereum ya Python inayojulikana zaidi. Ni rahisi sana kutumia.

### Kufanya biashara kwenye mnyororo wa vitalu {#trading-on-blockchain}

Kuna [mabadilishano mengi yaliyosambazwa (DEX)](/apps/categories/defi/) yanayokuruhusu kufanya biashara ya tokeni kwenye Ethereum. Hata hivyo, huwa na viwango vya ubadilishaji vinavyofanana kutokana na [arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) ni DEX inayotumiwa sana ambayo tunaweza kuitumia kwa nukuu (kuona thamani za tokeni zinazolingana) na biashara.

### OpenAI {#openai}

Kwa mfumo mkubwa wa lugha, nilichagua kuanza na [OpenAI](https://openai.com/). Ili kuendesha programu katika mafunzo haya utahitaji kulipia ufikiaji wa API. Malipo ya chini ya $5 yanatosha kabisa.

## Uendelezaji, hatua kwa hatua {#step-by-step}

Ili kurahisisha uendelezaji, tunaendelea kwa hatua. Kila hatua ni tawi katika GitHub.

### Kuanza {#getting-started}

Kuna hatua za kuanza chini ya UNIX au Linux (ikiwa ni pamoja na [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Ikiwa bado huna, pakua na usakinishe [Python](https://www.python.org/downloads/).

2. Nakili hazina ya GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Sakinisha [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Amri kwenye mfumo wako inaweza kuwa tofauti.

   ```sh
   pipx install uv
   ```

4. Pakua maktaba.

   ```sh
   uv sync
   ```

5. Washa mazingira pepe.

   ```sh
   source .venv/bin/activate
   ```

6. Ili kuthibitisha kuwa Python na Web3 zinafanya kazi kwa usahihi, endesha `python3` na uipe programu hii. Unaweza kuiingiza kwenye kidokezo cha `>>>`; hakuna haja ya kuunda faili.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Kusoma kutoka kwenye mnyororo wa vitalu {#read-blockchain}

Hatua inayofuata ni kusoma kutoka kwenye mnyororo wa vitalu. Ili kufanya hivyo, unahitaji kubadilisha kwenda kwenye tawi la `02-read-quote` na kisha utumie `uv` kuendesha programu.

```sh
git checkout 02-read-quote
uv run agent.py
```

Unapaswa kupokea orodha ya vitu vya `Quote`, kila kimoja kikiwa na muhuri wa muda, bei, na rasilimali (kwa sasa kila wakati ni `WETH/USDC`).

Hapa kuna maelezo ya mstari kwa mstari.

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

Ingiza maktaba tunazohitaji. Zimeelezwa hapa chini zinapotumika.

```python
print = functools.partial(print, flush=True)
```

Inabadilisha `print` ya Python na toleo ambalo kila wakati hutoa matokeo mara moja. Hii ni muhimu katika hati inayoendeshwa kwa muda mrefu kwa sababu hatutaki kusubiri sasisho za hali au matokeo ya utatuzi.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL ya kufika kwenye Mtandao Mkuu. Unaweza kupata moja kutoka kwa [Nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) au kutumia mojawapo ya zile zilizotangazwa katika [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Kitalu cha Mtandao Mkuu wa Ethereum kwa kawaida hutokea kila sekunde kumi na mbili, kwa hivyo hizi ni idadi ya vitalu tunavyotarajia kutokea katika kipindi cha muda. Kumbuka kuwa hii si takwimu kamili. Wakati [mpendekezaji wa bloku](/developers/docs/consensus-mechanisms/pos/block-proposal/) yuko chini, kitalu hicho hurukwa, na muda wa kitalu kinachofuata ni sekunde 24. Ikiwa tungetaka kupata kitalu kamili kwa muhuri wa muda, tungetumia [utafutaji wa binary](https://en.wikipedia.org/wiki/Binary_search). Hata hivyo, hii inakaribia kutosha kwa madhumuni yetu. Kutabiri siku zijazo si sayansi kamili.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Ukubwa wa mzunguko. Tunakagua nukuu mara moja kwa kila mzunguko na kujaribu kukadiria thamani mwishoni mwa mzunguko unaofuata.

```python
# Anwani ya bwawa tunalosoma
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Thamani za nukuu zinachukuliwa kutoka kwenye bwawa la Uniswap 3 USDC/WETH kwenye anwani [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Anwani hii tayari iko katika muundo wa checksum, lakini ni bora kutumia [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) ili kufanya msimbo uweze kutumika tena.

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

Hizi ni [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) za mikataba miwili tunayohitaji kuwasiliana nayo. Ili kuweka msimbo kwa ufupi, tunajumuisha tu kazi tunazohitaji kuita.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Anzisha maktaba ya [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) na uunganishe kwenye nodi ya Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Hii ni njia moja ya kuunda darasa la data katika Python. Aina ya data ya [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) inatumika kuunganisha kwenye mkataba. Kumbuka `(frozen=True)`. Katika Python [booleans](https://en.wikipedia.org/wiki/Boolean_data_type) zinafafanuliwa kama `True` au `False`, kwa herufi kubwa. Darasa hili la data ni `frozen`, ikimaanisha sehemu haziwezi kurekebishwa.

Kumbuka uingizaji (indentation). Tofauti na [lugha zinazotokana na C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python inatumia uingizaji kuashiria vitalu. Mkalimani wa Python anajua kuwa ufafanuzi ufuatao si sehemu ya darasa hili la data kwa sababu hauanzi kwenye uingizaji sawa na sehemu za darasa la data.

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

Aina ya [`Decimal`](https://docs.python.org/3/library/decimal.html) inatumika kwa kushughulikia kwa usahihi sehemu za desimali.

```python
    def get_price(self, block: int) -> Decimal:
```

Hii ndiyo njia ya kufafanua kazi katika Python. Ufafanuzi umeingizwa ili kuonyesha bado ni sehemu ya `PoolInfo`.

Katika kazi ambayo ni sehemu ya darasa la data kigezo cha kwanza kila wakati ni `self`, mfano wa darasa la data ulioita hapa. Hapa kuna kigezo kingine, nambari ya kitalu.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Kama tungeweza kusoma siku zijazo, tusingehitaji AI kwa biashara.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Sintaksia ya kuita kazi kwenye EVM kutoka Web3 ni hii: `<contract object>.functions.<function name>().call(<parameters>)`. Vigezo vinaweza kuwa vigezo vya kazi ya EVM (kama vipo; hapa hakuna) au [vigezo vilivyotajwa](https://en.wikipedia.org/wiki/Named_parameter) kwa kurekebisha tabia ya mnyororo wa vitalu. Hapa tunatumia kimoja, `block_identifier`, kubainisha [nambari ya kitalu](/developers/docs/apis/json-rpc/#default-block) tunayotaka kuendesha.

Matokeo ni [muundo huu, katika umbo la safu](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Thamani ya kwanza ni kazi ya kiwango cha ubadilishaji kati ya tokeni mbili.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Ili kupunguza hesabu mnyororoni, Uniswap v3 haihifadhi kipengele halisi cha ubadilishaji bali kipeo chake cha pili. Kwa sababu EVM haiauni hesabu za nambari zinazoelea au sehemu, badala ya thamani halisi, jibu ni <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (tokeni1 kwa kila tokeni0)
        return 1/(raw_price * self.decimal_factor)
```

Bei ghafi tunayopata ni idadi ya `token0` tunayopata kwa kila `token1`. Katika bwawa letu `token0` ni USDC (sarafu thabiti yenye thamani sawa na dola ya Marekani) na `token1` ni [WETH](https://opensea.io/learn/blockchain/what-is-weth). Thamani tunayotaka hasa ni idadi ya dola kwa kila WETH, si kinyume chake.

Kipengele cha desimali ni uwiano kati ya [vipengele vya desimali](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) kwa tokeni mbili.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Darasa hili la data linawakilisha nukuu: bei ya rasilimali maalum kwa wakati fulani. Katika hatua hii, sehemu ya `asset` haina umuhimu kwa sababu tunatumia bwawa moja na kwa hivyo tuna rasilimali moja. Hata hivyo, tutaongeza rasilimali zaidi baadaye.

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

Kazi hii inachukua anwani na kurudisha taarifa kuhusu mkataba wa tokeni kwenye anwani hiyo. Ili kuunda [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) mpya, tunatoa anwani na ABI kwa `w3.eth.contract`.

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

Kazi hii inarudisha kila kitu tunachohitaji kuhusu [bwawa maalum](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Sintaksia `f"<string>"` ni [kamba iliyoumbizwa](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Pata kitu cha `Quote`. Thamani chaguo-msingi ya `block_number` ni `None` (hakuna thamani).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Ikiwa nambari ya kitalu haikubainishwa, tumia `w3.eth.block_number`, ambayo ni nambari ya kitalu cha hivi punde. Hii ni sintaksia ya [taarifa ya `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Inaweza kuonekana kana kwamba ingekuwa bora kuweka tu chaguo-msingi kuwa `w3.eth.block_number`, lakini hiyo haifanyi kazi vizuri kwa sababu itakuwa nambari ya kitalu wakati kazi inafafanuliwa. Katika ajenti anayeendeshwa kwa muda mrefu, hili lingekuwa tatizo.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Tumia [maktaba ya `datetime`](https://docs.python.org/3/library/datetime.html) kuiumbiza kwa muundo unaosomeka kwa binadamu na mifumo mikubwa ya lugha (LLMs). Tumia [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) kuzungusha thamani kwa nafasi mbili za desimali.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Katika Python unafafanua [orodha](https://docs.python.org/3/library/stdtypes.html#typesseq-list) inayoweza tu kuwa na aina maalum kwa kutumia `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Katika Python [kitanzi cha `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) kwa kawaida hupitia orodha. Orodha ya nambari za vitalu za kupata nukuu inatoka kwa [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Kwa kila nambari ya kitalu, pata kitu cha `Quote` na ukiambatanishe kwenye orodha ya `quotes`. Kisha rudisha orodha hiyo.

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

Huu ndio msimbo mkuu wa hati. Soma taarifa za bwawa, pata nukuu kumi na mbili, na [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) hizo.

### Kuunda kidokezo {#prompt}

Kisha, tunahitaji kubadilisha orodha hii ya nukuu kuwa kidokezo kwa LLM na kupata thamani inayotarajiwa ya baadaye.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Matokeo sasa yatakuwa kidokezo kwa LLM, sawa na:

```
Given these quotes:
Asset: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Asset: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


What would you expect the value for WETH/USDC to be at time 2026-02-02T17:56?

Provide your answer as a single number rounded to two decimal places,
without any other text.
```

Kumbuka kuwa kuna nukuu za rasilimali mbili hapa, `WETH/USDC` na `WBTC/WETH`. Kuongeza nukuu kutoka kwa rasilimali nyingine kunaweza kuboresha usahihi wa utabiri.

#### Jinsi kidokezo kinavyoonekana {#prompt-explanation}

Kidokezo hiki kina sehemu tatu, ambazo ni za kawaida sana katika vidokezo vya LLM.

1. Taarifa. LLM zina taarifa nyingi kutoka kwenye mafunzo yao, lakini kwa kawaida hazina za hivi punde. Hii ndiyo sababu tunahitaji kupata nukuu za hivi punde hapa. Kuongeza taarifa kwenye kidokezo kunaitwa [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Swali halisi. Hiki ndicho tunachotaka kujua.

3. Maagizo ya uumbizaji wa matokeo. Kwa kawaida, LLM itatupa makadirio na maelezo ya jinsi ilivyofikia. Hii ni bora kwa binadamu, lakini programu ya kompyuta inahitaji tu jibu la mwisho.

#### Maelezo ya msimbo {#prompt-code}

Hapa kuna msimbo mpya.

```python
from datetime import datetime, timezone, timedelta
```

Tunahitaji kuipa LLM muda ambao tunataka makadirio. Ili kupata muda "dakika/saa/siku n" katika siku zijazo, tunatumia [darasa la `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Anwani za mabwawa tunayosoma
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Tuna mabwawa mawili tunayohitaji kusoma.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (tokeni1 kwa kila tokeni0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Katika bwawa la WETH/USDC, tunataka kujua ni `token0` (USDC) ngapi tunahitaji kununua moja ya `token1` (WETH). Katika bwawa la WETH/WBTC, tunataka kujua ni `token1` (WETH) ngapi tunahitaji kununua moja ya `token0` (WBTC, ambayo ni Bitcoin iliyofungwa). Tunahitaji kufuatilia ikiwa uwiano wa bwawa unahitaji kugeuzwa.

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

Ili kujua ikiwa bwawa linahitaji kugeuzwa, tunapata hiyo kama ingizo kwa `read_pool`. Pia, alama ya rasilimali inahitaji kuwekwa kwa usahihi.

Sintaksia `<a> if <b> else <c>` ni sawa na Python ya [kigezo cha masharti cha ternary](https://en.wikipedia.org/wiki/Ternary_conditional_operator), ambayo katika lugha inayotokana na C ingekuwa `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Kazi hii inajenga kamba inayoumbiza orodha ya vitu vya `Quote`, ikichukulia vyote vinatumika kwa rasilimali sawa.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Katika Python [kamba halisi za mistari mingi](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) huandikwa kama `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Hapa, tunatumia muundo wa [MapReduce](https://en.wikipedia.org/wiki/MapReduce) kuzalisha kamba kwa kila orodha ya nukuu na `format_quotes`, kisha kuzipunguza kuwa kamba moja kwa matumizi katika kidokezo.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Sehemu iliyobaki ya kidokezo ni kama inavyotarajiwa.

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

Kagua mabwawa mawili na upate nukuu kutoka kwa yote mawili.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Amua hatua ya muda ujao ambayo tunataka makadirio, na uunde kidokezo.

### Kuunganisha na LLM {#interface-llm}

Kisha, tunadokeza LLM halisi na kupokea thamani inayotarajiwa ya baadaye. Niliandika programu hii kwa kutumia OpenAI, kwa hivyo ikiwa unataka kutumia mtoa huduma tofauti, utahitaji kuirekebisha.

1. Pata [akaunti ya OpenAI](https://auth.openai.com/create-account)
2. [Weka pesa kwenye akaunti](https://platform.openai.com/settings/organization/billing/overview)—kiasi cha chini wakati wa kuandika ni $5
3. [Unda ufunguo wa API](https://platform.openai.com/settings/organization/api-keys)
4. Katika mstari wa amri, hamisha ufunguo wa API ili programu yako iweze kuutumia

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Angalia na uendeshe ajenti

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Hapa kuna msimbo mpya.

```python
from openai import OpenAI

open_ai = OpenAI()  # Mteja anasoma kibadilika cha mazingira cha OPENAI_API_KEY
```

Ingiza na uanzishe API ya OpenAI.

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

Ita API ya OpenAI (`open_ai.chat.completions.create`) ili kuunda jibu.

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

Toa bei na utoe pendekezo la kununua au kuuza.

#### Kujaribu utabiri {#testing-the-predictions}

Sasa kwa kuwa tunaweza kuzalisha utabiri, tunaweza pia kutumia data ya kihistoria kutathmini ikiwa tunazalisha utabiri muhimu.

```sh
uv run test-predictor.py
```

Matokeo yanayotarajiwa ni sawa na:

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

Sehemu kubwa ya kijaribu inafanana na ajenti, lakini hapa kuna sehemu ambazo ni mpya au zilizorekebishwa.

```python
CYCLES_FOR_TEST = 40 # Kwa upimaji wa nyuma, ni mizunguko mingapi tunayoipima

# Pata nukuu nyingi
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

Tunaangalia siku `CYCLES_FOR_TEST` (zilizobainishwa kama 40 hapa) nyuma.

```python
# Tengeneza utabiri na uukague dhidi ya historia halisi

total_error = Decimal(0)
changes = []
```

Kuna aina mbili za makosa tunayovutiwa nayo. Ya kwanza, `total_error`, ni jumla ya makosa yaliyofanywa na mtabiri.

Ili kuelewa ya pili, `changes`, tunahitaji kukumbuka madhumuni ya ajenti. Sio kutabiri uwiano wa WETH/USDC (bei ya ETH). Ni kutoa mapendekezo ya kuuza na kununua. Ikiwa bei kwa sasa ni $2000 na inatabiri $2010 kesho, hatujali ikiwa matokeo halisi ni $2020 na tunapata pesa za ziada. Lakini _tunajali_ ikiwa ilitabiri $2010, na kununua ETH kulingana na pendekezo hilo, na bei inashuka hadi $1990.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Tunaweza tu kuangalia kesi ambapo historia kamili (thamani zilizotumika kwa utabiri na thamani ya ulimwengu halisi ya kulinganisha nayo) inapatikana. Hii inamaanisha kesi mpya zaidi lazima iwe ile iliyoanza `CYCLES_BACK` iliyopita.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Tumia [vipande](https://www.w3schools.com/python/ref_func_slice.asp) kupata idadi sawa ya sampuli kama nambari anayotumia ajenti. Msimbo kati ya hapa na sehemu inayofuata ni msimbo ule ule wa kupata-utabiri tulio nao katika ajenti.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Pata bei iliyotabiriwa, bei halisi, na bei wakati wa utabiri. Tunahitaji bei wakati wa utabiri ili kuamua ikiwa pendekezo lilikuwa la kununua au kuuza.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Tafuta kosa, na uongeze kwenye jumla.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Kwa `changes`, tunataka athari ya kifedha ya kununua au kuuza ETH moja. Kwa hivyo kwanza, tunahitaji kuamua pendekezo, kisha kutathmini jinsi bei halisi ilivyobadilika, na ikiwa pendekezo lilitengeneza pesa (mabadiliko chanya) au kugharimu pesa (mabadiliko hasi).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Ripoti matokeo.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Tumia [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) kuhesabu idadi ya siku zenye faida na idadi ya siku za gharama. Matokeo ni kitu cha kichujio, ambacho tunahitaji kubadilisha kuwa orodha ili kupata urefu.

### Kuwasilisha miamala {#submit-txn}

Sasa tunahitaji kuwasilisha miamala. Hata hivyo, sitaki kutumia pesa halisi katika hatua hii, kabla ya mfumo kuthibitishwa. Badala yake, tutaunda mchepuo wa ndani wa Mtandao Mkuu, na "kufanya biashara" kwenye mtandao huo.

Hapa kuna hatua za kuunda mchepuo wa ndani na kuwezesha biashara.

1. Sakinisha [Foundry](https://getfoundry.sh/introduction/installation)

2. Anza [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` inasikiliza kwenye URL chaguo-msingi ya Foundry, http://localhost:8545, kwa hivyo hatuhitaji kubainisha URL kwa [amri ya `cast`](https://getfoundry.sh/cast/overview) tunayotumia kudhibiti mnyororo wa vitalu.

3. Wakati wa kuendesha katika `anvil`, kuna akaunti kumi za majaribio ambazo zina ETH—weka vigezo vya mazingira kwa ya kwanza

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Hii ndiyo mikataba tunayohitaji kutumia. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) ni mkataba wa Uniswap v3 tunaotumia kufanya biashara hasa. Tungeweza kufanya biashara moja kwa moja kupitia bwawa, lakini hii ni rahisi zaidi.

   Vigezo viwili vya chini ni njia za Uniswap v3 zinazohitajika kwa badilishano kati ya WETH na USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Kila moja ya akaunti za majaribio ina 10,000 ETH. Tumia mkataba wa WETH kufunga 1000 ETH ili kupata 1000 WETH kwa biashara.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Tumia `SwapRouter` kufanya biashara ya 500 WETH kwa USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Wito wa `approve` unaunda kibali kinachoruhusu `SwapRouter` kutumia baadhi ya tokeni zetu. Mikataba haiwezi kufuatilia matukio, kwa hivyo ikiwa tutafanya hamisho la tokeni moja kwa moja kwenye mkataba wa `SwapRouter`, isingejua ililipwa. Badala yake, tunaruhusu mkataba wa `SwapRouter` kutumia kiasi fulani, na kisha `SwapRouter` inafanya hivyo. Hii inafanywa kupitia kazi inayoitwa na `SwapRouter`, kwa hivyo inajua ikiwa ilifanikiwa.

7. Thibitisha una kiasi cha kutosha cha tokeni zote mbili.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Sasa kwa kuwa tuna WETH na USDC, tunaweza kuendesha ajenti.

```sh
git checkout 05-trade
uv run agent.py
```

Matokeo yataonekana sawa na:

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

Ili kuitumia hasa, unahitaji mabadiliko machache madogo.

- Katika mstari wa 14, badilisha `MAINNET_URL` kuwa kituo halisi cha ufikiaji, kama vile `https://eth.drpc.org`
- Katika mstari wa 28, badilisha `PRIVATE_KEY` kuwa ufunguo wa siri wako mwenyewe
- Isipokuwa wewe ni tajiri sana na unaweza kununua au kuuza 1 ETH kila siku kwa ajenti ambaye hajathibitishwa, unaweza kutaka kubadilisha 29 ili kupunguza `WETH_TRADE_AMOUNT`

#### Maelezo ya msimbo {#trading-code}

Hapa kuna msimbo mpya.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Vigezo vile vile tulivyotumia katika hatua ya 4.

```python
WETH_TRADE_AMOUNT=1
```

Kiasi cha kufanyia biashara.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Ili kufanya biashara hasa, tunahitaji kazi ya `approve`. Pia tunataka kuonyesha salio kabla na baada, kwa hivyo tunahitaji pia `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Katika ABI ya `SwapRouter` tunahitaji tu `exactInput`. Kuna kazi inayohusiana, `exactOutput`, ambayo tungeweza kutumia kununua WETH moja haswa, lakini kwa urahisi tunatumia tu `exactInput` katika visa vyote viwili.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Ufafanuzi wa Web3 kwa [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) na mkataba wa `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Vigezo vya muamala. Tunahitaji kazi hapa kwa sababu [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce) lazima ibadilike kila wakati.

```python
def approve_token(contract: Contract, amount: int):
```

Idhinisha kibali cha tokeni kwa `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Hivi ndivyo tunavyotuma muamala katika Web3. Kwanza tunatumia [kitu cha `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) kujenga muamala. Kisha tunatumia [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) kutia saini muamala, kwa kutumia `PRIVATE_KEY`. Hatimaye, tunatumia [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) kutuma muamala.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) inasubiri hadi muamala uchimbwe. Inarudisha stakabadhi ikihitajika.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Hivi ni vigezo wakati wa kuuza WETH.

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

Tofauti na `SELL_PARAMS`, vigezo vya kununua vinaweza kubadilika. Kiasi cha kuingiza ni gharama ya 1 WETH, kama inavyopatikana katika `quote`.

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

Kazi za `buy()` na `sell()` zinakaribia kufanana. Kwanza tunaidhinisha kibali cha kutosha kwa `SwapRouter`, na kisha tunaiita kwa njia na kiasi sahihi.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Ripoti salio la mtumiaji katika sarafu zote mbili.

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

Ajenti huyu kwa sasa anafanya kazi mara moja tu. Hata hivyo, unaweza kumbadilisha ili afanye kazi mfululizo ama kwa kumuendesha kutoka [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) au kwa kufunga mistari 368-400 katika kitanzi na kutumia [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) kusubiri hadi wakati wa mzunguko unaofuata.

## Maboresho yanayowezekana {#improvements}

Hili si toleo kamili la uzalishaji; ni mfano tu wa kufundisha mambo ya msingi. Hapa kuna baadhi ya mawazo ya maboresho.

### Biashara nadhifu zaidi {#smart-trading}

Kuna ukweli mbili muhimu ambazo ajenti anapuuza anapoamua nini cha kufanya.

- _Ukubwa wa mabadiliko yanayotarajiwa_. Ajenti anauza kiasi maalum cha `WETH` ikiwa bei inatarajiwa kushuka, bila kujali ukubwa wa kushuka huko.
  Inawezekana, ingekuwa bora kupuuza mabadiliko madogo na kuuza kulingana na kiasi gani tunatarajia bei kushuka.
- _Kwingineko ya sasa_. Ikiwa 10% ya kwingineko yako iko katika WETH na unafikiri bei itapanda, labda ina maana kununua zaidi. Lakini ikiwa 90% ya kwingineko yako iko katika WETH, unaweza kuwa umejiweka wazi vya kutosha, na hakuna haja ya kununua zaidi. Kinyume chake ni kweli ikiwa unatarajia bei kushuka.

### Vipi ikiwa unataka kuweka mkakati wako wa biashara siri? {#secret}

Wachuuzi wa AI wanaweza kuona maswali unayotuma kwa LLM zao, ambayo yanaweza kufichua mfumo wa biashara wa kipekee uliouendeleza na ajenti wako. Mfumo wa biashara ambao watu wengi sana wanautumia hauna thamani kwa sababu watu wengi sana wanajaribu kununua wakati unataka kununua (na bei inapanda) na kujaribu kuuza wakati unataka kuuza (na bei inashuka).

Unaweza kuendesha LLM ndani ya nchi, kwa mfano, kwa kutumia [LM-Studio](https://lmstudio.ai/), ili kuepuka tatizo hili.

### Kutoka kwa boti ya AI hadi ajenti wa akili bandia {#bot-to-agent}

Unaweza kutoa hoja nzuri kwamba hii ni [boti ya AI, sio ajenti wa akili bandia](/ai-agents/#ai-agents-vs-ai-bots). Inatekeleza mkakati rahisi kiasi ambao unategemea taarifa zilizofafanuliwa awali. Tunaweza kuwezesha kujiboresha, kwa mfano, kwa kutoa orodha ya mabwawa ya Uniswap v3 na thamani zao za hivi punde na kuuliza ni mchanganyiko upi una thamani bora ya utabiri.

### Ulinzi wa tofauti ya utekelezaji {#slippage-protection}

Kwa sasa hakuna [ulinzi wa tofauti ya utekelezaji](https://uniswapv3book.com/milestone_3/slippage-protection.html). Ikiwa nukuu ya sasa ni $2000, na bei inayotarajiwa ni $2100, ajenti atanunua. Hata hivyo, ikiwa kabla ya ajenti kununua gharama inapanda hadi $2200, haina maana kununua tena.

Ili kutekeleza ulinzi wa tofauti ya utekelezaji, bainisha thamani ya `amountOutMinimum` katika mistari ya 325 na 334 ya [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Hitimisho {#conclusion}

Tunatumai, sasa unajua vya kutosha kuanza na majenti wa akili bandia. Huu sio muhtasari wa kina wa somo; kuna vitabu vizima vilivyotengwa kwa hilo, lakini hii inatosha kukuanzisha. Kila la heri!

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).