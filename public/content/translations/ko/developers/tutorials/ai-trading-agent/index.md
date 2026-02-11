---
title: 이더리움에서 자신만의 AI 트레이딩 에이전트 만들기
description: 이 튜토리얼에서는 간단한 AI 트레이딩 에이전트를 만드는 방법을 배웁니다. 이 에이전트는 블록체인에서 정보를 읽고, 해당 정보를 기반으로 LLM에 추천을 요청하고, LLM이 추천하는 교환을 수행한 후, 대기하고 반복합니다.
author: Ori Pomerantz
tags: [ "AI", "트레이딩", "에이전트", "python" ]
skill: intermediate
published: 2026-02-13
lang: ko
sidebarDepth: 3
---

이 튜토리얼에서는 간단한 AI 트레이딩 에이전트를 구축하는 방법을 배웁니다. 이 에이전트는 다음 단계를 사용하여 작동합니다.

1. 토큰의 현재 및 과거 가격과 기타 잠재적으로 관련 있는 정보를 읽습니다.
2. 이 정보와 함께 그 관련성을 설명하는 배경 정보로 쿼리를 작성합니다.
3. 쿼리를 제출하고 예상 가격을 받습니다.
4. 추천에 따라 교환합니다.
5. 대기하고 반복합니다.

이 에이전트는 정보를 읽고, 사용 가능한 답변을 생성하는 쿼리로 변환하고, 해당 답변을 사용하는 방법을 보여줍니다. 이 모든 단계는 AI 에이전트에 필요합니다. 이 에이전트는 Python으로 구현되었습니다. Python이 AI에서 가장 일반적으로 사용되는 언어이기 때문입니다.

## 왜 이렇게 해야 할까요? {#why-do-this}

자동화된 트레이딩 에이전트는 개발자가 트레이딩 전략을 선택하고 실행할 수 있도록 합니다. [AI 에이전트](/ai-agents)는 개발자가 사용을 고려조차 하지 않았던 정보와 알고리즘을 잠재적으로 사용하여 더 복잡하고 동적인 트레이딩 전략을 가능하게 합니다.

## 도구 {#tools}

이 튜토리얼은 시세 조회 및 트레이딩을 위해 [Python](https://www.python.org/), [Web3 라이브러리](https://web3py.readthedocs.io/en/stable/), [Uniswap v3](https://github.com/Uniswap/v3-periphery)를 사용합니다.

### 왜 Python인가요? {#python}

AI에 가장 널리 사용되는 언어는 [Python](https://www.python.org/)이므로 여기서도 사용합니다. Python을 모르더라도 걱정하지 마세요. 언어가 매우 명확하며, 무엇을 하는지 정확히 설명해 드리겠습니다.

[Web3 라이브러리](https://web3py.readthedocs.io/en/stable/)는 가장 일반적인 Python 이더리움 API입니다. 사용하기가 매우 쉽습니다.

### 블록체인에서 트레이딩하기 {#trading-on-blockchain}

이더리움에서 토큰을 교환할 수 있는 [많은 분산형 거래소(DEX)](/apps/categories/defi/)가 있습니다. 하지만 [차익거래](/developers/docs/smart-contracts/composability/#better-user-experience) 때문에 환율은 비슷한 경향이 있습니다.

[Uniswap](https://app.uniswap.org/)은 널리 사용되는 DEX이며, 시세 조회(토큰 상대 가치 확인)와 교환 모두에 사용할 수 있습니다.

### OpenAI {#openai}

대규모 언어 모델의 경우, [OpenAI](https://openai.com/)로 시작하기로 했습니다. 이 튜토리얼의 애플리케이션을 실행하려면 API 액세스 비용을 지불해야 합니다. 최소 결제 금액인 5달러는 충분하고도 남습니다.

## 단계별 개발 {#step-by-step}

개발을 단순화하기 위해 단계별로 진행합니다. 각 단계는 GitHub의 브랜치입니다.

### 시작하기 {#getting-started}

UNIX 또는 Linux([WSL](https://learn.microsoft.com/en-us/windows/wsl/install) 포함)에서 시작하는 단계가 있습니다.

1. 아직 설치하지 않았다면 [Python](https://www.python.org/downloads/)을 다운로드하여 설치하세요.

2. GitHub 리포지토리를 복제합니다.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. [`uv`](https://docs.astral.sh/uv/getting-started/installation/)를 설치합니다. 시스템에 따라 명령어가 다를 수 있습니다.

   ```sh
   pipx install uv
   ```

4. 라이브러리를 다운로드합니다.

   ```sh
   uv sync
   ```

5. 가상 환경을 활성화합니다.

   ```sh
   source .venv/bin/activate
   ```

6. Python과 Web3가 올바르게 작동하는지 확인하려면 `python3`을 실행하고 이 프로그램을 제공하세요. `>>>` 프롬프트에 입력할 수 있으며 파일을 만들 필요는 없습니다.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### 블록체인에서 읽기 {#read-blockchain}

다음 단계는 블록체인에서 읽는 것입니다. 그렇게 하려면 `02-read-quote` 브랜치로 변경한 다음 `uv`를 사용하여 프로그램을 실행해야 합니다.

```sh
git checkout 02-read-quote
uv run agent.py
```

타임스탬프, 가격, 자산(현재는 항상 `WETH/USDC`)을 포함하는 `Quote` 객체 목록을 받게 됩니다.

다음은 한 줄씩 설명한 것입니다.

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

필요한 라이브러리를 가져옵니다. 사용 시 아래에 설명되어 있습니다.

```python
print = functools.partial(print, flush=True)
```

Python의 `print`를 항상 출력을 즉시 플러시하는 버전으로 바꿉니다. 상태 업데이트나 디버깅 출력을 기다릴 필요가 없으므로 장기 실행 스크립트에서 유용합니다.

```python
MAINNET_URL = "https://eth.drpc.org"
```

메인넷에 접속하기 위한 URL입니다. [서비스형 노드](/developers/docs/nodes-and-clients/nodes-as-a-service/)에서 얻거나 [Chainlist](https://chainlist.org/chain/1)에 광고된 것 중 하나를 사용할 수 있습니다.

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

이더리움 메인넷 블록은 일반적으로 12초마다 생성되므로, 이는 특정 기간에 생성될 것으로 예상되는 블록 수입니다. 이것은 정확한 수치가 아닙니다. [블록 제안자](/developers/docs/consensus-mechanisms/pos/block-proposal/)가 다운되면 해당 블록은 건너뛰어지고 다음 블록까지의 시간은 24초가 됩니다. 타임스탬프에 대한 정확한 블록을 얻으려면 [이진 검색](https://en.wikipedia.org/wiki/Binary_search)을 사용합니다. 하지만, 우리의 목적에는 이 정도로도 충분합니다. 미래를 예측하는 것은 정확한 과학이 아닙니다.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

주기의 크기입니다. 주기당 한 번씩 시세를 검토하고 다음 주기 말의 가치를 추정합니다.

```python
# 읽고 있는 풀의 주소
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

시세 값은 [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract) 주소의 Uniswap 3 USDC/WETH 풀에서 가져옵니다. 이 주소는 이미 체크섬 형식이지만, 코드 재사용성을 높이려면 [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address)를 사용하는 것이 좋습니다.

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

이는 우리가 연결해야 하는 두 계약의 [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)입니다. 코드를 간결하게 유지하기 위해 호출해야 하는 함수만 포함합니다.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

[`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) 라이브러리를 시작하고 이더리움 노드에 연결합니다.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

이것은 Python에서 데이터 클래스를 만드는 한 가지 방법입니다. [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) 데이터 유형은 계약에 연결하는 데 사용됩니다. `(frozen=True)`에 주목하세요. Python에서 [불리언](https://en.wikipedia.org/wiki/Boolean_data_type)은 대문자로 시작하는 `True` 또는 `False`로 정의됩니다. 이 데이터 클래스는 `frozen`이며, 필드를 수정할 수 없음을 의미합니다.

들여쓰기에 주목하세요. [C 파생 언어](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages)와 달리 Python은 들여쓰기를 사용하여 블록을 나타냅니다. Python 인터프리터는 다음 정의가 데이터 클래스 필드와 동일한 들여쓰기에서 시작하지 않기 때문에 이 데이터 클래스의 일부가 아님을 압니다.

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

[`Decimal`](https://docs.python.org/3/library/decimal.html) 유형은 십진 분수를 정확하게 처리하는 데 사용됩니다.

```python
    def get_price(self, block: int) -> Decimal:
```

이것이 Python에서 함수를 정의하는 방법입니다. 이 정의는 여전히 `PoolInfo`의 일부임을 보여주기 위해 들여쓰기됩니다.

데이터 클래스의 일부인 함수에서 첫 번째 매개변수는 항상 여기에서 호출된 데이터 클래스 인스턴스인 `self`입니다. 여기에는 블록 번호라는 또 다른 매개변수가 있습니다.

```python
        assert block <= w3.eth.block_number, "블록이 미래에 있습니다"
```

미래를 읽을 수 있다면 트레이딩에 AI가 필요하지 않을 것입니다.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Web3에서 EVM의 함수를 호출하는 구문은 다음과 같습니다. `<contract object>.functions.<function name>"().call(<parameters>)`. 매개변수는 EVM 함수의 매개변수(있는 경우, 여기서는 없음)이거나 블록체인 동작을 수정하기 위한 [명명된 매개변수](https://en.wikipedia.org/wiki/Named_parameter)일 수 있습니다. 여기서는 `block_identifier`를 사용하여 실행하려는 [블록 번호](/developers/docs/apis/json-rpc/#default-block)를 지정합니다.

결과는 [배열 형식의 이 구조체](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72)입니다. 첫 번째 값은 두 토큰 간의 환율 함수입니다.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

온체인 계산을 줄이기 위해 Uniswap v3는 실제 환율 요소가 아닌 제곱근을 저장합니다. EVM은 부동 소수점 연산이나 분수를 지원하지 않으므로 실제 값 대신 응답은 <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>입니다.

```python
         # (토큰 0당 토큰 1)
        return 1/(raw_price * self.decimal_factor)
```

우리가 얻는 원시 가격은 각 `token1`에 대해 얻는 `token0`의 수입니다. 우리 풀에서 `token0`은 USDC(미국 달러와 동일한 가치를 지닌 스테이블 코인)이고 `token1`은 [WETH](https://opensea.io/learn/blockchain/what-is-weth)입니다. 우리가 정말로 원하는 값은 WETH당 달러 수이지 그 역수가 아닙니다.

소수점 계수는 두 토큰의 [소수점 계수](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) 간의 비율입니다.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

이 데이터 클래스는 시세, 즉 특정 시점의 특정 자산 가격을 나타냅니다. 이 시점에서는 단일 풀을 사용하므로 단일 자산만 있으므로 `asset` 필드는 관련이 없습니다. 하지만 나중에 더 많은 자산을 추가할 것입니다.

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

이 함수는 주소를 받아 해당 주소에 있는 토큰 계약에 대한 정보를 반환합니다. 새로운 [Web3 `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html)를 만들려면 `w3.eth.contract`에 주소와 ABI를 제공합니다.

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

이 함수는 [특정 풀](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol)에 대해 필요한 모든 것을 반환합니다. `f"<string>"` 구문은 [포맷된 문자열](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)입니다.

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

`Quote` 객체를 가져옵니다. `block_number`의 기본값은 `None`(값 없음)입니다.

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

블록 번호가 지정되지 않은 경우 최신 블록 번호인 `w3.eth.block_number`를 사용합니다. 이것은 [`if` 문](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement)의 구문입니다.

기본값을 `w3.eth.block_number`로 설정하는 것이 더 나아 보일 수 있지만, 함수가 정의된 시점의 블록 번호가 되기 때문에 잘 작동하지 않습니다. 장기 실행 에이전트에서는 이것이 문제가 될 수 있습니다.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

[`datetime` 라이브러리](https://docs.python.org/3/library/datetime.html)를 사용하여 사람과 대규모 언어 모델(LLM)이 읽을 수 있는 형식으로 포맷합니다. [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize)를 사용하여 값을 소수점 이하 두 자리로 반올림합니다.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Python에서는 `list[<type>]`를 사용하여 특정 유형만 포함할 수 있는 [목록](https://docs.python.org/3/library/stdtypes.html#typesseq-list)을 정의합니다.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Python에서 [`for` 루프](https://docs.python.org/3/tutorial/controlflow.html#for-statements)는 일반적으로 목록을 반복합니다. 시세를 찾을 블록 번호 목록은 [`range`](https://docs.python.org/3/library/stdtypes.html#range)에서 가져옵니다.

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

각 블록 번호에 대해 `Quote` 객체를 가져와 `quotes` 목록에 추가합니다. 그런 다음 해당 목록을 반환합니다.

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

이것은 스크립트의 메인 코드입니다. 풀 정보를 읽고, 12개의 시세를 가져와 [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint)로 출력합니다.

### 프롬프트 만들기 {#prompt}

다음으로, 이 시세 목록을 LLM용 프롬프트로 변환하고 예상 미래 가치를 얻어야 합니다.

```sh
git checkout 03-create-prompt
uv run agent.py
```

이제 출력은 다음과 유사한 LLM에 대한 프롬프트가 됩니다.

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

여기에 `WETH/USDC`와 `WBTC/WETH`라는 두 자산에 대한 시세가 있다는 점에 주목하세요. 다른 자산의 시세를 추가하면 예측 정확도가 향상될 수 있습니다.

#### 프롬프트는 어떻게 생겼나요? {#prompt-explanation}

이 프롬프트에는 LLM 프롬프트에서 흔히 볼 수 있는 세 가지 섹션이 포함되어 있습니다.

1. 정보입니다. LLM은 훈련을 통해 많은 정보를 가지고 있지만, 보통 최신 정보는 가지고 있지 않습니다. 이것이 바로 여기서 최신 시세를 검색해야 하는 이유입니다. 프롬프트에 정보를 추가하는 것을 [검색 증강 생성(RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)이라고 합니다.

2. 실제 질문입니다. 이것이 우리가 알고 싶은 것입니다.

3. 출력 형식 지정 지침입니다. 일반적으로 LLM은 추정치와 그에 도달한 방법에 대한 설명을 제공합니다. 이는 사람에게는 더 좋지만, 컴퓨터 프로그램에는 결론만 필요합니다.

#### 코드 설명 {#prompt-code}

다음은 새로운 코드입니다.

```python
from datetime import datetime, timezone, timedelta
```

추정치를 원하는 시간을 LLM에 제공해야 합니다. 미래의 "n분/시간/일" 후의 시간을 얻으려면 [`timedelta` 클래스](https://docs.python.org/3/library/datetime.html#datetime.timedelta)를 사용합니다.

```python
# 읽고 있는 풀의 주소
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

읽어야 할 풀이 두 개 있습니다.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

WETH/USDC 풀에서 우리는 `token1`(WETH) 하나를 사기 위해 `token0`(USD 코인)이 몇 개 필요한지 알고 싶습니다. WETH/WBTC 풀에서 우리는 `token0`(WBTC, 래핑된 비트코인) 하나를 사기 위해 `token1`(WETH)이 몇 개 필요한지 알고 싶습니다. 풀의 비율을 역전시켜야 하는지 추적해야 합니다.

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

풀을 역전시켜야 하는지 알기 위해 `read_pool`에 입력으로 전달해야 합니다. 또한, 자산 기호를 올바르게 설정해야 합니다.

`<a> if <b> else <c>` 구문은 Python의 [삼항 조건 연산자](https://en.wikipedia.org/wiki/Ternary_conditional_operator)에 해당하며, C 파생 언어에서는 `<b> ?`가 됩니다. <a> : <c>\`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

이 함수는 `Quote` 객체 목록의 형식을 지정하는 문자열을 만듭니다. 이때 모든 객체가 동일한 자산에 적용된다고 가정합니다.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Python에서 [여러 줄 문자열 리터럴](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp)은 `"""` ....로 작성됩니다. `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

여기서는 [맵리듀스](https://en.wikipedia.org/wiki/MapReduce) 패턴을 사용하여 각 시세 목록에 대해 `format_quotes`로 문자열을 생성한 다음, 이를 단일 문자열로 축소하여 프롬프트에 사용합니다.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

프롬프트의 나머지 부분은 예상대로입니다.

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

두 풀을 검토하고 양쪽에서 시세를 얻습니다.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

추정치를 원하는 미래 시점을 결정하고 프롬프트를 만듭니다.

### LLM과 인터페이스하기 {#interface-llm}

다음으로, 실제 LLM에 프롬프트를 보내고 예상 미래 가치를 받습니다. 이 프로그램은 OpenAI를 사용하여 작성되었으므로 다른 제공업체를 사용하려면 수정해야 합니다.

1. [OpenAI 계정](https://auth.openai.com/create-account) 만들기

2. [계정 자금 조달](https://platform.openai.com/settings/organization/billing/overview) — 이 글을 쓰는 시점의 최소 금액은 5달러입니다.

3. [API 키 만들기](https://platform.openai.com/settings/organization/api-keys)

4. 명령줄에서 프로그램이 사용할 수 있도록 API 키를 내보냅니다.

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. 에이전트 체크아웃 및 실행

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

다음은 새로운 코드입니다.

```python
from openai import OpenAI

open_ai = OpenAI()  # The client reads the OPENAI_API_KEY environment variable
```

OpenAI API를 가져와 인스턴스화합니다.

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

OpenAI API(`open_ai.chat.completions.create`)를 호출하여 응답을 생성합니다.

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

가격을 출력하고 매수 또는 매도 추천을 제공합니다.

#### 예측 테스트하기 {#testing-the-predictions}

이제 예측을 생성할 수 있으므로 과거 데이터를 사용하여 유용한 예측을 생성하는지 평가할 수도 있습니다.

```sh
uv run test-predictor.py
```

예상 결과는 다음과 유사합니다.

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

대부분의 테스터는 에이전트와 동일하지만, 새롭거나 수정된 부분은 다음과 같습니다.

```python
CYCLES_FOR_TEST = 40 # For the backtest, how many cycles we test over

# Get lots of quotes
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

우리는 `CYCLES_FOR_TEST`(여기서는 40으로 지정)일 전을 살펴봅니다.

```python
# Create predictions and check them against real history

total_error = Decimal(0)
changes = []
```

우리가 관심 있는 오류에는 두 가지 유형이 있습니다. 첫 번째, `total_error`는 예측기가 만든 오류의 합계입니다.

두 번째, `changes`를 이해하려면 에이전트의 목적을 기억해야 합니다. WETH/USDC 비율(ETH 가격)을 예측하는 것이 아닙니다. 매도 및 매수 추천을 발행하는 것입니다. 현재 가격이 2000달러이고 내일 2010달러를 예측한다면, 실제 결과가 2020달러가 되어 추가 수익을 얻는 것은 상관없습니다. 하지만 2010달러를 예측하고 그 추천에 따라 ETH를 매수했는데 가격이 1990달러로 떨어지면 문제가 됩니다.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

전체 기록(예측에 사용된 값과 비교할 실제 값)이 사용 가능한 경우만 볼 수 있습니다. 이는 가장 최신 사례가 `CYCLES_BACK` 전에 시작된 것이어야 함을 의미합니다.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

[슬라이스](https://www.w3schools.com/python/ref_func_slice.asp)를 사용하여 에이전트가 사용하는 것과 동일한 수의 샘플을 얻습니다. 여기서부터 다음 세그먼트까지의 코드는 에이전트에 있는 예측을 얻는 코드와 동일합니다.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

예측 가격, 실제 가격, 예측 시점의 가격을 가져옵니다. 추천이 매수인지 매도인지 결정하려면 예측 시점의 가격이 필요합니다.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

오류를 계산하고 총계에 더합니다.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

`changes`의 경우, 1ETH를 매수하거나 매도할 때의 금전적 영향을 원합니다. 따라서 먼저 추천을 결정한 다음, 실제 가격이 어떻게 변했는지, 그리고 추천이 수익을 냈는지(양의 변화) 또는 손실을 입혔는지(음의 변화) 평가해야 합니다.

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

결과를 보고합니다.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

[`filter`](https://www.w3schools.com/python/ref_func_filter.asp)를 사용하여 수익성 있는 날의 수와 손실이 발생한 날의 수를 셉니다. 결과는 필터 객체이며, 길이를 얻으려면 목록으로 변환해야 합니다.

### 트랜잭션 제출하기 {#submit-txn}

이제 실제로 트랜잭션을 제출해야 합니다. 하지만 시스템이 입증되기 전인 이 시점에서는 실제 돈을 쓰고 싶지 않습니다. 대신, 메인넷의 로컬 포크를 만들고 해당 네트워크에서 "교환"할 것입니다.

다음은 로컬 포크를 만들고 트레이딩을 활성화하는 단계입니다.

1. [Foundry](https://getfoundry.sh/introduction/installation) 설치

2. [`anvil`](https://getfoundry.sh/anvil/overview) 시작

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil`은 Foundry의 기본 URL인 http://localhost:8545에서 수신 대기하므로 블록체인을 조작하는 데 사용하는 [`cast` 명령](https://getfoundry.sh/cast/overview)에 대한 URL을 지정할 필요가 없습니다.

3. `anvil`에서 실행할 때 ETH가 있는 10개의 테스트 계정이 있습니다. 첫 번째 계정에 대한 환경 변수를 설정합니다.

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. 사용해야 하는 계약은 다음과 같습니다. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol)는 실제로 교환하는 데 사용하는 Uniswap v3 계약입니다. 풀을 통해 직접 교환할 수도 있지만, 이 방법이 훨씬 쉽습니다.

   아래 두 변수는 WETH와 USDC 간에 교환하는 데 필요한 Uniswap v3 경로입니다.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. 각 테스트 계정에는 10,000 ETH가 있습니다. WETH 계약을 사용하여 1000 ETH를 래핑하여 트레이딩에 사용할 1000 WETH를 얻습니다.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. `SwapRouter`를 사용하여 500 WETH를 USD 코인으로 교환합니다.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   `approve` 호출은 `SwapRouter`가 우리 토큰의 일부를 사용할 수 있도록 허용하는 허용량을 생성합니다. 계약은 이벤트를 모니터링할 수 없으므로 토큰을 `SwapRouter` 계약으로 직접 전송하면 지급되었는지 알 수 없습니다. 대신 `SwapRouter` 계약이 특정 금액을 사용하도록 허용한 다음 `SwapRouter`가 이를 수행합니다. 이는 `SwapRouter`가 호출하는 함수를 통해 수행되므로 성공 여부를 알 수 있습니다.

7. 두 토큰이 모두 충분한지 확인합니다.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

이제 WETH와 USD 코인이 있으므로 실제로 에이전트를 실행할 수 있습니다.

```sh
git checkout 05-trade
uv run agent.py
```

출력은 다음과 유사합니다.

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

실제로 사용하려면 몇 가지 사소한 변경이 필요합니다.

- 14행에서 `MAINNET_URL`을 `https://eth.drpc.org`와 같은 실제 액세스 포인트로 변경합니다.
- 28행에서 `PRIVATE_KEY`를 자신의 개인 키로 변경합니다.
- 입증되지 않은 에이전트를 위해 매일 1 ETH를 사거나 팔 수 있을 만큼 부유하지 않다면 29행을 변경하여 `WETH_TRADE_AMOUNT`를 줄이는 것이 좋습니다.

#### 코드 설명 {#trading-code}

다음은 새로운 코드입니다.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

4단계에서 사용한 것과 동일한 변수입니다.

```python
WETH_TRADE_AMOUNT=1
```

교환할 금액입니다.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

실제로 교환하려면 `approve` 함수가 필요합니다. 또한 잔액을 전후로 보여주고 싶으므로 `balanceOf`도 필요합니다.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

`SwapRouter` ABI에서는 `exactInput`만 필요합니다. 관련 함수인 `exactOutput`을 사용하여 정확히 1 WETH를 구매할 수 있지만, 단순화를 위해 두 경우 모두 `exactInput`만 사용합니다.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

[`계정`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html)과 `SwapRouter` 계약에 대한 Web3 정의입니다.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

트랜잭션 매개변수입니다. [논스](https://en.wikipedia.org/wiki/Cryptographic_nonce)는 매번 변경되어야 하므로 여기에 함수가 필요합니다.

```python
def approve_token(contract: Contract, amount: int):
```

`SwapRouter`에 대한 토큰 허용량을 승인합니다.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

이것이 Web3에서 트랜잭션을 보내는 방법입니다. 먼저 [`Contract` 객체](https://web3py.readthedocs.io/en/stable/web3.contract.html)를 사용하여 트랜잭션을 빌드합니다. 그런 다음 [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction)을 사용하여 `PRIVATE_KEY`로 트랜잭션에 서명합니다. 마지막으로 [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction)을 사용하여 트랜잭션을 보냅니다.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt)는 트랜잭션이 채굴될 때까지 기다립니다. 필요한 경우 영수증을 반환합니다.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

WETH를 판매할 때의 매개변수입니다.

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

`SELL_PARAMS`와 달리 구매 매개변수는 변경될 수 있습니다. 입력 금액은 `quote`에서 사용할 수 있는 1 WETH의 비용입니다.

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

`buy()` 및 `sell()` 함수는 거의 동일합니다. 먼저 `SwapRouter`에 대한 충분한 허용량을 승인한 다음 올바른 경로와 금액으로 호출합니다.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

두 통화의 사용자 잔액을 보고합니다.

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

이 에이전트는 현재 한 번만 작동합니다. 하지만 [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html)에서 실행하거나 368-400행을 루프로 감싸고 [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep)를 사용하여 다음 주기가 될 때까지 기다리도록 변경하여 계속 작동하게 할 수 있습니다.

## 개선 가능성 {#improvements}

이것은 완전한 프로덕션 버전이 아니며, 단지 기본 사항을 가르치기 위한 예시일 뿐입니다. 다음은 개선을 위한 몇 가지 아이디어입니다.

### 더 스마트한 트레이딩 {#smart-trading}

에이전트가 무엇을 할지 결정할 때 무시하는 두 가지 중요한 사실이 있습니다.

- _예상되는 변화의 크기_. 에이전트는 가격이 하락할 것으로 예상되면 하락의 크기에 관계없이 고정된 양의 `WETH`를 판매합니다.
  사소한 변화는 무시하고 가격이 얼마나 하락할 것으로 예상되는지에 따라 판매하는 것이 더 나을 것입니다.
- _현재 포트폴리오_. 포트폴리오의 10%가 WETH이고 가격이 오를 것이라고 생각한다면 더 많이 사는 것이 합리적일 수 있습니다. 그러나 포트폴리오의 90%가 WETH인 경우, 이미 충분히 노출되어 있으므로 더 이상 구매할 필요가 없습니다. 가격이 하락할 것으로 예상하면 그 반대입니다.

### 트레이딩 전략을 비밀로 유지하고 싶다면 어떻게 해야 할까요? {#secret}

AI 공급업체는 LLM에 보내는 쿼리를 볼 수 있으며, 이는 에이전트로 개발한 천재적인 트레이딩 시스템을 노출시킬 수 있습니다. 너무 많은 사람이 사용하는 트레이딩 시스템은 가치가 없습니다. 왜냐하면 사고 싶을 때 너무 많은 사람이 사려고 해서 가격이 오르고, 팔고 싶을 때 너무 많은 사람이 팔려고 해서 가격이 내려가기 때문입니다.

이 문제를 피하기 위해 [LM-Studio](https://lmstudio.ai/) 등을 사용하여 로컬에서 LLM을 실행할 수 있습니다.

### AI 봇에서 AI 에이전트로 {#bot-to-agent}

이것이 [AI 에이전트가 아닌 AI 봇](/ai-agents/#ai-agents-vs-ai-bots)이라는 좋은 주장을 할 수 있습니다. 미리 정의된 정보에 의존하는 비교적 간단한 전략을 구현합니다. 예를 들어, Uniswap v3 풀 목록과 최신 값을 제공하고 어떤 조합이 가장 좋은 예측 가치를 갖는지 물어봄으로써 자기 개선을 가능하게 할 수 있습니다.

### 슬리피지 보호 {#slippage-protection}

현재 [슬리피지 보호](https://uniswapv3book.com/milestone_3/slippage-protection.html) 기능이 없습니다. 현재 시세가 2000달러이고 예상 가격이 2100달러라면 에이전트는 매수할 것입니다. 그러나 에이전트가 매수하기 전에 비용이 2200달러로 오르면 더 이상 매수할 의미가 없습니다.

슬리피지 보호를 구현하려면 [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325)의 325행과 334행에 `amountOutMinimum` 값을 지정합니다.

## 결론 {#conclusion}

이제 AI 에이전트를 시작하는 데 충분한 정보를 얻으셨기를 바랍니다. 이것은 이 주제에 대한 포괄적인 개요가 아니며, 전체 책이 그에 할애되어 있지만, 시작하기에는 충분합니다. 행운을 빕니다!

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
