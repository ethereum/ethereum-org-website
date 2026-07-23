---
title: "Tạo tác nhân AI giao dịch của riêng bạn trên Ethereum"
description: "Trong hướng dẫn này, bạn sẽ học cách tạo một tác nhân AI giao dịch đơn giản. Tác nhân này đọc thông tin từ Chuỗi khối, yêu cầu LLM đưa ra đề xuất dựa trên thông tin đó, thực hiện giao dịch mà LLM đề xuất, sau đó chờ và lặp lại."
author: Ori Pomerantz
tags:
  - AI
  - giao dịch
  - tác nhân
  - python
skill: intermediate
breadcrumb: "Tác nhân AI giao dịch"
published: 2026-02-13
lang: vi
sidebarDepth: 3
---

Trong hướng dẫn này, bạn sẽ học cách xây dựng một tác nhân AI giao dịch đơn giản. Tác nhân này hoạt động theo các bước sau:

1. Đọc giá hiện tại và quá khứ của một token, cũng như các thông tin khác có thể liên quan
2. Xây dựng một truy vấn với thông tin này, cùng với thông tin cơ sở để giải thích cách nó có thể liên quan
3. Gửi truy vấn và nhận lại mức giá dự kiến
4. Giao dịch dựa trên đề xuất
5. Chờ và lặp lại

Tác nhân này minh họa cách đọc thông tin, chuyển đổi nó thành một truy vấn mang lại câu trả lời có thể sử dụng được và sử dụng câu trả lời đó. Tất cả những điều này là các bước cần thiết cho một tác nhân AI. Tác nhân này được triển khai bằng Python vì đây là ngôn ngữ phổ biến nhất được sử dụng trong AI.

## Tại sao nên làm điều này? {#why-do-this}

Các tác nhân giao dịch tự động cho phép các nhà phát triển chọn và thực thi một chiến lược giao dịch. [Các tác nhân AI](/ai-agents) cho phép các chiến lược giao dịch phức tạp và linh hoạt hơn, có khả năng sử dụng thông tin và thuật toán mà nhà phát triển thậm chí chưa từng nghĩ đến việc sử dụng.

## Các công cụ {#tools}

Hướng dẫn này sử dụng [Python](https://www.python.org/), [Thư viện Web3](https://web3py.readthedocs.io/en/stable/) và [Uniswap v3](https://github.com/Uniswap/v3-periphery) để lấy báo giá và giao dịch.

### Tại sao lại là Python? {#python}

Ngôn ngữ được sử dụng rộng rãi nhất cho AI là [Python](https://www.python.org/), vì vậy chúng ta sử dụng nó ở đây. Đừng lo lắng nếu bạn không biết Python. Ngôn ngữ này rất rõ ràng và tôi sẽ giải thích chính xác những gì nó làm.

[Thư viện Web3](https://web3py.readthedocs.io/en/stable/) là API Ethereum phổ biến nhất của Python. Nó khá dễ sử dụng.

### Giao dịch trên Chuỗi khối {#trading-on-blockchain}

Có [nhiều sàn giao dịch phi tập trung (DEX)](/apps/categories/defi/) cho phép bạn giao dịch token trên Ethereum. Tuy nhiên, chúng có xu hướng có tỷ giá hối đoái tương tự nhau do [kinh doanh chênh lệch giá (arbitrage)](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) là một DEX được sử dụng rộng rãi mà chúng ta có thể sử dụng cho cả báo giá (để xem giá trị tương đối của token) và giao dịch.

### OpenAI {#openai}

Đối với mô hình ngôn ngữ lớn, tôi đã chọn bắt đầu với [OpenAI](https://openai.com/). Để chạy ứng dụng trong hướng dẫn này, bạn sẽ cần trả phí để truy cập API. Khoản thanh toán tối thiểu 5 đô la là quá đủ.

## Phát triển, từng bước một {#step-by-step}

Để đơn giản hóa quá trình phát triển, chúng ta tiến hành theo từng giai đoạn. Mỗi bước là một nhánh trên GitHub.

### Bắt đầu {#getting-started}

Dưới đây là các bước để bắt đầu trên UNIX hoặc Linux (bao gồm [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Nếu bạn chưa có, hãy tải xuống và cài đặt [Python](https://www.python.org/downloads/).

2. Sao chép (clone) kho lưu trữ GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Cài đặt [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Lệnh trên hệ thống của bạn có thể khác.

   ```sh
   pipx install uv
   ```

4. Tải xuống các Thư viện.

   ```sh
   uv sync
   ```

5. Kích hoạt môi trường ảo.

   ```sh
   source .venv/bin/activate
   ```

6. Để xác minh Python và Web3 đang hoạt động chính xác, hãy chạy `python3` và cung cấp cho nó chương trình này. Bạn có thể nhập nó tại dấu nhắc `>>>`; không cần phải tạo tệp.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Đọc từ Chuỗi khối {#read-blockchain}

Bước tiếp theo là đọc từ Chuỗi khối. Để làm điều đó, bạn cần chuyển sang nhánh `02-read-quote` và sau đó sử dụng `uv` để chạy chương trình.

```sh
git checkout 02-read-quote
uv run agent.py
```

Bạn sẽ nhận được một danh sách các đối tượng `Quote`, mỗi đối tượng có một dấu thời gian, một mức giá và tài sản (hiện tại luôn là `WETH/USDC`).

Dưới đây là giải thích từng dòng.

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

Nhập các Thư viện chúng ta cần. Chúng được giải thích bên dưới khi được sử dụng.

```python
print = functools.partial(print, flush=True)
```

Thay thế `print` của Python bằng một phiên bản luôn đẩy (flush) đầu ra ngay lập tức. Điều này hữu ích trong một tập lệnh chạy dài vì chúng ta không muốn chờ đợi các bản cập nhật trạng thái hoặc đầu ra gỡ lỗi.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Một URL để truy cập Mạng chính. Bạn có thể lấy một URL từ [Nút dưới dạng dịch vụ (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) hoặc sử dụng một trong những URL được quảng cáo trên [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Một khối Mạng chính Ethereum thường xuất hiện mỗi mười hai giây, vì vậy đây là số lượng khối chúng ta dự kiến sẽ xảy ra trong một khoảng thời gian. Lưu ý rằng đây không phải là một con số chính xác. Khi [người đề xuất khối](/developers/docs/consensus-mechanisms/pos/block-proposal/) ngừng hoạt động, khối đó sẽ bị bỏ qua và thời gian cho khối tiếp theo là 24 giây. Nếu chúng ta muốn lấy chính xác khối cho một dấu thời gian, chúng ta sẽ sử dụng [tìm kiếm nhị phân](https://en.wikipedia.org/wiki/Binary_search). Tuy nhiên, điều này là đủ gần cho mục đích của chúng ta. Dự đoán tương lai không phải là một môn khoa học chính xác.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Kích thước của chu kỳ. Chúng ta xem xét các báo giá một lần mỗi chu kỳ và cố gắng ước tính giá trị vào cuối chu kỳ tiếp theo.

```python
# Địa chỉ của pool mà chúng ta đang đọc
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Các giá trị báo giá được lấy từ nhóm Uniswap 3 USDC/WETH tại Địa chỉ [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Địa chỉ này đã ở dạng checksum, nhưng tốt hơn là sử dụng [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) để làm cho mã có thể tái sử dụng.

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

Đây là các [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) cho hai hợp đồng mà chúng ta cần liên hệ. Để giữ cho mã ngắn gọn, chúng ta chỉ bao gồm các hàm mà chúng ta cần gọi.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Khởi tạo Thư viện [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) và kết nối với một nút Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Đây là một cách để tạo một lớp dữ liệu (data class) trong Python. Kiểu dữ liệu [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) được sử dụng để kết nối với hợp đồng. Lưu ý `(frozen=True)`. Trong Python, [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) được định nghĩa là `True` hoặc `False`, viết hoa chữ cái đầu. Lớp dữ liệu này là `frozen`, nghĩa là các trường không thể bị sửa đổi.

Lưu ý phần thụt lề. Trái ngược với [các ngôn ngữ bắt nguồn từ C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python sử dụng thụt lề để biểu thị các khối. Trình thông dịch Python biết rằng định nghĩa sau đây không phải là một phần của lớp dữ liệu này vì nó không bắt đầu ở cùng mức thụt lề với các trường của lớp dữ liệu.

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

Kiểu [`Decimal`](https://docs.python.org/3/library/decimal.html) được sử dụng để xử lý chính xác các phân số thập phân.

```python
    def get_price(self, block: int) -> Decimal:
```

Đây là cách để định nghĩa một hàm trong Python. Định nghĩa được thụt lề để cho thấy nó vẫn là một phần của `PoolInfo`.

Trong một hàm là một phần của lớp dữ liệu, tham số đầu tiên luôn là `self`, phiên bản lớp dữ liệu đã gọi ở đây. Ở đây có một tham số khác, số khối.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Nếu chúng ta có thể đọc được tương lai, chúng ta sẽ không cần AI để giao dịch.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Cú pháp để gọi một hàm trên EVM từ Web3 là thế này: `<contract object>.functions.<function name>().call(<parameters>)`. Các tham số có thể là các tham số của hàm EVM (nếu có; ở đây thì không) hoặc [các tham số được đặt tên](https://en.wikipedia.org/wiki/Named_parameter) để sửa đổi hành vi của Chuỗi khối. Ở đây chúng ta sử dụng một tham số, `block_identifier`, để chỉ định [số khối](/developers/docs/apis/json-rpc/#default-block) mà chúng ta muốn chạy.

Kết quả là [cấu trúc này, ở dạng mảng](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Giá trị đầu tiên là một hàm của tỷ giá hối đoái giữa hai token.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Để giảm các tính toán trên chuỗi, Uniswap v3 không lưu trữ hệ số trao đổi thực tế mà là căn bậc hai của nó. Bởi vì EVM không hỗ trợ toán học dấu phẩy động hoặc phân số, thay vì giá trị thực tế, phản hồi là <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 trên mỗi token0)
        return 1/(raw_price * self.decimal_factor)
```

Giá thô mà chúng ta nhận được là số lượng `token0` chúng ta nhận được cho mỗi `token1`. Trong nhóm của chúng ta, `token0` là USDC (stablecoin có cùng giá trị với một đô la Mỹ) và `token1` là [WETH](https://opensea.io/learn/blockchain/what-is-weth). Giá trị chúng ta thực sự muốn là số đô la cho mỗi WETH, chứ không phải ngược lại.

Hệ số thập phân là tỷ lệ giữa [các hệ số thập phân](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) của hai token.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Lớp dữ liệu này đại diện cho một báo giá: giá của một tài sản cụ thể tại một thời điểm nhất định. Tại thời điểm này, trường `asset` không liên quan vì chúng ta sử dụng một nhóm duy nhất và do đó có một tài sản duy nhất. Tuy nhiên, chúng ta sẽ thêm nhiều tài sản hơn sau.

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

Hàm này nhận một Địa chỉ và trả về thông tin về hợp đồng token tại Địa chỉ đó. Để tạo một [`Contract` Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html) mới, chúng ta cung cấp Địa chỉ và ABI cho `w3.eth.contract`.

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

Hàm này trả về mọi thứ chúng ta cần về [một nhóm cụ thể](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Cú pháp `f"<string>"` là một [chuỗi được định dạng](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Lấy một đối tượng `Quote`. Giá trị mặc định cho `block_number` là `None` (không có giá trị).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Nếu số khối không được chỉ định, hãy sử dụng `w3.eth.block_number`, đây là số khối mới nhất. Đây là cú pháp cho [một câu lệnh `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Có vẻ như sẽ tốt hơn nếu chỉ đặt mặc định là `w3.eth.block_number`, nhưng điều đó không hoạt động tốt vì nó sẽ là số khối tại thời điểm hàm được định nghĩa. Trong một tác nhân chạy dài, điều này sẽ là một vấn đề.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Sử dụng [Thư viện `datetime`](https://docs.python.org/3/library/datetime.html) để định dạng nó thành một định dạng có thể đọc được đối với con người và các mô hình ngôn ngữ lớn (LLM). Sử dụng [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) để làm tròn giá trị đến hai chữ số thập phân.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Trong Python, bạn định nghĩa một [danh sách](https://docs.python.org/3/library/stdtypes.html#typesseq-list) chỉ có thể chứa một kiểu cụ thể bằng cách sử dụng `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Trong Python, một [vòng lặp `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) thường lặp qua một danh sách. Danh sách các số khối để tìm báo giá đến từ [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Đối với mỗi số khối, lấy một đối tượng `Quote` và thêm nó vào danh sách `quotes`. Sau đó trả về danh sách đó.

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

Đây là mã chính của tập lệnh. Đọc thông tin nhóm, lấy mười hai báo giá và [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) chúng.

### Tạo một lời nhắc (prompt) {#prompt}

Tiếp theo, chúng ta cần chuyển đổi danh sách báo giá này thành một lời nhắc cho LLM và nhận được giá trị tương lai dự kiến.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Đầu ra bây giờ sẽ là một lời nhắc cho LLM, tương tự như:

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

Lưu ý rằng có báo giá cho hai tài sản ở đây, `WETH/USDC` và `WBTC/WETH`. Việc thêm báo giá từ một tài sản khác có thể cải thiện độ chính xác của dự đoán.

#### Lời nhắc trông như thế nào {#prompt-explanation}

Lời nhắc này chứa ba phần, khá phổ biến trong các lời nhắc LLM.

1. Thông tin. Các LLM có rất nhiều thông tin từ quá trình đào tạo của chúng, nhưng chúng thường không có thông tin mới nhất. Đây là lý do chúng ta cần truy xuất các báo giá mới nhất ở đây. Việc thêm thông tin vào một lời nhắc được gọi là [thế hệ tăng cường truy xuất (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Câu hỏi thực tế. Đây là những gì chúng ta muốn biết.

3. Hướng dẫn định dạng đầu ra. Thông thường, một LLM sẽ cung cấp cho chúng ta một ước tính kèm theo lời giải thích về cách nó đạt được điều đó. Điều này tốt hơn cho con người, nhưng một chương trình máy tính chỉ cần kết quả cuối cùng.

#### Giải thích mã {#prompt-code}

Dưới đây là mã mới.

```python
from datetime import datetime, timezone, timedelta
```

Chúng ta cần cung cấp cho LLM thời gian mà chúng ta muốn ước tính. Để có được thời gian "n phút/giờ/ngày" trong tương lai, chúng ta sử dụng [lớp `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Các địa chỉ của các pool mà chúng ta đang đọc
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Chúng ta có hai nhóm cần đọc.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 trên mỗi token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Trong nhóm WETH/USDC, chúng ta muốn biết cần bao nhiêu `token0` (USDC) để mua một `token1` (WETH). Trong nhóm WETH/WBTC, chúng ta muốn biết cần bao nhiêu `token1` (WETH) để mua một `token0` (WBTC, tức là Bitcoin được bọc). Chúng ta cần theo dõi xem tỷ lệ của nhóm có cần bị đảo ngược hay không.

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

Để biết liệu một nhóm có cần bị đảo ngược hay không, chúng ta lấy điều đó làm đầu vào cho `read_pool`. Ngoài ra, ký hiệu tài sản cần được thiết lập chính xác.

Cú pháp `<a> if <b> else <c>` là cú pháp tương đương trong Python của [toán tử điều kiện ba ngôi](https://en.wikipedia.org/wiki/Ternary_conditional_operator), mà trong ngôn ngữ bắt nguồn từ C sẽ là `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Hàm này xây dựng một chuỗi định dạng danh sách các đối tượng `Quote`, giả sử tất cả chúng đều áp dụng cho cùng một tài sản.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Trong Python, [các chuỗi ký tự nhiều dòng](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) được viết dưới dạng `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Ở đây, chúng ta sử dụng mẫu [MapReduce](https://en.wikipedia.org/wiki/MapReduce) để tạo một chuỗi cho mỗi danh sách báo giá với `format_quotes`, sau đó rút gọn chúng thành một chuỗi duy nhất để sử dụng trong lời nhắc.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Phần còn lại của lời nhắc đúng như dự kiến.

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

Xem xét hai nhóm và lấy báo giá từ cả hai.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Xác định thời điểm trong tương lai mà chúng ta muốn ước tính và tạo lời nhắc.

### Giao tiếp với một LLM {#interface-llm}

Tiếp theo, chúng ta nhắc một LLM thực tế và nhận được giá trị tương lai dự kiến. Tôi đã viết chương trình này bằng OpenAI, vì vậy nếu bạn muốn sử dụng một nhà cung cấp khác, bạn sẽ cần điều chỉnh nó.

1. Nhận một [Tài khoản OpenAI](https://auth.openai.com/create-account)
2. [Nạp tiền vào Tài khoản](https://platform.openai.com/settings/organization/billing/overview)—số tiền tối thiểu tại thời điểm viết bài là 5 đô la
3. [Tạo một khóa API](https://platform.openai.com/settings/organization/api-keys)
4. Trong dòng lệnh, xuất khóa API để chương trình của bạn có thể sử dụng nó

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Checkout và chạy tác nhân

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Dưới đây là mã mới.

```python
from openai import OpenAI

open_ai = OpenAI()  # Máy khách đọc biến môi trường OPENAI_API_KEY
```

Nhập và khởi tạo API OpenAI.

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

Gọi API OpenAI (`open_ai.chat.completions.create`) để tạo phản hồi.

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

Xuất giá và cung cấp đề xuất mua hoặc bán.

#### Kiểm tra các dự đoán {#testing-the-predictions}

Bây giờ chúng ta có thể tạo ra các dự đoán, chúng ta cũng có thể sử dụng dữ liệu lịch sử để đánh giá xem chúng ta có đưa ra các dự đoán hữu ích hay không.

```sh
uv run test-predictor.py
```

Kết quả dự kiến tương tự như:

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

Phần lớn trình kiểm tra giống hệt với tác nhân, nhưng đây là những phần mới hoặc được sửa đổi.

```python
CYCLES_FOR_TEST = 40 # Đối với backtest, chúng ta kiểm tra qua bao nhiêu chu kỳ

# Lấy nhiều báo giá
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

Chúng ta xem xét `CYCLES_FOR_TEST` (được chỉ định là 40 ở đây) ngày trước.

```python
# Tạo các dự đoán và đối chiếu chúng với lịch sử thực tế

total_error = Decimal(0)
changes = []
```

Có hai loại lỗi mà chúng ta quan tâm. Loại đầu tiên, `total_error`, đơn giản là tổng các lỗi mà trình dự đoán đã mắc phải.

Để hiểu loại thứ hai, `changes`, chúng ta cần nhớ mục đích của tác nhân. Nó không phải để dự đoán tỷ lệ WETH/USDC (giá ETH). Nó là để đưa ra các đề xuất bán và mua. Nếu giá hiện tại là 2000 đô la và nó dự đoán 2010 đô la vào ngày mai, chúng ta không bận tâm nếu kết quả thực tế là 2020 đô la và chúng ta kiếm thêm tiền. Nhưng chúng ta _sẽ_ bận tâm nếu nó dự đoán 2010 đô la, và mua ETH dựa trên đề xuất đó, và giá giảm xuống còn 1990 đô la.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Chúng ta chỉ có thể xem xét các trường hợp có sẵn lịch sử hoàn chỉnh (các giá trị được sử dụng cho dự đoán và giá trị thực tế để so sánh). Điều này có nghĩa là trường hợp mới nhất phải là trường hợp bắt đầu từ `CYCLES_BACK` trước.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Sử dụng [các lát cắt (slices)](https://www.w3schools.com/python/ref_func_slice.asp) để lấy cùng số lượng mẫu như số lượng mà tác nhân sử dụng. Mã giữa đây và phân đoạn tiếp theo là cùng một mã lấy dự đoán mà chúng ta có trong tác nhân.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Lấy giá dự đoán, giá thực tế và giá tại thời điểm dự đoán. Chúng ta cần giá tại thời điểm dự đoán để xác định xem đề xuất là mua hay bán.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Tính toán lỗi và thêm nó vào tổng số.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Đối với `changes`, chúng ta muốn biết tác động tiền tệ của việc mua hoặc bán một ETH. Vì vậy, trước tiên, chúng ta cần xác định đề xuất, sau đó đánh giá xem giá thực tế đã thay đổi như thế nào và liệu đề xuất đó có kiếm được tiền (thay đổi tích cực) hay làm mất tiền (thay đổi tiêu cực).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Báo cáo kết quả.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Sử dụng [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) để đếm số ngày có lãi và số ngày bị lỗ. Kết quả là một đối tượng bộ lọc, mà chúng ta cần chuyển đổi thành một danh sách để lấy độ dài.

### Gửi các giao dịch {#submit-txn}

Bây giờ chúng ta cần thực sự gửi các giao dịch. Tuy nhiên, tôi không muốn tiêu tiền thật vào thời điểm này, trước khi hệ thống được chứng minh. Thay vào đó, chúng ta sẽ tạo một Phân nhánh cục bộ của Mạng chính và "giao dịch" trên mạng lưới đó.

Dưới đây là các bước để tạo một Phân nhánh cục bộ và kích hoạt giao dịch.

1. Cài đặt [Foundry](https://getfoundry.sh/introduction/installation)

2. Khởi động [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` đang lắng nghe trên URL mặc định cho Foundry, http://localhost:8545, vì vậy chúng ta không cần chỉ định URL cho [lệnh `cast`](https://getfoundry.sh/cast/overview) mà chúng ta sử dụng để thao tác với Chuỗi khối.

3. Khi chạy trong `anvil`, có mười Tài khoản thử nghiệm có ETH—hãy thiết lập các biến môi trường cho Tài khoản đầu tiên

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Đây là các hợp đồng chúng ta cần sử dụng. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) là hợp đồng Uniswap v3 mà chúng ta sử dụng để thực sự giao dịch. Chúng ta có thể giao dịch trực tiếp thông qua nhóm, nhưng cách này dễ dàng hơn nhiều.

   Hai biến dưới cùng là các đường dẫn Uniswap v3 cần thiết để hoán đổi giữa WETH và USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Mỗi Tài khoản thử nghiệm có 10.000 ETH. Sử dụng hợp đồng WETH để bọc 1000 ETH nhằm thu được 1000 WETH để giao dịch.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Sử dụng `SwapRouter` để giao dịch 500 WETH lấy USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Lệnh gọi `approve` tạo ra một hạn mức cho phép `SwapRouter` chi tiêu một số token của chúng ta. Các hợp đồng không thể giám sát các sự kiện, vì vậy nếu chúng ta chuyển token trực tiếp đến hợp đồng `SwapRouter`, nó sẽ không biết rằng nó đã được thanh toán. Thay vào đó, chúng ta cho phép hợp đồng `SwapRouter` chi tiêu một số lượng nhất định, và sau đó `SwapRouter` thực hiện điều đó. Điều này được thực hiện thông qua một hàm được gọi bởi `SwapRouter`, vì vậy nó biết liệu nó có thành công hay không.

7. Xác minh bạn có đủ cả hai token.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Bây giờ chúng ta đã có WETH và USDC, chúng ta có thể thực sự chạy tác nhân.

```sh
git checkout 05-trade
uv run agent.py
```

Đầu ra sẽ trông tương tự như:

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

Để thực sự sử dụng nó, bạn cần một vài thay đổi nhỏ.

- Ở dòng 14, thay đổi `MAINNET_URL` thành một điểm truy cập thực, chẳng hạn như `https://eth.drpc.org`
- Ở dòng 28, thay đổi `PRIVATE_KEY` thành khóa riêng tư của riêng bạn
- Trừ khi bạn rất giàu có và có thể mua hoặc bán 1 ETH mỗi ngày cho một tác nhân chưa được chứng minh, bạn có thể muốn thay đổi dòng 29 để giảm `WETH_TRADE_AMOUNT`

#### Giải thích mã {#trading-code}

Dưới đây là mã mới.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Các biến tương tự mà chúng ta đã sử dụng trong bước 4.

```python
WETH_TRADE_AMOUNT=1
```

Số lượng để giao dịch.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Để thực sự giao dịch, chúng ta cần hàm `approve`. Chúng ta cũng muốn hiển thị số dư trước và sau, vì vậy chúng ta cũng cần `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Trong ABI của `SwapRouter`, chúng ta chỉ cần `exactInput`. Có một hàm liên quan, `exactOutput`, chúng ta có thể sử dụng để mua chính xác một WETH, nhưng để đơn giản, chúng ta chỉ sử dụng `exactInput` trong cả hai trường hợp.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Các định nghĩa Web3 cho [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) và hợp đồng `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Các tham số giao dịch. Chúng ta cần một hàm ở đây vì [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) phải thay đổi mỗi lần.

```python
def approve_token(contract: Contract, amount: int):
```

Chấp thuận một hạn mức token cho `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Đây là cách chúng ta gửi một giao dịch trong Web3. Đầu tiên, chúng ta sử dụng [đối tượng `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) để xây dựng giao dịch. Sau đó, chúng ta sử dụng [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) để ký giao dịch, sử dụng `PRIVATE_KEY`. Cuối cùng, chúng ta sử dụng [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) để gửi giao dịch.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) chờ cho đến khi giao dịch được khai thác. Nó trả về biên lai nếu cần.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Đây là các tham số khi bán WETH.

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

Trái ngược với `SELL_PARAMS`, các tham số mua có thể thay đổi. Số lượng đầu vào là chi phí của 1 WETH, như có sẵn trong `quote`.

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

Các hàm `buy()` và `sell()` gần như giống hệt nhau. Đầu tiên, chúng ta chấp thuận một hạn mức đủ cho `SwapRouter`, và sau đó chúng ta gọi nó với đường dẫn và số lượng chính xác.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Báo cáo số dư của người dùng bằng cả hai loại tiền tệ.

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

Tác nhân này hiện chỉ hoạt động một lần. Tuy nhiên, bạn có thể thay đổi nó để hoạt động liên tục bằng cách chạy nó từ [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) hoặc bằng cách bọc các dòng 368-400 trong một vòng lặp và sử dụng [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) để chờ cho đến khi đến thời điểm cho chu kỳ tiếp theo.

## Các cải tiến có thể có {#improvements}

Đây không phải là một phiên bản sản xuất đầy đủ; nó chỉ đơn thuần là một ví dụ để dạy những điều cơ bản. Dưới đây là một số ý tưởng để cải tiến.

### Giao dịch thông minh hơn {#smart-trading}

Có hai sự thật quan trọng mà tác nhân bỏ qua khi quyết định phải làm gì.

- _Mức độ thay đổi dự kiến_. Tác nhân bán một lượng cố định `WETH` nếu giá dự kiến sẽ giảm, bất kể mức độ giảm là bao nhiêu.
  Có thể cho rằng, sẽ tốt hơn nếu bỏ qua những thay đổi nhỏ và bán dựa trên mức độ chúng ta dự đoán giá sẽ giảm.
- _Danh mục đầu tư hiện tại_. Nếu 10% danh mục đầu tư của bạn là WETH và bạn nghĩ rằng giá sẽ tăng, có lẽ việc mua thêm là hợp lý. Nhưng nếu 90% danh mục đầu tư của bạn là WETH, bạn có thể đã tiếp xúc đủ và không cần phải mua thêm. Điều ngược lại cũng đúng nếu bạn dự đoán giá sẽ giảm.

### Điều gì xảy ra nếu bạn muốn giữ bí mật chiến lược giao dịch của mình? {#secret}

Các nhà cung cấp AI có thể xem các truy vấn bạn gửi đến LLM của họ, điều này có thể làm lộ hệ thống giao dịch thiên tài mà bạn đã phát triển với tác nhân của mình. Một hệ thống giao dịch mà quá nhiều người sử dụng là vô giá trị vì quá nhiều người cố gắng mua khi bạn muốn mua (và giá tăng lên) và cố gắng bán khi bạn muốn bán (và giá giảm xuống).

Bạn có thể chạy một LLM cục bộ, ví dụ: sử dụng [LM-Studio](https://lmstudio.ai/), để tránh vấn đề này.

### Từ bot AI đến tác nhân AI {#bot-to-agent}

Bạn có thể đưa ra một lập luận tốt rằng đây là [một bot AI, không phải là một tác nhân AI](/ai-agents/#ai-agents-vs-ai-bots). Nó thực hiện một chiến lược tương đối đơn giản dựa trên thông tin được xác định trước. Chúng ta có thể kích hoạt khả năng tự cải thiện, ví dụ: bằng cách cung cấp danh sách các nhóm Uniswap v3 và các giá trị mới nhất của chúng và hỏi sự kết hợp nào có giá trị dự đoán tốt nhất.

### Bảo vệ trượt giá {#slippage-protection}

Hiện tại không có [bảo vệ trượt giá](https://uniswapv3book.com/milestone_3/slippage-protection.html). Nếu báo giá hiện tại là 2000 đô la và giá dự kiến là 2100 đô la, tác nhân sẽ mua. Tuy nhiên, nếu trước khi tác nhân mua, chi phí tăng lên 2200 đô la, thì việc mua không còn ý nghĩa nữa.

Để triển khai bảo vệ trượt giá, hãy chỉ định một giá trị `amountOutMinimum` ở các dòng 325 và 334 của [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Kết luận {#conclusion}

Hy vọng rằng, bây giờ bạn đã biết đủ để bắt đầu với các tác nhân AI. Đây không phải là một cái nhìn tổng quan toàn diện về chủ đề này; có toàn bộ những cuốn sách dành riêng cho điều đó, nhưng điều này là đủ để bạn bắt đầu. Chúc may mắn!

[Xem tại đây để biết thêm về công việc của tôi](https://cryptodocguy.pro/).