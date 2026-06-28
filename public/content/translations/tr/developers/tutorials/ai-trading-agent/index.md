---
title: "Ethereum üzerinde kendi yapay zeka alım satım ajanınızı yapın"
description: "Bu eğitimde basit bir yapay zeka alım satım ajanı yapmayı öğreneceksiniz. Bu ajan, Blokzincir'den bilgi okur, bu bilgiye dayanarak bir YDM'den (Büyük Dil Modeli) tavsiye ister, YDM'nin önerdiği alım satımı gerçekleştirir ve ardından bekleyip tekrarlar."
author: Ori Pomerantz
tags: ["yapay zeka", "alım satım", "ajan", "Python"]
skill: intermediate
breadcrumb: "Yapay zeka alım satım ajanı"
published: 2026-02-13
lang: tr
sidebarDepth: 3
---

Bu eğitimde basit bir yapay zeka alım satım ajanı oluşturmayı öğreneceksiniz. Bu ajan şu adımları kullanarak çalışır:

1. Bir Token'ın mevcut ve geçmiş fiyatlarının yanı sıra potansiyel olarak ilgili diğer bilgileri okumak
2. Bu bilgilerle ve bunların nasıl ilgili olabileceğini açıklayan arka plan bilgileriyle bir sorgu oluşturmak
3. Sorguyu göndermek ve öngörülen bir fiyatı geri almak
4. Tavsiyeye dayalı olarak alım satım yapmak
5. Beklemek ve tekrarlamak

Bu ajan, bilgilerin nasıl okunacağını, kullanılabilir bir yanıt veren bir sorguya nasıl dönüştürüleceğini ve bu yanıtın nasıl kullanılacağını gösterir. Bunların hepsi bir yapay zeka ajanı için gerekli adımlardır. Bu ajan Python'da uygulanmıştır çünkü yapay zekada kullanılan en yaygın dildir.

## Neden bunu yapmalısınız? {#why-do-this}

Otomatik alım satım ajanları, geliştiricilerin bir alım satım stratejisi seçmesine ve yürütmesine olanak tanır. [Yapay zeka ajanları](/ai-agents), geliştiricinin kullanmayı düşünmediği bilgi ve algoritmaları potansiyel olarak kullanarak daha karmaşık ve dinamik alım satım stratejilerine olanak tanır.

## Araçlar {#tools}

Bu eğitim, fiyat teklifleri ve alım satım için [Python](https://www.python.org/), [Web3 Kütüphanesi](https://web3py.readthedocs.io/en/stable/) ve [Uniswap v3](https://github.com/Uniswap/v3-periphery) kullanır.

### Neden Python? {#python}

Yapay zeka için en yaygın kullanılan dil [Python](https://www.python.org/)'dır, bu yüzden burada onu kullanıyoruz. Python bilmiyorsanız endişelenmeyin. Dil çok açıktır ve tam olarak ne yaptığını açıklayacağım.

[Web3 Kütüphanesi](https://web3py.readthedocs.io/en/stable/), en yaygın Python Ethereum API'sidir. Kullanımı oldukça kolaydır.

### Blokzincir üzerinde alım satım {#trading-on-blockchain}

Ethereum üzerinde Token alım satımı yapmanızı sağlayan [birçok merkeziyetsiz borsa (DEX)](/apps/categories/defi/) vardır. Ancak, [arbitraj](/developers/docs/smart-contracts/composability/#better-user-experience) nedeniyle benzer döviz kurlarına sahip olma eğilimindedirler.

[Uniswap](https://app.uniswap.org/), hem fiyat teklifleri (Token'ların göreceli değerlerini görmek için) hem de alım satımlar için kullanabileceğimiz yaygın olarak kullanılan bir DEX'tir.

### OpenAI {#openai}

Büyük bir dil modeli (LLM) için [OpenAI](https://openai.com/) ile başlamayı seçtim. Bu eğitimdeki uygulamayı çalıştırmak için API erişimi için ödeme yapmanız gerekecektir. Minimum 5 dolarlık ödeme fazlasıyla yeterlidir.

## Adım adım geliştirme {#step-by-step}

Geliştirmeyi basitleştirmek için aşamalar halinde ilerliyoruz. Her adım GitHub'da bir daldır.

### Başlarken {#getting-started}

UNIX veya Linux ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install) dahil) altında başlamak için adımlar şunlardır:

1. Henüz sahip değilseniz, [Python](https://www.python.org/downloads/)'ı indirin ve kurun.

2. GitHub deposunu klonlayın.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) kurun. Sisteminizdeki komut farklı olabilir.

   ```sh
   pipx install uv
   ```

4. Kütüphaneleri indirin.

   ```sh
   uv sync
   ```

5. Sanal ortamı etkinleştirin.

   ```sh
   source .venv/bin/activate
   ```

6. Python ve Web3'ün doğru çalıştığını doğrulamak için `python3` çalıştırın ve ona bu programı sağlayın. Bunu `>>>` isteminde girebilirsiniz; bir dosya oluşturmanıza gerek yoktur.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Blokzincirden okuma {#read-blockchain}

Bir sonraki adım Blokzincir'den okumaktır. Bunu yapmak için `02-read-quote` dalına geçmeniz ve ardından programı çalıştırmak için `uv` kullanmanız gerekir.

```sh
git checkout 02-read-quote
uv run agent.py
```

Her biri bir zaman damgası, bir fiyat ve varlık (şu anda her zaman `WETH/USDC`) içeren bir `Quote` nesneleri listesi almalısınız.

İşte satır satır bir açıklama.

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

İhtiyacımız olan kütüphaneleri içe aktarın. Bunlar kullanıldıklarında aşağıda açıklanmıştır.

```python
print = functools.partial(print, flush=True)
```

Python'un `print` işlevini, çıktıyı her zaman anında temizleyen bir sürümle değiştirir. Bu, uzun süre çalışan bir betikte kullanışlıdır çünkü durum güncellemelerini veya hata ayıklama çıktılarını beklemek istemeyiz.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Ana Ağ'a ulaşmak için bir URL. [Hizmet olarak Düğüm](/developers/docs/nodes-and-clients/nodes-as-a-service/) sağlayıcılarından bir tane alabilir veya [Chainlist](https://chainlist.org/chain/1)'te tanıtılanlardan birini kullanabilirsiniz.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Bir Ethereum Ana Ağı bloğu tipik olarak her on iki saniyede bir gerçekleşir, bu nedenle bunlar bir zaman diliminde gerçekleşmesini beklediğimiz Blok sayısıdır. Bunun kesin bir rakam olmadığını unutmayın. [Blok teklifçisi](/developers/docs/consensus-mechanisms/pos/block-proposal/) çöktüğünde, o Blok atlanır ve bir sonraki Blok için süre 24 saniyedir. Bir zaman damgası için tam bloğu almak isteseydik, [ikili arama (binary search)](https://en.wikipedia.org/wiki/Binary_search) kullanırdık. Ancak, bu bizim amaçlarımız için yeterince yakındır. Geleceği tahmin etmek kesin bir bilim değildir.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Döngünün boyutu. Fiyat tekliflerini her döngüde bir kez inceliyoruz ve bir sonraki döngünün sonundaki değeri tahmin etmeye çalışıyoruz.

```python
# Okuduğumuz havuzun adresi
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Fiyat teklifi değerleri, [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) Adresindeki Uniswap 3 USDC/WETH havuzundan alınır. Bu Adres zaten sağlama toplamı (checksum) formundadır, ancak kodu yeniden kullanılabilir hale getirmek için [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) kullanmak daha iyidir.

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

Bunlar, iletişim kurmamız gereken iki Sözleşme için [ABI'lerdir](https://docs.soliditylang.org/en/latest/abi-spec.html). Kodu kısa tutmak için yalnızca çağırmamız gereken işlevleri dahil ediyoruz.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) Kütüphanesini başlatın ve bir Ethereum Düğümüne bağlanın.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Bu, Python'da bir veri sınıfı oluşturmanın bir yoludur. [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) veri türü, Sözleşmeye bağlanmak için kullanılır. `(frozen=True)` kısmına dikkat edin. Python'da [boole değerleri](https://en.wikipedia.org/wiki/Boolean_data_type) büyük harfle `True` veya `False` olarak tanımlanır. Bu veri sınıfı `frozen` olarak ayarlanmıştır, yani alanlar değiştirilemez.

Girintiye dikkat edin. [C türevi dillerin](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) aksine, Python blokları belirtmek için girinti kullanır. Python yorumlayıcısı, aşağıdaki tanımın bu veri sınıfının bir parçası olmadığını bilir çünkü veri sınıfı alanlarıyla aynı girintide başlamaz.

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) türü, ondalık kesirleri doğru bir şekilde işlemek için kullanılır.

```python
    def get_price(self, block: int) -> Decimal:
```

Bu, Python'da bir işlev tanımlamanın yoludur. Tanım, hala `PoolInfo` sınıfının bir parçası olduğunu göstermek için girintilidir.

Bir veri sınıfının parçası olan bir işlevde ilk parametre her zaman `self`'dir, yani burayı çağıran veri sınıfı örneğidir. Burada başka bir parametre daha var, Blok numarası.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Geleceği okuyabilseydik, alım satım için yapay zekaya ihtiyacımız olmazdı.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3'ten EVM üzerinde bir işlev çağırmanın sözdizimi şudur: `<contract object>.functions.<function name>().call(<parameters>)`. Parametreler, EVM işlevinin parametreleri (varsa; burada yok) veya Blokzincir davranışını değiştirmek için [adlandırılmış parametreler](https://en.wikipedia.org/wiki/Named_parameter) olabilir. Burada, çalışmak istediğimiz [Blok numarasını](/developers/docs/apis/json-rpc/#default-block) belirtmek için `block_identifier` kullanıyoruz.

Sonuç, [dizi formundaki bu yapıdır (struct)](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). İlk değer, iki Token arasındaki döviz kurunun bir işlevidir.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Zincir içi hesaplamaları azaltmak için Uniswap v3, gerçek değişim faktörünü değil, onun karekökünü depolar. EVM kayan nokta matematiğini veya kesirleri desteklemediğinden, gerçek değer yerine yanıt şudur: <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token0 başına token1)
        return 1/(raw_price * self.decimal_factor)
```

Aldığımız ham fiyat, her bir `token1` için aldığımız `token0` miktarıdır. Havuzumuzda `token0` USDC'dir (bir ABD doları ile aynı değere sahip sabitcoin) ve `token1` [WETH](https://opensea.io/learn/blockchain/what-is-weth)'dir. Gerçekte istediğimiz değer, WETH başına düşen dolar miktarıdır, tersi değil.

Ondalık faktör, iki Token için [ondalık faktörler](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) arasındaki orandır.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Bu veri sınıfı bir fiyat teklifini temsil eder: belirli bir varlığın belirli bir zamandaki fiyatı. Bu noktada, `asset` alanı alakasızdır çünkü tek bir havuz kullanıyoruz ve bu nedenle tek bir varlığımız var. Ancak, daha sonra daha fazla varlık ekleyeceğiz.

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

Bu işlev bir Adres alır ve o Adresteki Token Sözleşmesi hakkında bilgi döndürür. Yeni bir [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) oluşturmak için, Adresi ve ABI'yi `w3.eth.contract`'a sağlarız.

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

Bu işlev, [belirli bir havuz](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) hakkında ihtiyacımız olan her şeyi döndürür. `f"<string>"` sözdizimi [biçimlendirilmiş bir dizedir](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Bir `Quote` nesnesi alın. `block_number` için varsayılan değer `None`'dir (değer yok).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Bir Blok numarası belirtilmemişse, en son Blok numarası olan `w3.eth.block_number` kullanın. Bu, [bir `if` ifadesi](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) için sözdizimidir.

Varsayılanı sadece `w3.eth.block_number` olarak ayarlamak daha iyi olurmuş gibi görünebilir, ancak bu iyi çalışmaz çünkü işlevin tanımlandığı andaki Blok numarası olurdu. Uzun süre çalışan bir ajanda bu bir sorun olurdu.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

İnsanlar ve büyük dil modelleri (YDM'ler) için okunabilir bir biçime dönüştürmek üzere [`datetime` Kütüphanesini](https://docs.python.org/3/library/datetime.html) kullanın. Değeri iki ondalık basamağa yuvarlamak için [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) kullanın.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python'da, `list[<type>]` kullanarak yalnızca belirli bir türü içerebilen bir [liste](https://docs.python.org/3/library/stdtypes.html#typesseq-list) tanımlarsınız.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python'da bir [`for` döngüsü](https://docs.python.org/3/tutorial/controlflow.html#for-statements) tipik olarak bir liste üzerinde yinelenir. Fiyat tekliflerini bulmak için Blok numaralarının listesi [`range`](https://docs.python.org/3/library/stdtypes.html#range)'dan gelir.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Her Blok numarası için bir `Quote` nesnesi alın ve bunu `quotes` listesine ekleyin. Ardından bu listeyi döndürün.

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

Bu, betiğin ana kodudur. Havuz bilgilerini okuyun, on iki fiyat teklifi alın ve bunları [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) ile yazdırın.

### Bir istem oluşturma {#prompt}

Ardından, bu fiyat teklifleri listesini bir YDM için bir isteme dönüştürmemiz ve beklenen bir gelecek değeri elde etmemiz gerekiyor.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Çıktı artık bir YDM'ye yönelik, şuna benzer bir istem olacaktır:

```
Bu fiyat teklifleri göz önüne alındığında:
Varlık: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Varlık: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


2026-02-02T17:56 zamanında WETH/USDC değerinin ne olmasını beklersiniz?

Cevabınızı başka hiçbir metin olmadan, iki ondalık basamağa yuvarlanmış
tek bir sayı olarak verin.
```

Burada iki varlık için fiyat teklifleri olduğuna dikkat edin: `WETH/USDC` ve `WBTC/WETH`. Başka bir varlıktan fiyat teklifleri eklemek tahmin doğruluğunu artırabilir.

#### Bir istem neye benzer {#prompt-explanation}

Bu istem, YDM istemlerinde oldukça yaygın olan üç bölüm içerir.

1. Bilgi. YDM'ler eğitimlerinden elde ettikleri pek çok bilgiye sahiptir, ancak genellikle en güncel bilgilere sahip değillerdir. Burada en son fiyat tekliflerini almamızın nedeni budur. Bir isteme bilgi eklemeye [geri getirmeyle artırılmış üretim (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) denir.

2. Asıl soru. Bilmek istediğimiz şey budur.

3. Çıktı biçimlendirme talimatları. Normalde, bir YDM bize bu tahmine nasıl ulaştığına dair bir açıklama ile birlikte bir tahmin verecektir. Bu insanlar için daha iyidir, ancak bir bilgisayar programının sadece sonuca ihtiyacı vardır.

#### Kod açıklaması {#prompt-code}

İşte yeni kod.

```python
from datetime import datetime, timezone, timedelta
```

YDM'ye tahmin istediğimiz zamanı sağlamamız gerekir. Gelecekte "n dakika/saat/gün" olan bir zamanı elde etmek için [`timedelta` sınıfını](https://docs.python.org/3/library/datetime.html#datetime.timedelta) kullanırız.

```python
# Okuduğumuz havuzların adresleri
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Okumamız gereken iki havuzumuz var.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token0 başına token1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC havuzunda, bir `token1` (WETH) satın almak için kaç tane `token0` (USDC) gerektiğini bilmek istiyoruz. WETH/WBTC havuzunda, bir `token0` (WBTC, yani sarılmış Bitcoin) satın almak için kaç tane `token1` (WETH) gerektiğini bilmek istiyoruz. Havuzun oranının tersine çevrilmesi gerekip gerekmediğini takip etmeliyiz.

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

Bir havuzun tersine çevrilmesi gerekip gerekmediğini bilmek için, bunu `read_pool`'ye girdi olarak almalıyız. Ayrıca, varlık sembolünün doğru ayarlanması gerekir.

`<a> if <b> else <c>` sözdizimi, C türevi bir dilde `<b> ? <a> : <c>` olacak olan [üçlü koşullu operatörün (ternary conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) Python'daki karşılığıdır.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Bu işlev, hepsinin aynı varlık için geçerli olduğunu varsayarak bir `Quote` nesneleri listesini biçimlendiren bir dize oluşturur.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python'da [çok satırlı dize değişmezleri](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... `"""` olarak yazılır.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Burada, `format_quotes` ile her fiyat teklifi listesi için bir dize oluşturmak üzere [MapReduce](https://en.wikipedia.org/wiki/MapReduce) modelini kullanıyoruz, ardından bunları istemde kullanmak üzere tek bir dizeye indirgiyoruz.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

İstemin geri kalanı beklendiği gibidir.

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

İki havuzu inceleyin ve her ikisinden de fiyat teklifleri alın.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Tahmini istediğimiz gelecekteki zaman noktasını belirleyin ve istemi oluşturun.

### Bir YDM ile arayüz oluşturma {#interface-llm}

Ardından, gerçek bir YDM'ye istem göndeririz ve beklenen bir gelecek değeri alırız. Bu programı OpenAI kullanarak yazdım, bu nedenle farklı bir sağlayıcı kullanmak isterseniz onu ayarlamanız gerekecektir.

1. Bir [OpenAI hesabı](https://auth.openai.com/create-account) edinin
2. [Hesaba para yatırın](https://platform.openai.com/settings/organization/billing/overview)—yazının yazıldığı sıradaki minimum tutar 5 dolardır
3. [Bir API anahtarı oluşturun](https://platform.openai.com/settings/organization/api-keys)
4. Komut satırında, programınızın kullanabilmesi için API anahtarını dışa aktarın

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Ajanı kontrol edin ve çalıştırın

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

İşte yeni kod.

```python
from openai import OpenAI

open_ai = OpenAI()  # İstemci, OPENAI_API_KEY ortam değişkenini okur
```

OpenAI API'sini içe aktarın ve örneğini oluşturun.

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

Yanıtı oluşturmak için OpenAI API'sini (`open_ai.chat.completions.create`) çağırın.

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

Fiyatı çıktı olarak verin ve bir alım veya satım tavsiyesi sağlayın.

#### Tahminleri test etme {#testing-the-predictions}

Artık tahminler üretebildiğimize göre, yararlı tahminler üretip üretmediğimizi değerlendirmek için geçmiş verileri de kullanabiliriz.

```sh
uv run test-predictor.py
```

Beklenen sonuç şuna benzer:

```
2026-01-05T19:50 için tahmin: tahmin edilen 3138.93 USD, gerçek 3218.92 USD, hata 79.99 USD
2026-01-06T19:56 için tahmin: tahmin edilen 3243.39 USD, gerçek 3221.08 USD, hata 22.31 USD
2026-01-07T20:02 için tahmin: tahmin edilen 3223.24 USD, gerçek 3146.89 USD, hata 76.35 USD
2026-01-08T20:11 için tahmin: tahmin edilen 3150.47 USD, gerçek 3092.04 USD, hata 58.43 USD
.
.
.
2026-01-31T22:33 için tahmin: tahmin edilen 2637.73 USD, gerçek 2417.77 USD, hata 219.96 USD
2026-02-01T22:41 için tahmin: tahmin edilen 2381.70 USD, gerçek 2318.84 USD, hata 62.86 USD
2026-02-02T22:49 için tahmin: tahmin edilen 2234.91 USD, gerçek 2349.28 USD, hata 114.37 USD
29 tahmin üzerinden ortalama tahmin hatası: 83.87103448275862068965517241 USD
Tavsiye başına ortalama değişim: 4.787931034482758620689655172 USD
Değişimlerin standart varyansı: 104.42 USD
Kârlı günler: 51.72%
Kayıplı günler: 48.28%
```

Test edicinin çoğu ajanla aynıdır, ancak işte yeni veya değiştirilmiş olan kısımlar.

```python
CYCLES_FOR_TEST = 40 # Geriye dönük test için, kaç döngü boyunca test yapacağımız

# Çok sayıda fiyat teklifi al
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

`CYCLES_FOR_TEST` (burada 40 olarak belirtilmiştir) gün geriye bakıyoruz.

```python
# Tahminler oluştur ve bunları gerçek geçmişle karşılaştır

total_error = Decimal(0)
changes = []
```

İlgilendiğimiz iki tür hata vardır. İlki, `total_error`, basitçe tahmin edicinin yaptığı hataların toplamıdır.

İkincisini, `changes`'yi anlamak için ajanın amacını hatırlamamız gerekir. Amacı WETH/USDC oranını (ETH fiyatı) tahmin etmek değildir. Alım ve satım tavsiyeleri vermektir. Fiyat şu anda 2000$ ise ve yarın 2010$ olacağını tahmin ediyorsa, gerçek sonuç 2020$ olursa ve ekstra para kazanırsak bunu umursamayız. Ancak 2010$ tahmin edip bu tavsiyeye dayanarak ETH satın aldıysa ve fiyat 1990$'a düşerse bunu _umursarız_.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Yalnızca tam geçmişin (tahmin için kullanılan değerler ve karşılaştırılacak gerçek dünya değeri) mevcut olduğu durumlara bakabiliriz. Bu, en yeni durumun `CYCLES_BACK` önce başlayan durum olması gerektiği anlamına gelir.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Ajanın kullandığı sayıyla aynı sayıda örnek elde etmek için [dilimleri (slices)](https://www.w3schools.com/python/ref_func_slice.asp) kullanın. Burası ile bir sonraki bölüm arasındaki kod, ajanda sahip olduğumuz tahmin alma kodunun aynısıdır.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Tahmin edilen fiyatı, gerçek fiyatı ve tahmin anındaki fiyatı alın. Tavsiyenin alım mı yoksa satım mı olduğunu belirlemek için tahmin anındaki fiyata ihtiyacımız var.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Hatayı hesaplayın ve toplama ekleyin.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` için, bir ETH almanın veya satmanın parasal etkisini istiyoruz. Bu yüzden önce tavsiyeyi belirlememiz, ardından gerçek fiyatın nasıl değiştiğini ve tavsiyenin para kazandırıp kazandırmadığını (pozitif değişim) veya para kaybettirip kaybettirmediğini (negatif değişim) değerlendirmemiz gerekir.

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Sonuçları raporlayın.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Kârlı günlerin sayısını ve maliyetli günlerin sayısını saymak için [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) kullanın. Sonuç, uzunluğunu elde etmek için bir listeye dönüştürmemiz gereken bir filtre nesnesidir.

### İşlemleri gönderme {#submit-txn}

Şimdi gerçekten işlemleri göndermemiz gerekiyor. Ancak, sistem kanıtlanmadan önce bu noktada gerçek para harcamak istemiyorum. Bunun yerine, Ana Ağ'ın yerel bir çatallanmasını oluşturacağız ve o ağ üzerinde "alım satım" yapacağız.

Yerel bir çatallanma oluşturma ve alım satımı etkinleştirme adımları şunlardır.

1. [Foundry](https://getfoundry.sh/introduction/installation) kurun

2. [`anvil`](https://getfoundry.sh/anvil/overview) başlatın

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil`, Foundry için varsayılan URL olan http://localhost:8545 üzerinde dinliyor, bu nedenle Blokzincir'i manipüle etmek için kullandığımız [`cast` komutu](https://getfoundry.sh/cast/overview) için URL'yi belirtmemize gerek yoktur.

3. `anvil` içinde çalışırken, ETH'ye sahip on test Hesabı vardır—ilki için ortam değişkenlerini ayarlayın

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Bunlar kullanmamız gereken Sözleşmelerdir. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol), gerçekten alım satım yapmak için kullandığımız Uniswap v3 Sözleşmesidir. Doğrudan havuz üzerinden alım satım yapabilirdik, ancak bu çok daha kolaydır.

   Alttaki iki değişken, WETH ve USDC arasında takas yapmak için gereken Uniswap v3 yollarıdır.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Test Hesaplarının her birinde 10.000 ETH vardır. Alım satım için 1000 WETH elde etmek üzere 1000 ETH'yi sarmak için WETH Sözleşmesini kullanın.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 500 WETH'yi USDC ile takas etmek için `SwapRouter` kullanın.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` çağrısı, `SwapRouter`'ın Token'larımızın bir kısmını harcamasına izin veren bir harcama izni oluşturur. Sözleşmeler olayları izleyemez, bu nedenle Token'ları doğrudan `SwapRouter` Sözleşmesine transfer edersek, ödendiğini bilemez. Bunun yerine, `SwapRouter` Sözleşmesinin belirli bir miktar harcamasına izin veririz ve ardından `SwapRouter` bunu yapar. Bu, `SwapRouter` tarafından çağrılan bir işlev aracılığıyla yapılır, böylece başarılı olup olmadığını bilir.

7. Her iki Token'dan da yeterince sahip olduğunuzu doğrulayın.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Artık WETH ve USDC'ye sahip olduğumuza göre, ajanı gerçekten çalıştırabiliriz.

```sh
git checkout 05-trade
uv run agent.py
```

Çıktı şuna benzer olacaktır:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Mevcut fiyat: 1843.16
2026-02-06T23:07'de beklenen fiyat: 1724.41 USD
İşlem öncesi Hesap bakiyeleri:
USDC Bakiyesi: 927301.578272
WETH Bakiyesi: 500
Sat, fiyatın 118.75 USD düşmesini bekliyorum
Onaylama işlemi gönderildi: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Onaylama işlemi kazıldı.
Satış işlemi gönderildi: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Satış işlemi kazıldı.
İşlem sonrası Hesap bakiyeleri:
USDC Bakiyesi: 929143.797116
WETH Bakiyesi: 499
```

Gerçekten kullanmak için birkaç küçük değişikliğe ihtiyacınız var.

- 14. satırda, `MAINNET_URL`'yi `https://eth.drpc.org` gibi gerçek bir erişim noktasıyla değiştirin
- 28. satırda, `PRIVATE_KEY`'ü kendi özel anahtarınızla değiştirin
- Çok zengin değilseniz ve kanıtlanmamış bir ajan için her gün 1 ETH alıp satamıyorsanız, `WETH_TRADE_AMOUNT` miktarını azaltmak için 29'u değiştirmek isteyebilirsiniz

#### Kod açıklaması {#trading-code}

İşte yeni kod.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

4. adımda kullandığımız aynı değişkenler.

```python
WETH_TRADE_AMOUNT=1
```

Alım satım yapılacak miktar.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Gerçekten alım satım yapmak için `approve` işlevine ihtiyacımız var. Ayrıca öncesi ve sonrası bakiyeleri de göstermek istiyoruz, bu yüzden `balanceOf`'ye de ihtiyacımız var.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI'sinde sadece `exactInput`'a ihtiyacımız var. Tam olarak bir WETH satın almak için kullanabileceğimiz ilgili bir işlev olan `exactOutput` vardır, ancak basitlik için her iki durumda da sadece `exactInput` kullanıyoruz.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) ve `SwapRouter` Sözleşmesi için Web3 tanımları.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

İşlem parametreleri. Burada bir işleve ihtiyacımız var çünkü [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) her seferinde değişmelidir.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` için bir Token harcama iznini onaylayın.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3'te bir işlemi bu şekilde göndeririz. Önce işlemi oluşturmak için [`Contract` nesnesini](https://web3py.readthedocs.io/en/stable/web3.contract.html) kullanırız. Ardından, `PRIVATE_KEY` kullanarak işlemi imzalamak için [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) kullanırız. Son olarak, işlemi göndermek için [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) kullanırız.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt), işlem kazılana kadar bekler. Gerekirse makbuzu döndürür.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Bunlar WETH satarken kullanılan parametrelerdir.

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

`SELL_PARAMS`'nın aksine, alım parametreleri değişebilir. Girdi miktarı, `quote` içinde mevcut olduğu gibi 1 WETH'nin maliyetidir.

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

`buy()` ve `sell()` işlevleri neredeyse aynıdır. Önce `SwapRouter` için yeterli bir harcama iznini onaylarız ve ardından onu doğru yol ve miktarla çağırırız.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Her iki para biriminde de kullanıcı bakiyelerini raporlayın.

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

Bu ajan şu anda yalnızca bir kez çalışır. Ancak, onu [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) üzerinden çalıştırarak veya 368-400 satırlarını bir döngüye sarıp bir sonraki döngü zamanı gelene kadar beklemek için [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) kullanarak sürekli çalışacak şekilde değiştirebilirsiniz.

## Olası iyileştirmeler {#improvements}

Bu tam bir üretim sürümü değildir; sadece temelleri öğretmek için bir örnektir. İşte iyileştirmeler için bazı fikirler.

### Daha akıllı alım satım {#smart-trading}

Ajanın ne yapacağına karar verirken göz ardı ettiği iki önemli gerçek vardır.

- _Beklenen değişimin büyüklüğü_. Ajan, düşüşün büyüklüğünden bağımsız olarak, fiyatın düşmesi bekleniyorsa sabit miktarda `WETH` satar.
  Muhtemelen, küçük değişiklikleri göz ardı etmek ve fiyatın ne kadar düşmesini beklediğimize bağlı olarak satmak daha iyi olacaktır.
- _Mevcut portföy_. Portföyünüzün %10'u WETH'de ise ve fiyatın artacağını düşünüyorsanız, muhtemelen daha fazla satın almak mantıklıdır. Ancak portföyünüzün %90'ı WETH'de ise, yeterince maruz kalmış olabilirsiniz ve daha fazla satın almanıza gerek yoktur. Fiyatın düşmesini bekliyorsanız bunun tersi geçerlidir.

### Ya alım satım stratejinizi gizli tutmak isterseniz? {#secret}

Yapay zeka satıcıları, YDM'lerine gönderdiğiniz sorguları görebilir, bu da ajanınızla geliştirdiğiniz dahi alım satım sistemini açığa çıkarabilir. Çok fazla kişinin kullandığı bir alım satım sistemi değersizdir çünkü siz satın almak istediğinizde çok fazla kişi satın almaya çalışır (ve fiyat yükselir) ve siz satmak istediğinizde satmaya çalışır (ve fiyat düşer).

Bu sorunu önlemek için, örneğin [LM-Studio](https://lmstudio.ai/) kullanarak bir YDM'yi yerel olarak çalıştırabilirsiniz.

### Yapay zeka botundan yapay zeka ajanına {#bot-to-agent}

Bunun [bir yapay zeka ajanı değil, bir yapay zeka botu](/ai-agents/#ai-agents-vs-ai-bots) olduğuna dair iyi bir argüman sunabilirsiniz. Önceden tanımlanmış bilgilere dayanan nispeten basit bir strateji uygular. Örneğin, Uniswap v3 havuzlarının bir listesini ve en son değerlerini sağlayarak ve hangi kombinasyonun en iyi tahmin değerine sahip olduğunu sorarak kendi kendini geliştirmeyi etkinleştirebiliriz.

### Fiyat kayması koruması {#slippage-protection}

Şu anda [fiyat kayması koruması](https://uniswapv3book.com/milestone_3/slippage-protection.html) yoktur. Mevcut fiyat teklifi 2000$ ise ve beklenen fiyat 2100$ ise, ajan satın alacaktır. Ancak, ajan satın almadan önce maliyet 2200$'a yükselirse, artık satın almanın bir anlamı kalmaz.

Fiyat kayması korumasını uygulamak için, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) dosyasının 325 ve 334. satırlarında bir `amountOutMinimum` değeri belirtin.

## Sonuç {#conclusion}

Umarım artık yapay zeka ajanlarına başlamak için yeterince şey biliyorsunuzdur. Bu, konunun kapsamlı bir özeti değildir; buna adanmış koca kitaplar vardır, ancak bu başlamanız için yeterlidir. İyi şanslar!

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).