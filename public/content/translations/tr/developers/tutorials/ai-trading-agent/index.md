---
title: "Ethereum üzerinde kendi yapay zeka alım satım aracınızı oluşturun"
description: "Bu öğreticide, basit bir yapay zeka alım satım aracısı yapmayı öğreneceksiniz. Bu aracı, blokzincirden bilgileri okur, bu bilgilere dayanarak bir LLM'den tavsiye ister, LLM'in önerdiği alım satımı gerçekleştirir ve ardından bekleyip tekrar eder."
author: Ori Pomerantz
tags: [ "Yapay Zeka", "alım satım", "aracı", "python" ]
skill: intermediate
published: 2026-02-13
lang: tr
sidebarDepth: 3
---

Bu öğreticide, basit bir yapay zeka alım satım aracısı oluşturmayı öğreneceksiniz. Bu aracı şu adımları kullanarak çalışır:

1. Bir jetonun mevcut ve geçmiş fiyatlarının yanı sıra diğer potansiyel olarak ilgili bilgileri okuyun
2. Bu bilgilerle birlikte, nasıl ilgili olabileceğini açıklamak için arka plan bilgilerini de içeren bir sorgu oluşturun
3. Sorguyu gönderin ve tahmini bir fiyat alın
4. Tavsiyeye göre alım satım yapın
5. Bekleyin ve tekrarlayın

Bu aracı, bilgilerin nasıl okunacağını, kullanılabilir bir yanıt veren bir sorguya nasıl çevrileceğini ve bu yanıtın nasıl kullanılacağını gösterir. Bunların hepsi bir yapay zeka aracısı için gerekli adımlardır. Bu aracı Python'da uygulanmıştır çünkü yapay zekada kullanılan en yaygın dildir.

## Bunu neden yapmalı? {#why-do-this}

Otomatikleştirilmiş alım satım aracıları, geliştiricilerin bir alım satım stratejisi seçmelerine ve yürütmelerine olanak tanır. [Yapay zeka aracıları](/ai-agents), geliştiricinin kullanmayı hiç düşünmediği bilgileri ve algoritmaları potansiyel olarak kullanarak daha karmaşık ve dinamik alım satım stratejilerine olanak tanır.

## Araçlar {#tools}

Bu öğretici, teklifler ve alım satım için [Python](https://www.python.org/), [Web3 kütüphanesi](https://web3py.readthedocs.io/en/stable/) ve [Uniswap v3](https://github.com/Uniswap/v3-periphery) kullanır.

### Neden Python? {#python}

Yapay zeka için en yaygın kullanılan dil [Python](https://www.python.org/) olduğundan, burada onu kullanıyoruz. Python bilmiyorsanız endişelenmeyin. Dil çok açıktır ve tam olarak ne yaptığını açıklayacağım.

[Web3 kütüphanesi](https://web3py.readthedocs.io/en/stable/), en yaygın Python Ethereum API'sidir. Kullanımı oldukça kolaydır.

### Blokzincirde alım satım {#trading-on-blockchain}

Ethereum'da jeton alım satımı yapmanızı sağlayan [birçok merkeziyetsiz borsa (DEX)](/apps/categories/defi/) vardır. Ancak, [arbitraj](/developers/docs/smart-contracts/composability/#better-user-experience) nedeniyle benzer döviz kurlarına sahip olma eğilimindedirler.

[Uniswap](https://app.uniswap.org/), hem teklifler (jeton göreceli değerlerini görmek için) hem de alım satımlar için kullanabileceğimiz, yaygın olarak kullanılan bir merkeziyetsiz borsadır.

### OpenAI {#openai}

Büyük bir dil modeli için [OpenAI](https://openai.com/) ile başlamayı seçtim. Bu öğreticideki uygulamayı çalıştırmak için API erişimi için ödeme yapmanız gerekecektir. 5 dolarlık minimum ödeme fazlasıyla yeterlidir.

## Adım adım geliştirme {#step-by-step}

Geliştirmeyi basitleştirmek için aşamalar halinde ilerliyoruz. Her adım GitHub'da bir daldır.

### Başlarken {#getting-started}

UNIX veya Linux ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install) dahil) altında başlamak için adımlar vardır

1. Henüz sahip değilseniz, [Python](https://www.python.org/downloads/) indirip kurun.

2. GitHub deposunu klonlayın.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/) yükleyin. Sisteminizdeki komut farklı olabilir.

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

6. Python ve Web3'ün doğru çalıştığını doğrulamak için `python3`'ü çalıştırın ve ona bu programı sağlayın. Bunu `>>>` istemine girebilirsiniz; dosya oluşturmanıza gerek yoktur.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Blokzincirden okuma {#read-blockchain}

Bir sonraki adım blokzincirden okuma yapmaktır. Bunu yapmak için, `02-read-quote` dalına geçmeniz ve ardından programı çalıştırmak için `uv` kullanmanız gerekir.

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

İhtiyacımız olan kütüphaneleri içe aktarın. Kullanıldıklarında aşağıda açıklanmıştır.

```python
print = functools.partial(print, flush=True)
```

Python'un `print` fonksiyonunu, çıktıyı her zaman anında temizleyen bir sürümle değiştirir. Bu, uzun süre çalışan bir betikte kullanışlıdır çünkü durum güncellemelerini veya hata ayıklama çıktılarını beklemek istemeyiz.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Ana ağa ulaşmak için bir URL. [Hizmet olarak düğüm](/developers/docs/nodes-and-clients/nodes-as-a-service/) sağlayıcısından bir tane alabilir veya [Chainlist](https://chainlist.org/chain/1) içinde reklamı yapılanlardan birini kullanabilirsiniz.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Bir Ethereum ana ağ bloku genellikle on iki saniyede bir gerçekleşir, bu nedenle bunlar bir zaman diliminde gerçekleşmesini beklediğimiz blok sayısıdır. Bunun kesin bir rakam olmadığını unutmayın. [Blok teklif edicisi](/developers/docs/consensus-mechanisms/pos/block-proposal/) kapalı olduğunda, o blok atlanır ve bir sonraki blok için süre 24 saniye olur. Bir zaman damgası için tam bloğu almak isteseydik, [ikili arama](https://en.wikipedia.org/wiki/Binary_search) kullanırdık. Ancak, bu amaçlarımız için yeterince yakındır. Geleceği tahmin etmek kesin bir bilim değildir.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Döngünün boyutu. Döngü başına bir kez teklifleri gözden geçiririz ve bir sonraki döngünün sonundaki değeri tahmin etmeye çalışırız.

```python
# Okuduğumuz havuzun adresi
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Teklif değerleri, [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) adresindeki Uniswap 3 USDC/WETH havuzundan alınır. Bu adres zaten sağlama toplamı biçimindedir, ancak kodu yeniden kullanılabilir hale getirmek için [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) kullanmak daha iyidir.

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

Bunlar, iletişim kurmamız gereken iki sözleşme için [ABI'lerdir](https://docs.soliditylang.org/en/latest/abi-spec.html). Kodu kısa tutmak için yalnızca çağırmamız gereken işlevleri dahil ediyoruz.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) kütüphanesini başlatın ve bir Ethereum düğümüne bağlanın.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Bu, Python'da bir veri sınıfı oluşturmanın bir yoludur. [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) veri türü, sözleşmeye bağlanmak için kullanılır. ` (frozen=True)` ifadesine dikkat edin. Python'da [booleanlar](https://en.wikipedia.org/wiki/Boolean_data_type) büyük harfle `True` veya `False` olarak tanımlanır. Bu veri sınıfı `frozen` yani alanlar değiştirilemez.

Girintiye dikkat edin. [C türevi dillerin](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages) aksine, Python blokları belirtmek için girintiyi kullanır. Python yorumlayıcısı, aşağıdaki tanımın bu veri sınıfının bir parçası olmadığını bilir, çünkü veri sınıfı alanlarıyla aynı girintide başlamaz.

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

Bu, Python'da bir fonksiyon tanımlamanın yoludur. Tanım, hala `PoolInfo`'nun bir parçası olduğunu göstermek için girintilidir.

Bir veri sınıfının parçası olan bir fonksiyonda, ilk parametre her zaman burada çağrılan veri sınıfı örneği olan `self`'dir. Burada başka bir parametre var, blok numarası.

```python
        assert block <= w3.eth.block_number, "Blok gelecekte"
```

Geleceği okuyabilseydik, alım satım için yapay zekaya ihtiyacımız olmazdı.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3'ten EVM'de bir fonksiyon çağırmanın söz dizimi şudur: `<sözleşme nesnesi>.functions.<fonksiyon adı>().call(<parametreler>)`. Parametreler EVM fonksiyonunun parametreleri (varsa; burada yok) veya blokzincir davranışını değiştirmek için [adlandırılmış parametreler](https://en.wikipedia.org/wiki/Named_parameter) olabilir. Burada, içinde çalışmak istediğimiz [blok numarasını](/developers/docs/apis/json-rpc/#default-block) belirtmek için `block_identifier`'ı kullanıyoruz.

Sonuç [bu yapıdır, dizi biçiminde](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). İlk değer, iki jeton arasındaki döviz kurunun bir fonksiyonudur.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Zincir üstü hesaplamaları azaltmak için Uniswap v3 gerçek değişim faktörünü değil, karekökünü saklar. EVM kayan noktalı matematiği veya kesirleri desteklemediğinden, gerçek değer yerine yanıt <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math> olur

```python
         # (token0 başına token1)
        return 1/(raw_price * self.decimal_factor)
```

Aldığımız ham fiyat, her bir `token1` için aldığımız `token0` sayısıdır. Havuzumuzda `token0` USDC'dir (ABD doları ile aynı değere sahip bir sabit para) ve `token1` [WETH](https://opensea.io/learn/blockchain/what-is-weth)dir. Gerçekten istediğimiz değer, tersi değil, WETH başına dolar sayısıdır.

Ondalık faktör, iki jeton için [ondalık faktörler](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) arasındaki orandır.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Bu veri sınıfı bir teklifi temsil eder: belirli bir zamanda belirli bir varlığın fiyatı. Bu noktada, `asset` alanı ilgisizdir çünkü tek bir havuz kullanıyoruz ve bu nedenle tek bir varlığa sahibiz. Ancak, daha sonra daha fazla varlık ekleyeceğiz.

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

Bu işlev bir adresi alır ve o adresteki jeton sözleşmesi hakkında bilgi döndürür. Yeni bir [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) oluşturmak için, adresi ve ABI'yi `w3.eth.contract`'a sağlarız.

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

Bu işlev, [belirli bir havuz](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol) hakkında ihtiyacımız olan her şeyi döndürür. `f"<dize>"` sözdizimi [biçimlendirilmiş bir dizedir](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Bir `Quote` nesnesi alın. `block_number` için varsayılan değer `None`'dır (değer yok).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Bir blok numarası belirtilmemişse, en son blok numarası olan `w3.eth.block_number`'ı kullanın. Bu [bir `if` ifadesinin](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement) sözdizimidir.

Varsayılanı `w3.eth.block_number` olarak ayarlamak daha iyi olurmuş gibi görünebilir, ancak bu iyi çalışmaz çünkü işlevin tanımlandığı andaki blok numarası olurdu. Uzun süre çalışan bir aracıda bu bir sorun olurdu.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

İnsanlar ve büyük dil modelleri (LLM'ler) için okunabilir bir biçime biçimlendirmek üzere [`datetime` kütüphanesini](https://docs.python.org/3/library/datetime.html) kullanın. Değeri iki ondalık basamağa yuvarlamak için [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) kullanın.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python'da, `list[<tür>]` kullanarak yalnızca belirli bir türü içerebilen bir [liste](https://docs.python.org/3/library/stdtypes.html#typesseq-list) tanımlarsınız.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python'da bir [`for` döngüsü](https://docs.python.org/3/tutorial/controlflow.html#for-statements) genellikle bir liste üzerinde yinelenir. Teklif bulunacak blok numaraları listesi [`range`](https://docs.python.org/3/library/stdtypes.html#range) fonksiyonundan gelir.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Her blok numarası için bir `Quote` nesnesi alın ve bunu `quotes` listesine ekleyin. Ardından bu listeyi döndürün.

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

Bu, betiğin ana kodudur. Havuz bilgilerini okuyun, on iki teklif alın ve bunları [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) ile yazdırın.

### Bir istem oluşturma {#prompt}

Ardından, bu teklif listesini bir LLM için bir isteme dönüştürmemiz ve beklenen bir gelecek değeri elde etmemiz gerekiyor.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Çıktı şimdi bir LLM'ye bir istem olacak, şuna benzer:

```
Bu teklifler verildiğinde:
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

Cevabınızı iki ondalık basamağa yuvarlanmış tek bir sayı olarak,
başka metin olmadan verin.
```

Burada iki varlık için teklifler olduğuna dikkat edin, `WETH/USDC` ve `WBTC/WETH`. Başka bir varlıktan teklif eklemek tahmin doğruluğunu artırabilir.

#### Bir istemin nasıl göründüğü {#prompt-explanation}

Bu istem, LLM istemlerinde oldukça yaygın olan üç bölüm içerir.

1. Bilgi. LLM'ler eğitimlerinden çok fazla bilgiye sahiptir, ancak genellikle en güncel bilgilere sahip değillerdir. En son teklifleri burada almamızın nedeni budur. Bir isteme bilgi eklemeye [geri getirme artırılmış üretim (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) denir.

2. Asıl soru. Bilmek istediğimiz şey bu.

3. Çıktı biçimlendirme talimatları. Normalde, bir LLM bize bu tahmine nasıl ulaştığının bir açıklamasıyla birlikte bir tahmin verir. Bu insanlar için daha iyidir, ancak bir bilgisayar programının yalnızca sonuca ihtiyacı vardır.

#### Kod açıklaması {#prompt-code}

İşte yeni kod.

```python
from datetime import datetime, timezone, timedelta
```

LLM'e bir tahmin istediğimiz zamanı sağlamamız gerekiyor. Gelecekte "n dakika/saat/gün" zamanını elde etmek için [`timedelta` sınıfını](https://docs.python.org/3/library/datetime.html#datetime.timedelta) kullanırız.

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
        assert block <= w3.eth.block_number, "Blok gelecekte"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token0 başına token1)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC havuzunda, bir adet `token1` (WETH) satın almak için kaç adet `token0` (USDC) gerektiğini bilmek istiyoruz. WETH/WBTC havuzunda, bir adet `token0` (WBTC, sarılmış Bitcoin'dir) satın almak için kaç adet `token1` (WETH) gerektiğini bilmek istiyoruz. Havuzun oranının tersine çevrilmesi gerekip gerekmediğini izlememiz gerekiyor.

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

Bir havuzun tersine çevrilmesi gerekip gerekmediğini bilmek için bunu `read_pool`'a girdi olarak almamız gerekiyor. Ayrıca, varlık sembolünün doğru bir şekilde ayarlanması gerekir.

`<a> if <b> else <c>` söz dizimi, C türevi bir dilde `<b> ?` şeklinde olan [üçlü koşullu operatörün](https://en.wikipedia.org/wiki/Ternary_conditional_operator) Python eşdeğeridir. `<a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Varlık: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Bu işlev, hepsinin aynı varlığa uygulandığını varsayarak bir `Quote` nesne listesini biçimlendiren bir dize oluşturur.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python'da [çok satırlı dize sabitleri](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) `"""` .... şeklinde yazılır. `"""`.

```python
Bu teklifler verildiğinde:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Burada, her teklif listesi için `format_quotes` ile bir dize oluşturmak için [MapReduce](https://en.wikipedia.org/wiki/MapReduce) desenini kullanırız, ardından bunları istemde kullanılmak üzere tek bir dizede birleştiririz.

```python
{expected_time} zamanında {asset} için değerin ne olmasını beklersiniz?

Cevabınızı iki ondalık basamağa yuvarlanmış tek bir sayı olarak,
başka bir metin olmadan verin.
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

İki havuzu gözden geçirin ve her ikisinden de teklifler alın.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Tahmin istediğimiz gelecekteki zaman noktasını belirleyin ve istemi oluşturun.

### Bir LLM ile arayüz oluşturma {#interface-llm}

Ardından, gerçek bir LLM'yi sorgularız ve beklenen bir gelecek değeri alırız. Bu programı OpenAI kullanarak yazdım, bu yüzden farklı bir sağlayıcı kullanmak isterseniz, onu ayarlamanız gerekecektir.

1. Bir [OpenAI hesabı](https://auth.openai.com/create-account) edinin

2. [Hesaba para yatırın](https://platform.openai.com/settings/organization/billing/overview)—bu yazının yazıldığı sırada asgari tutar 5$'dır

3. [Bir API anahtarı oluşturun](https://platform.openai.com/settings/organization/api-keys)

4. Komut satırında, programınızın kullanabilmesi için API anahtarını dışa aktarın

   ```sh
   export OPENAI_API_KEY=sk-<anahtarın geri kalanı buraya gelecek>
   ```

5. Ajanı kullanıma alın ve çalıştırın

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

İşte yeni kod.

```python
from openai import OpenAI

open_ai = OpenAI()  # İstemci, OPENAI_API_KEY ortam değişkenini okur
```

OpenAI API'sini içe aktarın ve başlatın.

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

print ("Mevcut fiyat:", wethusdc_quotes[-1].price)
print(f"{future_time} zamanında, beklenen fiyat: {expected_price} USD")

if (expected_price > current_price):
    print(f"Al, fiyatın {expected_price - current_price} USD artmasını bekliyorum")
else:
    print(f"Sat, fiyatın {current_price - expected_price} USD düşmesini bekliyorum")
```

Fiyatı çıktılayın ve bir al veya sat tavsiyesi verin.

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
Değişikliklerin standart sapması: 104.42 USD
Kârlı günler: %51.72
Zararlı günler: %48.28
```

Test edicinin çoğu aracı ile aynıdır, ancak burada yeni veya değiştirilmiş kısımlar bulunmaktadır.

```python
CYCLES_FOR_TEST = 40 # Geriye dönük test için kaç döngü test edeceğimiz

# Çok sayıda teklif al
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
# Tahminler oluşturun ve bunları gerçek geçmişe karşı kontrol edin

total_error = Decimal(0)
changes = []
```

İlgilendiğimiz iki tür hata var. İlki, `total_error`, sadece tahmin edicinin yaptığı hataların toplamıdır.

İkincisini, `changes`'i anlamak için aracının amacını hatırlamamız gerekir. WETH/USDC oranını (ETH fiyatı) tahmin etmek değil. Satış ve alım önerileri yayınlamak içindir. Fiyat şu anda 2000$ ise ve yarın için 2010$ tahmin ediyorsa, gerçek sonucun 2020$ olması ve fazladan para kazanmamız umrumuzda olmaz. Ancak 2010 dolar tahmin edip bu tavsiyeye göre ETH alırsak ve fiyat 1990 dolara düşerse bunu _dikkate alırız_.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Yalnızca tüm geçmişin (tahmin için kullanılan değerler ve karşılaştırılacak gerçek dünya değeri) mevcut olduğu durumlara bakabiliriz. Bu, en yeni durumun `CYCLES_BACK` önce başlayan durum olması gerektiği anlamına gelir.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Aracının kullandığı sayıyla aynı sayıda örnek almak için [dilimleri](https://www.w3schools.com/python/ref_func_slice.asp) kullanın. Buradan bir sonraki segmente kadar olan kod, aracıda sahip olduğumuz tahmin alma koduyla aynıdır.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Tahmini fiyatı, gerçek fiyatı ve tahmin anındaki fiyatı alın. Tavsiyenin alım mı yoksa satım mı olduğunu belirlemek için tahmin anındaki fiyata ihtiyacımız var.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"{prediction_time} için tahmin: tahmin edilen {predicted_price} USD, gerçek {real_price} USD, hata {error} USD")
```

Hatayı hesaplayın ve toplama ekleyin.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes` için, bir ETH almanın veya satmanın parasal etkisini istiyoruz. Bu nedenle önce tavsiyeyi belirlememiz, ardından gerçek fiyatın nasıl değiştiğini ve tavsiyenin para kazandırıp kazandırmadığını (pozitif değişim) veya para kaybettirip kaybettirmediğini (negatif değişim) değerlendirmemiz gerekiyor.

```python
print (f"{len(wethusdc_quotes)-CYCLES_BACK} tahmin üzerinden ortalama tahmin hatası: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Tavsiye başına ortalama değişim: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Değişikliklerin standart sapması: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Sonuçları raporlayın.

```python
print (f"Kârlı günler: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Zararlı günler: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Kârlı günlerin ve maliyetli günlerin sayısını saymak için [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) kullanın. Sonuç bir filtre nesnesidir, uzunluğunu almak için bunu bir listeye dönüştürmemiz gerekir.

### İşlemleri gönderme {#submit-txn}

Şimdi gerçekten işlemleri göndermemiz gerekiyor. Ancak, sistem kanıtlanmadan önce bu noktada gerçek para harcamak istemiyorum. Bunun yerine, ana ağın yerel bir çatalını oluşturacağız ve o ağda "alım satım" yapacağız.

Yerel bir çatal oluşturma ve alım satımı etkinleştirme adımları şunlardır.

1. [Foundry](https://getfoundry.sh/introduction/installation) yükleyin

2. [`anvil`](https://getfoundry.sh/anvil/overview) başlatın

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil`, Foundry için varsayılan URL olan http://localhost:8545 adresinde dinliyor, bu nedenle blokzinciri değiştirmek için kullandığımız [`cast` komutu](https://getfoundry.sh/cast/overview) için URL belirtmemize gerek yok.

3. `anvil`'de çalıştırıldığında, ETH'ye sahip on test hesabı vardır—ilk hesap için ortam değişkenlerini ayarlayın

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Bunlar kullanmamız gereken sözleşmeler. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol), aslında alım satım yapmak için kullandığımız Uniswap v3 sözleşmesidir. Doğrudan havuz aracılığıyla alım satım yapabilirdik, ancak bu çok daha kolay.

   Alttaki iki değişken, WETH ve USDC arasında takas yapmak için gereken Uniswap v3 yollarıdır.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Test hesaplarının her birinde 10.000 ETH bulunur. Alım satım için 1000 WETH elde etmek üzere 1000 ETH sarmalamak için WETH sözleşmesini kullanın.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. 500 WETH'yi USDC ile takas etmek için `SwapRouter`'ı kullanın.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` çağrısı, `SwapRouter`'ın jetonlarımızın bir kısmını harcamasına izin veren bir ödenek oluşturur. Sözleşmeler olayları izleyemez, bu nedenle jetonları doğrudan `SwapRouter` sözleşmesine aktarırsak, ödendiğini bilemez. Bunun yerine, `SwapRouter` sözleşmesinin belirli bir miktarı harcamasına izin veririz ve ardından `SwapRouter` bunu yapar. Bu, `SwapRouter` tarafından çağrılan bir işlev aracılığıyla yapılır, böylece başarılı olup olmadığını bilir.

7. Her iki jetondan da yeterli miktarda olduğunu doğrulayın.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Artık WETH ve USDC'ye sahip olduğumuza göre, aracıyı gerçekten çalıştırabiliriz.

```sh
git checkout 05-trade
uv run agent.py
```

Çıktı şuna benzer olacaktır:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Mevcut fiyat: 1843.16
2026-02-06T23:07 zamanında beklenen fiyat: 1724.41 USD
Alım satım öncesi hesap bakiyeleri:
USDC Bakiyesi: 927301.578272
WETH Bakiyesi: 500
Sat, fiyatın 118.75 USD düşmesini bekliyorum
Onay işlemi gönderildi: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Onay işlemi çıkarıldı.
Satış işlemi gönderildi: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Satış işlemi çıkarıldı.
Alım satım sonrası hesap bakiyeleri:
USDC Bakiyesi: 929143.797116
WETH Bakiyesi: 499
```

Gerçekten kullanmak için birkaç küçük değişiklik yapmanız gerekir.

- 14. satırda, `MAINNET_URL`'yi `https://eth.drpc.org` gibi gerçek bir erişim noktasına değiştirin
- 28. satırda, `PRIVATE_KEY`'i kendi özel anahtarınızla değiştirin
- Çok zengin değilseniz ve kanıtlanmamış bir aracı için her gün 1 ETH alıp satamıyorsanız, `WETH_TRADE_AMOUNT`'ı azaltmak için 29. satırı değiştirmek isteyebilirsiniz

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

Gerçekten alım satım yapmak için `approve` fonksiyonuna ihtiyacımız var. Ayrıca öncesi ve sonrası bakiyeleri göstermek istiyoruz, bu yüzden `balanceOf`'a da ihtiyacımız var.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI'sinde sadece `exactInput`'a ihtiyacımız var. İlgili bir fonksiyon olan `exactOutput`'u tam olarak bir WETH satın almak için kullanabilirdik, ancak basitlik açısından her iki durumda da sadece `exactInput` kullanıyoruz.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) ve `SwapRouter` sözleşmesi için Web3 tanımları.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

İşlem parametreleri. Burada bir fonksiyona ihtiyacımız var çünkü [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) her seferinde değişmelidir.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter` için bir jeton ödeneğini onaylayın.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Web3'te bu şekilde bir işlem gönderiyoruz. İlk olarak, işlemi oluşturmak için [`Sözleşme` nesnesini](https://web3py.readthedocs.io/en/stable/web3.contract.html) kullanırız. Ardından, işlemi `PRIVATE_KEY` kullanarak imzalamak için [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) kullanırız. Son olarak, işlemi göndermek için [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) kullanırız.

```python
    print(f"Onay işlemi gönderildi: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Onay işlemi çıkarıldı.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt), işlem çıkarılana kadar bekler. Gerekirse makbuzu döndürür.

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

`SELL_PARAMS`'ın aksine, satın alma parametreleri değişebilir. Giriş tutarı, `quote`'da mevcut olan 1 WETH'nin maliyetidir.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Alım işlemi gönderildi: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Alım işlemi çıkarıldı.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Satış işlemi gönderildi: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Satış işlemi çıkarıldı.")
```

`buy()` ve `sell()` fonksiyonları neredeyse aynıdır. Önce `SwapRouter` için yeterli bir ödenek onaylarız ve sonra onu doğru yol ve miktar ile çağırırız.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Bakiye: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Bakiye: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Her iki para birimindeki kullanıcı bakiyelerini rapor edin.

```python
print("Alım satım öncesi hesap bakiyeleri:")
balances()

if (expected_price > current_price):
    print(f"Al, fiyatın {expected_price - current_price} USD artmasını bekliyorum")
    buy(wethusdc_quotes[-1])
else:
    print(f"Sat, fiyatın {current_price - expected_price} USD düşmesini bekliyorum")
    sell()

print("Alım satım sonrası hesap bakiyeleri:")
balances()
```

Bu aracı şu anda yalnızca bir kez çalışır. Ancak, [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) üzerinden çalıştırarak veya 368-400 satırlarını bir döngüye alıp [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) kullanarak bir sonraki döngü zamanı gelene kadar bekleyerek sürekli çalışmasını sağlayabilirsiniz.

## Olası iyileştirmeler {#improvements}

Bu tam bir üretim sürümü değildir; sadece temelleri öğretmek için bir örnektir. İşte iyileştirme için bazı fikirler.

### Daha akıllı ticaret {#smart-trading}

Aracının ne yapacağına karar verirken göz ardı ettiği iki önemli gerçek var.

- _Beklenen değişimin büyüklüğü_. Aracı, düşüşün büyüklüğüne bakılmaksızın, fiyatın düşmesi bekleniyorsa sabit bir miktarda `WETH` satar.
  Tartışmalı olarak, küçük değişiklikleri görmezden gelmek ve fiyatın ne kadar düşmesini beklediğimize göre satış yapmak daha iyi olurdu.
- _Mevcut portföy_. Portföyünüzün %10'u WETH'de ise ve fiyatın artacağını düşünüyorsanız, daha fazla satın almak muhtemelen mantıklıdır. Ancak portföyünüzün %90'ı WETH'de ise, yeterince riske maruz kalmış olabilirsiniz ve daha fazla satın almanıza gerek yoktur. Fiyatın düşmesini bekliyorsanız, tam tersi geçerlidir.

### Ticaret stratejinizi gizli tutmak isterseniz ne olur? {#secret}

Yapay zeka satıcıları, LLM'lerine gönderdiğiniz sorguları görebilir, bu da aracınızla geliştirdiğiniz dahi ticaret sistemini açığa çıkarabilir. Çok fazla insanın kullandığı bir alım satım sistemi değersizdir çünkü siz satın almak istediğinizde çok fazla insan satın almaya çalışır (ve fiyat yükselir) ve siz satmak istediğinizde çok fazla insan satmaya çalışır (ve fiyat düşer).

Bu sorunu önlemek için, örneğin [LM-Studio](https://lmstudio.ai/) kullanarak yerel olarak bir LLM çalıştırabilirsiniz.

### Yapay zeka botundan yapay zeka aracısına {#bot-to-agent}

Bunun [bir yapay zeka botu değil, bir yapay zeka aracısı](/ai-agents/#ai-agents-vs-ai-bots) olduğuna dair iyi bir argüman sunabilirsiniz. Önceden tanımlanmış bilgilere dayanan nispeten basit bir strateji uygular. Örneğin, Uniswap v3 havuzlarının bir listesini ve en son değerlerini sağlayarak ve hangi kombinasyonun en iyi tahminsel değere sahip olduğunu sorarak kendi kendine geliştirmeyi etkinleştirebiliriz.

### Kayma koruması {#slippage-protection}

Şu anda [kayma koruması](https://uniswapv3book.com/milestone_3/slippage-protection.html) yoktur. Mevcut teklif 2000$ ise ve beklenen fiyat 2100$ ise, aracı satın alacaktır. Ancak, aracı satın almadan önce maliyet 2200$'a yükselirse, artık satın almanın bir anlamı kalmaz.

Kayma korumasını uygulamak için, [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325) dosyasının 325 ve 334. satırlarında bir `amountOutMinimum` değeri belirtin.

## Sonuç {#conclusion}

Umarım, artık yapay zeka aracılarıyla başlamak için yeterince bilgiye sahipsinizdir. Bu, konunun kapsamlı bir incelemesi değildir; buna adanmış bütün kitaplar var, ancak bu başlamanız için yeterli. İyi şanslar!

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
