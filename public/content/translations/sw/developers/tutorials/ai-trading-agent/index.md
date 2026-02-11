---
title: Tengeneza wakala wako wa biashara wa AI kwenye Ethereum
description: Katika mafunzo haya utajifunza jinsi ya kutengeneza wakala rahisi wa biashara wa AI. Wakala huyu husoma taarifa kutoka kwa mnyororo wa bloku, anauliza LLM pendekezo kulingana na taarifa hiyo, anafanya biashara ambayo LLM inapendekeza, kisha anasubiri na kurudia.
author: Ori Pomerantz
tags: [ "AI", "biashara", "wakala", "python" ]
skill: intermediate
published: 2026-02-13
lang: sw
sidebarDepth: 3
---

Katika mafunzo haya utajifunza jinsi ya kujenga wakala rahisi wa biashara wa AI. Wakala huyu hufanya kazi kwa kutumia hatua hizi:

1. Soma bei za sasa na za zamani za tokeni, pamoja na taarifa nyingine zinazoweza kuwa muhimu
2. Unda swali kwa taarifa hii, pamoja na taarifa ya usuli ili kueleza jinsi inavyoweza kuwa muhimu
3. Wasilisha swali na upokee bei iliyokadiriwa
4. Fanya biashara kulingana na pendekezo
5. Subiri na urudie

Wakala huyu anaonyesha jinsi ya kusoma taarifa, kuitafsiri kuwa swali linalotoa jibu linaloweza kutumika, na kutumia jibu hilo. Hizi zote ni hatua zinazohitajika kwa wakala wa AI. Wakala huyu ametekelezwa katika Python kwa sababu ndiyo lugha ya kawaida inayotumika katika AI.

## Kwa nini ufanye hivi? {#why-do-this}

Wakala wa biashara wa kiotomatiki huruhusu wasanidi programu kuchagua na kutekeleza mkakati wa biashara. [Wakala wa AI](/ai-agents) huruhusu mikakati changamano na yenye nguvu zaidi ya biashara, inayoweza kutumia taarifa na kanuni ambazo msanidi programu hata hajafikiria kutumia.

## Zana {#tools}

Mafunzo haya yanatumia [Python](https://www.python.org/), [maktaba ya Web3](https://web3py.readthedocs.io/en/stable/), na [Uniswap v3](https://github.com/Uniswap/v3-periphery) kwa nukuu na biashara.

### Kwa nini Python? {#python}

Lugha inayotumika sana kwa AI ni [Python](https://www.python.org/), kwa hivyo tunaitumia hapa. Usijali kama hujui Python. Lugha iko wazi sana, na nitaeleza hasa inachofanya.

[Maktaba ya Web3](https://web3py.readthedocs.io/en/stable/) ndiyo API ya Python ya Ethereum ya kawaida zaidi. Ni rahisi sana kutumia.

### Kufanya biashara kwenye mnyororo wa bloku {#trading-on-blockchain}

Kuna [mabadilishano mengi yaliyosambazwa (DEX)](/apps/categories/defi/) ambayo yanakuwezesha kufanya biashara ya tokeni kwenye Ethereum. Hata hivyo, huwa na viwango vya ubadilishaji vinavyofanana kutokana na [usuluhishi](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) ni DEX inayotumika sana ambayo tunaweza kutumia kwa nukuu (kuona thamani za tokeni linganishi) na biashara.

### OpenAI {#openai}

Kwa muundo mkuu wa lugha, nilichagua kuanza na [OpenAI](https://openai.com/). Ili kuendesha programu katika mafunzo haya utahitaji kulipia ufikiaji wa API. Malipo ya chini ya $5 ni zaidi ya ya kutosha.

## Uendelezaji, hatua kwa hatua {#step-by-step}

Ili kurahisisha uendelezaji, tunaendelea kwa hatua. Kila hatua ni tawi katika GitHub.

### Kuanza {#getting-started}

Kuna hatua za kuanza chini ya UNIX au Linux (pamoja na [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Ikiwa huna tayari, pakua na usakinishe [Python](https://www.python.org/downloads/).

2. Clone hazina ya GitHub.

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

5. Washa mazingira ya mtandaoni.

   ```sh
   source .venv/bin/activate
   ```

6. Ili kuthibitisha Python na Web3 zinafanya kazi ipasavyo, endesha `python3` na uipe programu hii. Unaweza kuiingiza kwenye kidokezo cha `>>>`; hakuna haja ya kuunda faili.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Kusoma kutoka kwa mnyororo wa bloku {#read-blockchain}

Hatua inayofuata ni kusoma kutoka kwa mnyororo wa bloku. Ili kufanya hivyo, unahitaji kubadilisha hadi tawi la `02-read-quote` kisha utumie `uv` kuendesha programu.

```sh
git checkout 02-read-quote
uv run agent.py
```

Unapaswa kupokea orodha ya vitu vya `Quote`, kila kimoja kikiwa na muhuri wa muda, bei, na mali (kwa sasa daima ni `WETH/USDC`).

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

Ingiza maktaba tunazohitaji. Zinaelezwa hapa chini zinapotumika.

```python
print = functools.partial(print, flush=True)
```

Inabadilisha `print` ya Python na toleo ambalo daima husafisha matokeo mara moja. Hii ni muhimu katika hati inayoendeshwa kwa muda mrefu kwa sababu hatutaki kusubiri masasisho ya hali au matokeo ya utatuzi.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL ya kufika kwenye mtandao mkuu. Unaweza kupata moja kutoka [Nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) au kutumia moja ya zile zilizotangazwa katika [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Bloku ya mtandao mkuu wa Ethereum kwa kawaida hutokea kila sekunde kumi na mbili, kwa hivyo hizi ni idadi ya bloku tunazotarajia kutokea katika kipindi cha muda. Kumbuka kuwa hii si takwimu kamili. Wakati [mpendekezaji wa bloku](/developers/docs/consensus-mechanisms/pos/block-proposal/) hayuko hewani, bloku hiyo hurukwa, na muda wa bloku inayofuata ni sekunde 24. Ikiwa tungetaka kupata bloku kamili kwa muhuri wa muda, tungetumia [utafutaji wa binary](https://en.wikipedia.org/wiki/Binary_search). Hata hivyo, hii ni karibu vya kutosha kwa madhumuni yetu. Kutabiri siku zijazo si sayansi kamili.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Ukubwa wa mzunguko. Tunapitia nukuu mara moja kwa kila mzunguko na kujaribu kukadiria thamani mwishoni mwa mzunguko unaofuata.

```python
# Anwani ya pool tunayosoma
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Thamani za nukuu zinachukuliwa kutoka kwa pool ya Uniswap 3 USDC/WETH katika anwani [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Anwani hii tayari iko katika fomu ya checksum, lakini ni bora kutumia [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) kufanya msimbo uweze kutumika tena.

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

Hizi ni [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) za mikataba miwili tunayohitaji kuwasiliana nayo. Ili kuweka msimbo mfupi, tunajumuisha tu kazi tunazohitaji kupiga simu.

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

Hii ni njia moja ya kuunda darasa la data katika Python. Aina ya data ya [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) inatumika kuunganisha na mkataba. Kumbuka `(frozen=True)`. Katika Python [booleans](https://en.wikipedia.org/wiki/Boolean_data_type) hufafanuliwa kama `True` au `False`, herufi kubwa. Darasa hili la data ni `frozen`, ikimaanisha sehemu zake haziwezi kurekebishwa.

Kumbuka mpangilio. Tofauti na [lugha zinazotokana na C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python hutumia mpangilio kuashiria bloku. Mkalimani wa Python anajua kuwa ufafanuzi unaofuata si sehemu ya darasa hili la data kwa sababu hauanzi katika mpangilio sawa na sehemu za darasa la data.

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

Aina ya [`Decimal`](https://docs.python.org/3/library/decimal.html) inatumika kwa kushughulikia sehemu za desimali kwa usahihi.

```python
    def get_price(self, block: int) -> Decimal:
```

Hii ndiyo njia ya kufafanua kazi katika Python. Ufafanuzi umewekwa ndani ili kuonyesha bado ni sehemu ya `PoolInfo`.

Katika kazi ambayo ni sehemu ya darasa la data, kigezo cha kwanza daima ni `self`, mfano wa darasa la data uliopiga simu hapa. Hapa kuna kigezo kingine, nambari ya bloku.

```python
        assert block <= w3.eth.block_number, "Bloku iko katika siku zijazo"
```

Kama tungeweza kusoma siku zijazo, hatungehitaji AI kwa biashara.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Sintaksia ya kupiga simu kazi kwenye EVM kutoka Web3 ni hii: `<object ya mkataba>.kazi.<jina la kazi>``().call(<vigezo>)`. Vigezo vinaweza kuwa vigezo vya kazi ya EVM (ikiwa vipo; hapa havipo) au [vigezo vilivyotajwa](https://en.wikipedia.org/wiki/Named_parameter) kwa kurekebisha tabia ya mnyororo wa bloku. Hapa tunatumia moja, `block_identifier`, kubainisha [nambari ya bloku](/developers/docs/apis/json-rpc/#default-block) tunayotaka kuendesha ndani.

Matokeo ni [muundo huu, katika fomu ya safu](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Thamani ya kwanza ni kazi ya kiwango cha ubadilishaji kati ya tokeni mbili.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Ili kupunguza mahesabu ya onchain, Uniswap v3 haihifadhi kipengele halisi cha ubadilishaji bali mzizi wake wa mraba. Kwa sababu EVM haitumii hesabu ya nambari inayoelea au sehemu, badala ya thamani halisi, jibu ni <math><msqrt><mi>bei</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (tokeni1 kwa kila tokeni0)
        return 1/(raw_price * self.decimal_factor)
```

Bei ghafi tunayopata ni idadi ya `tokeni0` tunayopata kwa kila `tokeni1`. Katika pool yetu, `tokeni0` ni USDC (sarafu-imara yenye thamani sawa na dola ya Marekani) na `tokeni1` ni [WETH](https://opensea.io/learn/blockchain/what-is-weth). Thamani tunayoitaka kweli ni idadi ya dola kwa kila WETH, si kinyume chake.

Kipengele cha desimali ni uwiano kati ya [vipengele vya desimali](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) kwa tokeni mbili.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Darasa hili la data linawakilisha nukuu: bei ya mali maalum kwa wakati fulani. Kwa wakati huu, sehemu ya `asset` haina umuhimu kwa sababu tunatumia pool moja na kwa hivyo tuna mali moja. Hata hivyo, tutaongeza mali zaidi baadaye.

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

Kazi hii inachukua anwani na kurudisha taarifa kuhusu mkataba wa tokeni katika anwani hiyo. Ili kuunda [`Contract` mpya ya Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), tunatoa anwani na ABI kwa `w3.eth.contract`.

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

Kazi hii inarudisha kila kitu tunachohitaji kuhusu [pool maalum](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Sintaksia `f"<string>"` ni [kamba iliyoumbizwa](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Pata kitu cha `Quote`. Thamani ya chaguo-msingi kwa `block_number` ni `None` (hakuna thamani).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Ikiwa nambari ya bloku haikubainishwa, tumia `w3.eth.block_number`, ambayo ni nambari ya bloku ya hivi karibuni. Hii ni sintaksia ya [taarifa ya `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Inaweza kuonekana kana kwamba ingekuwa bora kuweka tu chaguo-msingi kuwa `w3.eth.block_number`, lakini hiyo haifanyi kazi vizuri kwa sababu itakuwa nambari ya bloku wakati kazi inafafanuliwa. Katika wakala anayeendeshwa kwa muda mrefu, hili lingekuwa tatizo.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Tumia [maktaba ya `datetime`](https://docs.python.org/3/library/datetime.html) kuiweka katika umbizo linaloweza kusomeka na binadamu na miundo mikubwa ya lugha (LLMs). Tumia [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) kuzungusha thamani hadi sehemu mbili za desimali.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Katika Python unafafanua [orodha](https://docs.python.org/3/library/stdtypes.html#typesseq-list) ambayo inaweza tu kuwa na aina maalum kwa kutumia `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Katika Python [kitanzi cha `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) kwa kawaida hupitia orodha. Orodha ya nambari za bloku za kupata nukuu ndani yake hutoka kwenye [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Kwa kila nambari ya bloku, pata kitu cha `Quote` na ukiongeze kwenye orodha ya `quotes`. Kisha rudisha orodha hiyo.

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

Huu ndio msimbo mkuu wa hati. Soma taarifa ya pool, pata nukuu kumi na mbili, na uzichapishe kwa [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Kuunda kidokezo {#prompt}

Kisha, tunahitaji kubadilisha orodha hii ya nukuu kuwa kidokezo kwa LLM na kupata thamani inayotarajiwa ya siku zijazo.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Matokeo sasa yatakuwa kidokezo kwa LLM, sawa na:

```
Kutokana na nukuu hizi:
Mali: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Mali: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Ungetarajia thamani ya WETH/USDC iwe nini saa 2026-02-02T17:56?

Toa jibu lako kama nambari moja iliyozungushwa hadi sehemu mbili za desimali,
bila maandishi mengine yoyote.
```

Kumbuka kuwa kuna nukuu za mali mbili hapa, `WETH/USDC` na `WBTC/WETH`. Kuongeza nukuu kutoka kwa mali nyingine kunaweza kuboresha usahihi wa utabiri.

#### Jinsi kidokezo kinavyoonekana {#prompt-explanation}

Kidokezo hiki kina sehemu tatu, ambazo ni za kawaida katika vidokezo vya LLM.

1. Taarifa. LLM zina taarifa nyingi kutoka kwa mafunzo yao, lakini kwa kawaida hazina za hivi karibuni. Hii ndiyo sababu tunahitaji kupata nukuu za hivi karibuni hapa. Kuongeza taarifa kwenye kidokezo kunaitwa [kizazi kilichoongezwa kwa urejeshaji (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Swali halisi. Hiki ndicho tunachotaka kujua.

3. Maagizo ya uumbizaji wa matokeo. Kwa kawaida, LLM itatupa makadirio na maelezo ya jinsi ilivyoyafikia. Hii ni bora kwa wanadamu, lakini programu ya kompyuta inahitaji tu mstari wa chini.

#### Maelezo ya msimbo {#prompt-code}

Huu hapa msimbo mpya.

```python
from datetime import datetime, timezone, timedelta
```

Tunahitaji kuipa LLM muda ambao tunataka makadirio yake. Ili kupata muda "dakika/masaa/siku n" katika siku zijazo, tunatumia [darasa la `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Anwani za pools tunazosoma
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Tuna pools mbili tunazohitaji kusoma.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Bloku iko katika siku zijazo"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (tokeni1 kwa kila tokeni0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Katika pool ya WETH/USDC, tunataka kujua ni `tokeni0` (USDC) ngapi tunahitaji kununua `tokeni1` moja (WETH). Katika pool ya WETH/WBTC, tunataka kujua ni `tokeni1` (WETH) ngapi tunahitaji kununua `tokeni0` moja (WBTC, ambayo ni Bitcoin iliyofungwa). Tunahitaji kufuatilia ikiwa uwiano wa pool unahitaji kubadilishwa.

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

Ili kujua kama pool inahitaji kubadilishwa, tunapata hiyo kama ingizo kwa `read_pool`. Pia, alama ya mali inahitaji kuwekwa kwa usahihi.

Sintaksia `<a> if <b> else <c>` ni sawa na [kiendeshaji cha masharti cha ternary](https://en.wikipedia.org/wiki/Ternary_conditional_operator) cha Python, ambacho katika lugha inayotokana na C kingekuwa `<b> ?` <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Mali: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Kazi hii inaunda kamba inayoweka umbizo la orodha ya vitu vya `Quote`, ikidhani vyote vinatumika kwa mali moja.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Katika Python [literali za kamba za mistari mingi](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) huandikwa kama `"""` .... `"""`.

```python
Kutokana na nukuu hizi:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Hapa, tunatumia mfumo wa [MapReduce](https://en.wikipedia.org/wiki/MapReduce) kutengeneza kamba kwa kila orodha ya nukuu na `format_quotes`, kisha tunazipunguza kuwa kamba moja kwa matumizi katika kidokezo.

```python
Ungetarajia thamani ya {asset} iwe nini saa {expected_time}?

Toa jibu lako kama nambari moja iliyozungushwa hadi sehemu mbili za desimali,
bila maandishi mengine yoyote.
    """
```

Sehemu iliyobaki ya kidokezo iko kama inavyotarajiwa.

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

Pitia pools zote mbili na upate nukuu kutoka kwa zote mbili.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Bainisha nukta ya wakati wa siku zijazo ambayo tunataka makadirio, na unda kidokezo.

### Kuunganisha na LLM {#interface-llm}

Kisha, tunatoa kidokezo kwa LLM halisi na kupokea thamani inayotarajiwa ya siku zijazo. Niliandika programu hii kwa kutumia OpenAI, kwa hivyo ikiwa unataka kutumia mtoa huduma tofauti, utahitaji kuirekebisha.

1. Pata [akaunti ya OpenAI](https://auth.openai.com/create-account)

2. [Weka fedha kwenye akaunti](https://platform.openai.com/settings/organization/billing/overview)—kiwango cha chini wakati wa kuandika ni $5

3. [Unda ufunguo wa API](https://platform.openai.com/settings/organization/api-keys)

4. Katika mstari wa amri, safirisha ufunguo wa API ili programu yako iweze kuutumia

   ```sh
   export OPENAI_API_KEY=sk-<sehemu iliyobaki ya ufunguo inaenda hapa>
   ```

5. Kagua na endesha wakala

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Huu hapa msimbo mpya.

```python
from openai import OpenAI

open_ai = OpenAI()  # Wateja husoma kigeugeu cha mazingira cha OPENAI_API_KEY
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

Piga simu API ya OpenAI (`open_ai.chat.completions.create`) kuunda jibu.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Bei ya sasa:", wethusdc_quotes[-1].price)
print(f"Mnamo {future_time}, bei inayotarajiwa: {expected_price} USD")

if (expected_price > current_price):
    print(f"Nunua, ninatarajia bei itapanda kwa {expected_price - current_price} USD")
else:
    print(f"Uza, ninatarajia bei itashuka kwa {current_price - expected_price} USD")
```

Toa bei na toa pendekezo la kununua au kuuza.

#### Kupima utabiri {#testing-the-predictions}

Sasa kwa kuwa tunaweza kutengeneza utabiri, tunaweza pia kutumia data ya kihistoria kutathmini kama tunazalisha utabiri muhimu.

```sh
uv run test-predictor.py
```

Matokeo yanayotarajiwa ni sawa na:

```
Utabiri wa 2026-01-05T19:50: ilitabiriwa 3138.93 USD, halisi 3218.92 USD, kosa 79.99 USD
Utabiri wa 2026-01-06T19:56: ilitabiriwa 3243.39 USD, halisi 3221.08 USD, kosa 22.31 USD
Utabiri wa 2026-01-07T20:02: ilitabiriwa 3223.24 USD, halisi 3146.89 USD, kosa 76.35 USD
Utabiri wa 2026-01-08T20:11: ilitabiriwa 3150.47 USD, halisi 3092.04 USD, kosa 58.43 USD
.
.
.
Utabiri wa 2026-01-31T22:33: ilitabiriwa 2637.73 USD, halisi 2417.77 USD, kosa 219.96 USD
Utabiri wa 2026-02-01T22:41: ilitabiriwa 2381.70 USD, halisi 2318.84 USD, kosa 62.86 USD
Utabiri wa 2026-02-02T22:49: ilitabiriwa 2234.91 USD, halisi 2349.28 USD, kosa 114.37 USD
Kosa la wastani la utabiri juu ya utabiri 29: 83.87103448275862068965517241 USD
Mabadiliko ya wastani kwa kila pendekezo: 4.787931034482758620689655172 USD
Tofauti ya kawaida ya mabadiliko: 104.42 USD
Siku za faida: 51.72%
Siku za hasara: 48.28%
```

Sehemu kubwa ya mpimaji ni sawa na wakala, lakini hapa kuna sehemu ambazo ni mpya au zilizobadilishwa.

```python
CYCLES_FOR_TEST = 40 # Kwa jaribio la nyuma, ni mizunguko mingapi tunayopima

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

Tunaangalia siku `CYCLES_FOR_TEST` (zilizobainishwa kama 40 hapa) zilizopita.

```python
# Unda utabiri na uangalie dhidi ya historia halisi

total_error = Decimal(0)
changes = []
```

Kuna aina mbili za makosa tunayovutiwa nayo. Ya kwanza, `total_error`, ni jumla ya makosa ambayo mtabiri alifanya.

Ili kuelewa ya pili, `changes`, tunahitaji kukumbuka kusudi la wakala. Sio kutabiri uwiano wa WETH/USDC (bei ya ETH). Ni kutoa mapendekezo ya kuuza na kununua. Ikiwa bei kwa sasa ni $2000 na inatabiri $2010 kesho, hatujali ikiwa matokeo halisi ni $2020 na tunapata pesa za ziada. Lakini _tunajali_ ikiwa ilitabiri $2010, na tukanunua ETH kulingana na pendekezo hilo, na bei ikashuka hadi $1990.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Tunaweza tu kuangalia kesi ambapo historia kamili (thamani zilizotumika kwa utabiri na thamani halisi ya kulinganisha nayo) inapatikana. Hii inamaanisha kesi mpya zaidi lazima iwe ile iliyoanza `CYCLES_BACK` iliyopita.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Tumia [slices](https://www.w3schools.com/python/ref_func_slice.asp) kupata idadi sawa ya sampuli kama idadi ambayo wakala hutumia. Msimbo kati ya hapa na sehemu inayofuata ni msimbo uleule wa kupata utabiri tulio nao katika wakala.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Pata bei iliyotabiriwa, bei halisi, na bei wakati wa utabiri. Tunahitaji bei wakati wa utabiri ili kubaini kama pendekezo lilikuwa la kununua au kuuza.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Utabiri wa {prediction_time}: ilitabiriwa {predicted_price} USD, halisi {real_price} USD, kosa {error} USD")
```

Tafuta kosa, na uliongeze kwenye jumla.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Kwa `changes`, tunataka athari ya kifedha ya kununua au kuuza ETH moja. Kwa hivyo kwanza, tunahitaji kubaini pendekezo, kisha tutathmini jinsi bei halisi ilivyobadilika, na kama pendekezo lilileta pesa (mabadiliko chanya) au liligharimu pesa (mabadiliko hasi).

```python
print (f"Kosa la wastani la utabiri juu ya utabiri {len(wethusdc_quotes)-CYCLES_BACK}: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mabadiliko ya wastani kwa kila pendekezo: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Tofauti ya kawaida ya mabadiliko: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Ripoti matokeo.

```python
print (f"Siku za faida: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Siku za hasara: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Tumia [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) kuhesabu idadi ya siku za faida na idadi ya siku za gharama. Matokeo ni kitu cha chujio, ambacho tunahitaji kukibadilisha kuwa orodha ili kupata urefu.

### Kuwasilisha miamala {#submit-txn}

Sasa tunahitaji kuwasilisha miamala. Hata hivyo, sitaki kutumia pesa halisi kwa wakati huu, kabla mfumo haujathibitishwa. Badala yake, tutaunda uma wa ndani wa mtandao mkuu, na "kufanya biashara" kwenye mtandao huo.

Hizi ni hatua za kuunda uma wa ndani na kuwezesha biashara.

1. Sakinisha [Foundry](https://getfoundry.sh/introduction/installation)

2. Anzisha [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` inasikiliza kwenye URL ya chaguo-msingi ya Foundry, http://localhost:8545, kwa hivyo hatuhitaji kubainisha URL kwa [amri ya `cast`](https://getfoundry.sh/cast/overview) tunayotumia kudhibiti mnyororo wa bloku.

3. Wakati wa kuendesha `anvil`, kuna akaunti kumi za majaribio ambazo zina ETH—weka vigeugeu vya mazingira kwa ya kwanza

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Hii ni mikataba tunayohitaji kutumia. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) ni mkataba wa Uniswap v3 tunaotumia kufanya biashara. Tungeweza kufanya biashara moja kwa moja kupitia pool, lakini hii ni rahisi zaidi.

   Vigeugeu viwili vya chini ni njia za Uniswap v3 zinazohitajika kubadilisha kati ya WETH na USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Kila moja ya akaunti za majaribio ina ETH 10,000. Tumia mkataba wa WETH kufunga ETH 1000 ili kupata WETH 1000 kwa biashara.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Tumia `SwapRouter` kubadilisha WETH 500 kwa USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Simu ya `approve` inaunda ruhusa inayoruhusu `SwapRouter` kutumia baadhi ya tokeni zetu. Mikataba haiwezi kufuatilia matukio, kwa hivyo ikiwa tutahamisha tokeni moja kwa moja kwenye mkataba wa `SwapRouter`, haitajua imelipwa. Badala yake, tunaruhusu mkataba wa `SwapRouter` kutumia kiasi fulani, na kisha `SwapRouter` hufanya hivyo. Hii inafanywa kupitia kazi inayoitwa na `SwapRouter`, kwa hivyo inajua kama imefanikiwa.

7. Thibitisha una tokeni za kutosha za aina zote mbili.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Sasa kwa kuwa tuna WETH na USDC, tunaweza kweli kuendesha wakala.

```sh
git checkout 05-trade
uv run agent.py
```

Matokeo yataonekana sawa na:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Bei ya sasa: 1843.16
Mnamo 2026-02-06T23:07, bei inayotarajiwa: 1724.41 USD
Salio za akaunti kabla ya biashara:
Salio la USDC: 927301.578272
Salio la WETH: 500
Uza, ninatarajia bei itashuka kwa 118.75 USD
Muamala wa idhini umetumwa: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Muamala wa idhini umefanikiwa.
Muamala wa uuzaji umetumwa: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Muamala wa uuzaji umefanikiwa.
Salio za akaunti baada ya biashara:
Salio la USDC: 929143.797116
Salio la WETH: 499
```

Ili kuitumia kweli, unahitaji mabadiliko madogo.

- Katika mstari wa 14, badilisha `MAINNET_URL` kuwa sehemu halisi ya ufikiaji, kama vile `https://eth.drpc.org`
- Katika mstari wa 28, badilisha `PRIVATE_KEY` kuwa ufunguo wako binafsi
- Isipokuwa wewe ni tajiri sana na unaweza kununua au kuuza ETH 1 kila siku kwa wakala ambaye hajathibitishwa, unaweza kutaka kubadilisha 29 ili kupunguza `WETH_TRADE_AMOUNT`

#### Maelezo ya msimbo {#trading-code}

Huu hapa msimbo mpya.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Vigeugeu vilevile tulivyotumia katika hatua ya 4.

```python
WETH_TRADE_AMOUNT=1
```

Kiasi cha kufanya biashara.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Ili kufanya biashara kweli, tunahitaji kazi ya `approve`. Pia tunataka kuonyesha salio kabla na baada, kwa hivyo tunahitaji pia `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Katika ABI ya `SwapRouter` tunahitaji tu `exactInput`. Kuna kazi inayohusiana, `exactOutput`, tunaweza kuitumia kununua WETH moja hasa, lakini kwa urahisi tunatumia tu `exactInput` katika visa vyote viwili.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Ufafanuzi wa Web3 kwa [`akaunti`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) na mkataba wa `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Vigezo vya muamala. Tunahitaji kazi hapa kwa sababu [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) lazima ibadilike kila wakati.

```python
def approve_token(contract: Contract, amount: int):
```

Idhinisha ruhusa ya tokeni kwa `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Hivi ndivyo tunavyotuma muamala katika Web3. Kwanza tunatumia [kitu cha `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) kujenga muamala. Kisha tunatumia [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) kusaini muamala, kwa kutumia `PRIVATE_KEY`. Mwisho, tunatumia [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) kutuma muamala.

```python
    print(f"Muamala wa idhini umetumwa: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Muamala wa idhini umefanikiwa.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) husubiri hadi muamala utakapofanikiwa. Inarudisha risiti ikihitajika.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Hizi ni vigezo wakati wa kuuza WETH.

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

Tofauti na `SELL_PARAMS`, vigezo vya ununuzi vinaweza kubadilika. Kiasi cha ingizo ni gharama ya WETH 1, kama inavyopatikana katika `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Muamala wa ununuzi umetumwa: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Muamala wa ununuzi umefanikiwa.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Muamala wa uuzaji umetumwa: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Muamala wa uuzaji umefanikiwa.")
```

Kazi za `buy()` na `sell()` karibu zinafanana. Kwanza tunakubali ruhusa ya kutosha kwa `SwapRouter`, na kisha tunaipiga simu kwa njia na kiasi sahihi.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Salio: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Salio: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Ripoti salio la mtumiaji katika sarafu zote mbili.

```python
print("Salio za akaunti kabla ya biashara:")
balances()

if (expected_price > current_price):
    print(f"Nunua, ninatarajia bei itapanda kwa {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Uza, ninatarajia bei itashuka kwa {current_price - expected_price} USD")
    sell()

print("Salio za akaunti baada ya biashara:")
balances()
```

Wakala huyu kwa sasa anafanya kazi mara moja tu. Hata hivyo, unaweza kuibadilisha ifanye kazi mfululizo ama kwa kuiendesha kutoka [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) au kwa kufunga mistari 368-400 katika kitanzi na kutumia [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) kusubiri hadi iwe wakati wa mzunguko unaofuata.

## Maboresho yanayowezekana {#improvements}

Hili si toleo kamili la uzalishaji; ni mfano tu wa kufundisha misingi. Hapa kuna maoni kadhaa ya maboresho.

### Biashara yenye akili zaidi {#smart-trading}

Kuna ukweli mbili muhimu ambazo wakala anapuuza wakati wa kuamua nini cha kufanya.

- _Ukubwa wa mabadiliko yanayotarajiwa_. Wakala anauza kiasi kisichobadilika cha `WETH` ikiwa bei inatarajiwa kushuka, bila kujali ukubwa wa kushuka.
  Inaweza kusemwa, ingekuwa bora kupuuza mabadiliko madogo na kuuza kulingana na kiasi gani tunatarajia bei itashuka.
- _Kwingineko ya sasa_. Ikiwa 10% ya kwingineko yako iko katika WETH na unafikiri bei itapanda, labda ina maana kununua zaidi. Lakini ikiwa 90% ya kwingineko yako iko katika WETH, unaweza kuwa umejifunua vya kutosha, na hakuna haja ya kununua zaidi. Kinyume chake ni kweli ikiwa unatarajia bei itashuka.

### Vipi ikiwa unataka kuweka mkakati wako wa biashara kuwa siri? {#secret}

Wachuuzi wa AI wanaweza kuona maswali unayotuma kwa LLM zao, ambayo inaweza kufichua mfumo wa biashara wa kitaalam uliouendeleza na wakala wako. Mfumo wa biashara ambao watu wengi sana hutumia hauna thamani kwa sababu watu wengi sana hujaribu kununua wakati unapotaka kununua (na bei inapanda) na kujaribu kuuza wakati unapotaka kuuza (na bei inashuka).

Unaweza kuendesha LLM ndani ya nchi, kwa mfano, kwa kutumia [LM-Studio](https://lmstudio.ai/), ili kuepuka tatizo hili.

### Kutoka kwa boti ya AI hadi wakala wa AI {#bot-to-agent}

Unaweza kutoa hoja nzuri kwamba hii ni [boti ya AI, si wakala wa AI](/ai-agents/#ai-agents-vs-ai-bots). Inatekeleza mkakati rahisi ambao unategemea taarifa zilizofafanuliwa awali. Tunaweza kuwezesha uboreshaji wa kibinafsi, kwa mfano, kwa kutoa orodha ya pools za Uniswap v3 na thamani zao za hivi karibuni na kuuliza ni mchanganyiko gani una thamani bora ya utabiri.

### Ulinzi wa slippage {#slippage-protection}

Kwa sasa hakuna [ulinzi wa slippage](https://uniswapv3book.com/milestone_3/slippage-protection.html). Ikiwa nukuu ya sasa ni $2000, na bei inayotarajiwa ni $2100, wakala atanunua. Hata hivyo, ikiwa kabla wakala hajanunua gharama itapanda hadi $2200, haina maana kununua tena.

Ili kutekeleza ulinzi wa slippage, bainisha thamani ya `amountOutMinimum` katika mistari ya 325 na 334 ya [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Hitimisho {#conclusion}

Tunatumai, sasa unajua vya kutosha kuanza na wakala wa AI. Huu si muhtasari kamili wa somo; kuna vitabu vizima vilivyojitolea kwa hilo, lakini hii inatosha kukuanzisha. Kila la kheri!

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
