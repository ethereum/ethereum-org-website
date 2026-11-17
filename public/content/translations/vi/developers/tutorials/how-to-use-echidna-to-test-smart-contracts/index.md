---
title: "Cách sử dụng Echidna để kiểm thử hợp đồng thông minh"
description: "Cách sử dụng Echidna để tự động kiểm thử hợp đồng thông minh"
author: "Trailofbits"
lang: vi
tags: ["Solidity", "hợp đồng thông minh", "bảo mật", "kiểm thử", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Cài đặt {#installation}

Echidna có thể được cài đặt thông qua Docker, Homebrew hoặc sử dụng tệp nhị phân được biên dịch sẵn. Các ví dụ trong hướng dẫn này đã được kiểm thử với Echidna 2.3.3 và solc 0.8.37.

### Echidna thông qua Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Lệnh cuối cùng chạy image Echidna trong một Docker có quyền truy cập vào thư mục hiện tại của bạn. Bạn có thể thay đổi các tệp từ máy chủ của mình và chạy các công cụ trên các tệp từ Docker. Image này cũng đi kèm với [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) và [solc-select](https://github.com/crytic/solc-select)._

Bên trong Docker, chạy:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Tệp nhị phân {#binary}

Tải xuống bản phát hành mới nhất cho nền tảng của bạn từ [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). Trên macOS hoặc Linux, bạn cũng có thể chạy `brew install echidna`, lệnh này sẽ cài đặt Slither và crytic-compile cùng với nó.

Khi sử dụng tệp nhị phân phát hành, hãy tự cài đặt [Slither](https://github.com/crytic/slither) và [solc-select](https://github.com/crytic/solc-select) (ví dụ: `pip3 install slither-analyzer solc-select` trong môi trường ảo Python) và chọn một phiên bản trình biên dịch:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna chạy mà không cần Slither, nhưng Slither trích xuất các hằng số như các số magic được sử dụng trong các câu lệnh `require` và một số ví dụ bên dưới phụ thuộc vào nó để tìm lỗi nhanh chóng.

## Giới thiệu về fuzzing dựa trên thuộc tính {#introduction-to-property-based-fuzzing}

Echidna là một công cụ fuzzer dựa trên thuộc tính, chúng tôi đã mô tả trong các bài đăng blog trước đây ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) là một kỹ thuật nổi tiếng trong cộng đồng bảo mật. Nó bao gồm việc tạo ra các đầu vào ít nhiều ngẫu nhiên để tìm lỗi trong chương trình. Các fuzzer cho phần mềm truyền thống (chẳng hạn như [AFL](http://lcamtuf.coredump.cx/afl/) hoặc [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) được biết đến là những công cụ hiệu quả để tìm lỗi.

Ngoài việc tạo đầu vào hoàn toàn ngẫu nhiên, có nhiều kỹ thuật và chiến lược để tạo ra các đầu vào tốt, bao gồm:

- Nhận phản hồi từ mỗi lần thực thi và hướng dẫn việc tạo đầu vào bằng cách sử dụng nó. Ví dụ: nếu một đầu vào mới được tạo dẫn đến việc khám phá một đường dẫn mới, thì việc tạo các đầu vào mới gần với nó có thể là hợp lý.
- Tạo đầu vào tuân thủ một ràng buộc cấu trúc. Ví dụ: nếu đầu vào của bạn chứa một header có checksum, thì việc để fuzzer tạo đầu vào xác thực checksum đó sẽ là hợp lý.
- Sử dụng các đầu vào đã biết để tạo đầu vào mới: nếu bạn có quyền truy cập vào một tập dữ liệu lớn gồm các đầu vào hợp lệ, fuzzer của bạn có thể tạo các đầu vào mới từ chúng, thay vì bắt đầu tạo từ đầu. Chúng thường được gọi là _seeds_ (hạt giống).

### Fuzzing dựa trên thuộc tính {#property-based-fuzzing}

Echidna thuộc về một họ fuzzer cụ thể: fuzzing dựa trên thuộc tính lấy cảm hứng mạnh mẽ từ [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Trái ngược với fuzzer cổ điển sẽ cố gắng tìm các sự cố (crash), Echidna sẽ cố gắng phá vỡ các bất biến do người dùng xác định.

Trong các hợp đồng thông minh, các bất biến là các hàm Solidity, có thể đại diện cho bất kỳ trạng thái không chính xác hoặc không hợp lệ nào mà hợp đồng có thể đạt tới, bao gồm:

- Kiểm soát truy cập không chính xác: kẻ tấn công đã trở thành chủ sở hữu của hợp đồng.
- Máy trạng thái không chính xác: các token có thể được chuyển trong khi hợp đồng đang bị tạm dừng.
- Số học không chính xác: người dùng có thể làm tràn số dưới (underflow) số dư của họ và nhận được token miễn phí không giới hạn.

### Kiểm thử một thuộc tính với Echidna {#testing-a-property-with-echidna}

Chúng ta sẽ xem cách kiểm thử một hợp đồng thông minh với Echidna. Mục tiêu là hợp đồng thông minh sau [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Chúng ta sẽ đưa ra giả định rằng token này phải có các thuộc tính sau:

- Bất kỳ ai cũng có thể có tối đa 1000 token
- Token không thể được chuyển (nó không phải là token ERC-20)

### Viết một thuộc tính {#write-a-property}

Các thuộc tính của Echidna là các hàm Solidity. Một thuộc tính phải:

- Không có đối số
- Trả về `true` nếu nó thành công
- Có tên bắt đầu bằng `echidna`

Echidna sẽ:

- Tự động tạo các giao dịch tùy ý để kiểm thử thuộc tính.
- Báo cáo bất kỳ giao dịch nào dẫn đến việc một thuộc tính trả về `false` hoặc ném ra lỗi.
- Loại bỏ tác dụng phụ khi gọi một thuộc tính (nghĩa là, nếu thuộc tính thay đổi một biến trạng thái, nó sẽ bị loại bỏ sau khi kiểm thử)

Thuộc tính sau kiểm tra xem người gọi có không quá 1000 token:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Sử dụng tính kế thừa để tách hợp đồng của bạn khỏi các thuộc tính của bạn:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) triển khai thuộc tính và kế thừa từ token.

### Khởi tạo một hợp đồng {#initiate-a-contract}

Echidna cần một [hàm khởi tạo](/developers/docs/smart-contracts/anatomy/#constructor-functions) không có đối số. Nếu hợp đồng của bạn cần một khởi tạo cụ thể, bạn cần thực hiện nó trong hàm khởi tạo.

Có một số địa chỉ cụ thể trong Echidna:

- `0x30000` gọi hàm khởi tạo.
- `0x10000`, `0x20000` và `0x30000` gọi ngẫu nhiên các hàm khác.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` nơi hợp đồng đang được kiểm thử được triển khai.

Chúng ta không cần bất kỳ khởi tạo cụ thể nào trong ví dụ hiện tại, do đó hàm khởi tạo của chúng ta trống.

### Chạy Echidna {#run-echidna}

Echidna được khởi chạy với:

```sh
echidna contract.sol
```

Nếu contract.sol chứa nhiều hợp đồng, bạn có thể chỉ định mục tiêu:

```sh
echidna contract.sol --contract MyContract
```

Khi chạy trong terminal, Echidna hiển thị một giao diện người dùng tương tác. Thêm `--format text` để nhận đầu ra văn bản thuần túy giống như các ví dụ bên dưới.

### Tóm tắt: Kiểm thử một thuộc tính {#summary-testing-a-property}

Phần sau đây tóm tắt quá trình chạy của Echidna trên ví dụ của chúng ta:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna phát hiện ra rằng thuộc tính bị vi phạm nếu `backdoor` được gọi.

## Lọc các hàm để gọi trong một chiến dịch fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Chúng ta sẽ xem cách lọc các hàm để fuzzing.
Mục tiêu là hợp đồng thông minh sau:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Ví dụ nhỏ này buộc Echidna phải tìm một chuỗi các giao dịch nhất định để thay đổi một biến trạng thái.
Điều này là khó đối với một fuzzer.
Chúng ta có thể chạy Echidna để xác minh điều này:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Lọc các hàm {#filtering-functions}

Echidna gặp khó khăn trong việc tìm chuỗi chính xác để kiểm thử hợp đồng này vì hai hàm reset (`reset1` và `reset2`) sẽ đặt tất cả các biến trạng thái thành `false`.
Tuy nhiên, chúng ta có thể sử dụng một tính năng đặc biệt của Echidna để đưa hàm reset vào danh sách đen (blacklist) hoặc chỉ đưa các hàm `f`, `g`,
`h` và `i` vào danh sách trắng (whitelist).

Để đưa các hàm vào danh sách đen, chúng ta có thể sử dụng tệp cấu hình này:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Một cách tiếp cận khác để lọc các hàm là liệt kê các hàm trong danh sách trắng. Để làm điều đó, chúng ta có thể sử dụng tệp cấu hình này:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` mặc định là `true`.
- Việc lọc được thực hiện trên tên hàm đầy đủ: tên hợp đồng, một `.` và chữ ký Giao diện nhị phân ứng dụng (ABI) (ví dụ: `C.f(uint256)`). Nếu bạn có `f()` và `f(uint256)`, bạn có thể chọn chính xác hàm nào để lọc. Một tên trần như `"reset1"` sẽ không khớp với bất kỳ thứ gì.

### Chạy Echidna {#run-echidna-1}

Để chạy Echidna với tệp cấu hình `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna sẽ tìm thấy chuỗi các giao dịch để làm sai lệch thuộc tính gần như ngay lập tức.

### Tóm tắt: Lọc các hàm {#summary-filtering-functions}

Echidna có thể đưa vào danh sách đen hoặc danh sách trắng các hàm để gọi trong một chiến dịch fuzzing bằng cách sử dụng:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna bắt đầu một chiến dịch fuzzing bằng cách đưa vào danh sách đen `C.f1()`, `C.f2()` và `C.f3()` hoặc chỉ gọi những hàm này, tùy thuộc vào giá trị của boolean `filterBlacklist`.

## Cách kiểm thử khẳng định của Solidity với Echidna {#how-to-test-soliditys-assert-with-echidna}

Trong hướng dẫn ngắn này, chúng tôi sẽ chỉ ra cách sử dụng Echidna để kiểm thử việc kiểm tra khẳng định trong các hợp đồng. Giả sử chúng ta có một hợp đồng như thế này:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Kể từ Solidity 0.8, các lỗi tràn số học sẽ hoàn nguyên theo mặc định. Khối `unchecked` khôi phục hành vi wrapping để `counter` có thể bị tràn số, đây là lỗi mà chúng ta muốn Echidna tìm thấy.

### Viết một khẳng định {#write-an-assertion}

Chúng ta muốn đảm bảo rằng `tmp` nhỏ hơn hoặc bằng `counter` sau khi trả về hiệu số của nó. Chúng ta có thể viết một thuộc tính Echidna, nhưng chúng ta sẽ cần lưu trữ giá trị `tmp` ở đâu đó. Thay vào đó, chúng ta có thể sử dụng một khẳng định như thế này:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Chạy Echidna {#run-echidna-2}

Để kích hoạt kiểm thử lỗi khẳng định, hãy truyền `--test-mode assertion` trên dòng lệnh hoặc tạo một [tệp cấu hình Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Khi chúng ta chạy hợp đồng này trong Echidna, chúng ta thu được kết quả mong đợi:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Như bạn có thể thấy, Echidna báo cáo một số lỗi khẳng định trong hàm `inc`. Việc thêm nhiều hơn một khẳng định cho mỗi hàm là có thể, nhưng Echidna không thể cho biết khẳng định nào đã thất bại.

### Khi nào và cách sử dụng các khẳng định {#when-and-how-use-assertions}

Các khẳng định có thể được sử dụng như những lựa chọn thay thế cho các thuộc tính rõ ràng, đặc biệt nếu các điều kiện cần kiểm tra liên quan trực tiếp đến việc sử dụng đúng một thao tác `f` nào đó. Việc thêm các khẳng định sau một số mã sẽ bắt buộc việc kiểm tra diễn ra ngay sau khi nó được thực thi:

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

Phần sau đây tóm tắt quá trình chạy của Echidna trên ví dụ của chúng ta:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna phát hiện ra rằng khẳng định trong `inc` có thể thất bại nếu hàm này được gọi nhiều lần với các đối số lớn.

## Thu thập và sửa đổi một corpus của Echidna {#collecting-and-modifying-an-echidna-corpus}

Chúng ta sẽ xem cách thu thập và sử dụng một corpus (tập dữ liệu) các giao dịch với Echidna. Mục tiêu là hợp đồng thông minh sau [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Ví dụ nhỏ này buộc Echidna phải tìm các giá trị nhất định để thay đổi một biến trạng thái. Điều này là khó đối với một fuzzer.
Chúng ta có thể chạy Echidna để xác minh điều này:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Tuy nhiên, chúng ta vẫn có thể sử dụng Echidna để thu thập corpus khi chạy chiến dịch fuzzing này.

### Thu thập một corpus {#collecting-a-corpus}

Để kích hoạt việc thu thập corpus, hãy tạo một thư mục corpus:

```sh
mkdir corpus-magic
```

Và một [tệp cấu hình Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Bây giờ chúng ta có thể chạy công cụ của mình và kiểm tra corpus đã thu thập:

```sh
echidna magic.sol --config config.yaml
```

Echidna vẫn không thể tìm thấy các giá trị magic chính xác. Để xem nó bị kẹt ở đâu, hãy xem báo cáo độ bao phủ `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Nhãn `r` có nghĩa là Echidna đã đạt đến dòng đó nhưng quá trình thực thi đã hoàn nguyên ở đó và các dòng sau `require` cuối cùng không bao giờ được thực thi.

Các chuỗi giao dịch mà Echidna thu thập được lưu trữ dưới dạng tệp JSON trong `corpus-magic/coverage/`. Ví dụ: giao dịch đầu tiên của một trong những tệp này là:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Rõ ràng, đầu vào này sẽ không kích hoạt lỗi trong thuộc tính của chúng ta. Tuy nhiên, trong bước tiếp theo, chúng ta sẽ xem cách sửa đổi nó để làm điều đó.

### Gieo mầm (seeding) một corpus {#seeding-a-corpus}

Echidna cần một số trợ giúp để xử lý hàm `magic`. Chúng ta sẽ sao chép và sửa đổi đầu vào để sử dụng các tham số phù hợp cho nó (tên tệp là ngẫu nhiên, vì vậy hãy sử dụng một tệp từ thư mục `corpus-magic/coverage/` của riêng bạn):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Chúng ta sẽ sửa đổi `new.txt` để nó chứa một giao dịch duy nhất gọi `magic(42,129,333,0)`. Bây giờ, chúng ta có thể chạy lại Echidna:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Lần này, nó phát hiện ra rằng thuộc tính bị vi phạm ngay lập tức.

## Tìm các giao dịch có mức tiêu thụ Gas cao {#finding-transactions-with-high-gas-consumption}

Chúng ta sẽ xem cách tìm các giao dịch có mức tiêu thụ Gas cao với Echidna. Các phiên bản cũ hơn của Echidna có tùy chọn `estimateGas` cho việc này; nó đã bị xóa trong Echidna 2.3.0. Thay vào đó, chúng ta đo lường Gas bằng `gasleft()` và để [chế độ tối ưu hóa](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) của Echidna tối đa hóa nó. Mục tiêu là hợp đồng thông minh sau:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Ở đây `expensive` có thể có mức tiêu thụ Gas lớn.

### Đo lường mức tiêu thụ Gas {#measuring-gas-consumption}

Trong chế độ tối ưu hóa, Echidna tìm kiếm các hàm bắt đầu bằng `echidna_` không nhận đối số nào và trả về một `int256`, đồng thời cố gắng tìm chuỗi giao dịch tối đa hóa giá trị trả về. Chúng ta thêm một hợp đồng kiểm thử gọi `f`, ghi lại lượng Gas nó đã sử dụng và hiển thị mức tối đa (lưu cả hai hợp đồng trong `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Để kích hoạt chế độ tối ưu hóa, hãy tạo một tệp cấu hình `config.yaml`. Trong ví dụ này, chúng ta cũng sẽ giảm kích thước của chuỗi giao dịch để làm cho kết quả dễ hiểu hơn:

```yaml
testMode: optimization
seqLen: 2
```

### Chạy Echidna {#run-echidna-3}

Khi chúng ta đã tạo tệp cấu hình, chúng ta có thể chạy Echidna như thế này:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Lượng Gas hiển thị được đo lường bởi bản triển khai Máy ảo Ethereum (EVM) mà Echidna chạy trên đó, [hevm](https://github.com/argotorg/hevm) và bao gồm chi phí (overhead) của lệnh gọi nội bộ từ `measureF`.
- Mức tối đa không phải là duy nhất: mỗi chiến dịch là ngẫu nhiên và các chiến dịch dài hơn (ví dụ: `--test-limit 200000`) có xu hướng tìm thấy các giá trị lớn hơn.

### Lọc ra các lệnh gọi làm giảm Gas {#filtering-out-gas-reducing-calls}

Hướng dẫn về **lọc các hàm để gọi trong một chiến dịch fuzzing** ở trên cho thấy cách loại bỏ một số hàm khỏi quá trình kiểm thử của bạn.  
Điều này có thể rất quan trọng để có được ước tính Gas chính xác.
Hãy xem xét ví dụ sau:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` gọi `check` và trả về chi phí Gas của nó. Giống như mọi hàm kiểm thử của Echidna, các thay đổi trạng thái của nó sẽ bị loại bỏ sau đó.

Nếu Echidna có thể gọi tất cả các hàm, nó sẽ không dễ dàng tìm thấy các giao dịch có chi phí Gas cao:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Đó là vì chi phí phụ thuộc vào kích thước của `addrs` và các lệnh gọi ngẫu nhiên có xu hướng để lại mảng gần như trống rỗng.
Tuy nhiên, việc đưa `pop` và `clear` vào danh sách đen mang lại cho chúng ta kết quả tốt hơn nhiều:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Việc thu nhỏ chuỗi lệnh gọi cho kết quả này mất vài phút, vì mỗi lần phát lại (replay) đều gọi hàm `check` đắt đỏ.

### Tóm tắt: Tìm các giao dịch có mức tiêu thụ Gas cao {#summary-finding-transactions-with-high-gas-consumption}

Echidna có thể tìm thấy các giao dịch có mức tiêu thụ Gas cao bằng cách đo lường Gas với `gasleft()` trong một hàm `echidna_` trả về một `int256` và chạy ở chế độ tối ưu hóa:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna sẽ báo cáo giá trị tối đa tìm thấy và chuỗi các giao dịch đã tạo ra nó, sau khi chiến dịch fuzzing kết thúc.
