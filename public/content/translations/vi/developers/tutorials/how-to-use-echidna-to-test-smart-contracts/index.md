---
title: Cách sử dụng Echidna để kiểm thử hợp đồng thông minh
description: Cách sử dụng Echidna để tự động kiểm thử hợp đồng thông minh
author: "Trailofbits"
lang: vi
tags: ["solidity", "hợp đồng thông minh", "bảo mật", "kiểm thử", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Cài đặt {#installation}

Echidna có thể được cài đặt thông qua Docker hoặc sử dụng tệp nhị phân đã được biên dịch sẵn.

### Cài đặt Echidna thông qua Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Lệnh cuối cùng chạy eth-security-toolbox trong một Docker có quyền truy cập vào thư mục hiện tại của bạn. Bạn có thể thay đổi các tệp từ máy chủ của mình và chạy các công cụ trên các tệp từ Docker_

Bên trong Docker, hãy chạy:

```bash
solc-select 0.5.11
cd /home/training
```

### Tệp nhị phân {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Giới thiệu về fuzzing dựa trên thuộc tính {#introduction-to-property-based-fuzzing}

Echidna là một công cụ fuzzer dựa trên thuộc tính, chúng tôi đã mô tả trong các bài đăng blog trước đây ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) là một kỹ thuật nổi tiếng trong cộng đồng bảo mật. Nó bao gồm việc tạo ra các đầu vào ít nhiều mang tính ngẫu nhiên để tìm lỗi trong chương trình. Các công cụ fuzzer cho phần mềm truyền thống (chẳng hạn như [AFL](http://lcamtuf.coredump.cx/afl/) hoặc [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) được biết đến là những công cụ hiệu quả để tìm lỗi.

Ngoài việc tạo đầu vào hoàn toàn ngẫu nhiên, có nhiều kỹ thuật và chiến lược để tạo ra các đầu vào tốt, bao gồm:

- Nhận phản hồi từ mỗi lần thực thi và sử dụng nó để hướng dẫn việc tạo đầu vào. Ví dụ: nếu một đầu vào mới được tạo dẫn đến việc khám phá một đường dẫn mới, thì việc tạo các đầu vào mới gần giống với nó là điều hợp lý.
- Tạo đầu vào tuân thủ một ràng buộc cấu trúc. Ví dụ: nếu đầu vào của bạn chứa một tiêu đề có checksum, thì việc để fuzzer tạo đầu vào xác thực checksum đó là điều hợp lý.
- Sử dụng các đầu vào đã biết để tạo đầu vào mới: nếu bạn có quyền truy cập vào một tập dữ liệu lớn gồm các đầu vào hợp lệ, fuzzer của bạn có thể tạo các đầu vào mới từ chúng, thay vì bắt đầu tạo lại từ đầu. Chúng thường được gọi là _seeds_ (hạt giống).

### Fuzzing dựa trên thuộc tính {#property-based-fuzzing}

Echidna thuộc về một họ fuzzer cụ thể: fuzzing dựa trên thuộc tính được lấy cảm hứng mạnh mẽ từ [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Trái ngược với fuzzer cổ điển sẽ cố gắng tìm các sự cố (crash), Echidna sẽ cố gắng phá vỡ các bất biến (invariants) do người dùng xác định.

Trong các hợp đồng thông minh, các bất biến là các hàm Solidity, có thể đại diện cho bất kỳ trạng thái không chính xác hoặc không hợp lệ nào mà hợp đồng có thể đạt tới, bao gồm:

- Kiểm soát truy cập không chính xác: kẻ tấn công đã trở thành chủ sở hữu của hợp đồng.
- Máy trạng thái không chính xác: các token có thể được chuyển trong khi hợp đồng đang bị tạm dừng.
- Số học không chính xác: người dùng có thể làm tràn dưới (underflow) số dư của họ và nhận được token miễn phí không giới hạn.

### Kiểm thử một thuộc tính với Echidna {#testing-a-property-with-echidna}

Chúng ta sẽ xem cách kiểm thử một hợp đồng thông minh với Echidna. Mục tiêu là hợp đồng thông minh sau [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Chúng ta sẽ giả định rằng token này phải có các thuộc tính sau:

- Bất kỳ ai cũng có thể có tối đa 1000 token
- Token không thể được chuyển nhượng (nó không phải là token ERC-20)

### Viết một thuộc tính {#write-a-property}

Các thuộc tính của Echidna là các hàm Solidity. Một thuộc tính phải:

- Không có đối số
- Trả về `true` nếu nó thành công
- Có tên bắt đầu bằng `echidna`

Echidna sẽ:

- Tự động tạo các giao dịch tùy ý để kiểm thử thuộc tính.
- Báo cáo bất kỳ giao dịch nào dẫn đến việc một thuộc tính trả về `false` hoặc ném ra lỗi.
- Loại bỏ tác dụng phụ khi gọi một thuộc tính (nghĩa là, nếu thuộc tính thay đổi một biến trạng thái, nó sẽ bị loại bỏ sau khi kiểm thử)

Thuộc tính sau kiểm tra xem người gọi có không quá 1000 token hay không:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Sử dụng tính kế thừa để tách hợp đồng của bạn khỏi các thuộc tính của bạn:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) triển khai thuộc tính và kế thừa từ token.

### Khởi tạo một hợp đồng {#initiate-a-contract}

Echidna cần một [hàm khởi tạo](/developers/docs/smart-contracts/anatomy/#constructor-functions) không có đối số. Nếu hợp đồng của bạn cần một khởi tạo cụ thể, bạn cần thực hiện nó trong hàm khởi tạo.

Có một số địa chỉ cụ thể trong Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` gọi hàm khởi tạo.
- `0x10000`, `0x20000`, và `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` gọi ngẫu nhiên các hàm khác.

Chúng ta không cần bất kỳ khởi tạo cụ thể nào trong ví dụ hiện tại, do đó hàm khởi tạo của chúng ta trống.

### Chạy Echidna {#run-echidna}

Echidna được khởi chạy bằng:

```bash
echidna-test contract.sol
```

Nếu contract.sol chứa nhiều hợp đồng, bạn có thể chỉ định mục tiêu:

```bash
echidna-test contract.sol --contract MyContract
```

### Tóm tắt: Kiểm thử một thuộc tính {#summary-testing-a-property}

Phần sau đây tóm tắt quá trình chạy Echidna trên ví dụ của chúng ta:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna phát hiện ra rằng thuộc tính bị vi phạm nếu `backdoor` được gọi.

## Lọc các hàm để gọi trong một chiến dịch fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Chúng ta sẽ xem cách lọc các hàm để fuzzing.
Mục tiêu là hợp đồng thông minh sau:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Ví dụ nhỏ này buộc Echidna phải tìm một chuỗi các giao dịch nhất định để thay đổi một biến trạng thái.
Điều này khó đối với một fuzzer (khuyến nghị sử dụng một công cụ thực thi tượng trưng như [Manticore](https://github.com/trailofbits/manticore)).
Chúng ta có thể chạy Echidna để xác minh điều này:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Lọc các hàm {#filtering-functions}

Echidna gặp khó khăn trong việc tìm chuỗi chính xác để kiểm thử hợp đồng này vì hai hàm reset (`reset1` và `reset2`) sẽ đặt tất cả các biến trạng thái thành `false`.
Tuy nhiên, chúng ta có thể sử dụng một tính năng đặc biệt của Echidna để đưa hàm reset vào danh sách đen (blacklist) hoặc chỉ đưa các hàm `f`, `g`,
`h` và `i` vào danh sách trắng (whitelist).

Để đưa các hàm vào danh sách đen, chúng ta có thể sử dụng tệp cấu hình này:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Một cách tiếp cận khác để lọc các hàm là liệt kê các hàm trong danh sách trắng. Để làm điều đó, chúng ta có thể sử dụng tệp cấu hình này:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` mặc định là `true`.
- Việc lọc sẽ chỉ được thực hiện theo tên (không có tham số). Nếu bạn có `f()` và `f(uint256)`, bộ lọc `"f"` sẽ khớp với cả hai hàm.

### Chạy Echidna {#run-echidna-1}

Để chạy Echidna với tệp cấu hình `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna sẽ tìm thấy chuỗi các giao dịch để làm sai lệch thuộc tính gần như ngay lập tức.

### Tóm tắt: Lọc các hàm {#summary-filtering-functions}

Echidna có thể đưa vào danh sách đen hoặc danh sách trắng các hàm để gọi trong một chiến dịch fuzzing bằng cách sử dụng:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna bắt đầu một chiến dịch fuzzing bằng cách đưa `f1`, `f2` và `f3` vào danh sách đen hoặc chỉ gọi những hàm này, tùy thuộc vào giá trị của boolean `filterBlacklist`.

## Cách kiểm thử khẳng định (assert) của Solidity với Echidna {#how-to-test-soliditys-assert-with-echidna}

Trong hướng dẫn ngắn này, chúng tôi sẽ chỉ cho bạn cách sử dụng Echidna để kiểm thử việc kiểm tra khẳng định trong các hợp đồng. Giả sử chúng ta có một hợp đồng như thế này:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Viết một khẳng định {#write-an-assertion}

Chúng ta muốn đảm bảo rằng `tmp` nhỏ hơn hoặc bằng `counter` sau khi trả về hiệu số của nó. Chúng ta có thể viết một thuộc tính Echidna, nhưng chúng ta sẽ cần lưu trữ giá trị `tmp` ở đâu đó. Thay vào đó, chúng ta có thể sử dụng một khẳng định như thế này:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Chạy Echidna {#run-echidna-2}

Để kích hoạt kiểm thử lỗi khẳng định, hãy tạo một [tệp cấu hình Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Khi chúng ta chạy hợp đồng này trong Echidna, chúng ta thu được kết quả mong đợi:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Như bạn có thể thấy, Echidna báo cáo một số lỗi khẳng định trong hàm `inc`. Việc thêm nhiều hơn một khẳng định cho mỗi hàm là có thể, nhưng Echidna không thể cho biết khẳng định nào đã thất bại.

### Khi nào và cách sử dụng các khẳng định {#when-and-how-use-assertions}

Các khẳng định có thể được sử dụng như những lựa chọn thay thế cho các thuộc tính rõ ràng, đặc biệt nếu các điều kiện cần kiểm tra liên quan trực tiếp đến việc sử dụng chính xác một số thao tác `f`. Việc thêm các khẳng định sau một số mã sẽ bắt buộc việc kiểm tra diễn ra ngay sau khi nó được thực thi:

```solidity
function f(..) public {
    // một số mã phức tạp
    ...
    assert (condition);
    ...
}

```

Ngược lại, việc sử dụng một thuộc tính Echidna rõ ràng sẽ thực thi ngẫu nhiên các giao dịch và không có cách nào dễ dàng để bắt buộc chính xác thời điểm nó sẽ được kiểm tra. Vẫn có thể thực hiện cách giải quyết này:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Tuy nhiên, có một số vấn đề:

- Nó thất bại nếu `f` được khai báo là `internal` hoặc `external`.
- Không rõ nên sử dụng các đối số nào để gọi `f`.
- Nếu `f` hoàn nguyên, thuộc tính sẽ thất bại.

Nhìn chung, chúng tôi khuyên bạn nên làm theo [khuyến nghị của John Regehr](https://blog.regehr.org/archives/1091) về cách sử dụng các khẳng định:

- Không ép buộc bất kỳ tác dụng phụ nào trong quá trình kiểm tra khẳng định. Ví dụ: `assert(ChangeStateAndReturn() == 1)`
- Không khẳng định các câu lệnh hiển nhiên. Ví dụ `assert(var >= 0)` trong đó `var` được khai báo là `uint`.

Cuối cùng, vui lòng **không sử dụng** `require` thay vì `assert`, vì Echidna sẽ không thể phát hiện ra nó (nhưng hợp đồng vẫn sẽ hoàn nguyên).

### Tóm tắt: Kiểm tra khẳng định {#summary-assertion-checking}

Phần sau đây tóm tắt quá trình chạy Echidna trên ví dụ của chúng ta:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna phát hiện ra rằng khẳng định trong `inc` có thể thất bại nếu hàm này được gọi nhiều lần với các đối số lớn.

## Thu thập và sửa đổi một kho ngữ liệu (corpus) của Echidna {#collecting-and-modifying-an-echidna-corpus}

Chúng ta sẽ xem cách thu thập và sử dụng một kho ngữ liệu các giao dịch với Echidna. Mục tiêu là hợp đồng thông minh sau [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Ví dụ nhỏ này buộc Echidna phải tìm các giá trị nhất định để thay đổi một biến trạng thái. Điều này khó đối với một fuzzer
(khuyến nghị sử dụng một công cụ thực thi tượng trưng như [Manticore](https://github.com/trailofbits/manticore)).
Chúng ta có thể chạy Echidna để xác minh điều này:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Tuy nhiên, chúng ta vẫn có thể sử dụng Echidna để thu thập kho ngữ liệu khi chạy chiến dịch fuzzing này.

### Thu thập một kho ngữ liệu {#collecting-a-corpus}

Để kích hoạt việc thu thập kho ngữ liệu, hãy tạo một thư mục corpus:

```bash
mkdir corpus-magic
```

Và một [tệp cấu hình Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Bây giờ chúng ta có thể chạy công cụ của mình và kiểm tra kho ngữ liệu đã thu thập:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna vẫn không thể tìm thấy các giá trị ma thuật (magic values) chính xác, nhưng chúng ta có thể xem xét kho ngữ liệu mà nó đã thu thập.
Ví dụ, một trong những tệp này là:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Rõ ràng, đầu vào này sẽ không kích hoạt lỗi trong thuộc tính của chúng ta. Tuy nhiên, trong bước tiếp theo, chúng ta sẽ xem cách sửa đổi nó để làm điều đó.

### Gieo mầm (seeding) một kho ngữ liệu {#seeding-a-corpus}

Echidna cần một số trợ giúp để xử lý hàm `magic`. Chúng ta sẽ sao chép và sửa đổi đầu vào để sử dụng các tham số phù hợp cho nó:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Chúng ta sẽ sửa đổi `new.txt` để gọi `magic(42,129,333,0)`. Bây giờ, chúng ta có thể chạy lại Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Lần này, nó phát hiện ra rằng thuộc tính bị vi phạm ngay lập tức.

## Tìm các giao dịch có mức tiêu thụ Gas cao {#finding-transactions-with-high-gas-consumption}

Chúng ta sẽ xem cách tìm các giao dịch có mức tiêu thụ Gas cao với Echidna. Mục tiêu là hợp đồng thông minh sau:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Ở đây `expensive` có thể có mức tiêu thụ Gas lớn.

Hiện tại, Echidna luôn cần một thuộc tính để kiểm thử: ở đây `echidna_test` luôn trả về `true`.
Chúng ta có thể chạy Echidna để xác minh điều này:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Đo lường mức tiêu thụ Gas {#measuring-gas-consumption}

Để kích hoạt việc đo lường mức tiêu thụ Gas với Echidna, hãy tạo một tệp cấu hình `config.yaml`:

```yaml
estimateGas: true
```

Trong ví dụ này, chúng ta cũng sẽ giảm kích thước của chuỗi giao dịch để làm cho kết quả dễ hiểu hơn:

```yaml
seqLen: 2
estimateGas: true
```

### Chạy Echidna {#run-echidna-3}

Khi chúng ta đã tạo tệp cấu hình, chúng ta có thể chạy Echidna như thế này:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Lượng Gas hiển thị là một ước tính do [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) cung cấp.

### Lọc bỏ các lệnh gọi làm giảm Gas {#filtering-out-gas-reducing-calls}

Hướng dẫn về **lọc các hàm để gọi trong một chiến dịch fuzzing** ở trên cho thấy cách loại bỏ một số hàm khỏi quá trình kiểm thử của bạn.  
Điều này có thể rất quan trọng để có được ước tính Gas chính xác.
Hãy xem xét ví dụ sau:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Nếu Echidna có thể gọi tất cả các hàm, nó sẽ không dễ dàng tìm thấy các giao dịch có chi phí Gas cao:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Đó là vì chi phí phụ thuộc vào kích thước của `addrs` và các lệnh gọi ngẫu nhiên có xu hướng làm cho mảng gần như trống rỗng.
Tuy nhiên, việc đưa `pop` và `clear` vào danh sách đen mang lại cho chúng ta kết quả tốt hơn nhiều:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Tóm tắt: Tìm các giao dịch có mức tiêu thụ Gas cao {#summary-finding-transactions-with-high-gas-consumption}

Echidna có thể tìm thấy các giao dịch có mức tiêu thụ Gas cao bằng cách sử dụng tùy chọn cấu hình `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna sẽ báo cáo một chuỗi có mức tiêu thụ Gas tối đa cho mỗi hàm, sau khi chiến dịch fuzzing kết thúc.